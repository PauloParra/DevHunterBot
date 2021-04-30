const Discord = require("discord.js");
// const config = require("./config.json");
const talents = require("./talenthacker");

const client = new Discord.Client();

// descomentar cuando suba a Github
// client.login(config.BOT_TOKEN); 

// Comentar cuando suba a GitHub y descomentar cuando suba a Heroku
client.login("ODM2OTM0Njc1MzgxMDkyMzgy.YIlOKA.QvPikFOUhFtukM1kdeNYed8tEnY");


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