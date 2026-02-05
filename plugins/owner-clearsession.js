/*
💎 القسم: [ أدوات المالك ]
📌 الميزة: [ مسح الجلسات ]
🏷 النوع: Plugin ESM
♲ الوظيفة: حذف جميع ملفات الجلسات باستثناء creds.json لإعادة تعيين الجلسات
✍️ بواسطة:
• https://t.me/YatoCoding
• https://t.me/alkaser_0_0
*/

import { join } from 'path'
import { readdirSync, statSync, unlinkSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, dirname, args }) => {
    const sessionsDir = join(dirname, '../sessions')
    const filenames = []

    readdirSync(sessionsDir).forEach(file => {
        if (file!== 'creds.json') {
            filenames.push(join(sessionsDir, file))
        }
    })

    const deletedFiles = []

    filenames.forEach(file => {
        try {
            const stats = statSync(file)
            if (stats.isDirectory()) {
                // تخطي المجلدات
            } else {
                unlinkSync(file)
                deletedFiles.push(file)
            }
        } catch (error) {
            // تجاهل الأخطاء إذا لم يكن الملف موجوداً
        }
    })

    if (deletedFiles.length > 0) {
        conn.reply(m.chat, `✅ تم حذف ${deletedFiles.length} ملف جلسة بنجاح!`, m)
    } else {
        conn.reply(m.chat, 'لا توجد ملفات جلسات للحذف (باستثناء creds.json)', m)
    }
}

handler.help = ['تنظيف']
handler.tags = ['owner']
handler.command = /^(clearsession|clear|تنظيف)$/i
handler.rowner = true

export default handler
