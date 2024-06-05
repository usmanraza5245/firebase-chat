import React, { useEffect, useState } from "react";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../services/firebase";
import Header from "../components/Header";
import Contacts from "../components/Contacts";
import ChatHeader from "../components/ChatHeader";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import { useAuth } from "../context/AuthContext";
import { getUserChatRooms } from "../services/user";
import Loader from "../components/Loader";

function Chats() {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserRooms = async (id) => {
    try {
      const chatRooms = await getUserChatRooms(id);

      setRooms([...chatRooms]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.uid) {
      setLoading(true);
      getUserRooms(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!selectedRoom?.id) return;

    setMessages([]);
    let unsubscribe;

    const messagesCollectionRef = collection(
      db,
      "messages",
      selectedRoom?.id,
      "chatRooms"
    );
    const messageQuery = query(messagesCollectionRef, orderBy("createdAt"));
    unsubscribe = onSnapshot(messageQuery, (QuerySnapshot) => {
      const newMessages = [];
      QuerySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const message = {
            id: change.doc.id,
            ...change.doc.data(),
          };
          newMessages.push(message);
        }
      });
      // Add new messages to the state
      setMessages((prevMessages) => {
        // Remove any duplicate messages
        const allMessages = [...prevMessages, ...newMessages];
        const uniqueMessages = Array.from(
          new Set(allMessages.map((msg) => msg.id))
        ).map((id) => allMessages.find((msg) => msg.id === id));
        return uniqueMessages;
      });
    });

    return () => unsubscribe !== undefined && unsubscribe();
  }, [selectedRoom]);

  return (
    <>
      <div>
        <div className="w-full h-32 bg-indigo-500"></div>

        <div className="container mx-auto mt-[-128px]">
          <div className="p-10  h-screen">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex border border-grey rounded shadow-lg h-full">
                {/* <!-- Left --> */}
                <div className="w-1/3 border flex flex-col">
                  {/* <!-- Header --> */}
                  <Header
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setRooms={setRooms}
                    setLoading={setLoading}
                  />

                  {/* <!-- Search --> */}
                  <div className="py-2 px-2 bg-gray-200">
                    <input
                      type="text"
                      className="w-full px-2 py-2 text-sm rounded-full"
                      placeholder="Search or start new chat"
                    />
                  </div>

                  {/* <!-- Contacts --> */}
                  <Contacts
                    rooms={rooms}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                  />
                </div>

                {rooms?.length > 0 ? (
                  <div className="w-2/3 border flex flex-col">
                    {!!selectedRoom ? (
                      <>
                        {/* <!-- Chat Header --> */}
                        <ChatHeader selectedRoom={selectedRoom} />

                        {/* <!-- Messages --> */}
                        <Messages
                          messages={messages}
                          currentUser={currentUser}
                          selectedRoom={selectedRoom}
                        />

                        {/* <!-- Input --> */}
                        <MessageInput
                          selectedRoom={selectedRoom}
                          currentUser={currentUser}
                        />
                      </>
                    ) : (
                      <div
                        className="flex items-center justify-center bg-gray-200 h-full w-full"
                        style={{ backgroundColor: "rgb(218, 211, 204)" }}
                      >
                        <p>No chat selected</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-col bg-gray-200 h-full w-full">
                    <p>
                      You have no previsouly conversation. Click on Create New
                      Chat button to start
                    </p>
                    <br />
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Create New Chat
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chats;
