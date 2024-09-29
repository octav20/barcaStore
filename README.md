# Ecommerce Next.js con MongoDB por Octavio Guerrero

## Demo
Explora el demo [Barca store](https://barca-store-ihfc.vercel.app/)

Credeciales:
Usuario: adal24
Contraseña: adal24

Este es un proyecto de ecommerce desarrollado con **Next.js** y **MongoDB** que permite a los usuarios iniciar sesión, agregar productos a su carrito, recargar saldo y realizar compras.

## Funcionalidades principales

- **Inicio de sesión**: Los usuarios pueden iniciar sesión para gestionar sus compras.
- **Recarga de saldo**: Los usuarios pueden recargar saldo en su cuenta para realizar compras dentro del ecommerce.
- **Control de carrito de compras**: Los usuarios pueden agregar y eliminar productos del carrito antes de finalizar la compra.
- **Proceso de compra**: Los usuarios pueden realizar compras con su saldo disponible, y el sistema actualiza su historial de compras.

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **MongoDB**: Base de datos NoSQL para almacenar información de productos, usuarios y transacciones.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB, que facilita la interacción entre el código de JavaScript y la base de datos.
- **Node.js**: Entorno de ejecución para el backend.
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens para el manejo seguro de sesiones de usuario.
- **Tailwind CSS**: Framework CSS para estilos.

## Instalación y configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/octav20/barcaStore.git
   cd ecommerce-nextjs

2. Instalar las dependencias:
   
   ```bash
   npm install

3. Configurar las variables de entorno:
    Crear un archivo .env.local en el directorio raíz y añadir las siguientes variables:
    ```bash
    MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/tu-base-de-datos
    NEXTAUTH_SECRET=tu_secreto_jwt
    NEXT_PUBLIC_API_URL = http://tuUrl/api o http://localhost:300

4. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
 

## Estructura de la base de datos

### Producto
    ```bash
    {
     "_id": {
    "$oid": "66f3cc101a99474301bd5298"
    },
    "id": "1",
    "name": "Jersey Barca local",
    "category": {
        "name": "Category Name"
    },
    "price": 100,
    "images": [
        {
        "id": "1",
        "url": "/img/barca-jersey.png"
        },
        {
        "id": "2",
        "url": "/img/barca-jersey2.png"
        }
    ]
    }
### Usuario
    ```bash
    {
    "_id": {
        "$oid": "66f887fde6e80750ac63601d"
    },
    "name": "Profe adal",
    "user": "adal24",
    "password": "adal24",
    "credit": 0
    }

### Explora mas sobre MongoDB y NextJs
[MongoDb](https://cloud.mongodb.com/)
[NextJs](https://nextjs.org/)
