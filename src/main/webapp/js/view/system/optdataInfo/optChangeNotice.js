var notice={};
//复制文本内容
notice.copyText=function(){
	$('input[type=text]').focusin(function() {
		//$(this).val($(this).val() + $.trim(text));
		if (0 <= $(this).attr('id').indexOf('agencyPersonName', 0) || 0 <= $(this).attr('id').indexOf('contactPersonName', 0)){
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
				if(fmoney($.trim(text)/10000,2) != null && fmoney($.trim(text)/10000,2) != ""){
					$(this).val(fmoney($.trim(text)/10000,2));
				}
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
				if(fmoney($.trim(text),2) != null && fmoney($.trim(text),2) != ""){
					$(this).val(fmoney($.trim(text),2));
				}
			}
			text = ''; // 清空
		    $(this)[0].focus();
		    return false;
		}else{
			$(this).val($(this).val() + $.trim(text));
		}
		text = ''; // 清空
	});
	$('textarea').focusin(function() {
		$(this).val($(this).val() + $.trim(text));
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
	}else if(k==57 && $.trim(text) != ''){//工程简介
		$("#projectRemark").val($.trim(text));
		text = ''; // 清空
		$("#projectRemark")[0].focus();
	}else if(k==49 && $.trim(text) != ''){//项目名称1
		$("#projectName").val($.trim(text));
	}else if(k==50 && $.trim(text) != ''){//项目编号2
		$("#projectNum").val($.trim(text));
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
			if(fmoney($.trim(text)/10000,2) != null && fmoney($.trim(text)/10000,2) != ""){
				$("#fundScale").val(fmoney($.trim(text)/10000,2));
			}
		}
		text = ''; // 清空
		$("#fundScale")[0].focus();
	}else if(k==52 && $.trim(text) != ''){//建筑面积4
		//$("#buildArea").val($.trim(text));
		if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){ //包含数字和中文
			text = $.trim(text).substring(0,$.trim(text).length-1);
			$("#buildArea").val($.trim(text)*10000);
		}else{
			$("#buildArea").val($.trim(text));
		}
	/*}else if(k==53 && $.trim(text) != ''){//发布时间5
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#publishDate").val(formatDate($.trim(text)));
		}*/
	}else if(k==53 && $.trim(text) != ''){//文件发售截止时间6
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#fileSaleEndDate").val(formatDate($.trim(text)));
		}
	}else if(k==54 && $.trim(text) != ''){//现场勘探时间7
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#sceneExploreDate").val(formatDate($.trim(text)));
		}
	}else if(k==55 && $.trim(text) != ''){//开标时间8
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#openBidDate").val(formatDate($.trim(text)));
		}
	}else if(k==81 && $.trim(text) != ''){//标段编号q
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
	}else if(k==87 && $.trim(text) != ''){//标段名称w
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
	}else if(k==69 && $.trim(text) != ''){//标段招标金额E
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
	}else if(k==82 && $.trim(text) != ''){//标的物e
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
	}else if(k==65 && $.trim(text) != ''){//委托单位名称a
		var flag=0;
		$("input:text[id^='entrustUnitName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('wt',2,1, 0);
			$("input:text[id^='entrustUnitName']:last").val($.trim(text));
		}
	}else if(k==83 && $.trim(text) != ''){//委托联系人名称s
		var flag=0;
		$("input:text[id^='contactPersonName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text.replace(/\s+/g,"")));
			   return false;
		   }
		});
		if(flag == 0){
			//add('wtlxr',1,1,0);
			$("input:text[id^='contactPersonName']:last").val($.trim(text.replace(/\s+/g,"")));
		}
	}else if(k==68 && $.trim(text) != ''){//委托联系人联系方式d
		var flag=0;
		$("input:text[id^='contactTelePhone']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			//add('wtlxr',1,1,0);
			$("input:text[id^='contactTelePhone']:last").val($.trim(text));
		}
	}else if(k==90 && $.trim(text) != ''){//代理机构名称z
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
	}else if(k==88 && $.trim(text) != ''){//代理机构联系人名称x
		var flag=0;
		$("input:text[id^='agencyPersonName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text.replace(/\s+/g,"")));
			   return false;
		   }
		});
		if(flag == 0){
			//add('dllxr',1,2,0);
			$("input:text[id^='agencyPersonName']:last").val($.trim(text.replace(/\s+/g,"")));
		}
	}else if(k==67 && $.trim(text) != ''){//代理机构联系人联系方式c
		var flag=0;
		$("input:text[id^='agencyTelePhone']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			//add('dllxr',1,2,0);
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
	if(confirm('确定提交该操作?')){
		if ($("#projectName").val() == '') {
			alert('项目名称不能为空');
			return;
		}
		if ($("#province").val() == '' || $("#area").val() == '') {
			alert('地区不能为空');
			return;
		}

		var loadi = layer.load('数据处理中，请稍后...');
		var actionUrl = PATH+"/optChangeNotice/submitProject";
	
		$('#province1').val($('#province').val());
		$('#openBidProvince1').val($('#openBidProvince').val());
		$("#annouSonType").val($(".u-role-chosen").attr('title'));
		$("#area").val('中文/拼音' == $("#area").val() ? '' : $("#area").val());
		$("#openBidArea").val('中文/拼音' == $("#openBidArea").val() ? '' : $("#openBidArea").val());
		if($("#isManyPro_").attr("checked")=='checked'){
			$("#isManyPro").val("1");
		}

		$.ajax({
	        cache: true,
	        type: "POST",
	        url:actionUrl,
	        data:$('#agencyForm').serialize(),
	        async: false,
	        error: function(request) {
	            alert("提交失败！");
	            layer.close(loadi);
	        },
	        success: function(data) {
	        	if ("" != data) {
	    			if (data && data == "error") {
	    				alert("提交失败！");
	    			} else {
	    				var obj = eval(data);
	    				alert("[" + obj[0].title + "]提交成功！");
	    				window.location.href = PATH + "/optChangeNotice/init?currentPage="+$("#currentPage").val()+"&conOpt.title="+$("#title_").val();
	    			}
	    		} else {
	    			alert("提交失败！");
	    		}
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
		}else if(this.title=='builearea' && $.trim(text) != ''){
			//$(this).val($.trim(text));
			if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){ //包含数字和中文
				text = $.trim(text).substring(0,$.trim(text).length-1);
				$(this).val($.trim(text)*10000);
			}else{
				$(this).val($.trim(text));
			}
		}else if(this.title=='area'){
			$(this).val($.trim(text));
		}else if(this.title=='int' && $.trim(text) != ''){
			$(this).val(formatInteger$.trim((text)));
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
				$(this).val(text);
			}
			if($("#projectName").val() == ''){
				$("#projectName").val($.trim(text));
			}
		}else {
			if (0 <= $(this).attr('id').indexOf('agencyPersonName', 0) || 0 <= $(this).attr('id').indexOf('contactPersonName', 0)){
				$(this).val($(this).val() + $.trim(text.replace(/\s+/g,"")));
			}else{
				$(this).val($(this).val() + $.trim(text));
			}
			//$(this).val($(this).val() + $.trim(text));
		}
		text = ''; // 清空
	});
	// 新增文本框，并且新增文本内容
	$('img[name=appendText]').click(function() {
		if(this.title!='sub' && $.trim(text) != ''){
			var $tag=$(this).prev('input').clone().val(text);
			$tag.attr('remove','true');
			$tag.mousemove(Tips.showTips);
			// 添加ID隐藏域
			var str = $tag.attr('id');
			number = new Number(str.substring(15, str.length)) + 1;
			$(this).before("<input type=\"hidden\" name=\"productTypeList[" + number + "].productTypeId\" id=\"productTypeId" + number + "\"/>");
			$tag.attr('id', 'productTypeName' + number);
			$tag.attr('name', 'productTypeList[' + number + '].productTypeName')
			$(this).before($tag);
		}else{
			var $tag=$(this).prev('input').clone().val(text);
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
			var id = this.id;
			var length=$("input[id^=productTypeName]").length;
			if(length>1 && !this.id.match('sub')){
				number = new Number(this.id.substring(15, this.id.length))
				$("#productTypeId" + number).remove();
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
})

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
	var actionUrl = PATH + "/optChangeNotice/quicktype";
	var postData = {
		"conOpt.id" : $("#id").val(),
		"conOpt.infoType" : infoType
	};
	$.post(actionUrl, postData, function(data) {
		if ("" != data) {
			if (data == "success") {
				alert("快速分类成功");
				window.location.href = PATH+"/optChangeNotice/init";
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
	/*var dateText = '';
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
	text = text.replace(regexpDate, replacementDate).replace(/ /g,"");
	text = text.replace(regexpTime, replacementTime);
	text=text.replace(/\D$/,'');
	//dateText = text.match(regexp1);
	//timeText = text.match(regexp2);
	//return dateText+' '+timeText;
	dateText = text.match(regexp1);
	if(text.indexOf(" ")!=-1 || (text.split(replacementDate).length>3)){
		timeText = text.match(regexp2);
		return dateText+' '+timeText;
	}
	return dateText;*/
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

$(document).ready(function(){
	$(".gg-content").width($(".gg-container").width()/2-250);
	$(".gg-bb").width($(".gg-container").width()/2-250);
	$(".gg-bb").height($(window).height() - 100);
   /*var oDiv=document.getElementById("float");
   var H=0,iE6;
   var Y=oDiv;
   var L = Y.offsetLeft-8;
   while(Y){H+=Y.offsetTop;Y=Y.offsetParent};
   iE6=window.ActiveXObject&&!window.XMLHttpRequest;
   if(!iE6){
       window.onscroll=function()
       {
           var s=document.body.scrollTop||document.documentElement.scrollTop;
           var w=document.body.scrollLeft||document.documentElement.scrollLeft;
           if(s>H){
        	   oDiv.className="gg-content f-fl div2";
        	   if(iE6){
        		   oDiv.style.top=(s-H)+"px";
        		}
        	}else{oDiv.className="gg-content f-fl";}    
           oDiv.style.left= (L-w) +"px";
       };
   }*/
	
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
		   var id = $(".opt").eq(index).children("input[type='hidden']").attr('id');
		   
		   if(index == 0){
		   		var prevId = '';
		   	}else{
		   		var prevId = $(".opt").eq(index-1).children("input[type='hidden']").attr('id');
		   	}
		   	var nextId = $(".opt").eq(index+1).children("input[type='hidden']").attr('id');
		   	$("#id").val(id);
		   	$("#prev").val(prevId);
			$("#next").val(nextId);
		   
		   getContent(id);
	   });
   });
   //初始化数据
   $(".opt").eq(0).click();
});

function getContent(id)
{
	$(".removeClass").remove();
    $("input[remove=true]").remove();
    //$("input[type=text]").val('');
    $("input[type=text]:not([id='title_'])").val('');
	
	var actionUrl = PATH + "/optChangeNotice/connInfo";
	var postData = {
		"conOpt.id" : id
	};
	$.post(actionUrl, postData, function(data) {
		if(""!=data){
			var obj = eval(data);
			$("#title").html(obj[0].title);
			$("#content").html(obj[0].content);
			if(obj[0].catchTime != "null" && obj[0].catchTime != ''){
				$("#publishDate").val(obj[0].catchTime);
			}else{
				$("#publishDate").val('');
			}
			// 加载项目信息
			$('#projectId').val(obj[0].projectId);
			$('#projectName').val(obj[0].projectName);
			$('#projectNum').val(obj[0].projectNum);
			$('#fatherNode').val(obj[0].fatherNode);
			$('#projectName_').val(obj[0].projectName_);
			$('#projectRemark').val(obj[0].projectRemark);
			var fundScale = obj[0].fundScale;
			if(fundScale != "null" && fundScale !=null && fundScale != ''){
				if(/.*[\u4e00-\u9fa5]+.*$/.test($.trim(fundScale))){ 
					if(aNumber($.trim(fundScale)) != null && aNumber($.trim(fundScale)) !=""){
						$("#fundScale").val(fmoney(aNumber($.trim(fundScale))/10000,2));
					}
				}else{
					$("#fundScale").val(fmoney($.trim(fundScale),2));
				}
			}
			$('#buildArea').val(obj[0].buildArea);
			$('#openBidDate').val(obj[0].openBidDate);
			$('#publishDate').val(obj[0].publishDate);
			$('#openBidProvince').val(obj[0].openBidProvince);
			$('#openBidArea').val(obj[0].openBidArea);
			$('#fileSaleEndDate').val(obj[0].fileSaleEndDate);
			$('#sceneExploreDate').val(obj[0].sceneExploreDate);
			$('#province').val(obj[0].province);
			$('#area').val(obj[0].area);
			$('#fatherNode').val(obj[0].fatherNode);
			for (var i = 0; i < obj[0].subAnList.length; i++)
			{
				$subAn = obj[0].subAnList[i];
				if (0 < i)
				{
					add('bd',0,3, i);
				}
				$('#subId' + i).val($subAn.subId);
				$('#subName' + i).val($subAn.subName);
				$('#subNo' + i).val($subAn.subNo);
				$('#fundScale_' + i).val($subAn.fundScale);
			}
			for (var i = 0; i < obj[0].entrustAnList.length; i++)
			{
				$entrustAn = obj[0].entrustAnList[i];
				if (0 < i)
				{
					add('wt',2,1, i);
				}
				$('#entrustUnitId' + i).val($entrustAn.entrustUnitId);
				$('#entrustUnitName' + i).val($entrustAn.name);
				for (var j = 0; j < $entrustAn.contactPersonAnList.length; j++)
				{
					if (0 < j)
					{
						add('wtlxr',1,1, i);
					}
					$contactPerson = $entrustAn.contactPersonAnList[j];
					$('#contactPersonId' + i + '' + j).val($contactPerson.contactPersonId);
					$('#contactPersonName' + i + '' + j).val($contactPerson.name);
					$('#contactTelePhone' + i + '' + j).val($contactPerson.telePhone);
				}
			}
			for (var i = 0; i < obj[0].agencyAnList.length; i++)
			{
				$agencyAn = obj[0].agencyAnList[i];
				if (0 < i)
				{
					add('dl',2,2, i);
				}
				$('#agencyId' + i).val($agencyAn.agencyId);
				$('#agencyName' + i).val($agencyAn.agencyName);
				for (var j = 0; j < $agencyAn.agencyPersonAnList.length; j++)
				{
					if (0 < j)
					{
						add('dllxr',1,2, i);
					}
					$agencyPerson = $agencyAn.agencyPersonAnList[j];
					$('#agencyPersonId' + i + '' + j).val($agencyPerson.agencyPersonId);
					$('#agencyPersonName' + i + '' + j).val($agencyPerson.name);
					$('#agencyTelePhone' + i + '' + j).val($agencyPerson.telePhone);
				}
			}
			for (var i = 0; i < obj[0].productTypeList.length; i++)
			{
				$productType = obj[0].productTypeList[i];
				if (0 < i)
				{
					add('bdw',0,4, i);
				}
				$('#productTypeId' + i).val($productType.productTypeId);
				$('#productTypeName' + i).val($productType.productTypeName);
			}
			var announceStr = '';
			for (var i = 0; i < obj[0].announceEntityList.length; i++)
			{
				$announce = obj[0].announceEntityList[i];
				announceStr += '<div class="gg-box f-fl"><div class="gg-bage f-fl"><span>'+(i+1)+'</span></div>';
				announceStr += '<ul class="gg-list f-fr"><li class="opt2"><input type="hidden" name="annId" id="' + $announce.annouId + '"/>';
				announceStr += '<a href="javascript:void(0);">' + $announce.title + '</a></li></ul></div>';
			}
			$("#rightAnnou").html(announceStr);
			refreshRightMenu();
			if (0 < obj[0].announceEntityList.length)
			{
				$(".opt2").eq(0).click();
			}
            $(".gg-conbox").height($(window).height() - $(".gg-search-con").height() - 100);
            $(".gg-conbox2").height($(window).height() - 60);
		}
	});
	
}

function refreshRightMenu()
{
   $(".opt2").each(function(index){
	   $(this).click(function(){
		   	var id = $(".opt2").eq(index).children("input[type='hidden']:eq(0)").attr('id');
			var actionUrl = PATH + "/optdata/resultChangeInfo";
			var postData = {
				"conAnnounce.annouId" : id
			};
			if(id != ''){
				$.post(actionUrl, postData, function(data) {
					if(""!=data){
						var obj = eval(data);
						$("#title2_").html(obj[0].title);
						$("#content_").html(obj[0].content);
					}
				});
			}
	   })
   });

}

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

function textCounter(content,maxlimit) {
	if (content.value.length > maxlimit)
		content.value = content.value.substring(0,maxlimit);
}
function resetData(){
	var id = $("input[type='hidden'][id='id']:last").val();
	getContent(id);
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
		var url = PATH + "/search/result";
	 	$("#searchForm").attr("action", url);
		$('#searchForm').submit();
	}
}
 //新增行
var iii = 0;
 function add(divId,flag,wtDlFlag, number){
     var newDiv = document.createElement('div');  
     var str = "";
     var number2 = 0;
     if(wtDlFlag==1){//委托单位
    	 if(flag == 1){
    		 var str = $("input[id^='contactPersonId"+number+"']:last").attr('id');
    		 number2 = new Number(str.substring(15+number.toString().length, str.length)) + 1;
   			 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
   			 str += " <input type=\"hidden\" name=\"entrustAnList["+number+"].lstCon["+number2+"].contactPersonId\" id=\"contactPersonId"+number+""+number2+"\" /><input type=\"text\" remove=true name=\"entrustAnList["+number+"].lstCon[" + number2 + "].name\" id=\"contactPersonName"+number+""+number2+"\" maxlength=\"50\"  onblur=\"subStr(this,50)\"/>";
			 str +="</div><div class=\"block\"><label name=\"copyGroup\">联系方式：</label> <input type=\"text\" name=\"entrustAnList["+number+"].lstCon[" + number2 + "].telePhone\" remove=true id=\"contactTelePhone"+number+""+number2+"\" maxlength=\"50\"  onblur=\"subStr(this,50)\"/> <a href=\"javascript:delItem('"+divId + number+""+number2+"');\"><img src=\"" + PATH + "/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div>";  
         }else{
        	 var str = $("input[id^='entrustUnitId']:last").attr('id');
        	 number = new Number(str.substring(13, str.length));
        	 number++;
        	 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">委托单位：</label>";
        	 str += " <input type=\"text\" remove=true name=\"entrustAnList[" + number + "].name\" id=\"entrustUnitName" + number + "\" maxlength=\"50\" onblur=\"subStr(this,50)\"/><input type=\"hidden\" name=\"entrustAnList[" + number + "].entrustUnitId\" id=\"entrustUnitId" + number + "\"/>";
			 str +=" <a href=\"javascript:delItem('"+divId + number +"');\"><img src=\"" + PATH + "/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\" /></a></div></div>";
			 str +="<div id=\"wtlxr"+ number +"0\"><div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
			 str +=" <input type=\"text\" remove=true name=\"entrustAnList["+number+"].lstCon[0].name\" id=\"contactPersonName"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/><input type=\"hidden\" name=\"entrustAnList["+number+"].lstCon[0].contactPersonId\" id=\"contactPersonId"+number+"0\" />";
			 str +=" </div><div class=\"block\"><label name=\"copyGroup\">联系方式：</label><input type=\"text\" remove=true name=\"entrustAnList["+number+"].lstCon[0].telePhone\" id=\"contactTelePhone"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
			 str +=" <a href=\"javascript:add('wtlxr', 1, 1, "+number+");\"><img src=\"" + PATH + "/image/1.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div></div>";
         }
     }else if(wtDlFlag==2){//代理机构
    	 if(flag == 1){
    		 var str = $("input[id^='agencyPersonId"+number+"']:last").attr('id');
        	 number2 = new Number(str.substring(14+number.toString().length, str.length)) + 1;
   			 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
   			 str += " <input type=\"hidden\" name=\"agencyAnList["+number+"].lstAgen["+number2+"].agencyPersonId\" id=\"agencyPersonId"+number+""+number2+"\" /><input type=\"text\" remove=true name=\"agencyAnList["+number+"].lstAgen["+number2+"].name\" id=\"agencyPersonName"+number+""+number2+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/></div>";
			 str +="<div class=\"block\"><label name=\"copyGroup\">联系方式：</label> <input type=\"text\" remove=true name=\"agencyAnList["+number+"].lstAgen["+number2+"].telePhone\" id=\"agencyTelePhone"+number+""+number2+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
			 str +=" <a href=\"javascript:delItem('"+divId + number+""+number2+"');\"><img src=\"" + PATH + "/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div>";
    	 }else{
        	 var str = $("input[id^='agencyId']:last").attr('id');
        	 number = new Number(str.substring(8, str.length));
    		 number++;
    		 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">代理机构：</label>";
    		 str += " <input type=\"hidden\" name=\"agencyAnList["+number+"].agencyId\" id=\"agencyId"+number+"\"/><input type=\"text\" remove=true name=\"agencyAnList["+number+"].agencyName\" id=\"agencyName"+number+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
			 str +=" <a href=\"javascript:delItem('"+divId + number+"');\"><img src=\"" + PATH + "/image/2.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div>";
			 str +="<div id=\"dllxr"+number+"0\"><div class=\"clear\"></div><div class=\"row\"><div class=\"block\"><label name=\"copyGroup\">联系人：</label>";
			 str +=" <input type=\"hidden\" name=\"agencyAnList["+number+"].lstAgen[0].agencyPersonId\" id=\"agencyPersonId"+number+"0\" /><input type=\"text\" name=\"agencyAnList["+number+"].lstAgen[0].name\" remove=true id=\"agencyPersonName"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/></div><div class=\"block\"><label name=\"copyGroup\">联系方式：</label>";
			 str +=" <input type=\"text\" name=\"agencyAnList["+number+"].lstAgen[0].telePhone\" remove=true id=\"agencyTelePhone"+number+"0\" maxlength=\"50\" onblur=\"subStr(this,50)\"/><a href=\"javascript:add('dllxr',1,2, "+number+");\"><img src=\"" + PATH + "/image/1.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a></div></div></div>";
    	 }
     }else if (wtDlFlag==3){
    	 var str = $("input[id^='subId']:last").attr('id');
   		 number = new Number(str.substring(5, str.length)) + 1;
    	 str ="<div class=\"clear\"></div><div class=\"row\"><div class=\"block\" style=\"min-width: 200px\"><input type=\"checkbox\" id=\"flag" + number + "\" name=\"subAnList[" + number + "].flag\" onclick=\"selectClick(" + number + ")\" /> <label name=\"copyGroup\">标段编号：</label>";
		 str +=" <input type=\"text\" name=\"subAnList[" + number + "].subNo\" id=\"subNo" + number + "\" maxlength=\"50\" onblur=\"subStr(this,50)\" style=\"width: 90px; min-width: 90px;\"/><input type=\"hidden\" name=\"subAnList[" + number + "].subId\" id='subId" + number + "'/>";
		 str +="</div><div class=\"block\" style=\"min-width: 200px\"><label name=\"copyGroup\">标段名称：</label> <input type=\"text\" style=\"width: 110px; min-width: 110px;\" remove=true name=\"subAnList[" + number + "].subName\" id=\"subName" + number + "\" remove=true maxlength=\"50\" title=\"subs\" onblur=\"subStr(this,50)\"/></div>";
		 str +="<div class=\"block\" style=\"min-width: 200px\"><label name=\"copyGroupDouble\">招标金额：</label> <input type=\"text\" name=\"subAnList["+number+"].fundScale_\" id=\"fundScale_"+number+"\" maxlength=\"50\" title=\"double2\"  onblur=\"check(2,this);\" placeholder=\"快捷键E\" style=\"width: 40px; min-width: 40px;\"/>万元";
		 str +=" <a href=\"javascript:delItem('"+divId + number+"');\"><img src=\"" + PATH + "/image/2.png\" style=\"height: 18px;width:18px;\"/></a></div>";
     } else {
    	 var str = $("input[id^='productTypeId']:last").attr('id');
   		 number = new Number(str.substring(13, str.length)) + 1;
   		 str="<div class=\"block\"><label name=\"copyGroup\">标的物：</label><input type=\"hidden\" name=\"productTypeList[" + number + "].productTypeId\" id='productTypeId" + number + "'/>";
	   	 str+=" <input type=\"text\" style=\"width: 90px;min-width:90px\" name=\"productTypeList["+number+"].productTypeName\" id=\"productTypeName" + number + "\" maxlength=\"20\" onblur=\"subStr(this,20)\"/>";
	   	 str+=" <a href=\"javascript:delItem('"+divId + number+"');\"><img src=\"" + PATH + "/image/2.png\" style=\"height: 18px;width:18px;\"/></a>";
	   	 str+"</div>";
    	 
     }
     
     
     newDiv.innerHTML = str; 
     var dId = divId + number;
     var dId1 = dId;
     if (1 == flag)
   	 { 
    	 dId += number2;
    	 number2--;
    	 dId1 = divId + number + number2;
   	 }
     else
     {
    	 number--;
    	 dId1 = divId + number;
     }
     newDiv.id = dId;
     newDiv.className="removeClass";
     $("#"+dId1).after(newDiv);  
     $("input[remove=true]").click(notice.copyText);  //绑定事件
     $("input[remove=true]").click();  //触发点击事件
     $("label[name=copyGroupDouble]").click(notice.labelReplace);  //绑定事件
     $('label[name=copyGroup]').click(notice.labelGroup);  //绑定事件
 	 $('label[name=copyDate]').click(notice.labelDate);  //绑定事件
     
     if(iii==0){
    	 $(window).scrollTop($(window).scrollTop()+1);$(window).scrollTop($(window).scrollTop()-1);
     }
     iii++;
 }
 //删除行
 function delItem(divId) {
     $("#"+divId).remove();  
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
 		} else
 			numArray[i] = 0;
 	}
 	if(/.*[\u4e00-\u9fa5]+.*$/.test(numArray)){
 		return "";
 	}else{
 		return eval(numArray.join("+"));
 	}
 }
 
//验证资金来源正确性
	function check(flag,thisVal) {
		if(flag == '1'){
			var fundScale=$("#fundScale").val();
			if(fundScale != ''){
				if(!isNaN(fundScale)){
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
				}
			}
		}else{
			var fundScale=$(thisVal).val();
			if(fundScale != ''){
				if(!isNaN(fundScale)){
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
				}
			}
		}
	} 
	
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
	// 多选框
	function selectClick(flagNum){
		if($('#flag'+flagNum).is(':checked')) {
		    $("#flag"+flagNum).val("1");
		}else{
			$("#flag"+flagNum).val("");
		}
	}
