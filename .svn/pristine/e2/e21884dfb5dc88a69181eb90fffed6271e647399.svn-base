$(function () {

    vm.initTable();

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
grade: {},
params:{
    name:'',
},
//验证字段
fields :{
											gradeLevel : {
            message :'等级级别验证失败',
                validators: {
                notEmpty: {
                    message: '等级级别不能为空'
                },
            },
        }, 								gradeName : {
            message :'等级名称验证失败',
                validators: {
                notEmpty: {
                    message: '等级名称不能为空'
                },
            },
        }, 								quota : {
            message :'额度验证失败',
                validators: {
                notEmpty: {
                    message: '额度不能为空'
                },
            },
        }, 								remark : {
            message :'备注验证失败',
                validators: {
                notEmpty: {
                    message: '备注不能为空'
                },
            },
        }			}
},
methods: {

    initTable: function () {

        //列表
        $("#table").bootstrapTable("destroy");     //**********对于查询必不可少

        //列表
        $("#table").BT({
            url: baseURL + 'grade/grade/list',
            columns: [
                {checkbox: true},
                { title: vm.$t("RankLevel"), field: 'gradeLevel'},
                { title: vm.$t("RankName"), field: 'gradeName'},
                { title: vm.$t("Quota"), field: 'quota'},
                { title: vm.$t("Remarks"), field: 'remark'}
            ],
            //条件查询
            queryParams:vm.params
        });

    },


    query: function () {
        vm.reload();
    },
    add: function(){
        vm.showList = false;
        vm.title = "新增";
        vm.grade = {};
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
        var url = vm.grade.id == null ? "grade/grade/save" : "grade/grade/update";
        $.ajax({
            type: "POST",
            url: baseURL + url,
            contentType: "application/json",
            data: JSON.stringify(vm.grade),
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
                url: baseURL + "grade/grade/delete",
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
        $.get(baseURL + "grade/grade/info/"+id, function(r){
            vm.grade = r.grade;
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