#!/bin/bash

export IP=127.0.0.1
export PORT=8080

cd user; go run main.go &
cd ../
cd dashboard; go run main.go &
cd ../
cd products; go run main.go &
cd ../
cd report; go run main.go
