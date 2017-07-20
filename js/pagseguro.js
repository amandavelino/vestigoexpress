$(document).ready(function(){

    //Pagseguro
    $(".btn-pagseguro").click(function(){

        //verifica se o campo 'li e aceito os termos'...
        //senao, nao direciona e mostra a mensagem
        if(!$('#termos-condicoes').is(':checked')){
            //mostrando a mensagem...
            $('.tip-pagseguro').show();
            //espera 1/2 segundo e esconde
            setTimeout(function(){
                $('.tip-pagseguro').stop().animate({
                    opacity: 0
                }, 300, function() {
                    // Animation complete.
                    $(this).css({'opacity':'100', 'display': 'none'});
                });//
            }, 2000);            
            //console.log('não marcado!');
            return false;
        }else{
            //escondendo a mensagem...
            $('.tip-pagseguro').hide(); 
            return true;
            //console.log('marcado!');
        }

    });// 

});//