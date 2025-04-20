import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Cấu hình Firebase
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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sự kiện khi nhấn nút đăng nhập
document.getElementById("login-btn").addEventListener("click", function (e) {
  e.preventDefault();
  
  const email = document.getElementById("login_ten_nguoi_dung").value;
  const password = document.getElementById("login_password").value;

  if (!email || !password) {
    alert("Vui lòng nhập đủ thông tin!");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Lưu thông tin người dùng vào localStorage
      const userData = {
        email: user.email,
        displayName: user.displayName || "",
        uid: user.uid
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      alert("Đăng nhập thành công!");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Đăng nhập thất bại:", error);
      alert("Thông tin đăng nhập sai hoặc chưa đăng ký!");
    });
});
