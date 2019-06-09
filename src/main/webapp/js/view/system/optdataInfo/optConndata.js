var notice={};
//复制文本内容
notice.copyText=function(){
	$('input[type=text]').focusin(function() {
		if ('entrustPersonName' == $(this).attr('id') || 'agencyPersonName' == $(this).attr('id')){
			$(this).val($(this).val() + $.trim(text.replace(/\s+/g,"")));
		}else if(this.title=='double' && $.trim(text) != ''){
			var reg = /^[\u4E00-\u9FA5]+$/;
			if(reg.test(text)){ //全中文
				if(aNumber($.trim(text)) != null && aNumber($.trim(text)) !=""){
					$(this).val(fmoney(aNumber($.trim(text))/10000,2));
				}
			}else if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){//包含数字和中文
				text = $.trim(text).substring(0,$.trim(text).length-1);
				text = fmoney(text,2);
				if(text != null && text != ""){
					$(this).val(fmoney(text,2));
				}
			}else{ //纯数字
				$(this).val(fmoney($.trim(text)/10000,2));
			}
			text = ''; // 清空
		    $(this)[0].focus();
		    return false;
		}else if(this.title=='double2' && $.trim(text) != ''){
			var reg = /^[\u4E00-\u9FA5]+$/;
			if(reg.test(text)){ //全中文
				if(aNumber($.trim(text)) != null && aNumber($.trim(text)) !=""){
					$(this).val(fmoney(aNumber($.trim(text)),2));
				}
			}else{ //纯数字
				$(this).val(fmoney($.trim(text),2));
			}
			text = ''; // 清空
		    $(this)[0].focus();
		    return false;
		}else{
			$(this).val($(this).val() + $.trim(text));
		}
		text = ''; // 清空
	});
}

notice.labelReplace=function(){
	if($.trim(text) != ''){
		if(!isNaN($.trim(text))){
			if(fmoney($.trim(text),2) != null && fmoney($.trim(text),2) != ""){
				$(this).next().val(fmoney($.trim(text),2));
			}
			text = ''; // 清空
		}
	}
}

notice.labelGroup = function(){
	if($.trim(text) != ''){
		$(this).next().val($.trim(text));
		text = '';
	}
}

notice.labelDate = function(){
	if($.trim(text) != ''){
		$(this).next().val(formatDate($.trim(text)));
		text = '';
	}
}

$(document).keyup(function(event){
	var e = event || window.event; 
	var k = e.keyCode || e.which;
	//var id=$("input:focus").attr("id");   keyup
	//$("#"+id).val("");//清空
	if(k==48 && $.trim(text) != ''){//工程名称0
		$("#projectName_").val($.trim(text));
		$("#projectName_").autocomplete( "search");
		text = ''; // 清空
		$("#projectName_")[0].focus();
	}else if(k==57 && $.trim(text) != ''){//工程简介
		$("#projectRemark").val($.trim(text));
		text = ''; // 清空
		$("#projectRemark")[0].focus();
	}else if(k==49 && $.trim(text) != ''){//项目名称1
		$("#projectName2").val($.trim(text));
		$("#projectName2").autocomplete( "search");
		text = ''; // 清空
		$("#projectName2")[0].focus();
	}else if(k==50 && $.trim(text) != ''){//项目编号2
		$("#projectNum").val($.trim(text));
		$("#projectNum").autocomplete( "search");
		text = ''; // 清空
		$("#projectNum")[0].focus();
	}else if(k==51 && $.trim(text) != ''){//资金规模3
		var reg = /^[\u4E00-\u9FA5]+$/;
		if(reg.test(text)){ //全中文
			if(aNumber($.trim(text)) != null && aNumber($.trim(text)) !=""){
				$("#fundScale").val(fmoney(aNumber($.trim(text))/10000,2));
			}
		}else if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){//包含数字和中文
			text = $.trim(text).substring(0,$.trim(text).length-1);
			text = fmoney(text,2);
			if(text != null && text != ""){
				$("#fundScale").val(fmoney(text,2));
			}
		}else{ //纯数字
			$("#fundScale").val(fmoney($.trim(text)/10000,2));
		}
		text = ''; // 清空
		$("#fundScale")[0].focus();
	}else if(k==52 && $.trim(text) != ''){//建筑面积4
		if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){ //包含数字和中文
			text = $.trim(text).substring(0,$.trim(text).length-1);
			$("#buildArea").val($.trim(text)*10000);
		}else{
			$("#buildArea").val($.trim(text));
		}
		text = ''; // 清空
		$("#buildArea")[0].focus();
	}else if(k==53 && $.trim(text) != ''){//文件发售截止时间5
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#fileSaleEndDate").val(formatDate($.trim(text)));
		}
	}else if(k==54 && $.trim(text) != ''){//现场勘探时间6
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#sceneExploreDate").val(formatDate($.trim(text)));
		}
	}else if(k==55 && $.trim(text) != ''){//开标时间7
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#openBidDate").val(formatDate($.trim(text)));
		}
	}else if(k==81 && $.trim(text) != ''){//标段编号
		var flag=0;
		$("input:text[id^='subNo']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('bd',0,3, 0);
			$("input:text[id^='subNo']:last").val($.trim(text));
		}
	}else if(k==87 && $.trim(text) != ''){//标段名称
		var flag=0;
		$("input:text[id^='subName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('bd',0,3, 0);
			$("input:text[id^='subName']:last").val($.trim(text));
		}
	}else if(k==69 && $.trim(text) != ''){//标段招标金额
		var flag=0;
		$("input:text[id^='fundScale_']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   if(!isNaN($.trim(text))){
					if(fmoney($.trim(text),2) != null && fmoney($.trim(text),2) != ""){
						$(this).val(fmoney($.trim(text),2));
					}
					text = ''; // 清空
					$(this)[0].focus();
					return false;
			   }
		   }
		});
		if(flag == 0){
			add('bd',0,3, 0);
			if(!isNaN($.trim(text))){
				if(fmoney($.trim(text),2) != null && fmoney($.trim(text),2) != ""){
					$("input:text[id^='fundScale_']:last").val(fmoney($.trim(text),2));
				}
				text = ''; // 清空
				$("input:text[id^='fundScale_']:last")[0].focus();
			}
		}
	}else if(k==82 && $.trim(text) != ''){//标的物
		var flag=0;
		$("input:text[id^='productTypeName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('bdw',0,4,0);
			$("input:text[id^='productTypeName']:last").val($.trim(text));
		}
	}else if(k==65 && $.trim(text) != ''){//委托单位名称
		var flag=0;
		$("input:text[id^='entrustName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('wt',2,1, 0);
			$("input:text[id^='entrustName']:last").val($.trim(text));
		}
	}else if(k==83 && $.trim(text) != ''){//委托联系人名称
		var flag=0;
		$("input:text[id^='entrustPersonName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text.replace(/\s+/g,"")));// 去除所有空格     去除所有空格replace(/^\s+|\s+$/g,"")
			   return false;
		   }
		});
		if(flag == 0){
			add('wtlxr',1,1,0);
			$("input:text[id^='entrustPersonName']:last").val($.trim(text.replace(/\s+/g,"")));
		}
	}else if(k==68 && $.trim(text) != ''){//委托联系人联系方式
		var flag=0;
		$("input:text[id^='entrustTelePhone']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('wtlxr',1,1,0);
			$("input:text[id^='entrustTelePhone']:last").val($.trim(text));
		}
	}else if(k==90 && $.trim(text) != ''){//代理机构名称
		var flag=0;
		$("input:text[id^='agencyName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('dl',2,2, 0);
			$("input:text[id^='agencyName']:last").val($.trim(text));
		}
	}else if(k==88 && $.trim(text) != ''){//代理机构联系人名称
		var flag=0;
		$("input:text[id^='agencyPersonName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text.replace(/\s+/g,"")));
			   return false;
		   }
		});
		if(flag == 0){
			add('dllxr',1,2,0);
			$("input:text[id^='agencyPersonName']:last").val($.trim(text.replace(/\s+/g,"")));
		}
	}else if(k==67 && $.trim(text) != ''){//代理机构联系人电话
		var flag=0;
		$("input:text[id^='agencyTelePhone']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('dllxr',1,2,0);
			$("input:text[id^='agencyTelePhone']:last").val($.trim(text));
		}
	}
	text = ''; // 清空
}); 

//初始化函数
$(function() {
	$("#area").suggest(citys, {
		hot_list : commoncitys,
		attachObject : '#suggest',
		visarea : 'openBidArea', // 级联地区
		province : 'province', // 级联省级名称
		provinceNum : 'newProvince' // 级联省级编号
	});
	$("#openBidArea").suggest(citys, {
		hot_list : commoncitys,
		attachObject : '#suggest2',
		visarea : 'area',
		province : 'openBidProvince',
		provinceNum : 'openBidProvinceNum'
	});
});

// 提交公告信息
function openMask() {
	if ($("#projectName2").val() == '') {
		alert('项目名称不能为空');
		return;
	}
	if ($("#publishDate").val() == '') {
		alert('发布时间不能为空');
		return;
	}
	if ($("#province").val() == '' || $("#area").val() == '') {
		alert('地区不能为空');
		return;
	}
	
	if(confirm('确定提交该操作?')){
		$("#annouSubmit").attr("disabled", true);
		var loadi = layer.load('数据处理中，请稍后...');
		var actionUrl = PATH+"/optdata/submitProject";
		// 委托单位
		/*var name = "";
		$("input[id=name]").each(function(n, obj) {
			var tmp = $(obj).val();
			if (tmp != null && tmp != "") {
				name += tmp + ";";
			}
		});
		name = name.substring(0, name.length - 1);*/
		// 代理机构
		/*var agencyName = "";
		$("input[id=agencyName]").each(function(n, obj) {
			var tmp = $(obj).val();
			if (tmp != null && tmp != "") {
				agencyName += tmp + ";";
			}
		});
		agencyName = agencyName.substring(0, agencyName.length - 1);*/
		// 工程名称
		//var projectName_ = $("#projectName_").val();
		// 项目名称
		//var projectName = $("#projectName").val();
		// 项目编号
		//var projectNum = $("#projectNum").val();
		// 标段名称
		/*var subNo = "";
		$("input[id=subNo]").each(function(n, obj) {
			var tmp = $(obj).val();
			if (tmp != null && tmp != "") {
				subNo += tmp + ";";
			}
		});
		subNo = subNo.substring(0, subNo.length - 1);*/
		// 标段编号
		/*var subName = "";
		$("input[id=subName]").each(function(n, obj) {
			var tmp = $(obj).val();
			if (tmp != null && tmp != "") {
				subName += tmp + ";";
			}
		});
		subName = subName.substring(0, subName.length - 1);*/
		// 资金规模
		//var fundScale = $("#fundScale").val();
		// 建筑面积
		//var buildArea = $("#buildArea").val();
		// 标的物
		/*var productTypeName = "";
		$("input[id=productTypeName]").each(function(n, obj) {
			var tmp = $(obj).val();
			if (tmp != null && tmp != "") {
				productTypeName += tmp + ";";
			}
		});
		productTypeName = productTypeName.substring(0, productTypeName.length - 1);*/
		// 发布时间
		//var publishDate = $("#publishDate").val()
		// 文件发售截止时间
		//var fileSaleEndDate = $("#fileSaleEndDate").val();
		// 现场勘探时间
		//var sceneExploreDate = $("#sceneExploreDate").val();
		// 文件发售截止时间
		//var openBidDate = $("#openBidDate").val();
		//公告子类型
		var annousSonType=$(".u-role-chosen").attr('title');
		//$("#subNo_").val(subNo);
		//$("#subName_").val(subName);
		//$("#productTypeName_").val(productTypeName);
		$("#area_").val('中文/拼音' == $("#area").val() ? '' : $("#area").val());
		$("#openBidArea_").val('中文/拼音' == $("#openBidArea").val() ? '' : $("#openBidArea").val());
		$("#annouSonType_").val(annousSonType);
		$("#province_").val($("#province").val());
		$("#newProvince_").val($("#newProvince").val());
		$("#openBidProvince_").val($("#openBidProvince").val());
		//晁建 add 
		$("#fundScale_").val($("#fundScale").val());
		if($("#isManyPro_").attr("checked")=='checked'){
			$("#isManyPro").val("1");
		}
		/*var postData = {
			"conEntrust.name" : name,
			"conAgency.agencyName" : agencyName,
			"conProject.projectName_" : projectName_,
			"conProject.projectName" : projectName,
			"conProject.projectNum" : projectNum,
			"subEntity.subNo" : subNo,
			"subEntity.subName" : subName,
			"conProject.fundScale" : fundScale,
			"conProject.buildArea" : buildArea,
			"productTypeEntity.productTypeName" : productTypeName,
			"conProject.publishDate" : publishDate,
			"conProject.fileSaleEndDate" : fileSaleEndDate,
			"conProject.sceneExploreDate" : sceneExploreDate,
			"conProject.openBidDate" : openBidDate,
			"conProject.province" : $("#province").val(),
			"conProject.newProvince" : $("#newProvince").val(),
			"conProject.area" : '中文/拼音' == $("#area").val() ? '' : $("#area").val(),
			"conProject.openBidProvince" : $("#openBidProvince").val(),
			"conProject.openBidArea" : '中文/拼音' == $("#openBidArea").val() ? '' : $(
					"#openBidArea").val(),
			"conAnnounce.annousSonType" : annousSonType,
			"conOpt.id" : $("#id").val()
		};*/
		
		$.ajax({
	        cache: true,
	        type: "POST",
	        url:actionUrl,
	        data:$('#agencyForm').serialize(),
	        async: false,
	        error: function(request) {
	            alert("提交失败！");
	            layer.close(loadi);
	            $("#annouSubmit").removeAttr("disabled");
	        },
	        success: function(data) {
	        	if ("" != data) {
	    			if (data && data == "error") {
	    				alert("提交失败！");
	    				layer.close(loadi);
	    				$("#annouSubmit").removeAttr("disabled");
	    				return;
	    			} else if(data && data == "exist"){
	    				alert("此条数据已被处理");
	    				window.location.href = PATH + "/optdata/optConndata?currentPage="+$("#currentPage").val()+"&conOpt.title="+$("#title_").val();
	    				layer.close(loadi);
	    			} else {
	    				var obj = eval(data);
	    				if(obj[0].count <= 1){
	    					alert("[" + obj[0].title + "]提交成功");
	    				}else{
	    					alert("[" + obj[0].title + "]提交成功，合并" + obj[0].count+ "条重复公告");
	    				}
	    				window.location.href = PATH + "/optdata/optConndata?currentPage="+$("#currentPage").val()+"&conOpt.title="+$("#title_").val();
	    				layer.close(loadi);
	    			}
	    		} else {
	    			alert("提交失败！");
	    			layer.close(loadi);
	    			$("#annouSubmit").removeAttr("disabled");
	    		}
	        }
	    });
		/*$.post(actionUrl, postData,
				function(data) {
					if ("" != data) {
						if (data && data == "error") {
							alert("提交失败！");
							layer.close(loadi);
							return;
						} else {
							var obj = eval(data);
							alert("[" + obj[0].title + "]提交成功，合并" + obj[0].count
									+ "条重复公告");
							window.location.href = PATH + "/optdata/optConndata?currentPage="+$("#currentPage").val();
							layer.close(loadi);
						}
					} else {
						alert("提交失败！");
						layer.close(loadi);
					}
				});*/
		}
}

//删除公告
function delOptData() {
	if(confirm('确定删除该公告吗?')){
		var loadi = layer.load('数据处理中，请稍后...');
		var actionUrl = PATH+"/optdata/deleteOptData";
		var postData = {
			"conOpt.ids" : $("#id").val()
		};
		$.post(actionUrl, postData,function(data) {
				if ("" != data) {
					if (data && data == "error") {
						alert("删除失败！");
						layer.close(loadi);
						return;
					} else {
						alert("删除成功");
						window.location.href = PATH + "/optdata/optConndata?currentPage="+$("#currentPage").val()+"&conOpt.title="+$("#title_").val();
						layer.close(loadi);
					}
				} else {
					alert("删除失败！");
					layer.close(loadi);
				}
		});
	}
}

/**
 * 选中复制功能
 */
var pos1 = '';
var pos2 = '';
var clip = null;
var text = ''; // 粘贴变量
var count=0;//计数器
$(function() {
	$('textarea').focusin(function() {
		$(this).val($(this).val() + $.trim(text));
	});
	// 点击文本，文本累加
	$('input[type=text]').focusin(function() {
		if (this.name.match(/Date$/) && $.trim(text) != '') {
			$(this).val(formatDate($.trim(text)));
		}else if(this.title=='buildArea' && $.trim(text) != ''){
			if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){ //包含数字和中文
				text = $.trim(text).substring(0,$.trim(text).length-1);
				$(this).val($.trim(text)*10000);
			}else{
				$(this).val($.trim(text));
			}
		}else if(this.title=='area'){
			$(this).val($.trim(text));
		}else if(this.title=='int' && $.trim(text) != ''){
			$(this).val(formatInteger($.trim(text)));
		}else if(this.title=='double' && $.trim(text) != ''){
			var reg = /^[\u4E00-\u9FA5]+$/;
			if(reg.test(text)){ //全中文
				if(aNumber($.trim(text)) != null && aNumber($.trim(text)) !=""){
					$(this).val(fmoney(aNumber($.trim(text))/10000,2));
				}
			}else if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){//包含数字和中文
				text = $.trim(text).substring(0,$.trim(text).length-1);
				text = fmoney(text,2);
				if(text != null && text != ""){
					$(this).val(fmoney(text,2));
				}
			}else{ //纯数字
				if(fmoney($.trim(text)/10000,2) != null && fmoney($.trim(text)/10000,2) != ""){
					$(this).val(fmoney($.trim(text)/10000,2));
				}
			}
			text = ''; // 清空
		    $(this)[0].focus();
		    return false;
		}else if(this.title=='double2' && $.trim(text) != ''){
			if(!isNaN($.trim(text))){
				if(fmoney($.trim(text),2) != null && fmoney($.trim(text),2) != ""){
					$(this).val(fmoney($.trim(text),2));
				}
				text = ''; // 清空
			    $(this)[0].focus();
			    return false;
			}
		}else if(this.title=='subs' && $.trim(text) != ''){
			if(text != ''){
				$(this).val('');
				$(this).val($.trim(text));
			}
			if($("#projectName2").val() == ''){
				$("#projectName2").val($.trim(text));
			}
		}else {
			$(this).val($(this).val() + $.trim(text));
		}
		text = ''; // 清空
	});
	// 新增文本框，并且新增文本内容
	$('img[name=appendText]').click(function() {
		if(this.title!='sub' && $.trim(text) != ''){
			var $tag=$(this).prev('input').clone().val($.trim(text));
			$tag.attr('remove','true');
			$tag.mousemove(Tips.showTips);
			$(this).before($tag);
		}else{
			var $tag=$(this).prev('input').clone().val($.trim(text));
			$tag.attr('remove','true');
			$tag.mousemove(Tips.showTips);
			$tag.attr('taget',++count);
			$(this).before($tag);
			$tag2=$("input[name='subHid']").prev('input').clone().val('');
			$tag2.attr('remove','true');
			$tag2.mousemove(Tips.showTips);
			$tag2.attr('taget',count);
			$("input[name='subHid']").before($tag2);
		}
		text = '';
		$('input[type=text]').focusin(function() {
			if($.trim(text) != ''){
				$(this).val($(this).val() + $.trim(text));
				text = ''; // 清空
			}
		});
		//双击删除文本框
		$("input[type=text]").dblclick(function(){
			var id=this.id;
			var length=$("input[id="+id+"]").length;
			if(length>1 && !this.id.match('sub')){
				$(this).remove();
			}else{
				$("input[taget="+$(this).attr('taget')+"]").remove();
			}
			tipsDiv.style.display = "none"; 
		});
	});
	// 点击标题覆盖文本
	/*$('label[name=copyGroup]').click(function() {
		if($.trim(text) != ''){
			$(this).next().val($.trim(text));
			text = '';
		}
	});*/
	$('label[name=copyGroup]').click(notice.labelGroup);
	// 点击标题覆盖日期
	/*$('label[name=copyDate]').click(function() {
		if($.trim(text) != ''){
			$(this).next().val(formatDate($.trim(text)));
			text = '';
		}
	});*/
	$('label[name=copyDate]').click(notice.labelDate);
	// 点击标题
	$('label[name=copyGroupDouble]').click(notice.labelReplace);

	// 点击选中单选
	$(".u-role[name!=type]").click(function() {
		$(".u-role-chosen").removeClass("u-role-chosen");
		$(this).addClass("u-role-chosen");
		openMask();
	})
	
	$(".gg-conbox").mousedown(function() {
		pos1 = getMousePos();
	});
	$(".gg-conbox").mouseup(function() {
		pos2 = getMousePos();
		if ((pos2.x - pos1.x) != 0 || (pos2.y - pos1.y) != 0) { // 判断鼠标是否有位移
			text = getSelectionText();
		}
	});
});

// 获取鼠标位置
function getMousePos(event) {
	var e = event || window.event;
	return {
		'x' : e.screenX,
		'y' : e.screenY
	}
}
// 获取选中内容
function getSelectionText() {
	if (window.getSelection) { // 如果是Firefox、Chrome、Safari、Opera
		return window.getSelection().toString();
	} else if (document.selection && document.selection.createRange) { // 如果是IE
		return copytext_keleyi_com = document.selection.createRange().text;
	}
	return '';
}

/**
 * 快速分类
 * @param infoType
 */
function quickType(_this) {
	var infoType=_this.title;
	var text=_this.innerText;
	if (infoType==undefined || infoType==null || infoType == '' || infoType == '0') {
		return false;
	}
	if ('' == $("#id").val())
	{
		alert('无数据，无法变更公告类型！');
		return false;
	}
	if(!confirm('是否确认变更公告类型为"'+text+'"')){
		return false;
	}
	var loadi = layer.load('数据处理中，请稍后...');
	var actionUrl = PATH + "/optdata/quicktype";
	var postData = {
		"conOpt.id" : $("#id").val(),
		"conOpt.infoType" : infoType
	};
	$.post(actionUrl, postData, function(data) {
		if ("" != data) {
			if (data == "success") {
				alert("快速分类成功");
				window.location.href = PATH+"/optdata/optConndata";
				layer.close(loadi);

			} else {
				alert("快速分类失败！");
				layer.close(loadi);
			}
		} else {
			alert("快速分类失败！");
			layer.close(loadi);
		}
	});
}
 
var Tips = {  
    mousePos : function(e) {  
        var x, y;  
        var e = e || window.event;  
        return {  
            x : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,  
            y : e.clientY + document.body.scrollTop + document.documentElement.scrollTop  
        };  
    },            
    showTips : function(event){  
        event = event || window.event;  
        var target = event.srcElement || event.target;  
        var tipsDiv = document.getElementById("tipsDiv");  
        if(typeof tipsDiv == undefined || tipsDiv == null){  
            tipsDiv = document.createElement("div");  
            tipsDiv.id = "tipsDiv";  
            document.body.appendChild(tipsDiv);  
        }  
        var mouse = Tips.mousePos(event);  
        tipsDiv.style.position = "absolute";  
        tipsDiv.style.width = "100px";  
        tipsDiv.style.height = "22px";  
        tipsDiv.style.backgroundColor = "#CDCDC1";  
        tipsDiv.style.color = "black";  
        tipsDiv.style.top = mouse.y + 10 + 'px';  
        tipsDiv.style.left = mouse.x + 10 + 'px';  
       // tipsDiv.innerHTML = target.getAttribute("tip");  
        tipsDiv.innerHTML = "双击删除输入框";  
        tipsDiv.style.display = "";   
        target.onmouseout = function(){  
            tipsDiv.style.display = "none";   
        }  
    }   
}  

/**
 * 格式化时间字符串输出标准的yyyy-mm-dd
 * 
 * @param text
 */
function formatDate(text) {
	var dateText = '';
	var timeText = '';
	var regexpDate = /[年月日\/-]/g;
	var regexpTime = /[时分秒:：.]/g;
	var regexp1 = /^\d{1,4}-\d{1,2}-\d{1,2}/;
	var regexp2 = /\d{1,2}:\d{1,2}:\d{1,2}$|\d{1,2}:\d{1,2}$|\d{1,2}$/;
	var replacementDate = '-';
	var replacementTime = ':';
	if (text == undefined || text == null || text == '') {
		return '';
	}
	text = text.replace(regexpDate, replacementDate).replace(/\s/g,"");
	text = text.replace(regexpTime, replacementTime);
	text=text.replace(/\D$/,'');
	
	if(text.substr(0, 1)=='-'){
		text = text.substr(1,text.length);
	}
	if(text.charAt(text.length - 1)=='-'){
		text = text.substr(0,text.length-1);
	}
	// 字符替换
	if(text.indexOf("上午") > 0){
		text = text.replace(/上午/g, " ");
	}
	if(text.indexOf("北京时间") > 0){
		text = text.replace(/北京时间/g, " ");
	}
	if(text.indexOf("北京时间上午") > 0){
		text = text.replace(/北京时间上午/g, " ");
	}
	
	var time = 0;
	if(text.indexOf("下午") > 0){
		time = 12;
		text = text.replace(/下午/g, " ");
	}
	if(text.indexOf("北京时间") > 0){
		time = 12;
		text = text.replace(/北京时间/g, " ");
	}
	if(text.indexOf("北京时间下午") > 0){
		time = 12;
		text = text.replace(/北京时间下午/g, " ");
	}
	
	dateText = text.match(regexp1);
	if(dateText==null){
		alert("时间格式不正确");
		return;
	}
	var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
	if(!DATE_FORMAT.test(dateText)){
		alert("日期格式不正确");
		return;
	}
	if(text.indexOf(" ")!=-1 || (text.split(replacementDate).length>3)){
		timeText = text.match(regexp2);
		if(time==12 && (timeText[0].split(":")[0]-0)<13){
			timeText = (timeText[0].split(":")[0]-0)+time+":"+timeText[0].split(":")[1];
		}
		if(timeText !=null){
			if(timeText.length==1 || timeText.length==2 ){
				timeText = timeText+":00"
			}
		}
		return dateText+' '+timeText;
	}
	return dateText;
}
/**
 * 格式化字符串
 * @param text
 */
function formatInteger(text){
	var intText = '';
	var regexp = /\D/g;
	var replacement = '';
	if (text == undefined || text == null || text == '') {
		return '';
	}
	intText = text.replace(regexp, replacement);
	return intText;
}

//格式化金额
function fmoney(s, n){
   if ('' == s) return '';
   n = n > 0 && n <= 20 ? n : 2;
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//更改这里n数也可确定要保留的小数位
   var l = s.split(".")[0].split("").reverse(),
   r = s.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i++ )
   {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	  //t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
   }
   return t.split("").reverse().join("") + "." + r.substring(0,2);//保留2位小数  如果要改动 把substring 最后一位数改动就可
}

/**
 * 数字转中文
 * @param dValue
 * @returns
 */
function chineseNumber(dValue) {
	var maxDec = 2;
	// 验证输入金额数值或数值字符串：
	dValue = dValue.toString().replace(/,/g, "");
	dValue = dValue.replace(/^0+/, ""); // 金额数值转字符、移除逗号、移除前导零
	if (dValue == "") {
		return "零元整";
	} // （错误：金额为空！）
	else if (isNaN(dValue)) {
		return "错误：金额不是合法的数值！";
	}
	var minus = ""; // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
	var CN_SYMBOL = ""; // 币种名称（如“人民币”，默认空）
	if (dValue.length > 1) {
		if (dValue.indexOf('-') == 0) {
			dValue = dValue.replace("-", "");
			minus = "负";
		} // 处理负数符号“-”
		if (dValue.indexOf('+') == 0) {
			dValue = dValue.replace("+", "");
		} // 处理前导正数符号“+”（无实际意义）
	}
	// 变量定义：
	var vInt = "";
	var vDec = ""; // 字符串：金额的整数部分、小数部分
	var resAIW; // 字符串：要输出的结果
	var parts; // 数组（整数部分.小数部分），length=1时则仅为整数。
	var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。
	var zeroCount; // 零计数
	var i, p, d; // 循环因子；前一位数字；当前位数字。
	var quotient, modulus; // 整数部分计算用：商数、模数。
	// 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
	var NoneDecLen = (typeof (maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5); // 是否未指定有效小数位（true/false）
	parts = dValue.split('.'); // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
	if (parts.length > 1) {
		vInt = parts[0];
		vDec = parts[1]; // 变量赋值：金额的整数部分、小数部分
		if (NoneDecLen) {
			maxDec = vDec.length > 5 ? 5 : vDec.length;
		} // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
		var rDec = Number("0." + vDec);
		rDec *= Math.pow(10, maxDec);
		rDec = Math.round(Math.abs(rDec));
		rDec /= Math.pow(10, maxDec); // 小数四舍五入
		var aIntDec = rDec.toString().split('.');
		if (Number(aIntDec[0]) == 1) {
			vInt = (Number(vInt) + 1).toString();
		} // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
		if (aIntDec.length > 1) {
			vDec = aIntDec[1];
		} else {
			vDec = "";
		}
	} else {
		vInt = dValue;
		vDec = "";
		if (NoneDecLen) {
			maxDec = 0;
		}
	}
	if (vInt.length > 44) {
		return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！";
	}
	// 准备各字符数组 Prepare the characters corresponding to the digits:
	digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); // 零~玖
	radices = new Array("", "拾", "佰", "仟"); // 拾,佰,仟
	bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正
	decimals = new Array("角", "分", "厘", "毫", "丝"); // 角/分/厘/毫/丝
	resAIW = ""; // 开始处理
	// 处理整数部分（如果有）
	if (Number(vInt) > 0) {
		zeroCount = 0;
		for (i = 0; i < vInt.length; i++) {
			p = vInt.length - i - 1;
			d = vInt.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
			if (d == "0") {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					resAIW += digits[0];
				}
				zeroCount = 0;
				resAIW += digits[Number(d)] + radices[modulus];
			}
			if (modulus == 0 && zeroCount < 4) {
				resAIW += bigRadices[quotient];
			}
		}
		resAIW += "元";
	}
	// 处理小数部分（如果有）
	for (i = 0; i < vDec.length; i++) {
		d = vDec.substr(i, 1);
		if (d != "0") {
			resAIW += digits[Number(d)] + decimals[i];
		}
	}
	// 处理结果
	if (resAIW == "") {
		resAIW = "零" + "元";
	} // 零元
	if (vDec == "") {
		resAIW += "整";
	} // ...元整
	resAIW = CN_SYMBOL + minus + resAIW; // 人民币/负......元角分/整
	return resAIW;
}

/**
 * 中文转数字
 * @param num
 * @returns
 */
function aNumber(num) {
	//debugger;
	var numArray = new Array();
	var unit = "亿万元$";
	for ( var i = 0; i < unit.length; i++) {
		var re = eval("/" + (numArray[i - 1] ? unit.charAt(i - 1) : "") + "(.*)" + unit.charAt(i) + "/");
		if (num.match(re)) {
			numArray[i] = num.match(re)[1]==''?'0':num.match(re)[1].replace(/^拾/, "壹拾");
			numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g, function($1) {
				return "零壹贰叁肆伍陆柒捌玖".indexOf($1);
			});
			numArray[i] = numArray[i].replace(/[分角拾佰仟]/g, function($1) {
				return "*" + Math.pow(10, "分角 拾佰仟 ".indexOf($1) - 2) + "+"
			}).replace(/^\*|\+$/g, "").replace(/整/, "0");
			numArray[i] = "(" + numArray[i] + ")*" + Math.ceil(Math.pow(10, (2 - i) * 4));
		} else{
			numArray[i] = 0;
		}
	}
	if(/.*[\u4e00-\u9fa5]+.*$/.test(numArray)){
 		return "";
 	}else{
 		return eval(numArray.join("+"));
 	}
}

///////////////////js/////////////////

$(document).ready(function(){
	//回车后登录
	document.onkeydown = function(e){ 
		var ev = document.all ? window.event : e; 
		if(ev.keyCode==13) { 
			var id=$("input:focus").attr("id");
			if(id=='title_'){
				searchCon();
			}else{
				openMask();
			}
		} 
	};
});

$(document).ready(function(){
	//alert($(".gg-search-con").height());
	$(".gg-conbox").height($(window).height() - 100);
	$(".gg-content").width(($(".gg-container").width()-250)/2 - 5);
   var oDiv=document.getElementById("float");
   var H=0,iE6;
   var Y=oDiv;
   var oDiv1=document.getElementById("float1");
   var H1=0,iE6,L=oDiv.offsetLeft,L1=oDiv1.offsetLeft;
   var Y1=oDiv1;
   while(Y){H+=Y.offsetTop;Y=Y.offsetParent;H1+=Y1.offsetTop;Y1=Y1.offsetParent};
   iE6=window.ActiveXObject&&!window.XMLHttpRequest;
   if(!iE6){
       window.onscroll=function()
       {
           var s=document.body.scrollTop||document.documentElement.scrollTop;
           if(s>H){oDiv.className="gg-content f-fl div2";if(iE6){oDiv.style.top=(s-H)+"px";}}
           
           else{oDiv.className="gg-content f-fl";}
           
           var s1=document.body.scrollTop||document.documentElement.scrollTop;
           if(s1>H1){oDiv1.className="gg-content f-fl div2";if(iE6){ oDiv1.style.top=(s1-H1)+"px";}
           oDiv1.style.left= (L1-$(window).scrollLeft()-8) +"px";
           oDiv.style.left= (L-$(window).scrollLeft()-8) +"px";
           }
           else{oDiv1.className="gg-content f-fl";}  
       };
   }
   
   
   
   $(".opt").each(function(index){
	   $(this).click(function(){
		    $(".removeClass").remove();
		    $("input[remove=true]").remove();
		    $("input[type=text]:not([id='title_'])").val('');
		   
		   	var id = $(".opt").eq(index).children("input[type='hidden']:eq(0)").attr('id');
		   	if(index == 0){
		   		var prevId = '';
		   	}else{
		   		var prevId = $(".opt").eq(index-1).children("input[type='hidden']:eq(0)").attr('id');
		   	}
		   	var nextId = $(".opt").eq(index+1).children("input[type='hidden']:eq(0)").attr('id');
		   	$("#id").val(id);
		   	$("#prev").val(prevId);
			$("#next").val(nextId);
			
			var type = $(".opt").eq(index).children("input[type='hidden']:eq(1)").attr('id');
			$("#type").val(type);
			
			var area = $(".opt").eq(index).children("input[type='hidden']:eq(2)").attr('id');
			$("#area").val(area);
			$("#openBidArea").val(area);
			
			var province = $(".opt").eq(index).children("input[type='hidden']:eq(3)").attr('id');
			$("#province").val(province);
			$("#openBidProvince").val(province);
			
			if(area != ''){
				var province2 = getProvince(area);
				$('#newProvince').val(province2.substring(0, province2.indexOf(',')));
				$('#openBidProvinceNum').val(province2.substring(0, province2.indexOf(',')));
			}
			
			var actionUrl = PATH+"/optdata/connInfo";
			var postData = {
				"conOpt.id" : id
			};
			$.post(actionUrl, postData, function(data) {
				if(""!=data){
					$("#proNameMsg").html("");
					$("#nameMsg_").html("");
					$("#projectId").val("");
					$("#projectId_").val("");
					$("#projectRemark").val("");
					var obj = eval(data);
					var text=obj[1];
					if(text !=null && text !=''){
						if(text[0].projectName_!=null && text[0].projectName_!=""){
							$("#projectName_").val($.trim(text[0].projectName_));
							$.ajax({
						    	 type: "POST",
						         url: PATH+"/projectAn/getNameExistByName?projectAnEntity.projectName="+encodeURIComponent($.trim(text[0].projectName_))+"&flag=1",
						         contentType: "application/x-www-form-urlencoded; charset=utf-8",
						         success: function (data) {
						        	 if(data != null && data != ''){
						        		if(data=="exist"){
						        			$("#nameMsg_").html("该工程已存在，请确定是否关联");
						        		}
						        	 }
						         }
						    });
						}
						if(text[0].projectName!=null && text[0].projectName!=""){
							$("#projectName2").val($.trim(text[0].projectName));
							$.ajax({
						    	 type: "POST",
						         url: PATH+"/projectAn/getNameExistByName?projectAnEntity.projectName="+encodeURIComponent($.trim(text[0].projectName))+"&projectAnEntity.projectNum2="+encodeURIComponent($.trim(text[0].projectNum))+"&projectAnEntity.entrustName="+encodeURIComponent($.trim(text[0].entrustUnitName))+"&projectAnEntity.agencyName="+encodeURIComponent($.trim(text[0].agencyName))+"&flag=2",
						         contentType: "application/x-www-form-urlencoded; charset=utf-8",
						         success: function (data) {
						        	 if(data != null && data != ''){
						        		if(data=="exist"){
						        			$("#proNameMsg").html("该项目已存在，请确定是否关联");
						        		}
						        	 }
						         }
						    });
						}
						if(text[0].projectNum!=null && text[0].projectNum!=""){
							$("#projectNum").val($.trim(text[0].projectNum));
						}
						//if(text[0].openBidDate!=null && text[0].openBidDate!=""){
						//	$("#openBidDate").val(formatDate($.trim(text[0].openBidDate)));
						//}
						//if(text[0].fileSaleEndDate!=null && text[0].fileSaleEndDate!=""){
						//	$("#fileSaleEndDate").val(formatDate($.trim(text[0].fileSaleEndDate)));
						//}
						if(text[0].fundScale_!=null && text[0].fundScale_!=""){
							$("#fundScale").val(fmoney($.trim(text[0].fundScale_)));
						}
						if(text[0].openBidArea!=null && text[0].openBidArea!=""){
							$("#area").val(text[0].openBidArea);
							$("#openBidArea").val(text[0].openBidArea);
						}
						if(text[0].entrustUnitName!=null && text[0].entrustUnitName!=""){
							$("#entrustName0").val($.trim(text[0].entrustUnitName));
						}
						if(text[0].agencyName!=null && text[0].agencyName!=""){
							$("#agencyName0").val($.trim(text[0].agencyName));
						}
					}
					$("#title").html(obj[0].title);
					$("#content").html(obj[0].content);
					if(obj[0].catchTime != "null" && obj[0].catchTime != ''){
						$("#publishDate").val(obj[0].catchTime);
					}else{
						$("#publishDate").val('');
					}
						
					///// 代理机构 start
					if(obj[0].agencyName != "null" && obj[0].agencyName != ''){
						$("#agencyName0").val(obj[0].agencyName);
					}
					if(obj[0].agencyList !=null && obj[0].agencyList !=''){
						for (var j = 0; j < obj[0].agencyList.length; j++) {
							if (0 < j){
								add('dllxr',1,2, 0);
							}
							if(obj[0].agencyList[j].agencyPersonName !=null && obj[0].agencyList[j].agencyPersonName !=''){
								$('#agencyPersonName0' + j).val(obj[0].agencyList[j].agencyPersonName);
							}
							if(obj[0].agencyList[j].agePertelePhone !=null && obj[0].agencyList[j].agePertelePhone !=''){
								$('#agencyTelePhone0' + j).val(obj[0].agencyList[j].agePertelePhone);
							}
						}
					}
					//// 代理机构 end
					
	             	///// 委托单位 start
					if(obj[0].entrustName != "null" && obj[0].entrustName != ''){
						$("#entrustName0").val(obj[0].entrustName);
					}
					if(obj[0].entrustList != null && obj[0].entrustList != ''){
						for (var j = 0; j < obj[0].entrustList.length; j++) {
							if (0 < j){
								add('wtlxr',1,1, 0);
							}
							if(obj[0].entrustList[j].entrustPersonName !=null && obj[0].entrustList[j].entrustPersonName !=''){
								$('#entrustPersonName0' + j).val(obj[0].entrustList[j].entrustPersonName);
							}
							if(obj[0].entrustList[j].enPerTelePhone !=null && obj[0].entrustList[j].enPerTelePhone !=''){
								$('#entrustTelePhone0' + j).val(obj[0].entrustList[j].enPerTelePhone);
							}
						}
		        	}
					
					// 分包
					if(obj[0].subList != null && obj[0].subList != ''){
						for (var j = 0; j < obj[0].subList.length; j++) {
							if (0 < j){
								add('bd',0,3, j);
							}
							if(obj[0].subList[j].subName !=null && obj[0].subList[j].subName !='' && obj[0].subList[j].subName !='null'){
								$('#subName' + j).val(obj[0].subList[j].subName);
							}
							if(obj[0].subList[j].subNo !=null && obj[0].subList[j].subNo !='' && obj[0].subList[j].subNo !='null'){
								$('#subNo' + j).val(obj[0].subList[j].subNo);
							}
						}
		        	}
					
					/*if(obj[0].proAnList != null && obj[0].proAnList != ''){
						var str="<table class=\"gridtable\"><tr style=\"height: 10px\" align=\"center\"><th width=\"30px\" align=\"center\">选择</th><th align=\"center\">项目名称</th><th align=\"center\">项目编号</th><th align=\"center\">委托单位</th><th align=\"center\">开标日期</th></tr>";
						for (var j = 0; j < obj[0].proAnList.length; j++) {
							var proName = "-";
							var proNum = "-";
							var enName = "-";
							var bidDate = "-";
							if(obj[0].proAnList[j].projectName != null && obj[0].proAnList[j].projectName !='' && obj[0].proAnList[j].projectName !='null'){
								proName = obj[0].proAnList[j].projectName;
							}
							if(obj[0].proAnList[j].projectNum != null && obj[0].proAnList[j].projectNum !='' && obj[0].proAnList[j].projectNum !='null'){
								proNum = obj[0].proAnList[j].projectNum;
							}
							if(obj[0].proAnList[j].entrustName != null && obj[0].proAnList[j].entrustName !='' && obj[0].proAnList[j].entrustName !='null'){
								enName = obj[0].proAnList[j].entrustName;
							}
							if(obj[0].proAnList[j].openBidDate != null && obj[0].proAnList[j].openBidDate !='' && obj[0].proAnList[j].openBidDate !='null'){
								bidDate = obj[0].proAnList[j].openBidDate;
							}
							str +="<tr style=\"height: 10px\"><td  align=\"center\"><input type=\"radio\" onclick=\"selectPro('"+obj[0].proAnList[j].projectId+"','"+obj[0].proAnList[j].annouId+"');\"/>";
							str +="</td><td>"+proName+"</td><td align=\"center\">"+proNum+"</td><td align=\"center\">"+enName+"</td><td align=\"center\">"+bidDate+"</td></tr>";
						}
						str +="<tr><td colspan=\"5\" align=\"center\"><button style=\"padding: 3px 8px;\" onclick=\"closeWindow();\" type=\"button\">关闭</button></td></tr></table>";
						$("#returnDiv").html(str);
						showWindow();
					}*/
					parent.layer.closeAll();
					if(obj[0].proAnList != null && obj[0].proAnList != ''){
						openWindow(PATH+"/optdata/mateProjectList?conOpt.project.projectName="+$.trim(text[0].projectName)+"&conOpt.project.projectNum="+$.trim(text[0].projectNum)+"&conOpt.entrust.name="+obj[0].entrustName+"&conOpt.agency.agencyName="+obj[0].agencyName+"", 800, 450, "项目列表");
					}
				}
			});
	   });
   });
   //初始化数据
   $(".opt").eq(0).click();
});

// 更多
function showLi(number){
	$("li[name='show"+number+"']").show();
	$("#more"+number).text("收起>>");
	$("#more"+number).attr("href","javascript:hideLi("+number+")");
}
// 收起
function hideLi(number){
	$("li[name='show"+number+"']").hide();
	$("#more"+number).text("更多>>");
	$("#more"+number).attr("href","javascript:showLi("+number+")");
}

// 公告上下一个
function prenext(number){
	var prevId = $("#prev").val();
	var nextId = $("#next").val();
	if(number == '1'){
		if(prevId == ''){
			alert("已是第一条公告");
			return;
		}
		$("#"+ prevId).click();
	}
	if(number == '2'){
		if(nextId == ''){
			alert("已是最后一条公告");
			return;
		}
		//下一条
		$("#"+ nextId).click();
	}
}

// 获取选中方法
function textCounter(content,maxlimit) {
	if (content.value.length > maxlimit)
		content.value = content.value.substring(0,maxlimit);
}

// 重置
function reset(){
	//$("input[type=text][name=]").val('');
	$(".removeClass").remove();
    $("input[remove=true]").remove();
    $("input[type=text]").val('');
}

// 新增行
var iii = 0;
function add(divId,flag,wtDlFlag,number){
    var newDiv = document.createElement('div');  
    var str = "";
    var number2 = 0;
    if(wtDlFlag==1){//委托单位
   	 	if(flag == 1){
   	 		var str = $("input[id^='contactPersonId"+number+"']:last").attr('id');
   	 			number2 = new Number(str.substring(15+number.toString().length, str.length)) + 1;
  			 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
  			 str +=" <input type=\"hidden\" name=\"entrustAnEntityList["+number+"].lstCon["+number2+"].contactPersonId\" id=\"contactPersonId"+number+""+number2+"\" />";
  			 str +="<input type=\"text\" remove=true name=\"entrustAnEntityList["+number+"].lstCon[" + number2 + "].name\" id=\"entrustPersonName"+number+""+number2+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
			 str +="</div><div class=\"block\"><label name=\"copyGroup\">联系方式：</label> <input type=\"text\" name=\"entrustAnEntityList["+number+"].lstCon[" + number2 + "].telePhone\" remove=true id=\"entrustTelePhone"+number+""+number2+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/> <a href=\"javascript:delItem('"+divId + number+""+number2+"');\"><img src=\""+PATH+"/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div>";  
        }else{
        	var str = $("input[id^='entrustUnitId']:last").attr('id');
	       	 	number = new Number(str.substring(13, str.length));
	       	 	number++;
	       	 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">委托单位：</label>";
       	 	 str +="<input type=\"hidden\" name=\"entrustAnEntityList[" + number + "].entrustUnitId\" id=\"entrustUnitId" + number + "\"/> <input type=\"text\" remove=true name=\"entrustAnEntityList[" + number + "].name\" id=\"entrustName" + number + "\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
			 str +=" <a href=\"javascript:delItem('"+divId + number +"');\"><img src=\""+PATH+"/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\" /></a></div></div>";
			 str +="<div id=\"wtlxr"+ number +"0\"><div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
			 str +=" <input type=\"hidden\" name=\"entrustAnEntityList["+number+"].lstCon[0].contactPersonId\" id=\"contactPersonId"+number+"0\" />";
			 str +=" <input type=\"text\" remove=true name=\"entrustAnEntityList["+number+"].lstCon[0].name\" id=\"contactPersonName"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/></div><div class=\"block\"><label name=\"copyGroup\">联系方式：</label>";
			 str +=" <input type=\"text\" remove=true name=\"entrustAnEntityList["+number+"].lstCon[0].telePhone\" id=\"contactTelePhone"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
			 str +=" <a href=\"javascript:add('wtlxr', 1, 1, "+number+");\"><img src=\""+PATH+"/image/1.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div></div>";
        }
    }else if(wtDlFlag==2){//代理机构
	   	 if(flag == 1){
	   		var str = $("input[id^='agencyPersonId"+number+"']:last").attr('id');
	   			number2 = new Number(str.substring(14+number.toString().length, str.length)) + 1;
	  			str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
	  			str +="<input type=\"hidden\" name=\"agencyAnEntityList["+number+"].lstAgen["+number2+"].agencyPersonId\" id=\"agencyPersonId"+number+""+number2+"\" />";
	  			str +="<input type=\"text\" remove=true name=\"agencyAnEntityList["+number+"].lstAgen["+number2+"].name\" id=\"agencyPersonName"+number+""+number2+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/></div>";
				str +="<div class=\"block\"><label name=\"copyGroup\">联系方式：</label> <input type=\"text\" remove=true name=\"agencyAnEntityList["+number+"].lstAgen["+number2+"].telePhone\" id=\"agencyTelePhone"+number+""+number2+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
				str +=" <a href=\"javascript:delItem('"+divId + number+""+number2+"');\"><img src=\""+PATH+"/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div>";
	   	 }else{
	   		var str = $("input[id^='agencyId']:last").attr('id');
	   			number = new Number(str.substring(8, str.length));
	   			number++;
	   			str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">代理机构：</label>";
	   		 	str +="<input type=\"hidden\" name=\"agencyAnEntityList["+number+"].agencyId\" id=\"agencyId"+number+"\"/>";
	   		 	str +="<input type=\"text\" remove=true name=\"agencyAnEntityList["+number+"].agencyName\" id=\"agencyId"+number+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
				str +=" <a href=\"javascript:delItem('"+divId + number+"');\"><img src=\""+PATH+"/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div>";
				str +="<div id=\"dllxr"+number+"0\"><div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
				str +=" <input type=\"text\" name=\"agencyAnEntityList["+number+"].lstAgen[0].name\" remove=true id=\"agencyPersonName"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/></div><div class=\"block\"><label name=\"copyGroup\">联系方式：</label>";
				str +=" <input type=\"text\" name=\"agencyAnEntityList["+number+"].lstAgen[0].telePhone\" remove=true id=\"agencyTelePhone"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/> <a href=\"javascript:add('dllxr',1,2, "+number+");\"><img src=\""+PATH+"/image/1.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div></div>";
	   	 }
    }else if(wtDlFlag==3){//分包
    	 var str = $("input[id^='subId']:last").attr('id');
  		 number = new Number(str.substring(5, str.length)) + 1;
   	 	 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\" style=\"min-width: 200px\"><label name=\"copyGroup\">标段编号：</label>";
		 str +=" <input type=\"text\" tmpSubNumClass=\"subNumTemp\" name=\"subAnEntityList["+number+"].subNo\" id=\"subNo" + number + "\" maxlength=\"50\" onblur=\"subStr(this,50)\" style=\"width: 140px; min-width: 140px;\"/><input type=\"hidden\" name=\"subHid\"/><input type=\"hidden\" name=\"subAnEntityList[" + number + "].subId\" id='subId" + number + "'/>";
		 str +="</div><div class=\"block\" style=\"min-width: 200px\"><label name=\"copyGroup\">标段名称：</label> <input type=\"text\" remove=true name=\"subAnEntityList["+number+"].subName\" id=\"subName" + number + "\" remove=true maxlength=\"50\" title=\"subs\"  onblur=\"subStr(this,50)\"/></div>";
		 str +="<div class=\"block\" style=\"min-width: 200px\"><label name=\"copyGroupDouble\">招标金额：</label> <input type=\"text\" name=\"subAnEntityList["+number+"].fundScale_\" id=\"fundScale_"+number+"\" maxlength=\"50\" title=\"double2\"  onblur=\"check(2,this);\" placeholder=\"快捷键E\" style=\"width: 80px; min-width: 80px;\"/>万元";
		 str +=" <a href=\"javascript:delItem('"+divId + number+"');\"><img src=\""+PATH+"/image/2.png\" style=\"height: 18px;width:18px;\"/></a></div>";
    }else{//标的物
    	var str = $("input[id^='productTypeId']:last").attr('id');
  		number = new Number(str.substring(13, str.length)) + 1;
    	//if(iii%2==1){
    	//	str +="<div style=\"width:100%; height:1px; line-height:1px; font-size:0px; float:left;\"></div>";
    	//}
    	 str ="<div class=\"block\"><label name=\"copyGroup\">标的物：</label>";
      	 str +=" <input type=\"text\" style=\"width: 90px;min-width:90px\" name=\"productTypeEntityList["+number+"].productTypeName\" id=\"productTypeName" + number + "\" remove=true id=\"productTypeName\" maxlength=\"20\" onblur=\"subStr(this,20)\"/>";
      	 str +=" <input type=\"hidden\" name=\"productTypeEntityList[" + number + "].productTypeId\" id='productTypeId" + number + "'/>";
      	 str +=" <a href=\"javascript:delItem('"+divId + number+"');\"><img src=\""+PATH+"/image/2.png\" style=\"height: 18px;width:18px;\"/></a>";
      	 str +"</div>";
    }
    newDiv.innerHTML = str; 
    var dId = divId + number;
    var dId1 = dId;
    if (1 == flag){ 
   	 	dId += number2;
   	 	number2--;
   	 	dId1 = divId + number + number2;
  	}else{
  		number--;
  		dId1 = divId + number;
    }
    newDiv.id = dId;
    newDiv.className="removeClass";
    $("#"+dId1).after(newDiv);  
    $("input[remove=true]").click(notice.copyText);  //绑定事件
    $("input[remove=true]").click();  //触发点击事件
    $("label[name=copyGroupDouble]").click(notice.labelReplace);  //绑定事件
    $('label[name=copyGroup]').click(notice.labelGroup);//绑定事件
    $('label[name=copyDate]').click(notice.labelDate);//绑定事件
    iii++;
}

// 删除行
function delItem(divId) {
    $("#"+divId).remove();  
}  

function split( val ) {
    return val.split( /,\s*/ );
  }
function extractLast( term ) {
    return split( term ).pop();
  }
var entrust;
var agency;
var projectNum;
var projectName;
var term;
// 加载
$(document).ready(function(){
	// 工程名称
     $("#projectName_").autocomplete({
         source: PATH + "/projectAn/getProjectListNames",
         matchCase:true,
         minChars:0,
	     minLength: 1,
	     maxLength:10,
	     select: function( event, ui ) {
	    	$("#projectName_").val(ui.item.label);
            $("#projectId_").val(ui.item.value);
            $("#projectRemark").val(ui.item.projectRemark);
            return false;
	     }
     }).focus(function(){
    	 $(this).autocomplete("search"); 
    	 return false;
     });
     // 项目名称
     $("#projectName2").autocomplete({
		//source:PATH+"/projectAn/getProjectNames?projectAnEntity.fatherNode=1&flag=1",
    	source:function( request, response ) {
         $.getJSON( PATH+"/projectAn/getProjectNames?projectAnEntity.fatherNode=1&flag=1", {
             term: term,
             entrustName:entrust,
             agencyName:agency,
             projectNum:proNum
           }, response );
         },
		matchCase:true,
	    minLength: 1,
	    maxLength:10,
	    minChars:0,
	    cacheLength:0,
		select: function( event, ui ) {
			$("#projectName2").val(ui.item.projectName);
			$("#projectNum").val(ui.item.projectNum);
            $("#projectId").val(ui.item.value);
            projectInfo(ui.item.value);
            //subInfo(ui.item.value,ui.item.annouId);
            //productInfo(ui.item.annouId);
            entrustInfo(ui.item.value);
            agencyInfo(ui.item.value);
            
            $("#entrustName0").val("");
            $("#entrustUnitId0").val("");
            $("div[id^='wtlxr']").each(function(){
            	if($(this).attr("id")!='wtlxr00'){
            		$(this).remove();
            	}else{
            		$("#contactPersonId00").val("");
            		$("#entrustPersonName00").val("");
            		$("#entrustTelePhone00").val("");
            	}
            });
            
            $("#agencyName0").val("");
            $("#agencyId0").val("");
            $("div[id^='dllxr']").each(function(){
            	if($(this).attr("id")!='dllxr00'){
            		$(this).remove();
            	}else{
            		$("#agencyPersonId00").val("");
            		$("#agencyPersonName00").val("");
            		$("#agencyTelePhone00").val("");
            	}
            });
            return false;
         },
	     search: function() {
	    	 term=this.value;
	    	 entrust=$.trim($('#entrustName0').val());
	    	 agency=$.trim($('#agencyName0').val());
	    	 agency=$.trim($('#agencyName0').val());
	    	 proNum=$.trim($('#projectNum').val());
	     }
	}).focus(function(){$(this).autocomplete("search"); return false;});
     // 项目编号
     $("#projectNum").autocomplete({
		//source:PATH+"/projectAn/getProjectNames?projectAnEntity.fatherNode=1&flag=2",
    	 source:function( request, response ) {
    	 $.getJSON( PATH+"/projectAn/getProjectNames?projectAnEntity.fatherNode=1&flag=2", {
             term: term,
             entrustName:entrust,
             agencyName:agency,
             projectName:proName
           }, response );
         },
		matchCase:true,
	    minLength: 1,
	    maxLength:10,
		select: function( event, ui ) {
			$("#projectName").val(ui.item.projectName);
			$("#projectNum").val(ui.item.label);
            $("#projectId").val(ui.item.value);
            projectInfo(ui.item.value);
            //subInfo(ui.item.value,ui.item.annouId);
            //productInfo(ui.item.annouId);
            entrustInfo(ui.item.value);
            agencyInfo(ui.item.value);
            
            $("#entrustName0").val("");
            $("#entrustUnitId0").val("");
            $("div[id^='wtlxr']").each(function(){
            	if($(this).attr("id")!='wtlxr00'){
            		$(this).remove();
            	}else{
            		$("#contactPersonId00").val("");
            		$("#entrustPersonName00").val("");
            		$("#entrustTelePhone00").val("");
            	}
            });
            
            $("#agencyName0").val("");
            $("#agencyId0").val("");
            $("div[id^='dllxr']").each(function(){
            	if($(this).attr("id")!='dllxr00'){
            		$(this).remove();
            	}else{
            		$("#agencyPersonId00").val("");
            		$("#agencyPersonName00").val("");
            		$("#agencyTelePhone00").val("");
            	}
            });
            
            return false;
         },
	     search: function() {
	    	 term=this.value;
	    	 entrust=$.trim($('#entrustName0').val());
	    	 agency=$.trim($('#agencyName0').val());
	    	 proName=$.trim($('#projectName').val());
	     }
	}).focus(function(){$(this).autocomplete("search"); return false;});
});
/*
$(document).ready(function(){
	$.ajax({
        type: "POST",
        url: PATH+"/projectAn/getProjectNames?projectAnEntity.fatherNode=1",
        dataType: "json",
        success: function (data) {
       	 if(data != null && data != ''){
	        	 var obj = eval(data);
	        	 var availableTags = new Array();
	        	 for(var i = 0;i<obj.length;i++){
	        		 availableTags[i] = {label:obj[i].data, category:obj[i].value, proNum:obj[i].proNum, proId:obj[i].proId, annouId:obj[i].annouId};
	        	 }
	             $("#projectName2").autocomplete({
	     			max :10,
	     			source:availableTags,
	     			select: function( event, ui ) {
	     				if(ui.item.proNum != "null" && ui.item.proNum != null && ui.item.proNum != ''){
	                    	$("#projectNum").val(ui.item.proNum);
	     				}
	                    $("#projectId").val(ui.item.proId);
	                    //projectInfo(ui.item.category);
	                    //subInfo(ui.item.category,ui.item.annouId);
	                    //productInfo(ui.item.annouId);
	                    //entrustInfo(ui.item.category);
	                    //agencyInfo(ui.item.category);
	                }
	     		});
	         }
        }
	});
});
*/
// 获取项目信息
function projectInfo(projectId){
	 $.ajax({
    	 type: "POST",
         url: PATH+"/projectAn/getProInfoById?projectAnEntity.projectId="+projectId,
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
        			if(obj[0].fundScale != "null" && obj[0].fundScale !=null && obj[0].fundScale != ''){
        				if(/.*[\u4e00-\u9fa5]+.*$/.test($.trim(obj[0].fundScale))){ 
        					if(aNumber($.trim(obj[0].fundScale)) != null && aNumber($.trim(obj[0].fundScale)) !=""){
        						$("#fundScale").val(fmoney(aNumber($.trim(obj[0].fundScale)),2));
        					}
        				}else{
        					$("#fundScale").val(fmoney($.trim(obj[0].fundScale),2));
        				}
        			}
        			$("#projectName2").val(obj[0].projectName);
        			$("#projectNum").val(obj[0].projectNum);
        			$("#projectId").val(obj[0].projectId);
        			
        			$("#buildArea_").val(obj[0].buildArea);
        			$("#publishDate").val(obj[0].publishDate);
        			//$("#fileSaleEndDate").val(obj[0].fileSaleEndDate);
        			//$("#sceneExploreDate").val(obj[0].sceneExploreDate);
        			//$("#openBidDate").val(obj[0].openBidDate);
        			$("#area").val(obj[0].area);
        			$("#province").val(obj[0].province);
        			$("#openBidArea").val(obj[0].openBidArea);
        			$("#openBidProvince").val(obj[0].openBidProvince);
        			$("#proNameMsg").html("项目已关联");
        		
        			if(obj[0].projectName_ != null && obj[0].projectName_ != '' && obj[0].projectName_ !='null'){
        				$("#projectName_").val(obj[0].projectName_);
            			$("#projectId_").val(obj[0].projectId_);
            			$("#projectRemark").val(obj[0].projectRemark);
            			$("#nameMsg_").html("工程已关联");
        			}
        	 }
         }
    });
}

// 获取分包信息
function subInfo(projectId,annouId){
	 $.ajax({
    	 type: "POST",
         url: PATH+"/subAn/getSubInfo",
         data:{"subAnEntity.projectId":projectId,
        	   "subAnEntity.connId":annouId},
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
        		for (var i = 0; i < obj.length; i++) {
        			if (0 < i){
        				add('bd',0,3, i);
        			}
        			if(obj[i].subId !=null && obj[i].subId !=''){
						$('#subId' + i).val(obj[i].subId);
					}
    				if(obj[i].subNo !=null && obj[i].subNo !=''){
						$('#subNo' + i).val(obj[i].subNo);
					}
					if(obj[i].subName !=null && obj[i].subName !=''){
						$('#subName' + i).val(obj[i].subName);
					}
        		}
        	 }
         }
    });
}

// 获取产品类型信息
function productInfo(annouId){
	 $.ajax({
    	 type: "POST",
         url: PATH+"/productType/getProductType?annouId="+annouId,
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
        		for (var i = 0; i < obj.length; i++) {
        			if (0 < i){
        				add('bdw',0,4,i);
        			}
        			if(obj[i].productTypeId !=null && obj[i].productTypeId !=''){
						$('#productTypeId' + i).val(obj[i].productTypeId);
					}
        			if(obj[i].productTypeName !=null && obj[i].productTypeName !=''){
						$('#productTypeName' + i).val(obj[i].productTypeName);
					}
        		}
        	 }
         }
    });
}

// 获取委托单位信息
function entrustInfo(projectId){
	$("#entrustName0").val("");
	 $.ajax({
    	 type: "POST",
         url: PATH+"/entrustAn/getEntrustInfoById?entrustAnEntity.projectId="+projectId,
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
        		if(obj[0].entrustList.length>0){
	        		for (var i = 0; i < obj[0].entrustList.length; i++) {
	        			if(0 < i){
	        				add('wt',2,1, i);
	        			}
	        			if(obj[0].entrustList[i].entrustUnitId !=null && obj[0].entrustList[i].entrustUnitId !=''){
	        				$('#entrustUnitId' + i).val(obj[0].entrustList[i].entrustUnitId);
	        			}
	        			if(obj[0].entrustList[i].name !=null && obj[0].entrustList[i].name !=''){
	        				$('#entrustName' + i).val(obj[0].entrustList[i].name);
	        			}
						if(obj[0].entrustList[i].contactList.length>0){
							for (var j = 0; j < obj[0].entrustList[i].contactList.length; j++) {
								if(0 < j){
									add('wtlxr',1,1, i);
			        			}
								if(obj[0].entrustList[i].contactList[j].contactPersonId !=null && obj[0].entrustList[i].contactList[j].contactPersonId !=''){
									$('#contactPersonId' + i + '' + j).val(obj[0].entrustList[i].contactList[j].contactPersonId);
			        			}
								if(obj[0].entrustList[i].contactList[j].name !=null && obj[0].entrustList[i].contactList[j].name !=''){
			        				$('#entrustPersonName' + i + '' + j).val(obj[0].entrustList[i].contactList[j].name);
			        			}
								if(obj[0].entrustList[i].contactList[j].telePhone !=null && obj[0].entrustList[i].contactList[j].telePhone !=''){
			        				$('#entrustTelePhone' + i + '' + j).val(obj[0].entrustList[i].contactList[j].telePhone);
			        			}
							}
						}
	        		}
        		}
        	 }
         }
       });
	}

// 代理机构
function agencyInfo(projectId){
	$("#agencyName0").val("");
	$.ajax({
    	 type: "POST",
         url: PATH+"/agencyAn/getAgencyInfoById?agencyPersonAnEntity.projectId="+projectId,
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
        		if(obj[0].agencyList.length>0){
        			for (var i = 0; i < obj[0].agencyList.length; i++) {
        				if(0 < i){
        					add('dl',2,2, i);
        				}
        				if(obj[0].agencyList[i].agencyId !=null && obj[0].agencyList[i].agencyId !=''){
	        				$('#agencyId' + i).val(obj[0].agencyList[i].agencyId);
	        			}
        				if(obj[0].agencyList[i].name !=null && obj[0].agencyList[i].name !=''){
	        				$('#agencyName' + i).val(obj[0].agencyList[i].name);
	        			}
						if(obj[0].agencyList[i].personList.length>0){
							for (var j = 0; j < obj[0].agencyList[i].personList.length; j++) {
								if(0 < j){
									add('dllxr',1,2, i);
			        			}
								if(obj[0].agencyList[i].personList[j].agencyPersonId !=null && obj[0].agencyList[i].personList[j].agencyPersonId !=''){
									$('#agencyPersonId' + i + '' + j).val(obj[0].agencyList[i].personList[j].agencyPersonId);
								}
								if(obj[0].agencyList[i].personList[j].name !=null && obj[0].agencyList[i].personList[j].name !=''){
									$('#agencyPersonName' + i + '' + j).val(obj[0].agencyList[i].personList[j].name);
								}
								if(obj[0].agencyList[i].personList[j].telePhone !=null && obj[0].agencyList[i].personList[j].telePhone !=''){
									$('#agencyTelePhone' + i + '' + j).val(obj[0].agencyList[i].personList[j].telePhone);
								}
							}
						}
        			}
        		}
        	}
        }
    });
}

// 根据项目名称获取项目信息
/*function proName(strLength){
	 var projectName = $("#projectName2").val();
	 if(projectName != '' && getStrLeng(projectName)>strLength){
		 projectName = projectName.substr(0,strLength);
	 }
	 $("#projectName2").val(projectName);
	 $.ajax({
    	 type: "POST",
         url: PATH+"/projectAn/getProInfoByName?projectAnEntity.projectName="+encodeURIComponent(projectName),
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
           $("#projectNum").val(obj[0].projectNum);
           $("#projectId").val(obj[0].projectId);
           projectInfo(obj[0].projectId);
           subInfo(obj[0].projectId,obj[0].annouId);
           productInfo(obj[0].annouId);
           entrustInfo(obj[0].projectId);
           agencyInfo(obj[0].projectId);
        	 }
         }
    });
}*/

// 验证资金来源正确性
function check(flag,thisVal) {
	if(flag == '1'){
		var fundScale=$("#fundScale").val();
		   //var fundScale_=$("#fundScale_").val();
			if(fundScale != ''){
				//if(!isNaN(fundScale)){
					if(fundScale.indexOf(",")!=-1){
						fundScale =fundScale.replace(/,/g,"");
					}
					if(/.*[\u4e00-\u9fa5]+.*$/.test($.trim(fundScale))){ 
						if(aNumber($.trim(fundScale)) != null && aNumber($.trim(fundScale)) !=""){
							$("#fundScale").val(fmoney(aNumber($.trim(fundScale))/10000,2));
						}
					}else{
						$("#fundScale").val(fmoney($.trim(fundScale),2));
					}
					
					/*if($("#fundScale_").val() != null && $("#fundScale_").val() != '' && $("#fundScale").val() != null && $("#fundScale").val() != ''){
						$("#fundScale_").val(Number($("#fundScale").val())+Number(fmoney($.trim($("#fundScale_").val()),2)));
					}
					if(($("#fundScale_").val() != null && $("#fundScale_").val() != '') && ($("#fundScale").val() == null || $("#fundScale").val() == '')){
						$("#fundScale_").val(fmoney($.trim($("#fundScale_").val()),2));
					}
					if(($("#fundScale_").val() == null || $("#fundScale_").val() == '') && ($("#fundScale").val() != null && $("#fundScale").val() != '')){
						$("#fundScale_").val($("#fundScale").val());
					}*/
				/*}else{
					alert("请输入数字");
					$("#fundScale").val("");
					return;
				}*/
			}
	}else{
		var fundScale=$(thisVal).val();
		if(fundScale != ''){
			//if(!isNaN(fundScale)){
				if(fundScale.indexOf(",")!=-1){
					fundScale =fundScale.replace(/,/g,"");
				}
				if(/.*[\u4e00-\u9fa5]+.*$/.test($.trim(fundScale))){ 
					if(aNumber($.trim(fundScale)) != null && aNumber($.trim(fundScale)) !=""){
						$(thisVal).val(fmoney(aNumber($.trim(fundScale))/10000,2));
					}
				}else{
					$(thisVal).val(fmoney($.trim(fundScale),2));
				}
			/*}else{
				alert("请输入数字");
				$(thisVal).val("");
				return;
			}*/
		}
	}
} 
// 资金规模
function checkBuildArea(){
	 var buildArea=$("#buildArea").val();
	 var buildArea_=$("#buildArea_").val();
	 if($("#buildArea_").val() != null && $("#buildArea_").val() != '' && $("#buildArea").val() != null && $("#buildArea").val() != ''){
		$("#buildArea_").val(Number($("#buildArea").val())+Number($("#buildArea_").val()));
	 }
	 if(($("#buildArea_").val() != null && $("#buildArea_").val() != '') && ($("#buildArea").val() == null || $("#buildArea").val() == '')){
		$("#buildArea_").val($("#buildArea_").val());
	 }
	 if(($("#buildArea_").val() == null || $("#buildArea_").val() == '') && ($("#buildArea").val() != null && $("#buildArea").val() != '')){
		$("#buildArea_").val($("#buildArea").val());
	 }
}

//TOP 搜索
function searchKeyWord(type){
	switch (type){
		// 关键词搜索
		case 1:
			keyword = $("#autocomplete").val();
			$('#annouName').val($.trim(keyword));
			break;
	}
	if ('' != $('#annouName').val()){
		var url = PATH+"/search/result";
	 	$("#searchForm").attr("action", url);
		$("#searchForm").submit();
	}
}


//显示
	function showWindow() { 
	var myAlert = document.getElementById("returnDiv"); 
	myAlert.style.display = "block"; 
	myAlert.style.position = "absolute"; 
	myAlert.style.top = "40%"; 
	myAlert.style.left = "35%"; 
	myAlert.style.marginTop = "-75px"; 
	myAlert.style.marginLeft = "-135px";
	
	var mybg=document.getElementById("mybg");
	if(mybg){
		mybg.style.display = "block"; 
	}else{
		mybg = document.createElement("div"); 
		mybg.setAttribute("id","mybg"); 
		mybg.style.background = "#000"; 
		mybg.style.width = "100%"; 
		mybg.style.height = "100%"; 
		mybg.style.position = "absolute"; 
		mybg.style.top = "0"; 
		mybg.style.left = "0"; 
		mybg.style.zIndex = "2000"; 
		mybg.style.opacity = "0.3"; 
		mybg.style.filter = "Alpha(opacity=30)"; 
		document.body.appendChild(mybg);
	}
}

//隐藏
function closeWindow(){
	var myAlert = document.getElementById("returnDiv"); 
	var mybg = document.getElementById("mybg"); 
	myAlert.style.display = "none"; 
	mybg.style.display = "none"; 
}

//选择匹配项目
function selectPro(projectId,annouId){
	projectInfo(projectId);
    //subInfo(projectId,annouId);
    productInfo(annouId);
    entrustInfo(projectId);
    //agencyInfo(projectId);
    closeWindow();
}

// 验证工程名称
function subStrProName_(thisVal,strLength,flag){
	//if($(thisVal).val() != '' && getStrLeng($(thisVal).val())>strLength){
	if($(thisVal).val() != '' && $(thisVal).val().length>strLength){
		$(thisVal).val($(thisVal).val().substr(0,strLength));
		alert("字符输入太长，计算机已自动截取");
	}
	if(flag=='1'){
		$("#ui-id-1").hide();
		if($(thisVal).val() != ''){
			$.ajax({
		    	 type: "POST",
		         url: PATH+"/projectAn/getNameExistByName?projectAnEntity.projectName="+encodeURIComponent($(thisVal).val())+"&flag="+flag,
		         //dataType: "json",
		         contentType: "application/x-www-form-urlencoded; charset=utf-8",
		         success: function (data) {
		        	 if(data != null && data != ''){
		        		//var obj = eval(data);
		        		if(data=="exist" && $("#projectId_").val()==''){
		        			$("#nameMsg_").html("该工程已存在，请确定是否关联");
		        		}else if($("#projectId_").val()!=''){
		        			$("#nameMsg_").html("工程已关联");
		        			if($("#projectId").val() ==''){
		        				$("#proNameMsg").html("");
		        			}
		        		}else{
		        			$("#nameMsg_").html("");
		        		}
		        	 }else{
		        		 $("#nameMsg_").html("");
		        	 }
		         }
		    });
		}
	}else if(flag=='2'){
		$("#ui-id-2").hide();
		if($(thisVal).val() != ''){
			$.ajax({
		    	 type: "POST",
		    	 url: PATH+"/projectAn/getNameExistByName?projectAnEntity.projectName="+encodeURIComponent($(thisVal).val())+"&projectAnEntity.projectNum2="+encodeURIComponent($("#projectNum").val())+"&projectAnEntity.entrustName="+encodeURIComponent($("#entrustName0").val())+"&projectAnEntity.agencyName="+encodeURIComponent($("#agencyName0").val())+"&flag="+flag,
		         //url: PATH+"/projectAn/getNameExistByName?projectAnEntity.projectName="+encodeURIComponent($(thisVal).val())+"&flag="+flag,
		         //dataType: "json",
		         contentType: "application/x-www-form-urlencoded; charset=utf-8",
		         success: function (data) {
		        	 if(data != null && data != ''){
		        		//var obj = eval(data);
		        		if(data=="exist" && $("#projectId").val()==''){
		        			$("#proNameMsg").html("该项目已存在，请确定是否关联");
		        		}else if($("#projectId").val()!=''){
		        			$("#proNameMsg").html("项目已关联");
		        			if($("#projectId_").val() ==''){
		        				$("#nameMsg_").html("");
		        			}
		        		}else{
		        			$("#proNameMsg").html("");
		        		}
		        	 }else{
		        		 $("#proNameMsg").html("");
		        	 }
		         }
		    });
		}
	}else{
		$("#ui-id-3").hide();
	}
}

function openWindow(url, iWidth, iHeight, iTitle){
	var width = typeof(iWidth) == 'undifined' ? '880px' : iWidth+'px';
	var height = typeof(iHeight) == 'undifined' ? '500px' : iHeight+'px';
	var title = typeof(iTitle) == 'undifined' ? '系统弹窗' : iTitle;
	var index = parent.$.layer({
	    type: 2,
	    shade: [0.5, '#000'],
	    fix: true,
	    title: title,
	    maxmin: true,
	    shade: [0],//遮罩层
	    iframe: {src : url},
	    area: [width , height],
	    end: function(){
	    	var proAnnouId = document.getElementById("proAnnouId").value;
	    	if(proAnnouId != null && proAnnouId != ''){
	    		$("#nameMsg_").html("");
	    		$("#proNameMsg").html("");
	    		proAnnouId = proAnnouId.split("-");
	    		$("#projectId").val(proAnnouId[0]);
		    	projectInfo(proAnnouId[0]);
		        //subInfo(proAnnouId[0],proAnnouId[1]);
		        //productInfo(proAnnouId[1]);
		        entrustInfo(proAnnouId[0]);
		        agencyInfo(proAnnouId[0]);
		        
		        $("#entrustName0").val("");
	            $("#entrustUnitId0").val("");
	            $("div[id^='wtlxr']").each(function(){
	            	if($(this).attr("id")!='wtlxr00'){
	            		$(this).remove();
	            	}else{
	            		$("#contactPersonId00").val("");
	            		$("#entrustPersonName00").val("");
	            		$("#entrustTelePhone00").val("");
	            	}
	            });
	            
	            $("#agencyName0").val("");
	            $("#agencyId0").val("");
	            $("div[id^='dllxr']").each(function(){
	            	if($(this).attr("id")!='dllxr00'){
	            		$(this).remove();
	            	}else{
	            		$("#agencyPersonId00").val("");
	            		$("#agencyPersonName00").val("");
	            		$("#agencyTelePhone00").val("");
	            	}
	            });
	            return false;
	    	}
	    }
	}); 
}
//////////////////////js//////////////////////

