$(function () {
    var currentpage;
    var pageSize = 5;
    var picArr=[];
    render(1);

    // 获取数据，渲染页面，分页插件
    function render(page) {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // 添加渲染模板
                var html = template('product_tpl', info);
                $('tbody').html(html);

                // 记录当前页
                currentpage = info.page;
                console.log(info);

                // 渲染数据
                paginator(info, render);
            }
        })
    }

    // 点击添加按钮弹出模态框
    $('.btn_add').on('click', function () {
    // 在这里添加是为了不管什么方式退出或者成功，都会清空表单
        // 重置表单样式
        $form.data('bootstrapValidator').resetForm(true);
        // 重置下拉框的文字和图片
        $('.dropdown-text').text('请选择二级分类');
        $('.img_box img').remove();
        // 清空存储图片的数组
        picArr = [];    

        // 模态框显示
        $('#addModal').modal('show');

        // 发送ajax请求渲染一级分类
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info)
                // 渲染的数据添加到指定位置
                $('.dropdown-menu').html(template('product_tpz', info));
            }
        })
    })

    // 点击二级分类修改所选内容
    $('.dropdown-menu').on('click', 'li', function () {
        // 获取id
        var id = $(this).data('id');
        // 修改button里面的内容
        $('.dropdown-text').text($(this).children().text());    // li的孩子a 标签的内容
        // 动态修改 name=categoryId的value值
        $('[name=brandld]').val(id);
        // 手动修改二级校验成功
        $form.data('bootstrapValidator').updateStatus('brandld', 'VALID');
    })

    // 图片上传功能---引入插件
    $('#file').fileupload({
        // 图片上传成功后的回调函数
        done: function (e, data) {
            // console.log(data.result.picAddr);
            var result = data.result.picAddr;
            // 因为添加的是多个图片，所以每添加一个图片，创建一个img标签
            $('.img_box').prepend('<img src="' + result + '" width="100" height="100" alt="">  ');
            // 因为最多添加3个图片，当超过3个图片的时候，把最后一个图片删除
            $('.img_box img').eq(3).remove();
            
            // 上传的图片的结构存储到(参数)数组picArr中
            picArr.unshift(data.result);        // 在数组的前面添加数据
            if(picArr.length>3){
                picArr.pop();           // 删除数组后面的内容
            }

            if(picArr.length===3){      // 图片长度=3通过验证
                $form.data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }else{                      // 否则不通过验证
                $form.data('bootstrapValidator').updateStatus('picStatus', 'INVALID');
            }
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
            brandld: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d{0,4}$/,
                        message: '商品库存只能是1-99999之间'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码的格式必须是xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传3张图片'
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

        // 获取的表单数据没有picArr，需要自己手动拼接
        var params=$form.serialize();
        params += '&picArr=' + JSON.stringify(picArr);      // 参见打印结果和接口文档

        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: params,
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