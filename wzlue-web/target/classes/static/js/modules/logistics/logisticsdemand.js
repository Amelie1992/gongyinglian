$(function () {
    //列表
    vm.initTable();
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

});

function operFormatter(value, row, index) {
    var op = '';
    op += '<a id="btn_detail">查看详情</a>';
    return op;
}

//运输分类
function categoryIdFmt(value, rows, index) {
    var py = rows.categoryId;
    if (py == '0') {
        return ['<span class="label label-default">船舶</span>'].join('');
    } else if (py == '1') {
        return ['<span class="label label-default">车辆</span>'].join('');
    } else if (py == '2') {
        return ['<span class="label label-default">航空</span>'].join('');
    } else if (py == '3') {
        return ['<span class="label label-default">火车</span>'].join('');
    }
}

//运输线路
function typeFmt(value, rows, index) {
    var pyy = rows.type;
    if (pyy == '0') {
        return ['<span class="label label-default">国内</span>'].join('');
    } else if (pyy == '1') {
        return ['<span class="label label-default">国际</span>'].join('');
    }
}

window.operateEvents = {
    'click #btn_detail': function (event, value, row, index) {
        vm.showList = false;
        vm.backShow = false;
        vm.getInfo(row.id);
    }
};

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        logisticsDemand: {},
        params: {
            categoryId: '',
            title: ''
        },
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
        categoryOptions: [
            {value: 0, label: '船舶'},
            {value: 1, label: '车辆'},
            {value: 2, label: '航空'},
            {value: 3, label: '铁路'}
        ],
        showBtn: true,
        backShow: true,
        logisticsDemand: [],
        provinces1: [],
        provinces2: [],
        cities: [],
        cities1: [],
        //验证字段
        fields: {
            title: {
                message: '标题名称验证失败',
                validators: {
                    notEmpty: {
                        message: '标题名称不能为空'
                    },
                    stringLength: {
                        max: 20,
                        message: '标题长度要小于20个字符'
                    }
                },
            }, goods: {
                message: '运输货物验证失败',
                validators: {
                    notEmpty: {
                        message: '运输货物不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '长度要小于20个字符'
                    }
                },
            }, height: {
                message: '数量验证失败',
                validators: {
                    notEmpty: {
                        message: '数量不能为空'
                    }, regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '数量整数最多9位，可保留2位小数'
                    }
                },
            }, unit: {
                message: '单位 0:吨,1:千克验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择单位'
                    },
                },
            }, categoryId: {
                message: '运输分类',
                validators: {
                    notEmpty: {
                        message: '请选择运输分类'
                    },
                },
            }, type: {
                message: '物流类型',
                validators: {
                    notEmpty: {
                        message: '请选择物流类型'
                    },
                },
            }, provinceStart: {
                validators: {
                    notEmpty: {
                        message: '出发地省不能为空'
                    },stringLength: {
                        max: 20,
                        message: '出发地省须少于20个字符'
                    }
                },
            }, provinceEnd: {
                validators: {
                    notEmpty: {
                        message: '目的地省不能为空'
                    },stringLength: {
                        max: 20,
                        message: '目的地省须少于20个字符'
                    }
                },
            }, cityStart: {
                validators: {
                    notEmpty: {
                        message: '出发地市不能为空'
                    },stringLength: {
                        max: 20,
                        message: '出发地市须少于20个字符'
                    }
                },
            }, cityEnd: {
                validators: {
                    notEmpty: {
                        message: '目的地市不能为空'
                    },stringLength: {
                        max: 20,
                        message: '目的地市须少于20个字符'
                    }
                },
            }
        }
    },
    methods: {
        initTable: function () {
            $("#table").BT({
                url: baseURL + 'logistics/logisticsdemand/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t('categoryId'), field: 'categoryId', align: 'center', formatter: categoryIdFmt},
                    {title: vm.$t('title'), field: 'title', align: 'center'},
                    {title: vm.$t('goods'), field: 'goods', align: 'center'},
                    {title: vm.$t('num'), field: 'height', align: 'center'},
                    {
                        title: vm.$t('unit'), field: 'unit', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "吨"
                            } else if (value == 1) {
                                return "千克"
                            } else if (value == 2) {
                                return "柜"
                            } else {
                                return "-"
                            }
                        }
                    },
                    {title: vm.$t('type'), field: 'type', align: 'center', formatter: typeFmt},
                    {title: vm.$t('ReleaseTime'), field: 'creatDate', align: 'center'},
                    {title: vm.$t('chaozuo'), align: 'center', formatter: operFormatter, events: operateEvents}
                ],
                //条件查询
                queryParams: vm.params
            });
        },
        query: function () {
            $("#table").bootstrapTable("refreshOptions", {
                queryParams: function (param) {
                    var query = $.extend(true, param, vm.params);
                    return query;
                },
                pageNumber: 1
            });
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.logisticsDemand = {};
            vm.ue.setContent("");
        },
        update: function (id) {
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
        //选择出发地 sheng
        provincesChange: function (value, data, e) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            //this.cities
            this.cities = JSON.parse(str);

        },

        //选择目的地
        provincesChange1: function (value, data, e) {
            console.log(value);
            var str = JSON.stringify(window.getCities(value));
            console.log(str);
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            //this.citiesdescribe
            this.cities1 = JSON.parse(str);
        },
        saveOrUpdate: function (event) {
            vm.logisticsDemand.describe = UE.utils.unhtml(this.ue.getContent());
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if(arr!=null){
                if (arr.length>5){
                    alert("业务描述上传的图片数量请少于6张")
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选
            if (ceiShi.length > 1000) {
                alert("业务描述不可超出1000个字符");
                return;
            }
            if (vm.logisticsDemand.type == 0) {
                if (vm.logisticsDemand.provinceStart == null || vm.logisticsDemand.provinceStart == '') {
                    alert("请选择国内运输线路");
                    return;
                } else {
                    if (vm.logisticsDemand.provinceEnd == null || vm.logisticsDemand.provinceEnd == '') {
                        alert("请选择国内运输线路");
                        return;
                    }
                }
            }
            if (vm.logisticsDemand.type == 1) {
                if (vm.logisticsDemand.provinceStart == null || vm.logisticsDemand.provinceStart == '') {
                    alert("请选择国际运输线路");
                    return;
                } else {
                    if (vm.logisticsDemand.provinceEnd == null || vm.logisticsDemand.provinceEnd == '') {
                        alert("请选择国际运输线路");
                        return;
                    }
                }
            }
            layer.load();
            var url = vm.logisticsDemand.id == null ? "logistics/logisticsdemand/save" : "logistics/logisticsdemand/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.logisticsDemand),
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
                    url: baseURL + "logistics/logisticsdemand/delete",
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
            vm.title = "详情";
            $.get(baseURL + "logistics/logisticsdemand/info/" + id, function (r) {
                vm.logisticsDemand = r.logisticsDemand;
                vm.ue.setContent(UE.utils.html(vm.logisticsDemand.describe == null ? "" : vm.logisticsDemand.describe));
                if (vm.logisticsDemand.type == 0) {
                    vm.showBtn = true;
                    var str = JSON.stringify(window.getCities(vm.logisticsDemand.provinceStart));
                    str = str.replace(/cityid/g, "value").replace(/city/g, "label");
                    vm.cities = JSON.parse(str);
                    var strEnd = JSON.stringify(window.getCities(vm.logisticsDemand.provinceEnd));
                    strEnd = strEnd.replace(/cityid/g, "value").replace(/city/g, "label");
                    vm.cities1 = JSON.parse(strEnd);
                    setTimeout(function () {
                        vm.logisticsDemand.cityStart = parseInt(r.logisticsDemand.cityStart, 10);
                        vm.logisticsDemand.cityEnd = parseInt(r.logisticsDemand.cityEnd, 10);
                    }, 50)

                } else {
                    vm.showBtn = false;
                    vm.logisticsDemand = r.logisticsDemand;
                }


            });
        },
        //改变物流类型
        changeType: function () {
            vm.logisticsDemand.provinceStart = '';
            vm.logisticsDemand.provinceEnd = '';
            vm.logisticsDemand.cityStart = '';
            vm.logisticsDemand.cityEnd = '';
            if (vm.logisticsDemand.type == '1') {
                vm.showBtn = false;
            } else {
                vm.showBtn = true;
            }
        },
        reload: function (event) {
            vm.showList = true;
            vm.backShow = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    },

    created: function () {
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces1 = JSON.parse(str);
        this.provinces2 = JSON.parse(str)
        this.logisticsDemand.push({province: null, city: null})
    },
    watch: {
        "$i18n.locale": function (value, old) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy")
            this.initTable();
        }
    }
});