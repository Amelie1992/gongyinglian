package com.wzlue.chain.bill.utils;

import com.alibaba.fastjson.JSONObject;
import com.wzlue.chain.bill.entity.ValidateAndCacheCardInfo;
import com.wzlue.chain.common.utils.HttpClientUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class UnionpayUtils {

    private static Logger logger = LoggerFactory.getLogger(UnionpayUtils.class);

    private static String AppId;

    private static String AppSecret;

    private static String Signature;

    private static String tokenUrl;

    private static String cardUrl;

    private static String validateAndCacheCardUrl;

    //  用户唯一凭证
    @Value("${unionpay.appid}")
    public void setAppId(String appId) {
        this.AppId = appId;
    }

    // 用户唯一凭证密钥
    @Value("${unionpay.appsecret}")
    public void setAppSecret(String appSecret) {
        UnionpayUtils.AppSecret = appSecret;
    }

    @Value("${unionpay.signature}")
    public void setSignature(String signature) {
        UnionpayUtils.Signature = signature;
    }

    @Value("${unionpay.tokenurl}")
    public void setTokenUrl(String tokenUrl) {
        UnionpayUtils.tokenUrl = tokenUrl;
    }

    @Value("${unionpay.cardurl}")
    public void setCardUrl(String cardUrl) {
        UnionpayUtils.cardUrl = cardUrl;
    }

    @Value("${unionpay.validateAndCacheCardUrl}")
    public void setValidateAndCacheCardUrl(String validateAndCacheCardUrl) {
        UnionpayUtils.validateAndCacheCardUrl = validateAndCacheCardUrl;
    }

    /**
     * 获取token
     *
     * @return token
     */
    public static JSONObject getToken() {
        JSONObject obj = null;
        try {
            obj = getToken(AppId, AppSecret);

        } catch (Exception e) {
            logger.error("get token fail!");
        }
        return obj;
    }

    /**
     * 获取token
     *
     * @param appId     用户唯一凭证
     * @param appSecret 用户唯一凭证密钥
     * @return
     */
    public static JSONObject getToken(String appId, String appSecret) {
        JSONObject obj = null;
        try {
            String url = tokenUrl.replace("APP_ID", appId).replace("APP_SECRET", appSecret);
            obj = HttpClientUtils.httpGet(url);
        } catch (Exception e) {
            logger.error("get token  fial!");
        }
        return obj;
    }

    /**
     * 银行卡信息查询
     *
     * @param cardNo 银行卡卡号
     * @return JSONObject 根据银行卡卡号，返回发卡行、发卡行机构代码、卡性质、卡类别、卡种、卡品牌、卡产品、卡等级、卡介质、所属总行机构中文名称、所属总行机构中文简称
     */
    public static JSONObject getCardInfo(String cardNo) {
        JSONObject cardInfo = null;
        try {
            // 参数
            Long ts = new Date().getTime();
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("cardNo", cardNo);
            String body = JSONObject.toJSONString(paramMap);
            // 加密
            String sign = EncodeUtils.sign(body, ts + "", Signature + "");
            // 获取token
            cardInfo = getToken();
            if (!"0000".equals(cardInfo.get("respCd")))
                return cardInfo;
            String url = cardUrl.replace("TOKEN", cardInfo.get("token") + "").replace("SIGN", sign).replace("TS", ts + "");

            JSONObject params = new JSONObject();
            params.put("cardNo", cardNo);
            cardInfo = HttpClientUtils.httpPost(url, params);
            if (!"0000".equals(cardInfo.get("respCd")))
                return cardInfo;

        } catch (Exception e) {
            logger.error("get cardindo  fial!");
            cardInfo.put("respCd", "9999");
            cardInfo.put("respMsg", "系统错误！");

        } finally {
            return cardInfo;
        }
    }

    public static ValidateAndCacheCardInfo validateAndCacheCardInfo(String cardNo) {
        ValidateAndCacheCardInfo validateAndCacheCardInfo;
        JSONObject obj = HttpClientUtils.httpGet(validateAndCacheCardUrl.replace("CARDNO", cardNo));
        validateAndCacheCardInfo = obj.toJavaObject(ValidateAndCacheCardInfo.class);

        return validateAndCacheCardInfo;
    }

}
