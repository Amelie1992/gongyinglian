$(function () {
    //列表
    vm.initTable();
    //表单提交
    $(".addOrUpdate").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });

    $(".afterForm").FM({
        fields: vm.field2,
        success: vm.saveAfterSale

    });

});

function change2(th) {
    if (th.value == '1') {
        $('#contractNumber').attr('disabled', 'disabled');
    } else {
        $('#contractNumber').removeAttr('disabled');

    }
}

function countFormatter(value, row, index) {
    if (row.qty == null) {
        row.qty = 1;
    }
    return ['<div id="countEdit" class="input-group input-group-option quantity-wrapper">' +
    '<span  class="input-group-addon input-group-addon-remove quantity-remove btn">' +
    '<span class="glyphicon glyphicon-minus"></span>' +
    '</span>' +
    '<input  id="inp" type="text" value="' + row.qty + '" name="option[]" class="form-control quantity-count" placeholder="1">' +
    '<span class="input-group-addon input-group-addon-remove quantity-add btn">' +
    '<span class="glyphicon glyphicon-plus"></span>' +
    '</span>' +
    '</div> '].join('');
}

function orderStatusFmt(value, row, index) {
    if (row.orderStatus == 0) {
        return "待确认";
    } else if (row.orderStatus == 1) {
        if (row.payStatus == 0)
            return '待支付';
        return "待安排";
    } else if (row.orderStatus == 2) {
        return "处理中";
    } else if (row.orderStatus == 3) {
        return "订单完成";
    } else if (row.orderStatus == 4) {
        return "订单取消"
    } else if (row.orderStatus == 5) {
        return "订单挂起"
    } else if (row.orderStatus == 7) {
        return "等待确认取消"
    } else if (row.orderStatus == 8) {
        return "卖家已取消"
    }
}

function afterStatusFmt(value, row, index) {
    if (row.afterStatus == 0) {
        return "无售后申请";
    } else if (row.afterStatus == 1) {
        return "已申请售后"
    }
}

function payStatusFmt(value, row, index) {
    if (row.payStatus == 0) {
        return "待支付";
    } else if (row.payStatus == 1) {
        return "部分支付";
    } else if (row.payStatus == 2) {
        return "支付完成"
    }
}

function placeFmt(value, row, index) {
    if (row.commodityCountry == null) {
        row.commodityCountry = '';
    }
    let str = "";
    if (!vm.addTxBtn) {
        str = '<select class="form-control selectpicker sltplace">';//data-live-search="true" data-dropup-auto="false"
    } else {
        str = '<select class="form-control selectpicker sltplace" disabled="true">';
    }
    vm.placeData.forEach(function (item, index) {
        if (item.name == row.commodityCountry) {
            str += '<option value="' + item.name + '" selected>' + item.name + '</option>';
        } else {
            str += '<option value="' + item.name + '">' + item.name + '</option>';
        }
    });
    str += '</select>';
    return str;

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

function nameFmt(value, row, index) {
    if (row.goodsName == null) {
        row.goodsName = '';
    }
    if (!vm.addTxBtn) {
        return '<input type ="text" class="form-control" id ="goodsName" value="' + row.goodsName + '" >';
    } else {
        return '<input type ="text" class="form-control" id ="goodsName" value="' + row.goodsName + '" disabled="true">';
    }
}

function numFmt(value, row, index) {
    if (row.goodsCount == null) {
        row.goodsCount = '';
    }
    if (!vm.addTxBtn) {
        return '<input type ="text" class="form-control" id ="goodsCount" value="' + row.goodsCount + '" >';
    } else {
        return '<input type ="text" class="form-control" id ="goodsCount" value="' + row.goodsCount + '" disabled="true">';
    }
}

function packingFmt(value, row, index) {
    if (row.commodityPacking == null) {
        row.commodityPacking = '';
    }
    if (!vm.addTxBtn) {
        return '<input type ="text" class="form-control" id ="packing" value="' + row.commodityPacking + '" >';
    } else {
        return '<input type ="text" class="form-control" id ="packing" value="' + row.commodityPacking + '" disabled="true">';
    }
}

function unitFmt(value, row, index) {
    if (row.goodsUnit == null) {
        row.goodsUnit = '';
    }
    let str = "";
    if (!vm.addTxBtn) {
        str = '<select class="form-control selectpicker sltUnit " data-dropup-auto="false">';
    } else {
        str = '<select class="form-control selectpicker sltUnit" disabled="true">';
    }
    vm.unitList.forEach(function (item, index) {
        if (item.code == row.goodsUnit) {
            str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
        } else {
            str += '<option value="' + item.code + '">' + item.name + '</option>';
        }
    });
    str += '</select>';
    return str;
}

function operaFmt() {
    if (vm.params.orderNumber != null) {
        return ['<a href="javascript:void(0)"  id="removeGoods" >移除</a>'].join('');
    } else {
        return ['<a href="javascript:void(0)" id="removeGoods" >移除</a>'].join('');
    }

}

function weightFmt(value, row, index) {
    if (row.goodsTotalPrice == null) {
        row.goodsTotalPrice = '';
    }
    if (!vm.addTxBtn) {
        // step="0.00001" min="0.00001"
        return '<input type="number" class="form-control"  id="goodsTotalPrice" value="' + row.goodsTotalPrice + '" >';
    } else {
        return '<input type="number" class="form-control" id="goodsTotalPrice" value="' + row.goodsTotalPrice + '" disabled="true">';
    }
}

function editFormatter(value, row, index) {
    if (row.orderStatus == 0) {
        return ['<button id="btn_info" class="btn btn-primary btn-sm">查看详情</button>&nbsp;&nbsp;' +
        '<button id="btn_edit" class="btn btn-primary btn-sm">修改订单</button>&nbsp;&nbsp;' +
        '<button id="btn_del" class="btn btn-primary btn-sm">取消订单</button>'].join('');
    } else if (row.orderStatus == 3 || row.orderStatus == 4 || row.orderStatus == 5 || row.orderStatus == 7 || row.orderStatus == 8) {
        let htm = '<button id="btn_info" class="btn btn-primary btn-sm">查看详情</button>';
        /*if (row.orderStatus == 3) {
            if (row.afterStatus == 0) {
                htm += '&nbsp;&nbsp;<button id="btn_after" class="btn btn-primary btn-sm">售后</button>';
            } else {
                htm += '';
            }

            if (row.cusComplaintStatus == 0) {
                htm += '&nbsp;&nbsp;<button id="btn_cus_complaint" class="btn btn-primary btn-sm">投诉</button>';
            } else {
                htm += '&nbsp;&nbsp;<button id="btn_cus_complaint_detail" class="btn btn-primary btn-sm">查看投诉</button>';
            }
        }*/

        if (row.orderStatus == 8) {
            htm += '&nbsp;&nbsp;<button id="btn_del" class="btn btn-primary btn-sm">确认结束</button>';

        }
        return htm;
    } else {
        let htm = '<button id="btn_info" class="btn btn-primary btn-sm">查看详情</button>';
        if (row.payStatus == 0) {
            htm += '&nbsp;&nbsp;<button id="showPay" class="btn btn-primary btn-sm">点击付款</button>';
            htm += '&nbsp;&nbsp;<button id="btn_del" class="btn btn-primary btn-sm">结束订单</button>';
        }
        /* if (row.cusComplaintStatus == 0) {
             htm += '&nbsp;&nbsp;<button id="btn_cus_complaint" class="btn btn-primary btn-sm">投诉</button>';
         } else {
             htm += '&nbsp;&nbsp;<button id="btn_cus_complaint_detail" class="btn btn-primary btn-sm">查看投诉</button>';
         }*/

        return htm;
    }
}

window.editOnEvents = {
    'click #btn_info': function (e, value, row, index) {
        vm.detail(row.id)
    },
    'click #btn_edit': function (e, value, row, index) {
        vm.update(row.id)
    },
    'click #btn_del': function (e, value, row, index) {
        vm.cancel(row);
    },
    'click #btn_cus_complaint': function (e, value, row, index) {
        vm.complaint = {
            orderId: row.orderNumber,
            orderType: 4,
            reason: '',
            images: []
        };
        $("#complaintModal").modal('show');
    },
    'click #btn_cus_complaint_detail': function (e, value, row, index) {
        vm.complaintDeatil(row.orderNumber);
    },
    'click #btn_after': function (e, value, row, index) {
        vm.showList = false;
        vm.showAddOrUpdate = false;
        vm.showDetail = false;
        vm.showAfterSales = true;
        vm.title = "售后服务";
        vm.afterSale = {
            serviceType: 2,
            reason: "",
            refundForm: "",
            images: [],
            orderId: row.orderNumber,
            orderType: 4,
        };
        vm.getInfo(row.id)
    },
    'click #showPay': function showPay(el, value, row, index) {
        window.location.href = '/modules/bill/bill_payable.html?orderNo=' + row.orderNumber;
    }
};

window.operateEvents = {
    'click #removeGoods': function (e, value, row, index) {
        var data = $("#goodsTab").bootstrapTable("getData");
        data.splice(index, 1);
        $("#goodsTab").bootstrapTable('load', {
            rows: data,
            total: data.length
        });
        //当商品项为0时. 1.解除"添加货物"按钮的禁用, 2.清除订单编号输入框的值, 3.清除绑定的parmas值, 4.修改 来源标识值&来源单号值清空
        if ($("#goodsTab").bootstrapTable("getData").length <= 0) {
            $("#txtBtn").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            vm.addTxBtn = false;
            /*vm.params.originNumber = "";*/
            vm.agentOrder.originFlag = 0;
            vm.agentOrder.originNumber = null;
            vm.agentOrder.originPayType = null;
            $("#orderNum").val("");
        }
        $('.selectpicker').selectpicker('refresh');
    },
    'change .sltplace': function (e, value, row, index) {
        row.commodityCountry = $(e.currentTarget).val();
    },
    'change #factoryNo': function (e, value, row, index) {
        row.factoryNo = $(e.currentTarget).val();
    },
    'change #goodsName': function (e, value, row, index) {
        row.commodityName = $(e.currentTarget).val();
        row.goodsName = $(e.currentTarget).val();
    },
    'change #goodsCount': function (e, value, row, index) {
        row.goodsCount = $(e.currentTarget).val();
    },
    'change .sltUnit': function (e, value, row, index) {
        row.goodsUnit = $(e.currentTarget).val();
    },

    'change #goodsPrice': function (e, value, row, index) {
        row.goodsPrice = $(e.currentTarget).val();
    },

    'change #goodsTotalPrice': function (e, value, row, index) {
        row.goodsTotalPrice = $(e.currentTarget).val();
    },

    'change #packing': function (e, value, row, index) {
        row.commodityPacking = $(e.currentTarget).val();
    }

};

function openAddressCheck(evetn) {
    $("#addressModel").modal('show');
    $("#addressTab").bootstrapTable('removeAll');
    $("#addressTab").BTF5();
};

function openMerchantCheck(event) {
    $('#merchantModel').modal('show');
    vm.params.serviceName = '代理服务';
    $('#merTab').bootstrapTable('removeAll');
    $('#merTab').BTF5();
    /* var opt = {url: baseURL + "company/merchantusers/companyList", silent: true, query: vm.params};
     $("#merTab").bootstrapTable('refresh', opt);*/
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        passStatusList: ['待确认', '待安排', '待支付', '订单完结', '订单已取消'],
        kdnData: {
            serviceType: "B",
            expCode: "",
            expNo: "",
            showType: "normal",
            container: "shipElement"
        },
        complaintShow: true,
        toShow: false,
        depot: {},
        storageInfo: true,
        transactionModes: ['一次性支付', '分期支付', '其他（账期）'],
        paymentMethods: ['余额支付', '银联支付', '公司转账'],
        address: {},
        orderStatus: {
            pre: '待审核',
            ep: '审核通过',
            af: '审核失败',
            tbc: '待确认',
            ctom: '待卖家确认取消',
            cto: '订单取消',
            tbp: '待支付',
            ap: '已付款',
            tbd: '待安排',
            tbpu: '待提货',
            s: '已安排',
            pr: '待收货',
            tc: '交易完成',
            agr: '代理',
        },
        goodsOrder: {},
        authorizePage: false,
        authorizeDetail: false,
        ///////////////////////////
        showList: true,
        showAddOrUpdate: false,
        showDetail: false,
        showAfterSales: false,
        title: null,
        agentOrder: {
            goodsOrderEntity: {
                ship: {}
            }
        },
        tempdate: {},
        showTips: true,
        params: {
            name: '',
            orderStatus: ''
        },
        //验证字段
        fields: {
            merchantCompanyName: {
                message: '商家公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择商家信息',
                    },
                }
            },
            offerId: {
                message: '商家报盘信息验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择商家报盘信息',
                    }
                }
            },
            contactPhone: {
                message: '收货联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择收货信息'
                    },
                    regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '请填写正确的联系电话'
                    },
                },
            },
            contactPerson: {
                message: '收货联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    },
                    stringLength: {
                        max: 20,
                        message: '联系人长度须小于20个字符'
                    }
                },
            },
            contactAddress: {
                message: '收货地址验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择收货信息'
                    },
                    stringLength: {
                        max: 50,
                        message: '收货地址长度不超过50个字符'
                    }
                },
            },
            contactCompanyId: {
                message: '公司id(买家)验证失败',
                validators: {
                    notEmpty: {
                        message: '公司id(买家)不能为空'
                    },
                },
            },
            contactDeptId: {
                message: '权限部门id(买家)验证失败',
                validators: {
                    notEmpty: {
                        message: '权限部门id(买家)不能为空'
                    },
                },
            },
            totalPrice: {
                message: '订单总价验证失败',
                validators: {
                    notEmpty: {
                        message: '订单总价不能为空'
                    },
                },
            },
            currency: {
                message: '币种验证失败',
                validators: {
                    notEmpty: {
                        message: '币种不能为空'
                    },
                },
            },
            unitPrice: {
                message: '代理费用单价验证失败',
                validators: {
                    notEmpty: {
                        message: '代理费用单价不能为空'
                    },
                },
            },
            outlayQuantity: {
                // message: '数量验证失败',
                validators: {
                    notEmpty: {
                        message: '代理费用数量不能为空'
                    },
                },
            },
            merchantPhone: {
                message: '商家联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '商家联系方式不能为空'
                    },
                },
            },
            merchantPerson: {
                message: '商家联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '商家联系人不能为空'
                    },
                },
            },
            merchantCompanyId: {
                message: '商家公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择商家信息',
                    },
                }
            },
            originPayType: {
                message: '是否垫付货款验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择是否需要垫付货款',
                    },
                }
            },
            remark: {
                validators: {
                    stringLength: {
                        max: 100,
                        message: '备注长度小于100个字符'
                    }
                }
            },
            inspectionNo: {
                validators: {
                    /*notEmpty: {
                        message: '报检号不能为空'
                    },*/
                    regexp: {
                        regexp: /^\d{15,20}$/,
                        message: '报检号/检疫证号为长度15至20的数字字符'
                    }
                },
            },
        },
        goods: [],
        placeData: [],
        // [{id:'1',code:'KG',name:'千克'},{id:'2',code:'T',name:'吨'},{id:'3',code:"CTN",name:'柜'}]
        unitList: [],
        offerList: [],
        serviceList: [],
        business: [],
        addTxBtn: false,
        complaint: {},
        images: [],
        afterSale: {},
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
        //退款方式
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
        afterImages: [],
        contracts: null
    },
    methods: {
        statueChange: function () {

        },
        // 售后
        btn_after: function () {
            vm.showList = false;
            vm.showAddOrUpdate = false;
            vm.showDetail = false;
            vm.showAfterSales = true;
            vm.title = "售后服务";
            vm.afterSale = {
                serviceType: 2,
                reason: "",
                refundForm: "",
                images: [],
                orderId: vm.agentOrder.orderNumber,
                orderType: 4,
            };
            vm.getInfo(vm.agentOrder.id)
        },
// 投诉
        btn_cus_complaint: function () {
            vm.complaint = {
                orderId: vm.agentOrder.orderNumber,
                orderType: 4,
                reason: '',
                images: []
            };
            $("#complaintModal").modal('show');
        },
// 查看投诉
        btn_cus_complaint_detail: function () {
            vm.complaintDeatil(vm.agentOrder.orderNumber);
        },

//手填合同号校验
        contractWrite: function (obj) {
           /* $.get(baseURL + "agent/order/list?contractNumberAll=" + $("#contractNumber").val() + "&check=true", function (r) {
                if (r.data.length < 1) {
                    alert("合同号不存在，请重新输入");
                    $("#contractNumber").val("");
                    vm.agentOrder.contractNumber = "";
                }
            });*/
            //限长
            if (isBlank(vm.agentOrder.contractNumber)){
                alert("合同编号不能为空！");
                vm.agentOrder.contractNumber = '';
                $("input[name='contractNumber']").val('');
                // $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return;
            }else if (vm.agentOrder.contractNumber.length > 30) {
                alert("合同编号长度必须在30之内！");
                vm.agentOrder.contractNumber = '';
                $("input[name='contractNumber']").val('');
                // $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return;
            }else if (/[\u4E00-\u9FA5]/g.test(vm.agentOrder.contractNumber)) {
                alert("合同编号请勿输入中文！");
                vm.agentOrder.contractNumber = '';
                $("input[name='contractNumber']").val('');
                return;
            }else {
                //检验合同编号是否已经存在
                $.ajaxSettings.async = false;
                $.get(baseURL + "agent/contract/check",
                    {contractNumber: vm.agentOrder.contractNumber}, function (r) {
                        vm.contracts = r.contracts;
                    });
                $.ajaxSettings.async = true;
                if (vm.contracts != null && vm.contracts.length > 0) {
                    alert("该合同编号已经被占用！");
                    vm.agentOrder.contractNumber = '';
                    $("input[name='contractNumber']").val('');
                    // $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                    return
                }
            }

        },
        //授权订单
        authorize: function (val) {
            vm.showList = val != '1';
            vm.authorizePage = val != '2';
            if (val != '2')
                vm.initAuthorizeTable();
        },

        initTable: function () {
            //列表
            $("#table1").bootstrapTable("destroy");     //**********对于查询必不可少
            vm.params.queryType = 1;
            $("#table").BT({
                url: baseURL + 'agent/order/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    // {title: vm.$t("ContractNumber"), field: 'contractNumber'},
                    {title: vm.$t("Buyer"), field: 'contactCompanyName'},
                    {title: vm.$t("Seller"), field: 'merchantCompanyName', width: 100},
                    // { title: '收货联系人', field: 'contactPerson'},
                    // { title: '收货联系方式', field: 'contactPhone'},
                    // { title: '收货地址', width:'300px', field: 'contactAddress'},
                    {title: vm.$t("PurchaseQuantitie"), field: 'outlayQuantity'},
                    {title: vm.$t("OrderTotalPrice"), field: 'totalPrice'},
                    {
                        title: vm.$t("unit"), field: 'currency', formatter: function (value, row, idx) {
                            return value == 'USD' ? '美元' : '元';
                        }
                    },
                  /*  {title: vm.$t("UnitPrice"), field: 'unitPrice'},*/
                 /*   {title: vm.$t("AfterSaleState"), field: 'afterStatus', formatter: afterStatusFmt},*/
                    // { title: '接单时间', field: 'receiptTime',undefinedText:'商家尚未接单'},
                    // { title: '支付时间', field: 'payTime',undefinedText:'尚未支付'},
                   /* {
                        title: vm.$t("PaymentForPaymentOfGoods"),
                        field: 'originPayType',
                        formatter: function (value, arr, idx) {
                            if (value == 2)
                                return '无需垫付';
                            else if (value == 1)
                                return '授权垫付';
                            else
                                return '-'
                        }
                    },*/
                    {title: vm.$t("TradingTime"), field: 'submitTime'},
                    {title: vm.$t("OrderStatus"), field: 'orderStatus', formatter: orderStatusFmt},
                    {
                        title: vm.$t("Remarks"), field: 'remark',
                        formatter: function (value, arr, idx) {
                            if (!isBlank(value) && value.length > 5) {
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"), formatter: editFormatter, events: editOnEvents, align: 'center'
                    }
                ],
                //条件查询
                queryParams: vm.params
            });

            $("#goodsTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#goodsTab").BT({
                height: 600,
                columns: [
                    {title: vm.$t("ProductName"), field: 'goodsName', formatter: nameFmt, events: operateEvents},// 品名
                    {title: vm.$t("place"), field: 'commodityCountry',formatter: placeFmt,events: operateEvents},// 原产国
                    {
                        title: vm.$t("ProducerOrNumber"),
                        field: 'factoryNo',
                        formatter: factoryNoFmt,
                        events: operateEvents
                    },//厂号
                    // {title: vm.$t("UnitPrice"), field: 'goodsPrice', formatter: placeFmt, events: operateEvents},
                    {title: vm.$t("weight"), field: 'goodsCount', formatter: numFmt, events: operateEvents},
                    // {title: vm.$t("TotalPrice"), field: 'goodsTotalPrice', formatter: weightFmt, events: operateEvents},
                    {title: vm.$t("unit"), field: 'goodsUnit', formatter: unitFmt, events: operateEvents},
                    {title: vm.$t("pack"), field: 'commodityPacking', formatter: packingFmt, events: operateEvents},
                    {title: vm.$t("chaozuo"), formatter: operaFmt, events: operateEvents}
                ]
            });

            $("#detailGoodsTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#detailGoodsTab").BT({
                columns: [
                    {title: vm.$t("ProductName"), field: 'goodsName', formatter: nameFmt, events: operateEvents},
                    {title: vm.$t("place"), field: 'commodityCountry',formatter: function (value, row, index) {
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
                // return str;
                return '<input type ="text" class="form-control" value="' + str + '" disabled="true">';
            } ,events: operateEvents},
                    {title: vm.$t("ProducerOrNumber"), field: 'factoryNo', formatter: factoryNoFmt, events: operateEvents},
                    {title: vm.$t("weight"), field: 'goodsCount', formatter: numFmt, events: operateEvents},
                    // {title: vm.$t("unit"), field: 'goodsUnit', formatter: unitFmt, events: operateEvents},
                    {title: vm.$t("unit"), field: 'goodsUnit',formatter: function (value, row, index) {
                            if (row.commodityUnit == null) {
                                row.commodityUnit = '';
                            }
                            var str = "";

                            vm.unitList.forEach(function (item, index) {
                                if (item.code == row.goodsUnit) {
                                    str = item.name;
                                }

                            })
                            if (str == '') {
                                if (row.goodsUnit == 1) {
                                    str = '吨';
                                } else if (row.goodsUnit == 2){
                                    str = '千克';
                                }else {
                                    str=row.goodsUnit
                                }
                            }
                            // return str;
                            return '<input type ="text" class="form-control" value="' + str + '" disabled="true">';
                        },events: operateEvents},
                    {title: vm.$t("pack"), field: 'commodityPacking', formatter: packingFmt, events: operateEvents}
                ]
            });

            $("#merTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#merTab").BT({
                url: baseURL + "company/merchantusers/companyList",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("CorporateName"), field: 'companyName'},
                ],
                queryParams: vm.params
            });

            $("#addressTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#addressTab").BT({
                url: baseURL + "company/receivingaddress/listByUserId",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("contact"), field: 'consignee'},
                    {title: vm.$t("phone"), field: 'phonenumber'},
                    // {title: vm.$t("ReceivingAddress"), field: 'detailedaddress'},
                    {title: vm.$t("Area"), field: 'specificaddress'}
                ],
            });

        },
        query: function () {
            //设置查询买入订单
            vm.params.queryType = 1;
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.showAddOrUpdate = true;
            vm.showDetail = false;
            vm.showAfterSales = false;
            vm.title = "新增";
            vm.agentOrder = {};
            vm.goods = [];
            vm.getPlaceData();
            vm.getCommodityWeightUnit();
            vm.getUserDefaultInfo();
            setTimeout(function () {
                $('.addOrUpdate').data('bootstrapValidator').resetForm(true);
            }, 100);
            $("#sltOffer").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            $("#inspectionNo").prop("disabled", false);

        },
        update: function (rowId) {
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.showAddOrUpdate = true;
            vm.showDetail = false;
            vm.showAfterSales = false;
            vm.title = "修改";
            vm.getPlaceData();
            vm.getCommodityWeightUnit();
            vm.getInfo(rowId);
            // $(":radio[name='originPayType'][value='2']").prop("checked", "checked");
            $("#sltOffer").prop("disabled", true);
            $("#orderNum").prop("disabled", true);
            $("#inspectionNo").prop("disabled", true);
        },
        detail: function (rowId) {
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.showAddOrUpdate = false;
            vm.showDetail = true;
            vm.showAfterSales = false;
            vm.title = "订单详情";
            vm.getPlaceData();
            vm.getCommodityWeightUnit();
            vm.getInfo(rowId);
        },
        removeGoods:function (index) {
            vm.goods.splice(index,1);
            if(!vm.goods.length>0){
                $("#txtBtn").prop("disabled", false);
                $("#orderNum").prop("disabled", false);
                vm.addTxBtn = false;
                /*vm.params.originNumber = "";*/
                vm.agentOrder.originFlag = 0;
                vm.agentOrder.originNumber = null;
                vm.agentOrder.originPayType = null;
                $("#orderNum").val("");
            }
        },
        //表单验证
        validate: function () {
            var bl = $('.addOrUpdate').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        validate2: function () {
            var bl = $('.afterForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var radio = $("input[name='contractCode']:checked").val();
            if (radio == 0 && isBlank(vm.agentOrder.contractNumber)) {
                alert("手输合同编号不能为空");
                return false;
            }

            if (!isBlank(vm.agentOrder.remark) && vm.agentOrder.remark.length > 100) {
                alert("备注长度须小于100个字符");
                return;
            }

            //代理项目
            if (vm.serviceList.length <= 0) {
                alert("请选择报盘信息");
            }
            else {
                let $box = $("input[name='serviceId']:checked");
                if ($box.length > 0) {
                    vm.business = [];
                    $.each($box, function (index, item) {
                        let $this = $(this);
                        let obj = {};
                        obj.busType = item.value;
                        obj.busName = $this.attr('text');
                        vm.business.push(obj);
                    });
                    vm.agentOrder.business = vm.business;
                } else {
                    alert("请选择代理项目", function () {
                    });
                    return false;
                }
            }

            //是否有来源订单
            if (isBlank(vm.agentOrder.originNumber)) {
                vm.agentOrder.originFlag = 0;
            }
            else if (vm.agentOrder.originFlag == 1) {
                let $radio = $("input[name='originPayType']:checked");
                if ($radio.length > 0) {
                    vm.agentOrder.originPayType = $radio.val();
                } else {
                    alert("请选择是否需要垫付货款");
                    return false;
                }
            } else {
                vm.agentOrder.originFlag = 1;
            }

            //货物信息
          /*  vm.goods = [];
            vm.goods = $("#goodsTab").bootstrapTable('getData');*/
            var bl = false;
            var alertHeader = '第n行货物信息';
            if (vm.goods.length <= 0) {
                alert("请输入来源单号或自行添加商品信息");
               /* $("#goodsTab").bootstrapTable('removeAll');*/
                vm.goods = [];
                return;
            } else {
                // vm.goods.forEach(function (item, index) {
                for (var i = 0; i < vm.goods.length; i++) {
                    if (isBlank(vm.goods[i].goodsName)) {
                        alert(alertHeader.replace('n', i + 1) + ", 品名不可为空");
                        break;
                    }
                    else if (vm.goods[i].goodsName.length > 20) {
                        alert(alertHeader.replace('n', i + 1) + ", 品名长度须小于20个字符");
                        break;
                    }
                    else if (isBlank(vm.goods[i].commodityCountry)) {
                        alert(alertHeader.replace('n', i + 1) + ", 请选择原产国");
                        break;
                    }
                    else if (isBlank(vm.goods[i].factoryNo)) {
                        alert(alertHeader.replace('n', i + 1) + ", 厂号不可为空");
                        break;
                    }
                    else if (vm.goods[i].factoryNo.length > 20) {
                        alert(alertHeader.replace('n', i + 1) + ", 厂号须小于20个字符");
                        break;
                    }

                    /*else if (item.goodsName.length > 30 || item.commodityFactoryNumber.length > 30) {
                        alert("长度小于30");
                    }*/

                    /*else if (isBlank(vm.goods[i].goodsPrice)) {
                        alert(alertHeader.replace('n', i + 1) + ", 单价不可为空");
                        break;
                    }*/
                    else if (isBlank(vm.goods[i].goodsCount)) {
                        alert(alertHeader.replace('n', i + 1) + ", 重量不可为空");
                        break;
                    }
                    else if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.goods[i].goodsCount)) {
                        alert(alertHeader.replace('n', i + 1) + ", 重量整数最多9位，可保留2位小数");
                        break;
                    }
                    /*else if (isBlank(item.goodsTotalPrice)) {
                        alert(alertHeader.replace('n', index + 1) + ", 总价不可为空");
                    }*/
                    /*else if (!/(^(?=\d+.?\d+$)[\d.]{0,10}$)/.test(item.commodityCount)) {
                        alert("重量为最多10位包括小数");
                    }
                    */
                    else if (isBlank(vm.goods[i].goodsUnit)) {
                        alert(alertHeader.replace('n', i + 1) + ", 请选择单位");
                        break;
                    }

                    else if (!isBlank(vm.goods[i].commodityPacking) && vm.goods[i].commodityPacking.length > 20) {
                        alert(alertHeader.replace('n', i + 1) + ", 包装须小于20个字符");
                        break;
                    }
                    if (i == (vm.goods.length - 1)) {
                        bl = true;
                    }
                }

                if (!bl) return;

                vm.agentOrder.goods = vm.goods;

            }

            var url = vm.agentOrder.id == null ? "agent/order/save" : "agent/order/update";
            layer.load();
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.agentOrder),
                success: function (r) {
                    layer.closeAll();
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.params.orderNumber = '';
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        cancel: function (row) {
            var rowId = row.id;

            if (rowId == null) {
                return;
            }

            var flag = 7;
            if (row.orderStatus == '8')
                flag = 4;

            confirm('确定要完结订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/order/cancel",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({id: rowId, flag: flag}),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                vm.params.orderNumber = '';
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (rowId) {
            $.get(baseURL + "agent/order/info/" + rowId, function (r) {
                vm.agentOrder = r.data;
                vm.params.orderNumber = vm.agentOrder.orderNumber;
                //获取商家的报盘列表
                vm.getOfferList();

                //获取报盘的代理项目列表
                if (vm.agentOrder.offer != null) {
                    vm.serviceList = vm.agentOrder.offer.business;

                    //延迟加载
                    vm.$nextTick(function () {
                        //默认勾选代理项目
                        if (vm.agentOrder.business.length > 0) {
                            vm.agentOrder.business.forEach(function (obj, index) {
                                let $checkbox = $("input[name='serviceId']");
                                if ($checkbox.length > 0) {
                                    $.each($checkbox, function (idx, item) {
                                        let cValue = item.value;
                                        if (obj.busType == cValue) {
                                            $(this).prop('checked', true);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

                // if (vm.agentOrder.originNumber != null) {
                    vm.params.originNumber = vm.agentOrder.originNumber;

                    //是否垫付货款
                  /*  if (vm.agentOrder.originFlag == 1) {*/
                        if (vm.agentOrder.originPayType != null) {
                            let $radiobox = $("input[name='originPayType']");
                            $.each($radiobox, function (idx, item) {
                                if (vm.agentOrder.originPayType == item.value) {
                                    $(this).prop('checked', true);
                                }
                            });
                        }
                   /* }*/
                    //设置商品项内容禁用 & 添加货物按钮禁用
                    vm.addTxBtn = true;
                    $("#txtBtn").prop("disabled", true);

              /*  }*/
                if (vm.showAddOrUpdate == true && vm.showDetail == false) {
                   /* $("#goodsTab").bootstrapTable('removeAll');
                    $("#goodsTab").bootstrapTable('append', vm.agentOrder.goods);
                    $("#goodsTab").bootstrapTable('load', {
                        total: vm.agentOrder.goods.length == 0 ? 0 : vm.agentOrder.goods.length
                    });*/
                   vm.goods = vm.agentOrder.goods;
                } else if (vm.showDetail && !vm.showAddOrUpdate) {
                    $("#detailGoodsTab").bootstrapTable('removeAll');
                    $("#detailGoodsTab").bootstrapTable('append', vm.agentOrder.goods);
                    $("#detailGoodsTab").bootstrapTable('load', {
                        total: vm.agentOrder.goods.length == 0 ? 0 : vm.agentOrder.goods.length
                    });
                }
                if (vm.showDetail) {
                    // 代理信息
                    vm.agentOrder.goodsOrderEntity = vm.agentOrder.goodsOrderEntity;

                    if (null != vm.agentOrder.goodsOrderEntity) {
                        // 物流信息
                        if (null != vm.agentOrder.goodsOrderEntity.ship) {
                            vm.kdnData.expCode = vm.agentOrder.goodsOrderEntity.ship.logisticsCode;
                            vm.kdnData.expNo = vm.agentOrder.goodsOrderEntity.ship.singleNumber;
                            KDNWidget.run(vm.kdnData)
                        }
                    }
                }

                setTimeout(function () {
                    $('.selectpicker').selectpicker('refresh');

                }, 100);
            });
        }, back: function () {
            vm.params.orderNumber = "";
            vm.params.contractNumber = "";
            vm.reload();

        },
        reload: function (event) {
            if (event != null) {
                location.reload();
            }
            vm.showList = true;
            vm.showAddOrUpdate = false;
            vm.showDetail = false;
            vm.showAfterSales = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $(".addOrUpdate").RF();
            $(".afterForm").RF();
            $("#goodsTab").bootstrapTable('removeAll');
            $("#detailGoodsTab").bootstrapTable('removeAll');
            vm.serviceList = [];
            vm.business = [];
            vm.offerList = [];
            $("#txtBtn").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            $("input[name='originPayType']").prop("checked", false);
        },

        getPlaceData: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        r.data.unshift({code: null, name: '请选择产地'});
                        vm.placeData = r.data;
                    }
                }
            })
        },
        //获取用户所选择的地址信息
        getAddressDate: function () {
            var data = $("#addressTab").bootstrapTable("getSelections")[0];
            $("#addressModel").modal('hide');
            if (data != null) {
                Vue.set(vm.agentOrder, 'contactPerson', data.consignee);
                Vue.set(vm.agentOrder, 'contactPhone', data.phonenumber);
                Vue.set(vm.agentOrder, 'contactAddress',data.detailedaddress+'-'+data.specificaddress /*[data.detailedaddress, data.specificaddress].join("  详细: ")*/);
            }
        },
        //获取用户的默认信息(买家公司信息)
        getUserDefaultInfo: function () {
            $.get({
                url: baseURL + 'company/merchantusers/getUserCompany',
                dataType: 'JSON',
                success: function (r) {
                    if (r.code == 0) {
                        let map = r.data;
                        if (map.company != null) {
                            Vue.set(vm.agentOrder, 'contactCompanyId', map.company.id);
                            Vue.set(vm.agentOrder, 'contactCompanyName', map.company.companyName);
                        }
                    }
                }
            })
        },
        //添加货物
        addGoods: function (type) {
            vm.getPlaceData();

            if ('orderNum' == type) {
                vm.addTxBtn = true;
                let originNumber = vm.agentOrder.originNumber;
                if (originNumber == null || originNumber == '') {
                    // alert("请输入正确的订单编号");
                 /*   $('#goodsTab').bootstrapTable('removeAll');*/
                    vm.goods = [];
                } else {
                    $("#txtBtn").prop("disabled", true);
                    $.get(baseURL + 'agent/order/getListByOrderNumber/' + originNumber, function (res) {
                        if (res.code == 0) {
                           /* $('#goodsTab').bootstrapTable('removeAll');*/
                            vm.goods = [];
                            if (res.data.list != null && res.data.list.length > 0) {
                                vm.goods = res.data.list;
                              /*  $('#goodsTab').bootstrapTable('append', vm.goods);*/
                                vm.agentOrder.originFlag = res.data.orderType;
                                /*vm.agentOrder.originNumber = vm.params.originNumber;*/
                                setTimeout(function () {
                                    $('.selectpicker').selectpicker('refresh');

                                }, 100);
                            } else {
                                alert("未查询到订单商品信息,请重新输入");
                                $("#txtBtn").prop("disabled", false);
                                $("#orderNum").prop("disabled", false);
                                vm.addTxBtn = false;
                                vm.agentOrder.originFlag = 0;
                                return;
                            }
                        }
                    })
                }
            } else if ('txtBtn' == type) {
                // if( $("#orderNum").prop("disabled")== true){
                //     return;
                // }
                vm.addTxBtn = false;
                $("#orderNum").prop("disabled", true);
                var tempDate = {};
                tempDate.goodsCount = null;
                // tempDate.goodsCsc = null;
                // tempDate.goodsCurrency = null;
                // tempDate.goodsImageUrl = null;
                tempDate.goodsName = null;
                // tempDate.goodsNumber = null;
                // tempDate.goodsPrice = null;
                // tempDate.goodsTotalPrice = null;
                // tempDate.goodsType = null;
                tempDate.goodsUnit = 1;
                // tempDate.oldGoodsNumber = null;
                // tempDate.orderId = null;
                tempDate.factoryNo = null;
                tempDate.commodityCountry = vm.placeData[0].name;
                tempDate.commodityPacking = null;
                vm.goods.push(tempDate);
               /* $('#goodsTab').bootstrapTable('append', tempDate);
                var len = $("#goodsTab").bootstrapTable('getData').length;
                $("#goodsTab").bootstrapTable('load', {
                    total: len
                });*/
            }
            setTimeout(function () {
                $('.selectpicker').selectpicker('refresh');

            }, 100);
        },
        //地址模态框 模糊查询
        addressQuery: function (event) {
            $("#addressTab").BTF5();
        },
        //商家信息模态框 模糊查询
        merchantQuery: function (event) {
            $("#merTab").BTF5(vm.params);
        },
        //获取用户所选择的商家信息
        getMerchantDate: function () {
            var data = $("#merTab").bootstrapTable("getSelections")[0];
            $("#merchantModel").modal('hide');
            if (data != null) {
                Vue.set(vm.agentOrder, 'merchantCompanyId', data.id);
                Vue.set(vm.agentOrder, 'merchantCompanyName', data.companyName);
                //获取所选择商家的报盘列表
                vm.getOfferList();
                Vue.set(vm.agentOrder, 'merchantPerson', '');
                Vue.set(vm.agentOrder, 'merchantPhone', '');
                Vue.set(vm.agentOrder, 'unitPrice', '');
                Vue.set(vm.agentOrder, 'outlayQuantity', '');
                Vue.set(vm.agentOrder, 'totalPrice', '');
                Vue.set(vm.agentOrder, 'currency', '');
                Vue.set(vm.agentOrder, 'remark', '');
                Vue.set(vm, 'serviceList', []);
            }
        },
        //获取用户选择的企业的报盘信息列表
        getOfferList: function () {

            $.get(baseURL + 'agent/offer/getCompanyList',
                {
                    id: vm.agentOrder.merchantCompanyId
                }, function (res) {
                    if (res.code == 0) {
                        var temp = [{id: null, title: '请选择'}];
                        if (null != res.data && res.data.length > 0) {
                            res.data.forEach(function (item, idx, arr) {
                                temp.push(item);
                            });
                            vm.offerList = temp;
                        } else {
                            vm.offerList = [];
                        }

                        //默认选择报盘
                        if (vm.agentOrder.offerId != null) {

                            vm.$nextTick(function () {
                                $("#sltOffer").val(vm.agentOrder.offerId).trigger("change");
                            });
                            if (vm.agentOrder.offer)
                                $("#sltCurrency").val(vm.agentOrder.offer.currency).trigger("change");
                            $("#sltCurrency").val(0);
                        }
                    }

                });
        },
        //数量change事件
        quantityC: function () {
            let price = vm.agentOrder.unitPrice;
            if (price == null) {
                alert("请选择报盘信息");
                return false;
            }
            let quantity = vm.agentOrder.outlayQuantity;
            let count = (parseFloat(price) * parseFloat(quantity)).toFixed(2);
            Vue.set(vm.agentOrder, 'totalPrice', count);
        },
        //获取字典数据 -  货物重量单位
        getCommodityWeightUnit: function () {
            /*$.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        r.data.unshift({code: null, name: '请选择单位'});
                        vm.unitList = r.data;
                    }
                }
            })*/
            vm.unitList = [
                /* {code:1,name:'元/吨'},
                 {code:2,name:'元/千克'},
                 {code:3,name:'美元/吨'},
                 {code:4,name:'美元/千克'}*/
                {code: 1, name: '吨'},
                {code: 2, name: '千克'}
            ];

        },
        //保存投诉信息
        saveComplaint: function () {
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
            vm.complaint.images = vm.complaint.images.concat(vm.images);
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/save",
                contentType: "application/json",
                data: JSON.stringify(vm.complaint),
                success: function (r) {
                    $("#complaintModal").modal("hide");
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
        //查看投诉
        complaintDeatil: function (id) {
            $("#complaintModal").modal("show");

            vm.complaint = {};
            vm.images = [];
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId: id, orderType: 4}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.complaint = r.data;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },

        //申请售后信息
        saveAfterSale: function () {
            if (vm.afterImages.length == 0 && (vm.afterSale.images == null || vm.afterSale.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.afterSale.images == null) {
                vm.afterSale.images = [];
            }
            ;
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
        }
    },
    // created:function () {
    //     this.getPlaceData();
    // },
    watch: {
        "$i18n.locale": function (value) {
            this.$nextTick(fu)
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#goodsTab").bootstrapTable.defaults.locale = "en-US";
                $("#detailGoodsTab").bootstrapTable.defaults.locale = "en-US";
                $("#merTab").bootstrapTable.defaults.locale = "en-US";
                $("#addressTab").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsTab").bootstrapTable.defaults.locale = "zh-CN";
                $("#detailGoodsTab").bootstrapTable.defaults.locale = "zh-CN";
                $("#merTab").bootstrapTable.defaults.locale = "zh-CN";
                $("#addressTab").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#goodsTab").bootstrapTable("destroy");
            $("#detailGoodsTab").bootstrapTable("destroy");
            $("#merTab").bootstrapTable("destroy");
            $("#addressTab").bootstrapTable("destroy");
            this.initTable();
        },
        "agentOrder.merchantCompanyName": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('merchantCompanyName');
            })
        },
        "agentOrder.merchantPerson": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('merchantPerson');
            })
        },
        "agentOrder.merchantPhone": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('merchantPhone');
            })
        },
        "agentOrder.unitPrice": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('unitPrice');
            })
        },
        "agentOrder.outlayQuantity": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('outlayQuantity');
            })
        },
        "agentOrder.totalPrice": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('totalPrice');
            })
        },
        "agentOrder.currency": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('currency');
            })
        },
        "agentOrder.contactPerson": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('contactPerson');
            })
        },
        "agentOrder.contactPhone": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('contactPhone');
            })
        },
        "agentOrder.contactAddress": function (val) {
            vm.$nextTick(function () {
                $(".addOrUpdate").data("bootstrapValidator").revalidateField('contactAddress');
            })
        }
    }
});

$(".selectOfferInfo").on("select2:select", function () {
    let data = $(this).find("option:selected").data('obj');
    var offerId = $(this).val();
    Vue.set(vm.agentOrder, 'offerId', offerId);
    Vue.set(vm.agentOrder, 'merchantPerson', data.contactPerson);
    Vue.set(vm.agentOrder, 'merchantPhone', data.contactPhone);
    Vue.set(vm.agentOrder, 'unitPrice', parseFloat(data.price));
    Vue.set(vm.agentOrder, 'currency', data.currency);
    Vue.set(vm.agentOrder, 'outlayQuantity', 1);
    Vue.set(vm.agentOrder, 'totalPrice', (parseFloat(data.price) * parseFloat(1)).toFixed(2))
    vm.serviceList = data.business;
    $("#sltCurrency").val(vm.agentOrder.currency).trigger("change");
});
