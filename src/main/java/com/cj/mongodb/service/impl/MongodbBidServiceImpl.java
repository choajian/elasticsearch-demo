package com.cj.mongodb.service.impl;

import com.cj.mongodb.dao.MongodbBidDao;
import com.cj.mongodb.model.Bid;
import com.cj.mongodb.service.MongodbBidService;
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
public class MongodbBidServiceImpl implements MongodbBidService {
    @Autowired
    MongodbBidDao BidDao;

    @Override
    public Bid findById(String id) {
        return BidDao.findById(id);
    }

    @Override
    public Bid addDict(Bid Bid) {

        return BidDao.addDict(Bid);
    }

    @Override
    public List<Bid> queryBad(int bad) {
        Criteria criteria = where("bad").gte(bad);

        return BidDao.queryBad(criteria);
    }

    @Override
    public String addOne(String tag) {
        Criteria criteria = where("tag").in(tag);
        Update update = new Update();
        update.inc("good", 1);

        long updateResult = BidDao.addOne(criteria, update);

        StringBuilder append = new StringBuilder().append("成功修改--->").append(updateResult);
        return append.toString();
    }

    @Override
    public List<Bid> findBid(String createdate,int pageNum) {
        Criteria criteria = where("createdate").in(createdate);
        Query query = query(criteria);
        //查询总数
        long totalCount = BidDao.count(query);
        //每页个数
        int numOfPage = 10;
        //计算总数
        long totalPage =
                totalCount % numOfPage == 0 ? (totalCount / numOfPage) : (totalCount / numOfPage + 1);

        int skip = (pageNum - 1) * numOfPage;
        query.skip(skip).limit(numOfPage);

        List<Bid> bids = BidDao.findBid(query, numOfPage);

        return bids;
    }

    @Override
    public List<Bid> findBid(String createdate) {
        Criteria criteria = where("createdate").in(createdate);
        Query query = query(criteria);

        List<Bid> bids = BidDao.findBid(query);

        return bids;
    }


    @Override
    public Bid updateDict(Bid Bid) {

        return BidDao.updateDict(Bid);
    }

    @Override
    public Bid deleteDict(String id) {
        Bid Bid = new Bid();
        Bid.setId(id);

        return BidDao.deleteDict(Bid);
    }
}
