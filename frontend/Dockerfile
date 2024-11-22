# Etapa 1: Construção
FROM node:18 as builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências para o container
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install


# Copia o restante dos arquivos do projeto
COPY . .

# Realiza o build da aplicação
RUN npm run build || true

# Etapa 2: Servir os arquivos estáticos
FROM nginx:1.25

# Copia os arquivos de build para a pasta de conteúdo estático do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração padrão do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do Nginx
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
