$(function () {
    $("#table").BT({
        url: baseURL + 'sys/dict/list',
        columns: [
            {checkbox: true},
            { title: '字典名称1', field: 'name'},
            { title: '字典类型', field: 'type'},
            { title: '字典码', field: 'code'},
            { title: '字典值', field: 'value'},
            { title: '排序', field: 'orderNum'},
            { title: '备注', field: 'remark'}
        ],
        //条件查询
        queryParams:vm.params,
        search:true,
        onLoadSuccess:function (data) {

        }
    })
});

var vm = new Vue({
    el:'#rrapp',
    i18n,
    data:{
        showList: true,
        title: null,
        params:{
            name:'',
        },
        dict: {},
		open:false
    },
    methods: {
        query: function (data) {
            console.log(data)
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.dict = {};
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
        saveOrUpdate: function (event) {
            var url = vm.dict.id == null ? "sys/dict/save" : "sys/dict/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.dict),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(){
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
                    url: baseURL + "sys/dict/delete",
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
            $.get(baseURL + "sys/dict/info/"+id, function(r){
                vm.dict = r.dict;
                console.log(r.dict);
            });
        },
        reload: function (event) {
            vm.showList = true;
            //刷新 如需条件查询common.js
            $("#table").BTF5();
        }
    }
});