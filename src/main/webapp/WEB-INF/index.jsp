<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head>
  <meta http-equiv="X-UA-Compatible" content="IE=8" />
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
  <meta http-equiv="expires" content="0" />
  <link rel="stylesheet" href="${ctx }/css/style.css" />
  <link rel="stylesheet" href="${ctx }/css/common_new.css" />
  <link href="${ctx }/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet">
  <script src="${ctx }/js/jquery-1.7.2.min.js" type="text/javascript"></script>
  <script src="${ctx }/js/jquery-ui-1.10.4.custom.js"></script>
  <style type="text/css">
  	.u-header-href{ position: absolute; width: auto; height: 50px; right: 10px; top: 20px;}
	.u-header-href a{ display: inline-block; width: 55px; height: 50px; text-align: center; font-size: 12px;}
	.u-header-href span{ font-size: 20px; padding-bottom: 10px;}
	.u-downmenu{ position: absolute; width: 280px; right: 13px; height: auto; padding-top: 10px; background: #ffffff; border: 1px solid #cccccc; z-index: 1000;}
	.u-downmenu-list{ width: 100%; height: auto;}
	.u-downmenu-list li{ width:276px; padding: 0px 8px; height: 26px; line-height: 26px;}
	.u-downmenu-list li a{ display: inline; text-indent: 8px;}
	.u-downmenu-list li:hover a{ color: #699f00;}
	.u-downmenu-list li:hover .u-close{ color: #ff0000; cursor: pointer; font-weight: bold;}
	.u-downmenu-list li a span{ font-size: 12px;}
	.u-downmenu-list li:hover{ background-color: #f2f2f2; color: #699f00;}
	.u-downmenu-foot{ width: 100%; height: 25px; margin-top: 10px; line-height: 25px; background: #f2f2f2; border-top: 1px solid #cccccc; text-align: center;}
	.u-downmenu-foot a{ display: inline;}
	.u-menu-arrow{display: inline-block;height: 2px; _margin-top: -10px;position: absolute;top: -7px; right: 10px; _top: 10px;height: 6px;width: 11px;background: url(../image/menu_sprite.png) no-repeat -21px -90px;}
  	.glyphicon {
	  position: relative;
	  top: 2px;
	  display: inline-block;
	  font-family: 'Glyphicons Halflings';
	  font-style: normal;
	  font-weight: normal;
	  line-height: 1;
	
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.glyphicon-file:before {
	  content: "\e022";
	}
	
	
	/* 顶部工具栏 */
	.g-toolbar{ position: fixed; top: 0px; left: 0px; z-index: 100; width: 100%; height: 35px}
	.m-toolbar-link{ width: auto; height: 35px; line-height: 35px; padding-right: 15px;}
	.m-toolbar-link li{ display: inline-block; padding: 0px 2px; color: #6C6C6C;}
	.m-toolbar-link li a{ color: #6C6C6C;}
	.m-toolbar-link li a:hover{ color: #2479ce;}
	.m-toolbar-link li a span{ padding-right: 3px;}
	
	/* tooltip */
	.u-pro-wrap{ height: 60px; text-indent: 0px;}
	.tooltip{position: absolute; display: inline-block;opacity: 1; left: 0px; top: 38px;}
	.tooltip-arrow{top: -5px;left: 50%;margin-left: -5px;border-width: 0 5px 5px;border-color: transparent;border-bottom-color: #f7f7f9;position: absolute;width: 0;height: 0;border-style: solid;}
	.tooltip-inner{ display: inline-block; width: auto!important; width: 120px; max-width: 120px;padding: 3px 8px;color: #666666;text-align: center;text-decoration: none;background-color: #f0f0f0;border-radius: 4px;white-space:nowrap;margin-left:10px;}
  </style>
  <script type="text/javascript">
	 var ctx = '${ctx}';
	 
	function charOmit(str){
		if(str.length>4)
			document.write(str.substr(0,4)+"...");
		else
			document.write(str);
	}
  </script>
  <script src="${ctx }/js/common.js" type="text/javascript"></script>
  <script src="${ctx }/js/view/system/loginInfo/index.js?v=${uuid}" type="text/javascript"></script>
  <title>ElasticSearch</title>
 </head>
 <body>
	<div class="container" style="width:auto;">
		<div style="height:200px;"></div>
		<div style="clear:both; float:none"></div>
		<div style="width:100%; text-align:center;">
			<img src="${ctx }/image/baidu.jpg"></img>
		</div>
		<div class="clearleft">
			<form id='searchForm' method='post'>
				<input type="hidden" id='annouName' name="str_query">
				<input id="autocomplete" type="text" style="width:560px;height:39px;line-height:39px;font-size:18px;border:1px solid #b8b8b8;" maxlength="50"></input>
				<input type="button" style="width:100px;height:40px;font-size:18px;" value="搜索一下" onclick="search('');"></input>
			</form>
		</div>
	</div>
 </body>
</html>
