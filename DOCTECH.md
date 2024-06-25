# Étapes de Réalisation

## Préparation du Projet

### Sélection du Projet

Choisissez un projet existant que vous souhaitez utiliser comme base pour ce travail. Assurez-vous que le projet est fonctionnel et qu'il peut être adapté pour inclure les technologies et services nécessaires.

### Création du Repository GitHub

1. **Créez un compte GitHub** (si vous n'en avez pas déjà un) en visitant [GitHub](https://github.com/).

2. **Créez un nouveau repository** pour votre projet :
   - Connectez-vous à votre compte GitHub.
   - Cliquez sur le bouton `+` en haut à droite de la page et sélectionnez "New repository".
   - Nommez votre repository, ajoutez une description si vous le souhaitez, et choisissez si le repository sera public ou privé.
   - Cliquez sur "Create repository".

3. **Clonez le repository sur votre machine locale** :
   - Ouvrez votre terminal ou invite de commande.
   - Exécutez la commande suivante (remplacez `your-username` et `your-repository` par les noms appropriés) :

     ```sh
     git clone https://github.com/your-username/your-repository.git
     cd your-repository
     ```

4. **Configurez les branches principales (`main`, `develop`)** :
   - Par convention, la branche principale sera `main` et la branche de développement sera `develop`.
   - Pour créer et passer à la branche `develop`, exécutez :

     ```sh
     git checkout -b develop
     ```

   - Poussez la branche `develop` vers GitHub :

     ```sh
     git push origin develop
     ```

5. **Ajoutez vos fichiers de projet au repository** :
   - Copiez tous les fichiers et dossiers de votre projet existant dans le dossier du repository cloné.
   - Ajoutez les fichiers à l'index Git, validez-les et poussez-les vers GitHub :

     ```sh
     git add .
     git commit -m "Initial commit with existing project"
     git push origin develop
     ```

### Fichier .env

1. **Créez un fichier `.env`** à la racine de votre projet. Ce fichier contiendra les clés d'accès nécessaires pour se connecter à votre compte AWS.

2. **Ajoutez les variables d'environnement suivantes** dans le fichier `.env` :

   ```env
   ACCESS_KEY=your_access_key_id
   SECRET_KEY=your_secret_access_key

# Documentation Technique : Docker - Conteneurisation

## Introduction

Docker est une plateforme de conteneurisation qui permet de créer, déployer et exécuter des applications dans des conteneurs. Les conteneurs sont légers et portables, ce qui permet de simplifier le déploiement d'applications et de garantir leur fonctionnement cohérent dans différents environnements.

Cette documentation explique comment conteneuriser plusieurs services Node.js et orchestrer ces conteneurs à l'aide de Docker Compose.

## Prérequis

- Docker installé sur votre machine. [Guide d'installation de Docker](https://docs.docker.com/get-docker/)
- Docker Compose installé. [Guide d'installation de Docker Compose](https://docs.docker.com/compose/install/)

## Structure du Projet Docker

Votre projet doit contenir les fichiers suivants :

- Dockerfiles pour chaque service
- Un fichier `docker-compose.yml` pour orchestrer les conteneurs

## Création des Dockerfiles

### Dockerfile pour `beatService.js`

Créez un fichier nommé `Dockerfile` dans le répertoire de `beatService.js` :

``dockerfile
# Utiliser l'image Node.js officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le reste du code de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Démarrer l'application
CMD ["node", "beatService.js"]


# Documentation technique (SWARN)

## Initialisation du Réseau Swarm

### Step 1 : Créer les VMs avec Multipass

- **Créez trois machines virtuelles (VMs) pour le cluster Docker Swarm :** \
  `multipass launch --name manager` \
   `multipass launch --name worker1`\
   `multipass launch --name worker2`

### Step 2 : Installer Docker sur chaque VM

- **Connectez-vous à chaque VM et installez Docker :**\
  `multipass shell manager`
- **Dans la VM manager :**\
  `curl -fsSL https://get.docker.com/ -o get-docker.sh`\
   `sudo sh get-docker.sh`\
  Répétez ces steps pour les worker1 et worker2.

### Step 3 : Initialiser le Swarm sur le manager

- **Sur la VM manager, initialisez le Swarm :**\
  `docker swarm init --advertise-addr $(multipass info manager | grep IPv4 | awk '{print $2}')`

### Step 4 : Joindre les workers au Swarm

- **Vous recevrez une commande de jointure après l'initialisation du Swarm, par exemple :**\
  `docker swarm join --token SWMTKN-1-0xyzabcdefghijklmnopqrstuv 192.168.64.3:2377`\
  Connectez-vous à worker1 et worker2 et exécutez cette commande pour les joindre au Swarm.

## Déploiement des Services

### Step 1 : Préparer les Stacks Docker

- Créez un fichier docker-stack.yml à la racine de votre projet

### Step 2 : Construire et Pousser les Images Docker

- **Construisez et poussez les images Docker vers un registre Docker (Docker Hub ou un registre privé) :**\
   `docker build -t your_dockerhub_username/beat-service:latest ./path/to/beatService`\
   `docker build -t your_dockerhub_username/beats-service:latest ./path/to/beatsService`\
   `docker build -t your_dockerhub_username/playlist-service:latest ./path/to/playlistService`\
   `docker push your_dockerhub_username/beat-service:latest`\
   `docker push your_dockerhub_username/beats-service:latest`\
   `docker push your_dockerhub_username/playlist-service:latest`\

### Step 3 : Déployer la Stack sur le Swarm

- **Sur la VM manager, déployez la stack Docker :**\
  `docker stack deploy -c docker-stack.yml music-stack`

## Test du Déploiement des Conteneurs

- Vérifiez le statut des services
- **Pour vérifier que vos services sont correctement déployés et en cours d'exécution, utilisez la commande suivante sur la VM manager :**\
  `docker stack services music-stack`\
  Cette commande affichera l'état de chaque service, y compris le nombre de réplicas en cours d'exécution.

## Résilience aux Pannes

- Pour configurer la tolérance aux pannes, utilisez les options de déploiement et de redémarrage dans le fichier docker-stack.yml, comme indiqué précédemment.

# documentation AWS EC2 Deployment

## Préparation du Déploiement avec Terraform

### Étape 1: Écrire des scripts Terraform

1. **Créez les fichiers nécessaires pour Terraform :**

   - `main.tf`
   - `variables.tf`
   - `terraform.tfvars`

2. **Initialisation et application de Terraform :**

  - `terraform init`

  - Planifiez et appliquez votre configuration :
  - `terraform plan`
  - `terraform apply`

## Gestion de la Configuration avec Ansible

1. **Créez un fichier d'inventaire :**

  - `hosts.ini`

2. **Créez un fichier de playbook :**

  - `setup.yml`

3. **Exécutez le playbook Ansible :**

  - `ansible-playbook -i hosts.ini setup.yml`



