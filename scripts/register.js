"use strict";

const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUserName = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputPasswordConfirm = document.querySelector("#input-password-confirm");
const btnSubmit = document.querySelector("#btn-submit");

// Bắt sự kiện ấn vào nút Register
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu từ người dùng nhập vào qua form
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );

  // Thêm hai thuộc tính cho instance user của class User sau khi đăng ký xong tại khoản
  // Đây cũng là cài đặt mặc định cho category và pageSize
  user.category = "General";
  user.pageSize = 10;

  const isValidate = validate(user);
  // Check dữ liệu đăng ký có hợp lệ không
  if (isValidate) {
    // Thêm user vào mảng userArr
    userArr.push(user);
    // Lưu dữ liệu vào LocalStorage
    saveToStorage("userArr", userArr);
    alert(`Đăng ký thành công !`);
    // Điều hướng sang trang login
    window.location.href = "../pages/login.html";

  }
});

// Hàm validate kiểm tra thông tin đăng ký người dùng nhập vào form
function validate(userArgument) {
  let isValidate = true;

  // Không có trường nào bị trống
  if (userArgument.firstName.trim().length === 0) {
    alert(`Vui lòng nhập First Name!`);
    isValidate = false;
    // focus giúp đặt con trỏ vào đúng trường cần nhập
    inputFirstName.focus();
    return isValidate;
  }

  if (userArgument.lastName.trim().length === 0) {
    alert(`Vui lòng nhập Last Name!`);
    isValidate = false;
    inputLastName.focus();
    return isValidate;
  }

  if (userArgument.userName.trim().length === 0) {
    alert(`Vui lòng nhập Username!`);
    isValidate = false;
    inputFirstName.focus();
    return isValidate;
  }

  if (
    !userArr.every((item) => item.userName !== userArgument.userName)

    // Nếu khác tên every sẽ trả về true, dùng toán tử phủ định để đảo ngược giá trị Boolean
    // Nếu trùng tên every() sẽ trả về false, dùng toán tử phủ định để đảo ngược giá trị Boolean
    /* Phương thức every duyệt qua các phần tử mảng userArr:
     Nếu TẤT CẢ thỏa mãn điều kiện sẽ trả về true và ngược lại
     Nếu ít nhất 1 trong các phần tử mảng KHÔNG thỏa mãn thì trả về false */
  ) {
    alert(`User Name đã tồn tại. Vui lòng chọn tên khác!`);
    isValidate = false;
    inputUserName.focus();
    return isValidate;
  }

  if (userArgument.password === "") {
    alert(`Vui lòng nhập password!`);
    isValidate = false;
    inputPassword.focus();
    return isValidate;
  }

  // Password phải có nhiều hơn 8 ký tự.
  if (userArgument.password.length <= 8) {
    alert(`Mật khẩu phải nhiều hơn 8 ký tự`);
    isValidate = false;
    inputPassword.focus();
    return isValidate;
  }

  if (inputPasswordConfirm.value === "") {
    alert(`Vui lòng xác nhận lại mật khẩu!`);
    isValidate = false;
    inputPasswordConfirm.focus();
    return isValidate;
  }

  // Password và Confirm Password phải giống nhau.
  if (userArgument.password !== inputPasswordConfirm.value) {
    alert(`Password và Password Confirm phải giống nhau!`);
    isValidate = false;
    inputPasswordConfirm.focus();
    return isValidate;
  }
  // }
  return isValidate;
}
