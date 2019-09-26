/* Nécessite JQuery et JQuery Auto Height Master */

/* Script conçu par Jean-Manuel Meny et Nicolas Buyle-Bodin sous licence Creative Commons BY-NC-SA */
/* Respect de la Paternité - Pas d'utilisation commerciale - Partage des conditions initiales à l'identique */

/* Préambule :
	Ces documents sont sous licence libre, modifiables et ré-utilisables à loisir.
	Ils ont demandé plusieurs centaines d'heures de travail et de conception.
	Merci de rappeler leur paternité originale si vous les ré-utilisez. */

$(function(){
	$('iframe').iframeAutoHeight({
					  debug: true,
					  minHeight: 100,
					  diagnostics: true,
					  animate: false,
					  heightOffset: 20
					 });

 
});

$(function(){

	$('.titrePanneauHtml, .titrePanneauCss, .titrePanneauHtml_Non, .titrePanneauCss_Non').each(
		function(index){
 
			$('.titrePanneauHtml, .titrePanneauCss, .titrePanneauHtml_Non, .titrePanneauCss_Non').eq(index).click(function(){

					 $('.panneau').eq(index).toggle();
                         
			});	// fin fonction exécutée au clic
	});

});


$(function(){
	$('.correction_html').hide();
	
	$('.titreSolution').each(
		function(index){
 
			$('.titreSolution').eq(index).click(function(){

					$('.correction_html').eq(index).toggle();
                         
			});	// fin fonction exécutée au clic
	});

});


$(function(){
	$('.correction_css').hide();
	
	$('.titreSolutionCss').each(
		function(index){
 
			$('.titreSolutionCss').eq(index).click(function(){

					$('.correction_css').eq(2*index).toggle();
                    $('.correction_css').eq(2*index+1).toggle();
                         
			});	// fin fonction exécutée au clic
	});

});