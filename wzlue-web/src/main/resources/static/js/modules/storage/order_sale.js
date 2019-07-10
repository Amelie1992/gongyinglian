$(function () {
    vm.initTable();
    //表单提交
    $("#receiptForm").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });
    $("#arrivalForm").FM({
        fields: vm.fields2,
        success: vm.saveOrUpdate2
    });
    $("#refuseForm").FM({
        fields: vm.fields3,
        success: vm.refuseOrder
    });
    //模态框隐藏时，清空验证和数据，以及重置表单
    //$('#receiptForm').bootstrapValidator('resetForm', false) 只清空验证
    $('#receiptModal').on('hide.bs.modal', function () {
        $('#receiptForm').bootstrapValidator('resetForm', true);
        $('#receiptForm')[0].reset();
    });
    $('#refuseModal').on('hide.bs.modal', function () {
        $('#refuseForm').bootstrapValidator('resetForm', true);
        $('#refuseForm')[0].reset();
    })
});

//拒绝接单
function refuse(id) {
    if (!isBlank(id)) {
        vm.order.id = id;
        vm.order.passStatus = 3;
        vm.order.remarks = '';
        $('#refuseModal').modal('show');
    }
}

//取消订单
function cancel(id, passStatus) {
    vm.cancelOrder(id, passStatus);
}

//查看详情
function detail(id) {
    vm.showList = false;
    vm.show1 = true;
    vm.show2 = false;
    vm.afterSDetail = false;
    vm.orderDetail(id);
}

//接单
function receipt(id) {
    if (id != '' && id != null) {
        //其他费用收费规则默认为0
        vm.receiptOrder = {
            money1: "0",
            money2: "0",
            money3: "0",
            money4: "0",
            money5: "0",
            money6: "0",
            money7: "0",
            // money8: "0",
            money9: "0",
            // money10: "0",
            // money11: "0",
            // money12: "0",
            money13: "0",
            money14: "0",
            money15: "0"
        };
        vm.offer = {};
        vm.offerDetail(id);
        vm.receiptOrder.unit = vm.offer.unit;
        vm.receiptOrder.price = vm.offer.price;
        if (vm.receiptOrder.unit == 1) {
            vm.receiptOrder.unitName = '元/吨/天';
        } else if (vm.receiptOrder.unit == 2) {
            vm.receiptOrder.unitName = '元/千克/天';
        }
        vm.receiptOrder.id = id;
        vm.receiptOrder.passStatus = 1;
        $('#receiptModal').modal('show');
    }
}

//确认到货
function arrival(id, orderNumber, passStatus) {
    vm.showList = false;
    vm.show1 = false;
    vm.show2 = true;
    vm.afterSDetail = false;
    vm.order.id = id;
    vm.offer = {};
    // vm.orderCost = {};
    // vm.orderCost.orderId = id;
    // vm.orderCost.orderNumber = orderNumber;
    vm.commodityEntityList = [];
    // if (passStatus == 2) {
    //     vm.getCostInfo(id);
    // }
    // vm.getListByOrderId(id);
    vm.orderDetail(id);
    vm.commodityEntityList.forEach(function (item) {
        if (vm.offer.unit == '元/吨/天') {
            // item.merchantUnit = 1;
            item.unit = 1;
        } else if (vm.offer.unit == '元/千克/天') {
            // item.merchantUnit = 2;
            item.unit = 2;
        }
    });
}


//投诉
function complaint(orderNumber) {
    vm.addComplaint(orderNumber);
}

//查看投诉
function compDeatil(orderNumber) {
    vm.complaintDeatil(orderNumber);
}

//售后处理
function handleAft(orderNumber) {
    vm.handleAfterSale(orderNumber);
}

//售后查看
function aftDeatil(orderNumber) {
    vm.afterSaleDeatil(orderNumber);
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        afterSDetail: false,
        show1: false,
        show2: false,
        unitList: [{code: 1, name: '吨'}, {code: 2, name: '千克'}],
        unitList2: [{code: 1, name: '元/吨/天'}, {code: 2, name: '元/千克/天'}],
        unitList3: [{code: 0, name: '吨'}, {code: 1, name: '托'}],
        complaint: {},
        images: [],
        afterSale: {},
        showList: true,
        title: null,
        order: {},
        receiptOrder: {},
        params: {
            orderNumber: '',
            passStatus: '',
        },
        passStatusList: ['待确认', '已接单', '已入库', '已取消', '买家结束订单', '卖家结束订单', '已出库', '交易完成'],
        resultList: ['通过', '不通过'],
//验证字段
        fields: {
            total: {
                message: '总价验证失败',
                validators: {
                    notEmpty: {
                        message: '总价不能为空'
                    },
                },
            }, merchantContact: {
                message: '联系人（卖家）验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人（卖家）不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '联系人长度小于20'
                    },
                },
            }, merchantPhone: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '联系方式不能为空'
                    },
                    //正则校验  ^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
                    regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '电话号码不正确'
                    }
                },
            }, merchantEmail: {
                message: '邮箱账号验证失败',
                validators: {
                    notEmpty: {
                        message: '邮箱账号不能为空'
                    }, stringLength: {
                    max: 20,
                    message: '长度小于20'
                }, //正则校验
                    regexp: {
                        //^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
                        regexp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z_-]{2,5})$/,
                        message: '邮箱账号不正确'
                    }
                },
            }, merchantAddress: {
                message: '地址验证失败',
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        max: 30,
                        message: '地址长度小于30'
                    },
                },
            }, unit: {
                message: '仓库收费单位验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库收费单位不能为空'
                    }
                },
            },
            /*price: {
                message: '仓储费验证失败',
                validators: {
                    notEmpty: {
                        message: '仓储费不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '仓储费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money1: {
                message: '装卸费验证失败',
                validators: {
                    notEmpty: {
                        message: '装卸费不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '装卸费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money2: {
                message: '处置费验证失败',
                validators: {
                    notEmpty: {
                        message: '处置费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '处置费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money3: {
                message: '重复上下架验证失败',
                validators: {
                    notEmpty: {
                        message: '重复上下架不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '重复上下架费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money4: {
                message: '分拣费验证失败',
                validators: {
                    notEmpty: {
                        message: '分拣费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '分拣费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money5: {
                message: '理货费验证失败',
                validators: {
                    notEmpty: {
                        message: '理货费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '理货费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money6: {
                message: '抄码费验证失败',
                validators: {
                    notEmpty: {
                        message: '抄码费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '抄码费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money7: {
                message: '复冻费验证失败',
                validators: {
                    notEmpty: {
                        message: '复冻费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '复冻费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money8: {
                message: '查验移箱费验证失败',
                validators: {
                    notEmpty: {
                        message: '查验移箱费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '查验移箱费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money9: {
                message: '查验掏箱费验证失败',
                validators: {
                    notEmpty: {
                        message: '查验掏箱费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '查验掏箱费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money10: {
                message: '查验开关箱门费及铅封验证失败',
                validators: {
                    notEmpty: {
                        message: '查验开关箱门费及铅封不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '查验开关箱门费及铅封费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money11: {
                message: '门到门查验费验证失败',
                validators: {
                    notEmpty: {
                        message: '门到门查验费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '门到门查验费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money12: {
                message: '出入库费验证失败',
                validators: {
                    notEmpty: {
                        message: '出入库费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '出入库费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money13: {
                message: '缠绕膜验证失败',
                validators: {
                    notEmpty: {
                        message: '缠绕膜不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '缠绕膜费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money14: {
                message: '箱车对倒验证失败',
                validators: {
                    notEmpty: {
                        message: '箱车对倒不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '箱车对倒费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }, money15: {
                message: '预冷费验证失败',
                validators: {
                    notEmpty: {
                        message: '预冷费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '预冷费是整数位小于12位，小数位小于2位数的数字'
                    }
                },
            }*/

        },
        fields2: {
            orderId: {
                message: '订单id验证失败',
                validators: {
                    notEmpty: {
                        message: '订单id不能为空'
                    },
                },
            }, money1: {
                message: '装卸费验证失败',
                validators: {
                    notEmpty: {
                        message: '装卸费不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '装卸费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money2: {
                message: '处置费验证失败',
                validators: {
                    notEmpty: {
                        message: '处置费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '处置费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money3: {
                message: '重复上下架验证失败',
                validators: {
                    notEmpty: {
                        message: '重复上下架不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '重复上下架费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money4: {
                message: '分拣费验证失败',
                validators: {
                    notEmpty: {
                        message: '分拣费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '分拣费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money5: {
                message: '理货费验证失败',
                validators: {
                    notEmpty: {
                        message: '理货费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '理货费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money6: {
                message: '抄码费验证失败',
                validators: {
                    notEmpty: {
                        message: '抄码费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '抄码费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money7: {
                message: '复冻费验证失败',
                validators: {
                    notEmpty: {
                        message: '复冻费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '复冻费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money8: {
                message: '查验移箱费验证失败',
                validators: {
                    notEmpty: {
                        message: '查验移箱费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '查验移箱费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money9: {
                message: '查验掏箱费验证失败',
                validators: {
                    notEmpty: {
                        message: '查验掏箱费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '查验掏箱费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money10: {
                message: '查验开关箱门费及铅封验证失败',
                validators: {
                    notEmpty: {
                        message: '查验开关箱门费及铅封不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '查验开关箱门费及铅封费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money11: {
                message: '门到门查验费验证失败',
                validators: {
                    notEmpty: {
                        message: '门到门查验费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '门到门查验费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money12: {
                message: '出入库费验证失败',
                validators: {
                    notEmpty: {
                        message: '出入库费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '出入库费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money13: {
                message: '缠绕膜验证失败',
                validators: {
                    notEmpty: {
                        message: '缠绕膜不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '缠绕膜费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money14: {
                message: '箱车对倒验证失败',
                validators: {
                    notEmpty: {
                        message: '箱车对倒不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '箱车对倒费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }, money15: {
                message: '预冷费验证失败',
                validators: {
                    notEmpty: {
                        message: '预冷费不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '预冷费是整数位小于9位，小数位小于2位数的数字'
                    }
                },
            }
        },
        fields3: {
            remarks: {
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
        orderCost: {},
        offer: {},
        orderCost2: {},
        commodityEntityList: [],
        //退款方式
        afterImages: [],
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


    },
    methods: {

        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            //列表
            $("#table").BT({
                url: baseURL + 'storage/order/list2',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {title: vm.$t("NameOfBuyerCompany"), field: 'buyCompanyName'},
                    {title: vm.$t("ContactBuyer"), field: 'contact'},
                    {title: vm.$t("BuyerContact"), field: 'phone'},
                    // {title: vm.$t("TotalPrice")+"/"+vm.$t("Yuan"), field: 'total'},
                    {title: vm.$t("NameOfSellerCompany"), field: 'saleCompanyName'},
                    {title: vm.$t("ContactSeller"), field: 'merchantContact'},
                    {title: vm.$t("SellerContactMode"), field: 'merchantPhone'},
                    // {title: vm.$t("SingleTime"), field: 'receiptTime'},
                    {title: vm.$t("TradingTime"), field: 'createdTime'},
                    {
                        title: vm.$t("OrderStatus"), formatter: function (value, row, index) {
                            var ss = '';
                            if (row.passStatus == 0) {
                                ss += '待确认';
                            } else if (row.passStatus == 1) {
                                ss += '已接单';
                            } else if (row.passStatus == 2) {
                                ss += '已入库';
                            } else if (row.passStatus == 3) {
                                ss += '已取消';
                            } else if (row.passStatus == 4) {
                                ss += '买家结束订单';
                            } else if (row.passStatus == 5) {
                                ss += '卖家结束订单';
                            } else if (row.passStatus == 6) {
                                ss += '已出库';
                            } else if (row.passStatus == 7) {
                                ss += '交易完成';
                            }
                            return ss;
                        }
                    },
                    {
                        title: vm.$t("Remarks"), field: 'remarks', formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {        //备注长度大于5，只展示前5个字符
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"), formatter: function (value, row, index) {
                            var ss = '';
                            //  0:待确认、1:已接单、2：已入库，3：已取消/已结束、4：买家结束订单、5：卖家结束订单、6:已出库、7：交易完成、
                            if (row.passStatus == 0) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="receipt(' + row.id + ')">接单</button>&nbsp;';
                                ss += '<button class="btn btn-primary btn-sm" onclick="refuse(' + row.id + ')">拒绝接单</button>&nbsp;';
                                // ss+='<button class="btn btn-primary btn-sm" onclick="cancel('+row.id+')">取消订单</button>&nbsp;';
                            } else if (row.passStatus == 1) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.passStatus + '\')">结束订单</button>&nbsp;';
                                ss += '<button class="btn btn-primary btn-sm" onclick="arrival(' + row.id + ',\'' + row.orderNumber + '\',' + row.passStatus + ')">确认到货</button>&nbsp;';
                            } else if (row.passStatus == 2) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.passStatus + '\')">结束订单</button>&nbsp;';

                                /*ss+='<button class="btn btn-primary btn-sm" onclick="arrival('+row.id+',\''+row.orderNumber+'\','+row.passStatus+')">修改</button>&nbsp;';*/
                                // if(row.alterSale==1){
                                //     ss+='<button class="btn btn-primary btn-sm" onclick="handleAft(\''+row.orderNumber+'\')">售后处理</button>&nbsp;';
                                //     ss+='<button class="btn btn-primary btn-sm" onclick="aftDeatil(\''+row.orderNumber+'\')">售后查看</button>&nbsp;';
                                // }
                                // if(row.alterSale==2){
                                //     ss+='<button class="btn btn-primary btn-sm" onclick="aftDeatil(\''+row.orderNumber+'\')">售后查看</button>&nbsp;';
                                // }
                            }
                            // if(row.sellStatus==0){
                            //     ss+='<button class="btn btn-primary btn-sm" onclick="complaint(\''+row.orderNumber+'\')">投诉</button>&nbsp;';
                            // }
                            // if(row.sellStatus==1){
                            //     ss+='<button class="btn btn-primary btn-sm" onclick="compDeatil(\''+row.orderNumber+'\')">查看投诉</button>&nbsp;';
                            // }
                            if (row.passStatus == 4) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.passStatus + '\')">确认结束</button>&nbsp;';
                            }
                            if (row.passStatus == 6) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.passStatus + '\')">结束订单</button>&nbsp;';
                            }
                            ss += '<button class="btn btn-primary btn-sm" onclick="detail(' + row.id + ')">查看详情</button>';
                            return ss;
                        }
                    }
                ],
                //条件查询
                queryParams: vm.params

            });
        },

        getCostInfo: function (id) {
            $.get(baseURL + "storage/ordercost/info/" + id, function (r) {
                vm.orderCost = r.orderCost;
            });
        },
        getListByOrderId: function (id) {
            $.get(baseURL + "storage/ordercommodity/getListByOrderId", {id: id}, function (r) {
                vm.commodityEntityList = r.commodityEntityList;
            });
        },
        query: function () {
            vm.reload()
        },
        add: function () {
            vm.showList = false;
            vm.afterSDetail = false;
            vm.title = "新增";
            vm.order = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.afterSDetail = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        //表单验证
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
                url: baseURL + "storage/order/update",
                contentType: "application/json",
                data: JSON.stringify(vm.order),
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

        validate: function () {
            var bl = $('#receiptForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },

        //添加其他费用
        addMoney16: function (event) {

        },

        saveOrUpdate: function (event) {
            console.log("vm.receiptOrder.money1" + vm.receiptOrder.money1);
            console.log(isBlank(vm.receiptOrder.money1));
            if (isBlank(vm.receiptOrder.money1) || isBlank(vm.receiptOrder.money2) || isBlank(vm.receiptOrder.money3) ||
                isBlank(vm.receiptOrder.money4) || isBlank(vm.receiptOrder.money5) || isBlank(vm.receiptOrder.money6) ||
                isBlank(vm.receiptOrder.money7) || isBlank(vm.receiptOrder.money9) || isBlank(vm.receiptOrder.money13) ||
                isBlank(vm.receiptOrder.money14) || isBlank(vm.receiptOrder.money15)) {
                alert("请填写仓储订单其他费用收费规则");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money1)) {
                alert("装卸费的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money2)) {
                alert("处置费的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money3)) {
                alert("重复上下架的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money4)) {
                alert("分拣费的为整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money5)) {
                alert("理货费的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money6)) {
                alert("抄码费的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money7)) {
                alert("复冻费的整数位最多9位，小数位最多2位");
                return;
            }
            // if (!/(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money8)) {
            //     alert("查验移箱费的整数位最多11位，小数位最多2位");
            //     return;
            // }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money9)) {
                alert("查验掏箱费的整数位最多9位，小数位最多2位");
                return;
            }
            // if (!/(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money10)) {
            //     alert("查验开关箱门费及铅封的整数位最多11位，小数位最多2位");
            //     return;
            // }
            // if (!/(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money11)) {
            //     alert("门到门查验费的整数位最多11位，小数位最多2位");
            //     return;
            // }
            // if (!/(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money12)) {
            //     alert("出入库费的整数位最多11位，小数位最多2位");
            //     return;
            // }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money13)) {
                alert("缠绕膜的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money14)) {
                alert("过车费的整数位最多9位，小数位最多2位");
                return;
            }
            if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.receiptOrder.money15)) {
                alert("预冷费的整数位最多9位，小数位最多2位");
                return;
            }

            if (!isBlank(vm.receiptOrder.money16) && vm.receiptOrder.money16.length > 300) {
                alert("其他费用长度小于300个字符");
                return;
            }

            $.ajax({
                type: "POST",
                url: baseURL + "storage/order/receipt",
                contentType: "application/json",
                data: JSON.stringify(vm.receiptOrder),
                success: function (r) {
                    if (r.code === 0) {
                        alert('接单成功', function (index) {
                            $('#receiptModal').modal('hide');
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
                    url: baseURL + "storage/order/delete",
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
            $.get(baseURL + "storage/order/info/" + id, function (r) {
                vm.order = r.order;
            });
        },

        //取消订单
        cancelOrder: function (id, passStatus) {
            var status;
            /*if (passStatus == 0) { //待确认
                status = 3        //已取消
            } else*/
            if (passStatus == 1) {//已接单
                status = 5              //卖家申请取消
            } else if (passStatus == 2) {//已入库
                status = 5               //卖家申请取消
            } else if (passStatus == 4) {//买家申请取消
                status = 3              //已取消
            } else if (passStatus == 6) {//已出库
                status = 5              //卖家申请取消
            }
            confirm('确定要完结订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "storage/order/update",
                    contentType: "application/json",
                    data: JSON.stringify({id: id, passStatus: status}),
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
        orderDetail: function (id) {
            $.ajaxSettings.async = false;
            $.get(baseURL + "storage/order/detail/" + id, function (r) {
                vm.order = r.order;
                vm.offer = r.offer;
                if (r.offer.unit == 1) {
                    vm.offer.unit = '元/吨/天';
                } else if (r.offer.unit == 2) {
                    vm.offer.unit = '元/千克/天';
                }
                // vm.orderCost2 = r.orderCost;
                if (r.commodityEntityList == null) {
                    vm.commodityEntityList = [];
                } else {
                    vm.commodityEntityList = r.commodityEntityList;
                }
            });
            $.ajaxSettings.async = true;
        },
        offerDetail: function (id) {
            vm.offer = {};
            $.ajax({
                type: "POST",
                async: false, //同步
                url: baseURL + "storage/order/offerDetail/" + id,
                contentType: "application/json",
                success: function (r) {
                    if (r.code === 0) {
                        vm.offer = r.offer;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.show1 = false;
            vm.show2 = false;
            vm.afterSDetail = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("#receiptForm").RF();
            $("#arrivalForm").RF();
        },
        back: function (event) {
            vm.showList = false;
            vm.show1 = true;
            vm.show2 = false;
            vm.afterSDetail = false;
            vm.orderDetail(vm.order.id);
        },
        //表单验证
        validate2: function () {
            var bl = $('#arrivalForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate2: function (event) {
            for (let obj of vm.commodityEntityList) {
                if (obj.weight == null || obj.weight == '') {
                    alert("入库重量不能为空");
                    return;
                }
                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.weight)) {
                    alert("入库重量为整数位最多9位，小数位最多2位");
                    return;
                }
                if (obj.unit == null || obj.unit == '') {
                    alert("计费单位不能为空");
                    return;
                }
                // if (obj.merchantWeight == null || obj.merchantWeight == '') {
                //     alert("仓库方入库数量不能为空");
                //     return;
                // }
                // if (!/(^[0-9]|[1-9]\d{0,10}$)/.test(obj.merchantWeight)) {
                //     alert("仓库方入库数量为最多11位的整数");
                //     return;
                // }
                // if (obj.merchantUnit == null || obj.merchantUnit == '') {
                //     alert("仓库方数量单位不能为空");
                //     return;
                // }
                // if (obj.merchantUnit == 1 && obj.commodityUnit == 1 && obj.merchantWeight != obj.weight) {
                //     alert("入库数量不正确");
                //     return;
                // }
            }
            // var url = vm.orderCost.id == null ? "storage/order/arrival" : "storage/order/updateOrder";
            var order = {
                // id: vm.orderCost.orderId,
                // orderCostEntity: vm.orderCost,
                id: vm.order.id,
                commodityEntityList: vm.commodityEntityList
            };
            $.ajax({
                type: "POST",
                url: baseURL + "storage/order/arrival",
                contentType: "application/json",
                data: JSON.stringify(order),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            $('#arrivalModal').modal('hide');
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //投诉
        // addComplaint: function (orderNumber) {
        //     vm.complaint = {
        //         orderId: orderNumber,
        //         orderType: 3,
        //         reason: '',
        //         images: []
        //     };
        //     $("#complaintModal").modal("show");
        // },
        addComplaint: function () {
            vm.complaint = {
                orderId: vm.order.orderNumber,
                orderType: 3,
                reason: '',
                images: []
            };
            $("#complaintModal").modal("show");
        },
        saveComplaint: function (event) {
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
                            $("#complaintModal").modal("hide");
                            vm.back();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        // complaintDeatil: function (orderNumber) {
        //     $("#complaintModal").modal("show");
        //     vm.complaint = {};
        //     vm.images = [];
        //     $.ajax({
        //         type: "POST",
        //         url: baseURL + "complaint/complaint/detail",
        //         contentType: "application/json",
        //         data: JSON.stringify({orderId: orderNumber, orderType: 3}),
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 vm.complaint = r.complaint;
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        // },
        complaintDeatil: function () {
            $("#complaintModal").modal("show");
            vm.complaint = {};
            vm.images = [];
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId: vm.order.orderNumber, orderType: 3}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.complaint = r.data;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //售后
        // handleAfterSale: function (orderNumber) {
        //     vm.afterSale = {
        //         orderId: orderNumber,
        //         orderType: 3,
        //         suggestion: '',
        //     };
        //     console.log("!!!!!"+vm.afterSale.orderId);
        //     $("#AfterSaleModal").modal("show");
        // },
        handleAfterSale: function () {
            vm.afterSale = {
                orderId: vm.order.orderNumber,
                orderType: 3,
                suggestion: '',
            };
            console.log("!!!!!" + vm.afterSale.orderId);
            $("#AfterSaleModal").modal("show");
        },
        handle: function (event) {
            console.log("222222" + vm.afterSale.orderId);
            if (vm.afterSale.suggestion == null || vm.afterSale.suggestion == '' || vm.afterSale.suggestion.length > 200) {
                alert("处理意见不能为空，且不能大于200个字");
                return;
            }
            $.ajax({
                type: "POST",
                url: baseURL + "afterSale/aftersale/handle",
                contentType: "application/json",
                data: JSON.stringify(vm.afterSale),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            $("#AfterSaleModal").modal("hide");
                            vm.back();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        // afterSaleDeatil: function (orderNumber) {
        //     vm.afterSale = {};
        //     vm.afterImages=[];
        //     $.ajax({
        //         type: "POST",
        //         url: baseURL + "afterSale/aftersale/detail",
        //         contentType: "application/json",
        //         data: JSON.stringify({orderId: orderNumber, orderType: 3}),
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 vm.afterSale = r.afterSale;
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        //     vm.showList = false;
        //     vm.show1 = false;
        //     vm.show2 = false;
        //     vm.afterSDetail = true;
        // },
        afterSaleDeatil: function () {
            vm.afterSale = {};
            vm.afterImages = [];
            $.ajax({
                type: "POST",
                url: baseURL + "afterSale/aftersale/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId: vm.order.orderNumber, orderType: 3}),
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
            vm.afterSDetail = true;
        },
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
    }
});