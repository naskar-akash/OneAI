FROM node

# creating a working dir named 'app'
WORKDIR /app

# installing package.json and package-lock.json from backend's root into working dir's root(./)
COPY package*.json ./
RUN npm install

# installing package.json and package-lock.json from 'backend/gateway'into "/app/gateway"
COPY ./gateway/package*.json ./gateway/
RUN cd gateway && npm install

# copying whole gateway folder and shared folder
COPY gateway ./gateway
COPY shared ./shared

# main working dir to be run
WORKDIR /app/gateway
EXPOSE 8000

CMD [ "npm","start" ]

