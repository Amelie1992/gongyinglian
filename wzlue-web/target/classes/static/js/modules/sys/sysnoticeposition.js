$(function () {
    vm.initTable();

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
        sysNoticePosition: {},
        params: {
            name: '',
        },
//验证字段
        fields: {
            name: {
                message: '位置名称验证失败',
                validators: {
                    notEmpty: {
                        message: '位置名称不能为空'
                    },
                },
            }
        }
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").BT({
                url: baseURL + 'sys/sysnoticeposition/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("LocationName"), field: 'name'},
                    {title: vm.$t("Remarks"), field: 'remarks'},
                    {title: vm.$t("Founder"), field: 'createByName'},
                    {title: vm.$t("CreationTime"), field: 'createTime'},
                ],
                //条件查询
                queryParams: vm.params
            });
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.sysNoticePosition = {};
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
            var url = vm.sysNoticePosition.id == null ? "sys/sysnoticeposition/save" : "sys/sysnoticeposition/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.sysNoticePosition),
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
                    url: baseURL + "sys/sysnoticeposition/delete",
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
            $.get(baseURL + "sys/sysnoticeposition/info/" + id, function (r) {
                vm.sysNoticePosition = r.sysNoticePosition;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").bootstrapTable("destroy")
            vm.initTable();
            //$("#table").BTF5(vm.params);
            $("form").RF();
        }
    },
    watch: {
        '$i18n.locale': function (value) {
            $("#table").bootstrapTable("destroy")
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            this.initTable();
        }
    }
});