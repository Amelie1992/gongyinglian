$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'agreement/agreement/list',
        columns: [
            {checkbox: true},
            {title: '', field: 'xieyiType'},
            {title: '', field: 'xieyiContent'}
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
        agreeMent: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            xieyiType: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                },
            }, xieyiContent: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '不能为空'
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
            vm.agreeMent = {};
        },
        update: function (event) {
            var xieyiId = getSelectedRowId("xieyiId");
            if (xieyiId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(xieyiId)
        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.agreeMent.xieyiId == null ? "agreement/agreement/save" : "agreement/agreement/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.agreeMent),
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
            var xieyiIds = getSelectedRowsId("xieyiId");
            if (xieyiIds == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "agreement/agreement/delete",
                    contentType: "application/json",
                    data: JSON.stringify(xieyiIds),
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
        getInfo: function (xieyiId) {
            $.get(baseURL + "agreement/agreement/info/" + xieyiId, function (r) {
                vm.agreeMent = r.agreeMent;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },

    },


});