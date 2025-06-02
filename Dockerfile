FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci -D
COPY . .
CMD ["sh", "-c", "mkdir -p /shared/assets/ && echo Copying public files into assets && cp -r ./assets/* /shared/assets/ && echo Building the front-end... && npm run build && echo Copying the build output inside nginx volume... &&cp -r ./build/* /shared/"]
