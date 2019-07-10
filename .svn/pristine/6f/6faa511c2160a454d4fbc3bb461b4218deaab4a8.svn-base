package com.wzlue.chain.marketing.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.wzlue.chain.common.base.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wzlue.chain.agent.dao.ContractAnnexDao;
import com.wzlue.chain.agent.entity.ContractAnnexEntity;
import com.wzlue.chain.common.utils.StringTools;
import com.wzlue.chain.company.dao.MerchantCompanyDao;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.marketing.dao.MarketAuctionCommodityDao;
import com.wzlue.chain.marketing.dao.MarketAuctionDao;
import com.wzlue.chain.marketing.dao.MarketBidRecordDao;
import com.wzlue.chain.marketing.entity.MarketAuctionCommodityEntity;
import com.wzlue.chain.marketing.entity.MarketAuctionEntity;
import com.wzlue.chain.marketing.entity.MarketBidRecordEntity;
import com.wzlue.chain.marketing.service.MarketAuctionService;
import com.wzlue.chain.sys.service.SysNumberRuleService;


@Service("marketAuctionService")
public class MarketAuctionServiceImpl implements MarketAuctionService {
    @Autowired
    private MarketAuctionDao marketAuctionDao;
    @Autowired
    private ContractAnnexDao contractAnnexDao;
    @Autowired
    private SysNumberRuleService sysNumberRuleService;
    @Autowired
    private MarketAuctionCommodityDao marketAuctionCommodityDao;
    @Autowired
    private MerchantCompanyDao merchantCompanyDao;
    @Autowired
    private MarketBidRecordDao marketBidRecordDao;

    @Override
    public MarketAuctionEntity queryObject(Long id) {
        return marketAuctionDao.queryObject(id);
    }

    @Override
    public List<MarketAuctionEntity> queryList(Map<String, Object> map) {
        return marketAuctionDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return marketAuctionDao.queryTotal(map);
    }

    @Override
    public void save(MarketAuctionEntity marketAuction) {
        MerchantCompanyEntity company = merchantCompanyDao.queryByUserId(marketAuction.getCreateBy());
        if (!StringTools.isNullOrEmpty(company)) {
            marketAuction.setCompanyName(company.getCompanyName());
            marketAuction.setCompanyId(company.getId().intValue());
        }
        marketAuction.setDelFlag(0);
        marketAuction.setCreateDate(new Date());
        //生成编码
        marketAuction.setAuctionNumber(sysNumberRuleService.getCodeNumber("number_config_auction"));
        //状态 0:上架,1:下架 2未上架
        marketAuction.setStatus(0);
        marketAuctionDao.save(marketAuction);
        //插入拍品图片
        if (marketAuction.getFile() != null && marketAuction.getFile().get(0) != null) {
            for (ContractAnnexEntity annexEntity : marketAuction.getFile()) {
                annexEntity.setContractId(marketAuction.getId());
                annexEntity.setContractType((long) 6);
                contractAnnexDao.save(annexEntity);
            }
        }
        //遍历商品
        List<MarketAuctionCommodityEntity> marketAuctionCommodityEntityList = marketAuction.getMarketAuctionCommodityEntityList();
        for (MarketAuctionCommodityEntity marketAuctionCommodityEntity : marketAuctionCommodityEntityList) {
            marketAuctionCommodityEntity.setAuctionId(marketAuction.getId());
            marketAuctionCommodityEntity.setAuctionNumber(marketAuction.getAuctionNumber());
        }
        marketAuctionCommodityDao.saveList(marketAuctionCommodityEntityList);
    }

    @Override
    public void update(MarketAuctionEntity marketAuction) {
        marketAuction.setUpdateDate(new Date());
        marketAuctionDao.update(marketAuction);
        //插入拍品图片
        if (marketAuction.getFile() != null && marketAuction.getFile().get(0) != null) {
            contractAnnexDao.deleteByContractId(marketAuction.getId(), 6);
            for (ContractAnnexEntity annexEntity : marketAuction.getFile()) {
                annexEntity.setContractId(marketAuction.getId());
                annexEntity.setContractType((long) 6);
                contractAnnexDao.save(annexEntity);
            }
        }
        //删除旧商品
        marketAuctionCommodityDao.deleteByAuctionId(marketAuction.getId());
        //插入商品
        List<MarketAuctionCommodityEntity> marketAuctionCommodityEntityList = marketAuction.getMarketAuctionCommodityEntityList();
        for (MarketAuctionCommodityEntity marketAuctionCommodityEntity : marketAuctionCommodityEntityList) {
            marketAuctionCommodityEntity.setAuctionId(marketAuction.getId());
            marketAuctionCommodityEntity.setAuctionNumber(marketAuction.getAuctionNumber());
        }
        marketAuctionCommodityDao.saveList(marketAuctionCommodityEntityList);
    }

    @Override
    public void delete(Long id) {
        marketAuctionDao.delete(id);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        marketAuctionDao.deleteBatch(ids);
    }

    @Override
    public List<MarketAuctionEntity> queryListByStatusAndTime(MarketAuctionEntity marketAuction) {
        // TODO Auto-generated method stub
        return marketAuctionDao.queryListByStatusAndTime(marketAuction);
    }

    @Override
    public void updateStatusByIds(int status, long id) {
        // TODO Auto-generated method stub
        marketAuctionDao.updateStatusByIds(status, id);
        //上架操作
        if (status == 0) {
            MarketAuctionEntity maBean = marketAuctionDao.queryObject(id);
            if (maBean.getType() == 0) {
                //降价拍规则 每小时降价
                try {
                    dutchAuction(maBean);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    //降价拍卖
    private void dutchAuction(MarketAuctionEntity maBean) throws ParseException {
        SimpleDateFormat sdft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date sdate = sdft.parse(sdft.format(maBean.getStartTime()));
        Date edate = sdft.parse(sdft.format(maBean.getEndTime()));
        long ms = edate.getTime() - sdate.getTime();
        long hour = ms / (1000 * 60 * 60);  //开始时间 结束时间 相差的小时数
        for (int i = 0; i < hour; i++) {
            long start = sdate.getTime();
            long now = sdft.parse(sdft.format(new Date())).getTime();
            long difference = start + ((i + 1) * (1000 * 60 * 60)) - now;
            if (difference > 0) {
                timer3(difference, maBean.getId());
            }
        }
    }

    @Override
    public Boolean marketAuctionIsOK(long id) {
        //默认失败
        boolean flag = false;
        //查询拍卖详情
        MarketAuctionEntity mAuctionBean = marketAuctionDao.queryObject(id);
        //查询最新一条拍卖记录
        MarketBidRecordEntity mRecordBean = marketBidRecordDao.queryNewObject(id);
        //有拍卖记录
        if (!StringTools.isNullOrEmpty(mRecordBean)) {
            //对比最终出价和保留价
            int equalFlag = mRecordBean.getTerminalPrice().compareTo(mAuctionBean.getReservePrice());
//			//判断拍卖类型 0:降价拍,1:升价拍
//			if(mAuctionBean.getType()==0)
//			{
//				//判断是否低于或等于保留价
//				if(equalFlag!=1)
//				{
//					flag=true;
//				}
//			}
//			else //升价拍
//			{
            //判断是否高于或等于保留价
            if (equalFlag != -1) {
                flag = true;
            }
//			}
//			不管是升价拍还是降价拍 最终出价都要高于保留价 才能算拍卖成功
            if (flag) {  //拍卖成功
                mRecordBean.setStatus(1);   //得标
                marketBidRecordDao.update(mRecordBean);
            }
        }
        return flag;
    }

    @Override
    public void updateStartingPrice(MarketAuctionEntity marketAuction) {
        marketAuctionDao.update(marketAuction);
    }

    @Override
    public void updateStatus(Map<String, Object> map) {
//        marketAuctionDao.updateStatus(map);
        Long[] ids = (Long[]) map.get("ids");
        for (Long id : ids) {
            updateStatusByIds(0,id);
        }
    }

    @Override
    public void updateStatus1(Map<String, Object> map) {
        marketAuctionDao.updateStatus(map);
    }

    @Override
    public List<MarketAuctionEntity> queryHot(Query query) {
        return marketAuctionDao.queryListHot(query);
    }

    @Override
    public void depreciate(long id) {
        //根据变价幅度 进行降价
        marketAuctionDao.depreciate(id);
        MarketAuctionEntity marketA = marketAuctionDao.queryObject(id);
        int compare = marketA.getStartingPrice().compareTo(marketA.getReservePrice());
        //起拍价 小于 保留价 --- 下架
        if (compare == -1) {
            marketAuctionDao.updateStatusByIds(1, id);
        }
    }

    /**
     * 时间定时器-任务调度 根据毫秒数执行Timer  执行降价操作
     *
     * @param a
     * @throws ParseException
     * @Description:
     * @version:v1.0
     * @author:shx
     * @date:2019年03月29日 下午2:12:11
     */
    public void timer3(long a, long id) throws ParseException {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                //根据变价幅度 降价
                depreciate(id);
                timer.cancel();
            }
        }, a);// 设定指定的时间time
    }

    @Override
    public MarketAuctionEntity getMarketAuctionByid(Long auctionId) {
        return marketAuctionDao.getMarketAuctionByid(auctionId);
    }
}
