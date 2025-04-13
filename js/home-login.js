// Kiểm tra đã đăng nhập chưa?
function checkCurrentUser(nut_dang_nhap) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser) {
        // Người dùng đã đăng nhập
        nut_dang_nhap.onclick = function () {
            localStorage.removeItem("currentUser");
            location.href = "../index.html"; // <-- Sửa lại đường dẫn
        };
        nut_dang_nhap.innerText = "ĐĂNG XUẤT";
    } else {
        // Người dùng chưa đăng nhập
        nut_dang_nhap.onclick = function () {
            location.href = "../html/login.html"; // <-- Sửa lại đường dẫn
        };
        nut_dang_nhap.innerText = "ĐĂNG NHẬP";
    }
}

checkCurrentUser(document.getElementById("nut-dang-nhap"));
