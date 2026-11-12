FROM node

# creating a working dir named 'app'
WORKDIR /app

# installing package.json and package-lock.json from backend's root into working dir's root(./)
COPY package*.json ./
RUN npm install

# installing package.json and package-lock.json from 'backend/services/chat'into "/app/services/chat" folder
COPY ./services/chat/package*.json ./services/chat/
RUN cd services/chat && npm install

# copying whole chat folder and shared folder
COPY services/chat ./services/chat
COPY shared ./shared

# main working dir to be run
WORKDIR /app/services/chat
EXPOSE 8002

CMD [ "npm","start" ]

