# Use a lightweight JDK base image
FROM eclipse-temurin:17-jdk

# Set work directory
WORKDIR /app

# Copy and build the Spring Boot app
COPY . /app

# Build the project
RUN ./mvnw clean install -DskipTests

# Run the app
CMD ["java", "-jar", "target/ecb-0.0.1-SNAPSHOT.jar"]
