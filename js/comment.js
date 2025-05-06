import {
  deleteCommentById,
  getAllComments,
  toggleDislike,
  toggleLike,
} from "./entity/comment.entity.js";
import { getUserByEmail } from "./entity/user.entity.js";

// Ensure user is logged in
const currentUserEmail = localStorage.getItem("currentUser");
if (!currentUserEmail) {
  alert("You must be logged in to view comments!");
  location.href = "../html/login.html";
}

async function loadComments() {
  const comments = await getAllComments();
  const postList = document.getElementById("postList");
  postList.innerHTML = ""; // Clear previous comments

  if (comments.length === 0) {
    postList.innerHTML = `<p style="text-align:center; width: 100%; color: white">Hiện tại chưa có bình luận nào!</p>`;
    return;
  }

  comments.forEach(async (comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "post";
    const user = await getUserByEmail(comment.created_by);
    if (!user) {
      // remove comment khong co user
      await deleteCommentById(comment.id);
      return;
    }
    const username = user.username;
    commentDiv.innerHTML = `
      <p><strong>${username}</strong></p>
      <p>${comment.comment}</p>
      <div>
        <button class="like-button" data-id="${comment.id}">Like (${
      comment.likes.length
    })</button>
        <button class="dislike-button" data-id="${comment.id}">Dislike (${
      comment.dislikes.length
    })</button>
        ${
          comment.created_by === currentUserEmail
            ? `<button class="delete-button" data-id="${comment.id}">Remove</button>`
            : ""
        }
      </div>
    `;

      



    postList.appendChild(commentDiv);
  });

  // Re-bind all event listeners after rendering
  document.querySelectorAll(".like-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await toggleLike(btn.dataset.id, currentUserEmail);
      loadComments();
    });
  });

  document.querySelectorAll(".dislike-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await toggleDislike(btn.dataset.id, currentUserEmail);
      loadComments();
    });
  });

  document.querySelectorAll(".delete-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await deleteCommentById(btn.dataset.id);
      loadComments();
    });
  });
}

// Load comments on DOM ready
document.addEventListener("DOMContentLoaded", loadComments);
