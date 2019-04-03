$(function () {

    renderList(); // 渲染商品列表

    // 删除功能
    $('#OA_task_1').on('click', '.btn-delet', function () {
        var id = $(this).data('id');
        console.log(id);

        mui.confirm('你确定要删除吗?不买一回就没了哟', '警告', ['确定', '取消'], function (e) {
            if (e.index === 0) {
                $.ajax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: [id]
                    },  // id 要以数组的形式传进去
                    success: function (info) {
                        if (info.success) {
                            renderList()
                        }
                    }
                })
            }
        })
    })

    function renderList() {
        $.ajax({
            url: '/cart/queryCart',
            type: 'get',
            success: function (info) {
                console.log(info);
                if (info.error) {
                    location.href = 'login.html?from=' + location.href
                }
                $('#OA_task_1').html(template('tql', { rows: info }))
            }
        })
    }
})