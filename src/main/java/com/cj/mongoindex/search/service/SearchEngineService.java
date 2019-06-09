package com.cj.mongoindex.search.service;

import com.cj.mongoindex.search.utils.AdvancedQuery;

import java.util.Map;

/**
 * @program: elasticsearch-demo
 * @description: 搜索服务
 * @author: 晁建
 * @create: 2019-06-09 21:31
 */
public interface SearchEngineService {

    /**
     * 多条件查询
     * @param advancedQuery 查询条件
     * @return List 结果列表
     */
    public Map<String, Object> ManySearch(AdvancedQuery advancedQuery);

    /**
     * 高级条件查询
     * @param advancedQuery 查询条件
     * @return List 结果列表
     */
    public Map<String, Object> HighSearch(AdvancedQuery advancedQuery);
}