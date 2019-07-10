$(function () {
    vm.initTable();

    /* //表单提交
     $("form").FM({
         fields : vm.fields,
         success : vm.saveOrUpdate

     })*/

});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        showGoodParams: {},
        showGoodBuyingParams: {},
        goodsOrder: {},
        recommendGoods: {
            position: 0
        },
        goodsorderpre: {},
        categoryList: {},
        params: {
            position: '',
        },
        companys: [],
        positionList: [
            {value: '', label: '请选择位置'},
            {value: '0', label: '首页'},
            {value: '1', label: '报盘'},
            {value: '2', label: '求购'},
            {value: '3', label: '物流'},
            {value: '4', label: '仓储'},
            {value: '5', label: '报关'},
            {value: '6', label: '代理'}
        ],
        offerType: [
            {value: '', label: '请选择'},
            {value: '0', label: '现货'},
            {value: '1', label: '期货'}
        ],
        flag: null, //模态框的标记--报盘0 求购1
        //验证字段
        fields: {
            type: {
                message: '商品分类验证失败',
                validators: {
                    notEmpty: {
                        message: '商品分类不能为空'
                    },
                },
            }, goodsOfferNo: {
                message: '报盘货物id验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘货物id不能为空'
                    },
                },
            }
        }
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").BT({
                url: baseURL + 'goods/recommendgoods/list',
                columns: [
                    {checkbox: true},
                    {
                        title: vm.$t("position"), field: 'position',
                        formatter: function (value, row, index) {
                            if (row.position == 0) {
                                return "首页"
                            } else if (row.position == 1) {
                                return "报盘"
                            } else if (row.position == 2) {
                                return "求购"
                            } else if (row.position == 3) {
                                return "物流"
                            } else if (row.position == 4) {
                                return "仓储"
                            } else if (row.position == 5) {
                                return "报关"
                            } else if (row.position == 6) {
                                return "代理"
                            }
                        }
                    },
                    {
                        title: vm.$t("type"), field: 'type',
                        formatter: function (value, row, index) {
                            var str = "";
                            if (row.position == 0 || row.position == 1 || row.position == 2) {
                                if (parseInt(row.type) == 1) {
                                    str = "期货";
                                } else if (parseInt(row.type) == 0) {
                                    str = "现货";
                                }
                            } else if (row.position == 3 || row.position == 4 || row.position == 5 || row.position == 6) {
                                if (parseInt(row.type) == 1) {
                                    str = "求购";
                                } else if (parseInt(row.type) == 0) {
                                    str = "报盘";
                                }
                            }
                            return str;
                        }

                    },
                    {title: vm.$t("productName"), field: 'productName'},
                    {title: vm.$t("business"), field: 'companyName'},
                    { title: vm.$t("status"),
                        formatter: function (value, row, index) {
                            if (row.status == 0) {
                                return "上架"
                            } else if (row.status == 1){
                                return "下架"
                            }
                        }
                    }
                ],
                //条件查询
                queryParams: vm.params
            });
            /* //初始化货物添加列表
             $("#addGoodTable").bootstrapTable("destroy")
             $("#addGoodTable").BT({
                 url: baseURL + 'offer/goodsoffer/list',
                 columns: vm.getAddTableColumns(),
                 queryParams: vm.showGoodParams
             });
             //初始化求购列表
             $("#addGoodBuyingTable").bootstrapTable("destroy")
             $("#addGoodBuyingTable").BT({
                 url: baseURL + 'offer/goodsbuying/list',
                 columns: vm.getBuyingTableColumns(),
                 queryParams: vm.showGoodBuyingParams
             });*/
        },
        //上架
        upperShelves: function () {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }
            $.ajax({
                type: "POST",
                url: baseURL + "goods/recommendgoods/upper",
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

        },
        //下架
        lowerShelves: function () {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }
            $.ajax({
                type: "POST",
                url: baseURL + "goods/recommendgoods/lower",
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
        },
        query: function () {
            vm.reload();
        },
        offerQuery: function () {
            $("#addGoodTable").bootstrapTable("destroy")
            $("#addGoodTable").BT({
                url: baseURL + 'offer/goodsoffer/list',
                columns: vm.getAddTableColumns(),
                queryParams: vm.showGoodParams
            })
        },
        buyingQuery: function () {
            $("#addGoodTable").bootstrapTable("destroy")
            $("#addGoodTable").BT({
                url: baseURL + 'offer/goodsbuying/list',
                columns: vm.getBuyingTableColumns(),
                queryParams: vm.showGoodBuyingParams
            })
        },
        //显示选择货物报盘modal
        showMModal: function () {
            vm.flag = 0;
            $('#myModal').modal('show');
        },
        //显示选择货物求购modal
        buyingModalShow: function () {
            vm.flag = 1;
            $('#myModal').modal('show');
        },
        //添加货物事件
        addGood: function () {
            var grid = $('#addGoodTable').bootstrapTable('getSelections');
            if (!grid.length) {
                alert("请选择一条记录");
                return;
            }
            if (grid.length > 1) {
                alert("只能选择一条记录");
                return;
            }
            grid.forEach(function (item) {
                item.totalPrice = item.goodsPrice;
                console.log(item['goodsNumber'])
                if (item['goodsNumber'] != null && item['goodsNumber'] != "") {
                    vm.recommendGoods.goodsOfferNo = item['goodsNumber'];
                    $("input[name=goodsOfferNo]").val(item['goodsNumber']);
                } else if (item['titleName'] != null && item['titleName'] != "") {
                    vm.recommendGoods.goodsOfferNo = item['titleName'];
                    $("input[name=goodsOfferNo]").val(item['titleName']);
                }
                vm.recommendGoods.sellId = item.companyId;
                if (vm.recommendGoods.position == 0) {  //首页
                    if (item.goodsType == 0) {   //期货
                        vm.recommendGoods.type = 1;
                    } else if (item.goodsType == 1) {    //现货
                        vm.recommendGoods.type = 0;
                    }
                }
                //vm.addids.push(item['goodsNumber']);
            })
            $('#myModal').modal('hide');
            //  $("#addTable").bootstrapTable('append', grid)
        },
        //货物添加货物列表的列配置
        getAddTableColumns: function () {
            var columns = [
                {checkbox: true},
                {title: vm.$t('offerCode'), field: 'goodsNumber'},
                {title: vm.$t('productName'), field: 'goodsName'},
                {title: vm.$t('price'), field: 'goodsPromotionPrice'},
                {
                    title: vm.$t('productTypes'), field: 'goodsType', formatter: function (value, row, index) {
                        if (value == 0) {
                            return "期货"
                        } else {
                            return "现货"
                        }
                    }
                },
            ]
            return columns;
        },
        //求购列表配置
        getBuyingTableColumns: function () {
            var columns = [
                {checkbox: true},
                {title: vm.$t("title"), field: 'titleName'},
                {
                    title: vm.$t('PurchaseClassification'),
                    field: 'goodsType',
                    formatter: function (value, row, index) {
                        if (row.buyingType == 0) {
                            return "期货"
                        }
                        return "现货"
                    }
                },
                {title: vm.$t("productName"), field: 'commodityName'},
                {title: vm.$t("BudgetaryPrice"), field: 'commodityPrice'},
                {title: vm.$t("place"), field: 'commodityCountryName'},
                {title: vm.$t("num"), field: 'commodityCount'},
            ]
            return columns;
        },
        add: function () {
            $.get(baseURL + "goods/recommendgoods/getCategory", function (r) {
                console.log(r);
                vm.categoryList = r.list;
                vm.showList = false;
                vm.title = "新增";
                vm.recommendGoods = {};
            })
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
            //验证同一位置的数量
            $.get(baseURL + "goods/recommendgoods/getCountByPosition?position=" + vm.recommendGoods.position + "&type=" + vm.recommendGoods.type, function (r) {
                var flag = true;
                var errMsg = "";
/*
                switch (vm.recommendGoods.position) {
                    case '0':
                        if (r.count == 4) {
                            flag = false;
                            errMsg = "首页推荐已达上限";
                        }
                        break;
                    case '1':
                        if (r.count == 6) {
                            flag = false;
                            if (vm.recommendGoods.type == 1) {
                                errMsg = "报盘期货推荐已达上限";
                            } else {
                                errMsg = "报盘现货推荐已达上限";
                            }

                        }
                        break;
                    case '2':
                        if (r.count == 6) {
                            flag = false;
                            if (vm.recommendGoods.type == 1) {
                                errMsg = "求购期货推荐已达上限";
                            } else {
                                errMsg = "求购现货推荐已达上限";
                            }
                        }
                        break;
                    case '3':
                        if (r.count == 6) {
                            flag = false;
                            if (vm.recommendGoods.type == 1) {
                                errMsg = "物流求购商家推荐已达上限";
                            } else {
                                errMsg = "物流商家推荐已达上限";
                            }
                        }
                        break;
                    case '4':
                        if (r.count == 6) {
                            flag = false;
                            if (vm.recommendGoods.type == 1) {
                                errMsg = "仓储求购商家推荐已达上限";
                            } else {
                                errMsg = "仓储商家推荐已达上限";
                            }
                        }
                        break;
                    case '5':
                        if (r.count == 6) {
                            flag = false;
                            if (vm.recommendGoods.type == 1) {
                                errMsg = "报关求购商家推荐已达上限";
                            } else {
                                errMsg = "报关商家推荐已达上限";
                            }
                        }
                        break;
                    case '6':
                        if (r.count == 6) {
                            flag = false;
                            if (vm.recommendGoods.type == 1) {
                                errMsg = "代理求购商家推荐已达上限";
                            } else {
                                errMsg = "代理商家推荐已达上限";
                            }
                        }
                        break;
                }
*/
                if (!flag) {
                    alert(errMsg);
                } else {
                    layer.load();
                    if (vm.recommendGoods.position == "" || vm.recommendGoods.position == null) {
                        alert("请选择位置");
                        layer.closeAll();
                        return false;
                    } else if (vm.recommendGoods.position == 0) {
                        if (vm.recommendGoods.goodsOfferNo == null || vm.recommendGoods.goodsOfferNo == "") {
                            alert("请选择报盘信息");
                            layer.closeAll();
                            return;
                        }
                    } else if (vm.recommendGoods.position == 1 || vm.recommendGoods.position == 2) {
                        if (vm.recommendGoods.type == null || vm.recommendGoods.type == "") {
                            alert("请选择类型");
                            layer.closeAll();
                            return;
                        }
                        if (vm.recommendGoods.goodsOfferNo == null || vm.recommendGoods.goodsOfferNo == "") {
                            alert("请选择报盘信息");
                            layer.closeAll();
                            return;
                        }
                    } else if (vm.recommendGoods.position == 3 || vm.recommendGoods.position == 4 || vm.recommendGoods.position == 5 || vm.recommendGoods.position == 6) {
                        if (vm.recommendGoods.type == null || vm.recommendGoods.type == "") {
                            alert("请选择类型");
                            layer.closeAll();
                            return;
                        }
                        if (vm.recommendGoods.sellId == "" || vm.recommendGoods.sellId == null) {
                            alert("请选择商家");
                            layer.closeAll();
                            return false;
                        }
                    }
                    var url = vm.recommendGoods.id == null ? "goods/recommendgoods/save" : "goods/recommendgoods/update";
                    $.ajax({
                        type: "POST",
                        url: baseURL + url,
                        contentType: "application/json",
                        data: JSON.stringify(vm.recommendGoods),
                        success: function (r) {
                            layer.closeAll();
                            if (r.code === 0) {
                                alert('操作成功', function (index) {
                                    vm.reload();
                                });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                }
            })
        },
        returnReload: function () {
            location.reload();
        },
        del: function (event) {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "goods/recommendgoods/delete",
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
            $.get(baseURL + "goods/recommendgoods/info/" + id, function (r) {
                vm.recommendGoods = r.recommendGoods;
            });
        },
        //改变类型
        changeType: function () {
            vm.recommendGoods.type = '';
            vm.recommendGoods.goodsOfferNo = '';
            vm.recommendGoods.sellId = '';
            if (vm.recommendGoods.position == 3 || vm.recommendGoods.position == 4 || vm.recommendGoods.position == 5 || vm.recommendGoods.position == 6) {
                var rows;
                vm.positionList.forEach(function (item) {
                    if (item.value == vm.recommendGoods.position) {
                        //查询对应的商家
                        $.ajax({
                            url: baseURL + "company/merchantusers/getCompanyByService",
                            type: 'POST',
                            data: JSON.stringify({'serviceName': item.label}),
                            async: false,
                            success: function (data) {
                                console.log(data);
                                rows = data.list;
                                rows = JSON.stringify(rows);
                                rows = rows.replace(/id/g, "value").replace(/companyName/g, "label");
                                vm.companys = JSON.parse(rows);
                            }
                        })

                    }
                })

            } else if (vm.recommendGoods.position == 2) {
                $("#addGoodTable").bootstrapTable("destroy")
                $("#addGoodTable").BT({
                    url: baseURL + 'offer/goodsbuying/list',
                    columns: vm.getBuyingTableColumns(),
                    queryParams: vm.showGoodBuyingParams
                })
            } else {
                $("#addGoodTable").bootstrapTable("destroy")
                $("#addGoodTable").BT({
                    url: baseURL + 'offer/goodsoffer/list',
                    columns: vm.getAddTableColumns(),
                    queryParams: vm.showGoodParams
                })
            }
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