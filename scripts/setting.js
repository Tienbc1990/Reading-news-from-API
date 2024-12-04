"use strict";

const btnSubmit = document.getElementById("btn-submit");
const inputCategory = document.getElementById("input-category");
const inputPageSize = document.getElementById("input-page-size");

let totalResults = 0;
let country = "us";
let category = "General";
let pageSize = 10;
let page = 1;
let apiKey = "09be35c66d914a3b9097717822264d69";

if (!currentUser) {
  alert(`🙂 Vui lòng đăng nhập hoặc đăng ký trước khi sử dụng ứng dụng!`);
  window.location.href = "../index.html";
}

// Bắt sự kiện vào nút Save Settings
btnSubmit.addEventListener("click", function () {
  if (validate()) {
    // Cập nhật lại currentUser
    currentUser.pageSize = inputPageSize.value;
    currentUser.category = inputCategory.value;
    saveToStorage("currentUser", currentUser);

    // Tìm vị trí của User đang đăng nhập
    const index = userArr.findIndex(
      (itemUser) => itemUser.userName === currentUser.userName
    );

    // Cập nhật lại mảng userArr
    userArr[index] = currentUser;

    // Cập nhật xuống LocalStorage
    saveToStorage("userArr", userArr);
    alert(`😃 Cài đặt thành công!`);

    //Reset lại form nhập
    inputCategory.value = `${currentUser.category}`;
    inputPageSize.value = "";
  }
});

// Hàm validate dữ liệu nhập vào form setting
const validate = function validateSetting() {
  let isValidate = true;
  if (isNaN(parseInt(inputPageSize.value))) {
    alert(`😐 PageSize KHÔNG được để trống!`);
    isValidate = false;
    inputPageSize.focus();
  } else if (Number.parseInt(inputPageSize.value) <= 0) {
    alert(`😐 PageSize phải lớn hơn 0  !`);
    isValidate = false;
    inputPageSize.focus();
  }

  return isValidate;
};
