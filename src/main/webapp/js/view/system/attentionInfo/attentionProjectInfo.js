// 设置链接加关键字
$(document).ready(function(){
	var keyword = encodeURI(encodeURI($('#keywords').val()));
	var str_query_second = encodeURI(encodeURI($('#str_query_second').val()));
	$("a[name='ann']:eq(0)").click(function(){
		$(this).attr('href', $(this).attr('href') + $('#annouId').val() + '&keywords=' + keyword + '&str_query_second=' + str_query_second);
	});
	// 加载浏览记录
	refreshHostory();
	// 设置公告选中
	if ('' == $('#annouId').val())
	{
		$("li[id^='li']:eq(0)").css('color', null);
		$("li[id^='li']:eq(0)").css('color', 'red');
	}
	else
	{
		$("li[id^='li']").each(function(){
			var id = $(this).attr('id').substring(2, $(this).attr('id').length);
			if (id == $('#annouId').val())
			{
				$(this).css('color', null);
				$(this).css('color', 'red');
				return false;
			}
		}); 
	}
	
});

function showLogin1()
{
	showLogin();
	// 重新定位登录参数
	$('#dir').val("noticeInfo");
}

function toProject(url)
{
	var keyword = encodeURI(encodeURI($('#keywords').val()));
	var str_query_second = encodeURI(encodeURI($('#str_query_second').val()));
	url += '&keywords=' + keyword + '&str_query_second=' + str_query_second;
	if ('' != $('#currentUserName').val())
	{
		window.open(ctx + url);
	}
	else
	{
		showLogin();
		$('#dir').val(url);
	}
}
// 关注和取消分包
function changeAttenation(thisStr,subId){
	if ('' != $('#currentUserName').val())
	{
		var flag;
		if($(thisStr).attr("checked")=='checked'){
			flag=1;
		}else{
			flag=2;
		}
		$.ajax({
         	 type: "POST",
   	         url: ctx + "/attention/attentionCancelSub?flag="+flag+"&projectId="+$("#projectId").val()+"&subId="+subId,
   	         //dataType: "json",
   	         contentType: "application/x-www-form-urlencoded; charset=utf-8",
   	         success: function (data) {
   	        	 if(data != null && data != ''){
   	        		if(data == "success"){
   	        			if(flag==1){
   	        				alert("关注分包成功");
   	        			}else{
   	        				alert("取消分包关注成功");
   	        			}
   	        			refreshPage();
   	        		}
   	        	 }
   	         }
         });
	}
	else
	{
		showLogin();
		$('#dir').val($(thisStr).parent().attr('id'));
		if($(thisStr).attr("checked")=='checked')
		{
			$(thisStr).removeAttr("checked");
		}
		else
		{
			$(thisStr).attr("checked", "checked");
		}
	}
}
// 获取公告内容
function getAnnounce(annouId)
{
	if ('' != $('#currentUserName').val())
	{
		$("li[id^='li']").css('color', null);
		$("#li" + annouId).css('color', 'red');
		$.ajax({
         	 type: "POST",
   	         url: ctx + "/annou/connInfo?conAnn.annouId="+annouId,
   	         dataType: "json",
   	         contentType: "application/x-www-form-urlencoded; charset=utf-8",
   	         success: function (data) {
   	        	 if(data != null && data != ''){
   	        		var obj = eval(data);
   	        		$('#annouId').val(obj[0].id);
   	        		$("#title").html(obj[0].title);
   	        		$("#annouContent").html(obj[0].content);
   	        		$("#sourceUrl").html("公告来源网站：<a href='"+obj[0].sourceUrl+"' target=\"_blank\">"+obj[0].sourceSite+"</a>");
   	        		$("#focusSubTable tr td").remove();
   	        		if (0 < obj[0].subList.length)
   	        		{
   	        			var tableHtml = "<tr>\n<td style='width:10%;border:0;margin:0;padding:0;text-align:right;'>关注标段：</td>\n";
   	        			for (var i = 0; i < obj[0].subList.length; i++)
   	        			{
   	        				var sub = obj[0].subList[i];
   	        				var subSize = (i + 1) % 4;
   	        				tableHtml += "<td style='width:";
   	        				if (i + 1 == obj[0].subList.length)
   	        				{
   	        					tableHtml += (5 - subSize) * 22;
   	        				}
   	        				else
   	        				{
   	        					tableHtml += 22;
   	        				}
							tableHtml += "%;border:0;margin:0;padding:0;'";
							if (i + 1 == obj[0].subList.length)
							{
								tableHtml += "colspan='" + (5 - subSize);
							}
							tableHtml += ">\n<input type='hidden' name='subId' value='" + sub.subId + "'/>\n";
							tableHtml += "<div id='subLabel" + (i + 1) + "'><input type='checkbox' onclick=\"changeAttenation(this,'" + sub.subId + "')\" value='" + sub.subId + "'";
							if ('' != sub.foucusId)
							{
								tableHtml += " checked='checked' ";
							}
							tableHtml += "/>&nbsp;<button class='btn btn-xs btn-primary f-toe' style='text-align:left;text-indent:5px;max-width:165px;min-width:80px;padding-right:0px;padding-left:0px;' type='button' onclick='chgSub(this);' title='" 
								+ sub.subName + "'>" + sub.subName + "</button></div>\n</td>";
							if (0 == subSize)
							{
								tableHtml += "</tr><tr><td style='border:0;margin:0;padding:0;'>&nbsp;</td>";
							}
						}
   	        			tableHtml += "</tr>";
   	        			$("#focusSubTable").html(tableHtml);
   	        		}
   	        	 }
   	         }
         });
	}
	else
	{
		showLogin();
		$('#dir').val('li' + annouId);
	}
}

function refreshPage()
{
	var keyword = encodeURI(encodeURI($('#keywords').val()));
	var str_query_second = encodeURI(encodeURI($('#str_query_second').val()));
	window.location.href = ctx + "/attention/attentionProjectInfo?annouId=" + $('#annouId').val() + "&projectId=" + $('#projectId').val() + '&keywords=' + keyword + '&str_query_second=' + str_query_second;
}

// 关注 项目 工程
function attentionProject(flag,projectId){
	if ('' != $('#currentUserName').val())
	{
		$.ajax({
         	 type: "POST",
   	         url: ctx + "/attention/focusAttention?chkValue="+projectId,
   	         //dataType: "json",
   	         contentType: "application/x-www-form-urlencoded; charset=utf-8",
   	         success: function (data) {
   	        	 if(data != null && data != ''){
   	        		 if(data=="success"){
   	        			 if(flag==2){
   	        			 	 alert("关注项目成功");
   	        			 	$("#proLabel2").html("<button type='button' class=\"btn btn-xs btn-danger\" onclick=\"cancelProject(2,"+projectId+");\">取消关注项目</button>");
   	        			 	refreshPage();
   	        			 }else{
   	        			 	 alert("关注工程成功");
   	        			 	$("#proLabel1").html("<button type='button' class=\"btn btn-xs btn-danger\" onclick=\"cancelProject(1,"+projectId+");\">取消关注工程</button>");
   	        			 }
   	        		 }
   	        		if(data=="fail"){
   	        			 alert("关注失败");
   	        		 }
   	        	 }
   	         }
         });
	}
	else
	{
		showLogin();
		$('#dir').val('proLabel' + flag);
	}
	return false;
}
// 取消项目 工程
function cancelProject(flag,projectId){
	if ('' != $('#currentUserName').val())
	{
		$.ajax({
         	 type: "POST",
   	         url: ctx + "/attention/focusCancel?conFoucsPro.projectId="+projectId,
   	         //dataType: "json",
   	         contentType: "application/x-www-form-urlencoded; charset=utf-8",
   	         success: function (data) {
   	        	 if(data != null && data != ''){
   	        		 if(data=="success"){
   	        			 alert("取消关注成功");
   	        			 if(flag==2){
   	        			  	$("#proLabel2").html("<button type='button' class=\"btn btn-xs btn-success\" onclick=\"attentionProject(2,"+projectId+");\">关注项目</button>");
   	        			 	refreshPage();
   	        			 }else{
   	        			 	$("#proLabel1").html("<button type='button' class=\"btn btn-xs btn-success\" onclick=\"attentionProject(1,"+projectId+");\">关注工程</button>");
   	        			 }
   	        		 }
   	        		if(data=="fail"){
   	        			 alert("取消失败");
   	        		 }
   	        	 }
   	         }
         });
	}
	else
	{
		showLogin();
		$('#dir').val('proLabel' + flag);
	}
}
$(function(){
	$(".m-rightcon").width($(window).width() - 400);
	$('.addMark').mouseover(function(){
		if(!$(this).hasClass('marked')){
			$(this).children('span').attr("class","glyphicon glyphicon-star");
		}
	})
	$('.addMark').mouseout(function(){
		if(!$(this).hasClass('marked')){
			$(this).children('span').attr("class","glyphicon glyphicon-star-empty");
		}
	})
	$('.addMark').click(function(){
		if ('' == $('#currentUserName').val())
		{
			showLogin();
			$('#dir').val($(this).attr('id'));
			return;
		}
		if (!$(this).hasClass('marked'))
		{	
			// 关注
			var val = $(this).children('input').eq(1);
			$(this).children('span').attr("class","glyphicon glyphicon-star");
			$(this).addClass('marked');
			if ('entrustUnitId' == val.attr('id'))
			{
				focus(ctx + '/focusEntrust/doAdd?entrustUnitId=' + val.val(), '关注委托单位', 'fEntrustUnitId');
			}
			else
			{
				focus(ctx + '/focusAgency/doAdd?agencyId=' + val.val(), '关注代理机构', 'fAgencyId');
			}
		}
		else
		{
			// 取消关注
			var val = $(this).children('input').eq(0);
			$(this).children('span').attr("class","glyphicon glyphicon-star-empty");
			$(this).removeClass('marked');
			if ('fEntrustUnitId' == val.attr('id'))
			{
				focus(ctx + '/focusEntrust/doDel?fEntrustUnitIds=' + val.val(), '取消关注委托单位', '');
			}
			else
			{
				focus(ctx + '/focusAgency/doDel?fAgencyIds=' + val.val(), '取消关注代理机构', '');
			}
		}
	});
	
	function focus(url, message, id)
	{
		$.ajax({
         	 type: "POST",
   	         url: url,
   	         dataType: "json",
   	         success: function (data) {
   				var obj = eval(data);
	        		if(obj[0].message=="success"){
	        			 alert(message + "成功");
	        			 if ('' != id && '' != obj[0].id)
	        			 {
	        				 $('#' + id).val(obj[0].id);
	        			 }
	        		}
	        		else if(obj[0].message=="repeat"){
	        			alert('已' + message + '，无需重复操作');
	        		}
	        		else 
	        		{
	        			 alert(message + "失败");
	        		}
   	         }
         });
	}
	$('.open').toggle(
		function(){
			$(this).parent('.u-con-line').css('height', 'auto');
			$(this).html('[收起]').attr('title', '收起详细内容');
		},
		function(){
			$(this).parent('.u-con-line').css('height', '25px');
			$(this).html('[展开]').attr('title', '展开详细内容');
		}

	)

	$(".tooltip").each(function(){
		var len = ($(this).parents('.u-pro-wrap').width() - $(this).width())/2
		$(this).css('left', len);
	})

	$('.m-float').height($('.m-float-wrap').height() + 45);
	$('.m-float-wrap').width($('.m-float').width());
	var oDiv=document.getElementById("float");
	var H=0,iE6;
	var Y=oDiv;
	while(Y){H+=Y.offsetTop;Y=Y.offsetParent};
	iE6=window.ActiveXObject&&!window.XMLHttpRequest;
	if(!iE6){
	   window.onscroll=function()
	   {
	       var s=document.body.scrollTop||document.documentElement.scrollTop;
	       if(s>(H-36)){oDiv.className="m-float-wrap u-float-1 u-float-2";if(iE6){oDiv.style.top=(s-H)+"px";}}
	           else{oDiv.className="m-float-wrap u-float-1";}
	   };
	}

	$('.dropCate li a').click(function(){
		$('.u-search-select h1').html($(this).html());
	});
	
	$(".u-pro-wrap").mouseover(function(){
		$(this).children(".tooltip").show();
	}).mouseout(function(){
		$(this).children(".tooltip").hide();
	});
});

function chgSub(val)
{
	var chk = $(val).prev();
	if(chk.attr("checked")=='checked')
	{
		chk.removeAttr("checked");
	}
	else
	{
		chk.attr("checked", "checked");
	}
	chk.click();
}