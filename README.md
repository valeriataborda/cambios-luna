# proyecto-integrador-cesde

### clonar repositorio
```txt
git clone https://github.com/Santiscano/proyecto-integrador-cesde.git

git cd proyecto-integrador-cesde
code .

git checkout -b <nombre-de-la-rama>
```

### crear su propia rama de desarrollo
```
git 
```

### crear archivo .env
```txt
# SERVIDOR LOCAL O REMOTO CON PROTOCOLO DE CONEXION
PROTOCOL = 'http'
URL = '://localhost:'
PORT = 4500

# BASES DE DATOS
# 1- MySQL
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = 123123
DB_PORT = 3307
DB_DB = "SAVJ-construcciones"

DB_USER2 = "santiscano"
DB_PASSWORD2 = "santidev"


# SECURIDAD
# JWT
SECRET_KEY = "visita y crea en: https://joaneeet7.github.io/online-tools/sha256.html"
EXPIRE_TOKEN = "24h" 
API_KEY = 283749860296492735462875694752698
```




#### levantar docker
```shell
# entrar a la carpeta con docker file
cd savj-construcciones-api

# levantar la base de datos, phpmyadmin
docker compose up -d
# levantar api
npm run swagger
npm run dev
```
