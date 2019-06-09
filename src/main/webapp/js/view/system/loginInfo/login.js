	$(document).ready(function(){
		//回车后登录
		document.onkeydown = function(e){ 
			var ev = document.all ? window.event : e; 
			if(ev.keyCode==13) { 
				login();
			} 
		};
		
		var type = document.getElementById("type").value;				
		if(1==type){
			 if(confirm("此帐号已登录,是否继续登录？")){
			 	repeatLogin();
			}
			document.getElementById("type").value=0;
		}
		chgVerifyCode();
		$(".pass-verifyCode").bind("click",chgVerifyCode);

		// 自适应高度
		$("#context").height($(window).height());
		$(window).resize(function(){
			$("#context").height($(window).height());
		});
	});
	
	function chgVerifyCode(){
		$(".pass-verifyCode").attr("src", basePath + "code/imagecode?date="+genTimestamp());
	}
			
	function login()
	{
		$('#submit').attr('disabled', true);
		var loginNameValue = $("#loginName").val();
		var loginPwdValue = $("#loginPwd").val();
		var verifyCode = $('#verifyCode').val();
		
		if ('' == $.trim(loginNameValue))
		{
			alert("请输入用户名！");
			return;
		}
		if ('' == $.trim(loginPwdValue))
		{
			alert("请输入密码！");
			return;
		}
		if ('' == $.trim(verifyCode))
		{
			alert("请输入验证码！");
			return;
		}
		
		$('#state').val('1');
			$.ajax({   
		        url:"access",  
		        data:$('#loginForm').serialize(),
		        type:"POST", 
		        dataType:"json",  
		        cache: false,  
		        error:function (XMLHttpRequest, textStatus, errorThrown) {
		        	closeLogin();
		        	$('#submit').attr('disabled', false);
		        },   
		        beforeSend:function (XMLHttpRequest) { 
		        },  
		        success: function(msg){
	        		var obj = eval(msg);
				    if ('success' == obj[0].msg)
			        {
			        	$('#currentUserName', window.parent.document).val(obj[0].currentUserName);
			        	var dir = $('#dir', window.parent.document).val();
			          	if ('login' == dir)
			          	{
			          		if ('' != obj[0].targetUrl)
			          		{
			          			parent.window.location.href = basePath + obj[0].targetUrl;
			          			return;
			          		}
			          		toUser(obj[0].currentUserName, basePath);
			          	}
			          	else if ('focusPro' == dir)
			          	{
			          		toUser(obj[0].currentUserName, basePath);
			          		parent.keyPoint();
			          	}
			          	else if ('snapshot' == dir || 'project' == dir)
			          	{
			          		toUser(obj[0].currentUserName, basePath);
			          		$('#' + dir + ' a:eq(0)', window.parent.document).click();
			          	}
			          	else if (0 <= dir.indexOf('subLabel') || 0 <= dir.indexOf('proLabel'))
			          	{
			          		toUser(obj[0].currentUserName, basePath);
			          		$('#' + dir + ' button:eq(0)', window.parent.document).click();
			          	}
			          	else if (0 <= dir.indexOf('li'))
			          	{
			          		toUser(obj[0].currentUserName, basePath);
			          		$('#' + dir + ' a:eq(0)', window.parent.document).click();
			          	}
			          	else if (0 <= dir.indexOf('addMark'))
			          	{
			          		toUser(obj[0].currentUserName, basePath);
			          		$('#' + dir, window.parent.document).click();
			          	}
			          	else if ('noticeInfo' == dir)
			          	{
			          		//parent. refreshPage();   // 刷新父页面
			          		 parent.location.reload();
			          	}
			          	else if (-1 < dir.indexOf("project/init") || -1 < dir.indexOf("attention/attentionProjectInfo"))
			          	{
			          		toUser(obj[0].currentUserName, basePath);
			          		$('#submit').attr('disabled', false);
			          		
							closeLogin();
			          		window.open(basePath + dir);
			          		return;
			          	}
			          	else
			          	{
			          		parent.window.location.href = basePath + dir;
			          	}
			          	closeLogin();
			        }
			        else if ('verifyCodeError' == obj[0].msg)
			        {
			        	alert('验证码错误！');
			        	chgVerifyCode();
			        	$('#verifyCode').val('');
			        	$('#verifyCode').focus();
			        }
			        else if ('' != obj[0].msg && 'null' != obj[0].msg)
			        {
			        	alert(obj[0].msg);
			        	chgVerifyCode();
			        }
			        $('#submit').attr('disabled', false);
		        }
		    });
	}
	
	function toReg()
	{
		//window.open(basePath  + '/register/toReg');
		parent.closeLogin();
		parent.showReg();
	}
	
	function toUser(userName, ctx)
	{
		$('#users', window.parent.document).html("<li><span class=\"glyphicon glyphicon-user\"></span>  欢迎您，<a href=\""
				+ ctx + "/userInfo/toEdit\" style=\"text-decoration:none\">" + userName + "</a></li>\n<li>|</li>\n<li><a href=\""
				+ ctx + "/login/cancellation\" style=\"text-decoration:none\"><span class=\"glyphicon glyphicon-log-out\"></span>退出</a></li>");
		parent.refreshHostory();
	}


	
	