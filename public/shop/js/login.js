$(function () {
    $('.btn_login').on('click', function () {
        // 验证密码和用户名是否为空
        var username = $('[name=username]').val().trim()
        if (!username) {
            mui.toast('用户名不能为空')
            return
        }
        var password = $('[name=password]').val().trim()
        if (!password) {
            mui.toast('密码不能为空')
            return
        }

        // 发送ajax请求
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (info) {
                console.log(info);
                if (info.error) {
                    mui.toast('用户名或者密码错误')
                }
                if (info.success) {
                    // replace：替换
                    var from = location.search.replace('?from=', '');
                    if (from) {
                        location.href = from
                    } else {
                        location.href = 'index.html'
                    }
                }
            }
        })
    })
})