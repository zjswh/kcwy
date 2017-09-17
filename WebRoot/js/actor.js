$(function(){
	$.ajax({
        url: './admin/userDB.php',
        type: 'POST',
        success : function(response,status,xhr){
            var json_arr =  $.parseJSON(response);
            var html = '';
            $.each(json_arr, function(index, val) {
                html += '<div class="three columns webdesing ecommerce">'+	'<div class="portfolio-image">'+
                    '<a title="portfolio link"><img src="" class="portfolio-img" alt="portfolio picture" /></a>'+
                    '<a class="portfolio-title" title="portfolio details"></a>'+
                    '<a  class="portfolio-subtitle" title="portfolio details">简介</a>'+
                    '<a href="actor_mess.html?id=" class="portfolio-link" title="portfolio details"></a>'+
                    '<div class="background-color portfolio-bg"></div>'+
                '</div>'+
                '<a title="portfolio link"  class="portfolio-outer-title"></a>'+
                '<div class="portfolio-outer-subtitle color">简介</div>'+
                '<div class="text margin-tb-10 portfolio-outer-subtitle"></div>'+
            '</div>';
            });
            $('#action-mess').append(html);
        }
    });
	
	
	$('.portfolio-image a').click(function(){
		var pic_address = $(this).parent().find('.portfolio-img').attr('src');
		var pic_name = $(this).parent().find('.portfolio-title').html();
		localStorage.setItem('pic_address',pic_address);
		localStorage.setItem('pic_name',pic_name);
	});
	$(document).on('click','.portfolio-outer-title',function(){
		var pic_address = $(this).prev().find('.portfolio-img').attr('src');
		var pic_name = $(this).prev().find('.portfolio-title').html();
		localStorage.setItem('pic_address',pic_address);
		localStorage.setItem('pic_name',pic_name);
	});
	$(document).on('click','.ecommerce a',function(){
		localStorage.setItem('page', 'actor_mess.html');
	});

	
	
});
