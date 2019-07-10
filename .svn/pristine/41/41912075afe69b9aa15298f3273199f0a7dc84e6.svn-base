$(function () {

    vm.initTable();

    //表单提交
    $("form").FM({
        fields: vm.fields,
        success: vm.saveOrUpdate

    })

});

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        options: [
            {value: 0, label: '通知'},
            {value: 1, label: '新闻资讯'}
        ],
        showList: true,
        title: null,
        sysNotice: {},
        pushMsg: null,
        params: {
            // title: '',
            noticeType: ''
        },
        positionList: [],
        positionIds: [],
        ue: UE.getEditor('myEditor', {
            initialFrameHeight: 440,
        }),
//验证字段
        fields: {
           noticeType: {
                validators: {
                    notEmpty: {
                        message: '请选择分类'
                    }
                }
            }, positionId: {
                validators: {
                    notEmpty: {
                        message: '位置不能为空'
                    }
                }
            },  title: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    },stringLength: {
                        max: 30,
                        message: '标题长度在30个字符以内'
                    }
                }
            }, a: {
                validators: {
                    notEmpty: {
                        message: '公告内容不能为空'
                    },stringLength: {
                        max: 50,
                        message: '公告内容在50个字符以内'
                    }
                }
            }
        }
    },
    methods: {
        initTable: function () {
            //列表
            $("#table").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#table").BT({
                url: baseURL + 'sys/sysnotice/list',
                columns: [
                    {checkbox: true},
                    {
                        title: vm.$t("classification"), field: 'noticeType', formatter: function (value) {
                            var str = '';
                            if (value == 0) {
                                str = "通知";
                            } else if (value == 1) {
                                str = "新闻资讯";
                            } else {
                                str = "行内资讯";
                            }
                            return str;
                        }
                    },
                    {title: vm.$t("position"), field: 'positionId', formatter: function (value) {
                            var str = "";
                            vm.positionList.forEach(function (item,index) {
                                if (item.name == value) {
                                    str = item.remarks;
                                }
                            });
                            return str;
                        }
                    },
                    {title: vm.$t("content"), field: 'noticeContent', formatter: function (value) {
                            if (!isBlank(value) && value.length>15) {
                                return value.substring(0,15);
                            }else {
                                return value;
                            }
                        }
                    },
                    // {title: vm.$t("title"), field: 'title'},
                    /*{title: vm.$t("Subtitle"), field: 'viceTitle'},*/
                    {title: vm.$t("CreationTime"), field: 'createdTime'}
                    // {title: vm.$t("Publisher"), field: 'adviceUserName'},
                ],
                //条件查询
                queryParams: vm.params
            });
        },
        change: function () {
            if (vm.sysNotice.positionId == 'wangzhangonggao') {
                vm.sysNotice.noticeContent = '';
            } else {
                vm.sysNotice.noticeContent = ''
            }
        },
        typeSelect: function (type) {
            $("form").RF();
            if (type === null) {
                vm.positionIds = [];
                return;
            }
            $.get(baseURL + 'sys/sysnoticeposition/listByType', {type: type}, function (obj) {
                if (obj.code == 0) {
                    vm.positionIds = obj.data;
                    // vm.sysNotice.positionId = vm.positionIds[0];
                } else {
                    alert('查询错误！');
                }
            })
        },
        getData: function () {
            $.get(baseURL + "sys/sysnoticeposition/list", function (r) {
                vm.positionList = r.data;
            });
        },
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            this.ue.setContent("")
            vm.sysNotice = {};
        },
        update: function (event) {
            var id = getSelectedRowId("id");
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id);

            vm.typeSelect(getSelectedRow().noticeType)

        },
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.sysNotice.id == null ? "sys/sysnotice/save" : "sys/sysnotice/update";
            if (vm.sysNotice.noticeType != 0) {
                vm.sysNotice.noticeContent = UE.utils.unhtml(this.ue.getContent());
            }
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.sysNotice),
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
                    url: baseURL + "sys/sysnotice/delete",
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
            $.get(baseURL + "sys/sysnotice/info/" + id, function (r) {
                vm.sysNotice = r.sysNotice;
                vm.ue.setContent(UE.utils.html(vm.sysNotice.noticeContent));
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.title = "";
            //刷新 如需条件查询common.js
            $("#table").BTF5(vm.params);
            $("form").RF();
        },
        initWebSocket: function () { //初始化weosocket\

            var wsuri = "ws://test-admin.suhangline.com/websocket/houtaishouye";//ws地址
            this.websocket = new WebSocket(wsuri);
            this.websocket.onopen = this.websocketonopen;

            this.websocket.onerror = this.websocketonerror;

            this.websocket.onmessage = this.websocketonmessage;
            this.websocket.onclose = this.websocketclose;
        },

        websocketonopen: function () {
            console.log("WebSocket连接成功");
        },
        websocketonerror: function (e) { //错误
            console.log("WebSocket连接发生错误");
        },
        websocketonmessage: function (e) { //数据接收
            this.pushMsg = "通知：" + e.data;
            //const redata = JSON.parse(e.data);
            //注意：长连接我们是后台直接1秒推送一条数据，
            //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
            //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
            //console.log(redata.value);
        },

        websocketsend: function (agentData) {//数据发送
            this.websocket.send(agentData);
        },

        websocketclose: function (e) { //关闭
            console.log("connection closed (" + e.code + ")");
        },
    },
    created: function () {
        this.initWebSocket();
        this.getData();
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