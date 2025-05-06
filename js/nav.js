const isInsideHtml = location.href.includes("/html/");
const root = isInsideHtml ? "./" : "./html/";
const navHomeHref = isInsideHtml ? "../index.html" : "./index.html";
const loginHref = root + "login.html";

const currentUser = localStorage.getItem("currentUser");

const navLinks = {
  "nav-home": navHomeHref,
  "nav-video": root + "video.html",
  "nav-event": root + "event.html",
  "nav-tower": root + "tower.html",
  "nav-monster": root + "monster.html",
  "nav-comment": root + "comment.html",
};

document.addEventListener("DOMContentLoaded", () => {
  // Dynamically set hrefs
  Object.entries(navLinks).forEach(([id, href]) => {
    const linkEl = document.getElementById(id);
    if (linkEl) linkEl.href = href;
  });

  const loginButton = document.getElementById("nut-dang-nhap");
  const commentLink = document.getElementById("nav-comment");

  if (currentUser) {
    // ✅ User is logged in
    if (loginButton) {
      loginButton.textContent = "ĐĂNG XUẤT";
      loginButton.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        alert("Bạn đã đăng xuất.");
        location.href = loginHref;
      });
    }
  } else {
    // ❌ Not logged in
    if (loginButton) {
      loginButton.textContent = "ĐĂNG NHẬP";
      loginButton.addEventListener("click", () => {
        location.href = loginHref;
      });
    }

    // 🔒 Hide "COMMENT" link if not logged in
    if (commentLink) {
      commentLink.style.display = "none";
    }
  }
});
