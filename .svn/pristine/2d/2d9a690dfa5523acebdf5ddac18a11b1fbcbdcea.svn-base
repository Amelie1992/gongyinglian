$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'huanxin/ipbrowser/list',
        columns: [
            // {checkbox: true},
            {title: 'ip', field: 'ip'},
            {title: '城市', field: 'cityname'},
            {title: '浏览器', field: 'browser'}
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
        ipBrowser: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            ip: {
                message: 'ip验证失败',
                validators: {
                    notEmpty: {
                        message: 'ip不能为空'
                    },
                },
            }, cityname: {
                message: '城市验证失败',
                validators: {
                    notEmpty: {
                        message: '城市不能为空'
                    },
                },
            }, browser: {
                message: '浏览器验证失败',
                validators: {
                    notEmpty: {
                        message: '浏览器不能为空'
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
            vm.ipBrowser = {};
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
            var url = vm.ipBrowser.id == null ? "huanxin/ipbrowser/save" : "huanxin/ipbrowser/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.ipBrowser),
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
                    url: baseURL + "huanxin/ipbrowser/delete",
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
            $.get(baseURL + "huanxin/ipbrowser/info/" + id, function (r) {
                vm.ipBrowser = r.ipBrowser;
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