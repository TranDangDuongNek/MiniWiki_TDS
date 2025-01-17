function validateRegisterForm(
    username,
    email,
    password,
    confirmPassword,
    errorElement
  ) {
    errorElement.textContent = ""; // Xóa thông báo lỗi trước đó
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (password !== confirmPassword) {
      errorElement.textContent = "Mật khẩu xác nhận không khớp!";
      errorElement.style.color = "red";
      return false;
    } else if (!(username && email && password && confirmPassword)) {
      errorElement.textContent = "Vui lòng điền đầy đủ thông tin!";
      errorElement.style.color = "red";
      return false;
    } else if (!emailRegex.test(email)) {
      errorElement.textContent = "Email không đúng định dạng!";
      errorElement.style.color = "red";
      return false;
    } else if (password.length < 6) {
      errorElement.textContent = "Mật khẩu phải từ 6 chữ số trở lên!";
      errorElement.style.color = "red";
      return false;
    } else {
      return true;
    }
  }
  
  function register() {
    // lay thong tin tu form dang ky (ben html)
    var username = document.getElementById("ten_nguoi_dung").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("xac_nhan_password").value;
    var errorElement = document.getElementById("error_message");
  
    // kiem tra thong tin nhap vao
    if (
      validateRegisterForm(
        username,
        email,
        password,
        confirmPassword,
        errorElement
      )
    ) {
      // kiem tra thong tin trung so voi thong tin tren he thong
      const duplicateUser = JSON.parse(localStorage.getItem(username));
      if (duplicateUser) {
        //  nguoi dung da dang ky hoac bi trung username
        alert(
          "Username đã tồn tại trên hệ thống! Nếu bạn đã đăng ký, vui lòng chuyển sang trang Đăng nhập!"
        );
        return; // ket thuc su kien
      } else {
        // luu nguoi dung vao local storage
        const newUser = {
          username: username,
          password: password,
          email: email,
        };
        localStorage.setItem(username, JSON.stringify(newUser));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        //   thong bao
        alert("Đăng ký thành công!");
        // chuyen trang index
        location.href = "../index.html";
      }
    }
  }
  
  // bat su kien cho nut dang ky trong form
  document.getElementById("register-btn").onclick = function (e) {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    register();
  };