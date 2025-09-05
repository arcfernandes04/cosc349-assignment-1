ARG NODE_VERSION=22.14.0-alpine

# Start from base node container image
FROM node:${NODE_VERSION}

# Set the working directory inside the container
WORKDIR /app/

# Copy package-related files
COPY rms/package.json rms/package-lock.json ./

# Copy application related files
COPY rms/ ./

# Accept args from docker compose
ARG API_HOST
ARG API_PORT

# Inject env vars into the application
RUN echo "export const environment = { apiUrl: '${API_HOST}:${API_PORT}' };" > src/environment.ts

# Install dependencies
RUN npm install

# Serve the application on port 4200
EXPOSE 4200

CMD ["npm", "start"]