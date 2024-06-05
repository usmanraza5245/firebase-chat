import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { attachRoomToUser } from "./user";
import moment from "moment";

export const createChatRoom = async (
  userId,
  recipientId,
  type = "personal"
) => {
  try {
    // Check if a personal chat room already exists between these two users
    const chatRoomsRef = collection(db, "chatRooms");
    const q = query(
      chatRoomsRef,
      where("type", "==", "personal"),
      where("users", "array-contains", userId)
    );

    const querySnapshot = await getDocs(q);

    let existingRoom = null;
    querySnapshot.forEach((doc) => {
      const room = doc.data();
      if (room.users.includes(recipientId)) {
        existingRoom = doc;
      }
    });

    if (existingRoom) {
      console.log("Chat room already exists:", existingRoom.id);
      return existingRoom;
    }

    // Create a new chat room if one does not exist
    const chatRoomData = {
      name: "Personal Chat",
      groupPhoto: "",
      type: type,
      users: [userId, recipientId],
      createdAt: new Date(),
    };

    const chatRoomRef = await addDoc(collection(db, "chatRooms"), chatRoomData);
    if (type === "personal") {
      await attachRoomToUser(userId, chatRoomRef.id);
      await attachRoomToUser(recipientId, chatRoomRef.id);
    }
    const chatRoomDoc = await getDoc(chatRoomRef);
    return { id: chatRoomDoc.id, ...chatRoomDoc.data() };
  } catch (error) {
    throw error;
  }
};

export const getAllChatRooms = async () => {
  try {
    const chatRoomsSnapshot = await getDocs(collection(db, "chatRooms"));
    const chatRooms = [];
    chatRoomsSnapshot.forEach((doc) => {
      chatRooms.push({ ...doc.data(), id: doc.id });
    });
    return chatRooms;
  } catch (error) {
    throw error;
  }
};

export const saveMessage = async (roomId, senderId, message) => {
  try {
    const messageData = {
      senderId,
      message,
      createdAt: new Date(),
    };
    // const messageCollectionRef = collection(db, "messages", roomId);
    const messageCollectionRef = collection(
      db,
      "messages",
      roomId,
      "chatRooms"
    );
    const newMessage = await addDoc(messageCollectionRef, messageData);

    return newMessage;
  } catch (error) {
    throw error;
  }
};
