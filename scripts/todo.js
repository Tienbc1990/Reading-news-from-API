"use strict";

const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");
// const closeElAll = document.querySelectorAll("#todo-list .close"); //////////////////////////////////////////////?????
const activeEl = document.querySelector(".active");
// const liEl = document.querySelectorAll("#todo-list li"); ?????? Tại sao đặt trên này lại ko chạy????????????????????

let totalResults = 0;
let country = "us";
let category = "General";
let pageSize = 10;
let page = 1;
let apiKey = "0fef0456ac0c4a739c8b111f3ae143e5";

// Xác nhận đăng nhập trước khi sử dụng ứng dụng
if (currentUser) {
  // Hiển thị nội dung todoList ở trang todo.html
  renderTodoList();
} else {
  alert(`🙂 Vui lòng đăng nhập hoặc đăng ký trước khi sử dụng ứng dụng!`);
  window.location.href = "../index.html";
}

// Bắt sự kiện nút Add
btnAdd.addEventListener("click", function () {
  // Khi click vào nút Add sẽ thêm nội dung việc cần làm vào trong todoList
  // Kiểm tra người dùng đã nhập task hay chưa?
  if (inputTask.value.trim().length === 0) {
    alert(`🙂 Vui lòng nhập nhiệm vụ!`);
    inputTask.focus();
  } else {
    // Kiểm tra task có bị trùng hay không
    let isConfirm = true;
    todoArr.forEach(function (todoItem) {
      if (todoItem.task === inputTask.value) {
        isConfirm = confirm(`⚠ Chú ý !!! Tên nhiệm vụ bị trùng lặp`);
        inputTask.focus(); // Đặt trỏ chuột ở trường inputTask
      }
    });

    if (isConfirm) {
      // Lấy dữ liệu todo qua form
      const task = new Task(inputTask.value, currentUser.userName, false);
      // Thêm task mới vào mảng todoArr
      todoArr.push(task);
      // Lưu dữ liệu xuống LocalStorage
      saveToStorage("todoArr", todoArr);
      // Hiển thị nội dung todoList
      renderTodoList();
      // Reset dữ liệu từ form nhập
      inputTask.value = "";
      // Đặt trỏ chuột ở trường inputTask
      inputTask.focus();
    }
  }
});

// Hàm hiển thị nội dung todoList
function renderTodoList() {
  let html = "";
  todoArr
    // Lọc ra các task của user đang đăng nhập
    .filter((todo) => todo.owner === currentUser.userName)
    // Hiển thị từng phần tử của mảng ra trình duyệt
    .forEach(function (todoArr) {
      html += `
      <li class=${todoArr.isDone ? "checked" : ""}>${
        todoArr.task
      }<span class="close">×</span></li>
      `;
    });
  todoList.innerHTML = html;

  //Gọi hàm kiểm tra task đã được hoàn thành hay chưa
  toggleTask();
  // //Gọi hàm xóa task
  deleteTask();
}

// Hàm toggle các nhiệm vụ
function toggleTask() {
  // bắt sự kiện toggle trên mỗi phần tử li
  // Chọn tất cả các phần tử li trong mảng được trả về và bắt sự kiện click
  document.querySelectorAll("#todo-list li").forEach(function (li) {
    li.addEventListener("click", function (event) {
      // Tránh việc click vào nút delete x
      if (event.target !== li.children[0]) {
        // toggle task được click
        li.classList.toggle("checked");

        // Tìm task vừa click xong
        const taskIsClicking = todoArr.find(
          (itemTodo) =>
            itemTodo.owner === currentUser.userName &&
            itemTodo.task === li.textContent.slice(0, -1)
        );

        // Thay đổi thuộc tính isDone
        taskIsClicking.isDone = li.classList.contains("checked") ? true : false;

        //Lưu vào LocalStorage
        saveToStorage("todoArr", todoArr);
      }
    });
  });
}

function deleteTask() {
  // Trả về 1 mảng chứa tất cả các NodeList của các nút delete và bắt sự kiện click trên từng phần tử đó
  document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
    closeEl.addEventListener("click", function () {
      // Xác nhận trước khi xóa
      const isDelete = confirm(
        `⚠ Bạn chắc chắn muốn xóa nhiệm vụ " ${closeEl.parentElement.textContent.slice(
          0,
          -1
        )} " ?`
      );

      if (isDelete) {
        // Tìm vị trí của task muốn xóa trong mảng todoArr
        const indexDelete = todoArr.findIndex(
          (itemTodo) =>
            // Kiểm tra tên user để xác định đúng user đang đăng nhập hay không?
            itemTodo.owner === currentUser.userName &&
            // Kiểm tra tên task và so sánh để tìm ra vị trí phần tử cần xóa trong mảng
            itemTodo.task === closeEl.parentElement.textContent.slice(0, -1)
        );

        // Xóa task
        todoArr.splice(indexDelete, 1);
        // Lưu dữ liệu xuống LocalStorage
        saveToStorage("todoArr", todoArr);
        // Hiển thị lại todoList
        renderTodoList();
      }
    });
  });
}
