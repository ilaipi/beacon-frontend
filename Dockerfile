# ---- Base Node ----
FROM node:8-buster AS base
# Create app directory
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
COPY ./package*.json ./
# install app dependencies including 'devDependencies'
RUN npm install --registry=https://registry.npm.taobao.org

# ---- Copy Files/Build ----
FROM dependencies AS build
WORKDIR /app
COPY ./ /app/
RUN npm run build
RUN rm -fr src

# --- Release with Alpine ----
FROM nginx:1.17.6-alpine AS release
# Create app directory
COPY --from=build /app/dist /usr/share/nginx/html
