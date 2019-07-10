$(function () {
    //列表
    vm.initTable()
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
    // 时间日期
    $("#datetimepickerstart").datetimepicker().on('hide', function (ev) {
        var value = $("#datetimepickerstart").val();
        vm.promotion.startTime = value;
    });
    $("#datetimepickerend").datetimepicker().on('hide', function (ev) {
        var value = $("#datetimepickerend").val();
        vm.promotion.endTime = value;
        // let valueStart = $("#datetimepickerstart").val();
        // let start = new Date(valueStart.replace("-", "/").replace("-", "/"));
        // let end = new Date(value.replace("-", "/").replace("-", "/"));
        //
        // if (end >= start) {
        //     vm.promotion.endTime = value;
        // }else{
        //     alert("结束时间不能小于开始时间");
        //     $("#datetimepickerend").val('');
        // }
    });
});

function opFormatter(value, row, index) {
    var op = '';
    op += '<a id="btn_detail">查看详情</a>';
    return op;
}

window.opEvent = {
    'click #btn_detail': function (event, value, row, index) {
        vm.showList = false;
        vm.showSure = false;    //确认按钮隐藏
        vm.getInfo(row.id);
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        showSure: true,
        title: null,
        promotion: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            type: {
                message: '促销类型验证失败',
                validators: {
                    notEmpty: {
                        message: '促销类型不能为空'
                    },
                },
            }, title: {
                message: '促销标题验证失败',
                validators: {
                    notEmpty: {
                        message: '促销标题不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '标题长度要小于20个字符'
                    }
                },
            }, ruleType: {
                message: '规则类型验证失败',
                validators: {
                    notEmpty: {
                        message: '规则类型不能为空'
                    },
                },
            }, startTime: {
                message: '开始时间验证失败',
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '开始时间不能为空'
                    },
                    //时间验证
                    callback: {
                        message: '开始时间不能小于当前时间',
                        callback: function (value, validator, $field) {
                            let now = new Date();
                            let start = new Date(value.replace("-", "/").replace("-", "/"));
                            console.log(now);
                            console.log(start);
                            if (start >= now) {
                                return true;
                            }
                            return false;
                        }
                    }
                },
            }, endTime: {
                message: '结束时间验证失败',
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '结束时间不能为空'
                    },
                    //时间验证
                    callback: {
                        message: '结束时间必须大于开始时间',
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
            }, discountRate: {
                message: '折扣率验证失败',
                validators: {
                    //  ^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$
                    notEmpty: {
                        message: '折扣率不能为空'
                    },
                    regexp: {
                        // regexp: /^(\d|[1-9]\d|100)(\.\d{2})$/,
                        regexp: /^(0)(\.[1-9]\d?)$|^(0)(\.\d[1-9])$|^([1-9]\d?)$|^([1-9]\d?)(\.\d{1,2})$/,
                        message: '折扣率在0至100之间(上下不取)，可保留2位小数'
                    }
                },
            }, discountPrice: {
                message: '折扣价验证失败',
                validators: {
                    notEmpty: {
                        message: '折扣价不能为空'
                    },
                    regexp: {
                        ///      (^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
                        message: '折扣价的整数位最多9位，可保留2位小数'
                    }
                },
            }, description: {
                message: '促销描述验证失败',
                validators: {
                    notEmpty: {
                        message: '促销描述不能为空'
                    }, stringLength: {
                        max: 200,
                        message: '促销描述长度要小于200个字符'
                    }
                },
            }, status: {
                message: '状态验证失败',
                validators: {
                    notEmpty: {
                        message: '状态不能为空'
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
        promotionList: [
            {value: 1, label: '单品促销'}
        ],
        ruleTypeList: [
            {value: 0, label: '打折'},
            {value: 1, label: '折价'}
        ],
        stateList: [
            {value: 0, label: '下架'},
            {value: 1, label: '上架'}
        ],
    },
    methods: {
        initTable: function () {
            $("#table").bootstrapTable("destroy");
            $("#table").BT({
                url: baseURL + 'promotion/promotion/list2',
                columns: [
                    {checkbox: true},
                    {
                        title: vm.$t("PromotionType"), field: 'type',
                        formatter: function (value) {
                            if (value == 1) {
                                return "单品促销"
                            }
                        }
                    },
                    {title: vm.$t("PromotionTitle"), field: 'title'},
                    {
                        title: vm.$t("RuleType"), field: 'ruleType',
                        formatter: function (value) {
                            if (value == 0) {
                                return "打折"
                            } else {
                                return "折价"
                            }
                        }
                    },
                    {title: vm.$t("StartTime"), field: 'startTime'},
                    {title: vm.$t("EndTime"), field: 'endTime'},
                    // {title: '折扣率', field: 'discountRate'},
                    // {title: '折扣价', field: 'discountPrice'},
                    {
                        title: vm.$t("PromotionDescription"), field: 'description', formatter: function (value, row, index) {
                            if (value != null && value.length > 10) {
                                return value.substring(0, 10);
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("status"), field: 'status',
                        formatter: function (value) {
                            if (value == 1) {
                                return "上架"
                            } else {
                                return "下架"
                            }
                        }
                    },
                    {title: vm.$t('chaozuo'), formatter: opFormatter, events: opEvent}
                    // {title: '权限部门id', field: 'deptId'},
                    // {title: '创建人', field: 'createdBy'},
                    // {title: '创建时间', field: 'createdTime'},
                    // {title: '修改人', field: 'updateBy'},
                    // {title: '修改时间', field: 'updateTime'}
                ],
                //条件查询
                queryParams: vm.params
            });
        },

        query: function () {
            vm.reload();
        },
        add: function () {
            $('#type').removeAttr('disabled');
            $('#title').removeAttr('disabled');
            $('#ruleType').removeAttr('disabled');
            $('#discountRate').removeAttr('disabled');
            $('#discountPrice').removeAttr('disabled');
            vm.showList = false;
            vm.showSure = true;
            vm.title = vm.$t("added");
            vm.promotion = {};
        },
        update: function (event) {
            $("#type").attr('disabled', 'disabled');
            $("#title").attr('disabled', 'disabled');
            $("#ruleType").attr('disabled', 'disabled');
            $("#discountRate").attr('disabled', 'disabled');
            $("#discountPrice").attr('disabled', 'disabled');
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.showSure = true;
            vm.title = vm.$t("modify");
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
            if (vm.promotion.ruleType == null) {
                alert("规则类型不能为空")
                return;
            }
            vm.promotion.discountRate = vm.promotion.discountRate / 100;
            var url = vm.promotion.id == null ? "promotion/promotion/save" : "promotion/promotion/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.promotion),
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
                    url: baseURL + "promotion/promotion/delete",
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
            $.get(baseURL + "promotion/promotion/info/" + id, function (r) {
                vm.promotion = r.promotion;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            //解决table,分页问题（当点击完新增以后，第二页的内容和第一页的内容一样）
            vm.initTable();
            // $("#table").BTF5(vm.params);
            $("form").RF();
        },
        //上架/下架
        onSale: function (value) {
            var grid = $("#table").bootstrapTable('getSelections');
            var ids = [];
            $.each(grid, function (idx, item) {
                ids[idx] = item["id".toString()];
            })
            if (ids.length == 0) {
                alert("请选择要上架的商品");
                return false;
            }
            var url = 'promotion/promotion/onSale';
            if (ids.length > 0) {
                $.ajax({
                    url: baseURL + url,
                    type: 'POST',
                    contentType: 'application/JSOn',
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code === 0) {
                            alert("上架操作成功!", function () {
                                vm.reload();
                            })
                        } else {
                            alert(r.msg);
                        }
                    }
                })
            }
        },
        noSale: function () {
            var grid = $("#table").bootstrapTable('getSelections');
            var ids = [];
            $.each(grid, function (idx, item) {
                ids[idx] = item["id".toString()];
            })
            if (ids.length == 0) {
                alert("请选择要下架的商品");
                return false;
            }
            if (ids.length > 0) {
                $.ajax({
                    url: baseURL + 'promotion/promotion/noSale',
                    type: 'POST',
                    contentType: 'application/JSOn',
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code === 0) {
                            alert("下架操作成功", function () {
                                vm.reload();
                            })
                        } else {
                            alert(r.msg);
                        }
                    }
                })
            }
        }

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