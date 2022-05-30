import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

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
    ["does your clinic provide grooming services?", "do you provide grooming services?", "grooming services", "grooming"],
    // 9
    ["does your clinic provide vaccination services?", "do you provide vaccination services?", "vaccination services","vaccination"],
    // 10
    ["does your clinic provide pet boarding services?", "do you provide pet boarding services?", "pet boarding services", "pet boarding"],
    // 11
    ["does your clinic provide spay/neuter services?", "do you provide spay/neuter services?", "spay/neuter services", "spay/neuter"],
    // 12
    ["My pet vomited today. What should I do?", "My pet vomited. What should I do?","vomiting", "vomiting today"],
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
    // 10
    ["No, we do not provide pet boarding services", "No, we do not"],
    // 11
    ["Yes, we provide spay/neuter services", "Yes, we do"],
    // 12
    ["Please check your pet's health", "Please check your pet's health","If your pet is lethargic, not as active or perky as usual, disinterested in eating, not drinking normally, vomiting blood, got into the trash or may have eaten a foreign object or unusual food, you should withhold its food and call for an appointment.  We will get your pet in for an exam and possible x-rays or blood work.  If your pet does not show any of the above symptoms after vomiting, still keep it under observation to see if it vomits again.  Remove it’s food for 12 hours and make sure that water is always available.  If no more vomiting occurs after 12 hours has gone by, feed it two parts cooked whole rice and 1 part boiled chicken or lean hamburger for a day or two.  If vomiting continues for more than 24 hours or occurs more than once in 24 hours, withhold food and make an appointment for an exam, x-rays and/or blood work."],

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
    <div className="  m-10">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Ask us Anything</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-fit max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                {/* // chat screen */}
                <div className=" bg-white">
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

                {/* chatscreen ended */}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
