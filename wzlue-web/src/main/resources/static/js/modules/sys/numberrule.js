$(function () {
    $("#table").BT({
        url: baseURL + 'sys/numberrule/list',
        columns: [
            {checkbox: true},
			{ title: '编号类型：', field: 'type'}, 			
			{ title: '规则名称', field: 'name'}, 			
			{ title: '前缀', field: 'prefix'}, 			
			{ title: '日期类型', field: 'timeType'}, 			
			{ title: '流水长度', field: 'length'}, 			
			{ title: '示例', field: 'sample'}, 			
			{ title: '状态', field: 'status'},
        ],
		//条件查询
        queryParams:vm.params
    });
});

var vm = new Vue({
	el:'#rrapp',
    i18n,
	data:{
		showList: true,
		title: null,
		params:{
            type:null,
		},
        dicts:[],
        baseURL:window.baseURL,
        hasPermission:window.hasPermission,
		numberRule: {}
	},
	methods: {
        getData:function () {
            //获取字典信息
            $.get(baseURL + 'sys/dict/getByType', { 'type': 'number_config' }, function (result) {
                if (result.code != 0) {
                    alert(result.msg);
                    return;
                }
                vm.dicts = result.dict;
            }, "json");
        },
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.numberRule = {};
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
			var url = vm.numberRule.id == null ? "sys/numberrule/save" : "sys/numberrule/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.numberRule),
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
				    url: baseURL + "sys/numberrule/delete",
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
			$.get(baseURL + "sys/numberrule/info/"+id, function(r){
                vm.numberRule = r.sysNumberRule;
            });
		},
		reload: function (event) {
			vm.showList = true;
			//刷新 如需条件查询common.js
			vm.numberRule={};
            $("#table").BTF5(vm.params);
		}
	},
    created: function created() {
        //初始化
        this.getData();
    },
    watch:{
        numberRule:{
            handler:function (val,oldVal) {
            	if(JSON.stringify(val) == '{}' || val ==null){
					return;
				}
                var num = '';
                //循环字符串
                var len=val.length;
                if(len>20){
					alert("不能超出20位");
                    len=20;
                    val.length=20;
				}
                for (var i = 0; i < len; i++) {
                    num += 0;
                }
                //数据格式化
                var timeType = val.timeType ? val.timeType.replace(/:/g, "").replace(/ /g, "").replace(/-/g, "") : "";
                var prefix = val.prefix || "";
                val.sample = prefix + timeType + num;
            },
            deep:true
		}
	}
});