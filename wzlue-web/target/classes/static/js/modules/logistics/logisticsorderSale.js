$(function () {
    vm.initTable();
    //表单提交
    // $("form").FM({
    //     fields: vm.fields,
    // success: vm.saveOrUpdate,
    //     success: vm.saveTouSu
    // });
    $("#changePriceForm").FM({
        fields: vm.fieldsPrice,
        success: vm.updateChangePrice

    });
    $("#refuseForm").FM({
        fields: vm.fields3,
        success: vm.refuseOrder
    });
    $("#shipForm").FM({
        fields: vm.shipFields,
        success: vm.addLogisticsOrderShip
    });


    $('#changeprice').on('hide.bs.modal', function () {
        $("#changePriceForm").RF();
        vm.changPriceBefore.afterPrice = null;
    });
    $('#refuseModal').on('hide.bs.modal', function () {
        $('#refuseForm').bootstrapValidator('resetForm', true);
        $('#refuseForm')[0].reset();
    })

});
function typeFmt(value, rows, index) {
    var pyy = rows.unit;
    if (pyy == '0') {
        return '元';
    } else if (pyy == '1') {
        return '美元';
    }
}
//投诉
function complaint(id) {
    vm.toushu(id);
}

//查看投诉
function compDetail(orderNumber) {
    vm.complaintDetail(orderNumber);
}

//查看详情
function detail(id) {
    vm.title = "详情";
    vm.showList = false;
    vm.viewStatus = 0;
    vm.logisticsOrderShip = {};
    vm.orderDetail(id);
}

//查看发货
function ship(id) {
    vm.title = "详情";
    vm.showList = false;
    vm.viewStatus = 1;
    vm.getLogisticsOptions();
    vm.orderDetail(id);
    vm.logisticsOrderShip = {};
    vm.ship1 = null;
}

//取消订单
function cancel(id, orderStatus) {
    vm.cancelOrder(id, orderStatus);
}

//拒绝接单
function refuse(id) {
    if (!isBlank(id)) {
        vm.logisticsOrder.id = id;
        vm.logisticsOrder.orderStatus = 7;
        vm.logisticsOrder.remarks = '';
        $('#refuseModal').modal('show');
    }
}

//确认订单
function sure(id) {
    vm.orderSure(id);
}

//改价弹窗
function changePrice(val, id) {
    vm.changPriceBefore.id = id;
    vm.changPriceBefore.beforePrice = val;
    $("#changeprice").modal("show");

}

window.opEvent = {
    //跳转收款页面
    'click #showPay': function showPay(el, value, row, index) {
        vm.showList = false;
        vm.showAfterSales = false;
        vm.afterSDetail = false;
        vm.payList = true;
        window.location.href = '/modules/bill/bill_receivable.html?orderNo=' + row.orderNumber;
    }
};
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        payList: false,
        images: [],
        complaint: {},
        showList: true,
        title: null,
        afterSDetail: false,
        logisticsOrder: {},
        logisticsOffer: {},
        params: {
            orderNumber: '',
            orderStatus: ''
        },
        viewStatus: 0,//0查看详情1发货
        logisticsOrderShip: {},
        logisticsOptions: [], //物流公司
        changPriceBefore: {
            beforePrice: null,
            afterPrice: null,
            id: null
        },
        kdnData: {
            serviceType: "B",
            expCode: "",
            expNo: "",
            showType: "normal",
            container: "shipElement"
        },
        ship1: null,
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
        resultList: ['通过', '不通过'],
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
        fieldsPrice: {
            afterPrice: {
                message: '价格验证失败',
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
            orderNumber: {
                message: '订单号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单号不能为空'
                    },
                },
            }, contractNumber: {
                message: '合同号验证失败',
                validators: {
                    notEmpty: {
                        message: '合同号不能为空'
                    },
                },
            }, reason: {
                message: '投诉原因验证失败',
                validators: {
                    notEmpty: {
                        message: '投诉原因不能为空'
                    },
                },
            },
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
        shipFields: {
            logisticsCode: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '长度在20字符以内'
                    },
                },
            }, logisticsNumber: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '长度在20字符以内'
                    },
                },
            }, numberPlate: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }, regexp: {
                        regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                        message: '请正确输入车牌号'
                    },
                },
            }, numberPlate2: {
                validators: {
                   /* notEmpty: {
                        message: '不能为空'
                    },*/stringLength: {
                        max: 20,
                        message: '长度在20字符以内'
                    },
                },
            }, driverName: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },stringLength: {
                        max: 20,
                        message: '长度在20字符以内'
                    },
                },  driverNumber: {
                    validators: {
                        notEmpty: {
                            message: '驾驶员号码不能为空'
                        }, regexp: {
                            regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                            message: '号码格式不正确！'
                        },
                    },
                }, driverIdNumber: {
                    validators: {
                        regexp: {
                            regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                            message: '身份证格式不正确！'
                        },
                    },
                }, remark: {
                    validators: {
                        stringLength: {
                            max: 50,
                            message: '长度须少于50个字符'
                        },
                    },
                }
            }
        },
        placeData: [],
        unitList: [{code: 1, name: '吨'}, {code: 2, name: '千克'}],
        unitList1: [{code: 0, name: '元/m³'}, {code: 1, name: '美元/m³'},{code: 2, name: '元/柜'},{code: 3, name: '元/车'},{code: 4, name: '美元/票'}],
    },
    methods: {

        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'logistics/logisticsorder/list2',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber', align: 'center'},
                    {title: vm.$t("Buyer"), field: 'contactCompanyName', align: 'center'},
                    {title: vm.$t("Seller"), field: 'merchantCompanyName', align: 'center'},
                    //{title: '商家', field: 'merchantContact', align: 'center'},
                 /*   {title: vm.$t("consignee"), field: 'contact', align: 'center'},*/
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
                            // return '<div>' +
                            //     '<div class="pull">' +
                            //     '￥' + value +
                            //     '</div>'
                            if (row.orderStatus == 0) {
                                return '<div>' +
                                    '<div class="pull">' + value +
                                    '</div>' + '<a href="javascript:void(0)" onclick="changePrice(' + value + ',' + row.id + ')">改价</a>'
                            } else {
                                return '<div>' +
                                    '<div class="pull">' + value +
                                    '</div>';
                            }
                        }
                    },
                    {title: vm.$t("unit"), field: 'unitName', align: 'center', formatter: typeFmt},
                    {title: vm.$t("TradingTime"), field: 'createdTime', align: 'center'},
                    {
                        title: vm.$t("OrderStatus"),
                        valign: 'middle',
                        align: 'center',
                        formatter: function (value, row, index) {
                            var py = '';
                            if (row.orderStatus == 0) {
                                py += '待确认';
                            } else if (row.orderStatus == 1) {
                                py += '待支付';
                            } else if (row.orderStatus == 2) {
                                py += '买家已付款';
                            } else if (row.orderStatus == 3) {
                                py += '已收款';
                            } else if (row.orderStatus == 4) {
                                py += '待收货';
                            } else if (row.orderStatus == 5) {
                                py += '已安排';
                            } else if (row.orderStatus == 6) {
                                py += '订单已完结';
                            } else if (row.orderStatus == 7) {
                                py += '订单已取消';
                            } else if (row.orderStatus == 8) {
                                py += '买家申请取消';
                            } else if (row.orderStatus == 9) {
                                py += '卖家申请取消';
                            }
                            return py;
                        }
                    },
                    {
                        title: vm.$t("Remarks"), align: 'center', field: 'remarks',
                        formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"),
                        align: 'center',
                        field: 'orderId',
                        formatter: function (value, row, index) {
                            var op = '';
                            if (row.orderStatus != 7) {
                                if (row.orderStatus == 0) {
                                    op += '<button class="btn btn-primary btn-sm" onclick="refuse(' + row.id + ')">拒绝接单</button>&nbsp;';
                                    op += '<button class="btn btn-primary btn-sm" onclick="sure(' + row.id + ')">确认订单</button>&nbsp;';
                                }
                            }
                            op += '<button class="btn btn-primary btn-sm" onclick="detail(' + row.id + ')">查看详情</button>&nbsp;';
                            if (row.orderStatus == 1) {
                                op += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.orderStatus + '\')">取消订单</button>&nbsp;';
                            }
                            if (row.orderStatus == 8) {
                                op += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.orderStatus + '\')">取消订单</button>&nbsp;';
                            }
                            // if (row.orderStatus == 2) {
                            //     op += '<button class="btn btn-primary btn-sm" id="showPay">点击收款</button>&nbsp;';
                            // }
                            // if (row.sellStatus == 0) {
                            //     op += '<button class="btn btn-primary btn-sm" onclick="complaint(' + index + ')" data-toggle="modal">投诉</button>&nbsp;';
                            // }
                            // if (row.sellStatus == 1) {
                            //     op += '<button class="btn btn-primary btn-sm" onclick="compDetail(\'' + row.orderNumber + '\')">查看投诉</button>&nbsp;';
                            // }

                            if (row.orderStatus == 3) {
                                op += '<button class="btn btn-primary btn-sm" onclick="ship(' + row.id + ')">安排物流</button>&nbsp;';
                            }
                            return op;
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
                        title: vm.$t("Headlines"), field: 'title', align: 'center'
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
                    {title: vm.$t("ProductName"), field: 'commodityName', align: 'center'},
                    {
                        title: vm.$t("place"), field: 'commodityCountry', align: 'center' ,formatter: function (value, row, index) {
                            if (row.commodityCountry == null) {
                                row.commodityCountry = '';
                            }
                            var str = "";

                            vm.placeData.forEach(function (item, index) {
                                if (item.code == row.commodityCountry) {
                                    str = item.name;
                                }
                            });
                        if (str ==null || str ==''){
                            str = row.commodityCountry;
                        }
                            return str;

                        }
                    },
                    {title: vm.$t("ProducerOrNumber"), field: 'commodityFactoryNumber', align: 'center'},
                    // {title: vm.$t("UnitPrice"), field: 'commodityPrice', align: 'center'},
                    {title: vm.$t("weight"), field: 'commodityCount', align: 'center'},
                    {
                        title: vm.$t("unit"), field: 'commodityUnit', align: 'center',formatter: function (value, row, index) {
                            if (row.commodityUnit == null) {
                                row.commodityUnit = '';
                            }
                            var str = "";
                            //
                            // vm.unitList.forEach(function (item, index) {
                            //     if (item.code == row.commodityUnit) {
                            //         str = item.name;
                            //     }
                            //
                            // })
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
                    //     title: vm.$t("TotalPrice"), align: 'center',
                    //     formatter: function (value, row, index) {
                    //         var py = '';
                    //         py = row.commodityPrice * row.commodityCount;
                    //         return py;
                    //     }
                    // },
                ]
            });

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
        //货物信息中获取产地
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
        validatePrice: function () {
            if ( $('#afterPrice').val()==0){
                alert("请输入金额大于0");
                return
            }
            var bl = $('#changePriceForm').VF();//启用验证
            if (!bl) {
                return;
            }


        },
        //确认改价
        updateChangePrice: function () {
            $.ajax({
                type: 'POST',
                url: baseURL + 'logistics/logisticsorder/updatePrice',
                contentType: 'application/json',
                data: JSON.stringify(vm.changPriceBefore),
                success: function (obj) {
                    if (obj.code == '0')
                        alert('改价成功！', function () {
                            $('#changeprice').modal('hide');
                            vm.reload();
                        });
                    else
                        alert(obj.msg)
                }
            });
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
            vm.$refs.file2.destroy();
            vm.$refs.file2.initFileInput();
            $('#myModal').modal('show')
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.afterSDetail = false;
            vm.title = "新增";
            vm.logisticsOrder = {};
            vm.logisticsOffer = {};
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
        validate: function () {
            var bl = $('form').VF();//启用验证
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
                url: baseURL + "logistics/logisticsorder/update",
                contentType: "application/json",
                data: JSON.stringify(vm.logisticsOrder),
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
        // saveOrUpdate: function (event) {
        //     var url = vm.logisticsOrder.id == null ? "logistics/logisticsorder/save" : "logistics/logisticsorder/update";
        //     $.ajax({
        //         type: "POST",
        //         url: baseURL + url,
        //         contentType: "application/json",
        //         data: JSON.stringify(vm.logisticsOrder),
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 alert('操作成功', function (index) {
        //                     vm.reload();
        //                 });
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        // },
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
        //订单详情
        orderDetail: function (id) {
            vm.$refs.file2.initFileInput();
            $.get(baseURL + "logistics/logisticsorder/info/" + id, function (r) {
                vm.logisticsOrder = r.data.logisticsOrder;
                vm.logisticsOrder.logisticsOfferEntity = r.data.logisticsOrderOffer;//------
                vm.logisticsOffer = r.data.logisticsOffer;
                vm.logisticsOrder.logisticsOfferEntity.num = vm.logisticsOrder.num;
                vm.logisticsOrder.logisticsOfferEntity.total = vm.logisticsOrder.total;
                if (vm.logisticsOrder.logisticsOrderShipEntity != null) {
                    vm.logisticsOrderShip = vm.logisticsOrder.logisticsOrderShipEntity;
                }
                let data = [];
                let data1 = [];
                data = vm.logisticsOrder.logisticsOrderCommodityEntityList;
                data1 = vm.logisticsOrder.logisticsOfferEntity;
                $('#contentTable').bootstrapTable('removeAll');
                $('#contentTables').bootstrapTable('removeAll');
                $('#contentTable').bootstrapTable('append', data);
                $('#contentTables').bootstrapTable('append', data1);
                if (vm.logisticsOrder.orderStatus > 3 && vm.logisticsOrder.orderStatus != 7) {
                    vm.viewStatus = 1;
                }
                vm.ship1 = "http://m.kuaidi100.com/result.jsp?nu=" + vm.logisticsOrderShip.logisticsNumber;
                /*                vm.kdnData.expCode =vm.logisticsOrderShip.logisticsCode;
                                vm.kdnData.expNo = vm.logisticsOrderShip.logisticsNumber;
                                console.log(vm.kdnData)
                                KDNWidget.run(vm.kdnData)*/
            });
        },
        //发货页面
        shipDetail: function (id) {
            $.get(baseURL + "logistics/logisticsorder/info/" + id, function (r) {
                vm.logisticsOrder = r.data.logisticsOrder;
                let data = [];
                let data1 = [];
                data = vm.logisticsOrder.logisticsOrderCommodityEntityList;
                data1 = vm.logisticsOrder.logisticsOfferEntity;
                $('#contentTable').bootstrapTable('removeAll');
                $('#contentTable').bootstrapTable('append', data);
                $('#contentTables').bootstrapTable('append', data1);
            });
        },
        validateShip: function () {
            var bl = $('#shipForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //保存发货明细
        addLogisticsOrderShip: function () {
            vm.logisticsOrderShip.orderId = vm.logisticsOrder.id;
           /* if(vm.logisticsOrderShip.logisticsCode == "" || vm.logisticsOrderShip.logisticsCode == null){
             alert("请填写物流公司");
             return;
            }
            if (vm.logisticsOrderShip.logisticsNumber == "" || vm.logisticsOrderShip.logisticsNumber == null) {
                alert("请填写物流单号");
                return;
            }else if ( /[\u4E00-\u9FA5]/g.test(vm.logisticsOrderShip.logisticsNumber)) {
                alert("请输入正确的物流单号");
                return;
            }
            if (vm.logisticsOrderShip.numberPlate == "" || vm.logisticsOrderShip.numberPlate == null) {
                alert("请填写车牌号");
                return;
            } else  if (!/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(vm.logisticsOrderShip.numberPlate)) {
                alert("请输入正确的车牌号");
                return;
            }
            if (vm.logisticsOrderShip.driverName == "" || vm.logisticsOrderShip.driverName == null) {
                alert("请填写驾驶员姓名");
                return;
            }
            if (vm.logisticsOrderShip.driverName != null && vm.logisticsOrderShip.driverName.length > 20) {
                alert("驾驶员姓名须少于20个字符");
                return;
            }
            if (vm.logisticsOrderShip.driverNumber == "" || vm.logisticsOrderShip.driverNumber == null) {
                alert("请填写驾驶员手机号码");
                return;
            }
            /!* if (vm.logisticsOrderShip.driverIdNumber == "" || vm.logisticsOrderShip.driverIdNumber == null) {
                 alert("请填写驾驶员身份证号");
                 return;
             }*!/
            if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(vm.logisticsOrderShip.driverNumber)) {
                alert("请输入正确的手机号");
                return;
            }
           /!* if (!/[\u4e00-\u9fa5]/.test(vm.logisticsOrderShip.driverName)) {
                alert("请正确输入驾驶员名称");
                return;
            }*!/*/
            $.ajax({
                url: baseURL + 'logisticsoffer/logisticsordership/save',
                type: 'post',
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
            })
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
        //售后弹框
        handleAfterSale: function () {
            vm.afterSale = {
                orderId: vm.logisticsOrder.orderNumber,
                orderType: 2,
                suggestion: '',
            };
            console.log("!!!!!获取订单编号" + vm.afterSale.orderId);
            $("#AfterSaleModal").modal("show");
        },

        handle: function (event) {
            if (vm.afterSale.result == 1 && isBlank(vm.afterSale.suggestion)) {
                alert("处理意见不能为空");
                return;
            }
            if (!isBlank(vm.afterSale.suggestion) && vm.afterSale.suggestion.length > 200) {
                alert("处理意见长度不能大于200个字符");
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
        //售后详情
        asDetail: function () {
            vm.$refs.file3.destroy();
            vm.$refs.file3.initFileInput();
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
                        vm.$forceUpdate()//强制刷新
                    } else {
                        alert(r.msg);
                    }
                }
            });
            vm.showList = false;
            vm.showAfterSales = false;
            vm.afterSDetail = true;
        },
        //确认订单
        orderSure: function (id) {
            confirm('确定要接该订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "logistics/logisticsorder/receipt",
                    contentType: "application/json",
                    data: JSON.stringify({id: id}),
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
        //取消订单
        cancelOrder: function (id, orderStatus) {
            var status;
            if (orderStatus == 0) {//待确认
                status = 7        //已取消
            } else if (orderStatus == 1) {//已接单
                status = 9              //卖家申请取消
            } else if (orderStatus == 8) {//买家取消
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
        getInfo: function (id) {
            vm.title = "详情";
            $.get(baseURL + "logistics/logisticsorder/info/" + id, function (r) {
                vm.showList = false;
                vm.logisticsOrder = r.logisticsOrder;
                vm.logisticsOffer = r.logisticsOffer;
            });
        },
        getSaleInfo: function (id) {

        },
        reload: function (event) {
            vm.showList = true;
            vm.afterSDetail = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            // $("form").RF();
        },
        back: function () {
            vm.showList = false;
            vm.showAfterSales = false;
            vm.afterSDetail = false;
        }
    },
    created: function () {
        this.getLogisticsOptions();
        this.getPlaceData();
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#contenTable").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#contenTable").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#contenTable").bootstrapTable("destroy");
            this.initTable();
        },
    }
});