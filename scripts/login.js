"use strict";

const inputUserName = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const btnSubmit = document.querySelector("#btn-submit");

// Mặc định trỏ chuột vào trường inputUserName
inputUserName.focus();

// Bắt sự kiện vào nút login
btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    // Tìm thông tin nhập vào xem có trùng với User đã có ở trong danh sách hay không
    const currentUser = userArr.find(
      (item) =>
        item.userName === inputUserName.value &&
        item.password === inputPassword.value
    );

    if (currentUser) {
      alert(`😃 Đăng nhập thành công!`);
      // Lưu thông tin vào LocalStorage
      saveToStorage("currentUser", currentUser);
      // Điều hướng về trang chủ
      window.location.href = "../index.html";
    } else {
      alert(`❌ Sai tên Username hoặc mật khẩu. Vui lòng nhập lại!`);
    }
  }
});

// Hàm validate dữ liệu
function validate() {
  let isValidate = true;
  //Check đã nhập userName hay chưa?
  if (inputUserName.value.trim().length === 0) {
    alert(`🙂 Xin vui lòng nhập User Name!`);
    isValidate = false;
    return isValidate;
  }
  //Check đã nhập password hay chưa?
  if (inputPassword.value === "") {
    alert(`🙂 Xin vui lòng nhập mật khẩu!`);
    isValidate = false;
    return isValidate;
  }
  return isValidate;
}
