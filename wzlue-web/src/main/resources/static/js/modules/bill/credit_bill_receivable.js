$(function () {
    vm.initTable();
    //表单提交
    // $("form").FM({
    //     fields: vm.fields,
    //     success: vm.saveOrUpdate
    // });
    $("#gatheringForm").FM({
        fields: vm.gatheringFields,
        success: vm.gatheringMethod
    });
    $("#auditForm").FM({
        fields: vm.auditFields,
        success: vm.auditMethod
    });

});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        bill: {},
        paymentRecords: [],
        totalStorageCharges: {},
        orderCost: {},
        paymentRecord: {},
        gathering: {},  //确认收款对象
        params: {
            orderNumber: '',
            payer: '',
        },
        statusList: ['未结清', '已结清'],
        auditStatusList: ['待审核', '通过', '不通过'],
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
        gatheringFields: {
            amountCollected: {
                message: '实收金额验证失败',
                validators: {
                    notEmpty: {
                        message: '实收金额不能为空'
                    }, regexp: {
                        regexp: /(^[1-9](\d{1,8})(\.\d{2})$)|(^\d\.\d{2}$)/,
                        message: '实收金额的整数位最多9位，保留2位小数'
                    }
                }
            }
        },
        auditFields: {
            auditStatus: {
                message: '审核结果验证失败',
                validators: {
                    notEmpty: {
                        message: '审核结果不能为空'
                    },
                },
            }, auditOpinion: {
                message: '审核意见验证失败',
                validators: {
                    notEmpty: {
                        message: '审核意见不能为空'
                    }, stringLength: {
                        max: 200,
                        message: '审核意见长度要小于200个字符'
                    }
                },
            },
        }
    },
    methods: {

        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");      //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'bill/bill/creditListReceive',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("AccountNumber"), field: 'creditNumber'},
                    {title: vm.$t("OrderId"), field: 'orderNumber'},
                    // {title: '收款商家', field: 'payee'},
                    {title: vm.$t("Client"), field: 'payer'},
                    {title: vm.$t("ApplicationTime"), field: 'applicationTime'},
                    {title: vm.$t("AccountAmount"), field: 'creditAmount'},
                    // {title: '应付金额', field: 'amountPayable'},
                    {title: vm.$t("AmountReceived"), field: 'amountReceived'},
                    // {title: '已付金额', field: 'amountPaid'},
                    {title: vm.$t("SurplusAmount"), field: 'remainingAmountReceivable'},
                    // {title: '剩余应付金额', field: 'remainingAmountPayable'},
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
                        title: vm.$t("StateOfMoney"), field: 'receivableStatus',
                        formatter: function (value) {
                            if (value == 0) {
                                return "未结清"
                            } else if (value == 1) {
                                return "已结清"
                            }
                        }
                    },
                    // {title: '应付款项状态  0：未结清 1：已结清', field: 'payableStatus'},
                    {title: vm.$t("ConfirmationOfCollectionTime"), field: 'receivingTime'},
                    // {title: '付款时间', field: 'paymentTime'},
                    {title: vm.$t("Remarks"), field: 'receivingRemarks'},
                    // {title: '付款备注', field: 'paymentRemarks'},
                    {
                        title: vm.$t("chaozuo"), field: 'id',
                        formatter: function (value) {
                            return "<a href='javascript:void(0)' class='getInfo'>查看详情</a>"
                        },
                        events: {
                            "click .getInfo": function (events, value) {
                                vm.showList = false;
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
                        title: vm.$t("PaymentMethod"), field: 'payMethod',
                        formatter: function (value) {
                            if (value == 0) {
                                return "线下支付"
                            } else if (value == 1) {
                                return " 在线支付"
                            }
                        }
                    },
                    // {title: '收款账号', field: 'payeeNumber'},
                    {title: vm.$t("PaymentAccount"), field: 'payerNumber'},
                    // {title: '收款方户名', field: 'payeeName'},
                    {title: vm.$t("AccountName"), field: 'payerName'},
                    // {title: '收款方银行', field: 'payeeBank'},
                    {title: vm.$t("AffiliatedBank"), field: 'payerBank'},
                    {title: vm.$t("TimeOfPayment"), field: 'paymentTime'},
                    {
                        title: vm.$t("ConfirmationState"), field: 'confirmStatus',
                        formatter: function (value) {
                            if (value == 0) {
                                return "待确认"
                            } else if (value == 1) {
                                return "已确认"
                            }
                        }
                    },
                    {title: vm.$t("ConfirmationTime"), field: 'receivingTime'},
                    {title: vm.$t("AmountCollected"), field: 'amountCollected'},
                    {title: vm.$t("Remarks"), field: 'receivingRemarks'}
                    // {title: '操作人', field: 'operator'}
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


            /*  $("#costTable").bootstrapTable("destroy");
              $("#costTable").BT({
                  // url: baseURL + 'storage/ordercost/costInfo/' + vm.recordId,
                  columns: [
                      // {checkbox: true},
                      {title: '仓储费', field: ''},
                      {title: '装卸费', field: 'money1'},
                      {title: '处置费', field: 'money2'},
                      {title: '重复上下架', field: 'money3'},
                      {title: '分拣费', field: 'money4'},
                      {title: '理货费', field: 'money5'},
                      {title: '抄码费', field: 'money6'},
                      {title: '复冻费', field: 'money7'},
                      {title: '查验移箱费', field: 'money8'},
                      {title: '查验掏箱费', field: 'money9'},
                      {title: '查验开关箱门费及铅封', field: 'money10'},
                      {title: '门到门查验费', field: 'money11'},
                      {title: '出入库费', field: 'money12'},
                      {title: '缠绕膜', field: 'money13'},
                      {title: '箱车对倒', field: 'money14'},
                      {title: '预冷费', field: 'money15'}
                  ]
              });*/

        },


        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.bill = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
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
        gatheringValidate: function () {
            var bl = $('#gatheringForm').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        auditValidate: function () {
            var bl = $('#auditForm').VF();//启用验证
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
            vm.title = "";
            //刷新 如需条件查询common.js
            // $("#table").BTF5(vm.params);
            //解决table,分页问题（当点击完新增以后，第二页的内容和第一页的内容一样）
            vm.initTable();
            $("form").RF();
        },
        //显示确认收款弹框
        showGatheringModal: function (event) {
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
                console.log("****payMethod****", vm.paymentRecord.payMethod);
                //确认收款操作只针对 线下转账
                if (vm.paymentRecord.payMethod != 0) {
                    alert("您勾选的记录不符合确认收款的条件");
                    return;
                }
                if (vm.paymentRecord.confirmStatus == 1) {
                    alert("您勾选的记录已确认收款，不可重复收款");
                    return;
                }
                vm.paymentRecords.push(vm.paymentRecord);
            });

            console.log(vm.paymentRecords.length);
            if (vm.paymentRecords.length == rows.length) {
                $("#gatheringModal").modal('show');
            }
        },

        //账期审核
        auditMethod: function (event) {
            $('#auditModal').modal('hide');
            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/audit",
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

        //确认收款
        gatheringMethod: function (event) {
            console.log("paymentRecords", vm.paymentRecords);
            console.log("gathering", vm.gathering);
            if (vm.gathering.remarks != null && vm.gathering.remarks.length >= 200) {
                alert("备注长度要小于200个字符");
                return;
            }
            //求勾选的记录的金额总和
            var sum = 0;
            var numbers = [];
            vm.paymentRecords.forEach(function (item) {
                numbers.push(item.amount);
            });
            numbers.forEach(function (e) {
                sum += e;
            });
            //输入的实收金额 小于 勾选的记录的金额总和 --->拒绝确认收款
            if (vm.gathering.amountCollected < sum) {
                alert("实收金额不能小于勾选的账期记录的金额总和");
                return;
            }
            $('#gatheringModal').modal('hide');
            vm.gatheringVO = {};
            vm.gatheringVO.paymentRecords = vm.paymentRecords;
            vm.gatheringVO.gathering = vm.gathering;
            $.ajax({
                type: "POST",
                url: baseURL + "bill/bill/gathering",
                contentType: "application/json",
                data: JSON.stringify(vm.gatheringVO),
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