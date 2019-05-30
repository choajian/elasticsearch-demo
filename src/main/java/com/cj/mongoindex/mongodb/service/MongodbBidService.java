package com.cj.mongoindex.mongodb.service;

import com.cj.mongoindex.mongodb.model.Bid;

import java.util.List;

/**
 * 用于操作MongoDB 服务类接口
 * @author 晁建
 * @date 2018-05-26
 */
public interface MongodbBidService {
    /**
     * 根据id查找对象
     * @param id id
     * @return
     */
    Bid findById(String id);

    /**
     * 添加文档
     * @param Bid 对象
     * @return
     */
    Bid addDict(Bid Bid);

    /**
     * 根据鄙视的数量查找
     * @param bad 鄙视数
     * @return
     */
    List<Bid> queryBad(int bad);

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
    List<Bid> findBid(String createdate, int pageNum);

    /**
     * 根据 标签查找
     * @param createdate   标签
     * @return
     */
    List<Bid> findBid(String createdate);



    /**
     * 更新文档
     * @param Bid
     * @return
     */
    Bid updateDict(Bid Bid);

    /**
     * 根据id删除文档
     * @param id 文档id
     * @return
     */
    Bid deleteDict(String id);
}
