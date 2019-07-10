$(function () {
    if (vm.$i18n.locale == 'en') {
        $("#table").bootstrapTable.defaults.locale = "en-US";
    } else {
        $("#table").bootstrapTable.defaults.locale = "zh-CN";
    }
    //列表
    vm.initTable();
    vm.getPlaceData();
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })
    //window.events:
});

//单位
function unitFmt(value, rows, index) {
    var pyy = rows.unit;
    if (pyy == 0) {
        return '元';
    } else if (pyy == 1) {
        return '美元';
    }
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showSure: true,
        provinces: [],
        cities: [],
        categorys: [],
        showList: true,
        showImages: [],
        goodsUnits: [],
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
        title: null,
        goodsBuying: {},
        params: {
            titleName: '',
        },
        images: [],
        placeData: [],
//验证字段
        fields: {
            /*commodityFactoryNumber: {
                message: '厂号验证失败',
                validators: {
                    notEmpty: {
                        message: '厂号不能为空'
                    },stringLength: {
                        max: 20,
                        message: '厂号长度要小于20个字符'
                    }
                },
            },*/
            titleName: {
                message: '标题名称验证失败',
                validators: {
                    notEmpty: {
                        message: '标题名称不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '标题长度要小于20个字符'
                    }
                },
            }, categoryId: {
                message: '分类id验证失败',
                validators: {
                    notEmpty: {
                        message: '分类id不能为空'
                    },
                },
            }, categoryName: {
                message: '分类名称验证失败',
                validators: {
                    notEmpty: {
                        message: '分类名称不能为空'
                    },
                },
            }, buyingType: {
                message: '0:期货1：现货验证失败',
                validators: {
                    notEmpty: {
                        message: '0:期货1：现货不能为空'
                    },
                },
            }, commodityName: {
                message: '商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }, stringLength: {
                        max: 20,
                        message: '商品名称长度要小于20个字符'
                    }
                },
            }, /*commodityCountry: {
                message: '产地验证失败',
                validators: {
                    notEmpty: {
                        message: '产地不能为空'
                    },stringLength: {
                        max: 20,
                        message: '产地长度要小于20个字符'
                    }
                },
            },*/
            // goodsSailingTime: {
            //     message: '船期验证失败',
            //     trigger: 'change',
            //     validators: {
            //         notEmpty: {
            //             message: '船期不能为空'
            //         },
            //     },
            // },
            commodityCount: {
                message: '数量验证失败',
                validators: {
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '数量的整数位最多9位，小数位最多2位'
                    }
                },
            }, commodityPrice: {
                message: '预算价格验证失败',
                validators: {
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '预算价格的整数位最多9位，小数位最多2位'
                    }
                },
            },
            unit: {
                message: '单位验证失败',
                validators: {
                    notEmpty: {
                        message: '单位不能为空'
                    },
                },
            },
            /*commodityPacking: {
                message: '包装验证失败',
                validators: {
                    notEmpty: {
                        message: '包装不能为空'
                    },stringLength: {
                        max:20,
                        message:'包装要小于20个字符'
                    }
                },
            },*/
            goodsDescribe: {
                message: '商品描述验证失败',
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }, stringLength: {
                        max: 200,
                        message: '商品描述要小于200个字符'
                    }

                },
            }, createBy: {
                message: '创建人验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人不能为空'
                    },
                },
            }, createTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, modifyBy: {
                message: '修改人验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人不能为空'
                    },
                },
            }, modifyTime: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }, remarks: {
                message: '备注验证失败',
                validators: {
                    notEmpty: {
                        message: '备注不能为空'
                    },
                },
            }, goodsCompanyId: {
                message: '货物企业id验证失败',
                validators: {
                    notEmpty: {
                        message: '货物企业id不能为空'
                    },
                },
            }
        }
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");
            $("#table").BT({
                url: baseURL + 'offer/goodsbuying/list',
                columns: [
                    {checkbox: true},

                    /*{title: '分类id', field: 'categoryId'},*/
                    /*{title: '分类名称', field: 'categoryName'},*/
                    /*{title: '0:期货1：现货', field: 'buyingType'},*/
                    {title: vm.$t('title'), align: 'center', field: 'titleName'},
                    {
                        title: vm.$t('PurchaseClassification'),
                        field: 'goodsType',
                        align: 'center',
                        formatter: function (value, row, index) {
                            if (row.buyingType == 0) {
                                return "期货"
                            }
                            return "现货"
                        }
                    },
                    {title: vm.$t("productName"), align: 'center', field: 'commodityName'},
                    {
                        title: vm.$t("BudgetaryPrice"), align: 'center', field: 'commodityPrice',
                        formatter: function (value, row, index) {
                            if (isBlank(row.commodityPrice)) {
                                return "不限";
                            } else {
                                return row.commodityPrice;
                            }
                        }
                    },
                    {title: vm.$t('unit'), align: 'center', formatter: unitFmt},
                    {
                        title: vm.$t("place"), align: 'center', field: 'commodityCountryName',
                        formatter: function (value, row, index) {
                            if (isBlank(value)) {
                                return "不限";
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: vm.$t("num"),
                        align: 'center',
                        field: 'commodityCount',
                        formatter: function (value, row, index) {
                            if (isBlank(value)) {
                                return "不限";
                            } else {
                                return row.commodityCount + "&nbsp;" + row.commodityUnitZh
                            }
                        }
                    },
                    {title: vm.$t("ReleaseTime"), align: 'center', field: 'createTime'},
                    {
                        title: vm.$t("chaozuo"), align: 'center', field: 'id',
                        formatter: function (value) {
                            return "<a href='javascript:void(0)' class='getInfo'>查看详情</a>"
                        },
                        events: {
                            "click .getInfo": function (events, value) {
                                vm.showList = false;
                                vm.showSure = false;
                                vm.title = "详情";
                                vm.getInfo(value);
                            }
                        }
                    }
                ],
                //条件查询
                queryParams: vm.params
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
            $("#datetimepicker").datetimepicker({
                startDate: s,
                language: language,
            }).on('hide', function (ev) {
                var value = $("#datetimepicker").val();
                vm.goodsBuying.goodsSailingTime = value;
            });
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.showSure = true;
            vm.title = "新增";
            vm.goodsBuying = {};
            vm.goodsBuying.unit = 0;
            vm.$refs.file.destroy();
            vm.$refs.file.initFileInput();
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showSure = true;
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
        saveOrUpdate: function (event) {
            layer.load();
            if (!isBlank(vm.goodsBuying.commodityFactoryNumber) && vm.goodsBuying.commodityFactoryNumber.length > 20) {
                alert("厂号须少于20个字符");
                layer.closeAll();
                return;
            }
            if (!isBlank(vm.goodsBuying.commodityPacking) && vm.goodsBuying.commodityPacking.length > 20) {
                alert("包装须少于20个字符");
                layer.closeAll();
                return;
            }
            if (!isBlank(vm.goodsBuying.goodsSailingTime) && vm.goodsBuying.goodsSailingTime.length > 20) {
                alert("船期须少于20个字符");
                layer.closeAll();
                return;
            }
            if (vm.images.length == 0 && (vm.goodsBuying.images == null || vm.goodsBuying.images == 0)) {
                alert("请上传图片");
                layer.closeAll();
                return;
            }
            if (vm.goodsBuying.images == null) {
                vm.goodsBuying.images = [];
            }
            vm.goodsBuying.images = vm.goodsBuying.images.concat(vm.images);
            vm.goodsBuying.goodsDescribe = UE.utils.unhtml(this.ue.getContent());
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("商品描述上传的图片数量请少于6张")
                    layer.closeAll();
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选

            if (vm.goodsBuying.goodsDescribe == null || vm.goodsBuying.goodsDescribe.trim() == "") {
                alert("请输入商品描述");
                layer.closeAll();
                return;
            }else if (ceiShi.length>1000){
                alert("商品描述不可超出1000字")
                layer.closeAll()
                return
            }

            var url = vm.goodsBuying.id == null ? "offer/goodsbuying/save" : "offer/goodsbuying/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsBuying),
                success: function (r) {
                    layer.closeAll();
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            location.reload();
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
                    url: baseURL + "offer/goodsbuying/delete",
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
        getCommodityWeightUnit: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        var rows = r.data;
                        rows = JSON.stringify(rows);
                        rows = rows.replace(/code/g, "value").replace(/name/g, "label");
                        vm.goodsUnits = JSON.parse(rows);
                    }
                }
            })
        },
        getInfo: function (id) {
            $.get(baseURL + "offer/goodsbuying/info/" + id, function (r) {
                vm.goodsBuying = r.goodsBuying;
                vm.ue.setContent(UE.utils.html(vm.goodsBuying.goodsDescribe));
            });
        },
        categoryChange: function (value, childidx, _this) {
            console.log($(_this).html())
            vm.goodsBuying.categoryName = $(_this.children()[Number(value)]).text();
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        returnReload: function () {
            location.reload();
        },
        provincesChange: function (index, child, value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/id/g, "value").replace(/city/g, "label");
            console.log("加载数据")
            this.cities = JSON.parse(str);
        },
        getPlaceData: function () {
            var rows;
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        //vm.placeData = r.data;
                        rows = JSON.stringify(r.data);
                        rows = rows.replace(/id/g, "value").replace(/name/g, "label");
                        vm.placeData = JSON.parse(rows);
                    }
                }
            })
        },
        getCategorys: function () {
            $.ajax({
                url: '/goods/recommendgoods/getCategory',
                success: function (r) {
                    var str = JSON.stringify(r.list);
                    str = str.replace(/id/g, "value").replace(/categoryName/g, "label");
                    vm.categorys = JSON.parse(str);
                }
            })
        },
    },
    updated: function () {
        this.initDateTime();
    },
    created: function () {
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces = JSON.parse(str);
        this.getCategorys();
        this.getCommodityWeightUnit();
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
        'goodsBuying.buyingType': function (value) {
            if (value == 0) {
                $("#form").bootstrapValidator('enableFieldValidators', 'goodsSailingTime', true);
                $("#form").bootstrapValidator('enableFieldValidators', 'goodsPodProvince', false);
            } else {
                $("#form").bootstrapValidator('enableFieldValidators', 'goodsPodProvince', true);
                $("#form").bootstrapValidator('enableFieldValidators', 'goodsSailingTime', false);
            }
            $("#form").RF();
        },
        "goodsBuying.goodsPodProvince": function (value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/id/g, "value").replace(/city/g, "label");
            this.cities = JSON.parse(str);
            setTimeout(function () {
                vm.goodsBuying.goodsPodCity = parseInt(vm.goodsBuying.goodsPodCity);
            }, 200)
        }
    }
});