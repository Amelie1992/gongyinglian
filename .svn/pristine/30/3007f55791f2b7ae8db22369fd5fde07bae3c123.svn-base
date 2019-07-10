$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'storage/storageoutcommodity/list',
        columns: [
            {checkbox: true},
            {title: '出库id', field: 'outId'},
            {title: '订单号', field: 'orderNumber'},
            {title: '订单商品表id', field: 'orderCommodityId'},
            {title: '商品名称', field: 'commodityName'},
            {title: '商品编号', field: 'commodityNumber'},
            {title: '商品价格', field: 'commodityPrice'},
            {title: '商品单位', field: 'commodityUnit'},
            {title: '厂号', field: 'commodityFactoryNumber'},
            {title: '产地', field: 'commodityCountry'},
            {title: '重量', field: 'weight'},
            {title: '仓库方填写的数量', field: 'outWeight'},
            {title: '单位：0，吨；1，托', field: 'outUnit'},
            {title: '生产日期', field: 'productionDate'},
            {title: '保质期', field: 'qualityTime'},
            {title: '有效期截止日期', field: 'expirationDate'},
            {title: '报检号', field: 'inspectionNo'},
            {title: '集装箱号', field: 'containerNo'}
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
        storageOutCommodity: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            outId: {
                message: '出库id验证失败',
                validators: {
                    notEmpty: {
                        message: '出库id不能为空'
                    },
                },
            }, orderNumber: {
                message: '订单号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单号不能为空'
                    },
                },
            }, orderCommodityId: {
                message: '订单商品表id验证失败',
                validators: {
                    notEmpty: {
                        message: '订单商品表id不能为空'
                    },
                },
            }, commodityName: {
                message: '商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    },
                },
            }, commodityNumber: {
                message: '商品编号验证失败',
                validators: {
                    notEmpty: {
                        message: '商品编号不能为空'
                    },
                },
            }, commodityPrice: {
                message: '商品价格验证失败',
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    },
                },
            }, commodityUnit: {
                message: '商品单位验证失败',
                validators: {
                    notEmpty: {
                        message: '商品单位不能为空'
                    },
                },
            }, commodityFactoryNumber: {
                message: '厂号验证失败',
                validators: {
                    notEmpty: {
                        message: '厂号不能为空'
                    },
                },
            }, commodityCountry: {
                message: '产地验证失败',
                validators: {
                    notEmpty: {
                        message: '产地不能为空'
                    },
                },
            }, weight: {
                message: '重量验证失败',
                validators: {
                    notEmpty: {
                        message: '重量不能为空'
                    },
                },
            }, outWeight: {
                message: '仓库方填写的数量验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库方填写的数量不能为空'
                    },
                },
            }, outUnit: {
                message: '单位：0，吨；1，托验证失败',
                validators: {
                    notEmpty: {
                        message: '单位：0，吨；1，托不能为空'
                    },
                },
            }, productionDate: {
                message: '生产日期验证失败',
                validators: {
                    notEmpty: {
                        message: '生产日期不能为空'
                    },
                },
            }, qualityTime: {
                message: '保质期验证失败',
                validators: {
                    notEmpty: {
                        message: '保质期不能为空'
                    },
                },
            }, expirationDate: {
                message: '有效期截止日期验证失败',
                validators: {
                    notEmpty: {
                        message: '有效期截止日期不能为空'
                    },
                },
            }, inspectionNo: {
                message: '报检号验证失败',
                validators: {
                    notEmpty: {
                        message: '报检号不能为空'
                    },
                },
            }, containerNo: {
                message: '集装箱号验证失败',
                validators: {
                    notEmpty: {
                        message: '集装箱号不能为空'
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
            vm.storageOutCommodity = {};
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
            var url = vm.storageOutCommodity.id == null ? "storage/storageoutcommodity/save" : "storage/storageoutcommodity/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.storageOutCommodity),
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
                    url: baseURL + "storage/storageoutcommodity/delete",
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
            $.get(baseURL + "storage/storageoutcommodity/info/" + id, function (r) {
                vm.storageOutCommodity = r.storageOutCommodity;
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