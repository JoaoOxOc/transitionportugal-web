# transitionportugal-web
website and web services of transition network in Portugal


## How to run it
### for micro frontend's monorepo
- First, explanation of frontend's root folder `package.json`:
	- `npm run bootstrap` (on the frontend's root folder): triggers the command `lerna bootstrap --hoist` responsible for moving all package dependencies to the root `node_modules` folder
	- `npm run tsc` (on the frontend's root folder): it triggers the command `lerna run tsc --stream` compiling every monorepo package built with typescript
	- `npm run:home:dev` (on the frontend's root folder): it will start the "home" NextJS project. Contains a bigger command inside - lerna scope is the project that should run and stream parameter is the project's package script to run
	- `npm run run:backoffice:dev`(on the frontend's root folder): it will start the "backoffice" NextJS project. Also the same commands as the previous line explanation
	
- How to run:
	- first, run "bootstrap" command just to verify all the dependencies
	- just run "home" or "backoffice" commands, depending on which project you want to start
	
- How to install packages in a specific project:
	- example: `lerna add styled-components --scope=@transitionpt/generic_header`
	- last, run `npm run bootstrap` to remove duplicated NPM packages
	
- How to run in Docker:
	- for home project: use the dockerfile `frontoffice.dockerfile` inside `frontends` folder; from this folder in CMD, run: `docker build -f .\frontoffice.dockerfile -t tp_front .` (or for debug `docker build -f .\frontoffice.dockerfile -t tp_front . --progress=plain --no-cache`) then `docker run -p 5050:3000 tp_front`