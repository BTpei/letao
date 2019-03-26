$(function () {
    // localStroge中只能存储字符串，如果是其他类型的数据，都会转换成字符串
    // 如果要在localStorage中存储复杂类型的数据，需要使用JSON.stringify()转成json字符串才能存储

    // localStorage.getItem取到的数据也是json字符串， 需要使用JSON.parse()再次转回对象
    // 增加假数据
    // localStorage.setItem('search_history', JSON.stringify(['埃迪达斯', '耐克']))

    var KEY = 'search_history';

    // 封装历史记录的展示函数
    var getHistory = function () {
        var result = localStorage.getItem(KEY);
        return JSON.parse(result) || [];
    }

    // 封装渲染历史记录的函数
    var render = function () {
        var history = getHistory();
        console.log(history);
        $('.lt_history').html(template('tql', { rows: history }))
    }

    // 开始渲染数据
    render();

    // 点击清空历史按钮清空数据
    // 1. 给清空按钮注册点击事件
    // 2. 删除 search_history 
    // 3. 重新渲染
    $('.lt_history').on('click', '.btn-del', function () {
        mui.confirm('您确定要清空历史记录吗？', '温馨提示', ['确定', '取消'], function (e) {
            if (e.index === 0) {
                localStorage.removeItem('search_history');
                // 渲染数据
                render();
            }
        })
    })

    // 点击关闭按钮删除当前元素
    $('.lt_history').on('click', '.btn-sc', function () {
        // 获取当前点击元素的下标
        var idx = $(this).data('index');
        // 把点击的元素从数组中删除
        var history = getHistory();
        history.splice(idx, 1);
        // 把数据转换成json格式，传达后台服务器
        localStorage.setItem(KEY, JSON.stringify(history));
        // 渲染数据
        render();
    })

    // 点击搜索按钮，添加搜索历史记录
    // 1. 给搜索按钮注册点击事件
    // 2. 获取到文本框的value值
    // 3. 获取到storage中的数据
    // 4. 往数组中添加这条记录， 添加到数组的前面
    // 5. 把数组重新存回storage中
    // 6. 重新渲染
    $('.btn-search').on('click', function () {
        // 获取输入框的值
        var vals = $('.insearch').val();
        // 如果输入的内容为空，不添加历史记录
        if (!vals.trim()) {
            return;
        }
        // 清空输入框的值
        $('.insearch').val('');
        // 获取历史记录
        var history = getHistory();
        //  去重的操作, 判断数组中是否已经包含了value了，如果包含了，需要把之前的这个值给删除
        var index = history.indexOf(vals);
        if (index !== -1) {
            history.splice(index, 1);
        }
        // 往数组添加数据
        history.unshift(vals);
        // 将数据转换成json格式，传达后台服务台
        localStorage.setItem(KEY, JSON.stringify(history));
        // 渲染数据，不一定需要做
        // render();

        // 跳转到商品搜索页面
        location.href = 'searchList.html?key=' + vals
    })

})