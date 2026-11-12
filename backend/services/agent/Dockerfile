FROM node

# creating a working dir named 'app'
WORKDIR /app

# installing package.json and package-lock.json from backend's root into working dir's root(./)
COPY package*.json ./
RUN npm install

# installing package.json and package-lock.json from 'backend/services/agent'into "/app/services/agent" folder
COPY ./services/agent/package*.json ./services/agent/
RUN cd services/agent && npm install

# copying whole agent folder and shared folder
COPY services/agent ./services/agent
COPY shared ./shared

# main working dir to be run
WORKDIR /app/services/agent
EXPOSE 8003

CMD [ "npm","start" ]

