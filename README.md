# URLshortner
> Web app for shrink big urls

![react][react-url]
![typescript][types-url]
![node][npm-image]
![mongodb][mongo-url]

URLshortner is a URL shortening web app, which provides short aliases for redirection of long URLs.So we can short a long url with random values and which can use to redirect to original url.

[View Demo](https://main.dqvr4svwjlmek.amplifyapp.com)

![](header.png)

## Installation


<h4> Server </h4>

1. Configure mongoDb database 📖 [Connect with mongoDb atlas][mongo-conn]
2. Clone the repo

   ```sh
   git clone https://github.com/shah21/URLshortner.git
   ```
3. Install NPM packages

   ```sh
   cd server
   npm install
   ```
4. Enter your API keys and Database credentials in .env 
   🗒️ You can find example .env file from repo
   
   ```JS
    MONGO_USER = USER_NAME
    MONGI_PASSWORD = ....
    etc...
   ```
<h4> Client (Web) </h4> 

1. Install NPM packages

   ```sh
   cd client
   npm install
   ```
2. Change host ( server address ) on axios/config.ts ( if you want to run project locally )

   ```sh
   const host = '<address>';
   const BASE_URL = `http://${host}`;
   ```   


## Features

* User Authentication
* Material UI
* Add and shrink url
* Delete Url
.Etc

## Release History

* 0.0.1
    * Initial Version

## Meta

Muhsin Shah - [@shah21](https://twitter.com/MuhsinS07857838?s=09) - muhsinshah21@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/shah21/Data-Bucket.git](https://github.com/shah21/URLshortner.git/i)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[node-js]: https://img.shields.io/badge/node-javascript-green
[npm-image]: https://img.shields.io/badge/node-v12.18.3-green
[mongo-url]: https://img.shields.io/badge/mongodb-v4.4-brightgreen
[react-url]: https://img.shields.io/badge/reactJs-%20v17.0.1-blue
[types-url]: https://img.shields.io/badge/typescript-4.1.5-%236E97CC
[mongo-conn]: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
[wiki]: https://github.com/yourname/yourproject/wiki
