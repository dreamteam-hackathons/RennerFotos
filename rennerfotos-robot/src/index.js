const bot = require("venom-bot");
const fs = require('fs');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const rennerFotosRepository = require('../../rennerfotos-common/Repositories/rennerfotos.repository');
let pedido = null;

bot.create().then((client) => start(client));

async function  start(client) {
  pedido = rennerFotosRepository.getPedido();

  await client
    .sendText(process.env.POS_VENDA_NUMERO, `Vimos que você fez um pedido da Lojas Renner do produto ${pedido} a uma semana você não gostária de participar do RennerFotos?`)
    .catch((erro) => {
      console.error('Error when sending: ', erro);
    });

  await client
    .sendText(process.env.POS_VENDA_NUMERO, 'Nos envie uma foto com o produto que você comprou na Lojas Renner e ela aparecerá no RennerFotos e você ganhará condições exclusivas para compras no site 🤑.')
    .catch((erro) => {
      console.error('Error when sending: ', erro);
    });

  client.onMessage(async (message) => {
    console.log('Receved message from: ', message.from);
    console.log('Pedido: ', pedido);

    if (message.isMedia === true || message.isMMS === true) {
      const buffer = await client.decryptFile(message);
      
      const fileName = `whatsapp-${uuidv4()}.${mime.extension(message.mimetype)}`;
      await fs.writeFile(`database-imagens/${fileName}`, buffer, (err) => {
        console.error('Error when writeFile: ', err);
      });

      await rennerFotosRepository.trySavePhotos({
        "nome": pedido,
        "checkoutUrl": "https://www.lojasrenner.com.br/p/calca-sarja-com-puidos/-/A-552590686-br.lr?sku=552590740",
        "image": `/imagens/${fileName}`,
        "status": "pendendeModeracao"
      });

      await client.sendText(message.from, "Obrigado por enviar sua foto embreve ela aparecerá no RennerFotos.");
      await client.sendText(message.from, "Veja sua foto no RennerFotos https://dreamteam-hackathons.github.io/RennerFotos");
    }
  });

  client.onIncomingCall(async (call) => {
    console.log(call);
    client.sendText(call.peerJid, "Desculpe, não podemos responder telefonemas.");
  });
}
