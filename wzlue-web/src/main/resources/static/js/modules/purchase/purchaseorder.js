$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'purchase/purchaseorder/list',
        columns: [
            {checkbox: true},
            {title: '采购订单单号', field: 'purchaseOrderNo',align:'center'},
            {title: '下单日期', field: 'orderTime',align:'center'},
            {title: '到货日期', field: 'arriveTime',align:'center'},
            {title: '供应商', field: 'supplyId',align:'center'},
            {title: '采购员', field: 'buyerUser',align:'center'},
            {title: '申请采购的总金额', field: 'totalPurchaseMoney',align:'center'},
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

    });

    //商品信息
    $("#commodityTab").BT({
        columns: [
            {checkbox: true},
            {title: '产品编码', field: 'productNo',align:'center'},
            {title: '产品名称', field: 'productName',align:'center'},
            {title: '供应商', field: 'supplyName',align:'center'},
            {title: '规格', field: 'productSize',align:'center'},
            {title: '单位', field: 'unit',align:'center'},
            {title: '单价(元)', field: 'currentInventory',align:'center'},
            {title: '申请数量', field: 'eachApplyQuantity',align:'center'},
            {title: '采购数量', field: 'eachPurchaseQuantity',align:'center', formatter: countFormatter,
                events: operateEvents,
                width: '10%'},
            {title: '税率', field: 'taxRate',align:'center'},
            {title: '含税价(元)', field: 'taxPaid',align:'center'},
            {title: '总金额', field: 'totalPurchaseMoney',align:'center'},
            {title: '到货日期', field: 'arriveTime',align:'center'},
            {title: '已收数量', field: 'totalReceiveQuantity',align:'center'}
        ]

    });
});

function countFormatter(value, row, index) {
    if (value == null) {
        row.eachPurchaseQuantity = 1;
        // value = row.eachApplyQuantity;
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
function editFormatter(value, row, index) {
    var result = '';
    result += '<div class="row">';
    var flag = hasPermission('purchase:purchaseorder:info');
    if (flag) {
        result += '<a href="#" onclick="vm.toGetInfo(' + row.purchaseOrderId + ')">详情</a>';
    }
    result += '</div>';
    return result;
    // return ['<a id="btn_info" class="">详情</a>'].join('');
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
        purchaseOrder: {},
        params: {
            purchaseOrderNo: '',
        },
        userList:[],
        isbackshow: true,
        //验证字段
        fields: {
            purchaseOrderNo: {
                message: '采购订单单号验证失败',
                validators: {
                    notEmpty: {
                        message: '采购订单单号不能为空'
                    },
                },
            }, orderTime: {
                message: '下单日期验证失败',
                validators: {
                    notEmpty: {
                        message: '下单日期不能为空'
                    },
                },
            }, arriveTime: {
                message: '到货日期验证失败',
                validators: {
                    notEmpty: {
                        message: '到货日期不能为空'
                    },
                },
            }, supplyId: {
                message: '供应商Id验证失败',
                validators: {
                    notEmpty: {
                        message: '供应商Id不能为空'
                    },
                },
            }, buyerId: {
                message: '采购员id验证失败',
                validators: {
                    notEmpty: {
                        message: '采购员id不能为空'
                    },
                },
            }, totalPurchaseMoney: {
                message: '申请采购的总金额验证失败',
                validators: {
                    notEmpty: {
                        message: '申请采购的总金额不能为空'
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
        }
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
        //用户下拉框选中事件
        userChanage: function (value, val) {
            vm.purchaseOrder.buyerUser = val.find("option:selected").text()
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.purchaseOrder = {};
        },
        update: function (purchaseOrderId) {
            var purchaseOrderId = getSelectedRowId("purchaseOrderId");
            if (purchaseOrderId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(purchaseOrderId)
        },
        //详情页
        toGetInfo: function (purchaseOrderId){
            if (purchaseOrderId == null) {
                return;
            }
            vm.showList = false;
            vm.isbackshow = false;
            vm.title = "详情";

            vm.getInfo(purchaseOrderId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.purchaseOrder.purchaseOrderId == null ? "purchase/purchaseorder/save" : "purchase/purchaseorder/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.purchaseOrder),
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
            var purchaseOrderIds = getSelectedRowsId("purchaseOrderId");
            if (purchaseOrderIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "purchase/purchaseorder/delete",
                    contentType: "application/json",
                    data: JSON.stringify(purchaseOrderIds),
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
        getInfo: function (purchaseOrderId) {
            $.get(baseURL + "purchase/purchaseorder/info/" + purchaseOrderId, function (r) {
                vm.purchaseOrder = r.purchaseOrder;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.isbackshow = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    },
    created:function(){
        //初始化
        this.getUserList();
    }
});