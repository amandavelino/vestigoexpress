var 		home 		= 	"body",
			body  		= 	$("html, body"),
			top 		= 	$(window).scrollTop(),
			duration 	=	"800";

$(document).ready(function(){

	//Navegacao
    $(".menu-home .navbar a").click(function(e) {

		if($(this).closest('.navbar-collapse').hasClass('in'))
    	{
    		$(this).closest('.navbar-collapse').removeClass('in');
    	}

        var div = $(this).attr("href"),
            sessao = $(div).offset().top;

        if ($('.link-ativo').hasClass('link-ativo')) {
            $('.link-ativo').removeClass('link-ativo');
        }

        $(this).addClass('link-ativo');

        body.stop().animate({
            scrollTop: sessao
        }, '700', "linear", function() {});
        
        window.location.hash = "";

       	return false;
        
    });// 	

    //Se passar da sessao inicio, aparecer o botao "go to top"
    if($(document).scrollTop() >= $("#inicio").offset().top){

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

    //Slider Testemunhas 
	$(".owl-testemunhas").owlCarousel({
		items: 1,
		loop: true,
		margin: 10,
		nav: true,
		dots: false,
		autoheight: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		navText: [ '<span class="arrow-left ti-arrow-left color-destaque-green icon-font"></span>', '<span class="arrow-right ti-arrow-right color-destaque-green icon-font"></span>' ]
	});	

    //Tabela Precos Fixa
    if($(document).scrollTop() > ($("#planos").offset().top)){
        $("#tabela-precos-fixed").stop().animate({
            top: 0
        }, 30, "easeInOutQuad", function() {
        // Animation complete.
        });
    }else if($(document).scrollTop() > $(".plano-midias").offset().top){
        $("#tabela-precos-fixed").stop().animate({
            top: -104
        }, 30, "easeInOutQuad", function() {
        // Animation complete.
        });
    }//   

    //Tooltip
    $(".tip").hover(function(){
        //console.log('mostrar');
        $(this).closest("li").find(".tool-tip").show();
    }, function(){
        //console.log('esconder');
        $(this).closest("li").find(".tool-tip").hide();
    });//

    function limparFeedback(tempo){

        setTimeout(function(){
            $('.valida-box').stop().animate({
                opacity: 0
            }, 300, function() {
                // Animation complete.
                $(this).html("").css('opacity','100');
            });
        },tempo); 

    }//limparFeedback    

    $("#form-marketing").submit(function(){

        var sEmail  = $("#emailMkt");
        
        if(sEmail.val() == ""){

            sEmail.after("<label class='validacao empty'>O campo de email está vazio.</label>").focus();  
            setTimeout(function(){
                $('.validacao').stop().animate({
                    opacity: 0
                }, 300, function() {
                    $(this).remove();
                });//
            },2500);                            
            return false;
        
        }//

        // filtros
        var emailFilter=/^.+@.+\..{2,}$/;
        var illegalChars= /[\(\)\<\>\,\;\:\\\/\"\[\]]/
        // condição
        if(!(emailFilter.test(sEmail.val()))||sEmail.val().match(illegalChars)){
            
            $('.validacao').val("").remove();
            sEmail.after("<label class='validacao error'>E-mail inválido.</label>").focus(); 
            setTimeout(function(){
                $('.error').hide().remove();
            },2500); 
            return false;

        }

        var dados = jQuery(this).serialize();
        jQuery.ajax({
            url: "./enviarDados.php",
            type: "POST",
            data: dados,
            success: function(data)
            {
                //alert(data);
                console.log('enviado...');
                $('.validacao').remove();
                $("#form-marketing .input-submit").after("<label class='validacao sucesso'>Obrigado por ser inscrever.</label>");
                $('#form-marketing').each(function(){
                  this.reset();
                });
                setTimeout(function(){
                    $('.sucesso').hide().remove();
                },2500);            
            }
        });
        
        return false;        

    });// 

    //Contato
    $("#form-contato").submit(function(){

        var sEmail  = $("#email-contato");
        var sMsg  = $("#mensagem-contato");
        $('.valida-box').html("");
        
        if(sEmail.val() == ""){

            $('.valida-box').html("<label class='validacao empty'>O campo de email está vazio.</label>").focus();  
            limparFeedback(3000);                            
            return false;
        
        }//     

        // filtros
        var emailFilter=/^.+@.+\..{2,}$/;
        var illegalChars= /[\(\)\<\>\,\;\:\\\/\"\[\]]/
        // condição
        if(!(emailFilter.test(sEmail.val()))||sEmail.val().match(illegalChars)){
            
            $('.valida-box').html("<label class='validacao error'>E-mail inválido.</label>").focus(); 
            limparFeedback(3000); 
            return false;

        }

        if(sMsg.val() == ""){

            $('.valida-box').html("<label class='validacao empty'>O campo da mensagem está vazio.</label>").focus();  
            limparFeedback(3000);                           
            return false;
        
        }//        

        var dados = $(this).serialize();
        $.ajax({
            url: "./enviarDados.php",
            type: "POST",
            data: dados,
            success: function(data)
            {
                //console.log('enviado...');
                $('.validacao').remove();
                $('.valida-box').html("<label class='validacao sucesso'>Sua mensagem foi enviada. Entraremos em contato.</label>"); 
                //limpando os campos ao enviar e removendo a label
                $('#form-contato').each(function(){
                  this.reset();
                });                          
                limparFeedback(3000); 
            }
        });
        
        return false;        

    });//        

});//

window.onscroll = function() {onScrollSite()};

function onScrollSite() {

    //Se passar da sessao inicio, aparecer o botao "go to top"
    if($(document).scrollTop() >= $("#inicio").offset().top){

        $('.goto-inicio').addClass('block');
    
    }else{
    
        $('.goto-inicio').removeClass('block');
    
    }//end else

    //Tabela Precos Fixa
    if($(document).scrollTop() > ($("#planos").offset().top)){
        $("#tabela-precos-fixed").stop().animate({
            top: 0
        }, 30, "linear", function() {
        // Animation complete.
        });
    }// 

    if($(document).scrollTop() < ($("#planos").offset().top) 
        || $(document).scrollTop() > ($("#plano-extra-produtos").offset().top - 104))
    {
        $("#tabela-precos-fixed").stop().animate({
            top: -104
        }, 30, "linear", function() {
        // Animation complete.
        });
    }//      


}//onScrolSite