$(function(){
	$(".table-striped tr:even").css("background","#f8f8f8");
	$(".table-hover tr").mouseover(function(){
		$(this).addClass("tr-hover");
	}).mouseout(function(){
		$(this).removeClass("tr-hover");
	});
    $(".g-main").css("minHeight", ($(window).height()-$('.g-header').height()-$('.g-footer').height()-15))
})

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
    if(id=='dropCate' || id=='dropCate1'){
        $('.u-search-select span').attr('class','glyphicon glyphicon-chevron-up');
    }else if(id=='dropCate3'){
    	$('.u-search-select span').attr('class','glyphicon glyphicon-chevron-down');
    }
}
function mclose()
{
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
    if($('.u-search-select span')){
    	$('.u-search-select span').each(function(index){
    		if(index == $('.u-search-select span').length - 1){
    			$(this).attr('class','glyphicon glyphicon-chevron-up');
    		}else{
    			$(this).attr('class','glyphicon glyphicon-chevron-down');
    		}
    	})
        
    }
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

/* 阻止冒泡 */
function stopPropagation(e) {  
    e = e || window.event;  
    if(e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();  
    } else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    }  
} 