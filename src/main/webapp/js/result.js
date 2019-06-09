var temp=false;
var temp0=false;
$(document).ready(function(){
	
	$(".u-change-area").click(function(){
		$(".g-left-con").show();
		$(this).parents(".g-left-con").hide();
	});
	
	if ('' != $('#str_province_code').val())
	{
		var proVode = $('#str_province_code').val();
		if(proVode.indexOf(",")!=-1){
			// 大地区
			var proVodeArray = proVode.split(',');
			$("#mnu"+proVodeArray[0]).css('color', 'red');
		}else{
			// 省级
			$("#areaBtn").click();
			var province = getProvinceCitys(proVode + '00');
			 $("a[name='province']").each(function(){
		        if (province == $(this).html())
		        {
		        	$(this).css('color', 'red');
		        	$('.u-city').remove();
		        	var cities = getCities(proVode);
		        	if ('' != cities)
		        	{
		        		var html = '<div class="u-city">';
		        		for (j in cities)
		        		{
		        			html += "<a href=\"javascript:searchKeyWord(2.1, '" + cities[j] + "')\">" + cities[j] + "</a></span> ";
		        		}
		        		$(this).parents(".u-area").append(html + '</div>');
		        		if ('' != $('#str_area').val())
		        		{
		        			$(".u-city a").each(function(){
		        				if ($(this).html() == $('#str_area').val())
		        				{
		        					$(this).css('color', 'red');
		        					return;
		        				}
		        			});
		        		}
		        	}
		        	return;
		        }
		    });
		}
	}
	if ('' != $('#str_type').val())
	{
		$('#notice' + $('#str_type').val()).css('color', 'red');
	}
	if ('' != $('#str_year').val())
	{
		$('#year' + $('#str_year').val()).css('color', 'red');
	}
	
	$( "#autocomplete" ).autocomplete({
	      source: ctx + "/hotWords/getHotWords",
	      minLength: 1,
	      maxLength:10,
	      change: function( event, ui ) {
	    	  $("#autocomplete").val(this.value);
	    	  if (undefined != $("#autocomplete0").val())
	          {
	    		  $("#autocomplete0").val('');
	          }
	      },
	      response: function( event, ui ) {
	    	  if (undefined != $("#autocomplete0").val())
	          {
	    		  $("#autocomplete0").val('');
	          }
	      },
	      search: function() {
	    		return temp;
		  }
	  
	});
	
	$("#autocomplete").focus(function(){
		temp=true;
		$(document).keydown(function(event){ 
			//判断当event.keyCode 为13时（即ENTER键 
			if(event.keyCode == 13){ 
				searchKeyWord(1, '');
			}
		}); 
	});
	
	$( "#autocomplete0" ).autocomplete({
      source: ctx + "/hotWords/getHotWords",
      minLength: 1,
      maxLength:10,
      change: function( event, ui ) {
    	  $("#autocomplete0").val(this.value);
      },
      search: function() {
    		return temp0;
	  }
	});
	$("#autocomplete0").focus(function(){
		temp0=true;
		$(document).keydown(function(event){ 
			//判断当event.keyCode 为13时（即ENTER键 
			if(event.keyCode == 13){ 
				searchKeyWord(1.1, '0');
			}
		});
  	});
	$("#autocomplete").keyup(function(){
		if ('' == $("#autocomplete").val())
		{
			$("#autocomplete0").val('');
		}
	});
	
	var keyword = encodeURI(encodeURI($('#annouName').val()));
	var str_query_second = encodeURI(encodeURI($('#str_query_second').val()));
	$("a[name='ann']").each(function(){
		$(this).attr('href', $(this).attr('href') + '&keywords=' + keyword + '&str_query_second=' + str_query_second);
	});
	
	
});
	


function keyPoint(){
	if ('' != $('#currentUserName').val())
	{
		var chks=$("input[name='proChk']:checked");
		var len=chks.length;
		if(len>0){
			
			var chk_value =""; 
			chks.each(function(i){ 
				if(0 == i){
					chk_value = $(this).val(); 
				}else{
					chk_value += "," + $(this).val(); 
				}
			}); 
			$.ajax({   
		        url: ctx + "/attention/focusAttention",  
		        data:{chkValue:chk_value},
		        type:"POST",  
		        cache: false,  
		        error:function (XMLHttpRequest, textStatus, errorThrown) {
		        	alert('关注失败，请重新关注！');
		        },   
		        beforeSend:function (XMLHttpRequest) { 
		        },  
		        success: function(msg){
					$('#light').show();
					$('#fade').show();
					checkAll(false);
					$('#checkKey').attr('checked', false);
		        }
		    });
		}
	}
	else
	{
		showLogin();
		$('#dir').val('focusPro');
	}
	
}

function copyClassify(){
	var val=$("#className").val();
	$(".addclass-btn").first().clone().appendTo(".box");
	$(".addclass-btn").last().find("span").text(val);
}
function news(){
	$('#lnk_news').hide();$('input[name=news]').show();
}
function checkAll(_this){
	var tmp=_this.checked;
	$("input[type=checkbox][id!=checkKey]").each(function(){
		if(tmp==true){
			this.checked='checked';
		}else{
			this.checked='';
		}
	});
}
function save(){
	$('.close-btn').click();
	alert('保存成功');
	history.go(0);
}

// 关闭加入我的项目提示框
function closeProjectEmphasis()
{
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
}


//查询信息
function searchKeyWord(type, name){
	switch (type)
	{
		// 关键词搜索
		case 1:
			keyword = $("#autocomplete" + name).val();
			$('#annouName').val($.trim(keyword));
			$('#str_query_second').val('');
			$('#str_province_code').val('');
			$('#str_type').val('');
			$('#str_year').val('');
			$("#flag").val("");
			break;
		// 结果中搜索
		case 1.1:
			keyword = $("#autocomplete" + name).val();
			$('#str_query_second').val($.trim(keyword));
			$('#str_province_code').val('');
			$('#str_type').val('');
			$('#str_year').val('');
			$("#flag").val("");
			break;
		case 2:
			$('#str_area').val('');
			$('#str_province_code').val(name);
			break;
		case 2.1:
			$('#str_area').val(name);
			break;
		case 3:
			$('#str_type').val(name);
			break;
		case 4:
			$('#str_year').val(name);
			break;
		case 5:
			$('#str_titileOrContent').val(name);
			break;
	}
	if ('' != $('#annouName').val())
	{
		$('#searchForm').submit();
	}
}
