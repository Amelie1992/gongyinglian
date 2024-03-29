$(function () {

    vm.initTable();
    vm.getTaxNumber();
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate
        // vm.saveOrUpdate

    })
});

//报送类型
function pricringMethodFmt(value, rows, index) {
    if (rows.pricingMethod == '1') {
        return ['从价'].join('');
    } else if (rows.pricingMethod == '2') {
        return ['从量'].join('');
    }
}

function operFormatter(value, row, index) {
    var result = '';
    var flag = hasPermission('item:info:update');
    var flag1 = hasPermission('item:info:delete');
    if (flag) {
        result += '<a id="btn_edit" class="">' + vm.$t("modify") + '</a>';
        //result +='<a id="btn_del" class="">'+vm.$t("delete")+'</a>';
    } else {
        result += '<a id="btn_info" class="">' + vm.$t("detail") + '</a>';
    }
    return result;
}

window.operateEvents = {
    'click #btn_edit': function (e, value, row, index) {
        var rowId = row.id;
        vm.readFlag = false;
        vm.update(rowId);
    },
    'click #btn_info': function (e, value, row, index) {
        var rowId = row.id;
        vm.showList = false;
        vm.title = "详情";
        vm.readFlag = true;
        vm.getInfo(rowId);
    },
    'click #btn_del': function (e, value, row, index) {
        var rowId = row.id;
        vm.del(rowId);
    }
};
/*产地信息tab*/
window.placeEvents = {
    'click #removeFun': function (e, value, row, index) {
        var data = $("#itemPlaceTab").bootstrapTable("getData");
        data.splice(index, 1);
        $("#itemPlaceTab").bootstrapTable('load', data);
    },
    'change .sltplace': function (e, value, row, index) {
        row.place = $(e.currentTarget).val();
        var $rowPlaces = $("#itemPlaceTab select option:selected");
        var flag = true;
        $.each($rowPlaces, function (index, obj, array) {
            let nowIdx = index + 1;
            if (row.index == nowIdx) {
                // list.remove(obj);
            }
            else {
                if (obj.value == row.place) {
                    alert("商品产地信息重复", function () {
                        row.place = '';
                        $("#slt_place" + row.index).val("");
                        flag = false;
                    });
                }
            }
        });
        $("#itemPlaceTab").bootstrapTable('resetView');

        return flag;

    },
    'change #input_numerical': function (e, value, row, index) {
        row.numerical = $(e.currentTarget).val();
        // $("#itemPlaceTab").bootstrapTable('updateRow', {index: index, row: row});
    },
    'change #input_tariff': function (e, value, row, index) {
        row.tariff = $(e.currentTarget).val();
        // $("#itemPlaceTab").bootstrapTable('updateRow', {index: index, row: row});
    },
    'change #input_VAT': function (e, value, row, index) {
        row.valueAddTariff = $(e.currentTarget).val();
        // $("#itemPlaceTab").bootstrapTable('updateRow', {index: index, row: row});
    },
    'change #input_AD': function (e, value, row, index) {
        row.additionDuty = $(e.currentTarget).val();
        // $("#itemPlaceTab").bootstrapTable('updateRow', {index: index, row: row});
    },
    'change #input_remark': function (e, value, row, index) {
        row.remark = $(e.currentTarget).val();
        // $("#itemPlaceTab").bootstrapTable('updateRow', {index: index, row: row});
    },
};

//跳转查询税号
function toSearchTax() {
    window.open("http://www.hs-bianma.com");
};

//序号
function sequenceFmt(value, row, index) {
    console.log("index: ,", row);
    if (row.index == null) {
        row.index = index + 1;
    }
    return row.index;
}

function placeFmt(value, row, index) {
    if (row.place == null) {
        row.place = '';
    }
    let str;
    if (vm.title == "详情") {
        str = '<select class="form-control selectpicker sltplace" disabled="disabled">';
    } else {
        str = '<select class="form-control selectpicker sltplace">';
    }
    if (row.place == null) {
        str += '<option value="" selected>请选择产地</option>';
    } else {
        str += '<option value="">请选择产地</option>';
    }
    vm.placeData.forEach(function (item, index) {
        if (item.code == row.place) {
            str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
        } else {
            str += '<option value="' + item.code + '">' + item.name + '</option>';
        }
    })
    str += '</select>';
    return str;
}

function numericalFmt(value, row, index) {
    if (row.numerical == null) {
        row.numerical = 0;
    }
    if (vm.title == "详情") {
        return '<input type="number" disabled="disabled" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_numerical" value="' + row.numerical + '">'
    } else {
        if (vm.itemInfo.pricingMethod == '1')
            return '<input type="number" disabled="disabled" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_numerical" value="' + row.numerical + '">'
        else
            return '<input type="number" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_numerical" value="' + row.numerical + '">'
    }
}

function tariffFmt(value, row, index) {
    if (row.tariff == null) {
        row.tariff = '';
    }
    if (vm.title == "详情") {
        return '<input type="number" disabled="disabled" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_tariff" value="' + row.tariff + '">'
    } else {
        if (vm.itemInfo.pricingMethod == '2')
            return '<input type="number" disabled="disabled" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_tariff" value="' + row.tariff + '">'
        else
            return '<input type="number" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_tariff" value="' + row.tariff + '">'
    }
}

//VAT => valueAddTariff
function VATFmt(value, row, index) {
    if (row.valueAddTariff == null) {
        row.valueAddTariff = '';
    }
    if (vm.title == "详情") {
        return '<input type="number" disabled="disabled" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_VAT" value="' + row.valueAddTariff + '">'
    } else {
        return '<input type="number" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_VAT" value="' + row.valueAddTariff + '">'
    }
}

//AD => additionDuty
function ADFmt(value, row, index) {
    if (row.additionDuty == null) {
        row.additionDuty = 0;
    }
    if (vm.title == "详情") {
        return '<input type="number" disabled="disabled" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_AD" value="' + row.additionDuty + '">'
    } else {
        return '<input type="number" step="0.00001" min="0.00001" max="100.00000" class="form-control" id="input_AD" value="' + row.additionDuty + '">'
    }
}

function remarkFmt(value, row, index) {
    if (row.remark == null) {
        row.remark = '';
    }
    if (vm.title == "详情") {
        return '<input type="text" disabled="disabled" class="form-control" id="input_remark" value="' + row.remark + '">'
    } else {
        return '<input type="text" class="form-control" id="input_remark" value="' + row.remark + '">'
    }
}

//onclick="placeEvents.removeFun()"
function removeFormatter() {
    if (vm.title == "详情") {
        return ''
    } else {
        return '<a href="javascript:void(0)" onClick="removePlace(this)"  id="removePlace">移除</a>'
    }

}

function removePlace(obj) {
    var num = $(obj).parent().parent().children(":first").text();
    $(obj).parent().parent().remove();
    vm.places.splice(num - 1, 1);

    var data = $("#itemPlaceTab").bootstrapTable("getData");
    data.splice(num - 1, 1);
    for (var i = 0; i < data.length; i++) {
        data[i].index = i + 1;
    }
    $("#itemPlaceTab").bootstrapTable('load', data);
}


var vm = new Vue({
    el: '#bodyDiv',
    data: {
        hasPermission: window.hasPermission,
        showList: true,
        title: null,
        params: {
            goodsName: null,
            page: 1,
            pageSize: 10,
            total: 0,
        },
        itemInfo: {},
        disenbled: false,
        categoryList: [],
        placeData: [],
        readFlag: false,
        categoryTaxNumber: [
            {value: '0', label: '首页'},
            {value: '1', label: '报盘'},
            {value: '2', label: '求购'},
            {value: '3', label: '物流'},
            {value: '4', label: '仓储'},
            {value: '5', label: '报关'},
            {value: '6', label: '代理'}
        ],
        fields: {
            itemName: {
                message: '商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }, stringLength: {max: 20, message: '长度小于20'}
                },
            },
            /* itemCode : {
                 message :'商品编码验证失败',
                 validators: {
                     notEmpty: {
                         message: '商品编码不能为空'
                     },stringLength:{min:1,max:30,message:'长度小于30'}
                 },
             },*/
            /*factoryNo : {
                message :'厂号验证失败',
                validators: {
                    notEmpty: {
                        message: '厂号不能为空'
                    },stringLength:{min:1,max:30,message:'长度小于30'}
                },
            },*/
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择税号'
                    }
                }
            },
            pricingMethod: {
                validators: {
                    notEmpty: {
                        message: '请选择计价方式'
                    }
                }
            }
        },
        places: [],
        itemPlace: {},
    },
    methods: {

        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少

            $("#table").BT({
                url: baseURL + 'goods/info/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("productName"), field: 'itemName'},
                    // { title: vm.$t("commodityCode"), field: 'itemCode'},
                    {title: vm.$t("TaxNumber"), field: 'taxNumber'},
                    {title: vm.$t("ValuationMethod"), field: 'pricingMethod', formatter: pricringMethodFmt},
                    {title: vm.$t("place"), field: 'placeName'},
                    // {title: vm.$t("FactoryNumber"), field: 'factoryNo'},
                    {title: vm.$t("CreationTime"), field: 'createTime'},
                    {title: vm.$t("chaozuo"), formatter: operFormatter, events: operateEvents}
                ],
                //条件查询
                queryParams: vm.params,
                search: true,
                onLoadSuccess: function (data) {

                }
            });

            $("#itemPlaceTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#itemPlaceTab").BT({
                columns: [
                    {title: vm.$t("sequence"), field: 'id', formatter: sequenceFmt, width: '5%'},
                    {title: vm.$t("place"), field: 'place', formatter: placeFmt, events: placeEvents, width: '10%'},
                    {
                        title: vm.$t("FromQuantityPrice"), field: 'numerical', width: '10%',
                        // formatter:numericalFmt, events: placeEvents,
                        editable: {
                            type: 'text',
                            title: vm.$t("FromQuantityPrice"),
                            emptytext: vm.$t("FromQuantityPrice"),
                            // defaultValue: 1,
                            validate: function (v) {
                                if (!v) return "从量值不能为空";
                                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(v)) return '从量值的整数最多9位，小数最多2位';
                                $('#itemPlaceTab').bootstrapTable('resetView');
                            }
                        }
                    },
                    {
                        title: vm.$t("tariff") + "%", field: 'tariff', width: '10%',
                        // formatter:tariffFmt, events: placeEvents,
                        editable: {
                            type: 'text',
                            title: vm.$t("tariff"),
                            emptytext: vm.$t("tariff"),
                            // defaultValue: 1,
                            validate: function (v) {
                                if (!v) return "关税不能为空";
                                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(v)) return '关税的整数最多9位，小数最多2位';
                                $('#itemPlaceTab').bootstrapTable('resetView');
                            }
                        }
                    },
                    {
                        title: vm.$t("VAT") + "%", field: 'valueAddTariff', width: '10%',
                        // formatter:VATFmt, events: placeEvents,
                        editable: {
                            type: 'text',
                            title: vm.$t("VAT"),
                            emptytext: vm.$t("VAT"),
                            // defaultValue: 1,
                            validate: function (v) {
                                if (!v) return "增值税不能为空";
                                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(v)) return '增值税的整数最多9位，小数最多2位';
                                $('#itemPlaceTab').bootstrapTable('resetView');
                            }
                        }
                    },
                    {
                        title: vm.$t("additionDuty") + "%", field: 'additionDuty', width: '10%',
                        // formatter:ADFmt, events: placeEvents,
                        editable: {
                            type: 'text',
                            title: vm.$t("additionDuty"),
                            emptytext: vm.$t("additionDuty"),
                            // defaultValue: 1,
                            validate: function (v) {
                                if (!v) return "附加税不能为空";
                                if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(v)) return '附加税的整数最多9位，小数最多2位';
                                $('#itemPlaceTab').bootstrapTable('resetView');
                            }
                        }
                    },
                    {
                        title: vm.$t("Remarks"), field: 'remark', width: '10%',
                        // formatter:remarkFmt, events: placeEvents,
                        editable: {
                            type: 'text',
                            title: vm.$t("Remarks"),
                            emptytext: vm.$t("Remarks"),
                            // defaultValue: 1,
                            validate: function (v) {
                                if (v && v.length > 20) return '长度小于20';
                                $('#itemPlaceTab').bootstrapTable('resetView');
                            }
                        }
                    },
                    {title: vm.$t("chaozuo"), formatter: removeFormatter, events: operateEvents, width: '5%'}
                ]
            })

        },

        getTaxNumber: function () {
            var rows;
            $.get(baseURL + "goods/info/getTaxNumber", function (r) {
                rows = r.itemCategory;
                rows = JSON.stringify(rows);
                rows = rows.replace(/id/g, "value").replace(/taxNumber/g, "label");
                vm.categoryTaxNumber = JSON.parse(rows);
            })

        },

        query: function () {
            vm.reload();
        },
        query1: function () {
            console.log("11111 query");
        },
        generator: function () {
            var tableNames = getSelectedRows2();
            if (tableNames == null) {
                return;
            }
            location.href = baseURL + "goods/info/code?token=" + token + "&tables=" + JSON.stringify(tableNames);

        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.itemInfo = {};
            bindSelect("sltCate", "goods/category/getSelectList");
            $('#itemPlaceTab').bootstrapTable('removeAll');
            vm.getPlaceData();
        },
        update: function (rowId) {
            vm.getPlaceData();
            if (rowId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            $('#itemPlaceTab').bootstrapTable('removeAll');
            vm.getInfo(rowId)

        },
        saveOrUpdate: function (event) {
            if (!isBlank(vm.itemInfo.itemCode) && vm.itemInfo.itemCode.length > 20) {
                alert("商品编码须少于20个字符");
                return false;
            }
            if (!isBlank(vm.itemInfo.factoryNo) && vm.itemInfo.factoryNo.length > 20) {
                alert("厂号须少于20个字符");
                return false;
            }
            // if (vm.itemInfo.categoryId ==null){
            //     alert("无效的商品分类",function () {
            //     })
            //     return false;
            // }
            // var method = vm.itemInfo.pricingMethod;
            // if (method !=null){
            //     if(method == '1' || method =='2'){
            //
            //     }else{
            //         alert("无效的计价方式",function () {
            //         })
            //         return false;
            //     }
            // }else{
            //     alert("无效的计价方式",function () {
            //     })
            //     return false;
            // }

            vm.places = [];
            vm.places = $("#itemPlaceTab").bootstrapTable('getData');
            if (vm.places.length < 1) {
                alert("请添加产地信息");
                return false;
            }
            let flag = true;
            if (vm.places != null && vm.places.length > 0) {
                var count = 0;
                $.each(vm.places, function (index, item, array) {
                    var now = index + 1;
                    if (item.place == null || item.place == '') {
                        alert("第" + now + "条产地信息,请选择产地", function () {
                            flag = false;
                        });
                        count += 1;
                        return flag;
                    }
                    if (vm.itemInfo.pricingMethod == 2) {
                        if (isBlank(item.numerical) || item.numerical < 0) {
                            alert("第" + now + "条产地信息,请正确填写从量值", function () {
                                flag = false;
                            });
                            count += 1;
                            return flag;
                        }
                    }
                    if (vm.itemInfo.pricingMethod == 1) {
                        if (isBlank(item.tariff) || item.tariff < 0) {
                            alert("第" + now + "条产地信息,请正确填写关税", function () {
                                flag = false;
                            });
                            count += 1;
                            return flag;
                        }
                    }
                    if (isBlank(item.valueAddTariff) || item.valueAddTariff < 0) {
                        alert("第" + now + "条产地信息,请正确填写增值税", function () {
                            flag = false;
                        });
                        count += 1;
                        return flag;
                    }
                    if (isBlank(item.additionDuty) || item.additionDuty < 0) {
                        alert("第" + now + "条产地信息,请正确填写附加税", function () {
                            flag = false;
                        });
                        count += 1;
                        return flag;
                    }
                    if(item.numerical == null || item.numerical == ""){
                        item.numerical = 0;
                    }
                    if(item.tariff == null || item.tariff == ""){
                        item.tariff = 0;
                    }
                    if(item.valueAddTariff == null || item.valueAddTariff == ""){
                        item.valueAddTariff = 0;
                    }
                    if(item.additionDuty == null || item.additionDuty == ""){
                        item.additionDuty = 0;
                    }
                });
                if (count > 0) {
                    return false;
                }

            }
            vm.itemInfo.places = vm.places;
            var url = vm.itemInfo.id == null ? "goods/info/save" : "goods/info/update";
            // console.log("request Api~~");
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.itemInfo),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            // vm.reload();
                            location.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (rowId) {
            /* if(rowId == null){
                 return ;
             }*/
            rowId = getSelectedRowsId("id");
            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "goods/info/delete",
                    dataType: "JSON",
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
        returnReload: function () {
            location.reload();
        },
        getInfo: function (id) {
            vm.itemInfo = {};
            vm.getPlaceData();
            bindSelect("sltCate", "goods/category/getSelectList");
            $.get(baseURL + "goods/info/info/" + id, function (r) {
                vm.itemInfo = r.itemInfo;
                if (vm.itemInfo.pricingMethod == 1) {
                    $('#itemPlaceTab').bootstrapTable('showColumn', 'tariff');
                    $('#itemPlaceTab').bootstrapTable('hideColumn', 'numerical');
                }else if (vm.itemInfo.pricingMethod == 2) {
                    $('#itemPlaceTab').bootstrapTable('showColumn', 'numerical');
                    $('#itemPlaceTab').bootstrapTable('hideColumn', 'tariff');
                }
                $(".selectCategoryCode").val(vm.itemInfo.categoryId).trigger("change");
                $(".selectPricingMethod").val(vm.itemInfo.pricingMethod).trigger("change");
                if (r.itemInfo.places != null) {
                    for (let i = 0; i < r.itemInfo.places.length; i++) {
                        let item = r.itemInfo.places[i];
                        //vm.placeData.push(item);
                    }
                    $("#itemPlaceTab").bootstrapTable('append', vm.itemInfo.places);
                }
                $(".selectpicker").select2({
                    allowClear: false,
                    tags: true,
                    width: "100%",
                    placeholder: "请选择",
                });
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        addPlace: function () {
            var flag = false;
            if (vm.places != null && vm.places.length > 0) {
                // vm.places.forEach(function (item) {
                //
                // })
            }

            var grid = $('#itemPlaceTab').bootstrapTable('getData');

            if (grid.length > 0) {
                alert("只能添加一条产地信息");
                return;
            }
            if (flag) {
                return;
            }
            var data = {};
            data.id = null;
            data.place = null;
            data.numerical = null;
            data.tariff = null;
            data.valueAddTariff = null;
            data.additionDuty = null;
            data.remark = null;
            vm.places.push(data);
            $('#itemPlaceTab').bootstrapTable('append', data);
            $(".selectpicker").select2({
                allowClear: false,
                tags: true,
                width: "100%",
                placeholder: "请选择",
            });
        },
        getPlaceData: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                async: false,
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        vm.placeData = r.data;
                        // for(let item of vm.placeData){
                        //     item.text = item.name;
                        //     item.id = item.code;
                        // }
                    }
                }
            })
        },

    },
    i18n,
    watch: {
        "$i18n.locale": function (val, oldVal) {
            console.log(" vm.$i18n.locale", vm.$i18n.locale)
            $("#table").bootstrapTable("refresh");
        }
    },

    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
                $("#itemPlaceTab").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
                $("#itemPlaceTab").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            $("#itemPlaceTab").bootstrapTable("destroy");
            this.initTable();
        },
    },
});

//运费币制
$(".selectCategoryCode").on("select2:select", function () {
    var data = $(this).val();
    if (data == "") {
        alert("无效的分类");
        vm.itemInfo.categoryId = null;

    } else {
        vm.itemInfo.categoryId = data;
    }

    return;

});

//运费币制
$(".selectPricingMethod").on("select2:select", function () {
    var data = $(this).val();
    vm.itemInfo.pricingMethod = data;

    // 设置从量和关税都不可输入
    $('#input_numerical').attr('disabled', true);
    $('#input_tariff').attr('disabled', true);

    if (data == '1') { // 选择从价时 设置关税可输入
        $('#input_tariff').removeAttr('disabled');
        $('#input_tariff').val(0);
        $('#itemPlaceTab').bootstrapTable('showColumn', 'tariff');
        $('#itemPlaceTab').bootstrapTable('hideColumn', 'numerical');
        vm.itemInfo.tariff = 0;
    } else if (data == '2') {// 选择从量时 关税不可输入,从量值可输入 input_tariff
        $('#input_numerical').removeAttr('disabled');
        $('#input_numerical').val(0);
        $('#itemPlaceTab').bootstrapTable('showColumn', 'numerical');
        $('#itemPlaceTab').bootstrapTable('hideColumn', 'tariff');
        vm.itemInfo.numerical = 0;
    }

});

function bindSelect(ctrlName, url) {
    var control = $('#' + ctrlName);
    //设置Select2的处理
    control.select2({
        allowClear: true,
        tags: true,
        width: "100%",
        placeholder: "请选择",
        // escapeMarkup: function (m) {
        //     return m;
        // }
    });

    //绑定Ajax的内容
    $.get(baseURL + url, function (res) {
        control.empty();//清空下拉框
        addItem(res.data, ctrlName);
    });
}

function addItem(list, nodeName) {
    var $node = $('#' + nodeName);
    $node.append("<option value=''></option>");
    $node.append("<option value='default'>请选择商品分类</option>");
    $.each(list, function (i, item) {
            if (item.parentId == 0) {
                $node.append("<option value='" + item.id + "'>" + item.categoryName + "</option>");
            } else {
                $node.append("<option value='" + item.id + "'>&nbsp;" + item.categoryName + "</option>");
            }
            if (item.list != null && item.list.length > 0) {
                addItem(item.list, nodeName);
            }
        }
    );
    return $node;
}
