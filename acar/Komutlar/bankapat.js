const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const kullanicicinsiyet = new db.table("aCinsiyet");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
const Ayarlar = client.veri.tepkiId;
const acarkanallar = client.veri.Kanallar;
module.exports = {
    Isim: "mban",
    Komut: ["mban"],
    Kullanim: "mban aç/kapat",
    Aciklama: "Belirlenen üyeyi sunucu da kadın olarak kayıt eder.",
    Kategori: "Kayıt Komutları",
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

    let embed = new MessageEmbed().setColor('0x2f3136').setFooter(client.altbaslik).setAuthor(acarveri.Tag + " " + acarveri.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))

if (!message.member.hasPermission("ADMINISTRATOR")) return;

if(!args[0]) {
message.react(no);
message.channel.send(embed.setDescription(`Hata: Komutu yanlış kullandınız .mban aç/kapat`)).then(x => x.delete({timeout: 5000}));
return;    
}
if (args[0] === "aç") {
if(db.fetch(`bankapat.${message.guild.id}`)) return message.channel.send(embed.setDescription(`Ban kapatma işlemi aktif`)).then(x => x.delete({timeout: 5000}));
db.set(`bankapat.${message.guild.id}`, "bankapat")
message.channel.send(embed.setDescription(`Sistem aktifleştirldi.`)).then(x => x.delete({timeout: 5000}));
return;    
} else if (args[0] === "kapat") {
if(!db.fetch(`bankapat.${message.guild.id}`)) return message.channel.send(embed.setDescription(`Ban kapatma sistemi kapalı`)).then(x => x.delete({timeout: 5000}));
db.delete(`bankapat.${message.guild.id}`)
message.channel.send(embed.setDescription(`Sistem devredışı bırakıldı.`)).then(x => x.delete({timeout: 5000}));
return;    
}
}
};