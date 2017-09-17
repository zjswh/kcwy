$(function(){
	$('.header .title span').html(localStorage.getItem('item_name'));
	$('.list li').click(function(){
    	var item_name = $(this).html();

    	localStorage.setItem('item_name',item_name);
    	// window.open('project.html','_self');
    });
    $('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
    $(window).resize(function(){
        $('.leftSide').css('height',$('.footer').get(0).offsetTop+70+'px');
    });
    $(document).on('click','.portfolio-image a',function(){
    	var project_name = $(this).parent().find('.portfolio-title').html();
    	localStorage.setItem('project_name',project_name);
    });
    $(document).on('click','.dropdown-menu li a',function(){
        $(this).parents('.dropdown').find('.project_title').html($(this).html());
        $(this).parents('.dropdown').find('input').val($(this).html());
      
    });
})