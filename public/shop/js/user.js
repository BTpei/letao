$(function () {
    renser()    // 渲染头像和信息

    // 点击退出按钮，返回登录页面
    $('.black').on('click',function(){
        location.href='login.html'
    })

    function renser() {
        $.ajax({
            type: 'get',
            url: '/user/queryUserMessage',
            success: function (info) {
                console.log(info)
                if (info.error) {
                    location.href = 'login.html?from=' + location.href
                }

                $('.userinfo').html(template('tql', info))
            }
        })
    }
})