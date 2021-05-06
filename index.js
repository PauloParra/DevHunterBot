const Discord = require("discord.js");
const talents = require("./talenthacker");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

let lastestDate = Date.now(); 

    // BORRAR AL COMPROBAR QUE ENTRA SIEMPRE
let ahoraSon = new Date();

// let fechaActualComprobacion = Date.now(ahoraSon.getHours(),ahoraSon.getMinutes(),ahoraSon.getMinutes());




  function revisarEnlaces()
  {
    // BORRAR AL COMPROBAR QUE ENTRA SIEMPRE
    console.log("Reviso los enlaces. Son las : " + ahoraSon.getHours() + ":" + ahoraSon.getMinutes() + ":" + ahoraSon.getSeconds);

    talents(lastestDate, 'https://talenthackers.net/spots/', '?rid=Jg7CFCYggrDn')
    .then(result => {    
      if (result.lastestDate) {
        lastestDate = result.lastestDate;
        
        for(let url of result.urls) {
          // client.channels.cache.get('801717547090051104').send(url);
          client.channels.cache.get('836477980267249726').send(url);
        }
      }    
    })
    .catch(console.error);
  }


  
  client.on('ready', () => {
    console.log(`Bot is ready ${client.user.tag}`);
    revisarEnlaces(); 
    setInterval(revisarEnlaces, 3600000);



});