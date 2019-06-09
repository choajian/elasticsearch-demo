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
function submitAddSupplier(){
	if($("#btn_jobArea_").val()!=''){
		$("#province").val(getProvince($("#btn_jobArea_").val()));
	}
	
	if($("#supplierName").val()==''){
		alert("供应商名称不能为空");
		return;
	}
	
	if(confirm('您确定提交吗？')){
		var actionUrl = PATH + "/supplierAn/supplierDoAdd";
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
	    				window.location.href = PATH + "/supplierAn/supplierList";
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

//验证供应商名称是否存在
function checkSupplierName(){
	var actionUrl = PATH + "/supplierAn/supplierName";
	var supplierName = $("#supplierName").val();
	var supplierId = $("#supplierId").val();
	if(supplierName != ''){
		$.ajax({
			type: "POST",
	        url: actionUrl,
	        data: {supplierName:supplierName,supplierId:supplierId},
	        dataType: "json",
	        error: function(request) {
	            alert("验证失败!");
	        },
	        success: function(data) {
    			if (data && data>0) {
    				$("#nameMessage").html("供应商名称重复");
    				$('#button1').attr('disabled',"true");
    			} else {
    				$("#nameMessage").html("");
    				$('#button1').removeAttr("disabled"); 
    			}
	        }
	    });
	}
}