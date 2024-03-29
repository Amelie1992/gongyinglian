$(function () {
    //列表
    vm.initTable();

    //表单提交
    $("#form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    });
    $("#addform").FM({
        fields: vm.fields1,
        success: vm.saveOrUpdate1

    });
    vm.$refs.file.destroy();
    vm.$refs.file.initFileInput();
    vm.initTime();
    $('#startTime').datetimepicker().on('hide', function (ev) {
        let value = $("#startTime").val();
        Vue.set(vm.marketAuction, 'startTime', value);
    });
    $('#endTime').datetimepicker().on('hide', function (ev) {
        let value = $("#endTime").val();
        Vue.set(vm.marketAuction, 'endTime', value);
    });
    $('#bidTime').datetimepicker().on('hide', function (ev) {
        let value = $("#bidTime").val();
        Vue.set(vm.marketBidRecord, 'bidTime', value);
    });
    $("input[name='startTime']").DATE({format: 'yyyy-mm-dd hh:ii:ss'});
    $("input[name='startTime']").on('changeDate', function (ev) {
        vm.marketAuction.startTime = this.value; // 开始时间
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('endTime');
        })
    });
    $("input[name='endTime']").DATE({format: 'yyyy-mm-dd hh:ii:ss'});
    $("input[name='endTime']").on('changeDate', function (ev) {
        vm.marketAuction.endTime = this.value; // 结束时间
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('startTime');
        })
    });
});

function operFormatter(value, row, index) {
    return ['<a id="btn_info" class="">' + vm.$t("Details") + '</a>'].join('');

}

function operFormatter1(value, row, index) {
    return ['<a id="btn_info1" class="">' + vm.$t("Details") + '</a>'].join('');

}

function nameFmt(value, row, index) {
    if (row.commodityName == null) {
        row.commodityName = '';
    }
    if (!vm.addTxBtn) {
        return '<input type ="text" class="form-control" id ="commodityName" value="' + row.commodityName + '" >';
    } else {
        return '<input type ="text" class="form-control" id ="commodityName" value="' + row.commodityName + '" disabled="true">';
    }
}

function placeFmt(value, row, index) {
    if (row.commodityCountry == null) {
        row.commodityCountry = '';
    }
    let str = "";
    if (!vm.addTxBtn) {
        str = '<select class="form-control selectpicker sltplace" >';
    } else {
        str = '<select class="form-control selectpicker sltplace" disabled="true">';
    }
    vm.placeData.forEach(function (item, index) {
        if (item.code == row.commodityCountry) {
            str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
        } else {
            str += '<option value="' + item.code + '">' + item.name + '</option>';
        }
    });
    str += '</select>';
    return str;

}

function factoryNoFmt(value, row, index) {
    if (row.factoryNo == null) {
        row.factoryNo = '';
    }
    if (!vm.addTxBtn) {
        return '<input type="text" class="form-control" id="factoryNo" value="' + row.factoryNo + '" >';
    } else {
        return '<input type="text" class="form-control" id="factoryNo" value="' + row.factoryNo + '" disabled="true">';
    }
}

function unitFmt(value, row, index) {
    if (row.unit == null) {
        row.unit = '';
    }
    let str = "";
    if (!vm.addTxBtn) {
        str = '<select class="form-control selectpicker sltUnit" >';
    } else {
        str = '<select class="form-control selectpicker sltUnit" disabled="true">';
    }
    vm.unitList.forEach(function (item, index) {
        if (item.code == row.unit) {
            str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
        } else {
            str += '<option value="' + item.code + '">' + item.name + '</option>';
        }
    })
    str += '</select>';
    return str;
}

function weightFmt(value, row, index) {
    if (row.weight == null) {
        row.weight = '';
    }
    if (!vm.addTxBtn) {
        return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.weight + '" >';
    } else {
        return '<input type="number" class="form-control" step="0.00001" min="0.00001" id="weight" value="' + row.weight + '" disabled="true">';
    }
}

function operaFmt() {
    if (vm.params.orderNumber != null) {
        return ['<a href="javascript:void(0)"  id="removeGoods" >移除</a>'].join('');
    } else {
        return ['<a href="javascript:void(0)" id="removeGoods" >移除</a>'].join('');
    }

}

window.operateEvents2 = {
    'click #removeGoods': function (e, value, row, index) {
        var data = $("#goodsTab").bootstrapTable("getData");
        data.splice(index, 1);
        $("#goodsTab").bootstrapTable('load', data);

        if ($("#goodsTab").bootstrapTable("getData").length <= 0) {
            $("#txtBtn").prop("disabled", false);
            $("#orderNum").prop("disabled", false);
            vm.addTxBtn = false;
            vm.params.orderNumber = "";
            vm.agentOrder.originFlag = 0;
            vm.agentOrder.originNumber = null;
        }
    },
    'change .sltplace': function (e, value, row, index) {
        row.commodityCountry = $(e.currentTarget).val();
    },
    'change .sltUnit': function (e, value, row, index) {
        row.unit = $(e.currentTarget).val();
    },
};

window.operateEvents = {
    'click #btn_info': function (event, value, row, index) {
        vm.title = "详情";
        vm.showList = false;
        vm.showList1 = false;
        vm.getInfo(row.id);
        vm.initTable1(row.id);
    }

};

window.operateEvents1 = {
    'click #btn_info1': function (event, value, row, index) {
        vm.title = "详情";
        vm.showList1 = true;
        vm.showList2 = false;
        vm.options = [];
        vm.getOptions();
        vm.getRecordInfo(row.id);
    }

};

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        options: [],
        showList: true,
        showList1: true,
        showList2: true,
        title: null,
        marketAuction: {},
        marketBidRecord: {},
        params: {
            auctionNumber: '',
            auctionCommodityName: '',
        },
        recordsId: {
            auctionId: '',
        },
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
//验证字段
        fields: {
            auctionNumber: {
                message: '拍卖编号验证失败',
                validators: {
                    notEmpty: {
                        message: '拍卖编号不能为空'
                    },
                },
            }, auctionCommodityName: {
                message: '拍卖商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '拍卖商品名称不能为空'
                    },
                    stringLength: {
                        max: 20,
                        message: '拍卖商品名称长度小于20个字符'
                    }
                },
            }, startingPrice: {
                message: '起拍价验证失败',
                validators: {
                    notEmpty: {
                        message: '起拍价不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '起拍价的整数位最多9位，可保留2位小数'
                    }
                },
            }, unit: {
                message: '英镑验证失败',
                validators: {
                    notEmpty: {
                        message: '币种不能为空'
                    },
                },
            }, province: {
                message: '提货地点省验证失败',
                validators: {
                    notEmpty: {
                        message: '提货地点省不能为空'
                    },
                },
            }, city: {
                message: '市验证失败',
                validators: {
                    notEmpty: {
                        message: '市不能为空'
                    },
                },
            }, type: {
                message: '拍卖方式 0:降价拍,1:升价拍验证失败',
                validators: {
                    notEmpty: {
                        message: '升价拍不能为空'
                    },
                },
            }, status: {
                message: '状态下架验证失败',
                validators: {
                    notEmpty: {
                        message: '下架不能为空'
                    },
                },
            }, reservePrice: {
                message: '保留价验证失败',
                validators: {
                    notEmpty: {
                        message: '保留价不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '保留价的整数位最多9位，可保留2位小数'
                    }
                },
            }, amplitude: {
                message: '变价幅度验证失败',
                validators: {
                    notEmpty: {
                        message: '变价幅度不能为空'
                    },
                    regexp: {
                        regexp: /(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
                        message: '变价幅度的整数位最多9位，可保留2位小数'
                    }
                },
            }, delayPeriod: {
                message: '延时周期验证失败',
                validators: {
                    notEmpty: {
                        message: '延时周期不能为空'
                    },
                },
            }, startTime: {
                message: '开始时间验证失败',
                validators: {
                    notEmpty: {
                        message: '开始时间不能为空'
                    },
                },
            }, endTime: {
                message: '结束时间验证失败',
                validators: {
                    notEmpty: {
                        message: '结束时间不能为空'
                    },
                    //时间验证
                    callback: {
                        message: '结束时间必须大于发布时间',
                        callback: function (value, validator, $field) {
                            let other = validator.getFieldElements('startTime').val();//获得另一个的值

                            let start = new Date(other.replace("-", "/").replace("-", "/"));
                            let end = new Date(value.replace("-", "/").replace("-", "/"));

                            if (end > start) {
                                return true;
                            }
                            return false;
                        }
                    }
                },
            }, describe: {
                message: '描述验证失败',
                validators: {
                    notEmpty: {
                        message: '描述不能为空'
                    },
                },
            }
        },
        fields1: {
            terminalPrice: {
                message: '最终出价验证失败',
                validators: {
                    notEmpty: {
                        message: '最终出价不能为空'
                    },
                },
            }, commodityName: {
                message: '拍卖商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '拍卖商品名称不能为空'
                    },
                },
            }, companyName: {
                message: '商家名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商家名称不能为空'
                    },
                },
            }, bidTime: {
                message: '出价时间验证失败',
                validators: {
                    notEmpty: {
                        message: '出价时间不能为空'
                    },
                },
            }, status: {
                message: '状态',
                validators: {
                    notEmpty: {
                        message: '请选择状态'
                    },
                },
            }
        },
        files: [],
        provinces: null,
        cities: null,
        marketAuctionCommodityList: [],//商品
        addTxBtn: false,
        unitList: [{code: 0, name: '吨'}, {code: 1, name: '千克'}],
        updateStatus: false,
        placeData: [],
    },
    methods: {
        initTable: function () {

            $("#table1").bootstrapTable("destroy");
            $("#table1").BT({
                url: baseURL + 'marketing/marketauction/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("AuctionNumber"), field: 'auctionNumber', align: 'center'},
                    {title: vm.$t("AuctionOfCommodityNames"), field: 'auctionCommodityName', align: 'center'},
                    {
                        title: vm.$t("startingPrice"), field: 'startingPrice', align: 'center',
                        formatter: function (value, row, index) {
                            var unit = '';
                            if (row['unit'] === 0) {
                                unit = '元';
                            }
                            else if (row['unit'] === 1) {
                                unit = '美元';
                            }
                            else if (row['unit'] === 2) {
                                unit = '欧元';
                            }
                            else if (row['unit'] === 3) {
                                unit = '英镑';
                            }
                            return value + unit;
                        }
                    },
                    {
                        title: vm.$t("VariablePriceRange"), field: 'amplitude', align: 'center',
                        formatter: function (value, row, index) {
                            var unit = '';
                            if (row['unit'] === 0) {
                                unit = '元';
                            }
                            else if (row['unit'] === 1) {
                                unit = '美元';
                            }
                            else if (row['unit'] === 2) {
                                unit = '欧元';
                            }
                            else if (row['unit'] === 3) {
                                unit = '英镑';
                            }
                            return value + unit;
                        }
                    },
                   /* {
                        title: vm.$t("ReservePrice"), field: 'reservePrice', align: 'center',
                        formatter: function (value, row, index) {
                            var unit = '';
                            if (row['unit'] === 0) {
                                unit = '元';
                            }
                            else if (row['unit'] === 1) {
                                unit = '美元';
                            }
                            else if (row['unit'] === 2) {
                                unit = '欧元';
                            }
                            else if (row['unit'] === 3) {
                                unit = '英镑';
                            }
                            return value + unit;
                        }
                    },*/
                    {
                        title: vm.$t("AuctionMethod"), field: 'type', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "降价拍"
                            } else {
                                return "升价拍"
                            }
                        }
                    },
                    /*{title: vm.$t("DelayPeriod"), field: 'delayPeriod', align: 'center'},*/
                    {
                        title: vm.$t("status"), field: 'status', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "上架"
                            }
                            else if (value == 2) {
                                return "未上架"
                            }
                            else if (value == 1) {
                                return "下架"
                            }
                            else if (value == 3) {
                                return "拍卖成功"
                            }
                            else if (value == 4) {
                                return "流拍"
                            }
                        }
                    },
                    {title: vm.$t("StartTime"), field: 'startTime', align: 'center'},
                    {title: vm.$t("EndTime"), field: 'endTime', align: 'center'},
                    {title: vm.$t("chaozuo"), events: operateEvents, formatter: operFormatter, align: 'center'}
                ],
                //条件查询
                queryParams: vm.params,
                onLoadSuccess: function () {
                    //$("#table1").bootstrapTable("resetView")
                }
            });

            //拍卖纪录列表
            /*$("#table2").bootstrapTable("destroy");
            $("#table2").BT({
                url: baseURL + 'marketing/marketbidrecord/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("FinalBid"), field: 'terminalPrice', align: 'center'},
                    {title: vm.$t("AuctionOfCommodityNames"), field: 'commodityName', align: 'center'},
                    // { title: '商家)', field: 'companyId',align: 'center'},
                    {title: vm.$t("business"), field: 'companyName', align: 'center'},
                    {title: vm.$t("BidTime"), field: 'bidTime', align: 'center'},
                    {
                        title: vm.$t("status"), field: 'status', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "出局"
                            } else {
                                return "得标"
                            }
                        }
                    },
                    {title: vm.$t("chaozuo"), events: operateEvents1, formatter: operFormatter1, align: 'center'}
                ],
                //条件查询
                queryParams: vm.params
            });*/

            //列表
            $("#goodsTab").bootstrapTable("destroy");
            $("#goodsTab").BT({
                columns: [
                    {title: vm.$t("NameOfGoods"), field: 'commodityName', formatter: nameFmt},
                    {title: vm.$t("place"), field: 'commodityCountry', formatter: placeFmt, events: operateEvents2},
                    {
                        title: vm.$t("FactoryNumber"),
                        field: 'factoryNo',
                        formatter: factoryNoFmt,
                        events: operateEvents2,
                        width: '9%'
                    },
                    {title: vm.$t("WeightOfGoods"), field: 'weight', formatter: weightFmt, events: operateEvents2},
                    {title: vm.$t("unit"), field: 'unit', formatter: unitFmt, events: operateEvents2},
                    {title: vm.$t("chaozuo"), formatter: operaFmt, events: operateEvents2}
                ]
            });
        },
        initTable1: function (auctionId) {
            vm.recordsId.auctionId = auctionId;
            //拍卖纪录列表
            $("#table2").bootstrapTable("destroy");
            $("#table2").BT({
                url: baseURL + 'marketing/marketbidrecord/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("FinalBid"), field: 'terminalPrice', align: 'center'},
                    {title: vm.$t("AuctionOfCommodityNames"), field: 'commodityName', align: 'center'},
                    // { title: '商家)', field: 'companyId',align: 'center'},
                    {title: vm.$t("business"), field: 'companyName', align: 'center'},
                    {title: vm.$t("BidTime"), field: 'bidTime', align: 'center'},
                    {
                        title: vm.$t("status"), field: 'status', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "出局"
                            } else {
                                return "得标"
                            }
                        }
                    }
                    // {title: vm.$t("chaozuo"), events: operateEvents1, formatter: operFormatter1, align: 'center'}
                ],
                //条件查询
                queryParams: vm.recordsId
            });
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.showList1 = false;
            vm.title = "新增";
            vm.marketAuction = {
                type: 0
            };
            vm.marketAuctionCommodityList = [];
            vm.ue.setContent('');
        },
        add1: function () {
            vm.showList1 = true;
            vm.showList2 = false;
            vm.title = "新增";
            vm.marketBidRecord = {};
            vm.options = [];
            vm.getOptions();
        },
        getOptions: function () {
            $.ajax({
                url: baseURL + 'marketing/marketauction/list',
                dataType: 'json',
                success: function (r) {
                    vm.$nextTick(function () {
                        var str = JSON.stringify(r.data);
                        str = str.replace(/id/g, "value").replace(/auctionCommodityName/g, "label");
                        vm.options = JSON.parse(str);
                    })
                }
            })
        },
        optionChange: function (val) {
            vm.options.forEach(function (item) {
                if (val == item.value) {
                    vm.marketBidRecord.companyName = item.companyName;
                    vm.marketBidRecord.companyId = item.companyId;
                    vm.marketBidRecord.commodityName = item.label;
                }
            })
        },
        update: function (id) {
            var id = getSelectedRowIdByTableName("#table1", "id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.showList1 = false;
            vm.title = "修改";
            vm.marketAuctionCommodityList = [];
            vm.getInfo(id)
        },
        //表单验证
        validate: function () {
            var bl = $('#form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        //表单验证
        validate1: function () {
            var bl = $('#addform').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            vm.marketAuction.file == undefined ? vm.marketAuction.file = [] : vm.marketAuction.file;
            if (vm.marketAuction.type==0){
                let st = parseInt(vm.marketAuction.startingPrice);//起拍价
                let re = parseInt(vm.marketAuction.reservePrice);//保留价
                if (st<re) {
                    alert("保留价要小于起拍价");
                    return false;
                }
            }
            if (vm.files.length > 0 || vm.marketAuction.file.length > 0) {
                var contracts = [];
                vm.files.forEach(function (item, index) {
                    var fileList = {};
                    fileList.fileName = item.name;
                    fileList.url = item.picUrl;
                    fileList.fileType = item.type;
                    fileList.contractType = 6;
                    contracts.push(fileList);
                    vm.marketAuction.file = contracts;
                });
            } else {
                alert("请上传拍品图片");
                return false;
            }

            vm.marketAuction.describe = UE.utils.unhtml(this.ue.getContent());//传入富文本内容

            if (vm.marketAuctionCommodityList.length <= 0) {
                alert("请添加商品明细");
                return;
            }
            for (let obj of vm.marketAuctionCommodityList) {
                if (isBlank(obj.commodityName)||obj.commodityName.length > 20) {
                    alert("货物名称不能为空且长度小于20个字符");
                    return;
                }
                if (isBlank(obj.commodityCountry)) {
                    alert("产地不能为空");
                    return;
                }
                if (isBlank(obj.commodityFactoryNumber)||obj.commodityFactoryNumber.length > 20) {
                    alert("厂号不能为空且长度小于20个字符");
                    return;
                }
                if (isBlank(obj.commodityPrice)) {
                    alert("单价不能为空");
                    return;
                } else if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.commodityPrice)) {
                    alert("单价为整数位最多9位，小数位最多2位");
                    return;
                }
                if (isBlank(obj.commodityCount)) {
                    alert("重量不能为空");
                    return;
                } else if (!/(^[1-9](\d{1,8})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(obj.commodityCount)) {
                    alert("重量的整数最多9位，小数最多2位");
                    return;
                }
                if (isBlank(obj.commodityUnit)) {
                    obj.commodityUnit = 0;
                }
            }
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("描述上传的图片数量请少于6张")
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选
            if (ceiShi.length>1000){
                alert("描述不可超出1000字")
                return
            }
            vm.marketAuction.marketAuctionCommodityEntityList = vm.marketAuctionCommodityList;

            var url = vm.marketAuction.id == null ? "marketing/marketauction/save" : "marketing/marketauction/update";
            layer.load();
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.marketAuction),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                    layer.closeAll();
                }
            });
        },
        saveOrUpdate1: function (event) {
            var url = vm.marketBidRecord.id == null ? "marketing/marketbidrecord/save" : "marketing/marketbidrecord/update";
            layer.load();
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.marketBidRecord),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                    layer.closeAll();
                }
            });
        },
        del: function (event) {
            /* var ids = getSelectedRowsId("id");
             if (ids == null) {
                 return;
             }*/

            var grid = $('#table1').bootstrapTable('getSelections');
            if (!grid.length) {
                alert("请选择一条记录");
                return;
            }
            var ids = [];
            $.each(grid, function (idx, item) {
                ids[idx] = item["id".toString()];
            });
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "marketing/marketauction/delete",
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
            $.get(baseURL + "marketing/marketauction/info/" + id, function (r) {
                if (r.marketAuction.file.length > 0) {
                    r.marketAuction.file.forEach(function (item, index) {
                        item.picName = item.fileName;
                        item.picUrl = item.url;
                    });
                }
                vm.marketAuction = r.marketAuction;
                vm.ue.setContent(UE.utils.html(vm.marketAuction.describe == null ? "" : vm.marketAuction.describe));
                //图片回显

                //商品回显
                if (r.marketAuctionCommodityList == null) {
                    vm.marketAuctionCommodityList = [];
                } else {
                    vm.marketAuctionCommodityList = r.marketAuctionCommodityList;
                }
            });
        },
        //拍卖记录详情
        getRecordInfo: function (id) {
            $.get(baseURL + "marketing/marketbidrecord/info/" + id, function (r) {
                vm.marketBidRecord = r.marketBidRecord;
            });
        },
        //修改上下架状态
        updateStatusUp: function (event) {
            var select = $("#table1").bootstrapTable("getSelections");
            if (!select.length) {
                alert("请选择一条记录");
                return;
            }
            var flag = true;
            var ids = [];
            $.each(select, function (idx, item) {
                var now = new Date();
                var end = new Date(item.endTime);
                if (now > end){
                    alert("请勿上架已经结束的拍卖");
                    flag = false;
                    return flag;
                }else {
                    ids[idx] = item["id"];
                }
            });
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: baseURL + "marketing/marketauction/updateup",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
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
            }

        },

        updateStatusDown: function (event) {
            var select = $("#table1").bootstrapTable("getSelections");
            if (!select.length) {
                alert("请选择一条记录");
                return;
            }
            var ids = [];
            $.each(select, function (idx, item) {
                ids[idx] = item["id"];
            });
            $.ajax({
                type: "POST",
                url: baseURL + "marketing/marketauction/updatedown",
                contentType: "application/json",
                data: JSON.stringify(ids),
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
        provincesChange: function (index, child, value) {
            var str = JSON.stringify(window.getCities(value));
            str = str.replace(/cityid/g, "value").replace(/city/g, "label");
            this.cities = JSON.parse(str);
        },
        //拍品信息中获取产地
        getPlaceData: function () {
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        vm.placeData = r.data;
                    }
                }
            })
        },
        //编码转换名称
        getCommodityCountry: function (commodityCountry) {
            var name = null;
            vm.placeData.forEach(function (item) {
                if (item.code == commodityCountry) {
                    name = item.name
                }
            });
            return name;
        },
        //上传商品信息
        addGoods: function (type) {
            var data = {};
            if (vm.marketAuctionCommodityList.length == 1) {
                alert("只能选择一件货物进行拍卖")
            } else {
                if ('orderNum' == type) {
                    vm.addTxBtn = true;
                    var orderNumber = $("#orderNum").val();
                    if (orderNumber == null || orderNumber == '') {
                        vm.marketAuctionCommodityList = [];
                        vm.addTxBtn = false;
                    } else {
                        $.get(baseURL + 'logistics/logisticsordercommodity/getListByOrderNumber/' + orderNumber, function (res) {
                            if (res.code == 0) {
                                if (res.good != null) {
                                    for (let obj of res.good.detail) {
                                        for (let obj1 of obj.commoditys) {
                                            vm.marketAuctionCommodityList.push({
                                                commodityName: obj1.commodityName,
                                                commodityPrice: obj1.commodityPrice,
                                                commodityCount: obj1.commodityCount,
                                                commodityUnit: obj1.commodityUnit,
                                                commodityFactoryNumber: obj1.commodityFactoryNumber,
                                                commodityCountry: obj1.commodityCountry,
                                            });
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                else if ('txtBtn' == type) {
                    vm.addTxBtn = false;
                    $("#orderNum").prop("disabled", true);
                    data = {
                        commodityName: '',//货物名称
                        commodityCountry: vm.placeData[0].code,//产地
                        commodityFactoryNumber: '',//厂号
                        commodityPrice: '',//商品价格
                        commodityCount: '',//商品重量
                        commodityUnit: vm.unitList[0].code,//单位
                    };
                    vm.marketAuctionCommodityList.push(data);
                }
            }
        },
        //移除选中商品
        removeGoods: function (index) {
            vm.marketAuctionCommodityList.splice(index, 1);
            if (!vm.marketAuctionCommodityList.length > 0) {
                $("#orderNum").prop("disabled", false);
            }
        },
        //编码转换名称
        getCommodityCountry: function (commodityCountry) {
            var name = null;
            vm.placeData.forEach(function (item) {
                if (item.code == commodityCountry) {
                    name = item.name
                }
            });
            return name;
        },
        reload: function (event) {
            vm.showList = true;
            vm.showList1 = true;
            vm.showList2 = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table1").BTF5(vm.params);
            $("#table2").BTF5(vm.params);
            $("form").RF();
        },
        //下载附件
        upload: function () {
            var row = getSelectedRows();
            row.forEach(function (item) {
                if (item.file != null && JSON.stringify(item.file) != "{}") {
                    vm.download(item.file);
                }
                /*$eleForm.attr("action", item.file.picUrl);
                 $(document.body).append($eleForm);
                 //提交表单，实现下载
                 $eleForm.submit();
                 $eleForm.remove()*/
            })
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
            $('#startTime').datetimepicker('remove');
            $('#endTime').datetimepicker('remove');
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
            $("#startTime").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 0,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#startTime").val();
                vm.marketAuction.startTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('startTime', 'NOT_VALIDATED', null)
                    .validateField('startTime');
            });
            $("#endTime").datetimepicker({
                startDate: new Date(),
                language: language,
                autoclose: true,
                startView: 2,
                minView: 0,
                todayBtn: true,
                todayHighlight: true,
                forceParse: true,

            }).on('hide', function (ev) {
                var value = $("#endTime").val();
                vm.marketAuction.endTime = value;
                $("form").data('bootstrapValidator')
                    .updateStatus('endTime', 'NOT_VALIDATED', null)
                    .validateField('endTime');
            });
        },
    },
    created: function () {
        this.getPlaceData();
        var str = JSON.stringify(window.getProvinces());
        str = str.replace(/provinceid/g, "value").replace(/province/g, "label");
        this.provinces = JSON.parse(str);
    },
    watch: {
        // "$i18n.locale": function (value, old) {
        //     if (value == 'en') {
        //         $("#table1").bootstrapTable.defaults.locale = "en-US";
        //     } else {
        //         $("#table1").bootstrapTable.defaults.locale = "zh-CN";
        //     }
        //     $("#table1").bootstrapTable("destroy")
        //     this.initTable();
        // },

        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table1").bootstrapTable.defaults.locale = "en-US";
                $("#table2").bootstrapTable.defaults.locale = "en-US";
                $("#goodsTab").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table1").bootstrapTable.defaults.locale = "zh-CN";
                $("#table2").bootstrapTable.defaults.locale = "zh-CN";
                $("#goodsTab").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table1").bootstrapTable("destroy");
            $("#table2").bootstrapTable("destroy");
            $("#goodsTab").bootstrapTable("destroy");

            this.initTable();
        },
        "marketAuction.province": function (value, old) {
            if (value != old) {
                var str = JSON.stringify(window.getCities(value));
                str = str.replace(/cityid/g, "value").replace(/city/g, "label");
                this.cities = JSON.parse(str);
                setTimeout(function () {
                    vm.marketAuction.city = parseInt(vm.marketAuction.city);
                }, 0)
            }
        },

    }
});