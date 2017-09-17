// videojs.options.flash.swf = "video/date.mp4";
$(function(){
	init();
	if($('.movie_title span').width() >= 130){
    	$('.movie_title span').css('text-indent','26px');
    }else{
    	$('.movie_title span').css('text-indent','0px');
    }
	$(window).resize(function(){
		right_width = (document.body.clientWidth-$('.leftSide').width())*0.58+'px';
		$('#example_video1').css('width',right_width);
	});
	$(document).on('click','.comment_show',function(e){
		$(this).parent().parent().find('.comment_text').toggle();
		e.stopPropagation();
		localStorage.setItem('people',$(this).parent().prev().find('span').html());
		$('.leftSide').css('height',$('.rightSide').height()+'px');
	});
	$(document).on('click','.new_comment_show',function(e){
		$(this).parent().parent().parent().next('.comment_text').toggle();
		$('.leftSide').css('height',$('.rightSide').height()+'px');
		e.stopPropagation();
		localStorage.setItem('people',$(this).parent().prev().find('.reply').html());
	});
	
	$(document).click(function(){
		$('.comment_text').hide();
		$('.leftSide').css('height',$('.rightSide').height()+'px');
	});
	$(document).on('click','.comment_btn',function(e){
		var media;
		media = "<div class='media'>"
				  	+"<div class='media-left'>"
						+"<img src='"+$('.avatar img').attr('src')+"' class='media-object'>"
					+"</div>"
					+"<div class='media-body'>"
					+"<h4 class='media-heading'><span><font class='reply'>"+$('.name .login').html()+"</font><font color='black'>回复</font>"+localStorage.getItem('people')+"</span>："+$('.comment_box').html()+"</h4>"
						+"<h5>"
							+"<span>17:56</span>"
							+"<img class='new_comment_show' src='images/movie/comment.png'>"
						+"</h5>"
					+"</div>"
				+"</div>";
		if($('.name .login').html() == localStorage.getItem('people')){
			alert('不能回复自己');
			return;
		}
		if($('.comment_box').html() != ''){
			$('.comment_text').hide();
			$(this).parent().parent().find('.comment_text').before(media);
           
		}
		$('.leftSide').css('height',$('.rightSide').height()+'px');
		$('.comment_box').html('');
		e.stopPropagation();
	});
	$('.movie_btn').on('click',function(){
		var media;
		media = "<li class='media'>"
						+"<div class='media-left'>"
							+"<img src='"+$('.avatar img').attr('src')+"' class='media-object'>"
						+"</div>"
						+"<div class='media-body'>"
						+"<h4 class='media-heading'><span>"+$('.name .login').html()+"</span>："+$('.movie_box').html()+"</h4>"
							+"<h5>"
								+"<span>17:56</span>"
								+"<img class='comment_show' src='images/movie/comment.png'>"
							+"</h5>"
							+"<div class='comment_text'>"
								+"<div class='comment_box' contenteditable='true'></div>"
								+"<div class='comment_btn'>鍙戣〃</div>"
							+"</div>"
						+"</div>"
					+"</li>";
		$('.media-list').prepend(media);
		$('.movie_box').html('');
		$('.leftSide').css('height',$('.rightSide').height()+'px');
	});
	$(document).on('click','.comment_text,.media',function(e){
		e.stopPropagation();
	});

})
function init(){
	var right_width = (document.body.clientWidth-$('.leftSide').width())*0.58+'px';
	var movie = JSON.parse(localStorage.getItem("movie"));
	$('#example_video1').css('width',right_width);
    $('.author img').attr('src',movie.avatar);
//    $('.movie_author_name').find('span').html(movie.author);
//    $('.update').find('span').html(movie._time);

//    $('.movie_title').find('span').html(movie._title);
    $('.header .title span').html('[ '+movie.author+' ] '+movie._title);
}
