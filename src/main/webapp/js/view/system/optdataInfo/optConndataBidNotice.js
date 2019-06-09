var bidNotice={};
//复制文本内容
bidNotice.copyText=function(){
	$('input[type=text]').focusin(function() {
		if(this.title=='double'){
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
		}else{
			if ('projectManager' == $(this).attr('id') || 0 <= $(this).attr('id').indexOf('expertName', 0)){
				$(this).val($(this).val() + $.trim(text.replace(/\s+/g,"")));
			}else{
				$(this).val($(this).val() + $.trim(text));
			}
		}
		text = ''; // 清空
	});
}

//双击删除文本框
bidNotice.deleteInput=function(){
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
}

//添加文本框
bidNotice.addText=function (){
	var $tag=$(this).prev('input').clone().val($.trim(text));
	$tag.attr('remove','true');
	$tag.mousemove(Tips.showTips);
	$(this).before($tag);
	text = '';
	bidNotice.copyText();
	bidNotice.deleteInput();
}

bidNotice.labelGroup = function(){
	if($.trim(text) != ''){
		$(this).next().val($.trim(text));
		text = '';
	}
}

bidNotice.labelDate = function(){
	if($.trim(text) != ''){
		$(this).next().val(formatDate($.trim(text)));
		text = '';
	}
}

bidNotice.labelReplace = function(){
	var reg = /^[\u4E00-\u9FA5]+$/;
	if(reg.test(text)){ //全中文
		if(fmoney(aNumber($.trim(text))/10000,2) != null && fmoney(aNumber($.trim(text))/10000,2) !=""){
			$(this).next().val(fmoney(aNumber($.trim(text))/10000,2));
		}
	}else if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){//包含数字和中文
		text = $.trim(text).substring(0,$.trim(text).length-1);
		text = fmoney(text,2);
		if(text != null && text != ""){
			$(this).next().val(fmoney(text,2));
		}
	}else{ //纯数字
		if(fmoney($.trim(text)/10000,2) != null && fmoney($.trim(text)/10000,2) != ""){
			$(this).next().val(fmoney($.trim(text)/10000,2));
		}
	}
   text = ''; // 清空
}

bidNotice.labelPerson = function(){
	if($.trim(text) != ''){
		$(this).next().val($.trim(text));
		text = '';
	}
}

$(document).keyup(function(event){
	var e = event || window.event; 
	var k = e.keyCode || e.which;
	//var id=$("input:focus").attr("id");   keyup
	//$("#"+id).val("");//清空
	if(k==49 && $.trim(text) != ''){//项目名称1
		$("#projectName").val($.trim(text));
	}else if(k==50 && $.trim(text) != ''){//项目编号2
		$("#projectNum").val($.trim(text));
	}else if(k==51 && $.trim(text) != ''){//中标日期3
		if(formatDate($.trim(text)) != null && formatDate($.trim(text)) != ''){
			$("#bidTime").val(formatDate($.trim(text)));
		}
	}else if(k==52 && $.trim(text) != ''){//中标候选人4
		var flag=0;
		$("input:text[id^='supplierName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('gys0',0,1);
			$("input:text[id^='supplierName']:last").val($.trim(text));
		}
	}else if(k==53 && $.trim(text) != ''){//中标金额5
		var flag=0;
		$("input:text[id^='bidMoney']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   var reg = /^[\u4E00-\u9FA5]+$/;
				if(reg.test(text)){ //全中文
					if(fmoney(aNumber($.trim(text))/10000,2) != null && fmoney(aNumber($.trim(text))/10000,2) !=""){
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
		   }
		});
		if(flag == 0){
			add('gys0',0,1);
			var reg = /^[\u4E00-\u9FA5]+$/;
			if(reg.test(text)){ //全中文
				if(fmoney(aNumber($.trim(text))/10000,2) != null && fmoney(aNumber($.trim(text))/10000,2) !=""){
					$("input:text[id^='bidMoney']:last").val(fmoney(aNumber($.trim(text))/10000,2));
				}
			}else if(text.match(/\d+/g) && escape(text).indexOf("%u")>=0){//包含数字和中文
				text = $.trim(text).substring(0,$.trim(text).length-1);
				text = fmoney(text,2);
				if(text != null && text != ""){
					$("input:text[id^='bidMoney']:last").val(fmoney(text,2));
				}
			}else{ //纯数字
				if(fmoney($.trim(text)/10000,2) != null && fmoney($.trim(text)/10000,2) != ""){
					$("input:text[id^='bidMoney']:last").val(fmoney($.trim(text)/10000,2));
				}
			}
			text = ''; // 清空
			$("input:text[id^='bidMoney']:last")[0].focus();
		}
	}else if(k==54 && $.trim(text) != ''){//项目经理6
		var flag=0;
		$("input:text[id='projectManager']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text.replace(/\s+/g,"")));
			   return false;
		   }
		});
		if(flag == 0){
			add('gys0',0,1);
			$("input:text[id='projectManager']:last").val($.trim(text.replace(/\s+/g,"")));
		}
	}else if(k==55 && $.trim(text) != ''){//联系方式7
		var flag=0;
		$("input:text[id='telePhones']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text));
			   return false;
		   }
		});
		if(flag == 0){
			add('gys0',0,1);
			$("input:text[id='telePhones']:last").val($.trim(text));
		}
	}else if(k==56 && $.trim(text) != ''){
		var flag=0;
		$("input:text[id^='expertName']").each(function(i){
		   if($(this).attr("value")==''){
			   flag++;
			   $(this).val($.trim(text.replace(/\s+/g,"")));
			   return false;
		   }
		});
		if(flag == 0){
			add('zj','',2);
			$("input:text[id^='expertName']:last").val($.trim(text.replace(/\s+/g,"")));
		}
	}
	text = ''; // 清空
}); 

// 提交
function openMask() {
	if ($("#projectName").val() == '') {
		alert('项目名称不能为空');
		return;
	}
	if($("#isManyPro_").attr("checked")=='checked'){
		$("#isManyPro").val("1");
	}
	if(confirm('确定提交该操作?')){
		var loadi = layer.load('数据处理中，请稍后...');
		var actionUrl = PATH+"/optdata/submitProjectBidNotice";
		
		$.ajax({
	        cache: true,
	        type: "POST",
	        url:actionUrl,
	        data:$('#connForm').serialize(),
	        async: false,
	        error: function(request) {
	            alert("提交失败！");
	            layer.close(loadi);
	        },
	        success: function(data) {
	        	if ("" != data) {
	    			if (data && data == "error") {
	    				alert("提交失败！");
	    				layer.close(loadi);
	    				return;
	    			} else {
	    				var obj = eval(data);
	    				//alert("[" + obj[0].title + "]提交成功，合并" + obj[0].count
	    				//		+ "条重复公告");
	    				alert("[" + obj[0].title + "]提交成功");
	    				window.location.href = PATH + "/optdata/optConndataBidNotice?currentPage="+$("#currentPage").val()+"&conOpt.title="+$("#title_").val();
	    				layer.close(loadi);
	    			}
	    		} else {
	    			alert("提交失败！");
	    			layer.close(loadi);
	    		}
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
	// 点击文本，文本累加
	$('input[type=text]').focusin(function() {
		if (this.name.match(/Date$/) && $.trim(text) != '') {
			$(this).val(formatDate($.trim(text)));
		}else if(this.title=='area' && $.trim(text) != ''){
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
		}else {
			if ('projectManager' == $(this).attr('id') || 0 <= $(this).attr('id').indexOf('expertName', 0)){
				$(this).val($(this).val() + $.trim(text.replace(/\s+/g,"")));
			}else{
				$(this).val($(this).val() + $.trim(text));
			}
			//$(this).val($(this).val() + $.trim(text));
		}
		text = ''; // 清空
	});
	// 点击标题覆盖文本
	/*$('label[name=copyGroup]').click(function() {
		$(this).next().val($.trim(text));
		text = '';
	});*/
	$('label[name=copyGroup]').click(bidNotice.labelGroup);
	// 点击标题覆盖日期
	/*$('label[name=copyDate]').click(function() {
		$(this).next().val(formatDate($.trim(text)));
		text = '';
	});*/
	$('label[name=copyDate]').click(bidNotice.labelDate);
	
	$('label[name=copyGroupDouble]').click(bidNotice.labelReplace);
	
	$('label[name^=personNum]').click(bidNotice.labelPerson);

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
	var actionUrl = PATH + "/optdata/quicktype";
	var postData = {
		"conOpt.id" : $("#id").val(),
		"conOpt.infoType" : infoType
	};
	$.post(actionUrl, postData, function(data) {
		if ("" != data) {
			if (data == "success") {
				alert("快速分类成功");
				window.location.href = PATH+"/optdata/optConndataBidNotice";
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
	var regexp = /\D{1,}/g;
	var regexp2 = /\d{1,4}-\d{1,2}-\d{1,2}/;
	var replacement = '-';
	if (text == undefined || text == null || text == '') {
		return '';
	}
	dateText = text.replace(regexp, replacement).replace(/ /g,"");
	dateText = dateText.match(regexp2);
	return dateText;
}
/**
 * 格式化日期字符串
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

//数字转中文
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

//中文转数字
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


////////////////js////////////////
/*$(document).ready(function(){
	$.ajax({
         type: "POST",
         url: PATH+"/projectAn/getProjectNames",
         dataType: "json",
         success: function (data) {
        	 if(data != null && data != ''){
	        	 var obj = eval(data);
	        	 var availableTags = new Array();
	        	 for(var i = 0;i<obj.length;i++){
	        		 availableTags[i] = {label:obj[i].data, category:obj[i].value, proNum:obj[i].proNum, proId:obj[i].proId, annouId:obj[i].annouId};
	        	 }
	             $("#projectName").autocomplete({
	     			max :10,
	     			source:availableTags,
	     			select: function( event, ui ) { //下拉框选择事件  
	                    //alert(ui.item.proNum);  
	                    //alert(ui.item.label);  
	                    $("#projectNum").val(ui.item.proNum);
	                    $("#projectId").val(ui.item.proId);
	                    $("#subStr").html('');
	                    subInfo(ui.item.category,ui.item.annouId);
	                }
	     		});
	         }
         }
	});
});*/

 //获取项目信息
 /*function subByProName(strLength){
	 var projectName = $("#projectName").val();
	 if(projectName != '' && getStrLeng(projectName)>strLength){
		 projectName = projectName.substr(0,strLength);
	 }
	 
	 $.ajax({
     	 type: "POST",
         url: PATH+"/projectAn/getProInfoByName?projectAnEntity.projectName="+encodeURIComponent(projectName),
         dataType: "json",
         contentType: "application/x-www-form-urlencoded; charset=utf-8",
         success: function (data) {
        	 if(data != null && data != ''){
        		var obj = eval(data);
        		if(obj[0].projectNum != "null" && obj[0].projectNum != ''){
        			$("#projectNum").val(obj[0].projectNum);
        		}
        		if(obj[0].projectId != "null" && obj[0].projectId != ''){
                	$("#projectId").val(obj[0].projectId);
                	subInfo(obj[0].projectId);
        		}
                if(obj[0].projectName != "null" && obj[0].projectName != ''){
                	$("#projectName").val(obj[0].projectName);
				}
                $("#subStr").html('');
        	 }
         }
     });
 }*/

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
 
 // 查询项目是否有分包信息
 function subInfo(projectId,annouId){
	//开始取数据
     $.ajax({
     	 type: "POST",
	         url: PATH+"/subAn/getSubInfo",
	         data:{"subAnEntity.projectId":projectId,
	        	   "subAnEntity.connId":annouId},
	         dataType: "json",
	         success: function (data) {
	        	 if(data != null && data != ''){
	        		var obj = eval(data);
	        		var subStr="";
	        	 	for(var i = 0;i<obj.length;i++){
	    	 			if(subStr != ''){
	    	 				subStr +="<div class='clear'></div><div class=\"row\"><div class='block' style=\"min-width: 200px\"><input type=\"checkbox\" id=\"flag" + i + "\" name=\"subAnEntityList[" + i + "].flag\" onclick=\"selectClick(" + i + ")\" /> <label name='copyGroup'>标段编号：</label> <input type='text' readonly=\"readonly\" name='subEntity.subNo' remove=true id='subNo' maxlength='50' onblur=\"subStr(this,50)\" value='"+obj[i].subNo+"' style=\"width: 100px; min-width: 100px;\"/>";
	    	 			}else{
	    	 				subStr ="<div class='clear'></div><div class=\"row\"><div class='block' style=\"min-width: 200px\"><input type=\"checkbox\" id=\"flag" + i + "\" name=\"subAnEntityList[" + i + "].flag\" onclick=\"selectClick(" + i + ")\" /> <label name='copyGroup'>标段编号：</label> <input type='text' readonly=\"readonly\" name='subEntity.subNo' remove=true id='subNo' maxlength='50' onblur=\"subStr(this,50)\" value='"+obj[i].subNo+"' style=\"width: 100px; min-width: 100px;\"/>";	
	    	 			}
	    	 			subStr +="<input type='hidden' id='subId' name='subAnEntityList["+i+"].subId' value='"+obj[i].subId+"'/></div><div class='block' style=\"min-width: 200px\"><label name='copyGroup'>标段名称：</label>";
	    	 			subStr +=" <input type='text' name='subName' id='subName' remove=true maxlength='100' value='"+obj[i].subName+"' readonly=\"readonly\" onblur=\"subStr(this,100)\" style=\"width: 130px; min-width: 130px;\"/></div>";
	    	 			subStr +=" <div class='block' style=\"min-width: 200px\"><label name='copyGroup'>招标金额：</label>";
	    	 			subStr +=" <input type='text' name='fundScale' id='fundScale' remove=true maxlength='10' value='"+obj[i].fundScale+"' readonly=\"readonly\" style=\"width: 60px; min-width: 60px;\"/>万元</div>";
	    				subStr +=" </div>";
	    				
	    				subStr +="<div id=\"gys"+i+"\">";
	    				subStr +="<div class=\"clear\"></div>";
	    				subStr +="<div class=\"row\">";
	    				subStr +="<div class='block'><label name='personNum"+i+"'>第1候选人：</label> <input type='text' remove=true name='subAnEntityList["+i+"].bidSupplierAnList[0].supplierName' id='supplierName"+i+"0' maxlength='100' onblur=\"subStr(this,100)\" placeholder=\"快捷键4\"/></div>";
	    				subStr +="<div class='block_time'><label name='copyGroupDouble'>中标金额：</label>";
	    				subStr +=" <input type='text' remove=true name='subAnEntityList["+i+"].bidSupplierAnList[0].bidMoney_' id='bidMoney"+i+"' title='double' maxlength='10' onblur=\"check(this,'bidMoney"+i+"',10)\"  onkeyup=\"this.value=this.value.replace(/[^0-9.]/g,'')\" placeholder=\"快捷键5\"/>万元</div>";
	    				subStr +="</div>";
	    				subStr +="<div class=\"clear\"></div>";
	    				subStr +="<div class=\"row\">";
	    				subStr +="<div class=\"block\"><label>项目经理：</label>";
	    				subStr +=" <input type=\"text\" remove=true name=\"subAnEntityList["+i+"].bidSupplierAnList[0].projectManager\" id=\"projectManager\" maxlength=\"50\" onblur=\"subStr(this,50)\" class='inputBlock' placeholder=\"快捷键6\"/></div>";
	    				subStr +="<div class=\"block\"><label>联系方式：</label>";
	    				subStr +=" <input type=\"text\" remove=true name=\"subAnEntityList["+i+"].bidSupplierAnList[0].telePhones\" id=\"telePhones\" maxlength=\"50\" onblur=\"subStr(this,50)\" class='inputBlock' placeholder=\"快捷键7\"/>";
	    				subStr +="&nbsp;<a href=\"javascript:add('gys"+i+"',"+i+",1)\"><img src='"+PATH+"/image/1.png' style='height: 18px;width:18px;' /></a>";
	    				subStr +="</div>";
	    				subStr +="</div>";
	    				subStr +="</div>";
	        	 	}
	        	 	$("#subStr").append(subStr);
	        	 	$(".gg-conbox").height($(window).height() - $(".gg-search-con").height() - 100);
	        	 	$(".gg-conbox2").height($(window).height() - 60);
	        	 	$("input[remove=true]").click(bidNotice.copyText);  //绑定事件
	      	        $("input[remove=true]").click();  //触发点击事件
	      	        $('label[name=copyGroup]').click(bidNotice.labelGroup);  //绑定事件
	      	        $('label[name=copyDate]').click(bidNotice.labelDate);  //绑定事件
	      	        $('label[name=copyGroupDouble]').click(bidNotice.labelReplace);
	      	        $('label[name^=personNum]').click(bidNotice.labelPerson);
	        	 }
	         },
	          error: function (data) {
	         	 var subStr ="<div id='gys0'>";
	         	 	 subStr +="<input type='hidden' id='subId' name='subAnEntityList[0].subId'/>";
	         	 	 subStr +="<div class=\"clear\"></div>";
	         	 	 subStr +="<div class=\"row\">";
	         	 	 subStr +="<div class=\"block\"><label name='personNum0'>第1候选人：</label> <input remove=true type=\"text\" remove=true name=\"subAnEntityList[0].bidSupplierAnList[0].supplierName\" title=\"int\" id=\"supplierName00\" maxlength=\"100\" onblur=\"subStr(this,100)\" placeholder=\"快捷键4\"/></div>";
	         	 	 subStr +="<div class=\"block_time\"><label name='copyGroupDouble'>中标金额：</label>";
	         	 	 subStr +=" <input type=\"text\" remove=true name=\"subAnEntityList[0].bidSupplierAnList[0].bidMoney_\" title=\"double\" id=\"bidMoney0\" maxlength=\"10\" onblur=\"check(this,'bidMoney0',10)\"  onkeyup=\"this.value=this.value.replace(/[^0-9.]/g,'')\" placeholder=\"快捷键5\"/>万元</div>";
	         	 	 subStr +="</div>";
	         	 	 subStr +="<div class=\"clear\"></div>";
	         	 	 subStr +="<div class=\"row\">";
	         	 	 subStr +=" <div class=\"block\"><label name=\"copyGroup\" >项目经理：</label>";
					 subStr +=" <input type=\"text\" remove=true name=\"subAnEntityList[0].bidSupplierAnList[0].projectManager\" id=\"projectManager\" maxlength=\"50\" onblur=\"subStr(this,50)\" class='inputBlock' placeholder=\"快捷键6\"/></div>";
					 subStr +=" <div class=\"block\"><label name=\"copyGroup\" >联系方式：</label>";
					 subStr +=" <input type=\"text\" remove=true name=\"subAnEntityList[0].bidSupplierAnList[0].telePhones\" id=\"telePhones\" maxlength=\"50\" onblur=\"subStr(this,50)\" class='inputBlock' placeholder=\"快捷键7\"/>";
					 subStr +="&nbsp;<a href=\"javascript:add('gys0',0,1)\"><img src=\""+PATH+"/image/1.png\" style=\"height: 18px;width:18px;\" alt=\"\"/></a>";
					 subStr +="</div></div></div>";
					 $("#subStr").append(subStr);
					 $(".gg-conbox").height($(window).height() - $(".gg-search-con").height() - 100);
					 $("input[remove=true]").click(bidNotice.copyText);  //绑定事件
		   	         $("input[remove=true]").click();  //触发点击事件
		   	         $('label[name=copyGroup]').click(bidNotice.labelGroup);  //绑定事件
		   	 	     $('label[name=copyDate]').click(bidNotice.labelDate);  //绑定事件
		   	 	     $('label[name=copyGroupDouble]').click(bidNotice.labelReplace);
		   	 	     $('label[name^=personNum]').click(bidNotice.labelPerson);
	          }
     });
     //结束
 }
 
 // 获取该项目下所有公告信息
 function announceInfo(projectId){
	//开始取数据
     $.ajax({
     	 type: "POST",
	         url: PATH+"/optdata/getAnnouList",
	         data:{"conAnnounce.projectId":projectId},
	         dataType: "json",
	         success: function (data) {
	        	 if(data != null && data != ''){
	        		 var obj = eval(data);
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
	        	 }
	         }
     });
 }
 
 //新增行
 var iii= 0;
 function add(divId,num,flag){
     var newDiv = document.createElement('div');  
     var str = "";
     var number;
     if(flag==1){//供应商
    	 var strNum = $("input[id^='supplierName"+num+"']:last").attr('id');
    	 number = new Number(strNum.substring(12+num.toString().length, strNum.length)) + 1;
         	 str +="<div class=\"clear\"></div>";
         	 str +="<div class=\"row\">";
         	 str +="<div class='block'><label name='personNum"+num+"'>候选人：</label> <input type='text' remove=true name='subAnEntityList["+num+"].bidSupplierAnList[" + number + "].supplierName' id=\"supplierName"+num+""+number+"\" maxlength='100' onblur=\"subStr(this,100)\"/></div>";
         	 str +="<div class='block_time'><label name='copyGroupDouble'>中标金额：</label>";
         	 str +=" <input type='text' name='subAnEntityList["+num+"].bidSupplierAnList[" + number + "].bidMoney_' remove=true title='double' id='bidMoney"+num+""+number+"' maxlength='10' onblur=\"check(this,'bidMoney"+num+""+number+"',10)\"  onkeyup=\"this.value=this.value.replace(/[^0-9.]/g,'')\"/>万元</div>";
         	 str +="</div>";
         	 str +="<div class=\"clear\"></div>";
         	 str +="<div class=\"row\">";
         	 str +=" <div class=\"block\"><label name=\"copyGroup\" >项目经理：</label>";
         	 str +=" <input type=\"text\" name=\"subAnEntityList["+num+"].bidSupplierAnList[" + number + "].projectManager\" id=\"projectManager\" maxlength=\"50\" onblur=\"subStr(this,50)\" class='inputBlock'/></div>";
         	 str +=" <div class=\"block\"><label name=\"copyGroup\" >联系方式：</label>";
         	 str +=" <input type=\"text\" remove=true name=\"subAnEntityList["+num+"].bidSupplierAnList[" + number + "].telePhones\" id=\"telePhones\" maxlength=\"50\" onblur=\"subStr(this,50)\" class='inputBlock'/>";
         	 str +="&nbsp;<a href=\"javascript:delItem('gys"+num+""+number+"',"+num+",1)\"><img src='"+PATH+"/image/2.png' style='height: 18px;width:18px;' /></a></div></div>";
     }else{//专家
    	 var strNum = $("input[id^='expertName']:last").attr('id');
    	 number = new Number(strNum.substring(10, strNum.length)) + 1;
    	 if(iii%2==1){
     		str +="<div style=\"width:100%; height:1px; line-height:1px; font-size:0px; float:left;\"></div>";
     	 }
    	 str +="<div class=\"block\"><label name=\"copyGroup\">专家名称：</label> <input type=\"text\" name=\"expertAnEntityList["+number+"].expertName\" id=\"expertName"+number+"\" maxlength=\"50\" onblur=\"subStr(this,50)\"/>";
    	 str +=" <a href=\"javascript:delItem('zj"+number+"','',2)\"><img src='"+PATH+"/image/2.png' style='height: 18px;width:18px;' /></a></div>";
    	 iii++;
     }
     
     newDiv.innerHTML = str;  
     newDiv.id = divId+number;
     newDiv.className="removeClass";
     $("#"+divId).append(newDiv);  
     $("input[remove=true]").click(bidNotice.copyText);  //绑定事件
     $("input[remove=true]").click();  //触发点击事件
     $('label[name=copyGroup]').click(bidNotice.labelGroup);  //绑定事件
 	 $('label[name=copyDate]').click(bidNotice.labelDate);  //绑定事件
 	 $('label[name=copyGroupDouble]').click(bidNotice.labelReplace);
 	 $('label[name^=personNum]').click(bidNotice.labelPerson);
     upSupNum(flag,num);
 }
 
 //更新供应商排序号
 function upSupNum(flag,num){
	 if (1 == flag){
		 $("label[name='personNum"+num+"']").each(function(i){
    		 $(this).html('第'+(i+1)+'候选人：');
    	});
     }
 }
 
 //删除行
 function delItem(divId,num,flag) {
	 $("#"+divId).remove();  
	 if (1 == flag){
     	upSupNum(flag,num);
	 }
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
		    $("input[remove=true]").remove();
		    //$("input[type=text]").val('');
		    $("input[type=text]:not([id='title_'])").val('');
		    $("div[id^=zj]:not([id='zj'])").remove();
		   
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
			var actionUrl = PATH+"/optdata/connInfo";
			var postData = {
				"conOpt.id" : id
			};
			if(id != ''){
				$.post(actionUrl, postData, function(data) {
					if(""!=data){
						var obj = eval(data);
						$("#title").html(obj[0].title);
						$("#content").html(obj[0].content);
						if(obj[0].catchTime != "null" && obj[0].catchTime != ''){
							$("#bidTime").val(obj[0].catchTime);
						}else{
							$("#bidTime").val('');
						}
						
						if(obj[0].projectNum != "null" && obj[0].projectNum !=null && obj[0].projectNum != ''){
							$("#projectNum").val(obj[0].projectNum);
						}
						if(obj[0].projectId != "null" && obj[0].projectId !=null && obj[0].projectId != ''){
	                    	$("#projectId").val(obj[0].projectId);
	                    	subInfo(obj[0].projectId);
	                    	announceInfo(obj[0].projectId);
						}
						if(obj[0].projectName != "null" && obj[0].projectName !=null && obj[0].projectName != ''){
	                    	$("#projectName").val(obj[0].projectName);
						}
						if(obj[0].fatherNode != "null" && obj[0].fatherNode !=null && obj[0].fatherNode != ''){
							$("#fatherNode").val(obj[0].fatherNode);
						}
						if(obj[0].province != "null" && obj[0].province !=null && obj[0].province != ''){
							$("#province").val(obj[0].province);
						}
						if(obj[0].area != "null" && obj[0].area !=null && obj[0].area != ''){
							$("#area").val(obj[0].area);
						}
	                    $("#subStr").html('');
	                    $(".gg-conbox").height($(window).height() - $(".gg-search-con").height() - 100);
					}
				});
			}
	   })
   });
   //初始化数据
   $(".opt").eq(0).click();
});

// 刷新左侧菜单
function refreshRightMenu(){
	$(".opt2").each(function(index){
		   $(this).click(function(){
			   	var id = $(".opt2").eq(index).children("input[type='hidden']:eq(0)").attr('id');
				var actionUrl = PATH+"/optdata/resultChangeInfo";
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
		   });
	   });
}

// 上下一个公告
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

// 截取循环数字
function textCounter(content,maxlimit) {
	if (content.value.length > maxlimit)
		content.value = content.value.substring(0,maxlimit);
}

// 重置
function reset(){
	//$("input[type=text][name=]").val('');
	$("input[remove=true]").remove();
	$("input[type=text]").val('');
}

//验证 输入数字
function check(e,inputId,strLength) {
	var bidMoney = e.value;
	if(e.value != '' && getStrLeng(e.value)>strLength){
		bidMoney = e.value.substr(0,strLength);
	}
	if(bidMoney != ''){   
		if(!isNaN(bidMoney)){
			if(bidMoney.indexOf(",")!=-1){
				bidMoney =bidMoney.replace(/,/g,"");
			}
			if(/.*[\u4e00-\u9fa5]+.*$/.test($.trim(bidMoney))){ 
				if(aNumber($.trim(bidMoney)) != null && aNumber($.trim(bidMoney)) !=""){
					$("#"+inputId).val(fmoney(aNumber($.trim(bidMoney))/10000,2));
				}
			}else{
				$("#"+inputId).val(fmoney($.trim(bidMoney),2));
			}
		}else{
			alert("请输入数字");
			$("#"+inputId).val('');
			return;
		}
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
		$('#searchForm').submit();
	}
}

//多选框
function selectClick(flagNum){
	if($('#flag'+flagNum).is(':checked')) {
	    $("#flag"+flagNum).val("1");
	}else{
		$("#flag"+flagNum).val("");
	}
}
///////////////////////////js///////////////
