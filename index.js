const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bot = new Discord.Client({disabledEveryone: true})
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
   console.log(`${bot.user.username}is online!`);

   bot.user.setPresence({game: {type: "PLAYING", name: `Helpt op ${client.guilds.size} servers!`}, status: 'online'});

});

bot.on("message", async message => {
   if(message.author.bot) return;
   if(message.channel.type === "dm") return;

   let prefix = botconfig.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);

   if(cmd === `${prefix}kick`){

    //!kick @doesban askin for it
    
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(":warning: Kan de naam niet vinden. :warning:");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":warning: geen permissie ervoor! :warning:");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":warning: Die persoon kan niet verwijderd worden! :warning:");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kicked")
    .setColor("#cc0000")
    .addField("Verwijderde gebruiker", `${kUser} with ID ${kUser.id}`)
    .addField("Verwijderd door", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Verwijderd in", message.channel)
    .addField("De tijd", message.createdAt)
    .addField("Reden", kReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send(":warning: Kan de incidents chat niet vinden. :warning:");

    message.guild.member(kUser).kick(kReason);
    incidentchannel.send(kickEmbed);

   return;
  }

  if(cmd === `${prefix}ban`){

   let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
   if(!bUser) return message.channel.send(":warning: Kan de naam niet vinden. :warning:");
   let bReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":warning: geen permissie ervoor! :warning:");
   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":warning: Die persoon kan niet verbannen worden! :warning:");

   let banEmbed = new Discord.RichEmbed()
   .setDescription("Banned")
   .setColor("#cc0000")
   .addField("Verbannen gebruiker", `${bUser} with ID ${bUser.id}`)
   .addField("Verbannen door", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Banned in", message.channel)
   .addField("De tijd", message.createdAt)
   .addField("Reden", bReason);

   let incidentchannel = message.guild.channels.find(`name`, "incidents");
   if(!incidentchannel) return message.channel.send(":warning: Kan de incidents chat niet vinden. :warning:");

   message.guild.member(bUser).ban(bReason);
   incidentchannel.send(banEmbed);

   return;
  }


 if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(":warning: kan de naam niet vinden. :warning:");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("De Reports")
    .setColor("#800040")
    .addField("Gerapporteerde gebruiker", `${rUser} met ID: ${rUser.id}`)
    .addField("Gerapporteerd door", `${message.author} met ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("De tijd", message.createdAt)
    .addField("Reden", reason);


    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send(":warning: kan de chat: reports niet vinden. :warning:");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
 
 
 
 
  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Informatie")
    .setColor("#800040")
    .setThumbnail(sicon)
    .addField("Server Naam", message.guild.name)
    .addField("Server gemaakt op", message.guild.createdAt)
    .addField("Je bent joined op", message.member.joinedAt)
    .addField("Leden in totaal", message.guild.memberCount)


    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){
   
   let bicon = bot.user.displayAvatarURL;  
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Informatie")
    .setColor("#800040")
    .setThumbnail(bicon)
    .addField("Bot Naam", bot.user.username)
    .addField("Bot gemaakt op", bot.user.createdAt)
    
    return message.channel.send(botembed);

    if(cmd === `${prefix}help`) {
      const embed = new Discord.RichEmbed()
      .setTitle("Help commands voor sollicitaties")
      .setColor("#0040ff")
      .addBlankField()
      .addField("!report", "!Report <user> <reden>")
      .addField("!serverinfo", "krijg informatie over je discord server")
      .addField("!botinfo", "informatie over de bot")
      .addField("!ban", "!ban <user> <reden>")
      .addField("!kick", "!kick <user> <reden>")
      .addBlankField()
  
      message.channel.send({embed});
    }
    
  

 }

}); 

bot.login(botconfig.token);
