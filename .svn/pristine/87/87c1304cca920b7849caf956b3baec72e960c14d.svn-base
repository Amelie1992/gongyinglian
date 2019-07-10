$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'order/goodsorderdetail/list',
        columns: [
            {checkbox: true},
																		                    { title: '', field: 'orderId'}, 
											                    { title: '货物编号', field: 'goodsNumber'}, 
											                    { title: '货物名称', field: 'goodsName'}, 
											                    { title: '单价', field: 'goodsPrice'}, 
											                    { title: '货物单位', field: 'goodsUnit'}, 
											                    { title: '币种', field: 'goodsCurrency'}, 
											                    { title: '货物总价', field: 'goodsTotalPrice'}, 
											                    { title: '货物略缩图', field: 'goodsImageUrl'}
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
goodsOrderDetail: {},
params:{
    name:'',
},
//验证字段
fields :{
											orderId : {
            message :'验证失败',
                validators: {
                notEmpty: {
                    message: '不能为空'
                },
            },
        }, 								goodsNumber : {
            message :'货物编号验证失败',
                validators: {
                notEmpty: {
                    message: '货物编号不能为空'
                },
            },
        }, 								goodsName : {
            message :'货物名称验证失败',
                validators: {
                notEmpty: {
                    message: '货物名称不能为空'
                },
            },
        }, 								goodsPrice : {
            message :'单价验证失败',
                validators: {
                notEmpty: {
                    message: '单价不能为空'
                },
            },
        }, 								goodsUnit : {
            message :'货物单位验证失败',
                validators: {
                notEmpty: {
                    message: '货物单位不能为空'
                },
            },
        }, 								goodsCurrency : {
            message :'币种验证失败',
                validators: {
                notEmpty: {
                    message: '币种不能为空'
                },
            },
        }, 								goodsTotalPrice : {
            message :'货物总价验证失败',
                validators: {
                notEmpty: {
                    message: '货物总价不能为空'
                },
            },
        }, 								goodsImageUrl : {
            message :'货物略缩图验证失败',
                validators: {
                notEmpty: {
                    message: '货物略缩图不能为空'
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
        vm.goodsOrderDetail = {};
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
        var url = vm.goodsOrderDetail.id == null ? "order/goodsorderdetail/save" : "order/goodsorderdetail/update";
        $.ajax({
            type: "POST",
            url: baseURL + url,
            contentType: "application/json",
            data: JSON.stringify(vm.goodsOrderDetail),
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
                url: baseURL + "order/goodsorderdetail/delete",
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
        $.get(baseURL + "order/goodsorderdetail/info/"+id, function(r){
            vm.goodsOrderDetail = r.goodsOrderDetail;
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