package com.wzlue.chain.common.enums;

/**
 * 银行卡 类型
 */
public enum CardType {

    DC("DC", "储蓄卡"),
    CC("CC", "信用卡"),
    SCC("SCC", "准贷记卡"),
    PC("PC", "预付费卡");

    private String name;
    private String code;

    CardType(String code, String name) {
        this.code = code;
        this.name = name;
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


    public static String getCardName(String code) {
        for (CardType type : CardType.values()) {
            if (code.equals(type.getCode())) {
                return type.getName();
            }
        }
        return null;
    }
}
