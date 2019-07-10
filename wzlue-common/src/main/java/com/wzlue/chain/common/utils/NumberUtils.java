package com.wzlue.chain.common.utils;

import com.wzlue.chain.common.enums.NumberType;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 编码规则
 */
public class NumberUtils {
    /** 编号后缀位数 */
    private static int SUFFIX_NUMBER_INIT = 100000;
    private static SimpleDateFormat DF = new SimpleDateFormat("yyyyMMddHHmmss");//设置日期格式


    /** 获得编号 */
    public synchronized  static String getNumber(NumberType numberType) {
        String result = String.valueOf(SUFFIX_NUMBER_INIT);
        if("999999".equals(SUFFIX_NUMBER_INIT))
            SUFFIX_NUMBER_INIT = 99999;

        SUFFIX_NUMBER_INIT++;
        return numberType.getCode() + DF.format(new Date()) +result;
    }

}
