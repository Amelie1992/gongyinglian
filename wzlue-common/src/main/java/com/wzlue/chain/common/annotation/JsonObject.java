package com.wzlue.chain.common.annotation;

import java.lang.annotation.*;

@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface JsonObject {

    String value() default "";

    boolean required() default true;

    boolean notEmpty() default true;
}