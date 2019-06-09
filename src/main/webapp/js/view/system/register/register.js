var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度

function sendMessage() {
	curCount = count;
	var mobile = $("#mobile").val();
	var mobileTip = $("#mobileTip").text();
	if (mobile != "") {
		if(mobileTip == "手机号码验证通过" || mobileTip == "短信验证码已发到您的手机,请查收"){
			// 产生验证码
			for ( var i = 0; i < codeLength; i++) {
				code += parseInt(Math.random() * 9).toString();
			}
			// 设置button效果，开始计时
			$("#btnSendCode").attr("disabled", "true");
			$("#btnSendCode").html("重新发送验证码 (" + curCount + ")");
			InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒执行一次
			// 向后台发送处理数据
			$.ajax({
				type: "POST", // 用POST方式传输
				dataType: "text", // 数据格式:JSON
				url: ctx + "/register/sms", // 目标地址
				data: "mobile=" + mobile +"&code=" + code,
				error: function (XMLHttpRequest, textStatus, errorThrown) { 
					alert('error');
				},
				success: function (data){ 
					data = parseInt(data, 10);
					if(data == 1){
						$("#mobileTip").html("<font color='#339933'>短信验证码已发到您的手机,请查收</font>");
					}else if(data == 0){
						$("#mobileTip").html("<font color='red'>短信验证码发送失败，请重新发送</font>");
					}else if(data == 2){
						$("#mobileTip").html("<font color='red'>该手机号码今天发送验证码过多</font>");
					}
				}
			});
		}
	}else{
		$("#mobileTip").html("<font color='red'>手机号码不能为空</font>");
	}
}

//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);// 停止计时器
		$("#btnSendCode").removeAttr("disabled");// 启用按钮
		$("#btnSendCode").html("重新发送验证码");
		code = ""; // 清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
	}else {
		curCount--;
		$("#btnSendCode").html("重新发送验证码 (" + curCount + ")");
	}
}
// 登录成功后自动跳转处理函数
function SetIndexTime() {
	if (curCount == 0) {                
		window.clearInterval(InterValObj);// 停止计时器
		$("#secondSpan").html('0');
		closeReg();
		parent.location.reload();
		//window.location.href= ctx + "/search/toIndex";
	}else {
		curCount--;
		$("#secondSpan").html(curCount);
	}
}

$(document).ready(function(){
	$(document).bind("keydown", function (_e) {
        var e = _e.keyCode ? _e.keyCode : _e.which;
        if (e == 116 || (_e.ctrlKey && e==82)) {
            if (window.event) {
                event.keyCode = 0;
                event.returnValue = false;
            } else {
                _e.preventDefault();
            }
            document.location.href = ctx + '/register/toReg';
        }
    });

	$.formValidator.initConfig({formid:"form1",onerror:function(msg){alert(msg)}});
	$("#loginName").formValidator({onshow:"请输入登录名",onfocus:"登录名4到10个字符",oncorrect:"登录名验证通过"}).inputValidator({min:4,max:10,onerror:"请输入正确的登录名"}).regexValidator({regexp:"username",datatype:"enum",onerror:"登录名4到10个字符"})
	 .ajaxValidator({
	    type : "get",
		url : ctx + "/register/chkLoginName",
		datatype : "json",
		success : function(data){
            if(data == "2"){
                return true;
			}else{
                return false;
			}
		},
		error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
		onerror : "该登录名不可用，请更换登录名",
		onwait : "正在对登录名进行合法性校验，请稍候..."
	});
	
	$("#loginPwd").formValidator({onshow:"请输入密码",onfocus:"密码4到10个字符",oncorrect:"密码验证通过"}).inputValidator({min:4,max:10,empty:{leftempty:false,rightempty:false,emptyerror:"密码两边不能有空符号"},onerror:"密码4到10个字符"});
	$("#password2").formValidator({onshow:"请输入重复密码",onfocus:"两次密码必须一致",oncorrect:"密码一致"}).inputValidator({min:4,max:10,empty:{leftempty:false,rightempty:false,emptyerror:"重复密码两边不能有空符号"},onerror:"密码4到10个字符"}).compareValidator({desid:"loginPwd",operateor:"=",onerror:"两次密码不一致"});
	$("#mobile").formValidator({onshow:"请输入手机号码",onfocus:"手机号码不能为空",oncorrect:"手机号码验证通过"}).inputValidator({min:11,max:11,onerror:"手机号码必须11位"}).regexValidator({regexp:"mobile",datatype:"enum",onerror:"输入的手机号码格式不正确"})
	 .ajaxValidator({
	    type : "get",
		url : ctx + "/register/chkLoginName",
		datatype : "json",
		success : function(data){
            if(data == "2"){
                return true;
			}else{
                return false;
			}
		},
		error: function(){alert("服务器没有返回数据，可能服务器忙，请重试");},
		onerror : "该手机号码不可用，请更换手机号码",
		onwait : "正在对手机号码进行合法性校验，请稍候..."
	});
	$("#smsCheckCode").formValidator({onshow:"请输入短信验证码",onfocus:"短信验证码不能为空",oncorrect:"短信验证码正确，请继续"}).inputValidator({min:6,max:6,onerror:"短信验证码必须6位"}).regexValidator({regexp:"num",datatype:"enum",onerror:"输入的短信验证码必须为数字"})
	.ajaxValidator({
        type : "post",
		url : ctx + "/register/validateSmsCode",
		dataType : 'json',
		async : false,
		data : 'ChgMobile', 
		success : function(data){
            if(data == "1"){
                return true;
			}else{
                return false;
			}
		},
		error: function(){ alert("服务器没有返回数据，可能服务器忙，请重试");},
		onerror : "短信验证码有误，请核实后重新填写",
		onwait : "正在对短信验证码进行合法性校验，请稍候..."
	});
	
});

