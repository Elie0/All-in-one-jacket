#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>
#include "MAX30100_PulseOximeter.h"
#include <WiFiClientSecureBearSSL.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#define REPORTING_PERIOD_MS     1000
#define D4 2
#define ONE_WIRE_BUS D4

OneWire oneWire(ONE_WIRE_BUS);
Adafruit_MPU6050 mpu;
DallasTemperature sensors(&oneWire);

//const char* ssid = "TP-LINK_B5598E"; //Enter SSID
const char* ssid = "S21fe";
//const char* password = "79091473"; //Enter Password
const char* password = "hello123"; 

PulseOximeter pox;
MAX30100 maxim;
using namespace websockets;

WebsocketsServer server;
WebsocketsClient client;
uint32_t tsLastReport = 0;
const char *serverUrl = "https://jackback.onrender.com/api/FallDetected";
const char *updateUrl = "https://jackback.onrender.com/api/update";
unsigned long lastTemperatureUpdateTime = 0;
const unsigned long temperatureUpdateInterval = 60000;

// Callback routine is executed when a pulse is detected
void onBeatDetected() {
    Serial.println("♥ Beat!");
}

void setup() {
    Serial.begin(115200);
    
  pinMode(15, OUTPUT);
    if (!mpu.begin())
  {
    Serial.println("Failed to find MPU6050 chip");
    while (1)
    {
      delay(10);
    }
  }
    Serial.println("Succses");
  
   mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  Serial.print("Accelerometer range set to: ");
  switch (mpu.getAccelerometerRange()) {
  case MPU6050_RANGE_2_G:
    Serial.println("+-2G");
    break;
  case MPU6050_RANGE_4_G:
    Serial.println("+-4G");
    break;
  case MPU6050_RANGE_8_G:
    Serial.println("+-8G");
    break;
  case MPU6050_RANGE_16_G:
    Serial.println("+-16G");
    break;
  }
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  Serial.print("Gyro range set to: ");
  switch (mpu.getGyroRange()) {
  case MPU6050_RANGE_250_DEG:
    Serial.println("+- 250 deg/s");
    break;
  case MPU6050_RANGE_500_DEG:
    Serial.println("+- 500 deg/s");
    break;
  case MPU6050_RANGE_1000_DEG:
    Serial.println("+- 1000 deg/s");
    break;
  case MPU6050_RANGE_2000_DEG:
    Serial.println("+- 2000 deg/s");
    break;
  }

  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);

  Serial.println("");
  delay(100);

    // Connect to WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(2000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    Serial.print("Initializing pulse oximeter..");

    // Initialize sensor
    if (!pox.begin()) {
        Serial.println("FAILED");
        for (;;);
    } else {
        Serial.println("SUCCESS");
    }

    // Configure sensor to use 7.6mA for LED drive
    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);

    // Register a callback routine
    pox.setOnBeatDetectedCallback(onBeatDetected);

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());   //You can get IP address assigned to ESP

    server.listen(80);
    Serial.print("Is server live? ");
    Serial.println(server.available());
}

unsigned long lastMPUReadTime = 0;
String roomT = "";

void loop() {


      if (WiFi.status() == WL_CONNECTED)
  {
    std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
    client->setInsecure(); // Ignore SSL certificate validation
    // Read and process data from the MPU sensor here
    if (millis() - lastMPUReadTime >= 500) {
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);
  //    Serial.print("Acceleration X: ");
  // Serial.print(a.acceleration.x);
  // Serial.print(", Y: ");
  // Serial.print(a.acceleration.y);
  // Serial.print(", Z: ");
  // Serial.print(a.acceleration.z);
  // Serial.println(" m/s^2");

    // ... MPU data processing code
    roomT = "temperature2=" + String(temp.temperature);
    float accelMagnitude = (sqrt(a.acceleration.x * a.acceleration.x + a.acceleration.y * a.acceleration.y + a.acceleration.z * a.acceleration.z)) - 10;

    if (accelMagnitude > 6)
    {
      // Potential fall detected
      digitalWrite(15, HIGH);
  Serial.println("High") ;
      Serial.println("Fall detected");
      FallDetected();
  delay(1000);       
  digitalWrite(15, LOW);
    }

    }

    unsigned long currentMillis = millis();
    if (currentMillis - lastTemperatureUpdateTime >= temperatureUpdateInterval)
    {
      // It's time to update temperature
      sensors.requestTemperatures();
      float temperature = sensors.getTempCByIndex(0);
      sendTemperatureToServer(temperature);
      lastTemperatureUpdateTime = currentMillis; // Reset the timer
    }

    Serial.println("");
  }


    server.poll();
    if (!client.available()) {
        client = server.accept();
        if (client.available()) {
            Serial.println("Client connected");
        }
    }

    pox.update();

    // Grab the updated heart rate and SpO2 levels
    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        Serial.print("Heart rate:");
        Serial.print(pox.getHeartRate());
        Serial.print("bpm / SpO2:");
        Serial.print(pox.getSpO2());
        Serial.println("%");

        // Prepare the JSON data to send
        String jsonData =  String(pox.getHeartRate()) + "," + String(pox.getSpO2());
        if (client.available()) {
            client.send(jsonData);
              maxim.resetFifo();
        }

        tsLastReport = millis();
    }

}



void FallDetected()
{
   HTTPClient https;
   std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
   client->setInsecure(); 
    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, serverUrl)) {
      Serial.print("[HTTPS] POST...\n");
      https.addHeader("Content-Type", "application/json");

      // Create a JSON document and populate it with your data
      DynamicJsonDocument jsonDoc(256);
      jsonDoc["fallstatus"] = 1;
      
      // Serialize the JSON document to a string
      String jsonPayload;
      serializeJson(jsonDoc, jsonPayload);

      int httpCode = https.POST(jsonPayload);

      if (httpCode > 0) {
        Serial.printf("[HTTPS] POST... code: %d\n", httpCode);
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = https.getString();
          Serial.println(payload);
        }
      } else {
        Serial.printf("[HTTPS] POST... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
}

void sendTemperatureToServer(float temperature) 
{
  String data = "temperature=" + String(temperature) + "&" +roomT;
 std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
    client->setInsecure(); 
    HTTPClient https;
    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, "https://JackBack.onrender.com/api/update")) {  
      Serial.print("[HTTPS] POST...\n");
      https.addHeader("Content-Type", "application/x-www-form-urlencoded");
      int httpCode = https.POST(data);
      if (httpCode > 0) {
  Serial.printf("[HTTPS] POST... code: %d\n", httpCode);
  if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) 
  {
    String payload = https.getString();
    Serial.println(payload);
  }
} else {
  Serial.printf("[HTTPS] POST... failed, error: %s\n", https.errorToString(httpCode).c_str());
}

https.end();

    }
 
}