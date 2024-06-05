import React from "react";

function Contact({ isSelected, recipient, handleClick }) {
  return (
    <div
      className={`px-3 flex items-center  cursor-pointer ${
        isSelected ? "bg-indigo-200" : "bg-white hover:bg-grey-lighter"
      }`}
      onClick={handleClick}
    >
      <div>
        <img
          className="h-12 w-12 rounded-full"
          src={recipient?.photoURL}
          loading="lazy"
        />
      </div>
      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
        <div className="flex items-bottom justify-between">
          <p className="text-grey-darkest">{recipient?.displayName}</p>
          <p className="text-xs text-grey-darkest">12:45 pm</p>
        </div>
        <p className="text-grey-dark mt-1 text-sm">{recipient.email}</p>
      </div>
    </div>
  );
}

export default Contact;
