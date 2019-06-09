///////////////////js/////////////////
$(document).ready(function(){
	$(".gg-conbox").height($(window).height() - $(".gg-search-con").height() - 100);
	$(".gg-content").width($(".gg-container").width()-250);
   var oDiv=document.getElementById("float");
   var H=0,iE6;
   var Y=oDiv;
   while(Y){H+=Y.offsetTop;Y=Y.offsetParent};
   iE6=window.ActiveXObject&&!window.XMLHttpRequest;
   if(!iE6){
       window.onscroll=function()
       {
           var s=document.body.scrollTop||document.documentElement.scrollTop;
           if(s>H){oDiv.className="gg-content f-fl div2";if(iE6){oDiv.style.top=(s-H)+"px";}}
           else{oDiv.className="gg-content f-fl";}    
       };
   }
});
// TOP搜索
function searchKeyWord(type){
	switch (type){
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

//新增
function submitAddAgency(){
	if($("#btn_jobArea_").val()!=''){
		$("#province").val(getProvince($("#btn_jobArea_").val()));
	}
	
	if($("#agencyName").val()==''){
		alert("代理机构名称不能为空");
		return;
	}
	var sumInput = $("input:text[class='nameClass']");
	for(var i = 0; i < sumInput.length; i++) {
		if(sumInput[i].value==''){
			alert("联系人名称不能为空");
			return false;
		}
	}
	
	if(confirm('您确定提交吗？')){
		var loadi = layer.load('数据处理中，请稍后...');
		var actionUrl = PATH + "/agencyAn/agencyDoAdd";
		$.ajax({
	        cache: true,
	        type: "POST",
	        url:actionUrl,
	        data:$('#pageForm').serialize(),
	        async: false,
	        error: function(request) {
	            alert("新增失败!");
	            layer.close(loadi);
	        },
	        success: function(data) {
	        	if ("" != data) {
	    			if (data && data == "error") {
	    				alert("新增失败!");
	    				layer.close(loadi);
	    				return;
	    			} else {
	    				alert("新增成功");
	    				window.location.href = PATH + "/agencyAn/agencyList";
	    				layer.close(loadi);
	    			}
	    		} else {
	    			alert("新增失败!");
	    			layer.close(loadi);
	    		}
	        }
	    });
	}
}

//验证代理机构名称是否存在
function checkAgencyName(){
	var actionUrl = PATH + "/agencyAn/agencyName";
	var agencyName = $("#agencyName").val();
	var agencyId = $("#agencyId").val();
	if(agencyName != ''){
		$.ajax({
			type: "POST",
	        url: actionUrl,
	        data: {agencyName:agencyName,agencyId:agencyId},
	        dataType: "json",
	        error: function(request) {
	            alert("验证失败!");
	        },
	        success: function(data) {
    			if (data && data>0) {
    				$("#nameMessage").html("代理机构名称重复");
    				$('#button1').attr('disabled',"true");
    			} else {
    				$("#nameMessage").html("");
    				$('#button1').removeAttr("disabled"); 
    			}
	        }
	    });
	}
}