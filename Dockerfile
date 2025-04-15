# Utiliser une image de base officielle Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances et serve globalement
RUN npm install && npm install -g serve

# Copier le reste du code source
COPY . .

# Compiler le TypeScript
RUN npx tsc

# Exposer le port sur lequel l'application va tourner
EXPOSE 3003

# Commande par défaut pour démarrer le serveur
CMD ["serve", "-s", ".", "-l", "3003"]
