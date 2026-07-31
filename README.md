# JGame AI IDE

A no-code gamemaker style IDE for [jgame.js](https://github.com/borisvanschooten/jgame.js), a HTML-based 2D game engine.  Uses an LLM to generate code, based on text descriptions of entities, map generators, and particles. This is still an early version, and requires some technical knowledge to install and run.

## Run the IDE

To run, you need the following:

- node.js and npm
- OpenAI API key (to generate the code)

First, install node.js and npm.

The code generation currently works only with OpenAI. Create an OpenAI platform account, then generate an API key. Then set the key
in the environment variable OPENAI_API_KEY.

Now, go to the root directory of the package, and run:

```
npm install    # you need to run this only once
npm run start
```

This will start the IDE.

The IDE is based on NW (formerly node-webkit) and was developed using the open source [VSCode webcogs extension](https://marketplace.visualstudio.com/items?itemName=borisvanschooten.webcogs-ai-toolkit). See also the [webcogs repo](https://github.com/borisvanschooten/webcogs-ai-toolkit).

## Create a new game

Once in the IDE, select "New workspace", then select a folder and name the folder that the game will be created in.  A jgame.js template will be created with a minimal example game. You can run the game stand-alone by loading the file jgame-ai.html in a web browser. Note it needs to be served from a webserver because of CORS restrictions.

The code generation is based internally on Webcogs, and the game folder can also be opened in VSCode and used directly with the webcogs extension.  You can change the AI model in the promptbuildfiles (<gamerootfolder>/jgame-games/ai-game/webcogs/). It uses gpt-5.5 by default, but if you want a cheaper model you can change that to gpt-5.4 for example.  Open a promptbuildfile, and change the ai_model property, as in:
```
    "ai_model": "gpt-5.4",
```
