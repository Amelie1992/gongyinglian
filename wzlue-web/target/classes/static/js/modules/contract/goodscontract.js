$(function () {

    vm.initTable();

    vm.initDateTime();
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
});

var vm = new Vue({
        el: '#rrapp',
        i18n,
        data: {
            hasPermission: window.hasPermission,
            showList: true,
            showSure:true,
            automaticShow:true,
            title: null,
            goodsContract: {
                file:[],
                currency:'',
            },
            params: {
                name: '',
                contractNumber:'',
                contractName:''
            },
            files: [],
            count:1,
            contracts: null, //检验合同编号是否已经存在
//验证字段
            fields: {
                contractNumber: {
                    message: '合同编号验证失败',
                    validators: {
                        notEmpty: {
                            message: '合同编号不能为空'
                        },
                        stringLength:{
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
                        },stringLength:{
                            max: 50,
                            message: '长度必须在50之内'
                        }
                    },
                }, partyAName: {
                    message: '甲方名称验证失败',
                    validators: {
                        notEmpty: {
                            message: '甲方名称不能为空'
                        },
                        stringLength:{
                            max: 50,
                            message: '长度必须在50之内'
                        }
                    },
                }, partyBName: {
                    message: '乙方名称验证失败',
                    validators: {
                        notEmpty: {
                            message: '乙方名称不能为空'
                        },
                        stringLength:{
                            max: 50,
                            message: '长度必须在50之内'
                        }
                    },
                }, paymentMethod: {
                    message: '付款方式验证失败',
                    validators: {
                        notEmpty: {
                            message: '付款方式不能为空'
                        },
                        stringLength:{
                            max: 50,
                            message: '长度必须在50之内'
                        }
                    },
                }, contractAmount: {
                    message: '合同金额验证失败',
                    validators: {
                        notEmpty: {
                            message: '合同金额不能为空'
                        },
                        regexp:{
                            // regexp: /^[0-9]{1,9}([.][0-9]{1,2})?$/,
                            regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                            message: '合同金额的整数最多9位，小数最多2位'
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
                }, dateOfSigning: {
                    message: '签订日期验证失败',
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: '签订日期不能为空'
                        },
                        //时间验证
                        /*callback:{
                            message:'签订日期必须小于到期时间',
                            callback: function (value, validator, $field) {
                                let other = validator.getFieldElements('expireDate').val();
                                if(other !=''){
                                    let end = new Date(other.replace("-","/").replace("-","/"));
                                    let start = new Date(value.replace("-","/").replace("-","/"));

                                    if (end>start) {
                                        return true;
                                    }
                                    return false;
                                }
                                return true;
                            }
                        }*/
                    },
                }, /*expireDate: {

                    message: '到期日期验证失败',
                    trigger:'change',
                    validators: {
                        notEmpty: {
                            message: '到期日期不能为空'
                        },
                        //时间验证
                        callback:{
                            message:'到期时间必须大于签订日期',
                            callback: function (value, validator, $field) {
                                let other = validator.getFieldElements('dateOfSigning').val();
                                let start = new Date(other.replace("-","/").replace("-","/"));
                                let end = new Date(value.replace("-","/").replace("-","/"));

                                if (end>start) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    },dateOfSigning
                }, */remarks: {
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
                }, modityBy: {
                    message: '修改人验证失败',
                    validators: {
                        notEmpty: {
                            message: '修改人不能为空'
                        },
                    },
                }, modityTime: {
                    message: '修改时间验证失败',
                    validators: {
                        notEmpty: {
                            message: '修改时间不能为空'
                        },
                    },
                }
            },
        },
        methods: {

            initTable: function () {

                //列表
                $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
                $("#table").BT({
                    url: baseURL + 'contract/goodscontract/list',
                    columns: [
                        {checkbox: true},
                        {title: vm.$t("ContractNumber"), field: 'contractNumber'},
                        {title: vm.$t("OrderNumber"), field: 'orderNumber'},
                        // {title: vm.$t("ContractName"), field: 'contractName',width: '10%'},
                        {title: vm.$t("ContractAmount"), field: 'contractAmount'},
                        {title: vm.$t("unit"), field: 'currency', formatter: function (value, row, index) {
                                if (row.goodsOrder.currency == '1') {
                                    return '元';
                                } else if (row.goodsOrder.currency == '2') {
                                    return '美元';
                                }
                            }
                        },
                        {title: vm.$t("NameOfPartyA"), field: 'partyAName'},
                        {title: vm.$t("NameOfPartyB"), field: 'partyBName'},
                        {title: vm.$t("DateOfSigning"), field: 'dateOfSigning'},
                        {title: vm.$t("ExpirationDate"), field: 'expireDate'},
                        /*{title: vm.$t("StoragePosition"), field: 'storageLocation',width: '10%'},*/
                        {
                            title: vm.$t("chaozuo"), field: 'id',
                            formatter: function (value) {
                                return "<a href='javascript:void(0)' class='getInfo'>查看详情</a>"
                            }, events: {
                                "click .getInfo": function (events, value) {
                                    vm.showSure = false;
                                    vm.title="详情";
                                    vm.getInfo(value)
                                }
                            }
                        },
                    ],
                    //条件查询
                    queryParams: vm.params
                });
                //文件列表
                $("#contractFileList").bootstrapTable("destroy");
                $("#contractFileList").BT({
                    columns: [
                        {title: vm.$t("appendicesOfAContract"), field: 'picName',width: '10%'},
                        {title: vm.$t("picUrl"), field: 'picUrl',width: '10%'},
                        {title: vm.$t("CreationTime"), field: 'createDate',width: '10%'}
                    ],
                });

            },
            initDateTime: function () {
                var d, s;
                d = new Date();
                s = d.getFullYear() + "-";             //取年份
                s = s + (d.getMonth() + 1) + "-";//取月份
                s += d.getDate() + " ";         //取日期
                s += d.getHours() + ":";       //取小时
                s += d.getMinutes() + ":";    //取分
                s += d.getSeconds();         //取秒
                var language;
                if (vm.$i18n.locale == 'en') {
                    language = 'en'
                } else {
                    language = 'zh-CN'
                }
                $("#dateOfSigning").datetimepicker({
                    //startDate: s,
                    minView:'month',
                    format: 'yyyy-mm-dd',
                    language: language,
                }).on('hide', function (ev) {
                    var value = $("#dateOfSigning").val();
                    vm.goodsContract.dateOfSigning = value;
                });
                $("#expireDate").datetimepicker({
                    //startDate: s,
                    minView:'month',
                    format: 'yyyy-mm-dd',
                    language: language,
                }).on('hide', function (ev) {
                    var value = $("#expireDate").val();
                    vm.goodsContract.expireDate = value;
                });
            },
            query: function () {
                vm.reload();
            },
            add: function () {
                vm.showList = false;
                vm.showSure = true;
                vm.automaticShow = false;
                vm.title = "新增";
                vm.goodsContract = {file:[]};
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
            //预览
            preview:function(event) {
                var type = vm.goodsContract.fileList[event].picName.substr(vm.goodsContract.fileList[event].picName.lastIndexOf("."));
                if(type == '.doc' || type == '.docx' || type=='.xls' || type == '.xlsx'){
                    window.open("https://view.officeapps.live.com/op/view.aspx?src="+vm.goodsContract.fileList[event].picUrl+"")
                }else{
                    window.open(vm.goodsContract.fileList[event].picUrl)
                }
               //
            },
            //下载
            downloadFile:function(event){
                window.download(vm.goodsContract.fileList[event].picUrl, vm.goodsContract.fileList[event].picName);
            },
            removeFile:function(event){
                console.log(vm.goodsContract.fileList);
                var removeFile = [];
                removeFile.push(vm.goodsContract.fileList[event]);
                removeFile.forEach(function (item) {
                    vm.goodsContract.fileList.splice(vm.goodsContract.fileList.indexOf(item), 1);
                })
                console.log(event);
            },

            saveOrUpdate: function (event) {
                layer.load();
                //检验合同编号是否已经存在
                $.ajaxSettings.async = false;
                    $.get(baseURL + "contract/goodscontract/check" ,
                        {contractNumber:vm.goodsContract.contractNumber, contractId:vm.goodsContract.id} , function (r) {
                        vm.contracts = r.contracts;
                    });
                $.ajaxSettings.async = true;
                if (vm.contracts != null && vm.contracts.length > 0) {
                    alert("该合同编号已经被占用！");
                    vm.goodsContract.contractNumber = '';
                    $("input[name='contractNumber']").val('');
                    $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                    layer.closeAll();
                    return
                }

                if (vm.goodsContract.id == null && !isBlank(vm.goodsContract.expireDate)) { //新增
                    var currentDate = new Date();
                    var start = new Date(vm.goodsContract.dateOfSigning.replace("-", "/").replace("-", "/"));
                    var end = new Date(vm.goodsContract.expireDate.replace("-", "/").replace("-", "/"));
                    if (end < currentDate || end == currentDate) {
                        alert("合同到期日期须大于当前日期");
                        layer.closeAll();
                        return
                    }
                    if (end < start || end == start) {
                        alert("合同到期日期须大于签订日期");
                        layer.closeAll();
                        return
                    }
                }

                var url = vm.goodsContract.id == null ? "contract/goodscontract/save" : "contract/goodscontract/update";
                // /vm.goodsContract.file = vm.files;
                if(vm.goodsContract.file == null){
                    vm.goodsContract.file = [];
                }
                if (vm.files.length == 0 && (vm.goodsContract.fileList == null || vm.goodsContract.fileList == 0)) {
                    alert("请上传附件");
                    layer.closeAll();
                    return;
                }
                if (vm.files.length>0 || vm.goodsContract.fileList.length>0) {
                    /*vm.files.forEach(function (item, index) {
                        vm.goodsContract.file.push(item);
                    })*/
                }else{
                    alert("请上传合同附件");
                    layer.closeAll();
                    return false;
                }
                vm.goodsContract.file = vm.goodsContract.fileList;

                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.goodsContract),
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
                        url: baseURL + "contract/goodscontract/delete",
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
                vm.files = [];
                $.get(baseURL + "contract/goodscontract/info/" + id, function (r) {
                    vm.showList = false;
                    vm.goodsContract = r.goodsContract;
                    vm.goodsContract.currency = r.goodsContract.goodsOrder.currency;
                    console.log(vm.goodsContract.file);
                    vm.goodsContract.fileList = vm.goodsContract.file;
                    $("#paymentMethod").val(vm.goodsContract.paymentMethod);
                  /*  vm.automaticShow = false;
                    if(r.goodsContract.automatic == 1){*/
                        vm.automaticShow = true;
                  /*  }*/
                });
            },
            reload: function (event) {
                vm.showList = true;
                vm.title = "";
                //刷新 如需条件查询common.js
                $("#table").BTF5(vm.params);
                $("form").RF();
            },
            returnReload:function(){
              location.reload()
            },
            upload: function () {
                var row = getSelectedRows();
                row.forEach(function (item) {
                    if (item.file != null && JSON.stringify(item.file) != "{}" && item.file.length > 0) {
                        for(var i = 0; i < item.file.length; i++){
                            window.download(item.file[i].picUrl, item.file[i].picName);
                        }
                    }else{
                        alert("附件不存在");
                    }
                    /*$eleForm.attr("action", item.file.picUrl);
                    $(document.body).append($eleForm);
                    //提交表单，实现下载
                    $eleForm.submit();
                    $eleForm.remove()*/
                })
            },
        },

    watch: {
            'files':function(){
                var user = JSON.parse(localStorage.getItem('user'));
                if(vm.goodsContract.fileList == null){
                    vm.goodsContract.fileList = vm.files;
                }
                var file = [];
                file = vm.goodsContract.fileList;
                vm.files.forEach(function (item, index) {
                    item.fileName = item.picName;
                    item.url = item.picUrl;
                    item.fileType = item.type;
                    item.username = user.username;
                    item.createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
                    var count = 0;
                    for(var i = 0; i < file.length; i++){
                        var fileObject = vm.goodsContract.fileList[i];
                        if(item.picName == fileObject.picName){
                            count += 1;
                            break;
                        }
                    }
                    if(count < 1){
                        vm.goodsContract.fileList.push(item);
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