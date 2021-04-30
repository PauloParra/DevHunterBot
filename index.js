const Discord = require("discord.js");
// const config = require("./config.json");
const talents = require("./talenthacker");

const client = new Discord.Client();

client.login(config.BOT_TOKEN);
client.login("ODM2OTM0Njc1MzgxMDkyMzgy.YIlOKA.g5wWa-elRXzO5v1FWN-2oAZf4Ck");


let lastestDate = Date.now();

function revisarEnlaces()
{
  talents(lastestDate, 'https://talenthackers.net/spots/', '?rid=Jg7CFCYggrDn')
  .then(result => {    
    lastestDate = result.lastestDate;
    for(let url of result.urls) {
      client.channels.cache.get('801717547090051104').send(url);
      // discord prueba 836477980267249726
      // discord LinkeDevs 801717547090051104
    }
  })
  .catch(console.error);
}

// setInterval(revisarEnlaces, 1 * 60 * 60 * 1000);
setInterval(revisarEnlaces, 1 * 60 * 60 * 1000);


client.on('ready', () => {
  console.log(`Bot is ready ${client.user.tag}`);
  //client.user.setActivity('/help', { type: 'LISTENING' });
  revisarEnlaces();

});