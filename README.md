# LBDS - Fan club

El Club Nautico Hacoaj necesita una aplicación para poder organizar a “Los borrachos del shimón”.

Hay dos tipos de usuario:

- Organización del club (técnico, presidente, etc)
- Barras

### Requerimientos para la organización

- Poder ver, editar, crear y eliminar partidos (fecha y hora, rival, cancha)
    - No se pueden superponer los partidos
    - No pueden jugar contra el mismo rival en un plazo menor a un mes
    - Entre partido y partido deben haber 3 días de diferencia como mínimo.
    - Se tiene que asignar la cantidad máxima de barras que pueden ir
- Poder ver el estado de los borrachos
    - Quiénes son los borrachos
    - Qué borrachos tienen la cuota al día
        - Tienen que haber pagado en el mes corriente

### Requerimeintos para los borrachos

- Registrarse y loguearse
- Anotarse a un partido
- Pagar la cuota
- Ver los partidos disponibles

### Cuestiones generales

- Todas las rutas deben estar autenticadas
- Se debe persistir la información en cualquier formato de base de datos, utilizando prisma
- El código debe estar bien organizado y utilizar el modelo de ([NestJS](https://docs.nestjs.com/))
- Utilizar manejo de errores
- Deben utilizar la herramienta de [logging de NestJs](https://docs.nestjs.com/techniques/logger)
- [Postman](https://www.postman.com/)