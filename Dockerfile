# Use the official Node.js 18 image as our base image.
FROM node:18

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files to the container.
COPY package.json yarn.lock ./

# Install dependencies in the container.
RUN yarn install

# Copy the rest of the application to the container.
COPY . .

# Expose the port the app will run on.
EXPOSE 3000

# Set the command to run the application directly with ts-node. 
# This assumes your entry file is located at `src/RSITrackerProcess.ts`.
CMD ["yarn", "ts-node", "src/RSITrackerProcess.ts"]
