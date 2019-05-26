package com.cj.mongodb.service;

import com.cj.elasticsearch.model.Article;

import java.util.List;

/**
 * 用于操作MongoDB 服务类接口
 * @author 晁建
 * @date 2018-05-26
 */
public interface MongodbArticleService {
    /**
     * 根据id查找对象
     * @param id id
     * @return
     */
    Article findById(String id);

    /**
     * 添加文档
     * @param Article 对象
     * @return
     */
    Article addDict(Article Article);

    /**
     * 根据鄙视的数量查找
     * @param bad 鄙视数
     * @return
     */
    List<Article> queryBad(int bad);

    /**
     * 根据文档标签点一个赞给文章
     * @param tag   标签
     * @return
     */
    String addOne(String tag);

    /**
     * 根据标签分页查找
     * @param createdate   标签
     * @param pageNum   当前页
     * @return
     */
    List<Article> findArticle(String createdate, int pageNum);


    /**
     * 更新文档
     * @param Article
     * @return
     */
    Article updateDict(Article Article);

    /**
     * 根据id删除文档
     * @param id 文档id
     * @return
     */
    Article deleteDict(String id);
}
