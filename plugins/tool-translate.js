import { translate } from '@vitalets/google-translate-api'

var handler = async (m, { args, usedPrefix, command }) => {
 let lang, text
 if (args.length >= 2) {
  lang = args? args: 'ar', text = args.slice(1).join(' ')
 } else if (m.quoted && m.quoted.text) {
  lang = args? args: 'ar', text = m.quoted.text
 } else throw `*مثال:* ${usedPrefix + command} en مرحبا أنا روبوت`
 let res = await translate(text, { to: lang }).catch(_ => null)
 if (!res) throw `خطأ: اللغة "${lang}" غير مدعومة`
 m.reply(`*اللغة المكتشفة:* ${res.raw.src}\n*إلى اللغة:* ${lang}\n\n*النص الأصلي:* ${res.raw.sentences.orig}\n*الترجمة:* ${res.raw.sentences.trans}`.trim())
}

handler.help = ['ترجمة'].map(v => v + ' <اللغة> <النص>')
handler.tags = ['tools']
handler.command = /^(ترجمة|تر|tr(anslate)?)$/i

handler.register = true

export default handler
