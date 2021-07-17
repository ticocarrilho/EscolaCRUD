
FROM node:14 as client
WORKDIR /client
COPY /client .
RUN npm i
RUN npm run build --prod

FROM node:14 as server
WORKDIR /server
COPY /server .
COPY --from=client /client/dist/client ./client
RUN npm i
EXPOSE 3001
CMD ["npm", "start"]