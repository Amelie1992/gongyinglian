$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'purchase/purchasereturn/list',
        columns: [
            {checkbox: true},
            {title: '采购退货单单号', field: 'purchaseReturnNo', align: 'center'},
            {title: '采购收货单', field: 'purchaseReceiveId', align: 'center'},
            {title: '供应商', field: 'supplyName', align: 'center'},
            {title: '采购员', field: 'buyerUser', align: 'center'},
            {title: '退货日期', field: 'retrunTime', align: 'center'},
            {title: '退货仓库', field: 'returnStorageId', align: 'center'},
            {title: '退货数量', field: 'totalReturnQuantity', align: 'center'},
            {title: '退货金额', field: 'totalReturnMoney', align: 'center'},
            {title: '退货原因(数据字典里面配置)', field: 'purchaseReturnReason', align: 'center'},
            {title: '订单状态 ', field: 'status', align: 'center'},
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
            {title: '已下达数量', field: 'eachArrivedQuantity', align: 'center'}
        ]
    });

});

function editFormatter(value, row, index) {
    var result = '';
    result += '<div class="row">';
    var flag = hasPermission('purchase:purchasereturn:info');
    if (flag) {
        result += '<a href="#" onclick="vm.toGetInfo(' + row.purchaseReturnId + ')">详情</a>';
    }
    result += '</div>';
    return result;
    // return ['<a id="btn_info" class="">详情</a>'].join('');
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
    '</div>'].join('');
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
        purchaseReturn: {},
        params: {
            purchaseReturnNo: '',
        },
        isbackshow: true,
        userList: [],
        supplyList: [],
        //验证字段
        fields: {
            purchaseReturnNo: {
                message: '采购退货单单号验证失败',
                validators: {
                    notEmpty: {
                        message: '采购退货单单号不能为空'
                    },
                },
            }, purchaseReturnReason: {
                message: '退货原因(数据字典里面配置)验证失败',
                validators: {
                    notEmpty: {
                        message: '退货原因(数据字典里面配置)不能为空'
                    },
                },
            }, purchaseReceiveId: {
                message: '采购收货单id验证失败',
                validators: {
                    notEmpty: {
                        message: '采购收货单id不能为空'
                    },
                },
            }, supplyId: {
                message: '供应商id验证失败',
                validators: {
                    notEmpty: {
                        message: '供应商id不能为空'
                    },
                },
            }, buyerId: {
                message: '采购员id验证失败',
                validators: {
                    notEmpty: {
                        message: '采购员id不能为空'
                    },
                },
            }, retrunTime: {
                message: '退货日期验证失败',
                validators: {
                    notEmpty: {
                        message: '退货日期不能为空'
                    },
                },
            }, returnStorageId: {
                message: '退货仓库验证失败',
                validators: {
                    notEmpty: {
                        message: '退货仓库不能为空'
                    },
                },
            }, totalReturnQuantity: {
                message: '退货数量验证失败',
                validators: {
                    notEmpty: {
                        message: '退货数量不能为空'
                    },
                },
            }, totalReturnMoney: {
                message: '退货金额验证失败',
                validators: {
                    notEmpty: {
                        message: '退货金额不能为空'
                    },
                },
            }, status: {
                message: '订单状态 验证失败',
                validators: {
                    notEmpty: {
                        message: '订单状态 不能为空'
                    },
                },
            }, createdBy: {
                message: '建档人id验证失败',
                validators: {
                    notEmpty: {
                        message: '建档人id不能为空'
                    },
                },
            }, createdTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, updateBy: {
                message: '更新人id验证失败',
                validators: {
                    notEmpty: {
                        message: '更新人id不能为空'
                    },
                },
            }, updateTime: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }, department: {
                message: '部门id验证失败',
                validators: {
                    notEmpty: {
                        message: '部门id不能为空'
                    },
                },
            }
        }
    },
    methods: {
        //初始化
        getData: function getData(){
            //获取供应商列表信息
            var url;
            url = baseURL + 'supplier/supplier/listAllName';
            $.get(url, function (r) {
                if (r.code == 0) {
                    var list = r.list;
                    var jsonStr = JSON.stringify(list);
                    jsonStr = jsonStr.replace(/name/g, 'label').replace(/id/g, 'value');
                    vm.supplyList = JSON.parse(jsonStr);
                }
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
        //用户下拉框选中事件
        userChanage: function (value, val) {
            vm.purchaseReturn.buyerUser = val.find("option:selected").text()
        },
        //供应商下拉框选择事件
        supplyChanage: function (value, val) {
            vm.purchaseReturn.supplyName = val.find("option:selected").text()
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.purchaseReturn = {};
        },
        update: function (event) {
            var purchaseReturnId = getSelectedRowId("purchaseReturnId");
            if (purchaseReturnId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(purchaseReturnId)
        },
        //详情页
        toGetInfo: function(purchaseReturnId){
            if (purchaseReturnId == null){
                return
            }
            vm.showList = false;
            vm.isbackshow = false;
            vm.title = "详情";

            vm.getInfo(purchaseReturnId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.purchaseReturn.purchaseReturnId == null ? "purchase/purchasereturn/save" : "purchase/purchasereturn/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.purchaseReturn),
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
            var purchaseReturnIds = getSelectedRowsId("purchaseReturnId");
            if (purchaseReturnIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "purchase/purchasereturn/delete",
                    contentType: "application/json",
                    data: JSON.stringify(purchaseReturnIds),
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
        getInfo: function (purchaseReturnId) {
            $.get(baseURL + "purchase/purchasereturn/info/" + purchaseReturnId, function (r) {
                vm.purchaseReturn = r.purchaseReturn;
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
    created: function(){
        //初始化
        this.getData();
        this.getUserIdList();
    }
});