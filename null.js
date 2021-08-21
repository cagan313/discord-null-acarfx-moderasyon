const { Client, Discord, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const moment = require('moment')
global.client = client;
require("moment-duration-format")
moment.locale('tr')
const fs = require("fs");
client.komutlar = new Collection();
client.komut = new Collection();
client.veri = require("./acar/acar-veri.json");
client.sistem = require("./acar/acar-ayar.json");
client.modüller = {}; 
const acar = client.veri
const nulll = client.sistem
client.altbaslik = "null 💛 shields"
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const cezaDb = new qDb.table("aCezalar");
fs.readdir("./acar/Komutlar", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`[ ${files.length} ] Adet NULL Komutları Yüklenecek!`);
    files.forEach(file => {
        let referans = require(`./acar/Komutlar/${file}`);
  if(typeof referans.onLoad === "function") referans.onLoad(client);
            client.komutlar.set(referans.Isim, referans);
            if (referans.Komut) {
              referans.Komut.forEach(alias => client.komut.set(alias, referans));
            }
          });
});

  fs.readdir("./acar/Etkinlikler/", (err, files) => {
    if (err) return console.myTime(err);
    files.forEach(fileName => {
      let referans = require("./acar/Etkinlikler/" + fileName);
        referans.onLoad(client);
        client.on(referans.Etkinlik, referans.onRequest);
      console.log(
        `[~ NULL ~ ] (${fileName}) isimli etkinlik yüklendi.`
      );
    });
  });

  client.on('message', function() {
    { 
     var interval = setInterval (function () {
       process.exit(0);
     }, 1 * 14400000); 
   }
  });
 

client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    const dmlog = new MessageEmbed()
      .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
      .setColor("BLUE")
      .addField("Mesajı Gönderen", ` \`\`\` ${message.author.tag} \`\`\` `)
      .addField("Mesajı Gönderenin ID", ` \`\`\`${message.author.id}\`\`\` `)
      .addField(`Gönderilen Mesaj`, message.content)
      .setThumbnail(message.author.avatarURL());
    client.channels.cache.get(client.veri.Kanallar.mesajLogKanali).send(dmlog);
  }
});

 client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.cache.get(client.veri.Kanallar.mesajLogKanali)
  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL())
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL())
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel2.send(embed);
  
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.cache.get(client.veri.Kanallar.mesajLogKanali)
  if (oldMessage.content == newMessage.content) return;
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL())
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel3.send(embed)
});



client.on("message", (message) => {
if([".tag", "!tag"].includes(message.content.toLowerCase())){ 
    return message.channel.send('`✬`'); 
  }
    if (!message.content.startsWith(client.sistem.a_Prefix) || !message.channel || message.channel.type == "dm") return;
    let args = message.content
      .substring(client.sistem.a_Prefix.length)
      .split(" ");
    let komutcuklar = args[0];
    let bot = message.client;
    args = args.splice(1);
    let calistirici;
    if (bot.komut.has(komutcuklar)) {
      calistirici = bot.komut.get(komutcuklar);
    
      calistirici.onRequest(bot, message, args);
    } else if (bot.komutlar.has(komutcuklar)) {
      calistirici = bot.komutlar.get(komutcuklar);
      calistirici.onRequest(bot, message, args);
    }
});


  client.gecmisTarihHesaplama = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
  
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
  
    var string = "";
    if (years > 0) string += `${years} yıl`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;
  
    string = string.trim();
    return `\`${string} önce\``;
  };
let anliktarih = Date.now()
let aylartoplam = {
  "01": "Ocak",
  "02": "Şubat",
  "03": "Mart",
  "04": "Nisan",
  "05": "Mayıs",
  "06": "Haziran",
  "07": "Temmuz",
  "08": "Ağustos",
  "09": "Eylül",
  "10": "Ekim",
  "11": "Kasım",
  "12": "Aralık"
};
let aylar = aylartoplam;
client.tarihsel = moment(anliktarih).format("DD") + " " + aylar[moment(anliktarih).format("MM")] + " " + moment(anliktarih).format("YYYY HH:mm")
client.emoji = function(x) {
  return client.emojis.cache.get(x);
};
client.on("guildMemberAdd", async member => {
          if(member.id == client.sistem.a_sID) {
              member.roles.add(client.veri.Roller.botcuRolu) 
              return
          };
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        '0': `<a:00:852781537216692224>`,
        '1': `<a:11:852781537375158272>`,
        '2': `<a:22:852781537233469450>`,
        '3': `<a:33:852781537141587991>`,
        '4': `<a:44:852781537282752513>`,                  
        '5': `<a:55:852781539476897822>`,
        '6': `<a:66:852781537443184670>`,
        '7': `<a:77:852781537580548096>`,
        '8': `<a:88:852781537313423380>`,
        '9': `<a:99:852781537464025146>`}[d];
          })
        }
            
          let acarkalkmazban = qDb.get(`akb_${member.guild.id}`)
          if(acarkalkmazban && acarkalkmazban.some(id => `k${member.user.id}` === id)) return;
          let acar = client.veri;
          const id = acar.Kanallar.kayıtkanalı
          const kanalaq = member.guild.channels.cache.get(id);
          let acarveri = db.get("ayar") || {};
          let cezalılar = cezaDb.get("cezalı") || [];
          let kalıcıcezalılar = cezaDb.get("kalıcıcezalı") || [];
          let yasakTaglilar = cezaDb.get("yasakTaglilar") || [];
          let kalicisusturulma = cezaDb.get("kalicisusturulma") || [];
          let sürelisusturma = cezaDb.get("susturulma") || [];
          let sessusturulma = cezaDb.get("sessusturulma") || [];
        
          let guvenili = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
          if (acarveri.yasakTaglar && !acarveri.yasakTaglar.some(tag => member.user.username.includes(tag)) && yasakTaglilar.some(x => x.includes(member.id))) await cezaDb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(member.id)));
           if (acarveri.yasakTaglar && acarveri.yasakTaglar.some(tag => member.user.username.includes(tag))) {
           if(acar.Roller.yasakliTagRolu) member.roles.set([acar.Roller.yasakliTagRolu]).catch();
      if (!yasakTaglilar.some(id => id.includes(member.id))) cezaDb.push('yasakTaglilar', `y${member.id}`);
      member.send(`**${acar.Tag} ${acar.sunucuIsmi}** Yasak tag'da bulunduğunuz için otomatik olarak cezalıya atıldınız tagı çıkartana kadar cezalıda kalmaya devam ediceksin.`).catch();
    } else if (guvenili) {
            if(acar.Roller.supheliRolu) member.roles.set([acar.Roller.supheliRolu]).catch();
            if(acar.Kanallar.supheliLogKanali && member.guild.channels.cache.has(acar.Kanallar.supheliLogKanali)) return;
          } else if(acar.kayıtRolleri.kayıtsızRolleri) member.roles.add(acar.kayıtRolleri.kayıtsızRolleri).catch();
          if(sürelisusturma.some(x => x.id === member.id) || kalicisusturulma.some(x => x.includes(member.id))) member.roles.add(acar.Roller.muteRolu).catch();
          if(sessusturulma.some(x => x.id === member.id) && member.voice.channel) member.voice.setMute(true).catch();
          if(acar.IkinciTag) member.setNickname(`${acar.IkinciTag} İsim | Yaş`).catch();
          else if(acar.Tag) member.setNickname(`${acar.Tag} İsim | Yaş`).catch();
          var gün = moment(member.user.createdAt).format('DD')
          if(moment(member.user.createdAt).format('DD') === '01') {
             var gün = '1'
             }
          if(moment(member.user.createdAt).format('DD') === '02') {
             var gün = '2'
           }
          if(moment(member.user.createdAt).format('DD') === '03') {
             var gün = '3'
           }
          if(moment(member.user.createdAt).format('DD') === '04') {
             var gün = '4'
           }
          if(moment(member.user.createdAt).format('DD') === '05') {
             var gün = '5'
           }
          if(moment(member.user.createdAt).format('DD') === '06') {
             var gün = '6'
           }
          if(moment(member.user.createdAt).format('DD') === '07') {
             var gün = '7'
           }
          if(moment(member.user.createdAt).format('DD') === '08') {
             var gün = '8'
           }
          if(moment(member.user.createdAt).format('DD') === '09') {
             var gün = '9'
           }
          var tarih = ''
          if(moment(member.user.createdAt).format('MM') === '01') {
              var tarih = `${gün} Ocak ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '02') {
              var tarih = `${gün} Şubat ${moment(member.user.createdAt).format('YYYY')}${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '03') {
              var tarih = `${gün} Mart ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '04') {
              var tarih = `${gün} Nisan ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '05') {
              var tarih = `${gün} Mayıs ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '06') {
              var tarih = `${gün} Haziran ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '07') {
              var tarih = `${gün} Temmuz ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '08') {
              var tarih = `${gün} Ağustos ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '09') {
              var tarih = `${gün} Eylül ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '10') {
              var tarih = `${gün} Ekim ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '11') {
              var tarih = `${gün} Kasım ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '12') {
              var tarih = `${gün} Aralık ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          
kanalaq.send(`
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif1)} Sunucumuza Hoşgeldiniz.\n
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif2)} ${member} <:cizgi:831824722291326986> \`${member.id}\` hesabın ${client.gecmisTarihHesaplama(member.user.createdAt)} oluşturulmuş. \n
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif3)} Sunucumuz seninle birlikte ${üyesayısı} kişiye ulaştı.\n 
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif3)} Sol tarafta bulunan <#856588821662662713> kanalında kayıt olabilirsin.\n 
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif6)} Sunucu kurallarımız <#${acar.Kanallar.kurallarKanal}> kanalında belirtilmiştir.\n
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif4)} <@&${acar.kayıtRolleri.kayıtYapanRoller}> rolündeki arkadaşlar seninle ilgilenecek.\n 
${client.emojis.cache.get(acar.Emojiler.hosgeldinGif5)} Ailemize katılmak istersen \`.tag\` Yazabilirsin.\n 

`); 
});
const dbb = require("croxydb");

client.on("guildMemberRemove", async member => {
  dbb.set(`isim.${member.id}`, member.displayName)
});
client.on("guildMemberAdd", async member => {
  let nick = await dbb.get(`isim.${member.id}`)
  await member.setNickname(nick)
  await dbb.delete(`isim.${member.id}`);
});

let meme = 0;
let am = [
  "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
  "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
  "Mavi gözlerin, gökyüzü oldu dünyamın.",
  "Seni gören kelebekler, narinliğin karşısında mest olur.",
  "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
  "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
  "Huzur kokuyor geçtiğin her yer.",
  "En güzel manzaramsın benim, seyretmeye doyamadığım.",
  "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
  "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
  "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
  "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
  "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
  "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
  "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
  "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
  "Etkili gülüş kavramını ben senden öğrendim.",
  "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
  "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
  "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan h er toprak benim de vatanımdır.",
  "Gözlerinle baharı getirdin garip gönlüme.",
  "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
  "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
  "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
  "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
  "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
  "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
  "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
  "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
  "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
  "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
  "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
  "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
  "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
  "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
  "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
  "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
  "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim."];

client.on("message", async msg => {
if (msg.channel.id == acar.Kanallar.chatKanali && !msg.author.bot) {
  meme++;
  if (meme >= 100) {
    meme = 0;
    let yarrak = am[Math.floor(Math.random() * am.length)];
    msg.reply(yarrak);
  }
}
});

client.login(client.sistem.a_Token).catch(err => console.error("[~ AM ~] Discord API Botun tokenini doğrulayamadı."));
