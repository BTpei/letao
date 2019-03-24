$(function () {
    // localStroge中只能存储字符串，如果是其他类型的数据，都会转换成字符串
    // 如果要在localStorage中存储复杂类型的数据，需要使用JSON.stringify()转成json字符串才能存储

    // localStorage.getItem取到的数据也是json字符串， 需要使用JSON.parse()再次转回对象
    // 增加假数据
    // localStorage.setItem('search_history', JSON.stringify(['埃迪达斯', '耐克']))


    // 封装历史记录的展示函数
    var getHistory = function () {
        var result = localStorage.getItem('search_history');
        return JSON.parse(result) || [];
    }

    // 封装渲染渲染数据函数
    var render = function () {
        var history = getHistory();
        console.log(history);
        $('.lt_history').html(template('tql', { rows: history }))
    }

    // 开始渲染数据
    render();

    // 点击清空历史按钮删除数据
    $('.lt_history').on('click', '.btn-del', function () {
        localStorage.removeItem('search_history');
        // 渲染数据
        render();
    })

    // 点击关闭按钮删除当前元素
    $('.lt_history').on('click', '.btn-sc', function () {
        // 获取当前点击元素的下标
        var idx = $(this).data('index');
        // 把点击的元素从数组中删除
        var as = getHistory();
        as.splice(idx, 1);
        // 把数据转换成json格式，传达后台服务器
        localStorage.setItem('search_history', JSON.stringify(as));
        // 渲染数据
        render();
    })

    // 点击搜索按钮，添加搜索历史记录
    $('.btn-search').on('click', function () {
        // 获取输入框的值
        var vals = $('.insearch').val();
        // 往数组添加数据
        var as = getHistory();
        as.push(vals);
        // 将数据转换成json格式，传达后台服务台
        localStorage.setItem('search_history', JSON.stringify(as));
        // 渲染数据
        render();
    })
})