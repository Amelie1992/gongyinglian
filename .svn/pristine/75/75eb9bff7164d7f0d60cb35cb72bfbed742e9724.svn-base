package com.wzlue.chain.web.controller.sys;

import com.wzlue.chain.common.base.R;
import com.wzlue.chain.sys.entity.SysAreasEntity;
import com.wzlue.chain.sys.entity.SysCitiesEntity;
import com.wzlue.chain.sys.entity.SysProvincesEntity;
import com.wzlue.chain.sys.service.SysAreasService;
import com.wzlue.chain.sys.service.SysCitiesService;
import com.wzlue.chain.sys.service.SysProvincesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 行政区域县区信息表
 *
 * @author hjw
 * @email love@und.win
 * @date 2018-08-15 16:14:34
 */
@RestController
@RequestMapping("/sys/provinces")
public class ProvincesController {
    @Autowired
    private SysProvincesService sysProvincesService;
    @Autowired
    private SysCitiesService sysCitiesService;
    @Autowired
    private SysAreasService sysAreasService;

    /**
     * 列表
     */
    @RequestMapping("/provincesList")
    public List<SysProvincesEntity> list() {
        //查询列表数据
        List<SysProvincesEntity> sysAreasList = sysProvincesService.queryList();
        return sysAreasList;
    }

    /**
     * 列表
     */
    @RequestMapping("/citiesList/{pid}")
    public List<SysCitiesEntity> citiesList(@PathVariable("pid") String pid) {
        //查询列表数据
        List<SysCitiesEntity> citiesList = sysCitiesService.queryList(pid);
        return citiesList;
    }

    /**
     * 列表
     */
    @RequestMapping("/areasList/{cid}")
    public List<SysAreasEntity> areasList(@PathVariable("cid") String cid) {
        //查询列表数据
        List<SysAreasEntity> areasList = sysAreasService.queryList(cid);
        return areasList;
    }

    /**
     * 详情
     * @param id
     * @return
     */
    @RequestMapping("/city")
    public R info(@PathVariable("id") int id){
        SysCitiesEntity sysCitiesEntity = sysCitiesService.queryCity(id);
        return R.ok("sysCitiesEntity",sysCitiesEntity);
    }

    /**
     * 根据编号查询省名称
     */
    @RequestMapping("/province")
    public R province(@PathVariable("provinceId") String provinceId){
        SysProvincesEntity sysProvincesEntity =  sysProvincesService.queryByprovinceId(provinceId);
        return R.ok("sysProvincesEntity",sysProvincesEntity);
    }
    /**
     * 根据编号查询市名称
     */
    @RequestMapping("/citys")
    public R citys(@PathVariable("provinceId") String cityId){
        SysCitiesEntity sysCitiesEntity =  sysCitiesService.queryBycityId(cityId);
        return R.ok("sysCitiesEntity",sysCitiesEntity);
    }
    /**
     * 根据编号查询区域名称
     */
    @RequestMapping("/areas")
    public R areas(@PathVariable("areaId") String areaId){
        SysAreasEntity sysAreasEntity =  sysAreasService.queryBycityId(areaId);
        return R.ok("sysAreasEntity",sysAreasEntity);
    }
}
