# FROM node:latest as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY ./ .
# RUN npm run build

# FROM nginx as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf

# Sử dụng Node.js làm base image
FROM node:lts-alpine as build-stage

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép source code vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Giai đoạn production
FROM nginx:stable-alpine as production-stage

# Sao chép các file đã build từ giai đoạn trước
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]

# docker run -d -p 8080:80 --name bekoo-web-container bekoo-web
# docker build -t bekoo .
# docker tag my-vue-app username/my-vue-app:latest
# docker push username/my-vue-app:latest