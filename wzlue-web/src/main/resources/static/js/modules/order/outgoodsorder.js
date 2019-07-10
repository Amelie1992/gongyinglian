$(function () {
    //列表
    vm.initTable();
    //表单提交
    $("#addform").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });   //表单提交
    $("#complaintForm").FM({
        fields: vm.complaintFields,
        success: vm.saveComplaint
    });
    $("#afterSaleForm").FM({
        fields: vm.afterSalefields,
        success: vm.saveAftersale
    });
    $("#changePriceForm").FM({
        fields: vm.changePriceFields,
        success: vm.saveChangePrice
    });
    $("#depotform").FM({
        fields: vm.depotFields,
        success: vm.saveDepot
    });
    $("#refuseForm").FM({
        fields: vm.fields3,
        success: vm.refuseOrder
    });
    $("#shipForm").FM({
        fields: vm.shipFields,
        success: vm.addGoodsOrderShip
    });
    $("#receiptForm").FM({
        fields: vm.receiptFields,
        success: vm.receipt
    });


    $('#refuseModal').on('hide.bs.modal', function () {
        $('#refuseForm').bootstrapValidator('resetForm', true);
        $('#refuseForm')[0].reset();
    });
    $('#transactionMannerModal').on('hide.bs.modal', function () {
        $('#depotform').bootstrapValidator('resetForm', true);
        $('#depotform')[0].reset();
    });
    $('#receiptModal').on('hide.bs.modal', function () {
        $('#receiptForm').bootstrapValidator('resetForm', true);
        $('#receiptForm')[0].reset();
    });

});
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        depot: {},
        complaintShow: true,
        kdnData: {
            serviceType: "B",
            expCode: "",
            expNo: "",
            showType: "normal",
            container: "shipElement"
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
            {value: 'tbd', label: '待发货'},
            {value: 'tbpu', label: '待提货'},
            {value: 'pr', label: '待收货'},
            {value: 'tc', label: '交易完成'},
        ],
        files: {},
        file1: {},//报关单
        file2: {},//缴税单
        file3: {},//查验单
        file4: {},//检疫证
        file5: {},//其他文件
        viewStatus: 0,//0查看详情1发货2:查看物流3:报关
        orderId: null,
        // totalPrice: null,
        actualPayment: null,
        newTotalPrice: null,
        // transportationExpenses: null,
        // newTransportationExpenses: null,
        goodsOrderShip: {},
        addOrder: false,
        showList: true,
        title: null,
        //订单对象
        images: [],
        goodsOrder: {},
        paymentMethods: ['余额支付', '银联支付', '公司转账'],
        transactionModes: ['一次性支付', '分期支付', '其他（账期）'],
        orderStatus: {
            tbc: '待确认', cto: '订单取消', tbp: '待支付', ap: '已付款', tbd: '待发货', tbpu: '待提货', s: '已发货', pr: '待收货', tc: '交易完成',
        },
        params: {
            sellerId: '0',
        },
        //物流公司
        logisticsOptions: [],
        merchants: [],
        complaint: {},//投诉
        afterSale: {},//投诉
        serviceTypeList: ['退货', '换货', '索赔'],
        refundFormList: ['线上支付', '线下转账', '其他'],
        reasonList: ['物品损坏', '质量不合格', '产品型号错误', '其他'],
        status: ['待处理', '已处理'],
        resultList: ['通过', '不通过'],
        showGoodParams: {},
        addGoodColumns: [],
        //已经添加过的id
        addids: [],
        address: {},
        storageConfirm: {},
        LookStorage: true,
        priceVersionShow: true,
        showDepot: false,       //仓储信息不显示
        transactionManners: ['CFR', 'CIF', 'CPT', 'CIP', 'DAF', 'DES', 'DEQ', 'DDU', 'DDP', 'FOB', 'FCA', 'FAS', 'EXW'],
//验证字段
        fields: {
            orderNumber: {
                message: '订单编号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单编号不能为空'
                    },
                },
            }, sellerId: {
                message: '商家id验证失败',
                validators: {
                    notEmpty: {
                        message: '商家id不能为空'
                    },
                },
            }, sellerName: {
                message: '商家名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商家名称不能为空'
                    },
                },
            }, sellerContact: {
                message: '商家联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '商家联系方式不能为空'
                    },
                },
            }, purchaserCompanyId: {
                message: '购买者公司id验证失败',
                validators: {
                    notEmpty: {
                        message: '购买者公司id不能为空'
                    },
                },
            }, purchaserCompanyName: {
                message: '购买者公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '购买者公司名称不能为空'
                    },
                },
            }, purchaserName: {
                message: '购买者名称验证失败',
                validators: {
                    notEmpty: {
                        message: '购买者名称不能为空'
                    },
                },
            }, purchaserContact: {
                message: '购买者联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '购买者联系方式不能为空'
                    },
                },
            }, totalPrice: {
                message: '默认商品总价格验证失败',
                validators: {
                    notEmpty: {
                        message: '默认商品总价格不能为空'
                    },
                },
            }, transportationExpenses: {
                message: '运费验证失败',
                validators: {
                    notEmpty: {
                        message: '运费不能为空'
                    },
                },
            }, actualPayment: {
                message: '实付款验证失败',
                validators: {
                    notEmpty: {
                        message: '实付款不能为空'
                    },
                },
            }, paymentMethod: {
                message: '支付方式 如果商家有服务则0：商家安排1：自行安排验证失败',
                validators: {
                    notEmpty: {
                        message: '支付方式 如果商家有服务则0：商家安排1：自行安排不能为空'
                    },
                },
            }, customsDeclaration: {
                message: '报关方式如果商家有服务则0：商家安排1：自行安排验证失败',
                validators: {
                    notEmpty: {
                        message: '报关方式如果商家有服务则0：商家安排1：自行安排不能为空'
                    },
                },
            }, storageMode: {
                message: '仓储方式如果商家有服务则0：商家安排1：自行安排验证失败',
                validators: {
                    notEmpty: {
                        message: '仓储方式如果商家有服务则0：商家安排1：自行安排不能为空'
                    },
                },
            }, modeOfPayment: {
                message: '分期付款方式如果商家有服务则0：商家安排1：自行安排验证失败',
                validators: {
                    notEmpty: {
                        message: '分期付款方式如果商家有服务则0：商家安排1：自行安排不能为空'
                    },
                },
            }, downPayment: {
                message: '首付金额验证失败',
                validators: {
                    notEmpty: {
                        message: '首付金额不能为空'
                    },
                },
            }, prePickUpTime: {
                message: '预提货时间验证失败',
                validators: {
                    notEmpty: {
                        message: '预提货时间不能为空'
                    },
                },
            }, orderStatus: {
                message: '订单状态0：待支付1：已付款2：待发货3：已发货4：待收货5：交易完成验证失败',
                validators: {
                    notEmpty: {
                        message: '订单状态0：待支付1：已付款2：待发货3：已发货4：待收货5：交易完成不能为空'
                    },
                },
            }, agreementId: {
                message: '合同id验证失败',
                validators: {
                    notEmpty: {
                        message: '合同id不能为空'
                    },
                },
            }, createBy: {
                message: '创建人验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人不能为空'
                    },
                },
            }, createTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, modifyBy: {
                message: '修改人id验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人id不能为空'
                    },
                },
            }, modifyTime: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }, remarks: {
                message: '备注验证失败',
                validators: {
                    notEmpty: {
                        message: '备注不能为空'
                    },
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
            orderId: {
                message: '订单号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单号不能为空'
                    },
                },
            }, buyer: {
                message: '买家验证失败',
                validators: {
                    notEmpty: {
                        message: '买家不能为空'
                    },
                },
            }, seller: {
                message: '卖家验证失败',
                validators: {
                    notEmpty: {
                        message: '卖家不能为空'
                    },
                },
            }, goodsName: {
                message: '商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    },
                },
            }, unitPrice: {
                message: '单价验证失败',
                validators: {
                    notEmpty: {
                        message: '单价不能为空'
                    },
                },
            }, number: {
                message: '数量验证失败',
                validators: {
                    notEmpty: {
                        message: '数量不能为空'
                    },
                },
            }, totalPrice: {
                message: '总价验证失败',
                validators: {
                    notEmpty: {
                        message: '总价不能为空'
                    },
                },
            }, serviceType: {
                message: '服务类型验证失败',
                validators: {
                    notEmpty: {
                        message: '服务类型不能为空'
                    },
                },
            }, quantity: {
                message: '索赔/退换货数量验证失败',
                validators: {
                    notEmpty: {
                        message: '索赔/退换货数量不能为空'
                    },
                    callback: {
                        message: '申请的数量不能大于订单的数量',
                        callback: function (value, validator, $field) {
                            var num = vm.afterSale.number;//获得另一个的值
                            if (value <= num) {
                                return true;
                            }
                            return false;
                        }
                    }
                },
            }, refundForm: {
                message: '退款方式验证失败',
                validators: {
                    notEmpty: {
                        message: '退款方式不能为空'
                    },
                },
            }, temporaryStorage: {
                message: '暂存仓库验证失败',
                validators: {
                    notEmpty: {
                        message: '暂存仓库不能为空'
                    },
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
                    },
                },
            }, applicationDate: {
                message: '申请日期验证失败',
                validators: {
                    notEmpty: {
                        message: '申请日期不能为空'
                    },
                },
            }, status: {
                message: '处理状态验证失败',
                validators: {
                    notEmpty: {
                        message: '处理状态不能为空'
                    },
                },
            }, result: {
                message: '处理结果验证失败',
                validators: {
                    notEmpty: {
                        message: '处理结果不能为空'
                    },
                },
            }, suggestion: {
                message: '处理意见验证失败',
                validators: {
                    notEmpty: {
                        message: '处理意见不能为空'
                    },
                },
            }, deptId: {
                message: '权限部门id验证失败',
                validators: {
                    notEmpty: {
                        message: '权限部门id不能为空'
                    },
                },
            }, createdBy: {
                message: '创建人验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人不能为空'
                    },
                },
            }, createdTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, updateBy: {
                message: '修改人验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人不能为空'
                    },
                },
            }, updateTime: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }
        },
        depotFields: {
            storageName: {
                message: '仓库名称验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库名称不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '仓库名称须小于20个字符'
                    }
                },
            }, address: {
                message: '仓库地址验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库地址不能为空'
                    }, stringLength: {
                        max: 30,
                        message: '仓库地址须小于30个字符'
                    }
                },
            }, contact: {
                message: '联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '联系人须小于20个字符'
                    }
                },
            }, phone: {
                message: '联系电话验证失败',
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    }, regexp: {
                        regexp: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: '请正确输入联系电话'
                    }
                },
            }, email: {
                message: '邮箱验证失败',
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    }, regexp: {
                        regexp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z_-]{2,5})$/,
                        message: '请正确输入邮箱'
                    }
                },
            }, unit: {
                message: '仓库收费单位验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库收费单位不能为空'
                    },
                },
            }, money1: {
                message: '仓储费验证失败',
                validators: {
                    notEmpty: {
                        message: '仓储费不能为空'
                    },
                },
            }, money2: {
                message: '装卸费验证失败',
                validators: {
                    notEmpty: {
                        message: '装卸费不能为空'
                    },
                },
            }, money3: {
                message: '处置费验证失败',
                validators: {
                    notEmpty: {
                        message: '处置费不能为空'
                    },
                },
            }, money4: {
                message: '重复上下架验证失败',
                validators: {
                    notEmpty: {
                        message: '重复上下架不能为空'
                    },
                },
            }, money5: {
                message: '分拣费验证失败',
                validators: {
                    notEmpty: {
                        message: '分拣费不能为空'
                    },
                },
            }, money6: {
                message: '理货费验证失败',
                validators: {
                    notEmpty: {
                        message: '理货费不能为空'
                    },
                },
            }, money7: {
                message: '抄码费验证失败',
                validators: {
                    notEmpty: {
                        message: '抄码费不能为空'
                    },
                },
            }, money8: {
                message: '复冻费验证失败',
                validators: {
                    notEmpty: {
                        message: '复冻费不能为空'
                    },
                },
            }, money9: {
                message: '查验移箱费验证失败',
                validators: {
                    notEmpty: {
                        message: '查验移箱费不能为空'
                    },
                },
            }, money10: {
                message: '查验掏箱费验证失败',
                validators: {
                    notEmpty: {
                        message: '查验掏箱费不能为空'
                    },
                },
            }, money11: {
                message: '查验开关箱门费及铅封验证失败',
                validators: {
                    notEmpty: {
                        message: '查验开关箱门费及铅封不能为空'
                    },
                },
            }, money12: {
                message: '门到门查验费验证失败',
                validators: {
                    notEmpty: {
                        message: '门到门查验费不能为空'
                    },
                },
            }, money13: {
                message: '出入库费验证失败',
                validators: {
                    notEmpty: {
                        message: '出入库费不能为空'
                    },
                },
            }, money14: {
                message: '缠绕膜验证失败',
                validators: {
                    notEmpty: {
                        message: '缠绕膜不能为空'
                    },
                },
            }, money15: {
                message: '箱车对倒验证失败',
                validators: {
                    notEmpty: {
                        message: '箱车对倒不能为空'
                    },
                },
            }, money16: {
                message: '预冷费验证失败',
                validators: {
                    notEmpty: {
                        message: '预冷费不能为空'
                    },
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
        shipFields: {
            logisticsCode: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '长度须少于20个字符'
                    },
                },
            }, singleNumber: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }, stringLength: {
                        max: 30,
                        message: '长度须少于30个字符'
                    },
                },
            }, numberPlate: {
                validators: {
                    notEmpty: {
                        message: '车牌号不能为空'
                    }, regexp: {
                        regexp: /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/,
                        message: '车牌号格式不正确！'
                    },
                },
            }, numberPlate2: {
                validators: {
                   /* notEmpty: {
                        message: '不能为空'
                    },*/stringLength: {
                        max: 20,
                        message: '长度须少于20个字符'
                    },
                },
            }, driverName: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '长度须少于20个字符'
                    },
                },
            }, driverNumber: {
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
                   /* notEmpty: {
                        message: '驾驶员身份证号不能为空'
                    }, */
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
        },
        receiptFields: {
            agreementId: {
                validators: {
                    notEmpty: {
                        message: '合同编号不能为空'
                    }, stringLength: {
                        max: 30,
                        message: '合同编号长度须少于30个字符'
                    },regexp: {
                        regexp: /^[^\u4e00-\u9fa5]{0,}$/,
                        message: '请勿输入中文'
                    }
                },
            }, sellerBankCard: {
                validators: {
                    /* notEmpty: {
                         message: '银行卡号不能为空'
                     },*/
                    regexp: {
                        regexp: /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/,
                        message: '银行卡号不正确'
                    }
                },
            }
        },
        changePriceFields: {
            newTotalPrice: {
                validators: {
                    notEmpty: {
                        message: '折后价不能为空'
                    },
                    regexp: {
                        //(^0$)|
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
                        message: '折后价为整数最多9位，小数最多2位的正数'
                    }
                },
            }
        }
    },
    methods: {
        //初始化表格
        initTable: function () {
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
                        field: 'sellerName',
                        width: '16%',
                        formatter: function (value, row, index) {
                            /*  var detail = row.detail;
                              if (!detail) {
                                  detail = {};
                                  detail.goodsName = null;
                                  detail.goodsUnit = null;
                              }
                              var src = detail[0].goodsImageUrl;
                              var str;
                              if (row.goodsCsc == 0) {
                                  str = '<div class="row" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                                      '<div class="col-sm-6">' +
                                      '<img class="thumbnail" style="background-color:#f9f9f9" src="" load-src="' + src + '" width="100px" alt="商品图片" onerror="vm.imgExists(this)">' +
                                      '</div>' +
                                      '<div class="col-sm-6">' +
                                      '<div title="' + detail[0].goodsName + '">商品名称:' + detail[0].goodsName + '</div>' +
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
                            return row.orderCount + '&nbsp;&nbsp;' + unit;
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
                    //         if (row.goodsCsc == 0) {
                    //             str = detail[0].goodsTotalPrice;
                    //         } else {
                    //             str = detail[0].goodsTotalPrice;
                    //         }
                    //         return str;
                    //     }
                    // },
                    /*{
                        title: vm.$t("num") + '/' + vm.$t("Piece"),
                        valign: 'middle',
                        align: 'center',
                        // width: '5%',
                        formatter: function (value, row) {
                            var detail = row.detail;
                            if (!detail) {
                                detail = {};
                                detail.goodsName = null;
                                detail.goodsUnit = null;
                            }
                            var str;
                            // if (row.goodsCsc == 0) {
                            //     str = detail[0].goodsCount + "&nbsp;" + detail[0].unitName;
                            // } else {
                            //     str = detail[0].goodsCount + "&nbsp;" + detail[0].unitName;
                            // }
                            return detail[0].goodsCount;
                        }
                    },*/
                    /*                    {
                                            title: '操作',
                                            valign: 'middle',
                                            align: 'center',
                                            field: 'orderId',
                                            formatter: function (value, row, index) {
                                                var div = document.createElement('div');
                                                //投诉
                                                var complaint = document.createElement('a');
                                                complaint.setAttribute("class", "complaint");
                                                complaint.setAttribute("href", "javascript:void(0)");
                                                complaint.setAttribute("style", "display:block;");
                                                complaint.innerText = "投诉";
                                                div.appendChild(complaint);
                                                //售后
                                                var afterSale = document.createElement('a');
                                                afterSale.setAttribute("class", "complaint");
                                                afterSale.setAttribute("href", "javascript:void(0)");
                                                afterSale.setAttribute("style", "display:block;");
                                                afterSale.innerText = "售后";
                                                if (row.orderStatus == 5) {
                                                    div.appendChild(afterSale);
                                                }
                                                return div.innerHTML;
                                            }
                                        },*/
                    {
                        title: vm.$t("OrderTotalPrice"),
                        field: 'total',
                        valign: 'middle',
                        align: 'center',
                        // width: '7%',
                        formatter: function (value, row, index) {
                            var str = row.actualPayment == null ? '0' : row.actualPayment;
                            var div = document.createElement('div');
                            var span = document.createElement('span');
                            // if (row.distributionMode == 1) {
                            //     span.textContent = '￥' +
                            //         str;
                            // } else {
                            //     span.textContent = '￥' +
                            //         str + '（含运费：￥' + row.transportationExpenses + '）';
                            // }
                            if (row.currency == 1) {
                                span.textContent = str + "  元";
                            } else if (row.currency == 2) {
                                span.textContent = str + "  美元";
                            }
                            var aDiv = document.createElement('div');
                            var a = document.createElement(a);
                            a.setAttribute("href", 'javascript:void(0)');
                            a.setAttribute("type", 'text');
                            a.setAttribute("style", "cursor:pointer;color:red");
                            a.setAttribute("data-pk", row.orderId);
                            a.setAttribute("class", "bjEdit")
                            if (row.orderStatus == 'tbc') {
                                aDiv.append(a);
                            }
                            a.textContent = "改价";
                            div.append(span)
                            //'<a href="javascript:void(0)" data-pk="' + row.commodityPrice + '" data-type="text" id="bjEdit" class="bjEdit editable editable-click editable-empty input-sm control-label col-sm-6" data-value="' + row.commodityPrice + '" data-title="请输入报价">' + row.commodityPrice + '</a>&nbsp;&nbsp;&nbsp;' +
                            div.append(aDiv);
                            return div.innerHTML;

                        },
                        events: {
                            'click .bjEdit': function (el, value, row, index) {
                                console.log("row", row);
                                // vm.totalPrice = row.totalPrice;
                                // vm.transportationExpenses = row.transportationExpenses;
                                vm.actualPayment = row.actualPayment;
                                vm.newTotalPrice = null;
                                // vm.newTransportationExpenses = null;
                                vm.orderId = row.orderId;
                                vm.goodsOrder = row;
                                vm.goodsOrder.orderNumber = row.orderNumber;
                                vm.goodsOrder.detail = row.detail;
                                vm.goodsOrder.cinfo = row.cinfo;
                                $('#changePriceModal').modal('show');
                            }
                        }
                    },
                    {
                        title: vm.$t("TradingTime"),
                        valign: 'middle',
                        align: 'center',
                        field: 'createTime',
                        // width: '10%',
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
                            /* if(row.isAgent == 1){
                                 status = '代理';
                             }else{*/
                            var status = vm.orderStatus[row.orderStatus];
                            if (row.orderStatus == 'pr') {
                                status = vm.orderStatus['s'];
                            }
                            if ('cto' == row.orderStatus) {
                                if (row.statusOwner == 0) {
                                    status = '买家取消';
                                }
                                if (row.statusOwner == 1) {
                                    status = '卖家取消';
                                }
                            } else if ('ap' == row.orderStatus && row.distributionMode == 1) {
                                status = '等待买家提货';
                            } else if ('ctom' == row.orderStatus) {
                                status = '待卖家取消';
                            } else if ('ctob' == row.orderStatus) {
                                status = '待买家取消';
                            }

                            /* }*/
                            return '<div>' +
                                '<div><span>' + status + '</span></div>'
                        },

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
                            getInfo.innerText = '查看详情';
                            var refuse = document.createElement('button');
                            refuse.setAttribute('class', 'btn btn-primary btn-sm refuseOrder');
                            refuse.setAttribute('style', 'margin-left:5px');
                            refuse.innerText = '拒绝接单';
                            var cancel = document.createElement('button');
                            cancel.setAttribute('class', 'btn btn-primary btn-sm cancelOrder');
                            cancel.setAttribute('style', 'margin-left:5px');
                            cancel.innerText = '结束订单';
                            var confirm = document.createElement('button');
                            confirm.setAttribute('class', 'btn btn-primary btn-sm confirmOrder');
                            confirm.setAttribute('style', 'margin-left:5px');
                            confirm.innerText = "确认接单";
                            var ship = document.createElement('button');
                            ship.setAttribute('class', 'btn btn-primary btn-sm ship');
                            ship.setAttribute('style', 'margin-left:5px');
                            ship.innerText = "立即发货";
                            var delivery = document.createElement('button');
                            delivery.setAttribute('class', 'btn btn-primary btn-sm delivery');
                            delivery.setAttribute('style', 'margin-left:5px');
                            delivery.innerText = "确认提货";
                            var showShip = document.createElement('button');
                            showShip.setAttribute('class', 'btn btn-primary btn-sm showShip');
                            showShip.setAttribute('style', 'margin-left:5px');
                            showShip.innerText = "查看物流";
                            var customs = document.createElement('button');
                            customs.setAttribute('class', 'btn btn-primary btn-sm customs');
                            customs.setAttribute('style', 'margin-left:5px');
                            customs.innerText = "报关资料查询"
                            var woc = document.createElement('button');
                            woc.setAttribute('class', 'btn btn-primary btn-sm woc');
                            woc.setAttribute('style', 'margin-left:5px');
                            woc.innerText = "查看仓储订单";
                            switch (row.orderStatus) {
                                case 'agr':
                                    break;
                                case 'tbp':   //待支付
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    if (row.storageMode == 0) {
                                        div.appendChild(woc);
                                    }
                                    break;
                                case 'ctom'://待商家确认取消
                                    div.appendChild(getInfo);
                                    cancel.innerText = "确认结束";
                                    div.appendChild(cancel);
                                    break;
                                case 'tbpu'://待提货
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    break;
                                case 'pr'://待收货
                                    div.appendChild(getInfo);
                                    div.appendChild(showShip);
                                    div.appendChild(cancel);
                                    // if (row.transactionManner != 'EXW') {
                                    //     div.appendChild(customs);
                                    // }
                                    /*if (row.storageMode == 0) {
                                        div.appendChild(woc);
                                    }*/
                                    break;
                                case 'tbc'://待确认
                                    div.appendChild(getInfo);
                                    // cancel.innerText="拒绝接单";
                                    // div.appendChild(cancel);
                                    div.appendChild(refuse);
                                    div.appendChild(confirm);
                                    break;
                                case 'ap'://已付款
                                    div.appendChild(getInfo);
                                    div.appendChild(cancel);
                                    // if (row.distributionMode != 1) {
                                    //     div.appendChild(ship);
                                    // }
                                    break;
                                case 'tbd'://待安排
                                    div.appendChild(getInfo);
                                    div.appendChild(ship);
                                    div.appendChild(cancel);
                                    break;
                                /*case 'tbpu':
                                    div.appendChild(getInfo);
                                    div.appendChild(delivery);
                                    break;*/
                                default:
                                    div.appendChild(getInfo);
                                    break;
                            }
                            return div.innerHTML;
                        },
                        events: {
                            'click .refuseOrder': function (el, value, row, index) {
                                vm.goodsOrder.orderId = row.orderId;
                                vm.goodsOrder.orderStatus = 'cto';
                                vm.goodsOrder.cancelFlag = 1;//接单前取消
                                vm.goodsOrder.remarks = '';
                                vm.goodsOrder.detail = [];
                                $("#refuseModal").modal('show');
                            },
                            'click .cancelOrder': function (el, value, row, index) {
                                var status = row.orderStatus;
                                if (status == 'tbc') {//接单前取消
                                    row.orderStatus = 'cto';
                                    row.cancelFlag = 1;
                                } else if (status == 'ctom') {
                                    row.orderStatus = 'cto';
                                } else {
                                    row.orderStatus = 'ctob';
                                }
                                row.statusOwner = 1;
                                console.log("取消订单")
                                row.statusCount = -1;
                                confirm('确定要完结订单？', function () {
                                    vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, row.statusCount,row.cancelFlag);
                                })
                            },
                            'click .getInfo': function (event, value, row, index) {
                                vm.getInfo(row.orderId);
                            },
                            'click .confirmOrder': function (el, value, row, index) {
                                vm.storageConfirm.orderId = row.orderId;
                                vm.storageConfirm.orderStatus = 'tbp';
                                vm.storageConfirm.statusOwner = 0;
                                vm.storageConfirm.statusCount = ++(row.statusCount);
                                $("#receiptModal").modal('show');
                                /*if (row.storageMode === 0) {   //商家安排仓储
                                    // vm.depot = {
                                    //     money2: 0,
                                    //     money3: 0,
                                    //     money4: 0,
                                    //     money5: 0,
                                    //     money6: 0,
                                    //     money7: 0,
                                    //     money8: 0,
                                    //     money9: 0,
                                    //     money10: 0,
                                    //     money11: 0,
                                    //     money12: 0,
                                    //     money13: 0,
                                    //     money14: 0,
                                    //     money15: 0,
                                    //     money16: 0
                                    // };
                                    if (row.depot != null) {
                                        vm.depot = row.depot;
                                    }
                                    vm.depot.orderId = row.orderNumber;
                                    vm.LookStorage = false;
                                    $("#transactionMannerModal").modal('show');
                                } else if (row.storageMode === 1) {    //自行安排仓储
                                    vm.receipt(vm.storageConfirm);
                                }*/
                                /* row.orderStatus = 'tbp';
                                 row.statusOwner = 0;
                                 vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));*/
                            },
                            'click .delivery': function (el, value, row, index) {
                                row.orderStatus = 'tc';
                                row.statusOwner = null;
                                vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));
                            },
                            'click .customs': function (el, value, row, index) {
                                vm.update(row.orderId, '报关', 3);
                                vm.fileStart();
                            },
                            'click .ship': function (el, value, row, index) {
                                //row.orderStatus = 'pr';
                                //row.statusOwner = 0;
                                //vm.updateStatus(row.orderId, row.orderStatus, row.statusOwner, ++(row.statusCount));
                                // vm.getLogisticsOptions();
                                vm.update(row.orderId, '发货', 1);
                            },
                            'click .showShip': function (el, value, row, index) {
                                vm.update(row.orderId, '查看物流', 2);
                            },
                            'click .woc': function (el, value, row, index) {
                                //vm.update(row.orderId, '查看物流', 2);
                                vm.depot = {};
                                if (row.depot != null) {
                                    vm.depot = row.depot;
                                }
                                vm.depot.orderId = row.orderNumber;
                                vm.LookStorage = true;
                                $("#transactionMannerModal").modal('show');
                            },
                        }
                    },
                ],
                //条件查询
                queryParams: vm.params,
                onLoadSuccess: function () {
                    setTimeout(function () {
                        $('#table').bootstrapTable('resetView');
                    }, 0)
                    /* $(".bjEdit").editable(
                         {
                             emptytext: '改价',
                             title: '请输入改价',
                             params: function (params) {
                                 var data = {};
                                 data.orderId = params.pk;
                                 data.totalPrice = params.value;
                                 return JSON.stringify(data);
                             },
                             ajaxOptions: {
                                 type: 'post',
                                 contentType: 'application/json',
                                 dataType: 'json',
                             },
                             url: '/order/goodsorder/update'
                         }
                     );
                     $(".bjEdit").on('save', function (e, params) {
                         console.log(params)
                     })*/
                }
                /*onEditableSave: function (field, row, oldValue, $el) {
                    console.log('field',field)
                    console.log('row',row)
                    if(field == 'total'){
                        console.log(row.total)
                    }
                }*/
            });

            /* $("#contenTable").bootstrapTable("destroy")
             $("#contenTable").BT({
                 height: 200,
                 pagination: false,
                 columns: [
                     {
                         title: vm.$t("product"),
                         valign: 'middle',
                         align: 'center',
                         field: 'remarks',
                         formatter: function (value, row) {
                             var str;
                             str = '<div class="row container">' +
                                 /!*'<div class="col-sm-12 text-center">' +*!/
                                 '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +
                                 '<div class="col-sm-1 text-center" style="margin-top: 10px;">' +
                                 '<div>名称:' + row.goodsName + '</div>' +
                                 // '<div>规格:' + row.goodsUnit + '</div>' +
                                 '</div>' +
                                 '</div>';
                             return str;
                         }
                     },
                     {
                         title: vm.$t("UnitPrice"),
                         valign: 'middle',
                         align: 'center',
                         field: 'goodsTotalPrice',
                         formatter: function (value, row, index) {
                             if (row.goodsCurrency == 1) {
                                 return value + "&nbsp;" + "元";
                             } else if (row.goodsCurrency == 2) {
                                 return value + "&nbsp;" + "美元";
                             }
                         }
                     },
                     {
                         title: vm.$t("num") + '/' + vm.$t("Piece"),
                         valign: 'middle',
                         align: 'center',
                         field: 'goodsCount',
                         formatter: function (value, row) {
                             // return row.goodsCount + "&nbsp;" + row.unitName;
                             return row.goodsCount;
                         }
                     },
                     {
                         title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                         formatter: function (value, row) {
                             var goodsPrice = row.goodsCount * row.goodsTotalPrice;
                             if (row.goodsCurrency == 1) {
                                 return goodsPrice + "&nbsp;" + "元";
                             } else if (row.goodsCurrency == 2) {
                                 return goodsPrice + "&nbsp;" + "美元";
                             }
                         }
                     },
                 ]
             })*/

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
                               /* '<div class="row container">' +*/
                                /*'<div class="col-sm-12 text-center">' +
                                '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +*/
                               /* '<div class="col-sm-2 text-center" style="margin-top: 10px;">' +*/
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
                              /*  '<div class="row container">' +*/
                                /*'<div class="col-sm-12 text-center">' +
                                '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +*/
                              /*  '<div class="col-sm-4 text-center" style="margin-top: 10px;">' +*/
                                '<div>品名:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '<div>包装:' + packing + '</div>'
                               /*  +'</div>' +
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
            })

            $("#addTable").bootstrapTable("destroy")
            $("#addTable").BT({
                data: vm.addGoods,
                columns: [
                    {
                        title: vm.$t("product"),
                        field: 'remarks',
                        valign: 'middle',
                        align: 'center',
                        formatter: function (value, row) {
                            var img = '';
                            var images = row.images;
                            if (images != null && images.length > 0) {
                                img = images[0];
                            }
                            return '<div class="row">' +
                                '<div class="col-sm-6">' +
                                '<img src=' + img.picUrl + ' width="100px" alt=' + img.picName + '>' +
                                '</div>' +
                                '<div class="col-sm-6">' +
                                '<div>商品名称:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    },
                    {title: vm.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsPromotionPrice'},
                    {
                        title: vm.$t("num") + '/' + vm.$t("Piece"),
                        valign: 'middle',
                        align: 'center',
                        field: 'goodsCount',
                        editable: {
                            type: 'text',
                            width: '10%',
                            title: vm.$t("num"),
                            emptytext: vm.$t("num"),
                            defaultValue: 1,
                            validate: function (v) {
                                if (!v) return vm.$t("num");
                            },
                        },
                        onEditableSave: function () {
                            console.log("1onEditableSave")
                        }
                    },
                    {title: vm.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'totalPrice'},
                ],
                onEditableSave: function (field, row, oldValue, $el) {
                    if (field == 'goodsCount') {
                        row.totalPrice = (row.goodsCount * row.goodsPrice).toFixed(2);
                        var index = $el.parent().parents('tr').data('index');
                        $("#addTable").bootstrapTable('updateRow', index, row)
                    }
                }
            })
            //售后表格
            $("#goodsInfo").bootstrapTable("destroy");
            $("#goodsInfo").BT({
                height: 150,
                columns: [
                    {checkbox: true},
                    {title: vm.$t("productName"), field: 'goodsName'},
                    {title: vm.$t("UnitPrice"), field: 'unitPrice'},
                    {title: vm.$t("num") + '/' + vm.$t("Piece"), field: 'number'},
                    {title: vm.$t("TotalPrice"), field: 'totalPrice'}
                ]
            });
            $("#addGoodTable").bootstrapTable("destroy")
            $("#addGoodTable").BT({
                url: baseURL + 'offer/goodsoffer/list',
                columns: vm.getAddTableColumns(),
                queryParams: vm.showGoodParams
            })
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
        //保存仓储信息---接单---商家安排仓储
        saveDepot: function () {
            // if (vm.depot.money2 == null || vm.depot.money2 == "" || vm.depot.money3 == null || vm.depot.money3 == "" || vm.depot.money4 == null || vm.depot.money4 == "" || vm.depot.money5 == null || vm.depot.money5 == ""
            //     || vm.depot.money6 == null || vm.depot.money6 == "" || vm.depot.money7 == null || vm.depot.money7 == "" || vm.depot.money8 == null || vm.depot.money8 == "" || vm.depot.money9 == null || vm.depot.money9 == ""
            //     || vm.depot.money10 == null || vm.depot.money10 == "" || vm.depot.money11 == null || vm.depot.money11 == "" || vm.depot.money12 == null || vm.depot.money12 == "" || vm.depot.money13 == null || vm.depot.money13 == ""
            //     || vm.depot.money14 == null || vm.depot.money14 == "" || vm.depot.money15 == null || vm.depot.money15 == "" || vm.depot.money16 == null || vm.depot.money16 == ""
            // ) {
            //     alert("请填写仓储费用明细");
            //     return false;
            // }
            var url = "order/goodsorder/info/" + vm.storageConfirm.orderId;
            var goodsOrder;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                async: false,
                success: function (r) {
                    goodsOrder = r.goodsOrder;
                }
            });
            //更新订单状态
            goodsOrder.orderStatus = vm.storageConfirm.orderStatus;
            goodsOrder.statusOwner = vm.storageConfirm.statusOwner;
            goodsOrder.statusCount = vm.storageConfirm.statusCount;
            goodsOrder.depot = vm.depot;
            url = "order/goodsorder/updateStatus";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(goodsOrder),
                success: function (r) {
                    if (r.code === 0) {
                        $("#transactionMannerModal").modal('hide');
                        vm.depot = {};
                        alert("操作成功");
                        vm.reload()
                        /* //保存仓储信息
                         $.ajax({
                             url: baseURL + 'depot/goodsorderdepot/save',
                             type: 'post',
                             data: JSON.stringify(vm.depot),
                             success: function (r) {
                                 $("#transactionMannerModal").modal('hide');
                                 if(r.code === 0){
                                     alert("操作成功");
                                 }
                                 vm.reload()
                             }
                         })*/
                    } else {
                        $("#transactionMannerModal").modal('hide');
                        vm.depot = {};
                        alert(r.msg);
                        vm.reload()
                    }
                }
            });
        },
        isRepeat: function (obj) {
            var flag = true;
            $.ajaxSettings.async = false;
            $.get(baseURL + "contract/goodscontract/queryByContractNumber/" + vm.goodsOrder.agreementId, function (r) {
                if (r.data != null && r.data.length > 0) {
                    alert("该合同编号已存在");
                    vm.goodsOrder.agreementId = '';
                    $("input[name='agreementId']").val('');
                    $("#receiptForm").data("bootstrapValidator").updateStatus('agreementId', 'NOT_VALIDATED').validateField('agreementId');
                    flag = false;
                }
            });
            $.ajaxSettings.async = true;
            return flag;
        },
        //接单---自行安排仓储
        receipt: function () {
            var repeat = vm.isRepeat();
            if (!repeat){
                return;
            }
            var url = "order/goodsorder/info/" + vm.storageConfirm.orderId;
            var goodsOrder;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                async: false,
                success: function (r) {
                    goodsOrder = r.goodsOrder;
                }
            });
            //更新订单状态
            goodsOrder.orderStatus = vm.storageConfirm.orderStatus;
            goodsOrder.statusOwner = vm.storageConfirm.statusOwner;
            goodsOrder.statusCount = vm.storageConfirm.statusCount;
            //用户输入
            goodsOrder.agreementId = vm.goodsOrder.agreementId;
            goodsOrder.sellerBankCard = vm.goodsOrder.sellerBankCard;
            url = "order/goodsorder/updateStatus";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(goodsOrder),
                success: function (r) {
                    if (r.code === 0) {
                        $("#receiptModal").modal('hide');
                        vm.goodsOrder.agreementId = '';
                        vm.goodsOrder.sellerBankCard = '';
                        alert("操作成功");
                        vm.reload()
                    } else {
                        alert(r.msg);
                        vm.reload()
                    }
                }
            });
        },
        /* //确认接单仓储信息
         saveConfirmStorage:function(){
             //更新订单状态
             var goodsOrder = vm.storageConfirm;
             url = "order/goodsorder/updateStatus";
             $.ajax({
                 type: "POST",
                 url: baseURL + url,
                 contentType: "application/json",
                 data: JSON.stringify(goodsOrder),
                 success: function (r) {
                     if (r.code === 0) {
                         alert('操作成功', function (index) {
                             //保存仓储信息
                             $.ajax({
                                 url: baseURL + 'depot/goodsorderdepot/save',
                                 type: 'post',
                                 data: JSON.stringify(vm.depot),
                                 success: function (r) {
                                     $("#confirmStorage").modal('hide');
                                     vm.reload()
                                 }
                             })
                         });
                     } else {
                         alert(r.msg);
                     }
                 }
             });
         },*/
        //保存发货明细
        addGoodsOrderShip: function () {
            vm.goodsOrderShip.orderId = vm.goodsOrder.orderNumber;
            // if (vm.goodsOrderShip.logisticsCode == "" || vm.goodsOrderShip.logisticsCode == null) {
            //     alert("请选择物流公司");
            //     return;
            // }
            // if (vm.goodsOrderShip.singleNumber == "" || vm.goodsOrderShip.singleNumber == null) {
            //     alert("请填写物流单号");
            //     return;
            // }
            // if (vm.goodsOrderShip.numberPlate == "" || vm.goodsOrderShip.numberPlate == null) {
            //     alert("请填写车牌号");
            //     return;
            // }
            // if (vm.goodsOrderShip.driverName == "" || vm.goodsOrderShip.driverName == null) {
            //     alert("请填写驾驶员姓名");
            //     return;
            // }
            // var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            // if (vm.goodsOrderShip.driverNumber == "" || vm.goodsOrderShip.driverNumber == null) {
            //     alert("请填写驾驶员号码");
            //     return;
            // }
            // if (!phoneReg.test(vm.goodsOrderShip.driverNumber)) {
            //     alert("请填写正确的驾驶员号码");
            //     return;
            // }
            // var cardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            // if (vm.goodsOrderShip.driverIdNumber == "" || vm.goodsOrderShip.driverIdNumber == null) {
            //     alert("请填写驾驶员身份证号");
            //     return;
            // }
            // if (!cardReg.test(vm.goodsOrderShip.driverIdNumber)) {
            //     alert("请填写正确的驾驶员身份证号");
            //     return;
            // }

            if (!isBlank(vm.goodsOrderShip.remark) && vm.goodsOrderShip.remark.length > 30) {
                alert("备注须少于30个字符");
                return;
            }
            $.ajax({
                url: baseURL + 'ship/goodsordership/save',
                type: 'post',
                data: JSON.stringify(vm.goodsOrderShip),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.goodsOrderShip = {};
                            $('#shipForm').bootstrapValidator('resetForm', true);
                            $('#shipForm')[0].reset();
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },
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
        updateStatus: function (orderId, orderStatus, statusOwner, statusCount,cancelFlag) {
            var url = "order/goodsorder/info/" + orderId;
            var goodsOrder;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                async: false,
                success: function (r) {
                    goodsOrder = r.goodsOrder;
                }
            });
            /*if (goodsOrder.statusCount == -1) {
                console.log("订单已经取消,不能修改订单状态")
                vm.reload();
                return;
            }
            if (goodsOrder.statusCount >= statusCount) {
                console.log("服务器订单步数大于当前订单步数")
                vm.reload();
                return;
            }*/
            goodsOrder.orderStatus = orderStatus;
            goodsOrder.statusOwner = statusOwner;
            goodsOrder.statusCount = statusCount;
            goodsOrder.cancelFlag  = cancelFlag;
            url = "order/goodsorder/updateStatus";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(goodsOrder),
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
        //获取公司列表
        getMerchants: function () {
            $.ajax({
                type: "POST",
                url: baseURL + 'order/goodsorder/getMerchants',
                contentType: "application/json",
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
        //公司列表选择事件
        merchantsChange: function (value, childidx, el) {
            this.merchants.forEach(function (t) {
                if (t.value == value) {
                    vm.sellerName = t.label
                    vm.showGoodParams = {goodsState: 1, goodsType: vm.goodsOrder.orderGoodsType, companyId: value};
                    var options = $("#addGoodTable").bootstrapTable('getOptions');
                    options.columns = vm.getAddTableColumns();
                    $("#addGoodTable").BTF5(vm.showGoodParams);
                    $("#addGoodTable").bootstrapTable('refreshOptions', {'options': options})
                    return;
                }
            })
        },
        //保存投诉信息
        saveComplaint: function () {
            if (vm.images.length == 0 && (vm.complaint.images == null || vm.complaint.images == 0)) {
                alert("请上传图片");
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
            vm.complaint.complaintFromId = vm.goodsOrder.sellerId;
            vm.complaint.complaintFrom = vm.goodsOrder.sellerName;
            //被投诉用户
            vm.complaint.complaintToId = vm.goodsOrder.purchaserCompanyId;
            vm.complaint.complaintTo = vm.goodsOrder.purchaserCompanyName;
            vm.complaint.orderType = 1;
            console.log(vm.complaint)
            var url = "complaint/complaint/save";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.complaint),
                success: function (r) {
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
        //保存改价
        saveChangePrice: function () {
          /*  var regexp = /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
            if (vm.newTotalPrice == null || vm.newTotalPrice == "" || !regexp.test(vm.newTotalPrice)) {
                alert("请正确填写改价信息,整数位最多9位，小数位最多2位");
                return false;
            }*/
            // if (vm.newTransportationExpenses == null || vm.newTransportationExpenses == "" || !regexp.test(vm.newTransportationExpenses)) {
            //     alert("请正确填写改价信息");
            //     return false;
            // }

            if (vm.goodsOrder.transactionMode == 1 && vm.newTotalPrice < vm.goodsOrder.downPayment){
                alert("折后价不能小于订单的首付金额:" + " " + vm.goodsOrder.downPayment);
                return;
            }
            var data = {
                // totalPrice: vm.newTotalPrice,
                // transportationExpenses: vm.newTransportationExpenses,
                actualPayment: vm.newTotalPrice,
                orderNumber: vm.goodsOrder.orderNumber,
                orderId: vm.orderId,
                detail: vm.goodsOrder.detail,
                cinfo: vm.goodsOrder.cinfo
            }
            var url = "order/goodsorder/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (r) {
                    if (r.code === 0) {
                        alert('改价成功', function (index) {
                            $("#changePriceModal").modal('hide');
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //保存售后
        saveAftersale: function () {
            if (vm.images.length == 0 && (vm.complaint.images == null || vm.complaint.images == 0)) {
                alert("请上传图片");
                return;
            }
            if (vm.complaint.images == null) {
                vm.complaint.images = [];
            }
            ;
            vm.complaint.images = vm.complaint.images.concat(vm.images)
            vm.complaint.orderId = vm.goodsOrder.orderId;
            //投诉用户
            vm.complaint.complaintFromId = vm.goodsOrder.buyerId;
            //被投诉用户
            vm.complaint.complaintToId = vm.goodsOrder.buyer;
            var url = "complaint/complaint/save";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.complaint),
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
        //显示添加货物modal
        showMModal: function () {
            $("#addGoodTable").bootstrapTable('refreshOptions', vm.getAddTableColumns())
            if (vm.goodsOrder.orderGoodsType == null) {
                return;
            }
            $('#myModal').modal('show')
        },
        //显示投诉modal
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
        //显示售后
        addAftersale: function () {
            vm.images = [];
            vm.$refs.aftersaleFile.destroy();
            vm.$refs.aftersaleFile.initFileInput();
            vm.afterSale = {};
            var detail = JSON.parse(JSON.stringify(vm.goodsOrder.detail));
            vm.afterSale.number = 0;
            detail.forEach(function (item) {
                item.unitPrice = item.goodsPrice;
                item.number = item.goodsCount;
                vm.afterSale.number += item.number;
                item.totalPrice = item.goodsTotalPrice;
            })
            //显示售后分页的条数
            $('#goodsInfo').bootstrapTable('load', {rows: detail, total: detail == null ? 0 : detail.length})
            $('#goodsInfo').bootstrapTable('resetView');
            $("#afterSaleModal").modal('show');
        },
        //保存报关文件
        saveFiles: function () {
            var files = [];
            for (var i = 1; i <= 5; i++) {
                var file = vm['file' + i];
                if (file.picUrl != null) {
                    file.type = 'goods_order';
                    file.picType = 'customs';
                    file.sort = i;
                    file.code = vm.goodsOrder.orderId;
                    files.push(vm['file' + i]);
                }
            }
            $.ajax({
                type: 'post',
                url: baseURL + 'sys/image/saveList',
                data: JSON.stringify(files),
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
        //获取
        getAddTableColumns: function () {
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
                {
                    title: vm.$t('productTypes'), formatter: function (value, row, index) {
                        return row.goodsPodProvince + row.goodsPodCity;
                    }
                },
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
                columns.push({title: vm.$t('cabinet'), field: 'goodsCsc'});
            }
            return columns;
        },
        //添加货物列表点击新增行
        addGood: function () {
            var grid = $('#addGoodTable').bootstrapTable('getSelections');
            if (!grid.length) {
                alert("请选择一条记录");
                return;
            }
            var flag = false;
            grid.forEach(function (item) {
                if (vm.addids.indexOf(item.id) > -1) {
                    flag = true;
                    alert("您已添加过这条商品" + item.goodsName);
                    return;
                }
            })
            if (flag) {
                return;
            }
            grid.forEach(function (item) {
                item.totalPrice = item.goodsPrice;
                vm.addids.push(item['id']);
            })
            $("#addTable").bootstrapTable('append', grid)
            $('#addTable').bootstrapTable('resetView');
        },
        //页面获取订单状态
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
        //table查询
        query: function () {
            vm.reload();
        },
        searchButton: function (value) {
            vm.params.orderNumber = '';
            if (value == "1") {
                vm.params.orderStatus = '';
            } else if (value == "2") {
                vm.params.orderStatus = 'tbp';
            } else if (value == "3") {
                vm.params.orderStatus = 'pr';
            }
            vm.reload();
        },
        //去新增页面
        add: function () {
            vm.showList = false;
            vm.addOrder = true;
            vm.title = "新增";
            vm.goodsOrder = {};
            vm.addids = [];
        },
        //保存订单信息
        addGoodsOrder: function () {
            this.goodsOrder.detail = $('#addTable').bootstrapTable('getData');
            this.goodsOrder.detail.forEach(function (item) {
                item.goodsTotalPrice = item.goodsPromotionPrice;
            })
            var url = "order/goodsorder/save";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOrder),
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
        /**
         * 去修改页面事件
         * @param event
         */
        update: function (orderId, title, viewStatus) {
            if (orderId == null) {
                return;
            }
            vm.showList = false;
            vm.title = title;

            vm.getInfo(orderId);
            vm.viewStatus = viewStatus;
        },
        //表单验证
        validate: function () {
            var bl = $('#addform').VF();//启用验证
            if (!bl) {
                return;
            }
        },       //表单验证
        complaintValidate: function () {
            var bl = $('#complaintForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //验证
        changePriceValidate: function () {
            var bl = $('#changePriceForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //验证
        aftersaleValidate: function () {
            var bl = $('#afterSaleForm').VF();//启用验证
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
        validateDepot: function () {
            var bl = $('#depotform').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        validateShip: function () {
            var bl = $('#shipForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        receiptValidate: function () {
           /* if (vm.goodsOrder.agreementId=="") {
                alert("合同编号不能为空");
                return;
            }*/
            var bl = $('#receiptForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //拒绝接单
        refuseOrder: function (event) {
            $.ajax({
                type: "POST",
                url: baseURL + "order/goodsorder/updateStatus",
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOrder),
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
            var url = vm.goodsOrder.orderId == null ? "order/goodsorder/save" : "order/goodsorder/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOrder),
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
        //删除事件
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
                        if (r.goodsStatus[i].orderStatus == 'cto' || r.goodsStatus[i].orderStatus == 'tc') {

                        } else {
                            alert("无法删除进行中的订单");
                            return false;
                        }
                    }
                    confirm('确定要删除选中的记录？', function () {
                        $.ajax({
                            type: "POST",
                            url: baseURL + "order/goodsorder/deleteSell",
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
                    });

                }
            })


        },
        queryParams: function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                page: Math.ceil((params.offset + 1) / params.limit),  //页码
            };
            //对象合并
            temp = Object.assign(temp, (vm.showGoodParams || {}));
            return temp;
        },
        returnReload: function () {
            location.reload();
        },
        //获取详情
        getInfo: function (orderId) {
            vm.goodsOrder = {};
            vm.address = {};
            vm.viewStatus = 0;
            //$("#contenTable").bootstrapTable('lo',r.goodsOrder.detail);
            $.get(baseURL + "order/goodsorder/info/" + orderId, function (r) {
                vm.showList = false;
                vm.goodsOrder = r.goodsOrder;
                if (vm.goodsOrder.cinfo != null) {
                    vm.address = vm.goodsOrder.cinfo;
                }
                vm.complaintShow = true;
                var status = r.goodsOrder.orderStatus;
                if (status == 'tbc') {//投诉按钮
                    vm.complaintShow = false;
                }
                /*  if (vm.goodsOrder.depot != null) {
                      vm.depot = vm.goodsOrder.depot;
                      vm.showDepot = true;
                  }*/
                var ship = r.goodsOrder.ship;
                if (ship != null) {
                    vm.kdnData.expCode = ship.logisticsCode;
                    vm.kdnData.expNo = ship.singleNumber;
                    KDNWidget.run(vm.kdnData)
                }
                /* if (vm.goodsOrder.files != null) {
                     vm.files = vm.goodsOrder.files;
                 }*/
                //订单信息的分页条数显示
                $("#contenTable").bootstrapTable('load', {
                    rows: r.goodsOrder.detail,
                    total: r.goodsOrder.detail == null ? 0 : r.goodsOrder.detail.length
                });
                $('#contenTable').bootstrapTable('resetView');

                $("#contenTable2").bootstrapTable('load', {
                    rows: r.goodsOrder.detail,
                    total: r.goodsOrder.detail == null ? 0 : r.goodsOrder.detail.length
                });
                $('#contenTable2').bootstrapTable('resetView');
                /* var commondity = [];
                 vm.goodsOrder.detail.forEach(function (item) {
                     commondity = commondity.concat(item.commoditys);
                 })*/
                if (vm.goodsOrder.ship != null) {
                    vm.goodsOrderShip = vm.goodsOrder.ship
                }
                /*//产地分页的数量显示数据
                $("#commondityTable").bootstrapTable('load', {
                    rows: commondity,
                    total: commondity == null ? 0 : commondity.length
                })
                $('#commondityTable').bootstrapTable('resetView');
*/
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
            });
        },
        //验证图片
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
        //初始化
        reload: function (event) {
            vm.showList = true;
            vm.addOrder = false;
            vm.title = "";
            vm.images = [];
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            // $("#addform").RF();
            $("#complaintForm").RF();
            $("#changePriceForm").RF();
            // $("#afterSaleForm").RF();
            // $("#depotform").RF();
            $("#refuseForm").RF();
            $("#receiptForm").RF();

        }
    },
    //初始化方法
    created: function () {
        /*this.showList = false;
        this.addOrder = true;*/
    },
    watch: {
        //国内国际
        'goodsOrder.orderGoodsType': function (value) {
            this.getMerchants();
        },
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#contenTable").bootstrapTable.defaults.locale = "en-US";
                $("#addTable").bootstrapTable.defaults.locale = "en-US";
                $("#goodsInfo").bootstrapTable.defaults.locale = "en-US";
                $("#addGoodTable").bootstrapTable.defaults.locale = "en-US";
                $("#commondityTable").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#contenTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#addTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsInfo").bootstrapTable.defaults.locale = "zh-CN";
                $("#addGoodTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#commondityTable").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#contenTable").bootstrapTable("destroy");
            $("#addTable").bootstrapTable("destroy");
            $("#goodsInfo").bootstrapTable("destroy");
            $("#addGoodTable").bootstrapTable("destroy");
            $("#commondityTable").bootstrapTable("destroy");
            this.initTable();
        },
    }
});