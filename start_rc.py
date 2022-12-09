import RPi.GPIO as GPIO
import time
import keyboard

global releaseListening

keepListening = True

in1 = 24
in2 = 25
enA = 23

in3 = 6
in4 = 13
enB = 5

GPIO.setmode(GPIO.BCM)
GPIO.setup(in1,GPIO.OUT)
GPIO.setup(in2,GPIO.OUT)
GPIO.setup(in3,GPIO.OUT)
GPIO.setup(in4,GPIO.OUT)
GPIO.setup(enA,GPIO.OUT)
GPIO.setup(enB,GPIO.OUT)
GPIO.output(in1,GPIO.LOW)
GPIO.output(in2,GPIO.LOW)
GPIO.output(in3,GPIO.LOW)
GPIO.output(in4,GPIO.LOW)
p=GPIO.PWM(enA,1000)
q=GPIO.PWM(enB,1000)
p.start(75)
q.start(30)
print("\n")
print("The default speed of motor is LOW.....")
print(" SPACE-Stop; W-Forward; S-Backward; A-Left; D-Right; 1-Low; 2-Medium; 3-High; ESC-Exit; ")
print("\n")

def key_press(key):

    if key.name == "esc":
        print(key.name + " was pressed")
        keepListening = False
        return False

    elif key.name == "space":
        print("stop")
        GPIO.output(in1,GPIO.LOW)
        GPIO.output(in2,GPIO.LOW)
        GPIO.output(in3,GPIO.LOW)
        GPIO.output(in4,GPIO.LOW)
        x='z'

    elif key.name == "w":
        print("w - forward")
        GPIO.output(in3,GPIO.LOW)
        GPIO.output(in4,GPIO.HIGH)
        x='z'

    elif key.name == "s":
        print("s - backward")
        GPIO.output(in3,GPIO.HIGH)
        GPIO.output(in4,GPIO.LOW)
        x='z'

    elif key.name == "a":
        print("a - left")
        GPIO.output(in1,GPIO.HIGH)
        GPIO.output(in2,GPIO.LOW)

    elif key.name == "d":
        print("d - right")
        GPIO.output(in1,GPIO.LOW)
        GPIO.output(in2,GPIO.HIGH)
        x='z'

    elif key.name == "1":
        print("low")
        q.ChangeDutyCycle(30)
        x='z'

    elif key.name == "2":
        print("medium")
        q.ChangeDutyCycle(40)
        x='z'

    elif key.name == "3":
        print("high")
        q.ChangeDutyCycle(50)
        x='z'

    else:
        print(key.name + " was pressed; This is not assigned to an input.")

def key_release(key):

    if key.name == "w":
        print("forward released")
        GPIO.output(in3,GPIO.LOW)
        GPIO.output(in4,GPIO.LOW)
        x='z'

    elif key.name == "s":
        print("forward released")
        GPIO.output(in3,GPIO.LOW)
        GPIO.output(in4,GPIO.LOW)
        x='z'

    elif key.name == "a":
        print("left released")
        GPIO.output(in1,GPIO.LOW)
        GPIO.output(in2,GPIO.LOW)
        x='z'

    elif key.name == "d":
        print("right released")
        GPIO.output(in1,GPIO.LOW)
        GPIO.output(in2,GPIO.LOW)
        x='z'

keyboard.on_press(key_press, suppress=False)
keyboard.on_release(key_release, suppress=False)

while keepListening :
  time.sleep(1)
