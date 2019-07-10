$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({fields: vm.fields, success: vm.saveOrUpdate});

    $("input[name='contractsigningtime']").DATE({format: 'yyyy-mm-dd', minView: '2'});
    $("input[name='contractsigningtime']").on('changeDate', function (ev) {
        vm.employee.contractsigningtime = this.value; // 合同签订时间
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('contractexpirationdate');
        })
    });
    $("input[name='contractexpirationdate']").DATE({format: 'yyyy-mm-dd', minView: '2'});
    $("input[name='contractexpirationdate']").on('changeDate', function (ev) {
        vm.employee.contractexpirationdate = this.value; // 合同到期时间
        vm.$nextTick(function () {
            $("form").data("bootstrapValidator").revalidateField('contractsigningtime');
        })
    });
    // $("input[name='dateofbirth']").DATE({format: 'yyyy-mm-dd', minView: '2'});

    $("input[name='hiredate']").DATE({format: 'yyyy-mm-dd', minView: '2'});
    $("input[name='hiredate']").on('changeDate', function (ev) {
        vm.employee.hiredate = this.value; // 入职时间
    });
    $("input[name='dateofcorrection']").DATE({format: 'yyyy-mm-dd', minView: '2'});
    $("input[name='dateofcorrection']").on('changeDate', function (ev) {
        vm.employee.employeeAdditional.dateofcorrection = this.value; // 转正日期

    });
    $("input[name='departuretime']").DATE({format: 'yyyy-mm-dd', minView: '2'});
    $("input[name='departuretime']").on('changeDate', function (ev) {
        vm.employee.employeeAdditional.departuretime = this.value; // 离职日期
    });

    // 获取部门
    /* $.get(baseURL + '', function (obj) {

     });*/

    // 获取公司
    $.get(baseURL + 'company/merchantusers/getUserCompany2', function (obj) {
        // if (obj.code == '0' && JSON.stringify(obj.data) != '{}') {
        //     if (JSON.stringify(obj.data.company) != '{}' && JSON.stringify(obj.data.company) != 'null') {
        //         var arr = [];
        //         arr.push(
        //             {
        //                 'label': obj.data.company.companyName, 'value': obj.data.company.id
        //             }
        //         );
        //         vm.companyOption = arr;
        //     }
        // }
        if (obj.code == '0' && JSON.stringify(obj.data) != '{}') {
            if (JSON.stringify(obj.data.companies) != '[]' && JSON.stringify(obj.data.companies) != 'null') {
                // var str = JSON.stringify(obj.data.companies);
                // str = str.replace(/companyName/g, "label").replace(/id/g, "value");
                // vm.companyOption = str;
                var arr = [];
                // $.each(obj.data.companies,function (item,index) {
                //     arr.push(
                //         {
                //             'label': item.companyName, 'value': item.id
                //         }
                //     )
                // });
                for (let OBJ of obj.data.companies) {
                    arr.push(
                        {
                            'label': OBJ.companyName, 'value': OBJ.id
                        }
                    )
                }
                vm.companyOption = arr;
            }
        }
    });

    $('select[name="sex"]').prop('disabled', true);
    $('select[name="sex"]').selectpicker('refresh');
});

// 显示授权modal事件
function grantPage(row) {
    vm.employeeEntity = row;
    vm.grantPage(row.userId);
}

//  ztree 配置
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    },
    check: {
        enable: true,
        nocheckInherit: true
    }
};

var vm = new Vue({
        el: '#rrapp',
        i18n,
        data: {
            roleList: [],
            role: {},
            obj: {
                role: null,
                employeeEntity: null
            },
            showList: true,
            title: null,
            employee: {
                employeeAdditional: {}
            },
            user: {status: 1, roleIdList: []},
            sexOption: [
                {value: '2', label: '女'},
                {value: '1', label: '男'}
            ],
            socialsecurityOption: [
                {label: '未参保', value: '0'},
                {label: '已办理', value: '1'},
                {label: '已迁出', value: '2'}
            ],
            housingfundOption: [
                {label: '未交', value: '0'},
                {label: '已交', value: '1'}
            ],
            jobstateOption: [
                {label: '在职', value: '0'},
                {label: '离职', value: '1'},
                {label: '实习', value: '2'},
                {label: '试用', value: '3'}
            ],
            stateofcontractOption: [
                {label: '未签', value: '0'},
                {label: '已签', value: '1'}
            ],
            deptOption: [],
            companyOption: [],
            params: {
                name: ''
            },
            //验证字段
            fields: {
                username: {
                    message: '输入正确的手机号码',
                    validators: {
                        notEmpty: {
                            message: '手机号码不能为空'
                        },
                        regexp: {
                            regexp: /^1[3456789]\d{9}$/,
                            message: '请输入正确的手机号码'
                        }
                    }
                },
                setPasswordm: {
                    message: '密码验证失败',
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        }
                    }
                },
                worknumber: {
                    message: '工号验证失败',
                    validators: {
                        notEmpty: {
                            message: '工号不能为空'
                        }
                    }
                }, name: {
                    message: '姓名验证失败',
                    validators: {
                        notEmpty: {
                            message: '姓名不能为空'
                        }, stringLength: {
                            max: 20,
                            message: '姓名须少于20个字符'
                        }
                    }
                }, idcard: {
                    message: '身份证号码验证失败',
                    validators: {
                        notEmpty: {
                            message: '身份证号码不能为空'
                        },
                        regexp: {
                            regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                            message: '身份证号码格式不正确，为15位和18位身份证号码！'
                        },
                        callback: {
                            /*自定义，可以在这里与其他输入项联动校验*/
                            message: '身份证号码无效！',
                            callback: function (value, validator, $field) {
                                vm.employee.dateofbirth = '';
                                vm.employee.sex = '';

                                //15位和18位身份证号码的正则表达式
                                var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                                //如果通过该验证，说明身份证格式正确，但准确性还需计算
                                var idCard = value;
                                if (regIdCard.test(idCard)) {
                                    if (idCard.length == 18 || idCard.length == 15) {
                                        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                                        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                                        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                                        for (var i = 0; i < 17; i++) {
                                            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                                        }
                                        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                                        var idCardLast = idCard.substring(17);//得到最后一位身份证号码
                                        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                                        if (idCardMod == 2) {
                                            if (idCardLast == "X" || idCardLast == "x") {
                                                vm.getDateOfbrith(value);
                                                return true;
                                                //alert("恭喜通过验证啦！");
                                            } else {
                                                return false;
                                                //alert("身份证号码错误！");
                                            }
                                        } else {
                                            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                                            if (idCardLast == idCardY[idCardMod]) {
                                                //alert("恭喜通过验证啦！");
                                                vm.getDateOfbrith(value);
                                                return true;
                                            } else {
                                                return false;
                                                //alert("身份证号码错误！");
                                            }
                                        }
                                    } else {
                                        return;
                                    }

                                } else {
                                    //alert("身份证格式不正确!");
                                    return false;
                                }
                            }
                        }
                    }
                }, phonenumber: {
                    message: '手机号码验证失败',
                    validators: {
                        notEmpty: {
                            message: '手机号码不能为空'
                        },
                        regexp: {
                            regexp: /^1[3456789]\d{9}$/,
                            message: '请输入正确的手机号码'
                        }
                    }
                }, sex: {
                    message: '性别验证失败',
                    validators: {
                        notEmpty: {
                            message: '性别不能为空'
                        }
                    }
                }, /*dateofbirth: {
                    message: '出生日期验证失败',
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: '出生日期不能为空'
                        }
                    }
                }, socialsecurity: {
                    message: '社保验证失败',
                    validators: {
                        notEmpty: {
                            message: '社保不能为空'
                        }
                    }
                },*/ companyId: {
                    message: '所属公司验证失败',
                    validators: {
                        notEmpty: {
                            message: '所属公司不能为空'
                        }
                    }
                }, /*housingfund: {
                    message: '公积金验证失败',
                    validators: {
                        notEmpty: {
                            message: '公积金不能为空'
                        }
                    }
                },*/ jobstate: {
                    message: '在职状态验证失败',
                    validators: {
                        notEmpty: {
                            message: '在职状态不能为空'
                        }
                    }
                }, /*hiredate: {
                    message: '入职时间验证失败',
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: '入职时间不能为空'
                        }
                    }
                },*/ email: {
                    message: '邮箱验证失败',
                    validators: {
                        notEmpty: {
                            message: '邮箱不能为空'
                        },
                        stringLength: {
                            max: 50,
                            message: '邮箱须少于50个字符'
                        },
                        emailAddress: {
                            message: '请输入正确的邮件地址如：123@qq.com'
                        }
                    }
                }, stateofcontract: {
                    message: '合同状态验证失败',
                    validators: {
                        notEmpty: {
                            message: '合同状态不能为空'
                        }
                    }
                }, /*contractsigningtime: {
                    message: '合同签订时间验证失败',
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: '合同签订时间不能为空'
                        }
                    }
                }, contractexpirationdate: {
                    message: '合同到期时间验证失败',
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: '合同到期时间不能为空'
                        }, callback: {
                            message: '合同到期时间必须大于合同签订时间',
                            callback: function (value, validator, $field) {
                                let other = validator.getFieldElements('contractsigningtime').val();//获得另一个的值

                                let start = new Date(other.replace("-", "/").replace("-", "/"));
                                let end = new Date(value.replace("-", "/").replace("-", "/"));

                                if (end > start) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    }
                },*/ companyname: {
                    message: '公司名称验证失败',
                    validators: {
                        notEmpty: {
                            message: '公司名称不能为空'
                        }
                    }
                }, authority: {
                    message: '角色验证失败',
                    validators: {
                        notEmpty: {
                            message: '角色不能为空'
                        }
                    }
                }
            }
        },
        methods: {
            getRoleList: function () {
                $.get(baseURL + "sys/role/select", function (r) {
                    vm.roleList = r.list;
                });
            },
            grant: function () {
                //获取选择的菜单
                var nodes = ztree.getCheckedNodes(true);
                var menuIdList = new Array();
                for (var i = 0; i < nodes.length; i++) {
                    menuIdList.push(nodes[i].menuId);
                }
                vm.role.menuIdList = menuIdList;

                var url = vm.role.roleId == null ? "company/employee/saveRole" : "company/employee/updateRole";
                vm.obj.role = vm.role;
                vm.obj.employeeEntity = vm.employeeEntity;
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.obj),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function () {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }, grantPage: function (userId) { // 显示modal框并加载权限树
                $('#grant').modal('show');

                vm.getMenuTree(userId);

            }, getMenuTree: function (userId) { // 获取权限树
                //加载菜单树
                $.get(baseURL + "company/employee/menulist/" + userId, function (r) {
                    ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);
                    //展开所有节点
                    ztree.expandAll(false);

                    if (JSON.stringify(r.roleId) != '[]') {
                        vm.getRoleMenu(r.roleId[0]);
                    }
                });

            }, getRoleMenu: function (roleId) { // 勾选角色所拥有的菜单
                $.get(baseURL + "company/employee/grantInfo/" + roleId, function (r) {
                    vm.role = r.role;

                    //勾选角色所拥有的菜单
                    var menuIds = vm.role.menuIdList;
                    for (var i = 0; i < menuIds.length; i++) {
                        var node = ztree.getNodeByParam("menuId", menuIds[i]);
                        ztree.checkNode(node, true, false);
                    }
                });

            }, companySelect: function (idx, text, val) { // 所属公司下拉菜单赋值label值
                vm.employee.companyname = text;
            },
            initTable: function () { // 初始化 table
                //列表
                $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
                //列表
                $("#table").BT({
                    url: baseURL + 'company/employee/list',
                    columns: [
                        {checkbox: true},
                        {title: vm.$t("WorkNumber"), field: 'worknumber'},
                        {title: vm.$t("FullName"), field: 'name'},
                        {title: vm.$t("IDNumber"), field: 'idcard'},
                        {title: vm.$t("MobilePhoneNo"), field: 'phonenumber'},
                        {
                            title: vm.$t("Sex"), field: 'sex', formatter: function (value, arr, idx) {
                                if (value == '1')
                                    return '男';
                                else if (value == '2')
                                    return '女';
                            }
                        },
                        {title: vm.$t("DateOfBirth"), field: 'dateofbirth'},
                        {
                            title: vm.$t("socialSecurity"), field: 'socialsecurity', formatter: function (value, arr, idx) {
                                if (value == '0')
                                    return '未交';
                                else if (value == '1')
                                    return '已交';
                            }
                        },
                        // {title: vm.$t("AffiliatedCompany"), field: 'companyId'},
                        {
                            title: vm.$t("AccumulationFund"), field: 'housingfund', formatter: function (value, arr, idx) {
                                if (value == '0')
                                    return '未交';
                                else if (value == '1')
                                    return '已交';
                            }
                        },
                        {
                            title: vm.$t("WorkingState"), field: 'jobstate', formatter: function (value, arr, idx) {
                                if (value == '0')
                                    return '在职';
                                else if (value == '1')
                                    return '离职';
                                else if (value == '2')
                                    return '实习';
                                else if (value == '3')
                                    return '试用';
                            }
                        },
                        {title: vm.$t("InTheTime"), field: 'hiredate'},
                        {title: vm.$t("mailbox"), field: 'email'},
                        {
                            title: vm.$t("contractStatus"),
                            field: 'stateofcontract',
                            formatter: function (value, arr, idx) {
                                if (value == '0')
                                    return '未签';
                                if (value == '1')
                                    return '已签';
                            }
                        },
                        {title: vm.$t("ContractSigningTime"), field: 'contractsigningtime'},
                        {title: vm.$t("ContractExpirationDate"), field: 'contractexpirationdate'},
                        {title: vm.$t("CorporateName"), field: 'companyname'}
                    ],
                    //条件查询
                    queryParams: vm.params
                });

            },


            getDateOfbrith: function (idcard) {
                //获取出生日期
                vm.employee.dateofbirth = idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
                // $("form").data('bootstrapValidator').updateStatus('dateofbirth', 'NOT_VALIDATED', null);     //提交bug 所以删除
                // $('form').data("bootstrapValidator").revalidateField('dateofbirth');
                //性别
                //获取性别
                vm.employee.sex = idcard.slice(14, 17) % 2 ? "1" : "2"; // 1代表男性，2代表女性
            },
            setEmployeeTime: function () {
                /*vm.employee.contractsigningtime = $("input[name='contractsigningtime']").val(); // 合同签订时间*/
                /*vm.employee.contractexpirationdate = $("input[name='contractexpirationdate']").val(); // 合同到期时间*/
                /*vm.employee.dateofbirth = $("input[name='dateofbirth']").val(); // 出生日期*/
                /*vm.employee.hiredate = $("input[name='hiredate']").val(); // 入职时间*/
                /*vm.employee.dateofcorrection = $("input[name='dateofcorrection']").val(); // 转正日期*/
                /*vm.employee.departuretime = $("input[name='departuretime']").val(); // 离职日期*/
            }
            ,
            query: function () {
                vm.reload();
            },
            add: function () {
                vm.showList = false;
                vm.title = "新增";
                vm.employee = {
                    employeeAdditional: {}
                };
                vm.user = {status: 1, roleIdList: [], dataAuthorizes: '0'};
                $('input[name="username"]').removeAttr("disabled");
                $('input[name="setPasswordm"]').removeAttr("disabled");
                // vm.employee.companyId = vm.companyOption[0].id;
            }
            ,
            update: function (event) {
                var id = getSelectedRowId("id");
                if (id == null) {
                    return;
                }
                vm.showList = false;
                vm.title = "修改";
                $('input[name="setPasswordm"]').removeAttr("disabled");
                vm.getInfo(id);
            }
            ,
            //表单验证
            validate: function () {
                var bl = $('form').VF();//启用验证
                if (!bl) {
                    return false;
                }
            }
            ,
            saveOrUpdate: function (event) {
             /*   //添加员工 用户名（手机号） 全平台不允许重复
                    $.get(baseURL + "company/employee/checkUsername" , {username:vm.user.username, employeeId:vm.employee.id} , function (r) {
                        if (r.user != null) {
                            alert("该用户名已经被占用！");
                            vm.user.username = '';
                            $("form").data("bootstrapValidator").updateStatus('username', 'NOT_VALIDATED').validateField('username');
                            return false;
                        }
                    })*/

                var str = document.getElementById('familyphone').value.trim()
                var emergen = document.getElementById('emergencycontactphone').value.trim()
                var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                if (str != '' && !reg.test(str)) {
                    alert("家属电话格式不正确");
                    return false;
                }
                if (emergen != '' && !reg.test(emergen)) {
                    alert("紧急联系人电话格式不正确");
                    return false;
                }

                var url = vm.employee.id == null ? "company/employee/save" : "company/employee/update";
                vm.user.email = vm.employee.email;
                vm.tempObj = {};
                vm.tempObj.employee = vm.employee;
                vm.tempObj.user = vm.user;
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.tempObj),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('操作成功', function (index) {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }
            ,
            del: function (event) {
                var ids = getSelectedRowsId("id");
                if (ids == null) {
                    return;
                }

                confirm('确定要删除选中的记录？', function () {
                    $.ajax({
                        type: "POST",
                        url: baseURL + "company/employee/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function (r) {
                            if (r.code == 0) {
                                alert('操作成功', function (index) {
                                    vm.reload();
                                });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                });
            }
            ,
            getInfo: function (id) {
                $.get(baseURL + "company/employee/info/" + id, function (r) {
                    vm.employee = r.employee;
                    vm.user = r.employee.user;
                    $('input[name="username"]').attr("disabled", true);
                    // $('input[name="setPasswordm"]').attr("disabled", true);
                });
            }
            ,
            reload: function (event) {
                vm.showList = true;
                vm.title = "";
                //刷新 如需条件查询common.js
                $('#grant').modal('hide');
                $("#table").BTF5(vm.params);
                $("form").RF();
            }
        }, created: function () {
            this.getRoleList();
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
            }
            /* "user.password" : function (value) {
                 vm.$nextTick(function () {
                     $("form").data("bootstrapValidator").revalidateField('setPasswordm');
                 })
             },
             "user.username" : function (value) {
                 vm.$nextTick(function () {
                     $("form").data("bootstrapValidator").revalidateField('username');
                 })
             }*/
        }
    })
;