$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'marketing/marketbidrecord/list',
        columns: [
            {checkbox: true},
            { title: '拍卖表id', field: 'auctionId'},
            { title: '最终出价', field: 'terminalPrice'},
            { title: '拍卖商品名称', field: 'commodityName'},
            { title: '公司(商家)id', field: 'companyId'},
            { title: '商家名称', field: 'companyName'},
            { title: '出价时间', field: 'bidTime'},
            { title: '状态 0:出局,1:得标', field: 'status'},
            // { title: '部门id', field: 'deptId'},
            // { title: '创建人(用户id)', field: 'createBy'},
            // { title: '授权用户id', field: 'authorizesId'},
            // { title: '创建时间', field: 'createDate'},
            // { title: '修改人', field: 'updateBy'},
            // { title: '修改时间', field: 'updateDate'},
            // { title: '删除标识 0：未删除 1：删除', field: 'delFlag'}
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
marketBidRecord: {},
params:{
    name:'',
},
//验证字段
fields :{
											auctionId : {
            message :'拍卖表id验证失败',
                validators: {
                notEmpty: {
                    message: '拍卖表id不能为空'
                },
            },
        }, 								terminalPrice : {
            message :'最终出价验证失败',
                validators: {
                notEmpty: {
                    message: '最终出价不能为空'
                },
            },
        }, 								commodityName : {
            message :'拍卖商品名称验证失败',
                validators: {
                notEmpty: {
                    message: '拍卖商品名称不能为空'
                },
            },
        }, 								companyId : {
            message :'公司(商家)id验证失败',
                validators: {
                notEmpty: {
                    message: '公司(商家)id不能为空'
                },
            },
        }, 								companyName : {
            message :'商家名称验证失败',
                validators: {
                notEmpty: {
                    message: '商家名称不能为空'
                },
            },
        }, 								bidTime : {
            message :'出价时间验证失败',
                validators: {
                notEmpty: {
                    message: '出价时间不能为空'
                },
            },
        }, 								status : {
            message :'状态 0:出局,1:得标验证失败',
                validators: {
                notEmpty: {
                    message: '状态 0:出局,1:得标不能为空'
                },
            },
        }, 								deptId : {
            message :'部门id验证失败',
                validators: {
                notEmpty: {
                    message: '部门id不能为空'
                },
            },
        }, 								createBy : {
            message :'创建人(用户id)验证失败',
                validators: {
                notEmpty: {
                    message: '创建人(用户id)不能为空'
                },
            },
        }, 								authorizesId : {
            message :'授权用户id验证失败',
                validators: {
                notEmpty: {
                    message: '授权用户id不能为空'
                },
            },
        }, 								createDate : {
            message :'创建时间验证失败',
                validators: {
                notEmpty: {
                    message: '创建时间不能为空'
                },
            },
        }, 								updateBy : {
            message :'修改人验证失败',
                validators: {
                notEmpty: {
                    message: '修改人不能为空'
                },
            },
        }, 								updateDate : {
            message :'修改时间验证失败',
                validators: {
                notEmpty: {
                    message: '修改时间不能为空'
                },
            },
        }, 								delFlag : {
            message :'删除标识 0：未删除 1：删除验证失败',
                validators: {
                notEmpty: {
                    message: '删除标识 0：未删除 1：删除不能为空'
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
        vm.marketBidRecord = {};
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
        var url = vm.marketBidRecord.id == null ? "marketing/marketbidrecord/save" : "marketing/marketbidrecord/update";
        $.ajax({
            type: "POST",
            url: baseURL + url,
            contentType: "application/json",
            data: JSON.stringify(vm.marketBidRecord),
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
                url: baseURL + "marketing/marketbidrecord/delete",
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
        $.get(baseURL + "marketing/marketbidrecord/info/"+id, function(r){
            vm.marketBidRecord = r.marketBidRecord;
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