$(function(){
    var currentpage;
    var pageSize = 5;
    render(1);

    // 获取数据，渲染页面，分页插件
    function render(page) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // 添加渲染模板
                var html = template('second_tpl', info);
                $('tbody').html(html);

                // 记录当前页
                currentpage = info.page;
                paginator(info, render);
            }
        })
    }

    // 点击添加按钮弹出模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');

        // 发送ajax请求渲染一级分类
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info)
                $('.dropdown-menu').html(template('second_tpz',info));
            }
        })
    })

    // 点击一级分类修改所选内容
    $('.dropdown-menu').on('click','li',function(){
        // 获取id
        var id=$(this).data('id');
        // 修改button里面的内容
        $('.dropdown-text').text($(this).children().text())
    })
})