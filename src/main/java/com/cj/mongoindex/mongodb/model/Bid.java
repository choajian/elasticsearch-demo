package com.cj.mongoindex.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

/**
 * 文章实体
 *
 * @author 晁建
 * @date 2019-05-26
 */
@Document(collection = "bid")
public class Bid implements Serializable {
    private static final long serialVersionUID = 551589397625941750L;

    @Id
    private String id;
    /**
     * 标题
     */
    private String title;
    /**
     * 内容
     */
    private Object content;

    private String createdate;

    private String createtime;

    public Bid() {
    }

    public Bid(String title, String content, String createDate, String createtime) {
        this.title = title;
        this.content = content;
        this.createdate = createDate;
        this.createtime = createtime;
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

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }

    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String cratetime) {
        this.createtime = cratetime;
    }

    @Override
    public String toString() {
        return "Bid{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
