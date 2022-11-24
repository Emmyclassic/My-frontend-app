# Pull official base image
FROM node:12.16.3

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# copy all files
COPY . ./

 # Expose running port
EXPOSE 3000

# start app
CMD ["npm", "start"]