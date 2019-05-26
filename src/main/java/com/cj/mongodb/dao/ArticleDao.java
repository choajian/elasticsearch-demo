package com.cj.mongodb.dao;

import com.cj.elasticsearch.model.Article;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * MongoDB操作
 * @author 晁建
 * @date 2018-05-26
 */
@Repository
public class ArticleDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Article findById(String id) {

        Article dict = mongoTemplate.findById(id, Article.class);
        return dict;
    }

    public Article addDict(Article Article) {
        mongoTemplate.insert(Article);

        return Article;
    }

    public List<Article> queryBad(Criteria criteria) {
        List<Article> list = mongoTemplate.find(query(criteria), Article.class);

        return list;
    }

    public long addOne(Criteria criteria, Update update) {
        UpdateResult result = mongoTemplate.updateMulti(query(criteria), update, Article.class);

        return result.getModifiedCount();
    }

    public List<Article> findArticle(Query query, int pageNum) {

        List<Article> list = mongoTemplate.find(query, Article.class);
        return list;
    }

    public List<Article> findArticle(Query query) {
        List<Article> list = mongoTemplate.find(query, Article.class);

        return list;
    }

    public long count(Query query) {
        long totalCount = mongoTemplate.count(query, Article.class);

        return totalCount;
    }

    public Article updateDict(Article Article) {
        mongoTemplate.save(Article);

        return Article;
    }

    public Article deleteDict(Article Article) {
        mongoTemplate.remove(Article);

        return Article;
    }
}
