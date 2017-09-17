$(function(){
	$(document).load(function(){

		$('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
	});
	// $(window).resize(function(){
 //        $('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
 //    });
	$(document).on('click','.new_list > div',function(){
		$('#show,#next,#prev').css('margin-top',document.body.scrollTop+'px');
	});
	$(".new_list >div").click(function(){
		$('.showImage').remove();
    	$('#show').append("<div class='showImage'></div>");
		var Length = parseInt($(this).find('span').html())+1;
        for(var i=1;i<Length;++i)
        {	
        	var url="photosart/"+$(this).index()+"/"+i+".jpg";
        	$('.showImage').append("<span><img src='"+url+"'></span>");
        }
		
        $("#show").fadeIn();
        $("#pan").fadeIn();
        $("#next").fadeIn();
        $("#prev").fadeIn();
    });
	
    $('#myCarousel').carousel({
		interval : 2000,
		pause : 'hover',
		wrap : true
	});

});