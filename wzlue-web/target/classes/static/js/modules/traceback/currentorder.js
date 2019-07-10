/*0是当前订单*/
/*1是来源订单*/
/*2是关联订单*/

/**货物当前订单*/
// var goodsOrder = {
//     i18n,
//     data: function () {
//         return {
//             toShow: false,
//             priceVersionShow: false,
//             storageInfo: true,
//             goodsOrder: {},
//             paymentMethods: ['余额支付', '银联支付', '公司转账'],
//             transactionModes: ['一次性支付', '分期支付', '其他（账期）'],
//             orderStatus: {
//                 pre: '待审核',
//                 ep: '审核通过',
//                 af: '审核失败',
//                 tbc: '待确认',
//                 ctom: '待卖家确认取消',
//                 cto: '订单取消',
//                 tbp: '待支付',
//                 ap: '已付款',
//                 tbd: '待发货',
//                 tbpu: '待提货',
//                 s: '已发货',
//                 pr: '待收货',
//                 tc: '交易完成',
//                 agr: '代理',
//             },
//             depot: {},
//             kdnData: {
//                 serviceType: "B",
//                 expCode: "",
//                 expNo: "",
//                 showType: "normal",
//                 container: "shipElement"
//             },
//         }
//     },
//     props: ['contract_params', 'type', 'order_id'],
//     template: `\n    <div>\n            <form class="form-horizontal">\n            <div class="row" style="border:1px solid #ddd;">\n                <div class="text-center col-sm-4">\n                    <div>{{$t('ContractNumber')}}：{{goodsOrder.agreementId}}</div>\n                    <div>{{$t('OrderId')}}：{{goodsOrder.orderNumber}}</div>\n                    <div v-if="goodsOrder.isAgent == '1'">{{$t('agentOrder')}}：{{goodsOrder.agentOrderNumber}}</div>\n                    <h1>{{getOrderStatus()}}</h1>\n                    <!--<button v-if="goodsOrder.orderStatus == 'tbp'">{{$t('ImmediatePayment')}}</button>-->\n                </div>\n                <div class="col-sm-1">\n                    <hr style="width:1px;height:100px; background-color: #0a0a0a "></hr>\n                </div>\n                <div class="col-sm-3 text-center">\n                    <div>{{$t('ConsigneeInformation')}}</div>\n                    <div>{{$t('consignee')}}：{{goodsOrder.cinfo == null ? '' :goodsOrder.cinfo.consigneeName}}</div>\n                    <div>{{$t('address')}}：{{goodsOrder.cinfo == null ? '' :goodsOrder.cinfo.consigneeAddress}}</div>\n                    <div>{{$t('phone')}}：{{goodsOrder.cinfo == null ? '' :goodsOrder.cinfo.consigneePhone}}</div>\n                </div>\n                <div class="col-sm-1">\n                    <hr style="width:1px;height:100px; background-color: #0a0a0a "></hr>\n                </div>\n                <div class="col-sm-3 text-center">\n                    <div>{{$t('PaymentMethod')}}：{{getPaymentMethod()}}</div>\n                    <div>{{$t('PaymentMethod')}}：{{getTransactionMode()}}</div>\n                    <div>{{$t('DistributionMode')}}：{{goodsOrder.distributionMode ==0?'商家安排':'自行安排'}}</div>\n                    <div>{{$t('StorageMode')}}：{{goodsOrder.storageMode ==0?'商家安排':'自行安排'}}</div>\n                    <div>{{$t('CargoParticipation')}}：{{goodsOrder.insuranceMethod ==0?'商家安排':'自行安排'}}</div>\n                </div>\n            </div>\n        </form>\n        <div class="panel panel-default">\n            <div class="panel-heading">\n                <div class="panel-title text-left"><span>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('business')}}：{{goodsOrder.sellerName}}            {{$t('ContactInformation')}}：{{goodsOrder.sellerContact}}</span>\n                </div>\n            </div>\n            <div class="panel-body">\n                <div>{{$t('OrderInformation')}}</div>\n                <span>{{$t('CreationTime')}}：{{goodsOrder.createTime}}</span>\n                <table class="table table-striped table_list" id="contenTable"></table>\n                <table class="table table-striped table_list" id="commondityTable"\n                       ></table><!--v-show="goodsOrder.goodsCsc==0 || goodsOrder.goodsCsc == null"-->\n                <div class="panel panel-default" v-show="priceVersionShow">\n                    <div class="panel-heading">\n                        改价记录\n                    </div>\n                    <div class="panel-body" id="priceVersion">\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-sm-1 text-right"><span>{{$t('Remarks')}}</span></div>\n                    <div class="col-sm-8"><input type="text" class="form-control" v-model="goodsOrder.remarks"\n                                                 :placeholder="$t('Remarks')"/></div>\n                </div>\n\n                <!--仓储信息-->\n                <div class="row" v-if="storageInfo">\n                    <div class="panel panel-default">\n                        <div class="panel-heading">\n                            <h3 class="panel-title">\n                                {{$t('WarehousingInformation')}}\n                            </h3>\n                        </div>\n                        <div class="panel-body">\n                            <div class="row">\n                                <div class="col-sm-4">{{$t('warehouseName')}}：{{depot.storageName}}</div>\n                                <div class="col-sm-4">{{$t('contact')}}：{{depot.contact}}</div>\n                                <div class="col-sm-4">{{$t('phone')}}：{{depot.phone}}</div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">{{$t('mailbox')}}:{{depot.email}}</div>\n                                <!--<div class="col-sm-4">{{$t('ChargeUnitPrice')}}：{{depot.price}}&nbsp;{{depot.unit==0?'元/吨/天':'元/千克/天'}}</div>\n                                --><div class="col-sm-4">{{$t('address')}}：{{depot.address}}</div>\n\n                            </div>\n                            <!--<div class="row" v-if="storageInfo">\n                                <div style="color: red;">{{$t('StorageChargesAccordingToThe')}}{{depot.price}}&nbsp;{{depot.unit==0?'元/吨/天':'元/千克/天'}}{{$t('Collect')}}，{{$t('OtherFeesChargedAtOnce')}}。</div>\n                                <table class="table table-bordered">\n                                    <tr>\n                                        <td>{{$t('WarehousingFee')}}</td>\n                                        <td>{{$t('HandlingCharge')}}</td>\n                                        <td>{{$t('DisposalCharge')}}</td>\n                                        <td>{{$t('RepeatUpAndDown')}}</td>\n                                        <td>{{$t('SortingFee')}}</td>\n                                        <td>{{$t('TallyFee')}}</td>\n                                        <td>{{$t('CopyTheCodeFor')}}</td>\n                                        <td>{{$t('AfterFrozenFee')}}</td>\n                                    </tr>\n                                    <tr>\n                                        <td>{{depot.money1}}</td>\n                                        <td>{{depot.money2}}</td>\n                                        <td>{{depot.money3}}</td>\n                                        <td>{{depot.money4}}</td>\n                                        <td>{{depot.money5}}</td>\n                                        <td>{{depot.money6}}</td>\n                                        <td>{{depot.money7}}</td>\n                                        <td>{{depot.money8}}</td>\n                                    </tr>\n                                    <tr>\n                                        <td>{{$t('InspectionOfTransferFare')}}</td>\n                                        <td>{{$t('CheckTheCostOfDigging')}}</td>\n                                        <td>{{$t('CheckSwitchBoxDoorChargesAndLeadSeals')}}</td>\n                                        <td>{{$t('DoorToDoorInspectionFee')}}</td>\n                                        <td>{{$t('EntryAndExitFee')}}</td>\n                                        <td>{{$t('WrappingFilm')}}</td>\n                                        <td>{{$t('BoxCarOpposite')}}</td>\n                                        <td>{{$t('PreCoolingFee')}}</td>\n                                    </tr>\n                                    <tr>\n                                        <td>{{depot.money9}}</td>\n                                        <td>{{depot.money10}}</td>\n                                        <td>{{depot.money11}}</td>\n                                        <td>{{depot.money12}}</td>\n                                        <td>{{depot.money13}}</td>\n                                        <td>{{depot.money14}}</td>\n                                        <td>{{depot.money15}}</td>\n                                        <td>{{depot.money16}}</td>\n                                    </tr>\n                                </table>\n                            </div>\n                            --><div class="row">\n                                <div class="col-sm-12">{{$t('Remarks')}}：{{depot.remarks}}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="panel panel-default" v-show="toShow">\n                    <div class="panel-heading">\n                        <div class="panel-title">{{$t('LogisticsDetails')}}</div>\n                    </div>\n                    <div class="panel-body">\n                        <div v-show="goodsOrder.orderGoodsType == 0">\n                            <a>{{$t('ClickToViewLogisticsDetails')}}</a>\n                        </div>\n                        <div id="shipElement" v-show="goodsOrder.orderGoodsType == 1"></div>\n                    </div>\n                </div>\n\n                <div class="text-right">\n                    <div>{{$t('TotalPrice')}}：￥{{goodsOrder.totalPrice}}</div>\n                    <!--<div>{{$t('freight')}}：￥{{goodsOrder.transportationExpenses}}</div>\n                    --><div>{{$t('RealPayment')}}：￥{{goodsOrder.actualPayment==null?0:goodsOrder.actualPayment}}</div>\n                </div>\n            </div>\n        </div>\n        </div>\n    `,
//     methods: {
//         //获取订单状态的中文
//         getOrderStatus: function () {
//             return this.orderStatus[this.goodsOrder.orderStatus];
//         },
//         //支付方式余额支付和银联支付线下转账
//         getPaymentMethod: function () {
//             return this.paymentMethods[this.goodsOrder.paymentMethod];
//         },
//         //付款方式，一次性付清
//         getTransactionMode: function () {
//             return this.transactionModes[this.goodsOrder.transactionMode];
//         },
//         getInfo: function () {
//             var _this = this;
//             _this.goodsOrder = {};
//             _this.address = {};
//             _this.addids = [];
//             var url;
//             console.log("**************************分割线***************************currentorder.js:59")
//             if (this.type == 0) {
//                 url = baseURL + "order/goodsorder/info/" + _this.contract_params.orderId;
//             } else if(this.type == 1){
//                 console.log(_this.contract_params.orderNumber)
//                 url = baseURL + "order/goodsorder/infoByOrderNumber/" + _this.contract_params.orderNumber;
//             }else if(this.type ==2){
//                 url = baseURL + "order/goodsorder/info/" + _this.order_id;
//             }
//             //$("#contenTable").bootstrapTable('lo',r.goodsOrder.detail);
//             $.get(url, function (r) {
//                 var status = r.goodsOrder.orderStatus;
//                 if (status == 'tc') {
//                     _this.aftersaleShow = true;
//                 }
//                 if (status == 'tbc') {//投诉按钮
//                     _this.complaintShow = false;
//                 }
//                 _this.toShow = false;
//                 //物流信息
//                 if (status == 's' || status == 'pr') {
//                     _this.toShow = true;
//                 }
//
//                 var ship = r.goodsOrder.ship;
//                 if (ship != null) {
//                     _this.kdnData.expCode = ship.logisticsCode;
//                     _this.kdnData.expNo = ship.singleNumber;
//                     KDNWidget.run(_this.kdnData)
//                 }
//                 _this.showList = false;
//                 _this.goodsOrder = r.goodsOrder;
//                 if (r.goodsOrder.depot == null || r.goodsOrder.depot == '') {
//                     _this.storageInfo = false;
//                 } else {
//                     _this.storageInfo = true;
//                     _this.depot = _this.goodsOrder.depot;
//                 }
//
//                 if (_this.goodsOrder.cinfo != null) {
//                     _this.address = _this.goodsOrder.cinfo;
//                 }
//                 //订单详情中的分页中的条数
//                 $("#contenTable").bootstrapTable('load', {
//                     rows: r.goodsOrder.detail,
//                     total: r.goodsOrder.detail == null ? 0 : r.goodsOrder.detail.length
//                 });
//                 r.goodsOrder.detail.forEach(function (item) {
//                     item.goodsPromotionPrice = item.goodsPrice;
//                     item.totalPrice = item.goodsTotalPrice;
//                     _this.addids.push(item.oldGoodsNumber)
//                 })
//
//                 $("#addTable").bootstrapTable('load', {
//                     rows: r.goodsOrder.detail,
//                     total: r.goodsOrder.detail == null ? 0 : r.goodsOrder.detail.length
//                 })
//                 var commondity = [];
//                 _this.goodsOrder.detail.forEach(function (item) {
//                     commondity = commondity.concat(item.commoditys);
//                 })
//                 $("#commondityTable").bootstrapTable('load', {
//                     rows: commondity,
//                     total: commondity == null ? 0 : commondity.length
//                 });
//                 if (_this.goodsOrder.priceVersion != null && _this.goodsOrder.priceVersion != "") {
//                     _this.priceVersionShow = true;
//                     var list = "<div>";
//                     for (var i = 0; i < _this.goodsOrder.priceVersion.length; i++) {
//                         list += "<div>";
//                         list += "<label>原总价：</label><span>" + _this.goodsOrder.priceVersion[i].originalTotalPrice + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<label>现总价：</label><span>" + _this.goodsOrder.priceVersion[i].laterTotalPrice + "</span>&nbsp;&nbsp;&nbsp;&nbsp;";
//                         // list += "<label>原运费：</label><span>" + _this.goodsOrder.priceVersion[i].originalCarriage + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<label>现运费：</label><span>" + _this.goodsOrder.priceVersion[i].laterCarriage + "</span>&nbsp;&nbsp;&nbsp;&nbsp;";
//                         list += "<label>修改时间：</label>" + _this.goodsOrder.priceVersion[i].createTime;
//                         list += '</div>';
//                     }
//                     list += '</div>';
//                     $("#priceVersion").append(list);
//                 } else {
//                     _this.priceVersionShow = false;
//                 }
//             });
//         },
//         initTable() {
//             var _this = this;
//             $("#contenTable").bootstrapTable("destroy")
//             $("#contenTable").BT({
//                 height: 200,
//                 pagination: false,
//                 columns: [
//                     {
//                         title: _this.$t("product"),
//                         valign: 'middle',
//                         align: 'center',
//                         width: '50%',
//                         field: 'remarks',
//                         formatter: function (value, row) {
//                             var str;
//                             str = '<div class="col-sm-8">' +
//                                 '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +
//                                 '</div>' +
//                                 '<div class="col-sm-4">' +
//                                 '<div>名称:' + row.goodsName + '</div>' +
//                                 // '<div>规格:' + row.goodsUnit + '</div>' +
//                                 '</div>';
//                             return str;
//                         }
//                     },
//                     {title: _this.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsTotalPrice'},
//                     {title: _this.$t("num"), valign: 'middle', align: 'center', field: 'goodsCount'},
//                     {
//                         title: _this.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
//                         formatter: function (value, row) {
//                             var goodsPrice = row.goodsCount * row.goodsTotalPrice;
//                             return goodsPrice;
//                         }
//                     },
//                 ]
//             })
//             /*            //初始化商品列表
//                         $("#commondityTable").bootstrapTable("destroy")
//                         $('#commondityTable').BT({
//                                 {title: _this.$t("name"), field: 'commodityName'},
//                                 {title: _this.$t("price"), field: 'commodityPrice'},
//                                 {title: _this.$t("place"), field: 'commodityCountryName'},
//                                 {title: _this.$t("FactoryNumber"), field: 'commodityFactoryNumber'},
//                                 {title: _this.$t("num"), field: 'commodityCount'},
//                                 {title: _this.$t("pack"), field: 'commodityPacking'},
//                             ],
//                         })*/
//         }
//     },
//     created: function () {
//         this.getInfo();
//     },
//     mounted: function () {
//         this.initTable();
//     }
// }
var goodsOrder = {
    i18n,
    template: `
        <div>
            <div class="panel panel-default">
            <div class="panel-heading">
                <div class="panel-title"><span>{{$t('OrderDetails')}}</span></div>
            </div>
            <div class="panel-body">
                <!--订单详情-->
                <br>
                <div class="row">
                    <table class="table table-bordered">
                        <tr>
                            <td>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('Seller')}}：</label>
                                    {{goodsOrder.sellerName}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('address')}}：</label>
                                    {{goodsOrder.sellerAddress}}
                                </div>
                            </td>
                            <td rowspan="2">
                                <div style="margin-left: 120px"><h1>{{getOrderStatus()}}</h1></div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('OrderNumber')}}：</label>
                                    {{goodsOrder.orderNumber}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('CreationTime')}}：</label>
                                    {{goodsOrder.createTime}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('agentOrder')}}：</label>
                                    {{goodsOrder.agentOrderNumber}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('ContractNumber')}}：</label>
                                    {{goodsOrder.agreementId}}
                                </div>
                                <!-- <div class="row" v-show="goodsOrder.orderGoodsType==0">
                                     <label class="col-lg-1 control-label">{{$t('TransactionMode')}}：</label>
                                     <div>
                                         <label class="radio-inline" v-for="item in transactionManners">
                                             <input type="radio" v-model="goodsOrder.transactionManner"
                                                    name="transactionManner" :value="item" disabled>{{item}}
                                         </label>
                                     </div>
                                 </div>-->
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('Buyer')}}：</label>
                                    {{goodsOrder.purchaserCompanyName}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('address')}}：</label>
                                    {{goodsOrder.buyerAddress}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('contact')}}：</label>
                                    {{address.consigneeName}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('phone')}}：</label>
                                    {{address.consigneePhone}}
                                </div>
                                <div class="row">
                                    <label class="col-lg-1 control-label">{{$t('Area')}}：</label>
                                    {{address.consigneeAddress}}
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <br>
                <!--货物信息-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="panel-title"><span>{{$t('GoodsInformation')}}</span></div>
                    </div>
                    <div class="panel-body">
                        <div class="row" v-show="goodsOrder.goodsUnit==1">
                            <table class="table table-striped" id="contenTable"></table>
                        </div>
                        <div class="row" v-show="goodsOrder.goodsUnit==2||goodsOrder.goodsUnit==3">
                            <table class="table table-striped" id="contenTable2"></table>
                        </div>
                        <div class="panel panel-default" v-show="priceVersionShow">
                            <div class="panel-heading">改价记录</div>
                            <div class="panel-body" id="priceVersion"></div>
                        </div>
                    </div>
                </div>
                <!--约定条款-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="panel-title"><span>{{$t('AgreedTerms')}}</span></div>
                    </div>
                    <div class="panel-body">
                        <div v-show="goodsOrder.orderGoodsType==0">
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('Schedule')}}：</label>
                                {{goodsOrder.time}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('LoadingPort')}}：</label>
                                {{goodsOrder.place}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('DestinationPort')}}：</label>
                                {{goodsOrder.destination}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('Clause')}}：</label>
                                {{goodsOrder.clause}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('TransactionMode')}}：</label>
                                <div>
                                    <label class="radio-inline" v-for="item in transactionManners">
                                        <input type="radio" v-model="goodsOrder.transactionManner"
                                               name="transactionManner" :value="item" disabled>{{item}}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div v-show="goodsOrder.orderGoodsType==1">
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('DeliveryTime')}}：</label>
                                {{goodsOrder.time}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('PlaceOfDelivery')}}：</label>
                                {{goodsOrder.place}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('DateOfManufacture')}}：</label>
                                {{goodsOrder.productionDate}}
                            </div>
                            <div class="row">
                                <label class="col-lg-1 control-label">{{$t('ShelfLifeM')}}：</label>
                                {{goodsOrder.shelfLife}}
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-lg-1 control-label">{{$t('DocumentsRequired')}}：</label>
                            {{goodsOrder.documentsRequired}}
                        </div>
                        <div class="row">
                            <label class="col-lg-1 control-label">{{$t('PaymentTerm')}}：</label>
                            {{goodsOrder.paymentTerm}}
                        </div>
                        <div class="row">
                            <label class="col-lg-1 control-label" style="width: 9%">{{$t('Buyer')}}{{$t('BankCardNumber')}}：</label>
                            {{goodsOrder.buyerBankCard}}
                        </div>
                        <div class="row">
                            <label class="col-lg-1 control-label" style="width: 9%">{{$t('Seller')}}{{$t('BankCardNumber')}}：</label>
                            {{goodsOrder.sellerBankCard}}
                        </div>
                        <div class="row">
                            <label class="col-lg-1 control-label">{{$t('Remarks')}}：</label>
                            {{goodsOrder.remarks}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        <div class="panel panel-default" v-show="viewStatus==2">
                    <div class="panel-heading">
                        <div class="panel-title">
                            {{$t('LookAtTheLogistics')}}
                        </div>
                    </div>
                    <div class="panel-body">
                        <div id="shipElement"></div>
                    </div>
                </div>
        </div>
    `,
    data: function () {
        return {
            viewStatus: 0,//0查看详情1发货2:查看物流3:报关
            priceVersionShow: true,
            transactionManners: ['CFR', 'CIF', 'CPT', 'CIP', 'DAF', 'DES', 'DEQ', 'DDU', 'DDP', 'FOB', 'FCA', 'FAS', 'EXW'],
            orderStatus: {
                tbc: '待确认',
                cto: '订单取消',
                tbp: '待支付',
                ap: '已付款',
                tbd: '待发货',
                tbpu: '待提货',
                s: '已发货',
                pr: '待收货',
                tc: '交易完成',
            },
            kdnData: {
                serviceType: "B",
                expCode: "",
                expNo: "",
                showType: "normal",
                container: "shipElement"
            },
            address: {},
            goodsOrder: {}
        }
    },
    props: ['contract_params', 'type', "order_id"],
    methods: {
        inittable: function () {
            var _this = this;
            //详情页货物列表--带柜的
            $("#contenTable").bootstrapTable("destroy")
            $("#contenTable").BT({
                height: 150,
                pagination: false,
                columns: [
                    {checkbox: true, valign: 'middle', align: 'center'},
                    {
                        title: _this.$t("product"),
                        valign: 'middle',
                        align: 'center',
                        field: 'remarks',
                        formatter: function (value, row) {
                            var str;
                            var packing = row.commodityPacking == null ? '' : row.commodityPacking;
                            str = '<div class="row container" style="width: auto">' +
                                '<div class="col-sm-2 text-center" style="margin-top: 10px;">' +
                                '<div>品名:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '<div>包装:' + packing + '</div>' +
                                '</div>' +
                                '</div>';
                            return str;
                        }
                    },
                    {
                        title: _this.$t('place'),
                        field: 'commodityCountry',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: _this.$t('ProducerOrNumber'),
                        field: 'commodityFactoryNumber',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: _this.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row, index) {
                            if (row.priceUnit == 1) {
                                return value + "&nbsp;" + "元/吨";
                            } else if (row.priceUnit == 2) {
                                return value + "&nbsp;" + "元/千克";
                            } else if (row.priceUnit == 3) {
                                return value + "&nbsp;" + "美元/吨";
                            } else if (row.priceUnit == 4) {
                                return value + "&nbsp;" + "美元/千克";
                            }
                        }
                    },
                    {
                        title: _this.$t("Weight"), valign: 'middle', align: 'center', field: 'goodsCount',
                        formatter: function (value, row, index) {
                            if (row.goodsUnit == 1) {
                                return value + "&nbsp;" + "吨";
                            } else if (row.goodsUnit == 2) {
                                return value + "&nbsp;" + "千克";
                            }
                        }
                    },
                    {
                        title: _this.$t("PurchaseQuantitie"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderCount',
                        formatter: function (value, row) {
                            var unit;
                            if (_this.goodsOrder.goodsUnit == 1) {
                                unit = '柜';
                            } else if (_this.goodsOrder.goodsUnit == 2) {
                                unit = '吨';
                            } else if (_this.goodsOrder.goodsUnit == 3) {
                                unit = '千克';
                            }
                            return _this.goodsOrder.orderCount + "&nbsp;" + unit;
                            // return row.goodsCount;
                        }
                    },
                    {
                        title: _this.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var total;
                            if (_this.goodsOrder.goodsUnit == 1) {
                                total = (value * row.goodsCount * _this.goodsOrder.orderCount).toFixed(2);
                            } else if (_this.goodsOrder.goodsUnit == 2 || _this.goodsOrder.goodsUnit == 3) {
                                total = (value * _this.goodsOrder.orderCount).toFixed(2);
                            }
                            if (_this.goodsOrder.currency == 1) {
                                return total + "&nbsp;" + "元";
                            } else if (_this.goodsOrder.currency == 2) {
                                return total + "&nbsp;" + "美元";
                            }
                        }
                    },
                ]
            })
            //详情页货物列表--不带柜的
            $("#contenTable2").bootstrapTable("destroy")
            $("#contenTable2").BT({
                height: 150,
                pagination: false,
                columns: [
                    {checkbox: true, valign: 'middle', align: 'center'},
                    {
                        title: _this.$t("product"),
                        valign: 'middle',
                        align: 'center',
                        field: 'remarks',
                        formatter: function (value, row) {
                            var str;
                            var packing = row.commodityPacking == null ? '' : row.commodityPacking;
                            str = '<div class="row container" style="width: auto">' +
                                /*'<div class="col-sm-12 text-center">' +
                                 '<img class="thumbnail col-sm-1 col-md-offset-1" style="background-color:#f9f9f9" src="' + row.goodsImageUrl + '" alt="商品图片">' +*/
                                '<div class="col-sm-4 text-center" style="margin-top: 10px;">' +
                                '<div>品名:' + row.goodsName + '</div>' +
                                // '<div>规格:' + row.goodsUnit + '</div>' +
                                '<div>包装:' + packing + '</div>' +
                                '</div>' +
                                '</div>';
                            return str;
                        }
                    },
                    {
                        title: _this.$t('place'),
                        field: 'commodityCountry',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: _this.$t('ProducerOrNumber'),
                        field: 'commodityFactoryNumber',
                        valign: 'middle',
                        align: 'center',
                        width: '10%'
                    },
                    {
                        title: _this.$t("UnitPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row, index) {
                            if (row.priceUnit == 1) {
                                return value + "&nbsp;" + "元/吨";
                            } else if (row.priceUnit == 2) {
                                return value + "&nbsp;" + "元/千克";
                            } else if (row.priceUnit == 3) {
                                return value + "&nbsp;" + "美元/吨";
                            } else if (row.priceUnit == 4) {
                                return value + "&nbsp;" + "美元/千克";
                            }
                        }
                    },
                    /* {
                     title: _this.$t("Weight"), valign: 'middle', align: 'center', field: 'goodsCount',
                     formatter: function (value, row, index) {
                     if (row.goodsUnit == 1) {
                     return value + "&nbsp;" + "吨";
                     } else if (row.goodsUnit == 2) {
                     return value + "&nbsp;" + "千克";
                     }
                     }
                     },*/
                    {
                        title: _this.$t("PurchaseQuantitie"),
                        valign: 'middle',
                        align: 'center',
                        field: 'orderCount',
                        formatter: function (value, row) {
                            var unit;
                            if (_this.goodsOrder.goodsUnit == 1) {
                                unit = '柜';
                            } else if (_this.goodsOrder.goodsUnit == 2) {
                                unit = '吨';
                            } else if (_this.goodsOrder.goodsUnit == 3) {
                                unit = '千克';
                            }
                            return _this.goodsOrder.orderCount + "&nbsp;" + unit;
                            // return row.goodsCount;
                        }
                    },
                    {
                        title: _this.$t("TotalPrice"), valign: 'middle', align: 'center', field: 'goodsPrice',
                        formatter: function (value, row) {
                            var total;
                            if (_this.goodsOrder.goodsUnit == 1) {
                                total = (value * row.goodsCount * _this.goodsOrder.orderCount).toFixed(2);
                            } else if (_this.goodsOrder.goodsUnit == 2 || _this.goodsOrder.goodsUnit == 3) {
                                total = (value * _this.goodsOrder.orderCount).toFixed(2);
                            }
                            if (_this.goodsOrder.currency == 1) {
                                return total + "&nbsp;" + "元";
                            } else if (_this.goodsOrder.currency == 2) {
                                return total + "&nbsp;" + "美元";
                            }
                        }
                    },

                ]
            })
        },
        //获取详情
        getInfo: function (orderId) {
            this.goodsOrder = {};
            this.address = {};
            vm.viewStatus = 0;
            var _this = this;
            //$("#contenTable").bootstrapTable('lo',r.goodsOrder.detail);
            var url;
            if (this.type == 0) {
                url = baseURL + "order/goodsorder/info/" + _this.contract_params.orderId;
            } else if (this.type == 1) {
                url = baseURL + "order/goodsorder/infoByOrderNumber/" + _this.contract_params.orderNumber;
            } else if (this.type == 2) {
                url = baseURL + "order/goodsorder/info/" + _this.order_id;
            }
            $.get(url, function (r) {
                _this.goodsOrder = r.goodsOrder;
                if (_this.goodsOrder.cinfo != null) {
                    _this.address = _this.goodsOrder.cinfo;
                }
                _this.complaintShow = true;
                var status = r.goodsOrder.orderStatus;
                if (status == 'tbc') {//投诉按钮
                    _this.complaintShow = false;
                }
                /*  if (_this.goodsOrder.depot != null) {
                 _this.depot = _this.goodsOrder.depot;
                 _this.showDepot = true;
                 }*/
                var ship = r.goodsOrder.ship;
                if (ship != null) {
                    _this.kdnData.expCode = ship.logisticsCode;
                    _this.kdnData.expNo = ship.singleNumber;
                    KDNWidget.run(_this.kdnData)
                }
                /* if (_this.goodsOrder.files != null) {
                 _this.files = _this.goodsOrder.files;
                 }*/
                //订单信息的分页条数显示
                $("#contenTable").bootstrapTable('load', {
                    rows: r.goodsOrder.detail,
                    total: r.goodsOrder.detail == null ? 0 : r.goodsOrder.detail.length
                });
                $("#contenTable2").bootstrapTable('load', {
                    rows: r.goodsOrder.detail,
                    total: r.goodsOrder.detail == null ? 0 : r.goodsOrder.detail.length
                });
                /* var commondity = [];
                 _this.goodsOrder.detail.forEach(function (item) {
                 commondity = commondity.concat(item.commoditys);
                 })*/
                if (_this.goodsOrder.ship != null) {
                    _this.goodsOrderShip = _this.goodsOrder.ship
                }
                /*//产地分页的数量显示数据
                 $("#commondityTable").bootstrapTable('load', {
                 rows: commondity,
                 total: commondity == null ? 0 : commondity.length
                 })
                 $('#commondityTable').bootstrapTable('resetView');
                 */
                if (_this.goodsOrder.priceVersion != null && _this.goodsOrder.priceVersion != "") {
                    _this.priceVersionShow = true;
                    var list = "<div>";
                    for (var i = 0; i < _this.goodsOrder.priceVersion.length; i++) {
                        list += "<div>";
                        list += "<label>原总价：</label><span>" + _this.goodsOrder.priceVersion[i].originalTotalPrice + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<label>现总价：</label><span>" + _this.goodsOrder.priceVersion[i].laterTotalPrice + "</span>&nbsp;&nbsp;&nbsp;&nbsp;";
                        // list += "<label>原运费：</label><span>" + _this.goodsOrder.priceVersion[i].originalCarriage + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<label>现运费：</label><span>" + _this.goodsOrder.priceVersion[i].laterCarriage + "</span>&nbsp;&nbsp;&nbsp;&nbsp;";
                        list += "<label>修改时间：</label>" + _this.goodsOrder.priceVersion[i].createTime;
                        list += '</div>';
                    }
                    list += '</div>';
                    $("#priceVersion").append(list);
                } else {
                    _this.priceVersionShow = false;
                }
            });
        },
        //页面获取订单状态
        getOrderStatus: function () {
            return this.orderStatus[this.goodsOrder.orderStatus];
        },
    },
    updated: function () {
        // $('#contenTable').bootstrapTable('resetView');
        // $('#contenTable2').bootstrapTable('resetView');
    },
    created: function () {
        this.getInfo(this.contract_params.orderId)
    },
    mounted: function () {
        this.inittable();
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#contenTable").bootstrapTable.defaults.locale = "en-US";
                $("#contenTable2").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#contenTable").bootstrapTable.defaults.locale = "zh-CN";
                $("#contenTable2").bootstrapTable.defaults.locale = "zh-CN";
            }
            this.initTable();
        },
    }
}
Vue.component('order-current-goods', goodsOrder);
/**物流当前订单*/
var logisticsOrder = {
    i18n,
    template: `        \n    <form class="form-horizontal">\n            <div class="row">\n                <div class="panel panel-default col-sm-6 text-center" style="height: 200px">\n                    <div class="panel-body text-center" style="height: 300px">\n                        <div class="row">\n                            <div class="col-sm-4">\n                                <div class="pull-right">{{$t('ContractNumber')}}：</div>\n                            </div>\n                            <div class="col-sm-6">\n                                <div class="pull-left">{{logisticsOrder.contractNumber}}</div>\n                            </div>\n                        </div>\n                        <div class="row">\n                            <div class="col-sm-4">\n                                <div class="pull-right">{{$t('OrderId')}}：</div>\n                            </div>\n                            <div class="col-sm-6">\n                                <div class="pull-left">{{logisticsOrder.orderNumber}}</div>\n                            </div>\n                        </div>\n                        <template v-if="logisticsOrder.orderStatus==0">\n                            <h1 style="color: red;">{{$t('WaitForPayment')}}</h1>\n                            <!--<button class="btn btn-primary btn-sm">{{$t('ClickOnPayment')}}</button>-->\n                            <!--<button class="btn btn-primary btn-sm" onclick="cancel('+row.id+')">-->\n                            <!--{{$t('CancellationOfOrder')}}-->\n                            <!--</button>-->\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==1">\n                            <h1 style="color: red;">{{$t('PendingPayment')}}</h1>\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==2">\n                            <h1 style="color: green;">{{$t('PendingShip')}}</h1>\n                        </template>\n                        <!--<template v-if="logisticsOrder.orderStatus==1">-->\n                        <!--<h1 v-if="logisticsOrder.passStatus==0">物流费未结清</h1>-->\n                        <!--<button v-if="logisticsOrder.passStatus==0">立即付款</button>-->\n                        <!--<h1 v-if="logisticsOrder.passStatus==1">物流费已结清</h1>-->\n                        <!--</template>-->\n                        <template v-if="logisticsOrder.orderStatus==3">\n                            <h1 style="color: green;">{{$t('PendingShip')}}</h1>\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==5">\n                            <h1 style="color: green;">{{$t('PendingReceipt')}}</h1>\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==6">\n                            <h1 style="color: green;">{{$t('TransactionCompletion')}}</h1>\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==7">\n                            <h1 style="color: green;">{{$t('OrderCancelled')}}</h1>\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==8">\n                            <h1 style="color: red;">{{$t('OrderBuyCancelled')}}</h1>\n                        </template>\n                        <template v-if="logisticsOrder.orderStatus==9">\n                            <h1 style="color: red;">{{$t('OrderCancelled')}}</h1>\n                        </template>\n                       </div>\n                </div>\n      <div class="panel panel-default col-sm-6" style="height: 200px"> \n <div class="panel-body"> \n <div class="col-sm-6"> \n  <h4><b>{{$t('OriginInformation')}}</b></h4><br> \n  <div>{{$t('contact')}}：{{logisticsOrder.buyContact}}</div> \n <div>{{$t('phone')}}：{{logisticsOrder.buyPhone}}</div> \n <div>{{$t('StartingAddress')}}：{{logisticsOrder.buyAddress}}</div>  \n </div> \n <div class="col-sm-6"> \n <h4><b>{{$t('ReceiptInformation')}}</b></h4><br> \n <div>{{$t('contact')}}：{{logisticsOrder.contact}}</div> \n <div>{{$t('phone')}}：{{logisticsOrder.phone}}</div> \n <div>{{$t('ReceivingAddress')}}：{{logisticsOrder.address}}</div> \n </div> \n </div> \n </div> \n     </div>\n\n            <!--下单信息-->\n            <div class="panel panel-default">\n                <div class="panel-title text-left"><span>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('business')}}：{{logisticsOrder.merchantCompanyName}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('ContactInformation')}}：{{logisticsOrder.merchantPhone}}</span>\n                </div>\n                <div class="panel-body">\n                    <div>\n                        {{$t('OrderInformation')}}\n                    </div>\n                    <div>{{$t('OrderTime')}}：{{logisticsOrder.createdTime}}</div>\n\n                    <table class="table table-striped table_list" id="contentTable"></table>\n       <div style="font-weight: bold;">{{$t('InspectionNo')}}：{{logisticsOrder.inspectionNo}}</div> \n               <table class="table table-striped table_list" id="commodityTable"></table>\n                    <div class="row">\n                        <div class="col-sm-1 text-right"><span>{{$t('Remarks')}}</span></div>\n                        <div class="col-sm-8"><textarea type="text" class="form-control"\n                                                        v-model="logisticsOrder.remarks"\n                                                        :placeholder="$t('Remarks')"></textarea></div>\n                    </div>\n                    <div class="text-right">\n                        <div v-if="logisticsOrder.unit==0">\n<div>{{$t('TotalPrice')}}：{{logisticsOrder.total}}{{$t('Yuan')}}</div>\n</div>\n  <div v-if="logisticsOrder.unit==1">\n<div>{{$t('TotalPrice')}}：{{logisticsOrder.total}}{{$t('Dollar')}}</div>\n</div>   \n                     <!--<div>{{$t('freight')}}：￥0.00</div>\n                        <div>{{$t('RealPayment')}}：￥{{logisticsOrder.total}}</div>\n -->                   </div>\n                </div>\n            </div>\n            <!--物流信息-->\n            <div class="row">\n                <div class="form-group">\n                    <div class="panel panel-default" v-show="viewStatus==1">\n                        <div class="panel-heading">\n                            <div class="panel-title">\n                                {{$t('ShippingInformation')}}\n                            </div>\n                        </div>\n                        <div class="panel-body">\n                            <!--<div id="shipElement"></div>\n-->                            <form class="form-horizontal">\n                                <div v-show="logisticsOffer.type==0" class="form-group row">\n                                    <label for="logisticsCode" style="width: 120px" class="col-sm-3 control-label">{{$t('LogisticsCompany')}}</label>\n                                    <!--<div class="col-md-2" id="logisticsCode">\n                                        <_this-select :options="logisticsOptions" title="选择快递" search="true"\n                                                   v-model="logisticsOrderShip.logisticsCode"\n                                                   :value="logisticsOrderShip.logisticsCode"\n                                                   name="logisticsOptions"></_this-select>\n-->                                      <div class="col-md-2">\n  <input class="form-control" type="text" :disabled="viewStatus != 1" id="logisticsCode" v-model="logisticsOrderShip.logisticsCode"/>\n\n                                    </div>\n                                    <label for="logisticsNumber" style="width: 120px" class="col-sm-3 control-label">{{$t('LogisticsSingleNumber')}}</label>\n                                    <div class="col-md-2">\n                                        <input class="form-control" type="text" :disabled="viewStatus != 1"\n                                               id="logisticsNumber"\n                                               v-model="logisticsOrderShip.logisticsNumber"/>\n                                    </div>\n                                    <label for="numberPlate" style="width: 120px" class="col-sm-3 control-label">{{$t('LicensePlateNumber')}}</label>\n                                    <div class="col-md-2">\n                                        <input class="form-control" type="text" :disabled="viewStatus != 1"\n                                               id="numberPlate"\n                                               v-model="logisticsOrderShip.numberPlate"/>\n                                    </div>\n                                </div>\n                                <div v-show="logisticsOffer.type==0" class="form-group row">\n                                    <label for="driverName" style="width: 120px" class="col-sm-3 control-label">{{$t('DriverName')}}</label>\n                                    <div class="col-md-2">\n                                        <input class="form-control" type="text" :disabled="viewStatus != 1"\n                                               id="driverName"\n                                               v-model="logisticsOrderShip.driverName"/>\n                                    </div>\n                                    <label for="driverNumber" style="width: 120px" class="col-sm-3 control-label">{{$t('DriverNumber')}}</label>\n                                    <div class="col-md-2">\n                                        <input class="form-control" type="text" :disabled="viewStatus != 1"\n                                               id="driverNumber"\n                                               v-model="logisticsOrderShip.driverNumber"/>\n                                    </div>\n                                    <label for="driverIdNumber" style="width: 120px" class="col-sm-3 control-label">{{$t('DriverIdNumber')}}</label>\n                                    <div class="col-md-2">\n                                        <input class="form-control" type="text" :disabled="viewStatus != 1"\n                                               id="driverIdNumber"\n                                               v-model="logisticsOrderShip.driverIdNumber"/>\n                                    </div>\n                                </div>\n          \n <div v-show="logisticsOffer.type==1" class="form-group row"> \n  <label for="logisticsCode" style="width: 120px" class="col-sm-3 control-label">{{$t('ShippingAirlines')}}</label> \n <div class="col-md-2"> \n <input class="form-control" type="text" :disabled="viewStatus != 1" v-model="logisticsOrderShip.logisticsCode"/> \n</div> \n <label for="logisticsNumber" style="width: 120px" class="col-sm-3 control-label">{{$t('SeaAirBillOfLadingNo')}}</label> \n<div class="col-md-2"> \n <input class="form-control" type="text" :disabled="viewStatus != 1" v-model="logisticsOrderShip.logisticsNumber"/> \n </div> \n <label for="numberPlate" style="width: 120px" class="col-sm-3 control-label">{{$t('ContainerNo')}}</label> \n<div class="col-md-2"> \n <input class="form-control" type="text" :disabled="viewStatus != 1" v-model="logisticsOrderShip.numberPlate"/> \n</div> \n <label for="driverName" style="width: 120px" class="col-sm-3 control-label">{{$t('NameNumberOfVoyage')}}</label> \n <div class="col-md-2"> \n <input class="form-control" type="text" :disabled="viewStatus != 1" v-model="logisticsOrderShip.driverName"/> </div> \n </div> \n                      <div class="form-group row">\n                                    <label for="remark" style="width: 120px" class="col-sm-3 control-label">{{$t('Remarks')}}</label>\n                                    <div class="col-md-5">\n                                        <input class="form-control" type="text" :disabled="viewStatus != 1" id="remark"\n                                               v-model="logisticsOrderShip.remark"/>\n                                    </div>\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>`,
    data: function () {
        return {
            automaticShow: true,
            files: [],
            goods: [],
            viewStatus: null,
            logisticsOrderShip: {},
            logisticsOptions: [],
            logisticsOrder: {},
            logisticsOffer: {},
            kdnData: {
                serviceType: "B",
                expCode: "",
                expNo: "",
                showType: "normal",
                container: "shipElement"
            },
        }
    },
    props: ['contract_params', 'type', 'order_id'],

    methods: {
        //详情
        initTable: function () {
            var _this = this;
            $("#contentTable").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#contentTable").BT({
                columns: [
                    {title: _this.$t("Headlines"), field: 'title', align: 'center'},
                    {
                        title: _this.$t("UnitPrice"), field: 'price', align: 'center', formatter: function (value, row, index){
                            var str=''
                            if (row.unit == 0) {
                                str = value+ '元/m³';
                            } else if(row.unit == 1){
                                str = value+ '美元/m³';
                            }else if(row.unit == 2){
                                str = value+ '元/柜';
                            }else if(row.unit == 3){
                                str = value+ '元/车';
                            }else if(row.unit == 4){
                                str = value+ '美元/票';
                            }
                            return str
                        }
                    },
                    // {title: _this.$t("UnitPrice"), field: 'logisticsOfferEntity.price', align: 'center'},
                    {title: _this.$t("num"), field: 'num', align: 'center'},
                    {title: _this.$t("TotalPrice"), field: 'total',align: 'center'},
                    {
                        title: _this.$t("unit"), field: 'orderUnit', align: 'center', formatter: function (value, row, index){
                            var str = "";
                            if (row.unit == 0 || row.unit == 2 || row.unit == 3) {
                                str = '元';
                            } else if(row.unit == 1 || row.unit == 4){
                                str = '美元';
                            }
                            return str;
                        }
                    }
                ]
            });
            $("#commodityTable").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#commodityTable").BT({
                columns: [
                    {title: _this.$t("ProductName"), field: 'commodityName',align: 'center'},
                    {title: _this.$t("place"), field: 'commodityCountry', align: 'center'},
                    {title: _this.$t("ProducerOrNumber"),field: 'commodityFactoryNumber',align: 'center'},
                    {title: _this.$t("weight"), field: 'commodityCount', align: 'center'},
                    {
                        title: _this.$t("unit"), field: 'commodityUnit',align: 'center', formatter: function (value, row, index) {
                            if (value == 1) {
                                return '吨';
                            } else if (value == 2){
                                return '千克';
                            }

                        }
                    },{title:_this.$t("pack"),field:'commodityPacking',align:'center'}
                ]
            });
        },
        //订单详情
        orderDetail: function () {
            var _this = this;
            var url;
            if (this.type == 0) {
                url = baseURL + "logistics/logisticsorder/info/" + _this.contract_params.orderId;
            } else if (this.type == 1) {
                console.log("根据订单编号查询订单");
                url = '';
            } else if (this.type == 2) {
                url = baseURL + "logistics/logisticsorder/info/" + _this.order_id;
            }
            $('#contentTable').bootstrapTable('removeAll');//刷新清除之前数据
            $('#commodityTable').bootstrapTable('removeAll');
            $.get(url, function (r) {
                _this.logisticsOrder = r.data.logisticsOrder;
                _this.logisticsOffer = r.data.logisticsOffer;
                _this.logisticsOrder.logisticsOfferEntity.num = _this.logisticsOrder.num;
                _this.logisticsOrder.logisticsOfferEntity.total = _this.logisticsOrder.total;
                if (_this.type != 2) {
                    if (_this.logisticsOrder.numberType == 1) {
                        _this.contract_params.orderType = 0;
                        _this.contract_params.orderNumber = _this.logisticsOrder.numberCode;
                    }
                }
                if (_this.logisticsOrder.logisticsOrderShipEntity != null) {
                    _this.logisticsOrderShip = _this.logisticsOrder.logisticsOrderShipEntity;
                }
                if (_this.logisticsOrder.orderStatus > 3) {
                    _this.viewStatus = 1;
                }
                let data = [];
                let goods = [];
                data = _this.logisticsOrder.logisticsOfferEntity;
                goods = _this.logisticsOrder.logisticsOrderCommodityEntityList;
                $('#contentTable').bootstrapTable('append', data);//追加commodityTable
                $('#commodityTable').bootstrapTable('append', goods);
                _this.kdnData.expCode = _this.logisticsOrderShip.logisticsCode;
                _this.kdnData.expNo = _this.logisticsOrderShip.numberPlate;
                KDNWidget.run(_this.kdnData)
            });
        },
    },
    created: function () {
        console.log("订单详情")
        this.orderDetail();
    },
    mounted: function () {
        this.initTable();
    },

}
Vue.component('order-current-logistics', logisticsOrder);
/**报关当前订单*/
var declareOrder = {
    i18n,
    template: `\n    <div>\n            <form class="form-horizontal">\n            <div class="row">\n                <div class="panel panel-default col-sm-6 text-center" style="height: 200px">\n                    <div class="panel-body text-center" style="height: 300px">\n                        <div>{{$t('ContractNumber')}}：{{declareOrder.contractNumber}}</div>\n                        <div>{{$t('OrderId')}}：{{declareOrder.orderNumber}}</div>\n                        <!--<div>{{$t('TotalPrice')}}：{{declareOrder.total}}</div>\n-->                        <template v-if="declareOrder.orderState==0">\n                            <h1>{{$t('WaitingForConfirmation')}}</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==1">\n                            <h1>{{$t('accept')}}</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==2">\n                            <h1 v-if="declareOrder.payState==0">{{$t('WaitForPayment')}}</h1>\n                            <button v-if="declareOrder.payState==0">{{$t('ImmediatePayment')}}</button>\n                            <h1 v-if="declareOrder.payState==1">{{$t('TheStorageChargeHasBeenSettled')}}</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==3">\n                            <h1>{{$t('PendingShip')}}</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==4">\n                            <h1>{{$t('PendingReceipt')}}</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==5">\n                            <h1>待卖家取消</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==6">\n                            <h1>{{$t('OrderCompletion')}}</h1>\n                        </template>\n                        <template v-if="declareOrder.orderState==7">\n                            <h1>{{$t('OrderCancellation')}}</h1>\n                        </template>\n                    </div>\n                </div>\n                <div class="panel panel-default col-sm-6" align="center" style="height: 200px">\n                    <!--v-if="order.passStatus==1"-->\n                    <div class="panel-body">\n                        <div>{{$t('ConsigneeInformation')}}</div>\n                        <div>{{$t('consignee')}}：{{declareOrder.buyContacts}}</div>\n                        <div>{{$t('address')}}：{{declareOrder.buyAddress}}</div>\n                        <div>{{$t('phone')}}：{{declareOrder.buyPhone}}</div>\n                    </div>\n                </div>\n            </div>\n\n        </form>\n\n        <div class="row" v-show="fileShow">\n            <div class="panel panel-default">\n                <div class="panel-heading">\n                    <h3 class="panel-title">\n                        {{$t('customsInformation')}}\n                    </h3>\n                </div>\n                <div class="panel-body">\n                    <div class="row">\n                        <div class="col-sm-12">\n        <div class="col-sm-4"> \n     &nbsp;&nbsp;&nbsp;{{$t('InspectionNo')}}:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{declareOrder.inspectionNo}} \n <!--<div class="form-group"> \n <div class="col-sm-2 control-label">{{$t('InspectionNo')}}:</div> \n <div class="col-sm-10">{{declareOrder.inspectionNo}}</div> \n  </div> \n -->    </div>                     <div class="col-sm-4">\n                                <div class="form-group">\n                                    <div class="col-sm-2 control-label">{{$t('DeclarationForm')}}:</div>\n                                    <div class="col-sm-10" id="declare" style="display:none">\n                                        <a href="javascript:void(0)"                                          @click="fileDownload(fileList.declare,fileList.declareName)">{{$t('downLoad')}}</a>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="col-sm-4">\n                                <div class="form-group">\n                                    <div class="col-sm-2 control-label">{{$t('paymentSheet')}}:</div>\n                                    <div class="col-sm-10" id="scottare" style="display:none">\n                                        <a href="javascript:void(0)"                                         @click="fileDownload(fileList.scottare,fileList.scottareName)">{{$t('downLoad')}}</a>\n                                    </div>\n                                </div>\n                            </div>\n                            </div>\n                    </div>\n                    <div class="row">\n                        <div class="col-sm-12">\n               <div class="col-sm-4"> \n  <div class="form-group"> \n <div class="col-sm-2 control-label">{{$t('CheckList')}}:</div> \n <div class="col-sm-10" id="check" style="display:none"> \n <a href="javascript:void(0)" @click="fileDownload(fileList.check,fileList.checkName)">{{$t('downLoad')}}</a> \n </div> \n </div> \n </div>             <div class="col-sm-4">\n                                <div class="form-group">\n                                    <div class="col-sm-2 control-label">{{$t('QuarantineCertificate')}}:</div>\n                                    <div class="col-sm-10" id="quarantine" style="display:none">\n                                        <a href="javascript:void(0)"                                         @click="fileDownload(fileList.quarantine,fileList.quarantineName)">{{$t('downLoad')}}</a>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="col-sm-4">\n                                <div class="form-group">\n                                    <div class="col-sm-2 control-label">{{$t('Other')}}:</div>\n                                    <div class="col-sm-10" id="other" style="display:none">\n                                        <a href="javascript:void(0)"                                           @click="fileDownload(fileList.other,fileList.otherName)">{{$t('downLoad')}}</a>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <div class="panel panel-default">\n            <div class="panel-title text-left"><span>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('business')}}：{{declareOrder.merchantCompanyName}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('ContactInformation')}}：{{declareOrder.merchantPhone}}</span>\n            </div>\n            <div class="panel-body">\n                <div>\n                    {{$t('OrderInformation')}}\n                </div>\n                <div class="row">\n                    <div class="col-sm-3">{{$t('OrderTime')}}：{{declareOrder.createTime}}</div>\n                    <div class="col-sm-3">{{$t('SingleTime')}}：{{declareOrder.orderTime}}</div>\n                </div>\n\n                <table class="table table-striped table_list contenT" id="contenT"></table>\n\n                <table class="table table-striped table_list contenListTable" id="contenListTable"></table>\n                <div class="row">\n                    <div class="col-sm-1 text-right"><span>{{$t('Remarks')}}</span></div>\n                    <div class="col-sm-8"><input type="text" class="form-control" v-model="declareOrder.note" name="note"\n                                                 :placeholder="$t('Remarks')"/></div>\n                </div>\n                <div class="text-right">\n                    <div v-if="declareOrder.unit==0">\n<div>{{$t('TotalPrice')}}：{{declareOrder.total}}{{$t('Yuan')}}</div>\n</div>\n <div v-if="declareOrder.unit==1">\n<div>{{$t('TotalPrice')}}：{{declareOrder.total}}{{$t('Dollar')}}</div>\n</div>\n                <!--<div>{{$t('freight')}}：￥0.00</div>\n                    <div>{{$t('RealPayment')}}：{{declareOrder.total}}</div>\n-->                </div>\n            </div>\n        </div>\n        </div>\n    `,
    data: function () {
        return {
            automaticShow: true,
            fileShow: false,
            fileList: {},
            placeData: [],
            files: [],
            goods: [],
            declareOrder: {},
            unitList: [],
        }
    },
    props: ['contract_params', 'type', 'order_id'],
    methods: {
        //详情
        getInfo: function () {
            var _this = this;
            var url;
            if (this.type == 0) {
                url = baseURL + "declare/declareorder/info/" + _this.contract_params.orderId;
            } else if (this.type == 1) {
                url = '';
            } else if (this.type == 2) {
                url = baseURL + "declare/declareorder/info/" + _this.order_id;
            }
            $.get(url, function (r) {
                _this.declareOrder = r.declareOrder;
                if (_this.type != 2) {
                    if (_this.declareOrder.goodsType == 1) {
                        _this.contract_params.orderType = 0;
                        _this.contract_params.orderNumber = _this.declareOrder.goodsNumber;
                    }
                }
                var orderState = r.declareOrder.orderState;
                if (orderState == 0) {
                    _this.complaintShow = false;//投诉按钮
                }
                let data = [];
                _this.goods.forEach(function (item) {
                    item.commodityPrice = _this.declareOrder.price
                })
                _this.orderOfferEntity = _this.declareOrder.orderOfferEntity;
                _this.orderOfferEntity.num = _this.declareOrder.num;
                _this.orderOfferEntity.total = _this.declareOrder.total;
                data = _this.declareOrder.goods;
                $('.contenListTable').bootstrapTable('append', data);
                $('.contenT').bootstrapTable('append', _this.declareOrder.orderOfferEntity);
                // $('#goodsTab').bootstrapTable('append', data);

                //报盘文件下载显示判断
                if (null != _this.declareOrder.orderOssEntityList && _this.declareOrder.orderOssEntityList.length > 0) {
                    _this.fileShow = true;
                    var f = [];
                    f = _this.declareOrder.orderOssEntityList;
                    f.forEach(function (item, index) {
                        switch (item.type) {
                            case 1 :
                                $("#declare").show()
                                _this.fileList.declare = item.fileUrl
                                _this.fileList.declareName = item.fileName
                                $("#declare").prepend("<a>" + _this.fileList.declareName + "</a>&nbsp;&nbsp;");
                                break;
                            case 2:
                                $("#scottare").show()
                                _this.fileList.scottare = item.fileUrl
                                _this.fileList.scottareName = item.fileName
                                $("#scottare").prepend("<a>" + _this.fileList.scottareName + "</a>&nbsp;&nbsp;");
                                break;
                            case 3:
                                $("#check").show()
                                _this.fileList.check = item.fileUrl
                                _this.fileList.checkName = item.fileName
                                $("#check").prepend("<a>" + _this.fileList.checkName + "</a>&nbsp;&nbsp;");
                                break;
                            case 4:
                                $("#quarantine").show()
                                _this.fileList.quarantine = item.fileUrl
                                _this.fileList.quarantineName = item.fileName
                                $("#quarantine").prepend("<a>" + _this.fileList.quarantineName + "</a>&nbsp;&nbsp;");
                                break;
                            case 5:
                                $("#other").show()
                                _this.fileList.other = item.fileUrl
                                _this.fileList.otherName = item.fileName
                                $("#other").prepend("<a>" + _this.fileList.otherName + "</a>&nbsp;&nbsp;");
                                break;
                        }
                    })
                }
            });
        },
        //获取字典数据 -  货物重量单位
        getCommodityWeightUnit: function () {
            var _this = this;
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        _this.unitList = r.data;
                    }
                }
            })
        },
        fileDownload: function (data, name) {
            window.download(data, name);
        },
        initTable: function () {
            var _this = this;
            $("#contenT").bootstrapTable("destroy");
            $("#contenT").BT({
                columns: [
                    {
                        title: _this.$t("productName"), field: 'title'
                    },
                    {
                        title: _this.$t("UnitPrice"), field: 'chargeRules'
                    },
                    {
                        title: _this.$t("unit"), field: 'unit', formatter: function (value, row, index) {
                            var str = "";
                            if (row.unit == 0) {
                                str = '元/吨';
                            } else if (row.unit == 1) {
                                str = '元/千克';
                            } else if (row.unit == 2) {
                                str = '元/柜';
                            } else if (row.unit == 3) {
                                str = '元/m³';
                            } else if (row.unit == 4) {
                                str = '美元/m³';
                            }
                            return str;
                        }
                    },
                    {
                        title: _this.$t("num"), field: 'num'
                    },
                    {
                        title: _this.$t("TotalPrice"), field: 'total'
                    },
                    {
                        title: _this.$t("unit"), field: 'str', formatter: function (value, row, index) {
                            var str = "";
                            if (_this.declareOrder.unit == 0) {
                                str = '元';
                            } else if (_this.declareOrder.unit == 1) {
                                str = '美元';
                            } /*else {
                                var aa = vm.declareOrder.unit;
                                str = aa;
                            }*/
                            return str;
                        }
                    }
                ]
            });
            $("#contenListTable").bootstrapTable("destroy");
            $("#contenListTable").BT({
                columns: [
                    {
                        title: _this.$t("ProductName"), field: 'commodityName'
                    },
                    {
                        title: _this.$t("place"), field: 'commodityCountry'/*, formatter: function (value, row, index) {
                        if (row.commodityCountry == null) {
                            row.commodityCountry = '';
                        }
                        var str = "";

                        _this.placeData.forEach(function (item, index) {
                            if (item.code == row.commodityCountry) {
                                str = item.name;
                            }
                        })
                        return str;

                    }*/
                    },
                    {
                        title: _this.$t("ProducerOrNumber"),
                        field: 'commodityFactoryNumber'
                    },
                    {
                        title: _this.$t("height"),
                        field: 'commodityCount'
                    },
                    {
                        title: _this.$t("unit"), field: 'commodityUnit', formatter: function (value, row, index) {
                        if (row.commodityUnit == null) {
                            row.commodityUnit = '';
                        }
                        var str = "";

                        _this.unitList.forEach(function (item, index) {
                            if (item.code == row.commodityUnit) {
                                str = item.name;
                            }

                        })
                            if (str == '') {
                                if (row.commodityUnit == 1) {
                                    str = '吨';
                                } else if(row.commodityUnit == 2){
                                    str = '千克';
                                } else if(row.commodityUnit == 3){
                                    str == '柜'
                                } else {
                                    var aa = row.commodityUnit;
                                    str = aa;
                                }
                            }
                        return str;
                    }
                    },
                    {
                        title: _this.$t("pack"),
                        field: 'commodityPacking'
                    }
                ]

            });
        },
        getPlaceData: function () {
            var _this = this;
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        _this.placeData = r.data;
                    }
                }
            })
        },
    },
    created: function () {
        this.getCommodityWeightUnit();
        this.getPlaceData();
        this.getInfo();
    },
    mounted: function () {
        this.initTable()
    }
}
Vue.component('order-current-declare', declareOrder);
/**仓储当前订单*/
var storageOrder = {
    i18n,
    template: `\n     <form class="form-horizontal">\n                <div class="row">\n                    <div class="panel panel-default col-sm-6 text-center" style="height: 260px">\n                        <div class="panel-body text-center" style="height: 300px">\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('ContractNumber')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.contractNumber}}</div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('OrderId')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.orderNumber}}</div>\n                                </div>\n                            </div>\n                            <template v-if="order.passStatus==0">\n                                <h1>{{$t('WaitingForConfirmation')}}</h1>\n                            </template>\n                            <template v-if="order.passStatus==1">\n                                <h1>{{$t('Receipt')}}</h1>\n                            </template>\n                            <template v-if="order.passStatus==2">\n                                <h1 v-if="order.payStatus==0&&order.stockStatus==0">{{$t('InTheTransaction')}}</h1>\n                            </template>\n                            <template v-if="order.passStatus==3">\n                                <h1>{{$t('OrderCancelled')}}</h1>\n                            </template>\n                            <template v-if="order.passStatus==6">\n                                <h1 v-if="order.payStatus==0&&order.stockStatus==1">\n                                    {{$t('WarehousingChargesHaveNotBeenCleared')}}</h1>\n                            </template>\n                            <template v-if="order.passStatus==7">\n                                <h1 v-if="order.payStatus==1&&order.stockStatus==1">{{$t('TransactionCompletion')}}</h1>\n                            </template>\n                        </div>\n                    </div>\n                    <div class="panel panel-default col-sm-6" align="center" style="height: 260px"\n                         v-if="order.passStatus==1">\n                        <div class="panel-body">\n                            <h5>{{$t('WarehousePickUpInformation')}}</h5>\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('contact')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.merchantContact}}</div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('address')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.merchantAddress}}</div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('phone')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.merchantPhone}}</div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('MailboxAccount')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.merchantEmail}}</div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">\n                                    <div class="pull-right">{{$t('SingleTime')}}：</div>\n                                </div>\n                                <div class="col-sm-6">\n                                    <div class="pull-left">{{order.receiptTime}}</div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <!--报盘信息-->\n                <div class="row" v-if="offer">\n                    <div class="panel panel-default">\n                        <div class="panel-heading">\n                            <h3 class="panel-title">\n                                {{$t('WarehousingInformation')}}\n                            </h3>\n                        </div>\n                        <div class="panel-body">\n                            <div class="row">\n                                <div class="col-sm-4">{{$t('warehouseName')}}：{{offer.storageName}}</div>\n                                <div class="col-sm-4">{{$t('contact')}}：{{offer.contact}}</div>\n                                <div class="col-sm-4">{{$t('phone')}}：{{offer.phone}}</div>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">{{$t('ChargeUnitPrice')}}：{{offer.price}}&nbsp;{{offer.unit==0?'元/吨/天':'元/托/天'}}</div>\n                                <div class="col-sm-4">{{$t('address')}}：{{offer.provinceName}}&nbsp;{{offer.cityName}}&nbsp;{{offer.countyName}}</div>\n                                <div class="col-sm-4">{{$t('Area')}}:{{offer.area}}</div>\n                            </div>\n                            <div class="row" v-if="order.money1">\n                                <div style="color: red;">{{$t('StorageChargesAccordingToThe')}}{{offer.price}}&nbsp;{{offer.unit==0?'元/吨/天':'元/托/天'}}{{$t('Collect')}}，{{$t('OtherFeesChargedAtOnce')}}。</div>\n                                <table class="table table-bordered">\n                                    <tr>\n                                        <td>{{$t('WarehousingFee')}}</td>\n                                        <td>{{$t('HandlingCharge')}}</td>\n                                        <td>{{$t('DisposalCharge')}}</td>\n                                        <td>{{$t('RepeatUpAndDown')}}</td>\n                                        <td>{{$t('SortingFee')}}</td>\n                                        <td>{{$t('TallyFee')}}</td>\n                                        <td>{{$t('CopyTheCodeFor')}}</td>\n                                        <td>{{$t('AfterFrozenFee')}}</td>\n                                    </tr>\n                                    <tr>\n                                        <td></td>\n                                        <td>{{order.money1}}</td>\n                                        <td>{{order.money2}}</td>\n                                        <td>{{order.money3}}</td>\n                                        <td>{{order.money4}}</td>\n                                        <td>{{order.money5}}</td>\n                                        <td>{{order.money6}}</td>\n                                        <td>{{order.money7}}</td>\n                                    </tr>\n                                    <tr>\n                                        <td>{{$t('InspectionOfTransferFare')}}</td>\n                                        <td>{{$t('CheckTheCostOfDigging')}}</td>\n                                        <td>{{$t('CheckSwitchBoxDoorChargesAndLeadSeals')}}</td>\n                                        <td>{{$t('DoorToDoorInspectionFee')}}</td>\n                                        <td>{{$t('EntryAndExitFee')}}</td>\n                                        <td>{{$t('WrappingFilm')}}</td>\n                                        <td>{{$t('BoxCarOpposite')}}</td>\n                                        <td>{{$t('PreCoolingFee')}}</td>\n                                    </tr>\n                                    <tr>\n                                        <td>{{order.money8}}</td>\n                                        <td>{{order.money9}}</td>\n                                        <td>{{order.money10}}</td>\n                                        <td>{{order.money11}}</td>\n                                        <td>{{order.money12}}</td>\n                                        <td>{{order.money13}}</td>\n                                        <td>{{order.money14}}</td>\n                                        <td>{{order.money15}}</td>\n                                    </tr>\n                                </table>\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-12">{{$t('Remarks')}}：{{order.remarks}}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <!--下单信息-->\n                <div class="row">\n                    <div class="panel panel-default">\n                        <div class="panel-heading">\n                            <h3 class="panel-title">\n                                {{$t('SingleInformation')}}\n                            </h3>\n                        </div>\n                        <div class="panel-body">\n                            <div class="row">\n                                <div class="col-sm-4">{{$t('OrderTime')}}：{{order.createdTime}}</div>\n                                <div class="col-sm-4">{{$t('StorageDate')}}：{{order.intTime}}</div>\n                                <!--<div class="col-sm-4">预计出库日期：{{order.outTime}}</div>-->\n                            </div>\n                            <div class="row">\n                                <div class="col-sm-4">{{$t('contact')}}：{{order.contact}}</div>\n                                <div class="col-sm-4">{{$t('phone')}}：{{order.phone}}</div>\n                                <div class="col-sm-4">{{$t('MailboxAccount')}}：{{order.email}}</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <!--//货物信息-->\n                <div class="panel panel-default m-top-10">\n                    <div class="panel-heading">\n                        <span>{{$t('GoodsInformation')}}</span>\n                    </div>\n                    <div class="panel-body">\n                        <div class="row">\n                            <div class="col-xs-2">\n                                <input type="text" class="form-control" v-model="order.goodNumber" placeholder="订单编号" readonly/>\n   </div>\n        <div class="col-xs-4"> \n  <div class="form-group"> \n <label class="col-sm-4">{{$t('InspectionNo')}}</label> \n <div class="col-sm-7"> \n <input type="text" class="form-control" v-model="order.inspectionNo" name="inspectionNo" :placeholder="$t('InspectionNo')" disabled/> \n   </div> \n </div> \n </div>  \n               </div>\n                        <div class="row">\n                            <div class="col-sm-12 table-responsive" style="max-height: 550px;">\n                                <table class="table table-bordered">\n                                    <thead>\n                                    <tr>\n                                        <th>{{$t('ContainerNo')}}</th>\n                                        <!-- <th>{{$t('InspectionNo')}}</th>\n -->                                      <th>{{$t('ProductName')}}</th>\n                                        <th>{{$t('place')}}</th>\n                                        <th>{{$t('ProducerOrNumber')}}</th>\n                                        <th>{{$t('UnitPrice')}}</th>\n                                        <th>{{$t('Weight')}}</th>\n                                        <th>{{$t('unit')}}</th>\n                <th>{{$t('pack')}}</th>\n                         <th>{{$t('DateOfManufacture')}}</th>\n                                        <th>{{$t('ShelfLife')}}</th>\n                                        <th>{{$t('ExpirationDate')}}</th>\n                                        <!---->\n                                        <th>{{$t('WeightOfWarehouse')}}</th>\n                                        <!--<th>{{$t('QuantityOfWarehouse')}}</th>\n-->                                        <th>{{$t('OutgoingWeight')}}</th>\n                                        <!--<th>{{$t('QuantityOfOutgoing')}}</th>\n -->                                       <th>{{$t('ResidualWeight')}}</th>\n                                        <!--<th>{{$t('ResidualQuantity')}}</th>\n -->                                   </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr v-for="(item,index) in commodityEntityList">\n                                        <td>{{item.containerNo}}</td>\n                                        <!-- <td>{{item.inspectionNo}}</td>\n -->                                   <td>{{item.commodityName}}</td>\n                                        <td>{{item.commodityCountry}}</td>\n                                        <td>{{item.commodityFactoryNumber}}</td>\n                                        <td>{{item.commodityPrice}}</td>\n                                        <td>{{item.commodityCount}}</td><!--***-->\n                                        <td v-for="p in unitList" v-if="p.code==item.commodityUnit">{{p.name}}</td>\n                  <td>{{item.commodityPacking}}</td>\n                       <td>{{item.productionDate}}</td>\n                                        <td>{{item.qualityTime}}</td>\n                                        <td>{{item.expirationDate}}</td>\n                                        <!---->\n                                        <td v-if="item.weight!=null">{{item.weight}}{{item.unitName}}</td>\n                                        <td v-else>&nbsp;</td>\n                                        <!--<td v-if="item.merchantWeight!=null">{{item.merchantWeight}}{{item.unitName}}</td>\n                                        <td v-else>&nbsp;</td>\n -->                                       <td v-if="item.outWeight!=null">{{item.outWeight}}{{item.unitName}}</td>\n                                        <td v-else>&nbsp;</td>\n                                       <!-- <td v-if="item.outWeightNum!=null">{{item.outWeightNum}}{{item.unitName}}</td>\n                                        <td v-else></td>\n -->                                     <td v-if="item.outWeight!=null">{{item.residualWeight}}{{item.unitName}}</td>\n                                        <td v-else-if="item.weight==null">&nbsp;</td>\n                                        <td v-else>{{item.weight}}{{item.unitName}}</td>\n                                        <!--<td v-if="item.outWeightNum!=null">{{item.residualQuantity}}{{item.unitName}}</td>\n                                        <td v-else-if="item.merchantWeight!=null">{{item.merchantWeight}}{{item.unitName}}</td>\n                                        <td v-else></td>\n -->                                   </tr>\n                                    </tbody>\n                                    <!--<thead>-->\n                                    <!--<tr>-->\n                                        <!--<th>{{$t('WeightOfWarehouse')}}</th>-->\n                                        <!--<th>{{$t('QuantityOfWarehouse')}}</th>-->\n                                        <!--<th>{{$t('OutgoingWeight')}}</th>-->\n                                        <!--<th>{{$t('QuantityOfOutgoing')}}</th>-->\n                                        <!--<th>{{$t('ResidualWeight')}}</th>-->\n                                        <!--<th>{{$t('ResidualQuantity')}}</th>-->\n                                    <!--</tr>-->\n                                    <!--</thead>-->\n                                    <!--<tbody>-->\n                                    <!--<tr v-for="(item,index) in commodityEntityList">-->\n                                        <!--<td v-if="item.weight!=null">{{item.weight}}{{item.commodityUnitName}}</td>-->\n                                        <!--<td v-else>&nbsp;</td>-->\n                                        <!--<td v-if="item.merchantWeight!=null">{{item.merchantWeight}}{{item.unitName}}</td>-->\n                                        <!--<td v-else>&nbsp;</td>-->\n                                        <!--<td v-if="item.outWeight!=null">{{item.outWeight}}{{item.commodityUnitName}}</td>-->\n                                        <!--<td v-else>&nbsp;</td>-->\n                                        <!--<td v-if="item.outWeightNum!=null">{{item.outWeightNum}}{{item.unitName}}</td>-->\n                                        <!--<td v-else></td>-->\n                                        <!--<td v-if="item.outWeight!=null">{{item.weight-item.outWeight}}{{item.commodityUnitName}}</td>-->\n                                        <!--<td v-else-if="item.merchantWeight!=null">{{item.weight}}{{item.commodityUnitName}}</td>-->\n                                        <!--<td v-else></td>-->\n                                        <!--<td v-if="item.outWeightNum!=null">{{item.merchantWeight-item.outWeightNum}}{{item.unitName}}</td>-->\n                                        <!--<td v-else-if="item.merchantWeight!=null">{{item.merchantWeight}}{{item.unitName}}</td>-->\n                                        <!--<td v-else></td>-->\n                                    <!--</tr>-->\n                                    <!--</tbody>-->\n                                </table>\n                            </div>\n                        </div>\n                        <br/>\n                        <div class="row">\n                            <div class="form-group">\n                                <div class="col-sm-2 control-label">{{$t('Remarks')}}</div>\n                                <div class="col-sm-10">\n                                    <textarea name="remarks" class="form-control" cols="20" rows="3"\n                                              v-model="order.remarks"\n                                              :placeholder="$t('SupplementaryInformationOnGoods')"></textarea>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </form>`,
    data: function () {
        return {
            automaticShow: true,
            files: [],
            commodityEntityList: [],
            unitList: [{code: 1, name: '吨'}, {code: 2, name: '千克'}],
            offer: {},
            order: {},
        }
    },
    props: ['contract_params', 'type', 'order_id'],
    methods: {
        initDateTime: function () {
            $('.datetimepicker').each(function (index, item) {
                $(item).datetimepicker('remove');
            })
            var language;
            if (storageOrder.i18n.locale == 'en') {
                language = 'en'
            } else {
                language = 'zh-CN'
            }
            $.fn.datetimepicker.dates['en'] = {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                meridiem: ["AM", "PM"]
            };
            $(".datetimepicker").each(function (index, item) {
                $(item).datetimepicker({
                    endDate: new Date(),
                    language: language,
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    todayBtn: true,
                    todayHighlight: true,
                    forceParse: true,

                }).on('hide', function (ev) {
                    var value = $(item).val();
                    storageOrder.commodityEntityList[index].productionDate = value;
                    if (storageOrder.commodityEntityList.length > 0) {
                        let obj = storageOrder.commodityEntityList[index];
                        if (/^[1-9][0-9]{0,10}$/.test(obj.qualityTime) && obj.productionDate != null && obj.productionDate != '') {
                            var date = new Date(obj.productionDate);
                            obj.expirationDate = formatDate(new Date(date.getTime() + 1000 * 60 * 60 * 24 * obj.qualityTime), "YY-MM-DD");
                        }
                    }
                });
            })
        },
        orderDetail: function () {
            var _this = this;
            var url;
            if (_this.type == 0) {
                url = baseURL + "storage/order/detail/" + _this.contract_params.orderId
            } else if (_this.type == 1) {

            } else if (_this.type == 2) {
                url = baseURL + "storage/order/detail/" + _this.order_id;
            }
            $.get(url, function (r) {
                _this.order = r.order;
                if (_this.type == 0) {
                    if (_this.order.numberType == 1) {
                        _this.contract_params.orderType = 0;
                        _this.contract_params.orderNumber = _this.order.number;
                    }
                }
                _this.offer = r.offer;
                // _this.orderCost = r.orderCost;
                if (r.commodityEntityList == null) {
                    _this.commodityEntityList = [];
                } else {
                    _this.commodityEntityList = r.commodityEntityList;
                }
                _this.$nextTick(() => {
                    _this.initDateTime();
                })
            });
        },
    },
    created: function () {
        this.orderDetail();
    },
    mounted: function () {
    }
}
Vue.component('order-current-storage', storageOrder);
/**代理当前订单*/
var agentOrder = {
    i18n,
    template: `
    <div>
            <form class="form-horizontal">
            <div class="row">
                <div class="panel panel-default col-sm-6 text-center" style="height: 200px">
                    <div class="panel-body text-center" style="height: 300px">
                        <div>{{$t('ContractNumber')}}：{{agentOrder.currency}}&nbsp;{{agentOrder.contractNumber}}</div>
                        <div class="m-top-5">{{$t('OrderId')}}：{{agentOrder.orderNumber}}</div>
                        <!--<div class="m-top-5">{{$t('TotalPrice')}}：{{agentOrder.totalPrice}}</div>-->
                        <template>
                            <div class="m-top-5" v-show="agentOrder.orderStatus==0">
                                <h5>{{$t('currentState')}}：{{$t('WaitingForConfirmation')}}</h5>
                            </div>
                            <div class="m-top-5" v-show="agentOrder.orderStatus==1">
                                <h5>{{$t('currentState')}}：{{$t('Receipt')}}</h5>
                            </div>
                            <div class="m-top-5" v-show="agentOrder.orderStatus==2">
                                <h5>{{$t('currentState')}}：{{$t('InTheProcessing')}}</h5>
                            </div>
                            <div class="m-top-5" v-show="agentOrder.orderStatus==3">
                                <h5>{{$t('currentState')}}：{{$t('OrderCompletion')}}</h5>
                            </div>
                            <div class="m-top-5" v-show="agentOrder.orderStatus==4">
                                <h5>{{$t('currentState')}}：{{$t('OrderCancellation')}}</h5>
                            </div>
                            <div class="m-top-5" v-show="agentOrder.orderStatus==5">
                                <h5>{{$t('currentState')}}：{{$t('OrderHangs')}}</h5>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="panel panel-default col-sm-6" align="center" style="height: 200px">
                    <!--v-if="order.passStatus==1"-->
                    <div class="panel-body">
                        <div><h4>{{$t('CustomerInformation')}}</h4></div>
                        <div class="m-top-5">{{$t('contact')}}：{{agentOrder.contactPerson}}</div>
                        <div class="m-top-5">{{$t('phone')}}：{{agentOrder.contactPhone}}</div>
                        <div class="m-top-5">{{$t('address')}}：{{agentOrder.contactAddress}}</div>
                    </div>
                </div>
            </div>

        </form>

        <div class="panel panel-default" v-show="0==1">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{$t('customsInformation')}}
                </h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('DeclarationForm')}}:</div>
                                <div class="col-sm-10">
                                    <a href="">{{$t('DeclarationForm')}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('paymentSheet')}}:</div>
                                <div class="col-sm-10">
                                    <a href="">{{$t('paymentSheet')}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('CheckList')}}:</div>
                                <div class="col-sm-10">
                                    <a href="">{{$t('CheckList')}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('QuarantineCertificate')}}:</div>
                                <div class="col-sm-10">
                                    <a href="">{{$t('QuarantineCertificate')}}</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('Other')}}:</div>
                                <div class="col-sm-10">
                                    <a href="">{{$t('Other')}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="panel panel-default">
            <div class="panel-body">
                <div>
                    {{$t('OrderInformation')}}
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-3">
                            {{$t('MerchantName')}}：&nbsp;{{agentOrder.contactCompanyName}}
                        </div>
                        <div class="col-lg-3">
                            {{$t('contact')}}：&nbsp;{{agentOrder.merchantPerson}}
                        </div>
                        <div class="col-lg-3">
                            {{$t('ContactInformation')}}：&nbsp;{{agentOrder.merchantPhone}}
                        </div>
                    </div>
                </div>
                <!--//订单相关时间-->
                <div class="row m-top-5">

                    <div class="col-lg-12">
                        <div class="col-lg-3">
                            {{$t('CreationTime')}}：{{agentOrder.submitTime}}
                        </div>
                        <div class="col-lg-3" v-show="agentOrder.orderStatus==1">
                            {{$t('SingleTime')}}：{{agentOrder.receiptTime}}
                        </div>
                        <div class="col-lg-3" v-show="agentOrder.payStatus!=null && agentOrder.payStatus!=0">
                            {{$t('TimeOfPayment')}}：{{agentOrder.submitTime}}
                        </div>
                        <div class="col-lg-3" v-show="agentOrder.orderStatus==3 || agentOrder.orderStatus==4 || agentOrder.orderStatus==5">
                            {{$t('EndTime')}}：{{agentOrder.submitTime}}
                        </div>
                    </div>
                </div>

                <div class="row m-top-5">
                    <div class="col-lg-12">
                        <div class="col-lg-1">
                            <div class="control-label">{{$t('itemsUnderAgency')}}</div>
                        </div>
                        <div class="col-lg-10">
                            <laebl-gruop id="serviceLab">
                                <label class="radio-inline" v-for="item in serviceList">
                                    <input name="serviceId" type="checkbox" :text="item.serviceName"
                                           :value="item.serviceId" :disabled="true">&nbsp;{{item.serviceName}}
                                </label>
                            </laebl-gruop>
                        </div>
                    </div>

                    <!--//订单备注信息-->
                   <!-- <div class="row m-top-20">
                        <div class="col-sm-12">
                            <div class="col-sm-1">
                                <div class="control-label">{{$t('Remarks')}}</div>
                            </div>
                            <div class="col-sm-8"><textarea type="text" class="form-control"
                                                            :placeholder="$t('Remarks')" :readonly="true"></textarea></div>
                        </div>
                    </div>-->

                    <div class="text-right">

                        <div>{{$t('num')}}： {{agentOrder.outlayQuantity}}</div>
                        <div>{{$t('UnitPrice')}}： {{agentOrder.currency}}&nbsp;{{agentOrder.unitPrice}}</div>
                        <div>{{$t('TotalPrice')}}： {{agentOrder.currency}}&nbsp;{{agentOrder.totalPrice}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--//货物信息-->
        <div class="panel panel-default m-top-10">
            <div class="panel-heading">
                <span>{{$t('GoodsInformation')}}</span>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-xs-2" style="padding-left: 0px;">
                            <!--<input id="orderNum" type="text" class="form-control" @change="addGoods('orderNum')" -->
                            <!--v-model="params.originNumber" :placeholder="$t('OrderNumber')" :readonly="true"/>-->
                            <input id="orderNum" type="text" class="form-control"v-model="agentOrder.originNumber"
                             :placeholder="$t('OrderNumber')" :readonly="true"/>
                        </div>
                        <div class="col-xs-4">
                            <div class="form-group">
                                <label class="col-sm-4">{{$t('InspectionNo')}}</label>
                                <div class="col-sm-7">
                                    <input type="text" class="form-control" v-model="agentOrder.inspectionNo"
                                           name="inspectionNo" :placeholder="$t('InspectionNo')" disabled/>
                                </div>
                            </div>
                        </div>
                        <!--v-if="agentOrder.originType == 1 && agentOrder.originNumber != null"-->
                        <div class="col-xs-3">
                            {{$t('PaymentForPaymentOfGoods')}}?&nbsp;<laebl-gruop id="originPayType">
                            <label class="radio-inline"> 
                                <input :name="'originPayType'+type" type="radio" v-model="agentOrder.originPayType" text="授权垫付"
                                       value="1" :disabled="true">&nbsp;{{$t('AuthorizationPayment')}}
                            </label><label class="radio-inline">
                            <input :name="'originPayType'+type" type="radio" v-model="agentOrder.originPayType" text="无需垫付"
                                   value="2" :disabled="true">&nbsp;{{$t('NoNeedToPay')}}
                        </label>
                        </laebl-gruop>
                        </div>
                        <!--<button type="button" id="txtBtn" @click="addGoods('txtBtn')" class="btn btn-sm btn-primary pull-right" :disabled="true">新增货物</button>-->
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <table id="detailGoodsTab" class="table goodsTable">

                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                                <textarea type="text" class="form-control" v-model="agentOrder.remark"
                                          :placeholder="$t('Remarks')"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!--代理信息-->
       <!-- <div class="panel panel-default m-top-10" v-if="agentOrder.goodsOrderEntity != null">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-sm-12">
                        <span>{{$t('agentInfo')}}</span>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-5">
                            <div class="form-group">
                                <div class="col-lg-3">
                                    <div class="control-label">{{$t('CorporateName')}}</div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="control-label"> {{agentOrder.goodsOrderEntity.purchaserCompanyName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-5">
                            <div class="form-group">
                                <div class="col-lg-3">
                                    <div class="control-label">{{$t('LogisticsInformation')}}</div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="control-label">{{$t('LogisticsInformation')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
</div>
    `,
    data: function () {
        return {
            automaticShow: true,
            files: [],
            agentOrder: {},
            showDetail: false,
            showAddOrUpdate: false,
            addTxBtn: false,
            serviceList: [],
            params: {},
            orderStatus: {
                pre: '待审核',
                ep: '审核通过',
                af: '审核失败',
                tbc: '待确认',
                ctom: '待卖家确认取消',
                cto: '订单取消',
                tbp: '待支付',
                ap: '已付款',
                tbd: '待发货',
                tbpu: '待提货',
                s: '已发货',
                pr: '待收货',
                tc: '交易完成',
                agr: '代理',
            },
            operateEvents: {
                'click #removeGoods': function (e, value, row, index) {
                    var data = $("#goodsTable").bootstrapTable("getData");
                    data.splice(index, 1);
                    $("#goodsTable").bootstrapTable('load', data);
                    //当商品项为0时. 1.解除"添加货物"按钮的禁用, 2.清除订单编号输入框的值, 3.清除绑定的parmas值, 4.修改 来源标识值&来源单号值清空
                    if ($("#goodsTable").bootstrapTable("getData").length <= 0) {
                        $("#txtBtn").prop("disabled", false);
                        $("#orderNum").prop("disabled", false);
                        this.addTxBtn = false;
                        /*this.params.originNumber = "";*/
                        this.agentOrder.originFlag = 0;
                        this.agentOrder.originNumber = null;
                        this.agentOrder.originPayType = null;
                        $("#orderNum").val("");
                    }
                },
                'change .sltplace': function (e, value, row, index) {
                    row.commodityCountry = $(e.currentTarget).val();
                },
                'change .sltUnit': function (e, value, row, index) {
                    row.goodsUnit = $(e.currentTarget).val();
                },

                'change #goodsName': function (e, value, row, index) {
                    row.commodityName = $(e.currentTarget).val();
                    row.goodsName = $(e.currentTarget).val();
                },
                'change #goodsPrice': function (e, value, row, index) {
                    row.goodsPrice = $(e.currentTarget).val();
                },
                'change #goodsCount': function (e, value, row, index) {
                    row.goodsCount = $(e.currentTarget).val();
                },
                'change #goodsTotalPrice': function (e, value, row, index) {
                    row.goodsTotalPrice = $(e.currentTarget).val();
                }
            }
        }
    },
    props: ['contract_params', 'type', 'order_id'],
    methods: {
        initTable: function () {
            var _this = this;
            $("#detailGoodsTab").bootstrapTable("destroy");     //**********对于查询必不可少
            $("#detailGoodsTab").BT({
                columns: [
                    {title: _this.$t("ProductName"), field: 'goodsName',align: 'center'},
                    {title: _this.$t("place"), field: 'commodityCountry',align: 'center'},
                    {title: _this.$t("ProducerOrNumber"), field: 'factoryNo',align: 'center'},
                    {title: _this.$t("weight"), field: 'goodsCount', align: 'center'},
                    {title: _this.$t("unit"), field: 'goodsUnit', align: 'center',formatter: function (value, row, index) {
                            var str = "";
                                if (row.goodsUnit == 1) {
                                    str = '吨';
                                } else if (row.goodsUnit == 2){
                                    str = '千克';
                                }else {
                                    str=row.goodsUnit
                                }
                            return str;
                        }
                     },
                    {title: _this.$t("pack"), field: 'commodityPacking', align: 'center'}
                ]
            });
        },
        nameFmt: function (value, row, index) {
            if (row.goodsName == null) {
                row.goodsName = '';
            }
            return '<input type ="text" class="form-control" id ="goodsName" value="' + row.goodsName + '" disabled="true">';
        },
        placeFmt: function (value, row, index) {
            if (row.goodsPrice == null) {
                row.goodsPrice = '';
            }
            return '<input type ="text" class="form-control" id ="goodsPrice" value="' + row.goodsPrice + '" disabled="true">';
        },
        factoryNoFmt: function (value, row, index) {
            if (row.goodsCount == null) {
                row.goodsCount = '';
            }
            return '<input type="text" class="form-control" id="goodsCount" value="' + row.goodsCount + '" disabled="true">';
        },
        unitFmt: function (value, row, index) {
            if (row.goodsUnit == null) {
                row.goodsUnit = '';
            }
            let str = "";
            str = '<select class="form-control selectpicker sltUnit" disabled="true">';
            agentOrder.unitList.forEach(function (item, index) {
                if (item.code == row.goodsUnit) {
                    str += '<option value="' + item.code + '" selected>' + item.name + '</option>';
                } else {
                    str += '<option value="' + item.code + '">' + item.name + '</option>';
                }
            });
            str += '</select>';
            return str;
        },
        placeFmt: function (value, row, index) {
            if (row.goodsPrice == null) {
                row.goodsPrice = '';
            }
            return '<input type ="text" class="form-control" id ="goodsPrice" value="' + row.goodsPrice + '" disabled="true">';
        },
        factoryNoFmt: function (value, row, index) {
            if (row.goodsCount == null) {
                row.goodsCount = '';
            }
            return '<input type="text" class="form-control" id="goodsCount" value="' + row.goodsCount + '" disabled="true">';
        },
        weightFmt: function (value, row, index) {
            if (row.goodsTotalPrice == null) {
                row.goodsTotalPrice = '';
            }
            return '<input type="number" class="form-control" id="goodsTotalPrice" value="' + row.goodsTotalPrice + '" disabled="true">';
        },
        getPlaceData: function () {
            var _this = this;
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '国家编码'},
                success: function (r) {
                    if (r.code == 0) {
                        _this.placeData = r.dict;
                    }
                }
            })
        },
        //获取字典数据 -  货物重量单位
        getCommodityWeightUnit: function () {
            var _this = this;
            $.get({
                url: baseURL + 'sys/dict/getByType',
                dataType: 'JSON',
                data: {type: '货物重量单位'},
                success: function (r) {
                    if (r.code == 0) {
                        r.data.unshift({code: null, name: '请选择'});
                        _this.unitList = r.data;
                    }
                }
            })
        },
        getInfo: function () {
            var _this = this;
            var url;
            if (_this.type == 0) {
                url = baseURL + "agent/order/info/" + _this.contract_params.orderId;
            } else if (_this.type == 2) {
                url = baseURL + "agent/order/info/" + _this.order_id;
            }
            $.get(url, function (r) {
                _this.agentOrder = r.data;
                if (_this.type != 2) {
                    if (_this.agentOrder.originFlag == 1) {
                        _this.contract_params.orderType = 0;
                        _this.contract_params.orderNumber = _this.agentOrder.originNumber;
                    }
                }
                _this.params.orderNumber = _this.agentOrder.orderNumber;
                //获取商家的报盘列表
                _this.getOfferList();

                //获取报盘的代理项目列表
                if (_this.agentOrder.offer != null) {
                    _this.serviceList = _this.agentOrder.offer.business;

                    //延迟加载
                    _this.$nextTick(function () {
                        //默认勾选代理项目
                        if (_this.agentOrder.business.length > 0) {
                            _this.agentOrder.business.forEach(function (obj, index) {
                                let $checkbox = $("input[name='serviceId']");
                                if ($checkbox.length > 0) {
                                    $.each($checkbox, function (idx, item) {
                                        let cValue = item.value;
                                        if (obj.busType == cValue) {
                                            $(this).prop('checked', true);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

               /* if (_this.agentOrder.originNumber != null) {
                    /!*       _this.params.originNumber = _this.agentOrder.originNumber;*!/
                    //是否垫付货款
                    if (_this.agentOrder.originFlag == 1) {*/
                        if (_this.agentOrder.originPayType != null) {
                            var name1='originPayType'+_this.type;
                            let $radiobox = $("input[name="+name1+"]");
                            $.each($radiobox, function (idx, item) {
                                if (_this.agentOrder.originPayType == item.value) {
                                    $(this).prop('checked', true);
                                }
                            });
                        }
                    /*}*/
                    //设置商品项内容禁用 & 添加货物按钮禁用
                    _this.addTxBtn = true;
                    $("#txtBtn").prop("disabled", true);

             /*   }*/


                $("#detailGoodsTab").bootstrapTable('removeAll');
                $("#detailGoodsTab").bootstrapTable('append', _this.agentOrder.goods);
                _this.agentOrder.goodsOrderEntity = _this.agentOrder.goodsOrderEntity;
            });
        },
        //获取用户选择的企业的报盘信息列表
        getOfferList: function () {
            var _this = this;
            $.get(baseURL + 'agent/offer/getCompanyList',
                {
                    id: _this.agentOrder.merchantCompanyId
                }, function (res) {
                    if (res.code == 0) {
                        if (null != res.data) {
                            var temp = [{id: null, title: '请选择'}];
                            res.data.forEach(function (item, idx, arr) {
                                temp.push(item);
                            });
                            _this.offerList = temp;
                        } else {

                        }

                        //默认选择报盘
                        if (_this.agentOrder.offerId != null) {

                            _this.$nextTick(function () {
                                $("#sltOffer").val(_this.agentOrder.offerId).trigger("change");
                            });

                            $("#sltCurrency").val(_this.agentOrder.offer.currency).trigger("change");
                        }
                    }

                });
        },
    },
    created: function () {
        this.getPlaceData();
        this.getCommodityWeightUnit();
    },
    mounted: function () {
        this.initTable();
        this.getInfo();
    },
    /*watch: {
        "agentOrder.originPayType": function (value) {
            let $radiobox = $("input[name='originPayType']");
            $.each($radiobox, function (idx, item) {
                if (value  == item.value) {
                    $(this).prop('checked', true);
                }
            })
        },
    }*/
}
Vue.component('order-current-agent', agentOrder);