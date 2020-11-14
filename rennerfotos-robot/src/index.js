// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");
const fs = require('fs');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');

bot.create().then((client) => start(client));
function start(client) {
  client.onMessage(async (message) => {
    console.log("Receved message from:", message.from);

    if (message.isMedia === true || message.isMMS === true) {
      const buffer = await client.decryptFile(message);
      
      const fileName = `downloaded-imagens/whatsapp-${uuidv4()}.${mime.extension(message.mimetype)}`;
      await fs.writeFile(fileName, buffer, (err) => {
        console.error(err);
      });
    }

    let resp = stages.step[getStage(message.from)].obj.execute(
      message.from,
      message.body,
      message.sender.name
    );
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      client.sendText(message.from, element);
    }
  });
}

function getStage(user) {
  if (banco.db[user]) {
    //Se existir esse numero no banco de dados
    return banco.db[user].stage;
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0,
      itens: [],
    };
    return banco.db[user].stage;
  }
}
