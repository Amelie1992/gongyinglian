package com.wzlue.chain.bill.service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Jackson对于date的反序列化
 */
public class JsonDateDeserializer extends JsonDeserializer<Date> {

    @Override
    public Date deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        SimpleDateFormat format;
        String date = jp.getText();
        String[] hengxian = date.split("-");
        if(hengxian.length > 3){
            format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        }else{
            format = new SimpleDateFormat("yyyy-MM-dd");
        }
        try {
            return format.parse(date);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

}
