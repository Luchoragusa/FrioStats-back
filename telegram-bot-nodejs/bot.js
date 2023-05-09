const Telegraf = require('telegraf');

const bot = new Telegraf('5785597594:AAEq4J8tr5w86sP0lB5Lo7RmjUonneokLmg')

bot.use((ctx, next) => {
  // ctx.reply('usaste el bot');
  // next();
  ctx.state.users = 75;
  next(ctx); //next is passed because we can modify data
})

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


bot.settings(ctx => ctx.reply('settings command'))

// Comando personalizado
// Es caseSensitive por eso se ponen las 3 opciones
bot.command(['mytest', 'Mytest', 'test'], (ctx) => {
  ctx.reply('my custom command');
})

bot.command(['sendMD'], (ctx) => {
  ctx.reply('Mensaje enviado al MD');
  telegramId = '1642350769';
  bot.telegram.sendMessage(telegramId, 'Hola!!');
})


// Siempre que se escriba la palabra computer en el chat el bot responde eso
bot.hears('computer', ctx => {
  ctx.reply('Hey I am selling a computer!!!');
})

// Reconocer un mensaje de tipo texto y responde so
// bot.on('text', ctx => {
//   ctx.reply('text message');
// });

// Reconocer un sticker
// bot.on('sticker', ctx => {
//   ctx.reply('oh! you like stickers')
// })


// Reconoce una mencion
bot.mention('BotFather', (ctx) => {
  ctx.reply('you mentioned someone')
})

// Reconoce un numero de telefono
bot.phone('+1 730 263-4233', (ctx) => {
  ctx.reply('this is a phone')
});

// Reconoce un hashtag
bot.hashtag('coding', (ctx) => {
  ctx.reply('hashtag!')
})


bot.launch()