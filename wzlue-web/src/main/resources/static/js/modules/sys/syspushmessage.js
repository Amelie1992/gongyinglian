$(function () {
    //列表
    $("#table").BT({
        url: baseURL + 'sys/syspushmessage/list',
        columns: [
            {checkbox: true},
            {title: '推送时间', field: 'createDate'},
            {title: '通知内容', field: 'content'},
            {
                title: '操作', formatter: function () {
                return '<a class="btn pushContent">推送</a>'
            }, events: vm.events
            }
        ],
        //条件查询
        queryParams: vm.params
    });
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
        showList: true,
        title: null,
        sysPushMessage: {},
        pushMsg: null,
        params: {
            name: '',
        },
        websocket: null,
        events: {
            'click .pushContent': function (event, value, row, index) {
                vm.websocketsend(row.content);
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/syspushmessage/update",
                    contentType: "application/json",
                    data: JSON.stringify({id: row.id, createDate: formatDate(new Date(), 'YY-MM-DD hh:mm:ss')}),
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
        },
//验证字段
        fields: {
            userId: {
                message: '员工id验证失败',
                validators: {
                    notEmpty: {
                        message: '员工id不能为空'
                    },
                },
            }, type: {
                message: '消息类型(0:系统通知，1：交易助手）验证失败',
                validators: {
                    notEmpty: {
                        message: '消息类型(0:系统通知，1：交易助手）不能为空'
                    },
                },
            }, message: {
                message: '推送消息内容验证失败',
                validators: {
                    notEmpty: {
                        message: '推送消息内容不能为空'
                    },
                },
            }, url: {
                message: 'url验证失败',
                validators: {
                    notEmpty: {
                        message: 'url不能为空'
                    },
                },
            }, flag: {
                message: '推送状态（0：未推送；1：推送成功）验证失败',
                validators: {
                    notEmpty: {
                        message: '推送状态（0：未推送；1：推送成功）不能为空'
                    },
                },
            }, createDate: {
                message: '创建时间验证失败',
                validators: {
                    notEmpty: {
                        message: '创建时间不能为空'
                    },
                },
            }, updateDate: {
                message: '更新时间验证失败',
                validators: {
                    notEmpty: {
                        message: '更新时间不能为空'
                    },
                },
            }, content: {
                message: '推送内容验证失败',
                validators: {
                    notEmpty: {
                        message: '推送内容不能为空'
                    },
                },
            }, readerFlag: {
                message: '阅读标志（0：未，1：已）验证失败',
                validators: {
                    notEmpty: {
                        message: '阅读标志（0：未，1：已）不能为空'
                    },
                },
            }
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.sysPushMessage = {};
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
        //表单验证
        validate: function () {
            var bl = $('form').VF();//启用验证
            if (!bl) {
                return;
            }
        },
        saveOrUpdate: function (event) {
            var url = vm.sysPushMessage.id == null ? "sys/syspushmessage/save" : "sys/syspushmessage/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.sysPushMessage),
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
                    url: baseURL + "sys/syspushmessage/delete",
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
            $.get(baseURL + "sys/syspushmessage/info/" + id, function (r) {
                vm.sysPushMessage = r.sysPushMessage;
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

            var ss=ss;

            var wsuri ="ws://10.0.31.83:8080/websocket";//ws地址
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
            this.pushMsg="通知："+e.data;
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
        var vm = this;
        $.get(baseURL + "sys/syspushmessage/pushMsg/", function (r) {
            var content = r.sysPushMessage.content;
            vm.pushMsg = "通知:" + content;
        });
        this.initWebSocket();
    }, destroyed: function () {
        //页面销毁时关闭长连接
        this.websocketclose();
    },
});