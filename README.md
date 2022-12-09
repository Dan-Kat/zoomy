# RC RPi Car

This is a work in process, will fill in more details on assembly at some point.  

Zoomy is a remote control and video stream host for Raspberry Pi, allowing you to control an RC car over WiFi w/ a video feed. This setup can integrate to just about any smaller RC car, and should run fine on any Raspberry Pi that has onboard wireless, otherwise you'll need to supply a WiFi dongle. 

Hardware:  

 1x Cheap amazon RC car (https://www.amazon.com/gp/product/B07X8773JJ)     
 1x L298N Motor Driver  
 1x LiPo battery (7.4v 2000mah in my case)  
 1x Raspberry Pi v3 (any WiFi enabled Pi should work)  
 1x Raspi Camera or USB camera (https://www.amazon.com/gp/product/B073183KYK)   
 1x USB Battery Pack 5v/2a  
 1x Firm platform for mounting gear on RC car, adhesive or something similar  
 15x thin jumper cables for raspi  
 Soldering equipment  
 
Software:  

node (https://github.com/nodejs/node)  
mjpg-streamer (https://github.com/jacksonliam/mjpg-streamer)  
socket.io (https://github.com/socketio/socket.io)  
pigpio (https://github.com/fivdi/pigpio)  

Startup:  

./mjpeg_streamer_launch.sh  
sudo node --inspect webserver.js  
navigate to http://zoomy:8080 and use WASD to control, 1/2/3 for LOW/MEDIUM/HIGH speed.
