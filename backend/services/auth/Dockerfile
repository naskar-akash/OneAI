FROM node

# creating a working dir named 'app'
WORKDIR /app

# installing package.json and package-lock.json from backend's root into working dir's root(./)
COPY package*.json ./
RUN npm install

# installing package.json and package-lock.json from 'backend/services/auth'into "/app/services/auth" folder
COPY ./services/auth/package*.json ./services/auth/
RUN cd services/auth && npm install

# copying whole auth folder and shared folder
COPY services/auth ./services/auth
COPY shared ./shared

# main working dir to be run
WORKDIR /app/services/auth
EXPOSE 8001

CMD [ "npm","start" ]

