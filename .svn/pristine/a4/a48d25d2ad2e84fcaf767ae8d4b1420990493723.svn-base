package com.wzlue.chain.common.enums;

public enum NumberType {
    ORDER("ORD","ORD"),
    ACTIVITY("ACT","活动编号"),
    PRODUCT("PRO","商品编号");

    private String name;
    private String code;

    NumberType(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public static String getName(NumberType numberType){
        for (NumberType n : NumberType.values()) {
            if (n.getName() == numberType.getName()){
                return n.getName();
            }
        }
        return null;
    }

    public static String getCode(NumberType numberType){
        for (NumberType n : NumberType.values()) {
            if (n.getCode() == numberType.getCode()){
                return n.getCode();
            }
        }
        return null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
