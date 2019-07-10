$(function () {

    vm.initTable();

    //表单提交
    $("#addCardForm").FM({fields: vm.cardfields, success: vm.saveCard});
    $("#transferaccountsForm").FM({fields: vm.transferaccountsFields, success: vm.ztransferModal});
});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: 6,
        title: '我的明细',
        title1: '',
        myAccount: {},
        cardList: [],
        bankCard: {},
        transfer: {
            type: 0
        },
        detail: {},
        images: [],
        // linkOrderList: ['不关联','关联'],
        // paymentTypeList: ['线下支付','在线支付'],
        params: {
            orderNumber: '',
        },
        //验证字段
        fields: {
            account: {message: '账户验证失败', validators: {notEmpty: {message: '账户不能为空'},},},
            balance: {message: '余额验证失败', validators: {notEmpty: {message: '余额不能为空'},},},
            createBy: {message: '用户ID验证失败', validators: {notEmpty: {message: '用户ID不能为空'},},},
            updateTime: {message: '更新时间验证失败', validators: {notEmpty: {message: '更新时间不能为空'},},}
        },
        cardfields: {
            name: {message: '姓名验证失败', validators: {notEmpty: {message: '姓名不能为空'},},},
            idcard: {
                message: '身份证验证失败', validators: {
                    notEmpty: {message: '身份证不能为空'},
                    regexp: {
                        regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                        message: '身份证号码格式不正确，为15位和18位身份证号码！'
                    }
                },
            },
            bankCardNumber: {
                message: '银行卡号验证失败',
                validators: {
                    notEmpty: {message: '银行卡号不能为空'},
                    stringLength: {//检测长度
                        min: 16,
                        max: 19,
                        message: '长度必须在16-19之间'
                    },
                    regexp: {
                        regexp: /^([1-9]{1})(\d{14}|\d{18})$/,
                        message: '银行卡号不正确'
                    }
                },
            },
            phone: {
                message: '手机号码验证失败',
                validators: {
                    notEmpty: {message: '手机号码不能为空'},
                    regexp: {regexp: /^1[3456789]\d{9}$/, message: '手机号码不正确'}
                },
            },
            defaultCard: {message: '默认卡片  1:默认验证失败', validators: {notEmpty: {message: '默认卡片  1:默认不能为空'},},},
        },
        transferaccountsFields: {
            orderno: {message: '订单号验证失败', validators: {notEmpty: {message: '订单号不能为空'},},},
            payee: {message: '收款人验证失败', validators: {notEmpty: {message: '收款人不能为空'},},},
            money: {message: '付款金额验证失败', validators: {notEmpty: {message: '付款金额不能为空'},},},
        }
    },
    methods: {
        // 转账
        zhuanZhang: function () {
            window.location.href = '/modules/bill/pay.html';
        },
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少

            $("#table").BT({
                url: baseURL + 'bill/incomeexpendituredetail/list',
                columns: [
                    {checkbox: true},
                    // {title: vm.$t("account"), field: 'accountNo'},
                    {
                        title: vm.$t("AreAssociatedOrders"), field: 'linkOrder',
                        formatter: function (value) {
                            if (value == 0) {
                                return "否"
                            } else if (value == 1) {
                                return "是"
                            }
                        }
                    },
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {
                        title: vm.$t("income"), field: 'income2',
                        formatter: function (value, row, index) {
                            if (!isBlank(value)) {
                                if (row.unit === 0) {
                                    return value + '&nbsp;元';
                                } else if (row.unit === 1) {
                                    return value + '&nbsp;美元';
                                }
                            }
                        }
                    },
                    {
                        title: vm.$t("expenditure"), field: 'expenditur2',
                        formatter: function (value, row, index) {
                            if (!isBlank(value)) {
                                if (row.unit === 0) {
                                    return value + '&nbsp;元';
                                } else if (row.unit === 1) {
                                    return value + '&nbsp;美元';
                                }
                            }
                        }
                    },
                    // {
                    //     title: vm.$t("PaymentMethod"), field: 'paymentType',
                    //     formatter: function (value) {
                    //         if (value == 0) {
                    //             return "线下支付"
                    //         } else if (value == 1) {
                    //             return "在线支付"
                    //         }
                    //     }
                    // },
                    {title: vm.$t("FlowNumber"), field: 'serialNumber'},
                    {title: vm.$t("Remarks"), field: 'remarks'},
                    {title: vm.$t("CreationTime"), field: 'createdTime'},
                    {
                        title: vm.$t("chaozuo"), field: 'id',
                        formatter: function (value) {
                            return "<a href='javascript:void(0)' class='getInfo'>查看详情</a>"
                        },
                        events: {
                            "click .getInfo": function (events, value) {
                                vm.getDetail(value);
                                vm.showList = 7;
                                vm.title1 = "详情";
                            }
                        }
                    }

                ],
                //条件查询
                queryParams: vm.params
            });
        },
        getDetail: function (id) {
            $.get(baseURL + "bill/incomeexpendituredetail/info/" + id, function (r) {
                vm.detail = r.incomeExpenditureDetail;
                if (vm.detail.linkOrder == 0) {
                    vm.detail.linkOrder = '否';
                } else if (vm.detail.linkOrder == 1) {
                    vm.detail.linkOrder = '是';
                }
                if (vm.detail.paymentType == 0) {
                    vm.detail.paymentType = '线下支付';
                } else if (vm.detail.paymentType == 1) {
                    vm.detail.paymentType = '在线支付';
                }
            });
        },
        getCardList: function () {
            $.get(baseURL + "bill/bankcard/list/", function (r) {
                if (r.code == '0')
                    vm.cardList = r.rows;
                else
                    alert(r.msg);
            });
        },
        addCard: function () {
            vm.saveCard();
        },
        saveCard: function () {
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
        showDiv: function (idx) {
            //  充值
            if (idx == '2') {

                //  提现
            } else if (idx == '3') {
                // 银行卡管理
            } else if (idx == '4') {
                vm.title = '我的银行卡';
                vm.getCardList();
                // 转账
            } else if (idx == '5') {
                vm.title = '转账';
            } else if (idx == '6') {
                vm.title = '明细';
                vm.params.accountNo = vm.myAccount.account;
                vm.initTable();
            }
            vm.showList = idx;
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.myAccount = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = 1;
            vm.title = "修改";

            vm.getInfo(id)
        },
        //表单验证
        cardvalidate: function () {
            var bl = $('#addCardForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //表单验证
        transferaccountsvalidate: function () {
            //表单提交
            $("#transferaccountsForm").FM({fields: vm.transferaccountsFields, success: vm.ztransferModal});

            var bl = $('#transferaccountsForm').VF();//启用验证
            if (!bl) {
                return;
            }


        },
        ztransferModal: function () {
            // 显示转账信息
            $('#ztransferModal').modal('show')
        },
        saveOrUpdate: function (event) {
            var url = vm.myAccount.id == null ? "bill/myaccount/save" : "bill/myaccount/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.myAccount),
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
                    url: baseURL + "bill/myaccount/delete",
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
        getInfo: function (id) {
            $.get(baseURL + "bill/myaccount/info/" + id, function (r) {
                vm.myAccount = r.myAccount;
            });
        },
        reload: function (event) {
            vm.showList = 1;
            vm.title = "我的明细";
            //刷新 如需条件查询common.js
            // $("#table").BTF5(vm.params);
            $("#table").bootstrapTable("destroy");
            $("#addCardForm").RF();
            $("#transferaccountsForm").RF();
        },
        back: function (event) {
            vm.showList = 6;
            vm.title = "我的明细";
            vm.initTable();
        }
    }, created: function () {
        /* $.get(baseURL + 'bill/myaccount/queryMyAccount', function (obj) {
             if (obj.code == '0' && obj.myAccountEntity != null)
                 vm.myAccount = obj.myAccountEntity;
         })*/
    }, watch: {
        /*"transfer.type": function (newValue, oldValue) {

        }*/

        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            this.initTable();
        },


        'transfer.type': {
            handler: function (newValue, oldValue) {
                try {
                    $('#transferaccountsForm').data('bootstrapValidator').destroy();
                    $('#transferaccountsForm').data('bootstrapValidator', null);
                } catch (e) {

                }

            },
            // immediate:true, // 是否以当前的初始值执行handler的函数
            // deep: true //深度监听
        }
    }
});