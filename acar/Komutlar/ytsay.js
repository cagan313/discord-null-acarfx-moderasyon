const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri;
module.exports = {
    Isim: "rolsay",
    Komut: ["rsay"],
    Kullanim: "rolsay <Rol-ID>",
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
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Hata: Yeterli yetkiniz bulunmamaktadır."); 
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => x.name.match(new RegExp(args.join(' '), 'gi')));
    if (!args[0] || !role || role.id === message.guild.id) return message.channel.send('Hata: Belirtilen rol bulunamadı yada rol numarası geçersiz!');
    message.channel.send(`Rol: ${role.name} | ${role.id} (${role.members.size < 1 ? 'Bu rolde hiç üye yok!' : role.members.size})`, { code: 'xl' });
    message.channel.send(role.members.array().map((x) => x.toString()).join(', '), { code: 'xl', split: { char: ', ' } });
   }
};