"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Gọi hàm hiển thị trang Homepage
displayHomePage();

// Hàm hiển thị trang Homepage
function displayHomePage() {
  // Kiểm tra xem đã có đăng nhập chưa qua biến currentUser
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Wellcome ${currentUser.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

// Bắt sự kiện click nút Logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn chắc chắn muốn Logout chứ?");
  if (isLogout) {
    localStorage.removeItem("currentUser");
    window.location.href = "../pages/login.html";
  }
});
