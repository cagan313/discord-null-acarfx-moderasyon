const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const moment = require('moment');
module.exports = {
    Etkinlik: "guildMemberRemove",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function (member) {
        let acar = client.veri
        if(member.user.bot) return;
    }
  };