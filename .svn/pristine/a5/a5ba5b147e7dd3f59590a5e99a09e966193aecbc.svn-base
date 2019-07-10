$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'purchase/purchaseapply/list',
        columns: [
            {checkbox: true},
            {title: '采购申请单号', field: 'purchaseApplyNo',align:'center'},
            {title: '采购申请人', field: 'applyUser',align:'center'},
            {title: '申请日期', field: 'applyTime',align:'center'},
            {title: '需求日期', field: 'needTime',align:'center'},
            {title: '申请采购的总数量', field: 'totalPurchaseQuantity',align:'center'},
            {title: '总的已下达数量', field: 'totalArrivedQuantity',align:'center'},
            {title: '采购申请审核状态', field: 'status',align:'center'},
            {
                title: '操 作', formatter: editFormatter,align:'center',
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

    //商品信息
    $("#commodityTab").BT({
        columns: [
            {checkbox: true},
            {title: '产品编码', field: 'productNo',align:'center'},
            {title: '产品名称', field: 'productName',align:'center'},
            {title: '规格', field: 'productSize',align:'center'},
            {title: '单位', field: 'unit',align:'center'},
            {title: '供应商', field: 'supplyName',align:'center'},
            {title: '单价(元)', field: 'currentInventory',align:'center'},
            {title: '当前库存', field: 'currentInventory',align:'center'},
            {title: '计划数量', field: 'eachPurchaseQuantity',align:'center'},
            {title: '申请数量', field: 'eachApplyQuantity',align:'center', formatter: countFormatter,
                events: operateEvents,
                width: '10%'},
            {title: '需求日期', field: 'eachNeedTime',align:'center'},
            {title: '已下达数量', field: 'eachArrivedQuantity',align:'center'}
        ]

    });
});

function editFormatter(value, row, index) {
    var result = '';
    result += '<div class="row">';
    var flag = hasPermission('purchase:purchaseapply:info');
    if (flag) {
        result += '<a href="#" onclick="vm.toGetInfo(' + row.purchaseApplyId + ')">详情</a>';
    }
    result += '</div>';
    return result;
}

function countFormatter(value, row, index) {
    if (value == null) {
        row.eachApplyQuantity = 1;
        // value = row.eachApplyQuantity;
    }
    return ['<div id="countEdit" class="input-group input-group-option quantity-wrapper">' +
    '<span  class="input-group-addon input-group-addon-remove quantity-remove btn">' +
    '<span class="glyphicon glyphicon-minus"></span>' +
    '</span>' +
    '<input  id="inp" type="text" value="' + row.eachApplyQuantity + '" name="option[]" class="form-control quantity-count" placeholder="1">' +
    '<span class="input-group-addon input-group-addon-remove quantity-add btn">' +
    '<span class="glyphicon glyphicon-plus"></span>' +
    '</span>' +
    '</div> '].join('');
}

window.operateEvents = {
    'click #removeGood': function (e, value, row, index) {
        var data = $("#commodityTab").bootstrapTable("getData");
        data.splice(index, 1)
        $("#commodityTab").bootstrapTable('load', data);
    },
    'click .quantity-add': function (e, value, row, index) {
        row.eachApplyQuantity = parseInt(row.eachApplyQuantity) + 1;
        $(e.currentTarget).parents('td').find("#inp").val(row.eachApplyQuantity);
        $("#commodityTab").bootstrapTable('updateRow', {index: index, row: row})
    },
    'click .quantity-remove': function (e, value, row, index) {
        if (row.eachApplyQuantity > 1) {
            row.eachApplyQuantity = parseInt(row.eachApplyQuantity) - 1;
            $(e.currentTarget).parents('td').find("#inp").val(row.eachApplyQuantity);
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
        purchaseApply: {},
        params: {
            purchaseApplyNo: '',
        },
//验证字段
        fields: {
            purchaseApplyNo: {
                message: '采购申请单号验证失败',
                validators: {
                    notEmpty: {
                        message: '采购申请单号不能为空'
                    },
                },
            }, applyId: {
                message: '采购申请人id验证失败',
                validators: {
                    notEmpty: {
                        message: '采购申请人id不能为空'
                    },
                },
            }, applyTime: {
                message: '申请日期验证失败',
                validators: {
                    notEmpty: {
                        message: '申请日期不能为空'
                    },
                },
            }, needTime: {
                message: '需求日期验证失败',
                validators: {
                    notEmpty: {
                        message: '需求日期不能为空'
                    },
                },
            }, totalPurchaseQuantity: {
                message: '申请采购的总数量验证失败',
                validators: {
                    notEmpty: {
                        message: '申请采购的总数量不能为空'
                    },
                },
            }, totalArrivedQuantity: {
                message: '总的已下达数量验证失败',
                validators: {
                    notEmpty: {
                        message: '总的已下达数量不能为空'
                    },
                },
            }, status: {
                message: '采购申请审核状态验证失败',
                validators: {
                    notEmpty: {
                        message: '采购申请审核状态不能为空'
                    },
                },
            }
        },
        userList:[],
        isbackshow: true
    },
    methods: {
        //获取用户集合
        getUserList: function (){
            var url;
            url = baseURL + 'sys/user/listAllByParams';
            $.get(url,function(r){
                if (r.code == 0){
                    var list = r.page.list;
                    var jsonStr = JSON.stringify(list);
                    jsonStr = jsonStr.replace(/username/g, 'label').replace(/userId/g, 'value');
                    vm.userList = JSON.parse(jsonStr);
                }
            });
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.purchaseApply = {};
        },
        update: function (purchaseApplyId) {
            var purchaseApplyId = getSelectedRowId("purchaseApplyId");
            if (purchaseApplyId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(purchaseApplyId)
        },
        //详情页
        toGetInfo: function (purchaseApplyId){
            if (purchaseApplyId == null) {
                return;
            }
            vm.showList = false;
            vm.isbackshow = false;
            vm.title = "详情";

            vm.getInfo(purchaseApplyId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.purchaseApply.purchaseApplyId == null ? "purchase/purchaseapply/save" : "purchase/purchaseapply/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.purchaseApply),
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
            var purchaseApplyIds = getSelectedRowsId("purchaseApplyId");
            if (purchaseApplyIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "purchase/purchaseapply/delete",
                    contentType: "application/json",
                    data: JSON.stringify(purchaseApplyIds),
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
        getInfo: function (purchaseApplyId) {
            $.get(baseURL + "purchase/purchaseapply/info/" + purchaseApplyId, function (r) {
                vm.purchaseApply = r.purchaseApply;
            });
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
            vm.purchaseApply.applyUser = val.find("option:selected").text()
        }
    },
    created: function(){
        //初始化
        this.getUserList();
    }
});