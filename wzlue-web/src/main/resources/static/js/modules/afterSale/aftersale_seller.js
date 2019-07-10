$(function () {
    vm.initTable()
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    })
    // $("#handleForm").FM({
    //     fields: vm.handleFields,
    //     success: vm.handle
    // })

});

function opFormatter(value, row, index) {
    var op = '';
    op += '<a id="btn_detail">查看详情</a>';
    return op;
}

window.opEvent = {
    'click #btn_detail': function (event, value, row, index) {
        vm.showList = false;
        vm.getInfo(row.id);
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        afterSale: {},
        images: [],                 //*********
        goods: [],
        params: {
            serviceType: '',
        },

        status: ['待处理', '已处理'],
        serviceTypeList: ['退货', '换货', '索赔'],
        refundFormList: ['线上支付', '线下转账','其他'],
        reasonList: ['物品损坏', '质量不合格', '产品型号错误', '其他'],
        resultList: ['通过', '不通过'],
//验证字段
        fields: {
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
            },
        },
        // handleFields: {
        //     result: {
        //         message: '处理结果验证失败',
        //         validators: {
        //             notEmpty: {
        //                 message: '处理结果不能为空'
        //             },
        //         },
        //     },
        //     suggestion: {
        //         message: '处理意见验证失败',
        //         validators: {
        //             notEmpty: {
        //                 message: '处理意见不能为空'
        //             },
        //         }, stringLength: {
        //             max: 200,
        //             message: '处理意见长度要小于200个字符'
        //         }
        //     },
        // }

    },
    methods: {
        initTable: function () {
            $("#table").bootstrapTable("destroy")       //**********
            $("#table").BT({
                url: baseURL + 'afterSale/aftersale/list/seller',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("CodeId"), field: 'code'},
                    {title: vm.$t("OrderId"), field: 'orderId'},
                    {title: vm.$t("Buyer"), field: 'buyer'},
                    // {title: '商家', field: 'seller'},
                    // {title: '服务类型0：退货 1： 换货 2：索赔', field: 'serviceType'},
                    // {title: '索赔/退换货数量', field: 'quantity'},
                    // {title: '退款方式 0：银联 1： 转账', field: 'refundForm'},
                    // {title: '暂存仓库', field: 'temporaryStorage'},
                    // {title: '原因 0：物品损坏 1： 质量不合格 2：产品型号错误 3：其他', field: 'reason'},
                    // {title: '问题描述', field: 'description'},
                    // {title: '图片信息', field: 'imageUrl'},
                    {title: vm.$t("ApplicationDate"), field: 'applicationDate'},
                    {
                        title: vm.$t("ServiceType"), field: 'serviceType',
                        formatter: function (value) {
                            if (value == 0) {
                                return "退货"
                            } else if (value == 1) {
                                return "换货"
                            } else {
                                return "索赔"
                            }
                        }
                    },
                    {
                        title: vm.$t("status"), field: 'status',
                        formatter: function (value) {
                            if (value == 0) {
                                return "待处理"
                            } else {
                                return "已处理"
                            }
                        }
                    },
                    // {title: '处理结果 0：通过 1：不通过', field: 'result'},
                    // {title: '处理意见', field: 'suggestion'},
                    {title: vm.$t('chaozuo'), formatter: opFormatter, events: opEvent}
                ],
                //条件查询
                queryParams: vm.params
            });
            // $("#goodsInfo").bootstrapTable("destroy");
            $("#goodsInfo").bootstrapTable({
                // height: 150,
                // url: baseURL + 'logistics/logisticsorder/info/' + id,   //********
               /* columns: [
                    {checkbox: true},
                    {title: vm.$t("productName"), field: 'goodsName'},
                    {title: vm.$t("UnitPrice"), field: 'unitPrice'},
                    {title: vm.$t("Num"), field: 'number'},
                    {title: vm.$t("TotalPrice"), field: 'totalPrice'},
                    {title: vm.$t("AfterSaleNumber"), field: 'afterSaleNumber'}
                ]*/
                columns: [
                    {checkbox: true},
                    {title: vm.$t("ProductName"), field: 'goodsName'},
                    {title: vm.$t("place"), field: 'commodityCountry'},
                    {title: vm.$t("Producer"), field: 'commodityFactoryNumber'},
                    {
                        title: vm.$t("weight"),
                        field: 'number',
                        formatter: function (value, row, index) {
                            var str = '';
                            if (row.unit == 1) {
                                str = value + "&nbsp;&nbsp;吨"
                            } else if (row.unit == 2) {
                                str = value + "&nbsp;&nbsp;千克"
                            }
                            return str;
                        }
                    },
                    {title: vm.$t("pack"), field: 'commodityPacking'},
                    {
                        title: vm.$t("OperationNumber"), field: 'afterSaleNumber',formatter: function (value, row, index) {
                            var str = '';
                            if (row.unit == 1) {
                                str = value + "&nbsp;&nbsp;吨"
                            } else if (row.unit == 2) {
                                str = value + "&nbsp;&nbsp;千克"
                            }
                            return str;
                        }
                    }
                ],
            });
        },

        getAfterSaleStatus: function () {
            return this.status[this.afterSale.status];
        },
        getAfterSaleServiceType: function () {
            return this.serviceTypeList[this.afterSale.serviceType];
        },
        getAfterSaleRefundForm: function () {
            return this.refundFormList[this.afterSale.refundForm];
        },
        getAfterSaleReason: function () {
            return this.reasonList[this.afterSale.reason];
        },
        getAfterSaleResult: function () {
            return this.resultList[this.afterSale.result];
        },

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.afterSale = {};
            vm.images.length = 0;
            // vm.ue.setContent('');
            vm.$refs.file.destroy();
            vm.$refs.file.initFileInput();
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
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        // handleValidate: function () {
        //     var bl = $('#handleForm').VF();//启用验证
        //     if (!bl) {
        //         return;
        //     }
        // },
        saveOrUpdate: function (event) {
            if (vm.images.length == 0 && (vm.afterSale.images == null || vm.afterSale.images == 0)) {
                // alert("请上传图片");
                return;
            }
            if (vm.afterSale.images == null) {
                vm.afterSale.images = [];
            }
            ;
            vm.afterSale.images = vm.afterSale.images.concat(vm.images)

            var url = vm.afterSale.id == null ? "afterSale/aftersale/save" : "afterSale/aftersale/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
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
                    url: baseURL + "afterSale/aftersale/delete",
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
            vm.afterSale = {};
            vm.images.length = 0;
            vm.goods = [];
            $.get(baseURL + "afterSale/aftersale/info/" + id, function (r) {
                vm.afterSale = r.afterSale;
                var images = vm.afterSale.images;
                r.afterSale.goods.forEach(function (item) {
                    vm.goods.push(item);
                });
                $("#goodsInfo").bootstrapTable("removeAll");
                $("#goodsInfo").bootstrapTable("append", vm.goods);
                vm.showList = false;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            vm.afterSale = {};
            vm.images.length = 0;
            //刷新 如需条件查询common.js
            //$("#table").BTF5(vm.params);
            //解决table,分页问题（当点击完新增以后，第二页的内容和第一页的内容一样）
            vm.initTable();
            $("form").RF();
        },
        handle: function (event) {
            if (vm.afterSale.result == 1 && isBlank(vm.afterSale.suggestion)) {
                alert("处理意见不能为空");
                return
            }
            if (!isBlank(vm.afterSale.suggestion) && vm.afterSale.suggestion.length > 200) {
                alert("处理意见长度不能大于200个字符");
                return
            } else {
                $('#myModal').modal('hide');
                $.ajax({
                    type: "POST",
                    url: baseURL + "afterSale/aftersale/handle",
                    contentType: "application/json",
                    data: JSON.stringify(vm.afterSale),
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
        }
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#goodsInfo").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsInfo").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#goodsInfo").bootstrapTable("destroy");
            this.initTable();
        },
    }
});