$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });

    $('#signingTime').datetimepicker().on('change', function (ev) {
        let value = $("#signingTime").val();
        Vue.set(vm.storageContract, 'signingTime', value);
    });
    $('#expireDate').datetimepicker().on('change', function (ev) {
        let value = $("#expireDate").val();
        Vue.set(vm.storageContract, 'expireDate', value);
    });

});

function updateContract(id) {
    vm.update(id);
}

function detailContract(id) {
    vm.detail(id);
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        storageContract: {
            file:[],
            unit:'',
        },
        params: {
            contractName: '',
            contractNumber: '',
            orderNumber: ''
        },
//验证字段
        fields: {
            contractNumber: {
                message: '合同编号验证失败',
                validators: {
                    notEmpty: {
                        message: '合同编号不能为空'
                    },
                    stringLength: {
                        max: 30,
                        message: '长度必须在30之内'
                    },
                    regexp: {
                        regexp: /^[^\u4e00-\u9fa5]{0,}$/,
                        message: '请勿输入中文'
                    }
                },
            }, /*orderNumber: {
                message: '订单编号验证失败',
                validators: {
                    notEmpty: {
                        message: '订单编号不能为空'
                    },
                    stringLength:{
                        max: 50,
                        message: '长度必须在50之内'
                    }
                },
            },*/
            contractName: {
                message: '合同名称验证失败',
                validators: {
                    notEmpty: {
                        message: '合同名称不能为空'
                    },
                    stringLength: {
                        max: 50,
                        message: '长度必须在50之内'
                    }
                },
            }, dataSource: {
                message: '合同创建来源 1.订单创建 2.自主录入验证失败',
                validators: {
                    notEmpty: {
                        message: '合同创建来源 1.订单创建 2.自主录入不能为空'
                    },
                },
            }, customsCopName: {
                message: '甲方企业名称验证失败',
                validators: {
                    notEmpty: {
                        message: '甲方企业名称不能为空'
                    },
                    stringLength: {
                        max: 50,
                        message: '长度必须在50之内'
                    }
                },
            }, merchantCopName: {
                message: '乙方企业名称验证失败',
                validators: {
                    notEmpty: {
                        message: '乙方企业名称不能为空'
                    },
                    stringLength: {
                        max: 50,
                        message: '长度必须在50之内'
                    }
                },
            }, payMethod: {
                message: '付款方式验证失败',
                validators: {
                    notEmpty: {
                        message: '付款方式不能为空'
                    },
                },
            }, contractAmount: {
                message: '合同金额验证失败',
                validators: {
                    notEmpty: {
                        message: '合同金额不能为空'
                    },
                    regexp: {
                        // regexp: /(^[1-9](\d{1,10})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '合同金额的整数位最多9位，小数位最多2位'
                    }
                },
            }, storageLocation: {
                message: '存放位置验证失败',
                validators: {
                    notEmpty: {
                        message: '存放位置不能为空'
                    },
                    stringLength:{
                        max: 50,
                        message: '长度必须在50之内'
                    }
                },
            }, signingTime: {
                message: '签订日期验证失败',
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '签订日期不能为空'
                    },
                    /*callback: {
                        message: '签订日期必须小于到期时间',
                        callback: function (value, validator, $field) {
                            let other = validator.getFieldElements('expireDate').val();
                            if (isBlank(other)) {
                                return true;
                            }else {
                                let end = new Date(other.replace("-", "/").replace("-", "/"));
                                let start = new Date(value.replace("-", "/").replace("-", "/"));
                                if (end > start) {
                                    return true;
                                }else {
                                    return false;
                                }
                            }
                        }
                    }*/
                },
            }/*, expireDate: {
                message: '到期日期验证失败',
                trigger: 'change',
                validators: {
                    // notEmpty: {
                    //     message: '到期日期不能为空'
                    // },
                    //时间验证
                    callback: {
                        message: '到期时间必须大于签订日期',
                        callback: function (value, validator, $field) {
                                let other = validator.getFieldElements('signingTime').val();
                                if(!isBlank(other)){
                                    return true;
                                }else {
                                    let start = new Date(other.replace("-", "/").replace("-", "/"));
                                    let end = new Date(value.replace("-", "/").replace("-", "/"));
                                    if (end > start) {
                                        return true;
                                    }else {
                                        return false;
                                    }
                                }

                        }
                    }
                },
            }*/, remarks: {
                message: '备注验证失败',
                validators: {
                    //长度校验
                    stringLength: {
                        max: 200,
                        message: '长度必须在200之内'
                    }
                }
            }
        },

        files: [],
        count:1,
        contracts: null
    },
    methods: {

        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'storage/storagecontract/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("ContractNumber"), field: 'contractNumber'},
                    // {title: vm.$t("ContractName"), field: 'contractName'},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {title: vm.$t("NameOfPartyA"), field: 'customsCopName'},
                    {title: vm.$t("NameOfPartyB"), field: 'merchantCopName'},
                    {
                        title: vm.$t("PaymentMethod"), field: 'payMethod', formatter: function (value, row, index) {
                            if (row.payMethod == null || row.payMethod == undefined) {
                                return '暂未选择';
                            } else if (row.payMethod == 1) {
                                return '一次性全款';
                            } else if (row.payMethod == 2) {
                                return '分期付款';
                            } else {
                                return '其他';
                            }
                        }
                    },
                    {title: vm.$t("ContractAmount"), field: 'contractAmount'},
                    {title: vm.$t("unit"), field: 'unit', formatter: function (value, row, index) {
                            if (row.storageOrder.unit == '0') {
                                return '元';
                            } else if (row.storageOrder.unit == '1') {
                                return '美元';
                            }
                        }
                    },
                    {title: vm.$t("DateOfSigning"), field: 'signingTime'},
                    {title: vm.$t("ExpirationDate"), field: 'expireDate'},
                    {title: vm.$t("Remarks"), field: 'remarks',formatter:function (value, row, index) {
                            if (value != null && value.length > 10) {
                                return value.substring(0,10);
                            }else {
                                return value;
                            }
                        } },
                    {
                        title: vm.$t("chaozuo"),formatter: function (value, row, index) {
                            return ['<a onclick="updateContract(' + row.id + ')" class="">修改</a>&nbsp;&nbsp;<a onclick="detailContract(' + row.id + ')" class="">详情</a>'].join('');
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
            $('#contractNumber').removeAttr("disabled");
            $('#orderNumber').removeAttr("disabled");
            $('#customsCopName').removeAttr("disabled");
            $('#merchantCopName').removeAttr("disabled");
            $('#payMethod').removeAttr("disabled");
            $('#contractAmount').removeAttr("disabled");
            $('#signingTime').removeAttr("disabled");
            $('#expireDate').removeAttr("disabled");
            vm.showList = false;
            vm.title = "新增";
            vm.storageContract = {file:[]};
        },
        Dload: function () {
            var rows = getSelectedRows();
            if (rows != null) {
                rows.forEach(function (item) {
                    if (item.file != null && item.file.length > 0) {
                        item.file.forEach(function (value, index) {
                            window.download(value.url, value.fileName);
                        })
                        // for (var i = 0; i < item.file.length; i++) {
                        //     window.download(item.file[i].url, item.file[i].fileName);
                        // }
                    } else {
                        alert("附件不存在");
                    }
                })
            }
        },
        update: function (rowId) {
            if (rowId == null) {
                return;
            }
            $('#contractNumber').attr("disabled", "disabled");
            $('#orderNumber').attr("disabled", "disabled");
            $('#customsCopName').attr("disabled", "disabled");
            $('#merchantCopName').attr("disabled", "disabled");
            $('#payMethod').attr("disabled", "disabled");
            $('#contractAmount').attr("disabled", "disabled");
            $('#signingTime').attr("disabled", "disabled");
            $('#expireDate').attr("disabled", "disabled");
            vm.showList = false;
            vm.title = "修改";
            vm.getInfo(rowId)
        },
        detail: function (rowId) {
            if (rowId == null) {
                return;
            }
            $('#contractNumber').attr("disabled", "disabled");
            $('#orderNumber').attr("disabled", "disabled");
            $('#customsCopName').attr("disabled", "disabled");
            $('#merchantCopName').attr("disabled", "disabled");
            $('#payMethod').attr("disabled", "disabled");
            $('#contractAmount').attr("disabled", "disabled");
            $('#signingTime').attr("disabled", "disabled");
            $('#expireDate').attr("disabled", "disabled");
            vm.showList = false;
            vm.title = "详情";
            vm.getInfo(rowId);
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //预览
        preview:function(event) {
            var type = vm.storageContract.fileList[event].picName.substr(vm.storageContract.fileList[event].picName.lastIndexOf("."));
            if(type == '.doc' || type == '.docx' || type=='.xls' || type == '.xlsx'){
                window.open("https://view.officeapps.live.com/op/view.aspx?src="+vm.storageContract.fileList[event].picUrl+"")
            }else{
                window.open(vm.storageContract.fileList[event].picUrl)
            }
            //
        },
        //下载
        downloadFile:function(event){
            window.download(vm.storageContract.fileList[event].picUrl, vm.storageContract.fileList[event].picName);
        },
        removeFile:function(event){
            console.log(vm.storageContract.fileList);
            var removeFile = [];
            removeFile.push(vm.storageContract.fileList[event]);
            removeFile.forEach(function (item) {
                vm.storageContract.fileList.splice(vm.storageContract.fileList.indexOf(item), 1);
            })
            console.log(event);
        },
        saveOrUpdate: function (event) {
            //检验合同编号是否已经存在
            $.ajaxSettings.async = false;
            $.get(baseURL + "storage/storagecontract/check" ,
                {contractNumber:vm.storageContract.contractNumber, contractId:vm.storageContract.id} , function (r) {
                    vm.contracts = r.contracts;
                });
            $.ajaxSettings.async = true;
            if (vm.contracts != null && vm.contracts.length > 0) {
                alert("该合同编号已经被占用！");
                vm.storageContract.contractNumber = '';
                $("input[name='contractNumber']").val('');
                $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return
            }

            if (vm.storageContract.orderNumber != null && vm.storageContract.orderNumber.length > 50) {
                alert("订单编号要小于50个字符");
                return;
            }

            if (vm.storageContract.id == null && !isBlank(vm.storageContract.expireDate)) { //新增
                var currentDate = new Date();
                var start = new Date(vm.storageContract.signingTime.replace("-", "/").replace("-", "/"));
                var end = new Date(vm.storageContract.expireDate.replace("-", "/").replace("-", "/"));
                if (end < currentDate || end == currentDate) {
                    alert("合同到期日期须大于当前日期");
                    return
                }
                if (end < start || end == start) {
                    alert("合同到期日期须大于签订日期");
                    return
                }
            }

            /*if (vm.storageContract.remarks != null && vm.storageContract.remarks.length > 200) {
                alert("备注长度要小于200个字符");
                return;
            }*/
            vm.storageContract.fileList == undefined ? vm.storageContract.fileList = [] : vm.storageContract.fileList;
            if (vm.files.length > 0 || vm.storageContract.fileList.length > 0) {
                /*var contracts = [];
                vm.files.forEach(function (item, index) {
                    var contract = {};
                    contract.fileName = item.name;
                    contract.url = item.picUrl;
                    contract.fileType = item.type;
                    contract.contractType = 3;
                    contracts.push(contract);
                });
                vm.storageContract.file = contracts;*/
            } else {
                alert("请上传合同附件");
                return false;
            }
            vm.storageContract.file = vm.storageContract.fileList;
            var url = vm.storageContract.id == null ? "storage/storagecontract/save" : "storage/storagecontract/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.storageContract),
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
                    url: baseURL + "storage/storagecontract/delete",
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
            vm.files = [];   //清空files ，以免插入缓存中的图片
            $.get(baseURL + "storage/storagecontract/info/" + id, function (r) {
                vm.storageContract = r.storageContract;
                vm.storageContract.unit = r.storageContract.storageOrder.unit;
                //附件
                if (vm.storageContract.file != null && vm.storageContract.file.length > 0) {
                    vm.storageContract.file.forEach(function (item, index) {
                        item.name = item.fileName;
                        item.picName = item.fileName;
                        item.picUrl = item.url;
                    });
                }
                vm.storageContract.fileList = vm.storageContract.file;
                //存放位置
                // if (vm.storageContract.storageLocation != null) {
                //     $("input[name='storageLocation']").val(vm.storageContract.storageLocation);
                // } else {
                //     $("input[name='storageLocation']").val(vm.storageContract.storageLocation);
                // }
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        initTime: function () {
            $('#signingTime').datetimepicker('remove');
            $('#expireDate').datetimepicker('remove');
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
            $("#signingTime").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 2,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#signingTime").val();
                vm.storageContract.signingTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('signingTime', 'NOT_VALIDATED', null)
                    .validateField('signingTime');
            });
            $("#expireDate").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 2,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#expireDate").val();
                vm.storageContract.expireDate = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('expireDate', 'NOT_VALIDATED', null)
                    .validateField('expireDate');
            });
        },
    },

    watch: {
        'files':function(){
            console.log(vm.files);
            var user = JSON.parse(localStorage.getItem('user'));
            if(vm.storageContract.fileList == null){
                vm.storageContract.fileList = vm.files;
            }
            var file = [];
            file = vm.storageContract.fileList;
            vm.files.forEach(function (item, index) {
                item.fileName = item.picName;
                item.url = item.picUrl;
                item.fileType = item.type;
                item.username = user.username;
                item.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                var count = 0;
                for(var i = 0; i < file.length; i++){
                    var fileObject = vm.storageContract.fileList[i];
                    if(item.picName == fileObject.picName){
                        count += 1;
                        break;
                    }
                }
                if(count < 1){
                    vm.storageContract.fileList.push(item);
                }

            })
        },
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

function checkContract(value) {
    if (value == '' || value == null) {
        return;
    }
    $.ajax({
        type: "POST",
        url: baseURL + "storage/storagecontract/checkCode",
        contentType: "application/json",
        data: JSON.stringify({contractNumber: value, dataSource: 2}),
        success: function (r) {
            if (r.code === 0) {
                if (r.storageContract != null) {
                    alert("此合同编号已经存在");
                }
            } else {
                alert(r.msg);
            }
        }
    });

}