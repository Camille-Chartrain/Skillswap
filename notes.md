# deploiement :

- lancement du deploiement sur coolify à partir du repo github publique
- **erreur :**
	- npm n'arrive pas à acceder aux package.json
	- connexion au server via ssh pour identifier le probleme :
	- le dossier du projet n'est que partiellement importé de github
	- activation de l'option "Preserve Repository During Deployment" dans coolify
- deploiement à nouveau
- **nouvelle erreur :**
	- conflits dans les fichiers importés
	- resolus manuellement avec ssh pour l'instant
- le deploiement va plus loin
- **nouvelle erreur :**
	- imports ne fonctionnent pas à cause d'une erreure dans le nom d'un fichier icone
- resoud le pbm, push sur github, redeploi
- ca marche !
- **erreur :**
	- le site s'affiche, mais pas les infos de la ddb
	- on verra demain

---

- redeploi le lendemain
- **erreur :**
	- ddb ne trouve le dossier pgnotify
	- pbm vient du volume de la ddb "psql" qui n'est pas vide donc pas reinstallé
	- il faudra l'enlever de github, pour l'instant je le vide
- ca marche !
- **erreur :**
	- le site s'affiche, mais pas les infos de la ddb
	- pbm avec le nom de domaine : les variables .env ne sont pas remplies
	- pour que les variables soient prises en compte il faut rebuild react
- **erreur :**
	- npm run build ne marche pas
	- pbm vient de la ligne "main: index.js" : parcel ne sait pas quoi en faire, je l'enleve
	- buil fonctionne, pbm de .env et url resolu
- **erreur :**
	- aucune info ne revient du back
