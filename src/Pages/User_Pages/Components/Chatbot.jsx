import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";

export default function Chatbot() {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [chat, setChat] = useState([]);

  const trigger = [
    // 0
    ["hi", "hey", "hello"],
    // 1
    ["how are you", "how are things"],
    // 2
    ["what is going on", "what is up"],
    // 3
    ["happy", "good", "well", "fantastic", "cool"],
    // 4
    ["bad", "bored", "tired", "sad"],
    // 5
    ["tell me story", "tell me joke"],
    // 6
    ["thanks", "thank you"],
    // 7
    ["bye", "good bye", "goodbye"],
    // 8
    ["Does your clinic provide grooming services?", "Do you provide grooming services?"],
    // 9
    ["Does your clinic provide vaccination services?", "Do you provide vaccination services?"],
  ];

  const reply = [
    // 0
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    // 1
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?",
    ],
    // 2
    ["Nothing much", "Exciting things!"],
    // 3
    ["Glad to hear it"],
    // 4
    ["Why?", "Cheer up buddy"],
    // 5
    ["What about?", "Once upon a time..."],
    // 6
    ["You're welcome", "No problem"],
    // 7
    ["Goodbye", "See you later"],
    // 8
    ["Yes, we provide grooming services", "Yes, we do"],
    // 9
    ["Yes, we provide vaccination services", "Yes, we do"],
  ];

  const alternative = [
    "Same",
    "Go on...",
    "Try again",
    "I'm listening...",
    "Bro...",
  ];

  function compare(triggerArray, replyArray, text) {
    for (let x = 0; x < triggerArray.length; x += 1) {
      for (let y = 0; y < replyArray.length; y += 1) {
        if (triggerArray[x][y] === text) {
          return replyArray[x][
            Math.floor(Math.random() * replyArray[x].length)
          ];
        }
      }
    }

    return answer;
  }

  const robot = ["How do you do, fellow human", "I am not a bot"];

  function output(input) {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");

    let answer;

    if (compare(trigger, reply, text)) {
      answer = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
      answer = robot[Math.floor(Math.random() * 2)];
    } else {
      answer = alternative[Math.floor(Math.random() * alternative.length)];
    }

    setChat([...chat, { text, from: "user" }, { text: answer, from: "bot" }]);
  }

  return (
    <div className=" flex justify-end allign-end bg-white">
      <div className="w-96 border rounded">
        <div>
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <ChatIcon />
              <span className="block ml-2 font-bold text-gray-600">
                How May I Help You
              </span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[25rem]">
              <ul className="space-y-2">
                {chat.map((msg, i) =>
                  msg.from === "bot" ? (
                    <li key={i} className="flex justify-start">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <span className="block">{msg.text}</span>
                      </div>
                    </li>
                  ) : (
                    <li key={i} className="flex justify-end">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                        <span className="block">{msg.text}</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
                onChange={(e) => setQuestion(e.target.value)}
              />

              <button
                type="submit"
                onClick={() => {
                  output(question);
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
