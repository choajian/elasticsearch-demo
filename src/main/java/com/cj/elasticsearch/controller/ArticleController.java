package com.cj.elasticsearch.controller;

import com.cj.elasticsearch.model.Article;
import com.cj.elasticsearch.service.ArticleService;
import com.cj.mongodb.service.MongodbBidService;
import org.elasticsearch.common.lucene.search.function.FunctionScoreQuery;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.index.query.functionscore.FunctionScoreQueryBuilder;
import org.elasticsearch.index.query.functionscore.ScoreFunctionBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * 文章操作
 * @author 晁建
 * @date 2019-05-26
 */
@RestController
@RequestMapping("/elasticsearch")
public class ArticleController {
    @Autowired
    ArticleService articleService;

    @Autowired
    MongodbBidService mongodbbidService;


    /**
     * 保存数据
     */
    @RequestMapping("/articleSaveList")
    public void articleSaveList(String date){
        List<Article> list = new ArrayList<>();
        if(date==null || "".equals(date)) date="2018-07-09";
        list = Article.toArticleList(mongodbbidService.findBid(date));

        articleService.articleSaveList(list);
    }

    /**
     * 查找所有数据
     * @return
     */
    @RequestMapping("/findAll")
    public Iterable<Article> findAll(){
        return articleService.searchAll();
    }

    /**
     * 按照标题精确查找
     * @param title 文章标题
     * @return
     */
    @RequestMapping("/findByTitle")
    public Iterable<Article> findByTitle(String title){
        return articleService.findByTitle(title);
    }

    /**
     * 查找文章内容 分页排序
     * @param content 文章内容
     * @return
     */
    @RequestMapping("/findByContent")
    public Iterable<Article> findByContent(String content){
        // 分页参数:分页从0开始，clickCount(点击量)倒序
        Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC,"clickCount");

        return articleService.findByContent(content, pageable);
    }

    /**
     * 创建搜索 DSL:多条件搜索
     * @return
     */
    @RequestMapping("/boolQuery")
    public Iterable<Article> boolQuery(){
        // 分页参数:分页从0开始，clickCount(点击量)倒序
        Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC,"clickCount");

        // 构建条件为文章内容包含“教程”
        MatchQueryBuilder q1 = QueryBuilders.matchQuery("content", "教程");
        // 构建条件为文章点击数大于120的文章
        RangeQueryBuilder q2 = QueryBuilders.rangeQuery("clickCount").gt(120);

        BoolQueryBuilder builder1 = QueryBuilders.boolQuery().must(q1);
        BoolQueryBuilder builder2 = QueryBuilders.boolQuery().must(q2);

        // weightFactorFunction是评分函数，详情请看文档
        FunctionScoreQueryBuilder functionScoreQueryBuilder1 = QueryBuilders.functionScoreQuery(
                builder1, ScoreFunctionBuilders.weightFactorFunction(2)
        );
        FunctionScoreQueryBuilder functionScoreQueryBuilder2 = QueryBuilders.functionScoreQuery(
                builder2, ScoreFunctionBuilders.weightFactorFunction(3)
        );

        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withPageable(pageable)
                .withQuery(functionScoreQueryBuilder1)
                .withQuery(functionScoreQueryBuilder2)
                .build();


        System.out.println("\n search DSL  = \n " + searchQuery.getQuery().toString());

        return articleService.searchQuery(searchQuery);
    }

    /**
     * 创建搜索 DSL:聚合查询
     * @return
     */
    @RequestMapping("/aggregationQuery")
    public Iterable<Article> aggregationQuery(){
        // 由于无相关性的分值默认为 1 ，设置权重分最小值为 10
        Float  MIN_SCORE = 10.0F;

        // 分页参数:分页从0开始，clickCount(点击量)倒序
        Pageable pageable = PageRequest.of(0, 5);

        // 构建条件为文章内容包含“教程”
        MatchQueryBuilder q1 = QueryBuilders.matchQuery("content", "教程");
        // 构建条件为文章点击数大于20的文章
        MatchQueryBuilder q2 = QueryBuilders.matchQuery("clickCount", 20);

        BoolQueryBuilder builder1 = QueryBuilders.boolQuery().must(q1);
        BoolQueryBuilder builder2 = QueryBuilders.boolQuery().must(q2);

        // weightFactorFunction是评分函数，详情请看文档
        FunctionScoreQueryBuilder functionScoreQueryBuilder1 = QueryBuilders.functionScoreQuery(
                builder1, ScoreFunctionBuilders.weightFactorFunction(1000)
        );
        FunctionScoreQueryBuilder functionScoreQueryBuilder2 = QueryBuilders.functionScoreQuery(
                builder2, ScoreFunctionBuilders.weightFactorFunction(1000)
                // 权重分求和模式
        ).scoreMode(FunctionScoreQuery.ScoreMode.SUM).setMinScore(MIN_SCORE);

        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withPageable(pageable)
                .withQuery(functionScoreQueryBuilder1)
                .withQuery(functionScoreQueryBuilder2)
                .build();


        System.out.println("\n search DSL  = \n " + searchQuery.getQuery().toString());

        return articleService.searchQuery(searchQuery);
    }

    /**
     * elasticsearchTemplate自定义查询：点击量倒叙
     * @return
     */
    @RequestMapping("/templateQuery")
    public Iterable<Article> templateQuery(){
        // 分页参数:分页从0开始，clickCount(点击量)倒序
        Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC,"clickCount");

        // 构建条件为文章内容包含“教程”
        MatchQueryBuilder q1 = QueryBuilders.matchQuery("content", "教程");
        // 构建条件为文章点击数大于等于60的文章
        RangeQueryBuilder q2 = QueryBuilders.rangeQuery("clickCount").gte(60);

        BoolQueryBuilder builder1 = QueryBuilders.boolQuery().must(q1);
        BoolQueryBuilder builder2 = QueryBuilders.boolQuery().must(q2);

        // weightFactorFunction是评分函数，详情请看文档
        FunctionScoreQueryBuilder functionScoreQueryBuilder1 = QueryBuilders.functionScoreQuery(
                builder1, ScoreFunctionBuilders.weightFactorFunction(10)
        );
        FunctionScoreQueryBuilder functionScoreQueryBuilder2 = QueryBuilders.functionScoreQuery(
                builder2, ScoreFunctionBuilders.weightFactorFunction(10)
        );

        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withPageable(pageable)
                .withQuery(functionScoreQueryBuilder1)
                .withQuery(functionScoreQueryBuilder2)
                .build();


        System.out.println("\n search DSL  = \n " + searchQuery.getQuery().toString());

        return articleService.templateSearchQuery(searchQuery);
    }
}
