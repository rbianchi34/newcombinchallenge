# NewCombin Challenge

## Requisitos
* Clonar el repositorio
* Ejecutar npm install
* Levantar la API
* Ejecutar npm start

## Funcionamiento
* Completar los campos del form y hacer click en Save llama a la API para crear un nuevo registro y si se crea correctamente lo agrega a los datos de la tabla sin llamar a la API de nuevo. Si ocurre un error lo muestra en un Alert en pantalla.

* La tabla llama a la API para obtener los registros en el primer render y luego solo lo vuelve a  hacer cuando el timer en PeopleManager detecta que hace 2 minutos que el usuario esta inactivo.

* La tabla agrega un campo id a cada registro puramente porque es un requirimiento del componente DataGrid de MUI.

* El AppBar es funcional pero la única ruta con contenido es "/", "/other" tiene un placeholder, y cualquier otra ruta encuentra Not Found

