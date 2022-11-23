FROM node:14-alpine As builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN yarn install
#RUN yarn install --frozen-lockfile

RUN npx browserslist@latest --update-db

COPY . .
ARG DOCKER_ENV
ENV NODE_ENV=${DOCKER_ENV}
RUN if [ "$DOCKER_ENV" = "development" ] ; then \ 
    yarn build:dev; \
    echo   your NODE_ENV for development is $NODE_ENV;  \
    else  \
    echo your NODE_ENV for production is $NODE_ENV; \
    yarn build:prod; \  
    fi
FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
