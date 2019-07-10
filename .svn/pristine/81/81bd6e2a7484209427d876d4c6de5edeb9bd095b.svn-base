package com.wzlue.chain.sys.rate;


import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.text.ParseException;
import java.util.*;

import com.wzlue.chain.sys.dao.ExchangeRateMapper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GetAooi070Data {

    private static final List<String> COINlIST;

    static{
        //转换币种列表
        COINlIST = new ArrayList<String>(Arrays.asList("USD/CNY/美元/人民币","EUR/CNY/欧元/人民币","JPY/CNY/日元/人民币","HKD/CNY/港元/人民币","GBP/CNY/英镑/人民币","AUD/CNY/澳元/人民币",
                "NZD/CNY/新西兰元/人民币","SGD/CNY/新加坡元/人民币","CHF/CNY/瑞士法郎/人民币","CAD/CNY/加元/人民币","MYR/CNY/马来西亚林吉特/人民币","RUB/CNY/俄罗斯卢布/人民币",
                "ZAR/CNY/南非兰特/人民币","KRW/CNY/韩元/人民币","AED/CNY/阿联酋迪拉姆/人民币","SAR/CNY/沙特里亚尔/人民币","HUF/CNY/匈牙利福林/人民币","PLN/CNY/波兰兹罗提/人民币",
                "DKK/CNY/丹麦克朗/人民币","SEK/CNY/瑞典克朗/人民币","NOK/CNY/挪威克朗/人民币","TRY/CNY/土耳其里拉/人民币","MXN/CNY/墨西哥比索/人民币","THB/CNY/泰铢/人民币"));
    }

    @Autowired
    private ExchangeRateMapper exchangeRateMapper;

    public void hqhl() throws ParseException {
        int count = 0;
        try{
            Map<String,Object> coinMap = new HashMap<String,Object>();
            //汇率列
            for(int i = 0; i < COINlIST.size(); i++){
                String coin = COINlIST.get(i);
                String coinInfo[] = coin.split("/");
                String scur = coinInfo[0];
                String tcur = coinInfo[1];
                String zw = coinInfo[2]+"/"+coinInfo[3];
                //获取汇率
                URL u=new URL("https://sapi.k780.com/?app=finance.rate&scur="+scur+"&tcur="+tcur+"&appkey=37814&sign=0a106b89182257b12c036131438324ff&format=json&jsoncallback=data");
                InputStream in=u.openStream();
                ByteArrayOutputStream out=new ByteArrayOutputStream();
                try {
                    byte buf[]=new byte[1024];
                    int read = 0;
                    while ((read = in.read(buf)) > 0) {
                        out.write(buf, 0, read);
                    }
                }finally {
                    if (in != null) {
                        in.close();
                    }
                }
                byte b[]=out.toByteArray( );
                String data = new String(b,"utf-8");
                StringBuilder sBuffer = new StringBuilder(data);
                String jsonData = sBuffer.substring(5,data.length()-1);
                JSONObject object = JSONObject.fromObject(jsonData);
                if("1".equals(object.get("success"))){
                    if(count == 0){
                        exchangeRateMapper.emptyRateInfo();
                        count = count + 1;
                    }
                    JSONObject object2 = JSONObject.fromObject(object.get("result"));
                    String coinType = (String) object2.get("scur")+"/"+(String) object2.get("tcur");
                    String rate = (String)object2.get("rate");
                    coinMap.put("coinType",coinType);
                    coinMap.put("price",rate);
                    coinMap.put("zw",zw);
                    exchangeRateMapper.insertCoinRate(coinMap);
                }
            }


        }catch(Exception e){
            e.printStackTrace();
        }
        }

    }

