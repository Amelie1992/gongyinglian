
----- 商品分类表 @author zeyee @since 2018-08-13 -----
DROP TABLE IF EXISTS item_category;
CREATE TABLE item_category
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
	category_name VARCHAR(100) NOT NULL COMMENT '分类名称',
	tax_number VARCHAR(200) NULL COMMENT '税号',
	pricing_method INT(2) NOT NULL COMMENT '计价方式: 1.从价 2.从量',
	now_status INT(2) NOT NULL DEFAULT 1 COMMENT '分类状态: 1.启用 2.冻结 3.删除',
	parent_id BIGINT(11) DEFAULT 0 NULL COMMENT '上级id,为0则为一级',
	dept_id BIGINT(11) NULL COMMENT'权限部门id',
	created_by BIGINT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(11) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品分类表';

----- end -----

----- 商品库表 @author zeyee @since 2018-08-13 -----
DROP TABLE IF EXISTS item_info;
CREATE TABLE item_info
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
	item_name VARCHAR(200) NOT NULL COMMENT '商品名称',
	item_code VARCHAR(200) NOT NULL COMMENT '商品编码',
	category_id BIGINT(11) NOT NULL COMMENT 'FK:商品分类id',
	factory_no VARCHAR(200) NOT NULL COMMENT '厂号',
	pricing_method INT(2) NOT NULL COMMENT '冗余字段:计价方式 来源:商品分类',
	item_status INT(2) DEFAULT 1 NOT NULL COMMENT '商品状态: 1.正常 2.删除',
	dept_id BIGINT(11) NULL COMMENT'权限部门id',
	created_by BIGINT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(11) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品库表(商品信息)';
----- end -----

----- 商品产地表 @author zeyee @since 2018-08-13 -----
DROP TABLE IF EXISTS item_places;
CREATE TABLE item_places
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
	place VARCHAR(50) NOT NULL COMMENT '地区',
	goods_id BIGINT(11) NOT NULL COMMENT '商品id',
	numerical DECIMAL(12,5) NOT NULL COMMENT '数值',
	tariff DECIMAL(12,5) NOT NULL COMMENT '关税',
	value_add_tariff DECIMAL(12,5) NOT NULL COMMENT '增值税',
	addition_duty DECIMAL(12,5) NOT NULL COMMENT '附加税',
	remark VARCHAR(200) NULL COMMENT '备注',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品产地信息表';

-----   end   -----


----- 商品申请表 @author zeyee @since 2018-08-13 -----
DROP TABLE IF EXISTS item_info_apply;
CREATE TABLE item_info_apply
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
	item_name VARCHAR(200) NOT NULL COMMENT '商品名称',
	factory_no VARCHAR(200) NOT NULL COMMENT '厂号',
	pricing_method INT(2) NOT NULL COMMENT '计价方式',
	pending_status INT(2) NOT NULL DEFAULT 1 COMMENT '审核状态 1.待审核 2.审核通过 3.审核未通过',
	pending_info VARCHAR(200) NULL COMMENT '审核信息',
	item_status INT(2) DEFAULT 1 NOT NULL COMMENT '商品状态: 1.正常 2.删除',
	category_id BIGINT(11) NOT NULL COMMENT 'FK:商品分类id',
	dept_id BIGINT(11) NULL COMMENT'权限部门id',
	created_by BIGINT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(11) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品申请表(商品信息)';
----- end -----


----- 商品产地申请表 @author zeyee @since 2018-08-13 -----
DROP TABLE IF EXISTS item_place_apply;
CREATE TABLE item_place_apply
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增',
	place VARCHAR(50) NOT NULL COMMENT '地区',
	good_apply_id BIGINT(11) NOT NULL COMMENT '商品申请id',
	numerical DECIMAL(12,5) NULL COMMENT '数值',
	tariff DECIMAL(12,5) NULL COMMENT '关税',
	value_add_tariff DECIMAL(12,5) NULL COMMENT '增值税',
	addition_duty DECIMAL(12,5) NULL COMMENT '附加税',
	remark VARCHAR(200) NULL COMMENT '备注',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品产地信息申请表';
----- end -----


----- 字典表新增国家代码数据 -----

INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AD',	'AND',	'安道尔',	'国家编码',	'0',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AE',	'ARE',	'阿联酋',	'国家编码',	'1',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AF',	'AFG',	'阿富汗',	'国家编码',	'2',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AG',	'ATG',	'安提瓜和巴布达',	'国家编码',	'3',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AI',	'AIA',	'安圭拉',	'国家编码',	'4',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AL',	'ALB',	'阿尔巴尼亚',	'国家编码',	'5',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AM',	'ARM',	'亚美尼亚',	'国家编码',	'6',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AO',	'AGO',	'安哥拉',	'国家编码',	'7',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AQ',	'ATA',	'南极洲',	'国家编码',	'8',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AR',	'ARG',	'阿根廷',	'国家编码',	'9',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AS',	'ASM',	'美属萨摩亚',	'国家编码',	'10',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AT',	'AUT',	'奥地利',	'国家编码',	'11',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AU',	'AUS',	'澳大利亚',	'国家编码',	'12',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AW',	'ABW',	'阿鲁巴',	'国家编码',	'13',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AX',	'ALA',	'奥兰群岛',	'国家编码',	'14',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'AZ',	'AZE',	'阿塞拜疆',	'国家编码',	'15',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BA',	'BIH',	'波黑',	'国家编码',	'16',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BB',	'BRB',	'巴巴多斯',	'国家编码',	'17',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BD',	'BGD',	'孟加拉',	'国家编码',	'18',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BE',	'BEL',	'比利时',	'国家编码',	'19',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BF',	'BFA',	'布基纳法索',	'国家编码',	'20',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BG',	'BGR',	'保加利亚',	'国家编码',	'21',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BH',	'BHR',	'巴林',	'国家编码',	'22',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BI',	'BDI',	'布隆迪',	'国家编码',	'23',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BJ',	'BEN',	'贝宁',	'国家编码',	'24',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BL',	'BLM',	'圣巴泰勒米岛',	'国家编码',	'25',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BM',	'BMU',	'百慕大',	'国家编码',	'26',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BN',	'BRN',	'文莱',	'国家编码',	'27',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BO',	'BOL',	'玻利维亚',	'国家编码',	'28',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BQ',	'BES',	'荷兰加勒比区',	'国家编码',	'29',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BR',	'BRA',	'巴西',	'国家编码',	'30',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BS',	'BHS',	'巴哈马',	'国家编码',	'31',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BT',	'BTN',	'不丹',	'国家编码',	'32',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BV',	'BVT',	'布韦岛',	'国家编码',	'33',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BW',	'BWA',	'博茨瓦纳',	'国家编码',	'34',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BY',	'BLR',	'白俄罗斯',	'国家编码',	'35',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'BZ',	'BLZ',	'伯利兹',	'国家编码',	'36',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CA',	'CAN',	'加拿大',	'国家编码',	'37',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CC',	'CCK',	'科科斯群岛',	'国家编码',	'38',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CF',	'CAF',	'中非',	'国家编码',	'39',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CH',	'CHE',	'瑞士',	'国家编码',	'40',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CL',	'CHL',	'智利',	'国家编码',	'41',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CM',	'CMR',	'喀麦隆',	'国家编码',	'42',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CO',	'COL',	'哥伦比亚',	'国家编码',	'43',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CR',	'CRI',	'哥斯达黎加',	'国家编码',	'44',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CU',	'CUB',	'古巴',	'国家编码',	'45',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CV',	'CPV',	'佛得角',	'国家编码',	'46',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CX',	'CXR',	'圣诞岛',	'国家编码',	'47',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CY',	'CYP',	'塞浦路斯',	'国家编码',	'48',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CZ',	'CZE',	'捷克',	'国家编码',	'49',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'DE',	'DEU',	'德国',	'国家编码',	'50',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'DJ',	'DJI',	'吉布提',	'国家编码',	'51',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'DK',	'DNK',	'丹麦',	'国家编码',	'52',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'DM',	'DMA',	'多米尼克',	'国家编码',	'53',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'DO',	'DOM',	'多米尼加',	'国家编码',	'54',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'DZ',	'DZA',	'阿尔及利亚',	'国家编码',	'55',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'EC',	'ECU',	'厄瓜多尔',	'国家编码',	'56',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'EE',	'EST',	'爱沙尼亚',	'国家编码',	'57',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'EG',	'EGY',	'埃及',	'国家编码',	'58',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'EH',	'ESH',	'西撒哈拉',	'国家编码',	'59',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ER',	'ERI',	'厄立特里亚',	'国家编码',	'60',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ES',	'ESP',	'西班牙',	'国家编码',	'61',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'FI',	'FIN',	'芬兰',	'国家编码',	'62',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'FJ',	'FJI',	'斐济群岛',	'国家编码',	'63',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'FK',	'FLK',	'马尔维纳斯群岛（ 福克兰）',	'国家编码',	'64',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'FM',	'FSM',	'密克罗尼西亚联邦',	'国家编码',	'65',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'FO',	'FRO',	'法罗群岛',	'国家编码',	'66',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'FR',	'FRA',	'法国',	'国家编码',	'67',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GA',	'GAB',	'加蓬',	'国家编码',	'68',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GD',	'GRD',	'格林纳达',	'国家编码',	'69',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GE',	'GEO',	'格鲁吉亚',	'国家编码',	'70',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GF',	'GUF',	'法属圭亚那',	'国家编码',	'71',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GH',	'GHA',	'加纳',	'国家编码',	'72',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GI',	'GIB',	'直布罗陀',	'国家编码',	'73',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GL',	'GRL',	'格陵兰',	'国家编码',	'74',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GN',	'GIN',	'几内亚',	'国家编码',	'75',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GP',	'GLP',	'瓜德罗普',	'国家编码',	'76',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GQ',	'GNQ',	'赤道几内亚',	'国家编码',	'77',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GR',	'GRC',	'希腊',	'国家编码',	'78',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GS',	'SGS',	'南乔治亚岛和南桑威奇群岛',	'国家编码',	'79',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GT',	'GTM',	'危地马拉',	'国家编码',	'80',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GU',	'GUM',	'关岛',	'国家编码',	'81',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GW',	'GNB',	'几内亚比绍',	'国家编码',	'82',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GY',	'GUY',	'圭亚那',	'国家编码',	'83',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'HK',	'HKG',	'香港',	'国家编码',	'84',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'HM',	'HMD',	'赫德岛和麦克唐纳群岛',	'国家编码',	'85',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'HN',	'HND',	'洪都拉斯',	'国家编码',	'86',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'HR',	'HRV',	'克罗地亚',	'国家编码',	'87',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'HT',	'HTI',	'海地',	'国家编码',	'88',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'HU',	'HUN',	'匈牙利',	'国家编码',	'89',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ID',	'IDN',	'印尼',	'国家编码',	'90',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IE',	'IRL',	'爱尔兰',	'国家编码',	'91',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IL',	'ISR',	'以色列',	'国家编码',	'92',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IM',	'IMN',	'马恩岛',	'国家编码',	'93',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IN',	'IND',	'印度',	'国家编码',	'94',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IO',	'IOT',	'英属印度洋领地',	'国家编码',	'95',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IQ',	'IRQ',	'伊拉克',	'国家编码',	'96',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IR',	'IRN',	'伊朗',	'国家编码',	'97',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IS',	'ISL',	'冰岛',	'国家编码',	'98',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'IT',	'ITA',	'意大利',	'国家编码',	'99',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'JE',	'JEY',	'泽西岛',	'国家编码',	'100',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'JM',	'JAM',	'牙买加',	'国家编码',	'101',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'JO',	'JOR',	'约旦',	'国家编码',	'102',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'JP',	'JPN',	'日本',	'国家编码',	'103',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KH',	'KHM',	'柬埔寨',	'国家编码',	'104',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KI',	'KIR',	'基里巴斯',	'国家编码',	'105',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KM',	'COM',	'科摩罗',	'国家编码',	'106',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KW',	'KWT',	'科威特',	'国家编码',	'107',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KY',	'CYM',	'开曼群岛',	'国家编码',	'108',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LB',	'LBN',	'黎巴嫩',	'国家编码',	'109',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LI',	'LIE',	'列支敦士登',	'国家编码',	'110',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LK',	'LKA',	'斯里兰卡',	'国家编码',	'111',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LR',	'LBR',	'利比里亚',	'国家编码',	'112',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LS',	'LSO',	'莱索托',	'国家编码',	'113',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LT',	'LTU',	'立陶宛',	'国家编码',	'114',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LU',	'LUX',	'卢森堡',	'国家编码',	'115',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LV',	'LVA',	'拉脱维亚',	'国家编码',	'116',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LY',	'LBY',	'利比亚',	'国家编码',	'117',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MA',	'MAR',	'摩洛哥',	'国家编码',	'118',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MC',	'MCO',	'摩纳哥',	'国家编码',	'119',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MD',	'MDA',	'摩尔多瓦',	'国家编码',	'120',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ME',	'MNE',	'黑山',	'国家编码',	'121',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MF',	'MAF',	'法属圣马丁',	'国家编码',	'122',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MG',	'MDG',	'马达加斯加',	'国家编码',	'123',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MH',	'MHL',	'马绍尔群岛',	'国家编码',	'124',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MK',	'MKD',	'马其顿',	'国家编码',	'125',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ML',	'MLI',	'马里',	'国家编码',	'126',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MM',	'MMR',	'缅甸',	'国家编码',	'127',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MO',	'MAC',	'澳门',	'国家编码',	'128',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MQ',	'MTQ',	'马提尼克',	'国家编码',	'129',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MR',	'MRT',	'毛里塔尼亚',	'国家编码',	'130',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MS',	'MSR',	'蒙塞拉特岛',	'国家编码',	'131',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MT',	'MLT',	'马耳他',	'国家编码',	'132',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MV',	'MDV',	'马尔代夫',	'国家编码',	'133',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MW',	'MWI',	'马拉维',	'国家编码',	'134',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MX',	'MEX',	'墨西哥',	'国家编码',	'135',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MY',	'MYS',	'马来西亚',	'国家编码',	'136',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NA',	'NAM',	'纳米比亚',	'国家编码',	'137',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NE',	'NER',	'尼日尔',	'国家编码',	'138',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NF',	'NFK',	'诺福克岛',	'国家编码',	'139',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NG',	'NGA',	'尼日利亚',	'国家编码',	'140',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NI',	'NIC',	'尼加拉瓜',	'国家编码',	'141',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NL',	'NLD',	'荷兰',	'国家编码',	'142',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NO',	'NOR',	'挪威',	'国家编码',	'143',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NP',	'NPL',	'尼泊尔',	'国家编码',	'144',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NR',	'NRU',	'瑙鲁',	'国家编码',	'145',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'OM',	'OMN',	'阿曼',	'国家编码',	'146',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PA',	'PAN',	'巴拿马',	'国家编码',	'147',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PE',	'PER',	'秘鲁',	'国家编码',	'148',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PF',	'PYF',	'法属波利尼西亚',	'国家编码',	'149',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PG',	'PNG',	'巴布亚新几内亚',	'国家编码',	'150',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PH',	'PHL',	'菲律宾',	'国家编码',	'151',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PK',	'PAK',	'巴基斯坦',	'国家编码',	'152',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PL',	'POL',	'波兰',	'国家编码',	'153',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PN',	'PCN',	'皮特凯恩群岛',	'国家编码',	'154',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PR',	'PRI',	'波多黎各',	'国家编码',	'155',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PS',	'PSE',	'巴勒斯坦',	'国家编码',	'156',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PW',	'PLW',	'帕劳',	'国家编码',	'157',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PY',	'PRY',	'巴拉圭',	'国家编码',	'158',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'QA',	'QAT',	'卡塔尔',	'国家编码',	'159',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'RE',	'REU',	'留尼汪',	'国家编码',	'160',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'RO',	'ROU',	'罗马尼亚',	'国家编码',	'161',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'RS',	'SRB',	'塞尔维亚',	'国家编码',	'162',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'RU',	'RUS',	'俄罗斯',	'国家编码',	'163',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'RW',	'RWA',	'卢旺达',	'国家编码',	'164',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SB',	'SLB',	'所罗门群岛',	'国家编码',	'165',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SC',	'SYC',	'塞舌尔',	'国家编码',	'166',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SD',	'SDN',	'苏丹',	'国家编码',	'167',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SE',	'SWE',	'瑞典',	'国家编码',	'168',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SG',	'SGP',	'新加坡',	'国家编码',	'169',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SI',	'SVN',	'斯洛文尼亚',	'国家编码',	'170',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SJ',	'SJM',	'斯瓦尔巴群岛和 扬马延岛',	'国家编码',	'171',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SK',	'SVK',	'斯洛伐克',	'国家编码',	'172',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SL',	'SLE',	'塞拉利昂',	'国家编码',	'173',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SM',	'SMR',	'圣马力诺',	'国家编码',	'174',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SN',	'SEN',	'塞内加尔',	'国家编码',	'175',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SO',	'SOM',	'索马里',	'国家编码',	'176',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SR',	'SUR',	'苏里南',	'国家编码',	'177',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SS',	'SSD',	'南苏丹',	'国家编码',	'178',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ST',	'STP',	'圣多美和普林西比',	'国家编码',	'179',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SV',	'SLV',	'萨尔瓦多',	'国家编码',	'180',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SY',	'SYR',	'叙利亚',	'国家编码',	'181',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SZ',	'SWZ',	'斯威士兰',	'国家编码',	'182',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TC',	'TCA',	'特克斯和凯科斯群岛',	'国家编码',	'183',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TD',	'TCD',	'乍得',	'国家编码',	'184',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TG',	'TGO',	'多哥',	'国家编码',	'185',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TH',	'THA',	'泰国',	'国家编码',	'186',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TK',	'TKL',	'托克劳',	'国家编码',	'187',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TL',	'TLS',	'东帝汶',	'国家编码',	'188',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TN',	'TUN',	'突尼斯',	'国家编码',	'189',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TO',	'TON',	'汤加',	'国家编码',	'190',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TR',	'TUR',	'土耳其',	'国家编码',	'191',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TV',	'TUV',	'图瓦卢',	'国家编码',	'192',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TZ',	'TZA',	'坦桑尼亚',	'国家编码',	'193',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'UA',	'UKR',	'乌克兰',	'国家编码',	'194',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'UG',	'UGA',	'乌干达',	'国家编码',	'195',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'US',	'USA',	'美国',	'国家编码',	'196',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'UY',	'URY',	'乌拉圭',	'国家编码',	'197',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VA',	'VAT',	'梵蒂冈',	'国家编码',	'198',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VE',	'VEN',	'委内瑞拉',	'国家编码',	'199',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VG',	'VGB',	'英属维尔京群岛',	'国家编码',	'200',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VI',	'VIR',	'美属维尔京群岛',	'国家编码',	'201',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VN',	'VNM',	'越南',	'国家编码',	'202',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'WF',	'WLF',	'瓦利斯和富图纳',	'国家编码',	'203',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'WS',	'WSM',	'萨摩亚',	'国家编码',	'204',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'YE',	'YEM',	'也门',	'国家编码',	'205',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'YT',	'MYT',	'马约特',	'国家编码',	'206',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ZA',	'ZAF',	'南非',	'国家编码',	'207',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ZM',	'ZMB',	'赞比亚',	'国家编码',	'208',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ZW',	'ZWE',	'津巴布韦',	'国家编码',	'209',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CN',	'CHN',	'中国 内地',	'国家编码',	'210',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CG',	'COG',	'刚果（布）',	'国家编码',	'211',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CD',	'COD',	'刚果（金）',	'国家编码',	'212',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MZ',	'MOZ',	'莫桑比克',	'国家编码',	'213',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GG',	'GGY',	'根西岛',	'国家编码',	'214',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GM',	'GMB',	'冈比亚',	'国家编码',	'215',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MP',	'MNP',	'北马里亚纳群岛',	'国家编码',	'216',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'ET',	'ETH',	'埃塞俄比亚',	'国家编码',	'217',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NC',	'NCL',	'新喀里多尼亚',	'国家编码',	'218',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VU',	'VUT',	'瓦努阿图',	'国家编码',	'219',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TF',	'ATF',	'法属南部领地',	'国家编码',	'220',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NU',	'NIU',	'纽埃',	'国家编码',	'221',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'UM',	'UMI',	'美国本土外小岛屿',	'国家编码',	'222',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CK',	'COK',	'库克群岛',	'国家编码',	'223',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'GB',	'GBR',	'英国',	'国家编码',	'224',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TT',	'TTO',	'特立尼达和多巴哥',	'国家编码',	'225',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'VC',	'VCT',	'圣文森特和格林纳丁斯',	'国家编码',	'226',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TW',	'TWN',	'中华民国（台湾）',	'国家编码',	'227',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'NZ',	'NZL',	'新西兰',	'国家编码',	'228',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SA',	'SAU',	'沙特阿拉伯',	'国家编码',	'229',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LA',	'LAO',	'老挝',	'国家编码',	'230',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KP',	'PRK',	'朝鲜 北朝鲜',	'国家编码',	'231',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KR',	'KOR',	'韩国 南朝鲜',	'国家编码',	'232',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PT',	'PRT',	'葡萄牙',	'国家编码',	'233',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KG',	'KGZ',	'吉尔吉斯斯坦',	'国家编码',	'234',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KZ',	'KAZ',	'哈萨克斯坦',	'国家编码',	'235',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TJ',	'TJK',	'塔吉克斯坦',	'国家编码',	'236',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'TM',	'TKM',	'土库曼斯坦',	'国家编码',	'237',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'UZ',	'UZB',	'乌兹别克斯坦',	'国家编码',	'238',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KN',	'KNA',	'圣基茨和尼维斯',	'国家编码',	'239',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'PM',	'SPM',	'圣皮埃尔和密克隆',	'国家编码',	'240',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'SH',	'SHN',	'圣赫勒拿',	'国家编码',	'241',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'LC',	'LCA',	'圣卢西亚',	'国家编码',	'242',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MU',	'MUS',	'毛里求斯',	'国家编码',	'243',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'CI',	'CIV',	'科特迪瓦',	'国家编码',	'244',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'KE',	'KEN',	'肯尼亚',	'国家编码',	'245',	0	);
INSERT INTO `sys_dict` ( `value`, `code`,`name`, `type`,  `order_num`, `del_flag`) VALUES(	'MN',	'MNG',	'蒙古国 蒙古',	'国家编码',	'246',	0	);


--------- 创建代理报盘信息表 ---------
DROP TABLE IF EXISTS agent_offer;
CREATE TABLE agent_offer
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增,id',
	title VARCHAR(200) NOT NULL COMMENT '标题',
	offer_code VARCHAR(255) NOT NULL COMMENT '报盘编码',
	contact_person VARCHAR(50) NOT NULL COMMENT '联系人',
	contact_phone VARCHAR(13) NOT NULL COMMENT '联系方式',
	valuation_unit VARCHAR(50) NOT NULL COMMENT '计价重量单位',
	price DECIMAL(12,5) NOT NULL COMMENT '价格',
	currency VARCHAR(20) NOT NULL COMMENT '货币代码',
	introduction TEXT NULL COMMENT '业务介绍',
	offer_status INT(2) NOT NULL DEFAULT 0 COMMENT '报盘状态 0.待上架 1.已上架 2.已下架 3.删除',
	created_by BIGINT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(11) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	dept_id BIGINT(11) NULL COMMENT'权限部门id',
	company_id BIGINT(11) DEFAULT NULL COMMENT '公司id',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理报盘信息表';
----- end -----


----------- 创建代理报盘业务服务表 ------------
DROP TABLE IF EXISTS agent_offer_business;
CREATE TABLE agent_offer_business
(
	id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增id',
	offer_id BIGINT(11) NOT NULL COMMENT '报盘id',
	service_id BIGINT(11) NOT NULL COMMENT '服务类型id',
	service_name VARCHAR(250) NULL COMMENT '服务类型名称',
	PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理报盘服务信息表';
--- end ---

------------ 创建代理(订单)表 -----------------
DROP TABLE IF EXISTS agent_order;
CREATE TABLE `agent_order` (
  `id` BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键,id',
  `order_number` VARCHAR(50) NOT NULL COMMENT '代理订单编号',
  `contract_number` VARCHAR(255) DEFAULT NULL COMMENT '合同编号',
  `contact_phone` VARCHAR(13) DEFAULT NULL COMMENT '联系方式(买家)',
  `contact_person` VARCHAR(50) DEFAULT NULL COMMENT '联系人(买家)',
  `contact_email` VARCHAR(100) DEFAULT NULL COMMENT '电子邮箱(买家)',
  `contact_address` VARCHAR(255) DEFAULT NULL COMMENT '地址(买家)',
  `contact_company_id` BIGINT(11) NOT NULL COMMENT '公司id(买家)',
  `contact_dept_id` BIGINT(11) DEFAULT NULL COMMENT '权限部门id(买家)',
  `total_price` DECIMAL(12,5) DEFAULT '0.00000' COMMENT '订单总价',
  `currency` VARCHAR(20) DEFAULT NULL COMMENT '币种',
  `unit_price` DECIMAL(12,5) DEFAULT '0.00000' COMMENT '代理费用单价',
  `outlay_quantity` INT(10) DEFAULT '0' COMMENT '代理费用数量',
  `origin_flag` INT(2) DEFAULT '0' COMMENT '来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单',
  `origin_number` VARCHAR(20) DEFAULT NULL COMMENT '来源单号',
  `merchant_phone` VARCHAR(13) DEFAULT NULL COMMENT '联系方式(商家)',
  `merchant_person` VARCHAR(50) DEFAULT NULL COMMENT '联系人(商家)',
  `merchant_email` VARCHAR(100) DEFAULT NULL COMMENT '电子邮箱(商家)',
  `merchant_address` VARCHAR(255) DEFAULT NULL COMMENT '联系地址(商家)',
  `merchant_company_id` BIGINT(11) NOT NULL COMMENT '公司id(商家)',
  `merchant_dept_id` BIGINT(11) DEFAULT NULL COMMENT '权限部门id(商家)',
  `order_status` INT(2) DEFAULT '0' COMMENT '订单状态 0.待确认 1.已确认 2.订单结束',
  `pay_status` INT(2) DEFAULT '0' COMMENT '支付状态 0 未支付, 1. 部分支付 2.已支付',
  `submit_time` TIMESTAMP NULL DEFAULT NULL COMMENT '下单时间',
  `receipt_time` TIMESTAMP NULL DEFAULT NULL COMMENT '接单时间',
  `pay_time` TIMESTAMP NULL DEFAULT NULL COMMENT '支付时间',
  `end_time` TIMESTAMP NULL DEFAULT NULL COMMENT '订单结束时间',
  `del_flag` INT(2) DEFAULT '0' COMMENT '删除标识 0.未删除 1.已删除',
  `created_by` BIGINT(11) NOT NULL COMMENT '创建人',
  `created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` BIGINT(11) NOT NULL COMMENT '修改人',
  `updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `remark` VARCHAR(255) DEFAULT NULL COMMENT '备注',
  `goods_more_remark` VARCHAR(255) DEFAULT NULL COMMENT '货物补充备注',
  `offer_id` BIGINT(11) DEFAULT NULL COMMENT '报盘id',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理(订单)表';
--- end ---

--- 新增 字典信息 代理服务类型 ---
INSERT INTO `sys_dict`(NAME, TYPE, CODE ,VALUE,del_flag)
VALUES('货物', '代理服务类型', 1, 1, 0),
('物流', '代理服务类型', 2, 2, 0),
('仓储', '代理服务类型', 3, 3, 0),
('报关', '代理服务类型', 4, 4, 0);
--- end ---


--- 创建代理(订单)货物信息表 ---
DROP TABLE IF EXISTS agent_order_goods;
CREATE TABLE agent_order_goods
(
   id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键,id',
   order_number VARCHAR(50) NOT NULL COMMENT '订单编号',
   origin_flag INT(2) DEFAULT 0 COMMENT '来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单',
   origin_number VARCHAR(20) DEFAULT NULL COMMENT '来源单号',
   commodity_id BIGINT(11) DEFAULT NULL COMMENT '商品id',
   commodity_name VARCHAR(200) DEFAULT NULL COMMENT '商品名称',
   commodity_number VARCHAR(200) DEFAULT NULL COMMENT '商品编号',
   factory_no VARCHAR(200) DEFAULT NULL COMMENT '厂号',
   commodity_country VARCHAR(50) DEFAULT NULL COMMENT '商品产地',
   commodity_price DECIMAL(10,3) DEFAULT 0.000 COMMENT '商品单价',
   commodity_count  DECIMAL(12,5) DEFAULT 0.00000 COMMENT '商品数量',
   weight DECIMAL(12,5) DEFAULT 0.00000 COMMENT '重量',
   unit VARCHAR(50) DEFAULT NULL COMMENT '单位',
   PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理(订单)货物信息表';
--- end ---

--- 创建代理(订单)服务信息表 ---
DROP TABLE IF EXISTS agent_order_business;
CREATE TABLE agent_order_business
(
   id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键,id',
   order_number VARCHAR(50) NOT NULL COMMENT '订单编号',
   origin_flag INT(2) DEFAULT 0 COMMENT '来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单',
   origin_number VARCHAR(20) DEFAULT NULL COMMENT '来源单号',
   bus_type INT(2) NOT NULL COMMENT '服务类型编号 1.货物 2.物流 3.仓储 4.报关',
   bus_name VARCHAR(20) NOT NULL COMMENT '服务类型名称',
   PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理(订单)服务信息表';
--- end ---

--- 新增 货物重量单位 --
INSERT INTO `sys_dict`
   (NAME, TYPE,CODE,VALUE,del_flag)
VALUES
   ('千克','货物重量单位','KG','KG',0),
   ('吨','货物重量单位','T','T',0),
   ('柜','货物重量单位','CTN','CTN',0);
--- end ---
