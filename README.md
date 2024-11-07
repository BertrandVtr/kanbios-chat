# Kanbios-chat (Test technique)

Ce projet est une application web full-stack utilisant un backend en Node.js, un frontend en React, et des bases de données PostgreSQL et MongoDB. Le projet est
entièrement conteneurisé avec Docker et peut être lancé facilement en utilisant `docker-compose`.

## Structure du Projet

- `backend/` : Contient le code du backend en Node.js.
- `frontend/` : Contient le code du frontend en React.
- `docker-compose.yml` : Fichier de configuration Docker pour lancer les différents services.
- `Makefile` : Fichier pour simplifier les commandes Docker et de gestion des migrations.

## Prérequis

- **Docker** et **Docker Compose** doivent être installés sur votre machine.
- **Node.js** et **npm** (si vous souhaitez exécuter le projet localement sans Docker pour le développement).

## Configuration des Variables d'Environnement

Avant de démarrer, configurez les variables d'environnement pour les bases de données et les services.

Créez un fichier `.env` à la racine avec les variables suivantes :

```plaintext
# Variables pour PostgresQL
DATABASE_TYPE=postgres
DATABASE_HOST=postgres
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_DB=kanbios-chat
DATABASE_PORT=5432

# Variables pour MongoDB
MONGO_DB_PORT=27017
MONGO_DB_DATABASE=chat
MONGO_DB_HOST=mongodb

# Vairables pour le Backend
JWT_SECRET=psXMhJi@J43iFzc3RBtMy&mzon!R7a!$3ypxo!&3
JWT_EXPIRES="1day"
NODE_PORT=3001

# Variables pour le Frontend
VITE_API_URL=http://localhost:3001
```

Afin de simplifier le déploiement du projet, un fichier .env fonctionnel a été push dans le projet.

## Commandes Docker avec le Makefile

Le projet inclut un `Makefile` pour simplifier les opérations courantes.

- **Démarrer tous les conteneurs** :
  ```bash
  make up
  ```

- **Arrêter tous les conteneurs** :
  ```bash
  make down
  ```

- **Lancer les migrations dans le backend** :
  ```bash
  make migrate
  ```

- **Entrer dans un conteneur** :
  ```bash
  make enter container=<nom_du_conteneur>
  ```
  Exemple pour entrer dans le conteneur backend :
  ```bash
  make enter container=backend
  ```

- **Afficher les logs d'un conteneur** :
    ```bash
    make logs container=<nom_du_conteneur>
    ```
- **Démarrer seulement les conteneurs de base de données** _(utile pour le développement local)_ :
    ```bash
    make database
    ```
## Utilisation

1. **Démarrer le projet** : Pour démarrer tous les services, utilisez :
   ```bash
   make up
   ```

2. **Accéder au frontend** : L'application frontend est accessible sur `http://localhost:3000`.

3. **Accéder au backend** : L'API backend est disponible sur `http://localhost:3001`. L'ApiDoc est disponible à l'adresse `http://localhost:3001/api-docs` 

4. **Bases de données** :
    - **PostgreSQL** est accessible sur le port défini dans `POSTGRES_PORT` (par défaut `5432`).
    - **MongoDB** est accessible sur le port défini dans `MONGO_DB_PORT` (par défaut `27017`).

## Gestion des Migrations

Le backend utilise TypeORM pour gérer les migrations de la base de données PostgreSQL.

- **Lancer les migrations** :
  ```bash
  make migrate
  ```

- **Créer une nouvelle migration** (depuis le conteneur `backend`) :
  ```bash
  make enter container=backend
  npm run typeorm:migration:create -- -n NomDeLaMigration
  ```

Assurez-vous d'avoir défini un script `typeorm:migration:run` dans le fichier `package.json` du backend.

## Développement Local

Pour un développement local sans Docker, vous pouvez lancer chaque service individuellement après avoir installé les dépendances :

- Dans le dossier `backend` :
  ```bash
  npm install
  npm run start:dev
  ```

- Dans le dossier `frontend` :
  ```bash
  npm install
  npm run dev
  ```

Attention de bien modifié le `.env` du dossier `backend` afin de bien configurer les accès database du projet nestjs.
Attention également de bien couper les containers `frontend` et `backend` afin de libérer les ports de la machine.

```bash
make down container="frontend backend"
```

## Remarques

- Assurez-vous que tous les ports nécessaires sont libres avant de démarrer les services Docker.
- Pour modifier la configuration de la base de données ou des services, éditez le fichier `.env` et redémarrez les conteneurs.
