# Hello and Welcome to our App

# DISCLAIMER : This does not work in Dev mode ie: npm run web.

this is also a very minimalistic app.

## Get started

Our app has two important parts, the server folder and main app

How to install:
In the root of the project run

```
npm install
```

navigate to your server folder and run

```
npm install
```

once both steps are done go back in the root of the project

## Env file

You will need to setup an env file in the root of the project for it to work !
`./.env`

fill in these two variables.

```
EXPO_PUBLIC_DISCORD_CLIENT_ID="Your client Id"
DISCORD_CLIENT_SECRET="Your client secret"
```

Once done you will be pretty much set.

now still in the root of the project run

```
npm run serve
```

This will build and start a server to serve the App.

When you start up the app in your discord activity you should see the name of the channel you started it in, in the top left corner of the app.
