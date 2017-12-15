$(document).ready(function(){

    $('body').on('click', '#nav-toggle, .close-menu', function(event){
		if ($('#nav-toggle').hasClass('active')) {
			$('#nav-toggle').removeClass('active');
		}else{
			$('#nav-toggle').toggleClass('active');
		}

		$('.menu-line').toggleClass('move');
		$('.infos-top, #header, #wrap, #footer').toggleClass('move-page');

		event.preventDefault();
	});

    $( ".open-modal" ).on( "click", function(event) {
		event.preventDefault(event);
		var modal = $(this).attr('data-modal');
		var link = $(this).attr("data-link");
		$("#"+modal).fadeIn();
	    $('.bg-modal, .btn-fechar-modal').fadeIn();
	    $("#"+modal).find(".wrapper-video").html('<iframe src="https://player.vimeo.com/video/'+link+'?autoplay=1" width="100%" height="415" frameborder="0" allowfullscreen></iframe>');
	});

	//--- Fecha o  modal ------------------------------
	$("body").on("click", '.btn-fechar-modal, .bg-modal', function(event){
		$('.modal, .bg-modal, .btn-fechar-modal').fadeOut("slow");
			var modal = $(this).attr('data-modal');
			setTimeout(function() {
		    $(".wrapper-video").html('');
		}, 1000);
		event.preventDefault(event);
	});

	// scroll
    $('body').on('click', '.menu-item-2' ,function() {
        var offset = $('#sobre-o-gamma').offset();
        $('html, body').animate({ scrollTop: offset.top }, 900);
    });

    $('body').on('click', '.menu-item-3' ,function() {
        var offset = $('#sobre-o-curso').offset();
        $('html, body').animate({ scrollTop: offset.top }, 900);
    });

    $('body').on('click', '.menu-item-4' ,function() {
        var offset = $('#depoimentos').offset();
        $('html, body').animate({ scrollTop: offset.top }, 900);
    });

    $('body').on('click', '.menu-item-5' ,function() {
        var offset = $('#contato').offset();
        $('html, body').animate({ scrollTop: offset.top }, 900);
    });

    $('body').on('click', '.call-to-action' ,function() {
        var offset = $('#contato').offset();
        $('html, body').animate({ scrollTop: offset.top }, 900);
    });
});

