package com.cj.mongoindex.search.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cj.mongoindex.search.service.SearchEngineService;
import com.cj.mongoindex.search.utils.AdvancedQuery;
import org.springframework.stereotype.Service;

/**
 * @program: elasticsearch-demo
 * @description: 搜索功能对外服务类
 * @author: 晁建
 * @create: 2019-06-09 21:31
 */
@Service
public class SearchEngineServiceImpl implements SearchEngineService {
	/**
	 * 多条件查询
	 * @param advancedQuery 查询条件
	 * @return List 结果列表
	 */
	public Map<String, Object> ManySearch(AdvancedQuery advancedQuery){
		return null;
	}
	
	/**
	 * 高级条件查询
	 * @param advancedQuery 查询条件
	 * @return List 结果列表
	 */
	public Map<String, Object> HighSearch(AdvancedQuery advancedQuery) {
		return null;
	}

}
