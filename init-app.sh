#!/bin/bash

cd user_acess; go run main.go &
cd ../
cd user_home; go run main.go &
cd ../
cd user_products; go run main.go
