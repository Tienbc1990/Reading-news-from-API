"use strict";

const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");

const newsContainer = document.getElementById("news-container");
const navPageNum = document.getElementById("nav-page-num");
const pageNum = document.getElementById("page-num");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

let totalResults = 0;
let keywords = "";
navPageNum.style.display = "none";

let country = "us";
let category = "General";
let page = 1;
let apiKey = "09be35c66d914a3b9097717822264d69";

// Xác nhận đăng nhập trước khi sử dụng ứng dụng
if (!currentUser) {
  alert(`🙂 Vui lòng đăng nhập hoặc đăng ký trước khi sử dụng ứng dụng!`);
  window.location.href = "../index.html";
}

// Bắt sự kiện click vào nút Search
btnSubmit.addEventListener("click", function () {
  // Hiển thị trang đầu của tìm kiếm
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";

  // Kiểm tra xem người dùng đã nhập từ khóa chưa?
  if (inputQuery.value.trim().length === 0) {
    // Ẩn nút chuyển trạng thái nếu chưa nhập từ khóa
    navPageNum.style.display = "none";
    alert(`🙂 Vui lòng nhập từ khóa bạn muốn tìm kiếm!`);
  } else {
    keywords = inputQuery.value;

    // Hiển thị trang 1 của kết quả tìm kiếm
    getDataNewsByKeywords(keywords, currentUser.pageSize, page);
  }
});

// Hàm lấy dữ liệu từ API và hiển thị ra màn hình
async function getDataNewsByKeywords(keywords, pageSize, page) {
  try {
    // Dùng hàm fetch lấy dữ liệu từ API, hàm sẽ trả về 1 Promise
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=${apiKey}`
    );

    const data = await res.json();
    console.log(data);

    // Nếu không tìm thấy bài viết nào thì hiển thị thông báo
    if (data.totalResults == 0) {
      // Ẩn các nút chuyển trang
      navPageNum.style.display = "none";
      throw new Error(
        `😥 Không có bài viết phù hợp với từ khóa tìm kiếm. Vui lòng thử lại!`
      );
    }

    // Hiển thị số trang page
    pageNum.textContent = page;

    // Hiển thị danh sách các tin tức được trả về từ API
    displayNewsList(data);

    // Hiển thị các nút chuyển trang nếu dữ liệu trả về thành công
    navPageNum.style.display = "block";
  } catch (err) {
    //thông báo lỗi
    alert("Error:" + err.message);
    console.error(`${err}`);
  }
}

//  Hàm hiển thị danh sách các tin tức
function displayNewsList(data) {
  totalResults = data.totalResults;

  let html = "";

  // Duyệt qua từng oject trong mảng data.articles và hiển thị chúng
  data.articles.forEach(function (article) {
    html += `
        <div class="card mb-3" style="">
            <div class="row no-gutters">
            
              <div class="col-md-4">
                <img src=${
                  article.urlToImage
                    ? article.urlToImage
                    : "../no_image_available.jpg"
                } 
                  class="card-img"
                  alt="image" >
              </div>
              
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${
                    article.title ? article.title : "Không tìm thấy tiêu đề"
                  }</h5>
                  <p class="card-text">${
                    article.description
                      ? article.description
                      : "Không thể hiển thị nội dung tin tức "
                  }</p>
                  <a href=${article.url} target="_blank">View</a>
                </div>
              </div>
              
            </div>
          </div>
        `;
  });

  newsContainer.innerHTML = html;

  // Nếu đang ở page 1 thì ẩn nút Previous(btnPrev)
  checkBtnPrev();
  // Nếu đang ở page cuối thì ẩn nút next (btnNext)
  checkBtnNext();
}

// Hàm ẩn hiện nút Previous
function checkBtnPrev() {
  if (page == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}

// Hàm ẩn hiện nút Next
function checkBtnNext() {
  if (page == Math.ceil(totalResults / currentUser.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

// Bắt sự kiến click vào nút Next
btnNext.addEventListener("click", function () {
  // Số trang sẽ tăng lên 1 sau mỗi lần click
  page = ++pageNum.textContent;
  console.log(page);
  getDataNewsByKeywords(keywords, currentUser.pageSize, page);
  console.log(page);
  console.log(pageNum.textContent);
});

// Bắt sự kiến click vào nút Previous
btnPrev.addEventListener("click", function () {
  // Số trang sẽ giảm xuống 1 sau mỗi lần click
  page = --pageNum.textContent;
  getDataNewsByKeywords(keywords, currentUser.pageSize, page);
});
