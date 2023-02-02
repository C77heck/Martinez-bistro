# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies in the container
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Build the React app in the container
RUN npm run build

# Set the command to start the app when the container launches
CMD ["npm", "start"]

# Expose port 3000 in the container to allow connections to the app
EXPOSE 3000
