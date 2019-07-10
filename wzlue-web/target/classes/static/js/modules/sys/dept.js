var allDeptList;
$(function () {
    var deptFormFields = {
        classname: {
            validators: {
                notEmpty: {
                    message: '请输分级名称'
                },stringLength:{min:1,max:20,message:'长度小于20'}
            }
        }, department: {
            validators: {
                notEmpty: {
                    message: '请选择分级类型'
                }
            }
        }, parentName: {
            validators: {
                notEmpty: {
                    message: '请输入上级名称'
                }
            }
        }, orderNum: {
            validators: {
                notEmpty: {
                    message: '请输入排序号'
                },regexp:{
                    regexp:/^[0-9]*$ /,
                    message:"请输入正确的数字"
                },stringLength:{min:1,max:8,message:"长度小于8"}
            }
        }
    };
    var addMenuFields = {
        menuname: {
            validators: {
                notEmpty: {
                    message: '请输入 分级名称'
                }
            }
        },
        menudepty: {
            validators: {
                notEmpty: {
                    message: '请输入 分级类型'
                }
            }
        },
        menuorderNum: {
            validators: {
                notEmpty: {
                    message: '请输入 排序'
                }
            }
        }
    };

    $("#deptForm").FM({'fields': deptFormFields, "success": vm.update});
    $("#addMenu").FM({'fields': deptFormFields, "success": vm.save});

    var str = '<option value="0">顶级</option>';
    $.ajax({
        url:baseURL + "sys/sysdept/deptList/",
        type:'get',
        success:function(data){
            console.log(data.treeList);
            var dataList = data.treeList;
            nodeSelect(dataList,str);
           // $("#updateDept").append(str);
        }
    })
});

/*function getNodeList(){
    var str = '<option value="0">顶级</option>';
    $.ajax({
        url:baseURL + "sys/sysdept/deptList/",
        type:'get',
        success:function(data){
            console.log(data.treeList);
            var dataList = data.treeList;
            nodeSelect(dataList,str);
        }
    })
}*/

function nodeSelect(dataList,str){
    var line = '&nbsp;&nbsp;&nbsp;';
    for(var i = 0; i < dataList.length; i++){
        str += '<option value="'+dataList[i].id+'">'+line+dataList[i].text+'</option>';
        if(dataList[i].nodes != null){
            //line = '&nbsp;';
           str = getChild(dataList[i].nodes,str,line);
        }
    }
    $("#updateDept").append(str);
    $("#addDept").append(str);
   // console.log(str);
}

function getChild(dataList,str,line){
    line += '&nbsp;&nbsp;&nbsp;';
    for(var i = 0; i < dataList.length; i++){
        str += '<option value="'+dataList[i].id+'">'+line+dataList[i].text+'</option>';
        if(dataList[i].nodes != null){
           // line = '&nbsp;';
            str = getChild(dataList[i].nodes,str,line);
        }
    }
    return str;
}


var vm = new Vue({
        el: '#rrapp',
        i18n,
        data: {
            showList: true,
            title: null,
            menu: { //菜单
                parentName: null,
                parentId: [],
                deptType: 0,
                newParentId: []
            },
            rules: {
                orderNum: [{required: true, message: '请输入排序号', trigger: 'blur'}, {
                    pattern: /^\+?[1-9]\d*$/,
                    message: '只能输入正整数'
                }]
            },
            deptList: [], //组织架构List
            defaultProps: { //tree 参数---》规则
                children: 'list', //子集（tree插件---后台返回的数据名字）
                label: 'name' //显示的名称（tree插件---后台返回的数据名字）
            },
            props: { // Cascader 级联选择器  参数---》规则
                value: 'id',
                children: 'list',
                label: 'name'
            },
            i: 0, //多选 变为 单选 中间值
            newNode: {}, //节点详情
            checkedDeptId: null, //选中的组织架构id,
            dialogVisible: false,
            isDelete: true,
            parentName:''
        },
        methods: {
            getData: function getData() {
                $.get(baseURL + "sys/sysdept/deptList/", function (r) {
                    var a = r.treeList;
                    vm.deptList = [{
                        id: 0,
                        nodes: a,
                        text: '顶级',
                        node: {name: '顶级', deptType: '1', parentName: null, createDate: null, updateDate: null}
                    }];

                    $('#tree').treeview({
                        data: vm.deptList, onNodeSelected: function (event, data) {
                           // if (data.node.parentId != 0)
                                vm.reloadTree(data);
                        }
                    });

                });
            },
            add: function add() {
                // vm.showList = false;
                vm.dialogVisible = true;
                vm.title = "新增";
                vm.checkedDeptId = null;
            },
            del: function del(menu) {
                if (vm.checkedDeptId == false) {
                    return;
                } else if (vm.checkedDeptId == null) {
                    alert("请选择一条记录");
                    return;
                }
                if(vm.isDelete == false){
                    alert("请先删除子集元素！");
                    return;
                }
               /* var newNode = vm.$refs.tree.getCurrentNode();
                if (newNode.list != null) {
                    vm.$message.error("请先删除子集元素！");
                    return;
                }*/
                confirm('确定要删除选中的记录？', function () {
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sys/sysdept/delete",
                        data: JSON.stringify(vm.checkedDeptId),
                        success: function success(r) {
                            if (r.code === 0) {
                                alert('操作成功', function () {
                                    vm.reload(menu);
                                });
                                vm.getData();
                                vm.newNode = {};
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                });
            },
            save: function saveOrUpdate(menu) {
                // var newParentId1 = vm.menu.newParentId[vm.menu.newParentId.length - 1];
                vm.menu.parentId = $('#addDept option:selected').attr('value');
                var url = "sys/sysdept/save";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.menu),
                    success: function success(r) {
                        if (r.code === 0) {
                            vm.dialogVisible = false;
                            // vm.menu = {parentName: null, parentId: [],type: 1,deptType: ''};
                            alert('操作成功', function () {
                                vm.reload(menu);
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            },
            update: function saveOrUpdate(newNode) {
                //修改 父级的id

                var url = "sys/sysdept/update";
                //vm.newNode.parentId= $('#updateDept').selectpicker('val');
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.newNode),
                    success: function success(r) {
                        if (r.code === 0) {
                            var selectNode = $('#tree').treeview('getSelected')
                            $('#tree').treeview('updateNode', [selectNode, {text: vm.newNode.name}]);
                            alert('操作成功');
                            vm.reload();
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            },
            validFromSuccess: function (el) {
                var bl = $('#' + el + '').VF();//启用验证
                if (!bl) {
                    return;
                }
            },
            //返回
            reload: function reload(event) {
                // vm.$refs[event].resetFields();
                // vm.dialogVisible = false;
                // vm.$refs.tree.setCheckedKeys([]);
                // if (event == 'menu')
                //     vm.menu = {};
                // else
                //     vm.newNode = {};
                // vm.checkedDeptId = null;
                $('#myModal').modal('hide');
                this.getData();
            },

            //使 多选 变为 单选
            handleClick: function handleClick(data, checked, node) {
                vm.i++;
                if (vm.i % 2 == 0) {
                    if (checked) {
                        vm.$refs.tree.setCheckedNodes([]);
                        vm.$refs.tree.setCheckedNodes([data]);
                        //交叉点击节点
                    } else {
                        vm.$refs.tree.setCheckedNodes([]);
                        //点击已经选中的节点，置空
                    }
                }
            },

            //获取树 的deptId
            getCheckedKeys: function getCheckedKeys(selected) {
                // var id = vm.$refs.tree.getCurrentKey();
                if (selected.length == 0) {
                    alert("请选择一条记录");
                    return false;
                } else if (selected[0] == 0) {
                    alert("顶级栏无法操作");
                    return false;
                } else {
                    return selected[0];
                }
            },

            //tree节点被点击时的回调
            reloadTree: function reloadTree(data) {
                var options = $("#updateDept").find("option");
                for(var i = 0; i < options.length; i++){
                    $(options[i]).attr("selected",false);
                }
                vm.isDelete = false;
                vm.newNode = data.node;
                if(data.nodes == null){
                    vm.isDelete = true;
                }
               // $('.selectpicker').selectpicker('val', data.node.parentId);

                $("#updateDept").find("option[value="+data.node.parentId+"]").attr("selected",true);
                vm.checkedDeptId = data.id;
                // vm.checkedDeptId = vm.getCheckedKeys(vm.$refs.tree.getCheckedKeys());
                // vm.getParentId(vm.newNode, vm.newNode.parentIds);
            },

            //转为 Cascader 级联选择器 组件 需要的数组（最后一个空,把String[]转为Integer[]）
            getParentId: function getParentId(event, val) {
                var parents = val.split(",");
                var newParents = [];
                parents.splice(parents.length - 1, 1);
                parents.forEach(function (item, index) {
                    newParents.push(+item);
                });
                // vm.menu.parentId = newParents;
                event.newParentId = newParents;
            }
        },
        created:
            function created() {
                this.getData();
            }
    })
;
