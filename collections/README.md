### 🧪 Pruebas realizadas en Postman

Se crearon pruebas automatizadas en Postman para validar los servicios principales del API. Las pruebas incluyeron:

- Verificar que los códigos de estado sean los esperados (200, 201, etc.)
- Seguir el flujo necesario para ejecutar pruebas secuencialmente

📝 Se eligieron casos relevantes dentro de cada colección:
- En la colección de actividades, simplemente se crea un flujo que crea una actividad y se prueban todos los métodos del service de actividad.
- En la colección de estudiantes, se crea una actividad, un estudiante y se inscribe un estudiante a la actividad creada. Se prueban también los demás métodos del servicio de estudiantes que no entran dentro de este proceso.
- En la colección de reseñas, se debe crear tanto una actividad como un estudiante, que el estudiante se haya inscrito a la actividad y luego cambiar el estado de la actividad a cerrado para que finalmente se pueda crear una reseña. Se crea una actividad de cupo máximo de 1 para que la prueba sea fácil de ejecutar.
