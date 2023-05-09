const Telegraf = require('telegraf');
const bot = new Telegraf('5785597594:AAEq4J8tr5w86sP0lB5Lo7RmjUonneokLmg');


// const sendMessage = bot.telegram.sendMessage(1612650323, '**hello world**', {
//   parse_mode: 'Markdown', // esto  es para que el mensaje se vea en negrita
//   disable_notification: true // esto es para que no se notifique al usuario
// });

const sendMessage = async (id, message) => {
  try {
    await bot.telegram.sendMessage(id, message, {
      parse_mode: 'Markdown', // esto  es para que el mensaje se vea en negrita
      disable_notification: true // esto es para que no se notifique al usuario
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMessage,
};





























// Set the bot API endpoint

bot.start((ctx) => {
    ctx.reply(`Hola ${ctx.from.first_name} ${ctx.from.last_name}`);
    // console.log(ctx) -> // Aca veo todos los comandos que tengo para acceder a la info del chat
    
    console.log(`
                ================ Info del mensaje ================
                Mensaje enviado por ${ctx.from.first_name} ${ctx.from.last_name}
                Su id es ${ctx.from.id}
                El mensaje que envio fue "${ctx.message.text}"
                El tipo de mensaje es [${ctx.updateSubTypes[0]}]
                ===================================================`)
  
    // shortcuts avoid to write the following
    // bot.telegram.sendMessage(ctx.chat.id, 'hello world', [extra]);
    // bot.telegram.sendMessage(ctx.chat.id, `Chat id -> ${ctx.chat.id}`);
    bot.telegram.sendMessage(ctx.chat.id, '**hello world**', {
      parse_mode: 'Markdown', // esto  es para que el mensaje se vea en negrita
      disable_notification: true // esto es para que no se notifique al usuario
    });
  })

