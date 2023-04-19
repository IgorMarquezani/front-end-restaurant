FROM golang:1.20-alpine3.17

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build main.go

EXPOSE 8080

CMD [ "./main" ]
