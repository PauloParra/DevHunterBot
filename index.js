const Discord = require("discord.js");
const talents = require("./talenthacker");


const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

function revisarEnlaces() {
  talents('https://talenthackers.net/spots/', '?rid=Jg7CFCYggrDn')
    .then(urls => {
      console.log(`(${new Date()}) Obtenidos ${urls.length} enlaces nuevos.`)
      for (let url of urls) {
        client.channels.cache.get('801717547090051104').send(url);
      }
    })
    .catch(console.error);
}

client.on('ready', () => {
  console.log(`Bot is ready ${client.user.tag}`);
  //client.user.setActivity('/help', { type: 'LISTENING' });
  revisarEnlaces();
  setInterval(revisarEnlaces, 3600000);
});