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

    /**
     * 网站
     */
    private String host;

    /**
     * 网站名称
     */
    private String hostname;

    /**
     * 地址
     */
    private String url;

    /**
     * 大类
     */
    @Field("big_cate")
    private String bigCate;

    /**
     * 小类
     */
    @Field("small_cate")
    private String smallCate;

    /**
     * 创建日期
     */
    private String createdate;

    /**
     * 创建时间
     */
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

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getBigCate() {
        return bigCate;
    }

    public void setBigCate(String bigCate) {
        this.bigCate = bigCate;
    }

    public String getSmallCate() {
        return smallCate;
    }

    public void setSmallCate(String smallCate) {
        this.smallCate = smallCate;
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
