# Use a lightweight JDK image
FROM eclipse-temurin:17-jdk

# Set working directory inside the container
WORKDIR /app

# Copy the contents of /backend into the container's /app folder
COPY backend/ /app/

# Grant execute permission to Maven wrapper (for Linux environments)
RUN chmod +x mvnw

# Build the Spring Boot app inside /app
RUN ./mvnw clean install -DskipTests

# Run the built JAR (update filename if different)
CMD ["java", "-jar", "target/ecb-0.0.1-SNAPSHOT.jar"]
