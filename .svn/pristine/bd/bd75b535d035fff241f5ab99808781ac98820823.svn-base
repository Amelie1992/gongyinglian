$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'order/goodsordercinfo/list',
        columns: [
            {checkbox: true},
            {title: '关联订单id', field: 'orderId'},
            {title: '收货人Id', field: 'consigneeId'},
            {title: '收货人名称', field: 'consigneeName'},
            {title: '收货人电话', field: 'consigneePhone'},
            {title: '收货地址', field: 'consigneeAddress'},
            {title: '收货人所在区域', field: 'consigneeArea'},
            {title: '收货人邮编', field: 'consigneeZipCode'},
            {title: '公司名称', field: 'companyName'},
            {title: '公司英文名称', field: 'companyEnglishName'},
            {title: '企业注册地址', field: 'companyEra'},
            {title: '企业社会统一代码', field: 'companyUscc'},
            {title: '企业地址别名', field: 'companyAddressAlias'},
            {title: '企业目的港', field: 'companyPod'}
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
    data: {
        showList: true,
        title: null,
        goodsOrderCinfo: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            orderId: {
                message: '关联订单id验证失败',
                validators: {
                    notEmpty: {
                        message: '关联订单id不能为空'
                    },
                },
            }, consigneeId: {
                message: '收货人Id验证失败',
                validators: {
                    notEmpty: {
                        message: '收货人Id不能为空'
                    },
                },
            }, consigneeName: {
                message: '收货人名称验证失败',
                validators: {
                    notEmpty: {
                        message: '收货人名称不能为空'
                    },
                },
            }, consigneePhone: {
                message: '收货人电话验证失败',
                validators: {
                    notEmpty: {
                        message: '收货人电话不能为空'
                    },
                },
            }, consigneeAddress: {
                message: '收货地址验证失败',
                validators: {
                    notEmpty: {
                        message: '收货地址不能为空'
                    },
                },
            }, consigneeArea: {
                message: '收货人所在区域验证失败',
                validators: {
                    notEmpty: {
                        message: '收货人所在区域不能为空'
                    },
                },
            }, consigneeZipCode: {
                message: '收货人邮编验证失败',
                validators: {
                    notEmpty: {
                        message: '收货人邮编不能为空'
                    },
                },
            }, companyName: {
                message: '公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '公司名称不能为空'
                    },
                },
            }, companyEnglishName: {
                message: '公司英文名称验证失败',
                validators: {
                    notEmpty: {
                        message: '公司英文名称不能为空'
                    },
                },
            }, companyEra: {
                message: '企业注册地址验证失败',
                validators: {
                    notEmpty: {
                        message: '企业注册地址不能为空'
                    },
                },
            }, companyUscc: {
                message: '企业社会统一代码验证失败',
                validators: {
                    notEmpty: {
                        message: '企业社会统一代码不能为空'
                    },
                },
            }, companyAddressAlias: {
                message: '企业地址别名验证失败',
                validators: {
                    notEmpty: {
                        message: '企业地址别名不能为空'
                    },
                },
            }, companyPod: {
                message: '企业目的港验证失败',
                validators: {
                    notEmpty: {
                        message: '企业目的港不能为空'
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
            vm.goodsOrderCinfo = {};
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
            var url = vm.goodsOrderCinfo.id == null ? "order/goodsordercinfo/save" : "order/goodsordercinfo/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOrderCinfo),
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
                    url: baseURL + "order/goodsordercinfo/delete",
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
            $.get(baseURL + "order/goodsordercinfo/info/" + id, function (r) {
                vm.goodsOrderCinfo = r.goodsOrderCinfo;
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