package com.cj.mongoindex.elasticsearch.model;

import com.cj.mongoindex.mongodb.model.Bid;
import com.cj.mongoindex.mongodb.utils.ZipUtils;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 文章实体
 *
 * @author 晁建
 * @date 2019-05-26
 */
@Document(indexName = "article_index", type = "article", shards = 5, replicas = 1, indexStoreType = "fs", refreshInterval = "-1")
public class Article implements Serializable {
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
    @Field(fielddata = true, type = FieldType.Text)
    private String content;

    private String createDate;

    private String createTime;

    private String bigCate;

    private String province;

    private String area;

    private String publishDate;

    private String sourceSite;

    private String digest;

    public Article() {
    }

    public Article(String id, String title, String content, String createDate, String createTime) {
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

    public String getBigCate() {
        return bigCate;
    }

    public void setBigCate(String bigCate) {
        this.bigCate = bigCate;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(String publishDate) {
        this.publishDate = publishDate;
    }

    public String getSourceSite() {
        return sourceSite;
    }

    public void setSourceSite(String sourceSite) {
        this.sourceSite = sourceSite;
    }

    public String getDigest() {
        return digest;
    }

    public void setDigest(String digest) {
        this.digest = digest;
    }

    private static Integer i = 0;

    public static List<Article> toArticleList(List<Bid> bids) {
        Object o = null;
        String c = null;
        List<Article> articles = new ArrayList<>();
        Article article = null;
        for (Bid bid : bids) {
            try {
                article = new Article();
                article.setId(bid.getId());
                article.setTitle(bid.getTitle());
                article.setCreateDate(bid.getCreatedate());
                article.setCreateTime(bid.getCreatetime());
                o = bid.getContent();
                if (o == null) {
                    continue;
                } else if (o instanceof String) {
                    c = o.toString();
                } else if (o instanceof Binary) {
                    c = ZipUtils.uncompressToString(((Binary) o).getData());
                }
                article.setContent(c);
                articles.add(article);
            }catch (Exception e){
                e.printStackTrace();
            }
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
