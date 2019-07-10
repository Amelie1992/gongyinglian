$(function () {
    vm.initTable();
    //表单提交
    $("#addForm").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
    $("#offline").FM({
        fields: vm.offlineFields,
        success: vm.offlinePay
    });
    $("#afterForm").FM({
        fields: vm.afterFields,
        success: vm.saveAfterSale

    });
    // 时间日期
    $("#datetimepicker").datetimepicker().on('hide', function (ev) {
        var value = $("#datetimepicker").val();
        vm.payment.paymentTime = value;
    });
    //获取收货地址信息接口
    $("#addressTab").BT({
        url: baseURL + "company/receivingaddress/listByUserId",
        singleSelect: true,
        columns: [
            {checkbox: true},
            // {title: '标题', field: 'addresshear'},
            {title: '联系人', field: 'consignee'},
            {title: '联系电话', field: 'phonenumber'},
            // {title: '收货地址', field: 'specificaddress'},
            {title: '详细地址', field: 'detailedaddress',width:'60%',
                formatter: function (value, row, index) {
                    return value + '&nbsp;&nbsp;&nbsp;' + row.specificaddress;
                }
            }
        ],
    });

    //获取商家企业信息接口
    $("#merTab").BT({
        url: baseURL + "company/merchantusers/companyList",
        singleSelect: true,
        columns: [
            {checkbox: true},
            {title: '公司名称', field: 'companyName'},
        ],
    });

});
function typeFmt(value, rows, index) {
    var pyy = rows.unit;
    if (pyy == '0') {
        return '元';
    } else if (pyy == '1') {
        return '美元';
    }
}
//判断物流编码是否重复
function checkCode(value) {
    /*if (value == '' || value == null) {
        return;
    }
    $.ajax({
        url: baseURL + "logistics/logisticscontract/checkCode",
        data: JSON.stringify({contractNumber: value, dataSource: 2}),
        type: "POST",
        contentType: "application/JSON",
        success: function (r) {
            if (r.code == 0) {
                if (r.contractNumber == null) {
                    alert("请重新选择合同编号");
                    vm.logisticsOrder.contractNumber = '';
                }
            } else {
                alert(r.msg);
            }
        }
    })*/
    //限长
    /*if (isBlank(vm.logisticsOrder.contractNumber)){
        alert("合同编号不能为空！");
        vm.logisticsOrder.contractNumber = '';
        $("input[name='contractNumber']").val('');
        $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
        return;
    }else if (vm.logisticsOrder.contractNumber.length > 30) {
        alert("合同编号长度必须在30之内！");
        vm.logisticsOrder.contractNumber = '';
        $("input[name='contractNumber']").val('');
        $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
        return;
    }else {*/
        //检验合同编号是否已经存在
        $.ajaxSettings.async = false;
        $.get(baseURL + "logistics/logisticscontract/check",
            {contractNumber: vm.logisticsOrder.contractNumber}, function (r) {
                vm.contracts = r.count;
            });
        $.ajaxSettings.async = true;
        if (vm.contracts != null && vm.contracts > 0) {
            alert("该合同编号已经被占用！");
            vm.logisticsOrder.contractNumber = '';
            $("input[name='contractNumber']").val('');
            $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
            return
        }
  /*  }*/
}

function change2(th) {
    if (th.value == '1') {
        $('#contractNumber').attr("disabled", true);
    } else {
        $('#contractNumber').removeAttr("disabled");
    }
}

function nameFmt(value, row, index) {
    if (row.commodityName == null) {
        row.commodityName = '';
    }
    if (!vm.addTxBtn) {
        return '<input type ="text" class="form-control" id ="commodityName" value="' + row.commodityName + '" >';
    } else {
        return '<input type ="text" class="form-control" id ="commodityName" value="' + row.commodityName + '" disabled="true">';
    }
}



function factoryNoFmt(value, row, index) {
    if (row.factoryNo == null) {
        row.factoryNo = '';
    }
    if (!vm.addTxBtn) {
        return '<input type="text" class="form-control" id="factoryNo" value="' + row.factoryNo + '" >';
    } else {
        return '<input type="text" class="form-control" id="factoryNo" value="' + row.factoryNo + '" disabled="true">';
    }
}

function unitFmt(value, row, index) {
    if (row.unit == null) {
        row.unit = '';
    }
    let str = "";
    if (!vm.addTxBtn) {
        str = '<select class="form-control selectpicker sltUnit" >';
    } else {
        str = '<select class="form-control selectpicker sltUnit" disabled="true">';
    }
    vm.unitList.forEach(function (item, index) {
        if (item.code == row.unit) {
            str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
        } else {
            str += '<option value="' + item.code + '">' + item.name + '</option>';
        }
    })
    str += '</select>';
    return str;
}

function weightFmt(value, row, index) {
    if (row.weight == null) {
        row.weight = '';
    }
    if (!vm.addTxBtn) {
        return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.weight + '" >';
    } else {
        return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.weight + '" disabled="true">';
    }
}

function operaFmt() {
    if (vm.params.orderNumber != null) {
        return ['<a href="javascript:void(0)"  id="removeGoods" >移除</a>'].join('');
    } else {
        return ['<a href="javascript:void(0)" id="removeGoods" >移除</a>'].join('');
    }

}

window.operateEvents = {
    'click #removeGoods': function (e, value, row, index) {
        var data = $("#goodsTab").bootstrapTable("getData");
        data.splice(index, 1);
        $("#goodsTab").bootstrapTable('load', data);

        if ($("#goodsTab").bootstrapTable("getData").length <= 0) {
            $("#txtBtn").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            vm.addTxBtn = false;
            vm.params.orderNumber = "";
            vm.agentOrder.originFlag = 0;
            vm.agentOrder.originNumber = null;
        }
    },
    'change .sltplace': function (e, value, row, index) {
        row.commodityCountry = $(e.currentTarget).val();
    },
    'change .sltUnit': function (e, value, row, index) {
        row.unit = $(e.currentTarget).val();
    },
};

//修改订单
function updateOrder(id) {
    vm.update(id);
}

//投诉
// function complaint(orderNumber) {
//     vm.toushu(orderNumber);
// }
// //查看投诉
// function compDetail(orderNumber) {
//     vm.complaintDetail(orderNumber);
// }
//查看详情
function detail(id) {
    vm.title = "详情";
    vm.showList = false;
    vm.show1 = true;
    vm.show2 = false;
    vm.showAfterSales = false;
    vm.viewStatus = 0;
    vm.logisticsOrderShip = {};
    vm.ship1 = null;
    vm.orderDetail(id);
}

//取消订单
function cancel(id, orderStatus) {
    vm.cancelOrder(id, orderStatus);
}

window.opEvent = {
    //付款
    'click #showPay': function showPay(el, value, row, index) {
        vm.showList = false;
        vm.show1 = false;
        vm.show2 = false;
        vm.payList = true;
        // vm.showPayList(id);
        window.location.href = '/modules/bill/bill_payable.html?orderNo=' + row.orderNumber;
    }
};

//确认收货
function receipt(id) {
    vm.confirmReceipt(id);
}

//收货信息模态框
function openAddressCheck(value) {
    vm.address = value;
    $("#addressModel").modal('show');
    $("#addressTab").BTF5(vm.params);
};

//商家信息模态框
function openLogisticsCheck(event) {
    $('#logisticsModel').modal('show');
    vm.params.serviceName = '物流';
    $('#merTab').BTF5(vm.params);
}

//跳转售后服务页
function afterSaleApply() {
    vm.showList = false;
    vm.show1 = false;
    vm.show2 = false;
    vm.payList = false;
    vm.showAfterSales = true;
    vm.afterSDetail = false;
    vm.title = "售后服务";
    vm.afterSale = {
        serviceType: 2,
        reason: "",
        refundForm: "",
        images: [],
        orderId: vm.logisticsOrder.orderNumber,
        orderType: 2,
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        show1: false,//详情页
        show2: false,//新增页
        title: null,
        ship1: null,
        saveFlag: false,
        logisticsOrder: {},
        logisticsOffer: {},
        params: {
            orderNumber: '',
            orderStatus: '',
            sidx: 'lo.created_time',
            order: 'desc'
        },
        kdnData: {
            serviceType: "B",
            expCode: "",
            expNo: "",
            showType: "normal",
            container: "shipElement"
        },
        images: [],
        complaint: {},//投诉
        complaintShow: true,
        //验证字段
        fields: {
            contractNumber: {
                message: '合同号验证失败',
                validators: {
                    notEmpty: {
                        message: '合同号不能为空'
                    },stringLength:{
                        max: 30,
                        message: '长度必须在30之内'
                    }, regexp: {
                        regexp: /^[^\u4e00-\u9fa5]{0,}$/,
                        message: '请勿输入中文'
                    }
                },
            },
            phone: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '联系电话不正确'
                    }
                },
            },
            buyPhone: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '联系电话不正确'
                    }
                },
            },
            address: {
                message: '收货地址验证失败',
                validators: {
                    notEmpty: {
                        message: '收货地址不能为空'
                    },
                    //长度校验
                    stringLength: {
                        max: 50,
                        message: '收货地址长度不超过50字符'
                    },
                },
            },
            buyAddress: {
                message: '起运地址验证失败',
                validators: {
                    notEmpty: {
                        message: '起运地址不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: '起运地址长度必须在2到100之间'
                    },
                },
            },
            contact: {
                message: '联系人验证失败',
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
            },
            buyContact: {
                message: '联系人验证失败',
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
            },
            companyId: {
                message: '卖家公司验证失败',
                validators: {
                    notEmpty: {
                        message: '卖家公司不能为空'
                    },
                },
            }, offerId: {
                message: '报盘验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘不能为空'
                    },
                },
            },
            inspectionNo: {
                validators: {
                    notEmpty: {
                        message: '报检号/检疫证号不能为空'
                    },
                    regexp: {
                        regexp: /^\d{15,20}$/,
                        message: '报检号/检疫证号为长度15至20的数字字符'
                    }
                },
            },
            remarks: {
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '备注长度在200之内'
                    },
                },
            },
            total: {
                message: '订单总价验证失败',
                validators: {
                    notEmpty: {
                        message: '订单总金额不能为空'
                    }, regexp: {
                        regexp: /^[0-9]{1,10}([.][0-9]{1,2})?$/,
                        message: '请正确输入价格'
                    }
                },
            },unit: {
                message: '单位验证失败',
                validators: {
                    notEmpty: {
                        message: '单位不能为空'
                    }
                },
            },quantityNew:{
                message: '数量验证失败',
                validators: {
                    notEmpty: {
                        message: '数量不能为空'
                    }
                },
            }


        },
        addTxBtn: false,
        goods: [],
        companys: [],
        offers: [],
        logisticsOfferEntity: {},//报盘备份信息
        logisticsOrderCommodityList: [],//商品
        logisticsOrderCommodityEntityList: [],
        unitList: [{code: 1, name: '吨'}, {code: 2, name: '千克'}],
        unitList1: [{code: 0, name: '元/m³'}, {code: 1, name: '美元/m³'},{code: 2, name: '元/柜'},{code: 3, name: '元/车'},{code: 4, name: '美元/票'}],
        updateStatus: false,
        placeData: [],
        queryStatus: [],
        passStatusList: ['待确认', '已确认', '处理订单', '申报成功', '订单完结', '已取消'],
        statusSelect: [
            {value: "", label: "选择订单状态"},
            {value: "0", label: "待确认"},
            {value: "1", label: "待支付"},
            {value: "2", label: "已付款"},
            {value: '3', label: '待安排'},
            {value: '4', label: '已安排'},
            {value: '5', label: '待收货'},
            {value: '6', label: '订单已完结'},
            {value: '7', label: '订单已取消'}
        ],
        payment: {},  //付款对象
        images: [],
        myAccount: {}, //我的账户
        company: {},
        bankCardList: [],
        payList: false,
        offlineFields: {
            operator: {
                message: '打款人验证失败',
                validators: {
                    notEmpty: {
                        message: '打款人不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '打款人长度要小于20个字符'
                    }
                },
            }, amountPaid: {
                message: '打款金额验证失败',
                validators: {
                    notEmpty: {
                        message: '打款金额不能为空'
                    }, regexp: {
                        regexp: /^[0-9]{1,10}([.][0-9]{1,2})?$/,
                        message: '请正确输入打款金额'
                    }
                },
            }, paymentTime: {
                message: '打款时间验证失败',
                validators: {
                    notEmpty: {
                        message: '打款时间不能为空'
                    },
                },
            }, images: {
                message: '打款凭证验证失败',
                validators: {
                    notEmpty: {
                        message: '打款凭证不能为空'
                    },
                },
            }
        },
        afterFields: {
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
        paymentRecords: [],
        showAfterSales: false,
        afterSDetail: false,
        afterSale: {},//售后
        provinces: null,
        cities: null,
        areas: null,
        //退款方式
        refundFormList: [
            {value: 0, label: '线上支付'},
            {value: 1, label: '线下转账'},
            {value: 2, label: '其他'}
        ],
        //索赔原因
        reasonList: [
            {value: 0, label: '物品损坏'},
            {value: 1, label: '质量不合格'},
            {value: 2, label: '产品型号错误'},
            {value: 3, label: '其他'}
        ],
        viewStatus: 0,//0查看详情1发货
        afterImages: [],
        logisticsOrderShip: {},//物流对象
        logisticsOptions: [], //物流公司
        address:null    //添加起运1、抵运2地址标志
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'logistics/logisticsorder/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber', align: 'center'},
                    {title: vm.$t("Buyer"), field: 'contactCompanyName', align: 'center'},
                    {title: vm.$t("Seller"), field: 'merchantCompanyName', align: 'center'},
                    {
                        title: vm.$t("Headlines"),
                        field: 'title',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var str;
                            if (row.logisticsOfferEntity != null) {
                                str = row.logisticsOfferEntity.title;
                            }
                            return str;
                        }
                    },
                    // {
                    //     title: vm.$t("UnitPrice"),
                    //     field: 'commodityPrice',
                    //     align: 'center',
                    //     formatter: function (value, row, index) {
                    //         var str;
                    //         if (row.logisticsOrderCommodityEntityList != null) {
                    //             str = row.logisticsOrderCommodityEntityList[0].commodityPrice;
                    //         }
                    //         return str;
                    //     }
                    // },
                    // {
                    //     title: vm.$t("weight"),
                    //     field: 'commodityCount',
                    //     align: 'center',
                    //     formatter: function (value, row, index) {
                    //         var str;
                    //         if (row.logisticsOrderCommodityEntityList != null) {
                    //             str = row.logisticsOrderCommodityEntityList[0].commodityCount;
                    //         }
                    //         return str;
                    //     }
                    // },
                    {
                        title: vm.$t("PurchaseQuantitie"),
                        field: 'num',//订单数量
                        align: 'center',
                        /*formatter: function (value, row, index) {
                            var str;
                            if (row.logisticsOrderCommodityEntityList != null) {
                                str = row.logisticsOrderCommodityEntityList[0].commodityCount;
                            }
                            return str;
                        }*/
                    },
                    {
                        title: vm.$t("OrderTotalPrice"),
                        field: 'total',
                        align: 'center',
                        formatter: function (value, row, index) {
                            return '<div>' +
                                '<div class="pull">' + value +
                                '</div>'
                        }
                    },
                    {title: vm.$t("unit"), field: 'unitName', align: 'center', formatter: typeFmt},
                    // {title: '备注', field: 'remarks', align: 'center'},
                    // {title: '交易时间', field: 'createdTime', align: 'center'},
                    {
                        title: vm.$t("TradingTime"), field: 'createdTime', align: 'center'
                    },
                    {
                        title: vm.$t("OrderStatus"),
                        align: 'center',
                        formatter: function (value, row, index) {
                            var py = '';
                            if (row.orderStatus == 0) {
                                py += '待确认';
                            } else if (row.orderStatus == 1) {
                                py += '待支付';
                            } else if (row.orderStatus == 2) {
                                py += '已付款';
                            } else if (row.orderStatus == 3) {
                                py += '待安排';
                            } else if (row.orderStatus == 4) {
                                py += '已安排';
                            } else if (row.orderStatus == 5) {
                                py += '待收货';
                            } else if (row.orderStatus == 6) {
                                py += '订单已完结';
                            } else if (row.orderStatus == 7) {
                                py += '订单已取消';
                            } else if (row.orderStatus == 8) {
                                py += '买家申请取消';
                            } else if (row.orderStatus == 9) {
                                py += '卖家申请取消';
                            }
                            //else if (row.passStatus == 0) {
                            //     py += '待付款';
                            // } else if (row.passStatus == 1) {
                            //     py += '已付款';
                            // }
                            return py;
                        }
                    },
                    {
                        title: vm.$t("Remarks"), field: 'remarks', align: 'center',
                        formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"), align: 'center', formatter: function (value, row, index) {
                            var py = '';
                            if (row.orderStatus != 7) {
                                if (row.orderStatus == 0) {
                                    py += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.orderStatus + '\')">取消订单</button>&nbsp;';
                                    py += '<button class="btn btn-primary btn-sm" onclick="updateOrder(' + row.id + ')">修改订单</button>&nbsp;';
                                }
                            }
                            py += '<button class="btn btn-primary btn-sm" onclick="detail(' + row.id + ')">查看详情</button>&nbsp;';
                            if (row.orderStatus == 1) {
                                py += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.orderStatus + '\')">结束订单</button>&nbsp;';
                            }
                            if (row.orderStatus == 9) {
                                py += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.orderStatus + '\')">结束订单</button>&nbsp;';
                            }
                            // if (row.buyStatus == 0 && row.orderStatus >0) {
                            //     py += '<button class="btn btn-primary btn-sm" onclick="complaint(' + index + ')" data-toggle="modal">投诉</button>&nbsp;';
                            // }
                            if (row.orderStatus == 1) {
                                py += '<button class="btn btn-primary btn-sm" id="showPay">点击付款</button>&nbsp;';
                            }
                            if (row.orderStatus == 5) {
                                py += '<button class="btn btn-primary btn-sm" onclick="receipt(' + row.id + ')">确认收货</button>&nbsp;';
                            }
                            // if (row.buyStatus == 1) {
                            //     py += '<button class="btn btn-primary btn-sm" onclick="compDetail(\'' + row.orderNumber + '\')">查看投诉</button>&nbsp;';
                            // }
                            return py;
                        }, events: opEvent
                    }
                ],
                //条件查询
                queryParams: vm.params
            });
            $(".contentTables").bootstrapTable("destroy");
            $(".contentTables").BT({
                columns: [
                    {
                        title: vm.$t("Headlines"), field: 'title',align: 'center'
                    },
                    {
                        title: vm.$t("UnitPrice"), field: 'price', align: 'center', formatter: function (value, row, index){
                            var str=''
                        if (row.unit == 0) {
                            str = row.price+ '元/m³';
                        } else if(row.unit == 1){
                            str = row.price+ '美元/m³';
                        }else if(row.unit == 2){
                            str = row.price+ '元/柜';
                        }else if(row.unit == 3){
                            str = row.price+ '元/车';
                        }else if(row.unit == 4){
                            str = row.price+ '美元/票';
                        }
                        return str
                    }
                    },

                    {
                        title: vm.$t("num"), field: 'num', align: 'center'
                    },
                    {
                        title: vm.$t("TotalPrice"), field: 'total', align: 'center'
                    },
                    {
                        title: vm.$t("unit"), field: 'orderUnit', align: 'center', formatter: function (value, row, index){
                        var str = "";
                        vm.unitList1.forEach(function (item, index) {
                            if (item.code == row.unit) {
                                str = item.name;
                            }

                        })
                        // if (row.unit == 0) {
                        //     str = '元/m³';
                        // } else if(row.unit == 1){
                        //     str = '美元/m³';
                        // }else if(row.unit == 2){
                        //     str = '元/柜';
                        // }else if(row.unit == 3){
                        //     str = '元/车';
                        // }else if(row.unit == 4){
                        //     str = '美元/票';
                        // }
                        if (row.orderUnit == 0) {
                            str = '元';
                        } else if(row.orderUnit == 1){
                            str = '美元';
                        }/*else if(row.unit == 2){
                            str = '元';
                        }else if(row.unit == 3){
                            str = '元';
                        }else if(row.unit == 4){
                            str = '美元';
                        }*/
                        return str;
                    }
                    },
                ]
            });
            $("#contentTable").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#contentTable").BT({
                columns: [
                    {title: vm.$t("ProductName"), field: 'commodityName',align: 'center'},
                    {
                        title: vm.$t("place"), field: 'commodityCountry', align: 'center',formatter: function (value, row, index) {
                            if (row.commodityCountry == null) {
                                row.commodityCountry = '';
                            }
                            var str = "";

                            vm.placeData.forEach(function (item, index) {
                                if (item.code == row.commodityCountry) {
                                    str = item.name;
                                }
                            })
                        if (str ==null || str ==''){
                                str = row.commodityCountry;
                        }
                            return str;

                        }
                    },
                    {
                        title: vm.$t("ProducerOrNumber"),align: 'center',
                        field: 'commodityFactoryNumber'
                    },
                    // {title: vm.$t("UnitPrice"), field: 'commodityPrice', align: 'center'},
                    {title: vm.$t("weight"), field: 'commodityCount', align: 'center'},
                    {
                        title: vm.$t("unit"), field: 'commodityUnit',align: 'center', formatter: function (value, row, index) {
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
                                } else if (row.commodityUnit == 2){
                                    str = '千克';
                                }else {
                                    str=row.commodityUnit
                                }
                            }
                            return str;

                        }
                    },{title:vm.$t("pack"),field:'commodityPacking',align:'center'}
                    // {
                    //     title: vm.$t("TotalPrice"), align: 'commodityCount',
                    //     formatter: function (value, row, index) {
                    //         var py = '';
                    //         py = row.commodityPrice * row.commodityCount;
                    //         return py;
                    //     }
                    // },
                ]
            });

            $("#goodsTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#goodsTab").BT({
                columns: [
                    {title: vm.$t("NameOfGoods"), field: 'commodityName', formatter: nameFmt},
                    {title: vm.$t("place"), field: 'commodityCountry', formatter: function(value, row, index){
                        if (row.commodityCountry == null) {
                            row.commodityCountry = '';
                        }
                        let str = "";
                        if (!vm.addTxBtn) {
                            str = '<select class="form-control selectpicker sltplace" >';
                        } else {
                            str = '<select class="form-control selectpicker sltplace" disabled="true">';
                        }
                        vm.placeData.forEach(function (item, index) {
                            if (item.code == row.commodityCountry) {
                                str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
                            } else {
                                str += '<option value="' + item.code + '">' + item.name + '</option>';
                            }
                        });
                        str += '</select>';
                        return str;

                    }, events: operateEvents},
                    {
                        title: vm.$t("FactoryNumber"),
                        field: 'factoryNo',
                        formatter: factoryNoFmt,
                        events: operateEvents,
                        width: '9%'
                    },
                    {title: vm.$t("WeightOfGoods"), field: 'weight', formatter: weightFmt, events: operateEvents},
                    {title: vm.$t("unit"), field: 'unit', formatter: unitFmt, events: operateEvents},
                    {title: vm.$t("chaozuo"), formatter: operaFmt, events: operateEvents}
                ]
            });

        },


        //获取物流公司
        getLogisticsOptions: function () {
            $.ajax({
                url: baseURL + 'sys/dict/getByType',
                data: {type: 'shipper_code'},
                success: function (r) {
                    var str = JSON.stringify(r.data);
                    str = str.replace(/value/g, "label").replace(/code/g, "value");
                    vm.logisticsOptions = JSON.parse(str);
                }
            })
        },
        //投诉模态框
        toushu: function () {
            var rows = $('#table').bootstrapTable('getData');
            var row = vm.logisticsOrder;
            vm.complaint = {};
            vm.complaint.orderId = row.orderNumber;
            vm.complaint.complaintFrom = row.contact;
            vm.complaint.complaintTo = row.merchantContact;
            vm.complaint.orderType = 2;
            vm.complaint.reason = '';
            vm.images.length = 0;
            vm.$refs.file.destroy();
            vm.$refs.file.initFileInput();
            $('#myModal').modal('show')
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;//列表页关
            vm.show1 = false;//详情页关
            vm.show2 = true;//新增页开
            vm.updateStatus = false;
            vm.showAfterSales = false;
            vm.title = "新增";
            vm.logisticsOrder = {};
            vm.logisticsOfferEntity = {};
            vm.logisticsOrderCommodityList = [];
            setTimeout(function () {
                $("#addForm").RF();
            },50);
            vm.getCompanys();
        },
        update: function (id) {
            vm.logisticsOrder = {};
            vm.showList = false;//列表页关
            vm.show1 = false;//详情页关
            vm.show2 = true;
            vm.updateStatus = true;
            vm.showAfterSales = false;
            vm.title = "修改";
            vm.logisticsOfferEntity = {};
            vm.logisticsOrderCommodityList = [];
            vm.getCompanys();
            vm.getInfo(id)
        },
        //表单验证
        validate: function () {
            var bl = $('#addForm').VF();//启用验证
            if (!bl) {
                alert("请补充完整信息");
                return;
            }
        },
        saveOrUpdate: function (event) {
            var radio = $("input[name='contractCode']:checked").val();
            if (radio == 0 && isBlank(vm.logisticsOrder.contractNumber)) {
                alert("手输合同编号不能为空");
                return false;
            }
            vm.saveFlag = true;
            if (vm.logisticsOrderCommodityList.length <= 0) {
                alert("请添加货物明细");
                return;
            }
            for (let obj of vm.logisticsOrderCommodityList) {
                if (obj.commodityName == null || obj.commodityName == '') {
                    alert("品名不能为空");
                    return;
                }
                if (obj.commodityFactoryNumber == null || obj.commodityFactoryNumber == '') {
                    alert("生产商不能为空");
                    return;
                }
                // if (obj.commodityPrice == null || obj.commodityPrice == '') {
                //     alert("单价不能为空");
                //     return;
                // }
                if (obj.commodityCount == null || obj.commodityCount == '') {
                    alert("重量不能为空");
                    return;
                }
                // if(obj.commodityName>30||obj.commodityFactoryNumber>30||obj.commodityPrice>30||obj.weight>30){
                //     alert("货物信息表的数据要长度小于30");
                //     return;
                // }
                // if(obj.commodityPrice != ''){
                //     if (!/(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.commodityPrice)) {
                //         alert("单价为整数位最多11位，小数位最多2位的数字");
                //         return;
                //     }
                // }
                if (!/^\d+(\.{0,1}\d+){0,1}$/.test(obj.commodityCount)) {
                    alert("货物重量为非负数");
                    return;
                }
                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.commodityCount)) {
                    alert("货物重量的整数最多9位，小数最多2位");
                    return;
                }

            }
            var url = vm.logisticsOrder.id == null ? "logistics/logisticsorder/save" : "logistics/logisticsorder/update";
            vm.logisticsOrder.logisticsOfferEntity = vm.logisticsOfferEntity;
            vm.logisticsOrder.num = vm.logisticsOfferEntity.quantityNew;
            vm.logisticsOrder.logisticsOrderCommodityEntityList = vm.logisticsOrderCommodityList;
            layer.load();
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.logisticsOrder),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                    layer.closeAll();
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
                    url: baseURL + "logistics/logisticsorder/delete",
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
        //订单待确认下基本查看详情
        getInfo: function (id) {
            $.get(baseURL + "logistics/logisticsorder/detail/" + id, function (r) {
                vm.logisticsOrder = r.data.logisticsOrder;
                vm.logisticsOfferEntity = vm.logisticsOrder.logisticsOfferEntity;
                vm.logisticsOfferEntity.quantityNew = vm.logisticsOrder.num;
                // let data = [];
                // data = vm.logisticsOrder.logisticsOrderCommodityEntityList;
                // $('#contentTable').bootstrapTable('append', data);
                // var value = vm.logisticsOfferEntity.companyId;
                if (vm.logisticsOrder.logisticsOrderCommodityEntityList == null) {
                    vm.logisticsOrderCommodityList = [];
                } else {
                    vm.logisticsOrderCommodityList = vm.logisticsOrder.logisticsOrderCommodityEntityList;
                    for(var i=0;i<vm.logisticsOrderCommodityList.length;i++){
                        if (vm.logisticsOrderCommodityList[i].commodityUnit==1){
                            vm.logisticsOrderCommodityList.commodityUnit='吨'

                        }else if (vm.logisticsOrderCommodityList[i].commodityUnit==2){
                            vm.logisticsOrderCommodityList.commodityUnit='千克'
                        }
                    }

                }
                $("#orderNum").prop("disabled", true);
            });
        },
        //订单详情
        orderDetail: function (id) {
            vm.$refs.file1.initFileInput();
            $('#contentTable').bootstrapTable('removeAll');//刷新清除之前数据
            $.get(baseURL + "logistics/logisticsorder/info/" + id, function (r) {
                vm.logisticsOrder = r.data.logisticsOrder;
                vm.logisticsOrder.logisticsOfferEntity = r.data.logisticsOrderOffer;//------
                vm.logisticsOffer = r.data.logisticsOffer;
                vm.logisticsOrder.logisticsOfferEntity.num = vm.logisticsOrder.num;
                vm.logisticsOrder.logisticsOfferEntity.total = vm.logisticsOrder.total;
                if (vm.logisticsOrder.logisticsOrderShipEntity != null) {
                    vm.logisticsOrderShip = vm.logisticsOrder.logisticsOrderShipEntity;
                }
                if (vm.logisticsOrder.orderStatus > 3) {
                    vm.viewStatus = 1;
                }

                let data = [];
                let data1 = [];
                data = vm.logisticsOrder.logisticsOrderCommodityEntityList;
                data1 = vm.logisticsOrder.logisticsOfferEntity;
                $('#contentTable').bootstrapTable('append', data);//追加
                $('#contentTables').bootstrapTable('append', data1);
                vm.ship1 = "http://m.kuaidi100.com/result.jsp?nu=" + vm.logisticsOrderShip.logisticsNumber;
                // vm.kdnData.expCode =vm.logisticsOrderShip.logisticsCode;
                // vm.kdnData.expNo = vm.logisticsOrderShip.numberPlate;
                // KDNWidget.run(vm.kdnData)
            });
        },
        provincesChange: function (index, child, value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            this.cities = JSON.parse(str);
        },
        cityChange: function (index, child, value) {
            var str = JSON.stringify(window.getAreas(value));
            str = str.replace(/areaid/g, "value").replace(/area/g, "label");
            this.areas = JSON.parse(str);
        },
        reload: function (event) {
            if (event != null) {
                location.reload();
            }
            vm.showList = true;//列表页开
            vm.show1 = false;//详情页关
            vm.show2 = false;//关
            vm.showAfterSales = false;
            vm.afterSDetail = false;
            vm.saveFlag = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            //$("form").RF();
        },
        //获取用户所选择的地址信息
        getAddressDate: function () {
            var data = $("#addressTab").bootstrapTable("getSelections")[0];
            $("#addressModel").modal('hide');
            if (data != null) {
                if (vm.address == 1) {
                    Vue.set(vm.logisticsOrder, 'buyContact', data.consignee);
                    Vue.set(vm.logisticsOrder, 'buyPhone', data.phonenumber);
                    Vue.set(vm.logisticsOrder, 'buyAddress', data.detailedaddress+'-'+data.specificaddress);
                }else if (vm.address == 2){
                    Vue.set(vm.logisticsOrder, 'contact', data.consignee);
                    Vue.set(vm.logisticsOrder, 'phone', data.phonenumber);
                    Vue.set(vm.logisticsOrder, 'address', data.detailedaddress+'-'+data.specificaddress);
                }
            }
        },
        //获取用户所选择的商家信息
        getLogisticDate: function () {
            var data = $("#merTab").bootstrapTable("getSelections")[0];
            $("#logisticsModel").modal('hide');
            if (data != null) {
                Vue.set(vm.logisticsOrder, 'merchantCompanyId', data.id);
                Vue.set(vm.logisticsOrder, 'merchantCompanyName', data.companyName);
                //获取所选择商家的报盘列表
                // vm.getOfferList();
            }
        },
        //地址模态框 模糊查询
        addressQuery: function (event) {
            $("#addressTab").BTF5(vm.params);
        },
        //商家信息模态框 模糊查询
        logisticsQuery: function (event) {
            $("#merTab").BTF5(vm.params);
        },
        //数量change事件
        quantityC: function () {
            var price = vm.logisticsOfferEntity.price;
            if (price == null) {
                alert("请选择报盘信息");
                return false;
            }
            var quantity = vm.logisticsOfferEntity.num;
            var quantityNew = vm.logisticsOfferEntity.quantityNew;
            // if (quantityNew > quantity) {
            //     alert("数量超过报盘数量")
            // }
            if(quantityNew != null && quantityNew != ''){
                var count = (parseFloat(price) * parseFloat(quantityNew)).toFixed(2);
                Vue.set(vm.logisticsOrder, 'total', count);
                return;
            }
            Vue.set(vm.logisticsOrder, 'total', null);
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
        //取消订单
        cancelOrder: function (id, orderStatus) {
            var status;
            if (orderStatus == 0) {//待确认
                status = 7        //已取消
            } else if (orderStatus == 1) {//已接单
                status = 8              //买家申请取消
            } else if (orderStatus == 9) {//已接单
                status = 7              //已取消
            }
            confirm('确定要完结订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "logistics/logisticsorder/update",
                    contentType: "application/json",
                    data: JSON.stringify({id: id, orderStatus: status}),
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
        offlineValidate: function () {
            var bl = $('#offline').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        afterValidate: function () {
            var b1 = $('#afterForm').VF();//启用验证
            if (!b1) {
                return;
            }
        },
        //获取账户余额
        getBalance: function () {
            var balance = '';
            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/getMyAccount",
                async: false,
                contentType: "application/json",
                // data: JSON.stringify(vm.paymentRecords),
                success: function (r) {
                    if (r.myAccount != null) {
                        // vm.myAccount = r.myAccount;
                        balance = r.myAccount.balance;
                    }
                }
            });
            return balance;
        },
        //账户余额提醒
        getTip: function () {
            // var tip = '';
            // if (vm.payment.accountBalance < vm.payment.amountToPay) {
            //     //账户余额 小于 支付金额 ---> 拒绝 余额支付 请求
            //     tip = "余额不足";
            // }
            // return tip;
        },
        //显示付款页面
        showPayList: function (id) {
            $.get(baseURL + "logistics/logisticsorder/info/" + id, function (r) {
                vm.logisticsOrder = r.logisticsOrder;
                vm.payment.amountToPay = vm.logisticsOrder.total;
            });

            //显示支付页面
            vm.getMyAccount();     //获取账户信息
            // vm.getSum();        //计算支付金额 (勾选的付款记录的金额总和)
            vm.getCardList();   //获取银行卡信息
            // vm.getMsg();        //线下转账 获取 付款方公账信息


            vm.images.length = 0;       //转账凭证上传框
            vm.$refs.file.destroy();
            vm.$refs.file.initFileInput();
            vm.paymentRecords = [];
            vm.getRecordInfo(id);
            vm.paymentRecords.push(vm.paymentRecord);
        },
        //传入billId,获取付款记录基本数据
        getRecordInfo: function (id) {
            $.ajax({
                type: "POST",
                url: baseURL + "paymentRecord/paymentrecord/infos/" + id,
                async: false,            //ajax异步请求改成同步的 以便 vm.paymentRecord.payMethod 可以直接取值
                contentType: "application/json",
                // data: JSON.stringify(recordId),
                success: function (r) {
                    if (r.paymentRecord != null) {
                        vm.paymentRecord = r.paymentRecord;
                    }
                }
            });
        },
        back: function () {
            vm.showList = true;
            vm.show1 = false;
            vm.show2 = false;
            vm.payList = false;
            vm.showAfterSales = false;
            vm.afterSDetail = false;
        },
        //获取账户余额、账户密码
        getMyAccount: function () {
            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/getMyAccount",
                contentType: "application/json",
                success: function (r) {
                    if (r.myAccount != null) {
                        vm.payment.accountBalance = r.myAccount.balance;
                        vm.myAccount = r.myAccount;
                    }
                }
            });
        },
        //计算支付金额 (勾选的付款记录的金额总和)
        // getSum: function () {
        //     var sum = 0;
        //     var numbers = [];
        //     vm.paymentRecords.forEach(function (item) {
        //         numbers.push(item.amount);
        //     });
        //     numbers.forEach(function (e) {
        //         sum += e;
        //     });
        //     console.log("sum====" + sum);
        //     vm.payment.amountToPay = sum;
        // },
        //获取绑定的银行卡
        getCardList: function () {
            $.get(baseURL + "bill/bankcard/list/", function (r) {
                if (r.code == '0')
                    vm.bankCardList = r.rows;
                else
                    alert(r.msg);
            });
        },
        //确认收货
        confirmReceipt: function (id) {
            confirm('确定要收货？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "logistics/logisticsorder/update",
                    contentType: "application/json",
                    data: JSON.stringify({id: id, orderStatus: 6}),
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
        //货物信息中获取产地
        getPlaceData: function () {
            var _this=this;
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        _this.placeData = r.data;

                    }
                }
            })

        },
        //上传商品信息
        addGoods: function (type) {
            var data = {};
            if ('orderNum' == type) {
                vm.addTxBtn = true;
                var orderNumber = $("#orderNum").val();
                if (orderNumber == null || orderNumber == '') {
                    vm.logisticsOrderCommodityList = [];
                    vm.addTxBtn = false;
                } else {
                    $.get(baseURL + 'order/goodsorder/getListByOrderNumber/' + orderNumber, function (res) {
                        if (res.code == 0) {
                            vm.logisticsOrderCommodityList = [];//初始化列表
                            if (res.good != null) {
                                for (let obj of res.good.detail) {
                                    /*if (obj.goodsUnit==1){
                                        obj.goodsUnit='吨'
                                    }else if (obj.goodsUnit==2){
                                        obj.goodsUnit='千克'
                                    }else{
                                        commodityUnit=obj.goodsUnit
                                    }*/
                                    // for (let obj1 of obj.commoditys) {
                                        console.log(obj);
                                        vm.logisticsOrderCommodityList.push({
                                            commodityName: obj.goodsName,
                                            commodityPrice: obj.commodityPrice,
                                            commodityCount: obj.goodsCount,
                                            commodityUnit: obj.goodsUnit,
                                            commodityFactoryNumber: obj.commodityFactoryNumber,
                                            commodityCountry: obj.commodityCountry,
                                            commodityCountryName: obj.commodityCountryName,
                                            // commodityCountryIsName: true,
                                            // weight: obj.weight,
                                            commodityPacking:obj.commodityPacking,
                                        });
                                    // }
                                }
                                vm.$nextTick(function () {
                                    vm.initDateTime();
                                    $('.selectpicker').selectpicker('refresh');
                                })
                            } else {
                                vm.logisticsOrderCommodityList = [];
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
                    commodityFactoryNumber: '',//厂号
                    commodityCountry: vm.placeData[0].name,//产地
                    // commodityCountry:'',
                    commodityPacking:'',//包装(手输)
                    // weight: '',//重量
                };
                vm.logisticsOrderCommodityList.push(data);
                vm.$nextTick(function () {
                    vm.initDateTime();
                    $('.selectpicker').selectpicker('refresh');
                })
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
        //移除选中商品
        removeGoods: function (index) {
            vm.logisticsOrderCommodityList.splice(index, 1);
            if (!vm.logisticsOrderCommodityList.length > 0) {
                $("#orderNum").prop("disabled", false);
            }
        },
        //上传投诉信息
        saveTouSu: function (event) {
            if (vm.complaint.reason == null || vm.complaint.reason == '' || vm.complaint.reason.length > 200) {
                alert("投诉原因不能为空，且不能大于200个字");
                return;
            }
            if (vm.images.length == 0 && (vm.complaint.images == null || vm.complaint.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.complaint.images == null) {
                vm.complaint.images = [];
            }
            ;
            vm.complaint.images = vm.complaint.images.concat(vm.images);
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/save",
                contentType: "application/json",
                data: JSON.stringify(vm.complaint),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            $("#myModal").modal("hide");//关闭弹窗
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //投诉详情
        complaintDetail: function () {
            $("#myModal").modal("show");
            vm.complaint = {};
            vm.images = [];
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId: vm.logisticsOrder.orderNumber, orderType: 2}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.complaint = r.data;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //上传申请售后信息
        saveAfterSale: function () {
            if (vm.afterImages.length == 0 && (vm.afterSale.images == null || vm.afterSale.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.afterSale.images == null) {
                vm.afterSale.images = [];
            }

            vm.afterSale.images = vm.afterSale.images.concat(vm.afterImages);
            $.ajax({
                type: "POST",
                url: baseURL + "afterSale/aftersale/save",
                contentType: "application/json",
                data: JSON.stringify(vm.afterSale),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },
        //售后详情
        afterSaleDetail: function () {
            vm.afterSale = {};
            vm.afterImages = [];
            $.ajax({
                type: "POST",
                url: baseURL + "afterSale/aftersale/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId: vm.logisticsOrder.orderNumber, orderType: 2}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.afterSale = r.afterSale;
                    } else {
                        alert(r.msg);
                    }
                }
            });
            vm.showList = false;
            vm.show1 = false;
            vm.show2 = false;
            vm.showAfterSales = false;
            vm.afterSDetail = true;
        },
        //获取报盘公司
        getCompanys: function () {
            $.ajax({
                type: "POST",
                url: baseURL + "logistics/logisticsorder/getCompanys",
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
        //根据报盘公司选择对应上架产品
        getOffers: function (val) {
            /*vm.logisticsOfferEntity.companyId=val;*/

            /*vm.logisticsOfferEntity = {};*/
            vm.offers = [];
            // if (vm.logisticsOrder.merchantCompanyId == null || vm.logisticsOrder.merchantCompanyId == '') {
            //     alert("请先选择卖家公司");
            //     return;
            // }
            $.ajax({
                type: "POST",
                url: baseURL + "logistics/logisticsoffer/queryByCompanyId",
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                data: {"companyId": vm.logisticsOfferEntity.companyId},
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
                if (obj.value == vm.logisticsOfferEntity.offerId) {
                    vm.logisticsOfferEntity = obj;
                    vm.logisticsOfferEntity.offerId = obj.value;
                    vm.logisticsOfferEntity.price = obj.price;
                    // vm.logisticsOfferEntity.num = obj.num;
                    vm.logisticsOfferEntity.contact = obj.contact;
                    vm.logisticsOfferEntity.phone = obj.phone;
                    vm.logisticsOfferEntity.title = obj.label;
                    vm.logisticsOfferEntity.unit = obj.unit;
                    break;
                }
            }
            if(vm.logisticsOfferEntity.unit == 0 || vm.logisticsOfferEntity.unit == 2 || vm.logisticsOfferEntity.unit == 3){
                vm.logisticsOrder.unit = '0'
            }
            if(vm.logisticsOfferEntity.unit == 1 || vm.logisticsOfferEntity.unit == 4){
                vm.logisticsOrder.unit = '1'
            }

        },
        // a.1余额支付
        balancePayment: function (event) {
            console.log("paymentRecords", vm.paymentRecords);
            console.log("payment", vm.payment);

            if (vm.payment.remarks != null && vm.payment.remarks.length >= 20) {
                alert("备注长度要小于20个字符");
                return;
            }
            //账户余额 小于 支付金额 ---> 拒绝 余额支付 请求
            if (vm.payment.accountBalance < vm.payment.amountToPay) {
                alert("账户余额不足");
                return;
            }

            //密码验证
            console.log("账户密码", vm.myAccount.password);
            console.log("支付密码", vm.payment.password);
            if (vm.payment.password != vm.myAccount.password) {
                alert("密码错误！");              //三次锁定功能
                return;
            }

            vm.paymentVO = {};
            vm.paymentVO.paymentRecords = vm.paymentRecords;
            vm.paymentVO.payment = vm.payment;

            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/balancePayment",
                contentType: "application/json",
                data: JSON.stringify(vm.paymentVO),
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
        // a.2银联支付
        unionPay: function (event) {
            if (vm.payment.remarks != null && vm.payment.remarks.length >= 20) {
                alert("备注长度要小于20个字符");
                return;
            }
            vm.paymentVO = {};
            vm.paymentVO.paymentRecords = vm.paymentRecords;
            vm.paymentVO.payment = vm.payment;
            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/unionPay",
                contentType: "application/json",
                dataType: 'html',
                data: JSON.stringify(vm.paymentVO),
                success: function (html) {
                    $("#temp").html(html);
                }
            });
        },

        // B.线下支付
        offlinePay: function (event) {
            if (vm.payment.remarks != null && vm.payment.remarks.length >= 20) {
                alert("备注长度要小于20个字符");
                return;
            }
            //输入的打款金额 小于 支付金额 --->拒绝 线下转账 请求
            if (vm.payment.amountPaid < vm.payment.amountToPay) {
                alert("打款金额不能小于付款记录的金额总和");
                return;
            }

            if (vm.images.length == 0 && (vm.payment.images == null || vm.payment.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.payment.images == null) {
                vm.payment.images = [];
            }
            vm.payment.images = vm.payment.images.concat(vm.images);

            vm.paymentVO = {};
            vm.paymentVO.paymentRecords = vm.paymentRecords;
            vm.paymentVO.payment = vm.payment;

            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/offlinePay",
                contentType: "application/json",
                data: JSON.stringify(vm.paymentVO),
                success: function (r) {
                    if (r.code == 0) {
                        alert('操作成功', function (index) {
                            vm.payList = false;
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }


    },
    created: function () {
        this.getPlaceData();

        this.getLogisticsOptions();//初始化物流公司
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces = JSON.parse(str);
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table1").bootstrapTable.defaults.locale = "en-US";
                $("#contentTable").bootstrapTable.defaults.locale = "en-US";
                $("#goodsTab").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table1").bootstrapTable.defaults.locale = "zh-CN";
                $("#contentTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsTab").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table1").bootstrapTable("destroy");
            $("#contentTable").bootstrapTable("destroy");
            $("#goodsTab").bootstrapTable("destroy");
            this.initTable();
        },
        "logisticsOrder.numberCode": function (newValue, oldValue) {
            if ((newValue == '' || newValue == null) && vm.addTxBtn) {
                vm.logisticsOrderCommodityList = [];
            }
        },
        'logisticsOrder.buyContact': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('buyContact');
            })
        },
        'logisticsOrder.buyPhone': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('buyPhone');
            })
        },
        'logisticsOrder.buyAddress': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('buyAddress');
            })
        },
        'logisticsOrder.contact': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('contact');
            })
        },
        'logisticsOrder.phone': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('phone');
            })
        },
        'logisticsOrder.address': function (val) {
            vm.$nextTick(function () {
                $("#addForm").data("bootstrapValidator").revalidateField('address');
            })
        },
        "logisticsOrder.province": function (value, old) {
            if (value != old) {
                var str = JSON.stringify(window.getCities(value));
                str = str.replace(/cityid/g, "value").replace(/city/g, "label");
                this.cities = JSON.parse(str);
                setTimeout(function () {
                    vm.logisticsOrder.city = parseInt(vm.logisticsOrder.city);
                }, 0)
            }
        },
        "logisticsOrder.city": function (value, old) {
            if (value != old) {
                var str = JSON.stringify(window.getAreas(value));
                str = str.replace(/areaid/g, "value").replace(/area/g, "label");
                this.areas = JSON.parse(str);
                setTimeout(function () {
                    vm.logisticsOrder.area = parseInt(vm.logisticsOrder.area);
                }, 1)
            }
        },
    }
});