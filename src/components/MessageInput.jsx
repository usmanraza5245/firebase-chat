import React, { useState, useCallback } from "react";
import { saveMessage } from "../services/chat-room";

function MessageInput({ selectedRoom, currentUser }) {
  const [message, setMessage] = useState("");

  const handleInputChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const sendMessage = async () => {
    if (!message) return;
    const content = message;
    setMessage("");
    try {
      const newMessage = await saveMessage(
        selectedRoom.id,
        currentUser.uid,
        content
      );
    } catch (error) {
      console.log("error.....", error);
    } finally {
    }
  };
  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            opacity=".45"
            fill="#263238"
            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
          ></path>
        </svg>
      </div>
      <div className="flex-1 mx-4">
        <input
          className="w-full border rounded px-2 py-2"
          type="text"
          value={message}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 30 30"
            version="1.1"
          >
            <g id="surface1">
              <path d="M 13.570312 7.917969 C 7.378906 10.597656 2.382812 12.976562 2.382812 13.214844 C 2.382812 13.453125 4.285156 14.644531 6.667969 15.832031 L 10.894531 17.976562 L 18.394531 10.476562 C 22.5 6.371094 25.597656 2.976562 25.296875 3.035156 C 24.941406 3.097656 19.703125 5.296875 13.570312 7.917969 Z M 13.570312 7.917969 " />
              <path d="M 19.105469 11.550781 L 11.785156 18.871094 L 13.925781 23.152344 C 15.121094 25.476562 16.308594 27.378906 16.546875 27.378906 C 16.964844 27.378906 26.902344 4.703125 26.605469 4.34375 C 26.488281 4.285156 23.152344 7.5 19.105469 11.550781 Z M 19.105469 11.550781 " />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
