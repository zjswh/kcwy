$(function(){
    $('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
    $('#pan').css('height',$('.footer').get(0).offsetTop+70+'px');
    $(document).on('click','.content_imgs_list > div',function(){
		$('#show,#next,#prev').css('margin-top',document.body.scrollTop+'px');
	});
    $(window).resize(function(){
        $('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
         $('#pan').css('height',$('.footer').get(0).offsetTop+70+'px');
    });
    $(document).on('mouseover','.content > div',function(){
        $(this).find('.num').stop().fadeIn();
    });
    $(document).on('mouseout','.content > div',function(){
        $(this).find('.num').stop().fadeOut();
    });

    //ͼƬ�鿴
    $(".content_imgs_list > div").click(function(){
    	$('.showImage').remove();
    	$('#show').append("<div class='showImage'></div>");
    	var Length = parseInt($(this).find('span').html())+1;
    	 for(var i=1;i<Length;++i)
         {	
         	var url="photosart/"+$(this).data("num")+"/"+i+".jpg";
         	$('.showImage').append("<span><img src='"+url+"'></span>");
         }
      
        $("#show").fadeIn();
        $("#pan").fadeIn();
        $("#next").fadeIn();
        $("#prev").fadeIn();
    });
     $('.type span').click(function(){
         
         $("#show").fadeIn();
         $("#pan").fadeIn();
         $("#next").fadeIn();
         $("#prev").fadeIn();
     });
    $("#pan").click(function(){
       $("#show").fadeOut();
       $("#pan").fadeOut();
       $("#next").fadeOut();
       $("#prev").fadeOut();
    });
    $("#next").click(function(){
       $(".showImage span:last").animate({"left":"670px"},500,
        function(){
            $(this).animate({"left":"0px"},500);
            $(".showImage").prepend($(this));
        });
        $("#show").animate({"left":"30%"},500,
            function(){
            $(this).animate({"left":"50%"},500);    
        });
    });
    $("#prev").click(function(){
        $(".showImage span:first").animate({"left":"-670px"},500, function(){
            $(this).animate({"left":"0px"},500);
            $(".showImage").append($(this));
        });
        $("#show").animate({"left":"70%"},500,function(){
            $(this).animate({"left":"50%"},500);    
        });
    });
})