var couleurDifAutoriser = false;
var couleurDifNbr = 6;
var tentativesNbr = 10;

function optionsDefaut()
{
	document.getElementById('couleurDif').checked = false;
	document.getElementById('couleurNbr6').checked = true;
	document.getElementById('tentatives10').checked = true;
}

function nouvellePartie()
{
	/* Stockage du choix fait dans les options */
	couleurDifAutoriser = document.getElementById('couleurDif').checked;
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
}

/* Création de la table de jeu */
function placementCases()
{
	let distributionCaseRowId = 0;
	let distributionResultatRowId = 0;
	let distributionResultatId = 0;
	for (i = 0; i < tentativesNbr; i++)
	{
		document.getElementById('tableCases').innerHTML += '<div id="caseRow'+(distributionCaseRowId++)+'" class="casesRow"><span id="case" class="case"></span><span id="case" class="case"></span><span id="case" class="case"></span><span id="case" class="case"></span><span id="caseResultatRow'+(distributionResultatRowId++)+'" class="case caseResultatRow"><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span></span></div>';
	}
}

var caseRowAct = 0;


function deposerPion()
{
	let rowActuelle = document.getElementById('caseRow'+caseRowAct);
	rowActuelle.onmousemove = function()
	{
		rowActuelle.childNodes[1].style.backgroundColor = "red";
	} 
	pionEnDeplacement = false;
}

var pionEnDeplacement = false;


/* Déplacement du pion choisi - drag and drop*/




function choisirPion(event, couleur)
{
	if (pionEnDeplacement == false)
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
			deposerPion();
		    couleurSelect.onmouseup = null;
			document.getElementById("couleurSelect").remove();
		};
	}

}