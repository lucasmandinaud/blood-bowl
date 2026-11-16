// Fiches d'équipe – Blood Bowl 3e Saison (livre p. 160-190)
// Joueur : [qté, poste, mots-clés, coût (k po), M, F, AG, CP, AR, compétences & traits, principales, secondaires]
const TROLL = ["0-1","Troll","Troll, Gros Bras",115,4,5,"5+","5+","10+","Châtaigne, Gerbe de Vomi, Gros Débile, Lancer de Coéquipier, Régénération, Solitaire (4+), Toujours Affamé"];
const OGRE3 = ["0-1","Ogre","Ogre, Gros Bras",140,5,5,"4+","5+","10+","Cerveau Lent, Châtaigne, Crâne Épais, Lancer de Coéquipier, Solitaire (3+)"];
const OGRE4 = ["0-1","Ogre","Ogre, Gros Bras",140,5,5,"4+","5+","10+","Cerveau Lent, Châtaigne, Crâne Épais, Lancer de Coéquipier, Solitaire (4+)"];
const MINO = ["0-1","Minotaure","Minotaure, Gros Bras",150,5,5,"4+","6+","9+","Châtaigne, Cornes, Crâne Épais, Frénésie, Fureur Débridée, Solitaire (4+)"];
const RATOGRE = ["0-1","Rat-ogre","Skaven, Gros Bras",150,6,5,"4+","6+","9+","Châtaigne, Frénésie, Queue Préhensile, Sauvagerie Animale, Solitaire (4+)"];
const TROLLE = (q) => [q,"Troll Entraîné","Troll, Gros Bras",115,4,5,"5+","5+","10+","Châtaigne, Gerbe de Vomi, Gros Débile, Lancer de Coéquipier, Régénération, Toujours Affamé","F","A, G, P"];
const ARBRE = (q, solo) => [q,"Homme-arbre de l'Altern","Homme-arbre, Gros Bras",120,2,6,"5+","5+","11+","Bras Musclé, Châtaigne, Crâne Épais, Lancer de Coéquipier, Prendre Racine, "+(solo?"Solitaire (4+), ":"")+"Stabilité, Timmm-ber !","F","A, G, P"];
const KROX = ["0-1","Kroxigor","Homme-lézard, Gros Bras",140,6,5,"5+","6+","10+","Cerveau Lent, Châtaigne, Crâne Épais, Queue Préhensile, Solitaire (4+)","F","A, G"];
const GOB = (q, p, s) => [q,"Trois-quarts Gobelin","Gobelin, Trois-quarts",40,6,2,"3+","4+","8+","Esquive, Minus, Poids Plume",p,s];
const SNOT = ["0-16","Trois-quarts Snotling","Snotling, Trois-quarts",15,5,1,"3+","4+","6+","Esquive, Glissade Contrôlée, Insignifiant, Microbe, Minus, Poids Plume","A, S","G"];
const GOULE = ["0-2","Coureur Goule","Goule, Coureur, Mort-vivant",75,7,3,"3+","3+","8+","Esquive, Régénération","A, G","F, P, S"];
const ZOMBIE = (q) => [q,"Trois-quarts Zombie","Humain, Trois-quarts, Zombie, Mort-vivant",40,4,3,"4+","6+","9+","Fourchette, Instable, Régénération","G, S","A, F"];

window.BB_TEAMS = [
{n:"Alliance du Vieux Monde",p:160,lg:"Classique du Vieux Monde",sr:[],rr:70,apo:true,bigNote:"Un seul Gros Bras parmi Ogre et Homme-arbre.",pl:[
 ["0-16","Trois-quarts Humain","Humain, Trois-quarts",50,6,3,"3+","4+","9+","—","G","A, F"],
 ["0-3","Aspirant Halfling","Halfling, Trois-quarts",30,5,2,"3+","4+","7+","Esquive, Minus, Poids Plume","A","F, G"],
 ["0-1","Receveur Humain","Humain, Receveur",75,8,3,"3+","4+","8+","Esquive, Réception","A, G","P, F"],
 ["0-3","Trois-quarts Nain","Nain, Trois-quarts",70,4,3,"4+","5+","10+","Blocage, Crâne Épais, Défenseur","G, S","F"],
 ["0-1","Lanceur Humain","Humain, Lanceur",75,6,3,"3+","3+","9+","Passe, Prise Sûre","G, P","A, F"],
 ["0-1","Coureur Nain","Nain, Coureur",80,6,3,"3+","4+","9+","Crâne Épais, Prise Sûre, Sprint","G, P","A, F"],
 ["0-1","Blitzeur Humain","Humain, Blitzeur",85,7,3,"3+","4+","9+","Blocage, Tacle","F, G","A"],
 ["0-1","Blitzeur Nain","Nain, Blitzeur",100,5,3,"4+","4+","10+","Blocage, Crâne Épais, Tacle Plongeant, Tacle","F, G","P"],
 ["0-1","Tueur de Trolls","Nain, Spécial",95,5,3,"4+","5+","9+","Blocage, Crâne Épais, Frénésie, Haine (Troll), Intrépide","F, G","A"],
 [...OGRE3,"F","A, G"], ARBRE("0-1", true)]},
{n:"Amazones",p:161,lg:"Super-Ligue de Lustrie",sr:[],rr:60,apo:true,pl:[
 ["0-16","Guerrière Aigle","Humain, Trois-quarts",50,6,3,"3+","4+","8+","Esquive","G","A, F"],
 ["0-2","Guerrière Python","Humain, Lanceur",80,6,3,"3+","3+","8+","Esquive, Sur le Ballon, Passe, Passe Assurée","G, P","A, F"],
 ["0-2","Guerrière Piranha","Humain, Blitzeur",90,7,3,"3+","4+","8+","Esquive, Frappe-et-court, Rétablissement","A, G","F"],
 ["0-2","Guerrière Jaguar","Humain, Bloqueur",110,6,4,"3+","4+","9+","Défenseur, Esquive","F, G","A"]]},
{n:"Bas-fonds",p:162,lg:"Défi des Bas-fonds",sr:["Chantage et Corruption"],rr:70,apo:true,bigNote:"Un seul Gros Bras parmi Troll et Rat-ogre.",pl:[
 GOB("0-16","A, M, S","F, G, P"),
 ["0-6","Trois-quarts Snotling","Snotling, Trois-quarts",15,5,1,"3+","4+","6+","Esquive, Glissade Contrôlée, Insignifiant, Microbe, Minus, Poids Plume","A, M, S","G"],
 ["0-3","Rat des Clans Skaven","Skaven, Trois-quarts",50,7,3,"3+","4+","8+","Animosité (Gobelins)","G, M, S","A, F"],
 ["0-1","Lanceur Skaven","Skaven, Lanceur",80,7,3,"3+","2+","8+","Animosité (Gobelins), Passe, Prise Sûre","G, M, P","A, F, S"],
 ["0-1","Coureur d'Égouts","Skaven, Coureur",85,9,2,"2+","4+","8+","Animosité (Gobelins), Esquive, Poignard","A, G, M, S","F"],
 ["0-1","Blitzeur Skaven","Skaven, Blitzeur",90,8,3,"3+","4+","9+","Animosité (Gobelins), Arracher le Ballon, Blocage","F, G, M","A, S"],
 [...TROLL,"F, M","A, G, P"], [...RATOGRE,"F, M","A, G"]]},
{n:"Bretonniens",p:163,lg:"Classique du Vieux Monde",sr:[],rr:60,apo:true,pl:[
 ["0-16","Écuyer Bretonnien","Humain, Trois-quarts",50,6,3,"3+","4+","8+","Lutte","G","A, F"],
 ["0-2","Receveur Chevalier Bretonnien","Humain, Receveur",85,7,3,"3+","4+","9+","Intrépide, Nerfs d'Acier, Réception","A, G","F"],
 ["0-2","Lanceur Chevalier Bretonnien","Humain, Lanceur",80,6,3,"3+","3+","9+","Intrépide, Nerfs d'Acier, Passe","G, P","A, F"],
 ["0-2","Chevalier du Graal","Humain, Blitzeur",95,7,3,"3+","4+","10+","Appuis Sûrs, Blocage, Intrépide","F, G","A"]]},
{n:"Elfes Noirs",p:164,lg:"Ligue des Royaumes Elfiques",sr:[],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Elfe Noir","Elfe, Trois-quarts",65,6,3,"2+","3+","9+","—","A, G","F, S"],
 ["0-2","Coureur Elfe Noir","Elfe, Coureur",80,7,3,"2+","3+","8+","Dégagement, Délestage","A, G, P","F, S"],
 ["0-2","Assassin Elfe Noir","Elfe, Spécial",90,7,3,"2+","4+","8+","Frappe-et-court, Poignard, Poursuite","A, S","F, G"],
 ["0-2","Blitzeur Elfe Noir","Elfe, Blitzeur",105,7,3,"2+","3+","9+","Blocage","A, G","F, P, S"],
 ["0-2","Furie Elfe Noire","Elfe, Spécial",110,7,3,"2+","4+","8+","Esquive, Frénésie, Rétablissement","A, G","F, P, S"]]},
{n:"Elfes Sylvains",p:165,lg:"Ligue des Royaumes Elfiques ou Ligue Sylvestre",sr:[],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Elfe Sylvain","Elfe, Trois-quarts",65,7,3,"2+","3+","8+","—","A, G","F"],
 ["0-2","Lanceur Elfe Sylvain","Elfe, Lanceur",85,7,3,"2+","2+","8+","Libération Contrôlée, Passe","A, G, P","F"],
 ["0-2","Receveur Elfe Sylvain","Elfe, Receveur",90,8,2,"2+","3+","8+","Esquive, Réception, Sprint","A, G","F, P"],
 ["0-2","Danseur de Guerre","Elfe, Blitzeur",130,8,3,"2+","3+","8+","Blocage, Esquive, Saut","A, G","F, P"],
 ["0-1","Homme-arbre de la Loren","Homme-arbre, Gros Bras",120,2,6,"5+","5+","11+","Bras Musclé, Châtaigne, Crâne Épais, Lancer de Coéquipier, Prendre Racine, Solitaire (4+), Stabilité","F","A, G, P"]]},
{n:"Élus du Chaos",p:166,lg:"Clash du Chaos",sr:["Favoris de (au choix)"],rr:50,apo:true,bigNote:"Un seul Gros Bras parmi Troll, Ogre et Minotaure.",pl:[
 ["0-16","Trois-quarts Homme-bête","Homme-bête, Trois-quarts",55,6,3,"3+","3+","9+","Cornes, Crâne Épais","G, M","A, F, P, S"],
 ["0-4","Élu du Chaos","Humain, Bloqueur",100,5,4,"3+","5+","10+","Clé de Bras","F, G, M","A, S"],
 [...TROLL,"F, M","A, G, P"], [...OGRE4,"F, M","A, G"], [...MINO,"F, M","A, G"]]},
{n:"Gnomes",p:167,lg:"Coupe Dé à Coudre Halfling ou Ligue Sylvestre",sr:[],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Gnome","Gnome, Trois-quarts",40,5,2,"3+","4+","7+","Lutte, Minus, Poids Plume, Rétablissement","A","F, G, S"],
 ["0-2","Renard Sylvestre","Animal, Coureur",50,7,2,"2+","—","6+","Esquive, Glissade Contrôlée, Minus, Mon Ballon","—","A"],
 ["0-2","Illusionniste Gnome","Gnome, Spécial",50,5,2,"3+","3+","7+","Farceur, Lutte, Minus, Rétablissement","A, P","G, S"],
 ["0-2","Belluaire Gnome","Gnome, Bloqueur",55,5,2,"3+","4+","8+","Garde, Lutte, Minus, Rétablissement","A","F, G, S"],
 ARBRE("0-2", false)]},
{n:"Gobelins",p:168,lg:"Bagarre des Terres Arides ou Défi des Bas-fonds",sr:["Chantage et Corruption"],rr:60,apo:true,pl:[
 GOB("0-16","A, S","F, G, P"),
 ["0-1","Cinglé","Gobelin, Spécial",40,6,2,"3+","—","8+","Arme Secrète, Minus, Sans Ballon, Tronçonneuse","S","A, F, G"],
 ["0-1","Bomba","Gobelin, Spécial",45,6,2,"3+","4+","8+","Arme Secrète, Bombardier, Esquive, Minus","P, S","A, F, G"],
 ["0-1","Ouligan'","Gobelin, Spécial",60,6,2,"3+","5+","8+","Esquive, Joueur Déloyal, Minus, Présence Perturbante, Poids Plume, Provocation","A, S","F, G"],
 ["0-1","Plongeur de la Mort","Gobelin, Spécial",65,6,2,"3+","6+","8+","Esquive, Minus, Piqué, Poids Plume","A","F, G, S"],
 ["0-1","Fanatique","Gobelin, Spécial",70,3,7,"3+","—","8+","Arme Secrète, Chaîne et Boulet, Minus, Sans Ballon","F, S","A, G"],
 ["0-1","Échassier à Ressort","Gobelin, Spécial",75,7,2,"3+","4+","8+","Esquive, Minus, Monté sur Ressort","A","F, G, S"],
 TROLLE("0-2")]},
{n:"Halflings",p:169,lg:"Coupe Dé à Coudre Halfling ou Ligue Sylvestre",sr:[],rr:60,apo:true,pl:[
 ["0-16","Aspirant Halfling","Halfling, Trois-quarts",30,5,2,"3+","4+","7+","Esquive, Minus, Poids Plume","A","F, G, S"],
 ["0-2","Balaise Halfling","Halfling, Bloqueur",50,5,2,"3+","3+","8+","Esquive, Minus, Parade","A, P","F, G, S"],
 ["0-2","Receveur Halfling","Halfling, Receveur",55,5,2,"3+","4+","7+","Esquive, Minus, Poids Plume, Réception, Sprint","A","F, G, S"],
 ARBRE("0-2", false)]},
{n:"Hauts Elfes",p:170,lg:"Ligue des Royaumes Elfiques",sr:[],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Haut Elfe","Elfe, Trois-quarts",65,6,3,"2+","3+","9+","—","A, G","F"],
 ["0-2","Guerrier Phœnix","Elfe, Lanceur",90,6,3,"2+","2+","9+","Passe, Passe Assurée, Perce-nuages","A, G, P","F"],
 ["0-2","Prince Dragon","Elfe, Coureur",110,8,3,"2+","4+","9+","Appuis Sûrs, Blocage, Mon Ballon","A, G","F"],
 ["0-2","Lion Blanc","Elfe, Blitzeur",110,7,3,"2+","3+","9+","Griffes, Lutte","A, G","F, P"]]},
{n:"Hommes-lézards",p:171,lg:"Super-Ligue de Lustrie",sr:[],rr:70,apo:true,pl:[
 ["0-16","Trois-quarts Skink","Homme-lézard, Trois-quarts",60,8,2,"3+","4+","8+","Esquive, Minus","A","F, G, P, S"],
 ["0-2","Skink Caméléon","Homme-lézard, Lanceur",70,7,2,"3+","3+","8+","Esquive, Minus, Poursuite, Sur le Ballon","A, P","F, G, S"],
 ["0-6","Bloqueur Saurus","Homme-lézard, Bloqueur",90,6,4,"5+","6+","10+","Instable, Juggernaut","F, G","A"],
 KROX]},
{n:"Horreurs Nécromantiques",p:172,lg:"Spot de Sylvanie",sr:["Maîtres de la Non-vie"],rr:70,apo:true,pl:[
 ZOMBIE("0-16"), GOULE,
 ["0-2","Spectre","Spectre, Bloqueur, Mort-vivant",85,6,3,"3+","—","9+","Blocage, Glissade Contrôlée, Régénération, Répulsion, Sans Ballon","F, G","A, S"],
 ["0-2","Golem de Chair","Amalgame, Bloqueur, Mort-vivant",110,4,4,"4+","6+","10+","Crâne Épais, Instable, Régénération, Stabilité","F, G","A, S"],
 ["0-2","Loup-garou","Loup-garou, Blitzeur, Mort-vivant",120,8,3,"3+","3+","9+","Frénésie, Griffes, Régénération","A, G","F, P, S"]]},
{n:"Humains",p:173,lg:"Classique du Vieux Monde",sr:["Capitaine"],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Humain","Humain, Trois-quarts",50,6,3,"3+","4+","9+","—","G","A, F, S"],
 ["0-3","Aspirant Halfling","Halfling, Trois-quarts",30,5,2,"3+","4+","7+","Esquive, Minus, Poids Plume","A","F, G, S"],
 ["0-2","Receveur Humain","Humain, Receveur",75,8,3,"3+","4+","8+","Esquive, Réception","A, G","F, P, S"],
 ["0-2","Lanceur Humain","Humain, Lanceur",75,6,3,"3+","3+","9+","Passe, Prise Sûre","G, P","A, F, S"],
 ["0-2","Blitzeur Humain","Humain, Blitzeur",85,7,3,"3+","4+","9+","Blocage, Tacle","F, G","A, S"],
 [...OGRE3,"F","A, G"]]},
{n:"Khorne",p:174,lg:"Clash du Chaos",sr:["Bagarreurs Brutaux","Favoris de Khorne"],rr:60,apo:true,pl:[
 ["0-16","Maraudeur Sanglant","Humain, Trois-quarts",50,6,3,"3+","4+","8+","Frénésie","G, M","A, F, S"],
 ["0-2","Khorngor","Homme-bête, Coureur",70,6,3,"3+","4+","9+","Cornes, Crâne Épais, Juggernaut, Rétablissement","F, G, M","A, P, S"],
 ["0-4","Rabatteur Sanglant","Humain, Bloqueur",105,5,4,"4+","6+","10+","Frénésie","F, G, M","A, S"],
 ["0-1","Rejeton Sanglant","Rejeton, Gros Bras",160,5,5,"4+","6+","9+","Châtaigne, Frénésie, Fureur Débridée, Griffes, Solitaire (4+)","F, M","A, G"]]},
{n:"Morts Ambulants",p:175,lg:"Spot de Sylvanie",sr:["Maîtres de la Non-vie"],rr:70,apo:false,pl:[
 ["0-16","Trois-quarts Squelette","Humain, Mort-vivant, Squelette, Trois-quarts",40,5,3,"4+","6+","8+","Crâne Épais, Régénération","G","A, F, S"],
 ZOMBIE("0-16"), GOULE,
 ["0-2","Blitzeur Revenant","Humain, Squelette, Blitzeur, Mort-vivant",95,6,3,"3+","5+","9+","Blocage, Crâne Épais, Régénération, Tacle","F, G","A, S"],
 ["0-2","Momie","Humain, Mort-vivant, Bloqueur, Gros Bras",125,3,5,"5+","6+","10+","Châtaigne, Régénération","F","A, G"]]},
{n:"Nains",p:176,lg:"Super-Ligue du Bord du Monde",sr:["Bagarreurs Brutaux","Chantage et Corruption"],rr:60,apo:true,pl:[
 ["0-16","Trois-quarts Nain","Nain, Trois-quarts",70,4,3,"4+","5+","10+","Blocage, Crâne Épais, Défenseur","G, S","F"],
 ["0-2","Coureur Nain","Nain, Coureur",80,6,3,"3+","4+","9+","Crâne Épais, Prise Sûre, Sprint","G, P","A, F"],
 ["0-2","Blitzeur Nain","Nain, Blitzeur",100,5,3,"4+","4+","10+","Blocage, Crâne Épais, Tacle, Tacle Plongeant","F, G","P"],
 ["0-2","Tueur de Trolls","Nain, Spécial",95,5,3,"4+","5+","9+","Blocage, Crâne Épais, Frénésie, Haine (Troll), Intrépide","F, G","S"],
 ["0-1","Roule-mort","Nain, Gros Bras, Spécial",170,5,7,"5+","—","11+","Arme Secrète, Châtaigne, Esquive en Force, Joueur Déloyal, Juggernaut, Sans Ballon, Solitaire (4+), Stabilité","F, S","G"]]},
{n:"Nains du Chaos",p:177,lg:"Bagarre des Terres Arides ou Clash du Chaos",sr:["Favoris de Hashut"],rr:70,apo:true,pl:[
 ["0-16","Trois-quarts Hobgobelin","Gobelin, Trois-quarts",40,6,3,"3+","4+","8+","—","S","A, F, G"],
 ["0-2","Surineur Sournois","Gobelin, Spécial",60,6,3,"3+","5+","8+","Poignard, Poursuite","G, S","A, F"],
 ["0-4","Bloqueur Nain du Chaos","Nain, Bloqueur",70,4,3,"4+","6+","10+","Blocage, Crâne Épais, Peau de Fer","F, G","A, M, S"],
 ["0-2","Forgeflamme","Nain, Spécial",80,5,3,"4+","6+","10+","Bagarreur, Crâne Épais, Souffle Ardent, Présence Perturbante","F, G","A, M, S"],
 ["0-2","Centaure-taureau","Nain, Blitzeur",130,6,4,"4+","6+","10+","Crâne Épais, Équilibre, Instable, Sprint","F, G","A, M, S"],
 [...MINO,"F, M","A, G"]]},
{n:"Noblesse Impériale",p:178,lg:"Classique du Vieux Monde",sr:[],rr:60,apo:true,pl:[
 ["0-16","Valet Impérial","Humain, Trois-quarts",45,6,3,"3+","4+","8+","Parade","G","A, F"],
 ["0-2","Lanceur Impérial","Humain, Lanceur",75,6,3,"3+","2+","9+","Passe, Pro, Transmission dans la Course","G, P","A, F"],
 ["0-4","Garde du Corps","Humain, Bloqueur",85,5,3,"3+","4+","9+","Lutte, Stabilité","F, G","A"],
 ["0-2","Blitzeur Noble","Humain, Blitzeur",90,7,3,"3+","4+","9+","Blocage, Pro, Réception","A, G","F, P"],
 [...OGRE3,"F","A, G"]]},
{n:"Nordiques",p:179,lg:"Clash du Chaos ou Classique du Vieux Monde",sr:["Favoris de Khorne (si Clash du Chaos)"],rr:60,apo:true,pl:[
 ["0-16","Pillard Nordique","Humain, Trois-quarts",50,6,3,"3+","4+","8+","Blocage, Crâne Épais, Instable, Ivrogne","G","A, F, P"],
 ["0-2","Sanglier de Secours","Animal, Spécial",20,5,1,"3+","—","6+","Esquive, Microbe, Minus, Petit Remontant, Sans Ballon","—","A"],
 ["0-2","Berserker Nordique","Humain, Blitzeur",90,6,3,"3+","5+","8+","Blocage, Frénésie, Rétablissement","F, G","A, P"],
 ["0-2","Valkyrie","Humain, Receveur, Lanceur",95,7,3,"3+","3+","8+","Arracher le Ballon, Intrépide, Passe, Réception","A, G, P","F"],
 ["0-2","Ulfwerener","Humain, Bloqueur",105,6,4,"4+","6+","9+","Frénésie, Instable","F, G","A"],
 ["0-1","Yéti","Yéti, Gros Bras",140,5,5,"4+","6+","9+","Frénésie, Fureur Débridée, Griffes, Présence Perturbante, Solitaire (4+)","F","A, G"]]},
{n:"Nurgle",p:180,lg:"Clash du Chaos",sr:["Bagarreurs Brutaux","Favoris de Nurgle"],rr:60,apo:false,pl:[
 ["0-16","Trois-quarts Putrescent","Humain, Trois-quarts",40,5,3,"4+","6+","9+","Contagieux, Décomposition","G, M, S","A, F"],
 ["0-2","Pestigor","Homme-bête, Coureur",70,6,3,"3+","4+","9+","Appuis Sûrs, Contagieux, Cornes, Crâne Épais, Régénération","F, G, M","A, P, S"],
 ["0-4","Boursouflé","Humain, Bloqueur",110,4,4,"4+","6+","10+","Contagieux, Instable, Présence Perturbante, Régénération, Répulsion, Stabilité","F, G, M","A, S"],
 ["0-1","Rejeton Putride","Rejeton, Gros Bras",140,4,5,"5+","6+","10+","Châtaigne, Contagieux, Gros Débile, Petit Remontant, Présence Perturbante, Régénération, Répulsion, Solitaire (4+), Tentacules","F","G, M, S"]]},
{n:"Ogres",p:181,lg:"Bagarre des Terres Arides ou Super-Ligue du Bord du Monde",sr:["Bagarreurs Brutaux","Trois-quarts à Vil Prix"],rr:70,apo:true,pl:[
 ["0-16","Trois-quarts Gnoblar","Gnoblar, Trois-quarts",15,5,1,"3+","4+","6+","Esquive, Glissade Contrôlée, Microbe, Minus, Poids Plume","A, S","G"],
 ["0-5","Bloqueur Ogre","Ogre, Bloqueur, Gros Bras",140,5,5,"4+","5+","10+","Cerveau Lent, Châtaigne, Crâne Épais, Lancer de Coéquipier","F","A, G, P, S"],
 ["0-1","Botte-nabots Ogre","Ogre, Lanceur, Gros Bras",145,5,5,"4+","4+","10+","Botter de Coéquipier, Cerveau Lent, Châtaigne, Crâne Épais","F, P","A, G, S"]]},
{n:"Orques",p:182,lg:"Bagarre des Terres Arides",sr:["Bagarreurs Brutaux","Capitaine"],rr:60,apo:true,pl:[
 ["0-16","Trois-quarts Orque","Orque, Trois-quarts",50,5,3,"3+","4+","10+","—","F, G","A, S"],
 GOB("0-4","A, S","F, G, P"),
 ["0-2","Lanceur Orque","Orque, Lanceur",75,6,3,"3+","3+","9+","Passe, Prise Sûre","G, P","A, F, S"],
 ["0-2","Blitzeur Orque","Orque, Blitzeur",85,6,3,"3+","4+","10+","Blocage, Esquive en Force","F, G","A, S"],
 ["0-2","Bloqueur Kosto","Orque, Bloqueur",95,5,4,"4+","6+","10+","Châtaigne, Crâne Épais, Instable, Provocation","F, G","A, S"],
 [...TROLL,"F","A, G, P"]]},
{n:"Orques Noirs",p:183,lg:"Bagarre des Terres Arides",sr:["Bagarreurs Brutaux","Chantage et Corruption"],rr:60,apo:true,pl:[
 ["0-16","Malabar Gobelin","Gobelin, Trois-quarts",45,6,2,"3+","4+","8+","Esquive, Poids Plume, Crâne Épais, Minus","A, S","F, G, P"],
 ["0-6","Orque Noir","Orque, Bloqueur",90,4,4,"4+","5+","10+","Bagarreur, Projection","F, G","A, S"],
 TROLLE("0-1")]},
{n:"Renégats du Chaos",p:184,lg:"Clash du Chaos",sr:["Favoris de (Khorne, Nurgle, Slaanesh, Tzeentch ou Chaos Universel)"],rr:70,apo:true,bigNote:"Jusqu'à trois Gros Bras parmi Troll, Ogre, Minotaure et Rat-ogre.",pl:[
 ["0-16","Humain Renégat","Humain, Trois-quarts",50,6,3,"3+","4+","9+","Animosité (tous)","G, M, S","A, F"],
 ["0-1","Gobelin Renégat","Gobelin, Trois-quarts",40,6,2,"3+","4+","8+","Animosité (tous), Esquive, Poids Plume, Minus","A, M, S","G, P"],
 ["0-1","Orque Renégat","Orque, Trois-quarts",50,5,3,"3+","4+","10+","Animosité (tous)","G, M, S","A, F"],
 ["0-1","Skaven Renégat","Skaven, Trois-quarts",50,7,3,"3+","4+","8+","Animosité (tous)","G, M, S","A, F"],
 ["0-1","Elfe Noir Renégat","Elfe, Trois-quarts",65,6,3,"2+","3+","9+","Animosité (tous)","A, G, M, S","F"],
 ["0-1","Lanceur Humain Renégat","Humain, Lanceur",75,6,3,"3+","3+","9+","Animosité (tous), Passe, Prise Sûre","G, M, P, S","A, F"],
 [...TROLL,"F","A, G, M, P"], [...OGRE3,"F","A, G, M"], [...MINO,"F","A, G, M"], [...RATOGRE,"F","A, G, M"]]},
{n:"Rois des Tombes",p:185,lg:"Spot de Sylvanie",sr:["Maîtres de la Non-vie"],rr:60,apo:false,pl:[
 ["0-16","Trois-quarts Squelette","Humain, Squelette, Trois-quarts, Mort-vivant",40,5,3,"4+","6+","8+","Crâne Épais, Régénération","G","A, F, S"],
 ["0-2","Lanceur des Rois des Tombes","Humain, Squelette, Lanceur, Mort-vivant",65,6,3,"4+","3+","9+","Crâne Épais, Passe, Prise Sûre, Régénération","G, P","A, F, S"],
 ["0-2","Blitzeur des Rois des Tombes","Humain, Squelette, Blitzeur, Mort-vivant",85,6,3,"4+","5+","9+","Blocage, Crâne Épais, Régénération","F, G","A, S"],
 ["0-4","Gardien des Tombes","Humain, Gros Bras, Bloqueur, Mort-vivant",115,4,5,"5+","6+","10+","Bagarreur, Décomposition, Régénération","F","A, G"]]},
{n:"Skavens",p:186,lg:"Défi des Bas-fonds",sr:[],rr:50,apo:true,pl:[
 ["0-16","Rat des Clans Skaven","Skaven, Trois-quarts",50,7,3,"3+","4+","8+","—","G, S","A, F, M"],
 ["0-2","Lanceur Skaven","Skaven, Lanceur",80,7,3,"3+","2+","8+","Passe, Prise Sûre","G, P","A, F, M, S"],
 ["0-2","Coureur d'Égouts","Skaven, Coureur",85,9,2,"2+","4+","8+","Esquive, Poignard","A, G, S","F, M"],
 ["0-2","Blitzeur Skaven","Skaven, Blitzeur",90,8,3,"3+","4+","9+","Arracher le Ballon, Blocage","F, G","A, M, S"],
 [...RATOGRE,"F","A, G, M"]]},
{n:"Slanns",p:187,lg:"Super-Ligue de Lustrie",sr:[],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Slann","Homme-lézard, Trois-quarts",60,6,3,"3+","4+","9+","Monté sur Ressort","G","A, F"],
 ["0-2","Receveur Slann","Homme-lézard, Receveur",80,7,2,"2+","3+","8+","Monté sur Ressort, Réception Plongeante, Sur le Ballon, Très Longues Jambes","A, G","F, P"],
 ["0-2","Blitzeur Slann","Homme-lézard, Blitzeur",100,7,3,"3+","4+","9+","Frappe-et-court, Monté sur Ressort, Rétablissement, Tacle Plongeant, Très Longues Jambes","A, F, G","P"],
 KROX]},
{n:"Snotlings",p:188,lg:"Défi des Bas-fonds",sr:["Chantage et Corruption","Trois-quarts à Vil Prix","Déferlement"],rr:70,apo:true,pl:[
 SNOT,
 ["0-2","R'bondisseur","Snotling, Spécial",20,6,1,"3+","4+","6+","Esquive, Glissade Contrôlée, Minus, Monté sur Ressort, Poids Plume","A, S","G"],
 ["0-2","Échassier","Snotling, Coureur",20,6,1,"3+","4+","6+","Esquive, Glissade Contrôlée, Minus, Poids Plume, Sprint","A, S","G"],
 ["0-2","Lance-champis","Snotling, Spécial",30,5,1,"3+","4+","6+","Arme Secrète, Bombardier, Esquive, Glissade Contrôlée, Microbe, Minus, Poids Plume","A, P, S","G"],
 ["0-2","Chariot à Pompe","Snotling, Gros Bras, Spécial",100,5,5,"5+","6+","9+","Châtaigne, Gros Débile, Joueur Déloyal, Juggernaut, Stabilité","F, S","A, G"],
 TROLLE("0-2")]},
{n:"Union Elfique",p:189,lg:"Ligue des Royaumes Elfiques",sr:[],rr:50,apo:true,pl:[
 ["0-16","Trois-quarts Elfe","Elfe, Trois-quarts",65,6,3,"2+","3+","8+","Fumblerooski","A, G","F"],
 ["0-2","Lanceur Elfe","Elfe, Lanceur",75,6,3,"2+","2+","8+","Passe, Passe Désespérée","A, G, P","F"],
 ["0-2","Receveur Elfe","Elfe, Receveur",100,8,3,"2+","4+","8+","Nerfs d'Acier, Réception, Réception Plongeante","A, G","F"],
 ["0-2","Blitzeur Elfe","Elfe, Blitzeur",115,7,3,"2+","3+","9+","Blocage, Glissade Contrôlée","A, G","F, P"]]},
{n:"Vampires",p:190,lg:"Spot de Sylvanie",sr:["Maîtres de la Non-vie"],rr:60,apo:true,pl:[
 ["0-16","Trois-quarts Sbire","Humain, Trois-quarts, Sbire",40,6,3,"3+","4+","8+","—","G","A, F"],
 ["0-2","Coureur Vampire","Vampire, Coureur, Mort-vivant",100,8,3,"2+","3+","8+","Regard Hypnotique, Régénération, Soif de Sang (2+)","A, G","F, P"],
 ["0-2","Lanceur Vampire","Vampire, Lanceur, Mort-vivant",110,6,4,"2+","2+","9+","Passe, Regard Hypnotique, Régénération, Soif de Sang (2+)","A, G, P","F"],
 ["0-2","Blitzeur Vampire","Vampire, Blitzeur, Mort-vivant",110,6,4,"2+","4+","9+","Juggernaut, Regard Hypnotique, Régénération, Soif de Sang (3+)","A, F, G","—"],
 ["0-1","Vargheist","Vampire, Gros Bras, Mort-vivant",150,5,5,"4+","6+","10+","Frénésie, Griffes, Régénération, Soif de Sang (3+), Solitaire (4+)","F","A, G"]]}
];

window.BB_TEAM_RULES = {
 "Bagarreurs Brutaux":"En Ligue : 3 PSP (au lieu de 2) par Élimination, mais seulement 2 PSP (au lieu de 3) par Touchdown.",
 "Chantage et Corruption":"Une fois par match, peut relancer un 1 obtenu pour Contester la Décision.",
 "Capitaine":"Désignez un joueur de départ (pas un Gros Bras) : il gagne Pro gratuitement. S'il est sur le terrain, à chaque Relance d'Équipe utilisée, D6 : sur 6 naturel elle est gratuite. Il doit être aligné si possible.",
 "Maîtres de la Non-vie":"Une fois par match, si un adversaire de F 4 ou moins et sans Minus obtient « Mort » : ajoutez un Trois-quarts gratuit en Réserves (peut être gardé après le match si la liste a moins de 16 joueurs).",
 "Trois-quarts à Vil Prix":"En Ligue, les Trois-quarts comptent 0 po dans la Valeur d'Équipe Actuelle (hors améliorations).",
 "Déferlement":"Au début de chaque Phase, après le placement : peut ajouter D3 Trois-quarts des Réserves sur le terrain, au-delà de 11 joueurs.",
 "Favoris de":"Alignement sur un Dieu du Chaos (Hashut, Khorne, Nurgle, Slaanesh, Tzeentch, Chaos Universel), choisi à la création si l'équipe a le choix. Donne accès à certains Star Players et Coups de Pouce."
};

// Emoji affiché pour chaque équipe
window.BB_TEAM_EMOJI = {
 "Alliance du Vieux Monde":"🤝","Amazones":"🏹","Bas-fonds":"🍄","Bretonniens":"⚜️","Elfes Noirs":"🗡️",
 "Elfes Sylvains":"🍃","Élus du Chaos":"😈","Gnomes":"🦊","Gobelins":"👺","Halflings":"🥧","Hauts Elfes":"🧝",
 "Hommes-lézards":"🦎","Horreurs Nécromantiques":"🐺","Humains":"🛡️","Khorne":"🩸","Morts Ambulants":"🧟",
 "Nains":"⚒️","Nains du Chaos":"🔥","Noblesse Impériale":"👑","Nordiques":"🪓","Nurgle":"🪰","Ogres":"🍖",
 "Orques":"👹","Orques Noirs":"🔨","Renégats du Chaos":"☠️","Rois des Tombes":"🏺","Skavens":"🐀",
 "Slanns":"🐸","Snotlings":"🤏","Union Elfique":"✨","Vampires":"🧛"
};
