#!/bin/bash
while true; do
	node Getdisney.js >> data
	sleep 6000
	kill $!
done
