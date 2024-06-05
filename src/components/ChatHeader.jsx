import React from "react";

function ChatHeader({ selectedRoom }) {
  return (
    <div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
          <img
            className="w-10 h-10 rounded-full"
            src={selectedRoom?.recipient?.photoURL}
            loading="lazy"
          />
        </div>
        <div className="ml-4">
          <p className="text-grey-darkest">
            {selectedRoom?.recipient?.displayName}
          </p>
          <p className="text-grey-darker text-xs mt-1">
            {selectedRoom?.recipient?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
