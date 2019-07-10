/*页面加载*/
window.onload = function () {
    console.log("绑定按钮");

    //获取 url 传过来的信息  当前登录人的。 还有  被聊天人的。  头像  账号  密码  公司名称  被聊天人的 头像  账号
    var username = decodeURIComponent(decodeURIComponent(getUrlParam('username')));
    var kefu = getUrlParam('kefu');
    console.log("获取用户信息", JSON.stringify((username)));
    if(username == null || username == 'null'){
        return;
    }
    login(username, username);

    //选择聊天对象触发的事件
    if (null != kefu && "" != kefu) {
        console.log("客服字段", typeof kefu);

        kefu = decodeURIComponent(decodeURIComponent(getUrlParam('kefu')));
        kefu = JSON.parse(kefu);

        bothRoster.splice(0, 0, kefu)
        console.log("好友列表", JSON.stringify(bothRoster));
        if (bothRoster.length > 0) {
            buildListRostersLocalDiv(bothRoster);//本地联系人列表
            buildChatRostersDiv(bothRoster);//发送完信息显示
        }
        choosekefudiv(kefu.name);
    }
    //绑定按钮
    $(document).keydown(function (event) {
        if (event.keyCode == 13 && event.ctrlKey) {
            sendClick();
        }
    });
    console.log("动态设置聊天窗口的margin");
    setMainMargin(); //动态设置聊天窗口的margin
    $("#file").change(function () {
        if (curAcceptMsgObjType == "chat") {
            sendPrivatePicture("file");
        } else if (curAcceptMsgObjType == "groupchat") {
            sendGroupPicture("file");
        }
    })


    $("#login").click(loginClick);//点击登录暂时不用
    $("#register").click(registerClick);
    $("#logout").click(logoutClick);
    $("#getRoasters").click(getRoasters);
    $("#toregister").click(function () {
        console.log("注册页面");
        divHide("#registerPage", "#loginPage");
    });
    $("#toLogin").click(function () {
        console.log("注册页面的方法，已有账号");
        divHide("#loginPage", "#registerPage");
    });
    $("#showFriend").click(function () {
        $("#toGroup").css("background-position", "-220px -96px")
        $("#showFriend").css("background-position", "-185px -96px")
        divHide("#friend", "#group");
    });
    $("#toGroup").click(function () {
        $("#toGroup").css("background-position", "-304px -246px")
        $("#showFriend").css("background-position", "-150px -96px")
        divHide("#group", "#friend");
    });
    $("#send").click(sendClick);
    $(".chat-box-hd a").click(chatMenuClick)
    $(".list-menu").click(listMenuClick);
    $("#addFriend").click(addFriendsClick);
    $("#createGroup").click(createGroupsClick);
    $(".face").click(faceBoxClick)
    $(".face li").click(function () {
        chooseFaceClick(this);
    })
    $("#addGroup").click(joinGroupsClick);

    $("#showChat").click(function () {
        console.log("查询回话列表");
        $("#showAddressBook").css("background-position", "-220px -96px")
        $("#showChat").css("background-position", "-185px -96px")
        divHide("#chat", "#addressBook");
        divHide("#chat", "#groupressBook");
    });
    $("#showAddressBook").click(function () {
        console.log("查询好友列表");
        $("#friend_group-msg").css("background-position", "-220px -96px")
        $("#showAddressBook").css("background-position", "-185px -96px")
        $("#showChat").css("background-position", "-185px -96px")
        divHide("#addressBook", "#chat");
        divHide("#addressBook", "#groupressBook");
    });
    $("#friend_group-msg").click(function () {
        console.log("查询分组列表");
        $("#showAddressBook").css("background-position", "-150px -96px")
        $("#showChat").css("background-position", "-185px -96px")
        $("#friend_group-msg").css("background-position", "-305px -247px")
        divHide("#groupressBook", "#chat");
        divHide("#groupressBook", "#addressBook");

    });

    $("#yqkf").click(yqkf);
    // 关闭历史记录
    $(".historyurl").click(historyurl);
    var obj = {
        toUser: curAcceptMsgObj,
        fromUser: curUserId,
        page: 1,
        limit: 1000,
    }
    selectchathitory(obj);


}

var Base64 = {
    // 转码表
    table : [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ],
    UTF16ToUTF8 : function(str) {
        var res = [], len = str.length;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            if (code > 0x0000 && code <= 0x007F) {
                // 单字节，这里并不考虑0x0000，因为它是空字节
                // U+00000000 – U+0000007F 	0xxxxxxx
                res.push(str.charAt(i));
            } else if (code >= 0x0080 && code <= 0x07FF) {
                // 双字节
                // U+00000080 – U+000007FF 	110xxxxx 10xxxxxx
                // 110xxxxx
                var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                // 10xxxxxx
                var byte2 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2)
                );
            } else if (code >= 0x0800 && code <= 0xFFFF) {
                // 三字节
                // U+00000800 – U+0000FFFF 	1110xxxx 10xxxxxx 10xxxxxx
                // 1110xxxx
                var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                // 10xxxxxx
                var byte2 = 0x80 | ((code >> 6) & 0x3F);
                // 10xxxxxx
                var byte3 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2),
                    String.fromCharCode(byte3)
                );
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                // 四字节
                // U+00010000 – U+001FFFFF 	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                // 五字节
                // U+00200000 – U+03FFFFFF 	111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                // 六字节
                // U+04000000 – U+7FFFFFFF 	1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return res.join('');
    },
    UTF8ToUTF16 : function(str) {
        var res = [], len = str.length;
        var i = 0;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            // 对第一个字节进行判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var byte1 = (code & 0x1F) << 6;
                var byte2 = code2 & 0x3F;
                var utf16 = byte1 | byte2;
                res.push(Sting.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var code3 = str.charCodeAt(++i);
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                var utf16 = ((byte1 & 0x00FF) << 8) | byte2
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return res.join('');
    },
    encode : function(str) {
        if (!str) {
            return '';
        }
        var utf8    = this.UTF16ToUTF8(str); // 转成UTF8
        var i = 0; // 遍历索引
        var len = utf8.length;
        var res = [];
        while (i < len) {
            var c1 = utf8.charCodeAt(i++) & 0xFF;
            res.push(this.table[c1 >> 2]);
            // 需要补2个=
            if (i == len) {
                res.push(this.table[(c1 & 0x3) << 4]);
                res.push('==');
                break;
            }
            var c2 = utf8.charCodeAt(i++);
            // 需要补1个=
            if (i == len) {
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[(c2 & 0x0F) << 2]);
                res.push('=');
                break;
            }
            var c3 = utf8.charCodeAt(i++);
            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
            res.push(this.table[c3 & 0x3F]);
        }

        return res.join('');
    },
    decode : function(str) {
        if (!str) {
            return '';
        }

        var len = str.length;
        var i   = 0;
        var res = [];

        while (i < len) {
            code1 = this.table.indexOf(str.charAt(i++));
            code2 = this.table.indexOf(str.charAt(i++));
            code3 = this.table.indexOf(str.charAt(i++));
            code4 = this.table.indexOf(str.charAt(i++));

            c1 = (code1 << 2) | (code2 >> 4);
            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
            c3 = ((code3 & 0x3) << 6) | code4;

            res.push(String.fromCharCode(c1));

            if (code3 != 64) {
                res.push(String.fromCharCode(c2));
            }
            if (code4 != 64) {
                res.push(String.fromCharCode(c3));
            }

        }

        return this.UTF8ToUTF16(res.join(''));
    }
};


// 界面样式全局变量
var mainPage = ".main"; //主界面
var nikeName = ".nikename"; //用户昵称div
var nikename=null;//用户昵称
var loginPage = "#loginPage"; //登录界面
var registerPage = "#registerPage";
// var friendList = "#friend"; //好友列表
var friendList = "#addressBook";//好友列表
// var groupList = "#group"; //群组列表
var groupList = "#groupressBook"; //群组列表
var chatBoxContent = "#chat-box-content"; //聊天盒子内容容器
var chatObj = ".chat-box-hd span"; //聊天对象名字
var textMsg = "#text"; //需要发送的消息
var chatBox = ".chat-box"; //聊天盒子
var chatCover = ".chat-cover"; //聊天封面
// var fileInput = "file";

/*基本功能*/
var conn = new WebIM.connection({
    https: WebIM.config.https,
    // https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: WebIM.config.isAutoLogin,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions
    // heartBeatWait: WebIM.config.heartBeatWait,
    // autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    // autoReconnectInterval: WebIM.config.autoReconnectInterval
}); // 创建连接
conn.listen({
    onOpened: function (message) { //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();       
        // 连接成功才可以发送消息      
        console.log("%c 环信已成功连接", "color: green");
        handleOpen(conn);
    },
    onClosed: function (message) {
    }, //连接关闭回调
    onTextMessage: function (message) {
        // 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
        console.log("测试是否是临时联系人");
        handleTextMessage(message);
    }, //收到文本消息
    onEmojiMessage: function (message) {
        // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
        // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
        // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
        console.log('表情');
        var data = message.data;
        for (var i = 0, l = data.length; i < l; i++) {
            console.log(data[i]);
        }
    }, //收到表情消息
    onPictureMessage: function (message) {
        console.log('图片');
        var options = {
            url: message.url
        };
        options.onFileDownloadComplete = function () {
            // 图片下载成功
            var msgObjDivId = null;
            var listObjIId = null;
            if (message.type == "chat") {
                msgObjDivId = "ChatRosters-" + message.from;
                listObjIId = "ListRosters-" + message.from;
            } else if (message.type == "groupchat") {
                msgObjDivId = "ChatGroups-" + message.to;
                listObjIId = "ListGroups-" + message.to;
            }
            // 把接受的消息添加进消息盒子中
            var chatdiv = $('<div>').attr({
                'class': 'otherMsg'
            });
            $('<img>').attr({
                'src': '/images/huanxin/bb.jpg',
                'width': '40px',
                'height': '40px',
                'id': 'limg'
            }).appendTo(chatdiv);
            console.log(message);
            $('<h4>').text(message.from).appendTo(chatdiv);
            var span = $('<span>').appendTo(chatdiv);
            $('<img>').attr({
                'src': message.url,
                'width': '300px',
            }).appendTo(span);
            $('#' + msgObjDivId).append(chatdiv);
            setTimeout(function () {
                scrollBottom('#' + msgObjDivId);
            }, 500);

            // 小红点添加
            if (curAcceptMsgObjDivId == null || msgObjDivId != curAcceptMsgObjDivId) {
                if (msgObjDivId in redPCache) {
                    var redIVal = $("#" + listObjIId + " i").text();
                    redIVal = parseInt(redIVal) + 1;
                    $("#" + listObjIId + " i").text(redIVal);
                } else {
                    var redI = $('<i>').attr({
                        "id": "redP-" + msgObjDivId
                    }).text(1);
                    $("#" + listObjIId).append(redI);
                    redPCache[msgObjDivId] = true;
                }
                ;
            }
            console.log('图片下载成功!');
            console.log(message);


        };
        options.onFileDownloadError = function () {
            // 图片下载失败
            console.log('图片下载失败!');
        };
        WebIM.utils.download.call(conn, options); // 意义待查
    }, //收到图片消息
    onCmdMessage: function (message) {
        getRoastersLocal();
        console.log('收到命令消息');
    }, //收到命令消息
    onAudioMessage: function (message) {
        getRoastersLocal();
        console.log("收到音频消息");
    }, //收到音频消息
    onLocationMessage: function (message) {
        getRoastersLocal();
        console.log("收到位置消息");
    }, //收到位置消息
    onFileMessage: function (message) {
        getRoastersLocal();
        console.log("收到文件消息");
    }, //收到文件消息
    onVideoMessage: function (message) {
        getRoastersLocal();
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('文件下载失败.')
            }
        };
        WebIM.utils.download.call(conn, option);
    }, //收到视频消息
    onPresence: function (message) {
        getRoastersLocal();
        handlePresence(message);
    }, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {
        console.log('处理好友申请', message.type);
    }, //处理好友申请
    onInviteMessage: function (message) {
        console.log('处理群组邀请');
        $(groupList).empty();
        $(chatBoxContent).empty();
        getGroups();
    }, //处理群组邀请
    onOnline: function () {
        console.log('本机网络连接成功');
    }, //本机网络连接成功
    onOffline: function () {
        console.log('本机网络掉线');
    }, //本机网络掉线
    onError: function (message) {
        if(message.type == 8){
            alert("多端登录，被踢下线")
            close();
            return;
        }
        if(message.type == 7){
            alert("客户端网络中断");
            return;
            close();
        }
        if(message.type == 16){
            alert("服务端关闭了websocket链接");
            close();
            return;
        }
        if(message.type == 32){
            alert("服务端关闭了websocket链接");
            close();
            return;
        }
        if(message.type == 34){
            alert("同一浏览器打开标签页超过上限");
            close();
            return;
        }
        console.log('失败回调');
        console.log(message);
        alert("尚未注册环信账号");
        // window.location.href = "about:blank";
        // window.close();
        $(mainPage).addClass("hide");
        $(loginPage).removeClass("hide");
        if (message && message.type == 1) {
            console.warn('连接建立失败！请确认您的登录账号是否和appKey匹配。')
        }
    }, //失败回调
    onBlacklistUpdate: function (list) { //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onReceivedMessage: function (message) {

    }, //收到消息送达客户端回执
    // onDeliveredMessage: funciton(message){},   //收到消息送达服务器回执
    onReadMessage: function (message) {
    }, //收到消息已读回执
    onCreateGroup: function (message) {
    }, //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) {
    } //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    // onBlacklistUpdate: function (list) {
    //     // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
    //     console.log(list);
    // }     // 黑名单变动
}); // 回调函数

/*回调函数实现的功能*/
var handleOpen = function (conn) {
    //从连接中获取到当前的登录人注册帐号名
    curUserId = conn.context.userId;
    nikename = decodeURIComponent(decodeURIComponent(getUrlParam('nikename')));
    if(nikename === "null" || nikename === ''){
        // curUserId=nikename;
        // 当昵称为空时，选择用户名
        nikename = curUserId;
    }
    $(nikeName).text(nikename);

    $(loginPage).addClass("hide");
    $(mainPage).removeClass("hide");
    $(chatBox).removeClass("hide");
    console.log("从连接中获取到当前的登录人注册帐号名", curUserId);
    // getRoasters();//从环信获取好友列表
    var kefu = getUrlParam('kefu');
    if (null != kefu && "" != kefu) {

    } else {
        getRoastersLocal()
    }
    $("#showAddressBook").click();
    getGroups();//从环信获取群组列表
}; // 处理连接时
var handlePresence = function (message) {
    console.log("消息的类型", message.type);
    switch (message.type) {
        case 'joinPublicGroupSuccess':
            console.log(message);
            break;
        case 'joinGroupNotifications':

            var a = confirm("入群申请 : " + message.from + "想加入你的群");
            var options = {
                applicant: message.from,
                groupId: message.gid,
                success: function (resp) {
                    console.log(resp);
                },
                error: function (e) {
                }
            };
            if (a) {
                conn.agreeJoinGroup(options);
            } else {
                conn.rejectJoinGroup(options);
            }
            break;
        case 'subscribe': // 对方请求添加好友
            var a = confirm("好友申请 : " + message.status);
            $("#selectMsg").text("好友申请 : " + message.status);
            $("#selectdModal").modal();
            if (a) { // 同意对方添加好友
                conn.subscribed({
                    to: message.from,
                    message: "[resp:true]"
                });
            } else {
                conn.unsubscribed({
                    to: message.from,
                    message: "残忍的拒绝了你的好友请求" // 拒绝添加好友回复信息
                });
            } // 拒绝对方添加好友    
            console.log(" 拒绝对方添加好友   ");
            break;
        case 'subscribed': // 对方同意添加好友，已方同意添加好友
            // $("#remindMsg").text("成功添加" + message.from + "为好友");
            $("#remindModal").modal();
            var id = 'ListRosters-' + message.from;
            var hidename = message.from;
            var displayname = hidename;
            var type = 'chat';
            var src = "/images/huanxin/bb.jpg"
            var chatId = 'ChatRosters-' + message.from;
            appendListDiv(id, hidename, displayname, type, friendList, src);
            appendChatDiv(chatId, chatBoxContent);
            console.log("这里输出一下");
            break;
        case 'unsubscribe': // 对方删除好友
            console.log(message);
            break;
        case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
            $("#remindMsg").text(message.from + message.status);
            $("#remindModal").modal();
            console.log("拒绝添加好友，或被对方删除好友成功");
            break;
        case 'memberJoinPublicGroupSuccess': // 成功加入聊天室
            console.log('join chat room success');
            $(groupList).empty();
            $(chatBoxContent).empty();
            // var groupList = "#groupressBook"; //群组列表
            // var chatBoxContent = "#chat-box-content"; //聊天盒子内容容器
            getGroups();
            console.log("成功加入聊天室");
            break;
        case 'joinChatRoomFaild': // 加入聊天室失败
            console.log('join chat room faild');
            break;
        case 'joinPublicGroupSuccess': // 意义待查
            console.log('join public group success', message.from);
            break;
        case 'createGroupACK':
            conn.createGroupAsync({
                from: message.from,
                success: function (option) {
                    console.log('Create Group Succeed');
                    $(groupList).empty();
                    $(chatBoxContent).empty();
                    // var groupList = "#groupressBook"; //群组列表
                    // var chatBoxContent = "#chat-box-content"; //聊天盒子内容容器
                    getGroups();
                }
            });
            console.log("创建群组返回消息");
            break;
    }
} //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
var getRoasters = function () {
    console.log("查询好友列表");
    var option = {
        success: function (roster) {
            // roster是所有好友，格式为：
            /*
             [
             {
             jid:"easemob#chatdemoui_test1@easemob.com",
             name:"test1",
             subscription: "both"
             // subscription的值的集合是{both, to, from, none},
             // both表示互相在对方的好友列表中，
             // to 和 from意义待定
             // 如果添加对方为好友被拒绝则为none
             }
             ]
             */
            // var curroster;
            for (var o in roster) {
                var ros = roster[o];
                // both为双方互为好友，要显示的联系人,from我是对方的单向好友
                if (ros.subscription == 'both' || ros.subscription == 'from') {
                    bothRoster.push(ros);
                } else if (ros.subscription == 'to') {
                    //to表明了联系人是我的单向好友
                    console.log("单向好友");
                    toRoster.push(ros);
                }
            }
            console.log("好友列表", JSON.stringify(bothRoster));
            if (bothRoster.length > 0) {
                buildListRostersDiv(bothRoster); //联系人列表页面处理
                buildChatRostersDiv(bothRoster);//发送完信息显示
            }
        }
    };
    conn.getRoster(option);
}; // 显示好友（需要插入昵称和头像）
var getRoastersLocal = function () {
    $(friendList).empty();
    //查询临时聊天列表
    temporaryConversation()
    console.log("好友列表", JSON.stringify(bothRoster));
    if (bothRoster.length > 0) {
        // buildListRostersDiv(bothRoster); //联系人列表页面处理
        buildListRostersLocalDiv(bothRoster);//本地联系人列表
        buildChatRostersDiv(bothRoster);//发送完信息显示
        //直接与对方建立聊天框
        //获取好友列表下的第1个元素
        var eq = $("#addressBook").find("a").eq(0);
        chooseListDivClick(eq.get(0));
    }
    //显示最近联系人
    $("#showAddressBook").css("background-position", "-220px -96px");
    $("#showChat").css("background-position", "-185px -96px");
    divHide("#addressBook", "#chat");
    divHide("#addressBook", "#groupressBook");

}//获取本地临时聊天记录
var getGroups = function () {
    console.log("显示群组");
    var option = {
        success: function (rooms) {
            if (rooms.length > 0) {
                console.log("获取群组信息", option);
                buildListGroupsDiv(rooms); //群组列表页面处理
                buildChatGroupsDiv(rooms);
            }
        },
        error: function () {
            console.log('显示群组错误');
        }
    };

    conn.listRooms(option); //只有自己创建的群
}; // 显示群组（需要插入头像）
var buildListRostersDiv = function (roster) {
    // 建立缓存，存好友，用处是下面判断是一个好友则跳出当前循环
    var cache = {};
    for (i = 0; i < roster.length; i++) {
        if (!(roster[i].subscription == 'both' || roster[i].subscription == 'from')) {
            continue;
        }
        var userName = roster[i].name;
        var id = "ListRosters-" + userName;
        var displayname = userName; //应该传入昵称
        var type = "chat";
        var obj = friendList;
        var imgSrc = "/images/huanxin/bb.jpg";
        if (userName in cache) {
            continue;
        }
        cache[userName] = true;
        appendListDiv(id, userName, displayname, type, obj, imgSrc);
    }
}; // 构建h环信好友列表
var buildListRostersLocalDiv = function (roster) {

    // 建立缓存，存好友，用处是下面判断是一个好友则跳出当前循环
    var cache = {};
    for (i = 0; i < roster.length; i++) {
        // if (!(roster[i].subscription == 'both' || roster[i].subscription == 'from')) {
        //     continue;
        // }
        var displayname = "";


        var userName = roster[i].nikename == undefined ? roster[i].name:roster[i].nikename;
        var id;
        var hidename;
        if(roster[i].u_name != null){
            if(roster[i].u_name == getUrlParam('username')){
                id = "ListRosters-" + roster[i].from_user;
                hidename=roster[i].from_user;
            }else{
                id = "ListRosters-" + roster[i].u_name;
                hidename=roster[i].u_name;
            }
        }else{
            id="ListRosters-"+userName;
        }
        if (typeof(roster[i].company_name) == "undefined") {
            displayname = userName
        } else {
            displayname = userName + ":" + roster[i].company_name; //应该传入昵称
        }

        var type = "chat";
        var obj = friendList;
        var imgSrc = roster[i].shop_logo;
        if (userName in cache) {
            continue;
        }
        cache[userName] = true;


        var listLength = $("#addressBook").find("a").length;
        if (listLength > 0) {
            var count = 0;
            for (var j = 0; j < listLength; j++) {

                var text = $("#addressBook").find("a").eq(j).find('span').text();
                if (text == roster[i].name) {
                    count += 1;
                }
            }
            if (count < 1) {
                appendListDiv(id, hidename, displayname, type, obj, imgSrc);
            }
        } else {
            appendListDiv(id, hidename, displayname, type, obj, imgSrc);
        }


    }

}//构建本地好友列表
var buildChatRostersDiv = function (roster) {
    for (i = 0; i < roster.length; i++) {
        var id;
        if(roster[i].u_name == getUrlParam('username')){
            id = 'ChatRosters-' + roster[i].from_user;
        }else{
            id = 'ChatRosters-' + roster[i].u_name;
        }
        // var id = 'ChatRosters-' + roster[i].u_name;
        appendChatDiv(id, chatBoxContent);
    }
} // 构建好友聊天盒子
var buildListGroupsDiv = function (groups) {
    var cache = {};

    for (i = 0; i < groups.length; i++) {


        var roomsName = groups[i].name;
        var roomId = groups[i].roomId;
        var id = "ListGroups-" + roomId;
        var type = "groupchat";
        var obj = groupList;
        var imgSrc = '/images/huanxin/group_normal.png';
        if (roomId in cache) {
            continue;
        }
        cache[roomId] = true;
        appendListDiv(id, roomId, roomsName, type, obj, imgSrc);
    }
}; // 构建群组列表
var buildChatGroupsDiv = function (groups) {
    for (i = 0; i < groups.length; i++) {
        var id = 'ChatGroups-' + groups[i].roomId;
        appendChatDiv(id, chatBoxContent);
    }
}; // 构建群组聊天盒子
var appendListDiv = function (id, hidename, displayname, type, obj, src) {
    var aelem = $('<a>').attr({
        "href": "JavaScript:;",
        'id': id,
        'type': type,
        'hidename': hidename,
        'displayname': displayname
    }).click(function () {
        console.log("this", this);
        chooseListDivClick(this);
    });
    $('<img>').attr("src", src).attr("width", "40px").attr("height", "40px").appendTo(
        aelem);
    $('<span>').html(displayname).appendTo(aelem);
    $(obj).append(aelem);
}; //动态插入列表
var appendChatDiv = function (id, obj) {
    var chatdiv = $('<div>').attr({
        'id': id,
        'class': 'chat-box-content hide',
    });
    $(obj).append(chatdiv);
}; //动态插入聊天盒子
var handleTextMessage = function (message) {
    getRoastersLocal();
    var msgObjDivId = null;
    var listObjIId = null;
    if (message.type == "chat") {
        msgObjDivId = "ChatRosters-" + message.from;
        listObjIId = "ListRosters-" + message.from;
    } else if (message.type == "groupchat") {
        msgObjDivId = "ChatGroups-" + message.to;
        listObjIId = "ListGroups-" + message.to;
    }
    // 把接受的消息添加进消息盒子中
    var chatdiv = $('<div>').attr({
        'class': 'otherMsg'
    });
    $('<img>').attr({
        'src': '/images/huanxin/bb.jpg',
        'width': '40px',
        'height': '40px',
        "id": 'limg'
    }).appendTo(chatdiv);
    console.log(message);
    $('<h4>').text(message.ext.nikename).appendTo(chatdiv);
    $('<span>').html(message.data).appendTo(chatdiv);
    $('#' + msgObjDivId).append(chatdiv);
    scrollBottom('#' + msgObjDivId);
    // 小红点添加
    if (curAcceptMsgObjDivId == null || msgObjDivId != curAcceptMsgObjDivId) {
        if (msgObjDivId in redPCache) {
            var redIVal = $("#" + listObjIId + " i").text();
            redIVal = parseInt(redIVal) + 1;
            $("#" + listObjIId + " i").text(redIVal);
        } else {
            var redI = $('<i>').attr({
                "id": "redP-" + msgObjDivId
            }).text(1);
            $("#" + listObjIId).append(redI);
            redPCache[msgObjDivId] = true;
        }
        ;
    }
    // console.log(message);
}; //处理接受文字消息
/*基本API*/
var register = function (username, password, nickname) {
    var options = {
        username: username, //填入用户名
        password: password, //填入密码
        nickname: nickname, //填入昵称
        appKey: WebIM.config.appkey,
        success: function () {
            $("#remindMsg").text("注册成功");
            $("#remindModal").modal();
            $("#registerPage input").val("");
            $(registerPage).addClass("hide");
            $(loginPage).removeClass("hide");
        },
        error: function (data) {
            if (data.type == "17") {
                $("#remindMsg").text("用户名重复请重新注册");
                $("#remindModal").modal();
            }
            $("#registerPage input").val("");
        },
        apiUrl: WebIM.config.apiURL
    };
    conn.registerUser(options);
}; // 注册
var login = function (user, pwd) {

    var options = {
        apiUrl: WebIM.config.apiURL,
        user: user,
        pwd: pwd,
        appKey: WebIM.config.appkey
    };
    conn.open(options);
}; // 登录
var logout = function () {
    conn.close();
}; // 退出
var sendPrivateText = function (text, obj) {
    console.log("个人文本消息发送");
    console.log("text", text);
    console.log("text不换行", text.replace(/^\s+|\s+$/g, "").replace(/[\r\n]/g, ""));
    var a1 =Base64.encode(text);
    var a2 =Base64.decode(a1);
    console.log("加密",a1);
    console.log("解密",a2);
    var id = conn.getUniqueId();
    var msg = new WebIM.message('txt', id);
    msg.set({
        msg: text, // 消息内容
        to: obj, // 接收消息对象
        ext:{"nikename":nikename},
        roomType: false,
        success: function (id, serverMsgId) {
            console.log("发送私聊信息成功");
            var textType = 1;
            if (text.search("<img src=") != -1) {
                console.log("表情发送");
                textType = 2;
                text = Base64.encode(text);
                // text= Base64.encode(text.replace(/^\s+|\s+$/g,""))// 编码
                // Base64.decode("d3d3Ljc4b2EuY29t") //解码
            }
            var object = {
                msgId: id,//消息ID
                direction: "",
                toUser: obj,
                fromUser: curUserId,
                msg: text,
                type: "chat",
                textType: textType,
                chatType: curAcceptMsgObjType,
                curAcceptMsgObjDivId: curAcceptMsgObjDivId
            };
            //保存历史记录
            chathitory(object);
        },
        fail: function (e) {
            console.log("发送私聊信息失败");
        }
    });
    msg.body.chatType = 'singleChat';
    msg.body.nikename=nikename;
    console.log("个人消息接msg", msg);
    conn.send(msg.body);
}; // 私聊发送文本消息，发送表情同发送文本消息，只是会在对方客户端将表情文本进行解析成图片
var sendGroupText = function (text, obj) {
    console.log("群ID", obj);
    console.log("发送群文本", text);
    console.log("发送人", curUserId);
    var id = conn.getUniqueId(); // 生成本地消息id
    var msg = new WebIM.message('txt', id); // 创建文本消息
    var option = {
        msg: text, // 消息内容
        to: obj, // 接收消息对象(群组id)
        roomType: false,
        chatType: 'chatRoom',
        success: function () {
            console.log('发送群信息成功');
            var textType = 1;
            if (text.search("<img src=") != -1) {
                console.log("表情发送");
                textType = 2;
                // text= Base64.encode(text)// 编码
                text = Base64.encode(text.replace(/^\s+|\s+$/g, ""))// 编码
            }
            var object = {
                msgId: id,//消息ID
                direction: "",
                toUser: obj,
                fromUser: curUserId,
                msg: text,
                type: "groupchat",
                textType: textType,
                chatType: curAcceptMsgObjType,
                curAcceptMsgObjDivId: curAcceptMsgObjDivId
            };
            //保存历史记录
            chathitory(object);
        },
        fail: function () {
            console.log('发送群信息失败');
        }
    };
    msg.set(option);
    msg.setGroup('groupchat');
    conn.send(msg.body);
}; // 群组发送文本消息
var sendPrivatePicture = function (obj) {


    var id = conn.getUniqueId();
    var msg = new WebIM.message('img', id);
    var input = document.getElementById(obj); // 选择图片的input
    var file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
    var allowType = {
        'jpg': true,
        'gif': true,
        'png': true,
        'bmp': true
    };
    var option = {
        apiUrl: WebIM.config.apiURL,
        file: file,
        to: curAcceptMsgObj,
        roomType: false,
        chatType: 'singleChat',
        onFileUploadError: function () {
            console.log('onFileUploadError');
        },
        onFileUploadComplete: function (data) {
            var chatdiv = $('<div>').attr({
                'class': 'myMsg'
            });
            $('<img>').attr({
                'src': '/images/huanxin/tx.jpg',
                'width': '40px',
                'height': '40px',
                'id': 'rimg'
            }).appendTo(chatdiv);
            var text = $("#text").text();
            var span = $('<span>').appendTo(chatdiv);
            $('<img>').attr({
                'src': data.uri + "/" + data.entities[0].uuid,
                'width': '300px',
            }).appendTo(span);
            $('#' + curAcceptMsgObjDivId).append(chatdiv);
            console.log($('#' + curAcceptMsgObjDivId).prop("scrollHeight"));
            setTimeout(function () {
                scrollBottom('#' + curAcceptMsgObjDivId);
            }, 500);
        },
        success: function () {

            var fill = fileyurl(file);
            console.log('图片发送成功', fill);
            var object = {
                msgId: id,//消息ID
                direction: "",
                toUser: curAcceptMsgObj,
                fromUser: curUserId,
                msg: Base64.encode(fill),
                type: "chat",
                textType: 3,
                chatType: curAcceptMsgObjType,
                curAcceptMsgObjDivId: curAcceptMsgObjDivId
            };
            //保存历史记录
            chathitory(object);
        },
    };
    // for ie8
    try {
        if (!file.filetype.toLowerCase() in allowType) {
            console.log('file type error')
            return
        }
    } catch (e) {
        option.flashUpload = WebIM.flashUpload
    }
    msg.set(option);
    conn.send(msg.body);

} //私聊发送图片
var sendGroupPicture = function (obj) {
    var id = conn.getUniqueId();
    var msg = new WebIM.message('img', id);
    var input = document.getElementById(obj); // 选择图片的input
    var file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
    var allowType = {
        'jpg': true,
        'gif': true,
        'png': true,
        'bmp': true
    };

    var option = {
        apiUrl: WebIM.config.apiURL,
        file: file,
        to: curAcceptMsgObj,
        roomType: false,
        chatType: 'chatRoom',
        onFileUploadError: function () {
            console.log('onFileUploadError');
        },
        onFileUploadComplete: function (data) {
            var chatdiv = $('<div>').attr({
                'class': 'myMsg'
            });
            $('<img>').attr({
                'src': '/images/huanxin/tx.jpg',
                'width': '40px',
                'height': '40px',
                'id': 'rimg'
            }).appendTo(chatdiv);
            var text = $("#text").text();
            var span = $('<span>').appendTo(chatdiv);
            $('<img>').attr({
                'src': data.uri + "/" + data.entities[0].uuid,
                'width': '300px',
            }).appendTo(span);
            $('#' + curAcceptMsgObjDivId).append(chatdiv);
            // 图片延时
            setTimeout(function () {
                scrollBottom('#' + curAcceptMsgObjDivId);
            }, 500);
        },
        success: function () {
            var fill = fileyurl(file);
            console.log('图片发送成功', fill);
            var object = {
                msgId: id,//消息ID
                direction: "",
                toUser: curAcceptMsgObj,
                fromUser: curUserId,
                msg: Base64.encode(fill),
                type: "chat",
                textType: 3,
                chatType: curAcceptMsgObjType,
                curAcceptMsgObjDivId: curAcceptMsgObjDivId
            };
            //保存历史记录
            chathitory(object);
            console.log('Success');
            //     var fill=fileyurl(file);
            //     var object ={
            //         msgId:id,//消息ID
            //         direction:"",
            //         toUser:obj,
            //         fromUser:curUserId,
            //         msg:Base64.encode(fill),
            //         type:"groupchat",
            //         textType:3,
            //         chatType:curAcceptMsgObjType,
            //         curAcceptMsgObjDivId:curAcceptMsgObjDivId
            //     };
            //     //保存历史记录
            //     chathitory(object);
        },
    };
    // for ie8
    try {
        if (!file.filetype.toLowerCase() in allowType) {
            console.log('file type error')
            return
        }
    } catch (e) {
        option.flashUpload = WebIM.flashUpload
    }
    msg.set(option);
    msg.setGroup('groupchat');
    conn.send(msg.body);
} //群聊发送图片
var addFriends = function (name, msg) {
    console.log("执行添加好友");
    if (name != null && name != "") {
        conn.subscribe({
            to: name,
            // Demo里面接收方没有展现出来这个message，在status字段里面
            message: msg
        });
    }
}; // 添加好友
var removeFriends = function (obj) {
    conn.removeRoster({
        to: obj,
        success: function () { // 删除成功
            conn.unsubscribed({
                to: obj
            });
        },
        error: function () { // 删除失败
        }
    });
}; //删除好友
var createGroups = function (value, info, members, pub, opM, opA) {
    var options = {
        subject: value, // 群名称
        description: info, // 群简介
        members: members, // 以数组的形式存储需要加群的好友ID
        optionsPublic: pub, // 是否允许任何人加入
        optionsModerate: opM, // 加入是否需审批
        // optionsMembersOnly: true,                  // 是否允许任何人主动加入
        optionsAllowInvites: opA, // 是否允许群人员邀请
        success: function (respData) {
        },
        error: function () {
        }
    };
    conn.createGroup(options);
}; //创建群
var joinGroups = function (groupId) {
    var options = {
        groupId: groupId,
        success: function (resp) {
            console.log("成功加入群的resp: ", resp);
            // $("#remindMsg").text("成功加入群");
            // $("#remindModal").modal();
            // var id = 'ListGroups-'+message.from;
            // var hidename = message.from;
            // var displayname = hidename;
            // var type = 'chat';
            // var src = "/images/huanxin/group_normal.png"
            // var chatId = 'ChatGroups-'+message.from;
            // appendListDiv(id,hidename,displayname,type,friendList,src);
            // appendChatDiv(chatId,chatBoxContent);
        },
        error: function (e) {
            if (e.type == 17) {
                $("#remindMsg").text("你已经加入了该群");
                $("#remindModal").modal();
            }
        }
    };
    conn.joinGroup(options);
} //添加群
var leaveGroup = function (user, groupid) {
    var option = {
        to: user,
        roomId: groupid,
        success: function () {
            console.log('你成功离开了群!');
        },
        error: function () {
            console.log('离开群失败');
        }
    };
    conn.leaveGroupBySelf(option);
}; // 成员主动退出群
var dissolveGroup = function (groupid) {
    var option = {
        groupId: groupid,
        success: function () {
            console.log('Destroy group success!');
        }
    };
    conn.dissolveGroup(option);
}; //解散群
var getGroupInfo = function (gid) {
    var options = {
        groupId: gid,
        success: function (resp) {
            console.log("Response: ", resp);
        },
        error: function () {
        }
    };
    conn.getGroupInfo(options);
} //获取群组信息
var getGroupAdmin = function (gid) {
    var pageNum = 1,
        pageSize = 1000;
    var options = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: gid,
        success: function (resp) {
            var a = resp.data[resp.data.length - 1].owner;
            curOwner = a;
        },
        error: function (e) {
        }
    };
    conn.listGroupMember(options);
} //获取群组下所有管理员
var addGroupMembers = function (list, roomid) {
    var option = {
        list: list,
        roomId: roomid
    };
    conn.addGroupMembers(option);
};// 加好友入群

var curUserId = null;
var curAcceptMsgObj = null; //当前接受消息对象
var curAcceptMsgObjType = null; //当前接受消息对象类型
var curAcceptMsgObjDivId = null; //当前接受消息对象Divid
var curChatGroupId = null; //
var curOwner = null;
var bothRoster = []; //好友id
var toRoster = []; //到好友id
var redPCache = {};
var roomid = null;
/*点击事件*/
var registerClick = function () {
    var a = $("#username").val();
    var b = $("#password").val();
    var c = $("#nickname").val();
    register(a, b, c);
}; //点击注册事件
var loginClick = function () {
    console.log("点击登录");
    var a = $("#user").val();
    var b = $("#pwd").val();
    login(a, b);
    //显示聊天窗口
}; //点击登录按钮事件
var logoutClick = function () {
    logout();
    window.location.reload();
}; //点击登出事件
var listMenuClick = function () {
    console.log("点击列表菜单事件");
    $(".list-menu ul").toggleClass("hide");
}; // 点击列表菜单事件
var addFriendsClick = function () {
    var name = $("#addFriendName").val();
    var msg = $("#addFriendMsg").val();
    addFriends(name, msg);
}; //点击添加好友事件
var chatMenuClick = function () {
    $(".chat-box-hd a ul").empty();
    if (curAcceptMsgObjType == "chat") {
        var li = $('<li>').attr({
            "id": "removeFriends",
            "class": "list-group-item"
        }).text("删除好友").click(removeFriendsClick);
        $(".chat-box-hd a ul").append(li);
    } else if (curAcceptMsgObjType == "groupchat") {
        if (curOwner == curUserId) {
            var id = $("#" + curAcceptMsgObjDivId.replace(/Chat/, "List")).attr("hidename");
            var lia = $('<li>').attr({
                "class": "list-group-item"
            }).text("群ID：" + id);
            var li = $('<li>').attr({
                "id": "quitGroups",
                "class": "list-group-item"
            }).text("解散群组").click(unGroupClick);
            $(".chat-box-hd a ul").append(li);
            $(".chat-box-hd a ul").append(lia);
        } else {
            var id = $("#" + curAcceptMsgObjDivId.replace(/Chat/, "List")).attr("hidename");
            var lia = $('<li>').attr({
                "class": "list-group-item"
            }).text("群ID：" + id);
            var li = $('<li>').attr({
                "id": "quitGroups",
                "class": "list-group-item"
            }).text("退出群组").click(leaveGroupClick);
            $(".chat-box-hd a ul").append(li);
            $(".chat-box-hd a ul").append(lia);
        }
    }
    $(".chat-box-hd a ul").toggleClass("hide");
}; // 点击聊天菜单事件
var removeFriendsClick = function () {
    removeFriends(curAcceptMsgObj);
    var a = curAcceptMsgObjDivId.replace(/Chat/, "List");
    $("#" + curAcceptMsgObjDivId).remove();
    $("#" + a).remove();
    $(chatBox).addClass("hide");
    $(chatCover).removeClass("hide");
    curAcceptMsgObjDivId = null;
    curAcceptMsgObj = null;
    curAcceptMsgObjType = null;
}; //点击删除好友事件
var leaveGroupClick = function () {
    var a = curAcceptMsgObjDivId.replace(/Chat/, "List");
    var id = $("#" + a).attr("hidename");
    leaveGroup(curUserId, id);
    $("#" + curAcceptMsgObjDivId).remove();
    $("#" + a).remove();
    $(chatBox).addClass("hide");
    $(chatCover).removeClass("hide");
    curAcceptMsgObjDivId = null;
    curAcceptMsgObj = null;
    curAcceptMsgObjType = null;
}; //点击退出群组事件
var unGroupClick = function () {
    var a = curAcceptMsgObjDivId.replace(/Chat/, "List");
    var id = $("#" + a).attr("hidename");
    dissolveGroup(id);
    $("#" + curAcceptMsgObjDivId).remove();
    $("#" + a).remove();
    $(chatBox).addClass("hide");
    $(chatCover).removeClass("hide");
    curAcceptMsgObjDivId = null;
    curAcceptMsgObj = null;
    curAcceptMsgObjType = null;
} //点击解散群组事件
var createGroupsClick = function () {
    var value = $("#createGroupName").val();
    var info = $("#createGroupInfo").val();
    var members = [curUserId];
    console.log("创建群", value);
    console.log("创建群", info);
    console.log("创建群", members);
    createGroups(value, info, members, true, true, true);
}; //点击创建群事件
var joinGroupsClick = function () {
    var id = $("#addGroupId").val();
    joinGroups(id);
} //点击添加群事件
var faceBoxClick = function () {
    $(".face ul").toggleClass("hide");
}; //表情盒子点击事件
var sendClick = function () {
    console.log("点击发送窗口")
    var html = $("#text").html();
    if (html != null && html != "") {
        if (curAcceptMsgObjType == "chat") {
            sendPrivateText(html, curAcceptMsgObj);
        } else if (curAcceptMsgObjType == "groupchat") {
            sendGroupText(html, curAcceptMsgObj);
        }
        // 把发送的消息添加进消息盒子中
        var chatdiv = $('<div>').attr({
            'class': 'myMsg'
        });
        $('<img>').attr({
            'src': '/images/huanxin/tx.jpg',
            'width': '40px',
            'height': '40px',
            'id': 'rimg'
        }).appendTo(chatdiv);
        var text = $("#text").html();
        $('<span>').html(text).appendTo(chatdiv);
        $('#' + curAcceptMsgObjDivId).append(chatdiv);
        scrollBottom('#' + curAcceptMsgObjDivId);
        // 清空输入框内容
        $(textMsg).text("");
    }
}; // 点击发送按钮处理的事件
var chooseFaceClick = function (li) {

    var a = $(li).html();
    console.log("aaaaaaaaaaaa",a);
    var text0 = $(li).attr('key');
    var text1 = $("#text").text();
    // $("#text").text(text1+text0+a);
    $("#text").append(" ").append(a);
    var b = WebIM.utils.parseEmoji(text0);
    console.log(b);
}; //选择表情事件

var scrollBottom = function (obj) {
    $(obj).scrollTop($(obj).prop("scrollHeight"));
} //让聊天窗口滚动条处于底部
/*
var divHide = function(e) {
	var name = $(e).attr('id');
	var x = name.split("-");
	var y = x[0].split("_");
	var a = x[1];

	for(var i = 0; i < y.length; i++) {
		$("#" + y[i]).addClass("hide");
	}
	// $("#"+x[0]).addClass("hide");
	$("#" + a).removeClass("hide");
};// div的隐藏与显示，用-分割显示与隐藏的集合id，用_表示分割集合中的id，例如：id1_id2_id3-id4表示隐藏id1、id2、id3显示id4
*/
var divHide = function () {
    for (var i = 1, len = arguments.length; i < len; i++) {
        $(arguments[i]).addClass("hide");
    }
    $(arguments[0]).removeClass("hide");
};
var chooseListDivClick = function (li) {
    var chooseObjId = li.id;
    var chooseObjDivId = chooseObjId.replace(/List/, "Chat");
    var chooseAcceptMsgObj = $("#" + chooseObjId).attr('hidename');
    if (li.type == "groupchat") {
        getGroupAdmin(chooseAcceptMsgObj);
        console.log("聊天id", chooseAcceptMsgObj);
        roomid = chooseAcceptMsgObj;
        //如果是群组，则显示邀请客服按钮
        $("#yqkf").removeClass("hide")
    }
    if (li.type == "chat") {
        //如果是群组，则显示邀请客服按钮
        $("#yqkf").addClass("hide")
    }

    // 如果当前接受消息对象id为空
    if (curAcceptMsgObj == null && curAcceptMsgObjDivId == null) {
        $(chatCover).addClass("hide");
        $(chatBox).removeClass("hide");
    } else {
        $("#" + curAcceptMsgObjDivId.replace(/Chat/, "List")).removeClass("listColor"); //影藏上一个焦点背景颜色
        $("#" + curAcceptMsgObjDivId).addClass("hide"); //影藏上一个对象聊天div
    }
    if (chooseObjDivId in redPCache) {
        $("#redP-" + chooseObjDivId).remove(); //删除红点
        delete redPCache[chooseObjDivId];
    }
    $(chatObj).text($(li).attr("displayName")); //显示当前对象聊天名字
    $("#" + chooseObjId).addClass("listColor"); //显示焦点背景颜色
    $("#" + chooseObjDivId).removeClass("hide"); //显示当前对象聊天div
    curAcceptMsgObjDivId = chooseObjDivId;
    curAcceptMsgObj = chooseAcceptMsgObj;
    curAcceptMsgObjType = li.type;
    console.log("选择列表事件");
    var obj = {
        toUser: curAcceptMsgObj,
        fromUser: curUserId,
        page: 1,
        limit: 1000,
    }
    selectchathitory(obj);
    $(".history").addClass("hide");
}; //选择列表事件
var choosekefudiv = function (id) {
    console.log("处理聊天人和聊天窗", id);
    var kefu = 'ListRosters-' + id;
    var chooseObjId = kefu;
    var chooseObjDivId = chooseObjId.replace(/List/, "Chat");
    var chooseAcceptMsgObj = $("#" + chooseObjId).attr('hidename');

    // $("#" + curAcceptMsgObjDivId.replace(/Chat/, "List")).removeClass("listColor"); //影藏上一个焦点背景颜色
    $("#" + curAcceptMsgObjDivId).addClass("hide"); //影藏上一个对象聊天div
    $(chatObj).text(id); //显示当前对象聊天名字
    $("#" + chooseObjId).addClass("listColor"); //显示焦点背景颜色
    $("#" + chooseObjDivId).removeClass("hide"); //显示当前对象聊天div
    curAcceptMsgObjDivId = chooseObjDivId;
    curAcceptMsgObj = chooseAcceptMsgObj;
    curAcceptMsgObjType = 'chat';
}//从其他页面跳转，转入客服聊天
var setMainMargin = function () {
    if ($(window).height() <= 750) {
        $(".main").attr("style", "margin-top:0px;");
    } else if ($(window).height() > 750) {
        $(".main").attr("style", "margin-top:100px;");
    }
    $(window).resize(function () {
        if ($(window).height() <= 750) {
            $(".main").attr("style", "margin-top:0px;");
        } else if ($(window).height() > 750) {
            $(".main").attr("style", "margin-top:100px;");
        }
    });
}; //动态设置聊天窗口的margin
var historyurl = function () {
    console.log("历史记录模块");
    $(".history").toggleClass("hide");

}
var baseURL = "/";

function temporaryConversation() {
    var obj = {
        fromUser: curUserId,
        toUser: curUserId,
        page: 1,
        limit: 100,
    }
    $.ajax({
        type: "POST",
        url: baseURL + "websocket/chatmessage/temporaryConversation",
        contentType: "application/json",
        async: false,
        data: JSON.stringify(obj),
        success: function (r) {
            if (r.code === 0) {
                for (var i = 0; i < r.data.length; i++) {
                    var num = Math.floor(Math.random() * 5) + 1;
                    //随机头像
                    r.data[i].shop_logo = '/images/huanxin/head_portrait/touxiang' + num + '.jpg';
                }
                bothRoster = r.data;
                console.log("执行查询好友", bothRoster);
            } else {
                alert(r.msg);
            }
        }
    });
}//临时会话列表
function chathitory(obj) {
    console.log("进入保存历史记录", obj);
    $.ajax({
        type: "POST",
        url: baseURL + "websocket/chatmessage/save",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (r) {
            if (r.code === 0) {
                var obj = {
                    toUser: curAcceptMsgObj,
                    fromUser: curUserId,
                    page: 1,
                    limit: 1000,
                }
                selectchathitory(obj);
            } else {
                alert(r.msg);
            }
        }
    });
}//添加历史记录
function fileyurl(file) {
    var url = baseURL + "app/file/upload";
    console.log("进入保存图片", file);
    var hurl = "";
    var form = new FormData();
    form.append("file", file.data);
    console.log("进入保存历史记录", JSON.stringify(file.data));
    $.ajax({
        url: url,
        type: "post",
        data: form,
        processData: false,
        async: false,
        contentType: false,
        success: function (r) {
            console.log("over..", JSON.stringify(r));
            hurl = r.url;
        }
    });

    return hurl;
}//图片上传本地
function selectchathitory(obj) {
    console.log("进入查询历史记录", obj);
    console.log("当前接受消息对象", curAcceptMsgObj);
    console.log("当前接受消息对象类型", curAcceptMsgObjType);
    console.log("当前接受消息对象Divid", curAcceptMsgObjDivId);
    obj.curAcceptMsgObjType = curAcceptMsgObjType;
    $.ajax({
        type: "POST",
        url: baseURL + "websocket/chatmessage/list",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (r) {
            if (r.code === 0) {
                console.log(JSON.stringify(r))
                var rows = r.data;
                // historyList
                $(".historyList").children('div').remove();

                $.each(rows, function () {
                    var str = "";
                    str += '<div class="historymsg">';
                    str += '<div class="msgList">发送人:' + this.fromUser + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 发送时间:' + this.timestamp + '</div>';
                    if (this.textType == 1) {
                        str += '<div class="msgList">' + this.msg + '</div>';
                    }
                    if (this.textType == 2) {
                        str += '<div class="msgList">' + Base64.decode(this.msg) + '</div>';
                    }
                    if (this.textType == 3) {
                        str += '<div class="msgList"><img src="' + Base64.decode(this.msg) + '"  width="200px" height="100px"></div>';
                    }
                    str += '</div>';
                    $(".historyList").append(str);
                });


            } else {
                alert(r.msg);
            }
        }
    });
}//查询历史记录
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
//关闭当前页面
function close() {
    window.location.href="about:blank";
    window.close();
}
window.onUnload = function () {
    conn.close();
}//页面关闭事件
function yqkf() {
    var list = new Array();
    var a = curAcceptMsgObjDivId.replace(/Chat/, "List");
    var roomid = $("#" + a).attr("hidename");
    console.log("邀请客服", roomid);
    // 获取客服
    // /company/merchantusers/getCustomerService?companyid=1
    var kefuNum = 1;
    $.ajax({
        type: "get",
        url: baseURL + "company/merchantusers/getCustomerService?companyId=",
        dataType: "json",
        async: false,
        contentType: "application/json",
        success: function (r) {
            if (r.code == 0) {
                console.log("获取的客服列表", JSON.stringify(r));
                if (r.data != null) {
                    list.push(r.data.username);
                } else {
                    kefuNum = 0;
                }
            } else {

            }
        }
    });
    if (kefuNum < 1) {
        alert("没有客服");
    } else {
        console.log("huoqukefu", list);
        addGroupMembers(list, roomid);
    }

}

