//Se define el actuador, el sistema de riego.
#define sistema_Riego 9
//Se definen las variables que se recibirán de manera remota.
#define lectura_Humedad A0 
#define lectura_Temperatura A1
#define lectura_Presion A2

//Definimos el tipo de verdura que tiene este plantío.
int id_Verdura;

/*Variable que cuenta el tiempo que ha pasado sin ser regada la planta bajo condiciones
 * perfectas de temperatura, presión y humedad.
*/
long tiempo_Actual;
//Variable que identifica si se está plantando un nuevo tipo de verdura.
bool primera_Configuracion;
//Variable que cuenta las veces que se ha pospuesto el riego por las condiciones de clima.
int veces_Espera = 0;
//Valores recibidos como parámetros que son enviados por el agricultor.
int parametro_Humedad;
int parametro_Temperatura;
int parametro_Presion;
//Variable que cuenta el tiempo que puede pasar una verdura sin ser regada.
int tiempo_Minimo;

void setup() {
  //Lecturas de los sensores.
  pinMode(lectura_Humedad, INPUT);
  pinMode(lectura_Temperatura, INPUT);
  pinMode(lectura_Presion, INPUT);
  pinMode(sistema_Riego, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  //lectura de la información mandada por el agricultor.
  primera_Configuracion = Serial.read();
  parametro_Humedad = Serial.read();
  parametro_Temperatura = Serial.read();
  parametro_Presion = Serial.read();

  //Si es la primera vez que se configura este plantío.
  if(primera_Configuracion){
    id_Verdura = Serial.read();
    tiempo_Minimo = calculaTiempoMinimo(id_Verdura);
  }

  //Función que realiza el proceso lógico para activar el sistema de riego según las condiciones climáticas.
  if(lectura_Humedad < parametro_Humedad){
    if(lectura_Presion > parametro_Presion){ //Mayor porque se espera lluvia.
      if(veces_Espera < 3){ //Si se ha esperado lluvia menos de tres veces espera más.
        veces_Espera++;
        delay(300); //Espera media hora para preguntar de nuevo si ya llovió o no.
      }
      else{
        digitalWrite(sistema_Riego, HIGH);
        delay(1000);
        digitalWrite(sistema_Riego, LOW);
        veces_Espera = 0;
      }
    }
    else{
      if(lectura_Temperatura > parametro_Temperatura){
        delay(300);
      }
      else{
        digitalWrite(sistema_Riego, HIGH);
        delay(1000);
        digitalWrite(sistema_Riego, LOW);
      }
    }
  }
  else{
    tiempo_Actual = millis();
    if(tiempo_Actual = tiempo_Minimo){
      digitalWrite(sistema_Riego, HIGH);
      delay(1000);
      digitalWrite(sistema_Riego, LOW);
    }
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

