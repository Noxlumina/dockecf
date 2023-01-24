# Back et Front Dockeurisé

## Présentation

Version du back et du front sous docker

## Prérequis

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- ou une base de donnée installé localement dans notre cas Mongo Compas
- un IDE (VScode)
-rajouter un fichier .env à la racine du projet avec  les données suivantes:
NEST_PORT=5000
VUE_PORT=8080
MONGO_PORT=27017

## Installation

Effectuer la commande à la racine du projet :

```bash
docker-compose up -d
```

### Lancement de l'application sans IDE

Pour lancer l'application, il suffit de se connecter à l'adresse suivante:
http://localhost:8080/
