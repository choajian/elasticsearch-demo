package com.cj.mongoindex.elasticsearch.model;

import com.cj.mongoindex.mongodb.model.Bid;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 文章实体
 * @author 晁建
 * @date 2019-05-26
 */
@Document(indexName="article_index",type="article",shards=5,replicas=1,indexStoreType="fs",refreshInterval="-1")
public class Article implements Serializable {
    private static final long serialVersionUID = 551589397625941750L;

    @Id
    private Integer id;
    /**标题*/
    private String title;
    /**内容*/
    private String content;
    /**发表时间*/
    private Date postTime;

    /**点击率*/
    private Long clickCount;

    private String createDate;

    public Article() {
    }

    public Article(Integer id, String title, String content, Date postTime, Long clickCount,String createDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.postTime = postTime;
        this.clickCount = clickCount;
        this.createDate = createDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
    }

    public Long getClickCount() {
        return clickCount;
    }

    public void setClickCount(Long clickCount) {
        this.clickCount = clickCount;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    private static Integer i=0;
    public static List<Article> toArticleList(List<Bid> bids){
        List<Article> articles=new ArrayList<>();
        Article article=null;
        for (Bid bid:bids) {
            article=new Article();
            //article.setId(++i);
            article.setContent(bid.getContent());
            article.setTitle(bid.getTitle());
            article.setPostTime(bid.getPostTime());
            article.setCreateDate(bid.getCreatedate());
            articles.add(article);
        }
        return articles;

    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", postTime=" + postTime +
                ", clickCount=" + clickCount +
                '}';
    }
}
