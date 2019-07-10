$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'bill/bankcard/list',
        columns: [
            {checkbox: true},
            {title: '姓名', field: 'name'},
            {title: '身份证', field: 'idcard'},
            {title: '银行卡号', field: 'bankCardNumber'},
            {title: '手机号码', field: 'phone'},
            {title: '公司ID', field: 'companyId'},
            {title: '部门ID', field: 'deptId'},
            {title: '创建人ID', field: 'createBy'},
            {title: '授权人ID', field: 'authorizesId'},
            {title: '创建时间', field: 'createdTime'},
            {title: '更新时间', field: 'updateTime'},
            {title: '默认卡片  1:默认', field: 'defaultCard'},
            {title: '排序', field: 'sortNum'},
            {title: '解绑', field: 'delFalg'}
        ],
        //条件查询
        queryParams: vm.params
    });
    //表单提交
    $("#addCardForm").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        cardList: [],
        bankCard: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            name: {message: '姓名验证失败', validators: {notEmpty: {message: '姓名不能为空'},},},
            idcard: {message: '身份证验证失败', validators: {notEmpty: {message: '身份证不能为空'},},},
            bankCardNumber: {message: '银行卡号验证失败', validators: {notEmpty: {message: '银行卡号不能为空'},},},
            phone: {message: '手机号码验证失败', validators: {notEmpty: {message: '手机号码不能为空'},regexp:{regexp: /^1[3456789]\d{9}$/,message:'手机号码不正确'}},},
            companyId: {message: '公司ID验证失败', validators: {notEmpty: {message: '公司ID不能为空'},},},
            deptId: {message: '部门ID验证失败', validators: {notEmpty: {message: '部门ID不能为空'},},},
            createBy: {message: '创建人ID验证失败', validators: {notEmpty: {message: '创建人ID不能为空'},},},
            authorizesId: {message: '授权人ID验证失败', validators: {notEmpty: {message: '授权人ID不能为空'},},},
            createdTime: {message: '创建时间验证失败', validators: {notEmpty: {message: '创建时间不能为空'},},},
            updateTime: {message: '更新时间验证失败', validators: {notEmpty: {message: '更新时间不能为空'},},},
            defaultCard: {message: '默认卡片  1:默认验证失败', validators: {notEmpty: {message: '默认卡片  1:默认不能为空'},},},
            sortNum: {message: '排序验证失败', validators: {notEmpty: {message: '排序不能为空'},},},
            delFalg: {message: '解绑验证失败', validators: {notEmpty: {message: '解绑不能为空'},},}
        }
    },
    methods: {
        addCard: function () {
            vm.saveOrUpdate();
        },
        queryBankCard: function (cardNum) {
            $.get(baseURL + 'bill/bankcard/queryBackCard?cardNo=' + cardNum, function (obj) {
                if (obj.code == '0') {
                    console.log(obj.cardinfo);
                } else {
                    alert(obj.msg);
                }
            })
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.bankCard = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.bankCard.id == null ? "bill/bankcard/save" : "bill/bankcard/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.bankCard),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "bill/bankcard/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getData: function () {
            $.get(baseURL + "bill/bankcard/list/", function (r) {
                if (r.code == '0')
                    vm.cardList = r.rows;
                else
                    alert(r.msg);
            });
        },
        getInfo: function (id) {
            $.get(baseURL + "bill/bankcard/info/" + id, function (r) {
                vm.bankCard = r.bankCard;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    },
    created: function () {
        this.getData();
    }

});