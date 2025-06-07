# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
ENV MONGO_URI=mongodb://216.225.201.134:27017/erp_db?directConnection=true&tls=false
# Expose the port your application runs on
EXPOSE 3000

# Define the command to run your application
CMD ["pm2", "start","src/server.js"]
CMD ["pm2", "save"]
CMD ["pm2", "startup"]