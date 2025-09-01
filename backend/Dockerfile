FROM node:22-alpine

WORKDIR /usr/src/app

# copy over package json and install
COPY package.json ./
RUN npm i

# copy over the rest of the source code
COPY . .

EXPOSE 4000
CMD ["npm","run","dev"]
