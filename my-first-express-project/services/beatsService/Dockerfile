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
EXPOSE 3001

# Démarrer l'application
CMD ["node", "beatsService.js"]
