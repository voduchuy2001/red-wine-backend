# Use Node.js 20.10.0 image as a parent image
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
RUN npm install -g nodemon
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 9000 to the outside world
EXPOSE 9000

# Command to run the application
CMD ["npm", "start"]
