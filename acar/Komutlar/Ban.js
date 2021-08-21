const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "ban",
    Komut: ["yasakla"],
    Kullanim: "yasakla @acar/ID <sebep>",
    Aciklama: "Belirlenen üyeyi sunucudan yasaklayarak tekrar girmesini engeller.",
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
  let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
  let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
  let sunucudabul = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(sunucudabul && message.member.roles.highest.position <= sunucudabul.roles.highest.position) return message.channel.send("Hata: Yetkiniz aynı yada senden yüksek").then(x => x.delete({timeout: 5000}));
  if(sunucudabul && acar.Roller.banHammer.some(oku => sunucudabul.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Hata:Ban yetkisi olan insanları banlamak yasaktır.").then(x => x.delete({timeout: 5000}));
  if(!acar.Roller.banHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
  if(!acar.Roller.banHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
  
  if(args[0] && args[0].includes('list')) {
    try {
      message.guild.fetchBans().then(bans => {
        message.channel.send(`# Sunucudan yasaklanmış kişiler; ⛔\n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\n# Toplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true});
      });
	  } catch (err) { message.channel.send(`Sistem de yasaklı kullanıcı bulunmamakta!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };
  
  if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return message.channel.send(`Hata: Lütfen geçerli yasaklanmış üye Id girin!  __Örn:__  \`${client.sistem.a_Prefix}ban bilgi @null/ID\``).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send("Belirtilen ID numarasına sahip bir ban bulunamadı!").then(x => x.delete({timeout: 5000})));
  };
  if (qDb.fetch(`bankapat.${message.guild.id}`)) {
    message.channel.send(`Ban komutunu kullanan kişi sunucudan banlanmıştır.`).then(x => x.delete({timeout: 15000}));
    message.guild.members.ban(message.author.id).catch();   
    return; 
    }; 
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!reason) return message.channel.send(`Hata: Lütfen bir sebep giriniz!  __Örn:__  \`${client.sistem.a_Prefix}ban @null/ID <sebep>\``).then(x => x.delete({timeout: 5000}));
  if (reason.length < 1) return message.channel.send(`Hata: Lütfen bir sebep giriniz!  __Örn:__  \`${client.sistem.a_Prefix}ban @null/ID <sebep>\``);
  let ceza = {
    No: cezano,
    Cezalanan: victim,
    Yetkili: message.author.id,
    Tip: "BAN",
    Tur: "Yasaklama",
    Sebep: reason,
    Zaman: Date.now() 
  };
  
  if (!victim) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      kDb.add(`k.${message.author.id}.ban`, 1);
      kDb.push(`k.${victim}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza);
      cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
      if(acar.Kanallar.banLogKanali && client.channels.cache.has(acar.Kanallar.banLogKanali)) client.channels.cache.get(acar.Kanallar.banLogKanali).send(embed.setDescription(`Yasaklayan Yetkili: ${message.author} (\`${message.author.id}\`)\nYasaklanan Üye: ${kisi.tag} (\`${kisi.id}\`)\nSebepi: ${reason}`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`));
    } else {
      message.channel.send(`Hata: Lütfen bir üye veya sebep giriniz!  __Örn:__  \`${client.sistem.a_Prefix}ban @null/ID <sebep>\``).then(x => x.delete({timeout: 5000}));
    };
    return message.reply(`Hata: Lütfen bir üye veya sebep giriniz!  __Örn:__  \`${client.sistem.a_Prefix}ban @null/ID <sebep>\``).then(x => x.delete({timeout: 5000}));
  };
  if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send("Hata: Banlamaya çalıştığın üye senle aynı yetkide veya senden üstün!").then(x => x.delete({timeout: 5000}));
  if(!victim.bannable) return message.channel.send("Hata: __Yönetim/Erişim__ yetersiz bot yetkisi nedeniyle iptal edildi!").then(x => x.delete({timeout: 5000}));
  victim.ban({reason: reason});
  kDb.add(`k.${message.author.id}.ban`, 1);
  kDb.push(`k.${victim}.sicil`, ceza)
  kDb.set(`ceza.${cezano}`, ceza);
  cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
  message.channel.send(embed.setDescription(`${message.author} (\`${message.author.id}\`) isimli yetkili tarafından **${reason}** sebebiyle sunucudan yasaklandın! `).setImage("https://cdn.discordapp.com/attachments/833608929672953866/851685010745720832/ezgif-7-65de6e890b26.gif").setFooter(client.altbaslik + `  • Ceza Numaran: #${cezano}`)).then(x => x.delete({timeout: 25000}));
  message.react("☑️")
if(acar.Kanallar.banLogKanali && client.channels.cache.has(acar.Kanallar.banLogKanali)) client.channels.cache.get(acar.Kanallar.banLogKanali).send(embed.setDescription(`Yasaklayan Yetkili: ${message.author} (\`${message.author.id}\`)\nYasaklanan Üye: ${victim.user.tag} (\`${victim.user.id}\`)\nSebep: ${reason}`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`));
}
};