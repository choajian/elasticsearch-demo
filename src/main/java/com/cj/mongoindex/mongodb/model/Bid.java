package com.cj.mongoindex.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

/**
 * 文章实体
 * @author 晁建
 * @date 2019-05-26
 */
@Document(collection="bid")
public class Bid implements Serializable {
    private static final long serialVersionUID = 551589397625941750L;

    @Id
    private String id;
    /**标题*/
    private String title;
    /**内容*/
    private String content;
    /**发表时间*/
    private Date postTime;

    /**点击率*/
    private Long clickCount;

    private String createdate;

    public Bid() {
    }

    public Bid(Long String, String title, String abstracts, String content, Date postTime, Long clickCount, String createDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.postTime = postTime;
        this.clickCount = clickCount;
        this.createdate = createdate;
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

    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
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
