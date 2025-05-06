import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getUserByEmail } from "./entity/user.entity.js";
import { firebaseapp } from "./firebase.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("login_email");
  const passwordInput = document.getElementById("login_password");
  const errorMessage = document.getElementById("error_message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      errorMessage.textContent = "Vui lòng nhập đầy đủ thông tin!";
      return;
    }

    try {
      const auth = getAuth(firebaseapp);

      await signInWithEmailAndPassword(auth, email, password);

      const userData = await getUserByEmail(email);
      if (!userData) {
        errorMessage.textContent =
          "Tài khoản không tồn tại trong hệ thống người dùng.";
        return;
      }

      localStorage.setItem("currentUser", email);
      alert("Đăng nhập thành công!");
      location.href = "../index.html";
    } catch (err) {
      console.error(err);
      errorMessage.textContent = "Sai tài khoản hoặc mật khẩu!";
    }
  });
});
