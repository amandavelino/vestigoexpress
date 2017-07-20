var 		home 		= 	"body",
			body  		= 	$("html, body"),
			top 		= 	$(window).scrollTop(),
			duration 	=	"800";

$(document).ready(function(){

    //Se passar da sessao inicio, aparecer o botao "go to top"
    if($(document).scrollTop() >= $("#confirmacao-plano").offset().top){

        $('.goto-inicio').addClass('block');
    
    }else{
    
        $('.goto-inicio').removeClass('block');
    
    }//end else   

    //links navegacao no-refresh, como o menu para links internos pre-determinados
	$(".goto").click(function(e) {

        var div = $(this).attr("href"),
            sessao = $(div).offset().top;

        if ($('.link-ativo').hasClass('link-ativo')) {
            $('.link-ativo').removeClass('link-ativo');
        }   

        if(div == "#header-principal"){
            $(".link-home").addClass('link-ativo');
        }else{
            $(this).addClass('link-ativo');
        }        

        body.stop().animate({
            scrollTop: sessao
        }, '700', "linear", function() {});

        window.location.hash = "";
        
       	return false;
        
    });// 	    

});//

window.onscroll = function() {onScrollSite()};

function onScrollSite() {

    //Se passar da sessao inicio, aparecer o botao "go to top"
    if($(document).scrollTop() >= $("#confirmacao-plano").offset().top){

        $('.goto-inicio').addClass('block');
    
    }else{
    
        $('.goto-inicio').removeClass('block');
    
    }//end else

}//onScrolSite