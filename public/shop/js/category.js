$(function(){

    // 发送ajax请求渲染左边的列表
    var leftSecond=function(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategory',
            success:function(info){
                console.log(info)
                $('.main_left ul').html(template('left_tql', info));
                // 渲染二级列表
                rightSecond(info.rows[0].id);
            }
        })
    }

    // 发送ajax请求渲染右边的列表
    var rightSecond=function(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $('.main_right ul').html(template('right_tql',info));
            }
        })
    }


    // 渲染一级列表
    leftSecond();

    // 点击按钮安然对应的分类
    $('.main_left ul').on('click','li',function(){
        // 当前点击的类添加类名active，其他元素去掉active类名
        $(this).addClass('active').siblings().removeClass('active');
        // 获取当前点击的id
        var index=$(this).data('id');
        // 渲染二级列表
        rightSecond(index);
    })
})