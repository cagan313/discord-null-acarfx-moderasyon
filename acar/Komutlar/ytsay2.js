const ms = require('ms')
const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri;


module.exports = {
    Isim: "rd",
    Komut: ["roldenetim"],
    Kullanim: "roldenetim <Rol-ID>",
    Aciklama: "",
    Kategori: "Yönetim",
    
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
    let embed = new MessageEmbed().setAuthor(("Null"), message.guild.iconURL({dynamic: true, size: 2048})).setColor("RED")
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Hata: Yeterli yetkiniz yok"); 
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.channel.send("Hata: Bir rol belirlenmedi!" + ` \`.rd <Rol ID>\``);
    let members = role.members.array();
    let sesteOlmayanlar = members.filter(member => !member.voice.channelID);  
    let sesteOlanlar = members.filter(member => member.voice.channel);
     message.channel.send("Rol Bilgisi : " + role.name + " | " + role.id + " | " + role.members.size + " Toplam Üye | " + sesteOlmayanlar.length + " Seste Olmayan Üye" , { code: "fix", split: true });
     if(sesteOlanlar.length >= 1) message.channel.send(embed.setDescription(`\`${role.name}\` isimli rolde seste bulunan üyeleri aşağı sıraladım kopyalarak etiket atabilirsin veya profillerini görebilirsin.\n\`\`\`${sesteOlanlar.join(`, `)}\`\`\``)).catch(acar => {
      let dosyahazırla = new MessageAttachment(Buffer.from(sesteOlanlar.slice().join(`\n`)), `${role.id}-sesteolanlar.txt`);
      message.channel.send(`:no_entry_sign: ${role.name} isimli rolün __seste olanları__ **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim.`, dosyahazırla)});
     if(sesteOlmayanlar.length >= 1) message.channel.send(`${sesteOlmayanlar.slice(0, sesteOlmayanlar.length/1).join(`, `)}`, { code: "diff", split: true}).catch(acar => {
      let dosyahazırla = new MessageAttachment(Buffer.from(sesteOlmayanlar.slice().join(`\n`)), `${role.id}-sesteolmayanlar.txt`);
      message.channel.send(`:no_entry_sign: ${role.name} isimli rolün __seste olmayanları__ **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim.`, dosyahazırla)});
   }
};