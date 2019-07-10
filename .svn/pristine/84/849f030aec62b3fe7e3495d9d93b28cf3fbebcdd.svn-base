$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'paymentRecord/paymentrecord/list',
        columns: [
            {checkbox: true},
            {title: '账单号', field: 'billId'},
            {title: '金额', field: 'amount'},
            {title: '日期', field: 'date'},
            {title: '支付状态 0：待付款 1：已付款', field: 'payStatus'},
            {title: '支付方式 0：线下支付 1：在线支付', field: 'payMethod'},
            {title: '收款账号', field: 'payeeNumber'},
            {title: '付款账号', field: 'payerNumber'},
            {title: '收款方户名', field: 'payeeName'},
            {title: '付款方户名', field: 'payerName'},
            {title: '收款方银行', field: 'payeeBank'},
            {title: '付款方银行', field: 'payerBank'},
            {title: '付款时间', field: 'paymentTime'},
            {title: '确认收款时间', field: 'receivingTime'},
            {title: '确认状态 0：待确认 1：已确认', field: 'confirmStatus'},
            {title: '实收金额', field: 'amountCollected'},
            {title: '备注', field: 'remarks'},
            {title: '操作人', field: 'operator'},
            {title: '权限部门id', field: 'deptId'},
            {title: '创建人', field: 'createBy'},
            {title: '创建时间', field: 'createdTime'},
            {title: '修改人', field: 'updateBy'},
            {title: '修改时间', field: 'updateTime'},
            {title: '公司id', field: 'companyId'},
            {title: '授权用户id', field: 'authorizesId'}
        ],
        //条件查询
        queryParams: vm.params
    });
    //表单提交
    $("form").FM({
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
        paymentRecord: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            billId: {
                message: '账单号验证失败',
                validators: {
                    notEmpty: {
                        message: '账单号不能为空'
                    },
                },
            }, amount: {
                message: '金额验证失败',
                validators: {
                    notEmpty: {
                        message: '金额不能为空'
                    },
                },
            }, date: {
                message: '日期验证失败',
                validators: {
                    notEmpty: {
                        message: '日期不能为空'
                    },
                },
            }, payStatus: {
                message: '支付状态 0：待付款 1：已付款验证失败',
                validators: {
                    notEmpty: {
                        message: '支付状态 0：待付款 1：已付款不能为空'
                    },
                },
            }, payMethod: {
                message: '支付方式 0：线下支付 1：在线支付验证失败',
                validators: {
                    notEmpty: {
                        message: '支付方式 0：线下支付 1：在线支付不能为空'
                    },
                },
            }, payeeNumber: {
                message: '收款账号验证失败',
                validators: {
                    notEmpty: {
                        message: '收款账号不能为空'
                    },
                },
            }, payerNumber: {
                message: '付款账号验证失败',
                validators: {
                    notEmpty: {
                        message: '付款账号不能为空'
                    },
                },
            }, payeeName: {
                message: '收款方户名验证失败',
                validators: {
                    notEmpty: {
                        message: '收款方户名不能为空'
                    },
                },
            }, payerName: {
                message: '付款方户名验证失败',
                validators: {
                    notEmpty: {
                        message: '付款方户名不能为空'
                    },
                },
            }, payeeBank: {
                message: '收款方银行验证失败',
                validators: {
                    notEmpty: {
                        message: '收款方银行不能为空'
                    },
                },
            }, payerBank: {
                message: '付款方银行验证失败',
                validators: {
                    notEmpty: {
                        message: '付款方银行不能为空'
                    },
                },
            }, paymentTime: {
                message: '付款时间验证失败',
                validators: {
                    notEmpty: {
                        message: '付款时间不能为空'
                    },
                },
            }, receivingTime: {
                message: '确认收款时间验证失败',
                validators: {
                    notEmpty: {
                        message: '确认收款时间不能为空'
                    },
                },
            }, confirmStatus: {
                message: '确认状态 0：待确认 1：已确认验证失败',
                validators: {
                    notEmpty: {
                        message: '确认状态 0：待确认 1：已确认不能为空'
                    },
                },
            }, amountCollected: {
                message: '实收金额验证失败',
                validators: {
                    notEmpty: {
                        message: '实收金额不能为空'
                    },
                },
            }, remarks: {
                message: '备注验证失败',
                validators: {
                    notEmpty: {
                        message: '备注不能为空'
                    },
                },
            }, operator: {
                message: '操作人验证失败',
                validators: {
                    notEmpty: {
                        message: '操作人不能为空'
                    },
                },
            }, deptId: {
                message: '权限部门id验证失败',
                validators: {
                    notEmpty: {
                        message: '权限部门id不能为空'
                    },
                },
            }, createBy: {
                message: '创建人验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人不能为空'
                    },
                },
            }, createdTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, updateBy: {
                message: '修改人验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人不能为空'
                    },
                },
            }, updateTime: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }, companyId: {
                message: '公司id验证失败',
                validators: {
                    notEmpty: {
                        message: '公司id不能为空'
                    },
                },
            }, authorizesId: {
                message: '授权用户id验证失败',
                validators: {
                    notEmpty: {
                        message: '授权用户id不能为空'
                    },
                },
            }
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.paymentRecord = {};
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
            var url = vm.paymentRecord.id == null ? "paymentRecord/paymentrecord/save" : "paymentRecord/paymentrecord/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.paymentRecord),
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
                    url: baseURL + "paymentRecord/paymentrecord/delete",
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
            $.get(baseURL + "paymentRecord/paymentrecord/info/" + id, function (r) {
                vm.paymentRecord = r.paymentRecord;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    }
});