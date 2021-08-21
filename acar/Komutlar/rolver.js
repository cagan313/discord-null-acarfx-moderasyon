const { Client, Message, MessageEmbed, Guild, WebhookClient } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri;
const acarveri = client.veri;
module.exports = {
    Isim: "rol",
    Komut: ["rol"],
    Kullanim: "rol <ver-al> <Rol-Id>",
    Aciklama: "Belirlenen üyeye belirlenen rolü verip almak için kullanılır!",
    Kategori: "Yetkili Komutları",
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
    let embed = new MessageEmbed().setColor('#2F3236').setTitle('Rol Ver/Al Logu').setFooter(client.altbaslik)
   let kullanici = message.mentions.users.first() || message.guild.members.cache.get(args[1])
    let x = message.guild.member(kullanici);
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name == args.slice(2).join(' '));
    if (!acar.Roller.roleManager.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emoji(acarveri.Emojiler.Iptal)} ${message.member}, Rol ver/al işlemi için __yeterli yetkiye__ sahip değilsin!`).then(x => x.delete({timeout: 5000}));
    if(args[0] !== "ver" && args[0] !== "al") return message.channel.send(`Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @xeox/ID <EtiketRol/RolID>\``).then(x => x.delete({timeout: 5000}));
    if(!kullanici) return message.channel.send('Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @xeox/ID <EtiketRol/RolID>\`').then(x => x.delete({timeout: 5000}));
    if(!rol) return message.channel.send('Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @xeox/ID <EtiketRol/RolID>\`').then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.comparePositionTo(rol) < 1) {
    return message.channel.send(`Hata: \`Vermek istediğiniz rol sizin rollerinizden üstün!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(rol.name == "S H İ E L D S") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(rol.name == "Owner.") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(rol.name == "CEO") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(rol.name == "Emperor of Shields") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
     }
    if(rol.name == "God of Shields") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
     }
    if(rol.name == "✩★") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
      }
    if(rol.name == "✩") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
     }
    if(rol.name == "✝") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
      }
    if(rol.name == "Danışman / Destek") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
      }
    if(rol.name == "✔️ YETKILI ALIM DM") {
    return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
      }
      if(rol.name == "Öneri İstek Şikayet DM") {
        return message.channel.send(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
          }
if(rol.name == "|| Role manager") {
return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
}
if(rol.name == "|| Warn Skill") {
  return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
  }
  if(rol.name == "|| Ban Skill") {
    return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(rol.name == "|| Jail Skill") {
      return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
      }
      if(rol.name == "|| Voice Mute") {
        return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
        }
        if(rol.name == "|| Chat Mute") {
          return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
          }
          if(rol.name == "|| Jail Skill") {
            return message.channel.send(`Hata: \`null uyarıyor\` (Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
            }
  

    if(args[0] === "ver") {
      try{
        
        await (x.roles.add(rol.id).catch())
              message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)} ${kullanici} (\`${kullanici.id}\`) isimli üyeye \`${rol.name}\` adlı rolü __başarıyla__ verdin.`).then(x => x.delete({timeout: 5000}));
              message.react("✅")
         } catch (e) {
            console.log(e);
            message.channel.send('Hata: \`Sistemsel olarak hata oluştu lütfen @xeox yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
          }
    };
  
    if(args[0] === "al") {
      try{
        await (x.roles.remove(rol.id).catch())
        message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)} ${kullanici} (\`${kullanici.id}\`) isimli üyeden \`${rol.name}\` adlı rolü __başarıyla__ aldın.`).then(x => x.delete({timeout: 5000}));
        message.react("✅")
       
          } catch (e) {
            console.log(e);
            message.channel.send('Hata: \`Sistemsel olarak hata oluştu lütfen @xeox yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
          }
      }
  }
};