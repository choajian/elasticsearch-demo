package com.cj.sybaseindex.elasticsearch.controller;

import com.cj.sybaseindex.elasticsearch.model.Eaj;
import com.cj.sybaseindex.elasticsearch.service.EajService;
import com.cj.sybaseindex.sybase.service.SybaseEajService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * EAJ操作
 * @author 晁建
 * @date 2019-05-28
 */
@RestController
@RequestMapping("/eaj")
public class EajController {
    @Autowired
    SybaseEajService sybaseEajService;

    @Autowired
    EajService eajService;

    //临时固定案号代码
    private static String fixAhdm = "000020161002000760";

    /**
     * 保存数据
     */
    @RequestMapping("/saveByAhdm")
    public void EajSave(String ahdm) {
        Map<String, Object> map = null;
        if (ahdm == null || "".equals(ahdm)) ahdm = fixAhdm;
        map = sybaseEajService.getEajByAhdm(ahdm);

        Eaj eaj = new Eaj(map);
        eajService.eajSave(eaj);
    }

    /**
     * 保存数据
     */
    @RequestMapping("/saveBySarq")
    public void EajSaveBySarq(String sarq) {
        List<Map> list = null;
        List<Eaj> eajList = new ArrayList<>();
        list = sybaseEajService.getEajConnectionByDay(sarq);

        for (int i = 0; i < list.size(); i++) {
            eajList.add(new Eaj(list.get(0)));
        }
        eajService.eajSaveList(eajList);
    }

    /**
     * 按照当事人精确查找
     *
     * @param dsr 当事人
     * @return
     */
    @RequestMapping("/findByDsr")
    public Iterable<Eaj> findByTitle(String dsr) {
        return eajService.findByDsr(dsr);
    }

}