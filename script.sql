use BookStore

// Crear colección de usuarios (users)
db.createCollection("users")

// Crear colección de libros (books)
db.createCollection("books")

// Crear colección de autores (authors)
db.createCollection("authors")

// Crear colección de autores (order)
db.createCollection("orders")

//Credenciales del admin
db.users.insertOne({
    nombre: "Admin",
    apellido: "Admin",
    email: "admin@example.com",
    telefono: "123456789",
    direccion: "Calle Principal 456",
    fecha_registro: ISODate("2024-06-21"),
    role: "admin",
    password: "admin$"
});
