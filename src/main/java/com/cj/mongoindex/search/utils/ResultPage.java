package com.cj.mongoindex.search.utils;

/**
 * @program: elasticsearch-demo
 * @description: 分页通用类
 * @author: 晁建
 * @create: 2019-06-07 23:04
 */
public class ResultPage {

    private int showCount = 10; //每页显示记录数
    private int totalPage;        //总页数
    private int totalResult;    //总记录数
    private int currentPage;    //当前页
    private int currentResult;    //当前记录起始索引
    private boolean entityOrField;    //true:需要分页的地方，传入的参数就是Page实体；false:需要分页的地方，传入的参数所代表的实体拥有Page属性
    private String pageStr;        //最终页面显示的底部翻页导航，详细见：getPageStr();

    public int getTotalPage() {
        if (totalResult % showCount == 0)
            totalPage = totalResult / showCount;
        else
            totalPage = totalResult / showCount + 1;
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(int totalResult) {
        this.totalResult = totalResult;
    }

    public int getCurrentPage() {
        if (currentPage <= 0)
            currentPage = 1;
        if (currentPage > getTotalPage())
            currentPage = getTotalPage();
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public String getPageStr() {
        StringBuffer sb = new StringBuffer();
        if (totalResult > 0) {

            // 分页总信息
            sb.append("<div class=\"m-page f-fl\">\n<div class=\"m-pager\">");
            if (currentPage > 1) {
                sb.append("\n<span><a href=\"javaScript:toPage(1)\">首页</a></span>");
                sb.append("\n<span><a href=\"javaScript:toPage(" + (currentPage - 1) + ")\">上一页</a></span>");
            } else {
                sb.append("\n<span class=\"disabled\">首页</span>");
                sb.append("\n<span class=\"disabled\">上一页</span>");
            }
            int showTag = 10;    //分页标签显示数量

            if (showTag >= totalPage) {
                // 循环展示页码
                for (int i = 1; i <= totalPage && i <= totalPage; i++) {
                    //如果页数小于等于10页,则全部显示
                    if (currentPage == i)
                        sb.append("\n<span class=\"active\">" + i + "</span>");
                    else
                        sb.append("\n<span><a href=\"javaScript:toPage(" + i + ")\">" + i + "</a></span>");
                }
            } else {
                int index = 1;
                //并且如果当前页大于5页，从当前页前5页开始显示10个页数
                if (this.currentPage > 5) {
                    int initPage = 5 < totalPage - currentPage ? 5 : (10 - totalPage + currentPage);
                    for (int j = this.currentPage - initPage; j <= totalPage; j++) {
                        if (currentPage == j)
                            sb.append("\n<span class=\"active\">" + j + "</span>");
                        else
                            sb.append("\n<span><a href=\"javaScript:toPage(" + j + ")\">" + j + "</a></span>");
                        index++;
                        if (index > 10)//如果循环到10次则退出循环
                            break;
                    }
                } else {
                    for (int i = 1; i <= this.totalPage; i++) {
                        //如果页数小于等于10页,则全部显示
                        if (currentPage == i)
                            sb.append("\n<span class=\"active\">" + i + "</span>");
                        else
                            sb.append("\n<span><a href=\"javaScript:toPage(" + i + ")\">" + i + "</a></span>");
                        index++;
                        if (index > 10)
                            break;
                    }
                }

            }

            if (currentPage != totalPage) {
                sb.append("\n<span><a href=\"javaScript:toPage(" + (currentPage + 1) + ")\">下一页</a></span>");
                sb.append("\n<span><a href=\"javaScript:toPage(" + totalPage + ")\">末页</a></span>");
            } else {
                sb.append("\n<span class=\"disabled\">下一页</span>");
                sb.append("\n<span class=\"disabled\">末页</span>");
            }

            sb.append("\n</div>\n</div>");

            //分页脚本
            sb.append("<script type=\"text/javascript\">\n");
            sb.append("function toPage(page){\n");
            sb.append("	if(true && document.forms[0]){\n");
            sb.append("		var url = document.forms[0].getAttribute(\"action\");\n");
            sb.append("		if(url.indexOf('?')>-1){url += \"&" + (entityOrField ? "currentPage" : "currentPage") + "=\";}\n");
            sb.append("		else{url += \"?" + (entityOrField ? "currentPage" : "currentPage") + "=\";}\n");
            sb.append("     url += page;");
            sb.append("		document.forms[0].action = url;\n");
            sb.append("		document.forms[0].submit();\n");
            sb.append("	}else{\n");
            sb.append("		var url = document.location+'';\n");
            sb.append("		if(url.indexOf('?')>-1){\n");
            sb.append("			if(url.indexOf('currentPage')>-1){\n");
            sb.append("				var reg = /currentPage=\\d*/g;\n");
            sb.append("				url = url.replace(reg,'currentPage=');\n");
            sb.append("			}else{\n");
            sb.append("				url += \"&" + (entityOrField ? "currentPage" : "currentPage") + "=\";\n");
            sb.append("			}\n");
            sb.append("		}else{url += \"?" + (entityOrField ? "currentPage" : "currentPage") + "=\";}\n");
            sb.append("     url += page;");
            sb.append("		document.location = url;\n");
            sb.append("	}\n");
            sb.append("}\n");
            sb.append("</script>\n");
        }
        pageStr = sb.toString();
        return pageStr;
    }

    public void setPageStr(String pageStr) {
        this.pageStr = pageStr;
    }

    public int getShowCount() {
        return showCount;
    }

    public void setShowCount(int showCount) {
        this.showCount = showCount;
    }

    public int getCurrentResult() {
        currentResult = (getCurrentPage() - 1) * getShowCount();
        if (currentResult < 0)
            currentResult = 0;
        return currentResult;
    }

    public void setCurrentResult(int currentResult) {
        this.currentResult = currentResult;
    }

    public boolean isEntityOrField() {
        return entityOrField;
    }

    public void setEntityOrField(boolean entityOrField) {
        this.entityOrField = entityOrField;
    }
}
