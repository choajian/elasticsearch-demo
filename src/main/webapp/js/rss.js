function checkstyle() {
    var str = "";
    $($("input[name='xmStyle']:checked")).each(function () {
        str += this.value + " ";
    });
    var valueStyle = $("#nStyle").val();
    if (valueStyle.indexOf('12') > 0) {
        $("#newsStyles").val(str + "12");
    }
    else {
        $("#newsStyles").val(str);
    }

}


function diqu() {
    if ($("#TextBox1").val() != "") {
        var arcearr = $("#TextBox1").val().split(',');
        var c = document.getElementsByName("voteitem");
        var strarce = "";
        for (var i = 0; i < c.length; i++) {
            if (c[i].type == "checkbox") {
                for (var j = 0; j < arcearr.length; j++) {
                    if (c[i].value == arcearr[j]) {
                        c[i].checked = true;
                        strarce += " " + c[i].value + " ";
                    }
                }
            }
        }
        $("#xz").html(strarce);
    }
    else {
        $(".ma10 input:checkbox").attr("checked", true);
        $("#xz").html("全国");
        $("#TextBox1").val("全国");
    }
}

function checkdiqu(e) {
    duixiang("diqu").value = e;
}

function duixiang(e) {
    return document.getElementById(e);
}
function showDiv(obj) {
    Divdiquclose();
    duixiang("sf-areac").style.display = "block";
}
function Divdiquclose() {
    duixiang("sf-areac").style.display = "none";
    $("#kw").val($("#hidkeyword").val());
    $("#diqu").val($("#hidiqu").val());

}
function mshow() {
    duixiang("sf-areac").style.display = "block";
}

function bnt(e) {
    var str = "";
    var arrChk = $("input[name='voteitem']:checked");
    //遍历得到每个checkbox的value值
    $(arrChk).each(function () {
        str += this.value + " ";
    });
    $("#xz").html(str);
}

function bntend() {
    var str = "";
    var s = 0;
    var arrChk = $("input[name='voteitem']:checked");
    //遍历得到每个checkbox的value值
    $(arrChk).each(function () {
        str += this.value + " ";
        s++;
    });
    if (s == 34) {
        str = "全国";
    }
    var str = trimEnd(str, ',');
    $("#TextBox1").val(str);
    Divdiquclose();
}

function checkAll() {
	if ('checked' == $('#chk_all').attr('checked') || true == $('#chk_all').attr('checked'))
	{
		$("input[name='voteitem']").attr('checked', 'checked');
		var areas = '';
    	$("input[name='voteitem']").each(function(i){
        	if (0 < i) areas += ' ';
        	areas += $(this).val();
        });
    	$('#xz').html(areas);
	}
	else
	{
		$("input[name='voteitem']").removeAttr('checked');
		$("#xz").html('');
	}    
}
var txtMobile=/^1[3|4|5|8][0-9]\d{4,8}$/;
$("#mobile").click(function () {
	checkMobile();
});
$("#mobile").keyup(function () {
	checkMobile();
});

function checkMobile() {
    var mobileVal = $("#mobile").val();
    if (mobileVal == "输入手机号码") {
        $("#lblMobile").html('请填写正确的手机号码');
        $("#mobile").val("");
        return false;
    }
    else {
        if (!txtMobile.test($.trim(mobileVal))) {
            $("#lblMobile").html('手机号码格式不正确');
            return false;
        }
        else {
            $("#lblMobile").html("");
            return true;
        }
    }
}
$(".guanjianci").click(function () {
    checkKeyword();
});
$(".guanjianci").keyup(function () {
    checkKeyword();
});
function checkKeyword() {
    var keys = "";
    var keyword = "";
    $(".guanjianci").each(function () {
        var k = $(this).val();
        keys += trim(k);
        if (k != "")
            keyword += trim($(this).val()) + ",";
    });
    $("#keycode").val(keyword);
    if (keys == "") {
        $("#lbKeyword").html("定制关键词不能为空");
        return false;
    }
    else {
        $("#lbKeyword").html(" ");
        return true;
    }
}
function newStyle(n) {
    var str = "";
    var arrChk = $("input[name='xmStyle']:checked");
    $(arrChk).each(function () {
        str += this.value + " ";
    });
    $("#newsStyles").val(str);
}


function submitRss() {
    if (!checkMobile() || !checkKeyword() ) {
        return;
    } 
   //收集订阅详情
    var mobile=$("#mobile").val();
    var area=$("#TextBox1").val();
    var isMobile=$('input[name="mobileStyle"]:checked').val();
    
    var len = $("input[name='searchStyle']").length;
    if (0 == len)
    {
    	alert('请至少选择一种检索方式！');
    	return;
    }
    else if (2 == len)
    {
    	$('#retrieveWay').val('3');
    }
    else if (1 == len)
    {
    	$('#retrieveWay').val($("input[name='searchStyle']:checked").val());
    }
    
    var bidtype="";
    $("[name='xmStyle']:checked").each(function(i){
    	if (0 != i) bidtype += ',';
    	bidtype += $(this).val();
    		
    }); 
    if ('' == bidtype)
    {
    	alert('请至少选择公告类型！');
    }
    
    // 地区
    $('#noticeTypes').val(bidtype);
    if ('' == $('#TextBox1').val())
    {
    	alert('请至少选择地区！');
    }
    else if ('' == $('#TextBox1').val())
    {
    	var areas = '';
    	$("input[name='voteitem']").each(function(i){
        	if (0 < i) areas += ' ';
        	areas += getProvinceIndex($(this).val());
        });
    	$('#areas').val(areas);
    }
    else 
    {
    	$('#areas').val($('#TextBox1').val());
    }
    
    $('#rssForm').submit();
}

//去掉最后一个某字符 相当于.net中的TrimEnd 
function trimEnd(str, trimchar) {
    var strlength = str.length;
    if (strlength > 0 && trimchar != null) {
        if (str.substring(strlength - 1, strlength) == trimchar) {
            return str.substring(0, strlength - 1);
        } else {
            return str;
        }
    } else {
        return str;
    }
}

//去空格
function trim(inputString) {
    return inputString.replace(/^ +/, "").replace(/ +$/, "");
}
