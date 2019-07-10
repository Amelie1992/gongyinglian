$(window).resize(function () {
    $('#table').bootstrapTable('resetView');
    $('#commodityTable').bootstrapTable('resetView');
    $('#categoryData').bootstrapTable('resetView');
});
$(function () {
    if (vm.$i18n.locale == 'en') {
        $("#table").bootstrapTable.defaults.locale = "en-US";
    } else {
        $("#table").bootstrapTable.defaults.locale = "zh-CN";
    }
    vm.initTable();
    vm.initDateTime();
    //列表
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })
});
var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        commodity: [],
        goodsOffer: {},
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
        images: [],
        goodsCount: null,
        params: {
            name: '',
            categoryId: null,
            goodsState: 1
        },
        categorys: [],
        bang: {value: 1, label: '磅'},
        goodsUnits: [
            {value: 0, label: '吨'},
            {value: 2, label: 'kg'},
        ],
        provinces: [],
        cities: [],
        events: {
            'click .showInfo': function (event, value, row, index) {
                vm.getInfo(value);
            }
        },
//验证字段
        fields: {
            goodsName: {
                message: '货物名称验证失败',
                validators: {
                    notEmpty: {
                        message: '货物名称不能为空'
                    },
                },
            }, goodsPrice: {
                message: '货物总价格验证失败',
                validators: {
                    notEmpty: {
                        message: '货物总价格不能为空'
                    },
                },
            }, goodsType: {
                message: '货物类型0:期货1：现货验证失败',
                validators: {
                    notEmpty: {
                        message: '货物类型0:期货1：现货不能为空'
                    },
                },
            }, goodsCount: {
                message: '货物数量验证失败',
                validators: {
                    notEmpty: {
                        message: '货物数量不能为空'
                    },
                },
            }, goodsUnit: {
                message: '货物单位验证失败',
                validators: {
                    notEmpty: {
                        message: '货物单位不能为空'
                    },
                },
            }, goodsPodProvince: {
                message: '货物提货地址省验证失败',
                validators: {
                    notEmpty: {
                        message: '货物提货地址省不能为空'
                    },
                },
            }, goodsPodCity: {
                message: '货物提货地址城市验证失败',
                validators: {
                    notEmpty: {
                        message: '货物提货地址城市不能为空'
                    },
                },
            }, goodsSname: {
                message: '货物仓库名称验证失败',
                validators: {
                    notEmpty: {
                        message: '货物仓库名称不能为空'
                    },
                },
            }, goodsSailingTime: {
                message: '货物船期验证失败',
                validators: {
                    notEmpty: {
                        message: '货物船期不能为空'
                    },
                },
            }, goodsCsc: {
                message: '可否拼柜验证失败',
                validators: {
                    notEmpty: {
                        message: '可否拼柜不能为空'
                    },
                    callback: function (value, v) {
                        if (value == '' || value == null) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
            }, goodsDescribe: {
                message: '商品描述验证失败',
                validators: {
                    callback: function (value, v) {
                        if (vm.ue.getContent() == null || vm.ue.getContent() == "") {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }, goodsDescribe: {
                message: '货物描述验证失败',
                validators: {
                    notEmpty: {
                        message: '货物描述不能为空'
                    },
                },
            }, goodsCompanyId: {
                message: '货物企业id验证失败',
                validators: {
                    notEmpty: {
                        message: '货物企业id不能为空'
                    },
                },
            }, goodsTransactionCount: {
                message: '货物历史交易数量验证失败',
                validators: {
                    notEmpty: {
                        message: '货物历史交易数量不能为空'
                    },
                },
            }, goodsState: {
                message: '货物状态0：下架1：上架验证失败',
                validators: {
                    notEmpty: {
                        message: '货物状态0：下架1：上架不能为空'
                    },
                },
            }, commodityCountry: {
                message: '产地验证失败',
                validators: {
                    notEmpty: {
                        message: '产地不能为空'
                    },
                },
            }, commodityFactoryNumber: {
                message: '厂号验证失败',
                validators: {
                    notEmpty: {
                        message: '厂号不能为空'
                    },
                },
            }, commodityPacking: {
                message: '包装验证失败',
                validators: {
                    notEmpty: {
                        message: '包装不能为空'
                    },
                },
            }, commodityClassification: {
                message: '商品分类验证失败',
                validators: {
                    notEmpty: {
                        message: '商品分类不能为空'
                    },
                },
            }, createBy: {
                message: '创建人验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人不能为空'
                    },
                },
            }, /* createTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            },*/ modifyBy: {
                message: '修改人验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人不能为空'
                    },
                },
            }, /* modifyTime: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            },*/ remarks: {
                message: '备注验证失败',
                validators: {
                    notEmpty: {
                        message: '备注不能为空'
                    },
                },
            }
        }
    },
    methods: {
        initTable: function () {
            var vm = this;
            //列表
            $("#table").bootstrapTable("destroy")
            $("#table").BT({
                url: baseURL + 'offer/goodsoffer/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t('productName'), field: 'goodsName'},
                    {title: vm.$t('price'), field: 'goodsPrice'},
                    {
                        title: vm.$t('productTypes'), field: 'goodsType', formatter: function (value, row, index) {
                        if (value == 0) {
                            return "期货"
                        }
                        return "现货"
                    }
                    },
                    {title: vm.$t('num'), field: 'goodsCount'},
                    {
                        title: vm.$t('productTypes'), formatter: function (value, row, index) {
                        return row.goodsPodProvince + row.goodsPodCity;
                    }
                    },
                    {title: vm.$t('warehouseName'), field: 'goodsSname'},
                    {title: vm.$t('Schedule'), field: 'goodsSailingTime'},
                    {
                        title: vm.$t("cabinet"), field: 'goodsCsc', formatter: function (value, row, index) {
                        if (value == 0) {
                            return "不可拼"
                        }
                        return "拼柜"
                    }
                    },
                    {
                        title: vm.$t("chaozuo"), field: 'id',
                        formatter: function (value, row, index) {
                            return "<a href='javascript:void(0)' class='showInfo'>" + vm.$t('Details') + "</a>";
                        }, events: vm.events
                    },
                ],
                //条件查询
                queryParams: vm.params
            });
            $("#commodityTable").bootstrapTable("destroy")
            $("#commodityTable").BT({
                columns: [
                    {checkbox: true},
                    {title: vm.$t("commodityCode"), field: 'itemCode'},
                    {title: vm.$t('productName'), field: 'itemName'},
                    {title: vm.$t('Categories') + "Id", field: 'categoryId', visible: false},
                    {title: vm.$t('Categories'), field: 'categoryName'},
                    {title: vm.$t('place'), field: 'goodsCount'},
                    {title: vm.$t('FactoryNumber'), field: 'factoryNo'},
                    {
                        title: vm.$t('price'),
                        valign: 'middle',
                        align: 'center',
                        field: 'commodityPrice',
                        width: '18%',
                        formatter: function (value, row, index) {
                            return '<div class="form-group" style="vertical-align: middle;height: -webkit-fill-available;">' +
                                '<a href="javascript:void(0)" data-pk="' + row.commodityPrice + '" data-type="text" id="bjEdit" class="bjEdit editable editable-click editable-empty input-sm control-label col-sm-6" data-value="' + row.commodityPrice + '" data-title="请输入报价">' + row.commodityPrice + '</a>&nbsp;&nbsp;&nbsp;' +
                                '<select class="form-control input-sm control-label col-sm-6">' +
                                '<option value="0">人民币</option>' +
                                '</select>' +
                                '</div>';
                        },
                        events: {
                            'save .bjEdit': function (event, value, row, index) {
                                vm.$nextTick(function () {
                                    row.commodityPrice = $(event.currentTarget).editable("getValue").bjEdit;
                                    value = row.commodityPrice;
                                    vm.goodsOffer.goodsPrice = value;
                                })
                                console.log('value', value)
                                console.log('save')
                            }
                        }
                    },
                    {
                        title: vm.$t('num'), valign: 'middle', align: 'center', field: 'commodityCount',
                        editable: {
                            type: 'text',
                            width: '10%',
                            title: vm.$t('InputNumber'),
                            emptytext: vm.$t('InputNumber'),
                            defaultValue: 1,
                            validate: function (v) {
                                if (!v) return vm.$t('InputNumber');
                                if (isNaN(v)) return '请输入正确的数量';
                                if (parseInt(v) < 0) return '数量必须大于0';
                                if (parseInt(v) > 9999999999) return '数量不能大于9999999999';
                            }
                        }
                    },
                    {
                        title: vm.$t('unit'), valign: 'middle', align: 'center', field: 'commodityUnit', width: '10%',
                        editable: {
                            type: 'select',
                            width: '10%',
                            title: vm.$t("SelectUnit"),
                            emptytext: vm.$t("SelectUnit"),
                            source: [{value: 1, text: "text1"}, {value: 2, text: "text2"}],
                            defaultValue: 1,
                            validate: function (v) {
                                if (!v) return vm.$t("SelectUnit");
                            }
                        }
                    },
                    {
                        title: vm.$t("pack"),
                        valign: 'middle',
                        align: 'center',
                        field: 'commodityPacking',
                        width: '10%',
                        editable: {
                            type: 'text',
                            emptytext: vm.$t("InputPack"),
                            width: '10%',
                            title: vm.$t("InputPack"),
                            defaultValue: 1,
                            validate: function (v) {
                                if (!v) return vm.$t("InputPack");
                                if (v.length > 20) return '包装长度不能大于20';
                            }
                        }
                    },
                ]
            })
            this.goodsCount = 0;
            $("#categoryData").bootstrapTable("destroy")
            $("#categoryData").BT({
                url: baseURL + 'goods/info/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("commodityCode"), field: 'itemCode'},
                    {title: vm.$t('productName'), field: 'itemName'},
                    {title: vm.$t('Categories') + "Id", field: 'categoryId', visible: false},
                    //{title: '产地ID', field: 'places', visible: false},
                    {title: vm.$t('Categories'), field: 'categoryName'},
                    {title: vm.$t('place'), field: 'goodsCount'},
                    {title: vm.$t('FactoryNumber'), field: 'factoryNo'},
                    {title: vm.$t('TaxNumber'), field: 'goodsCount'},
                    {title: vm.$t('TariffPricing'), field: 'pricingMethod'},
                    {title: vm.$t('numerical'), field: 'goodsCount'},
                ]
            })
            $('#table').bootstrapTable('resetView');
            $('#commodityTable').bootstrapTable('resetView');
            $('#categoryData').bootstrapTable('resetView');
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
            $("#datetimepicker").datetimepicker({
                startDate: s,
                language: language,
            }).on('hide', function (ev) {
                var value = $("#datetimepicker").val();
                vm.goodsOffer.goodsSailingTime = value;
            });
        },
        addCategory: function (event) {
            var commoditys = $("#commodityTable").bootstrapTable("getData");
            var guid = $("#categoryData").bootstrapTable("getSelections");
            if (!guid.length) {
                alert("请选择至少一条商品信息");
                return;
            }
            var flag = false;
            if (guid.length > 1) {
                if (this.goodsOffer.goodsType == 0) {
                    //期货
                    if (this.goodsOffer.goodsCsc == 0) {
                        if (guid.length >= 1) {
                            alert("您选择的是不可拼柜，只能添加一条商品");
                            return;
                        }
                    }
                } else {
                    //现货
                    if (guid.length >= 1) {
                        alert("您选择的商品类型是现货,只能添加一条商品信息");
                        return;
                    }
                }
            }
            var commoditys = $("#commodityTable").bootstrapTable("getData");
            guid.forEach(function (item) {
                if (flag) {
                    return;
                }
                commoditys.forEach(function (c) {
                    if (c.itemCode == item.itemCode) {
                        alert("您选择的商品已添加，请重新添加");
                        flag = true;
                        return;
                    }
                })
                item.commodityCount = null;
                item.commodityUnit = null;
                item.commodityPacking = null;
                item.commodityPrice = null;
            })
            if (flag) {
                return;
            }
            commoditys = commoditys.concat(guid);
            $("#commodityTable").bootstrapTable("removeAll");
            this.goodsCount = commoditys.length;
            $("#commodityTable").bootstrapTable("append", JSON.parse(JSON.stringify(commoditys)));
            console.log($("#commodityTable").bootstrapTable("getData"))
            //$("#myModal").modal('hide');
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = vm.$t('added');
            vm.goodsOffer = {};
            vm.images.length = 0;
            vm.ue.setContent('');
            vm.$refs.file.destroy();
            vm.$refs.file.initFileInput();
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = vm.$t("modify");

            vm.getInfo(id)
        },
        updateStatue: function (event) {
            var select = $("#table").bootstrapTable("getSelections");
            if (!select.length) {
                alert("请选择一条记录");
                return;
            }
            var ids = [];
            $.each(select, function (idx, item) {
                ids[idx] = item["id"];
            });
            var url = "offer/goodsoffer/unsold";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(ids),
                success: function (r) {
                    if (r.code === 0) {
                        alert('下架成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var a = $('#bjEdit').editable('validate');
            if (a.bjEdit != null) {
                alert(a.bjEdit);
                return;
            }
            var as = $(".editable").editable('validate');
            if (as.commodityCount != null) {
                alert(as.commodityCount);
                return;
            }
            var as = $(".editable").editable('validate');
            if (as.commodityUnit != null) {
                alert(as.commodityUnit);
                return;
            }
            var as = $(".editable").editable('validate');
            if (as.commodityPacking != null) {
                alert(as.commodityPacking);
                return;
            }
            if (vm.images != null && vm.images.length > 0) {
                vm.goodsOffer.images = vm.images;
            } else {
                console.log(vm.goodsOffer.images == null || JSON.stringify(vm.goodsOffer.images) == '{}')
                if (vm.goodsOffer.images == null || JSON.stringify(vm.goodsOffer.images) == '{}') {
                    alert("请上传合商品图片");
                    return;
                } else {
                    console.log(vm.goodsOffer.images)
                }
            }
            var url = vm.goodsOffer.id == null ? "offer/goodsoffer/save" : "offer/goodsoffer/update";
            vm.goodsOffer.goodsDescribe = UE.utils.unhtml(this.ue.getContent());
            vm.goodsOffer.commodityPrice = $("#bjEdit").text().trim();
            var commoditys = $("#commodityTable").bootstrapTable("getData")
            commoditys.forEach(function (item) {
                item.commodityName = item.itemName;
                item.commodityId = item.id;
                item.commodityNumber = item.itemCode;
                item.commodityFactoryNumber = item.factoryNo;
                item.commodityCountry = item.commodityCountry;
            })
            if (!commoditys.length) {
                alert("请添加商品");
                return;
            }
            vm.goodsOffer.commoditys = commoditys;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsOffer),
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
                    url: baseURL + "offer/goodsoffer/delete",
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
            vm.goodsOffer = {};
            vm.images.length = 0;
            vm.ue.setContent('');
            $("#bjEdit").editable("destroy")
            $.get(baseURL + "offer/goodsoffer/info/" + id, function (r) {
                vm.goodsOffer = r.goodsOffer;
                vm.ue.setContent(UE.utils.html(vm.goodsOffer.goodsDescribe));
                var row = r.goodsOffer.commoditys;
                row.forEach(function (item) {
                    item.itemName = item.commodityName;
                    item.id = item.commodityId;
                    item.itemCode = item.commodityNumber;
                    item.factoryNo = item.commodityFactoryNumber;
                })

                $("#commodityTable").bootstrapTable("removeAll");
                $("#commodityTable").bootstrapTable("append", row)
                if (vm.goodsCount == row.length) {
                    vm.goodsCount = row.length + 1;
                } else {
                    vm.goodsCount = row.length;
                }
                vm.showList = false;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            vm.goodsOffer = {};
            vm.images.length = 0;
            vm.goodsOffer.goodsType = 0;
            vm.ue.setContent('');
            $("#bjEdit").editable("destroy")
            $("#commodityTable").bootstrapTable("removeAll");
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        provincesChange: function (index, child, value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/id/g, "value").replace(/city/g, "label");
            console.log("加载数据")
            this.cities = JSON.parse(str);
        },
        showCommodity: function () {
            var str = null;
            $(".form").data("bootstrapValidator").validateField("goodsType");
            str = $(".form").data("bootstrapValidator").isValidField("goodsType");
            if (!str) {
                alert("请选择商品类型");
                return;
            }
            if (this.goodsOffer.goodsType == 0) {
                $(".form").data("bootstrapValidator").validateField("goodsCsc");
                str = $(".form").data("bootstrapValidator").isValidField("goodsCsc");
                if (!str) {
                    alert("请选择可否拼柜");
                    return;
                }
            }
            var commoditys = $("#commodityTable").bootstrapTable("getData");
            if (this.goodsOffer.goodsType == 0) {
                //期货
                if (this.goodsOffer.goodsCsc == 0) {
                    if (commoditys.length >= 1) {
                        alert("您选择的是不可拼柜，只能添加一条商品");
                        return;
                    }
                }
            } else {
                //现货
                if (commoditys.length >= 1) {
                    alert("您选择的商品类型是现货,只能添加一条商品信息");
                    return;
                }
            }
            $("#categoryData").bootstrapTable("uncheckAll");
            $("#myModal").modal("show")
        },
        removeCommodity: function () {
            var commoditys = $("#commodityTable").bootstrapTable("getData");
            var select = $("#commodityTable").bootstrapTable("getSelections");
            if (!select.length) {
                alert("请选择一条记录");
                return;
            }
            select.forEach(function (item) {
                commoditys.splice(commoditys.indexOf(item), 1);
            })
            $("#commodityTable").bootstrapTable("load", commoditys)
        },
        getCategorys: function () {
            $.ajax({
                url: '/goods/category/list',
                success: function (r) {
                    var str = JSON.stringify(r.rows);
                    str = str.replace(/id/g, "value").replace(/categoryName/g, "label");
                    vm.categorys = JSON.parse(str);
                }
            })
        }
    },
    created: function () {
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces = JSON.parse(str);
        this.goodsUnits.push(this.bang)
        this.getCategorys();
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            this.initTable();
            this.initDateTime();
        },
        "goodsCount": function () {
            $("#bjEdit").editable({
                emptytext: '请输入报价',
                defaultValue: 1,
                validate: function (v) {
                    if (!v) return '报价不能为空';
                    if (isNaN(v)) return '请输入正确的报价';
                    if (parseInt(v) < 0) return '报价不能小于0';
                }
            })
        },
        "goodsOffer.goodsType": function (value, old) {
            if (value == 1) {
                //现货
                $("form").bootstrapValidator('enableFieldValidators', 'goodsPodProvince', true);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsPodCity', true);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsSname', true);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsSailingTime', false);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsCsc', false);
                vm.goodsUnits.splice(vm.goodsUnits.indexOf(vm.bang), 1);
            } else {
                //期货
                $("form").bootstrapValidator('enableFieldValidators', 'goodsPodProvince', false);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsPodCity', false);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsSname', false);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsSailingTime', true);
                $("form").bootstrapValidator('enableFieldValidators', 'goodsCsc', true);
                if (vm.goodsUnits.indexOf(vm.bang) == -1) {
                    vm.goodsUnits.push(vm.bang);
                }
            }
            $(vm.$refs.goodsUnits.$el).selectpicker('val', vm.goodsOffer.goodsUnit)
            $(".form").RF();
        }
    }
});
