package com.cj.mongoindex.search.controller;

import com.cj.mongoindex.elasticsearch.model.Article;
import com.cj.mongoindex.elasticsearch.service.ArticleService;
import com.cj.mongoindex.search.utils.AdvancedQuery;
import com.cj.mongoindex.search.utils.CommUtil;
import com.cj.mongoindex.search.utils.ResultPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @program: elasticsearch-demo
 * @description: 搜索功能
 * @author: 晁建
 * @create: 2019-06-07 23:04
 */
@Controller
public class SearchInfoAction {
    /**
     * 对象序列化时，该对象的唯一标识
     */
    private static final long serialVersionUID = 788342983970361203L;

    // 当前页面
    private Integer currentPage;

    @Autowired
    private ArticleService articleService;


    /**
     * 搜索结果页面
     *
     * @return
     */
    @RequestMapping("/search")
    public String result(ModelMap model, AdvancedQuery advancedQuery) {

        // 无关键词则返回首页
        if (null == advancedQuery || advancedQuery.getStr_query() == null) {
            return "index";
        }

        //开始时间
        long startTime = System.currentTimeMillis();

        if (null == currentPage) {
            currentPage = 1;
        }

        //查询条件对象
        if (null == advancedQuery.getStr_pagesize() || advancedQuery.getStr_pagesize().isEmpty()) {
            advancedQuery.setStr_pagesize("20");
        }
        advancedQuery.setStr_page_number(String.valueOf(currentPage));

        // 分页参数:分页从0开始，createDate倒序
        Pageable pageable = PageRequest.of(Integer.parseInt(advancedQuery.getStr_page_number()),
                Integer.parseInt(advancedQuery.getStr_pagesize()),
                Sort.Direction.DESC,
                "createDate");

        //执行查询
        Page<Article> resPages = articleService.findByContent(advancedQuery.getStr_query(), pageable);


        //分页数据
        ResultPage resultPage = new ResultPage();
        resultPage.setShowCount(Integer.valueOf(advancedQuery.getStr_pagesize()));
        resultPage.setCurrentPage(currentPage);
        resultPage.setTotalResult(resPages.getTotalPages());
        resultPage.getCurrentPage();

        //结束时间
        long endTime = System.currentTimeMillis();

        //页面参数
        model.put("articleList", resPages.getContent()); //搜索结果集
        model.put("ResultPage", resultPage);
        model.put("pageCount", resPages.getTotalElements());
        model.put("timeCon", String.valueOf(Math.round(endTime - startTime) / 1000.0));
        model.put("yearArray", CommUtil.currentYearArray());

        //结果页面
        return "es/searchInfo/result";
    }

    /**
     * 查询项目详细信息
     *
     * @return
     */
    @RequestMapping("/attentionProjectInfo")
    public String attentionProjectInfo(ModelMap model, String id) {
        if (null == id || id.isEmpty()) {
            return error404();
        }

        return "es/searchInfo/attentionProjectInfo";
    }

    /**
     * 加载404错误页面
     *
     * @return
     */
    @GetMapping("error404")
    public String error404() {
        return "../common/404";
    }

}
