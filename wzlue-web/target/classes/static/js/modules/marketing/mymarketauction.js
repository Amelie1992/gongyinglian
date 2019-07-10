$(function () {
    //列表
    vm.initTable1();
});

function operFormatter1(value, row, index) {
    return ['<a id="btn_info1" class="">' + vm.$t("Details") + '</a>'].join('');
}

window.operateEvents1 = {
    'click #btn_info1': function (event, value, row, index) {
        vm.title = "详情";
        vm.showList = false;
        vm.detailList = true;
        vm.getRecordInfo(row.id);
    }
};

var vm = new Vue({
    el: '#rrapp',
    i18n,
    data: {
        showList: true,
        detailList: false,
        title: null,
        marketBidRecord: {},
        queryParams: {
            commodityName: ''
        }
    },
    methods: {
        initTable1: function () {
            $("#table2").bootstrapTable("destroy");
            $("#table2").BT({
                url: baseURL + 'marketing/marketbidrecord/list',
                columns: [
                    {checkbox: true},
                    {title: vm.$t("AuctionOfCommodityNames"), field: 'commodityName', align: 'center'},
                    {title: vm.$t("FinalBid"), field: 'terminalPrice', align: 'center'},
                    {title: vm.$t("BidTime"), field: 'bidTime', align: 'center'},
                    {title: vm.$t("bidders"), field: 'companyName', align: 'center'},
                    {
                        title: vm.$t("status"), field: 'status', align: 'center',
                        formatter: function (value) {
                            if (value == 0) {
                                return "出局"
                            } else {
                                return "得标"
                            }
                        }
                    },
                    {title: vm.$t("chaozuo"), events: operateEvents1, formatter: operFormatter1, align: 'center'}
                ],
                //条件查询
                queryParams: vm.queryParams       //vm.recordsId
            });
        },
        query: function () {
            vm.reload();
        },
        //拍卖记录详情
        getRecordInfo: function (id) {
            $.get(baseURL + "marketing/marketbidrecord/info/" + id, function (r) {
                vm.marketBidRecord = r.marketBidRecord;
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.detailList = false;
            vm.title = "";
            $("#table2").BTF5(vm.queryParams);
            $("form").RF();
        }
    },
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#table2").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#table2").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#table2").bootstrapTable("destroy");
            this.initTable1();
        }
    }
});