FROM gcr.io/rootstock/k8s-rwallet-server-base:0.0.2

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

#define environment value SERVICE
ENV SERVICE rwallet

# Expose the listening port of your app
EXPOSE 1338

# Show current folder structure in logs; used for debugging
# RUN ls -al -R

CMD [ "npm", "start"]
