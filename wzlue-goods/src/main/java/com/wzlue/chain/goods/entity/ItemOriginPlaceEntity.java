package com.wzlue.chain.goods.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 商品产地信息
 */
public class ItemOriginPlaceEntity {
    private static final long serialVersionUID = 1L;

    //主键自增
    private Long id;
    //地区
    private String place;
    //数值
    private BigDecimal numerical;
    //关税
    private BigDecimal tariff;
    //增值税
    private BigDecimal valueAddTariff;
    //附加税
    private BigDecimal additionDuty;

    private String placeName;

    private String remark;

    private Long goodsId;

    List<ItemOriginPlaceEntity> places;

    public List<ItemOriginPlaceEntity> getPlaces() {
        return places;
    }

    public void setPlaces(List<ItemOriginPlaceEntity> places) {
        this.places = places;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public BigDecimal getNumerical() {
        return numerical;
    }

    public void setNumerical(BigDecimal numerical) {
        this.numerical = numerical;
    }

    public BigDecimal getTariff() {
        return tariff;
    }

    public void setTariff(BigDecimal tariff) {
        this.tariff = tariff;
    }

    public BigDecimal getValueAddTariff() {
        return valueAddTariff;
    }

    public void setValueAddTariff(BigDecimal valueAddTariff) {
        this.valueAddTariff = valueAddTariff;
    }

    public BigDecimal getAdditionDuty() {
        return additionDuty;
    }

    public void setAdditionDuty(BigDecimal additionDuty) {
        this.additionDuty = additionDuty;
    }

    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }
}
