#include <ArduinoWebsockets.h>
#include <WiFi.h>
#include <ArduinoJson.h>
//const char* ssid = "TP-LINK_B5598E"; //Enter SSID
const char* ssid = "S21fe";
//const char* password = "79091473"; //Enter Password
const char* password = "hello123"; 
using namespace websockets;
WebsocketsServer server;
WebsocketsClient client;
void setup() {
  Serial.begin(9600);
    pinMode(4, INPUT); // Setup for leads off detection LO +
    pinMode(2, INPUT); // Setup for leads off detection LO -
    // Connect to WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(2000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());   //You can get IP address assigned to ESP

    server.listen(8080);
    Serial.print("Is server live? ");
    Serial.println(server.available());
}

unsigned long lastMPUReadTime = 0;
String roomT = "";

void loop() {

    unsigned long currentTime = millis();
    Serial.println(analogRead(34));
    int ecgValue = analogRead(34);
    delay(20);
    String JsonData = "{\"timestamp\":" + String(currentTime) + ", \"ecgVal\":" + String(ecgValue) + "}";
      if (WiFi.status() == WL_CONNECTED)
  {
    server.poll();
    if (!client.available()) {
        client = server.accept();
        if (client.available()) {
            Serial.println("Client connected");
        }
    }
     if (client.available()) 
        {
            client.send(JsonData);
        }
  }
}
    




 

