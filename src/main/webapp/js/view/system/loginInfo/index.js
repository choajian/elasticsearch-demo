$(document).keydown(function(event){ 
	//判断当event.keyCode 为13时（即ENTER键 
	if(event.keyCode == 13){ 
		search('');
	}
}); 
$(document).ready(function(){
	// $( "#autocomplete" ).autocomplete({
    //   source: ctx + "/hotWords/getHotWords",
    //   matchCase:true,
    //   minLength: 1,
    //   maxLength:10
    // });
	// refreshHostory();
});

// 搜索关键字 
function search(word){
	if ('' != $.trim($('#autocomplete').val()) || '' != word)
	{
		var val = '' == word ? $.trim($('#autocomplete').val()) : word;
		$('#annouName').val(val);
		$('#searchForm').attr('action', ctx + '/search');
		$('#searchForm').submit();
	}		
}


