# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if applicable) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]