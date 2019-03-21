$(function () {
    var pageSize = 5;
    var currentPage;
    var id, isDelete
    render(1);

    function render(page) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                var html = template('user_tpl', info)
                $('tbody').html(html)

                // 分页
                // $("#paginator").bootstrapPaginator({
                //     bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                //     currentPage: page,//当前页
                //     totalPages: Math.ceil(info.total/info.size),//总页数
                //     size: "small",//设置控件的大小，mini, small, normal,large
                //     onPageClicked: function (a, b, c, newpage) {
                //         //为按钮绑定点击事件 page:当前点击的按钮值
                //         page=newpage;
                //         render();
                //     }
                // });
                currentPage = info.page;
                paginator(info,render);

            }

        })
    }


    // 禁用启动按钮弹出模态框
    // 1. 给启用和禁用注册点击事件
    // 2. 弹出模态框
    // 3. 给确定注册点击事件
    // 4. 发送ajax请求，启用获取禁用用户
    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');
        // 获取用户id
        id = $(this).parent().data('id');
        // 获取用户状态
        // isDelete = $(this).text() == "启用" ? 1 : 0;
        isDelete=$(this).hasClass('btn-success')?1:0;
    })

    // 点击确定按钮修改状态
    $('.update').on('click', function () {
        console.log('haha');
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#userModal').modal('hide');
                    render(currentPage);
                }
            }
        })
    })

})