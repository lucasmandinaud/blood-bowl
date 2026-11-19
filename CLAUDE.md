# Bible Blood Bowl (web app iPhone, GitHub Pages)

- Avant chaque commit qui change l'app, lancer `tools/bump-version.sh` : il incrémente la version
  (`<meta name="app-version">` et `?v=` des scripts dans index.html). Les iPhones détectent la
  nouvelle version à l'ouverture et se rechargent seuls ; sans incrément, ils gardent l'ancienne
  version jusqu'à 10 minutes (cache de GitHub Pages).
- Publier en poussant sur `main` (GitHub Pages).
