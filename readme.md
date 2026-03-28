# API REST Corporación Cápsula

> [!IMPORTANT]
> Este proyecto necesita las siguientes instalaciones
> - [Node Js](https://nodejs.org/es/download) versiones 22 o superior
> - Algun cliente REST (Postman, Insomnia, Thunder Client, etc)

## Generalidades del proyecto

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

