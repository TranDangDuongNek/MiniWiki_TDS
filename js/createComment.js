import { addComment } from "./entity/comment.entity.js";

document.getElementById("postBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const commentContent = document.getElementById("content");
  const currentUserEmail = localStorage.getItem("currentUser");

  if (!currentUserEmail) {
    alert("Bạn phải đăng nhập để bình luận.");
    return;
  }

  if (!commentContent.value.trim()) {
    alert("Nội dung bình luận không được để trống.");
    return;
  }

  try {
    await addComment(currentUserEmail, commentContent.value.trim());
    alert("Bình luận đã được gửi!");
    commentContent.innerHTML = ""; // Clear the input field
    location.reload(); // Reload the page to see the new comment
  } catch (err) {
    console.error("Lỗi khi gửi bình luận:", err);
    alert("Đã xảy ra lỗi. Vui lòng thử lại.");
  }
});
