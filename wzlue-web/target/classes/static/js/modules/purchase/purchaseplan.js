$(function () {
    $("#table").BT({
        url: baseURL + 'purchase/purchaseplan/list',
        columns: [
            {checkbox: true},
            {title: '采购计划单号', field: 'purchasePlanNo', align: 'center'},
            {title: '采购计划人', field: 'planUser', align: 'center'},
            {title: '生产计划单号', field: 'planNo', align: 'center'},
            {
                title: '计划日期', field: 'planTime', align: 'center',
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },
            {title: '计划采购数量合计', field: 'totalPurchaseQuantity', align: 'center'},
            {title: '总的已下达数量合计', field: 'totalArrivedQuantity', align: 'center'},
            {title: '采购计划审核状态', field: 'status', align: 'center'},
            // { title: '创建时间', field: 'createdTime'},
            // { title: '创建人', field: 'createdBy'},
            // { title: '更新时间', field: 'updateTime'},
            // { title: '更新者', field: 'updateBy'},
            // { title: '创建人部门', field: 'createdByDepartment'},
            // { title: '修改人部门', field: 'updateByDepartment'}
            {
                title: '操 作', formatter: editFormatter, align: 'center',
                width: '10%'
            }
        ],
        //条件查询
        queryParams: vm.params
    });
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })
    $("#need_form").FM({'fields': vm.fields, "success": vm.saveOrUpdate});

//商品信息
    $("#commodityTab").BT({
        columns: [
            {checkbox: true},
            {title: '产品编码', field: 'productNo', align: 'center'},
            {title: '产品名称', field: 'productName', align: 'center'},
            {title: '规格', field: 'productSize', align: 'center'},
            {title: '单位', field: 'unit', align: 'center'},
            {title: '当前库存', field: 'currentInventory', align: 'center'},
            {
                title: '计划数量',
                field: 'eachPurchaseQuantity',
                align: 'center',
                formatter: countFormatter,
                events: operateEvents,
                width: '10%'
            },
            {
                title: '计划到货时间',
                field: 'planArrivedTime',
                align: 'center',
                formatter: countFormatter1,
                events: operateEvents
            },
            {title: '已下达数量', field: 'eachArrivedQuantity', align: 'center'}
        ]
    });

//商品模态框
    $("#commodityTab1").BT({
        height: 300,
        columns: [
            {checkbox: true},
            {title: '产品编码', field: 'productNo', align: 'center'},
            {title: '产品名称', field: 'productName', align: 'center'},
            {title: '单位', field: 'unit', align: 'center'},
            {title: '规格', field: 'productSize', align: 'center'},
            {title: '类别', field: 'currentInventory', align: 'center'}
        ]
    });
});

function changeDateFormat(cellval) {
    if (cellval != null) {
        return formatDate(formatResultDate(cellval), "YY-MM-DD hh:mm:ss");
    }
}
function countFormatter(value, row, index) {
    if (value == null) {
        row.eachPurchaseQuantity = 1;
        // value = row.eachPurchaseQuantity;
    }
    return ['<div id="countEdit" class="input-group input-group-option quantity-wrapper">' +
    '<span  class="input-group-addon input-group-addon-remove quantity-remove btn">' +
    '<span class="glyphicon glyphicon-minus"></span>' +
    '</span>' +
    '<input  id="inp" type="text" value="' + row.eachPurchaseQuantity + '" name="option[]" class="form-control quantity-count" placeholder="1">' +
    '<span class="input-group-addon input-group-addon-remove quantity-add btn">' +
    '<span class="glyphicon glyphicon-plus"></span>' +
    '</span>' +
    '</div> '].join('');
}
function countFormatter1(value, row, index) {
    if (row.planArrivedTime == null) {
        row.planArrivedTime = '';
    }
    return '<input type="text" class="form-control" id="itemRecordNo" value="' + row.planArrivedTime + '">'
}
function editFormatter(value, row, index) {
    var result = '';
    result += '<div class="row">';
    var flag = hasPermission('purchase:purchaseplan:info');
    if (flag) {
        result += '<a href="#" onclick="vm.toGetInfo(' + row.purchasePlanId + ')">详情</a>';
    }
    // var flag = hasPermission('purchase:purchaseplan:update');
    // if (flag) {
    //     result += '&nbsp;&nbsp;<a href="#" onclick="vm.update(' + row.purchasePlanId + ')">编辑</a>';
    // }
    result += '</div>';
    return result;
}
window.operateEvents = {
    'click #removeGood': function (e, value, row, index) {
        var data = $("#commodityTab").bootstrapTable("getData");
        data.splice(index, 1)
        $("#commodityTab").bootstrapTable('load', data);
    },
    'click .quantity-add': function (e, value, row, index) {
        row.eachPurchaseQuantity = parseInt(row.eachPurchaseQuantity) + 1;
        $(e.currentTarget).parents('td').find("#inp").val(row.eachPurchaseQuantity);
        $("#commodityTab").bootstrapTable('updateRow', {index: index, row: row})
    },
    'click .quantity-remove': function (e, value, row, index) {
        if (row.eachPurchaseQuantity > 1) {
            row.eachPurchaseQuantity = parseInt(row.eachPurchaseQuantity) - 1;
            $(e.currentTarget).parents('td').find("#inp").val(row.eachPurchaseQuantity);
            $("#commodityTab").bootstrapTable('updateRow', {index: index, row: row})
        }
    },
    'change #planArrivedTime': function (e, value, row, index) {
        row.planArrivedTime = $(e.currentTarget).val();

        $("#commodityTab").bootstrapTable('updateRow', {index: index, row: row})
    }


};

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        purchasePlan: {},
        params: {
            purchasePlanNo: '',
        },
//验证字段
        rules: {
            planTime: [
                {required: true, message: '请输入计划日期', trigger: 'blur'},
            ]

        },//from表单自定义验证
        fields: {
            purchasePlanNo: {
                message: '采购计划单号验证失败',
                validators: {
                    notEmpty: {
                        message: '采购计划单号不能为空'
                    },
                },
            }, planId: {
                message: '采购计划人id验证失败',
                validators: {
                    notEmpty: {
                        message: '采购计划人id不能为空'
                    },
                },
            }, planTime: {
                message: '计划日期验证失败',
                validators: {
                    notEmpty: {
                        message: '计划日期不能为空'
                    },
                },
            }
        },
        pickerOptions1: {
            disabledDate: function disabledDate(time) {
                return !(time.getTime() > Date.now() - 24 * 60 * 60 * 1000);
            }
        },
        promingxi: [],
        userList: [],
        isbackshow: true,
    },
    methods: {
        //初始化数据分页数据
        getData: function () {

        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.purchasePlan = {};
        },
        update: function (purchasePlanId) {
            var purchasePlanId = getSelectedRowId("purchasePlanId");
            if (purchasePlanId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(purchasePlanId)
        },
        //详情页
        toGetInfo: function (purchasePlanId){
            if (purchasePlanId == null) {
                return;
            }
            vm.showList = false;
            vm.isbackshow = false;
            vm.title = "详情";

            vm.getInfo(purchasePlanId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.purchasePlan.purchasePlanId == null ? "purchase/purchaseplan/save" : "purchase/purchaseplan/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.purchasePlan),
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
            $('#datetimeStart').datetimepicker('update', null);
        },
        del: function (event) {
            var purchasePlanIds = getSelectedRowsId("purchasePlanId");
            if (purchasePlanIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "purchase/purchaseplan/delete",
                    contentType: "application/json",
                    data: JSON.stringify(purchasePlanIds),
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
        getInfo: function (purchasePlanId) {
            $.get(baseURL + "purchase/purchaseplan/info/" + purchasePlanId, function (r) {
                vm.purchasePlan = r.purchasePlan;
                $(vm.$refs.select.$el).val(vm.purchasePlan.planUserId);
                $(vm.$refs.select.$el).selectpicker('refresh');
                $('#datetimeStart').datetimepicker('update', formatResultDate(vm.purchasePlan.planArrivedTime));
            });
        },
        //获取用户集合
        getUserIdList: function getUserIdList() {
            var url;
            url = baseURL + 'sys/user/listAllByParams';
            $.get(url, function (r) {
                if (r.code == 0) {
                    var list = r.page.list;
                    var jsonStr = JSON.stringify(list);
                    jsonStr = jsonStr.replace(/username/g, 'label').replace(/userId/g, 'value');
                    vm.userList = JSON.parse(jsonStr);
                }
            });
        },
        detailhandleSelection: function detailhandleSelection(val) {
            vm.delSelect = [];
            for (var i = 0; i < val.length; i++) {
                vm.delSelect.push(val[i].productId);
            }
        },
        reload: function (event) {
            vm.showList = true;
            vm.isbackshow = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        //用户下拉框选中事件
        userChanage: function (value, val) {
            vm.purchasePlan.planUser = val.find("option:selected").text()
        },
    },
    created: function () {
        //初始化
        this.getData();
        this.getUserIdList();
    },
    watch: {
        'purchasePlan.planTime': function purchasePlanTime(val, oldval) {
            if (vm.promingxi.length > 0) {
                for (var i = 0; i < vm.promingxi.length; i++) {
                    vm.promingxi[i].planPurchaseTime = val;
                }
            }
        }
    },
    computed: {
        totalPurchaseQuantitysum: function totalPurchaseQuantitysum() {
            this.purchasePlan.totalPurchaseQuantity = 0;
            var sum = 0;
            for (var i = 0; i < this.promingxi.length; i++) {
                var itemVal;
                if (this.promingxi[i].eachPurchaseQuantity) {
                    itemVal = parseInt(this.promingxi[i].eachPurchaseQuantity);
                } else {
                    itemVal = 0;
                }
                sum = sum + itemVal;
            }
            this.purchasePlan.totalPurchaseQuantity = sum;
            return sum;
        }
    },
});

function gotoDate(ev) {
    vm.purchasePlan.planArrivedTime = formatDate(ev.date, 'YYMMDDhhmmss');
}