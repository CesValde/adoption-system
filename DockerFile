# Imagen base
FROM node:22

# Directorio de trabajo
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer puerto (ajusta si usas otro)
EXPOSE 8000

# Comando de ejecución
CMD ["npm", "start"]
