$(function () {
    $("#table").BT({
        url: baseURL + 'supplier/supplier/list',
        columns: [
            {checkbox: true},
            {title: '供应商名称', field: 'name'},
            {title: '供应商分类', field: 'categoryName'},
            {title: '供应商等级：', field: 'levelName'},
            {title: '联系人', field: 'contact'},
            {title: '联系电话', field: 'phone'},
            {title: '详细地址', field: 'address'}
        ],
        //条件查询
        queryParams: vm.params
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        params: {
            name: '',
        },
        supplier: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.supplier = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        saveOrUpdate: function (event) {
            if (vm.validator()) {
                return;
            }
            var url = vm.supplier.id == null ? "supplier/supplier/save" : "supplier/supplier/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.supplier),
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
        del: function (event) {
            var ids = getSelectedRowsId("id");
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "supplier/supplier/delete",
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
        getInfo: function (id) {
            $.get(baseURL + "supplier/supplier/info/" + id, function (r) {
                vm.supplier = r.supplier;
            });
        },
        reload: function (event) {
            vm.showList = true;
            //刷新 如需条件查询common.js
            $("#table").BTF5();
        },
        validator: function () {
            if (isBlank(vm.supplier.categoryId)) {
                alert("分类id不能为空");
                return true;
            }
            if (isBlank(vm.supplier.name)) {
                alert("供应商名称不能为空");
                return true;
            }
            if (isBlank(vm.supplier.remarks)) {
                alert("备注不能为空");
                return true;
            }
            if (isBlank(vm.supplier.province)) {
                alert("省不能为空");
                return true;
            }
            if (isBlank(vm.supplier.city)) {
                alert("市不能为空");
                return true;
            }
            if (isBlank(vm.supplier.county)) {
                alert("区不能为空");
                return true;
            }
            if (isBlank(vm.supplier.address)) {
                alert("详细地址不能为空");
                return true;
            }
            if (isBlank(vm.supplier.contact)) {
                alert("联系人不能为空");
                return true;
            }
            if (isBlank(vm.supplier.phone)) {
                alert("联系电话不能为空");
                return true;
            }
            if (isBlank(vm.supplier.telephone)) {
                alert("座机号码不能为空");
                return true;
            }
            if (isBlank(vm.supplier.email)) {
                alert("电子邮箱不能为空");
                return true;
            }
            if (isBlank(vm.supplier.fax)) {
                alert("传真不能为空");
                return true;
            }
            if (isBlank(vm.supplier.zipCode)) {
                alert("邮编不能为空");
                return true;
            }
            if (isBlank(vm.supplier.level)) {
                alert("等级：不能为空");
                return true;
            }
            if (isBlank(vm.supplier.transportType)) {
                alert("运输方式：不能为空");
                return true;
            }
            if (isBlank(vm.supplier.settlementType)) {
                alert("结算方式：不能为空");
                return true;
            }
            if (isBlank(vm.supplier.invoiceType)) {
                alert("发票类型：不能为空");
                return true;
            }
            if (isBlank(vm.supplier.bank)) {
                alert("开户行不能为空");
                return true;
            }
            if (isBlank(vm.supplier.bankName)) {
                alert("户名不能为空");
                return true;
            }
            if (isBlank(vm.supplier.accountNo)) {
                alert("账号不能为空");
                return true;
            }
            if (isBlank(vm.supplier.taxNo)) {
                alert("税号不能为空");
                return true;
            }
            if (isBlank(vm.supplier.taxRate)) {
                alert("税率不能为空");
                return true;
            }
            if (isBlank(vm.supplier.registerTime)) {
                alert("注册日期不能为空");
                return true;
            }
            if (isBlank(vm.supplier.representative)) {
                alert("法人代表不能为空");
                return true;
            }
            if (isBlank(vm.supplier.businessLicenseNumber)) {
                alert("营业执照号不能为空");
                return true;
            }
            if (isBlank(vm.supplier.nature)) {
                alert("企业性质：不能为空");
                return true;
            }
            if (isBlank(vm.supplier.registerAddress)) {
                alert("注册地址不能为空");
                return true;
            }
            if (isBlank(vm.supplier.registerMoney)) {
                alert("注册资本不能为空");
                return true;
            }

        }
    }
});