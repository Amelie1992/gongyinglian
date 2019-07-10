
----- 商品分类表 @author zeyee @since 2018-08-09 -----
DROP TABLE IF EXISTS item_category;
CREATE TABLE item_category
(
	id INT(10) NOT NULL COMMENT '主键自增',
	category_name VARCHAR(100) NOT NULL COMMENT '分类名称',
	tax_number VARCHAR(200) NULL COMMENT '税号',
	pricing_method INT(2) NOT NULL COMMENT '计价方式: 1.从价 2.从量',
	now_status INT(2) NOT NULL DEFAULT 1 COMMENT '分类状态: 1.启用 2.冻结',
	parent_id INT(10) DEFAULT 0 NULL COMMENT '上级id,为0则为一级',
	dept_id INT(10) null comment'权限部门id',
	created_by INT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(20) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品分类表';
----- end -----

----- 商品库表 @author zeyee @since 2018-08-09 -----
DROP TABLE IF EXISTS item_info;
CREATE TABLE item_info
(
	id INT(10) NOT NULL COMMENT '主键自增',
	item_name VARCHAR(200) NOT NULL COMMENT '商品名称',
	item_code VARCHAR(200) NOT NULL COMMENT '商品编码',
	category_id INT(10) NOT NULL COMMENT 'FK:商品分类id',
	place_id INT(10) NOT NULL COMMENT 'FK:产地id',
	factory_no VARCHAR(200) NOT NULL COMMENT '厂号',
	pricing_method INT(2) NOT NULL COMMENT '冗余字段:计价方式 来源:商品分类',
	numerical DECIMAL(10,3) NOT NULL COMMENT '冗余字段:数值 释义:该种商品在某个地区某种计价方式的数值',
	pending_status INT(2) NOT NULL COMMENT '审核状态 1.待审核 2.审核中 3.已审核,审核通过 4.审核未通过',
	dept_id INT(10) NULL COMMENT'权限部门id',
	created_by INT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(20) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品库表(商品信息)';
----- end -----

----- 商品库表 @author zeyee @since 2018-08-09 -----
DROP TABLE IF EXISTS item_origin_place;
CREATE TABLE item_origin_place
(
	id INT(10) NOT NULL COMMENT '主键自增',
	place VARCHAR(50) NOT NULL COMMENT '地区',
	numerical DECIMAL(10,3) NOT NULL COMMENT '数值',
	tariff DECIMAL(10,3) NOT NULL COMMENT '关税',
	value_add_tariff DECIMAL(10,3) NOT NULL COMMENT '增值税',
	addition_duty DECIMAL(10,3) NOT NULL COMMENT '附加税',
	dept_id INT(10) NULL COMMENT '权限部门id',
	created_by INT(11) NOT NULL COMMENT '创建人',
	created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	updated_by BIGINT(20) NOT NULL  COMMENT '修改人',
	updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='商品产地信息表';


--- 字段表存储 代理项目(服务类型分类) ---
INSERT INTO `sys_dict`(NAME, TYPE, CODE ,VALUE,del_flag)
VALUES('货物', '代理服务类型', 1, 1, 0),
('物流', '代理服务类型', 2, 2, 0),
('仓储', '代理服务类型', 3, 3, 0),
('报关', '代理服务类型', 4, 4, 0);

--- end ---


--- 代理(订单)信息表 ---
DROP TABLE IF EXISTS agent_order;
CREATE TABLE agent_order
(
   id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键,id',
   order_number VARCHAR(20) NOT NULL COMMENT '代理订单编号',
   contract_number VARCHAR(100) NULL COMMENT '合同编号',
   contact_phone VARCHAR(13) DEFAULT NULL COMMENT '联系方式(买家)',
   contact_person VARCHAR(50) DEFAULT NULL COMMENT '联系人(买家)',
   contact_email VARCHAR(100) DEFAULT NULL COMMENT '电子邮箱(买家)',
   contact_address VARCHAR(255) DEFAULT NULL COMMENT '地址(买家)',
   contact_company_id BIGINT(11) NOT NULL COMMENT '公司id(买家)',
   contact_dept_id BIGINT(11) NOT NULL COMMENT '权限部门id(买家)',
   total_price DECIMAL(12,5) DEFAULT 0.00000 COMMENT '订单总价',
   currency VARCHAR(20) DEFAULT NULL COMMENT '币种',
   unit_price DECIMAL(12,5) DEFAULT 0.00000 COMMENT '代理费用单价',
   outlay_quantity INT(10) DEFAULT 0 COMMENT '代理费用数量',
   origin_flag INT(2) DEFAULT 0 COMMENT '来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单',
   origin_number VARCHAR(20) DEFAULT NULL COMMENT '来源单号',
   merchant_phone VARCHAR(13) DEFAULT NULL COMMENT '联系方式(商家)',
   merchant_person VARCHAR(50) DEFAULT NULL COMMENT '联系人(商家)',
   merchant_email VARCHAR(100) DEFAULT NULL COMMENT '电子邮箱(商家)',
   merchant_address VARCHAR(255) DEFAULT NULL COMMENT '联系地址(商家)',
   merchant_company_id BIGINT(11) NOT NULL COMMENT '公司id(商家)',
   merchant_dept_id BIGINT(11) NOT NULL COMMENT '权限部门id(商家)',
   order_status INT(2) DEFAULT 0 COMMENT '订单状态 0.待确认 1.已确认 2.订单结束',
   pay_status INT(2) DEFAULT 0 COMMENT '支付状态 0 未支付, 1. 部分支付 2.已支付',
   submit_time TIMESTAMP DEFAULT NULL COMMENT '下单时间',
   receipt_time TIMESTAMP DEFAULT NULL COMMENT '接单时间',
   pay_time TIMESTAMP DEFAULT NULL COMMENT '支付时间',
   end_time TIMESTAMP DEFAULT NULL COMMENT '订单结束时间',
   del_flag INT(2) DEFAULT 0 COMMENT '删除标识 0.未删除 1.已删除',
   created_by BIGINT(11) NOT NULL COMMENT '创建人',
   created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   updated_by BIGINT(11) NOT NULL  COMMENT '修改人',
   updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
   remark VARCHAR(255) DEFAULT NULL COMMENT '备注',
   goods_remark VARCHAR(255) DEFAULT NULL COMMENT '货物补充备注',
   PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理(订单)表';
--- end ---

--- 代理(订单)项目信息表[服务类型分类] ---
DROP TABLE IF EXISTS agent_order_business;
CREATE TABLE agent_order_business
(
   id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键,id',
   order_number VARCHAR(20) NOT NULL COMMENT '订单编号',
   origin_flag INT(2) DEFAULT 0 COMMENT '来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单',
   origin_number VARCHAR(20) DEFAULT NULL COMMENT '来源单号',
   bus_type INT(2) NOT NULL COMMENT '服务类型编号 1.货物 2.物流 3.仓储 4.报关',
   bus_name VARCHAR(20) NOT NULL COMMENT '服务类型名称',
   PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理(订单)项目表';
--- end ---

--- 代理(订单)商品信息表 ---
DROP TABLE IF EXISTS agent_order_goods;
CREATE TABLE agent_order_goods
(
   id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键,id',
   order_number VARCHAR(20) NOT NULL COMMENT '订单编号',
   origin_flag INT(2) DEFAULT 0 COMMENT '来源判断表示 0.无来源 1.来源货物订单 2.来源物流订单 3.来源仓储订单 4来源报关订单',
   origin_number VARCHAR(20) DEFAULT NULL COMMENT '来源单号',
   commodity_id BIGINT(11) DEFAULT NULL COMMENT '商品名称',
   commodity_name VARCHAR(200) DEFAULT NULL COMMENT '商品名称',
   commodity_number VARCHAR(200) DEFAULT NULL COMMENT '商品编号',
   factory_no VARCHAR(200) DEFAULT NULL COMMENT '厂号',
   commodity_country VARCHAR(255) DEFAULT NULL COMMENT '产地',
   commodity_price DECIMAL(12,5) DEFAULT 0.00000 COMMENT '商品价格',
   commodity_count DECIMAL(12,5) DEFAULT 0.00000 COMMENT '商品数量',
   weight DECIMAL(12,5) DEFAULT 0.00000 COMMENT '重量',
   unit VARCHAR(255) DEFAULT NULL COMMENT '重量单位',
   PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理(订单)货物信息表';
--- end ---

--- 代理(订单)所属分类信息表 ---
DROP TABLE IF EXISTS agent_offer_goods_category;
CREATE TABLE agent_offer_goods_category
(
   id BIGINT(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增,id',
   offer_id BIGINT(11) NOT NULL COMMENT '报盘id',
   category_id BIGINT(11) DEFAULT NULL COMMENT '分类编号',
   category_name VARCHAR(20) DEFAULT NULL COMMENT '分类名称',
   PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='代理报盘商品分类信息表'
--- end ---