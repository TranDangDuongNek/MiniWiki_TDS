import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
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

function validateForm(username, email, password, confirmPassword, errorElement) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  errorElement.textContent = "";

  if (!username || !email || !password || !confirmPassword) {
    errorElement.textContent = "Vui lòng điền đầy đủ thông tin!";
    return false;
  } else if (!emailRegex.test(email)) {
    errorElement.textContent = "Email không đúng định dạng!";
    return false;
  } else if (password.length < 6) {
    errorElement.textContent = "Mật khẩu phải từ 6 chữ số trở lên!";
    return false;
  } else if (password !== confirmPassword) {
    errorElement.textContent = "Mật khẩu xác nhận không khớp!";
    return false;
  }
  return true;
}

document.getElementById("register-btn").addEventListener("click", async function (e) {
  e.preventDefault();
  const username = document.getElementById("ten_nguoi_dung").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("xac_nhan_password").value;
  const errorElement = document.getElementById("error_message");

  if (validateForm(username, email, password, confirmPassword, errorElement)) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      });

      alert("Đăng ký thành công!");
      window.location.href = "../index.html";
    } catch (error) {
      errorElement.textContent = "Đăng ký thất bại: " + error.message;
      errorElement.style.color = "red";
    }
  }
});
