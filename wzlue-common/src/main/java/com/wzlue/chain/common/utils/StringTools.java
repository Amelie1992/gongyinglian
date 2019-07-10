/**
 * Copyright (C) 2018 FZJT Co. Ltd.
 *
 *
 * @className:com.wzlue.chain.common.utils.StringTools
 * @description:
 * 
 * @version:v1.0.0 
 * @author:qianTao
 * 
 * Modification History:
 * Date         Author      Version     Description
 * -----------------------------------------------------------------
 * 2018年11月20日    	qianTao  	v1.0.0        create
 *
 *
 */
package com.wzlue.chain.common.utils;

/**
 * 后台校验工具类
 * @className:com.wzlue.chain.common.utils.StringTools
 * @description:
 * @version:v1.0.0 
 * @date:2018年11月20日 下午2:46:08
 * @author:qianTao
 */
public class StringTools
{
	/**
	 * 判断string是否为空
	 * @Description:
	 * @param str
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:15:53
	 */
	public static boolean isNullOrEmpty(String str)
	{
		if (null == str || "".equals(str) || "null".equals(str))
		{
			return true;
		}
		return false;
	}

	/**
	 * 判断对象是否为空
	 * @Description:
	 * @param obj
	 * @return
	 * @version:v1.0
	 * @author:Bing Lu
	 * @date:2014-10-20 下午4:15:58
	 */
	public static boolean isNullOrEmpty(Object obj)
	{
		if (null == obj || "".equals(obj))
		{
			return true;
		}
		return false;
	}
}
