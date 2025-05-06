import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { addUser } from "./entity/user.entity.js";
import { firebaseapp } from "./firebase.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm_password");
  const errorMessage = document.getElementById("error_message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      errorMessage.textContent = "Vui lòng nhập đầy đủ thông tin!";
      return;
    }

    if (password.length < 6) {
      errorMessage.textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.textContent = "Mật khẩu xác nhận không khớp!";
      return;
    }

    try {
      await addUser(email, username);
      const auth = getAuth(firebaseapp);
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Đăng ký thành công! Bạn có thể đăng nhập.");
      location.href = "./login.html";
    } catch (err) {
      console.error(err);
      errorMessage.textContent = "Email đã được sử dụng hoặc có lỗi xảy ra!";
    }
  });
});
