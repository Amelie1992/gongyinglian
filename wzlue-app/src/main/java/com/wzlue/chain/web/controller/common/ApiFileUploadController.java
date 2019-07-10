package com.wzlue.chain.web.controller.common;

import com.wzlue.chain.common.base.R;
import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.common.utils.DateUtils;
import io.swagger.annotations.*;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import java.io.File;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/app/file")
@Api(value = "文件上传")
public class ApiFileUploadController {
	
	@Value("${fileupload.filepath}")
	String filePath;
	
	@Value("${fileupload.server}")
	String serverUrl;
	
	
	/**
	 * 上传文件
	 */
	@RequestMapping("/ckeditorUpload")
	public String ckeditorUpload(@RequestParam("upload") MultipartFile file, String CKEditorFuncNum) throws Exception {
		if (file.isEmpty()) {
			throw new RRException("上传文件不能为空");
		}
		
		String filename = file.getOriginalFilename();
		
		String suffix = filename.substring(filename.lastIndexOf("."), filename.length());
		
		String uuid = UUID.randomUUID().toString();
		
		String currDate = DateUtils.format(new Date(), "yyyyMMdd");
		
		FileUtils.writeByteArrayToFile(new File(filePath + "/fileupload/" + currDate + "/" + uuid + suffix), file.getBytes());
		
		StringBuffer sb=new StringBuffer();
	    sb.append("<script type=\"text/javascript\">");
	    sb.append("window.parent.CKEDITOR.tools.callFunction("+ CKEditorFuncNum + ",'" +serverUrl + "/" + currDate + "/" + uuid + suffix +"')");
	    sb.append("</script>");

		return sb.toString();
	}

	
	/**
	 * 上传文件
	 */
	@PostMapping("/upload")
	@ApiOperation(value="上传文件接口")
	public R upload(@ApiParam(value="上传的文件",required = true) MultipartFile file) throws Exception {
		if (file.isEmpty()) {
			throw new RRException("上传文件不能为空");
		}
		
		String filename = file.getOriginalFilename();
		
		String suffix = filename.substring(filename.lastIndexOf("."), filename.length());
		
		String uuid = UUID.randomUUID().toString();
		
		String currDate = DateUtils.format(new Date(), "yyyyMMdd");
		
		FileUtils.writeByteArrayToFile(new File(filePath + "/fileupload/" + currDate + "/" + uuid + suffix), file.getBytes());

		return R.ok().put("url", serverUrl + "/" + currDate + "/" + uuid + suffix);
	}

	/**
	 * 上传文件(Base64)
	 */
	@RequestMapping("/uploadBase64")
	public R uploadBase64(String base64) throws Exception {
		if (base64.isEmpty()) {
			throw new RRException("上传文件不能为空");
		}

		BASE64Decoder decoder = new BASE64Decoder();
		// 解密
		byte[] b = decoder.decodeBuffer(base64);

		String uuid = UUID.randomUUID().toString();

		String currDate = DateUtils.format(new Date(), "yyyyMMdd");

		FileUtils.writeByteArrayToFile(new File(filePath + "/fileupload/" + currDate + "/" + uuid + ".jpg"), b);

		return R.ok().put("url", serverUrl + "/" + currDate + "/" + uuid + ".jpg");
	}


	@RequestMapping("/uploadFiles")
	public R upload(@RequestParam("files") MultipartFile [] files) throws Exception {
		if (files.length <= 0) {
			throw new RRException("上传文件不能为空");
		}
		for (MultipartFile file : files ) {

			String filename = file.getOriginalFilename();

			String suffix = filename.substring(filename.lastIndexOf("."), filename.length());

			String uuid = UUID.randomUUID().toString();

			String currDate = DateUtils.format(new Date(), "yyyyMMdd");

			FileUtils.writeByteArrayToFile(new File(filePath + "/fileinput/" + currDate + "/" + uuid + suffix), file.getBytes());
		}

//		return R.ok().put("url", serverUrl + "/" + currDate + "/" + uuid + suffix);
		return R.ok();
	}
}
