package com.cj.mongoindex.mongodb.dao;

import com.cj.mongoindex.mongodb.model.Bid;
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
public class MongodbBidDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    public Bid findById(String id) {

        Bid dict = mongoTemplate.findById(id, Bid.class);
        return dict;
    }

    public Bid addDict(Bid Bid) {
        mongoTemplate.insert(Bid);

        return Bid;
    }

    public List<Bid> queryBad(Criteria criteria) {
        List<Bid> list = mongoTemplate.find(query(criteria), Bid.class);

        return list;
    }

    public long addOne(Criteria criteria, Update update) {
        UpdateResult result = mongoTemplate.updateMulti(query(criteria), update, Bid.class);

        return result.getModifiedCount();
    }

    public List<Bid> findBid(Query query, int pageNum) {

        List<Bid> list = mongoTemplate.find(query, Bid.class);
        return list;
    }

    public List<Bid> findBid(Query query) {
        List<Bid> list = mongoTemplate.find(query, Bid.class);

        return list;
    }

    public long count(Query query) {
        long totalCount = mongoTemplate.count(query, Bid.class);

        return totalCount;
    }

    public Bid updateDict(Bid Bid) {
        mongoTemplate.save(Bid);

        return Bid;
    }

    public Bid deleteDict(Bid Bid) {
        mongoTemplate.remove(Bid);

        return Bid;
    }
}
