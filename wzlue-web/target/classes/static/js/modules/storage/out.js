$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

    vm.initGoodTabele();
});

function updateOut(id, companyName) {
    vm.update(id)
}

function detail(id, companyName) {
    vm.showList = false;
    vm.title = "详情";
    vm.companyName = companyName;
    vm.isDetail = true;
    vm.initDateTime();
    vm.getCompanys();
    vm.getInfo(id);
    // vm.getStorageList();
    $('#contact').attr("disabled","disabled");
    $('#phone').attr("disabled","disabled");
    $('#card').attr("disabled","disabled");
    $('#vehicleNumber').attr("disabled","disabled");
    $('#datetimepicker').attr("disabled","disabled");
    $('#escort1').attr("disabled","disabled");
    $('#escort2').attr("disabled","disabled");
    $('#copeCode1').attr("disabled","disabled");
    $('#copeCode2').attr("disabled","disabled");
    $('#remark').attr("disabled","disabled");

}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        out: {},
        params: {
            status: '',
        },
//验证字段
        fields: {
            code: {
                message: '出库单号验证失败',
                validators: {
                    notEmpty: {
                        message: '出库单号不能为空'
                    },
                },
            }, orderNumber: {
                message: '订单号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单号不能为空'
                    },
                },
            }, contact: {
                message: '司机姓名验证失败',
                validators: {
                    notEmpty: {
                        message: '司机姓名不能为空'
                    },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: '司机姓名长度在20个字符内！'
                    },
                },
            }, phone: {
                message: '司机电话验证失败',
                validators: {
                    notEmpty: {
                        message: '司机电话不能为空'
                    }, regexp: {
                        regexp: /^1[3456789]\d{9}$/,
                        message: '手机号码不正确！'
                    },
                },
            },
            /*card: {
                message: '身份证号验证失败',
                validators: {
                    notEmpty: {
                        message: '身份证号不能为空'
                    },regexp: {
                        regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                        message: '身份证号码格式不正确，为15位和18位身份证号码！'
                    },
                },
            },*/
            vehicleNumber: {
                message: '车牌号验证失败',
                validators: {
                    notEmpty: {
                        message: '车牌号不能为空'
                    },regexp: {
                        regexp: /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/,
                        message: '车牌号格式不正确！'
                    },
                },
            }, takeTime: {
                message: '预计提货时间验证失败',
                validators: {
                    notEmpty: {
                        message: '预计提货时间不能为空'
                    },
                },
            }, escort: {
                message: '是否押车验证失败',
                validators: {
                    notEmpty: {
                        message: '是否押车不能为空'
                    },
                },
            }, copeCode: {
                message: '是否抄码验证失败',
                validators: {
                    notEmpty: {
                        message: '是否抄码不能为空'
                    },
                },
            }, remark: {
                message: '备注验证失败',
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '备注不能超过200个字'
                    },
                },
            }
        },
        companyList: [],
        tableList: [],
        commodityEntityList: [],
        opt: {},
        isDetail: false,
        storageList: [],
    },
    methods: {

        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少

            $("#table").BT({
                url: baseURL + 'storage/storageout/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("OutOfWarehouseSingleNumber"), field: 'code'},
                    {title: vm.$t("WarehouseCompany"), field: 'companyName'},
                    {title: vm.$t("NameOfPickUpDriver"), field: 'contact'},
                    {title: vm.$t("PickUpDriversCall"), field: 'phone'},
                    {title: vm.$t("PrePickUpTime"), field: 'takeTime'},
                    {
                        title: vm.$t("WhetherOrNotToEscortTheCar"),
                        field: 'escort',
                        formatter: function (value, row, index) {
                            var ss = '';
                            if (row.escort == 0) {
                                ss += '是';
                            } else if (row.escort == 1) {
                                ss += '否';
                            }
                            return ss;
                        }
                    },
                    {
                        title: vm.$t("WhetherOrNotToCopyTheCode"),
                        field: 'copeCode',
                        formatter: function (value, row, index) {
                            var ss = '';
                            if (row.copeCode == 0) {
                                ss += '是';
                            } else if (row.copeCode == 1) {
                                ss += '否';
                            }
                            return ss;
                        }
                    },
                    /*{title: '是否发送邮件', field: 'email',formatter:function(value,row,index){
                     var ss='';
                     if(row.email==0){
                     ss+='发送邮件';
                     }else if(row.email==1){
                     ss+='不发送邮件';
                     }
                     return ss;
                     }},*/
                    {
                        title: vm.$t("status"), field: 'status', formatter: function (value, row, index) {
                            var ss = '';
                            if (row.status == 0) {
                                ss += '待出库';
                            } else if (row.status == 1) {
                                ss += '已出库';
                            }
                            return ss;
                        }
                    },
                    // {title: vm.$t("NameOfBuyerCompany"), field: 'merchantName'},
                    {
                        title: vm.$t("chaozuo"),formatter: function (value, row, index) {
                            var ss = '';
                            if (row.status == 0) {
                                ss += '<button class="btn btn-primary btn-sm" onclick="updateOut(' + row.id + ',\'' + row.companyName + '\')">修改</button>&nbsp;';
                            }
                            ss += '<button class="btn btn-primary btn-sm" onclick="detail(' + row.id + ',\'' + row.companyName + '\')">详情</button>&nbsp;';
                            return ss;
                        }
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
            vm.title = "新增";
            vm.out = {};
            vm.initDateTime();
            vm.getCompanys();
            $('#contact').removeAttr("disabled");
            $('#phone').removeAttr("disabled");
            $('#card').removeAttr("disabled");
            $('#vehicleNumber').removeAttr("disabled");
            $('#datetimepicker').removeAttr("disabled");
            $('#escort1').removeAttr("disabled");
            $('#escort2').removeAttr("disabled");
            $('#copeCode1').removeAttr("disabled");
            $('#copeCode2').removeAttr("disabled");
            $('#remark').removeAttr("disabled");
        },
        getCompanys: function () {
            $.get(baseURL + "company/merchantusers/getCompanys", function (r) {
                var str = JSON.stringify(r.list);
                str = str.replace(/id/g, "value").replace(/companyName/g, "label");
                vm.companyList = JSON.parse(str);
            });
        },
        //获取仓库信息
        getStorageList: function () {
            if (vm.out.companyId != '' && vm.out.companyId != null) {
                $.get(baseURL + "storage/orderoffer/getStorageList", {companyId: vm.out.companyId}, function (r) {
                    vm.storageList = r.list;
                    console.log("~~~" + JSON.stringify(vm.storageList));
                });
            }
        },
        //显示选择货物列表modal
        showMModal: function () {
            vm.commodityEntityList = [];
            vm.out.companyId = $('#companyId').val();
            vm.out.storageName = $('#storageName').val();
            if (vm.out.companyId == null || vm.out.companyId == '') {
                alert('请先选择出库仓库公司');
                return;
            }
            if (vm.out.storageName == null || vm.out.storageName == '') {
                alert('请先选择出库仓库');
                return;
            }
            vm.tableList = [];
            if (vm.out.companyId != '' && vm.out.companyId != null) {
                $.get(baseURL + "storage/ordercommodity/getOutCommoditys", {
                    companyId: vm.out.companyId,
                    storageName: vm.out.storageName
                }, function (r) {
                    vm.tableList = r.list;
                    $("#addGoodTable").bootstrapTable('removeAll');
                    $("#addGoodTable").bootstrapTable('append', vm.tableList);
                    $("#addGoodTable").bootstrapTable("refreshOptions",{});     //清除选中状态
                    $('#myModal').modal('show');
                });
            }
        },
        removeGoods: function (index) {
            vm.commodityEntityList.splice(index, 1);
        },
        initGoodTabele: function () {
            vm.opt = {
                pagination: false, //是否分页
                columns: [
                    {checkbox: true},
                    {title: '订单编号', field: 'orderNumber'},
                    {title: '集装箱号', field: 'containerNo'},
                    // {title: '报检号', field: 'inspectionNo'},
                    {title: '品名', field: 'commodityName'},
                    {title: '原产国', field: 'commodityCountry'},
                    {title: '生产商', field: 'commodityFactoryNumber'},
                    {title: '单价', field: 'commodityPrice'},
                    {title: '生产日期', field: 'productionDate'},
                    {title: '到期日期', field: 'expirationDate'},
                    {title: '剩余重量', field: 'weight'},
                    {title: '单位', field: 'unitName'}
                    // {title: '剩余数量', field: 'weightNum'},
                    // {title: '单位', field: 'unitName'}
                ]
            }
            $("#addGoodTable").BT2(vm.opt);
        },
        //添加货物事件
        addGood: function () {
            $('#myModal').modal('hide');
            var grid = $("#addGoodTable").bootstrapTable('getSelections');
            $("#addGoodTable").bootstrapTable("uncheckAll")
            if (!grid.length) {
                alert("请选择一条记录");
                return;
            }
            if (vm.commodityEntityList == null) {
                vm.commodityEntityList = [];
            }
            grid.forEach(function (item) {
                // if (vm.commodityEntityList.length == 0) {
                //     vm.commodityEntityList.push(item);
                // } else {
                //     for (let obj of vm.commodityEntityList) {
                //         if (obj.orderCommodityId != item.orderCommodityId) {
                //             vm.commodityEntityList.push(item);
                //         }
                //     }
                // }
                vm.commodityEntityList.push(item);
            });
        },
        update: function (id) {
            vm.showList = false;
            vm.title = "修改";
            vm.initDateTime();
            vm.getCompanys();
            vm.getInfo(id);

            $('#contact').removeAttr("disabled");
            $('#phone').removeAttr("disabled");
            $('#card').removeAttr("disabled");
            $('#vehicleNumber').removeAttr("disabled");
            $('#datetimepicker').removeAttr("disabled");
            $('#escort1').removeAttr("disabled");
            $('#escort2').removeAttr("disabled");
            $('#copeCode1').removeAttr("disabled");
            $('#copeCode2').removeAttr("disabled");
            $('#remark').removeAttr("disabled");
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            if (!isBlank(vm.out.card)) {
                if (!/(^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$)/.test(vm.out.card)) {
                    alert("身份证号码格式不正确");
                    return;
                }
            }
            if (vm.commodityEntityList == null || vm.commodityEntityList.length == 0) {
                alert("请添加货物信息");
                return;
            }
            for (let obj of vm.commodityEntityList) {
                if (!/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(obj.outWeight)) {
                    alert("出库重量不能为0");
                    return;
                }
                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.outWeight)) {
                    alert("出库重量整数最多9位，小数最多2位");
                    return;
                }
                if (obj.outWeight > obj.weight) {
                    alert("出库重量不能超过库存重量");
                    return;
                }
                // if (!/(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.outWeightNum)) {
                //     alert("出库数量整数最多11位，小数最多2位");
                //     return;
                // }
                // if (obj.outWeightNum > obj.weightNum) {
                //     alert("出库数量不能超过库存数量");
                //     return;
                // }
            }
            vm.out.commodityEntityList = vm.commodityEntityList;
            var url = vm.out.id == null ? "storage/storageout/save" : "storage/storageout/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.out),
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
                    url: baseURL + "storage/storageout/delete",
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
            $.get(baseURL + "storage/storageout/info/" + id, function (r) {
                vm.out = r.storageOut;
                vm.commodityEntityList = r.commodityEntityList;
                console.log("!!!!!"+vm.out.companyId);
                console.log("!!!!!"+vm.out.storageName);
                if (vm.out.companyId != '' && vm.out.companyId != null) {
                    $.get(baseURL + "storage/orderoffer/getStorageList", {companyId: vm.out.companyId}, function (r) {
                        vm.storageList = r.list;
                        console.log("~~~" + JSON.stringify(vm.storageList));
                    });
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            vm.out = {};
            vm.tableList = [];
            vm.commodityEntityList = [];
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
            vm.isDetail = false;
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
                vm.out.takeTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('takeTime', 'NOT_VALIDATED', null)
                    .validateField('takeTime');

            });
        },
        print: function () {
            $("#printTable").jqprint();
        },
        showPrintTable: function () {
            $('#printModal').modal('show');
        },
        //下载出库单（html内容导出成word)
        toWord: function () {
            //js获取当前日期时间“yyyy-MM-dd HH:MM:SS”
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = "：";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentTime = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            //fileName为导出的word文件的命名
            $("#printTable").wordExport(currentTime + "出库单");
        }


    },
    created: function () {

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
    },
});


$.fn.BT2 = function (obj) {
    return $(this).bootstrapTable({
        url: obj.url,                           //请求后台的URL（*）
        data: obj.data || [],
        method: obj.method ? obj.method : 'get',//请求方式（*）
        // toolbar: '#toolbar',                    //工具按钮用哪个容器
        striped: true,                          //是否显示行间隔色
        cache: obj.cache ? obj.cache : true,    //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        sortable: false,                         //是否启用排序
        sortOrder: obj.sortOrder ? obj.sortOrder : "desc",//排序方式
        sidePagination: 'server',               //分页方式：client客户端分页，server服务端分页（*）
        queryParams: function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            };
            console.log(obj.queryParams);
            //对象合并
            temp = Object.assign(temp, (obj.queryParams || {}));
            console.log(temp);
            return temp;
        },
        search: false,                      //是否显示表格搜索，此搜索是客户端搜索
        showColumns: false,                      //是否显示所有的列
        showRefresh: false,                      //是否显示刷新按钮
        clickToSelect: true,                    //是否启用点击选中行
        height: obj.height ? obj.height : 650,  //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: obj.uniqueId ? obj.uniqueId : "ID",                         //每一行的唯一标识，一般为主键列
        showToggle: false,                       //是否显示详细视图和列表视图的切换按钮
        cardView: false,                        //是否显示详细视图
        showExport: false,                       //是否显示导出
        onLoadSuccess: obj.onLoadSuccess,         //数据加载完成以后事件
        onClickRow: obj.onClickRow,                  //单击row事件
        onEditableSave: obj.onEditableSave,//保存可编辑单元格时触发，参数field, row, oldValue, $el
        columns: function () {                  //列表数据
            //获取列名
            var array = obj.columns;
            return array;
        }
        (),
    });
}

