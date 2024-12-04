"use strict";

// Class User để đại diện cho thông tin người dùng
class User {
  constructor(firstName, lastName, userName, password, pageSize, category) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;

    this.pageSize = pageSize;
    this.category = category;
  }
}

// Class Task chứa thông tin về các task trong todoList
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
