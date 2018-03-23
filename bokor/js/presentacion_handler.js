var limit  = $('.diapositiva').length - 1;
var indice = 0;
var slides = document.getElementsByClassName("diapositiva");

for(var i = 0; i < slides.length; i++)
{
  slides[i].id = "diapo_" + i.toString();
  limit  = slides.length;
}

var big_dictionary = {};
var lista_ids_usadas = [];
var game = "nuthing";

for(var i = 0; i < slides.length; i++)
{
  big_dictionary[i] = {};
  $('#'+"diapo_"+i.toString() + " > div > div > div").children().each(function (index) {
    var nombre_elemento = "diapo_"+i.toString()+"_"+index.toString();
    this.id = nombre_elemento;

    console.log($(this).prop('nodeName'));

    if ($(this).prop('nodeName') != "TABLE")
    {
      big_dictionary[i][index] =  $(this).html();
      $(this).text("");
    }

  });
}

function avanti() {

  // console.log("indice = " + indice + " lenght = " + $('.diapositiva').length);

  if (indice < ($('.diapositiva').length - 1)) {

    indice++;
    var the_id = "#diapo_" + indice.toString()
    $('html, body').animate({ scrollTop:$(the_id).offset().top }, 'slow');
    escribir_texto_id(indice);

  }

}

function retrospecti() {
  if (indice > 0) {indice--;}
  var the_id = "#diapo_" + indice.toString()
  $('html, body').animate({ scrollTop:$(the_id).offset().top }, 'slow');
}





String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};





function escribir_texto_id(id_input) {

  // console.log( id_input + " in " + lista_ids_usadas + "   ----   " + $.inArray(lista_ids_usadas, id_input));

  if (id_input == 6 && game == "nuthing") {
    game = new Phaser.Game(config);
  }

  if (($.inArray(id_input, lista_ids_usadas) >  -1) === false)
  {

    for (var i = Object.keys(big_dictionary[id_input]).length - 1; i >= 0; i--)
    {
      var texto = big_dictionary[id_input][i];
      var selector = "#" + "diapo_"+id_input.toString()+"_"+i.toString();
      var tipo_elemento = $(selector).prop('nodeName')
      $(selector).append( "<"+tipo_elemento+"></"+tipo_elemento+">" );

      // console.log(tipo_elemento);


      if (tipo_elemento == "IMG") {

        var local_selector = selector.slice(1);

        // www.egeres.github.io/tal/casa.svg
        // sssss.asas

        var amigdala = document.getElementById(local_selector).src.split('.');

        // console.log("0 amigdala = " + amigdala);

        var iiiii = 0;
        while(iiiii <= amigdala.length) {

          if (iiiii <= (amigdala.length-2)) {
            amigdala.splice(iiiii, 0, ".");
          }
          else {
            amigdala.splice(iiiii, 0, "_animated.");
          }
          iiiii += 2;

        }

        // for (var i = amigdala.length; i > 0; i--)
        // {
        //   if (i < amigdala.length - 1) {
        //     amigdala.splice(i+1, 0, "_animated.");
        //   }
        //   else {
        //     amigdala.splice(i+1, 0, "_animated.");
        //   }
        // }

        // console.log("1 amigdala = " + amigdala);

        amigdala = amigdala.slice(1, amigdala.length-1);

        // amigdala.splice(amigdala.length-1, 0, "_animated.");
        amigdala = amigdala.join();

        // console.log("2 amigdala = " + amigdala);

        // console.log("3 amigdala = " + amigdala);

        amigdala = amigdala.replaceAll(",", "");

        // console.log("4 amigdala = " + amigdala);

        // document.getElementById(local_selector).src = amigdala;

        // console.log("5 amigdala = " + amigdala);



        // setTimeout(function() {
        //   console.log("fuckssss");
        //   document.getElementById(local_selector).src = amigdala;
        // }, 100);



      }

      if (tipo_elemento == "svg") {
        // $(selector+" > "+tipo_elemento).parent().addClass("empieza");
      }
      if (tipo_elemento == "SVG") {
        // $(selector+" > "+tipo_elemento).parent().addClass("empieza");
      }
      if (tipo_elemento == "H1") {
        //console.log("cada de vaca");
        setTimeout(function(){ $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 180 }); }, 900);
        //$(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 130 });
      }
      else if (tipo_elemento == "P") {
        //console.log("cadenas");
        //setTimeout(function(){ $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 0 }); }, 500);

        // console.log()

        $(selector).each(function () {


          if ($(this).attr('class') == "fade") {
            $(this).text(texto);
            // $(this).css('opacity', '0');
            $(this).get(0).style.setProperty("opacity", "0");
            var outer_this = this;
            setTimeout(function() { $(outer_this).fadeTo( 1000 , 1.0, function() {});  }, 300)
          }

          else {
            $(this).typed({ strings: [texto], typeSpeed: 0 });
          }

        });

        // $(selector+" > "+tipo_elemento).each(function() {
          // $( this ).addClass( "foo" );

          // console.log("class is " + $(this).text );
          // console.log($(this).attr('class'));
          // $( this ).html("penis");

          // if ($( this ).is( "fade" )) {
            // console.log("fbdnbisahiusdfn i")
          // }
          // else {
            // console.log("fich");
            // $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 0 });
          // }

        // });

        // if ($(selector+" > "+tipo_elemento).is( "fade" )) {
        //   console.log("fbdnbisahiusdfn i")
        // }
        // else {
        //   console.log("fich");
        //   $(selector+" > "+tipo_elemento).typed({ strings: [texto], typeSpeed: 0 });
        // }



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
