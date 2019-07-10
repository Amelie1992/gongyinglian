$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
    $('#startTime').datetimepicker().on('hide', function (ev) {
        var value = $("#startTime").val();
        Vue.set(vm.marketTender, 'startTime', value);
    });
    $('#endTime').datetimepicker().on('hide', function (ev) {
        var value = $("#endTime").val();
        Vue.set(vm.marketTender, 'endTime', value);
    });
    $('#schedule').datetimepicker().on('hide', function (ev) {
        var value = $("#schedule").val();
        Vue.set(vm.marketTender, 'schedule', value);
    });

});

function operFormatter(value, row, index) {
    return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a>'].join('');

}
function operFormatter1(value, row, index) {
    return ['<a id="btn_info" class="">' + row.count + '</a>'].join('');

}

window.operateEvents = {
    'click #btn_info': function (event, value, row, index) {
        vm.title = "详情";
        vm.showList = false;
        // vm.backShow=false;
        vm.getInfo(row.id);
    }

};
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        marketTenderRecord: {},
        marketTender: {},
        params: {
            tenderName: '',
        },
        //验证字段
        fields: {
            tenderNumber: {
                message: '招标编号验证失败',
                validators: {
                    notEmpty: {
                        message: '招标编号不能为空'
                    },
                },
            }, tenderName: {
                message: '招标项目名称验证失败',
                validators: {
                    notEmpty: {
                        message: '招标项目名称不能为空'
                    },
                },
            }, type: {
                message: '类型:0,现货；1,期货验证失败',
                validators: {
                    notEmpty: {
                        message: '类型:0,现货；1,期货不能为空'
                    },
                },
            }, startTime: {
                message: '发布时间验证失败',
                validators: {
                    notEmpty: {
                        message: '发布时间不能为空'
                    },
                },
            }, endTime: {
                message: '截止日期验证失败',
                validators: {
                    notEmpty: {
                        message: '截止日期不能为空'
                    },
                  //时间验证
                    callback: {
                        message: '截止时间必须大于发布时间',
                        callback: function (value, validator, $field) {
                            let other = validator.getFieldElements('startTime').val();//获得另一个的值

                            let start = new Date(other.replace("-", "/").replace("-", "/"));
                            let end = new Date(value.replace("-", "/").replace("-", "/"));

                            if (end > start) {
                                return true;
                            }
                            return false;
                        }
                    }
                },
            }, province: {
                message: '提货地点省验证失败',
                validators: {
                    notEmpty: {
                        message: '提货地点省不能为空'
                    },
                },
            }, city: {
                message: '提货地点市验证失败',
                validators: {
                    notEmpty: {
                        message: '提货地点市不能为空'
                    },
                },
            }, contact: {
                message: '联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    },
                },
            }, telephone: {
                message: '联系电话验证失败',
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^1[3456789]\d{9}$/,
                        message: '请输入正确的手机手机号码'
                    }
                },
            }, email: {
                message: '邮箱验证失败',
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    }
                },
            }, status: {
                message: '状态 0:上架,1:下架验证失败',
                validators: {
                    notEmpty: {
                        message: '状态 0:上架,1:下架不能为空'
                    },
                },
            }, count: {
                message: '竞标人数验证失败',
                validators: {
                    notEmpty: {
                        message: '竞标人数不能为空'
                    },
                },
            },
            /*demand: {
                message: '报名要求验证失败',
                validators: {
                    notEmpty: {
                        message: '报名要求不能为空'
                    },
                },
            }, */
            describe: {
                message: '招标描述验证失败',
                validators: {
                    notEmpty: {
                        message: '招标描述不能为空'
                    },
                },
            }
        }
    },
    methods: {

        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'marketing/markettenderrecord/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("BiddingCode"), field: 'marketTender.tenderNumber', align: 'center'},
                    {title: vm.$t("entryName"), field: 'marketTender.tenderName', align: 'center'},
                    {title: vm.$t("Tendering") + vm.$t("business"), field: 'marketTender.companyName', align: 'center'},
                    {title: vm.$t("Bidders"), field: 'companyName', align: 'center'},
                    // {title: vm.$t("contact"), field: 'contact', align: 'center'},
                    // {title: vm.$t("phone"), field: 'telephone', align: 'center'},
                    {title: vm.$t("Bidding")+vm.$t("Bid")+ '/'+vm.$t("Yuan"), field: 'price', align: 'center'},
                    {title: vm.$t("BiddingTime"), field: 'createDate',align: 'center'},
                    {title: vm.$t("chaozuo"), events: operateEvents, formatter: operFormatter, align: 'center'}
                ],
                //条件查询
                queryParams: vm.params
            });

        },

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.marketTender = {};
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
        saveOrUpdate: function (event) {
            // vm.marketTender.demand = this.ue.getContent();//传入富文本内容
            vm.marketTender.describe = this.ue1.getContent();//传入富文本内容
            var url = vm.marketTender.id == null ? "marketing/markettender/save" : "marketing/markettender/update";
            if(vm.marketTender.describe == null || vm.marketTender.describe == ''){
                alert("请添加招标介绍");
                return;
            }
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.marketTender),
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
                    url: baseURL + "marketing/markettender/delete",
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
            $.get(baseURL + "marketing/markettenderrecord/info/" + id, function (r) {
                vm.marketTenderRecord = r.marketTenderRecord;
                vm.marketTender = r.marketTenderRecord.marketTender;

            });
        },
        //修改上下架状态
        updateStatus: function (event) {
            var row = $("#table").bootstrapTable("getSelections");
            if (row == null || row.length == 0) {
                alert("请选择一条记录");
                return;
            }
            if (row.length > 1) {
                alert("请选择一条记录");
                return;
            }
            var obj = {
                id: row[0].id,
                status: parseInt(row[0].status) == 0 ? 1 : 0
            };
            $.ajax({
                type: "POST",
                url: baseURL + "marketing/markettender/update",
                contentType: "application/json",
                data: JSON.stringify(obj),
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

        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            // vm.backShow = true;
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    },

    //监听事件
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            this.initTable();
        }
    }
});