import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Make sure this import is correct

export const createUser = async (user, uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await setDoc(userDocRef, user);
    return userDoc;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (uid, updatedUserData) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, updatedUserData);
    console.log("user information updated....");
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      return { id: userDocRef?.id, ...userDocSnapshot.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    return users;
  } catch (error) {
    throw error;
  }
};

export const attachRoomToUser = async (userId, roomId) => {
  try {
    const userChatRoomDocRef = doc(db, "users", userId, "chatRooms", roomId);
    const userChatRoomDoc = await setDoc(userChatRoomDocRef, {
      joinedAt: new Date(),
    });
    return userChatRoomDoc;
  } catch (error) {
    throw error;
  }
};

export const getUserChatRooms = async (userId) => {
  try {
    const chatRooms = [];

    const chatRoomCollectionRef = collection(db, "users", userId, "chatRooms");

    const chatRoomQuery = query(chatRoomCollectionRef);

    const chatRoomSnapshot = await getDocs(chatRoomQuery);

    const chatRoomPromise = chatRoomSnapshot.docs.map(async (chatRoom) => {
      const chatRoomId = chatRoom.id;
      const chatRoomDocRef = doc(db, "chatRooms", chatRoomId);
      const chatRoomData = await getDoc(chatRoomDocRef);
      chatRooms.push({ ...chatRoomData.data(), id: chatRoomId });
    });

    await Promise.allSettled(chatRoomPromise);

    const usersWithChatRoom = chatRooms.map(async (chatRoom) => {
      const recipientId = chatRoom.users.find((user) => user !== userId);

      const recipientDocRef = doc(db, "users", recipientId);
      const recipientDoc = await getDoc(recipientDocRef);
      const recipient = { ...recipientDoc.data(), id: recipientId };
      return { ...chatRoom, recipient };
    });

    const chatRoomsWithRecipient = (
      await Promise.allSettled(usersWithChatRoom)
    ).map((chatRoom) => chatRoom.value);
    return chatRoomsWithRecipient;
  } catch (error) {
    throw error;
  }
};
