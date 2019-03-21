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

// 分页

function paginator(info, render) {
    $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage: info.page,//当前页
        totalPages: Math.ceil(info.total / info.size),//总页数
        size: "normal",//设置控件的大小，mini, small, normal,large
        itemTexts: function (type, page, current) {     // 控制每个按钮的显示内容
            switch (type) {
                case 'first':
                    return '首页'
                case 'prev':
                    return '上一页'
                case 'next':
                    return '下一页'
                case 'last':
                    return '尾页'
                default:
                    return page
            }
        },
        // 使用bootstrap的tooltip组件
        useBootstrapTooltip: true,
        onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            render(page);
        }
    });
}