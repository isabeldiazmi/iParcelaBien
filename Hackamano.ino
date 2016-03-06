#include <SHT1x.h>

float tempC = 0;
float humidity = 0;

//Instance of the SHT1X sensor
SHT1x sht15(A4, A5);//Data, SCK

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  readSensor();
  printOut();
  delay(250);
}

void readSensor()
{
  tempC = sht15.readTemperatureC();
  humidity = sht15.readHumidity();  
}

void printOut()
{
  Serial.print(" Temp = ");
  Serial.print(tempC);
  Serial.println(" ºC");
  Serial.print(" Humidity = ");
  Serial.print(humidity); 
  Serial.println("%");
}
