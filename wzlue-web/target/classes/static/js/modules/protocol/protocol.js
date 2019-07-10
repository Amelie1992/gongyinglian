$(function () {
    vm.initTable();
    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })
    $("#type").change(function () {
        var op = $("#type").val();
        $.ajax({
            url: baseURL + 'protocol/protocol/queryType',
            type: "POST",
            data: op,
            success: function (r) {
                if (r.code === 0) {
                    if (r.count != 0) {
                        alert('该协议已存在请修改', function (index) {
                            vm.protocol.type = "";
                        })
                    }
                } else {
                    alert(r.msg)
                }
            }

        })
    })
});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        title: null,
        protocol: {},
        params: {
            name: '',
        },
        protocolType: [
            {value: 1, label: '账期协议'},
            {value: 2, label: '账户协议'},
            {value: 3, label: '注册协议'},
            {value: 4, label: '交易协议'},
            {value: 5, label: '其他协议'}
        ],
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
//验证字段
        fields: {
            type: {
                message: '协议类型验证失败',
                trigger: 'change',
                validators: {
                    notEmpty: {
                        message: '协议类型不能为空'
                    },

                },
            }, text: {
                message: '协议内容验证失败',
                validators: {
                    notEmpty: {
                        message: '协议内容不能为空'
                    },
                },
            }, location: {
                message: '协议位置验证失败',
                validators: {
                    notEmpty: {
                        message: '协议位置不能为空'
                    },
                },
            }
        }
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");
            $("#table").BT({
                url: baseURL + 'protocol/protocol/list',
                columns: [
                    {checkbox: true},
                    {
                        title: vm.$t("ProtocolType"), field: 'type', formatter: function (value, row, index) {
                            var val;
                            switch (row.type) {
                                case 1:
                                    val = "账期协议";
                                    break;
                                case 2:
                                    val = "账户协议";
                                    break;
                                case 3:
                                    val = "注册协议";
                                    break;
                                case 4:
                                	val = "交易协议";
                                	break;
                                case 5:
                                	val = "其他协议";
                                	break;
                            }
                            return val;
                        }
                    },
                    {title: vm.$t("ProtocolLocation"), field: 'location'},

                ],
                //条件查询
                queryParams: vm.params
            });
        },

        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            $("#type").attr("disabled", false)
            this.ue.setContent('');
            vm.protocol = {
                type: "",
            };
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            $("#type").attr("disabled", "disabled")
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
            vm.protocol.text = UE.utils.unhtml(this.ue.getContent());
            let ceiShi=this.ue.getContentTxt();//获取纯文本内容
            let photos=UE.utils.unhtml(this.ue.getContent());
            var imgReg = /img.*?(?:>|\/)/gi;
            var arr = photos.match(imgReg);//筛选出图片个数
            if (arr!=null){
                if (arr.length>5){
                    alert("协议内容上传的图片数量请少于6张")
                    return
                }
            }

            ceiShi=ceiShi.replace(/(^\s+)|(\s+$)/g,"").replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "");//去除空格等筛选
            if (ceiShi.length>1000){
                alert("协议内容不可超出1000字")
                return
            }
            if (vm.protocol.text == null) {
                alert('协议内容不能为空', function (index) {
                    return;
                })
            }
            var url = vm.protocol.id == null ? "protocol/protocol/save" : "protocol/protocol/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.protocol),
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
                    url: baseURL + "protocol/protocol/delete",
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
            $.get(baseURL + "protocol/protocol/info/" + id, function (r) {
                vm.protocol = r.protocol;
                vm.ue.setContent(UE.utils.html(vm.protocol.text));
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
        "protocol.type": function () {
            $("form").bootstrapValidator('addField', 'type', {
                    message: '协议类型验证失败',
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: '协议类型不能为空'
                        }
                    }
                })
        },
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table1").bootstrapTable.defaults.locale = "en-US";
                $("#table2").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table1").bootstrapTable.defaults.locale = "zh-CN";
                $("#table2").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table1").bootstrapTable("destroy");
            $("#table2").bootstrapTable("destroy");
            this.initTable();
        },
    }
});