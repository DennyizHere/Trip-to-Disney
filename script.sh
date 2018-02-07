#!/bin/bash
while true; do
	node Getdisney.js >> data
	sleep 600
	kill $!
done
