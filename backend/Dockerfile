# Etapa 1: Construção do JAR
FROM maven:3.9.5-eclipse-temurin-17 as builder

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos do projeto Maven para o container
COPY pom.xml ./
COPY src ./src

# Executa o Maven para construir o JAR
RUN mvn clean package -DskipTests

# Etapa 2: Container final
FROM eclipse-temurin:17-jdk-jammy

# Define o diretório de trabalho no container
WORKDIR /app

# Instalar o netcat (nc) no contêiner
RUN apt-get update && apt-get install -y netcat

# Copia o JAR gerado na etapa anterior para o container final
COPY --from=builder /app/target/*.jar app.jar

# Exposição da porta usada pela aplicação Spring Boot
EXPOSE 8080

# Instala o dockerize no contêiner
RUN apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xvzf dockerize-linux-amd64-v0.6.1.tar.gz && \
    mv dockerize /usr/local/bin/

# Modificar o ENTRYPOINT para usar dockerize
ENTRYPOINT ["dockerize", "-wait", "tcp://mysql:3306", "-timeout", "60s", "java", "-jar", "app.jar"]
