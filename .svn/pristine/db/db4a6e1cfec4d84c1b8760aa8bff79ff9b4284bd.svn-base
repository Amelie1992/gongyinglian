$(function () {
    vm.getReviewStatus();
    vm.initTime();
    //列表
    vm.initTable();
    //表单提交
    $("#addform").FM({
        fields: vm.fields,
        success: vm.addGoodsOrder
    })    //表单提交
    $("#complaintForm").FM({
        fields: vm.complaintFields,
        success: vm.saveComplaint
    })
    $("#afterSaleForm").FM({
        fields: vm.afterSalefields,
        success: vm.saveAftersale
    })
    $('input[type=radio][name=orderGoodsType]').change(function () {
        $("#addTable").bootstrapTable("removeAll");
    });
    $('#myModal').on('hide.bs.modal', function () {
        $("#addGoodTable").bootstrapTable("removeAll");
        vm.showGoodParams = {};
    })
});

function change2(th) {
    if (th.value == '1') {
        $('#contractNumber').attr("disabled", true);
    } else {
        $('#contractNumber').removeAttr("disabled");
        vm.goodsOrder.agreementId = '';
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        addButtonShow: true,
        addOrder: false,
        merchantSelect: true,
        transactionShow: false,
        companySelectId: '',
        showList: true,
        aftersaleShow: false,
        maxSellNum: '',//买的最大数
        complaintShow: true,
        toShow: false,
        title: null,
        kdnData: {
            serviceType: "B",
            expCode: "",
            expNo: "",
            showType: "normal",
            container: "shipElement"
        },
        //订单对象
        images: [],
        //审核显示状态
        reviewStatus: 0,
        //审核对象
        goodsorderpre: {},
        aftersaleImages: [],
        goodsOrder: {
            agreementId: '系统自动生成'
        },
        params: {
            orderStatus: '',
            purchaserCompanyId: '0',
            owner: '1'

        },
        merchants: [],
        accreditCompanys: [],
        companyStaffs: [],
        companyStaff: {},
        merchantCompany: {},
        complaint: {},//投诉
        afterSale: {},//投诉
        transactionManners: ['CFR', 'CIF', 'CPT', 'CIP', 'DAF', 'DES', 'DEQ', 'DDU', 'DDP', 'FOB', 'FCA', 'FAS', 'EXW'],
        //, '其他（自定义订单配置）'
        paymentMethods: ['余额支付', '银联支付', '公司转账'],
        transactionModes: ['一次性支付', '分期支付', '其他（账期）'],
        orderStatus: {
            pre: '待审核',
            ep: '审核通过',
            af: '审核失败',
            tbc: '待确认',
            ctom: '待卖家取消',
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
            {value: 'ctom', label: '待卖家取消'},
            {value: 'cto', label: '订单取消'},
            {value: 'tbp', label: '待支付'},
            {value: 'tbd', label: '待安排'},
            {value: 'tbpu', label: '待提货'},
            {value: 'pr', label: '待收货'},
            {value: 'tc', label: '交易完成'},
            {value: 'agr', label: '代理'},
        ],
        serviceTypeList: ['退货', '换货', '索赔'],
        refundFormList: ['线上支付', '线下转账', '其他'],
        reasonList: ['物品损坏', '质量不合格', '产品型号错误', '其他'],
        status: ['待处理', '已处理'],
        resultList: ['通过', '不通过'],
        showGoodParams: {},
        addGoodColumns: [],
        //已经添加过的id
        addids: [],
        productScs: [],
        addressList: [],
        address: {},
        isAgentValue: true,
        storageInfo: false,
        depot: {},
        address: {},
        addGoodsCount: {},
        addGoodsList: [],
        priceVersionShow: true,
        offer: {},
        goodsOrderShip: {},
//验证字段
        fields: {
            orderGoodsType: {
                validators: {
                    notEmpty: {
                        message: '货物类型不能为空'
                    },
                },
            }, isAgent: {
                validators: {
                    notEmpty: {
                        message: '是否代理不能为空'
                    },
                },
            }, agentOrderNumber: {
                validators: {
                    notEmpty: {
                        message: '代理单号不能为空'
                    }, stringLength: {
                        max: 50,
                        message: '代理单号须少于50个字符'
                    }
                }
            }, consigneeName: {
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '联系人须少于20个字符'
                    }
                },
            },
            consigneePhone: {
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    }, regexp: {
                        regexp: /^1[3456789]\d{9}$/,
                        message: '请正确输入联系电话'
                    }
                },
            }, consigneeAddress: {
                validators: {
                    notEmpty: {
                        message: '详细地址不能为空'
                    }, stringLength: {
                        max: 50,
                        message: '详细地址须不大于50字符'
                    }
                },
            }, buyerBankCard: {
                validators: {
                    notEmpty: {
                        message: '银行卡号不能为空'
                    }, regexp: {
                        regexp: /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/,
                        message: '银行卡号不正确'
                    }
                },
            }, documentsRequired: {
                validators: {
                    stringLength: {
                        max: 50,
                        message: '单据要求须少于50个字符'
                    }
                },
            }, destination: {
                validators: {
                    notEmpty: {
                        message: '目的口岸不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '目的口岸须少于20个字符'
                    }
                },
            },
            transactionMode: {
                validators: {
                    notEmpty: {
                        message: '付款方式不能为空'
                    },
                },
            }, downPayment: {
                validators: {
                    notEmpty: {
                        message: '首付金额不能为空'
                    }, regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '首付的整数最多9位，小数最多2位'
                    }

                },
            }, prePickUpTime: {
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '预提货时间不能为空'
                    },
                    callback: {
                        message: '预提货时间不能小于当前时间',
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
            }, sellerId: {
                validators: {
                    notEmpty: {
                        message: '商家不能为空'
                    },
                },
            }, time1: {
                validators: {
                    notEmpty: {
                        message: '提货时间不能为空'
                    },
                },
            }, place1: {
                validators: {
                    notEmpty: {
                        message: '交货地点不能为空'
                    },
                },
            }, productionDate: {
                validators: {
                    notEmpty: {
                        message: '生产日期不能为空'
                    },
                },
            }, shelfLife: {
                validators: {
                    notEmpty: {
                        message: '保质期不能为空'
                    },
                },
            }, paymentTerm: {
                validators: {
                    notEmpty: {
                        message: '付款条件不能为空'
                    },
                },
            }, time2: {
                validators: {
                    notEmpty: {
                        message: '装运时间不能为空'
                    },
                },
            }, place2: {
                validators: {
                    notEmpty: {
                        message: '装运口岸不能为空'
                    },
                },
            }, clause: {
                validators: {
                    notEmpty: {
                        message: '溢短装条款不能为空'
                    },
                },
            }, transactionManner: {
                validators: {
                    notEmpty: {
                        message: '成交方式不能为空'
                    },
                },
            }, orderCount: {
                validators: {
                    notEmpty: {
                        message: '购买数量不能为空'
                    }, regexp: {
                        regexp: /^[1-9]\d{0,9}$/,
                        message: '购买数量为小于11位的正整数'
                    }
                },
            }, goodsUnit: {
                validators: {
                    notEmpty: {
                        message: '购买数量的单位不能为空'
                    },
                },
            },
            actualPayment: {
                validators: {
                    notEmpty: {
                        message: '总价不能为空'
                    }, regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '总价的整数最多9位，小数最多2位'
                    }
                },
            }, currency: {
                validators: {
                    notEmpty: {
                        message: '总价的单位不能为空'
                    },
                },
            },
            remarks: {
                validators: {
                    stringLength: {max: 100, message: '备注须少于100个字符'},
                },
            }
        },
        complaintFields: {
            reason: {
                message: '投诉原因验证失败',
                validators: {
                    notEmpty: {
                        message: '投诉原因不能为空'
                    }, stringLength: {
                        max: 200,
                        message: '投诉原因长度不能超过200个字符'
                    }
                },
            },
        },
        afterSalefields: {
            serviceType: {
                message: '服务类型验证失败',
                validators: {
                    notEmpty: {
                        message: '服务类型不能为空'
                    },
                },
            }, refundForm: {
                message: '退款方式验证失败',
                validators: {
                    notEmpty: {
                        message: '退款方式不能为空'
                    },
                },
            }, quantity: {
                message: '售后数量验证失败',
                validators: {
                    notEmpty: {
                        message: '售后数量不能为空'
                    }, /* regexp: {
                        regexp: /^[1-9]\d{0,9}$/,
                        message: '请输入小于11位的正整数'
                    },*/
                    callback: {
                        message: '售后数量为不大于购买数量的正整数',
                        callback: function (value, validator, $field) {
                            var num = vm.afterSale.number;//获得另一个的值
                            if (/(^[1-9]\d{0,9}$)/.test(value) && value <= num) {
                                return true;
                            }
                            return false;
                        }
                    }
                },
            }, reason: {
                message: '原因验证失败',
                validators: {
                    notEmpty: {
                        message: '原因不能为空'
                    },
                },
            }, description: {
                message: '问题描述验证失败',
                validators: {
                    notEmpty: {
                        message: '问题描述不能为空'
                    }, stringLength: {
                        max: 200,
                        message: '问题描述须少于200个字符'
                    }
                }
            }
        },
        afterSaleTotal: 0,
        contractRadio: '',
        accreditOrder: '',
        accreditRead: true,
        paymentShow: true
    },
    methods: {
        //初始化列表
        initTable: function () {
            //初始化首页列表
            $("#table").bootstrapTable("destroy")
            $("#table").BT({
                url: baseURL + 'order/goodsorder/list',
                columns: [
                    {checkbox: true},
                    {
                        title: vm.$t("OrderNumber"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderNumber',
                        width: '13%'
                    },
                    /*{title: '商家id', field: 'sellerId'},*/
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
                            // return '<span title="' + row.sellerName + '" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + row.sellerName + '</span>';
                        }
                    },
                    /*{
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
                        title: vm.$t("CommodityInformation"),
                        valign: 'middle',
                        align: 'center',
                        field: 'goodsInfo',
                        width: '17%',
                        formatter: function (value, row, index) {
                            /*var detail = row.detail;
                            if (!detail) {
                                detail = {};
                                detail.goodsName = null;
                                detail.goodsUnit = null;
                            }
                            var src = detail[0].goodsImageUrl;
                            var str;
                            if (row.goodsCsc == 0) {
                                str = '<div class="row" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                                    '<div class="col-sm-5">' +
                                    '<img class="thumbnail" style="background-color:#f9f9f9" src="" load-src="' + src + '" width="100px" alt="商品图片" onerror="vm.imgExists(this)">' +
                                    '</div>' +
                                    '<div class="col-sm-7">' +
                                    '<div title="' + detail[0].goodsName + '">商品名称:' + detail[0].goodsName.substring(0, 5) + '</div>' +
                                    // '<div>规格:' + detail[0].goodsUnit + '</div>' +
                                    '</div>' +
                                    '</div>';
                            } else {
                                str = '<div class="row" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                                    '<div class="col-sm-6">' +
                                    '<img class="thumbnail" style="background-color:#f9f9f9" src="https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=4b22ec31ddc8a786a12a4c0e5708c9c7/5bafa40f4bfbfbedc5597ab474f0f736aec31ffc.jpg" width="100px" alt="商品图片">' +
                                    '</div>' +
                                    '<div class="col-sm-6">' +
                                    '<div>商品名称:拼柜</div>' +
                                    '</div>' +
                                    '</div>';
                            }
                            return str;*/
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
                    // {
                    //     title: vm.$t("UnitPrice"),
                    //     valign: 'middle',
                    //     align: 'center',
                    //     // width: '5%',
                    //     formatter: function (value, row, index) {
                    //         var detail = row.detail;
                    //         if (!detail) {
                    //             detail = {};
                    //             detail.goodsName = null;
                    //             detail.goodsUnit = null;
                    //         }
                    //         var str;
                    //         // if (row.goodsCsc == 0) {
                    //         str = detail[0].goodsTotalPrice;
                    //         // } else {
                    //         // str = '0'
                    //         // }
                    //         return '<span>￥' + str + '</span>';
                    //     }
                    // },
                    {
                        title: vm.$t("PurchaseQuantitie"),
                        valign: 'middle',
                        align: 'center',
                        // width: '4%',
                        formatter: function (value, row) {
                            /*var detail = row.detail;
                          if (!detail) {
                              detail = {};
                              detail.goodsName = null;
                              detail.goodsUnit = null;
                          }
                          var str;
                         if (row.goodsCsc == 0) {
                            // str = detail[0].goodsCount + "&nbsp;" + detail[0].unitName;
                            str = detail[0].goodsCount;
                             } else {
                                 str = ''
                             }*/
                            var unit;
                            if (row.goodsUnit == 1) {
                                unit = '柜';
                            } else if (row.goodsUnit == 2) {
                                unit = '吨';
                            } else if (row.goodsUnit == 3) {
                                unit = '千克';
                            }
                            return row.orderCount + '&nbsp;&nbsp;' + unit;
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
                                return '<span>' + str + '&nbsp;&nbsp;' + '元</span>';
                            } else if (row.currency == 2) {
                                return '<span>' + str + '&nbsp;&nbsp;' + '美元</span>';
                            }
                        }
                    },
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
                                    status = '买家取消';
                                }
                                if (row.statusOwner == 1) {
                                    status = '卖家取消';
                                }
                            } else if ('ctom' == row.orderStatus) {
                                status = '待卖家取消';
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
                        width: '20%',
                        formatter: function (value, row, index) {
                            var div = document.createElement('div');
                            var getInfo = document.createElement('button');
                            getInfo.setAttribute('class', 'btn btn-primary btn-sm getInfo');
                            getInfo.setAttribute('style', 'margin-left:5px');
                            getInfo.innerText = '查看详情'
                            var cancel = document.createElement('button');
                            cancel.setAttribute('class', 'btn btn-primary btn-sm cancel');
                            cancel.setAttribute('style', 'margin-left:5px');
                            cancel.innerText = '结束订单'
                            var cancelb = document.createElement('button');
                            cancelb.setAttribute('class', 'btn btn-primary btn-sm cancelb');
                            cancelb.setAttribute('style', 'margin-left:5px');
                            cancelb.innerText = '取消订单'
                            var payment = document.createElement('button');
                            payment.setAttribute('class', 'btn btn-primary btn-sm payment');
                            payment.setAttribute('style', 'margin-left:5px');
                            payment.innerText = '立即付款'
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
                            var accredit = document.createElement('button');
                            accredit.setAttribute('class', 'btn btn-primary btn-sm accredit');
                            accredit.setAttribute('style', 'margin-left:5px');
                            accredit.innerText = '授权';
                            var getAccredit = document.createElement('button');
                            getAccredit.setAttribute('class', 'btn btn-primary btn-sm getAccredit');
                            getAccredit.setAttribute('style', 'margin-left:5px');
                            getAccredit.innerText = '查看授权';
                            switch (row.orderStatus) {
                                /*case 'agr':
                                    div.appendChild(getInfo);
                                    break;*/
                                case  'tc':
                                    div.appendChild(getInfo);
                                    break;
                                case 'ctom':
                                    div.appendChild(getInfo);
                                    break;
                                case 'ctob':
                                    div.appendChild(getInfo);
                                    cancel.innerText = "确认结束";
                                    div.appendChild(cancel);
                                    break;
                                case 'cto' :
                                    div.appendChild(getInfo);
                                    break;
                                case 'pre':
                                    div.appendChild(getInfo);
                                    if (hasPermission('order:goodsorder:review')) {
                                        div.appendChild(pre);
                                    }
                                    break;
                                case 'af':
                                    div.appendChild(getInfo);
                                    div.appendChild(getPre);
                                    //div.appendChild(update);
                                    break;
                                case 'tbc':
                                    div.appendChild(update);
                                    div.appendChild(getInfo);
                                    div.appendChild(cancelb);
                                    /* if(row.authorizesId == null || row.authorizesId == ""){
                                         div.appendChild(accredit);
                                     }else{
                                         div.appendChild(getAccredit);
                                     }*/
                                    break;
                                case 'tbp':
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    if (row.isPayment == 1) {

                                    } else {
                                        div.appendChild(payment);
                                    }
                                    if (row.authorizesId == null || row.authorizesId == "") {
                                        div.appendChild(accredit);
                                    } else {
                                        div.appendChild(getAccredit);
                                    }
                                    break;
                                case 'tbpu':
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    div.appendChild(ship);
                                    if (row.authorizesId == null || row.authorizesId == "") {
                                        div.appendChild(accredit);
                                    } else {
                                        div.appendChild(getAccredit);
                                    }
                                    break;
                                case 'pr':
                                    div.appendChild(getInfo);
                                    /*div.appendChild(showShip);*/
                                    div.appendChild(cancel);
                                    div.appendChild(receipt);
                                    if (row.authorizesId == null || row.authorizesId == "") {
                                        div.appendChild(accredit);
                                    } else {
                                        div.appendChild(getAccredit);
                                    }
                                    break;
                                case 'ap':
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    if (row.distributionMode == 1) {
                                        div.appendChild(ship);
                                    }
                                    if (row.authorizesId == null || row.authorizesId == "") {
                                        div.appendChild(accredit);
                                    } else {
                                        div.appendChild(getAccredit);
                                    }
                                    break;
                                default:
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    break;
                            }
                            return div.innerHTML;
                        },
                        events: {
                            //取消订单
                            'click .cancelb': function (el, value, row, index) {
                                var status = row.orderStatus;
                                if (status == 'tbc') {//接单前取消
                                    row.orderStatus = 'cto';
                                    row.cancelFlag = 1;
                                } else if (status == 'ctob') {
                                    row.orderStatus = 'cto';
                                } else {
                                    row.orderStatus = 'ctom';
                                }
                                // vm.goodsOrder.depot = row.depot;
                                vm.goodsOrder.detail = row.detail;
                                row.statusOwner = 0;
                                row.statusCount = -1;
                                confirm('确定要完结订单？', function () {
                                    vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, row.statusCount, row.cancelFlag);
                                })
                            },
                            //协议取消
                            'click .cancel': function (el, value, row, index) {
                                var status = row.orderStatus;
                                if (status == 'tbc') {//接单前取消
                                    row.orderStatus = 'cto';
                                    row.cancelFlag = 1;
                                } else if (status == 'ctob') {
                                    row.orderStatus = 'cto';
                                } else {
                                    row.orderStatus = 'ctom';
                                }
                                // vm.goodsOrder.depot = row.depot;
                                vm.goodsOrder.detail = row.detail;
                                row.statusOwner = 0;
                                row.statusCount = -1;
                                confirm('确定要完结订单？', function () {
                                    vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, row.statusCount, row.cancelFlag);
                                })
                            },
                            //查看详情
                            'click .getInfo': function (event, value, row, index) {
                                vm.getInfo(row.orderId);
                            },
                            'click .showShip': function (el, value, row, index) {
                                vm.toShow = true;
                                vm.getInfo(row.orderId);
                            },
                            //付款
                            'click .payment': function (el, value, row, index) {
                                /* if (row.distributionMode == 0) {
                                     row.orderStatus = 'tbd';
                                 } else {
                                     row.orderStatus = 'tbpu';
                                 }
                                 vm.goodsOrder.orderNumber = row.orderNumber;
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
                                vm.goodsOrder.sellerId = row.sellerId;
                                vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));
                            },
                            //提货
                            'click .ship': function (el, value, row, index) {
                                row.orderStatus = 'tc';
                                row.statusOwner = 2;
                                vm.goodsOrder.depot = row.depot;
                                vm.goodsOrder.detail = row.detail;
                                vm.goodsOrder.sellerId = row.sellerId;
                                vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));
                            },
                            //修改
                            'click .update': function (el, value, row, index) {
                                /*    vm.companySelectId = row.sellerId;
                                  vm.getMerchants();
                                  vm.merchantsChange(vm.companySelectId);//刷新货物列表*/
                                vm.update(row.orderId);
                            },
                            //平台审核
                            'click .pre': function (el, value, row, index) {
                                vm.goodsorderpre.orderId = row.orderNumber;
                                vm.goodsOrder.depot = row.depot;
                                vm.goodsOrder.detail = row.detail;
                                $("#preModal").modal('show');
                            },
                            //审核失败以后可以查看审核信息
                            'click .getPre': function (el, value, row, index) {
                                vm.goodsorderpre.orderId = row.orderNumber;
                                vm.getPre(row.orderNumber);
                                $("#preModal").modal('show');
                            },
                            //授权
                            'click .accredit': function (el, value, row, index) {
                                vm.merchantCompany.companyId = '';
                                vm.companyStaffs = [];
                                vm.companyStaff.userId = '';
                                vm.goodsOrder.isPayment = '';
                                vm.getAccreditCompany();
                                vm.accreditOrder = row.orderNumber;
                                vm.accreditRead = false;
                                if ("tbc" == row.orderStatus || "tbp" == row.orderStatus) {
                                    vm.paymentShow = true;
                                }else {
                                    vm.paymentShow = false;
                                }
                                $("#accredit").modal('show');
                            },
                            //查看授权
                            'click .getAccredit': function (el, value, row, index) {
                                vm.getAccreditCompany();
                                vm.accreditOrder = row.orderNumber;
                                vm.getAccredit();
                                vm.accreditRead = true;
                                if ("tbc" == row.orderStatus || "tbp" == row.orderStatus) {
                                    vm.paymentShow = true;
                                }else {
                                    vm.paymentShow = false;
                                }
                                vm.goodsOrder.orderStatus = row.orderStatus;
                                $("#accredit").modal('show');
                            }
                        }
                    },
                ],
                //条件查询
                queryParams: vm.params,
                onLoadSuccess: function () {
                    setTimeout(function () {
                        $('#table').bootstrapTable('resetView');
                    }, 0)
                }
            });
            //详情页货物列表--带柜的
            $("#contenTable").bootstrapTable("destroy")
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
                            str =
                                /*'<div class="row container">' +*/
                                /*'<div class="col-sm-12 text-center">' +
                                '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +*/
                              /*  '<div class="col-sm-2 text-center" style="margin-top: 10px;">' +*/
                                '<div>品名:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '<div>包装:' + packing + '</div>'
                               /* +'</div>' +
                                '</div>';*/
                            return str;
                        }
                    },
                    {title: vm.$t('place'), field: 'commodityCountry', valign: 'middle', align: 'center', width: '10%'},
                    {
                        title: vm.$t('ProducerOrNumber'),
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
                            // return row.goodsCount;
                        }
                    },
                    {
                        title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var total;
                            if (vm.goodsOrder.goodsUnit == 1) {
                                total = (value * row.goodsCount * vm.goodsOrder.orderCount).toFixed(2);
                            } else if (vm.goodsOrder.goodsUnit == 2 || vm.goodsOrder.goodsUnit == 3) {
                                total = (value * vm.goodsOrder.orderCount).toFixed(2);
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
            //详情页货物列表--不带柜的
            $("#contenTable2").bootstrapTable("destroy")
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
                            str =
                               /* '<div class="row container">' +*/
                                /*'<div class="col-sm-12 text-center">' +
                                '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +*/
                               /* '<div class="col-sm-4 text-center" style="margin-top: 10px;">' +*/
                                '<div>品名:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '<div>包装:' + packing + '</div>'
                                /*+'</div>' +
                                '</div>';*/
                            return str;
                        }
                    },
                    {title: vm.$t('place'), field: 'commodityCountry', valign: 'middle', align: 'center', width: '10%'},
                    {
                        title: vm.$t('ProducerOrNumber'),
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
                    /* {
                         title: vm.$t("Weight"), valign: 'middle', align: 'center', field: 'goodsCount',
                         formatter: function (value, row, index) {
                             if (row.goodsUnit == 1) {
                                 return value + "&nbsp;" + "吨";
                             } else if (row.goodsUnit == 2) {
                                 return value + "&nbsp;" + "千克";
                             }
                         }
                     },*/
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
                            // return row.goodsCount;
                        }
                    },
                    {
                        title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var total;
                            if (vm.goodsOrder.goodsUnit == 1) {
                                total = (value * row.goodsCount * vm.goodsOrder.orderCount).toFixed(2);
                            } else if (vm.goodsOrder.goodsUnit == 2 || vm.goodsOrder.goodsUnit == 3) {
                                total = (value * vm.goodsOrder.orderCount).toFixed(2);
                            }
                            if (vm.goodsOrder.currency == 1) {
                                return total + "&nbsp;" + "元";
                            } else if (vm.goodsOrder.currency == 2) {
                                return total + "&nbsp;" + "美元";
                            }
                        }
                    },

                ]
            }),
            //初始化添加以后的货物列表
            $("#addTable").bootstrapTable("destroy")
            $("#addTable").BT({
                height: 260,
                data: vm.addGoods,
                // uniqueId: 'id',
                columns: [
                    {
                        title: vm.$t('ProductName'),
                        field: 'goodsName',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {title: vm.$t('place'), field: 'commodityCountry', valign: 'middle', align: 'center', width: '10%'},
                    {
                        title: vm.$t('ProducerOrNumber'),
                        field: 'commodityFactoryNumber',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: vm.$t('UnitPrice'),
                        field: 'goodsPrice',
                        valign: 'middle',
                        align: 'center',
                        width: '20%',
                        formatter: function (value, row, index) {
                            if (row.priceUnit == 1) {
                                return value + '&nbsp;元/吨';
                            } else if (row.priceUnit == 2) {
                                return value + '&nbsp;元/千克';
                            } else if (row.priceUnit == 3) {
                                return value + '&nbsp;美元/吨';
                            } else if (row.priceUnit == 4) {
                                return value + '&nbsp;美元/千克';
                            }
                        }
                    },
                    {
                        title: vm.$t('Weight'),
                        field: 'goodsCount',
                        valign: 'middle',
                        align: 'center',
                        width: '20%',
                        formatter: function (value, row, index) {
                            if (row.goodsUnit == 1) {
                                return value + '&nbsp;吨';
                            } else if (row.goodsUnit == 2) {
                                return value + '&nbsp;千克';
                            }
                        }
                    },
                    {title: vm.$t('pack'), field: 'commodityPacking', valign: 'middle', align: 'center', width: '10%'},
                    /* {
                         title: vm.$t('Stock'), field: 'stock', valign: 'middle', align: 'center', width: '10%',
                         formatter: function (value, row, index) {
                             if (row.goodsUnit == 1) {
                                 return value + '&nbsp;柜';
                             } else if (row.goodsUnit == 2) {
                                 return value + '&nbsp;吨';
                             } else if (row.goodsUnit == 3) {
                                 return value + '&nbsp;千克';
                             }
                         }
                     },*/
                    /*{
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
                        title: vm.$t("unit"),
                        valign: 'middle',
                        align: 'center',
                        field: 'currency',
                        formatter: function (value, row, index) {
                            if (value == 1) {
                                return "元";
                            } else if (value == 2) {
                                return "美元";
                            }
                        }
                    },
                    {
                        title: vm.$t("num") + '/' + vm.$t("Piece"),
                        valign: 'middle',
                        align: 'center',
                        field: 'goodsCount',
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
                                //if (parseInt(v) > vm.maxSellNum) return '数量不能大于'+vm.maxSellNum;
                                //vm.goodsOrder.goodsCount = v;

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
                        title: vm.$t("unit"),
                        valign: 'middle',
                        align: 'center',
                        field: 'currency',
                        formatter: function (value, row, index) {
                            if (value == 1) {
                                return "元";
                            } else if (value == 2) {
                                return "美元";
                            }
                        }
                    },*/
                    {
                        title: vm.$t("chaozuo"), valign: 'middle', align: 'center', width: '10%',
                        formatter: function (value, row, index) {
                            var div = document.createElement('div');
                            var a = document.createElement('a');
                            a.setAttribute('class', 'btn btn-primary btn-sm delete');
                            a.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>删除'
                            div.append(a)
                            if (vm.addButtonShow) {
                                return div.innerHTML;
                            } else {
                                return '';
                            }

                        },
                        events: {
                            'click .delete': function (el, value, row, index) {
                                var datas = $("#addTable").bootstrapTable("getData");
                                /*if (row.oldGoodsNumber != null) {
                                    vm.addids.remove(datas[index].oldGoodsNumber)
                                    vm.productScs.remove(datas[index].goodsCsc);
                                } else {
                                    vm.addids.remove(datas[index].goodsNumber)
                                    vm.productScs.remove(datas[index].goodsCsc);
                                }*/
                                vm.addids.remove(datas[index].id);
                                // $('#addTable').bootstrapTable('removeByUniqueId', datas[index].id);
                                datas.splice(datas.indexOf(index), 1);
                                $("#addTable").bootstrapTable("load", {
                                    rows: datas,
                                    total: datas == null ? 0 : datas.length
                                });
                                $("#addTable").bootstrapTable("refresh");
                                $('#addTable').bootstrapTable('resetView');
                                vm.offer = {};
                                vm.goodsOrder.orderCount = null;
                                vm.goodsOrder.actualPayment = null;
                                vm.goodsOrder.currency = null;
                                $("#addform").data("bootstrapValidator").updateStatus('consigneeName', 'NOT_VALIDATED').validateField('consigneeName');
                            }
                        }
                    },
                ],
                /*  onEditableSave: function (field, row, oldValue, $el) {
                      if (field == 'goodsCount') {
                          vm.addGoodsList.forEach(function (item) {
                              if (row.oldGoodsNumber == null || row.oldGoodsNumber == "") {
                                  row.oldGoodsNumber = row.goodsNumber;
                              }
                              if (item.goodsNumbers == row.oldGoodsNumber) {
                                  if (Number(row.goodsCount) > Number(item.count)) {
                                      alert("数量不能大于" + item.count);
                                      row.goodsCount = 1;
                                      vm.goodsOrder.actualPayment = 0;
                                  }
                                  if (!/(^[1-9](\d{0,10})$)/.test(row.goodsCount)) {
                                      alert("购买数量为小于11位的正整数");
                                      row.goodsCount = 1;
                                      vm.goodsOrder.actualPayment = 0;
                                  }
                              }

                          });
                          row.totalPrice = row.goodsCount * row.goodsPromotionPrice;
                          var money = 0;
                          var datas = $("#addTable").bootstrapTable("getData");
                          datas.forEach(function (item) {
                              if (item.goodsCount != null) {
                                  //订单总价
                                  money = money + item.totalPrice;
                              }
                          });
                          //订单总价
                          vm.goodsOrder.actualPayment = money;
                          //币种
                          vm.goodsOrder.currency = row.currency;
                          // $("#actualPayment").val(vm.goodsOrder.actualPayment);
                          // $("#currency").val(vm.goodsOrder.currency);
                          // $("#actualPayment").attr("value",vm.goodsOrder.actualPayment);
                          // $("#currency").attr("value",vm.goodsOrder.currency);
                          document.getElementById("actualPayment").value = vm.goodsOrder.actualPayment;
                          document.getElementById("currency").value = vm.goodsOrder.currency;
                          var index = $el.parent().parents('tr').data('index');
                          $("#addTable").bootstrapTable('updateRow', index, row);

                      }
                  }*/
            })
            $("#addTable2").bootstrapTable("destroy")
            $("#addTable2").BT({
                height: 260,
                data: vm.addGoods,
                columns: [
                    {
                        title: vm.$t('ProductName'),
                        field: 'goodsName',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {title: vm.$t('place'), field: 'commodityCountry', valign: 'middle', align: 'center', width: '10%'},
                    {
                        title: vm.$t('ProducerOrNumber'),
                        field: 'commodityFactoryNumber',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: vm.$t('UnitPrice'),
                        field: 'goodsPrice',
                        valign: 'middle',
                        align: 'center',
                        width: '20%',
                        formatter: function (value, row, index) {
                            if (row.priceUnit == 1) {
                                return value + '&nbsp;元/吨';
                            } else if (row.priceUnit == 2) {
                                return value + '&nbsp;元/千克';
                            } else if (row.priceUnit == 3) {
                                return value + '&nbsp;美元/吨';
                            } else if (row.priceUnit == 4) {
                                return value + '&nbsp;美元/千克';
                            }
                        }
                    },
                    {
                        title: vm.$t('Weight'),
                        field: 'goodsCount',
                        valign: 'middle',
                        align: 'center',
                        width: '20%',
                        formatter: function (value, row, index) {
                            if (row.goodsUnit == 1) {
                                return value + '&nbsp;吨';
                            } else if (row.goodsUnit == 2) {
                                return value + '&nbsp;千克';
                            }
                        }
                    },
                    {title: vm.$t('pack'), field: 'commodityPacking', valign: 'middle', align: 'center', width: '10%'}
                ],
            });
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
                    {title: vm.$t("ProductName"), field: 'goodsName'},
                    {title: vm.$t("place"), field: 'commodityCountry'},
                    {title: vm.$t("ProducerOrNumber"), field: 'commodityFactoryNumber'},
                    {
                        title: vm.$t("weight"),
                        field: 'number',
                        formatter: function (value, row, index) {
                            var str = '';
                            /*  if (row.orderGoodsType == 0) {
                                  return row.goodsCount * row.number + "&nbsp柜";
                              } else if (row.unit == 2) {
                                  return row.number + "吨";
                              } else {
                                  return row.number + "千克";
                              }*/
                            if (row.unit == 1) {
                                str = value + "&nbsp;&nbsp;吨"
                            } else if (row.unit == 2) {
                                str = value + "&nbsp;&nbsp;千克"
                            }
                            return str;
                        }
                    },

                    {title: vm.$t("pack"), field: 'commodityPacking'},
                    /*  {title: vm.$t("UnitPrice"), field: 'unitPrice',visible: false},
                      {title: vm.$t("num") + '/' + vm.$t("Piece"), field: 'number',visible: false},
                      {title: vm.$t("TotalPrice"), field: 'totalPrice',visible: false},*/
                    {
                        title: vm.$t("OperationNumber"), field: 'afterSaleNumber',
                        editable: {
                            type: 'text',
                            width: '10%',
                            title: '售后重量',
                            emptytext: '售后重量',
                            defaultValue: '1',
                            validate: function (v) {
                                if (!v) return '请输入要售后的重量';
                                var reg = /^[1-9]\d{0,9}$/
                                if (!reg.test(v)) return '请输入小于11位的正整数';
                                // if (v > row.number) return '售后重量不得大于订单总重量';
                            },
                        },
                    },
                    {
                        title: vm.$t("unit"), field: 'unit', formatter: function (value, row, index) {
                            if (value == 1) {
                                return "吨"
                            } else if (value == 2) {
                                return "千克";
                            }
                        }
                    },

                ], onEditableSave: function (field, row, oldValue, $el) {
                    /*if (field == 'count') {
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
                                alert("操作重量不可以超过货物总重量");
                                row.count = 1;
                                $("#goodsInfo").bootstrapTable('updateRow', {index: row.rowId, row: row})
                                return;
                            }
                        }
                    }*/
                    if (field == 'afterSaleNumber') {
                        if (row.afterSaleNumber > row.number) {
                            alert("售后重量不可以超过货物总重量");
                            row.afterSaleNumber = 1;
                            $("#goodsInfo").bootstrapTable('updateRow', {index: row.rowId, row: row})
                            return;
                        }
                    }
                }
            });
            //初始化货物添加列表
            $("#addGoodTable").bootstrapTable("destroy")
            $("#addGoodTable").BT({
                url: baseURL + 'offer/goodsoffer/list',
                height: 500,
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
                    {
                        title: vm.$t("Weight"), field: 'commodityCount', formatter: function (value, row) {
                            var str = "";
                            if (row.commodityUnit == '1') {
                                str = '吨';
                            } else {
                                str = '千克';
                            }
                            return row.commodityCount + "&nbsp;" + str;
                        }
                    },
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
                    // {title: vm.$t("title"), field: 'addresshear'},
                    {title: vm.$t("contact"), field: 'consignee', width: '20%'},
                    {title: vm.$t("phone"), field: 'phonenumber', width: '20%'},
                    // {title: vm.$t("ReceivingAddress"), field: 'region'},
                    {
                        title: vm.$t("Area"), field: 'detailedaddress', width: '60%',
                        formatter: function (value, row, index) {
                            return value + '&nbsp;&nbsp;&nbsp;' + row.specificaddress;
                        }
                    }
                ],
            });
            //银行卡号
            $("#bankCardTab").bootstrapTable("destroy");
            $("#bankCardTab").BT({
                url: baseURL + "bill/bankcard/list",
                singleSelect: true,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("RealName"), field: 'name', width: '20%'},
                    {title: vm.$t("AffiliatedBank"), field: 'cardName', width: '20%'},
                    {title: vm.$t("BankCardNumber"), field: 'cardNo', width: '60%'}
                ],
            });
        },
        initTime: function () {
            $('#prePickUpTime').datetimepicker('remove');
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
            $("#prePickUpTime").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 2,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#prePickUpTime").val();
                vm.goodsOrder.prePickUpTime = value;

            });
        },
        //获取授权公司列表
        getAccreditCompany: function () {
            $.get(baseURL + 'order/goodsorder/getAccreditCompany', function (r) {
                var rows = r.data;
                rows = JSON.stringify(rows);
                rows = rows.replace(/id/g, "value").replace(/companyName/g, "label");
                vm.accreditCompanys = JSON.parse(rows);
            })
        },
        //授权公司选择事件
        companyChange: function (value, childidx, el) {
            console.log(value);
            //获取授权公司下员工
            $.get(baseURL + 'order/goodsorder/getCompanyStaff/' + value, function (r) {
                var rows = r.data;
                rows = JSON.stringify(rows);
                rows = rows.replace(/userId/g, "value").replace(/username/g, "label");
                vm.companyStaffs = JSON.parse(rows);
            })

        },
        //保存授权
        saveAccredit: function () {
            layer.load();
            if (vm.merchantCompany.companyId == null || vm.merchantCompany.companyId == "") {
                alert("请选择授权公司");
                layer.closeAll();
                return false;
            }
            if (vm.companyStaff.userId == null || vm.companyStaff.userId == "") {
                alert("请选择授权人");
                layer.closeAll();
                return false;
            }
            if (vm.paymentShow) {
                if (vm.goodsOrder.isPayment == null || vm.goodsOrder.isPayment == "") {
                    alert("请选择是否垫付");
                    layer.closeAll();
                    return false;
                }
            }
            var data = {
                companyId: vm.merchantCompany.companyId,
                orderNo: vm.accreditOrder,
                createBy: vm.companyStaff.userId,
                isPayment: vm.goodsOrder.isPayment
            }
            $.ajax({
                url: baseURL + 'agent/order/setAgentAuthorize',
                type: 'post',
                data: JSON.stringify(data),
                success: function (r) {
                    layer.closeAll();
                    console.log(r);
                    if (r.msg == 'success') {
                        alert('操作成功', function (index) {
                            location.reload();
                        });
                    }

                }
            })
        },
        //查看授权
        getAccredit: function () {
            $.ajaxSettings.async = false;
            $.get(baseURL + 'order/goodsorder/getAccredit/' + vm.accreditOrder, function (r) {
                if (r.msg == 'success') {
                    vm.merchantCompany.companyName = r.accreditInfo.company_name;
                    vm.companyStaff.userName = r.accreditInfo.username;
                    vm.merchantCompany.companyId = r.accreditInfo.company_id;
                    vm.goodsOrder.orderNumber = r.accreditInfo.order_no;
                    vm.goodsOrder.isPayment = r.accreditInfo.is_payment;
                }
                console.log(r);
            })
        },
        //取消授权
        cancleAccredit: function () {
            layer.load();
            $.ajax({
                url: baseURL + 'agent/order/cavelAgentAuthorize',
                type: 'POST',
                data: JSON.stringify({
                    'companyId': vm.merchantCompany.companyId.toString(),
                    'orderNo': vm.goodsOrder.orderNumber.toString(),
                    'orderStatus': vm.goodsOrder.orderStatus.toString()
                }),
                success: function (data) {
                    layer.closeAll();
                    if (data.msg == 'success') {
                        alert('操作成功', function (index) {
                            location.reload();
                        })
                    }
                    console.log(data);
                }
            })
        },
        //手填合同号校验
        contractWrite: function (obj) {
            $.get(baseURL + "contract/goodscontract/list?contractNumber=" + $("#contractNumber").val() + "&check=true", function (r) {
                if (r.data.length < 1) {
                    alert("合同号不存在，请重新输入");
                    $("#contractNumber").val("");
                    vm.goodsOrder.agreementId = "";
                }
            });
        },
        //获取审核信息
        getPre: function (orderId) {
            $.ajax({
                url: baseURL + 'pre/goodsorderpre/getByOrderId/' + orderId,
                success: function (r) {
                    vm.goodsorderpre = r.goodsOrderPre;
                }
            })
        },
        //获取审核显示状态
        getReviewStatus: function () {
            $.ajax({
                url: baseURL + 'order/goodsorder/getReviewStatus',
                success: function (r) {
                    if (r.flag) {
                        vm.reviewStatus = 1;
                    }
                }
            })
        },

        //保存审核信息
        preSave: function () {
            layer.load();
            $.ajax({
                url: baseURL + 'pre/goodsorderpre/save',
                type: 'post',
                data: JSON.stringify(vm.goodsorderpre),
                success: function (r) {
                    layer.closeAll();
                    console.log(r);
                    if (r.msg == 'success') {
                        alert('操作成功', function (index) {
                            location.reload();
                        });
                    }

                }
            })
        },
        //选择收货地址
        openAddressCheck: function (event) {
            $("#addresstab").BTF5(vm.params)
            $("#addressModel").modal("show")
        },
        //收货地址模糊查询
        addressQuery: function () {
            $("#addressTab").BTF5(vm.params)
        },
        //获取用户所选择的地址信息
        getAddressDate: function () {
            var data = $("#addressTab").bootstrapTable("getSelections")[0];
            $("#addressModel").modal('hide');
            if (data != null) {
                Vue.set(vm.address, 'consigneeName', data.consignee);
                Vue.set(vm.address, 'consigneePhone', data.phonenumber);
                // Vue.set(vm.address, 'consigneeZipCode', data.zipcode);
                // Vue.set(vm.address, 'consigneeId', data.id);
                // Vue.set(vm.address, 'consigneeArea', data.region);
                // Vue.set(vm.address, 'consigneeAddress', [data.region, data.detailedaddress].join(", 详细地址: "));
                // Vue.set(vm.address, 'consigneeAddress', [data.detailedaddress, data.specificaddress]);//数组
                var newVar = data.detailedaddress + '-' + data.specificaddress;
                Vue.set(vm.address, 'consigneeAddress', newVar);
                //页面 name 赋值
                $("input[name='consigneeName']").val(data.consignee);
                $("input[name='consigneePhone']").val(data.phonenumber);
                // $("input[name='consigneeAddress']").val(data.detailedaddress + data.specificaddress);
                $("textarea[name='consigneeAddress']").val(data.detailedaddress + data.specificaddress);
                //重新校验
                $("#addform").data("bootstrapValidator").updateStatus('consigneeName', 'NOT_VALIDATED').validateField('consigneeName');
                $("#addform").data("bootstrapValidator").updateStatus('consigneePhone', 'NOT_VALIDATED').validateField('consigneePhone');
                $("#addform").data("bootstrapValidator").updateStatus('consigneeAddress', 'NOT_VALIDATED').validateField('consigneeAddress');
                vm.goodsOrder.cinfo = vm.address;
            }
        },
        //选择银行卡号
        BankCard: function (event) {
            $("#bankCardTab").BTF5();
            $("#bankCardModel").modal("show");
        },
        //获取用户所选择的银行卡信息
        getBankCard: function () {
            var data = $("#bankCardTab").bootstrapTable("getSelections")[0];
            $("#bankCardModel").modal('hide');
            if (data != null) {
                Vue.set(vm.goodsOrder, 'buyerBankCard', data.cardNo);
                $("input[name='buyerBankCard']").val(data.cardNo);
                $("#addform").data("bootstrapValidator").updateStatus('buyerBankCard', 'NOT_VALIDATED').validateField('buyerBankCard');
            }
        },

        //获取投诉信息
        getComplaint: function (orderNumber) {
            //vm.complaint
            $.ajax({
                url: '/complaint/complaint/detail',
                type: 'post',
                data: JSON.stringify({orderId: orderNumber}),
                contentType: "application/json",
                success: function (r) {
                    if (r.complaint != null) {
                        vm.complaint = r.complaint
                    }
                }
            })
        },
        //修改订单状态
        updateStatus: function (orderId, orderStatus, statusOwner, statusCount, cancelFlag) {
            layer.load();
            var data = {
                orderId: orderId,
                orderStatus: orderStatus,
                statusOwner: statusOwner,
                statusCount: statusCount,
                orderNumber: vm.goodsOrder.orderNumber,
                // depot: vm.goodsOrder.depot,
                detail: vm.goodsOrder.detail,
                sellerId: vm.goodsOrder.sellerId,
                cancelFlag: cancelFlag
            }
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
            /*if (returnStatusCount >= 1) {
                layer.closeAll();
                console.log("已接单，不可修改")
                alert("订单不可修改");
                return;
            }*/
            /*if (returnStatusCount == null) {
                returnStatusCount = 0;
            } else {
                if (returnStatusCount >= statusCount) {
                    console.log("服务器订单步数大于当前订单步数")
                    vm.reload();
                    return;
                }
            }*/

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
        },
        //收货地址选择事件
        AddressChange: function (val, chil, el) {
            vm.addressList.forEach(function (item) {
                if (item.value == val) {
                    console.log(item)
                    vm.address.consigneeName = item.consignee;
                    vm.address.consigneePhone = item.phonenumber
                    vm.address.consigneeArea = item.region
                    vm.address.consigneeZipCode = item.zipcode
                    vm.address.consigneeAddress = item.detailedaddress
                }
            })
        },
        //获取收货地址
        getAddress: function () {
            $.get(baseURL + "company/receivingaddress/list", function (r) {
                var rows = JSON.stringify(r.data);
                rows = rows.replace(/id/g, "value").replace(/addresshear/g, "label");
                vm.addressList = JSON.parse(rows);
            });
        },
        //获取货物公司
        getMerchants: function () {
            $.ajax({
                type: "POST",
                url: baseURL + 'order/goodsorder/getMerchants',
                contentType: "application/json",
                async: false,
                data: JSON.stringify({goodsType: vm.goodsOrder.orderGoodsType}),
                success: function (r) {
                    var merchant = r.merchant;
                    if (merchant != null) {
                        var str = JSON.stringify(merchant)
                        str = str.replace(/id/g, "value").replace(/companyName/g, "label");
                        vm.merchants = JSON.parse(str);
                    }
                }
            });
        },
        //公司选择事件
        merchantsChange: function (value, childidx, el) {
            vm.productScs = [];
            vm.addids = [];
            if (vm.title = "修改") {

            } else {
                $("#addTable").bootstrapTable('removeAll')
            }
            this.merchants.forEach(function (t) {
                if (t.value == value) {
                    vm.goodsOrder.sellerName = t.label;
                    vm.goodsOrder.sellerContact = t.mobile;
                    vm.showGoodParams.goodsState = 1;
                    vm.showGoodParams.goodsType = vm.goodsOrder.orderGoodsType;
                    vm.showGoodParams.companyId = value;

                    /*vm.showGoodParams = {goodsState: 1, goodsType: vm.goodsOrder.orderGoodsType, companyId: value};*/
                    var options = $("#addGoodTable").bootstrapTable('getOptions');
                    // vm.companySelectId = value;
                    vm.goodsOrder.sellerId = value;
                    options.columns = vm.getAddTableColumns();
                    $("#addGoodTable").BTF5(vm.showGoodParams);
                    $("#addGoodTable").bootstrapTable('refreshOptions', {'options': options});
                    $("#addTable").bootstrapTable('removeAll')
                    vm.offer = {};
                    vm.goodsOrder.orderCount = null;
                    vm.goodsOrder.actualPayment = null;
                    vm.goodsOrder.currency = null;
                    return;
                }
            })
        },
        //保存投诉方法
        saveComplaint: function () {
            layer.load();
            if (vm.images.length == 0 && (vm.complaint.images == null || vm.complaint.images == 0)) {
                alert("请上传图片");
                layer.closeAll();
                return;
            }
            if (vm.complaint.images == null) {
                vm.complaint.images = [];
            }
            ;
            vm.complaint.images = vm.complaint.images.concat(vm.images)
            vm.complaint.orderId = vm.goodsOrder.orderNumber;
            vm.complaint.detail = vm.goodsOrder.detail;
            vm.complaint.cinfo = vm.goodsOrder.cinfo;
            //投诉用户
            vm.complaint.complaintFromId = vm.goodsOrder.purchaserCompanyId;
            vm.complaint.complaintFrom = vm.goodsOrder.purchaserCompanyName;
            //被投诉用户
            vm.complaint.complaintToId = vm.goodsOrder.sellerId;
            vm.complaint.complaintTo = vm.goodsOrder.sellerName;
            vm.complaint.orderType = 1;
            console.log(vm.complaint)
            var url = "complaint/complaint/save";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.complaint),
                success: function (r) {
                    layer.closeAll();
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            $('#complaintModal').modal('hide')
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //保存售后方法
        saveAftersale: function () {
            layer.load();
            // if (!/(^[1-9]\d{0,9}$)/.test(vm.afterSale.quantity) || vm.afterSale.quantity > vm.afterSale.number) {
            //     alert("申请的售后数量为不大于" + vm.afterSale.number + "的正整数");
            //     layer.closeAll();
            //     return;
            // }
            // if (vm.afterSale.description.length > 200) {
            //     alert('问题描述须少于200个字符');
            //     layer.closeAll();
            //     return;
            // }
            if (vm.aftersaleImages.length == 0 && (vm.afterSale.images == null || vm.afterSale.images == 0)) {
                alert("请上传图片");
                layer.closeAll();
                return;
            }
            if (vm.afterSale.images == null) {
                vm.afterSale.images = [];
            }
            vm.afterSale.images = vm.afterSale.images.concat(vm.aftersaleImages);
            vm.afterSale.orderId = vm.goodsOrder.orderNumber;
            vm.afterSale.buyerId = vm.goodsOrder.purchaserCompanyId;
            vm.afterSale.sellerId = vm.goodsOrder.sellerId;
            vm.afterSale.buyer = vm.goodsOrder.purchaserCompanyName;
            vm.afterSale.seller = vm.goodsOrder.sellerName;
            var datas = $("#goodsInfo").bootstrapTable("getData");
            /*var data = [];
            datas.forEach(function (item) {
                item.totalPrice = item.count * item.goodsPrice;
                data.push({
                    goodsName: item.goodsName,
                    unitPrice: item.goodsPrice,
                    number: item.number,
                    totalPrice: item.totalPrice,
                    afterSaleNumber: item.count,
                    goodsImageUrl: item.goodsImageUrl
                })
            });*/
            // vm.afterSale.goods = data;
            vm.afterSale.goods = datas;
            vm.afterSale.quantity = datas[0].afterSaleNumber;
            vm.afterSale.orderType = 1;
            var url = "afterSale/aftersale/save";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.afterSale),
                success: function (r) {
                    layer.closeAll();
                    if (r.code === 0) {
                        $("#afterSaleModal").modal('hide');
                        alert('操作成功', function (index) {
                            location.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }, error: function (e) {
                    alert(e);
                    layer.closeAll();
                }
            });
        },
        //获取总价
        getTotal: function () {
            var price = 0;
            if (this.goodsOrder != null && JSON.stringify(this.goodsOrder) != '{}') {
                if (vm.goodsOrder.detail == null) {
                    return '';
                }
                vm.goodsOrder.detail.forEach(function (item) {
                    if (item.goodsTotalPrice != null) {
                        price += parseInt(item.goodsTotalPrice)
                    }
                })
            }
            return price;
        },
        //计算总价
        countTotal: function (obj) {
            var commoditys = null;
            if (vm.merchantSelect) {//新增
                commoditys = $("#addTable").bootstrapTable("getData");
            }else if (!vm.merchantSelect) {//修改
                commoditys = $("#addTable2").bootstrapTable("getData");
            }

            // if (isBlank(vm.maxSellNum)) {
            if (commoditys == null || commoditys.length == 0) {
                alert("请添加货物");
                document.getElementById("orderCount").value = "";
                $("#addform").data("bootstrapValidator").updateStatus('orderCount', 'NOT_VALIDATED').validateField('orderCount');
                return
            } else if (vm.goodsOrder.orderCount > vm.maxSellNum) {
                alert("库存不足");
                document.getElementById("orderCount").value = "";
                document.getElementById("actualPayment").value = "";
                //重新校验
                $("#addform").data("bootstrapValidator").updateStatus('orderCount', 'NOT_VALIDATED').validateField('orderCount');
                return
            }
            var total;

            var unit = document.getElementById("goodsUnit").value;
            if (unit == 1) {//柜
                total = Number(vm.goodsOrder.orderCount) * Number(commoditys[0].goodsPrice) * Number(commoditys[0].goodsCount);
            } else if (unit == 2 || unit == 3) {//吨/千克
                total = Number(vm.goodsOrder.orderCount) * Number(commoditys[0].goodsPrice);
            }
            vm.goodsOrder.actualPayment = total.toFixed(2);
            document.getElementById("actualPayment").value = total.toFixed(2);
            total = null;
        },
        //显示选择货物列表modal
        showMModal: function () {
            vm.showGoodParams.goodsState = 1;
            vm.showGoodParams.goodsType = vm.goodsOrder.orderGoodsType;
            vm.showGoodParams.companyId = vm.goodsOrder.sellerId;
            $("#addGoodTable").BTF5(vm.showGoodParams);
            $("#addGoodTable").bootstrapTable('refreshOptions', vm.getAddTableColumns());
            // if (vm.companySelectId == null || vm.companySelectId == "") {
            if (vm.goodsOrder.sellerId == null || vm.goodsOrder.sellerId == "") {
                alert("请选择商家");
                return;
            }
            var commoditys = $("#addTable").bootstrapTable("getData");
            /* if (vm.goodsOrder.orderGoodsType == "1") {
                 if (commoditys.length >= 1) {
                     alert("只能添加一条现货商品");
                     return;
                 }
             }*/
            if (commoditys.length >= 1) {
                alert("只能添加一条商品信息");
                return;
            }
            $('#myModal').modal('show')
        },
        //显示投诉页面
        addComplaint: function () {
            var orderId = vm.goodsOrder.orderNumber;
            //查询该订单是否申请过售后
            $.get(baseURL + "complaint/complaint/getComplaint/" + orderId, function (r) {
                if (r.count > 0) {
                    alert("当前订单已经发起过投诉");
                } else {
                    vm.images.length = 0;
                    vm.$refs.complaintFile.destroy();
                    vm.$refs.complaintFile.initFileInput();
                    vm.complaint = {};
                    vm.getComplaint(vm.goodsOrder.orderNumber);
                    $("#complaintModal").modal('show');
                }

            })

        },
        //显示售后页面
        addAftersale: function () {
            var row = $('#contenTable').bootstrapTable('getSelections');
            console.log(row);
            var orderId = vm.goodsOrder.orderNumber;
            //查询该订单是否申请过售后
            $.get(baseURL + "afterSale/aftersale/getAfter/" + orderId, function (r) {
                if (r.count > 0) {
                    alert("当前订单已经发起过售后");
                } else {
                    if (!row.length) {
                        alert("请选择一条产品记录");
                        return;
                    }
                    vm.aftersaleImages.length = 0;
                    vm.$refs.aftersaleFile.destroy();
                    vm.$refs.aftersaleFile.initFileInput();
                    vm.afterSale = {};
                    var detail = JSON.parse(JSON.stringify(row));
                    vm.afterSale.number = 0;
                    detail.forEach(function (item) {
                        item.unitPrice = item.goodsPrice;
                        //购买商品总重量item.goodsCount，如果是柜的话需要用到
                        //购买件数
                        // item.number = vm.goodsOrder.orderCount;
                        if (vm.goodsOrder.goodsUnit == 1) {//柜
                            item.number = (vm.goodsOrder.orderCount * item.goodsCount).toFixed(2);
                        } else if (vm.goodsOrder.goodsUnit == 2 || vm.goodsOrder.goodsUnit == 3) {//吨 千克
                            item.number = vm.goodsOrder.orderCount;
                        }
                        // item.orderGoodsType = vm.goodsOrder.orderGoodsType;
                        // vm.afterSale.number += item.number;
                        // item.totalPrice = item.goodsTotalPrice;
                        // item.unit = vm.goodsOrder.goodsUnit;
                        item.unit = item.goodsUnit;
                        //操作数量默认值
                        item.afterSaleNumber = 1;
                        console.log("**************************分割线***************************putgoodsorder.js:2050")
                        console.log(item);
                    })
                    //售后分页的显示
                    $('#goodsInfo').bootstrapTable('load', {rows: detail, total: detail == null ? 0 : detail.length})
                    $("#afterSaleModal").modal('show');
                }


            })
        },
        //货物添加货物列表的列配置
        getAddTableColumns: function () {
            var addGoodsList = [];
            var columns = [
                {checkbox: true},
                {title: vm.$t('title'), field: 'goodsName'},
                {
                    title: vm.$t('productTypes'), field: 'goodsType', formatter: function (value, row, index) {
                        var addGoodsCount = {};
                        addGoodsCount.count = row.goodsCount;
                        addGoodsCount.goodsNumbers = row.goodsNumber;
                        addGoodsList.push(addGoodsCount);
                        if (value == 0) {
                            return "期货"
                        } else if (value == 1) {
                            return "现货"
                        }
                    }
                },
                {
                    title: vm.$t('Stock'), field: 'stock', formatter: function (value, row, index) {
                        if (row.goodsUnit == 1) {
                            return value + '&nbsp;柜';
                        } else if (row.goodsUnit == 2) {
                            return value + '&nbsp;吨';
                        } else if (row.goodsUnit == 3) {
                            return value + '&nbsp;千克';
                        }

                    }
                },
                {
                    title: vm.$t('ProductName'),
                    field: 'commoditys[0].commodityName',
                    formatter: function (value, row, index) {
                        return row.commoditys[0].commodityName;
                    }
                },
                {title: vm.$t('place'), field: 'commodityCountry', visible: false},
                {title: vm.$t('place'), field: 'countryName'},
                {title: vm.$t('ProducerOrNumber'), field: 'commodityFactoryNumber'},
                {
                    title: vm.$t('UnitPrice'), field: 'goodsPromotionPrice', formatter: function (value, row, index) {
                        if (row.priceUnit == 1) {
                            return value + '&nbsp;元/吨';
                        } else if (row.priceUnit == 2) {
                            return value + '&nbsp;元/千克';
                        } else if (row.priceUnit == 3) {
                            return value + '&nbsp;美元/吨';
                        } else if (row.priceUnit == 4) {
                            return value + '&nbsp;美元/千克';
                        }
                    }
                },
                {
                    title: vm.$t('Weight'),
                    field: 'commoditys[0].commodityCount',
                    formatter: function (value, row, index) {
                        if (row.priceUnit == 1 || row.priceUnit == 3) {
                            return row.commoditys[0].commodityCount + '&nbsp;吨';
                        } else if (row.priceUnit == 2 || row.priceUnit == 4) {
                            return row.commoditys[0].commodityCount + '&nbsp;千克';
                        }
                    }
                },
                {title: vm.$t('pack'), field: 'commodityPacking'},
                {title: vm.$t('offer'), field: 'id', visible: false},
                {title: vm.$t('offer'), field: 'time', visible: false},
                {title: vm.$t('offer'), field: 'place', visible: false},
                {title: vm.$t('offer'), field: 'paymentTerm', visible: false},
                {title: vm.$t('offer'), field: 'productionDate', visible: false},
                {title: vm.$t('offer'), field: 'shelfLife', visible: false},
                {title: vm.$t('offer'), field: 'expirationDate', visible: false},
                {title: vm.$t('offer'), field: 'clause', visible: false},
                {title: vm.$t('offer'), field: 'transactionManner', visible: false},
                {title: vm.$t('offer'), field: 'goodsUnit', visible: false}

            ]
            // if (vm.goodsOrder.orderGoodsType == 1) {
            //     columns.push({title: vm.$t('warehouseName'), field: 'goodsSname'});
            //     columns.push({
            //         title: vm.$t('deliveryAddress'), formatter: function (value, row, index) {
            //             return row.goodsPodProvince + row.goodsPodCity;
            //         }
            //     });
            // } else {
            //     columns.push({title: vm.$t('Schedule'), field: 'goodsSailingTime'});
            //     columns.push({
            //         title: vm.$t('cabinet'), field: 'goodsCsc', formatter: function (value, row, index) {
            //             if (value == 0) {
            //                 return "不可拼柜"
            //             } else {
            //                 return "可拼柜"
            //             }
            //         }
            //     });
            // }
            vm.addGoodsList = addGoodsList;
            return columns;
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
            if (grid[0].goodsType == 1) {    //现货
                var expirationDate = grid[0].expirationDate;
                // var date = new Date().Format("yyyy-MM-dd");
                var date = new Date().Format("yyyy-MM");
                if (expirationDate < date) {
                    alert("该货物已过期");
                    return;
                }
            }
            /* //现货
             if (vm.goodsOrder.orderGoodsType == 1) {
                 if (grid.length > 1) {
                     alert("现货商品只能选择一条");
                     return;
                 }
             }
             var flag = true;
             grid.forEach(function (item) {
                 if (vm.addids.indexOf(item.goodsNumber) > -1) {
                     flag = false;
                     alert("您已添加过这条商品" + item.goodsName);
                     return;
                 }
                 if (vm.goodsOrder.orderGoodsType == 0) {
                     console.log(vm.productScs.indexOf(item.goodsCsc));
                     if (vm.productScs.length > 0) {
                         if (vm.productScs.indexOf(item.goodsCsc) == -1) {

                             flag = false;
                             alert("不能同时添加可拼柜和不可拼柜的商品");
                             return;
                         }
                     }
                 }
             })
             if (!flag) {
                 return;
             }*/
            var addGoodsList = [];
            /* // var count = 0;
             var count1 = 0;     //拼柜    计数
             var count2 = 0;     //不拼柜   计数
             var count3 = 0;     //币种---人民币  计数
             var count4 = 0;     //币种---美元   计数
             // if (vm.goodsOrder.orderGoodsType == 0) {    //期货*/
            grid.forEach(function (item) {
                vm.offer = {
                    time: item.time,
                    place: item.place,
                    paymentTerm: item.paymentTerm,
                    productionDate: item.productionDate,
                    shelfLife: item.shelfLife,
                    expirationDate: item.expirationDate,
                    clause: item.clause,
                    transactionManner: item.transactionManner,
                    goodsUnit: item.goodsUnit
                };
                // var addGoodsCount = {};
                /* if (item.goodsCsc == 1) { //拼柜
                    count1 = count1 + 1;
                } else if (item.goodsCsc == 0) { //不拼柜
                    count2 = count2 + 1;
                }
                if (item.currency == 1) {
                    count3 = count3 + 1;
                } else if (item.currency == 2) {
                    count4 = count4 + 1;
                }
*/
                /*item.totalPrice = item.goodsPromotionPrice;
               console.log(item['goodsNumber'])
               vm.addids.push(item['goodsNumber']);
               vm.productScs.push(item['goodsCsc']);
               addGoodsCount.count = item.goodsCount;
               addGoodsCount.goodsNumbers = item.goodsNumber;
               addGoodsCount.currency = item.currency; //币种
               addGoodsList.push(addGoodsCount);
               vm.maxSellNum = item.goodsCount;
               item.goodsCount = null;*/
                vm.addids.push(item['id']);
                var addGoodsCount = {
                    goodsNumber: item.goodsNumber,
                    oldGoodsNumber: item.goodsNumber,
                    goodsName: item.commoditys[0].commodityName,//品名
                    goodsPrice: item.goodsPromotionPrice,//单价
                    priceUnit: item.priceUnit,//价格单位
                    goodsCount: item.commoditys[0].commodityCount,//重量
                    goodsUnit: item.commoditys[0].commodityUnit,//重量单位
                    // commodityCountry: item.commodityCountry,//产地
                    // countryName: item.countryName,
                    commodityCountry: item.countryName,//产地
                    commodityFactoryNumber: item.commodityFactoryNumber,//厂号
                    commodityPacking: item.commodityPacking//包装
                }
                addGoodsList.push(addGoodsCount);
                vm.maxSellNum = item.stock;
                if (item.priceUnit == 1 || item.priceUnit == 2) {
                    vm.goodsOrder.currency = 1;
                } else if (item.priceUnit == 3 || item.priceUnit == 4) {
                    vm.goodsOrder.currency = 2;
                }
                // item.goodsCount = null;
            });
            /*if (count1 > 0 && count2 > 0) {
                alert("不能同时添加可拼柜和不可拼柜的商品");
                flag = false;
                vm.addids = [];
                vm.productScs = [];
                vm.maxSellNum = '';
                return;
            }
            if (count2 > 1) {
                alert("只能添加一个不可拼柜的期货");
                flag = false;
                vm.addids = [];
                vm.productScs = [];
                vm.maxSellNum = '';
                return;
            }
            if (count3 > 0 && count4 > 0) {
                alert("不能同时添加不同币种的商品");
                flag = false;
                vm.addids = [];
                vm.productScs = [];
                vm.maxSellNum = '';
                return;
            }
            // }
            if (!flag) {
                return;
            }*/
            vm.addGoodsList = addGoodsList;
            // vm.goodsOrder.actualPayment = 0;
            // $("#addTable").bootstrapTable('append', grid);
            $("#addTable").bootstrapTable('load', {
                rows: vm.addGoodsList,
                total: vm.addGoodsList == null ? 0 : vm.addGoodsList.length
            });
            $('#myModal').modal('hide');
            document.getElementById("orderCount").value = "";
            //重新校验
            // $("#addform").data("bootstrapValidator").updateStatus('orderCount', 'NOT_VALIDATED').validateField('orderCount');
        }
        ,
        //获取订单状态的中文
        getOrderStatus: function () {
            return this.orderStatus[this.goodsOrder.orderStatus];
        }
        ,
        //支付方式余额支付和银联支付线下转账
        getPaymentMethod: function () {
            return this.paymentMethods[this.goodsOrder.paymentMethod];
        }
        ,
        //付款方式，一次性付清
        getTransactionMode: function () {
            return this.transactionModes[this.goodsOrder.transactionMode];
        }
        ,
        //查询按钮点击触发事件
        query: function () {
            vm.reload();
        }
        ,
        searchButton: function (value) {
            vm.params.sellerName = '';
            if (value == "1") {
                vm.params.orderStatus = '';
            } else if (value == "2") {
                vm.params.orderStatus = 'tbp';
            } else if (value == "3") {
                vm.params.orderStatus = 'pr';
            }
            vm.reload();
        }
        ,
        //添加订单显示页面
        add: function () {
            $('#orderGoodsType1').removeAttr('disabled');
            $('#orderGoodsType2').removeAttr('disabled');
            $('#isAgent1').removeAttr('disabled');
            $('#isAgent2').removeAttr('disabled');
            $('#agentOrderNumber').removeAttr('disabled');
            vm.showList = false;
            // vm.merchantSelect = true;
            vm.transactionShow = false;
            vm.addOrder = true;
            vm.title = "新增";
            vm.goodsOrder = {
                isAgent: 0
            };
            vm.addids = [];
            $('#addTable').bootstrapTable('removeAll')
        }
        ,
        //保存添加订单
        addGoodsOrder: function () {
            layer.load();
            //保存前验证
            /* var orderGoodsType = vm.goodsOrder.orderGoodsType;
             if (orderGoodsType == 0 || orderGoodsType == 1) {

             } else {
                 alert("请选择货物类型");
                 layer.closeAll();
                 return false;
             }
             if (orderGoodsType != 1) {
                 var transactionManner = vm.goodsOrder.transactionManner;
                 if (transactionManner == "" || transactionManner == null) {
                     alert("请选择成交方式");
                     layer.closeAll();
                     return false;
                 }
             }
             var isAgent = vm.goodsOrder.isAgent;
             if (isAgent == "" || isAgent == null) {
                 alert('请选择是否代理');
                 layer.closeAll();
                 return false;
             }*/
            //if(isAgent == 1){
            if (vm.goodsOrder.agentOrderNumber == "" || vm.goodsOrder.agentOrderNumber == null) {
                if (vm.goodsOrder.isAgent == 1) {
                    alert('代理单号不能为空');
                    layer.closeAll();
                    return false;
                }
            }
            if (vm.goodsOrder.transactionMode == '1') {
                if (vm.goodsOrder.downPayment == "" || vm.goodsOrder.downPayment == null) {
                    alert("首付不能为空");
                    layer.closeAll();
                    return false;
                } else if (vm.goodsOrder.prePickUpTime == "" || vm.goodsOrder.prePickUpTime == null) {
                    alert("预提货时间不能为空");
                    layer.closeAll();
                    return false;
                }
                // vm.goodsOrder.actualPayment = vm.goodsOrder.downPayment;
            }
            if (vm.goodsOrder.sellerId == "" || vm.goodsOrder.sellerId == null) {
                alert("商家不能为空");
                layer.closeAll();
                return false;
            }

            /*  if (vm.address.consigneeName == "" || vm.address.consigneeName == null || vm.address.consigneePhone == "" || vm.address.consigneePhone == null || vm.address.consigneeAddress == "" || vm.address.consigneeAddress == null) {
                  alert("请填写收货信息");
                  layer.closeAll();
                  return false;
              }
              if (vm.address.consigneeName.length > 20) {
                  alert("收货人姓名太长，请控制在20个字符以内");
                  layer.closeAll();
                  return false;
              }

              var regexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
              if (!regexp.test(vm.address.consigneePhone)) {
                  alert("请填写正确的联系电话");
                  layer.closeAll();
                  return false;
              }
              //vm.goodsOrder.transactionMode = $('input[name="transactionMode"]:checked').val();
              var transactionMode = vm.goodsOrder.transactionMode;
              if (transactionMode == "" || transactionMode == null) {
                  alert("请选择支付方式");
                  layer.closeAll();
                  return false;
              }
              vm.goodsOrder.distributionMode = $('input[name="distributionMode"]:checked').val();
              if (vm.goodsOrder.distributionMode == "" || vm.goodsOrder.distributionMode == null) {
                  if (vm.goodsOrder.distributionMode == 0 || vm.goodsOrder.distributionMode == 1) {

                  } else {
                      alert("请选择配送方式");
                      layer.closeAll();
                      return false;
                  }
              }

              vm.goodsOrder.storageMode = $('input[name="storageMode"]:checked').val();
              if (vm.goodsOrder.storageMode == "" || vm.goodsOrder.storageMode == null) {
                  if (vm.goodsOrder.storageMode == 0 || vm.goodsOrder.storageMode == 1) {

                  } else {
                      alert("请选择仓储方式");
                      layer.closeAll();
                      return false;
                  }

              }

              vm.goodsOrder.insuranceMethod = $('input[name="insuranceMethod"]:checked').val();
              if (vm.goodsOrder.insuranceMethod == "" || vm.goodsOrder.insuranceMethod == null) {
                  if (vm.goodsOrder.insuranceMethod == 0 || vm.goodsOrder.insuranceMethod == 1) {

                  } else {
                      alert("请选择货物保险");
                      layer.closeAll();
                      return false;
                  }
              }*/
            if (vm.merchantSelect) {//新增
                this.goodsOrder.detail = $('#addTable').bootstrapTable('getData');
            }else if (!vm.merchantSelect) {//修改
                this.goodsOrder.detail = $('#addTable2').bootstrapTable('getData');
            }

            if (this.goodsOrder.detail.length < 1) {
                alert("请添加货物");
                layer.closeAll();
                return false;
            }
            if (isBlank(vm.offer.goodsUnit)) {
                alert("购买数量的单位不能为空");
                layer.closeAll();
                return false;
            }
            if (isBlank(vm.goodsOrder.actualPayment) || !/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(vm.goodsOrder.actualPayment)) {
                alert("订单总价整数位最多9位，小数位最多2位");
                layer.closeAll();
                return false;
            }
            if (isBlank(vm.goodsOrder.currency)) {
                alert("币种不能为空");
                layer.closeAll();
                return false;
            }
            /*       var totalPrice = 0;
                     var buyNum = 0;
                     this.goodsOrder.detail.forEach(function (item) {
                         if (item.goodsCount == null || item.goodsCount == "") {
                             alert("请输入买入数量");
                             layer.closeAll();
                             buyNum += 1;
                             return;
                         }
                         item.goodsTotalPrice = item.goodsPromotionPrice == null ? item.goodsTotalPrice : item.goodsPromotionPrice;
                         totalPrice += Number(item.goodsTotalPrice * item.goodsCount);
                         if (item.goodsImageUrl == null || item.goodsImageUrl == "") {
                             if (item.images != null && item.images.length > 0) {
                                 item.goodsImageUrl = item.images[0].picUrl;
                             }
                         }
                         item.oldGoodsNumber = item.goodsNumber;
                         item.goodsType = item.goodsType == null ? 1 : 1;
                         item.goodsCurrency = item.currency; //币种
                     })
                     if (buyNum > 0) {
                         layer.closeAll();
                         return false;
                     }*/
            vm.goodsOrder.totalPrice = vm.goodsOrder.actualPayment;
            vm.goodsOrder.cinfo = vm.address;
            vm.goodsOrder.offerId = vm.addids[0];
            vm.goodsOrder.time = vm.offer.time;
            vm.goodsOrder.place = vm.offer.place;
            vm.goodsOrder.paymentTerm = vm.offer.paymentTerm;
            vm.goodsOrder.productionDate = vm.offer.productionDate;
            vm.goodsOrder.shelfLife = vm.offer.shelfLife;
            vm.goodsOrder.clause = vm.offer.clause;
            vm.goodsOrder.transactionManner = vm.offer.transactionManner;
            vm.goodsOrder.goodsUnit = vm.offer.goodsUnit;
            if (Number(vm.goodsOrder.transactionMode) === 1 && Number(vm.goodsOrder.downPayment) > Number(vm.goodsOrder.actualPayment)) {
                alert("首付不能大于订单总价");
                vm.goodsOrder.downPayment = '';
                layer.closeAll();
                return false;
            }
            var returnStatusCount;
            if (this.goodsOrder.orderId != null) {
                var url = "order/goodsorder/info/" + this.goodsOrder.orderId;
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    async: false,
                    success: function (r) {
                        returnStatusCount = r.goodsOrder.statusCount;
                    }
                });
                if (returnStatusCount >= 1) {
                    layer.closeAll();
                    alert('卖家已确认订单,不能进行修改，请联系卖家', function (index) {
                        location.reload();
                    });
                    return;
                }

            }
            var url2 = this.goodsOrder.orderId == null ? "order/goodsorder/save" : "order/goodsorder/update";
            $.ajax({
                type: "POST",
                url: baseURL + url2,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOrder),
                success: function (r) {
                    layer.closeAll();
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            location.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        update: function (orderId) {
            vm.goodsOrder = {};
            vm.addids = [];
            $('#addTable2').bootstrapTable('removeAll');
            vm.getInfo(orderId);
            console.log("vm.goodsOrder", vm.goodsOrder);
            vm.merchantSelect = false;
            // vm.showList = false;
            $("#orderGoodsType1").attr('disabled', 'disabled');
            $("#orderGoodsType2").attr('disabled', 'disabled');
            $("#isAgent1").attr('disabled', 'disabled');
            $("#isAgent2").attr('disabled', 'disabled');
            $("#agentOrderNumber").attr('disabled', 'disabled');
            vm.addOrder = true;
            vm.title = "修改";
        }
        ,
        //表单验证
        validate: function () {
            var bl = $('#addform').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //投诉验证
        complaintValidate: function () {
            var bl = $('#complaintForm').VF();//启用验证
            if (!bl) {
                return;
            }
        }
        ,
        //售后验证
        aftersaleValidate: function () {
            var bl = $('#afterSaleForm').VF();//启用验证
            if (!bl) {
                return;
            }
        }
        ,
        addAgent: function (obj) {
            console.log(vm.goodsOrder.agentOrderNumber);
            $('#addTable').bootstrapTable('removeAll');

            $.get(baseURL + 'agent/order/list?orderNumber=' + vm.goodsOrder.agentOrderNumber + '&check=true', function (r) {
                console.log(r);
                if (r.data == null || r.data == '') {
                    alert('请填写正确的代理订单号');
                    vm.goodsOrder.agentOrderNumber = '';
                } else {
                    $.get(baseURL + 'order/goodsorder/queryByAgentOrderNo/' + vm.goodsOrder.agentOrderNumber, function (r) {
                        console.log(r);
                        if (r.goodsOrder != null) {
                            alert("此代理单号只能代理一笔货物订单");
                            vm.goodsOrder.agentOrderNumber = '';
                        }
                    })
                }
            });
        }
        ,
        saveOrUpdate: function (event) {
            layer.load();
            var url = vm.goodsOrder.orderId == null ? "order/goodsorder/save" : "order/goodsorder/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOrder),
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
        ,
        del: function (event) {
            var orderIds = getSelectedRowsId("orderId");
            if (orderIds == null) {
                return;
            }
            //查询所选订单中是否正在进行
            $.ajax({
                type: "POST",
                url: baseURL + "order/goodsorder/searchStatus",
                contentType: "application/json",
                data: JSON.stringify(orderIds),
                success: function (r) {
                    for (var i = 0; i < r.goodsStatus.length; i++) {
                        if (r.goodsStatus[i].orderStatus == 'cto' || r.goodsStatus[i].orderStatus == 'tc' || r.goodsStatus[i].orderStatus == 'af') {

                        } else {
                            alert("无法删除进行中的订单");
                            return false;
                        }
                    }
                    confirm('确定要删除选中的记录？', function () {
                        $.ajax({
                            type: "POST",
                            url: baseURL + "order/goodsorder/deleteBuy",
                            contentType: "application/json",
                            data: JSON.stringify(orderIds),
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
                    })
                }
            })

        }
        ,
        queryParams: function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                page: Math.ceil((params.offset + 1) / params.limit),  //页码
            };
            //对象合并
            temp = Object.assign(temp, (vm.showGoodParams || {}));
            return temp;
        }
        ,
        //获取详情
        getInfo: function (orderId) {
            vm.showList = false;
            vm.goodsOrder = {};
            vm.address = {};
            vm.addids = [];
            //$("#contenTable").bootstrapTable('lo',r.goodsOrder.detail);
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
                // if (status == 's' || status == 'pr') {
                if (status == 'pr') {
                    vm.toShow = true;
                    vm.goodsOrderShip = r.goodsOrder.ship;
                }
                var ship = r.goodsOrder.ship;
                if (ship != null) {
                    vm.kdnData.expCode = ship.logisticsCode;
                    vm.kdnData.expNo = ship.singleNumber;
                    KDNWidget.run(vm.kdnData)
                }
                vm.goodsOrder = r.goodsOrder;
                //详情页的sellerName怎么回事
                // vm.goodsOrder.sellerName = r.goodsOrder.sellerName;

                /* if (r.goodsOrder.depot == null || r.goodsOrder.depot == '') {
                     vm.storageInfo = false;
                 } else {
                     vm.storageInfo = true;
                     vm.depot = vm.goodsOrder.depot;
                 }*/

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
                /* r.goodsOrder.detail.forEach(function (item) {
                     item.goodsPromotionPrice = item.goodsTotalPrice;
                     item.totalPrice = item.goodsTotalPrice * item.goodsCount;
                     vm.addids.push(item.oldGoodsNumber)
                 });

                 var commondity = [];
                 vm.goodsOrder.detail.forEach(function (item) {
                     commondity = commondity.concat(item.commoditys);
                     item.currency = item.goodsCurrency;     //币种
                 });*/
                // $("#addTable").bootstrapTable('load', {
                //     rows: vm.goodsOrder.detail,
                //     total: vm.goodsOrder.detail == null ? 0 : vm.goodsOrder.detail.length
                // });
                /* $("#commondityTable").bootstrapTable('load', {
                     rows: commondity,
                     total: commondity == null ? 0 : commondity.length
                 });*/
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
                    var total = vm.goodsOrder.actualPayment;
                    var currency = vm.goodsOrder.currency;
                    vm.$nextTick(function () {
                        vm.goodsOrder.orderCount = count;
                        vm.goodsOrder.actualPayment = total;
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
                        $("#addTable2").bootstrapTable('load', {
                            rows: vm.goodsOrder.detail,
                            total: vm.goodsOrder.detail == null ? 0 : vm.goodsOrder.detail.length
                        });
                    });
                    vm.maxSellNum = vm.goodsOrder.maxSellNum;//报盘库存
                }
            });
            $.ajaxSettings.async = true;
        }
        ,
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
        }
        ,
        //初始化事件
        reload: function (event) {
            if (event != null) {
                location.reload();
            }

            vm.showList = true;
            vm.addOrder = false;
            vm.title = "";
            vm.images.length = 0;
            vm.aftersaleImages.length = 0;
            $("#preModal").modal('hide');
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("#addform").RF();
            $("#complaintForm").RF();
            $("#afterSaleForm").RF();

        }
    },
    //初始化方法
    created: function () {
        /*this.showList = false;
         this.addOrder = true;*/
        this.getAddress();
        //$("#preModal").modal('show');
    },
    watch: {
        //监听下单还是修改订单   不起作用
        'merchantSelect': function (value) {
            if (vm.merchantSelect) {    //下单页
                $('#orderGoodsType1').removeAttr('disabled');
                $('#orderGoodsType2').removeAttr('disabled');
                $('#isAgent1').removeAttr('disabled');
                $('#isAgent2').removeAttr('disabled');
                $('#agentOrderNumber').removeAttr('disabled');
            } else {     //修改页
                $("#orderGoodsType1").attr('disabled', 'disabled');
                $("#orderGoodsType2").attr('disabled', 'disabled');
                $("#isAgent1").attr('disabled', 'disabled');
                $("#isAgent2").attr('disabled', 'disabled');
                $("#agentOrderNumber").attr('disabled', 'disabled');
            }
        },
        //监听货物类型期货或者是现货
        'goodsOrder.orderGoodsType': function (value) {
            this.getMerchants();
            vm.goodsOrder.orderGoodsType = value;
            if (value == '1') {
                $("input[name=distributionMode]").attr("disabled", false);
                $("input[name=storageMode]").attr("disabled", false);
                $("input[name=insuranceMethod]").attr("disabled", false);
                vm.transactionShow = false;
                /*//配送方式
                vm.goodsOrder.distributionMode = 0;
                //仓储方式
                vm.goodsOrder.storageMode = 0;
                //货物保险
                vm.goodsOrder.insuranceMethod = 0;*/
            } else {
                $("input[name=distributionMode]").attr("disabled", true);
                $("input[name=storageMode]").attr("disabled", true);
                $("input[name=insuranceMethod]").attr("disabled", true);
                vm.transactionShow = true;
            }
            // this.merchantsChange(vm.companySelectId);//刷新货物列表
            // console.log(vm.merchants[0].value);
            if (vm.addOrder && vm.merchantSelect) {//新增页
                this.merchantsChange(vm.merchants[0].value);//刷新货物列表
            }
            vm.productScs = [];
            vm.addids = [];
            vm.offer = {};
            vm.goodsOrder.orderCount = null;
            vm.goodsOrder.actualPayment = null;
            vm.goodsOrder.currency = null;
            // $('#addTable').bootstrapTable('removeAll');
        },
        //是否代理
        'goodsOrder.isAgent': function (value) {
            console.log(value);
            if (value == 1) {
                //代理，隐藏订单其余项
                vm.isAgentValue = false;
                //vm.addButtonShow = false;
            } else {
                vm.isAgentValue = true;
                // vm.addButtonShow = true;
            }
        },
        //支付方式
        // 'goodsOrder.distributionMode': function (value) {
        //     if (this.goodsOrder.transportationExpenses != null) {
        //         return;
        //     }
        //     if (value == 0) {
        //         this.goodsOrder.transportationExpenses = 500.00;
        //     } else {
        //         this.goodsOrder.transportationExpenses = 0.00;
        //     }
        // },

        //获取总价
        'afterSaleTotal': function (value) {
            var datas = $("#goodsInfo").bootstrapTable("getData");
            var totalCount = 0;
            datas.forEach(function (item) {
                totalCount += parseInt(item.count);
            })
            this.afterSale.quantity = totalCount;
            this.$forceUpdate();
        },
        //配送方式
        // 'goodsOrder.distributionMode': function (value) {
        //     if (this.goodsOrder.transportationExpenses != null) {
        //         return;
        //     }
        //     if (value == 0) {
        //         this.goodsOrder.transportationExpenses = 500.00;
        //     } else {
        //         this.goodsOrder.transportationExpenses = 0.00;
        //     }
        // },
        //合同编号
        'goodsOrder.numStatus': function (value) {
            this.goodsOrder.agreementId = null;
            if (value) {
                this.goodsOrder.agreementId = '系统自动生成';
            }
        },
        'goodsOrder.transactionManner': function (value) {
            console.log(vm.goodsOrder);
            switch (value) {
                case 'CFR':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'CIF':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'CPT':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'CIP':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 0;
                    break;
                case 'DAF':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'DES':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'DEQ':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'DDU':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'DDP':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'FOB':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'FCA':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'FAS':
                    //配送方式
                    vm.goodsOrder.distributionMode = 0;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;
                case 'EXW':
                    //配送方式
                    vm.goodsOrder.distributionMode = 1;
                    //仓储方式
                    vm.goodsOrder.storageMode = 1;
                    //货物保险
                    vm.goodsOrder.insuranceMethod = 1;
                    break;

            }
        },

        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#contenTable").bootstrapTable.defaults.locale = "en-US";
                $("#contenTable2").bootstrapTable.defaults.locale = "en-US";
                $("#addTable").bootstrapTable.defaults.locale = "en-US";
                $("#addTable2").bootstrapTable.defaults.locale = "en-US";
                $("#goodsInfo").bootstrapTable.defaults.locale = "en-US";
                $("#addGoodTable").bootstrapTable.defaults.locale = "en-US";
                $("#commondityTable").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#contenTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#contenTable2").bootstrapTable.defaults.locale = "zh-CN";
                $("#addTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#addTable2").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsInfo").bootstrapTable.defaults.locale = "zh-CN";
                $("#addGoodTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#commondityTable").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#contenTable").bootstrapTable("destroy");
            $("#contenTable2").bootstrapTable("destroy");
            $("#addTable").bootstrapTable("destroy");
            $("#addTable2").bootstrapTable("destroy");
            $("#goodsInfo").bootstrapTable("destroy");
            $("#addGoodTable").bootstrapTable("destroy");
            $("#commondityTable").bootstrapTable("destroy");
            this.initTable();
        },
    }
});