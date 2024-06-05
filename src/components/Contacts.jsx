import React from "react";
import Contact from "./Contact";

function Contacts({ rooms, selectedRoom, setSelectedRoom }) {
  const handleContactClick = (room) => {
    if (!selectedRoom?.id || selectedRoom?.id !== room.id) {
      setSelectedRoom(room);
    }
  };
  return (
    <div className="bg-gray-200 flex-1 overflow-auto">
      {rooms?.map((room) => (
        <Contact
          recipient={room.recipient}
          key={room.id}
          isSelected={room?.id === selectedRoom?.id}
          handleClick={() => handleContactClick(room)}
        />
      ))}
    </div>
  );
}

export default Contacts;
