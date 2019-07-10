$(function () {

    vm.initTable();

});

var vm = new Vue({
	el:'#rrapp',
    i18n,
	data:{
		q:{
			tableName: null
		}
	},
	methods: {


        initTable: function () {

            //列表
            $("#jqGrid").bootstrapTable("destroy");     //**********对于查询必不可少

            $("#jqGrid").jqGrid({
                url: baseURL +'sys/generator/list',
                datatype: "json",
                colModel: [
                    { label: vm.$t("TableName"), name: 'tableName', width: 100, key: true },
                    { label: 'Engine', name: 'engine', width: 70},
                    { label: vm.$t("fpt"), name: 'tableComment', width: 100 },
                    { label: vm.$t("CreationTime"), name: 'createTime', width: 100 }
                ],
                viewrecords: true,
                height: 385,
                rowNum: 10,
                rowList : [10,30,50,100,200],
                rownumbers: true,
                rownumWidth: 25,
                autowidth:true,
                multiselect: true,
                pager: "#jqGridPager",
                jsonReader : {
                    root: "page.list",
                    page: "page.currPage",
                    total: "page.totalPage",
                    records: "page.totalCount"
                },
                prmNames : {
                    page:"page",
                    rows:"limit",
                    order: "order"
                },
                gridComplete:function(){
                    //隐藏grid底部滚动条
                    $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
                }
            });
        },


		query: function () {
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'tableName': vm.q.tableName},
                page:1 
            }).trigger("reloadGrid");
		},
		generator: function() {
			var tableNames = getSelectedRows2();
			if(tableNames == null){
				return ;
			}
			location.href = baseURL +"sys/generator/code?token="+token+"&tables=" + JSON.stringify(tableNames);


		}
	},
    watch: {
        "$i18n.locale": function (value) {
            if (value == 'en') {
                $("#jqGrid").bootstrapTable.defaults.locale = "en-US";
            } else {
                $("#jqGrid").bootstrapTable.defaults.locale = "zh-CN";
            }
            $("#jqGrid").bootstrapTable("destroy");
            this.initTable();
        },
    },

});

