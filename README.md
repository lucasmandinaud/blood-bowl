# 🏈 Bible Blood Bowl – 3e Saison

Aide-mémoire Blood Bowl pour iPhone : compétences et traits, règles, tableaux, portées de passe et fiches des 31 équipes.
C'est une web app installable (PWA) qui fonctionne hors-ligne.

## Installer sur iPhone
1. Ouvrir l'adresse de l'app dans **Safari**.
2. Toucher **Partager**, puis **Sur l'écran d'accueil**.

## Modifier le contenu
| Fichier | Contenu |
|---|---|
| `data-skills.js` | Compétences et traits |
| `data-rules.js` | Règles, tableaux (météo, coup d'envoi…), antisèche |
| `data-teams.js` | Équipes, joueurs, emojis des équipes |
| `app.js` / `index.html` | Affichage et design |
| `timer.js` | Chrono de match (onglet Match) |

Après une modification, augmentez `VERSION` dans `sw.js` (ex : `bb-v22`) pour que les téléphones récupèrent la nouvelle version.

Les textes sont des résumés rédigés pour l'aide-mémoire. En cas de doute, c'est le livre de règles officiel qui fait foi.

## Feuille de match (Lutèce)

Depuis l'onglet Timer, « 📝 Feuille de match » : saisie pendant et après le match, puis « Générer le PDF » (A4, mise en page de la feuille officielle) et partage vers Mail/Gmail. Le fond de la feuille est `fdm-bg.jpg` ; le code est dans `fdm.js`.
