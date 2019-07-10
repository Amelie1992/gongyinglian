$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
    });

    vm.initTime();
    $('#dateOfSigning').datetimepicker().on('hide', function (ev) {
        let value = $("#dateOfSigning").val();
        Vue.set(vm.logisticsContract,'dateOfSigning',value);
    });
    $('#expireDate').datetimepicker().on('hide',function (ev) {
        let value = $("#expireDate").val();
        Vue.set(vm.logisticsContract,'expireDate',value);
    });
    $("input[name='dateOfSigning']").DATE({format: 'yyyy-mm-dd hh:ii:ss', minView: '2'});
    $("input[name='dateOfSigning']").on('changeDate', function (ev) {
        vm.logisticsContract.dateOfSigning = this.value; // 签订日期
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('expireDate');
        })
    });
    $("input[name='expireDate']").DATE({format: 'yyyy-mm-dd hh:ii:ss', minView: '2'});
    $("input[name='expireDate']").on('changeDate', function (ev) {
        vm.logisticsContract.expireDate = this.value; // 截止日期
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('dateOfSigning');
        })
    });
});

function operFormatter(value, row, index) {

    if (1==1) {
        return ['<a id="btn_edit" class="">'+vm.$t("modify")+'</a>&nbsp;&nbsp;<a id="btn_info" class="">'+vm.$t("Details")+'</a>'].join('');
    } else{
        return ['<a id="btn_info" class="">'+vm.$t("Details")+'</a>'].join('');
    }
}

window.operateEvents = {
    'click #btn_edit':function (event,value,row,index) {
        vm.title = "修改";
        vm.showList=false;
        vm.getInfo(row.id);
    },
    'click #btn_info':function (event, value, row, index) {
        vm.title = "详情";
        vm.showList=false;
        vm.detail(row.id);
    }

};
function payMethodFmt(value, row, index) {
    if(row.paymentMethod==null || row.paymentMethod == undefined){
        return '暂未选择';
    }else if (row.paymentMethod ==1){
        return '一次性全款';
    } else if(row.paymentMethod ==2){
        return '分期付款';
    } else{
        return '其他';
    }
}

//判断合同编号是否重复
function checkCode(value) {
    if (value == '' || value == null) {
        return;
    }
    $.ajax({
        url: baseURL + "logistics/logisticscontract/checkCode",
        data: JSON.stringify({contractNumber: value, dataSource: 2}),
        type: "POST",
        contentType: "application/JSON",
        success: function (r) {
            if (r.code == 0) {
                if (r.contractNumber != null) {
                    alert("合同编号已存在!");
                    vm.logisticsContract.contractNumber = '';
                    $("input[name='contractNumber']").val('');
                    $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                }
            } else {
                alert(r.msg);
            }
        }
    })
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        logisticsContract: {
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
                    stringLength:{
                        max: 30,
                        message: '长度必须在30之内'
                    },
                    regexp: {
                        regexp: /^[^\u4e00-\u9fa5]{0,}$/,
                        message: '请勿输入中文'
                    }
                },
            }, orderNumber: {
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
            }, contractName: {
                message: '合同名称验证失败',
                validators: {
                    notEmpty: {
                        message: '合同名称不能为空'
                    },
                    stringLength:{
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
            },  partyBName: {
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
            },  paymentMethod: {
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
                    regexp:{
                        // regexp: /^[0-9]{1,5}([.][0-9]{1,3})?$/,
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
                validators: {
                    notEmpty: {
                        message: '签订日期不能为空'
                    },
                },
            },remarks: {
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
            },
            // expireDate: {
            //     message: '到期日期验证失败',
            //     trigger: 'change',
            //     validators: {
            //         //时间验证
            //         callback:{
            //             message:'到期时间必须大于签订日期',
            //             callback: function (value, validator, $field) {
            //                 let other = validator.getFieldElements('dateOfSigning').val();
            //                 let start = new Date(other.replace("-","/").replace("-","/"));
            //                 let end = new Date(value.replace("-","/").replace("-","/"));
            //
            //                 if (end>start) {
            //                     return true;
            //                 }
            //                 return false;
            //             }
            //         }
            //     },
            // },
            owner: {
                message: '0：卖方1：买方验证失败',
                validators: {
                    notEmpty: {
                        message: '0：卖方1：买方不能为空'
                    },
                },
            }
        },
        files: [],
        count:1,
        contracts: null
    },
    methods: {
        initTable: function(){
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'logistics/logisticscontract/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("ContractNumber"), field: 'contractNumber', align: 'center'},
                    {title: vm.$t("OrderNumber"), field: 'orderNumber', align: 'center'},
                    // {title: vm.$t("ContractName"), field: 'contractName', align: 'center'},
                    {title: vm.$t("NameOfPartyA"), field: 'partyAName', align: 'center'},
                    {title: vm.$t("NameOfPartyB"), field: 'partyBName', align: 'center'},
                    {title: vm.$t("ContractAmount"), field: 'contractAmount', align: 'center'},
                    // {title: vm.$t("PaymentMethod"), field: 'paymentMethod', align: 'center',formatter: payMethodFmt},
                    {title: vm.$t("unit"), field: 'unit', align: 'center',
                        formatter: function (value, row, index) {
                            if (row.logisticsOrder.unit == '0') {
                                return '元';
                            } else if (row.logisticsOrder.unit == '1') {
                                return '美元';
                            }
                        }
                    },
                    {title: vm.$t("DateOfSigning"), field: 'dateOfSigning', align: 'center'},
                    {title: vm.$t("ExpirationDate"), field: 'expireDate', align: 'center'},
                    { title: vm.$t("chaozuo"), events: operateEvents ,formatter: operFormatter, align: 'center' }
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
            $('#partyAName').removeAttr("disabled");
            $('#partyBName').removeAttr("disabled");
            $('#paymentMethod').removeAttr("disabled");
            $('#contractAmount').removeAttr("disabled");
            $('#dateOfSigning').removeAttr("disabled");
            $('#expireDate').removeAttr("disabled");
            vm.showList = false;
            vm.title = "新增";
            vm.logisticsContract = {file:[]};
        },
        update: function (rowId) {
            if(rowId == null){
                return ;
            }
            $('#contractNumber').attr("disabled","disabled");
            $('#orderNumber').attr("disabled","disabled");
            $('#partyAName').attr("disabled","disabled");
            $('#partyBName').attr("disabled","disabled");
            $('#paymentMethod').attr("disabled","disabled");
            $('#contractAmount').attr("disabled","disabled");
            $('#dateOfSigning').attr("disabled","disabled");
            $('#expireDate').attr("disabled","disabled");
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(rowId)
        },
        detail: function (rowId){
            if(rowId == null){
                return ;
            }
            $('#contractNumber').attr("disabled","disabled");
            $('#orderNumber').attr("disabled","disabled");
            $('#partyAName').attr("disabled","disabled");
            $('#partyBName').attr("disabled","disabled");
            $('#paymentMethod').attr("disabled","disabled");
            $('#contractAmount').attr("disabled","disabled");
            $('#dateOfSigning').attr("disabled","disabled");
            $('#expireDate').attr("disabled","disabled");
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
            var type = vm.logisticsContract.fileList[event].picName.substr(vm.logisticsContract.fileList[event].picName.lastIndexOf("."));
            if(type == '.doc' || type == '.docx' || type=='.xls' || type == '.xlsx'){
                window.open("https://view.officeapps.live.com/op/view.aspx?src="+vm.logisticsContract.fileList[event].picUrl+"")
            }else{
                window.open(vm.logisticsContract.fileList[event].picUrl)
            }
            //
        },
        //下载
        downloadFile:function(event){
            window.download(vm.logisticsContract.fileList[event].picUrl, vm.logisticsContract.fileList[event].picName);
        },
        removeFile:function(event){
            console.log(vm.logisticsContract.fileList);
            var removeFile = [];
            removeFile.push(vm.logisticsContract.fileList[event]);
            removeFile.forEach(function (item) {
                vm.logisticsContract.fileList.splice(vm.logisticsContract.fileList.indexOf(item), 1);
            })
            console.log(event);
        },
        saveOrUpdate: function (event) {
            //检验合同编号是否已经存在
            $.ajaxSettings.async = false;
            $.get(baseURL + "logistics/logisticscontract/check" ,
                {contractNumber:vm.logisticsContract.contractNumber, contractId:vm.logisticsContract.id} , function (r) {
                    vm.contracts = r.count;
                });
            $.ajaxSettings.async = true;
            if (vm.contracts != null && vm.contracts > 0) {
                alert("该合同编号已经被占用！");
                vm.logisticsContract.contractNumber = '';
                $("input[name='contractNumber']").val('');
                $("form").data("bootstrapValidator").updateStatus('contractNumber', 'NOT_VALIDATED').validateField('contractNumber');
                return
            }

            if (vm.logisticsContract.id == null && !isBlank(vm.logisticsContract.expireDate)) { //新增
                var currentDate = new Date();
                var start = new Date(vm.logisticsContract.dateOfSigning.replace("-", "/").replace("-", "/"));
                var end = new Date(vm.logisticsContract.expireDate.replace("-", "/").replace("-", "/"));
                if (end < currentDate || end == currentDate) {
                    alert("合同到期日期须大于当前日期");
                    return
                }
                if (end < start || end == start) {
                    alert("合同到期日期须大于签订日期");
                    return
                }
            }

            vm.logisticsContract.fileList == undefined ? vm.logisticsContract.fileList = [] : vm.logisticsContract.fileList;
            if (vm.files.length > 0 || vm.logisticsContract.fileList.length > 0){
               /* var contracts = [];
                vm.files.forEach(function (item,index) {
                    var fileList = {};
                    fileList.fileName = item.name;
                    fileList.url = item.picUrl;
                    fileList.fileType = item.type;
                    fileList.contractType = 4;
                    contracts.push(fileList);
                    vm.logisticsContract.file = contracts;
                });*/
            } else{
                alert("请上传合同附件");
                return false;
            }
            vm.logisticsContract.file = vm.logisticsContract.fileList;
            var url = vm.logisticsContract.id == null ? "logistics/logisticscontract/save" : "logistics/logisticscontract/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.logisticsContract),
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
                    url: baseURL + "logistics/logisticscontract/delete",
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
            $.get(baseURL + "logistics/logisticscontract/info/" + id, function (r) {
                vm.logisticsContract = r.logisticsContract;
                vm.logisticsContract.unit = r.logisticsContract.logisticsOrder.unit;
                //支付方式
                if (vm.logisticsContract.payMethod!=null){
                    $(".selectPayMethod").val(vm.logisticsContract.payMethod).trigger("change");
                }
                //附件
                if (vm.logisticsContract.file.length>0 && (vm.logisticsContract.file != null && JSON.stringify(vm.logisticsContract.file) != "[]")){
                    vm.logisticsContract.file.forEach(function (item,index) {
                        item.contractType = 4;
                        item.picName=item.fileName;
                        item.picUrl=item.url;
                    });
                    vm.logisticsContract.fileList = vm.logisticsContract.file;
                    console.log('vm.logisticsContract.fileList',vm.logisticsContract.fileList)
                }
                 //存放位置
                // if(vm.logisticsContract !=null){
                //     $("input[name='location']").val(vm.logisticsContract.customsStorageLocation);
                // }else{
                //     $("input[name='location']").val(vm.logisticsContract.merchantStorageLocation);
                // }
                $('#contractNumber').attr("disabled","disabled");
                $('#orderNumber').attr("disabled","disabled");
                $('#partyAName').attr("disabled","disabled");
                $('#partyBName').attr("disabled","disabled");
                $('#paymentMethod').attr("disabled","disabled");
                $('#contractAmount').attr("disabled","disabled");
                $('#dateOfSigning').attr("disabled","disabled");
                $('#expireDate').attr("disabled","disabled");
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        // downloadFileByForm: function () {
        //     console.log("ajaxDownloadSynchronized");
        //     var url = "http://localhost:8080/ajaxDownloadServlet.do";
        //     var fileName = "testAjaxDownload.txt";
        //     var form = $("<form></form>").attr("action", url).attr("method", "post");
        //     form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
        //     form.appendTo('body').submit().remove();
        // },
        //下载附件
        upload: function () {
            var row = getSelectedRows();
            if(null != row){
                row.forEach(function (item) {
                    if (item.file != null && item.file.length >0) {
                        item.file.forEach(function (value, index) {
                            window.download(value.url, value.fileName);
                        })
                    }else {
                        alert("附件不存在");
                    }
                })
            }
        },
        download: function download(data) {
            var a = document.createElement("a"), //创建a标签
                e = document.createEvent("MouseEvents"); //创建鼠标事件对象
            e.initEvent("click", false, false); //初始化事件对象
            a.href = data.picUrl; //设置下载地址
            a.download = data.picName; //设置下载文件名
            a.dispatchEvent(e); //给指定的元素，执行事件click事件
        },
        initTime: function () {
            $('#dateOfSigning').datetimepicker('remove');
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
            $("#dateOfSigning").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 'month',
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,
                format: 'yyyy-mm-dd',

            }).on('hide', function (ev) {
                var value = $("#dateOfSigning").val();
                vm.logisticsContract.dateOfSigning = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('dateOfSigning', 'NOT_VALIDATED', null)
                    .validateField('dateOfSigning');
            });
            $("#expireDate").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 'month',
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,
                format: 'yyyy-mm-dd',

            }).on('hide', function (ev) {
                var value = $("#expireDate").val();
                vm.logisticsContract.expireDate = value;
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
            if(vm.logisticsContract.fileList == null){
                vm.logisticsContract.fileList = vm.files;
            }
            var file = [];
            file = vm.logisticsContract.fileList;
            vm.files.forEach(function (item, index) {
                item.fileName = item.picName;
                item.url = item.picUrl;
                item.fileType = item.type;
                item.username = user.username;
                item.createTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                var count = 0;
                for(var i = 0; i < file.length; i++){
                    var fileObject = vm.logisticsContract.fileList[i];
                    if(item.picName == fileObject.picName){
                        count += 1;
                        break;
                    }
                }
                if(count < 1){
                    vm.logisticsContract.fileList.push(item);
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