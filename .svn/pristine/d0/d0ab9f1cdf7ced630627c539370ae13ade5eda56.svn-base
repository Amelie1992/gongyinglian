$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'supplier/iteminfoapply/list',
        columns: [
            {checkbox: true},
            { title: '商品名称', field: 'itemName'},
            { title: '厂号', field: 'factoryNo'},
            { title: '计价方式', field: 'pricingMethod'},
            { title: '审核状态 1.待审核 2.审核通过 3.审核未通过', field: 'pendingStatus'},
            { title: '权限部门id', field: 'deptId'},
            { title: '创建人', field: 'createdBy'},
            { title: '创建时间', field: 'createdTime'},
            { title: '修改人', field: 'updatedBy'},
            { title: '修改时间', field: 'updatedTime'}
        ],
        //条件查询
        queryParams:vm.params
    });
    //表单提交
    $("form").FM({
        fields : vm.fields,
        success : vm.saveOrUpdate

    })

});

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        title: null,
        itemInfoApply: {},
        params:{
            name:'',
        },
        //验证字段
        fields :{
            itemName : {
                message :'商品名称验证失败',
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    },
                },
            },
            factoryNo : {
                message :'厂号验证失败',
                validators: {
                    notEmpty: {
                        message: '厂号不能为空'
                    },
                },
            },
            pricingMethod : {
                message :'计价方式验证失败',
                validators: {
                    notEmpty: {
                        message: '计价方式不能为空'
                    },
                },
            },
        },
        methods: {
            query: function () {
                vm.reload();
            },
            add: function(){
                vm.showList = false;
                vm.title = "新增";
                vm.itemInfoApply = {};
            },
            update: function (event) {
                var id = getSelectedRowId("id");
                if(id == null){
                    return ;
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
                var url = vm.itemInfoApply.id == null ? "supplier/iteminfoapply/save" : "supplier/iteminfoapply/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.itemInfoApply),
                    success: function(r){
                        if(r.code === 0){
                            alert('操作成功', function(index){
                                vm.reload();
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            },
            del: function (event) {
                var ids = getSelectedRowsId("id");
                if(ids == null){
                    return ;
                }

                confirm('确定要删除选中的记录？', function(){
                    $.ajax({
                        type: "POST",
                        url: baseURL + "supplier/iteminfoapply/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function(r){
                            if(r.code == 0){
                                alert('操作成功', function(index){
                                    vm.reload();
                                });
                            }else{
                                alert(r.msg);
                            }
                        }
                    });
                });
            },
            getInfo: function(id){
                $.get(baseURL + "supplier/iteminfoapply/info/"+id, function(r){
                    vm.itemInfoApply = r.itemInfoApply;
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