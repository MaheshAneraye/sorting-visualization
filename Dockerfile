# Stage 1: Build
FROM node:14 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of your application code
COPY . .

# RUN npm run build  # Uncomment if you have a build step

# Stage 2: Run
FROM node:14

# Set the working directory for the final image
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
