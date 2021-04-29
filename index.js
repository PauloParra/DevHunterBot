const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.on("message", function(message) {
  if (message.author.bot) return;
  
  console.log(`${message.author.username}: ${message.content}`);
});

client.login(config.BOT_TOKEN);