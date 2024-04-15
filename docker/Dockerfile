FROM alpine:3.14
RUN apk add --no-cache --update nodejs npm nginx curl
WORKDIR /data
COPY . /data
RUN npm config set registry https://registry.npmmirror.com
RUN chmod 777 /data/docker-entrypoint.sh
EXPOSE 5555
EXPOSE 80
ENTRYPOINT ["./docker-entrypoint.sh"]

