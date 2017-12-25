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
	let distributionCaseId = 0;
	let distributionResultatRowId = 0;
	let distributionResultatId = 0;
	for (i = 0; i < tentativesNbr; i++)
	{
		document.getElementById('tableCases').innerHTML += '<div class="casesRow"><span id="case'+(distributionCaseId++)+'" class="case"></span><span id="case'+(distributionCaseId++)+'" class="case"></span><span id="case'+(distributionCaseId++)+'" class="case"></span><span id="case'+(distributionCaseId++)+'" class="case"></span><span id="caseResultatRow'+(distributionResultatRowId++)+'" class="case caseResultatRow"><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span><span id="caseResultat'+(distributionResultatId++)+'" class="caseResultat"></span></span></div>';
	}
}