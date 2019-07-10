$(window).resize(function () {
    $('#table').bootstrapTable('resetView');
});
$(function () {
    if (vm.$i18n.locale == 'en') {
        $("#table").bootstrapTable.defaults.locale = "en-US";
    } else {
        $("#table").bootstrapTable.defaults.locale = "zh-CN";
    }
    //列表
    vm.initTable();
    vm.initDateTime();
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

});

//状态
function statusFmt(value, rows, index) {
    var py1 = rows.status;
    if (py1 == '0') {
        return '显示';
    } else if (py1 == '1') {
        return '隐藏';
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        detail: false,
        title: null,
        demand: {},
        params: {
            title: '',
            // status: '',
        },
//验证字段
        fields: {
            title: {
                message: '标题验证失败',
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: '标题长度必须在1到20之间'
                    },
                },
            }, goodsName: {
                message: '货物验证失败',
                validators: {
                    notEmpty: {
                        message: '货物不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: '货物长度必须在1到20之间'
                    },
                },
            }, weight: {
                message: '重量验证失败',
                validators: {
                    notEmpty: {
                        message: '重量不能为空'
                    }, regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '重量的整数位最多9位，小数位最多2位'
                    }
                },
            }, unit: {
                message: '单位验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择单位'
                    },
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
            }, province: {
                message: '省验证失败',
                validators: {
                    notEmpty: {
                        message: '省不能为空'
                    },
                },
            }, city: {
                message: '市验证失败',
                validators: {
                    notEmpty: {
                        message: '市不能为空'
                    },
                },
            }, county: {
                message: '区县验证失败',
                validators: {
                    notEmpty: {
                        message: '区县不能为空'
                    },
                },
            }, intTime: {
                message: '存储日期验证失败',
                validators: {
                    notEmpty: {
                        message: '存储日期不能为空'
                    },
                },
            }, storageInfo: {
                message: '仓库描述验证失败',
                validators: {
                    notEmpty: {
                        message: '仓库描述不能为空'
                    },
                    callback: {
                        /*自定义，可以在这里与其他输入项联动校验*/
                        message: '仓库描述不能为空',
                        callback: function (value, validator, $field) {
                            if (vm.ue.getContent() == null || vm.ue.getContent() == "") {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                },
            }, status: {
                message: '状态: 0.显示 1.隐藏验证失败',
                validators: {
                    notEmpty: {
                        message: '状态: 0.显示 1.隐藏不能为空'
                    },
                },
            }
        },
        provinces: null,
        cities: null,
        areas: null,
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
        events: {
            'click .demandDetail': function (event, value, row, index) {
                vm.showList = false;
                vm.detail = true;
                vm.title = "详情";
                vm.getInfo(value);
            }
        }
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").BT({
                url: baseURL + 'storage/demand/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t('title'), field: 'title'},
                    {title: vm.$t('Province'), field: 'provinceName'},
                    {title: vm.$t('City'), field: 'cityName'},
                    {title: vm.$t('Country'), field: 'countyName'},
                    {title: vm.$t('EstimatedStorageDate'), field: 'intTime'},
                    {
                        title: vm.$t('contact'), field: 'contact', formatter: function (value, row, index) {
                            if (!isBlank(value) && value.length > 5) {        //备注长度大于5，只展示前5个字符
                                return value.substring(0, 5);
                            } else {
                                return value;
                            }
                        }
                    },
                    {title: vm.$t('phone'), field: 'phone'},
                    // {title: vm.$t('status'), field: 'status', formatter: statusFmt},
                    {title: vm.$t('ReleaseTime'), field: 'createdTime'},
                    {
                        title: vm.$t("chaozuo"), field: 'id', formatter: function (value, row, index) {
                            return "<a href='javascript:void(0)' class='demandDetail'>" + vm.$t('Details') + "</a>";
                        }, events: vm.events
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
            vm.showList = false;
            vm.detail = false;
            vm.title = "新增";
            vm.demand = {};
            vm.demand.status = 0;
            vm.ue.setContent('');
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.detail = false;
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
            this.demand.storageInfo = UE.utils.unhtml(this.ue.getContent());
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("仓库描述上传的图片数量请少于6张")
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选

            if (this.demand.storageInfo == undefined || this.demand.storageInfo == '') {
                alert("仓库描述不能为空！");
                return
            }else if (ceiShi.length>1000){
                alert("仓库描述不可超出1000字")
                return
            }
            var url = vm.demand.id == null ? "storage/demand/save" : "storage/demand/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.demand),
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
                    url: baseURL + "storage/demand/delete",
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
            vm.demand = {};
            vm.ue.setContent('');
            $.get(baseURL + "storage/demand/info/" + id, function (r) {
                vm.demand = r.demand;
                vm.ue.setContent(UE.utils.html(vm.demand.storageInfo));
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.detail = false;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
            vm.ue.setContent('');
        },
        provincesChange: function (index, child, value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            this.cities = JSON.parse(str);
        },
        cityChange: function (index, child, value) {
            var str = JSON.stringify(window.getAreas(value));
            str = str.replace(/areaid/g, "value").replace(/area/g, "label");
            this.areas = JSON.parse(str);
        },
        initDateTime: function () {
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
                meridiem: ["AM", "PM"]
            };
            $("#datetimepicker").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 2,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#datetimepicker").val();
                vm.demand.intTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('intTime', 'NOT_VALIDATED', null)
                    .validateField('intTime');
            });
        },
        updateStatus: function () {
            var row = getSelectedRow();
            if (row == null) {
                return;
            }
            var obj = {
                id: row.id,
                status: parseInt(row.status) == 0 ? 1 : 0
            }
            $.ajax({
                type: "POST",
                url: baseURL + "storage/demand/update",
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
        }
    },
    created: function () {
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces = JSON.parse(str);
    },
    watch: {
        "$i18n.locale": function (value, old) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            this.initTable();
            this.initDateTime();
        },
        "demand.province": function (value, old) {
            if (value != old) {
                var str = JSON.stringify(window.getCities(value));
                str = str.replace(/cityid/g, "value").replace(/city/g, "label");
                this.cities = JSON.parse(str);
                setTimeout(function () {
                    vm.demand.city = parseInt(vm.demand.city);
                }, 0)
            }
        },
        "demand.city": function (value, old) {
            if (value != old) {
                var str = JSON.stringify(window.getAreas(value));
                str = str.replace(/areaid/g, "value").replace(/area/g, "label");
                this.areas = JSON.parse(str);
                console.log(this.areas);
                setTimeout(function () {
                    console.log(vm.demand.county);
                    vm.demand.county = parseInt(vm.demand.county);
                    console.log(vm.demand.county);
                }, 1)
            }
        },
    }
});