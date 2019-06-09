<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>top</title>
<link href="${ctx }/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet">
  <script src="${ctx }/js/jquery-ui-1.10.4.custom.js"></script>
</head>
<script type="text/javascript">
$(document).ready(function(){
	//$( "#autocomplete" ).autocomplete({
	//      source: "${ctx}/hotWords/getHotWords",
	//      minLength: 1,
	//      maxLength:10
	//});
});
</script>
<body>
<form id='searchForm' name='searchForm' method="post" >
<!-- input type='hidden' id='annouName' name='advancedQuery.str_query' value='${advancedQuery.str_query }' /-->
	<div class="g-header">
        <div class="m-logo f-fl"><a href="${ctx}/search/toIndex"><img src="${ctx }/image/logo.gif"/></a></div>
        <!-- div class="m-key f-fl">
            <input type="hidden" id='dir' name="dir" value="login"/>
            <input class='inp ui-autocomplete-input' type="text" size="36" maxlength="60" id="autocomplete" name='autocomplete' value='${advancedQuery.str_query }' maxlength="50" />
			<input type="button" class="btn" value=" 搜 索 " onclick="searchKeyWord(1);">&nbsp;
        </div-->
        <ul class="m-link f-fr">
            <li><a href="${ctx}/login/console">主页</a></li>
            <li>|</li>
            <li>欢迎您，<label id='loginUser'>${userName }</label></li>
            <li>|</li>
            <li><a href="${ctx }/login/cancellation">退出</a></li>
        </ul>
    </div>
</form>
</body>
</html>