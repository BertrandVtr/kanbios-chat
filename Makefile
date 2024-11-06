# Variables
DOCKER_COMPOSE = docker compose
CONTAINER_BACKEND = backend
CONTAINERS_DATABASE = postgres mongodb

.PHONY: default up build migrate down enter logs database

default: build up migrate

# Commande pour lancer tous les conteneurs
# Possibilité de lancer des conteneur spécifiques de cette manière:
# make up container=<nom_du_conteneur>
# make up container="<nom_du_conteneur_1> <nom_du_conteneur_2> ..."
up:
	$(DOCKER_COMPOSE) up -d $(container)
	@echo "Le projet est maintenant accessible à l'URL : http://localhost:3000"

# Commande pour construire tous les containers
# Possibilité de construire des conteneur spécifiques de cette manière:
# make build container=<nom_du_conteneur>
# make build container="<nom_du_conteneur_1> <nom_du_conteneur_2> ..."
build:
	$(DOCKER_COMPOSE) build $(container)

# Commande pour lancer les migrations dans le backend
migrate:
	$(DOCKER_COMPOSE) exec $(CONTAINER_BACKEND) npm run typeorm:migrate:run

# Commande pour arrêter tous les conteneurs
# Possibilité d'arrêter des conteneur spécifiques de cette manière:
# make build container=<nom_du_conteneur>
# make build container="<nom_du_conteneur_1> <nom_du_conteneur_2> ..."
down:
	$(DOCKER_COMPOSE) down $(container)

# Commande pour entrer dans un conteneur
# Utilisation: make enter container=<nom_du_conteneur>
enter:
	$(DOCKER_COMPOSE) exec $(container) /bin/sh

# Commande pour afficher les logs d'un un conteneur
# Utilisation: make logs container=<nom_du_conteneur>
logs:
	$(DOCKER_COMPOSE) logs $(container) -f

# Commande pour lancer les conteneurs de base de donnée
database:
	$(DOCKER_COMPOSE) up -d $(CONTAINERS_DATABASE)