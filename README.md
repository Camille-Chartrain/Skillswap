Pour le déploiement :

Modifier les fichiers .env front et back

Pour exemple mon back : 

PORT=3000
SECRET=
PUBLIC_URL=http://localhost:3000/
TOKEN_SECRET=

PGUSER=
PGDATABASE=
PGPASSWORD=

mon front :
PORT=1234
REACT_APP_URL=camille-chartrain-server.eddi.cloud
REACT_APP_PORT=3000


Le script dans le fichier yaml construit la bdd et fait la synchro avec sequelize, mais il ne rentre pas de données de faux utilisateurs. Pour les ajouter:

Lancer docker en ayant commenté le seeding de sequelize (BACK/models/index.js)
docker compose up --build

Stopper les containers
ctrl c

Décommenter le seeding sequelize
Relancer les containers
docker compose up --build 

Recommenter le seeding pour qu'il ne se relance pas à chaque fois que les containers seront remontés.



Quelques commandes qui peuvent être utiles :

Supprimer les containers : docker compose down -v
Voir les volumes : docker volume ls
Supprimer un volume : docker volume rm nomDuVolume
Accès au container PSQL: docker exec -it bddLucileCam  sh
(Tu peux ensuite te connecter à la bdd et lancer des commandes psql.)

Si besoin supprimer la bdd, il faut stopper les containers et les supprimer, vérifier qu'il n'y ait pas de  volumes survivants, puis supprimer le dossier psql : sudo rm -r psql/