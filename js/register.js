import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCavUPw6x-jkKOQ3Byw7nC6SYj_gKERJU",
  authDomain: "du-an-event.firebaseapp.com",
  databaseURL: "https://du-an-event-default-rtdb.firebaseio.com",
  projectId: "du-an-event",
  storageBucket: "du-an-event.firebasestorage.app",
  messagingSenderId: "13117099421",
  appId: "1:13117099421:web:5ca7d61dd8db63301f3374",
  measurementId: "G-TXSLRKM3W6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("register-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
  const errorElement = document.getElementById("error_message");

  // Kiểm tra hợp lệ
  if (!username || !email || !password || !confirmPassword) {
    errorElement.textContent = "Vui lòng điền đầy đủ thông tin!";
    return;
  } else if (password !== confirmPassword) {
    errorElement.textContent = "Mật khẩu xác nhận không khớp!";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // ✅ Cập nhật displayName bằng username
      await updateProfile(user, {
        displayName: username
      });

      // ✅ Lưu vào localStorage
      localStorage.setItem("currentUser", JSON.stringify({
        email: user.email,
        uid: user.uid,
        username: username
      }));

      alert("Đăng ký thành công!");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      errorElement.textContent = "Lỗi đăng ký: " + error.message;
    });
});
