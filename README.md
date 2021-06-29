# Bike data app

Projecte per poder tenir un històric d'activitats, aprofitant l'api de strava i també un històric de dades de tots els cops que has passat per un tram (de strava).
El backend està fet amb [Guillotina](https://github.com/plone/guillotina) i l'aplicació fronal amb react ([NextJs](https://nextjs.org/))

Es necessari tenir creada una aplicació de strava per poder atacar a la seva api (https://developers.strava.com/)

### Limitació:
Si es crea un nou tram a strava, s'haurà de tornar a sincronitzar totes les activitats, per ara no hi ha aquesta opció feta.

## Tecnologia necessaria:

- NodeJs
- Docker
- Python
- Postresql

## Funcionament 

Al arrancar la web, haurem d'anar a la pàgina de sincronització per poder carregar les activitats des de strava. 
Per ara s'hauràn de sincronitzar les activitats una a una ja que Strava limita a 1000 peticions per dia i 100 cada 15 min.

Un cop tenim activitats carregades ja podrem veure els histròrics d'aquestes ( pàgina activities) i tot els trams que hi ha en una activitat ( detall pàgina activities )
També podrem consultar tots els trams (pàgina segments) que has fet almenys una vegada, i veure un històric de tots els cops que hi has passat (detall pàgina segments ).


### Back

El servidor nomès ens servirà per emmagatzemar tota l'informació que extraiem de strava, al ser una aplicació personal amb l'usuari root de guillotina serà suficient. 


#### Arrancar back

Primer necesitem tenir una base de dades postreSQL, ho farem a través de docker. 

```
docker run -d --rm \
  -e POSTGRES_DB=guillotina_bike_app \
  -e POSTGRES_USER=guillotina \
  -e POSTGRES_PASSWORD=guillotina \
  -d -p 127.0.0.1:5432:5432 \
  --name postgres_db_bike_app -v pgdata:/var/lib/postgresql/data postgres:9.6
```

Arrancar guillotina per primera vegada, utilitzarem un entorn virtual ( pyenv i virtualenv ), crearem el container base.

```
cd backend
pyenv virtualenv 3.8.5 nomVirtualenv
pyenv activate nomVirtualenv 
pyenv local nomVirtualenv
pip install -r requirements.txt
pip install -r requirements-test.txt
pip install -e guillotina_bike_data_app
guillotina serve -c guillotina_bike_data_app/config.yaml
curl -X POST --user root:root http://127.0.0.1:8080/db -d '{"@type": "Container", "id": "container", "title": "Contenidor projectes"}'
```

Un cop arrancada per primera vegada ja nomès s'haurà d'activar l'entorn virtual creat i arrancar el servidor.
```

cd backend
pyenv activate nomVirtualenv
guillotina serve -c guillotina_bike_data_app/config.yaml
```


### Front

El frontal és un [ReactJs](https://reactjs.org/), utilitzant ([NextJs](https://nextjs.org/)) i la llibreria [Guillotina react](https://github.com/guillotinaweb/guillotina_react)

Primer és necessari crear un arxiu a frontend/bike-data-app on definir les variables d'entorn (.env o .env.local):

```
STRAVA_ID = "" 
STRAVA_SECRET = ""
NEXTAUTH_URL = "http://localhost:3000"
NEXT_PUBLIC_GUILLOTINA_URL = "http://localhost:8080/"
NEXT_PUBLIC_GUILLOTINA_DB_CONTAINER = "db/container/"
NEXT_PUBLIC_STRAVA_URL="https://www.strava.com/api/v3/"
NEXT_PUBLIC_GUILLOTINA_PAGE_SIZE="100" 
```

Per arrancar el frontal per primera vegada farem:

```
cd frontend/bike-data-app
npm i
npm run dev
```

Tot seguit anirem a [http://localhost:3000](http://localhost:3000)


### Tests Back

Per corre els tests de back aixacarem l'entorn virtual ( el crearem sino està creat ), correrem els tests, es necessari tenir les dependencies del requirements i requirements-test instal·lades

```
source envname/bin/activate
cd back
pytest guillotina_iskra/guillotina_iskra/
```


## TODO

- Front tests, testing library i Cypress
- Crear github actions per corre els tests i analitzadors de codi
- Poder actualitzar l'informació d'una activitat ja creada a guillotina