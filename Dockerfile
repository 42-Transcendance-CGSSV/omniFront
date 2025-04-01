# Utiliser une image de base officielle Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port sur lequel l'application va tourner
EXPOSE 5000

# Commande par défaut pour exécuter les tests
CMD ["npm", "test"]
