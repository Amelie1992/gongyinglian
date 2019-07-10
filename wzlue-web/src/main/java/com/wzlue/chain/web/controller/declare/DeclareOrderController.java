
package com.wzlue.chain.web.controller.declare;

import java.io.File;
import java.util.*;

import com.wzlue.chain.bill.entity.BillEntity;
import com.wzlue.chain.bill.service.BillService;
import com.wzlue.chain.common.exception.RRException;
import com.wzlue.chain.common.utils.DateUtils;
import com.wzlue.chain.company.entity.MerchantCompanyEntity;
import com.wzlue.chain.declare.service.DeclareOrderOssService;
import com.wzlue.chain.sys.entity.SysUserEntity;
import org.apache.commons.io.FileUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.wzlue.chain.web.controller.sys.AbstractController;

import com.wzlue.chain.declare.entity.DeclareOrderEntity;
import com.wzlue.chain.declare.service.DeclareOrderService;
import com.wzlue.chain.common.base.Query;
import com.wzlue.chain.common.base.R;
import org.springframework.web.multipart.MultipartFile;


/**
 * 报关订单
 *
 * @author
 * @email
 * @date 2018-08-20 17:38:05
 */
@SuppressWarnings("ALL")
@RestController
@RequestMapping("/declare/declareorder")
public class DeclareOrderController extends AbstractController{
	@Autowired
	private DeclareOrderService declareOrderService;
	@Autowired
    private DeclareOrderOssService declareOrderOssService;
    @Autowired
    private BillService billService;
    @Value("${fileupload.filepath}")
    String filePath;

    @Value("${fileupload.server}")
    String serverUrl;

    /**
     * 买入订单列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        //查询本公司买入的订单信息
        query.put("buyCompanyId",user.getCompanyId());
        List<DeclareOrderEntity> declareOrderList = declareOrderService.queryList(query);
        int total = declareOrderService.queryTotal(query);

        return R.page(declareOrderList,total);
    }

    /**
     * 卖出订单列表
     */
    @RequestMapping("/list2")
    public R list2(@RequestParam Map<String, Object> params){
        //查询列表数据
        Query query = new Query(params);
        SysUserEntity user = getUser();
        //查询本公司卖出的订单信息
        query.put("merchantCompanyId",user.getCompanyId());
            List<DeclareOrderEntity> declareOrderList = declareOrderService.queryList1(query);
        int total = declareOrderService.queryTotal(query);
        return R.page(declareOrderList,total);
    }

	/**
	 * 信息
	 */
	@RequestMapping("/info/{id}")
	@RequiresPermissions("declare:declareorder:info")
	public R info(@PathVariable("id") Integer id){
		DeclareOrderEntity declareOrder = declareOrderService.queryObject(id);
		return R.ok().put("declareOrder", declareOrder);
	}

	/**
	 * (买家下单)保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("declare:declareorder:save")
	public R save(@RequestBody DeclareOrderEntity declareOrder){
        SysUserEntity user = getUser();
        declareOrder.setCompanyId(Math.toIntExact(user.getCompanyId()));
        declareOrder.setCompanyId(user.getCompanyId().intValue());
        declareOrder.setCreateBy(getUserId());
        declareOrder.setCreateTime(new Date());
        declareOrder.setDeptId(declareOrder.getOrderOfferEntity().getOfferId());
		declareOrderService.save(declareOrder);
		return R.ok();
	}

	/**
	 * (卖家接单)修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("declare:declareorder:update")
	public R update(@RequestBody DeclareOrderEntity declareOrder){
	    //确认接单:1待支付
		declareOrderService.update(declareOrder);
        Integer tbp = 1;
        if (tbp==declareOrder.getOrderState()) {
            //生成账单
            BillEntity bill = new BillEntity();
            bill.setOrderNumber(declareOrder.getOrderNumber());
            bill.setOrderType(0);
            bill.setUnit(declareOrder.getUnit());
            billService.save(bill);
        }
		return R.ok();
	}
	/**
	 * 修改
	 */
	@RequestMapping("/updatePrice")
	@RequiresPermissions("declare:declareorder:update")
	public R updatePrice(@RequestBody DeclareOrderEntity declareOrder){
	    //确认接单:1待支付
		declareOrderService.updatePrice(declareOrder);
		return R.ok();
	}

    /**
     * 修改订单状态
     */
    @RequestMapping("/updateOrderState")
//    @RequiresPermissions("declare:declareorder:updateOrderState")
    public R updateOrderState(@RequestBody Map<String, Object> map){
        map.put("userId",getUser().getUserId());
        declareOrderService.updateOrderState(map);
        return R.ok();
    }

	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("declare:declareorder:delete")
	public R delete(@RequestBody Integer[] ids){
		declareOrderService.deleteBatch(ids);

		return R.ok();
	}

    /**
     * 上传文件
     */
    @RequestMapping("/upload")
    public R upload(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new RRException("上传文件不能为空");
        }

        String filename = file.getOriginalFilename();

        String suffix = filename.substring(filename.lastIndexOf("."), filename.length());

        String uuid = UUID.randomUUID().toString();

        String currDate = DateUtils.format(new Date(), "yyyyMMdd");

        FileUtils.writeByteArrayToFile(new File(filePath + "/fileupload/" + currDate + "/" + uuid + suffix), file.getBytes());

        R r = R.ok();
        r.put("url", serverUrl + "/" + currDate + "/" + uuid + suffix);
        r.put("name",filename);

        return r;
    }

    /**
     * 获取报关报盘的公司
     * @return
     */
    @RequestMapping("/getCompanys")
    public R getCompanys(){
        SysUserEntity user = getUser();
        List<MerchantCompanyEntity> companys = declareOrderService.getCompanys(user.getCompanyId());
        return R.ok().put("companys",companys);
    }

    /**
     * 首页展示数据查询(订单成交统计)
     * queryBy: year season month week days
     *
     * */
    @RequestMapping("/showList")
    public R showList(@RequestBody Map<String,Object> map){
        List<Map> list = new ArrayList<>();
        Map Obj = new HashMap();
        List<Object> dataList = new ArrayList();
        Long userId = getUserId();
        map.put("userId", userId);
        List<Map> declareOrder = declareOrderService.showList(map);
        //todo 其他订单的查询 List<Map> delceraOrder ....
        List<String> itemList = (List)map.get("itemList");
        Map temp = new HashMap();
		/* 循环时期节点Array 空值处理 */
        for(String item: itemList){
            temp = new HashMap();
            temp.put("time",item);
            temp.put("data",null);
            // 遍历对比数据库的日期节点,当节点有统计值则赋值,否则默认为null；
            for(Map declareData:declareOrder){
                String val = (String)declareData.get("title");
                if (val.equals(temp.get("time"))){
                    temp.put("data",declareData.get("total"));
                }
            }
            dataList.add(temp);
            //todo 循环其他订单的数据进行封装处理
        }
        Obj.put("name","报关订单");
        Obj.put("data",dataList);
        list.add(Obj);


        return R.ok().put("list",list).put("itemList",itemList);
    }

}
