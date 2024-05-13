const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const sendMessage = async (id, message) => {
  try {
    await bot.telegram.sendMessage(id, message, {
      parse_mode: 'Markdown'
    })
  } catch (error) {
    console.log(error)
  }
}

const sendMsg = async (id, message) => {
  try {
    await bot.telegram.sendMessage(id, message, {
      parse_mode: 'Markdown'
    })
  } catch (error) {
    console.log(error)
  }
}

// Set the bot API endpoint

bot.start((ctx) => {
  console.log(`[Telegram] - ${ctx.from.first_name} ${ctx.from.last_name} - ${ctx.from.id}`)
  const message = `🙋‍♂️ Hola ${ctx.from.first_name} ${ctx.from.last_name}\n 
A continuacion te indicamos la ID para que cargues en la pagina web\n
📝 Su id es ${ctx.from.id}\n
🌐 http://186.13.28.124:5000\n
🔍 Para ver como validar el ID, usar el comando /info`
  ctx.reply(message)
})

bot.command(['info', 'Info', 'INFO'], (ctx) => {
  const message = `🔷  Para poder usar el bot, debes ingresar a la pagina web y cargar su ID\n
🔷  Una vez cargada la ID, el bot le enviara un mensaje con un Token secreto, el cual debera ingresar en la pagina web para poder vincular su cuenta con el bot.\n \n
🌐 http://186.13.28.124:5000/profile`
  ctx.reply(message)
})

// Launch bot
bot.launch()

module.exports = {
  sendMessage,
  sendMsg
}
