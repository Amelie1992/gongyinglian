package com.wzlue.chain.web.controller.marketInfo;

import com.wzlue.chain.common.base.R;
import com.wzlue.chain.sys.dao.JsoupDao;
import com.wzlue.chain.web.controller.sys.AbstractController;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * 获取行情资讯信息
 */
@RestController
@RequestMapping("/marketMessage")
public class MarketInfoController extends AbstractController {

    @Autowired
    private JsoupDao jsoupDao;

    @RequestMapping("/getMarketList")
    public R getMarketList(){
        List<Map<String,Object>> marketList = jsoupDao.getMarketList();
        return R.page(marketList, null);

    }
}
