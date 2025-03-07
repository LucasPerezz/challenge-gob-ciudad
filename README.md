# Challenge de inicio - Lucas Perez

Challenge de inicio para el puesto de Desarrollador Fullstack Jr en el Gobierno de La Ciudad

## Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js**
- **npm**
- **Base de datos** (MySQL)

Si no tienes Node.js o npm instalados, puedes descargarlos desde [nodejs.org](https://nodejs.org/).

## Pasos para ejecutar el proyecto

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### 1. Clonar el repositorio

Primero, debes clonar el repositorio en tu máquina local. Abre tu terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/LucasPerezz/challenge-gob-ciudad.git
cd ./challenge-gob-ciudad
```

### 2. Instalar dependencias

Segundo, en su terminal ejecute el siguiente comando:

```bash
npm install
```

### 3. Configure su archivo .env

Tercero, es necesario que en su archivo .env cree una variable de entorno con el siguiente formato

```bash
DATABASE_URL=mysql://<user>:<password>@localhost:<port>/<nombre_base_de_datos>
```

### 4. Migrar prisma a base de datos

Cuarto, debe ejecutar el siguiente comando en la terminal

```
    npx prisma migrate dev
```

Este comando aplica las migraciones y crea las tablas de la base de datos según el esquema definido en prisma/schema.prisma

Si no hay migraciones y el proyecto está usando el esquema inicial, puedes generar el cliente de Prisma:

```
    npx prisma generate
```

### 5. Iniciar el servidor de desarrollo

```
    npm run dev
```

### 6. Verificar funcionamiento

Como ultimo paso, ingrese a su navegador y coloque la siguiente url en el buscador:

```
http://localhost:3000
```

## Documentacion del proyecto
https://drive.google.com/file/d/193ReP281WriehwXIu3W-ja0PUS1Q30Mx/view?usp=sharing

## Consultas SQL para la creacion

Crear base de datos

```
    create database employee_managment
```

Usar base de datos

```
    use employee_managment
```

Crear tabla

```
create table employee (
	employee_id int auto_increment primary key,
    fullname varchar(100) not null,
    dni varchar(100) not null,
    date_of_birthday date not null,
    is_developer tinyint not null,
    description varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    deleted_at timestamp default null
)
```

Agregar elemento de prueba

```
insert into employee (fullname, dni, date_of_birthday, is_developer, description) values
('Lucas Perez', '12345678', '2000-09-26', 1, 'Desarrollador Full Stack')
```

Obtener elementos

```
select * from employeeis_developer
```
