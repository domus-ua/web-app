FROM node:latest

# set working directory
WORKDIR /app

COPY . /app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN ls -la /app

RUN npm install
RUN npm install serve

RUN npm run build # compile

# start app
# CMD ["npm", "start"]
CMD serve -s build -l tcp://0.0.0.0:3000
