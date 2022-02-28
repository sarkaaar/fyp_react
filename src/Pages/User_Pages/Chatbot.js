// // import * as React from "react";
// import { useState } from "react";
// import Button from "@mui/material/Button";
// import MessageIcon from "@mui/icons-material/Message";
// // import Header from "../Components/Header";
// import SendIcon from "@mui/icons-material/Send";


export default function Bot() {
  return(<h1>Chatbot </h1>)
}
// export default function Bot() {
//   const [question, setQuestion] = useState([]);

// import Header from "./Components/Header";
// export default function Bot() {
//   const [question, setQuestion] = useState();

//   const [answer, setAnswer] = useState([]);

//   const trigger = [
//     //0
//     ["hi", "hey", "hello"],
//     //1
//     ["how are you", "how are things"],
//     //2
//     ["what is going on", "what is up"],
//     //3
//     ["happy", "good", "well", "fantastic", "cool"],
//     //4
//     ["bad", "bored", "tired", "sad"],
//     //5
//     ["tell me story", "tell me joke"],
//     //6
//     ["thanks", "thank you"],
//     //7
//     ["bye", "good bye", "goodbye"],
//   ];

//   const reply = [
//     //0
//     ["Hello!", "Hi!", "Hey!", "Hi there!"],
//     //1
//     [
//       "Fine... how are you?",
//       "Pretty well, how are you?",
//       "Fantastic, how are you?",
//     ],
//     //2
//     ["Nothing much", "Exciting things!"],
//     //3
//     ["Glad to hear it"],
//     //4
//     ["Why?", "Cheer up buddy"],
//     //5
//     ["What about?", "Once upon a time..."],
//     //6
//     ["You're welcome", "No problem"],
//     //7
//     ["Goodbye", "See you later"],
//   ];

//   const alternative = [
//     "Same",
//     "Go on...",
//     "Try again",
//     "I'm listening...",
//     "Bro...",
//   ];

//   function compare(triggerArray, replyArray, text) {
//     for (let x = 0; x < triggerArray.length; x++)
//       for (let y = 0; y < replyArray.length; y++)
//         if (triggerArray[x][y] === text) {
//           setAnswer(
//             replyArray[x][Math.floor(Math.random() * replyArray[x].length)]
//           );
//         }

//     return answer;
//   }

//   function output(input) {
//     let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
//     text = text
//       .replace(/ a /g, " ")
//       .replace(/i feel /g, "")
//       .replace(/whats/g, "what is")
//       .replace(/please /g, "")
//       .replace(/ please/g, "");

//     console.log("question = ", text);

//     if (compare(trigger, reply, text)) {
//       console.log("compare =", answer);
//     } else if (text.match(/robot/gi)) {
//       setAnswer(robot[Math.floor(Math.random() * robot.length)]);
//       console.log("robot =", answer);
//     } else {
//       setAnswer(alternative[Math.floor(Math.random() * alternative.length)]);
//       console.log("alternative = ", answer);
//     }
//   }

//   const robot = ["How do you do, fellow human", "I am not a bot"];

//   return (
//     <div style={{ width: "300px", background: "yellow" }}>
//       <Header />
//       <h1>this is the bot</h1>
//       <div>
//         <input
//           value={question}
//           onChange={(e) => {
//             setQuestion(e.target.value);
//           }}
//         ></input>
//       </div>
//       <div style={{ margin: "50px" }}>
//         <button
//           onClick={() => {
//             output(question);
//           }}
//         >
//           Submit
//         </button>
//       </div>

//       {
//         <div>
//           <h1>user:{question}</h1>
//           <h1>answer:{answer}</h1>
//         </div>
//       }


//       {/* new module */}

//       {/* bot template */}
//       <div
//         class="-bar-collapsible"
//         style={{
//           position: "fixed",
//           bottom: 0,
//           right: "50px",
//           boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <button
//           id="-button"
//           type="button"
//           class="collapsible"
//           style={{
//             background: "rgb(82, 151, 255)",
//             color: "white",
//             cursor: "pointer",
//             padding: "18px",
//             width: "350px",
//             alignText: "left",
//             outline: "none",
//             fontSize: "18px",
//             borderRadius: " 10px 10px 0px 0px",
//             border: "3px solid white",
//             borderBottom: "none",
//           }}
//         >
//           with us!
//           <MessageIcon />
//         </button>
// </div>
//         <div
//           class="content"
//           style={{
//             // maxHeight: 0,
//             overflow: "hidden",
//             transition: "max-height 0.2s ease-out",
//             background: "#f1f1f1",
//           }}
//         >
//           <div
//             class="full--block"
//             style={{
//               width: "350px",
//               background: "white",
//               textAlign: "center",
//               overflow: "auto",
//               scrollbarWidth: "none",
//               height: "max-content",
//               transition: "max-height 0.2s ease-out",
//             }}
//           >
//             {/* <!-- Message Container --> */}
//             <div
//               class="outer-container"
//               style={{
//                 minHeight: "500px",
//                 bottom: "0%",
//                 position: "relative",
//               }}
//             >
//               <div
//                 class="-container"
//                 style={{
//                   maxHeight: "500px",
//                   width: "100%",
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   scrollBehavior: "smooth",
//                   hyphens: "auto",
//                 }}
//               >
//                 {/* <!-- Messages --> */}
//                 <div id="box">
//                   <h5 id="-timestamp"></h5>
//                   <p
//                     id="botStarterMessage"
//                     class="botText"
//                     style={{
//                       color: "#000",
//                       fontFamily: "Helvetica",
//                       fontWeight: "normal",
//                       fontSize: "16px",
//                       textAlign: "left",
//                     }}
//                   >
//                     <span
//                       style={{
//                         lineHeight: "1.5em",
//                         display: "inline-block",
//                         background: "#e0e0e0",
//                         padding: "10px",
//                         borderRadius: " 8px",
//                         borderBottom: "2px",
//                         maxWidth: "80%",
//                         marginLeft: "10px",
//                         animation: "floatup .5s forwards",
//                       }}
//                     >
//                       Loading...
//                     </span>
//                   </p>
//                 </div>

//                 {/* <!-- User input box --> */}
//                 <div
//                   class="-bar-input-block"
//                   style={{
//                     display: "flex",
//                     float: "left",
//                     boxSizing: "border-box",
//                     justifyContent: "space-between",
//                     width: "100%",
//                     alignItems: "center",
//                     background: "rgb(235, 235, 235)",
//                     borderRadius: " 10px 10px 0px 0px",
//                     padding: "10px 0px 10px 10px",
//                   }}
//                 >
//                   <div id="userInput" style={{ width: "75%" }}>
//                     <input
//                       id="textInput"
//                       style={{
//                         float: "left",
//                         border: "none",
//                         boxSizing: "border-box",
//                         width: "100%",
//                         borderRadius: "10px",
//                         padding: "10px",
//                         fontSize: "16px",
//                         color: "#000",
//                         background: "white",
//                         outline: "none",
//                       }}
//                       class="input-box"
//                       type="text"
//                       name="msg"
//                       placeholder="Tap 'Enter' to send a message"
//                     />
//                     <p></p>
//                   </div>

//                   <div
//                     class="-bar-icons"
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-evenly",
//                       boxSizing: "border-box",
//                       width: "25%",
//                       float: " right",
//                       fontSize: " 20px",
//                     }}
//                   >
//                     <MessageIcon />


      
//          </div>

         
              

//   );
  
// } 