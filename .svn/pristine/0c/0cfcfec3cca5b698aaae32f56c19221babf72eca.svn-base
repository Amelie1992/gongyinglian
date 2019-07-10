$(function () {
    $("#table").BT({
        url: baseURL + 'contract/commoditycategory/list',
        columns: [
            {checkbox: true},
			{ title: '商户id', field: 'businessId'}, 			
			{ title: '分类名称', field: 'name'}, 			
			{ title: '级别', field: 'level'}, 			
			{ title: '上一级', field: 'parentName'},
			{ title: '状态', field: 'state',formatter:function (index,item) {
				if(item.state==0||item.state=='0'){
					return "启用";
				}else if(item.state==1||item.state=='1'){
                    return "停用";
                }else{
                    return "-";
				}
            }}
        ],
		//条件查询
        queryParams:vm.params
    });
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })
});
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		params:{
		    name:'',
            type:0,
            createType:1
		},
		commodityCategory: {
            name:null,
            level:1,
            parentId:0,
            parentName:null,
            parentIds:'0',
            state:0,
            type:0,
            createType:1
        },
        //验证字段
        fields: {
            name: {
                message: '分类名称验证失败',
                validators: {
                    notEmpty: {
                        message: '分类名称不能为空'
                    },
                    remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}
                        url:baseURL+ 'contract/commoditycategory/check',//验证地址
                        message: '用户已存在',//提示消息
                        delay :  2000,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                        type: 'POST',//请求方式
                        data: function(validator) {
                            return {
                                name: $('#name').val(),
                                id: $('#id').val()
                            };
                        }
                    },
                },
            }
        }
	},
	methods: {
		query: function (id) {
            if(id!=null&&id!=undefined){
                vm.params.parentId=id;
            }
			vm.reload();
		},
		add: function(id){
			vm.showList = false;
			vm.title = "新增";
			vm.commodityCategory = {
				name:null,
                level:1,
                parentId:0,
				parentName:null,
				parentIds:'0',
                state:0,
                type:0,
                createType:1
			};
			if(id!=null&&id!=undefined){
			    vm.commodityCategory.parentId=id;
            }
            vm.getCategorys();
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
		saveOrUpdate: function () {
            var url = vm.commodityCategory.id == null ? "contract/commoditycategory/save" : "contract/commoditycategory/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.commodityCategory),
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
				    url: baseURL + "contract/commoditycategory/delete",
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
			$.get(baseURL + "contract/commoditycategory/info/"+id, function(r){
                vm.commodityCategory = r.commodityCategory;
                vm.getCategorys();
            });
		},
		reload: function (event) {
			vm.showList = true;
            vm.commodityCategory={};
			//刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $('form').RF();
		},
        getCategorys: function(){
            //加载菜单树
            $.get(baseURL + "contract/commoditycategory/getAllList",{type:0,createType:1}, function(r){
                ztree = $.fn.zTree.init($("#categoryTree"), setting, r.commodityCategoryList);
                var node = ztree.getNodeByParam("id", vm.commodityCategory.parentId);
                if(node!=null || node!=undefined){
                    ztree.selectNode(node);
                    vm.commodityCategory.parentName = node.name;
                    if(vm.commodityCategory.id==undefined||vm.commodityCategory.id==null){
                        vm.commodityCategory.level = parseInt(node.level)+2;
                    }
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
                    vm.commodityCategory.parentId = node[0].id;
                    vm.commodityCategory.parentName = node[0].name;
                    vm.commodityCategory.parentIds = node[0].parentIds+','+node[0].id;
                    vm.commodityCategory.level = parseInt(node[0].level)+2;

                    layer.close(index);
                }
            });
        },
        updateStatus:function () {
            var selectedRow = getSelectedRow();
            if(selectedRow==undefined||selectedRow==null){
                return;
            }
            var text="";
            if(selectedRow.state==0){
                selectedRow.state=1;
                text="确定修改为停用状态吗？";
            }else{
                selectedRow.state=0;
                text="确定修改为启用状态吗？";
            }
            confirm(text, function(){
                $.ajax({
                    type: "POST",
                    url: baseURL +  "contract/commoditycategory/update",
                    contentType: "application/json",
                    data: JSON.stringify(selectedRow),
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
            });
        }
	}
});