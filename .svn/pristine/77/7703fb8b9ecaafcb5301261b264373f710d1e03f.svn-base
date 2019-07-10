package com.wzlue.chain.common.annotation;

import com.wzlue.chain.common.base.LogSource;

import java.lang.annotation.*;

/**
 * 系统日志注解
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017年3月8日 上午10:19:56
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {

	/**
	 * 描述
	 * @return
	 */
	String value() default "";

	/**
	 * 来源 默认PC
	 * @return
	 */
	LogSource source() default LogSource.PC;
}



