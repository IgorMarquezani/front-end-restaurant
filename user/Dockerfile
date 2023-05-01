FROM golang:1.20-alpine3.17

WORKDIR /usr/src/app

COPY . ./
RUN go mod download && go mod verify
RUN go build main.go

ARG PORT=8080
ARG IP=127.0.0.1

EXPOSE 8080

CMD [ "./main" ]
