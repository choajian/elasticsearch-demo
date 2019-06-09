$(document).ready(function(){
	$('.MobileStyle[value="' + $('#mobileFlag').val() + '"]').attr('checked', 'checked');
	if ('3' == $('#projectFlag').val())
	{
		$('.sendstyle').attr('checked', 'checked');
	}
	else
	{
		$('.sendstyle[value="' + $('#projectFlag').val() + '"]').attr('checked', 'checked');
	}
});

function submitRadar() {
	$("label").each(function(){
		$(this).html("");
	});
	// 验证
	var entrustUnitName=$.trim($("#entrustUnitName").val());
	var agencyName=$.trim($("#agencyName").val());
	var word=$.trim($("#word").val());
	/* if (entrustUnitName == "") {
		$("#lblEntrustUnitName").html("委托单位名称不能为空");
		return false;
	}
	
   if (agencyName == "") {
        $("#lblAgencyName").html("代理机构名称不能为空");
        return false;
    }*/
    
    if (word == "") {
        $("#lblWord").html("定制关键词不能为空");
        return false;
    }
	/*if (entrustUnitName == "" && agencyName== "" && word== "") {
		alert("[委托单位名称、代理机构名称、定制关键词]至少有一个不能为空");
		return false;
	}*/
    var scanBeginTime=$.trim($("#scanBeginTime").val());
    if (scanBeginTime == "") {
        $("#lblScanBeginTime").html("雷达扫描开始时间不能为空");
        return false;
    }
	if (confirm('您确定提交修改雷达信息？')) {
		$("#bt").attr("disabled", true);
		$('#radarForm').submit();
	}
}
