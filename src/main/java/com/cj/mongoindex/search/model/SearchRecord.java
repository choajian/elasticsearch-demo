package com.cj.mongoindex.search.model;

import java.util.Date;

/**
 * @program: elasticsearch-demo
 * @description: 搜索记录实体类
 * @author: 晁建
 * @create: 2019-06-07 23:04
 */
public class SearchRecord
{
	/** 对象序列化时，该对象的唯一标识 */
	private static final long serialVersionUID = 788342983970361104L;
	
	private Long recordId;             // 搜索记录ID
	private Long userId;               // 搜索人
	private Long hotWordsId;           // 热词ID
	private String searchIP;           // 操作IP
	private Date searchDate;           // 操作时间
	
	public SearchRecord() {
		super();
	}

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getHotWordsId() {
		return hotWordsId;
	}

	public void setHotWordsId(Long hotWordsId) {
		this.hotWordsId = hotWordsId;
	}

	public String getSearchIP() {
		return searchIP;
	}

	public void setSearchIP(String searchIP) {
		this.searchIP = searchIP;
	}

	public Date getSearchDate() {
		return searchDate;
	}

	public void setSearchDate(Date searchDate) {
		this.searchDate = searchDate;
	}
	
}
