$(function(){
	$('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
    $(window).resize(function(){
        $('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
    });
	$('.movie').hover(function(){
		$(this).find('p').css({
			'color':'blue',
			'height':'40px'
		});
		$(this).find('.time_length').stop().animate({'right':'0'},300);
		$(this).find('.text_btn').stop().animate({'top':'210px'},300);
	},function(){
		$(this).find('p').css({
			'color':'black',
			'height':'20px'
		});
		$(this).find('.time_length').stop().animate({'right':'-30px'},300);
		$(this).find('.text_btn').stop().animate({'top':'175px'},300);
	});
	//点击跳转播放视频
	$('.movie').click(function(){
		var movie ={
            address : $(this).attr('data-address'),
            author : $(this).find('.movie_name').html(),
            avatar : $(this).attr('data-avatar'),
            _time : $(this).attr('data-time'),
            _title : $(this).find('p').attr('data-title')
        };
		localStorage.setItem("movie",JSON.stringify(movie));
		localStorage.setItem('page','movie_play.jsp');
		window.open('movie_play.jsp','_self');
	});
});