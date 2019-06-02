package com.cj.mongoindex.elasticsearch.model;

import com.cj.mongoindex.mongodb.model.Bid;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.io.Serializable;
import java.util.ArrayList;
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
    private String id;
    /**标题*/
    private String title;
    /**内容*/
    @Field(fielddata = true,type=FieldType.Text)
    private String content;

    private String createDate;

    private String createTime;

    public Article() {
    }

    public Article(String id, String title, String content,String createDate,String createTime) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createDate = createDate;
        this.createTime = createTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    private static Integer i=0;
    public static List<Article> toArticleList(List<Bid> bids){
        List<Article> articles=new ArrayList<>();
        Article article=null;
        for (Bid bid:bids) {
            article=new Article();
            article.setId(bid.getId());
            article.setContent(bid.getContent());
            article.setTitle(bid.getTitle());
            article.setCreateDate(bid.getCreatedate());
            article.setCreateTime(bid.getCreatetime());
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
                '}';
    }
}
