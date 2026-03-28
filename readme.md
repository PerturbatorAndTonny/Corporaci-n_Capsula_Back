# API REST Corporación Cápsula

> [!IMPORTANT]
> Este proyecto necesita las siguientes instalaciones
> - [Node Js](https://nodejs.org/es/download) versiones 22 o superior
> - Algun cliente REST (Postman, Insomnia, Thunder Client, etc)

## Generalidades del proyecto

### Instalación del proyecto
En una carpeta de tu equipo, haz un clon del proyecto y dependiendo del gestor de paquetes ejecuta el comando ``` install ```
| Gestor | Comando |
| --- | --- |
| npm | npm install |
| pnpm | pnpm install |
| yarn | yarn install |

> [!IMPORTANT]
> Este proyecto necesita las siguientes instalaciones
> Asegurate de tener instalado todas las dependencias del proyecto presente en el archivo **``` Package.json ```**

Abre el editor de codigo y agrega el archivo **.env** con las  siguientes variables
```env
 PORT=<puerto de preferencia>
```

una vez hecho esto, ejecuta el comando _dev_ con el gestor de dependencias para **desarrollo** o _start_ para inicial la API en **despliegue**

### Reglas generales

La nomenclatura a seguir para definir nombres de variables, nombres de funciones sera *camelCase*

```Javascript
const user
let userType
```

Todas las funciones que se desarrollen para los **controladores** se deben escribir como *arrow funcitons*

```Javascript
const nameFunction = (parameters) => {
  /*agregar funcionalidad*/
}
```

Para todas las demas funciones se deben redactar como *declared functions*

```Javascript
function nameFunction(parameters){
  /*agregar funcionalidad*/
}
```

