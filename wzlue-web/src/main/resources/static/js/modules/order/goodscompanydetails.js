$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'order/goodscompanydetails/list',
        columns: [
            {checkbox: true},
            {title: '商家公司id', field: 'companyId'},
            {title: '', field: 'companyName'},
            {title: '历史成交数量', field: 'transactionsCount'},
            {title: '毁约数量', field: 'renegeCount'},
            {title: '企业联系人id', field: 'companyContactsId'},
            {title: '企业联系人名称', field: 'companyContactsName'},
            {title: '企业联系人电话', field: 'companyContactsPhone'}
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
    data: {
        showList: true,
        title: null,
        goodsCompanyDetails: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            companyId: {
                message: '商家公司id验证失败',
                validators: {
                    notEmpty: {
                        message: '商家公司id不能为空'
                    },
                },
            }, companyName: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                },
            }, transactionsCount: {
                message: '历史成交数量验证失败',
                validators: {
                    notEmpty: {
                        message: '历史成交数量不能为空'
                    },
                },
            }, renegeCount: {
                message: '毁约数量验证失败',
                validators: {
                    notEmpty: {
                        message: '毁约数量不能为空'
                    },
                },
            }, companyContactsId: {
                message: '企业联系人id验证失败',
                validators: {
                    notEmpty: {
                        message: '企业联系人id不能为空'
                    },
                },
            }, companyContactsName: {
                message: '企业联系人名称验证失败',
                validators: {
                    notEmpty: {
                        message: '企业联系人名称不能为空'
                    },
                },
            }, companyContactsPhone: {
                message: '企业联系人电话验证失败',
                validators: {
                    notEmpty: {
                        message: '企业联系人电话不能为空'
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
            vm.goodsCompanyDetails = {};
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
            var url = vm.goodsCompanyDetails.id == null ? "order/goodscompanydetails/save" : "order/goodscompanydetails/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.goodsCompanyDetails),
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
                    url: baseURL + "order/goodscompanydetails/delete",
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
            $.get(baseURL + "order/goodscompanydetails/info/" + id, function (r) {
                vm.goodsCompanyDetails = r.goodsCompanyDetails;
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