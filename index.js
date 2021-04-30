const Discord = require("discord.js");
const config = require("./config.json");
const talents = require("./talenthacker");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

let lastestDate = Date.now();

function revisarEnlaces()
{
  talents(lastestDate, process.env.TH_URL, process.env.TH_AFFILIATE)
  .then(result => {    
    lastestDate = result.lastestDate;
    for(let url of result.urls) {
      client.channels.cache.get(process.env.DISCORD_CHANNEL).send(url);
    }
  })
  .catch(console.error);
}

setInterval(revisarEnlaces, process.env.INTERVAL);

client.on('ready', () => {
  console.log(`Bot is ready ${client.user.tag}`);
  //client.user.setActivity('/help', { type: 'LISTENING' });
  revisarEnlaces(); // BORRAME
});