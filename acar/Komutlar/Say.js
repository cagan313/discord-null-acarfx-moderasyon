const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
module.exports = {
    Isim: "say",
    Komut: ["istatistik", "sesli"],
    Kullanim: "say",
    Aciklama: "Sunucunun bütün verilerini gösterir",
    Kategori: "Üye",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    if(!acarveri.Roller.istatistikciRolleri.some(rol => message.member.roles.cache.has(rol)) &&!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hata: Bu komutu kullanmak için yeterli izne sahip değilsin!`).then(x => x.delete({timeout: 5000}));
  let ekipRolu = acar.ekipRolu || undefined;
  let erkekRolu = acar.erkekRol || undefined;
  let kizRolu = acar.kadinRol || undefined;
  let boosterRolu = acarveri.Roller.boosterRolu || undefined;
  const embed = new MessageEmbed().setColor("#2F3136").setAuthor(acarveri.sunucuIsmi, message.guild.iconURL({ dynamic: true })).setFooter(client.altbaslik).setAuthor(acarveri.Tag + " " + acarveri.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
  message.channel.send(embed.setDescription(`**${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.memberCount}\` kişi bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}\` aktif kişi bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.members.cache.filter(u => u.user.username.includes(acarveri.Tag)).size}\` taglı üye bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuzu boostlayan \`${message.guild.roles.cache.get(boosterRolu).members.size}\` kişi bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Ses kanallarında \`${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}\` kişi bulunmakta.**`)).then(x => x.delete({timeout:10000}));
message.react("☑️") 
    }
};
