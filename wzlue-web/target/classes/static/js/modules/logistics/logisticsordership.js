$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'logisticsoffer/logisticsordership/list',
        columns: [
            {checkbox: true},
            {title: '订单id', field: 'orderId'},
            {title: '物流公司id', field: 'logisticsCompanyId'},
            {title: '物流单号', field: 'logisticsNumber'},
            {title: '车牌号', field: 'numberPlate'},
            {title: '驾驶员姓名', field: 'driverName'},
            {title: '驾驶员号码', field: 'driverNumber'},
            {title: '驾驶员身份证号', field: 'driverIdNumber'},
            {title: '备注。', field: 'remark'}
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
        logisticsOrderShip: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            orderId: {
                message: '订单id验证失败',
                validators: {
                    notEmpty: {
                        message: '订单id不能为空'
                    },
                },
            }, logisticsCompanyId: {
                message: '物流公司id验证失败',
                validators: {
                    notEmpty: {
                        message: '物流公司id不能为空'
                    },
                },
            }, logisticsNumber: {
                message: '物流单号验证失败',
                validators: {
                    notEmpty: {
                        message: '物流单号不能为空'
                    },
                },
            }, numberPlate: {
                message: '车牌号验证失败',
                validators: {
                    notEmpty: {
                        message: '车牌号不能为空'
                    },
                },
            }, driverName: {
                message: '驾驶员姓名验证失败',
                validators: {
                    notEmpty: {
                        message: '驾驶员姓名不能为空'
                    },
                },
            }, driverNumber: {
                message: '驾驶员号码验证失败',
                validators: {
                    notEmpty: {
                        message: '驾驶员号码不能为空'
                    },
                },
            }, driverIdNumber: {
                message: '驾驶员身份证号验证失败',
                validators: {
                    notEmpty: {
                        message: '驾驶员身份证号不能为空'
                    },
                },
            }, remark: {
                message: '备注。验证失败',
                validators: {
                    notEmpty: {
                        message: '备注。不能为空'
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
            vm.logisticsOrderShip = {};
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
            var url = vm.logisticsOrderShip.id == null ? "logisticsoffer/logisticsordership/save" : "logisticsoffer/logisticsordership/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.logisticsOrderShip),
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
                    url: baseURL + "logisticsoffer/logisticsordership/delete",
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
            $.get(baseURL + "logisticsoffer/logisticsordership/info/" + id, function (r) {
                vm.logisticsOrderShip = r.logisticsOrderShip;
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