// 进度条动画
// 发送ajax请求时开始
$(document).ajaxStart(function () {
    NProgress.start();
})
// 发送ajax请求时结束
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)
})

// 二级菜单的显示和隐藏
$('.second').prev().on('click', function () {
    $(this).next().stop().slideToggle();
})

// 菜单的显示隐藏
$('.lt_topbar .left').on('click', function () {
    $('.lt_aside,.lt_main,.lt_main .lt_topbar').toggleClass('now');
})

// 模态框的显示隐藏
$('.lt_topbar .right').on('click', function () {
    $('#logoutModal').modal('show');
})

// 模态框的退出
$('.confirm').on('click', function () {
    // 需要发送ajax请求来操作，参数在接口文档中
    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        success: function (info) {
            if (info.success) {
                location.href = 'login.html';
            }
        }
    })
})