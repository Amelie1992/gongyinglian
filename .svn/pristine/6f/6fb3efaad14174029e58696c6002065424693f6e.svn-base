$(function () {
    $("#table").BT({
        url: baseURL + 'supplier/supplierattachment/list',
        columns: [
            {checkbox: true},
			{ title: '供应商id', field: 'supplierId'}, 			
			{ title: '序号', field: 'no'}, 			
			{ title: '资质名称', field: 'aptitudeName'}, 			
			{ title: '证件名称', field: 'certificatesName'}, 			
			{ title: '证件有效日期', field: 'effectiveDate'}, 			
			{ title: '证件上传时间', field: 'uploadDate'}			
        ],
		//条件查询
        queryParams:vm.params
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		params:{
		    name:'',
		},
		supplierAttachment: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.supplierAttachment = {};
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
            if(vm.validator()){
                return ;
            }
			var url = vm.supplierAttachment.id == null ? "supplier/supplierattachment/save" : "supplier/supplierattachment/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.supplierAttachment),
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
				    url: baseURL + "supplier/supplierattachment/delete",
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
			$.get(baseURL + "supplier/supplierattachment/info/"+id, function(r){
                vm.supplierAttachment = r.supplierAttachment;
            });
		},
		reload: function (event) {
			vm.showList = true;
			//刷新 如需条件查询common.js
            $("#table").BTF5();
		},
        validator: function () {
			                if(isBlank(vm.supplierAttachment.id)){
                    alert("不能为空");
                    return true;
                }
			                if(isBlank(vm.supplierAttachment.supplierId)){
                    alert("供应商id不能为空");
                    return true;
                }
			                if(isBlank(vm.supplierAttachment.no)){
                    alert("序号不能为空");
                    return true;
                }
			                if(isBlank(vm.supplierAttachment.aptitudeName)){
                    alert("资质名称不能为空");
                    return true;
                }
			                if(isBlank(vm.supplierAttachment.certificatesName)){
                    alert("证件名称不能为空");
                    return true;
                }
			                if(isBlank(vm.supplierAttachment.effectiveDate)){
                    alert("证件有效日期不能为空");
                    return true;
                }
			                if(isBlank(vm.supplierAttachment.uploadDate)){
                    alert("证件上传时间不能为空");
                    return true;
                }
			
		}
	}
});