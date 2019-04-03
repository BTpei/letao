$(function () {

    /* 
    1. 去地址栏中获取到 key对应的值
    2. 把获取到的值赋值给input框
    3. 发送ajax请求，去获取到所有与 key相关的商品，显示出来
    4. 点击搜索的时候，还能继续搜索
    5. 排序的功能
    6. 加载的动画效果
    */

    // 获取地址栏中对应的key值
    var search = location.search;

    // url地址默认会对中文进行转码  decodeURI: 解码   encodeURI：转码
    search = decodeURI(search);

    // 获取到搜索的key，修改搜索框的值
    var key = search.split('=')[1];
    $('.lt_search input').val(key);

    // 渲染数据
    render();

    // 点击搜索按钮搜索商品
    $('.btn-search').on('click', function () {
        location.href = 'searchList.html?key' + $('.lt_search input').val();
    })

    // 点击切换排序的样式
    $('.lt_sort li[data-type]').on('click', function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
            $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
        } else {
            $this.addClass('active').siblings().removeClass('active');
            $('.lt_sort span').addClass('fa-angle-down').removeClass('fa-angle-up');
        }
        render();
    })

    // 发送ajax请求获取数据
    function render() {
        // 加载动画
        $('.product').html('<div class="loding"></div>');

        // 参数
        var obj = {
            page: 1,
            pageSize: 100,
            // proName:$('lt_search input').val()
            proName: key
        }

        // 判断是否需要第四个参数
        var $active=$('.lt_sort li.active');
        if($active.length>0){
            var type=$active.data('type');
            var value=$active.find('span').hasClass('fa-angle-down')?2:1;
            obj[type]=value;
            console.log(obj)
        }

        // 跳转信息
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: obj,
            success: function (info) {
                console.log(info)
                $('.product').html(template('tql', info))
            }
        })
    }

})