# Movie API

## _Documentación_

Este repositorio contiene el caso práctico del informe: **"Uso de Postman para Pruebas de APIs en Verificación y Validación de Software"**. Este informe destaca cómo Postman, en conjunto con herramientas como Jenkins y Newman, puede ser utilizado para automatizar y validar APIs, asegurando la calidad del software.

El caso práctico ilustra una API para la gestión de películas, diseñada para demostrar las funcionalidades de pruebas automatizadas y su integración en procesos de CI/CD.

---

## **Resumen del Informe**

El informe detalla cómo:
- Realizar solicitudes HTTP y pruebas con Postman.
- Usar colecciones y variables para parametrizar pruebas.
- Automatizar la validación de APIs con Newman.
- Integrar estas pruebas en pipelines de Jenkins.

Puedes consultar el informe completo para más información y contexto.

---

## **Cómo iniciar el proyecto**

### Clonación del repositorio
Para descargar este proyecto:
```bash
git clone https://github.com/MaxCar31/PostmanAPI_Practice.git
```

### Instalación de dependencias
Dentro de la carpeta del proyecto:
```bash
npm install
```

### Ejecución del servidor
Para iniciar el servidor:
```bash
npm start
```
Deberías ver en la consola: `Server listening on port 3002`.

---

## **Endpoints**

Base URL:
```plaintext
http://localhost:3002/api
```

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET    | `/movies` | Obtener todas las películas. |
| GET    | `/movies/:movieId` | Obtener una película por su ID. |
| POST   | `/movies` | Crear una nueva película (requiere autenticación). |
| PUT    | `/movies/:movieId` | Actualizar una película existente (requiere autenticación). |
| DELETE | `/movies/:movieId` | Eliminar una película existente (requiere autenticación). |
| POST   | `/register` | Registrar un nuevo usuario. |

### Filtrado con Query Strings
Ejemplos:
- `GET /movies?title=American`
- `GET /movies?genre=Drama`
- `GET /movies?title=Equalizer&genre=Action`

---

## **Exportación de colecciones y variables desde Postman**

1. **Exportar Colección**:
   - Ve a "Collections" en Postman.
   - Selecciona `Movie API`.
   - Haz clic en "Export" y guarda el archivo como `Movie-API.postman_collection.json`.

2. **Exportar Variables**:
   - Ve a "Environments" y selecciona las variables globales configuradas.
   - Haz clic en "Export" y guarda el archivo como `workspace.postman_globals.json`.

Ambos archivos se utilizan en Newman para ejecutar las pruebas.

---

## **Docker y Jenkins**

### Configuración del Docker Compose

Archivo `docker-compose.yml`:
```yaml
version: '3.8'

services:
  jenkins:
    image: jenkins/jenkins:lts
    privileged: true
    restart: always
    ports:
      - "8085:8080"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /c/Users/mateo/Documents/Github/PostmanAPI_Practice:/var/jenkins_home/PostmanAPI_Practice
    networks:
      - jenkins_network

  ssh-agent:
    image: jenkins/ssh-agent

volumes:
  jenkins_home:

networks:
  jenkins_network:
```

## **Configuración de Jenkins**

### **1. Configuración inicial**
Accede a Jenkins en `http://localhost:8085` y sigue los pasos de configuración inicial.

### **2. Crear un nuevo Job**
1. Ve a la página principal de Jenkins y selecciona "Nuevo Item".
2. Crea un job tipo **Freestyle**.
3. Configura la integración con el repositorio Git:
   - URL del repositorio: `https://github.com/MaxCar31/PostmanAPI_Practice.git`
   - Configura las credenciales si es necesario.

### **3. Configurar un paso para ejecutar comandos**
Agrega un paso de shell para ejecutar los comandos necesarios con Newman:
```bash
newman run Movie-API.postman_collection.json -g workspace.postman_globals.json
```

### Ejecución del servidor dentro de Jenkins
1. Ingresa al contenedor de Jenkins:
   ```bash
   docker exec -u root -it docker-jenkins-1 bash
   ```
2. Navega a:
   ```bash
   cd /var/jenkins_home/PostmanAPI_Practice
   ```
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

---

## **Automatización con Newman y Jenkins**

Este proyecto incluye scripts de Postman para validar automáticamente:
- Creación, actualización y eliminación de películas.
- Validación de respuestas (código de estado, contenido y estructura).
- Generación de reportes mediante Newman.

Para más detalles sobre el proceso de integración y pruebas, consulta el [informe](#).

---

## **Licencia**
[MIT License](LICENSE)

---







