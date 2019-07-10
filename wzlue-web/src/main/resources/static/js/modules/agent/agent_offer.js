$(function () {
    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

});

function offerStatusFmt(value, row, index) {
    if (row.offerStatus == 0) {
        return '待上架';
    } else if (row.offerStatus == 1) {
        return '上架';
    } else if (row.offerStatus == 2) {
        return '下架';
    }
}
//计价重量单位
function offerWightFmt(value, row, index) {
    if (row.valuationUnit == 'KG') {
        return '千克';
    } else if (row.valuationUnit == 'T') {
        return '吨';
    } else if (row.valuationUnit == 'CTN') {
        return '柜';
    }
}
//货币代码
function offercurrencyFmt(value, row, index) {
    if (row.currency == 'CNY') {
        return 'CNY/人民币';
    } else if (row.currency == 'USD') {
        return 'USD/美元';
    }
}

function operFormatter(value, row, index) {
    return '<a id="btn_info" class="">' + vm.$t("Details") + '</a>';
    /*if (row.offerStatus == 0) {
        return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a> &nbsp;&nbsp;<a id="btn_edit" class="">' + vm.$t("modify") + '</a>&nbsp;&nbsp;<a id="btn_shelf" class="">' + vm.$t("shelf") + '</a>&nbsp;&nbsp;<a id="btn_del" class="">' + vm.$t("delete") + '</a>'].join('');
    } else if (row.offerStatus == 1) {
        return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a> &nbsp;&nbsp;<a id="btn_edit" class="">' + vm.$t("modify") + '</a> &nbsp;&nbsp;<a id="btn_obt" class="">' + vm.$t("obtained") + '</a>'].join('');
    } else if (row.offerStatus == 2) {
        return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a> &nbsp;&nbsp;<a id="btn_edit" class="">' + vm.$t("modify") + '</a> &nbsp;&nbsp;<a id="btn_shelf" class="">' + vm.$t("shelf") + '</a>&nbsp;&nbsp;<a id="btn_del" class="">' + vm.$t("delete") + '</a>'].join('');
    }*/
}

window.operateEvents = {
    'click #btn_edit': function (e, value, row, index) {
        var rowId = row.id;
        vm.update(rowId);
    },
    'click #btn_del': function (e, value, row, index) {
        var rowId = row.id;
        vm.del(rowId);
    },
    'click #btn_shelf': function (e, value, row, index) {
        var rowId = row.id;
        vm.shelf(rowId);
    },
    'click #btn_obt': function (e, value, row, index) {
        var rowId = row.id;
        vm.obtained(rowId);
    },'click #btn_info': function (e, value, row, index) {
        var rowId = row.id;
        vm.details(rowId);
    }

};

function change2(e, num) {
    if (num == '1') {
        $('#offerCode').attr("disabled", "disabled").attr('ckValue', 1);
        vm.agentOffer.idSourceType = 1;
    } else {
        $('#offerCode').removeAttr("disabled").attr('ckValue', 0);
        vm.agentOffer.idSourceType = 0;
    }
}

var vm = new Vue({
    el: '#offerDiv',
    i18n,
    data: {

        showList: true,
        title: null,
        agentOffer: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            title: {
                message: '标题验证失败',
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    }, stringLength: {min: 1, max: 30, message: '长度小于30'}
                },
            },
            offerCode: {
                message: '报盘编码验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘编码不能为空'
                    }, regexp: {
                        regexp:/^[0-9A-Za-z]+$/,
                        message: '只能输入数字和字母'
                    }
                },
            },
            contactPerson: {
                message: '联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    }, stringLength: {
                        min: 1, max: 30, message: '长度小于30'
                    }
                },
            },
            contactPhone: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '联系方式不能为空'
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '长度错误,请输入11位长度联系电话'
                    },
                    regexp: {
                        regexp: /^1[3456789]\d{9}$/,
                        message: '请正确输入手机号码'
                    },
                },
            },
            valuationUnit: {
                message: '计价重量单位验证失败',
                validators: {
                    notEmpty: {
                        message: '计价重量单位不能为空'
                    },
                },
            },
            price: {
                message: '价格验证失败',
                validators: {
                    notEmpty: {
                        message: '报价不能为空'
                    }, regexp: {
                        //|(^0$)
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
                        message: '报价为整数最多9位，小数最多2位的正数'
                    }
                // regexp: /^[0-9]{1,12}([.][0-9]{1,5})?$/,
                // message: '小数前能保留12位,小数后能保留5位'
                },
            },
            currency: {
                message: '货币代码验证失败',
                validators: {
                    notEmpty: {
                        message: '货币代码不能为空'
                    },
                },
            },
            introduction: {
                message: '业务介绍验证失败',
                validators: {
                    notEmpty: {
                        message: '业务介绍不能为空'
                    },
                },
            },
            offerStatus: {
                message: '报盘状态 0.上架 1.下架验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘状态 0.上架 1.下架不能为空'
                    },
                },
            },
        },
        serviceList: [],
        // currencyList: [],
        business: [],
        categoryList: [],
        category: [],
        unitList: [],
        disenbled: false,
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
    },
    methods: {
        shelfAll: function () {
            var delArr = $('#table').bootstrapTable('getSelections');
            if (JSON.stringify(delArr ) == "[]") {
                alert('请勾选上架的数据！');
                return;
            }
            confirm('确定要上架选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/offer/shelfAll",
                    contentType: "application/json",
                    data: JSON.stringify(delArr),
                    // dataType: "JSON",
                    // data: {id:rowId},
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
        }, obtainedAll: function() {
            var delArr = $('#table').bootstrapTable('getSelections');
            if (JSON.stringify(delArr ) == "[]") {
                alert('请勾选下架的数据！');
                return;
            }
            confirm('确定要下架选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/offer/obtainedAll",
                    contentType: "application/json",
                    data: JSON.stringify(delArr),
                    // dataType: "JSON",
                    // data: {id:rowId},
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
        initTable: function () {
            //列表
            $("#table1").bootstrapTable("destroy");     //**********对于查询必不可少
            //列表
            $("#table").BT({
                url: baseURL + 'agent/offer/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("title"), field: 'title'},
                    {title: vm.$t("offerCode"), field: 'offerCode'},
                    {title: vm.$t("contact"), field: 'contactPerson'},
                    {title: vm.$t("ContactInformation"), field: 'contactPhone'},
                    {title: vm.$t("price"), field: 'price'},
                    {title: vm.$t("CurrencyCode"), field: 'currency', formatter: offercurrencyFmt},
                    {title: vm.$t("hundredweight"), field: 'valuationUnit', formatter: offerWightFmt},
                    // {title: vm.$t("BusinessIntroduction"), field: 'introduction',width: '5%'},
                    {title: vm.$t("StateOfOffer"), field: 'offerStatus', formatter: offerStatusFmt},
                  /*  {title: vm.$t("CreationTime"), field: 'createTime'},*/
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
            vm.title = "新增";
            vm.agentOffer = {};
            vm.agentOffer.idSourceType = 1;
            vm.getServiceType();
            vm.getGoodsType();
            vm.getWeightUnit();

        },
        details:function (rowId) {
            vm.showList = false;
            vm.title = "详情";
            vm.getServiceType();
            vm.getGoodsType();
            vm.getWeightUnit();
            vm.getInfo(rowId)
        },
        update: function (rowId) {
            var rowId = getSelectedRowId("id");
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.getServiceType();
            vm.getGoodsType();
            vm.getWeightUnit();
            vm.getInfo(rowId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.agentOffer.id == null ? "agent/offer/save" : "agent/offer/update";
            let $box = $("input[name='serviceId']:checked");
            if ($box.length > 0) {
                vm.business = [];
                $.each($box, function (index, item) {
                    let $this = $(this);
                    let obj = {};
                    obj.serviceId = item.value;
                    obj.serviceName = $this.attr('text');
                    vm.business.push(obj);
                });
            } else {
                alert("请选择代理项目", function () {
                });
                return false;
            }

            let $cateBox = $("input[name='categoryId']:checked");
            if ($cateBox.length > 0) {
                vm.category = [];
                $.each($cateBox, function (index, item) {
                    let $this = $(this);
                    let obj = {};
                    obj.categoryId = item.value;
                    obj.categoryName = $this.attr('text');
                    vm.category.push(obj);
                })
            } else {
                alert("请选择代理所属分类");
                return false;
            }


            if (vm.agentOffer.idSourceType == 0) {
                if (vm.agentOffer.offerCode != null && vm.agentOffer.offerCode != '') {

                } else {
                    alert("请输入报盘编码");
                    return false;
                }
            }

            // vm.agentOffer.currency = $(".selectCurrencyCode").val();
            // vm.agentOffer.valuationUnit = $(".selectUnitCode").val();

            if (vm.agentOffer.currency == null || vm.agentOffer.currency == '') {
                alert("请选择货币");
                return false;
            }
            if (vm.agentOffer.valuationUnit == null || vm.agentOffer.valuationUnit == '') {
                alert("请选择计重单位");
                return false;
            }
            vm.agentOffer.business = vm.business;

            vm.agentOffer.categorys = vm.category;
            //UE取值
            vm.agentOffer.introduction = UE.utils.unhtml(this.ue.getContent());
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("业务描述上传的图片数量请少于6张")
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选

            if(vm.agentOffer.introduction=="" || vm.agentOffer.introduction==null) {
                alert('请输入业务描述');
                return false;
            }
            if (ceiShi.length >1000) {
                alert("业务描述不可超过1000字符");
                return;
            }
            layer.load();
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.agentOffer),
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
        delSelect: function () { // 勾选删除
            var delArr = $('#table').bootstrapTable('getSelections');
            if (JSON.stringify(delArr ) == "[]") {
                alert('请勾选删除的数据！');
                return;
            }
            confirm('确定要删除选中的记录？', function () {
                delArr.forEach(function (row, idx, arr) {
                    $.ajax({
                        type: "POST",
                        async: "true",
                        url: baseURL + "agent/offer/delete",
                        contentType: "application/json",
                        data: JSON.stringify(row.id),
                        success: function (r) {
                            if (r.code == 0) {
                                if (delArr.length - 1 == idx) {
                                    alert('操作成功', function (index) {
                                        vm.reload();
                                    });
                                }
                            } else {
                                alert(r.msg);
                                return;
                            }
                        }
                    });

                })
            });
        },

        //删除
        del: function (rowId) {
            if (rowId == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/offer/delete",
                    contentType: "application/json",
                    data: JSON.stringify(rowId),
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
            $.get(baseURL + "agent/offer/info/" + id, function (r) {
                vm.agentOffer = r.data;
                //Ue
                vm.ue.setContent(UE.utils.html(vm.agentOffer.introduction));

                if (vm.agentOffer.business.length > 0) {
                    vm.agentOffer.business.forEach(function (obj, index) {
                        let $checkbox = $("input[name='serviceId']");
                        if ($checkbox.length > 0) {
                            $.each($checkbox, function (idx, item) {
                                let cValue = item.value;
                                if (obj.serviceId == cValue) {
                                    $(this).prop('checked', true);
                                }
                            });
                        }
                    });
                }

                if (vm.agentOffer.categorys.length > 0) {
                    vm.agentOffer.categorys.forEach(function (obj, index) {
                        let $checkbox = $("input[name='categoryId']");
                        if ($checkbox.length > 0) {
                            $.each($checkbox, function (idx, item) {
                                let cValue = item.value;
                                if (obj.categoryId == cValue) {
                                    $(this).prop('checked', true);
                                }
                            });
                        }
                    });
                }

            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
            vm.ue.setContent("");
            $("input[name='serviceId']:checked").prop("checked", false);
            $("input[name='categoryId']:checked").prop("checked", false);
        },
        //获取服务类型分类
        getServiceType: function () {
            $.get(baseURL + 'company/servicetype/getSltList', function (res) {
                if (res.code == 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].id == '5' || res.data[i].serviceName == '代理服务'||res.data[i].id == '6' || res.data[i].serviceName == '金融'||res.data[i].id == '7' || res.data[i].serviceName == '保险') {
                            res.data.splice(i, 1); //去掉代理服务、金融、保险
                            i--;
                        }
                    }
                    vm.serviceList = res.data;
                }
            });
        },
        //获取所属商品分类
        getGoodsType: function () {
            $.get(baseURL + 'goods/category/getCategoryList', function (res) {
                if (res.code == 0) {
                    vm.categoryList = res.data;

                }
            });
        },
        //获取字典数据 -  货物重量单位
        getWeightUnit: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        if (null != r.data) {
                            vm.unitList = r.data;

                        }
                    }
                }
            })
        },
        shelfOrobtained: function () { // 上架或下架
            var delArr = $('#table').bootstrapTable('getSelections');
            if (JSON.stringify(delArr ) == "[]") {
                alert('请勾选上架或下架的数据！');
                return;
            }
            confirm('确定要上架或下架选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/offer/shelfOrobtained",
                    contentType: "application/json",
                    data: JSON.stringify(delArr),
                    // dataType: "JSON",
                    // data: {id:rowId},
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
        //上架
        shelf: function (rowId) {
            if (rowId == null) {
                return;
            }

            confirm('确定要上架选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/offer/shelf",
                    contentType: "application/json",
                    data: JSON.stringify(rowId),
                    // dataType: "JSON",
                    // data: {id:rowId},
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
        //下架
        obtained: function (rowId) {
            if (rowId == null) {
                return;
            }

            confirm('确定要下架选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agent/offer/obtained",
                    contentType: "application/json",
                    data: JSON.stringify(rowId),
                    // dataType: "JSON",
                    // data: {id:rowId},
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
        }
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
        }
    }
});

//运费币制
$(".selectCurrencyCode").on("select2:select", function () {
    var data = $(this).val();
    vm.agentOffer.currency = data;
});

//运费币制
$(".selectUnitCode").on("select2:select", function () {
    var data = $(this).val();
    vm.agentOffer.valuationUnit = data;
});