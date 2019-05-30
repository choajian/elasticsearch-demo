package com.cj.sybaseindex.elasticsearch.service;

import com.cj.sybaseindex.elasticsearch.model.Eaj;
import org.springframework.data.elasticsearch.core.query.SearchQuery;

import java.util.List;

/**
 * elasticsearch　操作EAJ
 * @author 晁建
 * @date 2019-05-29
 */
public interface EajService {

    /**
     * 保存单个实例
     * @param eaj
     */
    void eajSave(Eaj eaj);

    /**
     * 批量保存
     * @param eajList
     */
    void eajSaveList(List<Eaj> eajList);

    /**
     * 查找全部
     * @return
     */
    Iterable<Eaj> searchAll();

    /**
     * 按照当事人精确查找
     * @param dsr 当事人
     * @return
     */
    Iterable<Eaj> findByDsr(String dsr);

    /**
     * 多条件聚合搜索
     * @param searchQuery   搜索条件
     * @return
     */
    List<Eaj> searchQuery(SearchQuery searchQuery);

    /**
     * 通过模板引擎查询
     * @param searchQuery 查询条件
     * @return
     */
    List<Eaj> templateSearchQuery(SearchQuery searchQuery);
}
