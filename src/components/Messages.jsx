import React, { useEffect, useRef } from "react";
import moment from "moment";

const formatTime = (time) => {
  // Convert the seconds to milliseconds (JavaScript Date uses milliseconds)
  const timestampInMilliseconds =
    time.seconds * 1000 + time.nanoseconds / 1000000;

  // Create a JavaScript Date object
  const date = new Date(timestampInMilliseconds);

  // Format the date using moment
  const formattedTime = moment(date).format("h:mm A");

  return formattedTime;
};

function Messages({ messages, selectedRoom, currentUser }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: "#DAD3CC" }}
    >
      {messages?.length > 0 ? (
        <div className="py-2 px-3">
          {messages.map((message) => (
            <div
              className={`flex ${
                message.senderId === currentUser?.uid && "justify-end"
              } mb-2`}
              key={message.id}
            >
              <div
                className="rounded py-2 px-3"
                style={{
                  backgroundColor:
                    message.senderId === currentUser?.uid
                      ? "#E2F7CB"
                      : "#F2F2F2",
                }}
              >
                <p className="text-sm text-purple" style={{ fontWeight: 500 }}>
                  {message.senderId === currentUser?.uid
                    ? "You"
                    : selectedRoom?.recipient?.displayName}
                </p>
                <p className="text-sm mt-1">{message.message}</p>
                <p className="text-right text-xs text-grey-dark mt-1">
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-200 h-full">
          <p>Type any message to start conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
