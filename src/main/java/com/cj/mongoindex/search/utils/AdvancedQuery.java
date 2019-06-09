package com.cj.mongoindex.search.utils;

/**
 * @program: elasticsearch-demo
 * @description: 查询条件
 * @author: 晁建
 * @create: 2019-06-07 23:04
 */
public class AdvancedQuery {
	//查询关键字
	private String str_query;
	//查询排除关键字
	private String str_not_query;
	//省份编码
	private String str_province_code;
	//市级地区
	private String str_area;
	//公告类型
	private String str_type;
	//页数
	private String str_page_number;
	//每页条数
	private String str_pagesize;
	//标题或者内容 1标题  2 标题和内容
	private String str_titileOrContent;
	//年份
	private String str_year;
	//二次搜索关键字
	private String str_query_second;
	
	public String getStr_area() {
		return str_area;
	}
	public void setStr_area(String str_area) {
		this.str_area = str_area;
	}
	public String getStr_query_second() {
		return str_query_second;
	}
	public void setStr_query_second(String str_query_second) {
		this.str_query_second = str_query_second;
	}
	public String getStr_year() {
		return str_year;
	}
	public void setStr_year(String str_year) {
		this.str_year = str_year;
	}
	public String getStr_query() {
		return str_query;
	}
	public void setStr_query(String str_query) {
		this.str_query = str_query;
	}
	public String getStr_not_query() {
		return str_not_query;
	}
	public void setStr_not_query(String str_not_query) {
		this.str_not_query = str_not_query;
	}
	public String getStr_province_code() {
		return str_province_code;
	}
	public void setStr_province_code(String str_province_code) {
		this.str_province_code = str_province_code;
	}
	public String getStr_type() {
		return str_type;
	}
	public void setStr_type(String str_type) {
		this.str_type = str_type;
	}
	public String getStr_page_number() {
		return str_page_number;
	}
	public void setStr_page_number(String str_page_number) {
		this.str_page_number = str_page_number;
	}
	public String getStr_pagesize() {
		return str_pagesize;
	}
	public void setStr_pagesize(String str_pagesize) {
		this.str_pagesize = str_pagesize;
	}
	public String getStr_titileOrContent() {
		return str_titileOrContent;
	}
	public void setStr_titileOrContent(String str_titileOrContent) {
		this.str_titileOrContent = str_titileOrContent;
	}
	
}
