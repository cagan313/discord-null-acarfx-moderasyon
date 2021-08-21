const { GuildMember, MessageEmbed,Client} = require("discord.js");
const moment = require('moment');
const fs = require('fs');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    
    },
    /**
     * @param {client} ready
     */
    onRequest: async function () {    
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] Bot başarıyla açıldı.`);
    client.user.setPresence({ activity: { name: "null 💛 shields" }, status: "idle" });
    client.channels.cache.get('856588822590521345').join().catch(err => console.error("Ses kanalına giriş başarısız"));
    }
  };