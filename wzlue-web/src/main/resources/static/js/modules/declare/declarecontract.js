$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });

    $('#dateOfSigning').datetimepicker().on('hide', function (ev) {
        let value = $("#dateOfSigning").val();
        Vue.set(vm.declareContract, 'dateOfSigning', value);
    });
    $('#expireDate').datetimepicker().on('hide', function (ev) {
        let value = $("#expireDate").val();
        Vue.set(vm.declareContract, 'expireDate', value);
    })

});

function opFormatter(value, row, index) {
    if (1 == 1) {
        return ['<a id="btn_edit" class="">' + vm.$t("modify") + '</a>&nbsp;&nbsp;<a id="btn_info" class="">' + vm.$t("Details") + '</a>'].join('');
    } else {
        return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a>'].join('');
    }
}

window.opEvents = {
    'click #btn_edit': function (e, value, row, index) {
        vm.update(row.id);
    },
    'click #btn_info': function (e, value, row, index) {
        vm.detail(row.id);
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        isAddFlag: false,
        showList: true,
        title: null,
        declareContract: {
            file: [],
            unit:'',
        },
        params: {
            name: '',
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
            }/*, orderNumber: {
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
            }*/, contractName: {
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
                        // regexp: /^[0-9]{1,5}([.][0-9]{1,3})?$/,
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '合同金额的整数位最多9位，小数位最多2位'
                    }
                },
            }, customsStorageLocation: {
                message: '甲方企业合同存放位置验证失败',
                validators: {
                    notEmpty: {
                        message: '甲方企业合同存放位置不能为空'
                    },
                    stringLength: {
                        max: 50,
                        message: '长度必须在50之内'
                    }
                },
            }, location: {
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
            }, remarks: {
                message: '备注验证失败',
                validators: {
                    /*notEmpty: {
                        message: '备注不能为空'
                    },*/
                    stringLength:{
                        max: 200,
                        message: '长度必须在200之内'
                    }
                },
            }, dateOfSigning: {
                message: '签订日期验证失败',
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '签订日期不能为空'
                    },
                   /* callback: {
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
            }, /*expireDate: {
                message: '到期日期验证失败',
                trigger: 'change',
                validators: {
                    // notEmpty: {
                    //     message: '到期日期不能为空'
                    // },
                    callback: {
                        message: '到期时间必须大于签订日期',
                        callback: function (value, validator, $field) {
                            let other = validator.getFieldElements('dateOfSigning').val();
                            if (isBlank(value)) {
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
            }*/
        },
        files: [],
        count: 1,
        company: {},
        disenbled: true,
        disenbled2: true,
        contracts: null
    },
    methods: {

        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少

            $("#table").BT({
                url: baseURL + 'declare/declarecontract/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("ContractNumber"), field: 'contractNumber'},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                    // {title: vm.$t("ContractName"), field: 'contractName'},
                    {title: vm.$t("NameOfPartyA"), field: 'customsCopName'},
                    {title: vm.$t("NameOfPartyB"), field: 'merchantCopName'},
                    {title: vm.$t("Remarks"), field: 'remarks',formatter: function (value, row, index) {
                            if (value != null && value.length > 10) {
                                return value.substring(0,10);
                            }else {
                                return value;
                            }
                        }
                    },
                    {title: vm.$t("DateOfSigning"), field: 'dateOfSigning'},
                    {title: vm.$t("ExpirationDate"), field: 'expireDate'},
                    {title: vm.$t("ContractAmount"), field: 'contractAmount'},
                    {title: vm.$t("unit"), field: 'unit', formatter: function (value, row, index) {
                            if (row.declareOrder.unit == '0') {
                                return '元';
                            } else if (row.declareOrder.unit == '1') {
                                return '美元';
                            }
                        }
                    },
                    {title: vm.$t("chaozuo"), events: opEvents, formatter: opFormatter},
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
            vm.declareContract = { file: []};
        },
        update: function (rowId) {
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(rowId)
        },
        detail: function (rowId) {
            if (rowId == null) {
                return false;
            }
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
        preview: function (event) {
            var type = vm.declareContract.fileList[event].picName.substr(vm.declareContract.fileList[event].picName.lastIndexOf("."));
            if (type == '.doc' || type == '.docx' || type == '.xls' || type == '.xlsx') {
                window.open("https://view.officeapps.live.com/op/view.aspx?src=" + vm.declareContract.fileList[event].picUrl + "")
            } else {
                window.open(vm.declareContract.fileList[event].picUrl)
            }
            //
        },
        //下载
        downloadFile: function (event) {
            window.download(vm.declareContract.fileList[event].picUrl, vm.declareContract.fileList[event].picName);
        },
        removeFile: function (index) {
            console.log(vm.declareContract.fileList);
            console.log(vm.declareContract.file);
            console.log(vm.files);

            vm.declareContract.fileList.splice(index, 1);
            vm.declareContract.file = vm.declareContract.fileList;
            vm.files = vm.declareContract.fileList;
        },
        saveOrUpdate: function (event) {
            //检验合同编号是否已经存在
            $.ajaxSettings.async = false;
            $.get(baseURL + "declare/declarecontract/check" ,
                {contractNumber:vm.declareContract.contractNumber, contractId:vm.declareContract.id} , function (r) {
                    vm.contracts = r.contracts;
                });
            $.ajaxSettings.async = true;
            if (vm.contracts != null && vm.contracts.length > 0) {
                alert("该合同编号已经被占用！");
                vm.declareContract.contractNumber = '';
                $("input[name='contractNumber']").val('');
                $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return
            }

            if (vm.declareContract.orderNumber != null && vm.declareContract.orderNumber.length > 50) {
                alert("订单编号要小于50个字符");
                return;
            }

            // var dateString = new Date().toLocaleDateString();
            if (vm.declareContract.id == null && !isBlank(vm.declareContract.expireDate)) { //新增
                var currentDate = new Date();
                var start = new Date(vm.declareContract.dateOfSigning.replace("-", "/").replace("-", "/"));
                var end = new Date(vm.declareContract.expireDate.replace("-", "/").replace("-", "/"));
                if (end < currentDate || end == currentDate) {
                    alert("合同到期日期须大于当前日期");
                    return
                }
                if (end < start || end == start) {
                    alert("合同到期日期须大于签订日期");
                    return
                }
            }

           /* if (vm.declareContract.remarks != null && vm.declareContract.remarks.length > 100) {
                alert("备注要小于100个字符");
                return;
            }*/
            if (vm.files.length == 0 && (vm.declareContract.fileList == null || vm.declareContract.fileList == 0)) {
                alert("请上传合同附件");
                return;
            }
            if (vm.declareContract.file == null) {
                vm.declareContract.file = [];
            }
            if (vm.files.length > 0 || vm.declareContract.fileList.length > 0) {
                /* vm.files.forEach(function (item, index) {
                     let fileList = {};
                     fileList.fileName = item.picName;
                     fileList.url = item.picUrl;
                     fileList.fileType = item.type;
                     fileList.contractType = 2;
                     vm.declareContract.file.push(fileList);
                 })*/
            } else {
                alert("请上传合同附件");
                return false;
            }
            console.log("上传的文件")
            console.log(vm.declareContract.file);
            vm.declareContract.file = vm.declareContract.fileList;
            var url = vm.declareContract.id == null ? "declare/declarecontract/save" : "declare/declarecontract/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.declareContract),
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
                    url: baseURL + "declare/declarecontract/delete",
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
            $.get(baseURL + "declare/declarecontract/info/" + id, function (r) {
                vm.declareContract = r.declareContract;
                vm.declareContract.unit = r.declareContract.declareOrder.unit;
                vm.isAddFlag = true;

                //附件
                if (vm.declareContract.file != null && vm.declareContract.file.length > 0) {
                    vm.declareContract.file.forEach(function (item, index) {
                        item.name = item.fileName;
                        item.picName = item.fileName;
                        item.picUrl = item.url;

                    });
                }
                vm.declareContract.fileList = vm.declareContract.file;

                /* if(vm.agentContract.dataSource ==1){
                     vm.disenbled = true;
                     vm.disenbled2 = true;
                 }else{
                     vm.disenbled = false;
                     if (vm.title == '修改'){
                         vm.disenbled2 = true;
                     } else{
                         vm.disenbled2 = false;
                     }
                 }*/

            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.isAddFlag = false,
                vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        //下载合同文件
        downLoad: function () {
            var row = getSelectedRows();
            if (row == null || row.length == 0) {
                return;
            }
            row.forEach(function (item) {
                if (null != item.file && item.file.length > 0) {
                    item.file.forEach(function (item2) {
                        window.download(item2.url, item2.fileName);
                    })
                } else {
                    alert("该合同没有附件");
                }
            })
        },


    },

    watch: {
        'files': function () {
            console.log(vm.files);
            var user = JSON.parse(localStorage.getItem('user'));
            if (vm.declareContract.fileList == null) {
                vm.declareContract.fileList = vm.files;
            }
            var file = [];
            file = vm.declareContract.fileList;
            vm.files.forEach(function (item, index) {
                item.fileName = item.picName;
                item.url = item.picUrl;
                item.fileType = item.type;
                item.username = user.username;
                item.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                var count = 0;
                for (var i = 0; i < file.length; i++) {
                    var fileObject = vm.declareContract.fileList[i];
                    if (item.picName == fileObject.fileName) {
                        count += 1;
                        break;
                    }
                }
                if (count < 1) {
                    vm.declareContract.fileList.push(item);
                }

            })
            console.log(vm.declareContract.fileList);
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
    }
});

