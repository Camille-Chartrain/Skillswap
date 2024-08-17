# deploiement :

- lancement du deploiement sur coolify à partir du repo github publique
- erreure :
	- npm n'arrive pas à acceder aux package.json
- connexion au server via ssh pour identifier le probleme :
	- le dossier du projet n'est que partiellement importé de github
- activation de l'option "Preserve Repository During Deployment" dans coolify
- deploiement à nouveau, nouvelle erreure :
	- conflit dans les fichiers importés
	- resolus manuellement avec ssh pour l'instant
- le deploiement va plus loin, nouvelle erreur :
	- imports ne fonctionnent pas à cause d'une erreure dans le nom d'un fichier icone
- resoud le pbm, push sur github, redeploi
- ca marche !
