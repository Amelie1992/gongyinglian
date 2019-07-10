
package com.wzlue.chain.web.controller.sys;


import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import com.wzlue.chain.sys.entity.ImageEntity;
import com.wzlue.chain.sys.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;


/**
 * 新闻资讯
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-27 19:37:10
 */
@RestController
@RequestMapping("/sys/image")
public class SysImageController extends AbstractController {
    @Autowired
    private ImageService imageService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);

        List<ImageEntity> sysNoticeList = imageService.queryList(query);
        int total = imageService.queryTotal(query);

        return R.page(sysNoticeList, total);
    }


    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer key) {
      imageService.delete(key);
        return R.ok();
    }
    /**
     * 保存集合
     */
    @RequestMapping("/saveList")
    public R saveList(@RequestBody List<ImageEntity> imageEntitys) {
        imageService.saveList(imageEntitys);
        return R.ok();
    }

}
