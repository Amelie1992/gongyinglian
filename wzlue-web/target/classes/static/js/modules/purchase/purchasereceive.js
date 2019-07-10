$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'purchase/purchasereceive/list',
        columns: [
            {checkbox: true},
            {title: '采购收货单号', field: 'purchaseReceiveNo',align:'center'},
            {title: '来源单号', field: 'sourceSingleNo',align:'center'},
            {title: '订单状态 ', field: 'status',align:'center'},
            {title: '收货日期', field: 'receiveDate',align:'center'},
            {title: '暂存仓库', field: 'temporaryStorage',align:'center'},
            {title: '采购金额', field: 'purchaseAmount',align:'center'},
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
    var flag = hasPermission('purchase:purchasereceive:info');
    if (flag) {
        result += '<a href="#" onclick="vm.toGetInfo(' + row.purchaseReceiveId + ')">详情</a>';
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
        purchaseReceive: {},
        params: {
            purchaseReceiveNo: '',
        },
        isbackshow: true,
        userList: [],
        //验证字段
        fields: {
            purchaseReceiveNo: {
                message: '采购收货单号验证失败',
                validators: {
                    notEmpty: {
                        message: '采购收货单号不能为空'
                    },
                },
            }, sourceSingleNo: {
                message: '来源单号验证失败',
                validators: {
                    notEmpty: {
                        message: '来源单号不能为空'
                    },
                },
            }, status: {
                message: '订单状态 验证失败',
                validators: {
                    notEmpty: {
                        message: '订单状态 不能为空'
                    },
                },
            }, receiveDate: {
                message: '收货日期验证失败',
                validators: {
                    notEmpty: {
                        message: '收货日期不能为空'
                    },
                },
            }, temporaryStorage: {
                message: '暂存仓库验证失败',
                validators: {
                    notEmpty: {
                        message: '暂存仓库不能为空'
                    },
                },
            }, purchaseAmount: {
                message: '采购金额验证失败',
                validators: {
                    notEmpty: {
                        message: '采购金额不能为空'
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
            }, creatDate: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, updateDate: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }, shouldDate: {
                message: '应到日期验证失败',
                validators: {
                    notEmpty: {
                        message: '应到日期不能为空'
                    },
                },
            }, creatBy: {
                message: '创建人验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人不能为空'
                    },
                },
            }, creatByDepartment: {
                message: '创建人部门验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人部门不能为空'
                    },
                },
            }, updateBy: {
                message: '修改人Id验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人Id不能为空'
                    },
                },
            }, updateByDepartment: {
                message: '修改人部门验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人部门不能为空'
                    },
                },
            }
        }
    },
    methods: {
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
            vm.purchaseReceive.buyerUser = val.find("option:selected").text()
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.purchaseReceive = {};
        },
        update: function (event) {
            var purchaseReceiveId = getSelectedRowId("purchaseReceiveId");
            if (purchaseReceiveId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(purchaseReceiveId)
        },
        //详情页
        toGetInfo: function(purchaseReceiveId){
            if(purchaseReceiveId == null){
                return
            }
            vm.showList = false;
            vm.isbackshow = false;
            vm.title = "详情";

            vm.getInfo(purchaseReceiveId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.purchaseReceive.purchaseReceiveId == null ? "purchase/purchasereceive/save" : "purchase/purchasereceive/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.purchaseReceive),
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
            var purchaseReceiveIds = getSelectedRowsId("purchaseReceiveId");
            if (purchaseReceiveIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "purchase/purchasereceive/delete",
                    contentType: "application/json",
                    data: JSON.stringify(purchaseReceiveIds),
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
        getInfo: function (purchaseReceiveId) {
            $.get(baseURL + "purchase/purchasereceive/info/" + purchaseReceiveId, function (r) {
                vm.purchaseReceive = r.purchaseReceive;
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
        this.getUserIdList();
    }
});