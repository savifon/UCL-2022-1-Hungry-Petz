import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

enable_pin = 13
in_1_pin = 5
in_2_pin = 6

GPIO.setup(enable_pin, GPIO.OUT)
GPIO.setup(in_1_pin, GPIO.OUT)
GPIO.setup(in_2_pin, GPIO.OUT)
motor_pwm = GPIO.PWM(enable_pin, 500)
motor_pwm.start(0)

def forward(duty):
    GPIO.output(in_1_pin, True) 
    GPIO.output(in_2_pin, False) 
    motor_pwm.ChangeDutyCycle(duty)

def reverse(duty):
    GPIO.output(in_1_pin, False) 
    GPIO.output(in_2_pin, True) 
    motor_pwm.ChangeDutyCycle(duty)

def stop():
    GPIO.output(in_1_pin, False) 
    GPIO.output(in_2_pin, False) 
    motor_pwm.ChangeDutyCycle(0)
