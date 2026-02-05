
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import { platform as getPlatform } from 'os'

const defaultMenu = {
  before: `
● *الاسم:* %name
● *الرقم:* %tag
● *الحالة:* %prems
● *الحد:* %limit
● *الرتبة:* %role

*${ucapan()} %name!*
● *اليوم:* %week
● *الموافق:* %date
● *هجري:* %dateIslamic
● *الوقت:* %time

● *اسم البوت:* %me
● *الوضع:* %mode
● *البادئة:* [ *%_p* ]
● *النظام:* %platform
● *النوع:* Node.JS
● *مدة التشغيل:* %muptime
● *قاعدة البيانات:* %rtotalreg من %totalreg

⬣───「 *معلومات الأوامر* 」───⬣
│ *Ⓟ* = للمميزين
│ *Ⓛ* = يستهلك حد
▣────────────⬣
  `.trimStart(),
  header: '╭─────『 %category 』',
  body: '  ⫸ %cmd %isPremium %islimit',
  footer: '╰–––––––––––––––༓',
  after: ``,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {

  let tags = {
    'main': 'القائمة الرئيسية',
    'ai': 'ذكاء اصطناعي',
    'memfess': 'الرسائل السرية',
    'stalk': 'تتبع الحسابات',
    'downloader': 'التحميلات',
    'internet': 'الإنترنت',
    'anime': 'أنمي',
    'maker': 'صانع الصور',
    'tools': 'الأدوات',
    'group': 'إدارة المجموعات',
    'info': 'معلومات',
    'owner': 'المالك',
  }

  try {
    let dash = global.dashmenu
    let m1 = global.dmenut
    let m2 = global.dmenub
    let m3 = global.dmenuf
    let m4 = global.dmenub2

    let cc = global.cmenut
    let c1 = global.cmenuh
    let c2 = global.cmenub
    let c3 = global.cmenuf
    let c4 = global.cmenua

    let lprem = global.lopr
    let llim = global.lolm
    let tag = `@${m.sender.split('@')[0]}`
    let ucpn = `${ucapan()}`
    let d = new Date(new Date + 3600000)
    let locale = 'ar'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let weton = ['باهينغ', 'بون', 'واجِه', 'كليوون', 'ليجي'][Math.floor(d / 84600000) % 5]
    let dateIslamic = Intl.DateTimeFormat('ar-YE-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)

    let usrs = db.data.users[m.sender]
    let wib = moment.tz('Asia/Aden').format('HH:mm:ss')
    let wibh = moment.tz('Asia/Aden').format('HH')
    let wibm = moment.tz('Asia/Aden').format('mm')
    let wibs = moment.tz('Asia/Aden').format('ss')
    let wktuwib = `${wibh} س ${wibm} د ${wibs} ث`

    let mode = db.data.settings[conn.user.jid].public ? 'عام' : 'خاص'
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}

    let { age, exp, limit, level, role, registered, money } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'مميز' : 'مجاني'}`
    let sysPlatform = getPlatform()

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }))

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }

    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `⚙️ تشغيل بواسطة https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after

    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%_p' + help)
                .replace(/%islimit/g, menu.limit ? llim : '')
                .replace(/%isPremium/g, menu.premium ? lprem : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')

    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[رابط GitHub غير معروف]',
      tag, dash, m1, m2, m3, m4, cc, c1, c2, c3, c4, lprem, llim,
      ucpn, platform: sysPlatform, wib, mode, _p, money, age, name, prems, level, limit, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }

    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let fkon = {
      key: {
        fromMe: false,
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: '16500000000@s.whatsapp.net' } : {})
      },
      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:هاتف\nEND:VCARD`,
          verified: true
        }
      }
    }

    conn.sendMessage(m.chat, {
      text: text,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://ar-hosting.pages.dev/1760914992256.jpg',
          sourceUrl: sgc,
        }
      }
    }, { quoted: fkon })

  } catch (e) {
    conn.reply(m.chat, 'عذرًا، حدث خطأ أثناء عرض القائمة ⚠️', m)
    throw e
  }
}

handler.help = ['الاوامر']
handler.tags = ['main']
handler.command = /^(اوامر|الاوامر|menu|help|\?)$/i
handler.register = true
handler.exp = 3

export default handler

//----------- الدوال المساعدة -------

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, ' س ', m, ' د ', s, ' ث '].map(v => v.toString().padStart(2, 0)).join('')
}

function ucapan() {
  const time = moment.tz('Asia/Aden').format('HH')
  let res = "لم تنم بعد؟ 🥱"
  if (time >= 4) res = "صباح الخير ☀️"
  if (time >= 10) res = "نهارك سعيد 🌞"
  if (time >= 15) res = "مساء الخير 🌇"
  if (time >= 18) res = "مساء هادئ 🌙"
  return res
}