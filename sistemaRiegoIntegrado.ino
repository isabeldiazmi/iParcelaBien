#include <SHT1x.h>
//Se define el actuador, el sistema de riego.
#define sistema_Riego 22
#define siempre_Alto 24
//Se definen las variables que se recibirán de manera remota.


//Definimos el tipo de verdura que tiene este plantío.
int id_Verdura;
float lectura_Humedad = 0;
float lectura_Temperatura = 0;
SHT1x sht15(A4, A5);

String dato1, dato2, dato3, dato4;
double d1,d2,d3,d4;
String datoBruto;

/*Variable que cuenta el tiempo que ha pasado sin ser regada la planta bajo condiciones
 * perfectas de temperatura, presión y humedad.
*/
long tiempo_Aux;
long tiempo_Total = millis();
//Variable que identifica si se está plantando un nuevo tipo de verdura.
int primera_Configuracion;
//Valores recibidos como parámetros que son enviados por el agricultor.
int parametro_Humedad;
int parametro_Temperatura;
//Variable que cuenta el tiempo que puede pasar una verdura sin ser regada.
int tiempo_Minimo;
//Este valor cambia en todas las unidades dentro del sistema. Es el identificador.
int id_Parcela = 1;
int id_Parcela_Destino;

void setup() {
  //Lecturas de los sensores.
  pinMode(sistema_Riego, OUTPUT);
  pinMode(siempre_Alto, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  //lectura de la información mandada por el agricultor.
  digitalWrite(siempre_Alto, HIGH);
  readSensor();
  datoBruto = 
  Serial.read();
  int comma = 0;
  int commaAux;
  comma = datoBruto.indexOf(',',comma);
  dato1 = datoBruto.substring(0,comma);
  commaAux = comma+1;
  comma = datoBruto.indexOf(',',comma+1);
  dato2 = datoBruto.substring(commaAux,comma);
  commaAux = comma+1;
  comma = datoBruto.indexOf(',',comma+1);
  dato3 = datoBruto.substring(commaAux,comma);
  commaAux = comma+1;
  dato4 = datoBruto.substring(comma+1);
  
 
  primera_Configuracion = dato1.toInt();
  parametro_Humedad = dato2.toInt();
  parametro_Temperatura = dato3.toInt();
  id_Parcela_Destino = dato4.toInt();

if(id_Parcela_Destino = id_Parcela){
  //Si es la primera vez que se configura este plantío.
  if(primera_Configuracion = 1){
    id_Verdura = 1;
    tiempo_Minimo = calculaTiempoMinimo(id_Verdura);
  }

  //Función que realiza el proceso lógico para activar el sistema de riego según las condiciones climáticas.
  if(lectura_Humedad < parametro_Humedad){
      if(lectura_Temperatura > parametro_Temperatura){
        delay(300);
      }
      else{
        digitalWrite(sistema_Riego, HIGH);
        delay(1000);
        digitalWrite(sistema_Riego, LOW);
        delay(1000);
      }
    }
  else{
    tiempo_Aux = millis() -  tiempo_Total;
    if(tiempo_Aux >= tiempo_Minimo){
      digitalWrite(sistema_Riego, HIGH);
      delay(1000);
      digitalWrite(sistema_Riego, LOW);
      tiempo_Total = millis();
      delay(1000);
    }
  }
}
else{
  printOut();
}
}

int calculaTiempoMinimo(int tipo_Verdura){
int n;

  switch(tipo_Verdura){
    case 1:
      n = 1000; //milis.
    break;
    case 2:
      n = 2000;
    break;
    case 3: 
      n = 3000;
    break;
    default:
      n = 0;
    break;
  }
return n;
}

void readSensor()
{
  lectura_Temperatura = sht15.readTemperatureC();
  lectura_Humedad = sht15.readHumidity();  
}

void printOut(){
  Serial.println(id_Parcela_Destino);
  Serial.println(primera_Configuracion);
  Serial.println(parametro_Temperatura);
  Serial.println(parametro_Humedad); 
}
