import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  deleteDoc,
  addDoc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import { useRef, useState, useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button } from "@material-ui/core";

import { useParams } from "react-router-dom";

function Lists({ setPage, joinCode, setJoinCode }) {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const appointmentsRef = collection(db, "appointments");
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);

  const cancelAppoitment = async (id) => {
    const appointment = doc(db, "appointments", id);
    await deleteDoc(appointment);
    getAppointments();
  };
  const getAppointments = async (user) => {
    const q = await query(appointmentsRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    console.log(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setAppointments(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoader(false);
    console.log(appointments);
  };

  useEffect(() => {
    setLoader(true);
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getAppointments(currentUser);
    });
  }, []);

  return (
    <UseMainLayout>
      <div className="min-h-screen">
        <div className="flex justify-end">
          <Link
            className="m-4 p-4 w-fit font-black border-2  bg-indigo-600 hover:bg-indigo-400 text-3xl rounded-lg"
            to="/viewDoctors"
          >
            Make A New Appointment
          </Link>
        </div>

        {user ? (
          <>
            {loader ? (
              <div className="grid place-items-center h-screen">
                <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin" />
              </div>
            ) : appointments.length === 0 ? (
              <div>
                <div className="font-bold text-center ">
                  <h1 className="text-2xl pt-1/2">
                    Currently You Dont have any Appointmets.{" "}
                  </h1>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold flex justify-center">
                  You have the Following Appointments
                </h1>
                {appointments.map((item, key) => (
                  <div className="w-10/12 border-2 border-slate-800 m-auto mb-4 bg-white hover:drop-shadow-2xl p-4 rounded-lg">
                    <h1 className="text-3xl font-bold">
                      {" "}
                      Dr.
                      {item?.doctor?.name}
                    </h1>
                    <div className="flex">
                      <div className="w-1/2">
                        <h1 className="text-xl font-bold text-gray-600 ">
                          Clinic Name : {item?.doctor?.clinicName}
                        </h1>
                        <h1 className="text-xl font-bold text-gray-600 ">
                          Address : {item?.doctor?.clinicAddress}
                        </h1>
                        <h1 className="text-xl font-bold text-gray-600 ">
                          Phone # {item?.doctor?.clinicPhone}
                        </h1>
                      </div>
                      <div className="w-1/2">
                        <h1 className="text-xl font-bold text-red-600 flex justify-end">
                          Date :{" "}
                          {new Date(item?.date.seconds * 1000).toDateString()}
                        </h1>
                        <h1 className="text-xl font-bold text-red-600 flex justify-end">
                          Time : {item?.time}
                        </h1>
                      </div>
                    </div>
                    <div className="w-fit m-auto pt-4">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          cancelAppoitment(item?.id);
                        }}
                      >
                        Cancel Appointment
                      </Button>
                    </div>
                    {item?.joinLink ? (
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          setJoinCode(item?.joinLink);
                          setPage("join");
                        }}
                      >
                        Join Meeting
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">You are not signed in.</div>
            <div className="w-74 px-10 sm:w-100 flex justify-center">
              <Link
                className="w-full mx-4 text-center border-2 text-white bg-indigo-600 text-2xl rounded-lg"
                to="/sign_in"
              >
                Sign In Now!
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </UseMainLayout>
  );
}

// function MainScreen({ setPage }) {
//   const { id } = useParams();
//   const [appointment, setAppointment] = useState();

//   useEffect(() => {
//     const getAppointment = async () => {
//       const x = await getDoc(doc(db, `appointments/${id}`));
//       console.log({
//         id: x.id,
//         ...x.data(),
//       });
//       setAppointment({ id: x.id, ...x.data() });
//       console.log({ id: x.id, ...x.data() });
//     };

//     getAppointment();
//   }, []);

//   return (
//     <DoctorLayout>
//       <div>
//         <div className="w-10/12 border-2 border-slate-800 m-auto mb-4 bg-white hover:drop-shadow-2xl p-4 rounded-lg">
//           <h1 className="text-3xl font-bold">
//             {" "}
//             Dr.
//             {appointment?.doctor?.name}
//           </h1>
//           <div className="flex">
//             <div className="w-1/2">
//               <h1 className="text-xl font-bold text-gray-600 ">
//                 Clinic Name : {appointment?.doctor?.clinicName}
//               </h1>
//               <h1 className="text-xl font-bold text-gray-600 ">
//                 Address : {appointment?.doctor?.clinicAddress}
//               </h1>
//               <h1 className="text-xl font-bold text-gray-600 ">
//                 Phone # {appointment?.doctor?.clinicPhone}
//               </h1>
//             </div>
//             <div className="w-1/2">
//               <h1 className="text-xl font-bold text-red-600 flex justify-end">
//                 Date :{" "}
//                 {new Date(appointment?.date.seconds * 1000).toDateString()}
//               </h1>
//               <h1 className="text-xl font-bold text-red-600 flex justify-end">
//                 Time : {appointment?.time}
//               </h1>
//               <h1 className="text-xl font-bold text-gray-800 flex justify-end">
//                 User Email : {appointment?.user}
//               </h1>
//             </div>
//           </div>
//           <div className="w-fit m-auto pt-4">
//             <button
//               onClick={() => {
//                 setPage("create");
//               }}
//             >
//               Click Me
//             </button>
//             <div>
//               {appointment?.status ? (
//                 <button
//                   onClick={() => {
//                     setPage("create");
//                   }}
//                 >
//                   Click Me
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setPage("create");
//                   }}
//                 >
//                   Click Me
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// }

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
  console.log(callId);

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

    // if (mode === "create") {
    //   const callDoc = doc(collection(db, "calls"));
    //   const offerCandidates = collection(callDoc, "offerCandidates");
    //   const answerCandidates = collection(callDoc, "answerCandidates");

    //   setRoomId(callDoc.id);

    //   pc.onicecandidate = (event) => {
    //     if (event.candidate) {
    //       addDoc(offerCandidates, event.candidate.toJSON());
    //     }
    //   };

    //   const offerDescription = await pc.createOffer();
    //   await pc.setLocalDescription(offerDescription);

    //   const offer = {
    //     sdp: offerDescription.sdp,
    //     type: offerDescription.type,
    //   };

    //   await setDoc(callDoc, { offer });

    //   onSnapshot(callDoc, (snapshot) => {
    //     const data = snapshot.data();
    //     if (!pc.currentRemoteDescription && data?.answer) {
    //       const answerDescription = new RTCSessionDescription(data.answer);
    //       pc.setRemoteDescription(answerDescription);
    //     }
    //   });

    //   onSnapshot(answerCandidates, (snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //       if (change.type === "added") {
    //         const candidate = new RTCIceCandidate(change.doc.data());
    //         pc.addIceCandidate(candidate);
    //       }
    //     });
    //   });
    // } else
    if (mode === "join") {
      const callDoc = doc(db, "calls", callId);
      const answerCandidates = collection(callDoc, "answerCandidates");
      const offerCandidates = collection(callDoc, "offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      const callData = (await getDoc(callDoc)).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

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

export default function ViewAppointments() {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Lists
          setPage={setCurrentPage}
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          // setPage={setCurrentPage}
        />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}
