$(function(){
	$(".g-main").css("minHeight", ($(window).height()-$('.g-header').height()-$('.g-footer').height()-7))
})
// top收缩
function showHide(flag){
	if(flag==1){
		$("#showHide").html("<a href='javascript:showHide(2)'><img src=\""+PATH+"/image/top-1.png\"/></a>");
		$(".g-header").hide();
	}else{
		$("#showHide").html("<a href='javascript:showHide(1)'><img src=\""+PATH+"/image/top-2.png\"/></a>");
		$(".g-header").show();
	}
}

// 显示登录框
function showLogin() 
{ 
	if ('login_old' != $('#dir').val())
	{
		$('#dir').val('login');
	}
	loginIframe.window.chgVerifyCode();
	var myAlert = document.getElementById("login"); 
	myAlert.style.display = "block"; 
	myAlert.style.position = "absolute"; 
	myAlert.style.top = "30%"; 
	myAlert.style.left = "40%"; 
	myAlert.style.marginTop = "-75px"; 
	myAlert.style.marginLeft = "-75px";
	
	var mybg=document.getElementById("mybg");
	if(mybg){
		mybg.style.display = "block"; 
	}else{
		mybg = document.createElement("div"); 
		mybg.setAttribute("id","mybg"); 
		mybg.style.background = "#000"; 
		mybg.style.width = "100%"; 
		mybg.style.height = $(window).height()>$("body").height()?$(window).height():$("body").height()+'px'; 
		mybg.style.position = "absolute"; 
		mybg.style.top = "0"; 
		mybg.style.left = "0"; 
		mybg.style.zIndex = "2000"; 
		mybg.style.opacity = "0.3"; 
		mybg.style.filter = "Alpha(opacity=30)"; 
		document.body.appendChild(mybg);
	}
}
//将登录框隐藏
function closeLogin()
{
	var myAlert = parent.document.getElementById("login"); 
	var mybg = parent.document.getElementById("mybg"); 
	myAlert.style.display = "none"; 
	mybg.style.display = "none"; 
}

//显示注册
function showReg() 
{ 
	var myAlert = document.getElementById("register"); 
	myAlert.style.display = "block"; 
	myAlert.style.position = "absolute"; 
	myAlert.style.top = "30%"; 
	myAlert.style.left = "30%"; 
	myAlert.style.marginTop = "-75px"; 
	myAlert.style.marginLeft = "-75px";
	
	var mybg=document.getElementById("mybg");
	if(mybg){
		mybg.style.display = "block"; 
	}else{
		mybg = document.createElement("div"); 
		mybg.setAttribute("id","mybg"); 
		mybg.style.background = "#000"; 
		mybg.style.width = "100%"; 
		mybg.style.height = $(window).height()>$("body").height()?$(window).height():$("body").height()+'px'; 
		mybg.style.position = "absolute"; 
		mybg.style.top = "0"; 
		mybg.style.left = "0"; 
		mybg.style.zIndex = "2000"; 
		mybg.style.opacity = "0.3"; 
		mybg.style.filter = "Alpha(opacity=30)"; 
		document.body.appendChild(mybg);
	}
}
//将注册框隐藏
function closeReg(){
	var myAlert = parent.document.getElementById("register"); 
	var mybg = parent.document.getElementById("mybg"); 
	myAlert.style.display = "none"; 
	mybg.style.display = "none"; 
}

// 跳转页面前验证是否登录
function toURL(url)
{
	if ('' != $('#currentUserName').val())
	{
		window.location.href=url;
	}
	else
	{
		showLogin();
		$('#dir').val(url.split('project/')[1]);
	}
}

function genTimestamp(){
	var time = new Date();
	return time.getTime();
}

/**
 *菜单下拉
 */
var timeout = 100;
var closetimer= 0;
var ddmenuitem = 0;
function mopen(id)
{
    mcancelclosetime();
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.visibility = 'visible';
}
function mclose()
{
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}
function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}
document.onclick = mclose;


function getStrLeng(str){
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for(var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) { 
            realLength += 1;
        }else{ 
            // 如果是中文则长度加2
            realLength += 2;
        }
    } 
    return realLength;
}

function subStr(thisVal,strLength){
	if($(thisVal).val() != '' && $(thisVal).val().length>strLength){
		$(thisVal).val($(thisVal).val().substring(0,strLength));
		alert("字符输入太长，计算机已自动截取");
	}
}
// 验证URL路径是否访问不到
function getURL(url)
{
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    if (xmlhttp.readyState==4)
    {
    	if (xmlhttp.Status==200)
    	{
    		return true;
    	}
    	else 
    	{
    		return false;
    	}
    }
    return false;
}

//加入收藏 <a onclick="AddFavorite(window.location,document.title)">加入收藏</a>
function AddFavorite(sURL, sTitle){
   try{
       window.external.addFavorite(sURL, sTitle);
   }catch (e){
       try{
           window.sidebar.addPanel(sTitle, sURL, "");
       }catch (e){
           alert("加入收藏失败，请使用Ctrl+D进行添加");
       }
   }
}
//设为首页 <a onclick="SetHome(this,window.location)">设为首页</a>
function SetHome(obj,vrl){
   try{
      obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
   }catch(e){
      if(window.netscape){
          try{
                  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
          }catch (e) {
                  alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
          }
          var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
          prefs.setCharPref('browser.startup.homepage',vrl);
       }else{
       	 alert("此操作被浏览器拒绝！");
       }
   }
}

//查询信息
function searchKeyWord(type){
	switch (type){
		// 关键词搜索
		case 1:
			keyword = $("#autocomplete").val();
			$('#annouName').val($.trim(keyword));
			break;
	}
	if ('' != $('#annouName').val()){
		var url = ctx+"/search/result";
	 	$("#searchForm").attr("action", url);
		$('#searchForm').submit();
	}
}

function refreshHostory()
{
	$.ajax({
   	 type: "POST",
        url: ctx + "/browsingHistory/ajaxBrowsingHistoy",
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
       				html += "<li><a href=\"" + ctx + "/attention/attentionProjectInfo?annouId="+obj[i].annouId+"&projectId=" + obj[i].projectId + "\" target=\"_blank\" style='font-size:12px;color:#333333;text-decoration:none'><div class=\"glyphicon glyphicon-file\"></div> "+title+"</a></li>";
       			}
       			else
       			{
       				html += "<li><a href=\"" + ctx + "/search/toSnapshot?annouId="+obj[i].annouId+"\" target=\"_blank\" style='font-size:12px;color:#333333;text-decoration:none'><div class=\"glyphicon glyphicon-file\"></div> "+title+"</a></li>";
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
}