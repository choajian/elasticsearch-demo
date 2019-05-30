package com.cj.sybaseindex.elasticsearch.model;

import org.springframework.data.elasticsearch.annotations.Document;

import java.io.Serializable;
import java.util.Map;

/**
 * EAJ实体
 * @author 晁建
 * @date 2019-05-29
 */
@Document(indexName="eaj_index",type="eaj",shards=5,replicas=1,indexStoreType="fs",refreshInterval="-1")
public class Eaj implements Serializable {

    private Long id;

    private String ahdm;

    private String ah;

    private String sarq;

    private String larq;

    private String dsr;

    public Eaj(){}

    public Eaj(Map<String ,Object> map){
        if(map!=null) {
            this.ahdm = map.get("AHDM").toString();
            this.ah = map.get("AH").toString();
            this.sarq = map.get("SARQ").toString();
            this.larq = map.get("LARQ").toString();
            this.dsr = map.get("DSR").toString();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAhdm() {
        return ahdm;
    }

    public void setAhdm(String ahdm) {
        this.ahdm = ahdm;
    }

    public String getAh() {
        return ah;
    }

    public void setAh(String ah) {
        this.ah = ah;
    }

    public String getSarq() {
        return sarq;
    }

    public void setSarq(String sarq) {
        this.sarq = sarq;
    }

    public String getLarq() {
        return larq;
    }

    public void setLarq(String larq) {
        this.larq = larq;
    }

    public String getDsr() {
        return dsr;
    }

    public void setDsr(String dsr) {
        this.dsr = dsr;
    }
}
