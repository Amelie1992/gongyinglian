$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'marketing/markettenderrecord/list',
        columns: [
            {checkbox: true},
            {title: '招标表id', field: 'marketTenderId'},
            {title: '联系人', field: 'contact'},
            {title: '联系电话', field: 'telephone'},
            {title: '报价', field: 'price'},
            {title: '公司id', field: 'companyId'},
            {title: '竞标商家', field: 'companyName'},
            {title: '部门id', field: 'deptId'},
            {title: '创建人(用户id)', field: 'createBy'},
            {title: '授权用户id', field: 'authorizesId'},
            {title: '竞标时间', field: 'createDate'},
            {title: '修改人', field: 'updateBy'},
            {title: '修改时间', field: 'updateDate'},
            {title: '删除标识 0：未删除 1：删除', field: 'delFlag'}
        ],
        //条件查询
        queryParams: vm.params
    });
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
        marketTenderRecord: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            marketTenderId: {
                message: '招标表id验证失败',
                validators: {
                    notEmpty: {
                        message: '招标表id不能为空'
                    },
                },
            }, contact: {
                message: '联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    },
                },
            }, telephone: {
                message: '联系电话验证失败',
                validators: {
                    notEmpty: {
                        message: '联系电话不能为空'
                    },
                },
            }, price: {
                message: '报价验证失败',
                validators: {
                    notEmpty: {
                        message: '报价不能为空'
                    },
                },
            }, companyId: {
                message: '公司id验证失败',
                validators: {
                    notEmpty: {
                        message: '公司id不能为空'
                    },
                },
            }, companyName: {
                message: '竞标商家验证失败',
                validators: {
                    notEmpty: {
                        message: '竞标商家不能为空'
                    },
                },
            }, deptId: {
                message: '部门id验证失败',
                validators: {
                    notEmpty: {
                        message: '部门id不能为空'
                    },
                },
            }, createBy: {
                message: '创建人(用户id)验证失败',
                validators: {
                    notEmpty: {
                        message: '创建人(用户id)不能为空'
                    },
                },
            }, authorizesId: {
                message: '授权用户id验证失败',
                validators: {
                    notEmpty: {
                        message: '授权用户id不能为空'
                    },
                },
            }, createDate: {
                message: '竞标时间验证失败',
                validators: {
                    notEmpty: {
                        message: '竞标时间不能为空'
                    },
                },
            }, updateBy: {
                message: '修改人验证失败',
                validators: {
                    notEmpty: {
                        message: '修改人不能为空'
                    },
                },
            }, updateDate: {
                message: '修改时间验证失败',
                validators: {
                    notEmpty: {
                        message: '修改时间不能为空'
                    },
                },
            }, delFlag: {
                message: '删除标识 0：未删除 1：删除验证失败',
                validators: {
                    notEmpty: {
                        message: '删除标识 0：未删除 1：删除不能为空'
                    },
                },
            }
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.marketTenderRecord = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
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
            var url = vm.marketTenderRecord.id == null ? "marketing/markettenderrecord/save" : "marketing/markettenderrecord/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.marketTenderRecord),
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
                    url: baseURL + "marketing/markettenderrecord/delete",
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
            $.get(baseURL + "marketing/markettenderrecord/info/" + id, function (r) {
                vm.marketTenderRecord = r.marketTenderRecord;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    }
});