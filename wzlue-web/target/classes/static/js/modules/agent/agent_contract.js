$(function () {
//列表
    vm.initTab();
//表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    })


});

function operFormatter(value, row, index) {

    if (1 == 1) {
        return ['<a id="btn_edit" class="">' + vm.$t("modify") + '</a>&nbsp;&nbsp;<a id="btn_info" class="">' + vm.$t("Details") + '</a>'].join('');
    } else {
        return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a>'].join('');
    }
}

window.operateEvents = {
    'click #btn_edit': function (e, value, row, index) {
        vm.update(row.id);
    },
    'click #btn_info': function (e, value, row, index) {
        vm.detail(row.id);
    }
}

function payMethodFmt(value, row, index) {
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

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        showSaveOrUpdate: false,
        showDetail: false,
        title: null,
        agentContract: {
            annexs:[],
            currency:'',
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
            },
            /* orderNumber: {
                 message: '订单编号验证失败',
                 required:false,
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
            customsCopName: {
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
            },
            merchantCopName: {
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
            },
            payMethod: {
                message: '付款方式验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择付款方式'
                    },
                },
            },
            contractAmount: {
                message: '合同金额验证失败',
                validators: {
                    notEmpty: {
                        message: '合同金额不能为空'
                    },
                    regexp: {
                        // regexp: /^[0-9]{1,5}([.][0-9]{1,3})?$/,
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '合同金额的整数最多9位，小数最多2位'
                    }
                },
            },
            signingTime: {
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
                            } else {
                                let end = new Date(other.replace("-", "/").replace("-", "/"));
                                let start = new Date(value.replace("-", "/").replace("-", "/"));
                                if (end > start) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    }*/
                },
            },
            /*expireDate: {
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
                            if (!isBlank(other)) {
                                return true;
                            } else {
                                let start = new Date(other.replace("-", "/").replace("-", "/"));
                                let end = new Date(value.replace("-", "/").replace("-", "/"));
                                if (end > start) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
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
                }
            }, sltPaySelect: {
                message: '支付方式验证失败',
                validators: {
                    notEmpty: {
                        message: '支付方式不能为空'
                    },
                    callback: {
                        message: '必须选择一个支付方式',
                        callback: function (value, validator) {
                            if (value == 0) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }
            },location: {
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
            },remarks: {
                message: '备注验证失败',
                validators: {
                    stringLength:{
                        max: 200,
                        message: '长度必须在200之内'
                    }
                },
            }
        },
        disenbled: false,
        disenbled2: false,
        currencyList: [],
        unitList: [],
        files: [],
        company: {},
        contracts: null
    },
    methods: {
        initTab: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'agent/contract/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("ContractNumber"), field: 'contractNumber'},
                    // {title: vm.$t("ContractName"), field: 'contractName'},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    {title: vm.$t("NameOfPartyA"), field: 'customsCopName'},
                    {title: vm.$t("NameOfPartyB"), field: 'merchantCopName'},
                    {title: vm.$t("PaymentMethod"), field: 'payMethod', formatter: payMethodFmt},
                    {title: vm.$t("ContractAmount"), field: 'contractAmount'},
                    {
                        title: vm.$t("unit"), field: 'currency', formatter: function (value, row, idx) {
                            return value == 'USD' ? '美元' : '元';
                        }
                    },
                    {title: vm.$t("DateOfSigning"), field: 'signingTime'},
                    {title: vm.$t("ExpirationDate"), field: 'expireDate'},
                    {title: vm.$t("Remarks"), field: 'remarks',formatter:function (value,row,index) {
                            if (value !=null && value.length > 10) {
                                return value.substring(0,10);
                            } else {
                                return value;
                            }
                        }},
                    // {title: vm.$t("CreationTime"), field: 'createTime'},
                    {title: vm.$t("chaozuo"), events: operateEvents, formatter: operFormatter}
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
            vm.showSaveOrUpdate = true;
            vm.showDetail = false;
            vm.title = "新增";
            vm.agentContract = {annexs:[]};
        },
        update: function (rowId) {
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.showSaveOrUpdate = true;
            vm.showDetail = false;
            vm.title = "修改";

            vm.getInfo(rowId)
        },
        detail: function (rowId) {
            if (rowId == null) {
                return false;
            }
            vm.showList = false;
            vm.showSaveOrUpdate = true;
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
        preview: function (event) {
            var type = vm.agentContract.fileList[event].picName.substr(vm.agentContract.fileList[event].picName.lastIndexOf("."));
            if (type == '.doc' || type == '.docx' || type == '.xls' || type == '.xlsx') {
                window.open("https://view.officeapps.live.com/op/view.aspx?src=" + vm.agentContract.fileList[event].picUrl + "")
            } else {
                window.open(vm.agentContract.fileList[event].picUrl)
            }
            //
        },
        //下载
        downloadFile: function (event) {
            window.download(vm.agentContract.fileList[event].picUrl, vm.agentContract.fileList[event].picName);
        },
        removeFile: function (event) {
            console.log(vm.agentContract.fileList);
            var removeFile = [];
            removeFile.push(vm.agentContract.fileList[event]);
            removeFile.forEach(function (item) {
                vm.agentContract.fileList.splice(vm.agentContract.fileList.indexOf(item), 1);
            })
            console.log(event);
        },
        saveOrUpdate: function (event) {
            //检验合同编号是否已经存在
            $.ajaxSettings.async = false;
            $.get(baseURL + "agent/contract/check" ,
                {contractNumber:vm.agentContract.contractNumber, contractId:vm.agentContract.id} , function (r) {
                    vm.contracts = r.contracts;
                });
            $.ajaxSettings.async = true;
            if (vm.contracts != null && vm.contracts.length > 0) {
                alert("该合同编号已经被占用！");
                vm.agentContract.contractNumber = '';
                $("input[name='contractNumber']").val('');
                $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return
            }

            // console.log("contractAmount", vm.agentContract.contractAmount);
            if (null == vm.agentContract.payMethod) {
                alert("请选择付款方式");
                return false;
            }

            if (vm.agentContract.id == null && !isBlank(vm.agentContract.expireDate)) { //新增
                var currentDate = new Date();
                var start = new Date(vm.agentContract.signingTime.replace("-", "/").replace("-", "/"));
                var end = new Date(vm.agentContract.expireDate.replace("-", "/").replace("-", "/"));
                if (end < currentDate || end == currentDate) {
                    alert("合同到期日期须大于当前日期");
                    return
                }
                if (end < start || end == start) {
                    alert("合同到期日期须大于签订日期");
                    return
                }
            }

            let location = $("#location").val();
            if (!isBlank(location)) {
                $.ajax({
                    type: 'POST',
                    url: baseURL + 'company/merchantusers/gerInfoByUser',
                    dataType: 'JSON',
                    async: false,
                    success: function (r) {
                        if (r.code == 0) {
                            vm.company = r.company;
                            if (vm.company.companyName == vm.agentContract.merchantCopName) {
                                vm.agentContract.customsStorageLocation = location;
                                vm.agentContract.cusCompanyId = vm.company.id;
                            } else if (vm.company.companyName == vm.agentContract.customsCopName) {
                                vm.agentContract.merchantStorageLocation = location;
                                vm.agentContract.merCompanyId = vm.company.id;
                            }
                        }
                    }
                });
            } else {
                alert("存放位置不可为空");
                return false;
            }
            vm.agentContract.annexs == undefined ? vm.agentContract.annexs = [] : vm.agentContract.annexs;
            if (vm.files.length > 0 || vm.agentContract.annexs.length > 0) {
                /*let file = {};

                vm.files.forEach(function (item, index) {
                    file = {};
                    file.fileName = item.name;
                    file.url = item.picUrl;
                    file.fileType = item.type;
                    vm.agentContract.annexs.push(file);
                });*/
            } else {
                alert("请上传合同附件");
                return false;
            }
            vm.agentContract.annexs = vm.agentContract.fileList;
            layer.load();
            var url = vm.agentContract.id == null ? "agent/contract/save" : "agent/contract/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.agentContract),
                success: function (r) {
                    layer.closeAll();
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
                    url: baseURL + "chatMsg/agentcontract/delete",
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
            $.get(baseURL + "agent/contract/info/" + id, function (r) {
                vm.agentContract = r.agentContract;
                vm.agentContract.currency = r.agentContract.agentOrder.currency;
                if (vm.agentContract.dataStore == 1) {
                    Vue.set(vm, disenbled, true);
                }
                //支付方式
                if (vm.agentContract.payMethod != null) {
                    $(".selectPayMethod").val(vm.agentContract.payMethod).trigger("change");
                }
                //附件
                if (vm.agentContract.annexs != null && vm.agentContract.annexs.length > 0) {
                    vm.files = [];
                    vm.agentContract.annexs.forEach(function (item, index) {
                        item.name = item.fileName;
                        item.picUrl = item.url;
                        item.picName = item.fileName;
                    });

                }
                vm.agentContract.fileList = vm.agentContract.annexs;
                //存放位置
                if (vm.agentContract.customsStorageLocation != null) {
                    $("input[name='location']").val(vm.agentContract.customsStorageLocation);
                } else {
                    $("input[name='location']").val(vm.agentContract.merchantStorageLocation);
                }

                if (vm.agentContract.dataSource == 1) {
                    vm.disenbled = true;
                    vm.disenbled2 = true;
                } else {
                    vm.disenbled = false;
                    if (vm.title == '修改') {
                        vm.disenbled2 = true;
                    } else {
                        // vm.disenbled2 = false;
                        vm.disenbled2 = true;
                    }
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.showSaveOrUpdate = false;
            vm.showDetail = false;
            vm.title = "";
            vm.disenbled = false;
            vm.disenbled2 = false;
            //刷新 如需条件查询common.js
            $("#location").val();
            $(".selectPayMethod").val('').trigger("change");
            $("#table").BTF5(vm.params);
            $("form").RF();
        },

        // 模拟表单提交同步方式下载文件
        // 能够弹出保存文件对话框
        downloadFileByForm: function () {
            console.log("ajaxDownloadSynchronized");
            var url = "http://localhost:8080/ajaxDownloadServlet.do";
            var fileName = "testAjaxDownload.txt";
            var form = $("<form></form>").attr("action", url).attr("method", "post");
            form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
            form.appendTo('body').submit().remove();
        },
        //附件下载
        downLoad: function () {
            //你看一下现在能下载不     不行 最多就是数据过去 在请求能看到请求的文件   这个只能是get请求啊   下载的话
            let row = getSelectedRows();
            if (null != row) {
                row.forEach(function (item) {
                    if (item.annexs != null) {
                        item.annexs.forEach(function (value, index) {
                            window.download(value.url, value.fileName);
                        })
                    }
                });
            }
        }
    },

    watch: {
        'files': function () {
            console.log(vm.files);
            var user = JSON.parse(localStorage.getItem('user'));
            if (vm.agentContract.fileList == null) {
                vm.agentContract.fileList = vm.files;
            }
            var file = [];
            file = vm.agentContract.fileList;
            vm.files.forEach(function (item, index) {
                item.fileName = item.picName;
                item.url = item.picUrl;
                item.fileType = item.type;
                item.username = user.username;
                item.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                var count = 0;
                for (var i = 0; i < file.length; i++) {
                    var fileObject = vm.agentContract.fileList[i];
                    if (item.picName == fileObject.picName) {
                        count += 1;
                        break;
                    }
                }
                if (count < 1) {
                    vm.agentContract.fileList.push(item);
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
            this.initTab();
        },
    },
});

//支付方式
$(".selectPayMethod").on("select2:select", function () {
    var data = $(this).val();
    vm.agentContract.payMethod = data;
});


$('#signingTime').datetimepicker({
    minView: 'month',
    format: 'yyyy-mm-dd',
}).on('change', function (ev) {
    let value = $("#signingTime").val();
    Vue.set(vm.agentContract, 'signingTime', value);
});
$('#expireDate').datetimepicker({
    minView: 'month',
    format: 'yyyy-mm-dd',
}).on('change', function (ev) {
    let value = $("#expireDate").val();
    Vue.set(vm.agentContract, 'expireDate', value);
})