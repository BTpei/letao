$(function () {
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
                console.log(currentpage);
                paginator(info, render);
            }
        })
    }

    // 点击添加按钮弹出模态框
    $('.btn_add').on('click', function () {
        // 重置表单样式
        $form.data('bootstrapValidator').resetForm(true);
        // 重置下拉框的文字和图片
        $('.dropdown-text').text('请选择一级分类');
        $('.img_box img').attr('src', 'images/none.png');

        // 模态框显示
        $('#addModal').modal('show');

        // 发送ajax请求渲染一级分类
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info)
                $('.dropdown-menu').html(template('second_tpz', info));
            }
        })
    })

    // 点击一级分类修改所选内容
    $('.dropdown-menu').on('click', 'li', function () {
        // 获取id
        var id = $(this).data('id');
        // 修改button里面的内容
        $('.dropdown-text').text($(this).children().text());
        // 动态修改 name=categoryId的value值
        $('[name=categoryId]').val(id);
        // 手动修改一级校验成功
        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    // 图片上传功能
    $('#file').fileupload({
        // 图片上传成功后的回调函数
        done: function (e, data) {
            console.log(data.result.picAddr);
            var result = data.result.picAddr;
            $('.img_box img').attr('src', result);
            $('[name=brandLogo]').val(result);
            // 手动修改图片检验
            $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

        }
    })

    // 表单校验功能
    var $form = $('#form');
    $form.bootstrapValidator({
        // 指定不校验的类型， 默认对禁用的 隐藏 不可见的不做校验
        excluded: [],
        // 指定对谁进行校验， 对应表单中的name属性
        fields: {
            // 对categoryName进行校验
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一个一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传二级分类的图片'
                    }
                }
            },
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 注册表单校验成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault()

        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function (info) {
                if (info.success) {
                    // 隐藏模态框
                    $('#addModal').modal('hide');
                    // 重新渲染第一页
                    render(currentpage);
                }
            }
        })
    })




})