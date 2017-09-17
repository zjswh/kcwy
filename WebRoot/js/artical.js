$(function(){
	$('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
	$(window).resize(function(){
		$('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
	});
})