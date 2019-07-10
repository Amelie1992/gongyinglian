$(function () {
    //列表
    // init();
    vm.initTable();
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })
    $('input[type=radio][name=auto]').change(function () {
        $(".form-horizontal").RF();
        if (this.value == '0') {
            $('#commodityCode').attr("disabled", true);
            vm.declareOffer.commodityCode = '';
        }
        else if (this.value == '1') {
            $('#commodityCode').attr("disabled", false);
        }
    });
});
// $(document).ready(function() {
//
// });
function opFormatter(value, row, index) {
    var op = '';
    op += '<a id="btn_detail">查看详情</a>';
    return op;
}


window.opEvent = {
    'click #btn_detail': function (event, value, row, index) {
        vm.showList = false;
        vm.showSure = false;
        vm.getInfo(row.id);
    }
}
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        isAdd: false,//确认按钮禁用
        showSure: true,//确认按钮影藏
        showList: true,
        title: null,
        declareOffer: {
            customsList: [],
        },
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
        params: {
            declareType: '',
            groundingState: ''

        },
//验证字段
        fields: {
            title: {
                message: '标题验证失败',
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    },
                    stringLength: {
                        max: 20,
                        message: '标题长度限制最大长度20个字符'
                    },
                },
            }, businessInfo: {
                message: '业务详情验证失败',
                validators: {
                    callback: function (value, v) {
                        if (vm.ue.getContent() == null || vm.ue.getContent() == "") {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
            },businessInfo: {
                message: '业务详情验证失败',
                validators: {
                    notEmpty: {
                        message: '业务详情不能为空'
                    },
                },
            }, contacts: {
                message: '联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    }, stringLength: {max: 30, message: '联系人长度小于30'}
                },
            }, contactWay: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '联系方式不能为空'
                    },
                    regexp: {
                        regexp: /^1[3456789]\d{9}$/,
                        message: '请正确输入手机号码'
                    }
                },
            }, commodityName: {
                message: '商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    },
                    stringLength: {
                        max: 20,
                        message: '商品名称不可超过20个字符',
                    },
                },
            }, commodityCode: {
                message: '商品编码验证失败',
                validators: {
                    notEmpty: {
                        message: '商品编码不能为空'
                    },
                    regexp: {
                        regexp: /^[^\u4e00-\u9fa5]+$/,
                        message: '商品编码不予许出现中文'
                    }
                },
            }, declareType: {
                message: '报关分类 1：进口报关 2：出口报关验证失败',
                validators: {
                    notEmpty: {
                        message: '报关分类不能为空'
                    },

                },

            }, chargeRules: {
                message: '收费规则验证失败',
                validators: {
                    notEmpty: {
                        message: '收费规则不能为空'
                    },
                    regexp: {
                        /*|(^0$)*/
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
                        message: '收费规则为整数最多9位，小数最多2位的正数'
                    }
                //    regexp: /^[0-9]{1,5}([.][0-9]{1,5})?$/,
                //    message: '请输入数字加小数点共11位'
                },
            }, unit: {
                message: '单位验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择单位'
                    },
                },
            }, groundingState: {
                message: '上架状态验证失败',
                validators: {
                    notEmpty: {
                        message: '上架状态不能为空'
                    },
                },
            }, customs: {
                message: '海关验证失败',
                validators: {
                    notEmpty: {
                        message: '海关不能为空'
                    }, stringLength: {max: 30, message: '海关字符不能超过30'}
                }
            }

        },
        declareList: [
            {value: 1, label: '进口报关'},
            {value: 2, label: '出口报关'}
        ],
        stateList: [
            {value: 0, label: '上架'},
            {value: 1, label: '下架'}
        ],
        unitList: [
            {value: 1, label: '条'}
        ],
        options: {
            provincesList: [],//省
            cityList: [],//市
            countryList: [],//县
        },

    },
    methods: {
        initTable: function () {
            $("#table").BT({
                url: baseURL + 'declare/declareoffer/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t('title'), field: 'title'},
                    {title: vm.$t('offerCode'), field: 'commodityCode'},
                    {
                        title: vm.$t('DeclareType'), field: 'declareType', formatter: function (value, row, index) {
                            var name = '';
                            switch (value) {
                                case 1:
                                    name = '进口报关';
                                    break;
                                case 2:
                                    name = '出口报关';
                                    break;
                            }
                            return name;
                        }
                    },
                    {title: vm.$t('ChargeRules'), field: 'chargeRules'},
                    {
                        title: vm.$t('unit'), field: 'unit', formatter: function (value, row, index) {
                            var name = '';
                            switch (value) {
                                case "0":
                                    name = '元/吨';
                                    break;
                                case "1":
                                    name = '元/千克';
                                    break;
                                case "2":
                                    name = '元/柜';
                                    break;
                                case "3":
                                    name = '元/m³';
                                    break;
                                case "4":
                                    name = '美元/m³';
                                    break;
                            }
                            return name;
                        }
                    },
                    {title: vm.$t('contact'), field: 'contacts'},
                    {title: vm.$t('phone'), field: 'contactWay'},
                    {
                        title: vm.$t('currentState'), field: 'groundingState', formatter: function (value, row, index) {
                            var name = '';
                            switch (value) {
                                case 0:
                                    name = '上架';
                                    break;
                                case 1:
                                    name = '下架';
                                    break;
                            }
                            return name;
                        }
                    },
                    // {title: '上架/下架时间', field: 'updateTime'},
                    // {title: '最新成交时间', field: 'transactionTime'},
                    /*{
                        title: vm.$t('NumberTransactions'), field: 'transactionNumber', formatter: function (value) {
                            if (value < 0 || value == null) {
                                return 0;
                            }
                        }
                    },*/
                    {title: vm.$t('chaozuo'), formatter: opFormatter, events: opEvent}
                ],
                //条件查询
                queryParams: vm.params
            });
        },
        rowAdd: function () {
            if (this.declareOffer.customsList.length > 4) {
                alert("海关不得超过5个");
                return;
            }
            var data = {id: null, customsName: null};
            this.declareOffer.customsList.push(data);
            // $(".form-horizontal").bootstrapValidator("addField","customs",{message:'海关验证失败',
            //     validators:{
            //         notEmpty:{
            //             message:'海关不能为空'
            //         }
            //     }})
            // $(".form-horizontal").bootstrapValidator('enableFieldValidators', 'customs', true);
            // $(".form-horizontal").RF();
        },
        rowDel: function (index) {
            if (this.declareOffer.customsList.length == 1) {
                alert("请至少保留一个")
                return false;
            }
            this.declareOffer.customsList.splice(index, 1);
        },
        cityChange: function (index, child, value) {
            $('#city').selectpicker('val', null);
            $('#city').selectpicker('refresh');
            $('#country').selectpicker('val', null);
            $('#country').selectpicker('refresh');
            $(".form-horizontal").RF();
            this.declareOffer.city = [];
            this.declareOffer.country = [];
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            console.log("加载数据")
            this.options.cityList = JSON.parse(str);
        },
        countryChange: function (index, child, value) {
            $('#country').selectpicker('val', null);
            $('#country').selectpicker('refresh');
            $(".form-horizontal").RF();
            this.declareOffer.country = [];
            var val = $("#city").find("option:selected").attr('value')
            var str = JSON.stringify(window.getAreas(val));
            str = str.replace(/areaid/g, "value").replace(/area/g, "label");
            console.log("加载数据")
            this.options.countryList = JSON.parse(str);
        },

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false
            vm.showSure = true
            vm.title = "新增";
            vm.declareOffer = {
                customsList: []
            };
            this.ue.setContent('');
            $("#province").selectpicker('val', null);
            $("#province").selectpicker('refresh');
            $("#city").selectpicker('val', null);
            $("#city").selectpicker('refresh');
            $("#country").selectpicker('val', null);
            $("#country").selectpicker('refresh');
            vm.declareOffer.customsList.push({id: null, customsName: null});
            // $(".form-horizontal").bootstrapValidator("addField","customs",{message:'海关验证失败',
            //     validators:{
            //         notEmpty:{
            //             message:'海关不能为空'
            //         }
            //     }})
            // $(".form-horizontal").bootstrapValidator('enableFieldValidators', 'customs', true);
            // $(".form-horizontal").RF();
            vm.declareOffer.groundingState = 0;
            $("#file4").fileinput('reset');
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false
            vm.showSure = true
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
            /*vm.isAdd = true;//确认按钮禁掉*/
            vm.declareOffer.businessInfo=UE.utils.unhtml(this.ue.getContent());
            let ceiShi = this.ue.getContentTxt();//获取纯文本
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("业务介绍上传的图片数量请少于6张")
                    return
                }
            }


            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选
            if (vm.declareOffer.businessInfo == null || vm.declareOffer.businessInfo.trim() == '') {
                alert("请输入业务介绍");
                return;
            }else if (ceiShi.length > 1000) {
                alert("业务介绍不可超出1000字符");
                return;
            }
            var url = vm.declareOffer.id == null ? "declare/declareoffer/save" : "declare/declareoffer/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.declareOffer),
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
                    url: baseURL + "declare/declareoffer/delete",
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
            $.get(baseURL + "declare/declareoffer/info/" + id, function (r) {
                vm.declareOffer = r.declareOffer;
                $("#province").selectpicker('val', vm.declareOffer.province);
                vm.ue.setContent(UE.utils.html(vm.declareOffer.businessInfo));
                var str = JSON.stringify(window.getCities(vm.declareOffer.province));
                str = str.replace(/cityid/g, "value").replace(/city/g, "label");
                console.log("加载数据")
                vm.options.cityList = JSON.parse(str);
                vm.$nextTick(function () {
                    $("#city").selectpicker('val', vm.declareOffer.city);
                })
                var str = JSON.stringify(window.getAreas(vm.declareOffer.city));
                str = str.replace(/areaid/g, "value").replace(/area/g, "label");
                vm.options.countryList = JSON.parse(str);
                vm.$nextTick(function () {
                    $("#country").selectpicker('val', vm.declareOffer.country);
                })
            });
        },
        reload: function (event) {
            vm.isAdd = false;
            vm.showList = true;
            vm.title = "";
            vm.ue.setContent('');
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        //上架
        offer: function (value) {
            var grid = $("#table").bootstrapTable('getSelections');
            var ids = [];
            $.each(grid, function (idx, item) {
                ids[idx] = item["id".toString()];
            })
            if (ids.length == 0) {
                alert("请选择要上架的报盘");
                return false;
            }
            confirm('确定要上架选中的记录？', function () {
                var url = 'declare/declareoffer/offer';
                if (ids.length > 0) {
                    $.ajax({
                        url: baseURL + url,
                        type: 'POST',
                        contentType: 'application/JSOn',
                        data: JSON.stringify(ids),
                        success: function (r) {
                            if (r.code === 0) {
                                alert("上架成功!", function () {
                                    vm.reload();
                                })
                            } else {
                                alert(r.msg);
                            }
                        }
                    })
                }
            })
        },
        //下架
        disOffer: function () {
            var grid = $("#table").bootstrapTable('getSelections');
            var ids = [];
            $.each(grid, function (idx, item) {
                ids[idx] = item["id".toString()];
            })
            if (ids.length == 0) {
                alert("请选择要下架的报盘");
                return false;
            }
            if (ids.length > 0) {
                confirm('确定要下架选中的记录？', function () {
                    $.ajax({
                        url: baseURL + 'declare/declareoffer/disOffer',
                        type: 'POST',
                        contentType: 'application/JSOn',
                        data: JSON.stringify(ids),
                        success: function (r) {
                            if (r.code === 0) {
                                alert("下架成功!", function () {
                                    vm.reload();
                                })
                            } else {
                                alert(r.msg);
                            }
                        }
                    })
                })
            }
        }

    },
    created: function () {
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        console.log("加载数据")
        this.options.provincesList = JSON.parse(str);
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
        "declareOffer.customsList": function (value) {
            setTimeout(function () {
                $("#form").bootstrapValidator('addField', 'customs', {
                    message: '标题验证失败',
                    validators: {
                        notEmpty: {
                            message: '标题不能为空'
                        },
                        stringLength: {
                            max: 20,
                            message: '标题长度限制最大长度20个字符'
                        },
                    },
                })
            }, 1)
        },
        "declareOffer.commodityCode": function (value) {
            $("#form").bootstrapValidator('addField', 'commodityCode', {
                message: '商品编码验证失败',
                validators: {
                    notEmpty: {
                        message: '商品编码不能为空'
                    },
                    regexp: {
                        regexp: /^[^\u4e00-\u9fa5]+$/,
                        message: '商品编码不予许出现中文'
                    }
                }
            })
        }


    },
});

function checkCode(value) {
    if (value == '' || value == null) {
        return;
    }
    $.ajax({
        url: baseURL + "declare/declareoffer/checkCode",
        data: JSON.stringify({commodityCode: value}),
        type: "POST",
        contentType: "application/JSON",
        success: function (r) {
            if (r.code == 0) {
                if (r.count > 0) {
                    alert("商品编码已存在！");
                    vm.declareOffer.commodityCode = '';
                }
            } else {
                alert(r.msg);
            }
        }
    })
}