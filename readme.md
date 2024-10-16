# My Node Library

## Initialization

Create project 

```shell
mkdir my-node-library
cd my-node-library
npm init -y
git init
touch .gitignore
```

Edit `.gitignore`

```txt
.env
node_modules
```

Install dependencies

```shell 
npm i bcrypt bootstrap dotenv ejs express express-session express-validator mongoose
```

## Create architecture

```shell
mkdir config
mkdir environments
mkdir public
mkdir public/scripts
mkdir public/styles
mkdir src
mkdir src/Controllers
mkdir src/Models
mkdir src/Services
mkdir templates
mkdir templates/layout
mkdir templates/pages
```

## Prepare Controllers

```shell 
touch src/Controllers/HomepageController.js
touch src/Controllers/BookController.js
touch src/Controllers/SecurityController.js
```

## Prepare Views

```shell 
touch templates/layout/header.html
touch templates/layout/footer.html
mkdir templates/pages/homepage
touch templates/pages/homepage/index.html
mkdir templates/pages/book
touch templates/pages/book/index.html
touch templates/pages/book/create.html
touch templates/pages/book/read.html
touch templates/pages/book/update.html
touch templates/pages/book/delete.html
mkdir templates/pages/security
touch templates/pages/security/register.html
touch templates/pages/security/login.html
```

## Edit Files

1. Edit `templates/layout/header.html`
2. Edit `templates/layout/footer.html`
2. Edit `src/Controller/HomepageController.js`