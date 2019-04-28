# SecurityTester
This project is back-end for SecurityTester

## Overall
This project use basic express template you can find usage of direcotries in table below.

| directory name  | usage  |
| :-----------: | :------: |
| controllers   | controllers for response the requests          |
| middlewares   | middlewares to run before main controllers     |
| configs       | contains all config files                      |
| public        | location to put the front end build            |
| scripts       | every scripts to run locate here               |
| model         | database models                                |
| queue         | main register for queue and workers            |

## Configs
This directory content described  in table below.

|     name      | description  |
| :-----------: | :------:     |
| https   (direcrtory) | contain the public key and certification for https |
| jwt     (direcrtory) | contain the public key and certification for jwt   |
| scripts (direcrtory) | contain the content for every scripts like suggestions and user test explanations |
| db.js                | information for connecting to the mongo DB   |
| https.js             | configs that make express use the https(directory) key and cert   |
| jwt.js               | configs that make express use the jwt(directory) key and cert   |
| recaptcha.js         | configs for recaptcha like server address and private key   |
| router.js            | every controller have to subscribe here so the router will route the requests to it   |
| script.js            | every script should subscribe here to describe its file, explanations    |
| server.js            | server configs like running port and public directory location and the starting location for uploader |

## New script
if you want to add new script you should add the script file to `/scripts` and then add it's explanations to `/configs/scripts` and last subscribe it in `/configs/script.js` and restart the server .
the new script file should be runned on a seprate process and don't block the queue. and after its finished it should run `/scripts/afterDone.js` to submit the results to the database.

## Deploy
before deployment you should make sure that `mongodb` and `redis` are up and running.
for deployment you should run `npm install` to install all dependencies after that you need a process manager like `long loop` or `strong loop`. (we use `strong loop`). after installing the `strong loop`.you should run the `slc start`

## Managing
to manager the running server you should run `slc ctl` that shows all running processes and their's details . if you want to remove the process so the server would be stopped you should run `slc ctl remove <process number>` .
