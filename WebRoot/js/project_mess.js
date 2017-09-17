$(function(){
	function init(){
		$('.announce').html(localStorage.getItem('project_name'));
	}
	init();
}