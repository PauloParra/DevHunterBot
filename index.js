const Discord = require("discord.js");
const talents = require("./talenthacker");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

let lastestDate = Date.now(); // 24 horas en milisegundos

let fechaActualComprobacion = new Date();
let horaActualComprobacion = fechaActualComprobacion.getHours() + 2;
let minActualComprobacion = fechaActualComprobacion.getMinutes();


  function revisarEnlaces()
  {
    console.log("Reviso los enlaces. Son las : " + horaActualComprobacion + ":" +minActualComprobacion);
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
    // setInterval(revisarEnlaces, 3600000);
    setInterval(revisarEnlaces, 60000);



});