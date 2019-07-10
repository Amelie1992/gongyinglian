var addEditor;
$(function () {
    $("#table").BT({
        url: baseURL + 'contract/contract/list',
        columns: [
            {checkbox: true},
			{ title: '平台编码', field: 'no'}, 			
			{ title: '商品编码', field: 'number'}, 			
			{ title: '商品名称', field: 'name'}, 			
			{ title: '商品图片', field: 'photo'}, 			
			{ title: '商品分类', field: 'categoryName'},
			{ title: '商品类型', field: 'typeName'},
			{ title: '商品产地', field: 'address'}, 			
			{ title: '商品价格', field: 'price'}, 			
			{ title: '商品规格', field: 'spe'}, 			
			{ title: '商品单位', field: 'unitName'}
        ],
		//条件查询
        queryParams:vm.params
    });
    addEditor = CKEDITOR.replace('editorByAdd', {
        language: 'zh-CN',//改成中文版
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
		commodity: {},
        commodityCategoryList:[],
        commodityTypes:[],
        addressList:[],
		unitList:[]
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.commodity = {};
			vm.getCategoryList();
            vm.initFileInput('file-pic');
		},
		update: function (event) {
           	var id = getSelectedRowId("id");
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            vm.getCategoryList();
            vm.getInfo(id);
		},
		saveOrUpdate: function (event) {
		    if(vm.validator()){
		        return;
            }
            vm.commodity.description=addEditor.getData();
			var url = vm.commodity.id == null ? "contract/contract/save" : "contract/contract/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.commodity),
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
				    url: baseURL + "contract/contract/delete",
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
			$.get(baseURL + "contract/contract/info/"+id, function(r){
                vm.commodity = r.commodity;
                vm.initFileInput('file-pic',"app/file/upload",r.commodity.photo);
                addEditor.setData(vm.commodity.description);
            });
		},
		reload: function (event) {
			vm.showList = true;
			//刷新 如需条件查询common.js
            $("#table").BTF5();
            addEditor.setData("");
		},
        getCategoryList: function(){
            $.get(baseURL + "contract/commoditycategory/getAllList", function(r){
                if(r.code==0){
                    vm.commodityCategoryList=r.commodityCategoryList
				}else{
                	alert(r.msg);
				}
            })
        },
        initFileInput :function initFileInput(ctrlName,uploadUrl,dataR) {
            var url = uploadUrl || baseURL+ "app/file/upload";
            var list = [];
            if (dataR!=null){
                for(var i= 0; i<dataR.length; i++){
                    var item = dataR[i];
                    list.push(item.picUrl);
                }
            }
            var control = $('#' + ctrlName);
            control.fileinput('destroy');  // 直接销毁
            control.fileinput({
                language: 'zh', //设置语言
                uploadUrl: url,  //上传地址
                showUpload: false, //是否显示上传按钮
                showRemove:false,
                dropZoneEnabled: false,
                showCaption: true,//是否显示标题
                allowedPreviewTypes: ['image'],
                allowedFileTypes: ['image'],
                allowedFileExtensions:  ['jpg', 'png'],
                maxFileSize : 10240,    //2000
                maxFileCount: 6,
                overwriteInitial: false, //不覆盖已存在的图片
                //下面几个就是初始化预览图片的配置
                initialPreviewAsData: true,
                initialPreviewFileType: 'image',
                //预览图片的设置
                initialPreview: list

            }).on("filebatchselected", function(event, files) {
                $(this).fileinput("upload");
            })
                .on("fileuploaded", function(event, data,id) {
                    $("#"+id+" img").attr("src",data.response.url).addClass("imgUrl");
                })
                .on("filesuccessremove",function (event,id,index) {
                    console.log("event:",event);
                    console.log("data: ",id);
                });
        },
        validator: function () {
            if(isBlank(vm.commodity.no)){
                alert("用户名不能为空");
                return true;
            }
        }
	},
	created:function () {
        //获取字典信息
        $.get(baseURL + 'sys/dict/getByType', { 'type': 'commodity_type' }, function (result) {
            if (result.code != 0) {
                alert(result.msg);
                return;
            }
            vm.commodityTypes = result.dict;
        }, "json");
        $.get(baseURL + 'sys/dict/getByType', { 'type': 'commodity_address' }, function (result) {
            if (result.code != 0) {
                alert(result.msg);
                return;
            }
            vm.addressList = result.dict;
        }, "json");
        $.get(baseURL + 'sys/dict/getByType', { 'type': 'commodity_unit' }, function (result) {
            if (result.code != 0) {
                alert(result.msg);
                return;
            }
            vm.unitList = result.dict;
        }, "json");
    }
});