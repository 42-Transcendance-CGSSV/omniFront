# omniFront

Pour une approche frontale totale et puissante

OmniFront est un framework front-end léger et performant pour les applications web, écrit en TypeScript. Il offre une architecture modulaire et des fonctionnalités avancées pour créer des applications web modernes et réactives.

Fonctionnalités:

1. Système de Composants

2. DOM Virtuel

3. Système de Routage

4. Support pour les Tests

🚀 Lancement du projet frontend avec Docker
📦 Prérequis

    Docker

    (Optionnel) Docker Compose

⚙️ 1. Avec Docker Compose (recommandé)

Lance le projet avec hot-reload :

docker-compose up --build

🧠 Ce que ça fait :

    Monte ton code local dans le conteneur

    Garde les node_modules isolés

    Active le hot-reload de Vite automatiquement

Tu peux maintenant accéder à l'application sur :
👉 http://localhost:3004
🐳 2. Sans Docker Compose

Tu peux aussi lancer le projet manuellement :
🔧 a) Build de l’image

docker build -t omnifront .

🚀 b) Lancement avec hot-reload

docker run -p 3004:3004 \
 -v $(pwd):/app \
 -v /app/node_modules \
 --name omnifront_dev \
 omnifront

🧠 Ici aussi :

    Ton code local est monté dans le conteneur

    Les changements sont pris en compte en temps réel (grâce à Vite)

🛑 Arrêter et nettoyer
Avec Docker Compose :

docker-compose down

Sans Docker Compose :

docker stop omnifront_dev && docker rm omnifront_dev
