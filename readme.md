# Extensión Remember Words

Extensión para Google Chrome, que tiene como objetivo guardar el significado de las palabras, en mi caso particular almacenar la traducción de algunas palabras.

![RW](https://raw.githubusercontent.com/Jorger/Extension-Remember_Words/master/img_examples/ExtensionChrome.gif)

Otra de las razones para desarrollar la extensión, fue con el objetivo de conocer la forma en que es posible realizarlo, entender los diferentes tipos de ambientes donde se ejecuta (background, content_scripts, browser_action) y la forma en que se comunica.

# Servicios utilizado.

* [sweetAlert]: Utilizada para mostrar y guardar la palabra seleccionada.
* [mLab]: Servicio que permite manejar una base de datos NoSQL (Mongo), en la cual se almacenan las palabras.
* [now]: Servicio que permite desplegar el backend de la extensión.

# Instalación.

## Asignación de Variables de entorno.

El backend cuenta con tres variables de entorno relacionadas a los datos de la Base de datos.

```javascript
var database    = {
          name       : process.env.MONGO_DATABASE,
          user       : process.env.MONGO_USER,
          password   : process.env.MONGO_PASSWORD
      };
```

Es posible [sobreescribir] estas variables con los valores relacionados a la ejecución local de la base de datos.

Para establecer estas variables de entorno si se despliega con now, se deberá editar esta información en el archivo package.json en [deploy]


## Ejecutar el backend.

Para desplegar el servicio a nivel local se deberá realizar los siguientes pasos:

```cmd
cd server
npm install
npm start
```

Deplegar el servicio a través de now (previamente instalado globalmente) se ejecutará el siguiente comando.

```cmd
cd server
npm run deploy
```

## Establecer url de consumo en la extensión.

Una vez el backend esté en ejecución se deberá establecer está url la extensión, esto se realiza en el archivo [event.js] se recomienda que la url tenga relacionado un certificado de seguridad, por está razón se aconseja desplegar el servicio en now.sh

```javascript
  const URL_SERVICE = "https://CHANGE_URL_DEPLOY.now.sh";
```

Jorge Rubiano

[@ostjh]

License
----
MIT

[@ostjh]:https://twitter.com/ostjh
[sweetAlert]:http://t4t5.github.io/sweetalert/
[mLab]:https://mlab.com/
[now]:https://zeit.co/now
[sobreescribir]:https://github.com/Jorger/Extension-Remember_Words/blob/master/server/modules/database.js#L4
[deploy]:https://github.com/Jorger/Extension-Remember_Words/blob/master/server/package.json#L20
[event.js]:https://github.com/Jorger/Extension-Remember_Words/blob/master/extension/event.js#L6
