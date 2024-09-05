FROM  node:alpine
WORKDIR /app
COPY  . .
RUN npm install
EXPOSE 8800
CMD ["npm","run","start"]