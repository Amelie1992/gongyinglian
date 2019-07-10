package com.wzlue.chain.marketing.service.impl;

import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.company.service.MerchantCompanyService;
import com.wzlue.chain.marketing.entity.MarketAuctionEntity;
import com.wzlue.chain.marketing.service.MarketAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.wzlue.chain.marketing.dao.MarketBidRecordDao;
import com.wzlue.chain.marketing.entity.MarketBidRecordEntity;
import com.wzlue.chain.marketing.service.MarketBidRecordService;
import sun.misc.REException;

import static com.wzlue.chain.sys.common.util.ShiroUtils.getUserEntity;
import static com.wzlue.chain.sys.common.util.ShiroUtils.getUserId;


@Service("marketBidRecordService")
public class MarketBidRecordServiceImpl implements MarketBidRecordService {
    @Autowired
    private MarketBidRecordDao marketBidRecordDao;
    @Autowired
    private MarketAuctionService marketAuctionService;
    @Autowired
    private MerchantCompanyService merchantCompanyService;

    @Override
    public MarketBidRecordEntity queryObject(Long id) {
        return marketBidRecordDao.queryObject(id);
    }

    @Override
    public List<MarketBidRecordEntity> queryList(Map<String, Object> map) {
        return marketBidRecordDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return marketBidRecordDao.queryTotal(map);
    }

    @Override
    public void save(MarketBidRecordEntity marketBidRecord) {
        Long companyId = getUserEntity().getCompanyId();
        MerchantCompanyEntity companyEntity = merchantCompanyService.queryObject(companyId.intValue());
        marketBidRecord.setCompanyId(companyId.intValue());
        marketBidRecord.setCompanyName(companyEntity.getCompanyName());
        marketBidRecord.setBidTime(new Date());
        marketBidRecord.setCreateBy(getUserId().intValue());
        marketBidRecord.setCreateDate(new Date());
        marketBidRecord.setStatus(0);   //默认出局

        // 查询拍的类型
        MarketAuctionEntity auction = marketAuctionService.getMarketAuctionByid(marketBidRecord.getAuctionId());
        // 降价拍
        if (null != auction && auction.getType() == 0) {
            BigDecimal str1 = marketBidRecord.getTerminalPrice();
            if(marketBidRecord.getTerminalPrice().compareTo(str1) >= 0) {
                throw  new RRException("出价不能小于保留价");
            }
            //更新拍卖的状态为下架
            MarketAuctionEntity temp = new MarketAuctionEntity();
            temp.setStatus(2);
            temp.setId(auction.getId());

            marketAuctionService.update(auction);

        }

        marketBidRecordDao.save(marketBidRecord);
        //保存最终出价
        MarketAuctionEntity marketAuction = marketAuctionService.queryObject(marketBidRecord.getAuctionId());
        marketAuction.setStartingPrice(marketBidRecord.getTerminalPrice());
        marketAuctionService.updateStartingPrice(marketAuction);
	}
	
	@Override
	public void update(MarketBidRecordEntity marketBidRecord){
		marketBidRecordDao.update(marketBidRecord);
	}
	
	@Override
	public void delete(Long id){
		marketBidRecordDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		marketBidRecordDao.deleteBatch(ids);
	}

    @Override
    public int queryTotals(Long auctionId) {
        return marketBidRecordDao.queryTotals(auctionId);
    }

}
