var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        content:'',
        protocol: false,
        serviceTypeList: [],
        showForm: true,
        sending: false,
        countdown_m: 60,
        countdown_p: 60,
        form: {
            username: '',
            password: '',
            passwordveri: '',
            captcha: ''
        },
        companyTypeOption: [],
        user: {
            status: 1,
            roleIdList: [4]
        },
        company: {
            serviceType:[]
        },
        registerObj: {
            'user': null,
            'company': null
        },
        personalRegFields: {
            usernamep: {validators: {notEmpty: {message: '用户名不能为空'}}},
            phonep: {validators: {notEmpty: {message: '手机号码不能为空'},regexp:{regexp: /^1[3456789]\d{9}$/,message:'手机号码不正确'}}},
            identifyingCodep: {validators: {notEmpty: {message: '验证码不能为空'}}},
            setPasswordp: {validators: {notEmpty: {message: '密码不能为空'}}},
            confirmPasswordp: {validators: {notEmpty: {message: '确认密码不能为空'}}}
        },
        merchantRegFields: {
            usernamem: {validators: {notEmpty: {message: '批次编号不能为空'}}},
            companyname: {validators: {notEmpty: {message: '公司名称不能为空'}}},
            companytype: {validators: {notEmpty: {message: '公司类型不能为空'}}},
            contact: {validators: {notEmpty: {message: '联系人不能为空'}}},
            phonem: {validators: {notEmpty: {message: '手机号码不能为空'},stringLength:{min:11,max:11,message:'手机号码不正确！'},regexp:{regexp: /^1[3456789]\d{9}$/,message:'手机号码不正确'}}},
            identifyingCodem: {validators: {notEmpty: {message: '验证码不能为空'}}},
            setPasswordm: {validators: {notEmpty: {message: '密码不能为空'}}},
            confirmPasswordm: {validators: {notEmpty: {message: '确认密码不能为空'}}},
            'serviceType[]': {validators: {notEmpty: {message: '服务类型不能为空'}}}
        },
        error: false,
        errorMsg: '',
        src: 'captcha.jpg'
    },
    beforeCreate: function () {
        if (self != top) {
            top.location.href = self.location.href;
        }
    },
    methods: {
        sendcode(){
            var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
            if(vm.user.mobile==''){
                alert("请输入手机号码");
            }else if(!reg.test(vm.user.mobile)){
                alert("手机格式不正确");
            }else{
                vm.sendSms();
            }
        },
        companyTypeLoad: function () {
            $.get(baseURL + 'company/companytype/listall', function (obj) {
                vm.companyTypeOption = [];
                obj.rows.forEach(function (item) {
                    vm.companyTypeOption.push({value: item.id, label: item.typeName})
                })
            })
        },
        getServicetype: function () {
            $.get(baseURL + 'company/servicetype/listCheckbox?sidx=id&order=asc', function (obj) {
                vm.serviceTypeList = obj.rows;
            })
        },
        validFromSuccess: function () {
            var el;
            /* if (vm.showForm)
                 el = 'personalReg';
             else*/
            el = 'merchantReg';

            var bl = $('#' + el + '').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        sendSms: function () {
            vm.sending = true;
            var obj = $("#sendSms");
            vm.settime(obj);
        },
        settime: function (obj) { //发送验证码倒计时
            if (vm.countdown == 0) {
                obj.attr('disabled', false);
                obj.val("获取验证码");
                vm.countdown = 60;
                vm.sending = false;
                return;
            } else {
                obj.attr('disabled', true);
                obj.val("重新发送(" + vm.countdown + ")");
                vm.countdown--;
            }
            setTimeout(function () {
                vm.settime(obj);
            }, 1000)
        },
        switchForm: function (type) {
            $('#p').attr('class', 'btn btn-default');
            $('#m').attr('class', 'btn btn-default');

            if (type == 'p') {
                $("#merchantReg").RF();
                vm.showForm = true;
            } else {
                $("#personalReg").RF();
                vm.showForm = false;
            }
            $('#' + type).attr('class', 'btn btn-default active');
        },
        refreshCode: function () {
            this.src = "captcha.jpg?t=" + $.now();
        },
        register: function () { // 注册

            if(vm.protocol==false){

                alert("同意阅读协议后申请注册");
                return false;

            }

            if (vm.validator()) {
                alert(vm.errorMsg);
                return;
            }
            vm.registerObj.user = vm.user;
            vm.registerObj.company = vm.company;
            $.ajax({
                type: "POST",
                url: baseURL + 'company/merchantusers/register?smsCode='+$("#identifyingCodem").val(),
                contentType: "application/json",
                data: JSON.stringify(vm.registerObj),
                success: function (r) {
                    if (r.code === 0) {
                        alert('注册成功！', function () {
                            location.href = '/login.html';
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }, onBlur: function () {
//                vm.error = false;
        },
        validator: function () {
            if (isBlank(vm.user.username)) {
                vm.error = true;
                vm.errorMsg = "用户名不能为空";
                return true;
            }

            if (isBlank(vm.user.password) && isBlank(vm.user.passwordveri)) {
                vm.error = true;
                vm.errorMsg = "密码不能为空";
                return true;
            }

            if(vm.user.password  != vm.user.passwordveri) {
                vm.error = true;
                vm.errorMsg = "密码不一致";
                return true;
            }

            /* if (isBlank(vm.user.email)) {
                 vm.error = true;
                 vm.errorMsg = "邮箱不能为空";
                 return true;
             }

             if (!validator.isEmail(vm.user.email)) {
                 vm.error = true;
                 vm.errorMsg = "邮箱格式不正确";
                 return true;
             }*/
            vm.error = false;
        }
    },
    created: function () {
        $(function () {
            vm.countdown = $.cookie('validateCodeCountdown');
            if (vm.countdown > 0) {
                vm.sending = true;
                var obj = $("#sendSms");
                obj.attr("disabled", true);
                obj.val("重新发送(" + vm.countdown + ")");
                vm.settime(obj);
            } else {
                vm.countdown = 60;
            }

            $(window).on('beforeunload unload', function () {
                if (vm.sending) {
                    console.log(vm.countdown);
                    $.cookie('validateCodeCountdown', vm.countdown);
                }
                if (!vm.sending) {
                    console.log(vm.countdown);
                    $.cookie('validateCodeCountdown', 0);
                }
            });
        });

        this.getServicetype();
    }
});

$(function () {
    // $("#personalReg").FM({fields: vm.personalRegFields, success: vm.register});

    $("#merchantReg").FM({fields: vm.merchantRegFields, success: vm.register});
    var data={xieyiType:'注册协议'};
    $.ajax({
        type: "POST",
        url: baseURL + "company/merchantusers/getAgreement",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (r) {
            vm.content=r.agreeMentEntity.xieyiContent;
            if (r.code == 0) {
            } else {
                alert(r.msg);
            }
        }
    });

});