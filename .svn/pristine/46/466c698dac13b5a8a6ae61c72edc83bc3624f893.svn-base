$(function () {
    $("#table").BT({
        url: baseURL + 'supplier/suppliercategory/list',
        columns: [
            {checkbox: true},
            {title: '分类名称', field: 'name'},
            {title: '上级', field: 'parentName'},
            {title: '备注', field: 'ramarks'},
        ],
        //条件查询
        queryParams: vm.params
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        params: {
            name: '',
        },
        supplierCategory: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.supplierCategory = {};
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
        saveOrUpdate: function (event) {
            if (vm.validator()) {
                return;
            }
            var url = vm.supplierCategory.id == null ? "supplier/suppliercategory/save" : "supplier/suppliercategory/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.supplierCategory),
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
                    url: baseURL + "supplier/suppliercategory/delete",
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
            $.get(baseURL + "supplier/suppliercategory/info/" + id, function (r) {
                vm.supplierCategory = r.supplierCategory;
            });
        },
        reload: function (event) {
            vm.showList = true;
            //刷新 如需条件查询common.js
            $("#table").BTF5();
        },
        validator: function () {
            if (isBlank(vm.supplierCategory.name)) {
                alert("分类名称不能为空");
                return true;
            }
            if (isBlank(vm.supplierCategory.parentId)) {
                alert("上一级id不能为空");
                return true;
            }

        },
        getCategorys: function(){
            //加载菜单树
            $.get(baseURL + "supplier/suppliercategory/getAllList", function(r){
                ztree = $.fn.zTree.init($("#categoryTree"), setting, r.treeList);
                var node = ztree.getNodeByParam("id", vm.commodityCategory.parentId);
                if(node!=null || node!=undefined){
                    ztree.selectNode(node);
                    vm.supplierCategory.parentName = node.name;
                }
            })
        },
        categoryTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择分类",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#categoryLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    vm.supplierCategory.parentId = node[0].id;
                    vm.supplierCategory.parentName = node[0].name;
                    vm.supplierCategory.parentIds = node[0].parentIds+','+node[0].id;
                    layer.close(index);
                }
            });
        },
    }
});