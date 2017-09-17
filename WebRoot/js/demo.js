$(function(){
	if(localStorage.getItem('page')){
		$('.right iframe').attr('src',localStorage.getItem('page'));
	}
	var window_height = document.body.scrollHeight +'px';
	var left_width = $('.leftSide').css('width');
	$('.leftSide,.rightSide').css('height',window_height);
	$('.bg-color').css({
			'width':left_width,
			'left':left_width
	});
	$('nav ul li').hover(function(){		
        $(this).find('.bg-color').stop().animate({'left':'0'},200);
	},function(){
		$(this).find('.bg-color').stop().animate({'left':left_width},200);
	});
	$(window).resize(function(){
		window_height = document.body.scrollHeight +'px';
		$('.leftSide,.rightSide').animate({'height':window_height},0);
	});
	$('nav ul a').click(function(){
		localStorage.setItem('page', $(this).attr('href'));
	});
	$('#isLogin').click(function(){
		if(localStorage.getItem("user")){
			bb.location.href = 'user.html';
		}else{
			bb.location.href = 'login.html';
		}

	});
	
	
});
