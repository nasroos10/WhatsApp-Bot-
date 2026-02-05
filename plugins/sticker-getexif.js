/*
💎 القسم: [ أدوات الملصقات ]
📌 الميزة: [ استخراج بيانات EXIF ]
🏷 النوع: Plugin ESM
♲ الوظيفة: استخراج بيانات EXIF من الملصقات لمعرفة اسم الحزمة والمؤلف
✍️ بواسطة:
• https://t.me/YatoCoding
• https://t.me/alkaser_0_0

*/

import { format } from 'util'
const { default: { Image } } = await import('node-webpmux')

let handler = async (m) => {
    if (!m.quoted) return m.reply('رد على الملصق!')
    if (/sticker/.test(m.quoted.mtype)) {
        let img = new Image()
        await img.load(await m.quoted.download())
        m.reply(format(JSON.parse(img.exif.slice(22).toString())))
    }
}

handler.help = ['الملصق']
handler.tags = ['maker']
handler.command = ['getexif', 'الملصق']

handler.register = true

export default handler
