$(function () {
    var search = location.search;
    var id = search.split('=')[1];

    renderXq();     // 渲染产品详情

    // 加入购物车功能
    $('#addCart').on('click', function () {
        var size = $('.lt_size span.current').text();
        if (!size) {
            mui.toast('请选择一个尺码')     // 提示框
            return
        }
        var num = $('.mui-numbox-input').val();
        console.log(size, num);

        $.ajax({
            type:'post',
            url: '/cart/addCart',
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function (info) {
                if(info.error==400){       // 跳转到登录页面， 并且把当前的地址 当成了from传递过去
                    location.href='login.html?from=' + location.href
                }
                if(info.success){
                    mui.confirm('恭喜您添加购物车成功','温馨提示',['去购物车','继续浏览'],function(e){
                        if(e.index==0){
                            location.href='cart.html'
                        }
                    })
                }
            }
        })
    })

    function renderXq() {
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            success: function (info) {
                console.log(info);
                $('.mui-scroll').html(template('tql', info));

                // 初始化轮播图
                mui('.mui-slider').slider({
                    interval: 5000
                })

                // 初始化 .mui-numbox
                mui('.mui-numbox').numbox()

                // 尺码的选择功能
                $('.lt_size span').on('click', function () {
                    $(this).addClass('current').siblings().removeClass('current');
                })
            }
        })
    }
})