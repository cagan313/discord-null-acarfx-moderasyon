const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri;
module.exports = {
    Isim: "salla",
    Komut: ["salla"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "",
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.").then(sil => sil.delete({timeout: 5000}));
    let rolsuzuye =  message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0);
    rolsuzuye.forEach(roluolmayanlar => { acar.kayıtRolleri.kayıtsızRolleri.some(x => roluolmayanlar.roles.add(x)) });
    message.channel.send(embed.setDescription(`Sunucuda rolü olmayan \`${rolsuzuye.size}\` kişiye kayıtsız rolü verildi!`)).then(x => x.delete({timeout: 8000}));
    message.react("☑️")
    }
};