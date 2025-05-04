






























// Lấy phần tử nút đăng nhập
const nutDangNhap = document.getElementById("nut-dang-nhap");

// Kiểm tra trạng thái người dùng
function checkCurrentUser(nut_dang_nhap) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        // 1. Đã đăng nhập
        nut_dang_nhap.innerText = "ĐĂNG XUẤT";



        // 3. Khi bấm nút thì đăng xuất
        nut_dang_nhap.onclick = function () {
            localStorage.removeItem("currentUser");
            location.href = "../index.html"; // Quay về trang chính
        };
    } else {
        // Chưa đăng nhập
        nut_dang_nhap.innerText = "ĐĂNG NHẬP";
        nut_dang_nhap.onclick = function () {
            location.href = "../html/login.html";
        };
    }
}

// Gọi hàm để chạy
checkCurrentUser(nutDangNhap);

