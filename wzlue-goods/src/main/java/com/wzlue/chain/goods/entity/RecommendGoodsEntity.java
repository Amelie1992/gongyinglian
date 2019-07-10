package com.wzlue.chain.goods.entity;

import com.wzlue.chain.sys.entity.ImageEntity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/**
 * 推荐商品表
 * 
 * @author 
 * @email 
 * @date 2018-11-19 19:05:20
 */
public class RecommendGoodsEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	//商品分类
	private String type;
	//报盘货物编号
	private String goodsOfferNo;
	//商品分类
	private List<ItemCategoryEntity> categoryList;
	//状态
	private Integer status;
	//位置
	private Integer position;
	//商家id
	private Integer sellId;
	//商家名
	private String companyName;
    //报盘求购 期货现货 商品名称
    private String productName;
    //创建时间
    private Date createTime;
    //修改时间
    private Date updateTime;


    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	public Integer getSellId() {
		return sellId;
	}

	public void setSellId(Integer sellId) {
		this.sellId = sellId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
	 * 设置：
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：商品分类
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * 获取：商品分类
	 */
	public String getType() {
		return type;
	}
	/**
	 * 设置：报盘货物id
	 */
	public void setGoodsOfferNo(String goodsOfferNo) {
		this.goodsOfferNo = goodsOfferNo;
	}
	/**
	 * 获取：报盘货物id
	 */
	public String getGoodsOfferNo() {
		return goodsOfferNo;
	}

	/**
	 * 分类
	 */
	public void setImages(List<ItemCategoryEntity> categoryList) {
		this.categoryList = categoryList;
	}
	/**
	 * 分类
	 */
	public List<ItemCategoryEntity> getImages() {
		return categoryList;
	}
	/**
	 * 设置：
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * 获取：
	 */
	public Integer getStatus() {
		return status;
	}
}
