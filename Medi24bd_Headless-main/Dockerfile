# Step 1: Build Stage 
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including development dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Step 2: Production Stage (using a smaller image for running)
FROM node:16-slim

# Install PostgreSQL client and OpenSSL if required for your app
RUN apt-get update -y && apt-get install -y openssl postgresql-client

# Set the working directory for the production image
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env /app/.env

# Copy dist and uploads directories from the build stage
COPY --from=build /app/dist /app/dist
#COPY --from=build /app/uploads /app/uploads

# Ensure uploads directory exists and has the correct permissions
#RUN mkdir -p /app/uploads && chmod 755 /app/uploads

# Install only production dependencies (skip dev dependencies)
RUN npm install

# Set environment variables (e.g., PORT)
ENV PORT=3050

# Expose the port your app listens on
EXPOSE 3050

# Start the application
CMD ["npm", "start"]
