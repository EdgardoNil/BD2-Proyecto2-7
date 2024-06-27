from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
import boto3
import base64
from bson import ObjectId


app = Flask(__name__)
CORS(app)

load_dotenv()

#-----------------------------------------------------------------------------
# Configuración de la conexión a la base de datos MongoDB
mongo_uri = os.getenv('MONGO_URI')
mongo_dbname = os.getenv('MONGO_DBNAME')

client = MongoClient(mongo_uri)
db = client[mongo_dbname]

# Colección 'users' en MongoDB
users_collection = db.users

# Colección 'authors' en MongoDB
authors_collection = db.authors

# Colección 'books' en MongoDB
books_collection = db.books
#-----------------------------------------------------------------------------

# Configuración de AWS S3
AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
AWS_REGION = os.environ["AWS_REGION"]
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

# Crear un cliente de S3
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)
#-----------------------------------------------------------------------------

# Función para crear un nuevo usuario en MongoDB
def crear_usuario(data):
    # Verificar si el correo electrónico ya existe
    if users_collection.find_one({"email": data.get("email")}):
        return {"error": "El correo electrónico ya está registrado"}
    
    new_user = {
        "nombre": data.get("nombre", ""),
        "apellido": data.get("apellido", ""),
        "email": data.get("email", ""),
        "telefono": data.get("telefono", ""),
        "direccion": data.get("direccion", ""),
        "fecha_registro": data.get("fecha_registro", ""),
        "role": data.get("role", "cliente"), 
        "password": data.get("password", ""),
        "compras": data.get("compras", [])
    }
    try:
        # Insertar el nuevo usuario en la colección 'users'
        result = users_collection.insert_one(new_user)
        inserted_id = str(result.inserted_id)
        return {"message": "Usuario creado exitosamente"}
    except Exception as e:
        return {"error": str(e)}

# Función para autenticar y obtener tipo de usuario
def login(email, password):
    user = users_collection.find_one({"email": email, "password": password})
    if user:
        if user.get("role") == "admin":
             return {"tipo": "admin", "id": str(user["_id"])}
        elif user.get("role") == "cliente":
            return {"tipo": "cliente", "id": str(user["_id"])}
    return None

# Función para obtener la información específica de un usuario por su ID
def obtener_usuario_por_id(user_id):
    try:
        # Buscar el usuario en la colección 'users' por su ID
        user = users_collection.find_one(
            {"_id": ObjectId(user_id)},
            {"nombre": 1,"foto_url": 1, "telefono": 1, "email": 1, "direccion": 1}
        )
        if user:
            # Convertir el ObjectId a string para que sea serializable
            user["_id"] = str(user["_id"])
            return user
        else:
            return {"error": "Usuario no encontrado"}
    except Exception as e:
        return {"error": str(e)}

# Función para actualizar el perfil de un usuario en MongoDB
def actualizar_perfil_usuario(user_id, data):
    try:
        if 'foto_base64' in data:
            foto_base64 = data['foto_base64']
            foto_binaria = base64.b64decode(foto_base64)
            foto_filename = f"perfil/{user_id}.jpg"  # Guardar la imagen en la carpeta 'perfil'

            # Subir la imagen a S3
            s3.put_object(Body=foto_binaria, Bucket=os.getenv('S3_BUCKET_NAME'), Key=foto_filename)

            # Generar URL prefirmada válida por 7 días
            url_expiracion = 7 * 24 * 60 * 60
            url_firmada = s3.generate_presigned_url('get_object', Params={'Bucket': os.getenv('S3_BUCKET_NAME'), 'Key': foto_filename}, ExpiresIn=url_expiracion)

            # Actualizar datos del usuario en MongoDB con la URL de la foto
            updated_data = {
                "telefono": data.get("telefono", ""),
                "email": data.get("email", ""),
                "direccion": data.get("direccion", ""),
                "foto_url": url_firmada
            }

            result = users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": updated_data}
            )

            return result.modified_count > 0
        
        else:
            # Si no se proporciona una foto_base64, actualizar solo los otros datos
            updated_data = {
                "telefono": data.get("telefono", ""),
                "email": data.get("email", ""),
                "direccion": data.get("direccion", ""),
            }

            result = users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": updated_data}
            )

            return result.modified_count > 0
    
    except Exception as e:
        print(f"Error al actualizar perfil: {str(e)}")
        return False
    
# Función para crear un nuevo autor en MongoDB
def crear_autor(data):
    try:
        # Crear el nuevo autor sin la URL de la foto (se añadirá después de subir la foto a S3)
        new_author = {
            "nombre": data.get("nombre", ""),
            "biografia": data.get("biografia", ""),
            "libros": data.get("libros", [])
        }

        # Insertar el nuevo autor en la colección 'authors' y obtener el ID insertado
        result = authors_collection.insert_one(new_author)
        inserted_id = str(result.inserted_id)

        # Decodificar la imagen Base64 y subirla a S3 si se proporciona
        if 'foto_base64' in data:
            foto_base64 = data['foto_base64']
            foto_binaria = base64.b64decode(foto_base64)
            foto_filename = f"authors/{inserted_id}.jpg"  # Guardar la imagen en la carpeta 'authors' con el ID del autor

            # Subir la imagen a S3
            s3.put_object(Body=foto_binaria, Bucket=os.getenv('S3_BUCKET_NAME'), Key=foto_filename)

            # Generar URL prefirmada válida por 7 días
            url_expiracion = 7 * 24 * 60 * 60
            url_firmada = s3.generate_presigned_url('get_object', Params={'Bucket': os.getenv('S3_BUCKET_NAME'), 'Key': foto_filename}, ExpiresIn=url_expiracion)

            # Actualizar el autor con la URL de la foto en la colección 'authors'
            authors_collection.update_one(
                {"_id": ObjectId(inserted_id)},
                {"$set": {"foto_url": url_firmada}}
            )

        return {"message": "Autor creado exitosamente", "author_id": inserted_id}
    except Exception as e:
        return {"error": str(e)}

# Función para obtener todos los autores
def obtener_autores():
    try:
        autores = list(authors_collection.find())
        for autor in autores:
            autor["_id"] = str(autor["_id"])
        return autores
    except Exception as e:
        return {"error": str(e)}

# Función para obtener un autor por su ID sin devolver los IDs del autor y los libros
def obtener_autor_por_id(author_id):
    try:
        autor = authors_collection.find_one({"_id": ObjectId(author_id)}, {"_id": 0})
        if autor:
            if "libros" in autor and autor["libros"]:
                libros = []
                for libro_id in autor["libros"]:
                    libro = books_collection.find_one({"_id": ObjectId(libro_id)}, {"_id": 0, "titulo": 1, "genero": 1, "imagen_url": 1})
                    if libro:
                        libros.append(libro)
                autor["libros"] = libros
            else:
                autor["libros"] = []
            return autor
        return {"error": "Autor no encontrado"}
    except Exception as e:
        return {"error": str(e)}
    
# Función para eliminar un autor en MongoDB
def eliminar_autor(author_id):
    try:
        result = authors_collection.delete_one({"_id": ObjectId(author_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error al eliminar autor: {str(e)}")
        return False

def agregar_libro(data):
    author_id = data.get("author_id")
    if not author_id:
        return {"error": "El ID del autor es requerido"}

    new_book = {
        "titulo": data.get("titulo", ""),
        "autor": data.get("autor", ""),
        "descripcion": data.get("descripcion", ""),
        "genero": data.get("genero", ""),
        "fecha_publicacion": data.get("fecha_publicacion", ""),
        "disponibilidad": data.get("disponibilidad", True),
        "cantidad_stock": data.get("cantidad_stock", 0),
        "puntuacion_promedio": data.get("puntuacion_promedio", 0.0),
        "precio": data.get("precio", 0.0),
        "imagen_url": "",
        "resenas": data.get("reseñas", [])
    }
    try:
        # Insertar el nuevo libro en la colección 'books'
        result = books_collection.insert_one(new_book)
        book_id = str(result.inserted_id)
        
        # Decodificar la imagen Base64 y subirla a S3 si se proporciona
        if 'foto_base64' in data:
            foto_base64 = data['foto_base64']
            foto_binaria = base64.b64decode(foto_base64)
            foto_filename = f"books/{book_id}.jpg"  # Guardar la imagen en la carpeta 'books' con el ID del libro

            # Subir la imagen a S3
            s3.put_object(Body=foto_binaria, Bucket=os.getenv('S3_BUCKET_NAME'), Key=foto_filename)

            # Generar URL prefirmada válida por 7 días
            url_expiracion = 7 * 24 * 60 * 60
            url_firmada = s3.generate_presigned_url('get_object', Params={'Bucket': os.getenv('S3_BUCKET_NAME'), 'Key': foto_filename}, ExpiresIn=url_expiracion)

            # Actualizar el libro con la URL de la foto en la colección 'books'
            books_collection.update_one(
                {"_id": ObjectId(book_id)},
                {"$set": {"imagen_url": url_firmada}}
            )

        # Actualizar la lista de libros del autor usando el ID del autor
        authors_collection.update_one(
            {"_id": ObjectId(author_id)},
            {"$push": {"libros": book_id}}
        )

        return {"message": "Libro agregado exitosamente", "book_id": book_id}
    except Exception as e:
        return {"error": str(e)}

# Función para editar un libro en el catálogo
def editar_libro(libro_id, data):
    updated_data = {
        "titulo": data.get("titulo", ""),
        "descripcion": data.get("descripcion", ""),
        "genero": data.get("genero", ""),
        "fecha_publicacion": data.get("fecha_publicacion", ""),
        "disponibilidad": data.get("disponibilidad", True),
        "cantidad_stock": data.get("cantidad_stock", 0),
        "puntuacion_promedio": data.get("puntuacion_promedio", 0.0),
        "precio": data.get("precio", 0.0),
        "imagen_url": data.get("imagen_url", "")
    }
    try:
        # Actualizar el libro en la colección 'books'
        result = books_collection.update_one(
            {"_id": ObjectId(libro_id)},
            {"$set": updated_data}
        )
        return result.modified_count > 0
    except Exception as e:
        print(f"Error al editar libro: {str(e)}")
        return False

# Función para eliminar un libro del catálogo y actualizar el autor correspondiente
def eliminar_libro(libro_id):
    try:
        # Obtener el libro para encontrar el autor
        libro = books_collection.find_one({"_id": ObjectId(libro_id)})
        if not libro:
            return {"error": "Libro no encontrado"}
        
        # Eliminar el libro de la colección 'books'
        books_collection.delete_one({"_id": ObjectId(libro_id)})
        
        # Actualizar la lista de libros del autor
        authors_collection.update_one(
            {"nombre": libro["autor"]},
            {"$pull": {"libros": libro_id}}
        )
        return {"message": "Libro eliminado correctamente"}
    except Exception as e:
        return {"error": str(e)}

# Función para obtener todos los libros
def obtener_books():
    try:
        books = list(books_collection.find({}, {"_id": 1, "titulo": 1, "autor": 1, "genero": 1, "imagen_url": 1, "precio": 1}))
        for book in books:
            book["_id"] = str(book["_id"])
        return books
    except Exception as e:
        return {"error": str(e)}

# Función para obtener un libro por su ID
def obtener_book(book_id):
    try:
        book = books_collection.find_one({"_id": ObjectId(book_id)}, {"_id": 1, "titulo": 1, "autor": 1, "descripcion": 1, "genero": 1, "imagen_url": 1, "precio": 1, "disponibilidad": 1, "cantidad_stock": 1, "puntuacion_promedio": 1, "fecha_publicacion": 1, "resenas": 1})
        if book:
            book["_id"] = str(book["_id"])
            return book
        else:
            return {"error": "Libro no encontrado"}
    except Exception as e:
        return {"error": str(e)}

# Función para buscar 
def buscar_entidad(params):
    termino_busqueda = params.get('buscar')

    if termino_busqueda:
        # Buscar en la colección 'authors' por nombre
        query_authors = {
            "nombre": {'$regex': termino_busqueda, '$options': 'i'}
        }
        try:
            autores = list(authors_collection.find(query_authors))
            if autores:
                for autor in autores:
                    autor["_id"] = str(autor["_id"])
                return autores
        except Exception as e:
            return {"error": str(e)}

        # Buscar en la colección 'books' por título
        query_books = {
            "titulo": {'$regex': termino_busqueda, '$options': 'i'}
        }
        try:
            libros = list(books_collection.find(query_books))
            if libros:
                for libro in libros:
                    libro["_id"] = str(libro["_id"])
                return libros
        except Exception as e:
            return {"error": str(e)}

    # Si no se encontraron resultados en ninguna colección
    return {"message": "No se encontraron resultados para la búsqueda."}

# Función para filtrar libros por género, precio o puntuación
def filtrar_libros_por(params):
    filtro = params.get('filtro')

    if filtro == 'genero':
        # Filtrar y ordenar libros por género
        query = {
            "genero": {"$exists": True}
        }
        try:
            libros = list(books_collection.find(query).sort("genero", 1))
            if libros:
                for libro in libros:
                    libro["_id"] = str(libro["_id"])
                return libros
            else:
                return {"message": "No se encontraron libros para el filtro de género."}
        except Exception as e:
            return {"error": str(e)}

    elif filtro == 'precio':
        # Filtrar y ordenar libros por precio de menor a mayor
        query = {
            "precio": {"$exists": True}
        }
        try:
            libros = list(books_collection.find(query).sort("precio", 1))
            if libros:
                for libro in libros:
                    libro["_id"] = str(libro["_id"])
                return libros
            else:
                return {"message": "No se encontraron libros para el filtro de precio."}
        except Exception as e:
            return {"error": str(e)}

    elif filtro == 'puntuacion':
        # Filtrar y ordenar libros por puntuación de menor a mayor
        query = {
            "puntuacion_promedio": {"$exists": True}
        }
        try:
            libros = list(books_collection.find(query).sort("puntuacion_promedio", 1))
            if libros:
                for libro in libros:
                    libro["_id"] = str(libro["_id"])
                return libros
            else:
                return {"message": "No se encontraron libros para el filtro de puntuación."}
        except Exception as e:
            return {"error": str(e)}

    else:
        return {"error": "Filtro no válido. Los filtros válidos son 'genero', 'precio' o 'puntuacion'."}

# Función para obtener el nombre de usuario por su ID
def obtener_nombre_usuario(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            return user["nombre"]
        else:
            return None
    except Exception as e:
        print(f"Error al obtener nombre de usuario: {str(e)}")
        return None

# Función para agregar una reseña a un libro
def agregar_resena(book_id, user_id, texto, puntuacion):
    try:
        # Obtener el nombre del usuario
        nombre_usuario = obtener_nombre_usuario(user_id)
        if not nombre_usuario:
            return {"error": "Usuario no encontrado"}

        # Crear el objeto de reseña
        resena = {
            "usuario_id": user_id,
            "usuario_nombre": nombre_usuario,
            "texto": texto,
            "puntuacion": puntuacion
        }

        # Actualizar el libro en la colección 'books'
        result = books_collection.update_one(
            {"_id": ObjectId(book_id)},
            {"$push": {"resenas": resena}}
        )

        if result.modified_count > 0:
            # Calcular el promedio de las puntuaciones de las reseñas
            libro_actualizado = books_collection.find_one({"_id": ObjectId(book_id)})
            if libro_actualizado and "resenas" in libro_actualizado:
                resenas = libro_actualizado["resenas"]
                num_resenas = len(resenas)
                if num_resenas > 0:
                    total_puntuaciones = sum(resena["puntuacion"] for resena in resenas)
                    puntuacion_promedio = total_puntuaciones / num_resenas
                else:
                    puntuacion_promedio = 0.0  # Si no hay reseñas, la puntuación promedio es cero
                
                # Actualizar la puntuación promedio del libro
                books_collection.update_one(
                    {"_id": ObjectId(book_id)},
                    {"$set": {"puntuacion_promedio": puntuacion_promedio}}
                )

            return {"message": "Reseña agregada correctamente y puntuación promedio actualizada"}
        else:
            return {"error": "No se pudo agregar la reseña"}
    
    except Exception as e:
        return {"error": str(e)}

# Función para agregar libro al carrito
def agregar_libro_al_carrito(user_id, libro_id, cantidad, precio):
    try:
        # Verificar la cantidad disponible del libro
        libro = books_collection.find_one({"_id": ObjectId(libro_id)}, {"cantidad_stock": 1})
        if not libro:
            return {"error": "Libro no encontrado"}
        
        if libro["cantidad_stock"] < cantidad:
            return {"error": "Cantidad solicitada no disponible"}

        # Actualizar la cantidad de libros en stock
        books_collection.update_one(
            {"_id": ObjectId(libro_id)},
            {"$inc": {"cantidad_stock": -cantidad}}
        )

        # Buscar si el libro ya está en el carrito
        user = users_collection.find_one({"_id": ObjectId(user_id), "compras.libro_id": libro_id})
        if user:
            # Si el libro ya está en el carrito, actualizar la cantidad
            users_collection.update_one(
                {"_id": ObjectId(user_id), "compras.libro_id": libro_id},
                {"$inc": {"compras.$.cantidad": cantidad}}
            )
        else:
            # Si el libro no está en el carrito, agregarlo
            users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$push": {"compras": {"libro_id": libro_id, "cantidad": cantidad, "precio": precio}}}
            )
        
        # Verificar si quedan 0 libros en stock
        libro_actualizado = books_collection.find_one({"_id": ObjectId(libro_id)}, {"cantidad_stock": 1})
        if libro_actualizado["cantidad_stock"] == 0:
            return {"message": "Libro agregado al carrito exitosamente, pero ya no quedan más libros en stock"}

        return {"message": "Libro agregado al carrito exitosamente"}
    except Exception as e:
        return {"error": str(e)}

# Función para actualizar la cantidad de un libro en el carrito
def actualizar_cantidad_libro_carrito(user_id, libro_id, cantidad):
    try:
        # Obtener el usuario y el libro
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        libro = books_collection.find_one({"_id": ObjectId(libro_id)})
        
        if not user:
            return {"error": "Usuario no encontrado"}
        if not libro:
            return {"error": "Libro no encontrado"}

        # Verificar si el libro está en el carrito del usuario
        libro_en_carrito = None
        for item in user.get("compras", []):
            if item["libro_id"] == libro_id:
                libro_en_carrito = item
                break

        if libro_en_carrito:
            # Actualizar la cantidad en el carrito
            nueva_cantidad = libro_en_carrito["cantidad"] + cantidad
            if nueva_cantidad < 0:
                return {"error": "Cantidad no puede ser negativa"}
            
            # Restar la cantidad en el stock del libro
            if libro["cantidad_stock"] < cantidad:
                return {"error": "No hay suficiente stock disponible"}

            books_collection.update_one(
                {"_id": ObjectId(libro_id)},
                {"$inc": {"cantidad_stock": -cantidad}}
            )

            # Actualizar la cantidad en el carrito del usuario
            users_collection.update_one(
                {"_id": ObjectId(user_id), "compras.libro_id": libro_id},
                {"$set": {"compras.$.cantidad": nueva_cantidad}}
            )

            # Eliminar el libro del carrito si la cantidad es cero
            if nueva_cantidad == 0:
                users_collection.update_one(
                    {"_id": ObjectId(user_id)},
                    {"$pull": {"compras": {"libro_id": libro_id}}}
                )

            return {"message": "Cantidad actualizada correctamente"}
        else:
            return {"error": "El libro no está en el carrito del usuario"}

    except Exception as e:
        return {"error": str(e)}

# Función para eliminar libro del carrito y actualizar el stock del libro
def eliminar_libro_del_carrito(user_id, libro_id):
    try:
        # Buscar el usuario y el libro en el carrito
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {"error": "Usuario no encontrado"}

        libro_a_eliminar = None
        for libro in user.get("compras", []):
            if libro["libro_id"] == libro_id:
                libro_a_eliminar = libro
                break
        
        if not libro_a_eliminar:
            return {"error": "Libro no encontrado en el carrito"}

        # Obtener la cantidad del libro a eliminar
        cantidad_eliminar = libro_a_eliminar.get("cantidad", 0)

        # Actualizar la colección de usuarios para eliminar el libro del carrito
        users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"compras": {"libro_id": libro_id}}}
        )

        # Actualizar el stock del libro en la colección de books
        result = books_collection.update_one(
            {"_id": ObjectId(libro_id)},
            {"$inc": {"cantidad_stock": cantidad_eliminar}}
        )

        if result.modified_count > 0:
            return {"message": "Libro eliminado del carrito exitosamente y stock actualizado"}
        else:
            return {"error": "No se pudo actualizar el stock del libro"}

    except Exception as e:
        return {"error": str(e)}

# Función para ver resumen del carrito
def ver_resumen_carrito(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)}, {"compras": 1, "_id": 0})
        if user and "compras" in user:
            compras_actualizadas = []
            for item in user["compras"]:
                libro = books_collection.find_one({"_id": ObjectId(item["libro_id"])}, {"titulo": 1})
                if libro:
                    compras_actualizadas.append({
                        "libro_id": item["libro_id"],
                        "nombre_libro": libro["titulo"],
                        "cantidad": item["cantidad"],
                        "precio": item["precio"]
                    })
            total = sum(item["cantidad"] * item["precio"] for item in compras_actualizadas)
            return {"compras": compras_actualizadas, "total_a_pagar": total}
        return {"compras": [], "total_a_pagar": 0}
    except Exception as e:
        return {"error": str(e)}

# Función para procesar el pago y vaciar el carrito
def pagar_carrito(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)}, {"compras": 1})
        if user and "compras" in user:
            if not user["compras"]:
                return {"error": "El carrito está vacío"}

            # Crear un nuevo pedido
            nuevo_pedido = {
                "items": user["compras"],
                "estado": "en proceso",
                "total": sum(item["cantidad"] * item["precio"] for item in user["compras"])
            }

            # Agregar el nuevo pedido al historial de pedidos del usuario
            users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$push": {"pedidos": nuevo_pedido}, "$set": {"compras": []}}
            )

            return {"message": "Pago procesado exitosamente, su pedido está en proceso"}

        return {"error": "Usuario no encontrado o carrito vacío"}
    except Exception as e:
        return {"error": str(e)}

# Función para ver el historial de pedidos de un usuario
def ver_historial_pedidos(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)}, {"pedidos": 1, "_id": 0})
        if user and "pedidos" in user:
            return {"pedidos": user["pedidos"]}
        return {"pedidos": []}
    except Exception as e:
        return {"error": str(e)}

# Función para actualizar el estado de un pedido
def actualizar_estado_pedido(user_id, nuevo_estado):
    try:
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"pedidos.$[pedido].estado": nuevo_estado}},
            array_filters=[{"pedido.estado": {"$exists": True}}]
        )
        if result.modified_count > 0:
            return {"message": "Estado del pedido actualizado correctamente"}
        return {"error": "No se pudo actualizar el estado del pedido"}
    except Exception as e:
        return {"error": str(e)}

# Función para obtener el historial de pedidos de clientes
def obtener_historial_pedidos_clientes():
    try:
        # Buscar todos los usuarios con rol "cliente"
        clientes = users_collection.find({"role": "cliente"})
        historial = []
        
        for cliente in clientes:
            nombre_cliente = f"{cliente['nombre']} {cliente['apellido']}"
            for pedido in cliente.get("pedidos", []):
                estado_pedido = pedido.get("estado", "")
                libros_pedido = []
                
                for item in pedido.get("items", []):
                    libro = books_collection.find_one({"_id": ObjectId(item["libro_id"])})
                    if libro:
                        libros_pedido.append({
                            "titulo": libro["titulo"],
                            "cantidad": item["cantidad"],
                            "precio_unitario": item["precio"]
                        })
                
                historial.append({
                    "nombre_cliente": nombre_cliente,
                    "estado_pedido": estado_pedido,
                    "libros_pedido": libros_pedido
                })
        
        return historial
    
    except Exception as e:
        return {"error": str(e)}

# Función para obtener el top de libros más vendidos
def obtener_top_libros_vendidos():
    try:
        # Obtener todos los pedidos de todos los usuarios
        todos_pedidos = users_collection.aggregate([
            {"$unwind": "$pedidos"},
            {"$unwind": "$pedidos.items"},
            {"$group": {
                "_id": "$pedidos.items.libro_id",
                "total_vendidos": {"$sum": "$pedidos.items.cantidad"}
            }},
            {"$sort": {"total_vendidos": -1}}
        ])
        
        top_libros = []
        
        for libro in todos_pedidos:
            libro_data = books_collection.find_one({"_id": ObjectId(libro["_id"])})
            if libro_data:
                top_libros.append({
                    "titulo": libro_data["titulo"],
                    "total_vendidos": libro["total_vendidos"]
                })
        
        return top_libros
    
    except Exception as e:
        return {"error": str(e)}

#-----------------------------------------------------------------------------

# Ruta para crear un nuevo usuario
@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    response = crear_usuario(data)
    return jsonify(response)

# Ruta para el inicio de sesión (login)
@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400
    
    result = login(email, password)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401

# Ruta para obtener la información completa de un usuario por su ID
@app.route('/users/<string:user_id>', methods=['GET'])
def obtener_usuario(user_id):
    resultado = obtener_usuario_por_id(user_id)
    if "error" in resultado:
        return jsonify(resultado), 404
    return jsonify(resultado), 200

# Ruta para actualizar el perfil de un usuario
@app.route('/users/<string:user_id>', methods=['PUT'])
def update_user_profile(user_id):
    data = request.json
    if actualizar_perfil_usuario(user_id, data):
        return jsonify({"message": "Perfil actualizado correctamente"})
    else:
        return jsonify({"error": "No se pudo actualizar el perfil"}), 500

# Ruta para crear un nuevo autor
@app.route('/authors', methods=['POST'])
def create_author():
    data = request.json
    response = crear_autor(data)
    return jsonify(response)

# Ruta para obtener todos los autores
@app.route('/authors', methods=['GET'])
def get_authors():
    response = obtener_autores()
    return jsonify(response)

# Ruta para obtener un autor por su ID
@app.route('/authors/<string:author_id>', methods=['GET'])
def get_author_by_id(author_id):
    response = obtener_autor_por_id(author_id)
    return jsonify(response)

# Ruta para eliminar un autor
@app.route('/authors/<string:author_id>', methods=['DELETE'])
def delete_author(author_id):
    if eliminar_autor(author_id):
        return jsonify({"message": "Autor eliminado correctamente"})
    else:
        return jsonify({"error": "No se pudo eliminar el autor"}), 500

# Ruta para agregar un nuevo libro
@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    response = agregar_libro(data)
    return jsonify(response)

# Ruta para editar un libro
@app.route('/books/<string:libro_id>', methods=['PUT'])
def edit_book(libro_id):
    data = request.json
    if editar_libro(libro_id, data):
        return jsonify({"message": "Libro editado correctamente"})
    else:
        return jsonify({"error": "No se pudo editar el libro"}), 500

# Ruta para eliminar un libro
@app.route('/books/<string:libro_id>', methods=['DELETE'])
def delete_book(libro_id):
    response = eliminar_libro(libro_id)
    if "error" in response:
        return jsonify(response), 500
    return jsonify(response)

# Ruta para obtener todos los libros
@app.route('/books', methods=['GET'])
def get_books():
    books = obtener_books()
    return jsonify(books)

# Ruta para obtener un libro por su ID
@app.route('/books/<string:book_id>', methods=['GET'])
def get_book(book_id):
    book = obtener_book(book_id)
    return jsonify(book)

# Ruta para buscar entidades (libros o autores)
@app.route('/search', methods=['POST'])
def buscar_entidad_endpoint():
    params = request.json
    resultado = buscar_entidad(params)
    return jsonify(resultado)

# Ruta para filtrar libros por género, precio o puntuación
@app.route('/filtro', methods=['POST'])
def filtrar_libros_endpoint():
    params = request.json
    resultado = filtrar_libros_por(params)
    return jsonify(resultado)

# Ruta para agregar una reseña a un libro
@app.route('/books/<string:book_id>/review', methods=['POST'])
def add_review(book_id):
    data = request.json
    user_id = data.get("usuario_id")
    texto = data.get("texto")
    puntuacion = data.get("puntuacion")

    if not user_id or not texto or not puntuacion:
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    response = agregar_resena(book_id, user_id, texto, puntuacion)
    return jsonify(response)

# Endpoint para agregar libro al carrito
@app.route('/cart', methods=['POST'])
def add_book_to_cart():
    data = request.json
    user_id = data.get("user_id")
    libro_id = data.get("libro_id")
    cantidad = data.get("cantidad")
    precio = data.get("precio")
    response = agregar_libro_al_carrito(user_id, libro_id, cantidad, precio)
    return jsonify(response)

# Endpoint para actualizar la cantidad de un libro en el carrito
@app.route('/cart', methods=['PUT'])
def update_book_quantity_in_cart():
    data = request.json
    user_id = data.get("user_id")
    libro_id = data.get("libro_id")
    cantidad = data.get("cantidad")
    response = actualizar_cantidad_libro_carrito(user_id, libro_id, cantidad)
    return jsonify(response)


# Endpoint para eliminar libro del carrito
@app.route('/cart', methods=['DELETE'])
def remove_book_from_cart():
    data = request.json
    user_id = data.get("user_id")
    libro_id = data.get("libro_id")
    response = eliminar_libro_del_carrito(user_id, libro_id)
    return jsonify(response)

# Endpoint para ver resumen del carrito
@app.route('/cart/<string:user_id>', methods=['GET'])
def get_cart_summary(user_id):
    response = ver_resumen_carrito(user_id)
    return jsonify(response)

# Endpoint para procesar el pago y vaciar el carrito
@app.route('/checkout/<string:user_id>', methods=['POST'])
def pagar_carrito_endpoint(user_id):
    result = pagar_carrito(user_id)
    return jsonify(result)

# Endpoint para ver el historial de pedidos de un usuario
@app.route('/ver_historial_pedidos/<string:user_id>', methods=['GET'])
def ver_historial_pedidos_endpoint(user_id):
    result = ver_historial_pedidos(user_id)
    return jsonify(result)

# Endpoint para actualizar el estado de un pedido
@app.route('/actualizar_estado_pedido/<string:user_id>', methods=['PUT'])
def actualizar_estado_pedido_endpoint(user_id):
    data = request.json
    nuevo_estado = data.get("estado")
    result = actualizar_estado_pedido(user_id, nuevo_estado)
    return jsonify(result)

# Endpoint para obtener el historial de pedidos de clientes
@app.route('/historial_pedidos_clientes', methods=['GET'])
def obtener_historial_pedidos_clientes_endpoint():
    historial = obtener_historial_pedidos_clientes()
    return jsonify(historial)

# Endpoint para obtener el top de libros más vendidos
@app.route('/top_libros_vendidos', methods=['GET'])
def obtener_top_libros_vendidos_endpoint():
    top_libros = obtener_top_libros_vendidos()
    return jsonify(top_libros)


if __name__ == '__main__':
    app.run(debug=True)
