/* Nécessite JQuery */

/* Structure html/css/js de Nicolas Buyle-Bodin sous licence Creative Commons BY-NC-SA */
/* Respect de la Paternité - Pas d'utilisation commerciale - Partage des conditions initiales à l'identique */

/* Préambule :
	Ces documents sont sous licence libre, modifiables et ré-utilisables à loisir.
	Ils ont demandé plusieurs centaines d'heures de travail et de conception.
	Merci de rappeler leur paternité originale si vous les ré-utilisez. */

$(function() {

		/* ********************************************************
						Donnees pour le Menu
		******************************************************** */
		var noms_menu =	['Accueils',
						 'Entrées/Sorties',
						 'Boucle Pour',
						 'Module turtle',
						 'Si... Alors...',
						 'Les Fonctions',
						 'Les Listes',
						 'Boucle Tant que',
						 'Interfaces graphiques',
						 'Chaînes de Caractères',
						 'Manipuler des fichiers',
						 'Les Images',
						 'Récursivité'];

		// Liens relatif des pages. Si la page est dans le même dossier, son chemin relatif
		// doit être construit en le précédent de "./".¨Par exemple : "./accueil.html"
		// Normalement, cela ne doit pas s'appliquer pour le site de formation
		var liste_onglets =	[	[['Index Général', '../../index_general.html'],
								 ['Python en ISN', '../accueil_cours_python_isn.html']],
								
								/* Entrées/Sorties */
								[['Exercices - Débuter', '../entrees_sorties/entrees_sorties_debuter.html'],
								 ['Exercices - Progresser', '../entrees_sorties/entrees_sorties_progresser.html']],
								
								/* Boucle Pour */
								[['Exercices - Débuter', '../boucle_pour/boucle_pour_debuter.html']],
								
								/* Module turtle */
								[['Exercices - Débuter', '../module_turtle/module_turtle_debuter.html']],
								
								/* Si... Alors... */
								[['Exercices - Débuter', '../si_alors/si_alors_debuter.html']],
								
								/* Les Fonctions */
								[['Exercices - Débuter', '../fonctions/fonctions_debuter.html']],
								
								/* Les Listes */
								[['Exercices - Débuter', '../listes/listes_debuter.html'],
								 ['Exercices - Progresser', '../listes/listes_progresser.html']],
								
								/* Tant que */
								[['Exercices - Débuter', '../tant_que/tant_que_debuter.html'],
								 ['Exercices - Progresser', '../tant_que/tant_que_progresser.html']],
								
								/* Interfaces graphiques */
								[['Exercices - Débuter', '../interfaces/interfaces_debuter.html'],
								 ['Exercices - Progresser', '../interfaces/interfaces_progresser.html'],
								 ['Exercices - Maîtriser', '../interfaces/interfaces_maitriser.html'],
								 ['Exercices - Aller plus loin', '../interfaces/interfaces_depasser.html']],
								
								/* Chaînes de caractères */
								[['Exercices - Débuter', '../chaines/chaines_debuter.html'],
								 ['Exercices - Progresser', '../chaines/chaines_progresser.html'],
								 ['Exercices - Maîtriser', '../chaines/chaines_maitriser.html']],
								
								/* Fichier */
								[['Exercices - Débuter', '../fichiers/fichiers_debuter.html'],
								 ['Exercices - Progresser', '../fichiers/fichiers_progresser.html']],
								
								/* Les images */ 
								[['Exercices - Débuter', '../images_matricielles/PIL_debuter.html'],
								 ['Exercices - Progresser', '../images_matricielles/PIL_progresser.html'],
								 ['Exercices - Maîtriser', '../images_matricielles/images_maitriser.html']] ];


		/* ********************************************************
						Tableaux des En-têtes
		******************************************************** */		
		
		var menugauche = document.getElementById('menu_accordeon');
		var taille = Math.min(noms_menu.length, liste_onglets.length);


		/* ********************************************************
						Nommer les En-Têtes
		******************************************************** */		
		var tab_label = [];
		var tab_span_label = [];
		var tab_items = []
		for(i=0; i < taille; i++) {
			// pour créer les listes d'en-têtes et les nommer :
			tab_label[i] = document.createElement('li');
			tab_label[i].className = 'deroulant';
			menugauche.appendChild(tab_label[i]);
			
			tab_span_label[i] = document.createElement('span');
			tab_span_label[i].innerHTML = noms_menu[i];
			tab_label[i].appendChild(tab_span_label[i]);
			
			tab_items[i] = document.createElement('ul');
			tab_items[i].className = 'items';
			tab_label[i].appendChild(tab_items[i]);
						
			};


		/* ********************************************************
			Retrouver et extraire le nom de la page actuelle
		******************************************************** */	
		var name = window.location.pathname
		var fin = name.substring(name.lastIndexOf("/"));
		var lien_accueil = '../../../index.html'
		
		// Recherche des "coordonnées" du lien concernant la page actuelle
		var x = -1;
		var y = -1;
		for(i=0; i < liste_onglets.length; i++) {
			for(j=0; j < liste_onglets[i].length; j++) {
				if (fin == liste_onglets[i][j][1].substring(liste_onglets[i][j][1].lastIndexOf("/")) ) {
					x = i;
					y = j;
					};
				};
			};
		
		// Modification des liens dans le cas où l'utilisateur est dans la page d'accueil de la capsule
		if ((x==0) && (y==1)) {
			for(i=0; i < liste_onglets.length; i++) {
				for(j=0; j < liste_onglets[i].length; j++) {
					liste_onglets[i][j][1] = liste_onglets[i][j][1].substring(3)
					};
				};
			lien_accueil = lien_accueil.substring(3)
			};


		/* ********************************************************
						Navigation dans le site
		******************************************************** */	
		var tab_li = [];
		var tab_liens = [];
		for(i=0; i < taille; i++) {
			for(j=0; j < liste_onglets[i].length; j++) {
				// Association des noms de page avec leur URL
				tab_li[j] = document.createElement('li');
				tab_liens[j] = document.createElement('a');
				tab_liens[j].href = liste_onglets[i][j][1];
				tab_items[i].appendChild(tab_li[j]);
				tab_li[j].appendChild(tab_liens[j]);
				tab_liens[j].appendChild(document.createTextNode(liste_onglets[i][j][0]));
			};
		};


		/* ********************************************************
			Passage d'une page à la précédente ou à la suivante
		******************************************************** */	
		var menu_droit = document.getElementById('menu_droit');
		var liens = menu_droit.getElementsByTagName('a');
		// Page précédente
		if (((x==0) && (y==1)) || ((x==1) && (y==0))) {
			liens[1].href = liste_onglets[0][1][1];
			}
		else if (y==0) {
			liens[1].href = liste_onglets[x-1][liste_onglets[x-1].length-1][1];
			}
		else {
			liens[1].href = liste_onglets[x][y-1][1];
			}
		// Page suivante
		if ((x==0) && (y==0)) {
			liens[2].href = liste_onglets[1][0][1];
			}
		else if ((x==liste_onglets.length-1) && (y==liste_onglets[x].length-1)) {
			liens[2].href = liste_onglets[0][1][1];
			}
		else if (y==liste_onglets[x].length-1) {
			liens[2].href = liste_onglets[x+1][0][1];
			}
		else {
			liens[2].href = liste_onglets[x][y+1][1];
			}
		// Index général du site
		liens[3].href = liste_onglets[0][0][1];
		


		/* ********************************************************
			Fil d'ariane - Au maximum un dossier dans la capsule
		******************************************************** */
		var ariane = document.getElementById('ariane');
		var ariane_li = [];
		var ariane_liens = [];
		
		// Page d'accueil du site
		ariane_li[0] = document.createElement('li');
		ariane_liens[0] = document.createElement('a');
		ariane_liens[0].href = lien_accueil;
		ariane.appendChild(ariane_li[0]);
		ariane_li[0].appendChild(ariane_liens[0]);
		ariane_liens[0].appendChild(document.createTextNode('Accueil'));
		
		// Index Général et Nom de la formation
		for(i=1; i < 3; i++) {
			ariane_li[i] = document.createElement('li');
			ariane_liens[i] = document.createElement('a');
			ariane_liens[i].href = liste_onglets[0][i-1][1];
			ariane.appendChild(ariane_li[i]);
			ariane_li[i].appendChild(ariane_liens[i]);
			ariane_liens[i].appendChild(document.createTextNode(liste_onglets[0][i-1][0]));
			};
		
		// Dossier et page correspondante
		if (x>0) {
			ariane_li[3] = document.createElement('li');
			ariane_li[3].innerHTML = noms_menu[x];
			ariane.appendChild(ariane_li[3]);
			
			ariane_li[4] = document.createElement('li');
			ariane_liens[4] = document.createElement('a');
			ariane_liens[4].href = liste_onglets[x][y][1];
			ariane.appendChild(ariane_li[4]);
			ariane_li[4].appendChild(ariane_liens[4]);
			ariane_liens[4].appendChild(document.createTextNode(liste_onglets[x][y][0]));
			};
		


		/* ********************************************************
			Affichage du plan dans la page d'accueil de la capsule
		******************************************************** */
		if ((x==0) && (y==1)) {
			var plan = document.getElementById('plan');
			var plan_label = [];
			var plan_item = [];
			var plan_lien = [];
			
			for(i=1; i < taille; i++) {
				// pour créer les listes d'en-têtes et les nommer :
				plan_label[i-1] = document.createElement('ul');
				plan_label[i-1].className = 'plan_label';
				plan.appendChild(plan_label[i-1]);
				
				plan_item[0] = document.createElement('li');
				plan_label[i-1].appendChild(plan_item[0]);
				plan_item[0].innerHTML = noms_menu[i];
				
				for(j=1; j <= liste_onglets[i].length; j++) {
					plan_item[j] = document.createElement('li');
					plan_lien[j] = document.createElement('a');
					plan_lien[j].href = liste_onglets[i][j-1][1];
					plan_label[i-1].appendChild(plan_item[j]);
					plan_item[j].appendChild(plan_lien[j]);
					plan_lien[j].appendChild(document.createTextNode(liste_onglets[i][j-1][0]));
					};
				};
			};
		

}); // fin de création des menus


$(document).ready( function () {
	// Source : https://www.alsacreations.com/tuto/lire/604-Creer-un-menu-accordeon-avec-jQuery.html
	// On cache les sous-menus :
	$(".deroulant ul.items").hide();
	
	// Substitution dynamique des titres de menu <span> par des liens
	$(".deroulant span").each( function () {
		var texte_span = $(this).text();
        $(this).replaceWith('<a href="" title="Afficher les items">' + texte_span + '<\/a>') ;
    } ) ;
	
    // Réception des événements
	$(".deroulant > a").click( function () {
        // Si le sous-menu était déjà ouvert, on le referme :
        if ($(this).next("ul.items:visible").length != 0) {
            $(this).next("ul.items").slideUp("normal", function () { $(this).parent().removeClass("menu_ouvert") });
        }
        // Si le sous-menu est caché, on ferme les autres et on l'affiche :
        else {
            $(".deroulant ul.items").slideUp("normal", function () { $(this).parent().removeClass("menu_ouvert") });
            $(this).next("ul.items").slideDown("normal", function () { $(this).parent().addClass("menu_ouvert") });
        }
        // On empêche le navigateur de suivre le lien :
        return false;
    });   
  
} ) ;


