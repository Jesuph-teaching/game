FROM node:current-slim

# Install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# update submodules 
RUN git clone https://github.com/A9ra/a9ra-components.git ./common

# Bundle app source and submodules
COPY . .

# Build the app
RUN npm run build

# Expose port defined in env
EXPOSE $PORT

# Start the app
CMD npm run start
