// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, doc, deleteDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBCavUPw6x-jkKOQ3Byw7nC6SYj_gKERJU",
  authDomain: "du-an-event.firebaseapp.com",
  databaseURL: "https://du-an-event-default-rtdb.firebaseio.com",
  projectId: "du-an-event",
  storageBucket: "du-an-event.appspot.com",  // ✅ Sửa đúng format
  messagingSenderId: "13117099421",
  appId: "1:13117099421:web:5ca7d61dd8db63301f3374",
  measurementId: "G-TXSLRKM3W6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const postBtn = document.getElementById('postBtn');
const contentEl = document.getElementById('content');
const imageInput = document.getElementById('imageInput');
const postList = document.getElementById('postList');

let currentUser = null;
let storedUser = JSON.parse(localStorage.getItem("currentUser"));  // ✅ lấy user từ localStorage nếu có

// Kiểm tra người dùng đăng nhập
onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    loadPosts();
  } else {
    alert("Vui lòng đăng nhập để đăng bài.");
  }
});

postBtn.onclick = async () => {
  const content = contentEl.value.trim();
  const file = imageInput.files[0];

  if (!content && !file) return alert("Bạn phải viết nội dung hoặc tải ảnh lên!");

  let imageUrl = "";
  if (file) {
    const imgRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    await uploadBytes(imgRef, file);
    imageUrl = await getDownloadURL(imgRef);
  }

  await addDoc(collection(db, "blogs"), {
    content,
    imageUrl,
    userID: currentUser?.uid || null,
    username: storedUser?.username || currentUser?.displayName || "Ẩn danh", // ✅ Ưu tiên localStorage
    createdAt: serverTimestamp(),
    likes: 0,  // Thêm trường likes
    dislikes: 0  // Thêm trường dislikes
  });

  contentEl.value = "";
  imageInput.value = "";
  loadPosts();
};

// Hàm thêm các nút Like, Dislike và Delete vào mỗi post
async function loadPosts() {
  postList.innerHTML = "";
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const post = doc.data();
    const postId = doc.id; // Lấy ID của post

    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <p><strong>${post.username}</strong></p>
      <p>${post.content}</p>
      ${post.imageUrl ? `<img src="${post.imageUrl}">` : ""}
      <div>
        <button class="like-button" onclick="likePost('${postId}')">Like (${post.likes || 0})</button>
        <button class="dislike-button" onclick="dislikePost('${postId}')">Dislike (${post.dislikes || 0})</button>
        <button class="delete-button" onclick="deletePost('${postId}')">Xóa</button>
      </div>
    `;
    postList.appendChild(div);
  });
}

// Thêm lượt like
async function likePost(postId) {
  try {
    const postRef = doc(db, "blogs", postId);
    await updateDoc(postRef, {
      likes: increment(1)
    });
    console.log(`Liked post with ID: ${postId}`);
    loadPosts();  // Cập nhật lại danh sách bài viết
  } catch (error) {
    console.error("Error liking post: ", error);
  }
}

// Thêm lượt dislike
async function dislikePost(postId) {
  try {
    const postRef = doc(db, "blogs", postId);
    await updateDoc(postRef, {
      dislikes: increment(1)
    });
    console.log(`Disliked post with ID: ${postId}`);
    loadPosts();  // Cập nhật lại danh sách bài viết
  } catch (error) {
    console.error("Error disliking post: ", error);
  }
}

// Xóa bài viết
async function deletePost(postId) {
  try {
    const postRef = doc(db, "blogs", postId);
    await deleteDoc(postRef);
    console.log(`Deleted post with ID: ${postId}`);
    loadPosts();  // Cập nhật lại danh sách bài viết sau khi xóa
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
}
