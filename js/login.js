function validateLoginForm(username, password) {
    // Kiểm tra xem username và password có được nhập đầy đủ không
    if (!username || !password) {
        alert("Vui lòng nhập đủ thông tin!");
        return false;
    }
    return true; // Trả về true nếu tất cả đều hợp lệ
}

function login() {
    // Lấy dữ liệu từ các trường đăng nhập trong HTML
    const username = document.getElementById("login_ten_nguoi_dung");
    const password = document.getElementById("login_password");
    
    // Kiểm tra dữ liệu nhập vào
    if (validateLoginForm(username.value, password.value)) {
        // Kiểm tra thông tin đăng nhập với thông tin trên hệ thống
        const user = JSON.parse(localStorage.getItem(username.value));
        if (!user) {
            // khoan tim thay nguoi dung tren he thong
            alert(
                "Thông tin chưa chính xác. Nếu bạn chưa có tài khoản, đăng ký ngay!"
            );
        } else {
            // thông báo đăng nhập thành công
            alert("Đăng nhập thành công!");
            // Lưu người dùng -> current user
            localStorage.setItem("currentUser", JSON.stringify(user));
            // chuyển về trang index
            location.href = "../index.html";
        }
    }
}
        
        // bat su kien cho nut Login trong form
        document.getElementById("login-btn").onclick = function (e) {
            // chặn luồng xử lý mặc định từ form
            e.preventDefault();
            login();
        };
        
