"use strict";

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//------- Chức năng  Register----------------------
// Lấy dữ liệu userArr từ LocalStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));
// => Sẽ trả về 1 mảng chứa các Instance của class User

console.log(userArr);

console.log(users);

// Hàm để chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,

    userData.pageSize,
    userData.category
  );
  return user; // Thể hiện của Class Instance
}

// --------Chức năng login----------------------------
//lưu thông tin user đăng nhập vào  biến currentUser
const currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

//------- Chức năng todoList---------------------------
//lấy dữ liệu todoArr từ LocalStorage
const tasks = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Mảng todoArr chứa các instance tượng trưng cho mỗi task
const todoArr = tasks.map((task) => parseTask(task));

// Hàm chuyển từ JS Oject sang Class Instance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

//-----------Lưu thông tin cài đặt vào biến settingNews
const settingNews = getFromStorage("settingNews")
  ? getFromStorage("settingNews")
  : [];
