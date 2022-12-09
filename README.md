# RC RPi Car

This is a work in process, will fill in more details on assembly at some point.  

Hardware:  

 1x Cheap amazon RC car    
 1x L298N Motor Driver  
 1x LiPo battery (7.4v 2000mah in my case)  
 1x Raspberry Pi v3 (any should work)  
 1x Raspi Camera or USB camera (https://www.amazon.com/gp/product/B073183KYK/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)   
 1x USB Battery Pack 5v/2a  
 1x Firm platform for mounting gear on RC car, adhesive or something similar  
 15x thin jumper cables for raspi  
 Soldering equipment  
 
Software:  

node  
mjpg-streamer  
socket.io  
pigpio  

Startup:  

./mjpeg_streamer_launch.sh  
sudo node --inspect webserver.js  
navigate to http://zoomy:8080 and use WASD to control, 1/2/3 for LOW/MEDIUM/HIGH speed.
