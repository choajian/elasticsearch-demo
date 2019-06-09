<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head>
    <title>项目网</title>
    <meta http-equiv="pragma" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate"/>
    <meta http-equiv="expires" content="0"/>
    <link rel="stylesheet" href="${ctx }/css/style_new.css">
    <link rel="stylesheet" href="${ctx }/css/common_new.css">
    <link href="${ctx }/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet">
    <script src="${ctx }/js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="${ctx }/js/jquery-ui-1.10.4.custom.js"></script>
    <script type="text/javascript" src="${ctx }/js/city/city_arr.js"></script>
    <script type='text/javascript' src="${ctx }/js/common.js"></script>
    <script type="text/javascript" src="${ctx }/js/common_new.js"></script>
    <script type="text/javascript" src="${ctx }/js/result.js"></script>
    <script type="text/javascript">
        var ctx = '${ctx }';
    </script>
    <style type="text/css">
        .white_content {
            display: none;
            position: absolute;
            top: 30%;
            left: 30%;
            width: 35%;
            height: 20%;
            padding: 20px;
            border: 7px solid #a1a09f;
            background-color: white;
            z-index: 1002;
            overflow: auto;
        }

        .close-btn {
            position: absolute;
            right: 15px;
            top: 15px;
            background: url(${ctx }/image/T1EYY.XkVcXXbzhCMw-112-182.png) 0 -136px no-repeat;
            display: block;
            width: 19px;
            height: 18px;
            overflow: hidden;
            z-index: 3;
            text-indent: -9999em
        }

        .close-btn:hover {
            background-position: 0 -163px
        }

        #popupPanel .tb-canvas {
            background-color: #333;
            opacity: .5;
            filter: alpha(opacity=50);
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;
            width: 500px;
            height: 999px;
            *display: none
        }

        .grid {
            letter-spacing: -.31em;
            *letter-spacing: normal;
            word-spacing: -.43em
        }

        .grid .g-u {
            display: inline-block;
            zoom: 1;
            *display: inline;
            letter-spacing: normal;
            word-spacing: normal;
            vertical-align: top
        }

        .result {
            font-size: 12px;
            color: gray;
            line-height: 20px;
            margin-bottom: 30px;
            border-bottom: 1px dashed #ccc
        }

        .result .icon {
            width: 26px;
            height: 26px;
            background: url(image/T1jJe7FdpXXXb1xjju-26-161.png) no-repeat scroll 0 0 transparent;
            padding: 0;
            margin-right: 12px;
            margin-top: 12px;
        }

        .result .msg {
            color: #404040;
            line-height: 16px;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 400;
            display: inline-block;
            *display: inline
        }

        .result .msg span {
            color: #999
        }

        .result .ok {
            background-position: -1px -35px
        }

        .result .warm {
            background-position: -1px -68px
        }

        .result .error {
            background-position: 0 0;
            margin-right: 20px;
            width: 32px;
            height: 32px
        }

        .result .msg-div {
            padding-top: 6px;
            margin-right: 10px;
            width: auto;
        }
    </style>
</head>
<body>
<div class="g-doc">
    <!-- TOP页面 -->
    <div class="g-main f-mt">
        <div class="g-leftbar f-fl">
            <div class="f-fl">
                <div class="g-left-con f-fl">
                    <div id='provDiv' class="u-menu-cate u-menu-selected">地区<span class="f-fr"><a id='areaBtn'
                                                                                                  href="javascript:void(0);"
                                                                                                  class="u-change-area">切换省级</a></span>
                    </div>
                    <ul id='provUl' class="u-menu-list">
                        <li><a id='mnu01' href="javascript:searchKeyWord(2, '01,05,16,21,28');">华北地区</a></li>
                        <li><a id='mnu03' href="javascript:searchKeyWord(2, '03,14,10,11');">华南地区</a></li>
                        <li><a id='mnu02' href="javascript:searchKeyWord(2, '02,07,08,15,12');">华东地区</a></li>
                        <li><a id='mnu18' href="javascript:searchKeyWord(2, '18,19,17,13');">华中地区</a></li>
                        <li><a id='mnu23' href="javascript:searchKeyWord(2, '23,24,22');">东北地区</a></li>
                        <li><a id='mnu20' href="javascript:searchKeyWord(2, '20,27,31,32,23');">西北地区</a></li>
                        <li><a id='mnu09' href="javascript:searchKeyWord(2, '09,06,26,25,30');">西南地区</a></li>
                    </ul>
                </div>
                <div class="g-left-con f-fl" style="display:none;">
                    <div class="u-menu-cate u-menu-selected">地区(省级)<span class="f-fr"><a href="javascript:void(0);"
                                                                                         class="u-change-area">隐藏省级</a></span>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>华北地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '01');">北京</a><a
                                name='province' href="javascript:searchKeyWord(2, '05');">天津</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '16');">河北</a><a
                                name='province' href="javascript:searchKeyWord(2, '21');">山西</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '28');">内蒙古</a>
                        </div>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>华南地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '03');">广东</a><a
                                name='province' href="javascript:searchKeyWord(2, '14');">广西</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '10');">海南</a><a
                                name='province' href="javascript:searchKeyWord(2, '11');">福建</a></div>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>华东地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '02');">上海</a><a
                                name='province' href="javascript:searchKeyWord(2, '07');">江苏</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '08');">浙江</a><a
                                name='province' href="javascript:searchKeyWord(2, '15');">安徽</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '12');">山东</a>
                        </div>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>华中地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '18');">湖北</a><a
                                name='province' href="javascript:searchKeyWord(2, '19');">湖南</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '17');">河南</a><a
                                name='province' href="javascript:searchKeyWord(2, '13');">江西</a></div>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>东北地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '23');">辽宁</a><a
                                name='province' href="javascript:searchKeyWord(2, '24');">吉林</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '22');">黑龙江</a>
                        </div>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>西北地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '20');">陕西</a><a
                                name='province' href="javascript:searchKeyWord(2, '27');">甘肃</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '31');">新疆</a><a
                                name='province' href="javascript:searchKeyWord(2, '32');">青海</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '29');">宁夏</a>
                        </div>
                    </div>
                    <div class="u-area">
                        <div class="u-province"><b>西南地区：</b><a name='province'
                                                               href="javascript:searchKeyWord(2, '09');">四川</a><a
                                name='province' href="javascript:searchKeyWord(2, '06');">重庆</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '26');">贵州</a><a
                                name='province' href="javascript:searchKeyWord(2, '25');">云南</a><a name='province'
                                                                                                   href="javascript:searchKeyWord(2, '30');">西藏</a>
                        </div>
                    </div>
                </div>
                <div class="g-left-con f-fl">
                    <div class="u-menu-cate u-menu-selected">类别</div>
                    <ul class="u-menu-list">
                        <li><a id='notice1' href="javascript:searchKeyWord(3, '1');">采购公告</a></li>
                        <li><a id='notice2' href="javascript:searchKeyWord(3, '2');">变更公告</a></li>
                        <li><a id='notice3' href="javascript:searchKeyWord(3, '3');">中标公告</a></li>
                    </ul>
                    <div class="u-menu-cate u-menu-selected">时间</div>
                    <ul class="u-menu-list">
                        <c:forEach items="${yearArray}" var="year" varStatus="vs">
                            <li><a id='year${year }' href="javascript:searchKeyWord(4, '${year }');">${year }年</a></li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
        <div class="g-rightmain f-fl">
            <div class="m-right-content">
                <span class="m-result-note f-fl">
					共为您找到 ${pageCount } 个结果<c:if test="${0 < pageCount }">，当前页面显示第 ${resultPage.currentResult+1 } -
                    <c:if test="${pageCount > resultPage.currentResult+resultPage.showCount }">${resultPage.currentResult+resultPage.showCount }</c:if>
                    <c:if test="${resultPage.currentResult+resultPage.showCount > pageCount }">${pageCount }</c:if> 项。
                </c:if>[用时: ${timeCon } 秒]
				</span>
                <c:choose>
                    <c:when test="${not empty articleList}">
                        <c:forEach items="${articleList}" var="article" varStatus="s">
                            <div class="m-result f-fl">
                                <div class="u-result-title">
                                    <c:if test="${not empty article.id}"><input type='checkbox' class="f-vam f-mt2"
                                                                                name='proChk'
                                                                                value='${article.id}'/></c:if>
                                    <c:if test="${empty article.id}">&nbsp;&nbsp;</c:if>
                                    <label>【${article.bigCate }】</label>
                                    <h1>
                                        <c:if test="${not empty article.id}">
                                        <a name='ann' href="${ctx }/attention/attentionProjectInfo?id=${article.id }"
                                           target="_blank">
                                            </c:if>
                                            <c:if test="${empty article.id}">
                                            <a name='ann' href="${ctx }/search/toSnapshot?id=${article.id }"
                                               target="_blank">
                                                </c:if>
                                                    ${article.title}</a></h1></font>&nbsp;&nbsp;<i>${article.province }&nbsp;${article.area }</i>
                                </div>
                                <p class="u-result-description">
                                        ${article.digest }
                                </p>
                                <p class="u-result-info">
                                    <font>${article.sourceSite }</font>　<font>${article.publishDate }</font> - <a
                                        name='ann' href="${ctx }/search/toWeb?id=${article.id }" rel="PRO_page_fs[]"
                                        target="_blank">原始链接</a>
                                </p>
                            </div>
                        </c:forEach>
                    </c:when>
                    <c:otherwise>
                        <div class="m-result f-fl">
                            抱歉，没有找到符合条件的信息，请您
                            <ul style='margin-left:25px;'>
                                <li>确认输入的关键词正确无误
                                <li>试用不同的关键词
                                <li>尽可能使用常规字符串，并尽可能简洁
                            </ul>
                        </div>
                    </c:otherwise>
                </c:choose>
                ${resultPage.pageStr }
                <div class="m-footer-search f-fl">
                    <form id='searchForm' name='searchForm' method="post" action='result'>
                        <input type='hidden' id='id' name='id'/>
                        <input type='hidden' id='pageFlag' name='pageFlag'/>
                        <input type='hidden' id='str_province_code' name='advancedQuery.str_province_code'
                               value='${advancedQuery.str_province_code }'/>
                        <input type='hidden' id='str_area' name='advancedQuery.str_area'
                               value='${advancedQuery.str_area }'/>
                        <input type='hidden' id='str_type' name='advancedQuery.str_type'
                               value='${advancedQuery.str_type }'/>
                        <input type='hidden' id='annouName' name='advancedQuery.str_query'
                               value='${advancedQuery.str_query }'/>
                        <input type='hidden' id='str_query_second' name='advancedQuery.str_query_second'
                               value='${advancedQuery.str_query_second }'/>
                        <input type='hidden' id='str_pagesize' name='advancedQuery.str_pagesize'
                               value='${advancedQuery.str_pagesize }'/>
                        <input type='hidden' id='str_not_query' name='advancedQuery.str_not_query'
                               value='${advancedQuery.str_not_query }'/>
                        <input type='hidden' id='str_titileOrContent' name='advancedQuery.str_titileOrContent'
                               value='${advancedQuery.str_titileOrContent}'/>
                        <input type='hidden' id='str_year' name='advancedQuery.str_year'
                               value='${advancedQuery.str_year }'/>
                        <input type='hidden' id='currentUserName' name='currentUserName' value='${currentUserName }'/>
                        <input type="hidden" id='dir' name="dir" value="login">
                        <div class="u-search-input f-fl" style='width:335px;'>
                            <div class="u-search-select f-pr" onMouseOver="mopen('dropCate3');"
                                 onMouseOut="mclosetime();">
                                <h1 class="f-ib"><c:if test="${2 == advancedQuery.str_titileOrContent}">全文</c:if><c:if
                                        test="${2 != advancedQuery.str_titileOrContent}">标题</c:if></h1><span
                                    class="glyphicon glyphicon-chevron-up" onclick="mopen('dropCate3');"></span>
                                <ul class="dropCate" id="dropCate3"
                                    style="visibility:hidden; position:absolute; top: -59px;">
                                    <li><a href="javascript:searchKeyWord(5, '1');">标题</a></li>
                                    <li><a href="javascript:searchKeyWord(5, '2');">全文</a></li>
                                </ul>
                            </div>
                            <input type="text" size="36" style='width:255px;' class="inp" id="autocomplete"
                                   name='autocomplete' value='${advancedQuery.str_query }' maxlength="50"/>
                        </div>
                        <div class="u-search-btn f-fl">
                            <input type="button" id='searchBtn' onmousedown="this.className='u-search-btn-down'"
                                   onmouseout="this.className=''" value=" 搜 索 " onclick="searchKeyWord(1, '');"/>&nbsp;
                        </div>
                        <div class="u-search-input f-fl" style='width:150px;'>
                            <input style='width:140px;' type="text" size="36" id="autocomplete0" name='autocomplete'
                                   value='${advancedQuery.str_query_second }' maxlength="50"/>
                        </div>
                        <div class="u-search-btn f-fl">
                            <input type="button" value="结果中搜索" onmousedown="this.className='u-search-btn-down'"
                                   onmouseout="this.className=''" onclick="searchKeyWord(1.1, '0');">
                        </div>
                    </form>
                </div>
            </div>
            <div class="m-right-ad">

            </div>
        </div>
        <div class="f-cls"></div>
    </div>
</div>
<div id="light" class="white_content"><a class="close-btn" href="javascript:closeProjectEmphasis();">关闭</a>
    <div class="result grid" style="margin-top:20px;">
        <span class="icon g-u ok"></span>
        <div class="g-u msg-div">
            <p class="msg">成功加入<a href="javascript:toURL('../attention/attentionProject');"
                                  style='text-decoration: underline;'>我的项目</a></p>
        </div>
    </div>
</div>
<div id="fade" class="black_overlay">
</div>
<div id='login'
     style="position:absolute;z-index:2001; border:1px solid #ddd; background-color: #fff;width:394px;height:375px;display: none;">
    <iframe id='loginIframe' name='loginIframe' src='${ctx }/login/toLogin' scrolling="no" frameborder="0"
            marginheight="0" marginwidth="0" width="100%" height='100%'></iframe>
</div>
<div id='register'
     style="position:absolute;z-index:2001; border:1px solid #ddd; background-color: #fff;width:680px;height:385px;display: none;">
    <iframe id='regIframe' name='regIframe' src='${ctx }/register/toReg' scrolling="no" frameborder="0" marginheight="0"
            marginwidth="0" width="100%" height='100%'></iframe>
</div>
</body>
</html>
