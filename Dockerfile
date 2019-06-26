FROM nodejs

RUN mkdir -p /home/Project/app_persona
WORKDIR /home/Project/app_persona

COPY package.json /home/Project/app_persona
RUN npm install

COPY ./server /home/Project/app_persona

EXPOSE 3000

RUN mkdir -p /home/Project/app_persona/file
COPY ./file /home/Project/app_persona/file

CMD ["node", "server.js"]