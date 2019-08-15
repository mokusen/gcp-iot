# coding: UTF-8
# RaspberryPiでDHT11センサーから温湿度データを取得

import time
import dht11
import RPi.GPIO as GPIO

# 定義
# GPIO 14 as DHT11 data pin
Temp_sensor = 14

"""
温度、湿度データを取得する

Returns:
    [string, string]: 温度、湿度
"""
def get_temp():

    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)

    instance = dht11.DHT11(pin=Temp_sensor)

    while True:
        result = instance.read()
        return result.temperature, result.humidity


if __name__ == '__main__':
    while True:
        temperature, humidity = get_temp()
        if temperature == 0:
            continue
        print(f"{temperature},{humidity}")
        break
