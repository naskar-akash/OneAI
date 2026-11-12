FROM node

# creating a working dir named 'app'
WORKDIR /app

# installing package.json and package-lock.json from backend's root into working dir's root(./)
COPY package*.json ./
RUN npm install

# installing package.json and package-lock.json from 'backend/services/billing'into "/app/services/billing" folder
COPY ./services/billing/package*.json ./services/billing/
RUN cd services/billing && npm install

# copying whole billing folder and shared folder
COPY services/billing ./services/billing
COPY shared ./shared

# main working dir to be run
WORKDIR /app/services/billing
EXPOSE 8004

CMD [ "npm","start" ]

