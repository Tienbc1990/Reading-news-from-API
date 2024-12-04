"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const content = document.querySelector("#content h2");
const paginationNew = document.getElementById("paginationNew");
const listPageItem = document.querySelector("#listPageItem");

let totalResults = 0;
let country = "us";
let category = "General";
let page = 1;
let apiKey = "09be35c66d914a3b9097717822264d69";

// Xác nhận đăng nhập trước khi sử dụng ứng dụng
if (currentUser) {
  // Chỉ hiện thị loạt trang thứ nhất khi người dùng bắt đầu vào ứng dụng xem tin tức
  getDataNews(country, currentUser.category, currentUser.pageSize);
} else {
  alert(`🙂 Vui lòng đăng nhập hoặc đăng ký trước khi sử dụng ứng dụng!`);
  window.location.href = "../index.html";
}

/* Hàm lấy dữ liệu tin tức từ API và hiển thị ra ứng dụng */
async function getDataNews(country, category, pageSize) {
  try {
    // Dùng hàm fetch lấy dữ liệu từ API, hàm sẽ trả về 1 Promise
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=${apiKey}`
    );

    const data = await res.json();
    console.log(data);

    // Hiển thị danh sách các tin tức
    displayNewsList(data);
  } catch (err) {
    //thông báo lỗi
    alert("Error:" + err.message);
    console.error(`${err}`);
  }
}

// Hàm hiển thị danh sách các tin tức
function displayNewsList(data) {
  totalResults = data.totalResults;

  // Hiển thị đề mục tin tức theo các Category được chọn ở phần setting
  content.textContent = `${currentUser.category} news`;

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

  // Hiển thị các trang pageItem (1,2,3....)
  getPageItem();

  // Nếu đang ở page 1 thì ẩn nút Previous(btnPrev)
  checkBtnPrev();
  // Nếu đang ở page cuối thì ẩn nút next (btnNext)
  checkBtnNext();
}

// Hàm thêm các pageItem
function getPageItem() {
  const li = document.createElement("li");
  li.classList.add("page-item");
  li.style.display = "flex";
  for (let i = 1; i <= Math.ceil(totalResults / currentUser.pageSize); i++) {
    i == page
      ? (li.innerHTML += `
    <a
      class="page-link active"
    >
      ${i}
    </a>
    `)
      : (li.innerHTML += `
    <a
    class="page-link"
    >
      ${i}
    </a>
    `);
  }

  listPageItem.innerHTML = "";
  // Chèn thẻ li được tạo ra vào giữa 2 nút Prev và Next
  listPageItem.insertBefore(li, listPageItem.lastElementChild);

  // Biến aPageLink lưu 1 mảng tất cả các NodeList của các thẻ a có class page-link
  const aPageLink = document.querySelectorAll("a.page-link");

  // Thêm sự kiện click vào các nút a
  aPageLink.forEach((alink) => {
    alink.addEventListener("click", function () {
      // page = parseInt(this.textContent); //Cập nhật trang hiện tại
      console.log(this.innerHTML);
      page = Number(this.innerHTML);
      getDataNews(country, currentUser.category, currentUser.pageSize);
    });
  });
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
  page++;
  getDataNews(country, currentUser.category, currentUser.pageSize);
});

// Bắt sự kiến click vào nút Previous
btnPrev.addEventListener("click", function () {
  // Số trang sẽ giảm xuống 1 sau mỗi lần click
  page--;
  getDataNews(country, currentUser.category, currentUser.pageSize);
});
