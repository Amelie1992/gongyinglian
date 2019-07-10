$(function () {
    vm.initTable();
    //表单提交
    // $("form").FM({
    //     fields: vm.fields,
    //     success: vm.saveOrUpdate
    // });
    $("#offline").FM({
        fields: vm.offlineFields,
        success: vm.offlinePay
    });
    // 时间日期
    $("#datetimepicker").datetimepicker().on('hide', function (ev) {
        var value = $("#datetimepicker").val();
        vm.payment.paymentTime = value;
    });

});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        detailList: false,
        payList: false,
        title: null,
        bill: {},
        paymentRecords: [],
        totalStorageCharges: {},
        orderCost: {},
        paymentRecord: {},
        payment: {},  //付款对象
        images: [],
        myAccount: {}, //我的账户
        company: {},
        params: {
            orderNumber: '',
            finalPayee: '',
        },
        statusList: ['未结清', '已结清'],
        auditStatusList: ['待审核', '审核通过', '审核不通过'],
//验证字段
        fields: {
            contractNumber: {
                message: '合同编号验证失败',
                validators: {
                    notEmpty: {
                        message: '合同编号不能为空'
                    },
                },
            }, orderNumber: {
                message: '订单号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单号不能为空'
                    },
                },
            }, payee: {
                message: '收款商家验证失败',
                validators: {
                    notEmpty: {
                        message: '收款商家不能为空'
                    },
                },
            }, payer: {
                message: '付款商家验证失败',
                validators: {
                    notEmpty: {
                        message: '付款商家不能为空'
                    },
                },
            }, amount: {
                message: '应收/应付金额验证失败',
                validators: {
                    notEmpty: {
                        message: '应收/应付金额不能为空'
                    },
                },
            }, amountSettled: {
                message: '已收/已付金额验证失败',
                validators: {
                    notEmpty: {
                        message: '已收/已付金额不能为空'
                    },
                },
            }, remainder: {
                message: '剩余金额验证失败',
                validators: {
                    notEmpty: {
                        message: '剩余金额不能为空'
                    },
                },
            }, status: {
                message: '款项状态 0：未结清 1：已结清验证失败',
                validators: {
                    notEmpty: {
                        message: '款项状态 0：未结清 1：已结清不能为空'
                    },
                },
            }, time: {
                message: '收款/付款时间验证失败',
                validators: {
                    notEmpty: {
                        message: '收款/付款时间不能为空'
                    },
                },
            }, remarks: {
                message: '备注验证失败',
                validators: {
                    notEmpty: {
                        message: '备注不能为空'
                    },
                },
            }, deptId: {
                message: '权限部门id 验证失败',
                validators: {
                    notEmpty: {
                        message: '权限部门id 不能为空'
                    },
                },
            }, createBy: {
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
            }, companyId: {
                message: '公司id验证失败',
                validators: {
                    notEmpty: {
                        message: '公司id不能为空'
                    },
                },
            }, authorizesId: {
                message: '授权用户id验证失败',
                validators: {
                    notEmpty: {
                        message: '授权用户id不能为空'
                    },
                },
            }
        },
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
                        regexp: /(^[1-9](\d{1,8})(\.\d{2})$)|(^\d\.\d{2}$)/,
                        message: '打款金额的整数位最多9位，保留2位小数'
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
    },
    methods: {

        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");      //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'bill/bill/creditListPay',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("AccountNumber"), field: 'creditNumber'},
                    {title: vm.$t("OrderId"), field: 'orderNumber'},
                    {title: vm.$t("TheOtherCompany"), field: 'finalPayee'},
                    // {title: '付款商家', field: 'payer'},
                    // {title: '应收金额', field: 'amountReceivable'},
                    {title: vm.$t("ApplicationTime"), field: 'applicationTime'},
                    {title: vm.$t("AccountAmount"), field: 'creditAmount'},
                    // {title: '已收金额', field: 'amountReceived'},
                    {title: vm.$t("amountPaid"), field: 'amountPaid'},
                    // {title: '剩余金额', field: 'remainingAmountReceivable'},
                    {title: vm.$t("SurplusAmount"), field: 'remainingAmountPayable'},
                    {
                        title: vm.$t("AuditStatus"), field: 'auditStatus',
                        formatter: function (value) {
                            if (value == 0) {
                                return "待审核"
                            } else if (value == 1) {
                                return "审核通过"
                            } else if (value == 2) {
                                return "审核不通过"
                            }
                        }
                    },
                    {
                        title: vm.$t("StateOfMoney"), field: 'payableStatus',
                        formatter: function (value) {
                            if (value == 0) {
                                return "未结清"
                            } else if (value == 1) {
                                return "已结清"
                            }
                        }
                    },
                    // {title: '应付款项状态  0：未结清 1：已结清', field: 'payableStatus'},
                    // {title: '确认收款时间', field: 'receivingTime'},
                    {title: vm.$t("TimeOfPayment"), field: 'paymentTime'},
                    // {title: '备注', field: 'receivingRemarks'},
                    {title: vm.$t("Remarks"), field: 'paymentRemarks'},
                    {
                        title: vm.$t("chaozuo"), field: 'id',
                        formatter: function (value) {
                            return "<a href='javascript:void(0)' class='getInfo'>查看详情</a>"
                        },
                        events: {
                            "click .getInfo": function (events, value) {
                                vm.showList = false;
                                vm.detailList = true;
                                vm.payList = false;
                                vm.title = "详情";
                                vm.getInfo(value);
                            }
                        }
                    }
                ],
                //条件查询
                queryParams: vm.params
            });

            $("#recordTable").bootstrapTable("destroy");
            $("#recordTable").bootstrapTable({
                // url: baseURL + 'paymentRecord/paymentrecord/list',
                columns: [
                    {checkbox: true},
                    // {title: '账单号', field: 'billId'},
                    // {title: '金额', field: 'amount'},
                    {
                        title: vm.$t("money"), field: 'amount',
                        formatter: function (value, row, index) {
                            return '<a href="javascript:void(0)" id="btn_cost">' + row.amount + '</a>'
                        },
                        events: {
                            "click #btn_cost": function (events, value, row, index) {
                                //若为仓储订单，点击金额会出弹框
                                if (vm.bill.orderType == 3) {

                                    $("#myModal").modal('show');    //弹框

                                    vm.getCostInfo(row.id);        //查 费用明细表
                                }
                            }
                        }
                    },
                    {title: vm.$t("date"), field: 'date'},
                    {
                        title: vm.$t("PaymentStatus"), field: 'payStatus',
                        formatter: function (value) {
                            if (value == 0) {
                                return "待付款"
                            } else if (value == 1) {
                                return "已付款"
                            }
                        }
                    },
                    {
                        title: vm.$t("PaymentMethod"), field: 'payMethod',          //********
                        formatter: function (value) {
                            if (value == 0) {
                                return "线下支付"
                            } else if (value == 1) {
                                return " 在线支付"
                            }
                        }
                    },
                    {title: vm.$t("AccountsReceivableAccount"), field: 'payeeNumber'},
                    // {title: '付款账号', field: 'payerNumber'},
                    {title: vm.$t("AccountName"), field: 'payeeName'},
                    // {title: '户名', field: 'payerName'},
                    {title: vm.$t("AffiliatedBank"), field: 'payeeBank'},
                    // {title: '所属银行', field: 'payerBank'},
                    {title: vm.$t("Operator"), field: 'paymentOperator'},
                    {title: vm.$t("TimeOfPayment"), field: 'paymentTime'},
                    // {
                    //     title: '确认状态', field: 'confirmStatus',
                    //     formatter: function (value) {
                    //         if (value == 0) {
                    //             return "待确认"
                    //         } else {
                    //             return "已确认"
                    //         }
                    //     }
                    // },
                    // {title: '确认收款时间', field: 'receivingTime'},
                    // {title: '实收金额', field: 'amountCollected'},
                    {title: vm.$t("Remarks"), field: 'paymentRemarks'}

                ]
            });

            $("#costTable1").bootstrapTable("destroy");
            $("#costTable1").bootstrapTable({
                striped: true,
                showHeader: false,
                columns: [
                    {title: vm.$t("WarehousingFee"), field: '0'},
                    {title: vm.$t("HandlingCharge"), field: '1'},
                    {title: vm.$t("DisposalCharge"), field: '2'},
                    {title: vm.$t("RepeatUpAndDown"), field: '3'},
                    {title: vm.$t("SortingFee"), field: '4'},
                    {title: vm.$t("TallyFee"), field: '5'},
                    {title: vm.$t("CopyTheCodeFor"), field: '6'},
                    {title: vm.$t("AfterFrozenFee"), field: '7'},
                    // {title: '查验移箱费', field: 'a'},
                    // {title: '查验掏箱费', field: 'b'},
                    // {title: '查验开关箱门费及铅封', field: 'c'},
                    // {title: '门到门查验费', field: 'd'},
                    // {title: '出入库费', field: 'e'},
                    // {title: '缠绕膜', field: 'f'},
                    // {title: '箱车对倒', field: 'g'},
                    // {title: '预冷费', field: 'h'}
                ]
            })

            $("#costTable2").bootstrapTable("destroy");
            $("#costTable2").bootstrapTable({
                striped: true,
                showHeader: false,
                columns: [
                    // {title: '仓储费', field: '0'},
                    // {title: '装卸费', field: '1'},
                    // {title: '处置费', field: '2'},
                    // {title: '重复上下架', field: '3'},
                    // {title: '分拣费', field: '4'},
                    // {title: '理货费', field: '5'},
                    // {title: '抄码费', field: '6'},
                    // {title: '复冻费', field: '7'},
                    {title: vm.$t("InspectionOfTransferFare"), field: 'a'},
                    {title: vm.$t("CheckTheCostOfDigging"), field: 'b'},
                    {title: vm.$t("CheckSwitchBoxDoorChargesAndLeadSeals"), field: 'c'},
                    {title: vm.$t("DoorToDoorInspectionFee"), field: 'd'},
                    {title: vm.$t("EntryAndExitFee"), field: 'e'},
                    {title: vm.$t("WrappingFilm"), field: 'f'},
                    {title: vm.$t("BoxCarOpposite"), field: 'g'},
                    {title: vm.$t("PreCoolingFee"), field: 'h'}
                ]
            })

        },

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.detailList = true;
            vm.payList = false;
            vm.title = "新增";
            vm.bill = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.detailList = true;
            vm.payList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        //表单验证
        // validate: function () {
        //     var bl = $('form').VF();//启用验证
        //     if (!bl) {
        //         return;
        //     }
        // },
        offlineValidate: function () {
            var bl = $('#offline').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.bill.id == null ? "bill/bill/save" : "bill/bill/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.bill),
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
                    url: baseURL + "bill/bill/delete",
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
            vm.bill = {};
            vm.paymentRecords = [];
            $.get(baseURL + "bill/bill/info/" + id, function (r) {
                vm.bill = r.bill;
                r.bill.paymentRecords.forEach(function (item) {
                    vm.paymentRecords.push(item);
                });
                $("#recordTable").bootstrapTable("removeAll");
                $("#recordTable").bootstrapTable("append", vm.paymentRecords);
                vm.showList = false;
                vm.detailList = true;
                vm.payList = false;
            });
        },
        //查 费用明细表 (仓储订单 每日仓储费用 的金额组成）
        getCostInfo: function (recordId) {
            vm.storageFee = '';
            vm.orderCost = {};
            $.get(baseURL + "bill/bill/chargesInfo/" + recordId, function (r) {
                vm.storageFee = r.map.storageFee;
                vm.orderCost = r.map.orderCost;
                $("#costTable1").bootstrapTable("removeAll");
                $("#costTable2").bootstrapTable("removeAll");
                var data = [];
                data.push({
                    0: '仓储费', 1: '装卸费', 2: '处置费', 3: '重复上下架', 4: '分拣费', 5: '理货费', 6: '抄码费', 7: '复冻费'
                });
                data.push({
                    0: vm.storageFee,
                    1: vm.orderCost.money1,
                    2: vm.orderCost.money2,
                    3: vm.orderCost.money3,
                    4: vm.orderCost.money4,
                    5: vm.orderCost.money5,
                    6: vm.orderCost.money6,
                    7: vm.orderCost.money7
                });
                $("#costTable1").bootstrapTable("append", data);
                var arr = [];
                arr.push({
                    a: '查验移箱费', b: '查验掏箱费', c: '查验开关箱门费及铅封', d: '门到门查验费', e: '出入库费', f: '缠绕膜',
                    g: '箱车对倒', h: '预冷费'
                });
                arr.push({
                    a: vm.orderCost.money8, b: vm.orderCost.money9, c: vm.orderCost.money10, d: vm.orderCost.money11,
                    e: vm.orderCost.money12, f: vm.orderCost.money13, g: vm.orderCost.money14, h: vm.orderCost.money15
                });
                $("#costTable2").bootstrapTable("append", arr);
                vm.showList = false;
                vm.detailList = true;
                vm.payList = false;
            });
        },
        //获取勾选的付款记录信息
        getRecordInfo: function (recordId) {
            // vm.paymentRecord = {};
            // $.get(baseURL + "paymentRecord/paymentrecord/info/" + recordId, function (r) {
            //     vm.paymentRecord = r.paymentRecord;
            // });
            $.ajax({
                type: "POST",
                url: baseURL + "paymentRecord/paymentrecord/info/" + recordId,
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
        reload: function (event) {
            vm.showList = true;
            vm.detailList = false;
            vm.payList = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            // $("#table").BTF5(vm.params);
            //解决table,分页问题（当点击完新增以后，第二页的内容和第一页的内容一样）
            vm.initTable();
            $("form").RF();
        },
        back: function () {
            vm.showList = false;
            vm.detailList = true;
            vm.payList = false;
        },
        //显示付款页面
        showPayList: function (event) {
            var rows = $('#recordTable').bootstrapTable('getSelections');
            console.log("****rows****", rows);
            if (!rows.length) {
                alert("请先勾选账期记录");
                return;
            }

            vm.paymentRecords = [];
            rows.forEach(function (row) {
                console.log("****row.id****", row.id);
                //根据勾选的id查询每条勾选的记录
                vm.paymentRecord = {};
                vm.getRecordInfo(row.id);
                console.log("****payStatus****", vm.paymentRecord.payStatus);
                //付款操作只针对 未付款的状态
                if (vm.paymentRecord.payStatus != 0) {
                    alert("您勾选的记录中包含已付款的记录");
                    return;
                }
                vm.paymentRecords.push(vm.paymentRecord);
            });

            console.log(vm.paymentRecords.length);
            if (vm.paymentRecords.length == rows.length) {
                //显示支付页面
                vm.getSum();        //计算支付金额 (勾选的付款记录的金额总和)
                vm.getMyAccount();     //获取账户余额
                vm.showList = false;
                vm.detailList = false;
                vm.payList = true;

                vm.images.length = 0;       //转账凭证上传框
                vm.$refs.file.destroy();
                vm.$refs.file.initFileInput();
            }
        },

        //计算支付金额 (勾选的付款记录的金额总和)
        getSum: function () {
            var sum = 0;
            var numbers = [];
            vm.paymentRecords.forEach(function (item) {
                numbers.push(item.amount);
            });
            numbers.forEach(function (e) {
                sum += e;
            });
            console.log("sum====" + sum);
            vm.payment.amountToPay = sum;
        },

        //获取账户余额、账户密码
        getMyAccount: function () {
            // vm.myAccount = {};
            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/getMyAccount",
                //async: false,
                contentType: "application/json",
                // data: JSON.stringify(vm.paymentRecords),
                success: function (r) {
                    if (r.myAccount != null) {
                        console.log(r.myAccount.balance);
                        console.log(r.myAccount.password);
                        vm.payment.accountBalance = r.myAccount.balance;
                        vm.myAccount = r.myAccount;
                    }
                }
            });
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
            // if (vm.payment.onlinePayment == 0 && vm.payment.accountBalance < vm.payment.amountToPay) {
            //     //账户余额 小于 支付金额 ---> 拒绝 余额支付 请求
            //     tip = "余额不足";
            // }
            // return tip;
        },


        //余额支付
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
                alert("密码错误！");                             //*********三次锁定功能
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

        //银联支付
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


        //线下支付
        offlinePay: function (event) {
            console.log("paymentRecords", vm.paymentRecords);
            console.log("payment", vm.payment);
            if (vm.payment.remarks != null && vm.payment.remarks.length >= 20) {
                alert("备注长度要小于20个字符");
                return;
            }
            //输入的打款金额 小于 支付金额 --->拒绝 线下转账 请求
            if (vm.payment.amountPaid < vm.payment.amountToPay) {
                alert("打款金额不能小于勾选的账期记录的金额总和");
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
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }


    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#recordTable").bootstrapTable.defaults.locale = "en-US";
                $("#costTable1").bootstrapTable.defaults.locale = "en-US";
                $("#costTable2").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#recordTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#costTable1").bootstrapTable.defaults.locale = "zh-CN";
                $("#costTable2").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#recordTable").bootstrapTable("destroy");
            $("#costTable1").bootstrapTable("destroy");
            $("#costTable2").bootstrapTable("destroy");
            this.initTable();
        },
    }
});