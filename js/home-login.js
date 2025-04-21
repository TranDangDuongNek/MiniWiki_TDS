// Lấy phần tử nút đăng nhập
const nutDangNhap = document.getElementById("nut-dang-nhap");

// Kiểm tra trạng thái người dùng
function checkCurrentUser(nut_dang_nhap) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        // 1. Đã đăng nhập
        nut_dang_nhap.innerText = "ĐĂNG XUẤT";

        // 2. Hiển thị lời chào
        const greeting = document.createElement("p");
        greeting.textContent = `👋 Xin chào, ${currentUser.displayName || currentUser.email}`;
        greeting.style.fontWeight = "bold";
        greeting.style.color = "#007BFF";
        greeting.style.margin = "10px";
        document.body.prepend(greeting); // Hiển thị đầu trang (bạn có thể chèn vào vị trí khác nếu muốn)

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

