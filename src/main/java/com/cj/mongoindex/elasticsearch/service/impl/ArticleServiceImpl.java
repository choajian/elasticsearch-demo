package com.cj.mongoindex.elasticsearch.service.impl;

import com.cj.mongoindex.elasticsearch.model.Article;
import com.cj.mongoindex.elasticsearch.repository.ArticleSearchRepository;
import com.cj.mongoindex.elasticsearch.service.ArticleService;
import com.cj.mongoindex.mongodb.utils.StringUtil;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.SearchResultMapper;
import org.springframework.data.elasticsearch.core.aggregation.AggregatedPage;
import org.springframework.data.elasticsearch.core.aggregation.impl.AggregatedPageImpl;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * elasticsearch　操作文章
 * @author 晁建
 * @date 2019-05-26
 */
@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleSearchRepository articleSearchRepository;
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Override
    public void articleSave(Article article) {
        articleSearchRepository.save(article);
    }

    @Override
    public void articleSaveList(List<Article> articleList) {
        articleSearchRepository.saveAll(articleList);
    }

    @Override
    public Iterable<Article> searchAll() {
        return articleSearchRepository.findAll();
    }

    @Override
    public Iterable<Article> findByTitle(String title) {
        return articleSearchRepository.findByTitle(title);
    }

    @Override
    public Page<Article> findByContent(String content, Pageable pageable) {
        Page<Article> pageageRsutl=articleSearchRepository.findByContent(content, pageable );

        if (pageageRsutl == null) return null;

        return pageageRsutl;
    }


    @Override
    public List<Article> searchQuery(SearchQuery searchQuery) {
        Page<Article> searchPageResults = articleSearchRepository.search(searchQuery);

        if (searchPageResults == null) return null;

        return searchPageResults.getContent();
    }

    @Override
    public List<Article> templateSearchQuery(SearchQuery searchQuery) {
        List<Article> articles = elasticsearchTemplate.queryForList(searchQuery, Article.class);
        if (articles == null) return null;

        return articles;
    }

    /**
     * 高亮操作
     * @param field
     * @param searchMessage
     * @return
     */
    public Page highLigthQuery(String[] field, String searchMessage,Pageable pageable) {
        //高亮拼接的前缀
        String preTags="<font color=\"red\">";
        //高亮拼接的后缀
        String postTags="</font>";
        //创建queryBuilder查询条件
        QueryBuilder queryBuilder = QueryBuilders.multiMatchQuery(searchMessage, field);
        //创建search对象
        SearchQuery query = new NativeSearchQueryBuilder().withQuery(queryBuilder).withHighlightFields(
                new HighlightBuilder.Field(field[0]).preTags(preTags).postTags(postTags),
                new HighlightBuilder.Field(field[1]).preTags(preTags).postTags(postTags)
        ).withPageable(pageable).build();
        //执行分页查询
        Page<Article> page = elasticsearchTemplate.queryForPage(query, Article.class, new SearchResultMapper() {

            @Override
            public <T> AggregatedPage<T> mapResults(SearchResponse response, Class<T> clazz, Pageable pageable) {
                ArrayList<Article> articles = new ArrayList<Article>();
                //获取高亮的结果
                SearchHits searchHits = response.getHits();
                if (searchHits != null) {
                    //获取高亮中所有的内容
                    SearchHit[] hits = searchHits.getHits();
                    if (hits.length > 0) {
                        for (SearchHit searchHit : hits) {
                            Article article = new Article();
                            String highLightTitle = null;  //高亮标题
                            String highLightContent = null; //高亮内容
                            if(searchHit.getHighlightFields().get(field[0])!=null){
                                highLightTitle=searchHit.getHighlightFields().get(field[0]).fragments()[0].toString();
                            }else{
                                highLightTitle=String.valueOf(searchHit.getSourceAsMap().get("title"));
                            }
                            if(searchHit.getHighlightFields().get(field[1])!=null){
                                highLightContent=searchHit.getHighlightFields().get(field[1]).fragments()[0].toString();
                            }else{
                                highLightContent="";
                            }
                            article.setId(searchHit.getId());
                            article.setTitle(highLightTitle);
                            article.setContent(String.valueOf(searchHit.getSourceAsMap().get("content")));
                            article.setContentHtml(String.valueOf(searchHit.getSourceAsMap().get("contentHtml")));
                            article.setDigest(highLightContent);
                            article.setUrl(String.valueOf(searchHit.getSourceAsMap().get("url")));
                            article.setHost(String.valueOf(searchHit.getSourceAsMap().get("host")));
                            article.setHostName(String.valueOf(searchHit.getSourceAsMap().get("hostName")));
                            article.setBigCate(String.valueOf(searchHit.getSourceAsMap().get("bigCate")));
                            article.setSmallCate(String.valueOf(searchHit.getSourceAsMap().get("smallCate")));
                            article.setCreateDate(String.valueOf(searchHit.getSourceAsMap().get("createDate")));
                            article.setCreateTime(String.valueOf(searchHit.getSourceAsMap().get("createTime")));
                            // 反射调用set方法将高亮内容设置进去
//                            try {
//                                String setMethodName = parSetName(field);
//                                Class<? extends Article> poemClazz = article.getClass();
//                                Method setMethod = poemClazz.getMethod(setMethodName, String.class);
//                                setMethod.invoke(article, highLightMessage);
//                            } catch (Exception e) {
//                                e.printStackTrace();
//                            }
                            articles.add(article);
                        }
                    }
                }
                return new AggregatedPageImpl((List<T>) articles);
            }
        });
        return page;
    }

    /**
     * 拼接在某属性的 set方法
     *
     * @param fieldName
     * @return String
     */
    private static String parSetName(String fieldName) {
        if (null == fieldName || "".equals(fieldName)) {
            return null;
        }
        int startIndex = 0;
        if (fieldName.charAt(0) == '_')
            startIndex = 1;
        return "set" + fieldName.substring(startIndex, startIndex + 1).toUpperCase()
                + fieldName.substring(startIndex + 1);
    }
}
