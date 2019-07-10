$(function () {
    //----------------------------------1
    vm.initTable();

    //表单提交
    $("#addForm").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });
    $("#afterForm").FM({
        fields: vm.field2,
        success: vm.saveAfterSale
    });
    $("#complaintForm").FM({
        fields: vm.complaintFields,
        success: vm.saveComplaint
    });

});

function change2(th) {
    if (th.value == '1') {
        $('#contractNumber').attr("disabled", true);
    } else {
        $('#contractNumber').removeAttr("disabled");
    }
}

function returnList() {
    location.reload();
}

function typeFmt(value, rows, index) {
    var pyy = rows.unit;
    if (pyy == '0') {
        return '元';
    } else if (pyy == '1') {
        return '美元';
    }
}

window.opEvent = {
    'click #finish': function (e, value, row, index) {
        vm.orderFinish(row.id)
    },
    //投诉触发事件
    /*'click #buyStatus': function (e, value, row, index) {
        vm.complaint = {
            orderId: row.orderNumber,
            orderType: 0,
            reason: '',
            images: []
        };
        $("#myModal").modal('show')
    },*/
    //查看投诉触发事件
    'click #buyStatusDetail': function (e, value, row, index) {
        vm.complaintDeatil(row.orderNumber)
    },
    //取消订单触发事件
    'click #cancel': function (e, value, row, index) {
        //商家接单后2取消5（待商家确认取消）
        confirm('确定要完结订单？', function () {
            if (row.orderState == 0 || row.orderState == 8) {
                row.orderState = 7;
            }else {
                row.orderState = 5;
            }
            vm.updateStatus(row.id, row.orderState);
        })
        // vm.cancel(row.id)
    },
    //查看详情
    'click #btn_detail': function (event, value, row, index) {
        vm.showList = false;
        vm.showList1 = false;
        vm.showList2 = true;
        vm.afterList = false;
        // vm.getCommodityWeightUnit()
        vm.initTable();
        vm.getInfo(row.id);
    },
    //修改
    'click #btn_update': function (event, value, row, index) {
        vm.update(row.id);
    },

    //付款-------------------------------------------------------------------------------
    'click #payment': function (el, value, row, index) {
        vm.showList = false;
        window.location.href = '/modules/bill/bill_payable.html?orderNo=' + row.orderNumber;
        /*  row.orderState = 3;
          vm.updateStatus(row.id,row.orderState);*/
    },

    //确认收货
    'click #sureGoods': function (el, value, row, index) {
        row.orderState = 6;
        vm.updateStatus(row.id, row.orderState);
    },

    //申请售后触发事件
    'click #btn_alter': function (e, value, row, index) {
        vm.afterList = true;
        vm.showList = false;
        vm.showList1 = false;
        vm.showList2 = false;
        vm.afterSale = {
            serviceType: 2,//索赔
            reason: "",
            refundForm: "",
            images: [],
            orderId: row.orderNumber,
            orderType: 0,//订单类型：0：报关 1：货物 2：物流 3：仓储 4：代理'
        }
        vm.getInfo(row.id)
    },
    'click #removeGoods': function (e, value, row, index) {
        var data = $("#goodsTab").bootstrapTable("getData");
        data.splice(index, 1);
        $("#goodsTab").bootstrapTable('load', data);
        //当商品项为0时. 1.解除"添加货物"按钮的禁用, 2.清除订单编号输入框的值, 3.清除绑定的parmas值
        if ($("#goodsTab").bootstrapTable("getData").length <= 0) {
            $("#txtBtn").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            vm.addTxBtn = false;
            vm.params.orderNumber = null;
            // vm.declareOrder.originFlag = 0;
            // vm.declareOrder.originNumber = null;
            // vm.declareOrder.originPayType = null;
            $("#orderNum").val("");
        }
    },
    'change #commodityName': function (e, value, row, index) {
        row.commodityName = $(e.currentTarget).val();
    },
    'change .sltplace': function (e, value, row, index) {
        row.commodityCountry = $(e.currentTarget).val();
    },
    'change .sltUnit': function (e, value, row, index) {
        row.commodityUnit = $(e.currentTarget).val();
    },
    'change #weight': function (e, value, row, index) {
        row.commodityCount = $(e.currentTarget).val();
    },
    'change #factoryNo': function (e, value, row, index) {
        row.commodityFactoryNumber = $(e.currentTarget).val();
    }

}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        aftersaleShow: false, // 售后按钮显示
        saveFlag: false,
        merchantSelect: true,//控制文本显示
        complaintShow: true,//投诉按钮显示
        complaint: {},//投诉信息
        images: [],
        afterList: false,
        showList: true,//主页面
        showList1: false,
        showList2: false,//详情页面
        fileShow: false,//附件显示
        title: null,
        declareOrder: {},
        params: {
            orderNumber: '',
            orderState: ''
        },
        statusSelect: [
            {value: "", label: "选择订单状态"},
            {value: "0", label: "待确认"},
            {value: "1", label: "待支付"},
            {value: "2", label: "已支付"},
            {value: '3', label: '待安排'},
            {value: '4', label: '待收货'},
            {value: '5', label: '待卖家取消'},
            {value: '6', label: '订单完结'},
            {value: '7', label: '订单已取消'},
            {value: '8', label: '待买家取消'}
        ],
//验证字段
        fields: {
            companyId: {
                message: '卖家公司验证失败',
                validators: {
                    notEmpty: {
                        message: '卖家公司不能为空'
                    }, stringLength: {
                        max: 11,
                        message: '长度不超过11位'
                    }
                },
            }, offerId: {
                message: '报盘验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘不能为空'
                    },
                },
            }, buyContacts: {
                message: '联系人',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 20,
                        message: '联系人长度必须在2到20之间'
                    },
                },
            }, buyPhone: {
                message: '联系电话',
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '电话号码不正确'
                    }
                },
            }, buyAddress: {
                message: '地址（买家）验证失败',
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        max: 50,
                        message: '地址长度不超过50字符'
                    }
                },
            }, note: {
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '备注要小于200个字符'
                    },
                },
            },/* goodsNote: {
                message: '补充信息验证失败',
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '补充信息要小于200个字符'
                    },
                },
            },*/
            // num: {
            //     message: '数量验证失败',
            //     validators: {
            //         notEmpty: {
            //             message: '数量不能为空'
            //         },
            //     }
            // },
            total: {
                message: '总价验证失败',
                validators: {
                    notEmpty: {
                        message: '总价不能为空'
                    }, regexp: { //      /^[0-9]{1,10}([.][0-9]{1,2})?$/
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '总价的整数最多9位,小数最多2位'
                    }
                }
            },
            unit: {
                message: '单位验证失败',
                validators: {
                    notEmpty: {
                        message: '单位不能为空'
                    }
                },
            },quantityNew:{
                message: '报关票数验证失败',
                validators: {
                    notEmpty: {
                        message: '报关票数不能为空'
                    }, regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '报关票数为正整数'
                    }
                }
            }


        },
        //售后验证字段
        field2: {
            reason: {
                message: '索赔理由验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择索赔理由'
                    }
                }
            },
            refundForm: {
                message: '退款方式验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择退款方式'
                    }
                }
            },
            description: {
                message: '问题描述验证失败',
                validators: {
                    notEmpty: {
                        message: '请填写问题描述'
                    },
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '问题描述要小于200个字符'
                    },
                }
            },
        },
        complaintFields: {
            reason: {
                validators: {
                    notEmpty: {
                        message: '投诉原因不能为空'
                    },stringLength:{
                        max: 199,
                        message: '投诉原因须少于200个字符'
                    }
                }
            },
        },
        offerList: {},//报关报盘的信息
        fileList: {},//文件信息
        goods: [],
        placeData: [],
        unitList: [{code: 1, name: '吨'}, {code: 2, name: '千克'}],//, {code: 3, name: '柜'}
        offerList: [],
        serviceList: [],
        business: [],
        addTxBtn: false,
        updateStatus1: false,
        companys: [],//报盘公司列表
        offers: [],//该公司下的报盘列表
        orderOfferEntity: {},

        refundFormList: [
            {value: 0, label: '线上支付'},
            {value: 1, label: '线下转账'},
            {value: 2, label: '其他'}
        ],
        reasonList: [
            {value: 0, label: '物品损坏'},
            {value: 1, label: '质量不合格'},
            {value: 2, label: '产品型号错误'},
            {value: 3, label: '其他'}
        ],
        afterSale: {},
        images1: [],
        unitList1: [{code: 0, name: '元/吨'}, {code: 1, name: '元/千克'}, {code: 2, name: '元/柜'}, {
            code: 3,
            name: '元/m³'
        }, {code: 4, name: '美元/m³'}],
        contracts: null

    },
    methods: {
        //获取单价
        getUnitName: function () {
            vm.nextTick(function () {
                if (vm.orderOfferEntity.unit == 0) {
                    return vm.$t("ton");
                } else {
                    return vm.$t("kg");
                }
            })
        },
        //----------------------------------------------------2
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少---------------------3
            $("#table").BT({
                url: baseURL + 'declare/declareorder/list',
                columns: [
                    {checkbox: true},
                    // {title: '商品名称', field: 'orderOfferEntityList.commodityName'},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {title: vm.$t("Buyer"), field: 'buyCompanyName'},
                    {title: vm.$t("Seller"), field: 'merchantCompanyName'},
                    // {title: vm.$t("UnitPrice"), field: 'eachPrice'},
                    {title: vm.$t("PurchaseQuantitie"), field: 'num'},
                    {title: vm.$t("OrderTotalPrice"), field: 'total'},
                    {title: vm.$t("unit"), field: 'unit', formatter: typeFmt},
                    {title: vm.$t("TradingTime"), field: 'createTime'},
                    {
                        title: vm.$t("OrderStatus"), formatter: function (value, row, index) {
                            var status;
                            switch (row.orderState) {
                                case 0:
                                    status = "待确认";
                                    break;
                                case 1:
                                    status = "待支付";
                                    if (row.payState == 1) {
                                        status = '已支付';
                                    }
                                    break;
                                case 2:
                                    status = "已付款";
                                    break;
                                case 3:
                                    status = "待安排";
                                    break;
                                case 4:
                                    status = "待收货";
                                    break;
                                case 5:
                                    status = "待卖家取消";
                                    break;
                                case 6:
                                    status = "订单完结";
                                    break;
                                case 7:
                                    status = "订单已取消";
                                    break;
                                case 8:
                                    status = "待买家取消";
                                    break;
                                default:
                                    if (row.payState == 1) {
                                        status = "已付款";
                                    } else {
                                        status = "待付款";
                                    }
                                    break;
                            }
                            return '<div>' +
                                '<div><span>' + status + '</span></div>' +
                                // '<div><a href="javascript:void(0)" id="btn_detail">查看详情</a></div>' +
                                '</div>'

                        },
                    },
                    {
                        title: vm.$t("Remarks"), field: 'note',
                        formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {        //备注长度大于5，只展示前5个字符
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"), align: 'center', formatter: function (value, row, index) {
                            var op = '';
                           /* if (row.orderState != 7) {
                                if (row.orderState == 0 || row.orderState == 1) {
                                    op += '<button class="btn btn-primary btn-sm" id="cancel"><i class="fa"></i>取消订单</button>&nbsp;';
                                }*/
                                if (row.orderState == 0) {
                                    op += '<button class="btn btn-primary btn-sm" id="btn_update"><i class="fa"></i>修改订单</button>&nbsp;';
                                    op += '<button class="btn btn-primary btn-sm" id="cancel"><i class="fa"></i>取消订单</button>&nbsp;';
                                }
                                if (row.orderState == 1) {
                                    if (row.payState == 0) {
                                        op += '<button class="btn btn-primary btn-sm" id="payment"><i class="fa"></i>点击付款</button>&nbsp;';
                                    }
                                    op += '<button class="btn btn-primary btn-sm" id="cancel"><i class="fa"></i>结束订单</button>&nbsp;';
                                }
                                if (row.orderState == 2 || row.orderState == 3) {
                                    op += '<button class="btn btn-primary btn-sm" id="cancel"><i class="fa"></i>结束订单</button>&nbsp;';
                                }
                                //待收货
                                if (row.orderState == 4) {
                                    op += '<button class="btn btn-primary btn-sm" id="sureGoods"><i class="fa"></i>确认收货</button>&nbsp;';
                                    op += '<button class="btn btn-primary btn-sm" id="cancel"><i class="fa"></i>结束订单</button>&nbsp;';
                                }
                                if (row.orderState == 8) {
                                    op += '<button class="btn btn-primary btn-sm" id="cancel"><i class="fa"></i>确认结束</button>&nbsp;';
                                }
                                /*if (row.orderState == 6) {
                                    if (row.alterSale == 0) {
                                        op += '<button class="btn btn-primary btn-sm" id="btn_alter">申请售后</button>&nbsp;&nbsp;';
                                    }
                                }*/
                          /*  }*/
                            /*if (row.orderState == 7) {
                                op +='<button class="btn btn-primary btn-sm">订单已取消</button>&nbsp;&nbsp;';
                            }*/
                            op += '<button class="btn btn-primary btn-sm" id="btn_detail"><i class="fa"></i>查看详情</button>&nbsp;';
                            return op;
                        }, events: opEvent
                    },

                ],
                //条件查询
                queryParams: vm.params
            });

            $("#merTab").bootstrapTable("destroy");
            $("#merTab").BT({
                url: baseURL + "company/merchantusers/companyList",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("CorporateName"), field: 'companyName'},
                ],
            });

            $("#addressTab").bootstrapTable("destroy");
            $("#addressTab").BT({
                url: baseURL + "company/receivingaddress/listByUserId",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    // {title: vm.$t("title"), field: 'addresshear'},
                    {title: vm.$t("contact"), field: 'consignee'},
                    {title: vm.$t("phone"), field: 'phonenumber'},
                    // {title: vm.$t("ReceivingAddress"), field: 'region'},
                    {title: vm.$t("Area"), field: 'detailedaddress',width:'60%',
                        formatter: function (value, row, index) {
                            return value + '&nbsp;&nbsp;&nbsp;' + row.specificaddress;
                        }
                    }
                ],
            });

            $("#goodsTab").bootstrapTable("destroy");
            $("#goodsTab").BT({
                columns: [
                    {
                        title: vm.$t("NameOfGoods"), field: 'commodityName', formatter: function (value, row, index) {
                            if (row.commodityName == null) {
                                row.commodityName = '';
                            }
                            if (!vm.addTxBtn) {
                                return '<input type ="text" class="form-control" id ="commodityName" value="' + row.commodityName + '" >';
                            } else {
                                return '<input type ="text" class="form-control" id ="commodityName" value="' + row.commodityName + '" disabled="true">';
                            }
                        }, events: opEvent
                    },
                    {
                        title: vm.$t("place"), field: 'commodityCountry', formatter: function (value, row, index) {
                            if (row.commodityCountry == null) {
                                row.commodityCountry = '';
                            }
                            var str = "";
                            if (!vm.addTxBtn) {
                                // str = '<select class="form-control sltplace" data-live-search="true" >';
                                str = '<select class="form-control selectpicker sltplace" data-live-search="true">';
                            } else {
                                str = '<select class="form-control selectpicker sltplace" disabled="true">';
                            }
                            str += '<option value=" " selected>请选择</option>'
                            vm.placeData.forEach(function (item, index) {
                                if (item.code == row.commodityCountry) {
                                    str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
                                }
                                else {
                                    str += '<option value="' + item.code + '">' + item.name + '</option>';
                                }
                            })
                            str += '</select>';
                            return str;

                        }, events: opEvent
                    },
                    {
                        title: vm.$t("FactoryNumber"),
                        field: 'commodityFactoryNumber',
                        formatter: function (value, row, index) {
                            if (row.commodityFactoryNumber == null) {
                                row.commodityFactoryNumber = '';
                            }
                            if (!vm.addTxBtn) {
                                return '<input type="text" class="form-control" id="factoryNo" value="' + row.commodityFactoryNumber + '" >';
                            } else {
                                return '<input type="text" class="form-control" id="factoryNo" value="' + row.commodityFactoryNumber + '" disabled="true">';
                            }
                        },
                        events: opEvent,
                        width: '9%'
                    },
                    {
                        title: vm.$t("weight"),
                        field: 'commodityCount',
                        formatter: function (value, row, index) {
                            if (row.commodityCount == null) {
                                row.commodityCount = '';
                            }
                            if (!vm.addTxBtn) {
                                return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.commodityCount + '" >';
                            } else {
                                return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.commodityCount + '" disabled="true">';
                            }

                        },
                        events: opEvent
                    },
                    {
                        title: vm.$t("unit"), field: 'commodityUnit', formatter: function (value, row, index) {
                            if (row.commodityUnit == null) {
                                row.commodityUnit = '';
                            }
                            var str = "";
                            if (!vm.addTxBtn) {
                                str = '<select class="form-control sltUnit" >';
                            } else {
                                str = '<select class="form-control sltUnit" disabled="true">';
                            }
                            str += '<option value=" " selected>请选择</option>'
                            if (row.commodityUnit == '') {
                                str += '<option value="0">吨</option>';
                                str += '<option value="1">千克</option>';
                            } else {
                                if (0 == row.commodityUnit) {
                                    str += '<option value="0" selected>吨</option>';
                                    str += '<option value="1" >千克</option>';
                                }
                                else {
                                    str += '<option value="0">吨</option>';
                                    str += '<option value="1" selected>千克</option>';
                                }
                            }
                            str += '</select>';
                            return str;
                        }, events: opEvent
                    },
                    {
                        title: vm.$t("chaozuo"), formatter: function (value, row, index) {
                            if (vm.params.orderNumber == null || vm.params.orderNumber == '') {
                                return ['<a href="javascript:void(0)"  id="removeGoods" >移除</a>'].join('');
                            }
                        }, events: opEvent
                    }
                ]
            });
            //详情页货物信息表
            $(".contenListTable").bootstrapTable("destroy");
            $(".contenListTable").BT({
                columns: [
                    {
                        title: vm.$t("ProductName"), field: 'commodityName'
                    },
                    {
                        title: vm.$t("place"), field: 'commodityCountry', formatter: function (value, row, index) {
                            if (row.commodityCountry == null) {
                                row.commodityCountry = '';
                            }
                           /* var str = "";

                            vm.placeData.forEach(function (item, index) {
                                if (item.code == row.commodityCountry) {
                                    str = item.name;
                                }
                            })*/
                            return row.commodityCountry;

                        }
                    },
                    {
                        title: vm.$t("ProducerOrNumber"),
                        field: 'commodityFactoryNumber'
                    },
                    {
                        title: vm.$t("weight"),
                        field: 'commodityCount'
                    },
                    {
                        title: vm.$t("unit"), field: 'commodityUnit', formatter: function (value, row, index) {
                            if (row.commodityUnit == null) {
                                row.commodityUnit = '';
                            }
                            var str = "";

                            vm.unitList.forEach(function (item, index) {
                                if (item.code == row.commodityUnit) {
                                    str = item.name;
                                }

                            })
                            if (str == '') {
                                if (row.commodityUnit == 1) {
                                    str = '吨';
                                } else if(row.commodityUnit == 2){
                                    str = '千克';
                                } else if(row.commodityUnit == 3){
                                    str == '柜'
                                } else {
                                    var aa = row.commodityUnit;
                                    str = aa;
                                }
                            }
                            return str;
                        }
                    },
                    {
                        title: vm.$t("pack"),
                        field: 'commodityPacking'
                    }
                ]

            });
            //详情订单信息表
            $(".contenTable").bootstrapTable("destroy");
            $(".contenTable").BT({
                columns: [
                    {
                        title: vm.$t("productName"), field: 'title'
                    },
                    {
                        title: vm.$t("UnitPrice"), field: 'chargeRules'
                    },
                    {
                        title: vm.$t("unit"), field: 'unit', formatter: function (value, row, index) {
                            var str = "";
                            vm.unitList1.forEach(function (item, index) {
                                if (item.code == row.unit) {
                                    str = item.name;
                                }

                            })
                            if (row.unit == 0) {
                                str = '元/吨';
                            } else if (row.unit == 1) {
                                str = '元/千克';
                            } else if (row.unit == 2) {
                                str = '元/柜';
                            } else if (row.unit == 3) {
                                str = '元/m³';
                            } else if (row.unit == 4) {
                                str = '美元/m³';
                            }
                            return str;
                        }
                    },
                    {
                        title: vm.$t("num"), field: 'num'
                    },
                    {
                        title: vm.$t("TotalPrice"), field: 'total'
                    },
                    {
                        title: vm.$t("unit"), field: 'str', formatter: function (value, row, index){
                            var str = "";

                            if (vm.declareOrder.unit == 0) {
                                str = '元';
                            } else if(vm.declareOrder.unit == 1){
                                str = '美元';
                        }
                        return str;
                    }
                    }
                ]
            });

        },

        query: function () {
            vm.reload();
        },
        searchButton: function (value) {
            if (value == "1") {
                vm.params.orderState = '';
            } else if (value == "2") {
                vm.params.orderState = '2';
            } else if (value == "3") {
                vm.params.orderState = '4';
            }
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.showList1 = true;
            vm.showList2 = false;
            vm.afterList = false;
            vm.updateStatus = false;
            vm.title = "新增";
            vm.declareOrder = {};
            vm.orderOfferEntity = {};
            // vm.getCommodityWeightUnit();
            vm.getCompanys()
        },
        update: function (id) {
            vm.merchantSelect = false,
            vm.showList = false;
            vm.showList2 = false;
            vm.showList1 = true;
            vm.afterList = false;
            vm.updateStatus1 = true;
            vm.title = "修改";
            $("#orderNum").prop("disabled", true);
            /*$('#addressTab').bootstrapTable('removeAll');*/
            // vm.getCommodityWeightUnit();
            vm.getInfo(id);
        },
        //表单验证
        validate: function () {
            var bl = $("#addForm").VF();//启用验证
            if (!bl) {
                // alert("请补充完整信息");
                return;
            }
        },

        saveOrUpdate: function (event) {
            var radio = $("input[name='contractCode']:checked").val();
            if (radio == 0 && isBlank(vm.declareOrder.contractNumber)) {
                alert("手输合同编号不能为空");
                return false;
            }

            vm.saveFlag = true;
            var regexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if (!regexp.test(vm.declareOrder.buyPhone)) {
                alert("请填写正确的联系电话");
                return false;
            }
            //货物信息
            if (vm.goods.length <= 0) {
                alert("请填写来源单号或自行添加商品信息");
                // $("#txtBtn").prop("disabled", false);
                // $("#goodsTab").bootstrapTable('removeAll');
                return;
            } else {
                var state = true;
                vm.goods.forEach(function (item, index) {
                    if (isBlank(item.commodityName)) {
                        alert("第" + (index + 1) + "行商品信息,商品名称不可为空");
                        state = false
                        return
                    }
                    if (isBlank(item.commodityCountry)) {
                        alert("第" + (index + 1) + "行商品信息,产地不可为空");
                        state = false
                        return
                    }
                    if (isBlank(item.commodityFactoryNumber)) {
                        alert("第" + (index + 1) + "行商品信息,厂号不可为空");
                        state = false
                        return
                    }
                    if (isBlank(item.commodityCount)) {
                        alert("第" + (index + 1) + "行商品信息,重量不可为空");
                        state = false
                        return
                    }
                    if (item.commodityUnit == null || item.commodityUnit == '') {
                        alert("第" + (index + 1) + "行商品信息,单位不能为空");
                        state = false;
                        return
                    }
                    if (item.commodityName.length > 20) {
                        alert("货物名称长度小于20")
                        state = false
                        return
                    }
                    if (item.commodityFactoryNumber.length > 20) {
                        alert("厂号长度小于20")
                        state = false
                        return
                    }
                    if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(item.commodityCount)) {
                        alert("重量的整数位最多9位，小数位最多2位");
                        state = false
                        return
                    }


                });
                vm.declareOrder.goods = vm.goods;
                vm.declareOrder.orderOfferEntity = vm.orderOfferEntity;
                // vm.declareOrder.total = vm.orderOfferEntity.total;
                vm.declareOrder.num = vm.orderOfferEntity.quantityNew;
            }
            if (state == true) {
                var url = vm.declareOrder.id == null ? "declare/declareorder/save" : "declare/declareorder/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.declareOrder),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function (index) {
                                location.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }
        },
        //手填合同号校验
        contractWrite: function (obj) {
           /* $.get(baseURL + "declare/declarecontract/list?contractNumber=" + $("#contractNumber").val() + "&check=true", function (r) {
                if (r.data.length < 1) {
                    alert("合同号不存在，请重新输入");
                    $("#contractNumber").val("");
                    vm.declareOrder.contractNumber = "";
                }
            });*/
            //限长
            if (isBlank(vm.declareOrder.contractNumber)){
                alert("合同编号不能为空！");
                vm.declareOrder.contractNumber = '';
                $("input[name='contractNumber']").val('');
                // $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return;
            }else if (vm.declareOrder.contractNumber.length > 30) {
                alert("合同编号长度必须在30之内！");
                vm.declareOrder.contractNumber = '';
                $("input[name='contractNumber']").val('');
                // $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return;
            }else if (/[\u4E00-\u9FA5]/g.test(vm.declareOrder.contractNumber)) {
                alert("合同编号请勿输入中文！");
                vm.declareOrder.contractNumber = '';
                $("input[name='contractNumber']").val('');
                return;
            }else {
                //检验合同编号是否已经存在
                $.ajaxSettings.async = false;
                $.get(baseURL + "declare/declarecontract/check" ,
                    {contractNumber:vm.declareOrder.contractNumber} , function (r) {
                        vm.contracts = r.contracts;
                    });
                $.ajaxSettings.async = true;
                if (vm.contracts != null && vm.contracts.length > 0) {
                    alert("该合同编号已经被占用！");
                    vm.declareOrder.contractNumber = '';
                    $("input[name='contractNumber']").val('');
                    // $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                    return
                }
            }
        },
        del: function (event) {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "declare/declareorder/delete",
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
        //修改订单状态----------------------------------------------------------------------
        updateStatus: function (id, orderState) {
            var url = "declare/declareorder/updateOrderState";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                data: JSON.stringify({id: id, orderState: orderState}),
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
        //详情
        getInfo: function (id) {
            $.get(baseURL + "declare/declareorder/info/" + id, function (r) {
                vm.declareOrder = r.declareOrder;
                var orderState = r.declareOrder.orderState;
                if (orderState == 0) {
                    vm.complaintShow = false;//投诉按钮
                }
                var alterSale = r.declareOrder.alterSale;
                if (orderState == 6) {
                    if (alterSale == 0) {
                        vm.aftersaleShow = true;
                    }
                }
                if (vm.declareOrder.goods == null) {
                    vm.goods = [];
                } else {
                    vm.goods = vm.declareOrder.goods;
                }
                if (vm.orderOfferEntity == null) {
                    vm.orderOfferEntity = {};
                }
                vm.orderOfferEntity = vm.declareOrder.orderOfferEntity;
                vm.orderOfferEntity.quantityNew = vm.declareOrder.num;
                vm.orderOfferEntity.num = vm.declareOrder.num;
                // var price = vm.orderOfferEntity.chargeRules;
                // var quantityNew = vm.orderOfferEntity.num;
                // var count = (parseFloat(price) * parseFloat(quantityNew)).toFixed(2);
                // Vue.set(vm.orderOfferEntity, 'total', count);
                vm.orderOfferEntity.total = vm.declareOrder.total;
                data = vm.declareOrder.goods;
                // $('.contenListTable').bootstrapTable('append', data);
                $('.contenListTable').bootstrapTable('load', {
                    rows: data,
                    total: data == null ? 0 : data.length
                });
                $('.contenTable').bootstrapTable('append', vm.declareOrder.orderOfferEntity);
                // $('.contenTable').bootstrapTable('load', {
                //     rows: JSON.stringify(vm.orderOfferEntity),
                //     total: vm.orderOfferEntity == {} ? 0 : 1
                // });
                $('#goodsTab').bootstrapTable('append', data);

                //报盘文件下载显示判断
                if (null != vm.declareOrder.orderOssEntityList && vm.declareOrder.orderOssEntityList.length > 0) {
                    vm.fileShow = true;
                    var f = [];
                    f = vm.declareOrder.orderOssEntityList;
                    f.forEach(function (item, index) {
                        switch (item.type) {
                            case 1 :
                                $("#declare").show()
                                vm.fileList.declare = item.fileUrl
                                vm.fileList.declareName = item.fileName
                                $("#declare").prepend("<a>" + vm.fileList.declareName + "</a>&nbsp;&nbsp;");
                                break;
                            case 2:
                                $("#scottare").show()
                                vm.fileList.scottare = item.fileUrl
                                vm.fileList.scottareName = item.fileName
                                $("#scottare").prepend("<a>" + vm.fileList.scottareName + "</a>&nbsp;&nbsp;");
                                break;
                            case 3:
                                $("#check").show()
                                vm.fileList.check = item.fileUrl
                                vm.fileList.checkName = item.fileName
                                $("#check").prepend("<a>" + vm.fileList.checkName + "</a>&nbsp;&nbsp;");
                                break;
                            case 4:
                                $("#quarantine").show()
                                vm.fileList.quarantine = item.fileUrl
                                vm.fileList.quarantineName = item.fileName
                                $("#quarantine").prepend("<a>" + vm.fileList.quarantineName + "</a>&nbsp;&nbsp;");
                                break;
                            case 5:
                                $("#other").show()
                                vm.fileList.other = item.fileUrl
                                vm.fileList.otherName = item.fileName
                                $("#other").prepend("<a>" + vm.fileList.otherName + "</a>&nbsp;&nbsp;");
                                break;
                        }
                    })
                }
            });
        },
        reload: function (event) {
            if (event != null) {
                location.reload();
            }
            vm.saveFlag = false;
            vm.showList = true;
            vm.showList2 = false;
            vm.showList1 = false;
            vm.afterList = false;
            vm.fileShow = false;
            vm.fileList = {};
            vm.title = "";
            //console.log(vm.fileShow);
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        //获取用户所选择的地址信息
        getAddressDate: function () {
            var data = $("#addressTab").bootstrapTable("getSelections")[0];
            $("#addressModel").modal('hide');
            if (data != null) {
                Vue.set(vm.declareOrder, 'buyContacts', data.consignee);
                Vue.set(vm.declareOrder, 'buyPhone', data.phonenumber);
                Vue.set(vm.declareOrder, 'buyAddress', data.detailedaddress+'-'+data.specificaddress);
            }
        },
        getPlaceData: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        vm.placeData = r.data;
                    }
                }
            })
        },

        openAddressCheck: function (event) {
            $("#addresstab").BTF5(vm.params)
            $("#addressModel").modal("show")
        },
        //收货地址模糊查询
        addressQuery: function () {
            $("#addressTab").BTF5(vm.params)
        },
        quantityC: function () {
            var price = vm.orderOfferEntity.chargeRules;
            if (price == null) {
                alert("请选择报盘信息");
                return false;
            }
            var quantityNew = vm.orderOfferEntity.quantityNew;
            if (quantityNew != null && quantityNew != '') {
                var count = (parseFloat(price) * parseFloat(quantityNew)).toFixed(2);
                Vue.set(vm.declareOrder, 'total', count);
                return;
            }
            Vue.set(vm.declareOrder, 'total', null);
        },
        //编码转换名称
        getCommodityCountry: function (commodityCountry) {
            var name = null;
            vm.placeData.forEach(function (item) {
                if (item.code == commodityCountry) {
                    name = item.name
                }
            });
            return name;
        },
        addGoods: function (type) {
            var data = {};
            if ('orderNum' == type) {
                vm.addTxBtn = true;
                var orderNumber = $("#orderNum").val();
                if (orderNumber == null || orderNumber == '') {
                    vm.goods = [];
                    vm.addTxBtn = false;
                } else {
                    // $("#txtBtn").prop("disabled", true);
                    $.get(baseURL + 'order/goodsorder/getListByOrderNumber/' + orderNumber, function (res) {
                        if (res.code == 0) {
                            vm.goods = [];//初始化列表
                            if (res.good != null) {
                                var orderCount = res.good.orderCount;//订单数量
                                for (let obj of res.good.detail) {//订单商品
                                    /*if (obj.goodsUnit=="1"){//柜 重量=订单数量*货物数量
                                        obj.goodsUnit = '吨'
                                    } else if(obj.goodsUnit == "2"){//不是柜 重量=购买数量
                                        obj.goodsUnit = '千克'
                                    }*/
                                    vm.goods.push({
                                        commodityName: obj.goodsName,
                                        commodityPrice: obj.goodsPrice,
                                        commodityCount: obj.goodsCount,//货物重量
                                        commodityUnit: obj.goodsUnit,//货物单位（1：吨）
                                        commodityFactoryNumber: obj.commodityFactoryNumber,
                                        commodityCountry: obj.commodityCountry,
                                        //commodityCountryName: obj.commodityCountryName,
                                        commodityCountryIsName: true,
                                        commodityPacking:obj.commodityPacking,//包装(手输)
                                        //weight: obj.goodsCount,//重量
                                    });
                                    /*for (let obj1 of obj.commoditys) {//货物商品
                                        console.log(obj1);
                                        vm.goods.push({
                                            commodityName: obj1.commodityName,
                                            commodityPrice: obj1.commodityPrice,
                                            commodityCount: obj1.commodityCount,
                                            commodityUnit: obj1.commodityUnit,
                                            commodityFactoryNumber: obj1.commodityFactoryNumber,
                                            commodityCountry: obj1.commodityCountry,
                                            commodityCountryName: obj1.commodityCountryName,
                                            commodityCountryIsName: true,
                                            //weight: obj1.weight,
                                        });
                                    }*/
                                }
                                vm.$nextTick(function () {
                                    vm.initDateTime();
                                    $('.selectpicker').selectpicker('refresh');
                                })
                            } else {
                                vm.goods = [];
                                alert("未查询到订单商品信息,请重新输入");
                            }
                        }
                    })
                }
            }
            else if ('txtBtn' == type) {
                vm.addTxBtn = false;
                $("#orderNum").prop("disabled", true);
                data = {
                    commodityName: '',//货物名称
                    commodityPrice: '',//商品价格
                    commodityCount: '',//商品数量
                    commodityUnit: vm.unitList[0].code,//单位
                    //commodityUnit: '',//单位(手输)
                    commodityFactoryNumber: '',//厂号
                    //commodityCountry: vm.placeData[0].code,//产地code
                    commodityCountry: vm.placeData[0].name,//产地(name)
                    commodityPacking:'',//包装(手输)
                    //weight: '',//重量
                };
                vm.goods.push(data);
                vm.$nextTick(function () {
                    vm.initDateTime();
                    $('.selectpicker').selectpicker('refresh');
                })
            }

        },
        //移除选中商品
        removeGoods: function (index) {
            vm.goods.splice(index, 1);
            if (!vm.goods.length > 0) {
                $("#orderNum").prop("disabled", false);
            }
        },
        initDateTime: function () {
            $('.datetimepicker').each(function (index, item) {
                $(item).datetimepicker('remove');
            })
            var language;
            if (vm.$i18n.locale == 'en') {
                language = 'en'
            } else {
                language = 'zh-CN'
            }
            $.fn.datetimepicker.dates['en'] = {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                meridiem: ["AM", "PM"]
            };
            $(".datetimepicker").each(function (index, item) {
                $(item).datetimepicker({
                    endDate: new Date(),
                    language: language,
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    todayBtn: true,
                    todayHighlight: true,
                    forceParse: true,

                }).on('hide', function (ev) {
                    var value = $(item).val();
                    vm.commodityEntityList[index].productionDate = value;
                    if (vm.commodityEntityList.length > 0) {
                        let obj = vm.commodityEntityList[index];
                        if (/^[1-9][0-9]{0,10}$/.test(obj.qualityTime) && obj.productionDate != null && obj.productionDate != '') {
                            var date = new Date(obj.productionDate);
                            obj.expirationDate = formatDate(new Date(date.getTime() + 1000 * 60 * 60 * 24 * obj.qualityTime), "YY-MM-DD");
                        }
                    }
                });
            })
        },
        //获取字典数据 -  货物重量单位
        getCommodityWeightUnit: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        vm.unitList = r.data;
                    }
                }
            })
        },
        fileDownload: function (data, name) {
            window.download(data, name);
        },
        cancel: function (id) {
            confirm('确定要完结订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "declare/declareorder/update",
                    contentType: "application/json",
                    data: JSON.stringify({id: id, orderState: 7}),
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
            });
        },

        //显示投诉页面
        addComplaint: function () {
            var id = vm.declareOrder.orderNumber;
            //查询该订单是否申请过投诉
            $.get(baseURL + "complaint/complaint/getComplaint/" + id, function (r) {
                if (r.count > 0) {
                    alert("当前订单已经发起过投诉");
                } else {
                    vm.images.length = 0;
                    vm.$refs.file.destroy();
                    vm.$refs.file.initFileInput();
                    vm.complaint = {};
                    vm.getComplaint(vm.declareOrder.id);
                    $("#myModal").css("display", "block");
                    $("#myModal").modal("show");
                }

            })
        },
        // 售后信息
        addAftersale: function (row) {
            vm.afterList = true;
            vm.showList = false;
            vm.showList1 = false;
            vm.showList2 = false;
            vm.afterSale = {
                serviceType: 2,//索赔
                reason: "",
                refundForm: "",
                images: [],
                orderId: row.orderNumber,
                orderType: 0,//订单类型：0：报关 1：货物 2：物流 3：仓储 4：代理'
            }
            vm.getInfo(row.id)
        },
        //获取投诉信息
        getComplaint: function (id) {
            //vm.complaint
            $.ajax({
                url: '/complaint/complaint/detail',
                type: 'post',
                data: JSON.stringify({orderId: id}),
                contentType: "application/json",
                success: function (r) {
                    if (r.complaint != null) {
                        vm.complaint = r.complaint
                    }
                }
            })
        },
        validateComplaint: function () {
            var bl = $('#complaintForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //保存投诉信息
        saveComplaint: function () {
            /*if (vm.complaint.reason == null || vm.complaint.reason == '' || vm.complaint.reason.length > 200) {
                alert("投诉原因不能为空，且不能大于200个字");
                return;
            }*/
            if (vm.images.length == 0 && (vm.complaint.images == null || vm.complaint.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.complaint.images == null) {
                vm.complaint.images = [];
            }
            ;
            vm.complaint.images = vm.complaint.images.concat(vm.images);
            vm.complaint.orderId = vm.declareOrder.orderNumber;
            vm.complaint.detail = vm.declareOrder.detail;
            vm.complaint.cinfo = vm.declareOrder.cinfo;
            //投诉用户
            vm.complaint.complaintFromId = vm.declareOrder.buyCompanyId;//买家公司ID
            vm.complaint.complaintFrom = vm.declareOrder.buyCompanyName;//买家公司名
            //被投诉用户
            vm.complaint.complaintToId = vm.declareOrder.merchantCompanyId;//商家公司ID
            vm.complaint.complaintTo = vm.declareOrder.merchantCompanyName;//商家公司名
            vm.complaint.orderType = 0;
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/save",
                contentType: "application/json",
                data: JSON.stringify(vm.complaint),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            $("#myModal").modal("hide");
                            location.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },

        //查看投诉
        complaintDeatil: function (id) {
            $("#myModal").modal("show");
            vm.complaint = {};
            vm.images = [];
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId: id, orderType: 0}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.complaint = r.complaint;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },

        //获取报盘公司
        getCompanys: function () {
            $.ajax({
                type: "POST",
                url: baseURL + "declare/declareorder/getCompanys",
                contentType: "application/json",
                success: function (r) {
                    if (r.code == 0) {
                        var str = JSON.stringify(r.companys);
                        str = str.replace(/id/g, "value").replace(/companyName/g, "label");
                        vm.companys = JSON.parse(str);
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },
        //获取该报盘公司下所上架的商品
        getOffers: function () {
            vm.orderOfferEntity = {};
            vm.offers = [];
            if (vm.declareOrder.merchantCompanyId == null || vm.declareOrder.merchantCompanyId == '') {
                alert("请先选择卖家公司");
                return;
            }
            $.ajax({
                type: "POST",
                url: baseURL + "declare/declareoffer/queryByCompanyId",
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                data: {"companyId": vm.declareOrder.merchantCompanyId},
                success: function (r) {
                    if (r.code == 0) {
                        var str = JSON.stringify(r.list);
                        str = str.replace(/id/g, "value").replace(/title/g, "label");
                        vm.offers = JSON.parse(str);
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },
        getOffer: function () {
            for (let obj of vm.offers) {
                if (obj.value == vm.orderOfferEntity.offerId) {
                    vm.orderOfferEntity = obj;
                    vm.orderOfferEntity.offerId = obj.value;
                    //订单币种
                    if (vm.orderOfferEntity.unit == 0 || vm.orderOfferEntity.unit == 1 || vm.orderOfferEntity.unit == 2
                        || vm.orderOfferEntity.unit == 3) {
                        vm.declareOrder.unit = 0;   //元
                    } else if (vm.orderOfferEntity.unit == 4) {
                        vm.declareOrder.unit = 1;   //美元
                    }
                    break;
                }
            }
        },
        //结束订单
        orderFinish: function (id) {
            confirm('是否结束该订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "declare/declareorder/update",
                    contentType: "application/json",
                    data: JSON.stringify({id: id, orderState: 4}),
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
            });
        },
        //表单验证
        validate2: function () {
            var bl = $('#afterForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //提交售后
        saveAfterSale: function () {
            if (vm.images1.length == 0 && (vm.afterSale.images == null || vm.afterSale.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.afterSale.images == null) {
                vm.afterSale.images = [];
            }
            ;
            vm.afterSale.images = vm.afterSale.images.concat(vm.images1);
            $.ajax({
                type: "POST",
                url: baseURL + "afterSale/aftersale/save",
                contentType: "application/json",
                data: JSON.stringify(vm.afterSale),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            location.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            })
        }
    },
    created: function () {
        this.getPlaceData();
    },

    //-----------------------------------------------------4
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#merTab").bootstrapTable.defaults.locale = "en-US";
                $("#addressTab").bootstrapTable.defaults.locale = "en-US";
                $("#goodsTab").bootstrapTable.defaults.locale = "en-US";
                $(".contenTable").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#merTab").bootstrapTable.defaults.locale = "zh-CN";
                $("#addressTab").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsTab").bootstrapTable.defaults.locale = "zh-CN";
                $(".contenTable").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#merTab").bootstrapTable("destroy");
            $("#addressTab").bootstrapTable("destroy");
            $("#goodsTab").bootstrapTable("destroy");
            $(".contenTable").bootstrapTable("destroy");
            this.initTable();
        },
        "declareOrder.goodNumber": function (newValue, oldValue) {
            if ((newValue == '' || newValue == null) && vm.addTxBtn) {
                $("#goodsTab").bootstrapTable("removeAll")
            }
        },
        'declareOrder.buyContacts': function (val) {
            /*$("#addForm").data("bootstrapValidator").updateStatus("buyContacts",  "NOT_VALIDATED",  null );*/
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('buyContacts');
            })
        },
        'declareOrder.buyPhone': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('buyPhone');
            })
        },
        'declareOrder.buyAddress': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('buyAddress');
            })
        },
    }

});

$(".selectOfferInfo").on("select2:select", function () {
    let data = $(this).find("option:selected").data('obj');
    // var offerId = $(this).val();
    // Vue.set(vm.declareOrder, 'offerId',offerId);
    Vue.set(vm.declareOrder, 'merchantContacts', data.contacts);
    Vue.set(vm.declareOrder, 'merchantPhone', data.mobile);
    Vue.set(vm.declareOrder, 'chargeRules', parseFloat(data.chargeRules));
    Vue.set(vm.declareOrder, 'num', 1);
    Vue.set(vm.declareOrder, 'total', (parseFloat(data.chargeRules) * parseFloat(1)).toFixed(3))
    vm.serviceList = data.business;
    $("#sltCurrency").val(vm.declareOrder.currency).trigger("change");
});
