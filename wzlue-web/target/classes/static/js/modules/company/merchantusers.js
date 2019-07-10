$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

});

function showList(id) {
    vm.getDate(id);
}

// 恢复账户
function recovery(id) {
    confirm("确定恢复！", function () {
        $.ajax({
            type: "POST",
            url: baseURL + 'company/merchantusers/recovery',
            contentType: "application/json",
            data: JSON.stringify(id),
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
    })
}

// 注销账户
function unsubscribe(id) {
    confirm("确定注销！", function () {
        $.ajax({
            type: "POST",
            url: baseURL + 'company/merchantusers/unsubscribe',
            contentType: "application/json",
            data: JSON.stringify({'id': id, 'msg': vm.shenHMsg}),
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
    })
}

// 审核通过
function auditpass(id, userId) {
    confirm("确定审核通过！", function () {
        $.ajax({
            type: "POST",
            url: baseURL + 'company/merchantusers/auditpass',
            contentType: "application/json",
            data: JSON.stringify({'id': id, 'userId': userId, 'msg': vm.shenHMsg}),
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
    })
}

// 审核不通过
function noauditpass(id) {
    confirm("确定审核不通过！", function () {
        $.ajax({
            type: "POST",
            url: baseURL + 'company/merchantusers/noauditpass',
            contentType: "application/json",
            data: JSON.stringify({'id': id, 'msg': vm.shenHMsg}),
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
    })
}

function prompt(obj, id, userId) {

    layer.prompt({title: '审核信息，并确认', formType: 2}, function (text, index) {
        layer.close(index);
        vm.shenHMsg = text;
        if(vm.shenHMsg.length>30){
            alert("请输入字符小于30")
            return
        }
        eval(obj + '(' + id + ',' + userId + ')');
    });
}

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        shenHMsg: "",
        levelList: [],
        companyTypeOption: [],
        auditStatusOption: [
            {value: "", label: "请选择"},
            {value: "0", label: "待审核"},
            {value: "1", label: "审核通过"},
            {value: "2", label: "注销"},
            {value: "3", label: "审核不通过"}
        ],
        serviceTypeList: [],
        showList: true,
        title: null,
        merchantUsers: {
            gradeEntity: {
                id: '',
                quota: ''
            },
            imageEntityList: []
        },
        userEntity: {},
        params: {
            companyName: '',
        },
        shopLogoFile: [],
        businessLicenseFile: [],
        foodManagementFile: [],
        businessOfGoodsFile: [],
        logisticsBusinessFile: [],
        customsDeclarationFile: [],
        warehousingBusinessFile: [],
        agencyBusinessFile: [],
        financialBusinessFile: [],
        insuranceBusinessFile: [],
        otherQualificationsFile: [],
        files: {},
        tempImages: {
            shopLogo: [],
            businessLicense: [],
            foodManagement: [],
            businessOfGoods: [],
            logisticsBusiness: [],
            customsDeclaration: [],
            warehousingBusiness: [],
            agencyBusiness: [],
            financialBusiness: [],
            insuranceBusiness: [],
            otherQualifications: []
        },
//验证字段
        fields: {
            type: {
                message: '类型验证失败',
                validators: {
                    notEmpty: {
                        message: '类型不能为空'
                    },
                },
            }, username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                },
            }, identifyingcode: {
                message: '验证码验证失败',
                validators: {
                    notEmpty: {
                        message: '验证码不能为空'
                    },
                },
            }, companyname: {
                message: '公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '公司名称不能为空'
                    }, stringLength: {min: 1, max: 30, message: '长度小于30'}
                },
            }, 'servicetype[]': {
                message: '服务类型验证失败',
                validators: {
                    notEmpty: {
                        message: '服务类型不能为空'
                    },
                },
            }, companytype: {
                message: '公司类型验证失败',
                validators: {
                    notEmpty: {
                        message: '公司类型不能为空'
                    }, stringLength: {min: 1, max: 10, message: '长度小于10'}
                },
            }, contact: {
                message: '联系人验证失败',
                validators: {
                    notEmpty: {
                        message: '联系人不能为空'
                    }, stringLength: {min: 1, max: 10, message: '长度小于10'}
                },
            }, password: {
                message: '密码验证失败',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                },
            }, address: {
                message: '详细地址验证失败',
                validators: {
                    notEmpty: {
                        message: '详细地址不能为空'
                    },
                },
            }, companylocation: {
                message: '公司所在地验证失败',
                validators: {
                    notEmpty: {
                        message: '公司所在地不能为空'
                    }, stringLength: {min: 1, max: 30, message: '长度小于30'}
                },
            }, fixedtelephone: {
                message: '固定电话验证失败',
                validators: {
                    notEmpty: {
                        message: '固定电话不能为空'
                    },
                },
            }, mail: {
                message: '邮箱验证失败',
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    regexp: {
                        regexp: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                        message: "邮箱格式不正确"
                    }
                },
            }, recommendationcode: {
                message: '推荐码验证失败',
                validators: {
                    notEmpty: {
                        message: '推荐码不能为空'
                    },
                },
            }, legalPersonName: {
                validators: {
                    notEmpty: {
                        message: '企业法人不能为空'
                    }, stringLength: {min: 1, max: 10, message: '长度小于10'}
                }
            }, bankaccount: {
                validators: {
                    regexp: {
                        regexp: /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
                        message: "银行账号格式不正确"

                    }
                }
            }, openingbank: {
                validators: {
                    stringLength: {min: 1, max: 30, message: '长度小于30'}
                }
            } /*grade: {
                message: '等级验证失败',
                validators: {
                    notEmpty: {
                        message: '等级不能为空'
                    },
                },
            }, creditScore: {
                message: '信用积分验证失败',
                validators: {
                    notEmpty: {
                        message: '信用积分不能为空'
                    },
                },
            }*/
        }
    },
    methods: {
        // 获取等级
        getLevelList: function () {
            $.get(baseURL + 'grade/grade/list', function (obj) {
                var temp = [{label: '请选择', value: ''}];
                if (obj.code == '0') {
                    obj.data.forEach(function (item, arr, idx) {
                        temp.push({label: item.gradeName, value: item.id})
                    });
                    vm.levelList = temp;
                }
            })
        },
        getDate: function (id) {
            vm.tempImages = {
                shopLogo: [],
                businessLicense: [],
                foodManagement: [],
                businessOfGoods: [],
                logisticsBusiness: [],
                customsDeclaration: [],
                warehousingBusiness: [],
                agencyBusiness: [],
                financialBusiness: [],
                insuranceBusiness: [],
                otherQualifications: []
            };
            vm.showList = false;
            vm.getServicetype();
            $.get(baseURL + 'company/merchantusers/info/' + id, function (obj) {
                // vm.initFileInput();
                if (obj.code == '0') {
                    vm.merchantUsers = obj.merchantUsers;
                    vm.userEntity = obj.merchantUsers.userEntity;
                    if (vm.merchantUsers.imageEntityList != null && vm.merchantUsers.imageEntityList.length > 0) {
                        vm.merchantUsers.imageEntityList.forEach(function (row, arr, idx) {
                            /*if (row.code == '-1') {
                                vm.merchantUsers.shopLogo = row;
                            } else if (row.code == '-2') {
                                vm.merchantUsers.businessLicense = row;
                            } else if (row.code == '-3') {
                                vm.merchantUsers.foodManagement = row;
                            } else if (row.code == '1') {
                                vm.merchantUsers.businessOfGoods = row;
                            } else if (row.code == '2') {
                                vm.merchantUsers.logisticsBusiness = row;
                            } else if (row.code == '3') {
                                vm.merchantUsers.customsDeclaration = row;
                            } else if (row.code == '4') {
                                vm.merchantUsers.warehousingBusiness = row;
                            } else if (row.code == '5') {
                                vm.merchantUsers.agencyBusiness = row;
                            } else if (row.code == '6') {
                                vm.merchantUsers.financialBusiness = row;
                            } else if (row.code == '7') {
                                vm.merchantUsers.insuranceBusiness = row;
                            } else if (row.code == '13') {
                                vm.merchantUsers.otherQualifications = row;
                            }*/
                            if (row.code == '-1') {
                                vm.tempImages.shopLogo.push(row);
                            } else if (row.code == '-2') {
                                vm.tempImages.businessLicense.push(row);
                            } else if (row.code == '-3') {
                                vm.tempImages.foodManagement.push(row);
                            } else if (row.code == '1') {
                                vm.tempImages.businessOfGoods.push(row);
                            } else if (row.code == '2') {
                                vm.tempImages.logisticsBusiness.push(row);
                            } else if (row.code == '3') {
                                vm.tempImages.customsDeclaration.push(row);
                            } else if (row.code == '4') {
                                vm.tempImages.warehousingBusiness.push(row);
                            } else if (row.code == '5') {
                                vm.tempImages.agencyBusiness.push(row);
                            } else if (row.code == '6') {
                                vm.tempImages.financialBusiness.push(row);
                            } else if (row.code == '7') {
                                vm.tempImages.insuranceBusiness.push(row);
                            } else if (row.code == '13') {
                                vm.tempImages.otherQualifications.push(row);
                            }

                        });
                        vm.merchantUsers.shopLogos = vm.tempImages.shopLogo;
                        vm.merchantUsers.businessLicense = vm.tempImages.businessLicense;
                        vm.merchantUsers.foodManagement = vm.tempImages.foodManagement;
                        vm.merchantUsers.businessOfGoods = vm.tempImages.businessOfGoods;
                        vm.merchantUsers.logisticsBusiness = vm.tempImages.logisticsBusiness;
                        vm.merchantUsers.customsDeclaration = vm.tempImages.customsDeclaration;
                        vm.merchantUsers.warehousingBusiness = vm.tempImages.warehousingBusiness;
                        vm.merchantUsers.agencyBusiness = vm.tempImages.agencyBusiness;
                        vm.merchantUsers.financialBusiness = vm.tempImages.financialBusiness;
                        vm.merchantUsers.insuranceBusiness = vm.tempImages.insuranceBusiness;
                        vm.merchantUsers.otherQualifications = vm.tempImages.otherQualifications;

                        vm.shopLogoFile = vm.tempImages.shopLogo;
                        vm.businessLicenseFile = vm.tempImages.businessLicense;
                        vm.foodManagementFile = vm.tempImages.foodManagement;
                        vm.businessOfGoodsFile = vm.tempImages.businessOfGoods;
                        vm.logisticsBusinessFile = vm.tempImages.logisticsBusiness;
                        vm.customsDeclarationFile = vm.tempImages.customsDeclaration;
                        vm.warehousingBusinessFile = vm.tempImages.warehousingBusiness;
                        vm.agencyBusinessFile = vm.tempImages.agencyBusiness;
                        vm.financialBusinessFile = vm.tempImages.financialBusiness;
                        vm.insuranceBusinessFile = vm.tempImages.insuranceBusiness;
                        vm.otherQualificationsFile = vm.tempImages.otherQualifications;
                    }
                }
                vm.initshopLogobusinessLicensefoodManagement();
            })


        },
        // 公司类型加载
        companyTypeLoad: function () {
            $.get(baseURL + 'company/companytype/listall', function (obj) {
                vm.companyTypeOption = [];
                obj.data.forEach(function (item) {
                    vm.companyTypeOption.push({value: item.id, label: item.typeName})
                })
            })
        },
        // 初始化表格
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少

            //列表
            $("#table").BT({
                url: baseURL + 'company/merchantusers/list?sidx=audit_status&order=asc',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("CorporateName"), field: 'companyName', formatter: function (value, row, index) {
                        if (isBlank(!value) && value.length>10) {
                            return value.substring(0,10);
                        }else {
                            return value;
                        }
                        }
                     },
                    {title: vm.$t("BusinessType"), field: 'companyTypeEntity.typeName'},
                    {
                        title: vm.$t("ServiceType"), field: 'serviceType', formatter: function (value, row, index) {
                            var serviceType = '';
                            var entity = row.typeEntity;
                            for (var i = 0; i < entity.length; i++) {
                                if (i == entity.length - 1)
                                    serviceType += entity[i].serviceName;
                                else
                                    serviceType += entity[i].serviceName + '、';
                            }
                            return serviceType;
                        }
                    },
                    {title: vm.$t("EnterpriseLegalPerson"), field: 'userEntity.username'},
                    {title: vm.$t("contact"), field: 'contact'},
                    {title: vm.$t("ContactPhoneNumber"), field: 'userEntity.mobile'},
                    {
                        title: vm.$t("QualificationExaminationStatus"),
                        field: 'auditStatus',
                        formatter: function (value, row, index) {
                            var msg;
                            if (value == 1) {
                                msg = '<span style="color:green">审核通过</span>';

                            } else if (value == 2) {
                                msg = '<span style="color:#2b41bc">已注销</span>';

                            } else if (value == 3) {
                                msg = '<span style="color:red">审核不通过</span>';

                            } else {
                                msg = '待审核'

                            }
                            return msg;
                        }
                    },
                    {title: vm.$t("reviewInfo"), field: 'msg'},
                    {title: vm.$t("Grade"), field: 'gradeEntity.gradeName'},
                    {title: vm.$t("CreditScore"), field: 'creditScore'},
                    {title: vm.$t("Quota"), field: 'gradeEntity.quota'},
                    {
                        title: vm.$t("chaozuo"), field: 'mail', formatter: function (value, row, index) {
                            var msg = '<a id="" href="javascript:;" onclick="showList(' + row.id + ')">查看详情</a>  ';

                            if (row.auditStatus == '0') {
                                msg += '<a id="" href="javascript:;" onclick="auditpass(' + row.id + ',' + row.userEntity.userId + ')">审核通过</a>  ';
                                msg += '<a id="" href="javascript:;" onclick="prompt(' + '\'noauditpass\',' + row.id + ')">审核不通过</a>  ';

                            } else if (row.auditStatus == '1') {
                                msg += '<a id="" href="javascript:;" onclick="prompt(' + '\'unsubscribe\',' + row.id + ')">注销</a>  ';
                            } else if (row.auditStatus == '2') {
                                msg += '<a id="" href="javascript:;" onclick="recovery(' + row.id + ')">恢复</a>  ';
                            } else if (row.auditStatus == '3') {
                                msg += '<a id="" href="javascript:;" onclick="auditpass(' + row.id + ',' + row.userEntity.userId + ')">审核通过</a>  ';
                            }
                            return msg;
                        }
                    },
                ],
                //条件查询
                queryParams: vm.params
            });
        },
        // 服务类型
        getServicetype: function () {
            $.get(baseURL + 'company/servicetype/listCheckbox?sidx=id&order=asc', function (obj) {
                vm.serviceTypeList = obj.data;
            })
        },
        // 初始化 logo, 营业执照, 食品许可
        initshopLogobusinessLicensefoodManagement: function () {
            vm.$refs.shopLogoFile.destroy();
            vm.$refs.shopLogoFile.initFileInput();
            vm.$refs.businessLicenseFile.destroy();
            vm.$refs.businessLicenseFile.initFileInput();
            vm.$refs.foodManagementFile.destroy();
            vm.$refs.foodManagementFile.initFileInput();
        },
        // 初始化服务类型上传file
        initFileInput: function () {
            setTimeout(function () {
                vm.$nextTick(function () {
                    if ($.inArray(1, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.businessOfGoodsFile.destroy();
                        vm.$refs.businessOfGoodsFile.initFileInput();
                    }
                    if ($.inArray(2, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.logisticsBusinessFile.destroy();
                        vm.$refs.logisticsBusinessFile.initFileInput();
                    }
                    if ($.inArray(3, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.customsDeclarationFile.destroy();
                        vm.$refs.customsDeclarationFile.initFileInput();
                    }
                    if ($.inArray(4, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.warehousingBusinessFile.destroy();
                        vm.$refs.warehousingBusinessFile.initFileInput();
                    }
                    if ($.inArray(5, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.agencyBusinessFile.destroy();
                        vm.$refs.agencyBusinessFile.initFileInput();
                    }
                    if ($.inArray(6, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.financialBusinessFile.destroy();
                        vm.$refs.financialBusinessFile.initFileInput();
                    }
                    if ($.inArray(7, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.insuranceBusinessFile.destroy();
                        vm.$refs.insuranceBusinessFile.initFileInput();
                    }
                    if ($.inArray(13, vm.merchantUsers.serviceType) > -1) {
                        vm.$refs.otherQualificationsFile.destroy();
                        vm.$refs.otherQualificationsFile.initFileInput();
                    }
                })
            }, 100);
        },

        query: function () {
            vm.reload();
        },
        // 添加
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.merchantUsers = {};
        },
        // 更新
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.getDate(id);
            // vm.getInfo(id)
        },
        // 表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        // 更新或新增
        saveOrUpdate: function (event) {
            if (vm.merchantUsers.creditScore > 2147483647 || vm.merchantUsers.creditScore < -2147483648) {
                alert("公司信用分数超出限制");
                return;
            }

            vm.merchantUsers.imageEntityList = [];
            if (vm.shopLogoFile != null && vm.shopLogoFile.length > 0) {
                vm.shopLogoFile.forEach(function (item) {
                    item.code = '-1';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.businessLicenseFile != null && vm.businessLicenseFile.length > 0) {
                vm.businessLicenseFile.forEach(function (item) {
                    item.code = '-2';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.foodManagementFile != null && vm.foodManagementFile.length > 0) {
                vm.foodManagementFile.forEach(function (item) {
                    item.code = '-3';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.businessOfGoodsFile != null && vm.businessOfGoodsFile.length > 0) {
                vm.businessOfGoodsFile.forEach(function (item) {
                    item.code = '1';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.logisticsBusinessFile != null && vm.logisticsBusinessFile.length > 0) {
                vm.logisticsBusinessFile.forEach(function (item) {
                    item.code = '2';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.customsDeclarationFile != null && vm.customsDeclarationFile.length > 0) {
                vm.customsDeclarationFile.forEach(function (item) {
                    item.code = '3';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.warehousingBusinessFile != null && vm.warehousingBusinessFile.length > 0) {
                vm.warehousingBusinessFile.forEach(function (item) {
                    item.code = '4';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.agencyBusinessFile != null && vm.agencyBusinessFile.length > 0) {
                vm.agencyBusinessFile.forEach(function (item) {
                    item.code = '5';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.financialBusinessFile != null && vm.financialBusinessFile.length > 0) {
                vm.financialBusinessFile.forEach(function (item) {
                    item.code = '6';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.insuranceBusinessFile != null && vm.insuranceBusinessFile.length > 0) {
                vm.insuranceBusinessFile.forEach(function (item) {
                    item.code = '7';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }
            if (vm.otherQualificationsFile != null && vm.otherQualificationsFile.length > 0) {
                vm.otherQualificationsFile.forEach(function (item) {
                    item.code = '13';
                    vm.merchantUsers.imageEntityList.push(item);
                });
            }

            var url = vm.merchantUsers.id == null ? "company/merchantusers/save" : "company/merchantusers/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.merchantUsers),
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
        },
        // 删除
        del: function (event) {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "company/merchantusers/delete",
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
        },
        // 获取信息
        getInfo: function (id) {
            $.get(baseURL + "company/merchantusers/info/" + id, function (r) {
                vm.merchantUsers = r.merchantUsers;
            });
        },
        // 从新加载
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        }

    }, created: function () {
        this.companyTypeLoad();
        this.getLevelList()
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