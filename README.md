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

Après une modification, augmentez `VERSION` dans `sw.js` (ex : `bb-v14`) pour que les téléphones récupèrent la nouvelle version.

Les textes sont des résumés rédigés pour l'aide-mémoire. En cas de doute, c'est le livre de règles officiel qui fait foi.
