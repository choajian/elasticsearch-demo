<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<link href="${ctx }/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet">
<script src="${ctx }/js/jquery-ui-1.10.4.custom.js"></script>
<link rel="stylesheet" href="${ctx }/css/style_new.css">
<link rel="stylesheet" href="${ctx }/css/common_new.css"> 
<script type="text/javascript" src="${ctx }/js/common_new.js"></script>
<script type="text/javascript">
var ctx='${ctx}';
$(document).ready(function(){
	$( "#autocomplete" ).autocomplete({
	      source: "${ctx}/hotWords/getHotWords",
	      minLength: 1,
	      maxLength:10
	});
});

$(document).ready(function(){
	//回车后登录
	document.onkeydown = function(e){ 
		var ev = document.all ? window.event : e; 
		if(ev.keyCode==13) { 
			searchKeyWord(1);
		} 
	};
	
	$.ajax({
   	 type: "POST",
        url: "${ctx}/browsingHistory/ajaxBrowsingHistoy",
        success: function (data) {
        	var html="";
       	 if(data != null && data != ''){
       	 	var obj = eval(data);
       		for (var i = 0; i < obj.length; i++) {
       			var title = obj[i].annouTitle;
       			if(title.length > 18){
       				title = title.substring(0,18)+"...";
       			}
       			if ("" != obj[i].projectId && null != obj[i].projectId)
    			{
    				html += "<li><a href=\"${ctx}/attention/attentionProjectInfo?annouId="+obj[i].annouId+"&projectId=" + obj[i].projectId + "\" target=\"_blank\"><div class=\"glyphicon glyphicon-file\"></div> "+title+"</a></li>";
    			}
    			else
    			{
    				html += "<li><a href=\"${ctx}/search/toSnapshot?annouId="+obj[i].annouId+"\" target=\"_blank\"><div class=\"glyphicon glyphicon-file\"></div> "+title+"</a></li>";
    			}
       			if(i==9)
       				break;
       		}
       	 }else{
       	 	html="<li style='text-align:center'>无记录</li>";
       	 }
       	 $(".u-downmenu-list").html(html);
        }
   });
});
</script>
<form id='searchForm' name='searchForm' method="post" >
<input type='hidden' id='annouName' name='advancedQuery.str_query' value='${advancedQuery.str_query }' />
<input type="hidden" id='dir' name="dir" value="login"/>
<div class="g-toolbar">
	<ul class="m-toolbar-link f-fr">
		<li><a href="${ctx }/search/toIndex"><span class="glyphicon glyphicon-home"></span>首页</a></li>
		<li>|</li>
		<div id='users' style='display:inline;width:auto;'><li><span class="glyphicon glyphicon-user"></span>  欢迎您，<c:if test="${0 != userInfo.insType }"><a href="${ctx }/userInfo/toEdit" style="text-decoration:none"></c:if>${userInfo.userName }<c:if test="${0 != userInfo.insType }"></a></c:if></li>
		<li>|</li>
		<li><a href="${ctx }/login/cancellation"><span class="glyphicon glyphicon-log-out"></span>退出</a></li></div>
		<li>|</li>
		<li><a href="#"><span class="glyphicon glyphicon-question-sign"></span>帮助</a></li>
		<li>|</li>
		<li><a href="#" onclick="AddFavorite(window.location,document.title)"><span class="glyphicon glyphicon-star-empty"></span>加入收藏夹</a></li>
		<li>|</li>
		<li><a href="#" onclick="SetHome(this,window.location)"><span class="glyphicon glyphicon-home"></span>设为主页</a></li>
	</ul>
</div>
<div class="g-header g-header-mini f-pr">
	<div class="u-header-logo f-fl"><a href="${ctx }/search/toIndex"><img src="${ctx }/image/logo.gif" alt="项目网" title="项目网"></a></div>
	<div class="m-header-search f-fl">
		<div class="u-search-input f-fl">
			 <input type="text" size="36" id="autocomplete" name='autocomplete' value='${advancedQuery.str_query }' maxlength="50"/>
		</div>
		<div class="u-search-btn f-fl">
			<input type="button" value="搜索" onmousedown="this.className='u-search-btn-down'" onmouseout="this.className=''" onclick="searchKeyWord(1);">
		</div>
	</div>
	
	<div class="u-header-href">
		<!-- <a id='lnk_subscription' href="javascript:mopen('s_user_name_menu-2');" onMouseOver="mopen('s_user_name_menu-2');" onMouseOut="mclosetime();"><span class="glyphicon glyphicon-eye-open"></span><br/>项目订阅</a> -->
		<a href="${ctx }/projectRadar/toList"><span class="glyphicon glyphicon-dashboard"></span><br/>我的雷达</a>
		<a href="${ctx }/attention/attentionFProject"><span class="glyphicon glyphicon-th"></span><br/>我的工程</a>
		<a href="${ctx }/attention/attentionProject"><span class="glyphicon glyphicon-th-list"></span><br/>我的项目</a>
		<a href="${ctx }/focusEntrust/toList" style='width:75px;'><span class="glyphicon glyphicon-book"></span><br/>我的委托单位</a>
		<a href="${ctx }/focusAgency/toList" style='width:75px;'><span class="glyphicon glyphicon-briefcase"></span><br/>我的代理机构</a>
		<a href="${ctx }/browsingHistory/browsingHistory" onMouseOver="mopen('u-downmenu');" onMouseOut="mclosetime();"><span class="glyphicon glyphicon-time"></span><br/>浏览记录</a>
		<div id="u-downmenu" onMouseOver="mcancelclosetime();" onMouseOut="mclosetime();" class="u-downmenu" style="visibility:hidden;">
			<ul class="u-downmenu-list">
				
			</ul>
			<div class="u-downmenu-foot">
				<a href="${ctx }/browsingHistory/browsingHistory">查看更多>></a>
			</div>
			<span class="u-menu-arrow"></span>
		</div>
		<!-- 
		<div id="s_user_name_menu-2" onMouseOver="mcancelclosetime();" onMouseOut="mclosetime();" class="s-user-set-menu menu-top" style="left: 55px; margin-top:10px;visibility:hidden;">
			<div>
				<a href="${ctx }/projectSubsc/toInsert">添加订阅</a>
				<a href="${ctx }/projectSubsc/toList">订阅管理</a>
			</div>
			<span class="menu-arrow"></span>
		</div>
		 -->
	</div>
</div>
</form>