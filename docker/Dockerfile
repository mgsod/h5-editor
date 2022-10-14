FROM alpine:3.14
RUN apk add --no-cache --update nodejs=14.20.1-r0 npm=7.17.0-r0 nginx=1.20.2-r1 curl=7.79.1-r3
WORKDIR /data
COPY . /data
RUN npm config set registry "https://registry.npm.taobao.org/"
RUN chmod 777 /data/docker-entrypoint.sh
EXPOSE 5555
EXPOSE 80
ENTRYPOINT ["./docker-entrypoint.sh"]

