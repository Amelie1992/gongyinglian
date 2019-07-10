$(function () {

    vm.initTable();

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
        storagePay: {},
        params: {
            orderNumber: '',
        },
//验证字段
        fields: {
            orderCommodityId: {
                message: '订单货物商品表id验证失败',
                validators: {
                    notEmpty: {
                        message: '订单货物商品表id不能为空'
                    },
                },
            }, orderId: {
                message: '订单id验证失败',
                validators: {
                    notEmpty: {
                        message: '订单id不能为空'
                    },
                },
            }, orderNumber: {
                message: '订单编号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单编号不能为空'
                    },
                },
            }, goodsOfferId: {
                message: '货物报盘id验证失败',
                validators: {
                    notEmpty: {
                        message: '货物报盘id不能为空'
                    },
                },
            }, commodityId: {
                message: '商品id验证失败',
                validators: {
                    notEmpty: {
                        message: '商品id不能为空'
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
            }, commodityUnit: {
                message: '商品单位验证失败',
                validators: {
                    notEmpty: {
                        message: '商品单位不能为空'
                    },
                },
            }, commodityPrice: {
                message: '商品价格验证失败',
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    },
                },
            }, commodityCount: {
                message: '商品数量验证失败',
                validators: {
                    notEmpty: {
                        message: '商品数量不能为空'
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
            }, unit: {
                message: '仓库报盘的单位：0，元/吨/天；1，元/托/天验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库报盘的单位：0，元/吨/天；1，元/托/天不能为空'
                    },
                },
            }, payMoney: {
                message: '费用验证失败',
                validators: {
                    notEmpty: {
                        message: '费用不能为空'
                    },
                },
            }, payStatus: {
                message: '状态: 0:待付款、1:已付款验证失败',
                validators: {
                    notEmpty: {
                        message: '状态: 0:待付款、1:已付款不能为空'
                    },
                },
            }, createdTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }
        }
    },
    methods: {

        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'storage/storagepay/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {title: vm.$t("productName"), field: 'commodityName'},
                    {title: vm.$t("CommodityPrices"), field: 'commodityPrice'},
                    {title: vm.$t("CommodityUnit"), field: 'commodityUnit'},
                    {title: vm.$t("TheNumber"), field: 'commodityCount'},
                    {title: vm.$t("FactoryNumber"), field: 'commodityFactoryNumber'},
                    {title: vm.$t("place"), field: 'countryName'},
                    {title: vm.$t("height"), field: 'weight'},
                    {title: vm.$t("WarehouseUnit"), field: 'unit',formatter:function(value,row,index){
                            var ss='';
                            if(row.unit==0){
                                ss+='元/吨/天';
                            }else if(row.unit==1){
                                ss+='元/托/天';
                            }
                            return ss;
                        }},
                    {title: vm.$t("cost"), field: 'payMoney'},
                    {title: vm.$t("status"), field: 'payStatus',formatter:function(value,row,index){
                            var ss='';
                            if(row.payStatus==0){
                                ss+='待付款';
                            }else if(row.payStatus==1){
                                ss+='已付款';
                            }
                            return ss;
                        }},
                    {title: vm.$t("CreationTime"), field: 'createdTime'}
                ],
                //条件查询
                queryParams: vm.params
            });

        },

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.storagePay = {};
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
            var url = vm.storagePay.id == null ? "storage/storagepay/save" : "storage/storagepay/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.storagePay),
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
                    url: baseURL + "storage/storagepay/delete",
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
            $.get(baseURL + "storage/storagepay/info/" + id, function (r) {
                vm.storagePay = r.storagePay;
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

    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            this.initTable();
        },
    },
});