import { firestore } from "../firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; // Use full Firestore SDK

// User constructor (no cart)
export default function User(email, username) {
  this.email = email;
  this.username = username;
  return { ...this };
}

// Local cache
let users = [];

// Add new user
export async function addUser(email, username) {
  const usersRef = collection(firestore, "users"); // Full Firestore SDK works here
  const userData = new User(email, username);
  try {
    await addDoc(usersRef, userData);
    console.log(`User ${email} created.`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

// Get a user by email (with document ID)
export async function getUserByEmail(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email)); // Full Firestore SDK works here
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such user!");
    return null;
  }
}

// Get all users with document IDs
export async function getAllUsers() {
  const q = collection(firestore, "users"); // Full Firestore SDK works here
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } else {
    console.log("No users found!");
    return null;
  }
}