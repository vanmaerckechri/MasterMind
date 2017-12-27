var couleurIdentiquesAutoriser = false;
var couleurDifNbr = 6;
var tentativesNbr = 10;
var couleurDif = ['yellow', 'blue', 'red', 'green', 'white', 'black', 'maroon', 'purple', 'orange', 'pink'];
var caseRowAct = 0;
var colNbr = 4;
var joueurTour = true;

function optionsDefaut()
{
	/* document.getElementById('couleurIdentiques').checked = false; */
	document.getElementById('couleurNbr6').checked = true;
	document.getElementById('tentatives10').checked = true;
}

function nouvellePartie()
{
	/* Stockage du choix fait dans les options */
	/* couleurIdentiquesAutoriser = document.getElementById('couleurIdentiques').checked; */
	let inputs = document.getElementsByName('couleurNbr');
	let inputsLength = inputs.length;
	for (var i = 0; i < inputsLength; i++)
	{
		if (inputs[i].checked)
		{
			couleurDifNbr = inputs[i].value;
		}
    }
    inputs = document.getElementsByName('tentatives');
	inputsLength = inputs.length;
	for (var i = 0; i < inputsLength; i++)
	{
		if (inputs[i].checked)
		{
			tentativesNbr = inputs[i].value;
		}
    }
    /* Passage à l'Ecran de Jeu */
    document.getElementById('ecranMenuPrincipal').style.display = "none";
    document.getElementById('ecranJeu').style.display = "block";
    placementCases();
    combiSecreteInstall();
}

/* Création de la table de jeu */
function placementCases()
{
	let distributionCaseRowId = 0;
	let distributionResultatRowId = 0;
	for (i = 0; i < tentativesNbr; i++)
	{
		document.getElementById('tableCases').innerHTML += '<div id="caseRow'+(distributionCaseRowId++)+'" class="casesRow"><span class="case"></span><span class="case"></span><span class="case"></span><span class="case"></span><span id="caseResultatRow'+(distributionResultatRowId++)+'" class="case caseResultatRow"><span class="caseResultat"></span><span class="caseResultat"></span><span class="caseResultat"></span><span class="caseResultat"></span></span></div>';
	}
	for (i = 0; i < couleurDifNbr; i++)
	{
		let couleur;
		couleur = couleurDif[i];
		document.getElementById('pions').innerHTML += '<span class="pion '+couleur+'" ontouchstart="touchAvailable=false; choisirPionTouch(event,\''+couleur+'\');" onmousedown="choisirPion(event,\''+couleur+'\');"></span>';
	}
}
/* Construction Combinaison Secrete */
function combiSecreteInstall()
{
	let couleurNbrRestantes = couleurDifNbr;
	let couleurDifRestantes = couleurDif;
	/* si l'utilisation d'une même couleur n'est pas autorisée */
	if (couleurIdentiquesAutoriser == false)
	{
		for (i = 0; i < colNbr; i++)
		{
			randomNum = Math.floor(Math.random()*couleurNbrRestantes);
			document.getElementById('rowSecrete').innerHTML += '<span class="case" style="background-color: '+couleurDifRestantes[randomNum]+'; visibility: hidden;"></span>';
			couleurDifRestantes.splice(randomNum, 1);
			couleurNbrRestantes--;
		}
	}
	/* si l'utilisation d'une même couleur est autorisée */
	else
	{
		for (i = 0; i < colNbr; i++)
		{
			let randomNum = Math.floor(Math.random()*couleurNbrRestantes);
			document.getElementById('rowSecrete').innerHTML += '<span class="case" style="background-color: '+couleurDifRestantes[randomNum]+';"></span>';
		}
	}
}

/* Déplacement du pion choisi - drag and drop*/
function desactiveOnMouseOver()
{
	let rowActuelle = document.getElementById('caseRow'+caseRowAct);
	for (i = 0; i < colNbr; i++)
	{
		rowActuelle.childNodes[i].onmouseover = null;
	}	
}
function deposerPion(couleur)
{
	let rowActuelle = document.getElementById('caseRow'+caseRowAct);
	for (i = 0; i < colNbr; i++)
	{
		rowActuelle.childNodes[i].onmouseover = function()
		{
			this.style.backgroundColor = couleur;
		}
	}
	setTimeout(desactiveOnMouseOver, 10);
	setTimeout(verifRowActuComplete, 20);

}
function choisirPion(event, couleur)
{
	if (joueurTour == true)
	{
		document.getElementById('pions').innerHTML += '<div id="couleurSelect" class="pion '+couleur+'"></div>';
		couleurSelect.style.position = 'absolute';
		couleurSelect.style.zIndex = 1000;
		moveAt(event.pageX, event.pageY);
		/* Bouge l'élément quand la souris bouge */
		function moveAt(pageX, pageY)
		{
			if (document.getElementById('couleurSelect'))
			{
				couleurSelect.style.left = pageX - couleurSelect.offsetWidth / 2 + 'px';
				couleurSelect.style.top = pageY - couleurSelect.offsetHeight / 2 + 'px';
			}
		}
		function onMouseMove(event)
		{
			moveAt(event.pageX, event.pageY);
		}
		document.addEventListener('mousemove', onMouseMove);
		/* Lache l'élément lorsque le clique de la souris est relaché */
		couleurSelect.onmouseup = function()
		{
			couleurSelect.onmouseup = null;
			document.getElementById("couleurSelect").remove();
			deposerPion(couleur);
		};
	}
}
/* TACTILE : Déplacement du pion choisi - drag and drop*/
function deposerPionTouch(couleur)
{
	let rowActuelle = document.getElementById('caseRow'+caseRowAct);
	for (i = 0; i < colNbr; i++)
	{
		rowActuelle.childNodes[i].ontouchend = function()
		{
			alert('2');
			this.style.backgroundColor = couleur;
		}
	}
	setTimeout(verifRowActuComplete, 20);

}
function choisirPionTouch(event, couleur)
{
	if (joueurTour == true)
	{
		document.getElementById('pions').innerHTML += '<div id="couleurSelect" class="pion '+couleur+'"></div>';
		couleurSelect.style.position = 'absolute';
		couleurSelect.style.zIndex = 1000;
		moveAt(event.touches[0].pageX, event.touches[0].pageY);
		/* Bouge l'élément quand la souris bouge */
		function moveAt(pageX, pageY)
		{
			couleurSelect.style.left = pageX - couleurSelect.offsetWidth / 2 + 'px';
			couleurSelect.style.top = pageY - couleurSelect.offsetHeight / 2 + 'px';
		}
		function ontouchmove(event)
		{
			moveAt(event.touches[0].pageX, event.touches[0].pageY);
		}
		document.addEventListener('touchmove', ontouchmove);
		/* Lache l'élément lorsque le clique de la souris est relaché */
		couleurSelect.ontouchend = function()
		{
			alert('1');
			document.getElementById("couleurSelect").remove();
			deposerPionTouch(couleur);
		};
	}
}
/* Verifie si la rangée actuelle est complète */
function verifRowActuComplete()
{
	let rowActuelle = document.getElementById('caseRow'+caseRowAct);
	let casesRempliesNbr = 0;
	for (i = 0; i < colNbr; i++)
	{
		if (rowActuelle.childNodes[i].style.backgroundColor)
		{
			casesRempliesNbr++
			if (casesRempliesNbr == colNbr)
			{
				comparer();
			}
		}
	}
}

function comparer()
{
	let rowActuelle = document.getElementById('caseRow'+caseRowAct);
	let rowSecreteID = document.getElementById('rowSecrete');
	let resultatComparaison = [];
	let compterBonneReponses = 0;
	for (i = 0; i < colNbr; i++)
	{
		for (j = 0; j < colNbr; j++)
		{
			if (rowActuelle.childNodes[i].style.backgroundColor == rowSecreteID.childNodes[j].style.backgroundColor)
			{
				/* s'ils sont à la même place */
				if (i == j)
				{
					resultatComparaison[i] = 'parfait';
					break;
				}
				/* s'ils ne sont pas à la même place */
				else
				{
					resultatComparaison[i] = 'bon';
					break;
				}
			}
			else
			{
					resultatComparaison[i] = 'mauvais';
			}
		}
	}
	for (i = 0; i < colNbr; i++)
	{
		if (resultatComparaison[i] == 'parfait')
		{
			compterBonneReponses++;
		}
	}
	if (compterBonneReponses == colNbr)
	{
		victoire();
	}
	else
	{
		indicesAfficher(resultatComparaison[0], resultatComparaison[1],resultatComparaison[2],resultatComparaison[3]);
	}
}

function indicesAfficher(ind1, ind2, ind3, ind4)
{
	/* mélange les indices */
	let indicesTemp = [ind1, ind2, ind3, ind4];
	let indices = [];
	let NbrRestant = colNbr;
	let randomNum;
	for (i = 0; i < colNbr; i++)
	{
		randomNum = Math.floor(Math.random()*NbrRestant);
		indices[i] = indicesTemp[randomNum];
		indicesTemp.splice(randomNum, 1);
		NbrRestant--;
	}
	/* affichage */
	let rowResultatActuelle = document.getElementById('caseResultatRow'+caseRowAct);
	for (i = 0; i < colNbr; i++)
	{
		if (indices[i] == 'parfait')
		{
			rowResultatActuelle.childNodes[i].style.backgroundColor = "red";
		}
		if (indices[i] == 'bon')
		{
			rowResultatActuelle.childNodes[i].style.backgroundColor = "green";
		}
	}
	caseRowAct++;
	if (caseRowAct > tentativesNbr-1)
	{
		defaite();
	}
	else
	{
		joueurTour = true;
	}
}

function victoire()
{
	let rowSecreteID = document.getElementById('rowSecrete');
	for (i = 0; i < colNbr; i++)
	{
		rowSecreteID.childNodes[i].style.visibility = "visible";
	}
	document.getElementById('main').innerHTML += '<h3 style="color: green">VICTOIRE</h3>';
}

function defaite()
{
	let rowSecreteID = document.getElementById('rowSecrete');
	for (i = 0; i < colNbr; i++)
	{
		rowSecreteID.childNodes[i].style.visibility = "visible";
	}
	document.getElementById('main').innerHTML += '<h3 style="color: red;">DEFAITE</h3>';	
}