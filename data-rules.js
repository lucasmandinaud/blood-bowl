// Règles & séquences – Blood Bowl 3e Saison (résumés, le livre fait foi)
// g : groupe ; p : page du livre ; b : contenu (HTML simple)
window.BB_RULES = [
/* ---------- LE TOUR ---------- */
{id:"actions",g:"Le Tour",t:"Actions possibles",p:50,k:"activation annoncer limite par tour",b:`
<p>Activez chaque joueur une fois (sauf ceux qui ont commencé le Tour Sonnés). Annoncez l'action avant de bouger ; elle compte comme annoncée même si elle n'est pas faite.</p>
<table class="t"><tr><th>Action</th><th>Limite</th></tr>
<tr><td>Mouvement</td><td>illimitée</td></tr>
<tr><td>Blocage</td><td>illimitée</td></tr>
<tr><td>Blitz (mouvement + 1 blocage)</td><td><b>1 / Tour</b></td></tr>
<tr><td>Passe (mouvement puis passe)</td><td><b>1 / Tour</b></td></tr>
<tr><td>Transmission (mouvement puis main à main)</td><td><b>1 / Tour</b></td></tr>
<tr><td>Lancer de Coéquipier</td><td><b>1 / Tour</b></td></tr>
<tr><td>Agression (mouvement puis agression)</td><td><b>1 / Tour</b></td></tr>
<tr><td>Sécurisation du Ballon</td><td><b>1 / Tour</b> (pas les Gros Bras)</td></tr>
<tr><td>Actions Spéciales</td><td>selon la compétence</td></tr></table>
<p class="note">On peut aussi <b>renoncer</b> à activer un joueur : il ne pourra plus être activé ce Tour.</p>`},
{id:"turnover",g:"Le Tour",t:"Turnover",p:35,k:"fin du tour",b:`
<p>Le Tour s'arrête immédiatement (on termine les jets en cours, ex : Armure) si :</p>
<ul>
<li>un joueur actif <b>Chute</b> pendant sa propre activation ;</li>
<li>un joueur de l'équipe active est <b>Plaqué</b> ;</li>
<li>le <b>porteur</b> du ballon (équipe active) est Mis À Terre ou sort du terrain ;</li>
<li>un <b>ramassage</b> du ballon échoue ;</li>
<li>une passe fait <b>Maladresse</b> ;</li>
<li>une passe ou transmission n'est réceptionnée par personne de l'équipe active et le ballon touche le sol ;</li>
<li>l'adversaire récupère le ballon (réception, <b>interception</b>) ;</li>
<li>un joueur lancé avec le ballon rate son atterrissage, finit dans le public ou est mangé ;</li>
<li>un joueur actif est <b>Expulsé</b> pour Agression ;</li>
<li>un <b>Touchdown</b> est marqué.</li></ul>`},
{id:"relances",g:"Le Tour",t:"Relances",p:33,k:"reroll relance d'équipe",b:`
<ul>
<li>On garde toujours le second résultat. <b>Jamais de relance d'une relance</b>, quelle que soit la source.</li>
<li>Plusieurs dés à relancer : tous en même temps.</li>
<li>Relances d'Équipe : seulement pendant son propre Tour, autant qu'on veut, toutes rendues à la mi-temps (non reportées).</li>
<li>Interdit avec une Relance d'Équipe : <b>Valdingue, Armure, Blessure, Élimination, Renvoi, Pot-de-vin, Contester la Décision, Intervention du Public</b>.</li>
<li>Groupe de dés (ex : dés de blocage) : on relance tout le groupe.</li></ul>`},
{id:"jets",g:"Le Tour",t:"Jets de dés : principes",p:32,k:"naturel modificateur D3",b:`
<ul>
<li><b>1 naturel</b> = toujours un échec ; <b>6 naturel</b> = toujours une réussite.</li>
<li>Un D6 modifié ne dépasse jamais 6.</li>
<li><b>D3</b> = D6 divisé par 2, arrondi au supérieur.</li>
<li>Les modificateurs de compétences peuvent s'appliquer après avoir vu le dé.</li>
<li>Une fois un dé jeté, on ne revient plus sur les décisions précédentes.</li></ul>`},
{id:"etats",g:"Le Tour",t:"États des joueurs",p:38,k:"debout deconcentre a terre sonne plaque chuter mis a terre zone de tacle marquer",b:`
<table class="t">
<tr><td><b>Debout</b></td><td>Zone de Tacle sur les 8 cases autour. Il <b>Marque</b> les adversaires dedans.</td></tr>
<tr><td><b>Déconcentré</b></td><td>Debout mais sans Zone de Tacle, ni compétences/traits actifs, ni réception, ni interception. Dure jusqu'à sa prochaine activation.</td></tr>
<tr><td><b>À Terre</b></td><td>Pas de Zone de Tacle. Doit se relever pour agir.</td></tr>
<tr><td><b>Sonné</b></td><td>Ne peut pas être activé. Passe À Terre à la fin du <b>prochain</b> Tour de son équipe.</td></tr></table>
<table class="t">
<tr><th>Tomber</th><th>Armure ?</th><th>Turnover ?</th></tr>
<tr><td><b>Mis À Terre</b></td><td>Non</td><td>Seulement s'il a le ballon</td></tr>
<tr><td><b>Chuter</b> (raté soi-même)</td><td>Oui</td><td>Oui (équipe active)</td></tr>
<tr><td><b>Plaqué</b></td><td>Oui</td><td>Oui (pendant son Tour)</td></tr></table>
<p class="note">Démarqué = Debout et Marqué par personne.</p>`},

/* ---------- MOUVEMENT ---------- */
{id:"relever",g:"Mouvement",t:"Se relever",p:54,k:"a terre",b:`
<ul><li>Annoncer une action avec mouvement. Coûte <b>3 cases</b> de Mouvement.</li>
<li>Si <b>M 2 ou moins</b> : D6, sur <b>4+</b> il se relève (tout son mouvement y passe) ; sur 1-3 il reste À Terre et l'activation s'arrête.</li></ul>`},
{id:"esquive",g:"Mouvement",t:"Esquiver",p:55,k:"dodge quitter zone de tacle marque",b:`
<p>Obligatoire pour <b>quitter une case où l'on est Marqué</b>.</p>
<p class="formula">Test d'Agilité − 1 par adversaire qui Marque la case d'<b>arrivée</b></p>
<p>Raté : le joueur Chute sur la case d'arrivée (Turnover).</p>
<ol class="steps">
<li>Choisir la case d'arrivée</li>
<li>Tentacules adverses éventuelles</li>
<li>Déplacer le joueur</li>
<li>Jet d'Esquive (+ relances)</li>
<li>Tacle Plongeant adverse éventuel</li>
<li>Si réussi : Poursuite adverse éventuelle</li></ol>`},
{id:"foncer",g:"Mouvement",t:"Foncer",p:58,k:"gfi rush case supplementaire",b:`
<ul><li>Jusqu'à <b>2 cases</b> au-delà du Mouvement (3 avec Sprint).</li>
<li>Pour chaque case : D6, <b>2+</b> réussi. Sur <b>1</b>, Chute sur la case visée (Turnover).</li>
<li>Le jet pour Foncer se fait <b>avant</b> tout autre jet (Esquive, ramassage…).</li></ul>`},
{id:"bondir",g:"Mouvement",t:"Bondir par-dessus un joueur",p:56,k:"sauter leap jump",b:`
<ul><li>Par-dessus un joueur <b>À Terre ou Sonné</b>, vers une case libre adjacente à lui (et pas déjà adjacente au sauteur). Coûte <b>2 cases</b>.</li>
<li>Test d'Agilité − le plus grand nombre d'adversaires Marquant la case de départ <b>ou</b> la case d'arrivée.</li>
<li>Raté : Chute sur la case d'arrivée. <b>1 naturel</b> : Chute sur la case de départ.</li>
<li>Foncer nécessaire ? On fait les jets de Foncer d'abord.</li></ul>`},
{id:"ramasser",g:"Mouvement",t:"Ramasser le ballon",p:57,k:"pick up",b:`
<p>En entrant volontairement sur la case du ballon pendant son activation :</p>
<p class="formula">Test d'Agilité − 1 par adversaire qui Marque le joueur</p>
<ul><li>Raté : le ballon Rebondit + Turnover.</li>
<li>Se fait après Foncer / Esquiver / Bondir, avant tout autre jet.</li>
<li>Arrivé sur le ballon involontairement (poussé…) : il Rebondit, sans Turnover.</li></ul>`},
{id:"securiser",g:"Mouvement",t:"Sécurisation du Ballon",p:59,k:"secure the ball ramasser prudemment",b:`
<ul><li>1 par Tour. Interdit si un adversaire <b>Debout et non Déconcentré</b> est à <b>2 cases ou moins</b> du ballon (vérifié à l'annonce). Pas pour les Gros Bras ni Instable.</li>
<li>Mouvement gratuit qui doit finir sur le ballon (sinon Turnover).</li>
<li>Pas de Test d'Agilité : <b>D6, 2+</b> = ballon ramassé, puis l'activation s'arrête. Sur 1 : Rebond + Turnover.</li>
<li>La météo Averse s'applique quand même (-1).</li></ul>`},

/* ---------- BLOCAGE ---------- */
{id:"blocage",g:"Blocage",t:"Action de Blocage",p:60,k:"block force des",b:`
<p>Cible : 1 adversaire <b>Debout</b> adjacent. Comparez les Forces modifiées (Soutiens inclus) :</p>
<table class="t"><tr><th>Forces</th><th>Dés</th><th>Qui choisit</th></tr>
<tr><td>Égales</td><td>1</td><td>—</td></tr>
<tr><td>Une plus forte</td><td>2</td><td>le plus fort</td></tr>
<tr><td>Plus du double</td><td>3</td><td>le plus fort</td></tr></table>
<p class="note">L'attaquant lance toujours les dés.</p>`},
{id:"soutiens",g:"Blocage",t:"Soutiens",p:61,k:"assist aide offensif defensif",b:`
<ul><li><b>Offensif (+1 F à l'attaquant)</b> : un coéquipier qui Marque la cible et n'est Marqué par <b>aucun autre</b> adversaire.</li>
<li><b>Défensif (+1 F à la cible)</b> : un coéquipier de la cible qui Marque l'attaquant et n'est Marqué par aucun autre adversaire.</li>
<li>Garde : soutient même s'il est Marqué.</li></ul>`},
{id:"desblocage",g:"Blocage",t:"Résultats des dés de Blocage",p:62,k:"attaquant plaque les deux plaques repousse bouscule defenseur plaque pow",b:`
<table class="t">
<tr><td><b>Attaquant Plaqué</b></td><td>L'attaquant est Plaqué (Turnover).</td></tr>
<tr><td><b>Les Deux Plaqués</b></td><td>Les deux sont Plaqués, sauf ceux qui ont <b>Blocage</b>. (Lutte : les deux Mis À Terre.)</td></tr>
<tr><td><b>Repoussé</b></td><td>Cible Repoussée de 1 case ; l'attaquant peut Poursuivre.</td></tr>
<tr><td><b>Bousculé</b></td><td>Si la cible a <b>Esquive</b> (et pas de Tacle en face) : Repoussé. Sinon : Défenseur Plaqué.</td></tr>
<tr><td><b>Défenseur Plaqué</b></td><td>Cible Repoussée puis Plaquée.</td></tr></table>`},
{id:"poussee",g:"Blocage",t:"Repousser, Poursuivre",p:62,k:"push chaine public touche",b:`
<ul><li>Repoussé sur une des 3 cases qui s'éloignent de l'attaquant, choisie par l'attaquant (une case libre si possible).</li>
<li>Pas de case libre → <b>Poussée à la Chaîne</b> (l'attaquant choisit toutes les directions), ou <b>dans le Public</b> si au bord : Jet de Blessure direct, Renvoi du ballon s'il le portait.</li>
<li>Repoussé sur le ballon : il Rebondit, pas de Turnover.</li>
<li><b>Poursuivre</b> : gratuit, sans Esquive ; à décider avant le Jet d'Armure.</li></ul>`},
{id:"blitz",g:"Blocage",t:"Blitz",p:64,k:"blitz mouvement blocage",b:`
<ul><li>1 par Tour. Annoncer la <b>cible</b> au départ (elle doit être atteignable).</li>
<li>Le blocage coûte <b>1 case</b> de Mouvement (Foncer si nécessaire).</li>
<li>Après le blocage, on peut continuer à bouger avec le reste.</li>
<li>Bloquer reste facultatif, mais le Blitz du Tour est consommé.</li></ul>`},

/* ---------- BLESSURES ---------- */
{id:"armure",g:"Blessures",t:"Armure → Blessure → Élimination",p:37,k:"armor injury casualty sequence",b:`
<ol class="steps">
<li><b>Jet d'Armure</b> (2D6 par l'adversaire) : si le total atteint la valeur d'AR (ex : 9+), l'armure est <b>pénétrée</b>.</li>
<li><b>Jet de Blessure</b> (2D6) : 2-7 Sonné · 8-9 K.-O. · 10-12 Éliminé. Voir Tableaux.</li>
<li>Si Éliminé : <b>Jet d'Élimination</b> (D16). Voir Tableaux.</li></ol>
<p class="note">Apothicaire : 1 fois par match, sur un K.-O. (le joueur reste Sonné sur sa case) ou une Élimination (on refait le D16 et on garde le résultat de son choix ; Commotion → Réserves).</p>`},
{id:"public",g:"Blessures",t:"Blessé par le Public",p:68,k:"sortie terrain foule",b:`
<p>Poussé ou tombé hors du terrain : <b>Jet de Blessure</b> direct (sans Armure). Un Sonné va dans les Réserves. Turnover si c'est un joueur de l'équipe active.</p>`},
{id:"ko",g:"Blessures",t:"Retour des K.-O.",p:83,k:"ko reveil fin de phase",b:`
<p>À chaque fin de Phase : D6 par joueur K.-O., <b>4+</b> il revient en Réserves.</p>`},

/* ---------- AGRESSION ---------- */
{id:"agression",g:"Agression",t:"Agression",p:69,k:"foul crampon expulsion double",b:`
<ul><li>1 par Tour. Mouvement puis agression d'un adversaire <b>À Terre ou Sonné</b> adjacent ; pas de mouvement après.</li>
<li><b>Jet d'Armure</b> : +1 par Soutien Offensif, −1 par Soutien Défensif.</li>
<li><b>Double</b> sur le Jet d'Armure <b>ou</b> sur le Jet de Blessure → Expulsé (après résolution). Turnover.</li></ul>
<p><b>Contester la Décision</b> (D6) :</p>
<table class="t">
<tr><td>1</td><td>Expulsé, et le coach aussi : plus de contestation pour le match.</td></tr>
<tr><td>2-5</td><td>Expulsé.</td></tr>
<tr><td>6</td><td>Pas Expulsé, reste sur sa case (mais Turnover quand même).</td></tr></table>`},

/* ---------- BALLON ---------- */
{id:"passe",g:"Ballon",t:"Passe",p:70,k:"pass lancer precision reglette",b:`
<ol class="steps"><li>Annoncer la case cible (entièrement sous la Réglette)</li><li>Mesurer la portée</li><li>Test de Capacité de Passe</li><li>Interceptions</li><li>Résolution</li></ol>
<table class="t"><tr><th>Portée</th><th>Modif.</th></tr>
<tr><td>Passe Rapide</td><td>0</td></tr><tr><td>Passe Courte</td><td>−1</td></tr>
<tr><td>Passe Longue</td><td>−2</td></tr><tr><td>Longue Bombe</td><td>−3</td></tr>
<tr><td>Par adversaire qui Marque le passeur</td><td>−1</td></tr></table>
<table class="t">
<tr><td><b>Précise</b></td><td>Réussi (ou 6 naturel) : le ballon arrive sur la case cible.</td></tr>
<tr><td><b>Imprécise</b></td><td>Raté : le ballon Valdingue (3) depuis la case cible.</td></tr>
<tr><td><b>Maladresse</b></td><td>1 après modificateurs (ou 1 naturel) : Rebond depuis le passeur + Turnover.</td></tr></table>
<p class="note">Case à cheval sur deux sections : on prend la plus lointaine.</p>`},
{id:"interception",g:"Ballon",t:"Interception",p:71,k:"intercepter",b:`
<p>Un adversaire Debout (avec Zone de Tacle) sous la Réglette, entre passeur et case d'arrivée, peut tenter (un seul) :</p>
<table class="t">
<tr><td>Passe Précise</td><td>−3</td></tr><tr><td>Passe Imprécise</td><td>−2</td></tr>
<tr><td>Par adversaire qui Marque l'intercepteur</td><td>−1</td></tr></table>
<p>Réussi : il prend le ballon, Turnover.</p>`},
{id:"reception",g:"Ballon",t:"Réceptionner",p:72,k:"catch attraper",b:`
<p class="formula">Test d'Agilité</p>
<table class="t">
<tr><td>Ballon qui a Rebondi</td><td>−1</td></tr><tr><td>Ballon Renvoyé par le public</td><td>−1</td></tr>
<tr><td>Par adversaire qui Marque le receveur</td><td>−1</td></tr></table>
<p>Raté : le ballon Rebondit. À Terre, Sonné ou Déconcentré : échec automatique.</p>`},
{id:"rebond",g:"Ballon",t:"Rebond, Déviation, Valdingue",p:34,k:"bounce scatter deviation gabarit",b:`
<ul><li><b>Rebondir</b> = Valdinguer (1) : 1 case dans la direction d'un D8.</li>
<li><b>Valdinguer (X)</b> : X jets de D8 successifs, case par case.</li>
<li><b>Dévier</b> : D8 pour la direction, D6 pour le nombre de cases.</li></ul>`},
{id:"renvoi",g:"Ballon",t:"Renvoi (sortie du terrain)",p:73,k:"throw in public touche",b:`
<p>Gabarit de Renvoi sur la dernière case dans le terrain : <b>D6</b> pour la direction, puis <b>2D6</b> cases (la case du gabarit compte comme la 1re). Dans un coin : D3 avec le gabarit de direction.</p>
<p>Après une Passe : Turnover si le ballon finit au sol ou chez l'adversaire.</p>`},
{id:"transmission",g:"Ballon",t:"Transmission",p:74,k:"hand off donner main a main",b:`
<ul><li>1 par Tour. Mouvement (on peut ramasser en route), puis donner le ballon à un coéquipier <b>Debout et adjacent</b> qui a sa Zone de Tacle.</li>
<li>Le receveur fait un jet de Réception normal.</li>
<li>Pas de mouvement après (sauf Transmission dans la Course).</li></ul>`},
{id:"lancer",g:"Ballon",t:"Lancer de Coéquipier",p:76,k:"ttm throw team mate poids plume",b:`
<p>1 par Tour, joueur avec <b>Lancer de Coéquipier</b>, coéquipier adjacent avec <b>Poids Plume</b>. Cible : 2 premières sections de la Réglette.</p>
<table class="t"><tr><td>Lancer Rapide</td><td>0</td></tr><tr><td>Lancer Court</td><td>−1</td></tr><tr><td>Par adversaire qui Marque le lanceur</td><td>−1</td></tr></table>
<table class="t">
<tr><td><b>Superbe</b></td><td>Réussi : Valdingue (3) depuis la cible.</td></tr>
<tr><td><b>Médiocre</b></td><td>Raté : Valdingue (3), −1 à l'atterrissage.</td></tr>
<tr><td><b>Maladresse</b></td><td>1 : Rebond depuis le lanceur, −1 à l'atterrissage.</td></tr></table>
<p><b>Atterrir</b> : Test d'Agilité, −1 par adversaire Marquant la case. Raté : Chute (Turnover seulement s'il a le ballon). Case occupée : l'occupant est Plaqué, le lancé Rebondit puis Chute. Hors terrain : Blessé par le Public + Turnover.</p>`},

/* ---------- PHASE & MATCH ---------- */
{id:"avantmatch",g:"Match",t:"Avant-match",p:44,k:"fans popularite meteo engager",b:`
<ol class="steps">
<li><b>Fans</b> : Facteur de Popularité = Fans Dévoués + D3.</li>
<li><b>Météo</b> : 2D6 (voir Tableaux).</li>
<li>Journaliers et Coups de Pouce (Ligue).</li>
<li><b>Tirer au dé</b> : le gagnant choisit qui engage.</li></ol>`},
{id:"placement",g:"Match",t:"Placement & Coup d'envoi",p:47,k:"setup kick off ligne engagement couloir",b:`
<ul><li>11 joueurs max ; l'équipe qui engage se place d'abord.</li>
<li><b>3 joueurs minimum</b> sur la Ligne d'Engagement (Champ Centre).</li>
<li><b>2 joueurs maximum</b> par Couloir Latéral.</li></ul>
<ol class="steps"><li>Désigner le joueur qui engage (pas sur la ligne ni dans un couloir)</li>
<li>Placer le ballon dans la moitié adverse ; il <b>Dévie</b> (D8 + D6)</li>
<li>Événement de Coup d'Envoi (2D6)</li>
<li>Le ballon atterrit : réception ou Rebond</li></ol>
<p class="note">Ballon hors du terrain ou dans la moitié de l'équipe qui engage : <b>Remise en Jeu</b>, l'équipe qui reçoit donne le ballon à un de ses joueurs Debout.</p>`},
{id:"touchdown",g:"Match",t:"Touchdown & Temporiser",p:80,k:"marquer en-but stalling",b:`
<ul><li>Porteur <b>Debout</b> dans l'En-but adverse (même pendant le Tour adverse).</li>
<li>Marquer pendant le Tour adverse : ce Tour finit, et l'équipe qui a marqué <b>saute</b> son Tour suivant.</li></ul>
<p><b>Temporiser</b> : le porteur pouvait marquer sans aucun jet de dé et finit son activation sans marquer. D6 en fin d'activation : si ≥ numéro du Tour, il est Plaqué par le public (Turnover).</p>`},
{id:"finphase",g:"Match",t:"Fin de Phase",p:82,k:"mi-temps fin du match prolongations",b:`
<ol class="steps"><li>Armes Secrètes Expulsées</li><li>Effets de fin de Phase (météo d'abord)</li><li>K.-O. : D6, 4+ ils reviennent</li><li>Fin de la Phase</li></ol>
<p>Après un Touchdown, l'équipe qui a marqué engage. À la mi-temps, l'équipe qui a reçu au début engage. 8 Tours par équipe et par mi-temps.</p>
<p class="note">Prolongations : 8 Tours, Relances non récupérées. Puis Tirs au But : 5 tirs au dé.</p>`}
];

// Tableaux de référence
window.BB_TABLES = [
{id:"meteo",t:"Météo",dice:"2D6",p:46,rows:[
 ["2","Canicule","Fin de Phase : chaque coach tire D3 joueurs au hasard parmi ceux qui étaient sur le terrain ; ils ratent la Phase suivante (Réserves)."],
 ["3","Très ensoleillé","−1 aux Tests de Capacité de Passe."],
 ["4-10","Conditions idéales","Aucun effet."],
 ["11","Averse","−1 pour ramasser, Réceptionner et Intercepter."],
 ["12","Blizzard","−1 supplémentaire pour Foncer. Seulement Passes Rapides ou Courtes."]]},
{id:"envoi",t:"Coup d'envoi",dice:"2D6",p:48,rows:[
 ["2","À mort l'arbitre !","Chaque équipe gagne un Pot-de-vin gratuit pour ce match."],
 ["3","Temps mort","Tour de l'équipe qui engage à 6, 7 ou 8 : les deux marqueurs reculent de 1. Sinon ils avancent de 1."],
 ["4","Solide défense","L'équipe qui engage replace jusqu'à D3+3 joueurs Démarqués."],
 ["5","Chandelle","Un joueur Démarqué de l'équipe qui reçoit se place sous le ballon."],
 ["6","Fans en folie","D6 + Cheerleaders : le meilleur gagne +1 Soutien Offensif sur son premier blocage du prochain Tour (les deux si égalité)."],
 ["7","Coaching brillant","D6 + Coachs Assistants : le meilleur gagne 1 Relance d'Équipe pour la Phase (les deux si égalité)."],
 ["8","Météo capricieuse","Nouveau jet de Météo. Si Conditions idéales : le ballon Valdingue (3) avant d'atterrir."],
 ["9","Surprise !","L'équipe qui reçoit déplace jusqu'à D3+3 joueurs Démarqués de 1 case (même dans la moitié adverse)."],
 ["10","Charge !","L'équipe qui engage active jusqu'à D3+3 joueurs Démarqués : Mouvement gratuit, dont 1 Blitz, 1 Lancer et 1 Botter de Coéquipier possibles. S'arrête si l'un tombe. Relances d'Équipe autorisées."],
 ["11","En-cas suspect","D6 chacun, le plus bas (ou les deux) tire un joueur au hasard : D6, 2+ = −1 M et −1 AR pour la Phase ; 1 = aux Réserves pour la Phase."],
 ["12","Invasion du terrain","D6 + Popularité, le plus bas (ou les deux) : D3 joueurs au hasard Mis À Terre et Sonnés."]]},
{id:"blessure",t:"Blessure",dice:"2D6",p:66,rows:[
 ["2-7","Sonné","Pion Sonné sur place."],
 ["8-9","K.-O.","Boîte des K.-O."],
 ["10-12","Éliminé","Boîte des Éliminés + Jet d'Élimination (D16)."]]},
{id:"minus",t:"Blessure (Minus)",dice:"2D6",p:66,rows:[
 ["2-6","Sonné","Pion Sonné sur place."],
 ["7-8","K.-O.","Boîte des K.-O."],
 ["9","Commotion","Éliminé, sans Jet d'Élimination (résultat Commotion)."],
 ["10-12","Éliminé","Boîte des Éliminés + Jet d'Élimination."]]},
{id:"elimination",t:"Élimination",dice:"D16",p:67,rows:[
 ["1-8","Commotion","Aucun effet durable."],
 ["9-10","Amoché","Rate le prochain match."],
 ["11-12","Blessure sérieuse","Blessure Persistante (+1 aux futurs Jets d'Élimination) et rate le prochain match."],
 ["13-14","Séquelle","−1 à une caractéristique (D6) et rate le prochain match."],
 ["15-16","Mort","Retiré de l'équipe."]]},
{id:"sequelle",t:"Séquelles",dice:"D6",p:67,rows:[
 ["1-2","Traumatisme crânien","−1 AR"],["3","Genou déboîté","−1 M"],["4","Bras cassé","−1 CP"],
 ["5","Hanche disloquée","−1 AG"],["6","Cou brisé","−1 F"]]},
{id:"contester",t:"Contester la Décision",dice:"D6",p:69,rows:[
 ["1","Dégagez !","Expulsé, et le coach ne peut plus contester du match."],
 ["2-5","Je m'en fiche !","Expulsé."],
 ["6","Ah oui, présenté comme ça…","Pas Expulsé (Turnover quand même)."]]},
{id:"temporiser",t:"Temporiser",dice:"D6",p:81,rows:[
 ["≥ n° du Tour","Projectile","Le porteur qui temporise est Plaqué (Turnover)."],
 ["< n° du Tour","Rien","Le public se contente de huer."]]},
{id:"prieres",t:"Prières à Nuffle",dice:"D16",p:"?",rows:[
 ["Règle","Comment ça marche","Coup de Pouce : 1 jet par Prière achetée. Résultat déjà obtenu : on relance. L'effet dure tout le match. Jamais sur un Star Player."],
 ["1","Trappe traîtresse","Tout joueur (des deux équipes) qui entre sur une case Trappe lance un D6 : sur 1, il tombe dedans (Blessure comme s'il était Poussé dans le public). Le ballon rebondit depuis la Trappe."],
 ["2","Copain avec l'arbitre","Quand vous Contestez la Décision, un 5 ou 6 compte comme « Ah oui, présenté comme ça… » ; 2-4 = « Je m'en fiche ! »."],
 ["3","Stylet","Un de vos joueurs, tiré au hasard, gagne Poignard."],
 ["4","Homme de fer","Un de vos joueurs, au choix, gagne +1 AR (maximum 11+)."],
 ["5","Poing américain","Un de vos joueurs, au choix, gagne Châtaigne (+1)."],
 ["6","Mauvaises habitudes","D3 joueurs adverses, tirés au hasard, gagnent Solitaire (2+)."],
 ["7","Crampons graissés","Un joueur adverse, tiré au hasard, perd 1 M (minimum 1)."],
 ["8","Statue bénie de Nuffle","Un de vos joueurs, tiré au hasard, gagne Pro."],
 ["9 ✱","Taupes sous le terrain","Les joueurs adverses ont −1 pour Foncer."],
 ["10 ✱","Passe parfaite","Vos Passes réussies rapportent 2 PSP au lieu de 1."],
 ["11 ✱","Interaction avec les fans","Votre joueur qui réceptionne une Passe gagne 1 PSP."],
 ["12 ✱","Violence nécessaire","Si un adversaire Poussé dans le public est Éliminé, votre joueur qui l'a poussé gagne 2 PSP."],
 ["13 ✱","Frénésie d'agressions","Votre joueur qui Élimine un adversaire sur une Agression gagne 2 PSP (comme sur un Blocage)."],
 ["14 ✱","Lancer de pierre","1 fois par match, au début de votre Tour (avant toute activation) : un joueur adverse sur le terrain tiré au hasard, D6 : sur 4+ il est Plaqué."],
 ["15 ✱","Sous surveillance","Un adversaire qui casse l'armure sur une Agression est vu par l'arbitre, même sans double."],
 ["16 ✱","Entraînement intensif","Un de vos joueurs, tiré au hasard, gagne 1 compétence Principale de votre choix."],
 ["Tournoi","Version D8","✱ Résultats 9-16 non utilisés en tournoi : on lance un D8 (lignes 1 à 8)."]]}
];

// Antisèche des modificateurs
window.BB_MODS = [
 {e:"💨",t:"Esquiver",v:"AG − 1 / adversaire Marquant la case d'arrivée"},
 {e:"🦘",t:"Bondir",v:"AG − max(Marqueurs départ, Marqueurs arrivée)"},
 {e:"🏃",t:"Foncer",v:"2+ (Blizzard −1)"},
 {e:"🧍",t:"Se relever (M ≤ 2)",v:"4+"},
 {e:"✋",t:"Ramasser",v:"AG − 1 / Marqueur (Averse −1)"},
 {e:"🔒",t:"Sécuriser le ballon",v:"2+ (Averse −1)"},
 {e:"🎯",t:"Passe",v:"CP : Rapide 0 · Courte −1 · Longue −2 · Bombe −3 · −1 / Marqueur"},
 {e:"🛑",t:"Intercepter",v:"AG : Précise −3 · Imprécise −2 · −1 / Marqueur"},
 {e:"🙌",t:"Réceptionner",v:"AG : Rebond −1 · Renvoi −1 · −1 / Marqueur"},
 {e:"🚀",t:"Lancer coéquipier",v:"CP : Rapide 0 · Court −1 · −1 / Marqueur"},
 {e:"🪂",t:"Atterrir",v:"AG : Médiocre/Maladresse −1 · −1 / Marqueur"},
 {e:"🥾",t:"Agression",v:"Armure +1 / Soutien off. · −1 / Soutien déf."},
 {e:"🛏️",t:"Retour K.-O.",v:"4+ en fin de Phase"}
];

// Emojis contextuels des tableaux : e = tableau, r = lignes (par résultat)
window.BB_TABLE_EMOJI = {
 meteo:{e:"🌦️",r:{"Canicule":"🥵","Très ensoleillé":"☀️","Conditions idéales":"🌤️","Averse":"🌧️","Blizzard":"❄️"}},
 envoi:{e:"🏈",r:{"À mort l'arbitre !":"💰","Temps mort":"⏱️","Solide défense":"🧱","Chandelle":"🎈","Fans en folie":"📣","Coaching brillant":"📋","Météo capricieuse":"🌪️","Surprise !":"😮","Charge !":"⚡","En-cas suspect":"🌭","Invasion du terrain":"🏃"}},
 blessure:{e:"🤕",r:{"Sonné":"💫","K.-O.":"😵","Éliminé":"🚑"}},
 minus:{e:"🐭",r:{"Sonné":"💫","K.-O.":"😵","Commotion":"🤕","Éliminé":"🚑"}},
 elimination:{e:"🚑",r:{"Commotion":"🤕","Amoché":"🩹","Blessure sérieuse":"🩼","Séquelle":"🦴","Mort":"⚰️"}},
 sequelle:{e:"🦴",r:{"Traumatisme crânien":"🧠","Genou déboîté":"🦵","Bras cassé":"💪","Hanche disloquée":"🦴","Cou brisé":"🦒"}},
 contester:{e:"⚖️",r:{"Dégagez !":"🟥","Je m'en fiche !":"🤷","Ah oui, présenté comme ça…":"👍"}},
 temporiser:{e:"⏳",r:{"Projectile":"🍅","Rien":"😒"}},
 prieres:{e:"🙏",r:{"Comment ça marche":"📜","Trappe traîtresse":"🕳️","Copain avec l'arbitre":"🤝","Stylet":"🗡️","Homme de fer":"🛡️","Poing américain":"👊","Mauvaises habitudes":"🙄","Crampons graissés":"🧈","Statue bénie de Nuffle":"🗿","Taupes sous le terrain":"🐀","Passe parfaite":"🎯","Interaction avec les fans":"🙌","Violence nécessaire":"💥","Frénésie d'agressions":"🥾","Lancer de pierre":"🪨","Sous surveillance":"👀","Entraînement intensif":"🏋️","Version D8":"🏆"}}
};
