import * as React from "react";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
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
import { db, auth } from "../../../firebase-config";
import Footer from "../../User_Pages/Components/Footer";
import UseMainLayout from "../../../layouts/UserMainLayout";
import { useRef, useState, useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import { Button } from "@material-ui/core";

function Lists({ setPage, joinCode, setJoinCode }) {
  const appointmentsRef = collection(db, "appointments");
  const [user, setUser] = useState();
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const cancelAppoitment = async (id) => {
    const appointment = doc(db, "appointments", id);
    await deleteDoc(appointment).then(() => {
      setOpen(true);
    });
    getAppointments(user);
  };

  const getAppointments = async (user) => {
    const q = query(appointmentsRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setAppointments(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getAppointments(currentUser);
    });
  }, [user]);

  return (
    <UseMainLayout>
      <div className="min-h-screen">
        {user ? (
          <>
            {loader ? (
              <div className="grid h-screen place-items-center">
                <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
              </div>
            ) : appointments.length === 0 ? (
              <div>
                <div className="flex justify-end">
                  <Link
                    className="m-4 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 p-4 text-xl text-white shadow-lg shadow-blue-400/50 focus:shadow-none"
                    to="/viewDoctors"
                  >
                    +
                  </Link>
                </div>
                <div className="flex items-center justify-center text-center font-bold ">
                  <h1 className="text-2xl">
                    Currently You Dont have any Appointmets.
                  </h1>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-end">
                  <Link
                    className="m-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 p-4 text-xl text-white shadow-lg shadow-blue-400/50 focus:shadow-none"
                    to="/viewDoctors"
                  >
                    +
                  </Link>
                </div>
                <h1 className="m-2 flex justify-center text-center text-2xl font-bold">
                  You have the Following Appointments
                </h1>
                {appointments.map((item) => (
                  <>
                    {!item.ended ? (
                      <div
                        className="m-auto mb-4 w-10/12 bg-slate-200 p-4 hover:drop-shadow-xl"
                        key={item.id}
                      >
                        <div className="flex w-full flex-row flex-wrap justify-center md:flex-nowrap lg:flex-nowrap xl:flex-nowrap">
                          <div className="w-full">
                            <h1 className="text-2xl font-bold">
                              Dr. {item?.doctor?.name}
                            </h1>
                            <h1 className="text-xl text-gray-600 ">
                              Clinic Name : {item?.doctor?.clinicName}
                            </h1>
                            <h1 className="text-xl text-gray-600 ">
                              Address : {item?.doctor?.clinicAddress}
                            </h1>
                            <h1 className="text-xl text-gray-600 ">
                              Phone # {item?.doctor?.clinicPhone}
                            </h1>
                            <h1 className="text-xl text-red-600">
                              Date:
                              {new Date(
                                item?.date.seconds * 1000
                              ).toDateString()}
                            </h1>
                            <h1 className="text-xl text-red-600">
                              Time: {item?.time}
                            </h1>
                          </div>
                          <div className="flex shrink justify-end">
                            <div className="flex justify-center md:flex-col lg:flex-col">
                              {item?.joinLink && (
                                <button
                                  onClick={() => {
                                    setJoinCode(item?.joinLink);
                                    setPage("join");
                                  }}
                                  className=" mx-2 my-2 w-28 cursor-pointer rounded-lg bg-neutral-400 py-4 px-8 text-white shadow-lg shadow-neutral-600/50 hover:drop-shadow-lg focus:shadow-none md:w-36 lg:w-44"
                                >
                                  Join Meeting
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  cancelAppoitment(item.id);
                                }}
                                className=" mx-2 my-2 w-28 cursor-pointer rounded-lg bg-gradient-to-r from-red-700 to-rose-600 py-4 px-8 text-white shadow-lg shadow-red-600/50 hover:drop-shadow-lg focus:shadow-none md:w-36 lg:w-44"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold">You are not signed in.</div>
              <div className="w-74 sm:w-100 flex justify-center px-10">
                <Link
                  className="mx-4 w-full rounded-lg border-2 bg-indigo-600 text-center text-2xl text-white"
                  to="/sign_in"
                >
                  Sign In Now!
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-[500px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
            Cancel appointment Successfully
          </h1>
          <div className="flex justify-center">
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </UseMainLayout>
  );
}

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

    // if (mode === "create") {
    //   const callDoc = doc(collection(db, "calls"));
    //   const offerCandidates = collection(callDoc, "offerCandidates");
    //   const answerCandidates = collection(callDoc, "answerCandidates");

    //   setRoomId(callDoc.id);
    //   console.log(callDoc.id);

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
      console.log(callData, callDoc)
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
    <div className="bg-whitetext-black flex items-center whitespace-nowrap">
      <video
        className="absolute bottom-[40px] right-[40px] z-10 w-[210px] rounded-lg"
        ref={localRef}
        autoPlay
        playsInline
        muted
      />
      <video
        className="absolute inset-0 w-screen h-screen object-cover"
        ref={remoteRef}
        autoPlay
        playsInline
      />

      <div className="absolute left-1/2 bottom-10 z-10 flex -translate-x-1/2">
        <button
          type="button"
          onClick={hangUp}
          disabled={!webcamActive}
          className="button mr-12 h-20 w-20 rounded-full bg-red-600 text-white"
        >
          <CallIcon />
        </button>
      </div>

      {!webcamActive && (
        <div className="absolute inset-0 z-30 bg-transparent bg-gray-600">
          <div className="absolute top-1/2	left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-10">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div color="primary" className="mt-8 flex gap-4">
              <button
                type="button"
                className="inline-block w-full cursor-pointer rounded-lg bg-indigo-600 py-4 text-white"
                variant="contained"
                onClick={() => setPage("home")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-block w-full cursor-pointer rounded-lg bg-indigo-600 py-4 text-white"
                onClick={setupSources}
              >
                Start
              </button>
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
        />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}
