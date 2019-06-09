<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/common/taglibs.jsp"%>
<link href="${ctx }/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet">
<script src="${ctx }/js/jquery-ui-1.10.4.custom.js"></script>
<script type="text/javascript">
var temp1=false;
var temp2=false;
var temp3=false;
var temp4=false;
$(document).ready(function(){
	$( "#autocomplete1" ).autocomplete({
	      source: "${ctx}/hotWords/getHotWords",
	      minLength: 1,
	      maxLength:10,
	      change: function( event, ui ) {
	    	  $("#autocomplete1").val(this.value);
	    	  $("#autocomplete3").val(this.value);
	    	  if (undefined != $("#autocomplete2").val())
	          {
	    		  $("#autocomplete2").val('');
	          }
	      },
	      response: function( event, ui ) {
	    	  if (undefined != $("#autocomplete2").val())
	          {
	    		  $("#autocomplete2").val('');
	          }
	      },
	      search: function() {
	    		return temp1;
		  }
	  
	});
	$("#autocomplete1").focus(function(){
		temp1=true;
		$(document).keydown(function(event){ 
			//判断当event.keyCode 为13时（即ENTER键 
			if(event.keyCode == 13){ 
				searchKeyWord(1, '1');
			}
		}); 
  	});
	
	$( "#autocomplete3" ).autocomplete({
	      source: "${ctx}/hotWords/getHotWords",
	      minLength: 1,
	      maxLength:10,
	      change: function( event, ui ) {
	    	  $("#autocomplete1").val(this.value);
	    	  $("#autocomplete3").val(this.value);
	    	  if (undefined != $("#autocomplete4").val())
	          {
	    		  $("#autocomplete4").val('');
	          }
	      },
	      response: function( event, ui ) {
	    	  if (undefined != $("#autocomplete4").val())
	          {
	    		  $("#autocomplete4").val('');
	          }
	      },
	      search: function() {
	    		return temp3;
		  }
	});
	$("#autocomplete3").focus(function(){
		temp3=true;
		$(document).keydown(function(event){ 
			//判断当event.keyCode 为13时（即ENTER键 
			if(event.keyCode == 13){ 
				searchKeyWord(1, '3');
			}
		}); 
	});
  	
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

$(document).ready(function(){
	//回车后登录
	document.onkeydown = function(e){ 
		var ev = document.all ? window.event : e; 
		if(ev.keyCode==13) { 
			searchKeyWord(1, '1');
		} 
	};
});
$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() > 118){
			$(".g-scroll-header").stop().animate({
				top: '36px'
			},"500");
		}else{
			$(".g-scroll-header").stop().animate({
				top: '-62px'
			},"500");
		}
	})
});
</script>
<div class="g-toolbar">
	<ul class="m-toolbar-link f-fr">
		<li><a href="${ctx }/search/toIndex"><span class="glyphicon glyphicon-home"></span>首页</a></li>
		<li>|</li>
		<c:if test="${null == userInfo }">
		<div id='users' style='display:inline;width:auto;'><li><a href="javascript:showLogin();"><span class="glyphicon glyphicon-user"></span>登录</a></li>
		<li>|</li>
		<li><a href="javascript:showReg();"><span class="glyphicon glyphicon-pencil"></span>注册</a></li></div>
		</c:if>
		<c:if test="${null != userInfo }">
			<div id='users' style='display:inline;width:auto;'><li><span class="glyphicon glyphicon-user"></span>  欢迎您，<c:if test="${0 != userInfo.insType }"><a href="${ctx }/userInfo/toEdit" style="text-decoration:none"></c:if>${currentUserName }<c:if test="${0 != userInfo.insType }"></a></c:if></li>
			<li>|</li>
			<li><a href="${ctx }/login/cancellation"><span class="glyphicon glyphicon-log-out"></span>退出</a></li></div>
		</c:if>
		<li>|</li>
		<li><a href="#"><span class="glyphicon glyphicon-question-sign"></span>帮助</a></li>
		<li>|</li>
		<li><a href="#" onclick="AddFavorite(window.location,document.title)"><span class="glyphicon glyphicon-star-empty"></span>加入收藏夹</a></li>
		<li>|</li>
		<li><a href="#" onclick="SetHome(this,window.location)"><span class="glyphicon glyphicon-home"></span>设为主页</a></li>
	</ul>
</div>
<div class="g-scroll-header">
	<div class="u-scroll-logo f-fl"><a href="${ctx }/search/toIndex"><img src="${ctx }/image/logo.gif" alt="项目网" title="项目网"></a></div>
	<div class="m-scroll-search f-fl">
		<div class="u-search-input f-fl" style='width:350px;'>
			<div class="u-search-select" onMouseOver="mopen('dropCate1');" onMouseOut="mclosetime();">
				<h1 class="f-ib"><c:if test="${2 == advancedQuery.str_titileOrContent}">全文</c:if><c:if test="${2 != advancedQuery.str_titileOrContent}">标题</c:if></h1><span class="glyphicon glyphicon-chevron-down"  onclick="mopen('dropCate1');"></span>
				<ul class="dropCate" id="dropCate1" style="visibility:hidden;">
					<li><a href="javascript:searchKeyWord(5, '1');">标题</a></li>
					<li><a href="javascript:searchKeyWord(5, '2');">全文</a></li>
				</ul>
			</div>
			 <input type="text" size="36" style='width:270px;' id="autocomplete1" name='autocomplete' value='${advancedQuery.str_query }' maxlength="50"/>
		</div>
		<div class="u-search-btn f-fl">
			<input type="button" value="搜索" onmousedown="this.className='u-search-btn-down'" onmouseout="this.className=''" onclick="searchKeyWord(1, '1');">
		</div>
		<c:if test="${'' != advancedQuery.str_query }">
		<div class="u-search-input f-fl" style='width:150px;margin-left:5px;'>
		  <input style='width:140px;' type="text" size="36" id="autocomplete2" name='autocomplete' value='${advancedQuery.str_query_second }' maxlength="50"/>
		</div>
		<div class="u-search-btn f-fl">
			<input type="button" value="结果中搜索" onmousedown="this.className='u-search-btn-down'" onmouseout="this.className=''" onclick="searchKeyWord(1.1, '2');">
		</div>
		  <script type="text/javascript">
		  	$(document).ready(function(){
		  		$( "#autocomplete2" ).autocomplete({
		  	      source: "${ctx}/hotWords/getHotWords",
		  	      minLength: 1,
		  	      maxLength:10,
		  	      change: function( event, ui ) {
		  	    	  $("#autocomplete2").val(this.value);
		  	      },
			      search: function() {
			    		return temp2;
				  }
		  		});
		  		$("#autocomplete2").focus(function(){
		  			temp2=true;
		  			$(document).keydown(function(event){ 
		  				//判断当event.keyCode 为13时（即ENTER键 
		  				if(event.keyCode == 13){ 
		  					searchKeyWord(1.1, '2');
		  				}
		  			});
		  	  	});
		  		$("#autocomplete1").keyup(function(){
		  			if ('' == $("#autocomplete1").val())
		  			{
		  				$("#autocomplete2").val('');
		  			}
		  		});
		  	});
		  </script>
		  </c:if>
	</div>
	<div class="u-scroll-href">
		<!-- <a id='lnk_subscription' href="javascript:mopen('s_user_name_menu-1');" onMouseOver="mopen('s_user_name_menu-1');" onMouseOut="mclosetime();"><span class="glyphicon glyphicon-eye-open"></span><br/>项目订阅</a> -->
		<a href="javascript:toURL('${ctx }/projectRadar/toList');"><span class="glyphicon glyphicon-dashboard"></span><br/>我的雷达</a>
		<a href="javascript:toURL('${ctx }/attention/attentionFProject');"><span class="glyphicon glyphicon-th"></span><br/>我的工程</a>
		<a href="javascript:toURL('${ctx }/attention/attentionProject');"><span class="glyphicon glyphicon-th-list"></span><br/>我的项目</a>
		<a href="javascript:toURL('${ctx }/focusEntrust/toList');" style='width:75px;'><span class="glyphicon glyphicon-book"></span><br/>我的委托单位</a>
		<a href="javascript:toURL('${ctx }/focusAgency/toList');" style='width:75px;'><span class="glyphicon glyphicon-briefcase"></span><br/>我的代理机构</a>
		<a href="javascript:toURL('${ctx }/browsingHistory/browsingHistory');" onMouseOver="mopen('u-scroll-downmenu');" onMouseOut="mclosetime();"><span class="glyphicon glyphicon-time"></span><br/>浏览记录</a>
		<div id="u-scroll-downmenu" onMouseOver="mcancelclosetime();" onMouseOut="mclosetime();" class="u-downmenu" style="visibility:hidden;">
			<ul class="u-downmenu-list">
				
			</ul>
			<div class="u-downmenu-foot">
				<a href="javascript:toURL('${ctx }/browsingHistory/browsingHistory');">查看更多>></a>
			</div>
			<span class="u-menu-arrow"></span>
		</div>
		<div id="s_user_name_menu-1" onMouseOver="mcancelclosetime();" onMouseOut="mclosetime();" class="s-user-set-menu menu-top" style="left: 55px; margin-top:10px;visibility:hidden;">
			<div>
				<a href="javascript:toURL('/project/projectSubsc/toInsert')">添加订阅</a>
				<a href="javascript:toURL('/project/projectSubsc/toList')">订阅管理</a>
			</div>
			<span class="menu-arrow"></span>
		</div>
	</div>
</div>
<div class="g-header g-header-mini f-pr" style="border-bottom-width:0px;">
	<div class="u-header-logo f-fl"><a href="${ctx }/search/toIndex"><img src="${ctx }/image/logo.gif" alt="项目网" title="项目网"></a></div>
	<div class="m-header-search f-fl">
		<div class="u-search-input f-fl" style='width:350px;'>
			<div class="u-search-select" onMouseOver="mopen('dropCate');" onMouseOut="mclosetime();">
				<h1 class="f-ib"><c:if test="${2 == advancedQuery.str_titileOrContent}">全文</c:if><c:if test="${2 != advancedQuery.str_titileOrContent}">标题</c:if></h1><span class="glyphicon glyphicon-chevron-down"  onclick="mopen('dropCate');"></span>
				<ul class="dropCate" id="dropCate" style="visibility:hidden;">
					<li><a href="javascript:searchKeyWord(5, '1');">标题</a></li>
					<li><a href="javascript:searchKeyWord(5, '2');">全文</a></li>
				</ul>
			</div>
			 <input type="text" size="36" style='width:270px;' id="autocomplete3" name='autocomplete' value='${advancedQuery.str_query }' maxlength="50"/>
		</div>
		<div class="u-search-btn f-fl">
			<input type="button" value="搜索" onmousedown="this.className='u-search-btn-down'" onmouseout="this.className=''" onclick="searchKeyWord(1, '3');">
		</div>
		<c:if test="${'' != advancedQuery.str_query }">
		<div class="u-search-input f-fl" style='width:150px;margin-left:5px;'>
		  <input style='width:140px;' type="text" size="36" id="autocomplete4" name='autocomplete' value='${advancedQuery.str_query_second }' maxlength="50"/>
		</div>
		<div class="u-search-btn f-fl">
			<input type="button" value="结果中搜索" onmousedown="this.className='u-search-btn-down'" onmouseout="this.className=''" onclick="searchKeyWord(1.1, '4');">
		</div>
		  <script type="text/javascript">
		  	$(document).ready(function(){
		  		$( "#autocomplete4" ).autocomplete({
		  	      source: "${ctx}/hotWords/getHotWords",
		  	      minLength: 1,
		  	      maxLength:10,
		  	      change: function( event, ui ) {
		  	    	  $("#autocomplete4").val(this.value);
		  	      },
			      search: function() {
			    		return temp4;
				  }
		  		});
		  		$("#autocomplete4").focus(function(){
		  			temp4=true;
		  			$(document).keydown(function(event){ 
		  				//判断当event.keyCode 为13时（即ENTER键 
		  				if(event.keyCode == 13){ 
		  					searchKeyWord(1.1, '4');
		  				}
		  			});
		  	  	});
		  		$("#autocomplete3").keyup(function(){
		  			if ('' == $("#autocomplete3").val())
		  			{
		  				$("#autocomplete4").val('');
		  			}
		  		});
		  	});
		  </script>
		  </c:if>
	</div>
	<div class="u-header-href">
		<!-- <a id='lnk_subscription' href="javascript:mopen('s_user_name_menu-2');" onMouseOver="mopen('s_user_name_menu-2');" onMouseOut="mclosetime();"><span class="glyphicon glyphicon-eye-open"></span><br/>项目订阅</a> -->
		<a href="javascript:toURL('${ctx }/projectRadar/toList');"><span class="glyphicon glyphicon-dashboard"></span><br/>我的雷达</a>
		<a href="javascript:toURL('${ctx }/attention/attentionFProject');"><span class="glyphicon glyphicon-th"></span><br/>我的工程</a>
		<a href="javascript:toURL('${ctx }/attention/attentionProject');"><span class="glyphicon glyphicon-th-list"></span><br/>我的项目</a>
		<a href="javascript:toURL('${ctx }/focusEntrust/toList');" style='width:75px;'><span class="glyphicon glyphicon-book"></span><br/>我的委托单位</a>
		<a href="javascript:toURL('${ctx }/focusAgency/toList');" style='width:75px;'><span class="glyphicon glyphicon-briefcase"></span><br/>我的代理机构</a>
		<a href="#" onMouseOver="mopen('u-downmenu');" onMouseOut="mclosetime();"><span class="glyphicon glyphicon-time"></span><br/>浏览记录</a>
		<div id="u-downmenu" onMouseOver="mcancelclosetime();" onMouseOut="mclosetime();" class="u-downmenu" style="visibility:hidden;">
			<ul class="u-downmenu-list">
				
			</ul>
			<div class="u-downmenu-foot">
				<a href="javascript:toURL('${ctx }/browsingHistory/browsingHistory');">查看更多>></a>
			</div>
			<span class="u-menu-arrow"></span>
		</div>
		<!-- 
		<div id="s_user_name_menu-2" onMouseOver="mcancelclosetime();" onMouseOut="mclosetime();" class="s-user-set-menu menu-top" style="left: 55px; margin-top:10px;visibility:hidden;">
			<div>
				<a href="javascript:toURL('${ctx }/projectSubsc/toInsert')">添加订阅</a>
				<a href="javascript:toURL('${ctx }/projectSubsc/toList')">订阅管理</a>
			</div>
			<span class="menu-arrow"></span>
		</div>
		 -->
	</div>
</div>