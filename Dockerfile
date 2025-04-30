# Use lightweight JDK
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy everything from backend folder
COPY backend/ /app/

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean install -DskipTests

# Run the generated JAR (auto-detect jar name)
CMD ["sh", "-c", "java -jar target/*.jar"]
