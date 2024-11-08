$(document).ready(function () {
  var contentGridArray = {};
  var studentDefault = {};
  studentDefault['#student-info'] = $('#student-info').html();

  var defaultTitle = 'Thông tin sinh viên';
  var defaultHref = {
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

  $('.menu-admin-page').click(function () {
    $('.admin-page-content').show();
    $('#editContent').hide();
    $('#mySidebar a').removeClass('active');
    $('#admin-page .table-menu-item').empty();
    $('#admin-page .table-content-item').empty();
    $('.demo-grid').remove();
    $('#admin-page #table-info').show();
    $('.btn-reset').remove();
    $('.btn-first-menu').hide();
    $('.btn-first-content').hide();

    contentGridArray = [];
  });
  $('.admin-page-content').on('click', '.action', function () {
    var id = $(this).attr('data-id');
    var menuContentId = $(this).siblings('th').attr('class');
    var menuClass = 'menu-' + menuContentId;
    contentMenu = $(this).siblings('th').text();
    $('.modal form').attr('data-class', menuContentId);

    if (id == 'delete') {
      $('.' + menuClass).hide();
      $(this).parent('tr').remove();
      $('#' + menuContentId).remove();
    }

    if (id == 'edit') {
      $('#edit-form input').val(contentMenu);
    }

    if (id == 'view') {
      console.log(hrefArray);
      showContent(menuContentId);
      var menuContent = {};

      $('#mySidebar a').each(function () {
        var href = $(this).attr('href');
        var text = $(this).text();
        menuContent[href] = text;
      });

      //Lấy danh sách sidebar item
      hrefArray[menuContentId] = menuContent;

      // console.log(hrefArray)
      showContent('admin-page');

      $('#mySidebar').empty();
      var sidebarContent =
        '<h4 class="w3-bar-item"><b>' + contentMenu + '</b></h4>';
      var newRowTable = '';

      $.each(hrefArray[menuContentId], function (href, text) {
        sidebarContent +=
          '<a class="w3-bar-item w3-button w3-hover-black" href="' +
          href +
          '">' +
          text +
          '</a>';
        var newClass = href.replace(/^#/, '');
        newRowTable +=
          '<tr>' +
          '<th class="' +
          newClass +
          '">' +
          text +
          '</th>' +
          '<td class="action-sidebar" data-id="view-sidebar"><i class="fa-solid fa-eye"></i></td>' +
          '<td class="action-sidebar" data-id="edit-sidebar" data-bs-toggle="modal" data-bs-target="#editModalSidebar"><i class="fa-solid fa-pen"></i></td>' +
          '<td class="action-sidebar" data-id="delete-sidebar"><i class="fa-solid fa-trash-can"></i></td>' +
          '<td class="action-sidebar" data-id="add-sidebar" data-bs-toggle="modal" data-bs-target="#addModalSidebar"><i class="fa-solid fa-plus"></i></td>' +
          '</tr>';
      });
      $('#admin-page .table-menu-item').html(newRowTable);
      $('#admin-page .table-menu-item').attr('data-table', menuContentId);

      if (menuContentId == 'student-info') {
        var btnReset =
          '<div class ="d-flex mt-3 justify-content-end btn-reset">' +
          '<button class="btn btn-danger">Reset</button>' +
          '</div>';

        $('#admin-page .container').append(btnReset);
      }

      $('#admin-page #table-info').hide();
      $('#mySidebar').html(sidebarContent);

      if (Object.keys(hrefArray[menuContentId]).length === 0) {
        $('.btn-first-menu').show();
      }

      $(this).removeClass('active');
      $(this).children('i').removeClass('active');
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    formId = $(this).attr('id');
    formClass = $(this).attr('data-class');
    if (formId == 'edit-form') {
      var newMenu = $('#edit-form input').val();
      if (newMenu.trim() !== '') {
        $('th.' + formClass).text(newMenu);
        $('.menu-' + formClass).text(newMenu);
      }
      $('.btn-close-model').click();
    }

    if (formId == 'add-form') {
      var newMenu = $('#add-form input').val();
      var randomString = generateRandomString(8);
      if (newMenu.trim() !== '') {
        var newRowTable =
          '<tr>' +
          '<th class="' +
          randomString +
          '">' +
          newMenu +
          '</th>' +
          '<td class="action" data-id="view"><i class="fa-solid fa-eye"></i></td>' +
          '<td class="action" data-id="edit" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen"></i></td>' +
          '<td class="action" data-id="delete"><i class="fa-solid fa-trash-can"></i></td>' +
          '<td class="action" data-id="add" data-bs-toggle="modal" data-bs-target="#addModal"><i class="fa-solid fa-plus"></i></td>' +
          '</tr>';
        $('th.' + formClass)
          .parent('tr')
          .after(newRowTable);
        var newRowMenu =
          '<a href="javascript:void(0)" onclick="showContent(\'' +
          randomString +
          '\')" class="w3-bar-item w3-button menu-' +
          randomString +
          '">' +
          newMenu +
          '</a>';
        $('.menu-' + formClass).after(newRowMenu);
        $('#add-form input').val();
        var newContentContainer =
          '<div id="' +
          randomString +
          '" class="w3-container w3-padding-64 hidden"><div class="container"></div></div>';
        $('#content-container').append(newContentContainer);
        // hrefArray[randomString] = []
      }
      $('.btn-close-model').click();
    }

    if (formId == 'edit-sidebar-form') {
      var newSidebar = $('#edit-sidebar-form input').val();
      if (newSidebar.trim() !== '') {
        var currentMenu = $('.table-menu-item').attr('data-table');
        $('th.' + formClass).text(newSidebar);
        $('a[href="#' + formClass + '"]').text(newSidebar);
        $('#' + formClass + ' .section-header').text(newSidebar);
        hrefArray[currentMenu]['#' + formClass] = newSidebar;
        // console.log(hrefArray)
      }
      $('.btn-close-model').click();
    }

    if (formId == 'add-sidebar-form') {
      // console.log(hrefArray)
      var newSidebar = $('#add-sidebar-form input').val();
      var randomString = generateRandomString(8);
      var currentMenu = $('.table-menu-item').attr('data-table');
      if (newSidebar.trim() !== '') {
        let menu = hrefArray[currentMenu];

        if (formClass != 'none') {
          let entries = Object.entries(menu);
          let index = entries.findIndex(
            ([key, value]) => key === '#' + formClass,
          );
          if (index !== -1) {
            entries.splice(index + 1, 0, ['#' + randomString, newSidebar]);
          }

          hrefArray[currentMenu] = Object.fromEntries(entries);
        } else {
          hrefArray[currentMenu]['#' + randomString] = newSidebar;
        }

        var newRowTable =
          '<tr>' +
          '<th class="' +
          randomString +
          '">' +
          newSidebar +
          '</th>' +
          '<td class="action-sidebar" data-id="view-sidebar"><i class="fa-solid fa-eye"></i></td>' +
          '<td class="action-sidebar" data-id="edit-sidebar" data-bs-toggle="modal" data-bs-target="#editModalSidebar"><i class="fa-solid fa-pen"></i></td>' +
          '<td class="action-sidebar" data-id="delete-sidebar"><i class="fa-solid fa-trash-can"></i></td>' +
          '<td class="action-sidebar" data-id="add-sidebar" data-bs-toggle="modal" data-bs-target="#addModalSidebar"><i class="fa-solid fa-plus"></i></td>' +
          '</tr>';
        var newRowSidebar =
          '<a class="w3-bar-item w3-button w3-hover-black" href="' +
          '#' +
          randomString +
          '">' +
          newSidebar +
          '</a>';
        var newContent =
          '<div id="' +
          randomString +
          '" class="mt-3">' +
          '<div class="section-header">' +
          newSidebar +
          '</div>' +
          '<div class="main-content row"></div>' +
          '</div>';
        console.log(newRowSidebar);
        if (formClass != 'none') {
          $('th.' + formClass)
            .parent('tr')
            .after(newRowTable);
          $('a[href="#' + formClass + '"]').after(newRowSidebar);
          $('#' + formClass).after(newContent);
        } else {
          $('.table-menu-item').html(newRowTable);
          $('#mySidebar h4').after(newRowSidebar);
          $('#' + currentMenu + ' .container').html(newContent);
        }

        $('#add-sidebar-form input').val('');
      }
      $('.btn-close-model').click();
      $('.btn-first-menu').hide();
    }

    if (formId == 'add-content-form') {
      var newContent = $('#add-content-form input').val();
      var grid = $('#gridSelect').val();
      var randomString = generateRandomString(8);
      if (newContent.trim() !== '') {
        var demoGrid =
          '<div id=' +
          randomString +
          ' class = "p-5 border d-flex rounded justify-content-center align-item-center border-box ' +
          grid +
          '">' +
          newContent +
          '</div>';
        var newRowTable =
          '<tr>' +
          '<th class="' +
          randomString +
          '" data-grid="' +
          grid +
          '">' +
          newContent +
          '</th>' +
          '<td class="action-content" data-id="view-content"><i class="fa-solid fa-eye"></i></td>' +
          '<td class="action-content" data-id="edit-content" data-bs-toggle="modal" data-bs-target="#editModalContent"><i class="fa-solid fa-pen"></i></td>' +
          '<td class="action-content" data-id="delete-content"><i class="fa-solid fa-trash-can"></i></td>' +
          '<td class="action-content" data-id="add-content" data-bs-toggle="modal" data-bs-target="#addModalContent"><i class="fa-solid fa-plus"></i></td>' +
          '</tr>';
        var newContentHTML =
          '<div class="content-info mt-3 ' +
          grid +
          '" data-id="' +
          randomString +
          '" data-content="' +
          newContent +
          '" data-grid="' +
          grid +
          '"></div>';

        if (formClass != 'none') {
          $('#' + formClass).after(demoGrid);
          $('th.' + formClass)
            .parent('tr')
            .after(newRowTable);
          $('[data-id="' + formClass + '"]').after(newContentHTML);
        } else {
          var contentParent = $('.table-content-item').attr('data-table');
          $('.demo-grid .row').html(demoGrid);
          $('.table-content-item').html(newRowTable);
          $('#' + contentParent + ' .main-content').append(newContentHTML);
        }

        $('.btn-first-content').hide();
      }
      $('#add-content-form input').val('');
      $('.btn-close-model').click();
    }

    if (formId == 'edit-content-form') {
      var newContent = $('#edit-content-form input').val();
      var grid = $('#gridSelectNew').val();
      if (newContent.trim() !== '') {
        oldGrid = $('.' + formClass).attr('data-grid');
        $('.' + formClass).text(newContent);
        $('.' + formClass).attr('data-grid', grid);
        $('#' + formClass).text(newContent);
        $('#' + formClass).removeClass(oldGrid);
        $('#' + formClass).addClass(grid);
        $('[data-id="' + formClass + '"]').removeClass(oldGrid);
        $('[data-id="' + formClass + '"]').addClass(grid);
        $('[data-id="' + formClass + '"]').attr('data-content', newContent);
        $('[data-id="' + formClass + '"]').attr('data-grid', grid);
      }
      $('.btn-close-model').click();
    }
  });

  //Xử lý sidebar

  $('.admin-page-content').on('click', '.action-sidebar', function () {
    var currentMenu = $('.table-menu-item').attr('data-table');
    var id = $(this).attr('data-id');
    var sidebarContentHref = $(this).siblings('th').attr('class');

    if (typeof sidebarContentHref === 'undefined') {
      sidebarContentHref = 'none';
    }

    contentSidebar = $(this).siblings('th').text();
    $('.modal form').attr('data-class', sidebarContentHref);

    if (id == 'delete-sidebar') {
      delete hrefArray[currentMenu]['#' + sidebarContentHref];
      $('a[href="#' + sidebarContentHref + '"]').hide();
      $(this).parent('tr').hide();
      $('#' + sidebarContentHref).hide();
    }
    if (id == 'edit-sidebar') {
      $('#edit-sidebar-form input').val(contentSidebar);
      $('#editModalSidebar').modal('show');
    }
    if (id == 'view-sidebar') {
      $('.btn-reset').remove();
      $('#mySidebar a').removeClass('active');
      $('a[href="#' + sidebarContentHref + '"]').addClass('active');

      contentGridArray = [];

      $('#' + sidebarContentHref)
        .find('.main-content')
        .children('[data-content][data-grid]')
        .each(function () {
          var id = $(this).attr('data-id');
          var content = $(this).attr('data-content');
          var grid = $(this).attr('data-grid');
          // alert(grid)

          if (!contentGridArray[id]) {
            contentGridArray[id] = {};
          }

          contentGridArray[id][content] = grid;
        });

      console.log(contentGridArray);

      var newRowTable = '';

      $.each(Object.keys(contentGridArray), function (index, id) {
        var contentObj = contentGridArray[id];

        // Kiểm tra nếu contentObj là đối tượng (chứa các content và grid)
        if (typeof contentObj === 'object') {
          $.each(contentObj, function (content, grid) {
            console.log(content, grid);
            newRowTable +=
              '<tr>' +
              '<th class="' +
              id +
              '" data-grid="' +
              grid +
              '">' +
              content +
              '</th>' +
              '<td class="action-content" data-id="view-content"><i class="fa-solid fa-eye"></i></td>' +
              '<td class="action-content" data-id="edit-content" data-bs-toggle="modal" data-bs-target="#editModalContent"><i class="fa-solid fa-pen"></i></td>' +
              '<td class="action-content" data-id="delete-content"><i class="fa-solid fa-trash-can"></i></td>' +
              '<td class="action-content" data-id="add-content" data-bs-toggle="modal" data-bs-target="#addModalContent"><i class="fa-solid fa-plus"></i></td>' +
              '</tr>';
          });
        }
      });

      // console.log('ok')
      // console.log(newRowTable)
      // console.log('ok')

      if (Object.keys(contentGridArray).length === 0) {
        $('.btn-first-content').show();
      }

      $('#admin-page .table-content-item').html(newRowTable);
      $('#admin-page .table-content-item').attr(
        'data-table',
        sidebarContentHref,
      );
      $('#admin-page .table-menu-item').empty();

      //Hiển thị phần demo
      var demo =
        '<div class = "demo-grid"><div class="section-header mt-5">' +
        contentSidebar +
        '</div>' +
        '<div class = "row mt-2 p-5 border-box">';
      $.each(Object.keys(contentGridArray), function (index, id) {
        $.each(contentGridArray[id], function (content, grid) {
          demo +=
            '<div id="' +
            id +
            '" class="p-5 border d-flex rounded justify-content-center align-item-center border-box ' +
            grid +
            '">' +
            content +
            '</div>';
        });
      });

      demo += '</div></div>';
      $('.admin-page-content').append(demo);
    }
  });

  //Xử lý content
  $('.admin-page-content').on('click', '.action-content', function () {
    var id = $(this).siblings('th').attr('class');
    var action = $(this).attr('data-id');
    var grid = $(this).siblings('th').attr('data-grid');
    var content = $(this).siblings('th').text();

    if (typeof id === 'undefined') {
      id = 'none';
    }

    $('.modal form').attr('data-class', id);

    contentSidebar = $(this).siblings('th').text();

    if (action == 'delete-content') {
      $('[data-id="' + id + '"]').remove();
      $(this).parent('tr').remove();
      $('#' + id).remove();
    }

    if (action == 'edit-content') {
      $('#edit-content-form input').val(content);
      $('#editModalContent').modal('show');
    }

    if (action == 'view-content') {
      $('.admin-page-content').hide();
      var contentHtml = $('[data-id="' + id + '"]').html();
      quill.clipboard.dangerouslyPasteHTML(contentHtml);
      $('#editContent').show();
      $('.btn-submit-content').attr('data-submit', id);
    }
  });

  $('.btn-submit-content').on('click', function () {
    var htmlContent = quill.root.innerHTML;
    var id = $(this).attr('data-submit');
    $('#output-container').html(htmlContent);
    $('[data-id="' + id + '"]').html(htmlContent);
    alert('Đã chỉnh sửa thành công');
  });

  function generateRandomString(length) {
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  $('#admin-page').on('click', '.btn-reset button', function () {
    reset();
    console.log(defaultHref);
  });

  function reset() {
    $.each(studentDefault, function (key, value) {
      $(key).html(value);
    });

    hrefArray = defaultHref;

    $('.menu-student-info').text(defaultTitle);
    $('.menu-student-info').click();
    $('th.student-info').text(defaultTitle);
    alert('Đã reset thông tin sinh viên thành công');
  }
});
