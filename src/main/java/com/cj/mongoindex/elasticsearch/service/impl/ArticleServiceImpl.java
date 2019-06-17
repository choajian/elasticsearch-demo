package com.cj.mongoindex.elasticsearch.service.impl;

import com.cj.mongoindex.elasticsearch.model.Article;
import com.cj.mongoindex.elasticsearch.repository.ArticleSearchRepository;
import com.cj.mongoindex.elasticsearch.service.ArticleService;
import org.elasticsearch.action.search.SearchResponse;
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
}
