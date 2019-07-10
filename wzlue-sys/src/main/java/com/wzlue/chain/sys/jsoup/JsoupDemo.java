package com.wzlue.chain.sys.jsoup;

import com.wzlue.chain.sys.dao.JsoupDao;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//梅特国际集团  爬虫
@Component
public class JsoupDemo {
    @Autowired
    private JsoupDao jsoupDao;

//    @Scheduled(cron="0/5 * *  * * ? ")   //每5秒执行一次
    public  void jsoupMtjtDemo() {
        try {
            Document doc = Jsoup.connect("http://www.meatinternationalgroup.com/").get();
            Elements elements = doc.getElementsByTag("table").get(1).select("tr");
            elements.remove(0);
//            品类Class
//              产品Product
//            产地 Region
//            本期成交价Price
//            上期价格Last Week
//            环比 % Rate

            for (int i=0;i<elements.size();i++) {
                Elements element =elements.get(i).select("td").select("span");
                List list=new ArrayList();
                        for(int j=0;j<element.size();j++){
                            System.out.println(i+"====="+element.get(j).text().toString());
                            if(!"".equals(element.get(j).text().toString().trim())){
                                list.add(element.get(j).text().toString());
                            }
                        }

                    if(list.size()==6){
                    Map map=new HashMap();
                        map.put("classes",list.get(0));
                        map.put("product",list.get(1));
                        map.put("region",list.get(2));
                        map.put("price",list.get(3));
                        map.put("last_week",list.get(4));
                        map.put("rate",list.get(5));
                        jsoupDao.save(map);
                    }

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
