# Recipes App

Clona el repositorio

```
git clone https://github.com/santi280403/recipes.git
```

Instala las dependencias

```
npm install
```

Crea un archivo .env y mete las siguientes variables de entorno

```
# DB
USERS_DB=src/db/users.json
RECIPIES_DB=src/db/recipies.json
# Token
SECRET_KEY=tu_custom_secret_key
```

Para iniciar el servidor, ejecuta en tu consola el siguiente comando:

```
npm run build && npm start
```

## Endpoints

Todos los endpoints deben llevar el header **Content-Type: application/json**. Todos los endpoints que tienen (**) reciben un header adicional **x-access-token: Bearer token\*\*

El base url es **http://localhost:3000/api/**

### Users

> POST base_url/users/login, recibe como body el **email y la password** del usuario
> POST base_url/users/register recibe como body el **email, password, first_name y last_name** del usuario.

### Recipes

> GET base_url/recipies/, devuelve todas las recetas
> ** GET base_url/recipies/byUser/, devuelve todas las recetas del usuario en sesion
> ** GET base_url/recipies/:id, devuelve la receta de acuerdo al **id**.
> ** POST base_url/recipies, crea una receta y la data que recibe es **title, description, preparation, ingredients, images\*\*, un ejemplo es:
>
> ```
>   "title": "Recipie two another user",
>    "description": "Some description",
>    "preparation": "Some preparation",
>    "ingredients": ["Arroz", "Papa", "Carne", "Algo"],
>    "images": ["https://cdn7.recetasdeescandalo.com/wp-content/uploads/2020/03/Recetas-de-cuarentena-para-comer-bien-durante-el-confinamiento.jpg","https://i.blogs.es/dc2ed1/collage_vagos2/450_1000.jpg"]
>
>
> ```
>
> ** PUT base_url/recipies/:id, actualiza la receta en relacion al **id**, la data es igual a la del endpoint de crear una receta.
> ** DELETE base_url/recipies/:id, elimina la receta en relacion al **id** del parametro.
> POST base_url/recipies/comment/:id, comenta una receta, la data que recibe es el **comment y el email del usuario que esta comentando**
> ** POST base_url/recipies/response/:rid/:cid/, responde un comentario, los parametros que se le pasa son **rid para el id de la receta y cid para el id del comentario**, la data que recibe es **el email de quien responde y la respuesta del comentario**
> POST base_url/recipies/qualify/:id/, califica la receta, la data que recibe es **qualification\*\* donde puede ser de 1 a 5.
