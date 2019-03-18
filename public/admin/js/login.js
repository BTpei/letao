// 表单校验插件
$(function () {
    var $form = $('#form');
    $form.bootstrapValidator({
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 9,
                        message: '用户名长度必须在3到9之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '用户密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户密码长度必须是6-12位'
                    }
                }
            }
        },
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',        // 校验通过
            invalid: 'glyphicon glyphicon-remove',      // 校验不通过
            validating: 'glyphicon glyphicon-refresh'   // 校验中
        },
    })


    // 校验表单成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault(); //阻止浏览器默认行为
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            success:function(info){
                if(info.error===1000){
                    alert('用户名不存在')
                }
                if(info.error===1001){
                    alert('密码错误')
                }
                if(info.success){
                    location.href="index.html"
                }
            }
        })
    });
})

