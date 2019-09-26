/* Nécessite JQuery, Skulpt et CodeMirror */

/* Script conçu par Jean-Manuel Meny sous licence Creative Commons BY-NC-SA */
/* Respect de la Paternité - Pas d'utilisation commerciale - Partage des conditions initiales à l'identique */

/* Préambule :
	Ces documents sont sous licence libre, modifiables et ré-utilisables à loisir.
	Ils ont demandé plusieurs centaines d'heures de travail et de conception.
	Merci de rappeler leur paternité originale si vous les ré-utilisez. */

$(function(){
	var codes = document.getElementsByClassName("code_python"); 
	var sorties = document.getElementsByClassName("sortie"); 
	var runners = document.getElementsByClassName("runner"); 
	var tortues = document.getElementsByClassName("tortue"); 
	var editeurs = [];


	for(let i=0; i<sorties.length; i++){
		sorties[i].setAttribute("id","sortie" + i);
		}
	// ajout d'identifiant aux canvas tortue
	// ! il faudra mettre un canvas systématiquement même si le code est
	// sans tortue pour avoir des numéros cohérents avec les numéros des
	// blocs de code
	for(let i=0; i<tortues.length; i++){
		tortues[i].setAttribute("id","tortue" + i);
		}

	function builtinRead(x) {
		if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
				throw "File not found: '" + x + "'";
		return Sk.builtinFiles["files"][x];
		}

	function runit(j) {
		// j est l'indice de l'élément de class code dans le code html
		
		var prog = editeurs[j].getValue();
	   
		sorties[j].innerHTML = ''; 
	   
		//Sk.pre = "sortie" + j;
	   
		Sk.configure({inputfun: function(prompt) {
                    return window.prompt(prompt);
                },
                inputfunTakesPrompt: true,output: (function outf(text) { sorties[j].innerHTML = sorties[j].innerHTML + text; })  , read:builtinRead, python3 : true}); 
	   
		(Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'tortue' + j;
	   
		var myPromise = Sk.misceval.asyncToPromise(function() { return Sk.importMainWithBody("<stdin>", false, prog, true);   });
	   
		myPromise.then( function(mod) {  console.log('success'); }, function(err) {  console.log(err.toString());});
		} 

	for(let i = 0; i < codes.length; i++) {
		editeurs[i] = CodeMirror.fromTextArea(codes[i], {
			mode: {	name: "python",
					version: 3,
					singleLineStringErrors: false},
			theme: "rubyblue",
			styleActiveLine: true,
			lineNumbers: true,
			indentUnit: 4,
			matchBrackets: true }
			);
		}

	for(let i = 0; i < runners.length; i++) {
		runners[i].addEventListener('click',  function(){runit(i);}, false);
	}

});



$(function(){
	var enonceExemple_python = [];

	tabexple_py = 	document.getElementsByClassName("exemple_python");
	for(let i=0; i<tabexple_py.length; i++) {
		enonceExemple_python[i] = CodeMirror.fromTextArea( tabexple_py[i], {
			mode: {	name: "python",
					version: 3,
					singleLineStringErrors: false},
			theme: "eclipse",
			lineNumbers: true,
			readOnly: true }
			);	
		}

});

