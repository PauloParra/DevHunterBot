const Discord = require("discord.js");
const talents = require("./talenthacker");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

let lastestDate = Date.now();


  function revisarEnlaces()
  {
    console.log("Revisar enlaces");
    talents(lastestDate, 'https://talenthackers.net/spots/', '?rid=Jg7CFCYggrDn')
    .then(result => {    
      if (result.lastestDate) {
        lastestDate = result.lastestDate;
  
        for(let url of result.urls) {
          client.channels.cache.get('801717547090051104').send(url);
        }
      }    
    })
    .catch(console.error);
  }


setInterval(revisarEnlaces, 1 * 60 * 60 * 1000);

client.on('ready', () => {
  console.log(`Bot is ready ${client.user.tag}`);
  revisarEnlaces(); 
});