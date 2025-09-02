ARG NODE_VERSION=22.14.0-alpine

# Start from base node container image
FROM node:${NODE_VERSION}

# Set the working directory inside the container
WORKDIR /app/

# Copy package-related files
COPY rms/package.json rms/package-lock.json ./

# Copy application related files
COPY rms/ ./

# Install dependencies
RUN npm install

# Serve the application on port 4000
EXPOSE 4200

CMD ["npm", "start"]