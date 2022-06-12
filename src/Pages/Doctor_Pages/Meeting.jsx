import DoctorLayout from "../../layouts/DoctorLayout";
import { useRef, useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@material-ui/core";
import "./Live/index.css";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function Videos({ mode, callId, setPage }) {
  const { id } = useParams();
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef();
  const remoteRef = useRef();

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      const roomRef = doc(db, "calls", roomId);
      await getDocs(collection(roomRef, "answerCandidates")).then(
        (querySnapshot) => {
          querySnapshot.forEach((d) => {
            deleteDoc(d.ref);
          });
        }
      );

      await getDocs(collection(roomRef, "offerCandidates")).then(
        (querySnapshot) => {
          querySnapshot.forEach((d) => {
            deleteDoc(d.ref);
          });
        }
      );

      await deleteDoc(roomRef);
    }

    window.location.reload();
  };

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    const uploadLink = async (callDoc) => {
      const prod = doc(db, "appointments", id);
      await updateDoc(prod, {
        joinLink: callDoc,
      }).then(async (res) => {
        console.log("joining link upladed to the aappointments sucessfully");
      });
    };

    if (mode === "create") {
      const callDoc = doc(collection(db, "calls"));
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      setRoomId(callDoc.id);
      console.log(callDoc.id);
      uploadLink(callDoc.id);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } 
    
    // else if (mode === "join") {
    //   const callDoc = doc(db, "calls", callId);
    //   const answerCandidates = collection(callDoc, "answerCandidates");
    //   const offerCandidates = collection(callDoc, "offerCandidates");

    //   pc.onicecandidate = (event) => {
    //     event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    //   };

    //   const callData = (await getDoc(callDoc)).data();

    //   const offerDescription = callData.offer;
    //   await pc.setRemoteDescription(
    //     new RTCSessionDescription(offerDescription)
    //   );

    //   const answerDescription = await pc.createAnswer();
    //   await pc.setLocalDescription(answerDescription);

    //   const answer = {
    //     type: answerDescription.type,
    //     sdp: answerDescription.sdp,
    //   };

    //   await updateDoc(callDoc, { answer });

    //   onSnapshot(offerCandidates, (snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //       if (change.type === "added") {
    //         const data = change.doc.data();
    //         pc.addIceCandidate(new RTCIceCandidate(data));
    //       }
    //     });
    //   });
    // }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  return (
    <div
      className="videos"
      // className="flex items-center whitespace-nowrap bg-whitetext-black"
    >
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <Button
          variant="contained"
          type="button"
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          <CallIcon />
        </Button>
        <div tabIndex={0} role="button" className="more button">
          <MoreVertIcon />
          <div className="popover">
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                console.log(roomId);
              }}
            >
              <ContentCopyIcon />
              Copy joining code
            </Button>
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div color="primary" className="flex gap-4 mt-8">
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={() => setPage("home")}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={setupSources}
                fullWidth
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MainScreen({ setPage }) {
  const { id } = useParams();
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    const getAppointment = async () => {
      const x = await getDoc(doc(db, `appointments/${id}`));
      console.log({
        id: x.id,
        ...x.data(),
      });
      setAppointment({ id: x.id, ...x.data() });
      console.log({ id: x.id, ...x.data() });
    };

    getAppointment();
  }, []);

  return (
    <DoctorLayout>
      <div>
        <div className="w-10/12 border-2 border-slate-800 m-auto mb-4 bg-white hover:drop-shadow-2xl p-4 rounded-lg">
          <h1 className="text-3xl font-bold">
            {" "}
            Dr.
            {appointment?.doctor?.name}
          </h1>
          <div className="flex">
            <div className="w-1/2">
              <h1 className="text-xl font-bold text-gray-600 ">
                Clinic Name : {appointment?.doctor?.clinicName}
              </h1>
              <h1 className="text-xl font-bold text-gray-600 ">
                Address : {appointment?.doctor?.clinicAddress}
              </h1>
              <h1 className="text-xl font-bold text-gray-600 ">
                Phone # {appointment?.doctor?.clinicPhone}
              </h1>
            </div>
            <div className="w-1/2">
              <h1 className="text-xl font-bold text-red-600 flex justify-end">
                Date :{" "}
                {new Date(appointment?.date.seconds * 1000).toDateString()}
              </h1>
              <h1 className="text-xl font-bold text-red-600 flex justify-end">
                Time : {appointment?.time}
              </h1>
              <h1 className="text-xl font-bold text-gray-800 flex justify-end">
                User Email : {appointment?.user}
              </h1>
            </div>
          </div>
          <div className="w-fit m-auto pt-4">
            <button
              onClick={() => {
                setPage("create");
              }}
            >
              Start a new meeting
            </button>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
export default function Meeting() {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user);
        return;
      }
    }),
    [user]
  );

  const getUser = async (user) => {
    const q = query(
      collection(db, "doctors"),
      where("email", "==", user?.email)
    );
    getDocs(q).then((record) => {
      const data = record.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      if (data.length == 0) navigate("/");
    });
  };

  return (
    <div className="app">
      {currentPage === "home" ? (
        <MainScreen setPage={setCurrentPage} />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}
