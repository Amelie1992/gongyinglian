$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'declare/agentofferbusiness/list',
        columns: [
            {checkbox: true},
            { title: '报盘id', field: 'offerId'},
            { title: '报盘业务服务', field: 'businessCode'}
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
    i18n,
    data:{
        showList: true,
        title: null,
        agentOfferBusiness: {},
        params:{
            name:'',
        },
//验证字段
        fields :{
            offerId : {
                message :'报盘id验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘id不能为空'
                    },
                },
            }, 								businessCode : {
                message :'报盘业务服务验证失败',
                validators: {
                    notEmpty: {
                        message: '报盘业务服务不能为空'
                    },
                },
            }			}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.agentOfferBusiness = {};
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
            var url = vm.agentOfferBusiness.id == null ? "declare/agentofferbusiness/save" : "declare/agentofferbusiness/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.agentOfferBusiness),
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
                    url: baseURL + "declare/agentofferbusiness/delete",
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
            $.get(baseURL + "declare/agentofferbusiness/info/"+id, function(r){
                vm.agentOfferBusiness = r.agentOfferBusiness;
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