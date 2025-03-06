# Usa la imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todos los archivos de la aplicación
COPY . .

# Expone el puerto 4000
EXPOSE 4000

# Inicia la aplicación
CMD ["npm", "run", "start:dev"]
