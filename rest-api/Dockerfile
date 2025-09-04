ARG NODE_VERSION=22.14.0-alpine

# Start from base node container image
FROM node:${NODE_VERSION}

# Set the working directory inside the container
WORKDIR /api/

# Copy package-related files
COPY package.json package-lock.json ./

# Copy application related files
COPY src/ ./src/

# Install dependencies
RUN npm install

# Serve the application on port 4000
EXPOSE 3000

CMD ["npm", "start"]