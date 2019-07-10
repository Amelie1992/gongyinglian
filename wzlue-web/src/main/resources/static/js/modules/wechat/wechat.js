
//    在初次加载融云中我们所要做的事情：
RongIMClient.init("8brlm7uf8z2p3");//这是初始化，需要填参数就是你的APPKEY。这个不难理解。
var token = "kF57VBSSOGmB21/TjsyEmZOlT3icLP8jhyfSI+YpgNDY9g3cYloezC9XAie9upABrnNlzyfB+JUCbxJlEv+V+g==";//注册时的token
//    链接融云的服务器
RongIMClient.connect(token,
    {
        onSuccess: function(userId) {

            console.log("Login successfully." + userId);
        },
        onTokenIncorrect: function() {
            console.log('token无效');
        },
        onError:function(errorCode){
            var info = '';
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时';
                    break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                    info = '未知错误';
                    break;
                case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                    info = '不可接受的协议版本';
                    break;
                case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                    info = 'appkey不正确';
                    break;
                case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                    info = '服务器不可用';
                    break;
            }
            console.log(errorCode);
        }
    });



// 设置连接监听状态 （ status 标识当前连接状态 ）
// 连接状态监听器
RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('链接成功');
                break;
            case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在链接');
                break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
                break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登录');
                break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确');
                break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.log('网络不可用');
                break;
        }
    }});

// 消息监听器
RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
                // message.content.content => 消息内容
                break;
            case RongIMClient.MessageType.VoiceMessage:
                // 对声音进行预加载
                // message.content.content 格式为 AMR 格式的 base64 码
                break;
            case RongIMClient.MessageType.ImageMessage:
                // message.content.content => 图片缩略图 base64。
                // message.content.imageUri => 原图 URL。
                break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                // message.content.extension => 讨论组中的人员。
                break;
            case RongIMClient.MessageType.LocationMessage:
                // message.content.latiude => 纬度。
                // message.content.longitude => 经度。
                // message.content.content => 位置图片 base64。
                break;
            case RongIMClient.MessageType.RichContentMessage:
                // message.content.content => 文本消息内容。
                // message.content.imageUri => 图片 base64。
                // message.content.url => 原图 URL。
                break;
            case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandMessage:
                // do something...
                break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something...
                break;
            default:
            // do something...
        }
    }
});
//
// 执行初始化需要在开发者后台新建应用得到 AppKey 和 token，初始化代码：
//
// RongIMLib.RongIMClient.init(appkey,[dataAccessProvider],[options])
// AppKey：应用的唯一标识。
// Token ：用户的唯一标识。
// RongIMLib.RongIMClient.init("appkey");
// 连接服务器
// 连接融云必须在执行 RongIMLib.RongIMClient.init(appkey); 之后，并且所有除监听以外的方法都必须在 connect成功之后 再调用。
// var token = "mKmyKqTSf7aNDinwAFMnz7NXKILeV3X0+CCRBOxmtOApmvQjMathViWrePIfq0GuTu9jELQqsckv4AhfjCAKgQ==";
// RongIMClient.connect(token, {
//     onSuccess: function(userId) {
//         console.log("Connect successfully." + userId);
//     },
//     onTokenIncorrect: function() {
//         console.log('token无效');
//     },
//     onError:function(errorCode){
//         var info = '';
//         switch (errorCode) {
//             case RongIMLib.ErrorCode.TIMEOUT:
//                 info = '超时';
//                 break;
//             case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                 info = '未知错误';
//                 break;
//             case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
//                 info = '不可接受的协议版本';
//                 break;
//             case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
//                 info = 'appkey不正确';
//                 break;
//             case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
//                 info = '服务器不可用';
//                 break;
//         }
//         console.log(errorCode);
//     }
// });

// 重新连接

// var callback = {
//     onSuccess: function(userId) {
//         console.log("Reconnect successfully." + userId);
//     },
//     onTokenIncorrect: function() {
//         console.log('token无效');
//     },
//     onError:function(errorCode){
//         console.log(errorcode);
//     }
// };
// var config = {
//     // 默认 false, true 启用自动重连，启用则为必选参数
//     auto: true,
//     // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
//     url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
//     // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
//     rate: [100, 1000, 3000, 6000, 10000]
// };
// RongIMClient.reconnect(callback, config);


// 1、文本消息
// var msg = new RongIMLib.TextMessage({content:"hello RongCloud!",extra:"附加信息"});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
// 发送 pushData[通知] 给端 Android or iOS 方法如下：
// var msg = new RongIMLib.TextMessage({content:"hello RongCloud!",extra:"附加信息"});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// var pushData = "your pushInfo";
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//         },
//         onError: function (errorCode,message) {
//         }
//     }, false, pushData
// );
//
//
// // 2、图片消息
// /*
//    图片转为可以使用 HTML5 的 FileReader 或者 canvas 也可以上传到后台进行转换。
//    注意事项：
//        1、缩略图必须是 base64 码的 jpg 图。
//        2、不带前缀。
//        3、大小不得超过 100kb。
//  */
// var base64Str = "base64 格式缩略图";
// var imageUri = "图片 URL"; // 上传到自己服务器的 URL。
// var msg = new RongIMLib.ImageMessage({content:base64Str,imageUri:imageUri});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
//
//
// // 3、富文本消息
// var base64Str = "base64 格式缩略图";// 图片转为可以使用 HTML5 的 FileReader 或者 canvas 也可以上传到后台进行转换。
// var imageUri = "图片 URL"; // 上传到自己服务器的 URL。
// var title = "富文本消息标题";
// var msg = new RongIMLib.RichContentMessage({title:title,content:base64Str,imageUri:imageUri});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
//
// // 位置信息
// var latitude = "纬度";
// var longitude = "经度";
// var poi = "位置描述";
// var content = "位置缩略图";
// var msg = new RongIMLib.LocationMessage({latitude: longitude, longitude: longitude, poi: poi, content: content});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
//
//
// // 命令消息
// var data = "命令指令";//可以是一个对象,data = {cmd:update};
// var msg = new RongIMLib.CommandMessage({data:data});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
//
//
// // 正在输入状态消息
//
// var conversationType = RongIMLib.ConversationType.PRIVATE;//只有单聊有正在输入状态。
// var targetId = "xxx";
// var msgName = "TextMessage";//用户正在输入的消息类型 VoiceMessage等。
// RongIMClient.getInstance().sendTypingStatusMessage(conversationType, targetId, msgName, {
//     onSuccess: function (message) {
//         console.log("Send successfully");
//     },
//     onError: function (errorCode,message) {
//         var info = '';
//         switch (errorCode) {
//             case RongIMLib.ErrorCode.TIMEOUT:
//                 info = '超时';
//                 break;
//             case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                 info = '未知错误';
//                 break;
//             case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                 info = '在黑名单中，无法向对方发送消息';
//                 break;
//             default :
//                 info = x;
//                 break;
//         }
//         console.log('发送失败:' + info);
//     }
// });
//
//
// //已读通知消息
//
// var messageUId = "消息唯一 Id";
// var lastMessageSendTime = "最后一条消息的发送时间";
// var type = "1";// 备用，默认赋值 1 即可。
// // 以上 3 个属性在会话的最后一条消息中可以获得。
// var msg = new RongIMLib.ReadReceiptMessage({ messageUId: messageUId, lastMessageSendTime: lastMessageSendTime, type: type });
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
//
// // 本地消息
// var message = "从本地获取的消息";
// RongIMClient.getInstance().sendLocalMessage(message,{
//     onSuccess: function (message) {
//         //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//         console.log("Send successfully");
//     },
//     onError: function (errorCode,message) {
//         var info = '';
//         switch (errorCode) {
//             case RongIMLib.ErrorCode.TIMEOUT:
//                 info = '超时';
//                 break;
//             case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                 info = '未知错误';
//                 break;
//             case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                 info = '在黑名单中，无法向对方发送消息';
//                 break;
//             case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                 info = '不在讨论组中';
//                 break;
//             case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                 info = '不在群组中';
//                 break;
//             case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                 info = '不在聊天室中';
//                 break;
//             default :
//                 info = x;
//                 break;
//         }
//         console.log('发送失败:' + info);
//     }
// });
//
//
// // 发送 @ 消息
// // 消息支持 @ 消息会话类型：RongIMLib.ConversationType.GROUP、RongIMLib.ConversationType.DISCUSSION。
// // 支持 @ 消息消息类型：TextMessage、ImageMessage、VoiceMessage、RichContentMessage、LocationMessage。
// // 发送方式：RongIMClient.getInstance().sendMessage(conversationType,targetId,msg,callback,true);，请设置最后一个参数为 true
// // 单聊,其他会话选择相应的消息类型即可。
// var conversationtype = RongIMLib.ConversationType.GROUP;
// // 目标 Id
// var targetId = "groupId";
// // @ 消息对象
// var mentioneds = new RongIMLib.MentionedInfo();
// // 全部：RongIMLib.MentionedType.ALL；部分：RongIMLib.MentionedType.PART
// mentioneds.type = RongIMLib.MentionedType.PART;
// // @ 的人
// mentioneds.userIdList = [];
// var msg = new RongIMLib.TextMessage({content:"hello RongCloud!",extra:"附加信息",mentionedInfo:mentioneds});
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//     onSuccess: function (message) {
//         //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//         console.log("Send successfully");
//     },
//     onError: function (errorCode,message) {
//         var info = '';
//         switch (errorCode) {
//             case RongIMLib.ErrorCode.TIMEOUT:
//                 info = '超时';
//                 break;
//             case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                 info = '未知错误';
//                 break;
//             case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                 info = '在黑名单中，无法向对方发送消息';
//                 break;
//             case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                 info = '不在讨论组中';
//                 break;
//             case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                 info = '不在群组中';
//                 break;
//             case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                 info = '不在聊天室中';
//                 break;
//             default :
//                 info = x;
//                 break;
//         }
//         console.log('发送失败:' + info);
//     }
// },true);
//
// // 发送文件消息
//
// var name = 'RongIMLib.js',
//     size = 1024,
//     type = 'js',
//     fileUrl = 'http://xxxx.xxx.xx/RongIMLib.js';
// var msg = new RongIMLib.FileMessage({ name: name, size: size, type: type, fileUrl: fileUrl});
// var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 目标 Id
// RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
//         onSuccess: function (message) {
//             //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
//             console.log("Send successfully");
//         },
//         onError: function (errorCode,message) {
//             var info = '';
//             switch (errorCode) {
//                 case RongIMLib.ErrorCode.TIMEOUT:
//                     info = '超时';
//                     break;
//                 case RongIMLib.ErrorCode.UNKNOWN_ERROR:
//                     info = '未知错误';
//                     break;
//                 case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
//                     info = '在黑名单中，无法向对方发送消息';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
//                     info = '不在讨论组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_GROUP:
//                     info = '不在群组中';
//                     break;
//                 case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
//                     info = '不在聊天室中';
//                     break;
//                 default :
//                     info = x;
//                     break;
//             }
//             console.log('发送失败:' + info);
//         }
//     }
// );
//
//
// // 1、获取单群聊历史消息
// // 该功能需要在开发者后台“应用/IM 服务/高级功能设置”中开通公有云专业版后，开启单群聊消息云存储功能即可使用，如没有开启则执行 onError 方法。
// var conversationType = RongIMLib.ConversationType.PRIVATE; //单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
// var timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
// var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
// RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
//     onSuccess: function(list, hasMsg) {
//         // list => Message 数组。
//         // hasMsg => 是否还有历史消息可以获取。
//     },
//     onError: function(error) {
//         console.log("GetHistoryMessages,errorcode:" + error);
//     }
// });
//
// // 过滤消息
// var messageNames = ['CommandMessage']; // 可以设置多个。
// RongIMClient.getInstance().setFilterMessages(messageNames);
//
// // 保存草稿
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// var draft = "草稿信息";
// RongIMClient.getInstance().saveTextMessageDraft(conversationType,targetId,draft);
//
// //获取草稿
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// var draft = RongIMClient.getInstance().getTextMessageDraft(conversationType,targetId);
// // draft => 草稿信息。
//
// // 清除草稿
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// RongIMClient.getInstance().clearTextMessageDraft(conversationType,targetId);
//
//
// // 自定义消息
// // 以下示例采用 WebSDK 内置消息结构，自定义消息结构，请移步开发指南。
// //
// // 1、定义消息类型
//
// var messageName = "PersonMessage"; // 消息名称。
// var objectName = "s:person"; // 消息内置名称，请按照此格式命名。
// var mesasgeTag = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
// var propertys = ["name","age"]; // 消息类中的属性名。
// RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,propertys);
// // 2、发送消息
//
// var conversationType = RongIMLib.ConversationType.PRIVATE; //单聊,其他会话选择相应的消息类型即可。
// var targetId = "xxx"; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
// var msg = new RongIMClient.RegisterMessage.PersonMessage({name:"zhang",age:12});
// RongIMClient.getInstance().sendMessage(conversationType,targetId, msg, {
//     onSuccess: function (message) {
//     },
//     onError: function (errorCode) {
//     }
// });
// // 3、接收消息
//
// // 接收消息与其他内置消息一致，在上文中提到的 setOnReceiveMessageListener 中增加 case 将消息予以展示即可。
// //
// // 例如：case RongIMClient.MessageType.RegisterMessage : dosomething...
// //
// // 会话接口
// // 会话类型
// // 1、RongIMLib.ConversationType.PRIVATE : 二人单聊会话类型，枚举值为 1 。
// //
// // 2、RongIMLib.ConversationType.DISCUSSION : 讨论组会话类型，枚举值为 2 。
// //
// // 3、RongIMLib.ConversationType.GROUP : 群组会话类型，枚举值为 3。
// //
// // 4、RongIMLib.ConversationType.CHATROOM : 聊天室会话类型，枚举值为 4 。
// //
// // 5、RongIMLib.ConversationType.CUSTOMER_SERVICE : 客服会话类型，枚举值为 5 。
// //
// // 6、RongIMLib.ConversationType.SYSTEM : 系统消息类型，枚举值为 6 。
// //
// // 7、RongIMLib.ConversationType.APP_PUBLIC_SERVICE : 公众账号（默认关注）会话类型，枚举值为 7 。
// //
// // 8、RongIMLib.ConversationType.PUBLIC_SERVICE : 公众账号 (手动关注) 会话类型，枚举值为 8 。
// //
// // 获取会话列表
// // 使用此方法需要在开发者后台“应用/IM 服务/高级功能设置”中开通公有云专业版后，开启单群聊消息云存储功能。
//
// RongIMClient.getInstance().getConversationList({
//     onSuccess: function(list) {
//         // list => 会话列表集合。
//     },
//     onError: function(error) {
//         // do something...
//     }
// },null);
// // 修改会话
// // 此方法可以修改会话中信息，可以填充 用户信息 或会话 Title 等。
// //
// // 1、未使用本地存储，必须先执行 getConversationList 并且有这个会话此方法才有效。
//
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// RongIMLib.RongIMClient.getInstance().getConversation(conversationType,targetId,{
//     onSuccess:function(con){
//         if (con) {
//             con.conversationTitle="我是会话的Title";
//             RongIMLib.RongIMClient.getInstance().updateConversation(con);
//             consoleInfo("updateConversation Success!");
//         }
//     }
// });
// // 2、使用本地存储
//
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// RongIMLib.RongIMClient.getInstance().getConversation(conversationType,targetId,{
//     onSuccess:function(con){
//         if (con) {
//             con.conversationTitle="我是会话的Title";
//             RongIMLib.RongIMClient.getInstance().updateConversation(con);
//             consoleInfo("updateConversation Success!");
//         }
//     }
// });
// // 3、删除会话
//
// RongIMClient.getInstance().removeConversation(RongIMLib.ConversationType.PRIVATE,"1002",{
//     onSuccess:function(bool){
//         // 删除会话成功。
//     },
//     onError:function(error){
//         // error => 删除会话的错误码
//     }
// });
// // 4、清除会话列表
//
// RongIMClient.getInstance().clearConversations(callback,[conversationTypes]);
//
// // conversationTypes 为可选参数，可以清除指定会话类型的会话，可以多个。
//
// // 5、清除所有会话：
//
// RongIMClient.getInstance().clearConversations({
//     onSuccess:function(){
//         // 清除会话成功
//     },
//     onError:function(error){
//         // error => 清除会话错误码。
//     }
// });
// // 6、清除指定会话：
//
// var conversationTypes = [RongIMLib.ConversationType.PRIVATE,RongIMLib.ConversationType.GROUP];
// RongIMClient.getInstance().clearConversations({
//     onSuccess:function(){
//         // 清除会话成功
//     },
//     onError:function(error){
//         // error => 清除会话错误码。
//     }
// },conversationTypes);
// // 未读消息数
// // 若浏览器不支持 WebStorage 并且您没有使用 本地存储，未读消息数将不会保存，浏览器页面刷新未读消息数将不会存在。
// //
// // 1、获取所有会话总未读消息数
//
// RongIMClient.getInstance().getTotalUnreadCount({
//     onSuccess:function(count){
//         // count => 所有会话总未读数。
//     },
//     onError:function(error){
//         // error => 获取总未读数错误码。
//     }
// });
// // 2、获取多个会话的未读消息总数
//
// var conversationTypes = [RongIMLib.ConversationType.PRIVATE,RongIMLib.ConversationType.DISCUSSION];
// RongIMClient.getInstance().getConversationUnreadCount(conversationTypes,{
//     onSuccess:function(count){
//         // count => 多个会话的总未读数。
//     },
//     onError:function(error){
//         // error => 获取多个会话未读数错误码。
//     }
// });
// // 3、获取指定会话的未读消息数
//
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// RongIMLib.RongIMClient.getInstance().getUnreadCount(conversationType,targetId,{
//     onSuccess:function(count){
//         // count => 指定会话的总未读数。
//     },
//     onError:function(){
//         // error => 获取指定会话未读数错误码。
//     }
// });
// // 4、清除未读消息数
//
// var conversationType = RongIMLib.ConversationType.PRIVATE;
// var targetId = "xxx";
// RongIMClient.getInstance().clearUnreadCount(conversationType,targetId,{
//     onSuccess:function(){
//         // 清除未读消息成功。
//     },
//     onError:function(error){
//         // error => 清除未读消息数错误码。
//     }
// });
// // 讨论组
// // 1、创建讨论组
//
// var discussionName = "讨论组名称"; // 名称自定义
// var userIds = ["zhangsan","lisi"];//讨论组初始成员。
// RongIMClient.getInstance().createDiscussion(discussionName,userIds,{
//     onSuccess:function(discussionId){
//         // discussionId => 讨论组 Id。
//     },
//     onError:function(error){
//         // error => 创建讨论组失败错误码。
//     }
// });
// // 2、讨论组加人
//
// var discussionId = "xxx"; // 讨论组 Id。
// var userIds = ["wangwu","zhaoliu"];//被邀请成员。
// RongIMClient.getInstance().addMemberToDiscussion(discussionId,userIds,{
//     onSuccess:function(){
//         // 邀请成功。
//     },
//     onError:function(error){
//         // error => 邀请失败错误码。
//     }
// });
// // 3、获取讨论组
//
// var discussionId = "xxx"; // 讨论组 Id。
// RongIMClient.getInstance().getDiscussion(discussionId,{
//     onSuccess:function(discussion){
//         // discussion => 讨论组信息。
//     },
//     onError:function(error){
//         // error => 获取讨论组失败错误码。
//     }
// });
// // 4、退出讨论组
//
// var discussionId = "xxx"; // 讨论组 Id。
// RongIMClient.getInstance().quitDiscussion(discussionId,{
//     onSuccess:function(){
//         // 退出讨论组成功。
//     },
//     onError:function(error){
//         // error => 退出讨论组失败错误码。
//     }
// });
// // 5、踢人
//
// var discussionId = "xxx"; // 讨论组 Id。
// var userId = "xxxx"; // 将被移除讨论组的用户 Id。
// RongIMClient.getInstance().removeMemberFromDiscussion(discussionId,userId,{
//     onSuccess:function(){
//         // 踢人成功。
//     },
//     onError:function(error){
//         // error => 踢人失败错误码。
//     }
// });
// // 6、设置讨论组邀请状态
//
// var discussionId = "xxx"; // 讨论组 Id。
// var status = RongIMLib.DiscussionInviteStatus.OPENED; // 讨论邀请状态 0 ： 开发邀请，1：关闭邀请  RongIMLib.DiscussionInviteStatus.OPEND | RongIMLib.DiscussionInviteStatus.CLOSED。
// RongIMClient.getInstance().setDiscussionInviteStatus(discussionId,status,{
//     onSuccess:function(){
//     },
//     onError:function(error){
//     }
// });
// // 7、设置讨论名称
//
// var discussionId = "xxx"; // 讨论组 Id。
// var discusstionName = "新的讨论组名称";
// RongIMClient.getInstance().setDiscussionName(discussionId,discusstionName,{
//     onSuccess:function(){
//     },
//     onError:function(error){
//     }
// });
// // 群组
// // 1、加入群
//
// var groupId = "xxxx"; // 群 Id 。
// var groupName = "xxx";// 群名称 。
// RongIMClient.getInstance().joinGroup(groupId, groupName, {
//     onSuccess: function() {
//         // 加入群成功。
//     },
//     onError: function(error) {
//         // error => 加入群失败错误码。
//     }
// });
// // 2、退出群
//
// var groupId = "xxxx";// 群 Id 。
// RongIMClient.getInstance().quitGroup(groupId, {
//     onSuccess: function() {
//         // 退群成功。
//     },
//     onError: function(error) {
//         // error => 退群失败错误码。
//     }
// });
// // 聊天室
// // 1、加入
//
// var chatRoomId = "xxxx"; // 聊天室 Id。
// var count = 10;// 拉取最近聊天最多 50 条。
// RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
//     onSuccess: function() {
//         // 加入聊天室成功。
//     },
//     onError: function(error) {
//         // 加入聊天室失败
//     }
// });
// // 2、退出
//
// var chatRoomId = "xxxx"; // 聊天室 Id。
// RongIMClient.getInstance().quitChatRoom(chatRoomId, {
//     onSuccess: function() {
//         // 退出聊天室成功。
//     },
//     onError: function(error) {
//         // 退出聊天室失败。
//     }
// });
// // 3、获取信息
//
// var chatRoomId = "xxxx";// 聊天室 Id。
// var count = 10; // 获取聊天室人数 （范围 0-20 ）
// var order = RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
// RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count, order, {
//     onSuccess: function(chatRoom) {
//         // chatRoom => 聊天室信息。
//         // chatRoom.userInfos => 返回聊天室成员。
//         // chatRoom.userTotalNums => 当前聊天室总人数。
//     },
//     onError: function(error) {
//         // 获取聊天室信息失败。
//     }
// });
// // 4、设置获取云存储消息起始位置
//
// var chatRoomId = 'xxxx';
// var timestamp = 0; // 获取历史消息起始时间（毫秒）
// RongIMClient.getInstance().setChatroomHisMessageTimestamp(chatRoomId, timestamp);
// // 5、获取云存储消息
// //
// // 该功能需开通后才能使用，详细请查看聊天室消息云存储服务说明。
//
// var chatRoomId = 'xxxx';
// var count = 10; // 拉取的条数 count <= 200
// var order = 1;  // 1正序；0倒序
// RongIMClient.getInstance().getChatRoomHistoryMessages(chatRoomId, count, order, {
//     onSuccess: function(list, hasMore) {
//         // list => 消息数组
//         // hasMore => 是否有更多的历史消息
//     },
//     onError: function(error) {
//
//     }
// });
// // 黑名单
// // 1、加入黑名单
//
// var userId = "xxxx";
// RongIMClient.getInstance().addToBlacklist(userId,{
//     onSuccess: function(chatRoom) {
//         // 加入黑名单成功。
//     },
//     onError: function(error) {
//         // 加入黑名单失败。
//     }
// });
// // 2、移除黑名单
//
// var userId = "xxx";
// RongIMClient.getInstance().removeFromBlacklist(userId, {
//     onSuccess: function() {
//     },
//     onError: function(error) {
//     }
// });
// // 3、获取黑名单
//
// RongIMClient.getInstance().getBlacklist({
//     onSuccess: function(list) {
//         // list => 黑名单列表
//     },
//     onError: function(error) {
//         // 获取黑名单失败
//     }
// });
// // 4、检查黑名单
//
// var userId = "xxx";
// RongIMClient.getInstance().getBlacklistStatus(userId,{
//     onSuccess: function(status) {
//         // status => 状态
//     },
//     onError: function(error) {
//     }
// });
// // 配置参数
// // http 或 https
// // 1、有服务的情况下无需设置 http 或 https，WebSDK 自动兼容 ，但访问静态文件必须，路径以 file:///D:**** 开头的必须设置：
// //
// //     2、DCloud 、 HBuilder 开发者一定要设置。
// //
// // window["SCHEMETYPE"] = "http";
//
