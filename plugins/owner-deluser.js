/*
💎 القسم: [ أدوات المالك ]
📌 الميزة: [ حذف المستخدم ]
🏷 النوع: Plugin ESM
♲ الوظيفة: حذف بيانات المستخدمين من قاعدة البيانات في المجموعات
✍️ بواسطة:
• https://t.me/YatoCoding
• https://t.me/alkaser_0_0
*/

let handler = async (m, { conn, text }) => {
    function no(number) {
        return number.replace(/\s/g, '').replace(/([@+-])/g, '');
    }

    let numbers = text.split(/\s+/).map(no);

    if (!numbers.length &&!m.quoted) {
        return conn.reply(m.chat, `*❏ حذف المستخدم*\n\nمنشن المستخدم، اكتب الرقم، أو رد على العضو المراد حذفه من قاعدة البيانات`, m);
    }

    let deletedUsers = [];

    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];

        if (isNaN(number) || number.length > 15) {
            conn.reply(m.chat, `*❏ حذف المستخدم*\n\nالرقم '${number}' غير صحيح!`, m);
            continue;
        }

        let user = number + '@s.whatsapp.net';
        let groupMetadata = m.isGroup? await conn.groupMetadata(m.chat): {};
        let participants = m.isGroup? groupMetadata.participants: [];
        let users = m.isGroup? participants.find(u => u.jid == user): {};

        if (users) {
            delete global.db.data.users[user];
            deletedUsers.push(`@${number}`);
        } else {
            conn.reply(m.chat, `*❏ حذف المستخدم*\n\nالمستخدم برقم @${number} غير موجود في هذه المجموعة!`, m, { mentions: [user] });
        }
    }

    if (deletedUsers.length > 0) {
        conn.reply(m.chat, `*❏ حذف المستخدم*\n\nتم حذف ${deletedUsers.join(', ')} من *قاعدة البيانات* بنجاح`, null, {
            contextInfo: {
                mentionedJid: deletedUsers.map(u => u.replace('@', '') + '@s.whatsapp.net')
            }
        });
    }
}

handler.help = ['تصفير']
handler.tags = ['owner']
handler.command = /^(d(el)?(ete)?(user)?|ha?pu?su(ser)?|تصفير)$/i

handler.owner = true

export default handler
