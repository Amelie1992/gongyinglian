/**货物合同*/
var contractGoods = {
    i18n,
    data: function () {
        return {
            automaticShow: true,
            files: [],
            goodsContract: {}
        }
    },
    props: ['contract_params'],
    template: `
    <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractNumber" class="form-control"
                                           v-model="goodsContract.contractNumber" :placeholder="$t('ContractNumber')" :disabled="automaticShow"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('OrderNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="orderNumber" class="form-control"
                                           v-model="goodsContract.orderNumber" :placeholder="$t('OrderNumber')" :disabled="automaticShow"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractName')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractName" class="form-control"
                                           v-model="goodsContract.contractName" :placeholder="$t('ContractName')" :disabled="automaticShow"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyA')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="partyAName" class="form-control"
                                           v-model="goodsContract.partyAName" :placeholder="$t('NameOfPartyA')" :disabled="automaticShow"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyB')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="partyBName" class="form-control"
                                           v-model="goodsContract.partyBName" :placeholder="$t('NameOfPartyB')" :disabled="automaticShow"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('PaymentMethod')}}</div>
                                <div class="col-sm-10">
                                    <select class="form-control selectpicker selectPayMethod" id="paymentMethod" :placeholder="$t('PleaseChoosePaymentMethod')"
                                            v-model="goodsContract.paymentMethod" :disabled="automaticShow">
                                        <option value="0" >{{$t('LumpSumPayment')}}</option>
                                        <option value="1" >{{$t('InstallmentPayment')}}</option>
                                        <option value="2" >{{$t('Other')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractAmount')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractAmount" class="form-control" setp="0.01" min="0.001" :disabled="automaticShow"
                                           v-model="goodsContract.contractAmount" :placeholder="$t('ContractAmount')"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('DateOfSigning')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="dateOfSigning" class="form-control select-box-input datepicker" id="dateOfSigning" :disabled="automaticShow"
                                           v-model="goodsContract.dateOfSigning" :placeholder="$t('DateOfSigning')"
                                           data-date-format="yyyy-mm-dd hh:ii:ss"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ExpirationDate')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="expireDate" class="form-control select-box-input datepicker" id="expireDate"
                                           v-model="goodsContract.expireDate" :placeholder="$t('ExpirationDate')" :disabled="automaticShow"
                                           data-date-format="yyyy-mm-dd hh:ii:ss"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                       <!-- <div class="col-sm-2 control-label">{{$t('ExpirationDate')}}</div>
                        <div class="col-sm-10">
                            <input type="text" class="form-control select-box-input" id="expireDate"
                                   name="expireDate"
                                   v-model="goodsContract.expireDate" data-date-format="yyyy-mm-dd hh:ii:ss" :disabled="automaticShow"
                                   :placeholder="$t('ExpirationDate')">
                        </div>-->
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <div class="col-sm-2 control-label">{{$t('StoragePosition')}}</div>
                                    <div class="col-sm-10">
                                        <input type="text" id="location" name="location" class="form-control" v-model="goodsContract.storage_location"
                                               :placeholder="$t('LocationOfEnterpriseContract')" :disabled="automaticShow"/>
                                    </div>
                                </div>
                            </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('Remarks')}}</div>
                                <div class="col-sm-10">
                                    <textarea type="text" name="remarks" class="form-control" :disabled="automaticShow"
                                              v-model="goodsContract.remarks"
                                              :placeholder="$t('Remarks')"></textarea>
                                </div>
                            </div>
                        </div>
                        <!--<div class="col-sm-4">-->
                        <!--<div class="form-group">-->
                        <!--<div class="col-sm-2 control-label">0：卖方1：买方</div>-->
                        <!--<div class="col-sm-10">-->
                        <!--<input type="text" name="owner" class="form-control"-->
                        <!--v-model="logisticsContract.owner"-->
                        <!--placeholder="0：卖方1：买方"/>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->

                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <div class="col-sm-2 control-label">{{$t('AttachmentsUpload')}}</div>
                        <div class="col-sm-10">
                            <commodity-fileinput ref="file" :this_multiple="false" :drop_zone_enabled="false" :show_preview="true" :max_file_count='1' :files="files" :image_list="goodsContract.file" disable=true></commodity-fileinput>
                        </div>
                    </div>
                </div>
            </form>
    `,
    methods: {
        getInfo() {
            vm.files = [];
            var _this = this;
            $.ajax({
                url: baseURL + "contract/goodscontract/infoByContractOrder/",
                data: this.contract_params,
                type: 'POST',
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    console.log(r);
                    _this.goodsContract = r.goodsContract;
                    if (_this.goodsContract == null) {
                        return;
                    }
                    $("#paymentMethod").val(_this.goodsContract.paymentMethod);
                    _this.automaticShow = false;
                    if (r.goodsContract.automatic == 1) {
                        _this.automaticShow = true;
                    }
                }
            })
            /*$.post(baseURL + "contract/goodscontract/infoByContractOrder/" ,JSON.stringify(this.contract_params), function (r) {

            });*/
        }
    },
    created: function () {
        console.log("create===============================================")
        console.log(this.contract_params)
        if (this.contract_params.showInfo == true) {
            this.getInfo();
        }
        /*        var language;
                if (vm.$i18n.locale == 'en') {
                    language = 'en'
                } else {
                    language = 'zh-CN'
                }
                $("#dateOfSigning").datetimepicker({
                    //startDate: s,
                    language: language,
                }).on('hide', function (ev) {
                    var value = $("#dateOfSigning").val();
                    this.goodsContract.date_of_signing = value;
                });
                $("#expireDate").datetimepicker({
                    //startDate: s,
                    language: language,
                }).on('hide', function (ev) {
                    var value = $("#expireDate").val();
                    this.goodsContract.expire_date = value;
                });
                this.$nextTick(function () {
                    $("#paymentMethod").val(this.goodsContract.payment_method);
                    this.$refs.file.destroy();
                    this.$refs.file.initFileInput();
                })*/
    },
    watch: {
        contract_params: {
            handler(newValue, oldValue) {
                console.log("进来了");
                console.log(newValue);

            },
            deep: true
        }
    }
}
Vue.component('contract-goods', contractGoods);
/**物流合同*/
var contractLogistics = {
    i18n,
    data: function () {
        return {
            disabled: true,
            files: [],
            logisticsContract: {}
        }
    },
    props: ['contract_params'],
    template: `
    <div>
        <form class="form-horizontal">
            <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" id="contractNumber" name="contractNumber" class="form-control" onblur="checkCode(this.value)"
                                           v-model="logisticsContract.contractNumber" :placeholder="$t('ContractNumber')" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('OrderNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="" class="form-control" id="orderNumber"
                                           v-model="logisticsContract.orderNumber" :placeholder="$t('OrderNumber')" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractName')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractName" class="form-control"
                                           v-model="logisticsContract.contractName" :placeholder="$t('ContractName')" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyA')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="partyAName" class="form-control" id="partyAName"
                                           v-model="logisticsContract.partyAName" :placeholder="$t('NameOfPartyA')" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyB')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="partyBName" class="form-control" id="partyBName"
                                           v-model="logisticsContract.party_b_name" :placeholder="$t('NameOfPartyB')" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('PaymentMethod')}}</div>
                                <div class="col-sm-10">
                                    <select class="form-control" name="paymentMethod"
                                            id="paymentMethod" disabled="disabled" :placeholder="$t('PleaseChoosePaymentMethod')"
                                            v-model="logisticsContract.payment_method">
                                        <option value="1" >{{$t('LumpSumPayment')}}</option>
                                        <option value="2" >{{$t('InstallmentPayment')}}</option>
                                        <option value="3" >{{$t('Other')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractAmount')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" id="contractAmount" name="contractAmount" class="form-control" setp="0.01" min="0.001"
                                           v-model="logisticsContract.contract_amount" :placeholder="$t('ContractAmount')" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('DateOfSigning')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="dateOfSigning" class="form-control select-box-input" id="dateOfSigning"
                                           disabled="disabled" v-model="logisticsContract.date_of_signing" :placeholder="$t('DateOfSigning')"
                                           data-date-format="yyyy-mm-dd hh:ii:ss"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ExpirationDate')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="expireDate" class="form-control select-box-input"
                                           v-model="logisticsContract.expire_date" :placeholder="$t('ExpirationDate')"
                                           data-date-format="yyyy-mm-dd hh:ii:ss" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('StoragePosition')}}</div>
                                <div class="col-sm-10">
                                    <input id="location" name="location" class="form-control" v-model="logisticsContract.storageLocation" disabled="disabled" :placeholder="$t('inputStorageLocation')" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('Remarks')}}</div>
                                <div class="col-sm-10">
                                    <textarea type="text" name="remarks" class="form-control"
                                              v-model="logisticsContract.remarks"
                                              :placeholder="$t('Remarks')" disabled="disabled"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                        <div class="col-sm-8">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('appendicesOfAContract')}}</div>
                                <div class="col-sm-10">
                                    <commodity-fileinput ref="file" :this_multiple="false" :drop_zone_enabled="false"
                                                         :show_preview="true" :max_file_count='1' :files="files"
                                                         :image_list="logisticsContract.file" disabled="disabled"></commodity-fileinput>
                                </div>
                            </div>
                        </div>
                </div>
            </div>     
        </form>
    </div>
            `,
    methods: {
        getInfo: function () {

            var _this = this;
            $.ajax({
                url: baseURL + "logistics/logisticscontract/infoByContractOrder/",
                data: this.contract_params,
                type: 'POST',
                contentType: "application/x-www-form-urlencoded",
                success:function (r) {
                    _this.logisticsContract = r.logisticsContract;
                    //支付方式
                    if (_this.logisticsContract.payMethod != null) {
                        $(".selectPayMethod").val(_this.logisticsContract.payMethod).trigger("change");
                    }
                    //附件
                    if (_this.logisticsContract.file.length > 0 && (_this.logisticsContract.file != null && JSON.stringify(_this.logisticsContract.file) != "[]")) {
                        _this.logisticsContract.file.forEach(function (item, index) {
                            item.contractType = 4;
                            item.picName = item.fileName;
                            item.picUrl = item.url;
                        });
                        console.log('_this.logisticsContract.file', _this.logisticsContract.file)
                    }
                }
            })
        },
    },
    created: function () {
        this.getInfo();
    },
    mounted: function () {
        this.$refs.file.destroy();
        this.$refs.file.initFileInput();
    }
}
Vue.component('contract-logistics', contractLogistics);
/**报关合同*/
var contractDeclare = {
    i18n,
    data: function () {
        return {
            disabled: true,
            files: [],
        }
    },
    props: ['contract_params'],
    template: `
<form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractNumber" class="form-control"
                                           v-model="declare_contract.contract_number" :placeholder="$t('ContractNumber')" disabled/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('OrderNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="orderNumber" class="form-control"
                                           v-model="declare_contract.order_number" :placeholder="$t('OrderNumber')" disabled/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractName')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractName" class="form-control"
                                           v-model="declare_contract.contract_name" :placeholder="$t('ContractName')" onblur="checkName" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyA')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="customsCopName" class="form-control"
                                           v-model="declare_contract.customs_cop_name" :placeholder="$t('NameOfPartyA')" disabled/>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyB')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="merchantCopName" class="form-control"
                                           v-model="declare_contract.merchant_cop_name" :placeholder="$t('NameOfPartyB')" disabled/>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('PaymentMethod')}}</div>
                                <div class="col-sm-10">
                                    <select class="form-control selectpicker selectPayMethod" id="payMethod" :placeholder="$t('PleaseChoosePaymentMethod')"
                                            v-model="declare_contract.pay_method" disabled>
                                        <option value="1" >{{$t('LumpSumPayment')}}</option>
                                        <option value="2" >{{$t('InstallmentPayment')}}</option>
                                        <option value="3" >{{$t('Other')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractAmount')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractAmount" class="form-control" setp="0.01" min="0.001"
                                           v-model="declare_contract.contract_amount" :placeholder="$t('ContractAmount')" disabled/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('DateOfSigning')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="dateOfSigning" class="form-control select-box-input datepicker" id="dateOfSigning"
                                           v-model="declare_contract.date_of_signing" :placeholder="$t('DateOfSigning')"
                                           data-date-format="yyyy-mm-dd hh:ii:ss" disabled/>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ExpirationDate')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="expireDate" class="form-control select-box-input datepicker" id="expireDate"
                                           v-model="declare_contract.expire_date" :placeholder="$t('ExpirationDate')"
                                           data-date-format="yyyy-mm-dd hh:ii:ss" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('StoragePosition')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" id="location" name="location" class="form-control"
                                           :placeholder="$t('LocationOfEnterpriseContract')" disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-8">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('Remarks')}}</div>
                                <div class="col-sm-10">
                                    <textarea type="text" name="remarks" class="form-control" v-model="declare_contract.remarks"
                                              :placeholder="$t('Remarks')" disabled></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-8">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('appendicesOfAContract')}}</div>
                                <div class="col-sm-10">
                                    <commodity-fileinput ref="file" :this_multiple="false" :drop_zone_enabled="false"
                                                         :show_preview="true" :max_file_count='5' :files="files"
                                                         :image_list="declare_contract.file" disabled></commodity-fileinput>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    `,
    methods: {
        reload: function () {
            this.$emit('reload');
        }
    },
    created: function () {
        this.$nextTick(function () {
            this.$refs.file.destroy();
            this.$refs.file.initFileInput();
        })
    }
}
Vue.component('contract-declare', contractDeclare);
/**仓储合同*/
var storageContract = {
    i18n,
    data: function () {
        return {
            disabled: true,
            files: [],
        }
    },
    props: ['contract_params'],
    template: `
    <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractNumber" class="form-control"
                                           v-model="storage_contract.contract_number" onblur="checkContract(this.value)"
                                          id="contractNumber" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('OrderNumber')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="order_number" class="form-control"
                                           v-model="storage_contract.order_number" id="orderNumber" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractName')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractName" class="form-control"
                                           v-model="storage_contract.contract_name" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyA')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="customsCopName" class="form-control"
                                           v-model="storage_contract.customs_cop_name"
                                           id="customsCopName" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyB')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="merchantCopName" class="form-control"
                                           v-model="storage_contract.merchant_cop_name"
                                           id="merchantCopName" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('PaymentMethod')}}</div>
                                <div class="col-sm-10">
                                    <select class="form-control" name="payMethod" v-model="storage_contract.pay_method"
                                            id="payMethod" disabled="disabled">
                                        <option value="1">{{$t('LumpSumPayment')}}</option>
                                        <option value="2">{{$t('InstallmentPayment')}}</option>
                                        <option value="3">{{$t('Other')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractAmount')}}</div>
                                <div class="col-sm-10">
                                    <input type="text" name="contractAmount" class="form-control" setp="0.01"
                                           min="0.001" id="contractAmount" disabled="disabled"
                                           v-model="storage_contract.contract_amount"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('DateOfSigning')}}</div>
                                <div class="col-sm-10">
                                    <input name="signingTime" class="form-control  datepicker dpicker_signing"
                                           id="signingTime" disabled="disabled" v-model="storage_contract.signing_time"
                                           data-date-format="yyyy-mm-dd"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ExpirationDate')}}</div>
                                <div class="col-sm-10">
                                    <input name="expireDate" class="form-control datepicker dpicker_expire"
                                           id="expireDate" v-model="storage_contract.expire_date" disabled="disabled" 
                                           data-date-format="yyyy-mm-dd"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <!-- <div class="col-sm-4">
                             <div class="form-group">
                                 <div class="col-sm-2 control-label">{{$t('StoragePosition')}}</div>
                                 <div class="col-sm-10">
                                     <input v-modal="storage_contract.storage_location" name="storageLocation" class="form-control" :placeholder="$t('inputStorageLocation')" />
                                 </div>
                             </div>
                         </div>-->
                        <div class="col-sm-6">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('Remarks')}}</div>
                                <div class="col-sm-10">
                                    <textarea type="text" name="remarks" class="form-control"
                                              v-model="storage_contract.remarks"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-8">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('appendicesOfAContract')}}</div>
                                <div class="col-sm-10">
                                    <commodity-fileinput ref="file" :this_multiple="false" :drop_zone_enabled="false"
                                                         :show_preview="true" :max_file_count='5' :files="files"
                                                         :image_list="storage_contract.file"></commodity-fileinput>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    `,
    methods: {
        reload: function () {
            this.$emit('reload');
        }
    },
    created: function () {
        this.$nextTick(function () {
            this.$refs.file.destroy();
            this.$refs.file.initFileInput();
        })
    }
}
Vue.component('contract-storage', storageContract);
/**代理合同*/
var agentContract = {
    i18n,
    data: function () {
        return {
            disabled: true,
            files: [],
        }
    },
    props: ['contract_params'],
    template: `
    <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractNumber')}}</div>
                                <div class="col-sm-10">
                                    <input id="contractNumber" type="text" name="contractNumber1" class="form-control"
                                           v-model="agent_contract.contract_number" :placeholder="$t('PleaseEnterTheContractNumber')" disabled = "disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('OrderNumber')}}</div>
                                <div class="col-sm-10">
                                    <input id="orderNumber" type="text" name="orderNumber" class="form-control"
                                           v-model="agent_contract.order_number" :placeholder="$t('PleaseInputOrderNumber')" :readonly = "disabled"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractName')}}</div>
                                <div class="col-sm-10">
                                    <input id="contractName" type="text" name="contractName" class="form-control"
                                           v-model="agent_contract.contract_name" :placeholder="$t('PleaseEnterTheContractName')" disabled = "disabled"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyA')}}</div>
                                <div class="col-sm-10">
                                    <input id="customsCopName" type="text" name="customsCopName" class="form-control"
                                           v-model="agent_contract.customs_cop_name" :placeholder="$t('PleaseEnterTheNameOfPartyACompany')" disabled = "disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('NameOfPartyB')}}</div>
                                <div class="col-sm-10">
                                    <input id="merchantCopName" type="text" name="merchantCopName" class="form-control"
                                           v-model="agent_contract.merchant_cop_name" :placeholder="$t('PleaseEnterTheNameOfPartyBCompany')" disabled = "disabled" />
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('PaymentMethod')}}</div>
                                <div class="col-sm-10">
                                    <select class="form-control selectpicker pay_method" id="sltPay" name="sltPaySelect" :placeholder="$t('PleaseChoosePaymentMethod')" disabled = "disabled" >
                                        <option value="0" >{{$t('select')}}</option>
                                        <option value="1" >{{$t('LumpSumPayment')}}</option>
                                        <option value="2" >{{$t('InstallmentPayment')}}</option>
                                        <option value="3" >{{$t('Other')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ContractAmount')}}</div>
                                <div class="col-sm-10">
                                    <input id="contractAmount" type="text" name="contractAmount" class="form-control"
                                           v-model="agent_contract.contract_amount" :placeholder="$t('PleaseEnterTheContractAmount')" disabled = "disabled" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('DateOfSigning')}}</div>
                                <div class="col-sm-10">
                                    <input id="signingTime" name="signingTime" class="form-control datepicker dpicker_signing"
                                           date-format="yyyy-MM-dd" v-model="agent_contract.signing_time" :placeholder="$t('PleaseChooseTheDateOfSigning')"
                                           disabled = "disabled" />
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="col-sm-2 control-label">{{$t('ExpirationDate')}}</div>
                                <div class="col-sm-10">
                                    <input id="expireDate" name="expireDate" class="form-control datepicker dpicker_expire"
                                           date-format="yyyy-MM-dd" v-model="agent_contract.expire_date" :placeholder="$t('PleaseChooseTheExpirationDate')"
                                           disabled = "disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">{{$t('StoragePosition')}}</div>
                            <div class="col-sm-10">
                                <input id="location" name="location" class="form-control" :placeholder="$t('inputStorageLocation')" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">{{$t('Remarks')}}</div>
                            <div class="col-sm-10">
                                    <textarea id="myEditor" name="remarks"
                                              v-model="agent_contract.remarks"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">{{$t('appendicesOfAContract')}}</div>
                            <div class="col-sm-10">
                                                      <commodity-fileinput ref="file" :this_multiple="false" :drop_zone_enabled="false"
                                                         :show_preview="true" :max_file_count='5' :files="files"
                                                         :image_list="agent_contract.file"></commodity-fileinput>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    `,
    methods: {
        reload: function () {
            this.$emit('reload');
        }
    },
    created: function () {
        this.$nextTick(function () {
            this.$refs.file.destroy();
            this.$refs.file.initFileInput();
        })
    }
}
Vue.component('contract-agent', agentContract);