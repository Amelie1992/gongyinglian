$(function () {

    vm.initTable();


    //表单提交
    $("#addForm").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
    $(".afterForm").FM({
        fields: vm.field2,
        success: vm.saveAfterSale

    });
    vm.initIntTime();
});
//修改订单
function updateOrder(id) {
    vm.update(id);
}
//取消订单
function cancel(id,passStatus) {
    vm.cancelOrder(id,passStatus);
}
//付款
function pay(id,orderNumber) {
    vm.showList=false;
    window.location.href='/modules/bill/bill_payable.html?orderNo='+orderNumber;
}

//查看详情
function detail(id) {
    vm.showList=false;
    vm.show1=true;
    vm.show2=false;
    vm.orderDetail(id);
}

//投诉
function complaint(orderNumber) {
    vm.addComplaint(orderNumber);
}

//查看投诉
function compDeatil(orderNumber) {
    vm.complaintDeatil(orderNumber);
}
//申请售后
// function afterSaleApply(id,orderNumber) {
//     vm.showList = false;
//     vm.show1=false;
//     vm.show2=false;
//     vm.showAfterSales = true;
//     vm.afterSDetail = false;
//     vm.title = "售后服务";
//     vm.afterSale={
//         serviceType:2,
//         reason:"",
//         refundForm:"",
//         images:[],
//         orderId:orderNumber,
//         orderType:3,
//     }
// }
function afterSaleApply() {
    vm.showList = false;
    vm.show1=false;
    vm.show2=false;
    vm.showAfterSales = true;
    vm.afterSDetail = false;
    vm.title = "售后服务";
    vm.afterSale={
        serviceType:2,
        reason:"",
        refundForm:"",
        images:[],
        orderId:vm.order.orderNumber,
        orderType:3,
    }
}
//查看售后
function aftDetail(orderNumber) {
    vm.asDetail(orderNumber);
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        playShow:false,
        complaint:{},
        images:[],
        showList: true,
        title: null,
        order: {},
        params: {
            orderNumber: '',
            passStatus: '',
        },
        passStatusList: ['待确认', '已接单', '已入库','已取消','买家结束订单','卖家结束订单','已出库','交易完成'],
//验证字段
        fields: {
            // contractNumber: {
            //     message: '合同编号验证失败',
            //     trigger: 'change',
            //     validators: {
            //         notEmpty: {
            //             message: '合同编号不能为空'
            //         },/*stringLength: {
            //             min: 5,
            //             max: 30,
            //             message: '合同编号长度必须在5到30之间'
            //         }*/
            //     },
            // },
            intTime: {
                message: '入库日期证失败',
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '入库日期不能为空'
                    },
                    //时间验证
                    callback: {
                        message: '入库时间不能小于当前时间',
                        callback: function (value, validator, $field) {
                            let now = new Date().Format("yyyy-MM-dd");
                            // let start = new Date(value.replace("-", "/").replace("-", "/"));
                            if (value >= now) {
                                return true;
                            }
                            return false;
                        }
                    }
                },
            }, phone: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '联系方式不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '电话号码不正确'
                    }
                },
            }, contact: {
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
            }, email: {
                message: '邮箱账号验证失败',
                validators: {
                    notEmpty: {
                        message: '邮箱账号不能为空'
                    },
                    //长度校验
                    stringLength: {
                        max: 20,
                        message: '邮箱账号不大于20个字符'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        message: '邮箱账号不正确'
                    }
                },
            }, remarks: {
                message: '备注验证失败',
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '备注要小于200个字符'
                    },
                },
            }, receiptMerchantId: {
                message: '卖家公司验证失败',
                validators: {
                    notEmpty: {
                        message: '卖家公司不能为空'
                    },
                },
            },offerId: {
                message: '报盘验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘不能为空'
                    },
                },
            },/*goodRemarks:{
                message: '补充信息验证失败',
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '补充信息要小于200个字符'
                    },
                },
            }*/
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
        },
        orderCost: {},
        offer: {},
        show1:false,
        show2:false,
        companys:[],
        orderOfferEntity:{},
        offers:[],
        commodityEntityList:[],
        addTxBtn:false,
        placeData:[],
        unitList:[{code:1,name:'吨'},{code:2,name:'千克'}],
        updateStatus:false,
        showAfterSales:false,
        afterSDetail:false,
        afterSale:{},
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
                        message: '补充信息要小于200个字符'
                    },
                }
            },
        },
        //退款方式
        refundFormList:[
            { value:0,label:'线上支付'},
            { value:1,label:'线下转账'},
            { value:2 ,label:'其他'}
        ],
        reasonList:[
            { value:0,label:'物品损坏'},
            { value:1,label:'质量不合格'},
            { value:2,label:'产品型号错误'},
            { value:3 ,label:'其他'}
        ],
        afterImages:[],
        contracts: null
    },
    methods: {

        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            //列表
            $("#table").BT({
                url: baseURL + 'storage/order/list',
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
                    {title: vm.$t("Remarks"), field: 'remarks',  formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {        //备注长度大于5，只展示前5个字符
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }},
                    {
                        title: vm.$t("chaozuo"), formatter: function (value, row, index) {
                            var ss = '';
                            //	0:待确认、1:已接单、2：已入库，3：已取消/已结束、4：买家结束订单、5：卖家结束订单、6:已出库、7：交易完成、
                            if (row.passStatus == 0) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="updateOrder('+row.id+')">修改订单</button>&nbsp;';
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel('+row.id+',\''+row.passStatus+'\')">取消订单</button>&nbsp;';
                            } else if (row.passStatus == 1) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel('+row.id+',\''+row.passStatus+'\')">结束订单</button>&nbsp;';
                                // if (row.payStatus == 0) {
                                //     ss += '<button class="btn btn-primary btn-sm">付款</button>&nbsp;';
                                // }
                                // if (row.buyStatus == 0) {
                                //     ss += '<button class="btn btn-primary btn-sm" onclick="complaint(\''+row.orderNumber+'\')">投诉</button>&nbsp;';
                                // }
                            } else if (row.passStatus == 2) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel('+row.id+',\''+row.passStatus+'\')">结束订单</button>&nbsp;';
                                if (row.payStatus == 0) {
                                    ss += '<button class="btn btn-primary btn-sm" onclick="pay('+row.id+',\''+row.orderNumber+'\')">付款</button>&nbsp;';
                                }
                                // if (row.buyStatus == 0) {
                                //     ss += '<button class="btn btn-primary btn-sm" onclick="complaint(\''+row.orderNumber+'\')">投诉</button>&nbsp;';
                                // }
                                // if (row.alterSale == 0) {
                                //     ss += '<button class="btn btn-primary btn-sm" onclick="afterSaleApply('+row.id+',\''+row.orderNumber+'\')">申请售后</button>&nbsp;';
                                // }
                                // if (row.alterSale == 1||row.alterSale == 2) {
                                //     ss += '<button class="btn btn-primary btn-sm" onclick="aftDetail(\''+row.orderNumber+'\')">查看售后</button>&nbsp;';
                                // }
                            }
                            // if (row.buyStatus == 1) {
                            //     ss += '<button class="btn btn-primary btn-sm" onclick="compDeatil(\''+row.orderNumber+'\')">查看投诉</button>&nbsp;';
                            // }
                            if (row.passStatus == 5) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel('+row.id+',\''+row.passStatus+'\')">确认结束</button>&nbsp;';
                            }
                            if (row.passStatus == 6) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="cancel(' + row.id + ',\'' + row.passStatus + '\')">结束订单</button>&nbsp;';
                                if (row.payStatus == 0) {
                                    ss += '<button class="btn btn-primary btn-sm" onclick="pay(' + row.id + ',\'' + row.orderNumber + '\')">付款</button>&nbsp;';
                                }
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

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.title = "新增";
            vm.order = {};
            vm.showList=false;
            vm.show1=false;
            vm.show2=true;
            vm.updateStatus=false;
            vm.orderOfferEntity={};
            vm.commodityEntityList=[];
            vm.getCompanys();
        },
        update: function (id) {
            vm.title = "新增";
            vm.order = {};
            vm.showList=false;
            vm.show1=false;
            vm.show2=true;
            vm.updateStatus=true;
            vm.orderOfferEntity={};
            vm.commodityEntityList=[];
           // vm.getCompanys();
            vm.getInfo(id);
        },
        //表单验证
        validate: function () {
            console.log(vm.commodityEntityList);
            var bl = $('#addForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //自主录入的合同号 必须先新增合同
        // checkCode: function () {
        //     console.log(vm.order.contractNumber)
        //     if (vm.order.contractNumber == '' || vm.order.contractNumber == null) {
        //         return;
        //     }
        //     $.ajax({
        //         type: "POST",
        //         url: baseURL + "storage/storagecontract/checkCode",
        //         contentType: "application/json",
        //         data: JSON.stringify({contractNumber:vm.order.contractNumber,dataSource:2}),
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 if (r.storageContract == null) {
        //                     alert("请先前往创建仓储合同");
        //                 }
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        // },
        saveOrUpdate: function (event) {
            var radio = $("input[name='choose']:checked").val();
            if (radio == 0 && isBlank(vm.order.contractNumber)) {
                alert("手输合同编号不能为空");
                return;
            }

            var radios = document.getElementsByName("choose");
            for (var i=0;i<radios.length;i++){
                if(radios[i].checked && radios[i].value==0 && isBlank(vm.order.contractNumber)){
                    alert("请输入合同编号");
                    return;
                }
            }
            if (vm.order.contractNumber!=null&&vm.order.contractNumber.length>=30){
                alert("合同编号长度要小于30个字符");
                return;
            }
            if(vm.commodityEntityList.length<=0){
                alert("请添加货物明细");
                return;
            }
            for (let obj of vm.commodityEntityList) {
                // if(obj.containerNo==null||obj.containerNo==''){
                //     alert("集装箱号不能为空");
                //     return;
                // }
                //长度设定
                if(obj.containerNo.length>20 || obj.inspectionNo.length>20 || obj.commodityName.length>20 || obj.commodityFactoryNumber.length>20 ){
                    alert("长度小于20");
                    return;
                }
                /*if(obj.inspectionNo==null||obj.inspectionNo==''){
                    alert("报检号不能为空");
                    return;
                }*/
                if(obj.commodityName==null||obj.commodityName==''){
                    alert("品名不能为空");
                    return;
                }
                if(obj.commodityCountry==null||obj.commodityCountry==''){
                    alert("原产国不能为空");
                    return;
                }
                if(obj.commodityFactoryNumber==null||obj.commodityFactoryNumber==''){
                    alert("生产商不能为空");
                    return;
                }
                // if(obj.commodityPrice==null||obj.commodityPrice==''){
                //     alert("单价不能为空");
                //     return;
                // }
                if (!isBlank(obj.commodityPrice)) {
                    //|(^0$)
                    if(!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/.test(obj.commodityPrice)){
                        alert("单价为整数位最多9位，小数位最多2位的正数");
                        return;
                    }
                }
                if(obj.commodityCount==null||obj.commodityCount==''){
                    alert("重量不能为空");
                    return;
                }
            // |(^0$)
                if(!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/.test(obj.commodityCount)){
                    alert("重量的整数最多9位，小数最多2位的正数");
                    return;
                }
                if(obj.commodityUnit==null){
                    alert("单位不能为空");
                    return;
                }
                if (!isBlank(obj.commodityPacking) && obj.commodityPacking.length > 20) {
                    alert("包装长度须少于20个字符");
                    return;
                }
                if(obj.productionDate==null||obj.productionDate==''){
                    alert("生产日期不能为空");
                    return;
                }
                if(obj.qualityTime==null||obj.qualityTime=='' ||  !/^-?[1-9]\d*$/.test(obj.qualityTime)){
                    alert("请输入保质期并且是整数");
                    return;
                }
                let now = new Date();
                let eDate = new Date(obj.expirationDate.replace("-", "/").replace("-", "/"));
                console.log(now);
                console.log(eDate);
                if (eDate <= now) {
                    alert("到期日期需大于当前时间");
                    return ;
                }
            }
            vm.order.orderOfferEntity=vm.orderOfferEntity;
            vm.order.commodityEntityList=vm.commodityEntityList;
            var url = vm.order.id == null ? "storage/order/save" : "storage/order/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.order),
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
                vm.orderOfferEntity = r.orderOfferEntity;
                if(r.commodityEntityList==null){
                    vm.commodityEntityList = [];
                }else{
                    vm.commodityEntityList = r.commodityEntityList;
                }
                $("#orderNum").prop("disabled",true);
            });
        },
        orderDetail: function (id) {
            $.get(baseURL + "storage/order/detail/" + id, function (r) {
                vm.order = r.order;
                vm.offer = r.offer;
                if (r.offer.unit==1){
                    vm.offer.unit='元/吨/天';
                }else if (r.offer.unit==2){
                    vm.offer.unit='元/千克/天';
                }
                // vm.orderCost = r.orderCost;
                if(r.commodityEntityList==null){
                    vm.commodityEntityList = [];
                }else{
                    vm.commodityEntityList = r.commodityEntityList;
                }
                vm.$nextTick(() => {
                    vm.initDateTime();
            })
            });
        },
        reload: function (event) {
            if (event != null) {
                location.reload();
            }
            vm.showList=true;
            vm.show1=false;
            vm.show2=false;
            vm.showAfterSales=false;
            vm.afterSDetail = false;
            vm.title = "";
            vm.orderOfferEntity={};
            vm.commodityEntityList=[];
            vm.afterSale={};
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("#addForm").RF();
        },
        back: function (event) {
            vm.showList=false;
            vm.show1=true;
            vm.show2=false;
            vm.showAfterSales = false;
            vm.afterSDetail = false;
            vm.orderDetail(vm.order.id);
        },
        //取消订单
        cancelOrder:function (id,passStatus) {
            var status;
            if (passStatus==0){//待确认
                status=3        //已取消
            }else if (passStatus==1) {//已接单
                status=4              //买家申请取消
            }else if (passStatus==2) {//已入库
                status=4               //买家申请取消
            }else if (passStatus==5) {//卖家申请取消
                status=3              //已取消
            }else if (passStatus==6) {//已出库
                status=4              //买家申请取消
            }
            confirm('确定要完结订单？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "storage/order/update",
                    contentType: "application/json",
                    data: JSON.stringify({id:id,passStatus:status}),
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
        getCompanys:function () {
            $.ajax({
                type: "POST",
                url: baseURL + "storage/order/getCompanys",
                contentType: "application/json",
                success: function (r) {
                    if(r.code==0){
                        var str = JSON.stringify(r.companys);
                        str = str.replace(/id/g, "value").replace(/companyName/g, "label");
                        vm.companys=JSON.parse(str);
                    }else {
                        alert(r.msg);
                    }
                }
            })
        },
        getOffers:function () {
            vm.orderOfferEntity={};
            vm.offers=[];
            if(vm.order.receiptMerchantId==null||vm.order.receiptMerchantId==''){
                alert("请先选择卖家公司");
                return;
            }
            console.log(vm.order);
            var merchantId = vm.order.receiptMerchantId;
            $.ajax({
                type: "POST",
                url: baseURL + "storage/offer/queryByCompanyId",
                data: vm.order.receiptMerchantId,
                success: function (r) {
                    if(r.code==0){
                        var str = JSON.stringify(r.list);
                        str = str.replace(/id/g, "value").replace(/title/g, "label");
                        vm.offers=JSON.parse(str);
                    }else {
                        alert(r.msg);
                    }
                }
            })
        },
        getOffer:function () {
            for (let obj of vm.offers) {
                if(obj.value==vm.orderOfferEntity.offerId){
                    vm.orderOfferEntity=obj;
                    vm.orderOfferEntity.offerId=obj.value;
                    break;
                }
            }
        },
        getPlaceData: function ()  {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success:function (r) {
                    if(r.code==0){
                        vm.placeData = r.data;
                    }
                }
            })
        },
        addGoods:function (type) {
            var data = {};
            if ('orderNum'==type) {
                vm.addTxBtn = true;
                var orderNumber = $("#orderNum").val();
                if (orderNumber == null || orderNumber == ''){
                    vm.commodityEntityList=[];
                    vm.addTxBtn = false;
                } else{
                    $.get(baseURL+'order/goodsorder/getListByOrderNumber/'+orderNumber,function (r) {
                        if (r.code==0){
                            vm.commodityEntityList=[];//初始化货物列表
                            if (r.good!=null){
                                for (let obj of r.good.detail) {
                                    /*for (let obj1 of obj.commoditys) {
                                        console.log("@@@@@@@@@@"+obj1.commodityName);
                                        console.log("××××"+obj1.commodityCountry);
                                        vm.commodityEntityList.push({
                                            containerNo:'',
                                            inspectionNo:'',
                                            commodityName:obj1.commodityName,
                                            commodityPrice:obj1.commodityPrice,
                                            commodityCount:obj1.commodityCount,
                                            commodityUnit:obj1.commodityUnit,
                                            commodityFactoryNumber:obj1.commodityFactoryNumber,
                                            commodityCountry:obj1.commodityCountry,
                                            productionDate:'',
                                            qualityTime:'',
                                            expirationDate:''
                                        });
                                    }*/
                                    var commodity = {
                                        containerNo: '',
                                        inspectionNo: '',
                                        commodityName: obj.goodsName,
                                        commodityCountry: obj.commodityCountry,
                                        commodityFactoryNumber: obj.commodityFactoryNumber,
                                        commodityPrice: obj.goodsPrice,
                                        commodityCount: obj.goodsCount,
                                        commodityUnit: obj.goodsUnit,
                                        commodityPacking: obj.commodityPacking,
                                        productionDate: '',
                                        qualityTime: '',
                                        expirationDate: ''
                                    };
                                  /*  if (r.good.goodsUnit == 1) {//柜
                                        commodity.commodityCount = (r.good.orderCount * obj.goodsCount).toFixed(2);
                                    } else if (r.good.goodsUnit == 2 || r.good.goodsUnit == 3) {//吨 千克
                                        commodity.commodityCount = r.good.orderCount
                                    }*/
                                    vm.commodityEntityList.push(commodity);
                                }
                                vm.$nextTick(() => {
                                    vm.initDateTime();
                                    $('.selectpicker').selectpicker('refresh');
                            })
                            } else{
                                vm.commodityEntityList=[];
                                alert("未查询到订单商品信息,请重新输入");
                            }
                        }
                    })
                }
            }
            else if('txtBtn'==type){
                vm.addTxBtn = false;
                $("#orderNum").prop("disabled",true);
                data = {
                    containerNo:'',
                    inspectionNo:'',
                    commodityName:'',
                    commodityCountry:vm.placeData[0].name,
                    commodityFactoryNumber:'',
                    commodityPrice:'',
                    commodityCount:'',
                    commodityUnit:vm.unitList[0].code,
                    commodityPacking: '',
                    productionDate:'',
                    qualityTime:'',
                    expirationDate:''
                };
                vm.commodityEntityList.push(data);
                this.$nextTick(() => {
                    vm.initDateTime();
                    $('.selectpicker').selectpicker('refresh');
            })
            }
        },
        removeGoods:function (index) {
            vm.commodityEntityList.splice(index,1);
            if(!vm.commodityEntityList.length>0){
                $("#orderNum").prop("disabled",false);
            }
        },
        initDateTime: function () {
            $('.datetimepicker').each(function (index,item) {
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
                meridiem:["AM","PM"]
            };
            $(".datetimepicker").each(function (index,item) {
                $(item).datetimepicker({
                    endDate: new Date(),
                    language: language,
                    autoclose:true,
                    startView:2,
                    minView:2,
                    todayBtn:true,
                    todayHighlight:true,
                    forceParse:true,

                }).on('hide', function (ev) {
                    var value = $(item).val();
                    vm.commodityEntityList[index].productionDate = value;
                    // debugger;
                    if(vm.commodityEntityList.length>0){
                        let obj=vm.commodityEntityList[index];
                        if(/^[1-9][0-9]{0,10}$/.test(obj.qualityTime)&&obj.productionDate!=null&&obj.productionDate!=''){
                            var date=new Date(obj.productionDate);
                            obj.expirationDate=formatDate(new Date(date.getTime()+ 1000*60*60*24*obj.qualityTime),"YY-MM-DD");
                        }
                    }
                });
            })
        },
        initIntTime: function () {
            $('#datetimepicker').datetimepicker('remove');
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
                meridiem:["AM","PM"]
            };
            $("#datetimepicker").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose:true,
                startView:2,
                minView:2,
                todayBtn:true,
                todayHighlight:true,
                forceParse:true,

            }).on('hide', function (ev) {
                var value = $("#datetimepicker").val();
                vm.order.intTime = value;
                $("#addForm").data('bootstrapValidator')
                    .updateStatus('intTime', 'NOT_VALIDATED',null)
                    .validateField('intTime');

            });
        },
        // addComplaint:function (orderNumber) {
        //     vm.complaint={
        //         orderId:orderNumber,
        //         orderType:3,
        //         reason:'',
        //         images:[]
        //     };
        //     $("#complaintModal").modal("show");
        // },
        addComplaint:function () {
            console.log("取得到吗？"+vm.order.orderNumber);
            vm.complaint={
                orderId:vm.order.orderNumber,
                orderType:3,
                reason:'',
                images:[]
            };
            $("#complaintModal").modal("show");
        },
        saveComplaint: function (event) {
            if(vm.complaint.reason==null||vm.complaint.reason==''||vm.complaint.reason.length>200){
                alert("投诉原因不能为空，且不能大于200个字");
                return;
            }
            if(vm.images.length== 0 && (vm.complaint.images == null || vm.complaint.images == 0)){
                alert("请上传图片");
                return;
            }
            if(vm.complaint.images==null){
                vm.complaint.images=[];
            };
            vm.complaint.images=vm.complaint.images.concat(vm.images);
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
        // complaintDeatil:function (orderNumber) {
        //     $("#complaintModal").modal("show");
        //     vm.complaint = {};
        //     vm.images=[];
        //     $.ajax({
        //         type: "POST",
        //         url: baseURL + "complaint/complaint/detail",
        //         contentType: "application/json",
        //         data: JSON.stringify({orderId:orderNumber,orderType:3}),
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 vm.complaint = r.complaint;
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        // },
        complaintDeatil:function () {
            $("#complaintModal").modal("show");
            vm.complaint = {};
            vm.images=[];
            $.ajax({
                type: "POST",
                url: baseURL + "complaint/complaint/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId:vm.order.orderNumber,orderType:3}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.complaint = r.data;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        validate2: function(){
            var bl = $('.afterForm').VF();//启用验证
            if (!bl) {
                return;
            }
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
                            vm.back();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },
        // asDetail:function (orderNumber) {
        //     vm.afterSale = {};
        //     vm.afterImages=[];
        //     $.ajax({
        //         type: "POST",
        //         url: baseURL + "afterSale/aftersale/detail",
        //         contentType: "application/json",
        //         data: JSON.stringify({orderId:orderNumber,orderType:3}),
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 vm.afterSale = r.afterSale;
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        //     vm.showList = false;
        //     vm.show1=false;
        //     vm.show2=false;
        //     vm.showAfterSales = false;
        //     vm.afterSDetail = true;
        // },
        asDetail:function () {
            vm.afterSale = {};
            vm.afterImages=[];
            $.ajax({
                type: "POST",
                url: baseURL + "afterSale/aftersale/detail",
                contentType: "application/json",
                data: JSON.stringify({orderId:vm.order.orderNumber,orderType:3}),
                success: function (r) {
                    if (r.code === 0) {
                        vm.afterSale = r.afterSale;
                    } else {
                        alert(r.msg);
                    }
                }
            });
            vm.showList = false;
            vm.show1=false;
            vm.show2=false;
            vm.showAfterSales = false;
            vm.afterSDetail = true;
        }


    },
    created:function () {
        this.getPlaceData();
    },
    watch:{
        commodityEntityList:{
            handler:function(newValue, oldValue) {
                console.log(newValue)
            },
            deep: true
        },
        "order.goodNumber":function (newValue,oldValue) {
            if((newValue==''||newValue==null)&&vm.addTxBtn){
                vm.commodityEntityList=[];
             //   debugger;
            }
        },
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

function change2(th) {
    if (th.value == '1') {
        $('#contractNumber').attr("disabled","disabled");
        // $('#addForm').bootstrapValidator('updateStatus', 'contractNumber', 'NOT_VALIDATED');
        // $("#addForm").data('bootstrapValidator').updateStatus('contractNumber', 'NOT_VALIDATED',null);
    } else {
        $('#contractNumber').removeAttr("disabled");
        // $('#addForm').data("bootstrapValidator").validateField('contractNumber');
    }
}
//自主录入的合同号 必须先新增合同
function checkCode(value){
   /* if (value == '' || value == null) {
        return;
    }
    $.ajax({
        type: "POST",
        url: baseURL + "storage/storagecontract/checkCode",
        contentType: "application/json",
        data: JSON.stringify({contractNumber:value,dataSource:2}),
        success: function (r) {
            if (r.code === 0) {
                if (r.storageContract == null) {
                    alert("请先前往创建仓储合同");
                }
            } else {
                alert(r.msg);
            }
        }
    });*/
    //限长
    if (isBlank(vm.order.contractNumber)){
        alert("合同编号不能为空！");
        vm.order.contractNumber = '';
        $("input[name='contractNumber']").val('');
        // $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
        return;
    }else if (vm.order.contractNumber.length > 30) {
        alert("合同编号长度必须在30之内！");
        vm.order.contractNumber = '';
        $("input[name='contractNumber']").val('');
        // $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
        return;
    }else if (/[\u4E00-\u9FA5]/g.test(vm.order.contractNumber)) {
        alert("合同编号请勿输入中文！");
        vm.order.contractNumber = '';
        $("input[name='contractNumber']").val('');
        return;
    }else {
        //检验合同编号是否已经存在
        $.ajaxSettings.async = false;
        $.get(baseURL + "storage/storagecontract/check",
            {contractNumber: vm.order.contractNumber}, function (r) {
                vm.contracts = r.contracts;
            });
        $.ajaxSettings.async = true;
        if (vm.contracts != null && vm.contracts.length > 0) {
            alert("该合同编号已经被占用！");
            vm.order.contractNumber = '';
            $("input[name='contractNumber']").val('');
            // $("#addForm").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
            return
        }
    }

}
function change(aa) {
    // debugger;
    let index = $(aa).attr("index");
    if(vm.commodityEntityList.length>0){
        let obj=vm.commodityEntityList[index];
        obj.qualityTime=aa.value;
        if(/^[1-9][0-9]{0,10}$/.test(obj.qualityTime)&&obj.productionDate!=null&&obj.productionDate!=''){
            var date=new Date(obj.productionDate);
            obj.expirationDate=formatDate(new Date(date.getTime()+ 1000*60*60*24*obj.qualityTime),"YY-MM-DD");
        }
    }
}