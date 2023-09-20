FROM node:18

ENV NODE_ENV production
ENV PORT 8000
ENV HOST 0.0.0.0

ENV API_KEY vnG28TT6PRvJgMIXzHcjYA

ENV PEOPLE_URL https://api.apollo.io/v1/mixed_people/search
ENV TAG_URL https://app.apollo.io/api/v1/tags/search
ENV ORG_URL https://app.apollo.io/api/v1/organizations/search
ENV SNIPPET_URL https://app.apollo.io/api/v1/organizations/load_snippets
ENV METADATA_URL https://app.apollo.io/api/v1/mixed_people/search_metadata_mode

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm ci --omit=dev

COPY . .

EXPOSE 8080

CMD [ "node", "src/index.js" ]