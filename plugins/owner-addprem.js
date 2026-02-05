/*
💎 القسم: [ أدوات المالك ]
📌 الميزة: [ إضافة مميز ]
🏷 النوع: Plugin ESM
♲ الوظيفة: منح المستخدم حالة مميز لعدد محدد من الأيام مع حساب العد التنازلي
✍️ بواسطة:
• https://t.me/YatoCoding
• https://t.me/alkaser_0_0
*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
    // 1) Resolve target JID (normalize to phone-based JID, not LID)
    let rawTarget
    if (m.isGroup) {
        rawTarget = m.mentionedJid?.[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null)
    } else {
        const [numCandidate] = (text || '').trim().split(/\s+/)
        if (numCandidate) rawTarget = numCandidate.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    }

    if (!rawTarget) throw `منشن/رد المستخدم المستهدف أو حط رقم.\n\nمثال:\n• ${usedPrefix + command} @منشن 7\n• ${usedPrefix + command} 967781994494 7`

    // Normalize with built-in helpers to avoid LID keys
    const decoded = typeof conn.decodeJid === 'function' ? conn.decodeJid(rawTarget) : rawTarget
    const jid = typeof conn.getJid === 'function' ? conn.getJid(decoded) : decoded

    // 2) Parse duration (days)
    let daysStr
    if (m.isGroup) {
        // for ".addprem @mention 7" assume last token is days
        const tokens = (text || '').trim().split(/\s+/).filter(Boolean)
        daysStr = tokens.length ? tokens[tokens.length - 1] : undefined
    } else {
        const [, d] = (text || '').trim().split(/\s+/)
        daysStr = d
    }
    const days = parseInt(daysStr, 10)
    if (!days || isNaN(days) || days <= 0) throw `أيام غير صالحة.\n\nمثال:\n• ${usedPrefix + command} @منشن 7\n• ${usedPrefix + command} 967781994494 30`

    // 3) Ensure user record exists under the normalized JID.
    const users = global.db?.data?.users || {}
    // Migrate data if it's stored under a LID or another variant
    if (!users[jid] && users[rawTarget]) users[jid] = users[rawTarget]
    if (!users[jid]) throw `لم يتم العثور على المستخدم في قاعدة البيانات.`

    let userData = users[jid]
    const now = Date.now()
    const addMs = 86400000 * days

    if (userData.role === 'Free user') userData.role = 'Premium user'
    if (now < (userData.premiumTime || 0)) userData.premiumTime += addMs
    else userData.premiumTime = now + addMs
    userData.premium = true

    const countdown = userData.premiumTime - now
    m.reply(`*✔️ تـــم*
📛 الاسم: ${userData.name || (await conn.getName?.(jid)) || jid.split('@')[0]}
📆 الايام: ${days} يوم
⏳ العد التنازلي: ${countdown}`)
}

handler.help = ['رفع مميز'] // addprem <phone number> <days>
handler.tags = ['owner']
handler.command = /^addprem|رفع_مميز|رفع‌مميز?$/i

handler.rowner = true

export default handler
