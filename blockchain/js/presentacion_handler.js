var limit  = $('.diapositiva').length - 1;
var indice = 0;
var slides = document.getElementsByClassName("diapositiva");

for(var i = 0; i < slides.length; i++)
{
  slides[i].id = "diapo_" + i.toString();
  limit  = slides.lenght;
}

var big_dictionary = {};
var lista_ids_usadas = [];

for(var i = 0; i < slides.length; i++)
{
  big_dictionary[i] = {};
  $('#'+"diapo_"+i.toString() + " > div > div > div").children().each(function (index) {
    var nombre_elemento = "diapo_"+i.toString()+"_"+index.toString();
    this.id = nombre_elemento;
    big_dictionary[i][index] =  $(this).html();
    $(this).text("");
  });
}

function avanti() {
  if (indice < ($('.diapositiva').length)) {indice++;}
  var the_id = "#diapo_" + indice.toString()
  $('html, body').animate({ scrollTop:$(the_id).offset().top }, 'slow');
  escribir_texto_id(indice);
}

function retrospecti() {
  if (indice > 0) {indice--;}
  var the_id = "#diapo_" + indice.toString()
  $('html, body').animate({ scrollTop:$(the_id).offset().top }, 'slow');
}

function escribir_texto_id(id_input) {

 console.log( id_input + " in " + lista_ids_usadas + "   ----   " + $.inArray(lista_ids_usadas, id_input));

  if (($.inArray(id_input, lista_ids_usadas) >  -1) === false)
  {

    for (var i = Object.keys(big_dictionary[id_input]).length - 1; i >= 0; i--)
    {
      var texto = big_dictionary[id_input][i];
      var selector = "#" + "diapo_"+id_input.toString()+"_"+i.toString();
      var tipo_elemento = $(selector).prop('nodeName')
      $(selector).append( "<"+tipo_elemento+"></"+tipo_elemento+">" );

      console.log(tipo_elemento);

      if (tipo_elemento == "H1") {
        //console.log("cada de vaca");
        setTimeout(function(){ $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 50 }); }, 500);
        //$(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 130 });
      }
      else {
        //console.log("cadenas");
        //setTimeout(function(){ $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 0 }); }, 500);
        $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 0 });
      }


    };

    lista_ids_usadas.push(id_input);

  }
}

$('.diapositiva').click(function (event) {
    event.preventDefault();

    if ( $(this).data('dblclicked') ) {
      retrospecti();
      clearTimeout( $(this).data('clicked') );
      $(this).data('dblclicked', false);
    }
    else {
      var self = this;
      $(this).data('dblclicked', true).data('clicked', setTimeout(function() {
          avanti();
          $(self).data('dblclicked', false);
      },300));
    }
});

// a ejecutar al principio, cuando las cosas hayan cargado
document.addEventListener('DOMContentLoaded', function()
{
  $('html, body').animate({ scrollTop:$("#diapo_" + indice.toString()).offset().top }, 'slow');
  escribir_texto_id(0);
}, false);