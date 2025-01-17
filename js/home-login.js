// Kiểm tra đã đăng nhập chưa?
function checkCurrentUser(nut_dang_nhap) {
    // Lấy thông tin từ local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser) {
        // Người dùng đã đăng nhập
        // Bắt sự kiện cho nút đăng xuất
        nut_dang_nhap.onclick = function () {
            // Xóa current user trên local storage
            localStorage.removeItem("currentUser");
            // Chuyển lại trang index
            location.href = "./index.html"; // Chuyển hướng đến trang index
        };
        
        // Đổi text cho nút đăng nhập
        nut_dang_nhap.innerText = "ĐĂNG XUẤT";
    } else {
        // Người dùng chưa đăng nhập
        // Bắt sự kiện cho nút đăng nhập -> trang đăng nhập
        nut_dang_nhap.onclick = function () {
            location.href = "./html/login.html"; // Chuyển đến trang đăng nhập
        };
        
        // Đổi text cho nút đăng nhập
        nut_dang_nhap.innerText = "ĐĂNG NHẬP";
    }
}
checkCurrentUser(document.getElementById("nut-dang-nhap"))
