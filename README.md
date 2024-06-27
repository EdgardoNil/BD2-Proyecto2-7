# DOCUMENTACION

## Proyecto 2

## Laboratorio Sistemas de Bases de datos 2

## Integrantes GRUPO 7

| Nombre                       | Carnet    |
| ---------------------------- | --------- |
| César André Ramírez Dávila   | 202010816 |
| Angel Francisco Sique Santos | 202012039 |
| Edgardo Andrés Nil Guzmán    | 201801119 |
| Lesther Kevin Federico López Miculax | 202110897 |
| Hugo Sebastian Martínez Hernández | 202002793 |
| José Manuel Ibarra Pirir | 202001800 |
___


### Introducción
Este documento describe la estructura de la base de datos utilizada para el proyecto de una librería en línea llamada BookStore. La base de datos se implementó utilizando MongoDB, una base de datos NoSQL orientada a documentos.
___

## Framework´s utlizados

### MongoDB

![](imagenes/mongodb.png)

**MongoDB** es una base de datos NoSQL que utiliza documentos JSON para almacenar datos. Es ampliamente utilizada por su capacidad de escalamiento horizontal y flexibilidad en el manejo de datos no estructurados o semi-estructurados.

- **Características principales**:
  - Esquema flexible basado en documentos JSON.
  - Alta disponibilidad y escalabilidad horizontal.
  - Soporte para consultas ricas y operaciones avanzadas.
  - Ideal para aplicaciones web modernas y proyectos que requieren manejo de datos no estructurados.

### React (Frontend)

![](imagenes/react.jpg)

**React** es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas y dinámicas.

- **Características principales**:
  - Componentización: Permite dividir la interfaz de usuario en componentes reutilizables.
  - Virtual DOM: Optimiza el rendimiento actualizando solo las partes necesarias de la página.
  - JSX: Extensión de JavaScript que permite escribir HTML dentro de JavaScript.
  - Estado y ciclo de vida: Gestiona eficientemente el estado y el ciclo de vida de los componentes.

### Python (Backend)

![](imagenes/python.jpg)

**Python** es un lenguaje de programación interpretado conocido por su simplicidad y legibilidad, utilizado frecuentemente en desarrollo web para construir el lado del servidor (backend).

- **Características principales**:
  - Fácil sintaxis y legibilidad.
  - Amplia variedad de bibliotecas y frameworks para desarrollo web, como Flask o Django.
  - Soporte para programación orientada a objetos y funcional.
  - Ampliamente adoptado en ciencia de datos, automatización y desarrollo web.

### Postman

![](imagenes/postman.png)

**Razones principales:**

1. **Pruebas de API:** Postman facilita la prueba y validación de las APIs mediante solicitudes HTTP.

2. **Interfaz Amigable:** Ofrece una interfaz gráfica intuitiva para enviar solicitudes y revisar respuestas.

3. **Organización:** Permite organizar solicitudes en colecciones y configurar entornos para gestionar variables.

Estas características fueron clave para la eficiencia en el desarrollo y prueba de la API del proyecto.

### Integración en el Proyecto

- **MongoDB**: Utilizado para almacenar y gestionar datos estructurados y semi-estructurados del proyecto, como usuarios, libros, autores y órdenes.
  
- **React**: Utilizado en el frontend para crear una interfaz de usuario interactiva y dinámica, permitiendo a los usuarios interactuar con los datos almacenados en MongoDB de manera eficiente y atractiva.
  
- **Python**: Utilizado en el backend para manejar la lógica de negocio, procesar solicitudes del cliente, y comunicarse con la base de datos MongoDB para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y manejar la autenticación de usuarios.
___

### Colecciones
La base de datos BookStore contiene las siguientes colecciones:
1. **Users (usuarios)**
2. **Books (libros)**
3. **Authors (autores)**
4. **Orders (órdenes)**

### 1. Users (Usuarios)
Esta colección almacena la información de los usuarios registrados en la librería.

**Campos:**
- **_id**: Identificador único del usuario (tipo ObjectId).
- **nombre**: Nombre del usuario (tipo String).
- **apellido**: Apellido del usuario (tipo String).
- **email**: Correo electrónico del usuario (tipo String).
- **telefono**: Número de teléfono del usuario (tipo String).
- **direccion**: Dirección del usuario (tipo String).
- **fecha_registro**: Fecha de registro del usuario (tipo Date).
- **role**: Rol del usuario, por ejemplo, cliente o administrador (tipo String).
- **password**: Contraseña del usuario (tipo String).
- **compras**: Lista de compras realizadas por el usuario (tipo Array).
- **foto_url**: URL de la foto del usuario (tipo String).


### 2. Books (Libros)
Esta colección almacena la información de los libros disponibles en la librería.

**Campos:**
- **_id**: Identificador único del libro (tipo ObjectId).
- **titulo**: Título del libro (tipo String).
- **autor**: Nombre del autor del libro (tipo String).
- **descripcion**: Descripción del libro (tipo String).
- **genero**: Género literario del libro (tipo String).
- **fecha_publicacion**: Fecha de publicación del libro (tipo Date).
- **disponibilidad**: Disponibilidad del libro (tipo Boolean).
- **cantidad_stock**: Cantidad de libros en stock (tipo Number).
- **puntuacion_promedio**: Puntuación promedio del libro (tipo Number).
- **precio**: Precio del libro (tipo Number).
- **imagen_url**: URL de la imagen del libro (tipo String).

### 3. Authors (Autores)
Esta colección almacena la información de los autores de los libros.

**Campos:**
- **_id**: Identificador único del autor (tipo ObjectId).
- **nombre**: Nombre del autor (tipo String).
- **biografia**: Biografía del autor (tipo String).
- **libros**: Lista de libros escritos por el autor (tipo Array).
- **foto_url**: URL de la foto del autor (tipo String).


### 4. Orders (Órdenes)
Esta colección almacena la información de las órdenes de compra realizadas por los usuarios.

**Campos:**
- **_id**: Identificador único de la orden (tipo ObjectId).
- **user_id**: Identificador único del usuario que realizó la compra (tipo ObjectId).
- **items**: Lista de items comprados (tipo Array). Cada item incluye:
  - **libro_id**: Identificador único del libro comprado (tipo ObjectId).
  - **cantidad**: Cantidad de unidades compradas (tipo Number).
  - **precio**: Precio por unidad del libro (tipo Number).
  - **estado**: Estado de la orden (tipo String).
  - **total**: Total pagado por el item (tipo Number).

___
# Conexión a Amazon S3 y MongoDB

## Conexión a Amazon S3

Para almacenar y recuperar imágenes desde Amazon S3, sigue estos pasos:

1. **Instala el SDK de AWS para Python (Boto3):**
   ```sh
   pip install boto3
   ```

2. **Configura las credenciales de AWS:**
   Asegúrate de tener configuradas tus credenciales de AWS. Puedes hacerlo utilizando el archivo `~/.aws/credentials`:
   ```plaintext
   [default]
   aws_access_key_id = YOUR_ACCESS_KEY
   aws_secret_access_key = YOUR_SECRET_KEY
   ```


## Conexión a MongoDB

Para conectarse a MongoDB, sigue estos pasos:

1. **Instala el cliente de MongoDB para Python (Pymongo):**
   ```sh
   pip install pymongo
   ```

2. **Ejemplo de código para conectarse a una base de datos MongoDB:**
   ```python
   from pymongo import MongoClient

   # URI de conexión a MongoDB
   uri = "mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority"

   # Crear una instancia del cliente
   client = MongoClient(uri)

   # Seleccionar la base de datos
   db = client['BookStore']
   ```

___

# Rutas y Consultas de la API

## Usuarios

### Crear un nuevo usuario
**Ruta:** `/users`  
**Método:** `POST`  
**Descripción:** Recibe los datos de un usuario en el cuerpo de la solicitud y los guarda en la base de datos.

### Inicio de sesión (login)
**Ruta:** `/login`  
**Método:** `POST`  
**Descripción:** Recibe el correo y la contraseña en el cuerpo de la solicitud, verifica las credenciales y devuelve un token de autenticación si son válidas.

### Obtener información de un usuario por ID
**Ruta:** `/users/{user_id}`  
**Método:** `GET`  
**Descripción:** Recibe el ID del usuario en la URL y devuelve la información completa de ese usuario.

### Actualizar el perfil de un usuario
**Ruta:** `/users/{user_id}`  
**Método:** `PUT`  
**Descripción:** Recibe el ID del usuario en la URL y los datos actualizados en el cuerpo de la solicitud, luego actualiza la información del usuario en la base de datos.

## Autores

### Crear un nuevo autor
**Ruta:** `/authors`  
**Método:** `POST`  
**Descripción:** Recibe los datos de un autor en el cuerpo de la solicitud y los guarda en la base de datos.

### Obtener todos los autores
**Ruta:** `/authors`  
**Método:** `GET`  
**Descripción:** Devuelve una lista con todos los autores almacenados en la base de datos.

### Obtener un autor por ID
**Ruta:** `/authors/{author_id}`  
**Método:** `GET`  
**Descripción:** Recibe el ID del autor en la URL y devuelve la información completa de ese autor.

### Eliminar un autor
**Ruta:** `/authors/{author_id}`  
**Método:** `DELETE`  
**Descripción:** Recibe el ID del autor en la URL y elimina ese autor de la base de datos.

## Libros

### Agregar un nuevo libro
**Ruta:** `/books`  
**Método:** `POST`  
**Descripción:** Recibe los datos de un libro en el cuerpo de la solicitud y los guarda en la base de datos.

### Editar un libro
**Ruta:** `/books/{libro_id}`  
**Método:** `PUT`  
**Descripción:** Recibe el ID del libro en la URL y los datos actualizados en el cuerpo de la solicitud, luego actualiza la información del libro en la base de datos.

### Eliminar un libro
**Ruta:** `/books/{libro_id}`  
**Método:** `DELETE`  
**Descripción:** Elimina un libro de la base de datos según su ID.

### Obtener todos los libros
**Ruta:** `/books`  
**Método:** `GET`  
**Descripción:** Devuelve una lista con todos los libros almacenados en la base de datos.

### Obtener un libro por ID
**Ruta:** `/books/{book_id}`  
**Método:** `GET`  
**Descripción:** Devuelve la información completa de un libro específico según su ID.

### Buscar entidades (libros o autores)
**Ruta:** `/search`  
**Método:** `POST`  
**Descripción:** Busca entidades (libros o autores) en la base de datos según los parámetros proporcionados.

### Filtrar libros por género, precio o puntuación
**Ruta:** `/filtro`  
**Método:** `POST`  
**Descripción:** Filtra libros en la base de datos según los parámetros proporcionados (género, precio, puntuación).

### Agregar una reseña a un libro
**Ruta:** `/books/{book_id}/review`  
**Método:** `POST`  
**Descripción:** Agrega una nueva reseña a un libro específico. Requiere el ID de usuario, texto de la reseña y puntuación.

## Carrito

### Agregar libro al carrito
**Ruta:** `/cart`  
**Método:** `POST`  
**Descripción:** Agrega un libro al carrito de compras de un usuario. Requiere el ID de usuario, ID del libro, cantidad y precio.

### Actualizar cantidad de un libro en el carrito
**Ruta:** `/cart`  
**Método:** `PUT`  
**Descripción:** Actualiza la cantidad de un libro en el carrito de compras de un usuario. Requiere el ID de usuario, ID del libro y nueva cantidad.

### Eliminar libro del carrito
**Ruta:** `/cart`  
**Método:** `DELETE`  
**Descripción:** Elimina un libro del carrito de compras de un usuario. Requiere el ID de usuario y ID del libro.

### Ver resumen del carrito
**Ruta:** `/cart/{user_id}`  
**Método:** `GET`  
**Descripción:** Devuelve el resumen del carrito de compras de un usuario específico según su ID.

### Procesar pago y vaciar carrito
**Ruta:** `/checkout/{user_id}`  
**Método:** `POST`  
**Descripción:** Procesa el pago del carrito de compras de un usuario según su ID y vacía el carrito.

## Pedidos

### Ver historial de pedidos de un usuario
**Ruta:** `/ver_historial_pedidos/{user_id}`  
**Método:** `GET`  
**Descripción:** Devuelve el historial de pedidos de un usuario específico según su ID.

### Actualizar estado de un pedido
**Ruta:** `/actualizar_estado_pedido/{pedido_id}`  
**Método:** `PUT`  
**Descripción:** Actualiza el estado de un pedido específico según su ID. Requiere el nuevo estado en el cuerpo de la solicitud.

### Obtener historial de pedidos de clientes
**Ruta:** `/historial_pedidos_clientes`  
**Método:** `GET`  
**Descripción:** Devuelve el historial completo de todos los pedidos realizados por los clientes.

### Obtener top de libros más vendidos
**Ruta:** `/top_libros_vendidos`  
**Método:** `GET`  
**Descripción:** Devuelve el top de libros más vendidos basado en las ventas registradas.
___