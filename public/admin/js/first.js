$(function () {
    var currentpage;
    var pageSize = 5;
    render(1);

    // 获取数据，渲染页面，分页插件
    function render(page) {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // 添加渲染模板
                var html = template('first_tpl', info);
                $('tbody').html(html);

                // 记录当前页
                currentpage = info.page;
                paginator(info, render);
            }
        })
    }

    // 添加分类
    // 1. 给按钮注册点击事件
    // 2. 准备一个添加的模态框
    // 3. 显示这个模态框
    // 4. 实现表单校验功能
    // 5. 表单校验通过，发送ajax请求，添加一级分类
    // 6. 添加成功后，关闭模态框，重新渲染

    // 点击按钮弹出模态框
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
    })

    // 表单验证
    var $form = $('#form');
    $form.bootstrapValidator({
        //1. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类的名称不能为空'
                    },
                }
            }
        },

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 表单验证成功发送ajax请求
    $form.on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: {
                categoryName:$('#as').val()     // jQuery方法获取数据
            },
            // data:$form.serialize(),      // form表单的获取方式
            success: function (info) {
                // 重新渲染数据
                render(currentpage);
                // 隐藏模态框
                $('#addModal').modal('hide');
                // 重置表单，清空数据
                $form.data('bootstrapValidator').resetForm(true);
            }

        })
    });


})