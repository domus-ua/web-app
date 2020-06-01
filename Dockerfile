FROM node:latest

# set working directory
WORKDIR /app

COPY . /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN ls -la /app

RUN npm install

# start app
CMD HOST='0.0.0.0' PORT=3000 npm start
