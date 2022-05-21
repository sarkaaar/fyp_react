// // import * as React from "react";
import { useState } from "react";
// import Button from "@mui/material/Button";
// import MessageIcon from "@mui/icons-material/Message";
import Header from "./Components/Header";
// import SendIcon from "@mui/icons-material/Send";

export default function Bot() {
  const [question, setQuestion] = useState();

  const [answer, setAnswer] = useState([]);

  const trigger = [
    //0
    ["hi", "hey", "hello"],
    //1
    ["how are you", "how are things"],
    //2
    ["what is going on", "what is up"],
    //3
    ["happy", "good", "well", "fantastic", "cool"],
    //4
    ["bad", "bored", "tired", "sad"],
    //5
    ["tell me story", "tell me joke"],
    //6
    ["thanks", "thank you"],
    //7
    ["bye", "good bye", "goodbye"],
  ];

  const reply = [
    //0
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    //1
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?",
    ],
    //2
    ["Nothing much", "Exciting things!"],
    //3
    ["Glad to hear it"],
    //4
    ["Why?", "Cheer up buddy"],
    //5
    ["What about?", "Once upon a time..."],
    //6
    ["You're welcome", "No problem"],
    //7
    ["Goodbye", "See you later"],
  ];

  const alternative = [
    "Same",
    "Go on...",
    "Try again",
    "I'm listening...",
    "Bro...",
  ];

  function compare(triggerArray, replyArray, text) {
    for (let x = 0; x < triggerArray.length; x++)
      for (let y = 0; y < replyArray.length; y++)
        if (triggerArray[x][y] === text) {
          setAnswer(
            replyArray[x][Math.floor(Math.random() * replyArray[x].length)]
          );
        }

    return answer;
  }

  function output(input) {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");

    console.log("question = ", text);

    if (compare(trigger, reply, text)) {
      console.log("compare =", answer);
    } else if (text.match(/robot/gi)) {
      setAnswer(robot[Math.floor(Math.random() * robot.length)]);
      console.log("robot =", answer);
    } else {
      setAnswer(alternative[Math.floor(Math.random() * alternative.length)]);
      console.log("alternative = ", answer);
    }
  }

  const robot = ["How do you do, fellow human", "I am not a bot"];

  return (
    <>
      <Header />
      <div className="flex">
        <div className="ml-72">
          <h1>Chatbot</h1>
          <h1>this is the bot</h1>
          <div>
            <input
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            ></input>
          </div>
          <div style={{ margin: "50px" }}>
            <button
              onClick={() => {
                output(question);
              }}
            >
              Submit
            </button>
          </div>

          {
            <div>
              <h1>user:{question}</h1>
              <h1>answer:{answer}</h1>
            </div>
          }
        </div>
      </div>
    </>
  );
}
