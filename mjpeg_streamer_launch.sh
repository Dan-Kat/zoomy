#!/bin/bash
killall mjpg_streamer
cd /home/picard/mjpg-streamer/mjpg-streamer-experimental && mjpg_streamer -o "output_http.so -w ./www" -i "input_uvc.so -d /dev/video0 -r 1280x720 -n"