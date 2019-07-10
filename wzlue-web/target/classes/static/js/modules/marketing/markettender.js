$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
    vm.initTime();
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
    $("input[name='startTime']").DATE({format: 'yyyy-mm-dd hh:ii:ss'});
    $("input[name='startTime']").on('changeDate', function (ev) {
        vm.marketTender.startTime = this.value; // 发布时间
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('endTime');
        })
    });
    $("input[name='endTime']").DATE({format: 'yyyy-mm-dd hh:ii:ss'});
    $("input[name='endTime']").on('changeDate', function (ev) {
        vm.marketTender.endTime = this.value; // 截止日期
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('startTime');
        })
    });
    $("input[name='schedule']").DATE({format: 'yyyy-mm-dd hh:ii:ss'});
    $("input[name='schedule']").on('changeDate', function (ev) {
        vm.marketTender.schedule = this.value; // 截止日期
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('startTime');
        })
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
        vm.backShow=false;
        vm.getInfo(row.id);
    }

};
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        marketTender: {},
        params: {
            name: '',
        },
        provinces: null,
        cities: null,
        // ue: UE.getEditor('myEditor', {
        //     initialFrameHeight: 440,
        // }),
        ue: UE.getEditor('myEditor1', {
            initialFrameHeight: 440,
        }),
        showBtn: true,
        backShow: true,
        marketTenderRecordList: [],//竞标记录
        addTxBtn:true,
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
                    stringLength: {
                        max: 30,
                        message: '招标项目名称长度小于30个字符'
                    }
                },
            }, type: {
                message: '类型期货验证失败',
                validators: {
                    notEmpty: {
                        message: '期货不能为空'
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
            }, schedule: {
                message: '提货时间验证失败',
                validators: {
                    notEmpty: {
                        message: '提货时间不能为空'
                    },
                    //时间验证
                    callback: {
                        message: '提货时间必须大于发布时间',
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
                    stringLength: {
                        max: 20,
                        message: '联系人长度小于20个字符'
                    }
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
                    stringLength: {
                        max: 20,
                        message: '邮箱地址长度不超过20个字符'
                    },
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    }
                },
            }, status: {
                message: '状态验证失败',
                validators: {
                    notEmpty: {
                        message: '状态不能为空'
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

            //列表
            $("#table").BT({
                url: baseURL + 'marketing/markettender/list',
                columns: [
                    {checkbox: true},
                    // {title: '招标编号', field: 'tenderNumber'},
                    {title: vm.$t("entryName"), field: 'tenderName', align: 'center'},
                    // {title: '类型:0,现货；1,期货', field: 'type'},
                    {title: vm.$t("ReleaseTime"), field: 'startTime', align: 'center'},
                    {title: vm.$t("ClosingDate"), field: 'endTime', align: 'center'},
                    {title: vm.$t("contact"), field: 'contact', align: 'center'},
                    {title: vm.$t("phone"), field: 'telephone', align: 'center'},
                    {title: vm.$t("mailbox"), field: 'email', align: 'center'},
                    {title: vm.$t("BiddingNumber"),events: operateEvents, formatter: operFormatter1,align: 'center'},
                    {
                        title: vm.$t("status"), field: 'status', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "上架"
                            } else {
                                return "下架"
                            }
                        }
                    },
                    {title: vm.$t("chaozuo"), events: operateEvents, formatter: operFormatter, align: 'center'}
                    // {title: '报名要求', field: 'demand'},
                    // {title: '招标描述', field: 'describe'},
                    // {title: '公司id', field: 'companyId'},
                    // {title: '拍卖公司名称', field: 'companyName'},
                    // {title: '部门id', field: 'deptId'},
                    // {title: '创建人(用户id)', field: 'createBy'},
                    // {title: '授权用户id', field: 'authorizesId'},
                    // {title: '创建日期', field: 'createDate'},
                    // {title: '修改人', field: 'updateBy'},
                    // {title: '修改日期', field: 'updateDate'},
                    // {title: '删除标识 0：未删除 1：删除', field: 'delFlag'}
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
            vm.addTxBtn = false;
            vm.title = "新增";
            vm.marketTender = {};
            // vm.ue.setContent("");
            vm.ue.setContent("");
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            // vm.addTxBtn = false;
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
            var url = vm.marketTender.id == null ? "marketing/markettender/save" : "marketing/markettender/update";
            // vm.marketTender.demand = this.ue.getContent();//传入富文本内容
            vm.marketTender.describe = UE.utils.unhtml(this.ue.getContent());//传入富文本内容
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("招标介绍上传的图片数量请少于6张")
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选

            if(vm.marketTender.describe == null || vm.marketTender.describe == ''){
                alert("请添加招标介绍");
                return;
            }else if (ceiShi.length>1000){
                alert("招标介绍不可超出1000字")
                return
            }

            layer.load();
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
                    layer.closeAll();
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
            $.get(baseURL + "marketing/markettender/info/" + id, function (r) {
                vm.marketTender = r.marketTender;
                vm.marketTenderRecordList = r.marketTender.marketTenderRecordEntityList;
                // vm.ue.setContent(vm.marketTender.demand == null ? "" : vm.marketTender.demand);
                vm.ue.setContent(UE.utils.html(vm.marketTender.describe == null ? "" : vm.marketTender.describe));
                vm.addTxBtn = true;
                if(vm.marketTender.type ==0){
                    vm.showBtn = true;
                }else {
                    vm.showBtn = false;
                }
            });
        },
        //修改上下架状态
        updateStatusUp: function (event) {
            var select = $("#table").bootstrapTable("getSelections");
            if (!select.length) {
                alert("请选择一条记录");
                return;
            }
            var ids = [];
            $.each(select, function (idx, item) {
                ids[idx] = item["id"];
            });
            $.ajax({
                type: "POST",
                url: baseURL + "marketing/markettender/updateup",
                contentType: "application/json",
                data: JSON.stringify(ids),
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
        updateStatusDown: function (event) {
            var select = $("#table").bootstrapTable("getSelections");
            if (!select.length) {
                alert("请选择一条记录");
                return;
            }
            var ids = [];
            $.each(select, function (idx, item) {
                ids[idx] = item["id"];
            });
            $.ajax({
                type: "POST",
                url: baseURL + "marketing/markettender/updatedown",
                contentType: "application/json",
                data: JSON.stringify(ids),
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
        provincesChange: function (index, child, value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            this.cities = JSON.parse(str);
        },
        //改变类型
        changeType: function () {
            if (vm.marketTender.type == '1') {
                vm.showBtn = false;
                vm.marketTender.province = '';
                vm.marketTender.city = '';
            } else {
                vm.showBtn = true;
                vm.marketTender.schedule = '';
            }
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            vm.backShow = true;
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        initTime: function () {
            $('#startTime').datetimepicker('remove');
            $('#endTime').datetimepicker('remove');
            $('#schedule').datetimepicker('remove');
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
            $("#startTime").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 0,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#startTime").val();
                vm.marketTender.startTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('startTime', 'NOT_VALIDATED', null)
                    .validateField('startTime');
            });
            $("#endTime").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 0,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#endTime").val();
                vm.marketTender.endTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('endTime', 'NOT_VALIDATED', null)
                    .validateField('endTime');
            });
            $("#schedule").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 0,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#schedule").val();
                vm.marketTender.schedule = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('schedule', 'NOT_VALIDATED', null)
                    .validateField('schedule');
            });
        },
    },
    created: function () {
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces = JSON.parse(str);
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
        },

        "marketTender.province": function (value, old) {
            if (value != old) {
                var str = JSON.stringify(window.getCities(value));
                str = str.replace(/cityid/g, "value").replace(/city/g, "label");
                this.cities = JSON.parse(str);
                setTimeout(function () {
                    vm.marketTender.city = parseInt(vm.marketTender.city);
                }, 0)
            }
        },

    }
});