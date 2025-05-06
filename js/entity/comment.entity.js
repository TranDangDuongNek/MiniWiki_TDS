import { firestore } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Constructor for comment
export function Comment(email, comment, likes = [], dislikes = []) {
  this.created_by = email;
  this.created_at = new Date().toISOString();
  this.comment = comment;
  this.likes = likes;
  this.dislikes = dislikes;
  return { ...this };
}

// Add a new comment
export async function addComment(email, commentText) {
  const commentRef = collection(firestore, "comments");
  const commentData = new Comment(email, commentText);

  try {
    const docRef = await addDoc(commentRef, commentData);
    const commentId = docRef.id;

    await setDoc(docRef, { ...commentData, comment_id: commentId });

    console.log("Comment added with ID:", commentId);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

// Get all comments
export async function getAllComments() {
  try {
    const q = query(
      collection(firestore, "comments"),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);

    const commentList = [];
    querySnapshot.forEach((docSnap) => {
      commentList.push({ id: docSnap.id, ...docSnap.data() });
    });

    console.log(commentList)
    return commentList;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    return [];
  }
}


// Get all comments by user email
export async function getCommentsByEmail(email) {
  try {
    const q = query(
      collection(firestore, "comments"),
      where("created_by", "==", email)
    );
    const querySnapshot = await getDocs(q);

    const commentList = [];
    querySnapshot.forEach((docSnap) => {
      commentList.push({ id: docSnap.id, ...docSnap.data() });
    });

    return commentList;
  } catch (error) {
    console.error("Error fetching comments by email:", error);
    return [];
  }
}

// Delete comment by ID
export async function deleteCommentById(commentId) {
  try {
    const commentRef = doc(firestore, "comments", commentId);
    await deleteDoc(commentRef);
    console.log("Comment deleted successfully:", commentId);
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}

// Toggle like by user email
export async function toggleLike(commentId, userEmail) {
  try {
    const commentRef = doc(firestore, "comments", commentId);
    const snapshot = await getDoc(commentRef);

    if (!snapshot.exists()) {
      console.error("Comment not found:", commentId);
      return;
    }

    const data = snapshot.data();
    let likes = data.likes || [];
    let dislikes = data.dislikes || [];

    // Toggle like functionality
    if (likes.includes(userEmail)) {
      likes = likes.filter((email) => email !== userEmail);
    } else {
      likes.push(userEmail);
      dislikes = dislikes.filter((email) => email !== userEmail); // Remove from dislikes if liked
    }

    await updateDoc(commentRef, { likes, dislikes });
    console.log("Like toggled by:", userEmail);
  } catch (err) {
    console.error("Error toggling like:", err);
  }
}

// Toggle dislike by user email
export async function toggleDislike(commentId, userEmail) {
  try {
    const commentRef = doc(firestore, "comments", commentId);
    const snapshot = await getDoc(commentRef);

    if (!snapshot.exists()) {
      console.error("Comment not found:", commentId);
      return;
    }

    const data = snapshot.data();
    let dislikes = data.dislikes || [];
    let likes = data.likes || [];

    // Toggle dislike functionality
    if (dislikes.includes(userEmail)) {
      dislikes = dislikes.filter((email) => email !== userEmail);
    } else {
      dislikes.push(userEmail);
      likes = likes.filter((email) => email !== userEmail); // Remove from likes if disliked
    }

    await updateDoc(commentRef, { dislikes, likes });
    console.log("Dislike toggled by:", userEmail);
  } catch (err) {
    console.error("Error toggling dislike:", err);
  }
}
