package com.wzlue.chain.web.controller.sys;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.company.dao.MerchantCompanyDao;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.sys.common.util.ShiroUtils;
import com.wzlue.chain.sys.entity.SysUserEntity;
import com.wzlue.chain.sys.form.LoginForm;
import com.wzlue.chain.sys.service.SysUserService;
import com.wzlue.chain.sys.service.SysUserTokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

/**
 * 登录相关
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月10日 下午1:15:31
 */
@RestController
@Api(value = "登录管理")
public class SysLoginController extends AbstractController {
    @Autowired
    private Producer producer;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserTokenService sysUserTokenService;
    @Autowired
    private MerchantCompanyDao merchantCompanyDao;


	/**
	 * 验证码
	 */
	@RequestMapping("captcha.jpg")
	public void captcha(HttpServletResponse response)throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-store, no-cache");
		response.setContentType("image/jpeg");

		//生成文字验证码
		String text = producer.createText();
		//生成图片验证码
		BufferedImage image = producer.createImage(text);
		//保存到shiro session
		ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);

		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(image, "jpg", out);
		IOUtils.closeQuietly(out);
	}

	/**
	 * 登录,password,username
	 */
	@PostMapping(value = "/sys/login")
	@ApiOperation(value="登录接口")
	public Map<String, Object> login(@RequestBody LoginForm form)throws IOException {
		//本项目已实现，前后端完全分离，但页面还是跟项目放在一起了，所以还是会依赖session
		//如果想把页面单独放到nginx里，实现前后端完全分离，则需要把验证码注释掉(因为不再依赖session了)
//		String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
//		if(!captcha.equalsIgnoreCase(kaptcha)){
//			return R.error("验证码不正确");
//		}

		//用户信息
		SysUserEntity user = sysUserService.queryByUserName(form.getUsername());

		//账号不存在、密码错误
		if (user == null || !user.getPassword().equals(new Sha256Hash(form.getPassword(), user.getSalt()).toHex())) {
			return R.error("账号或密码不正确");
		}

		/*if(!ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY).equalsIgnoreCase(form.getCaptcha()))
			return R.error("验证码不正确");*/

		//账号锁定
		if (user.getStatus() == 0) {
			return R.error("账号已被锁定,请联系管理员");
		}

		//验证是否是公司,是否审核通过。
		if (null != user.getCompanyId() && StringUtils.isNotBlank(user.getCompanyId().toString())) {
			long companyid = user.getCompanyId();

			MerchantCompanyEntity companyEntity = merchantCompanyDao.queryByCompanyId(companyid);
			if (null != companyEntity) {
				if ("0".equals(companyEntity.getAuditStatus()))
					return R.error("管理员正在拼命审核中！");
				if ("2".equals(companyEntity.getAuditStatus()))
					return R.error("账号异常请联系管理员！");
			}
		}
		//生成token，并保存到数据库
		R r = sysUserTokenService.createToken(user.getUserId());
		return r;
	}

	/**
	 * app 登陆
	 * @param form
	 * @return
	 * @throws IOException
	 */
	@PostMapping(value = "/sys/appLogin")
	@ApiOperation(value="APP登录接口")
	public Map<String, Object> appLogin(@RequestBody LoginForm form) throws IOException {
		//本项目已实现，前后端完全分离，但页面还是跟项目放在一起了，所以还是会依赖session
		//如果想把页面单独放到nginx里，实现前后端完全分离，则需要把验证码注释掉(因为不再依赖session了)
//		String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
//		if(!captcha.equalsIgnoreCase(kaptcha)){
//			return R.error("验证码不正确");
//		}

		//用户信息
		SysUserEntity user = sysUserService.queryByUserName(form.getUsername());

		//账号不存在、密码错误
		if (user == null || !user.getPassword().equals(new Sha256Hash(form.getPassword(), user.getSalt()).toHex())) {
			return R.error("账号或密码不正确");
		}

		/*if(!ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY).equalsIgnoreCase(form.getCaptcha()))
			return R.error("验证码不正确");*/

		//账号锁定
		if (user.getStatus() == 0) {
			return R.error("账号已被锁定,请联系管理员");
		}

		//验证是否是公司,是否审核通过。
		if (null != user.getCompanyId() && StringUtils.isNotBlank(user.getCompanyId().toString())) {
			long companyid = user.getCompanyId();

			MerchantCompanyEntity companyEntity = merchantCompanyDao.queryByCompanyId(companyid);
			if (null != companyEntity) {
				if ("0".equals(companyEntity.getAuditStatus()))
					return R.error("管理员正在拼命审核中！");
				if ("2".equals(companyEntity.getAuditStatus()))
					return R.error("账号异常请联系管理员！");
			}
		}
		//生成token，并保存到数据库
		R r = sysUserTokenService.createToken(user.getUserId());
		return r;
	}

	/**
	 * 退出,token
	 */
	@PostMapping(value = "/sys/logout")
	@ApiImplicitParam(paramType="header", name = "token", value = "token", required = true, dataType = "string")
	@ApiOperation(value="退出接口")
	public R logout() {
		sysUserTokenService.logout(getUserId());
		return R.ok();
	}
	
}
