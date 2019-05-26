package com.cj.elasticsearch.repository;

import com.cj.elasticsearch.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * 操作模板
 * @author 晁建
 * @date 2019-05-26
 */
public interface ArticleSearchRepository extends ElasticsearchRepository<Article, Long> {

    /**
     * 按照标题精确查找
     * @param title 文章标题
     * @return
     */
    List<Article> findByTitle(String title);


    /**
     * AND 语句查询
     *
     * @param tile 文章标题
     * @param clickCount 点击次数
     * @return
     */
    List<Article> findByTitleAndClickCount(String tile, Integer clickCount);

    /**
     * OR 语句查询
     *
     * @param tile
     * @param clickCount
     * @return
     */
    List<Article> findByTitleOrClickCount(String tile, Integer clickCount);

    /**
     * 查询文章内容分页
     *
     * 等同于下面代码
     * @Query("{\"bool\" : {\"must\" : {\"term\" : {\"content\" : \"?0\"}}}}")
     * Page<Article> findByContent(String content, Pageable pageable);
     *
     * @param content 文章内容
     * @param page  分页偶爱徐
     * @return
     */
    Page<Article> findByContent(String content, Pageable page);

    /**
     * NOT 语句查询
     *
     * @param content
     * @param page
     * @return
     */
    Page<Article> findByContentNot(String content, Pageable page);

    /**
     * LIKE 语句查询
     *
     * @param content
     * @param page
     * @return
     */
    Page<Article> findByContentLike(String content, Pageable page);

}
