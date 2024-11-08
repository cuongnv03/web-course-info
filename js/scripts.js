var hrefArray = {
  courseInfo: {
    '#classInfo': 'Thông tin khai giảng',
    '#seminar': 'Thông tin Seminar',
    '#company': 'Thông tin công ty quan tâm',
  },
  info: {
    '#summaryVN': 'Mô tả tóm tắt học phần (tiếng Việt) (*)',
    '#summaryEN': 'Mô tả tóm tắt học phần (tiếng Anh) (*)',
    '#contentVN': 'Nội dung tóm tắt học phần(*)',
  },
  'web-tech': {
    '#frontend': '1. Frontend (Giao diện người dùng)',
    '#backend': '2. Backend (Máy chủ và xử lý dữ liệu)',
  },
  'student-info': {
    '#user-info': 'Thông tin cá nhân',
    '#project-info': 'Dự án đã tham gia',
    '#act-info': 'Hoạt động cộng đồng',
  },
};

function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.w3-container');
  sections.forEach((section) => section.classList.add('hidden'));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.w3-bar-item');
  buttons.forEach((button) => button.classList.remove('active'));

  // Show selected section
  document.getElementById(sectionId).classList.remove('hidden');

  const sidebar = document.getElementById('mySidebar');
  sidebar.innerHTML = `<h4 class="w3-bar-item"><b>Menu</b></h4>`;

  // Tạo sidebar dựa trên hrefArray
  if (hrefArray[sectionId]) {
    $.each(hrefArray[sectionId], function (href, text) {
      sidebar.innerHTML += `<a class="w3-bar-item w3-button w3-hover-black" href="${href}">${text}</a>`;
    });
  }

  // Add active class to clicked button
  event.target.classList.add('active');
}

// Khởi động với nội dung mặc định khi trang load
window.onload = function () {
  showContent('courseInfo');
};
