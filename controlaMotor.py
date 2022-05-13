import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

enable_pin = 13
in_1_pin = 6
in_2_pin = 5

in_3_pin = 16
in_4_pin = 26

GPIO.setup(enable_pin, GPIO.OUT)
GPIO.setup(in_1_pin, GPIO.OUT)
GPIO.setup(in_2_pin, GPIO.OUT)
GPIO.setup(in_3_pin, GPIO.OUT)
GPIO.setup(in_4_pin, GPIO.OUT)

motor_pwm = GPIO.PWM(enable_pin, 500)
motor_pwm.start(0)

def forward1(duty):
    GPIO.output(in_1_pin, True) 
    GPIO.output(in_2_pin, False) 
    motor_pwm.ChangeDutyCycle(duty)

def reverse1(duty):
    GPIO.output(in_1_pin, False) 
    GPIO.output(in_2_pin, True) 
    motor_pwm.ChangeDutyCycle(duty)

def stop1():
    GPIO.output(in_1_pin, False) 
    GPIO.output(in_2_pin, False) 
    motor_pwm.ChangeDutyCycle(0)

def forward2(duty):
    GPIO.output(in_3_pin, True) 
    GPIO.output(in_4_pin, False) 
    motor_pwm.ChangeDutyCycle(duty)

def reverse2(duty):
    GPIO.output(in_3_pin, False) 
    GPIO.output(in_4_pin, True) 
    motor_pwm.ChangeDutyCycle(duty)

def stop2():
    GPIO.output(in_3_pin, False) 
    GPIO.output(in_4_pin, False) 
    motor_pwm.ChangeDutyCycle(0)
