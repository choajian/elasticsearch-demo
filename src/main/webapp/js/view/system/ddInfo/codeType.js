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