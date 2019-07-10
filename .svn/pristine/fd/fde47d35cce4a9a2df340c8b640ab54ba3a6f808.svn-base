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
        serviceType: {},
        params: {
            serviceName: '',
        },
//验证字段
        fields: {
            serviceName: {
                message: '服务名称验证失败',
                validators: {
                    notEmpty: {
                        message: '服务名称不能为空'
                    },
                },
            }, updateTime: {
                message: '更新时间验证失败',
                validators: {
                    notEmpty: {
                        message: '更新时间不能为空'
                    },
                },
            }, createTime: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, delFlag: {
                message: '是否删除  -1：已删除  0：正常验证失败',
                validators: {
                    notEmpty: {
                        message: '是否删除  -1：已删除  0：正常不能为空'
                    },
                },
            }
        }
    },
    methods: {


        initTable: function () {

            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            //列表
            $("#table").BT({
                url: baseURL + 'company/servicetype/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("ServiceName"), field: 'serviceName'},
                    {title: vm.$t("UpdateTime"), field: 'updateTime'},
                    {title: vm.$t("CreationTime"), field: 'createTime'}
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
            vm.serviceType = {};
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
            var url = vm.serviceType.id == null ? "company/servicetype/save" : "company/servicetype/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.serviceType),
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
                    url: baseURL + "company/servicetype/delete",
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
            $.get(baseURL + "company/servicetype/info/" + id, function (r) {
                vm.serviceType = r.serviceType;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table").bootstrapTable("destroy");
            this.initTable();
        },
    },

});