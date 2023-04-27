#!/bin/bash

cd user; go run main.go &
cd ../
cd dashboard; go run main.go &
cd ../
cd products; go run main.go
