package com.cj.mongoindex.elasticsearch.controller;

import com.cj.mongoindex.elasticsearch.model.Article;
import com.cj.mongoindex.elasticsearch.service.ArticleService;
import com.cj.mongoindex.mongodb.service.MongodbBidService;
import com.cj.mongoindex.mongodb.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 文章操作
 *
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
    public void articleSaveList(String date) {
        List<Article> list = new ArrayList<Article>();
        if (date == null || "".equals(date)) {
            for (int i = 365; i > 0; i--) {  //获取一年内的日期数组
                Date d = DateUtils.getBeforeOrAfterDate(new Date(), -i);
                String dateStr = DateUtils.dateToStr(d);
                System.out.println(dateStr);
                int num = 1;
                while (true) {
                    list = Article.toArticleList(mongodbbidService.findBid(dateStr, num++));
                    if (list != null && list.size() != 0) {
                        articleService.articleSaveList(list);
                    } else {
                        break;
                    }
                }
            }
        } else {
            list = Article.toArticleList(mongodbbidService.findBid(date));
            articleService.articleSaveList(list);
        }

    }

    /**
     * 查找所有数据
     *
     * @return
     */
    @RequestMapping("/findAll")
    public Iterable<Article> findAll() {
        return articleService.searchAll();
    }

    /**
     * 按照标题精确查找
     *
     * @param title 文章标题
     * @return
     */
    @RequestMapping("/findByTitle")
    public Iterable<Article> findByTitle(String title) {
        return articleService.findByTitle(title);
    }

    /**
     * 查找文章内容 分页排序
     *
     * @param content 文章内容
     * @return
     */
    @RequestMapping("/findByContent")
    public Iterable<Article> findByContent(String content) {
        // 分页参数:分页从0开始，content倒序
        Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "createDate");

        return articleService.findByContent(content, pageable);
    }
}
