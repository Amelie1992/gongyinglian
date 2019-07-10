$(function () {
    //列表
    vm.initTable();
    //表单提交
    $("#agentOrder").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });
    $("#changepriceForm").FM({
        fields: vm.fieldsPrice,
        success: vm.updateChangePrice
    });
    $("#refuseForm").FM({
        fields: vm.fields3,
        success: vm.refuseOrder
    });

    $('#changeprice').on('hide.bs.modal', function () {
        $("#changepriceForm").RF();
        vm.changpricebefore.afterPrice = null;
    });
    $('#refuseModal').on('hide.bs.modal', function () {
        $('#refuseForm').bootstrapValidator('resetForm', true);
        $('#refuseForm')[0].reset();
    })
});

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
        return "待安排";
    } else if (row.orderStatus == 2) {
        return "处理中"
    } else if (row.orderStatus == 3) {
        return "订单完成"
    } else if (row.orderStatus == 4) {
        return "订单取消"
    } else if (row.orderStatus == 5) {
        return "订单挂起"
    } else if (row.orderStatus == 7) {
        return "买家已取消"
    } else if (row.orderStatus == 8) {
        return "等待确认取消"
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
        str = '<select class="form-control selectpicker sltplace" >';
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
        str = '<select class="form-control selectpicker sltUnit" >';
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


function weightFmt(value, row, index) {
    if (row.goodsTotalPrice == null) {
        row.goodsTotalPrice = '';
    }
    if (!vm.addTxBtn) {
        return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.goodsTotalPrice + '" >';
    } else {
        return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.goodsTotalPrice + '" disabled="true">';
    }
}

function editFormatter(value, row, index) {
    if (row.orderStatus == 0) {
        return ['<button id="btn_accept" class="btn btn-primary btn-sm">接单</button>&nbsp;&nbsp;<button id="btn_refuse" class="btn btn-primary btn-sm">拒绝接单</button>&nbsp;&nbsp;<button id="btn_info" class="btn btn-primary btn-sm">查看详情</button>'].join('');
    } else if (row.orderStatus == 3 || row.orderStatus == 4 || row.orderStatus == 5 || row.orderStatus == 7 || row.orderStatus == 8) {
        let htm = '<button id="btn_info" class="btn btn-primary btn-sm">查看详情</button>';
        /*if (row.orderStatus == 3) {
         if (row.merComplaintStatus == 0) {
         htm += '&nbsp;&nbsp;<button id="btn_mer_complaint" class="btn btn-primary btn-sm">投诉</button>';
         } else {
         htm += '&nbsp;&nbsp;<button id="btn_mer_complaint_detail" class="btn btn-primary btn-sm">查看投诉</button>';
         }
         }*/
        if (row.orderStatus == 7) {
            htm += '&nbsp;&nbsp;<button id="btn_cancel" class="btn btn-primary btn-sm">确认结束</button>';
        }
        return htm;
    } else {
        let htm = '<button id="btn_info" class="btn btn-primary btn-sm">查看详情</button>';
        if (row.payStatus == 0) {
            htm += '&nbsp;&nbsp;<button id="btn_cancel" class="btn btn-primary btn-sm">结束订单</button>';
        }
        /*if (row.merComplaintStatus == 0) {
         htm += '&nbsp;&nbsp;<button id="btn_mer_complaint" class="btn btn-primary btn-sm">投诉</button>';
         } else {
         htm += '&nbsp;&nbsp;<button id="btn_mer_complaint_detail" class="btn btn-primary btn-sm">查看投诉</button>';
         }*/
        return htm;
    }
}

window.editOnEvents = {
    'click #btn_info': function (e, value, row, index) {
        vm.addTxBtn = true;
        vm.detail(row.id)
    },
    'click #btn_edit': function (e, value, row, index) {
        vm.update(row.id)
    },
    'click #btn_cancel': function (e, value, row, index) {
        vm.cancel(row);
    },
    'click #btn_refuse': function (e, value, row, index) {
        vm.agentOrder = {
            id: row.id,
            orderStatus: 4,
            remark: ''
        };
        $("#refuseModal").modal('show');
    },
    'click #btn_accept': function (e, value, row, index) {
        vm.accept(row.id);
    },
    'click #btn_mer_complaint': function (e, value, row, index) {
        vm.complaint = {
            orderId: row.orderNumber,
            orderType: 4,
            reason: '',
            images: []
        };
        $("#complaintModal").modal('show');
    },
    'click #btn_mer_complaint_detail': function (e, value, row, index) {
        vm.complaintDeatil(row.orderNumber);
    }
}

window.operateEvents = {
    'click #removeGoods': function (e, value, row, index) {
        var data = $("#goodsTab").bootstrapTable("getData");
        data.splice(index, 1);
        $("#goodsTab").bootstrapTable('load', data);
        //当商品项为0时. 1.解除"添加货物"按钮的禁用, 2.清除订单编号输入框的值, 3.清除绑定的parmas值, 4.修改 来源标识值&来源单号值清空
        if ($("#goodsTab").bootstrapTable("getData").length <= 0) {
            $("#txtBtn").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            vm.addTxBtn = false;
            vm.params.originNumber = "";
            vm.agentOrder.originFlag = 0;
            vm.agentOrder.originNumber = null;
            vm.agentOrder.originPayType = null;
            $("#orderNum").val("");
        }
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
        row.unit = $(e.currentTarget).val();
    },
};

function openAddressCheck(evetn) {
    $("#addressModel").modal('show');
    $("#addressTab").BTF5(vm.params);
};

function openMerchantCheck(event) {
    $('#merchantModel').modal('show');
    vm.params.serviceName = '代理服务';
    $('#merTab').BTF5(vm.params);
}

function changePrice(val, id) {
    vm.changpricebefore.id = id;
    vm.changpricebefore.beforePrice = val;
    $("#changeprice").modal("show");

}


var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        passStatusList: [
            {value: "", label: "选择订单状态"},
            {value: 0, label: '待确认'},
            {value: 1, label: '待安排'},
            {value: 2, label: '待支付'},
            {value: 3, label: '订单完结'},
            {value: 4, label: '订单已取消'}
        ],
        //////
        transactionManners: ['CFR', 'CIF', 'CPT', 'CIP', 'DAF', 'DES', 'DEQ', 'DDU', 'DDP', 'FOB', 'FCA', 'FAS', 'EXW'],
        priceVersionShow: false,
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
        storageInfo: false,
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
            s: '已发货',
            pr: '待收货',
            tc: '交易完成',
            agr: '代理',
        },
        statusSelect: [
            {value: "", label: "选择订单状态"},
            {value: "pre", label: "待审核"},
            {value: "ep", label: "审核通过"},
            {value: "af", label: "审核失败"},
            {value: 'tbc', label: '待确认'},
            {value: 'ctom', label: '待卖家确认取消'},
            {value: 'cto', label: '订单取消'},
            {value: 'tbp', label: '待支付'},
            {value: 'tbd', label: '待安排'},
            {value: 'tbpu', label: '待提货'},
            {value: 'pr', label: '待收货'},
            {value: 'tc', label: '交易完成'},
        ],
        goodsOrder: {},
        authorizePage: false,
        authorizeDetail: false,
        /////
        showList: true,
        showAccept: false,
        showDetail: false,
        title: null,
        agentOrder: {},
        showTips: true,
        params: {
            name: '',
            orderStatus: ''
        },
        fieldsPrice: {
            priceafter: {
                message: '价格失败',
                validators: {
                    notEmpty: {
                        message: '价格不能为空',
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
                        message: '折后价为整数最多9位，小数最多2位的正数',
                    }
                }
            }
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
                        message: '请选择收货信息'
                    },
                },
            },
            contactAddress: {
                message: '收货地址验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择收货信息'
                    },
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
                message: '数量验证失败',
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
            }
        },
        fields3: {
            remark: {
                message: '拒单原因验证失败',
                validators: {
                    notEmpty: {
                        message: '拒单原因不能为空'
                    }, stringLength: {
                        max: 200,
                        message: '拒单原因长度应小于200'
                    },
                },
            },
        },
        goods: [],
        placeData: [],
        unitList: [],
        offerList: [],
        serviceList: [],
        business: [],
        addTxBtn: false,
        complaint: {},
        images: [],
        changpricebefore: {
            beforePrice: null,
            afterPrice: null,
            id: null
        }
    },
    methods: {
        btnMerComplaintDetail: function () {
            vm.complaintDeatil(vm.agentOrder.orderNumber);
        },
        btnMerComplaint: function (row) {
            vm.complaint = {
                orderId: vm.agentOrder.orderNumber,
                orderType: 4,
                reason: '',
                images: []
            };
            $("#complaintModal").modal('show');
        },

        //授权订单
        authorize: function (val) {
            vm.showList = val != '1';
            vm.authorizePage = val != '2';
            vm.title = '代理订单';
            if (val != '2')
                vm.title = '授权订单';
            vm.params.orderStatus = null;

            if(vm.authorizePage)
                vm.initAuthorizeTable();
            else
                $("#table").BTF5(vm.params);
        },

        updateChangePrice: function () {
            $.ajax({
                type: 'POST',
                url: baseURL + 'agent/order/changePrice',
                contentType: 'application/json',
                data: JSON.stringify(vm.changpricebefore),
                success: function (obj) {
                    if (obj.code == '0')
                        alert('改价成功！', function () {
                            vm.reload();
                            $('#changeprice').modal('hide');
                        });
                    else
                        alert(obj.msg)
                }

            })
        },
        initTable: function () {
            vm.params.queryType = 2;

            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'agent/order/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber', width: 200},
                    // {title: vm.$t("ContractNumber"), field: 'contractNumber', width: 200},
                    {title: vm.$t("Buyer"), field: 'contactCompanyName'},
                    {title: vm.$t("Seller"), field: 'merchantCompanyName'},
                    // { title: '收货联系人', field: 'contactPerson'},
                    // { title: '收货联系方式', field: 'contactPhone'},
                    // { title: '收货地址', width:'300px', field: 'contactAddress'},
                    {title: vm.$t("PurchaseQuantitie"), field: 'outlayQuantity'},
                    {
                        title: vm.$t("OrderTotalPrice"), field: 'totalPrice', formatter: function (value, row, idx) {
                        if (row.orderStatus == 0) {
                            return value + '  <a href="javascript:void(0)" onclick="changePrice(' + value + ',' + row.id + ')">改价</a>'
                        } else {
                            return value;
                        }
                    }
                    },
                    {
                        title: vm.$t("unit"), field: 'currency', formatter: function (value, row, idx) {
                        return value == 'USD' ? '美元' : '元';
                    }
                    },
                   /* {title: vm.$t("UnitPrice"), field: 'unitPrice'},*/
                    // { title: '商家联系人', field: 'merchantPerson'},
                    // { title: '商家联系方式', field: 'merchantPhone'},
                    // { title: '支付状态', field: 'payStatus', formatter:payStatusFmt},
                    {title: vm.$t("TradingTime"), field: 'submitTime'},
                    {title: vm.$t("OrderStatus"), field: 'orderStatus', formatter: orderStatusFmt},
                    // { title: '接单时间', field: 'receiptTime',undefinedText:'商家尚未接单'},
                    // { title: '支付时间', field: 'payTime',undefinedText:'尚未支付'},
                    {
                        title: vm.$t("Remarks"), field: 'remark',
                        formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 20) {        //备注长度大于20，只展示前20个字符
                                return value.substring(0, 20);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"), formatter: editFormatter, events: editOnEvents
                    }
                ],
                //条件查询
                queryParams: vm.params
            });

            $("#goodsTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#goodsTab").bootstrapTable({
                columns: [
                    {title: vm.$t("ProductName"), field: 'goodsName', formatter: nameFmt, events: operateEvents},
                    {title: vm.$t("place"), field: 'commodityCountry', formatter: function (value, row, index) {
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

                    } , events: operateEvents},
                    {title: vm.$t("FactoryNumber"), field: 'factoryNo', formatter: factoryNoFmt, events: operateEvents},
                    {title: vm.$t("weight"), field: 'goodsCount', formatter: numFmt, events: operateEvents},
                    {title: vm.$t("unit"),field: 'goodsUnit', align: 'center',formatter: function (value, row, index) {
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

            $("#detailGoodsTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#detailGoodsTab").BT({
                columns: [
                    {title: vm.$t("ProductName"), field: 'goodsName',align: 'center', formatter: nameFmt, events: operateEvents},
                    {title: vm.$t("place"), field: 'commodityCountry',align: 'center', formatter: function (value, row, index) {
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

                    } ,  events: operateEvents},
                    {title: vm.$t("ProducerOrNumber"), field: 'factoryNo',align: 'center', formatter: factoryNoFmt, events: operateEvents},
                    {title: vm.$t("weight"), field: 'goodsCount', align: 'center',formatter: numFmt, events: operateEvents},
                    {title: vm.$t("unit"), field: 'goodsUnit', align: 'center',formatter: function (value, row, index) {
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
                    {title: vm.$t("pack"), field: 'commodityPacking', align: 'center',formatter: packingFmt, events: operateEvents}
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
            });

            $("#addressTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#addressTab").BT({
                url: baseURL + "company/receivingaddress/listByUserId",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("title"), field: 'addresshear'},
                    {title: vm.$t("contact"), field: 'consignee'},
                    {title: vm.$t("phone"), field: 'phonenumber'},
                    {title: vm.$t("ReceivingAddress"), field: 'region'},
                    {title: vm.$t("Area"), field: 'detailedaddress'}
                ],
            })


        },
        initAuthorizeGoods: function () {
            //详情页货物列表
            $("#contenTable").bootstrapTable("destroy");
            $("#contenTable").BT({
                height: 150,
                pagination: false,
                columns: [
                    {checkbox: true, valign: 'middle', align: 'center'},
                    {
                        title: vm.$t("product"),
                        valign: 'middle',
                        align: 'center',
                        field: 'remarks',
                        formatter: function (value, row) {
                            var str;
                            var packing = row.commodityPacking == null ? '' : row.commodityPacking;
                            str = '<div class="row">' +
                                '<div class="col-sm-2 text-center" style="margin-top: 10px;">' +
                                '<div>品名:' + row.goodsName + '</div>' +
                                '<div>包装:' + packing + '</div>' +
                                '</div>' +
                                '</div>';
                            return str;
                        }
                    },
                    {title: vm.$t('place'), field: 'commodityCountry', valign: 'middle', align: 'center', width: '10%'},
                    {
                        title: vm.$t('Producer'),
                        field: 'commodityFactoryNumber',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: vm.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row, index) {
                            if (row.priceUnit == 1) {
                                return value + "&nbsp;" + "元/吨";
                            } else if (row.priceUnit == 2) {
                                return value + "&nbsp;" + "元/千克";
                            } else if (row.priceUnit == 3) {
                                return value + "&nbsp;" + "美元/吨";
                            } else if (row.priceUnit == 4) {
                                return value + "&nbsp;" + "美元/千克";
                            }
                        }
                    },
                    {
                        title: vm.$t("Weight"), valign: 'middle', align: 'center', field: 'goodsCount',
                        formatter: function (value, row, index) {
                            if (row.goodsUnit == 1) {
                                return value + "&nbsp;" + "吨";
                            } else if (row.goodsUnit == 2) {
                                return value + "&nbsp;" + "千克";
                            }
                        }
                    },
                    {
                        title: vm.$t("PurchaseQuantitie"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderCount',
                        formatter: function (value, row) {
                            var unit;
                            if (vm.goodsOrder.goodsUnit == 1) {
                                unit = '柜';
                            } else if (vm.goodsOrder.goodsUnit == 2) {
                                unit = '吨';
                            } else if (vm.goodsOrder.goodsUnit == 3) {
                                unit = '千克';
                            }
                            return vm.goodsOrder.orderCount + "&nbsp;" + unit;
                        }
                    },
                    {
                        title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var total;
                            if (vm.goodsOrder.goodsUnit == 1) {
                                total = value * row.goodsCount * vm.goodsOrder.orderCount;
                            } else if (vm.goodsOrder.goodsUnit == 2 || vm.goodsOrder.goodsUnit == 3) {
                                total = value * vm.goodsOrder.orderCount;
                            }
                            if (vm.goodsOrder.currency == 1) {
                                return total + "&nbsp;" + "元";
                            } else if (vm.goodsOrder.currency == 2) {
                                return total + "&nbsp;" + "美元";
                            }
                        }
                    },
                ]
            });
            //详情页货物列表
            $("#contenTable2").bootstrapTable("destroy");
            $("#contenTable2").BT({
                height: 150,
                pagination: false,
                columns: [
                    {checkbox: true, valign: 'middle', align: 'center'},
                    {
                        title: vm.$t("product"),
                        valign: 'middle',
                        align: 'center',
                        field: 'remarks',
                        formatter: function (value, row) {
                            var str;
                            var packing = row.commodityPacking == null ? '' : row.commodityPacking;
                            str = '<div class="row">' +
                                '<div class="col-sm-4 text-center" style="margin-top: 10px;">' +
                                '<div>品名:' + row.goodsName + '</div>' +
                                '<div>包装:' + packing + '</div>' +
                                '</div>' +
                                '</div>';
                            return str;
                        }
                    },
                    {title: vm.$t('place'), field: 'commodityCountry', valign: 'middle', align: 'center', width: '10%'},
                    {
                        title: vm.$t('Producer'),
                        field: 'commodityFactoryNumber',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: vm.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row, index) {
                            if (row.priceUnit == 1) {
                                return value + "&nbsp;" + "元/吨";
                            } else if (row.priceUnit == 2) {
                                return value + "&nbsp;" + "元/千克";
                            } else if (row.priceUnit == 3) {
                                return value + "&nbsp;" + "美元/吨";
                            } else if (row.priceUnit == 4) {
                                return value + "&nbsp;" + "美元/千克";
                            }
                        }
                    },
                    {
                        title: vm.$t("PurchaseQuantitie"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderCount',
                        formatter: function (value, row) {
                            var unit;
                            if (vm.goodsOrder.goodsUnit == 1) {
                                unit = '柜';
                            } else if (vm.goodsOrder.goodsUnit == 2) {
                                unit = '吨';
                            } else if (vm.goodsOrder.goodsUnit == 3) {
                                unit = '千克';
                            }
                            return vm.goodsOrder.orderCount + "&nbsp;" + unit;
                        }
                    },
                    {
                        title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var total;
                            if (vm.goodsOrder.goodsUnit == 1) {
                                total = value * row.goodsCount * vm.goodsOrder.orderCount;
                            } else if (vm.goodsOrder.goodsUnit == 2 || vm.goodsOrder.goodsUnit == 3) {
                                total = value * vm.goodsOrder.orderCount;
                            }
                            if (vm.goodsOrder.currency == 1) {
                                return total + "&nbsp;" + "元";
                            } else if (vm.goodsOrder.currency == 2) {
                                return total + "&nbsp;" + "美元";
                            }
                        }
                    },

                ]
            })
        },
        query: function () {
            //设置查询买入订单
            vm.params.queryType = 2;
            vm.reload();
        },
        accept: function (rowId) {
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.showAccept = true;
            vm.showDetail = false;
            vm.title = "接单";
            vm.agentOrder = {};
            vm.getPlaceData();
            vm.getCommodityWeightUnit();
            setTimeout(function() {vm.getInfo(rowId);},100);

        },
        detail: function (rowId) {
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.showAccept = false;
            vm.showDetail = true;
            vm.title = "订单详情";
            vm.getPlaceData();
            vm.getCommodityWeightUnit();
            vm.getInfo(rowId);
            setTimeout(function() {vm.getInfo(rowId);},100);
        },
        //表单验证
        validate: function () {
            var bl = $('#agentOrder').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        validatePrice: function () {
            var bl = $('#changepriceForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        validate3: function () {
            var bl = $('#refuseForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //拒绝接单
        refuseOrder: function (event) {
            $.ajax({
                type: "POST",
                url: baseURL + "agent/order/refuse",
                contentType: "application/json",
                data: JSON.stringify(vm.agentOrder),
                success: function (r) {
                    if (r.code === 0) {
                        alert('拒单成功', function (index) {
                            $('#refuseModal').modal('hide');
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        saveOrUpdate: function (event) {
            layer.load();
            //代理项目
            if (vm.serviceList.length <= 0) {
                alert("请选择报盘信息");
                layer.closeAll();
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
                    layer.closeAll();
                    return false;
                }
            }

            //是否有来源订单
            if (isBlank(vm.params.originNumber)) {
                vm.agentOrder.originFlag = 0;
            }
            else if (vm.agentOrder.originFlag == 1) {
                let $radio = $("input[name='originPayType']:checked");
                if ($radio.length > 0) {
                    vm.agentOrder.originPayType = $radio.val();
                } else {
                    // alert("请选择是否需要垫付货款");
                    // return false;
                    vm.agentOrder.originPayType = 1;
                }
            }

            //货物信息
            vm.goods = [];
            vm.goods = $("#goodsTab").bootstrapTable('getData');
            var bl = false;
            var alertHeader = '第n行商品信息';
            if (vm.goods.length <= 0) {
                alert("请输入来源单号或自行添加商品信息");
                $("#goodsTab").bootstrapTable('removeAll');
            } else {
                for (var i = 0; i < vm.goods.length; i++) {
                    if (isBlank(vm.goods[i].commodityCountry)) {
                        alert(alertHeader.replace('n', i + 1) + ", 请选择产地信息");
                        break;
                    }
                    else if (isBlank(vm.goods[i].factoryNo)) {
                        alert(alertHeader.replace('n', i + 1) + ", 厂号不可为空");
                        break;
                    }
                    else if (isBlank(vm.goods[i].goodsName)) {
                        alert(alertHeader.replace('n', i + 1) + ", 商品名称不可为空");
                        break;
                    }
                    /*else if (item.goodsName.length > 30 || item.commodityFactoryNumber.length > 30) {
                     alert("长度小于30");
                     } */
                    /* else if (isBlank(vm.goods[i].goodsPrice)) {
                     alert(alertHeader.replace('n', i + 1) + ", 单价不可为空");
                     break;
                     }*/
                    else if (isBlank(vm.goods[i].goodsCount)) {
                        alert(alertHeader.replace('n', i + 1) + ", 重量不可为空");
                        break;
                    } /*else if (isBlank(item.goodsTotalPrice)) {
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

                    if (i == (vm.goods.length - 1)) {
                        bl = true;
                    }
                }

                if (!bl) {
                    layer.closeAll();
                    return;
                }

                vm.agentOrder.goods = vm.goods;

            }

            var url = vm.agentOrder.id == null ? "agent/order/save" : "agent/order/accept";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.agentOrder),
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
        },
        cancel: function (row) {

            var rowId = row.id;
            if (rowId == null) {
                return;
            }

            var flag = 8;
            if (row.orderStatus == '7')
                flag = 4;

            confirm('确定要完结订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/order/cancel",
                    dataType: "json",
                    data: JSON.stringify({id: rowId, flag: flag}),
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
        getInfo: function (rowId) {
            $.get(baseURL + "agent/order/info/" + rowId, function (r) {
                vm.agentOrder = r.data;

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
                                        let cName = $(item).attr('text');
                                        if (obj.busType == cValue || obj.busName == cName) {
                                            $(this).prop('checked', true);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

                if (vm.agentOrder.originNumber != null) {
                    vm.params.originNumber = vm.agentOrder.originNumber;

                    //是否垫付货款
                    if (vm.agentOrder.originFlag == 1) {
                        if (vm.agentOrder.originPayType != null) {
                            let $radiobox = $("input[name='originPayType']");
                            $.each($radiobox, function (idx, item) {
                                if (vm.agentOrder.originPayType == item.value) {
                                    $(this).prop('checked', true);
                                }
                            });
                        }
                    }
                    //设置商品项内容禁用 & 添加货物按钮禁用
                    vm.addTxBtn = true;
                    $("#txtBtn").prop("disabled", true);

                }

                if (vm.agentOrder.totalPrice != null) {
                    parseFloat(vm.agentOrder.totalPrice).toFixed(2);
                }
                if (vm.showAccept == true && vm.showDetail == false) {
                    $("#goodsTab").bootstrapTable('removeAll');
                    $("#goodsTab").bootstrapTable('append', vm.agentOrder.goods);
                    $("#goodsTab").bootstrapTable('load', {
                        rows: vm.agentOrder.goods,
                        total: vm.agentOrder.goods == null ? 0 : vm.agentOrder.goods.length
                    });
                } else if (vm.showDetail && !vm.showAccept) {
                    $("#detailGoodsTab").bootstrapTable('removeAll');
                    $("#detailGoodsTab").bootstrapTable('append', vm.agentOrder.goods);
                    $("#detailGoodsTab").bootstrapTable('load', {
                        rows: vm.agentOrder.goods,
                        total: vm.agentOrder.goods == null ? 0 : vm.agentOrder.goods.length
                    });
                }

                // setTimeout(function () {
                //     $(".selectpicker").select2({
                //         tags: true,
                //         width: "100%",
                //         placeholder: "请选择",
                //     });
                // }, 100)
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.showAccept = false;
            vm.showDetail = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            vm.params.originNumber = "";
            $("#table").BTF5(vm.params);
            // $("form").RF();
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
                Vue.set(vm.agentOrder, 'contactAddress', [data.region, data.detailedaddress].join(", 详细: "));
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
            var data = {};
            vm.getPlaceData();

            if ('orderNum' == type) {
                vm.addTxBtn = true;
                let originNumber = $("#orderNum").val();
                if (originNumber == null || originNumber == '') {
                    alert("请输入正确的订单编号");
                } else {
                    $("#txtBtn").prop("disabled", true);
                    $.get(baseURL + 'agent/order/getListByOrderNumber/' + originNumber, function (res) {
                        if (res.code == 0) {
                            if (res.data.list != null && res.data.list.length > 0) {
                                vm.goods = res.data.list;
                                $('#goodsTab').bootstrapTable('removeAll');
                                $('#goodsTab').bootstrapTable('append', vm.goods);
                                vm.agentOrder.originFlag = res.data.orderType;
                                vm.agentOrder.originNumber = vm.params.originNumber;
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
            }
            else if ('txtBtn' == type) {
                // if( $("#orderNum").prop("disabled")== true){
                //     return;
                // }
                vm.addTxBtn = false;
                $("#orderNum").prop("disabled", true);
                vm.tempdate = {};
                vm.tempdate.goodsCount = null;
                vm.tempdate.goodsCsc = null;
                vm.tempdate.goodsCurrency = null;
                vm.tempdate.goodsImageUrl = null;
                vm.tempdate.goodsName = null;
                vm.tempdate.goodsNumber = null;
                vm.tempdate.goodsPrice = null;
                vm.tempdate.goodsTotalPrice = null;
                vm.tempdate.goodsType = null;
                vm.tempdate.goodsUnit = null;
                vm.tempdate.oldGoodsNumber = null;
                vm.tempdate.orderId = null;
                vm.goods.push(data);
                $('#goodsTab').bootstrapTable('append', data);
            }
        },
        //地址模态框 模糊查询
        addressQuery: function (event) {
            $("#addressTab").BTF5(vm.params);
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
            }
        },
        //获取用户选择的企业的报盘信息列表
        getOfferList: function () {
            $.get(baseURL + 'agent/offer/getCompanyList',
                {
                    id: vm.agentOrder.merchantCompanyId
                }, function (res) {
                    if (res.code == 0) {
                        vm.offerList = res.data;


                        //默认选择报盘
                        if (vm.agentOrder.offerId != null) {

                            vm.$nextTick(function () {
                                $("#sltOffer").val(vm.agentOrder.offerId).trigger("change");
                            });

                            $("#sltCurrency").val(vm.agentOrder.offer.currency).trigger("change");
                        }
                    }
                });
        },
        //获取字典数据 -  货物重量单位
        getCommodityWeightUnit: function () {
           /* $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        vm.unitList = r.data;
                    }
                }
            })*/
            vm.unitList = [
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
                            $(".modal").modal("hide");
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

        ///////////////////////授权订单页面//////////////////////////////////////////
        initAuthorizeTable: function () {
            //初始化首页列表
            $("#authorizetable").bootstrapTable("destroy");
            $("#authorizetable").BT({
                url: baseURL + 'agent/order/getAgentAuthorize',
                columns: [
                    {checkbox: true},
                    {
                        title: vm.$t("OrderNumber"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderNumber',
                        width: '13%'
                    },
                    {
                        title: vm.$t("Buyer"), valign: 'middle', align: 'center', field: 'purchaserCompanyName',
                        // width: '10%',
                        // formatter: function (value, row, index) {
                        //     return '<span title="' + row.purchaserCompanyName + '" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + row.purchaserCompanyName + '</span>';
                        // }
                        formatter: function (value, row, index) {
                            if (row.purchaserCompanyName != null) {
                                return row.purchaserCompanyName.substring(0, 5);
                            }
                        }
                    },
                    {
                        title: vm.$t("Seller"), valign: 'middle', align: 'center',
                        // width: '10%',
                        formatter: function (value, row, index) {
                            if (row.sellerName != null) {
                                return row.sellerName.substring(0, 5);
                            }
                        }
                    },
                    {
                        title: vm.$t("CommodityInformation"),
                        valign: 'middle',
                        align: 'center',
                        field: 'goodsInfo',
                        width: '17%',
                        formatter: function (value, row, index) {
                            var unitP;//单价单位
                            if (row.detail[0].priceUnit == 1) {
                                unitP = '元/吨';
                            } else if (row.detail[0].priceUnit == 2) {
                                unitP = '元/千克';
                            } else if (row.detail[0].priceUnit == 3) {
                                unitP = '美元/吨';
                            } else if (row.detail[0].priceUnit == 4) {
                                unitP = '美元/千克';
                            }
                            var unitC;//重量单位
                            if (row.detail[0].goodsUnit == 1) {
                                unitC = '吨';
                            } else if (row.detail[0].goodsUnit == 2) {
                                unitC = '千克';
                            }
                            var str;
                            if (row.orderGoodsType == 0) {//期货
                                str = '<div class="row" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                                    '<div title="' + row.detail[0].goodsName + '">品名:' + row.detail[0].goodsName.substring(0, 5) + '</div>' +
                                    '<div>单价:' + row.detail[0].goodsPrice + '&nbsp;&nbsp;' + unitP + '</div>' +
                                    '<div>重量:' + row.detail[0].goodsCount + '&nbsp;&nbsp;' + unitC + '</div>' +
                                    '</div>' +
                                    '</div>';
                            } else if (row.orderGoodsType == 1) {//现货
                                str = '<div class="row" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                                    '<div title="' + row.detail[0].goodsName + '">品名:' + row.detail[0].goodsName.substring(0, 5) + '</div>' +
                                    '<div>单价:' + row.detail[0].goodsPrice + '&nbsp;&nbsp;' + unitP + '</div>' +
                                    '</div>' +
                                    '</div>';
                            }
                            return str;
                        }
                    },
                    {
                        title: vm.$t("PurchaseQuantitie"),
                        valign: 'middle',
                        align: 'center',
                        // width: '4%',
                        formatter: function (value, row) {
                            var unit;
                            if (row.goodsUnit == 1) {
                                unit = '柜';
                            } else if (row.goodsUnit == 2) {
                                unit = '吨';
                            } else if (row.goodsUnit == 3) {
                                unit = '千克';
                            }
                            return row.orderCount + unit;
                        }

                    },
                    {
                        title: vm.$t("OrderTotalPrice"),
                        field: 'actualPayment',
                        valign: 'middle',
                        align: 'center',
                        width: '8%',
                        formatter: function (value, row, index) {
                            var str = value == null ? '0' : value;
                            if (row.currency == 1) {
                                return '<span>' + str + '元</span>';
                            } else if (row.currency == 2) {
                                return '<span>' + str + '美元</span>';
                            }
                        }
                    },
                   /* {
                        title: vm.$t("consignee"), valign: 'middle', align: 'center',
                        // width: '6%',
                        formatter: function (value, row, index) {
                            var cinfo = row.cinfo;
                            if (cinfo == null) {
                                return '';
                            }
                            return '<div title="' + row.cinfo.consigneeName + '" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + row.cinfo.consigneeName + '</div>';
                        }
                    },*/
                    {
                        title: vm.$t("TradingTime"), valign: 'middle', align: 'center', field: 'createTime',
                        width: '10%',
                        formatter: function (value, row, index) {
                            return row.createTime;
                        }
                    },
                    {
                        title: vm.$t("OrderStatus"),
                        valign: 'middle',
                        align: 'center',
                        // width: '8%',
                        formatter: function (value, row, index) {
                            /*if(row.isAgent == 1){
                             status = '代理';
                             }else{*/
                            var status = vm.orderStatus[row.orderStatus];
                            if ('cto' == row.orderStatus) {
                                if (row.statusOwner == 0) {
                                    status = '买家取消订单';
                                }
                                if (row.statusOwner == 1) {
                                    status = '卖家取消订单';
                                }
                            } else if ('ctom' == row.orderStatus) {
                                status = '待卖家确认取消';
                            } else if ('ctob' == row.orderStatus) {
                                status = '待买家取消';
                            }
                            // }
                            return '<div>' +
                                '<div><span>' + status + '</span></div>'
                        }
                    },
                    {
                        title: vm.$t("Remarks"), valign: 'middle', align: 'center', field: 'remarks',
                        formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {        //备注长度大于5，只展示前5个字符
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderId',
                        width: '25%',
                        formatter: function (value, row, index) {
                            var div = document.createElement('div');
                            var getInfo = document.createElement('button');
                            getInfo.setAttribute('class', 'btn btn-primary btn-sm getInfo');
                            getInfo.setAttribute('style', 'margin-left:5px');
                            getInfo.innerText = '查看详情';

                            var payment = document.createElement('button');
                            payment.setAttribute('class', 'btn btn-primary btn-sm payment');
                            payment.setAttribute('style', 'margin-left:5px');
                            payment.innerText = '立即付款';
                            var showShip = document.createElement('button');
                            showShip.setAttribute('class', 'btn btn-primary btn-sm showShip');
                            showShip.setAttribute('style', 'margin-left:5px');
                            showShip.innerText = "查看物流";
                            var ship = document.createElement('button');
                            ship.setAttribute('class', 'btn btn-primary btn-sm ship');
                            ship.setAttribute('style', 'margin-left:5px');
                            ship.innerText = "确认提货";
                            var receipt = document.createElement('button');
                            receipt.setAttribute('class', 'btn btn-primary btn-sm receipt');
                            receipt.setAttribute('style', 'margin-left:5px');
                            receipt.innerText = "确认收货";
                            var update = document.createElement('button');
                            update.setAttribute('class', 'fa fa-pencil-square-o');
                            update.setAttribute('class', 'btn btn-primary btn-sm update');
                            update.setAttribute('style', 'margin-left:5px');
                            update.innerHTML = '修改';
                            var pre = document.createElement('button');
                            pre.setAttribute('class', 'btn btn-primary btn-sm pre');
                            pre.setAttribute('style', 'margin-left:5px');
                            pre.innerText = '审核';
                            var getPre = document.createElement('button');
                            getPre.setAttribute('class', 'btn btn-primary btn-sm getPre');
                            getPre.setAttribute('style', 'margin-left:5px');
                            getPre.innerText = '查看审核';
                            switch (row.orderStatus) {
                                case 'agr':
                                    div.appendChild(getInfo);
                                    break;
                                case  'tc':
                                    div.appendChild(getInfo);
                                    break;
                                case 'ctom':
                                    div.appendChild(getInfo);
                                    break;
                                case 'cto' :
                                    div.appendChild(getInfo);
                                    break;
                                case 'tbp':
                                    div.appendChild(getInfo);
                                    if (row.isPayment == 1) {
                                        div.appendChild(payment);
                                    }
                                    break;
                                default:
                                    div.appendChild(getInfo);
                                    break;
                            }
                            return div.innerHTML;
                        },
                        events: {
                            //查看详情
                            'click .getInfo': function (event, value, row, index) {
                                vm.getAuthorizeInfo(row.orderId);
                            },
                            'click .showShip': function (el, value, row, index) {

                                vm.toShow = true;
                                vm.getAuthorizeInfo(row.orderId);
                            },
                            //付款
                            'click .payment': function (el, value, row, index) {
                                if (row.distributionMode == 0) {
                                    row.orderStatus = 'tbd';
                                } else {
                                    row.orderStatus = 'tbpu';
                                }
                                /* vm.goodsOrder.orderNumber = row.orderNumber;
                                 vm.goodsOrder.depot = row.depot;
                                 vm.goodsOrder.detail = row.detail;
                                 row.statusOwner = 1;
                                 vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));*/
                                window.location.href = '/modules/bill/bill_payable.html?orderNo=' + row.orderNumber;
                            },
                            //收货
                            'click .receipt': function (el, value, row, index) {
                                row.orderStatus = 'tc';
                                row.statusOwner = 2;
                                vm.goodsOrder.depot = row.depot;
                                vm.goodsOrder.detail = row.detail;
                                vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));
                            },
                            //提货
                            'click .ship': function (el, value, row, index) {
                                row.orderStatus = 'tc';
                                row.statusOwner = 2;
                                vm.goodsOrder.depot = row.depot;
                                vm.goodsOrder.detail = row.detail;
                                vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));
                            },
                            //修改
                            'click .update': function (el, value, row, index) {
                                vm.companySelectId = row.sellerId;
                                vm.update(row.orderId);
                            },
                            //平台审核
                            'click .pre': function (el, value, row, index) {
                                vm.goodsorderpre.orderId = row.orderNumber;
                                $("#preModal").modal('show');
                            },
                            //审核失败以后可以查看审核信息
                            'click .getPre': function (el, value, row, index) {
                                vm.goodsorderpre.orderId = row.orderNumber;
                                vm.getPre(row.orderNumber);
                                $("#preModal").modal('show');
                            }
                        }
                    },
                ],
                //条件查询
                queryParams: vm.params,
                onLoadSuccess: function () {
                    setTimeout(function () {
                        $('#authorizetable').bootstrapTable('resetView');
                    }, 0)
                }
            });
            //初始化货物列表
            $("#contenTable").bootstrapTable("destroy");
            $("#contenTable").BT({
                height: 400,
                pagination: false,
                columns: [
                    {checkbox: true, valign: 'middle', align: 'center'},
                    {
                        title: vm.$t("product"),
                        valign: 'middle',
                        align: 'center',
                        field: 'remarks',
                        formatter: function (value, row) {
                            var str;
                            str = '<div style="width: 100%">' +
                                /*'<div class="col-sm-12 text-center">' +*/
                                '<img class="thumbnail col-sm-1 col-md-offset-5" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +
                                '<div class="col-sm-2 text-center" style="margin-top: 10px;">' +
                                '<div>名称:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '</div>' +
                                '</div>';
                            return str;
                        }, width: '40%'
                    },
                    {title: vm.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsTotalPrice', width: '20%'},
                    {title: vm.$t("num"), valign: 'middle', align: 'center', field: 'goodsCount'},
                    {
                        title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var goodsPrice = row.goodsCount * row.goodsTotalPrice;
                            return goodsPrice;
                        }, width: '20%'
                    },
                ]
            })
            //初始化添加以后的货物列表
            $("#addTable").bootstrapTable("destroy");
            $("#addTable").BT({
                data: vm.addGoods,
                uniqueId: 'id',
                columns: [
                    {
                        title: vm.$t("product"),
                        field: 'remarks',
                        valign: 'middle',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var img = '';
                            var images = row.images;
                            if (vm.goodsOrder.orderId != null) {
                                img = row.goodsImageUrl
                            } else {
                                if (images != null && images.length > 0) {
                                    img = images[0].picUrl;
                                }
                            }

                            return '<div class="row">' +
                                '<div class="col-sm-6">' +
                                '<img src=' + img + ' width="100px">' +
                                '</div>' +
                                '<div class="col-sm-6">' +
                                '<div>商品名称:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    },
                    {
                        title: vm.$t("UnitPrice"),
                        valign: 'middle',
                        align: 'center',
                        field: 'goodsPromotionPrice',
                        formatter: function (value, row, index) {
                            if (row.goodsPromotionPrice == null || row.goodsPromotionPrice == '') {
                                return row.goodsPrice;
                            } else {
                                return row.goodsPromotionPrice;
                            }
                        }
                    },
                    {
                        title: vm.$t("weight"), valign: 'middle', align: 'center', field: 'goodsCount',
                        editable: {
                            type: 'text',
                            width: '10%',
                            title: vm.$t('InputNumber'),
                            emptytext: vm.$t('InputNumber'),
                            defaultValue: 1,
                            validate: function (v) {
                                if (!v) return vm.$t('InputNumber');
                                if (isNaN(v)) return '请输入正确的数量';
                                if (parseInt(v) < 0) return '数量必须大于0';
                                if (parseInt(v) > vm.maxSellNum) return '数量不能大于' + vm.maxSellNum;
                                vm.goodsOrder.goodsCount = v;

                            },
                        },
                        onEditableSave: function () {
                            console.log("1onEditableSave")
                        }
                    },
                    {
                        title: vm.$t("TotalPrice"),
                        valign: 'middle',
                        align: 'center',
                        field: 'totalPrice',
                        formatter: function (value, row, index) {
                            if (row.totalPrice == null || row.totalPrice == '') {
                                return row.goodsTotalPrice;
                            } else {
                                return row.totalPrice;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"),
                        valign: 'middle',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var div = document.createElement('div');
                            var a = document.createElement('a');
                            a.setAttribute('class', 'btn btn-primary btn-sm delete');
                            a.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>删除'
                            div.append(a);
                            if (vm.addButtonShow) {
                                return div.innerHTML;
                            } else {
                                return '';
                            }

                        },
                        events: {
                            'click .delete': function (el, value, row, index) {
                                if (row.oldGoodsNumber != null) {
                                    vm.addids.remove(row.oldGoodsNumber)
                                } else {
                                    vm.addids.remove(row.goodsNumber)
                                }
                                $('#addTable').bootstrapTable('removeByUniqueId', row.id)
                            }
                        }
                    },
                ],
                onEditableSave: function (field, row, oldValue, $el) {
                    if (field == 'goodsCount') {
                        row.totalPrice = row.goodsCount * row.goodsPromotionPrice;
                        var index = $el.parent().parents('tr').data('index');
                        $("#addTable").bootstrapTable('updateRow', index, row)
                    }
                }
            }),
                //售后列表
                $("#goodsInfo").bootstrapTable("destroy");
            $("#goodsInfo").BT({
                height: 150,
                columns: [
                    {checkbox: true},
                    {
                        field: 'rowId', title: '序号', align: 'center',
                        formatter: function (value, row, index) {
                            row.rowId = index;
                            return index + 1;
                        }
                    },
                    {title: vm.$t("productName"), field: 'goodsName'},
                    {title: vm.$t("UnitPrice"), field: 'unitPrice'},
                    {title: vm.$t("num"), field: 'number'},
                    {title: vm.$t("TotalPrice"), field: 'totalPrice'},
                    {
                        title: vm.$t("OperationNumber"), field: 'count',
                        editable: {
                            type: 'text',
                            width: '10%',
                            title: '操作数量',
                            emptytext: '操作数量',
                            defaultValue: '1',
                            validate: function (v) {
                                if (!v) return '请输入要操作的数量';
                                var reg = /^[1-9]\d{0,9}$/;
                                if (!reg.test(v)) return '请输入小于11位的正整数';
                            },
                        },
                    }
                ], onEditableSave: function (field, row, oldValue, $el) {
                    if (field == 'count') {
                        vm.afterSaleTotal = row.count;
                        console.log(vm.afterSaleTotal);
                        if (row.number < row.count) {
                            if (oldValue != null) {
                                if (oldValue <= row.number) {
                                    row.count = oldValue;
                                } else {
                                    row.count = 1;
                                }
                                $("#goodsInfo").bootstrapTable('updateRow', {index: row.rowId, row: row})
                            } else {
                                alert("操作数量不可以超过订单购买数量");
                                row.count = 1;
                                $("#goodsInfo").bootstrapTable('updateRow', {index: row.rowId, row: row})
                                return;
                            }
                        }
                    }
                }
            });
            //初始化货物添加列表
            $("#addGoodTable").bootstrapTable("destroy")
            $("#addGoodTable").BT({
                url: baseURL + 'offer/goodsoffer/list',
                columns: vm.getAddTableColumns(),
                queryParams: vm.showGoodParams
            })
            //初始化商品列表
            $("#commondityTable").bootstrapTable("destroy")
            $('#commondityTable').BT({
                columns: [
                    {title: vm.$t("name"), field: 'commodityName'},
                    {title: vm.$t("price"), field: 'commodityPrice'},
                    {title: vm.$t("place"), field: 'commodityCountryName'},
                    {title: vm.$t("FactoryNumber"), field: 'commodityFactoryNumber'},
                    {title: vm.$t("num"), field: 'commodityCount'},
                    {title: vm.$t("pack"), field: 'commodityPacking'},
                ],
            })
            //收货地址
            $("#addressTab").bootstrapTable("destroy");
            $("#addressTab").BT({
                url: baseURL + "company/receivingaddress/listByUserId",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("title"), field: 'addresshear'},
                    {title: vm.$t("contact"), field: 'consignee'},
                    {title: vm.$t("phone"), field: 'phonenumber'},
                    {title: vm.$t("ReceivingAddress"), field: 'region'},
                    {title: vm.$t("Area"), field: 'detailedaddress'}
                ],
            });
        }, getAddTableColumns: function () { //货物添加货物列表的列配置
            var columns = [
                {checkbox: true},
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
                {title: vm.$t('num'), field: 'goodsCount'},
                /* {
                 title: vm.$t('deliveryAddress'), formatter: function (value, row, index) {
                 return row.goodsPodProvince + row.goodsPodCity;
                 }
                 },*/
            ]
            if (vm.goodsOrder.orderGoodsType == 1) {
                columns.push({title: vm.$t('warehouseName'), field: 'goodsSname'});
                columns.push({
                    title: vm.$t('deliveryAddress'), formatter: function (value, row, index) {
                        return row.goodsPodProvince + row.goodsPodCity;
                    }
                });
            } else {
                columns.push({title: vm.$t('Schedule'), field: 'goodsSailingTime'});
                columns.push({
                    title: vm.$t('cabinet'), field: 'goodsCsc', formatter: function (value, row, index) {
                        if (value == 0) {
                            return "不可拼柜"
                        } else {
                            return "可拼柜"
                        }
                    }
                });
            }
            return columns;
        },

        imgExists: function (e) {
            //默认图片
            var $e = $(e);
            var imgUrl = $e.attr('load-src');
            var flag = window.validateImage(imgUrl);
            if (flag) {
                e.src = imgUrl;
                return;
            }
            var errrorUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537520261126&di=46f08158404f99cabbc5f31dee5f30aa&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016fde5687ebb76ac7251bb6439d05.png%402o.jpg";
            flag = window.validateImage(errrorUrl);
            if (flag) {
                e.src = errrorUrl;
                return;
            }
            e.src = '';
        },

        //获取详情
        getAuthorizeInfo: function (orderId) {
            vm.showList = false;
            vm.goodsOrder = {};
            vm.address = {};
            vm.addids = [];
            vm.initAuthorizeGoods();
            $.ajaxSettings.async = false;
            $.get(baseURL + "order/goodsorder/info/" + orderId, function (r) {
                var status = r.goodsOrder.orderStatus;
                if (status == 'tc') {
                    vm.aftersaleShow = true;
                }
                if (status == 'tbc') {//投诉按钮
                    vm.complaintShow = false;
                }
                vm.toShow = false;
                //物流信息
                if (status == 's' || status == 'pr') {
                    vm.toShow = true;
                }
                var ship = r.goodsOrder.ship;
                if (ship != null) {
                    vm.kdnData.expCode = ship.logisticsCode;
                    vm.kdnData.expNo = ship.singleNumber;
                    KDNWidget.run(vm.kdnData)
                }

                vm.authorizeDetail = true;
                vm.authorizePage = false;

                vm.goodsOrder = r.goodsOrder;

                if (vm.goodsOrder.cinfo != null) {
                    vm.address = vm.goodsOrder.cinfo;
                }
                var detail = [];
                detail = detail.concat(r.goodsOrder.detail);
                //订单详情中的分页中的条数
                $("#contenTable").bootstrapTable('load', {
                    rows: detail,
                    total: detail == null ? 0 : detail.length
                });
                $("#contenTable2").bootstrapTable('load', {
                    rows: detail,
                    total: detail == null ? 0 : detail.length
                });


                if (vm.goodsOrder.priceVersion != null && vm.goodsOrder.priceVersion != "") {
                    vm.priceVersionShow = true;
                    var list = "<div>";
                    for (var i = 0; i < vm.goodsOrder.priceVersion.length; i++) {
                        list += "<div>";
                        list += "<label>原总价：</label><span>" + vm.goodsOrder.priceVersion[i].originalTotalPrice + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<label>现总价：</label><span>" + vm.goodsOrder.priceVersion[i].laterTotalPrice + "</span>&nbsp;&nbsp;&nbsp;&nbsp;";
                        // list += "<label>原运费：</label><span>" + vm.goodsOrder.priceVersion[i].originalCarriage + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<label>现运费：</label><span>" + vm.goodsOrder.priceVersion[i].laterCarriage + "</span>&nbsp;&nbsp;&nbsp;&nbsp;";
                        list += "<label>修改时间：</label>" + vm.goodsOrder.priceVersion[i].createTime;
                        list += '</div>';
                    }
                    list += '</div>';
                    $("#priceVersion").append(list);
                } else {
                    vm.priceVersionShow = false;
                }
                //修改页
                if (!isBlank(vm.goodsOrder.time)) {
                    var count = vm.goodsOrder.orderCount;//orderCount莫名丢失
                    var currency = vm.goodsOrder.currency;
                    vm.$nextTick(function () {
                        vm.goodsOrder.orderCount = count;
                        vm.goodsOrder.currency = currency;
                        vm.offer = {
                            time: vm.goodsOrder.time,
                            place: vm.goodsOrder.place,
                            productionDate: vm.goodsOrder.productionDate,
                            shelfLife: vm.goodsOrder.shelfLife,
                            clause: vm.goodsOrder.clause,
                            transactionManner: vm.goodsOrder.transactionManner,
                            paymentTerm: vm.goodsOrder.paymentTerm,
                            goodsUnit: vm.goodsOrder.goodsUnit
                        };
                    });
                    vm.maxSellNum = vm.goodsOrder.maxSellNum;//报盘库存
                }
            });
            $.ajaxSettings.async = true;
        }
        ,
        //获取订单状态的中文
        getOrderStatus: function () {
            return this.orderStatus[this.goodsOrder.orderStatus];
        },

        //支付方式余额支付和银联支付线下转账
        getPaymentMethod: function () {
            return this.paymentMethods[this.goodsOrder.paymentMethod];
        },
        //付款方式，一次性付清
        getTransactionMode: function () {
            return this.transactionModes[this.goodsOrder.transactionMode];
        },
        // 授权代理订单详情返回
        returnAuthorize: function () {
            vm.authorizeDetail = false;
            vm.authorizePage = true;
        }, //修改订单状态
        updateStatus: function (orderId, orderStatus, statusOwner, statusCount) {
            layer.load();
            var data = {
                orderId: orderId,
                orderStatus: orderStatus,
                statusOwner: statusOwner,
                statusCount: statusCount,
                orderNumber: vm.goodsOrder.orderNumber,
                depot: vm.goodsOrder.depot,
                detail: vm.goodsOrder.detail
            };
            var url = "order/goodsorder/info/" + orderId;
            var returnStatusCount;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                async: false,
                success: function (r) {
                    returnStatusCount = r.goodsOrder.statusCount;
                }
            });
            url = "order/goodsorder/updateStatus";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(data),
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
        }, queryAuthorizes: function () {
            vm.params.orderStatus = vm.params.orderStatus;
            $("#authorizetable").BTF5(vm.params);
        }

        /////////////////////////////////////////////////////////////////
    },

    watch: {
        "$i18n.locale": function (value) {
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
    Vue.set(vm.agentOrder, 'totalPrice', (parseFloat(data.price) * parseFloat(1)).toFixed(3))
    vm.serviceList = data.business;
    $("#sltCurrency").val(vm.agentOrder.currency).trigger("change");
});
