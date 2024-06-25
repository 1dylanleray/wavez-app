# Documentation technique (SWARN)

## Initialisation du Réseau Swarm

### Step 1 : Créer les VMs avec Multipass

- **Créez trois machines virtuelles (VMs) pour le cluster Docker Swarm :** \
  `multipass launch --name manager` \
   `multipass launch --name worker1`\
   `multipass launch --name worker2`

### Step 2 : Installer Docker sur chaque VM

- **Connectez-vous à chaque VM et installez Docker :** `multipass shell manager`
- **Dans la VM manager :**\
  `curl -fsSL https://get.docker.com/ -o get-docker.sh`\
   `sudo sh get-docker.sh`\
  Répétez ces steps pour les worker1 et worker2.

# !!!A COMPLETER!!!
