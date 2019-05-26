package com.cj.mongodb.service.impl;

import com.cj.elasticsearch.model.Article;
import com.cj.mongodb.dao.MongodbArticleDao;
import com.cj.mongodb.service.MongodbArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * 用于操作MongoDB 服务类
 * @author 晁建
 * @date 2019-05-26
 */
@Service
public class MongodbArticleServiceImpl implements MongodbArticleService {
    @Autowired
    MongodbArticleDao ArticleDao;

    @Override
    public Article findById(String id) {
        return ArticleDao.findById(id);
    }

    @Override
    public Article addDict(Article Article) {

        return ArticleDao.addDict(Article);
    }

    @Override
    public List<Article> queryBad(int bad) {
        Criteria criteria = where("bad").gte(bad);

        return ArticleDao.queryBad(criteria);
    }

    @Override
    public String addOne(String tag) {
        Criteria criteria = where("tag").in(tag);
        Update update = new Update();
        update.inc("good", 1);

        long updateResult = ArticleDao.addOne(criteria, update);

        StringBuilder append = new StringBuilder().append("成功修改--->").append(updateResult);
        return append.toString();
    }

    @Override
    public List<Article> findArticle(String createdate, int pageNum) {
        Criteria criteria = where("createdate").in(createdate);
        Query query = query(criteria);
        //查询总数
        long totalCount = ArticleDao.count(query);
        //每页个数
        int numOfPage = 10;
        //计算总数
        long totalPage =
                totalCount % numOfPage == 0 ? (totalCount / numOfPage) : (totalCount / numOfPage + 1);

        int skip = (pageNum - 1) * numOfPage;
        query.skip(skip).limit(numOfPage);

        List<Article> Article = ArticleDao.findArticle(query, numOfPage);

        return Article;
    }

    @Override
    public Article updateDict(Article Article) {

        return ArticleDao.updateDict(Article);
    }

    @Override
    public Article deleteDict(String id) {
        Article Article = new Article();
        Article.setId(id);

        return ArticleDao.deleteDict(Article);
    }
}
