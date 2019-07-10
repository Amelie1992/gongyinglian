$(function () {

    vm.initTable();
    //改价表单提交
    $("#changePriceForm").FM({
        fields: vm.fieldsPrice,
        success: vm.updatePriceMethod
    });
    //表单提交
    $("#editForm").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });
    $("#refuseForm").FM({
        fields: vm.fields3,
        success: vm.refuseOrder
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

function stFormatter(value, row, index) {
    var status;
    switch (row.orderState) {
        case 0:
            status = "待确认";
            break;
        case 1:
            status = "待支付";
            if (row.payState == 1) {
                status = "已支付";
            }
            break;
        case 2:
            status = "已付款";
            break;
        case 3:
            status = "待安排";
            break;
        case 4:
            status = "已发货";
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
        '<div><span>' + status + '</span></div>'
    /*+
           '<div><a href="javascript:void(0)" id="btn_detail">查看详情</a></div>' +*/
    '</div>'
}

window.opEvent = {
    'click #buyStatusDetail': function (e, value, row, index) {
        vm.complaintDeatil(row.orderNumber)
    },
    'click #refuse': function (e, value, row, index) {
        if (row.orderState == 0) {
            vm.declareOrder.id = row.id;
            vm.declareOrder.orderState = 7;
            vm.declareOrder.note = '';
            $('#refuseModal').modal('show');
        }
    },
    'click #cancel': function (e, value, row, index) {
        //商家接单后2取消5（待商家确认取消）
        //卖家 接单后 协议取消 未实现
        /*  if (vm.declareOrder.orderState == 5) {
              row.orderState = 7;
              vm.updateStatus(row.id, row.orderState);
          }
          vm.orderCancel(row.id)*/
        confirm('确定要完结订单？', function () {
            if (row.orderState == 5) {
                row.orderState = 7;
            } else {
                row.orderState = 8;
            }
            vm.updateStatus(row.id, row.orderState);
        })
    },
    //确认接单
    'click #sure': function (e, value, row, index) {
        row.orderState = 1;
        vm.orderSure(row.id, row.orderState);
    },
    'click #btn_complaint': function (event, value, row, index) {

        $("#myModal").modal('show')
    },
    'click #btn_alter': function (e, value, row, index) {
        vm.afterList = true;
        vm.showList = false;
        vm.showList2 = false;
    },
    //提交文件
    'click #btn_deliverGoods': function (e, value, row, index) {
        vm.showList2 = true;
        vm.sureShow = true;//提交按钮显示
        vm.showList = false;
        vm.afterList = false;
        vm.complaintShow = false;
        vm.getInfo(row.id);
        vm.fileStart();
        row.orderState = 4;
    },
    //修改文件
    'click #btn_updatedeliverGoods': function (e, value, row, index) {
        vm.showList2 = true;
        vm.sureShow = true;//提交按钮显示
        vm.showList = false;
        vm.afterList = false;
        vm.complaintShow = false;
        vm.getInfo(row.id);
        vm.fileStart();
    },


    'click #btn_detail': function (event, value, row, index) {
        vm.showList = false;
        vm.showList2 = true;
        vm.afterList = false;
        vm.sureShow = false;//提交按钮隐藏
        vm.getInfo(row.id);
        vm.fileStart();
    }
}
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        fieldsPrice: {
            total: {
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
        fields3: {
            note: {
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
        updatePriceEntity: {},
        complaintShow: true,//投诉按钮显示
        afterList: false,
        showList: true,
        showList2: false,
        sureShow: false,//确定按钮显示
        title: null,
        declareOrder: {},
        declareOrderOss: [],
        file1: [],//报关单
        file2: [],//缴税单
        file3: [],//查验单
        file4: [],//检疫证
        file5: [],//其他文件
        files: {
            file1: [],
            file2: [],
            file3: [],
            file4: [],
            file5: []
        },
        complaint: {},//投诉信息
        images: [],
        goods: [],
        params: {
            name: '',
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
        placeData: [],
        unitList: [{code: 1, name: '吨'}, {code: 2, name: '千克'}, {code: 3, name: '柜'}],
        unitList1: [{code: 0, name: '元/吨'}, {code: 1, name: '元/千克'}, {code: 2, name: '元/柜'}, {code: 3, name: '元/m³'}, {code: 4, name: '美元/m³'}],
    },
    methods: {
        //拒绝接单
        refuseOrder: function (event) {
            $.ajax({
                type: "POST",
                url: baseURL + "declare/declareorder/update",
                contentType: "application/json",
                data: JSON.stringify(vm.declareOrder),
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
        updatePriceMethod: function () {
            $.ajax({
                type: 'POST',
                url: baseURL + 'declare/declareorder/updatePrice',
                contentType: 'application/json',
                data: JSON.stringify(vm.updatePriceEntity),
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
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'declare/declareorder/list2',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {title: vm.$t("Buyer"), field: 'buyCompanyName'},
                    {title: vm.$t("Seller"), field: 'merchantCompanyName'},
                    // {title: vm.$t("UnitPrice"), field: 'eachPrice'},
                    /*  {title: vm.$t("consignee"), field: 'buyContacts'},*/
                    {title: vm.$t("PurchaseQuantitie"), field: 'num'},
                    {
                        title: vm.$t("OrderTotalPrice"),
                        field: 'total',
                        formatter: function (value, row, index) {
                            if (row.orderState == 0) {
                                var str = row.total + '<br/><a href="javascript:void(0)" id="updatePrice">改价</a>';
                                return str;
                            }
                            return value;
                        },
                        events: {
                            'click #updatePrice': function (e, value, row, index) {
                                console.log("-----------------------")
                                vm.updatePriceEntity.oldTotal = value;
                                vm.updatePriceEntity.id = row.id;
                                vm.$forceUpdate();
                                $('#changeprice').modal('show')
                            },
                        }
                    },
                    {title: vm.$t("unit"), field: 'unit', formatter: typeFmt},
                    {title: vm.$t("TradingTime"), field: 'createTime'},
                    {title: vm.$t("OrderStatus"), formatter: stFormatter},
                    {
                        title: vm.$t("Remarks"), field: 'note', formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("chaozuo"), align: 'center', width: '20%', formatter: function (value, row, index) {
                            var op = '';
                            // if (row.orderState != 7) {
                            if (row.orderState == 0) {
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="sure">确认接单</button>&nbsp;';
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="refuse">拒绝接单</button>&nbsp;';
                            }
                            if (row.orderState == 1 || row.orderState == 2) {
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="cancel">结束订单</button>&nbsp;';
                            }
                            if (row.orderState == 3) {
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="btn_deliverGoods">安排报关</button>&nbsp;&nbsp;';
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="cancel">结束订单</button>&nbsp;';
                            }
                            /*  }*/
                            /* if (row.orderState == 7) {
                                 op +='<button class="btn btn-primary btn-sm">订单已取消</button>&nbsp;&nbsp;';
                             }*/
                            if (row.orderState == 4) {
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="btn_updatedeliverGoods">修改文件</button>&nbsp;&nbsp;';
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="cancel">结束订单</button>&nbsp;';
                            }
                            if (row.orderState == 5) {
                                op += '<button class="btn btn-primary btn-sm" href="javascript:void(0)" id="cancel">确认结束</button>&nbsp;';
                            }
                            op += '<button class="btn btn-primary btn-sm" id="btn_detail" >查看详情</button>&nbsp;&nbsp;';
                            return op;
                        }, events: opEvent
                    },
                ],
                //条件查询
                queryParams: vm.params
            });
            //货物信息
            $("#contenListTable").bootstrapTable("destroy");
            $("#contenListTable").BT({
                columns: [
                    {
                        title: vm.$t("ProductName"), field: 'commodityName'
                    },
                    {
                        title: vm.$t("place"), field: 'commodityCountry'
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
                                } else if (row.commodityUnit == 2) {
                                    str = '千克';
                                } else if (row.commodityUnit == 3) {
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
            //商家信息列表
            $("#contenTable").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#contenTable").BT({
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
                        title: vm.$t("unit"), field: 'str', formatter: function (value, row, index) {
                            var str = "";

                            if (vm.declareOrder.unit == 0) {
                                str = '元';
                            } else if (vm.declareOrder.unit == 1) {
                                str = '美元';
                            } else {
                                var aa = vm.declareOrder.unit;
                                str = aa;
                            }
                            return str;
                        }
                    }
                ]

            });

            $("#afterTable").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#afterTable").BT({
                columns: [
                    {title: vm.$t("OrderNumber")},
                    {title: vm.$t("OrderInformation")},
                    {title: vm.$t("business")},
                    {title: vm.$t("OrderTime")}
                ]
            });
        },

        //初始化上传插件
        fileStart: function () {
            vm.$refs.file1.destroy();
            vm.$refs.file1.initFileInput();
            vm.$refs.file2.destroy();
            vm.$refs.file2.initFileInput();
            vm.$refs.file3.destroy();
            vm.$refs.file3.initFileInput();
            vm.$refs.file4.destroy();
            vm.$refs.file4.initFileInput();
            vm.$refs.file5.destroy();
            vm.$refs.file5.initFileInput();
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.showList2 = true;
            vm.afterList = false;
            vm.title = "新增";
            vm.declareOrder = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.showList2 = true;
            vm.afterList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        //修改订单状态
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

        //表单验证
        validate: function () {
            var bl = $('#editForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },        //表单验证
        validatePrice: function () {
            var bl = $('#changePriceForm').VF();//启用验证
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
        saveOrUpdate: function (event) {
            var url = vm.declareOrder.id == null ? "declare/declareorder/save" : "declare/declareorder/update";

            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.declareOrder),
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
        getInfo: function (id) {
            $('#contenTable').bootstrapTable('removeAll'); //清除表中数据
            $.get(baseURL + "declare/declareorder/info/" + id, function (r) {
                vm.declareOrder = r.declareOrder;
                var orderState = r.declareOrder.orderState;
                if (orderState == 0) {
                    vm.complaintShow = false;//投诉按钮
                }
                let data = [];
                /*vm.goods.forEach(function (item) {
                    item.commodityPrice = vm.declareOrder.price
                })*/
                /*data = vm.declareOrder.goods;*/
                vm.declareOrder.orderOfferEntity.num = vm.declareOrder.num;
                vm.declareOrder.orderOfferEntity.total = vm.declareOrder.total;
                /*vm.declareOrder.orderOfferEntity.title = vm.declareOrder.offerName;*/
                $('#contenListTable').bootstrapTable('load', {
                    rows: vm.declareOrder.goods,
                    total: vm.declareOrder.goods == null ? 0 : vm.declareOrder.goods.length
                });
                $('#contenTable').bootstrapTable('append', vm.declareOrder.orderOfferEntity);
                // $('#contenTable').bootstrapTable('load', {
                //         rows: vm.declareOrder.orderOfferEntity,
                //         total: vm.declareOrder.orderOfferEntity == null ? 0 : vm.declareOrder.orderOfferEntity.length
                //     }
                // );
                var datas = vm.declareOrder.orderOssEntityList;
                datas.forEach(function (item) {
                    item.picName = item.fileName;
                    item.picUrl = item.fileUrl;

                    if (1 == item.type) {
                        vm.file1=[];
                        vm.files.file1 = [];
                        vm.file1.push(item);
                        vm.files.file1.push(item);
                    } else if (2 == item.type) {
                        vm.file2=[];
                        vm.files.file2 = [];
                        vm.file2.push(item);
                        vm.files.file2.push(item);
                    } else if (3 == item.type) {
                        vm.file3=[];
                        vm.files.file3 = [];
                        vm.file3.push(item);
                        vm.files.file3.push(item);
                    } else if (4 == item.type) {
                        vm.file4=[];
                        vm.files.file4 = [];
                        vm.file4.push(item);
                        vm.files.file4.push(item);
                    } else if (5 == item.type) {
                        vm.file5=[];
                        vm.files.file5 = [];
                        vm.file5.push(item);
                        vm.files.file5.push(item);
                    }
                })
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.showList2 = false;
            vm.afterList = false;
            vm.updatePriceEntity = {};
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        //确认接单
        orderSure: function (id, orderState) {
            var url = "declare/declareorder/info/" + id;
            var declareOrder;
            confirm('确定要接单？', function () {//二次确认框
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    async: false,
                    success: function (r) {
                        declareOrder = r.declareOrder;
                    }
                });
                declareOrder.orderState = orderState;
                $.ajax({
                    type: "POST",
                    url: baseURL + "declare/declareorder/update",
                    contentType: "application/json",
                    data: JSON.stringify(declareOrder),
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
            })

        },
        //取消订单
        orderCancel: function (id) {
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
        saveFile: function () {
            if (isBlank(vm.declareOrder.inspectionNo)) {
                alert("报检号/检疫证号不能为空");
                return
            }else if (!/^\d{15,20}$/.test(vm.declareOrder.inspectionNo)) {
                alert("报检号/检疫证号为长度15至20的数字字符");
                return
            }
            var datas = [];
            for (var i = 1; i < 6; i++) {
                var data = vm['file' + i];
                var len = 0;
                if ((len = data.length) > 0) {
                    for (var x = 0; x < len; x++) {
                        var temp = {};
                        temp.fileName = data[x].picName;
                        temp.fileUrl = data[x].picUrl;
                        temp.orderId = vm.declareOrder.id;
                        temp.type = i;
                        datas.push(temp);
                    }
                }
            }
            if (datas.length < 1) {
                alert("报关信息不能为空！");
                return;
            }
            vm.declareOrder.orderOssEntityList = datas;
            $.ajax({
                type: "POST",
                url: baseURL + 'order/declareordeross/saveFile',
                contentType: "application/JSON",
                data: JSON.stringify(vm.declareOrder),
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

        }
        ,
        //显示投诉页面
        addComplaint: function () {
            var id = vm.declareOrder.orderNumber;
            //查询该订单是否申请过售后
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
        }
        ,
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
        }
        ,
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
            vm.complaint.orderId = vm.declareOrder.orderNumber;
            vm.complaint.detail = vm.declareOrder.detail;
            vm.complaint.cinfo = vm.declareOrder.cinfo;
            //投诉用户
            vm.complaint.complaintFromId = vm.declareOrder.merchantCompanyId;//商家公司ID
            vm.complaint.complaintFrom = vm.declareOrder.merchantCompanyName;//商家公司名
            //被投诉用户
            vm.complaint.complaintToId = vm.declareOrder.buyCompanyId;//买家公司ID
            vm.complaint.complaintTo = vm.declareOrder.buyCompanyName;//买家公司名
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
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }
        ,
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
        }
        ,
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
        }
        ,
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
        }
        ,
    },
    created: function () {
        this.getPlaceData();
        // this.getCommodityWeightUnit();
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#contenTable").bootstrapTable.defaults.locale = "en-US";
                $("#afterTable").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#contenTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#afterTable").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#contenTable").bootstrapTable("destroy");
            $("#afterTable").bootstrapTable("destroy");
            this.initTable();
        },
    }
});

