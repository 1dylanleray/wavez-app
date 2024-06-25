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
