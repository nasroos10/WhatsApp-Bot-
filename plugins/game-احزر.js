let timeout = 60000
let poin = 500

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera || {}
    let id = m.chat

    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakbendera[id][0])
        throw false
    }

    // جلب البيانات من whois.json
    let src = await (await fetch('https://github.com/anasmods/Nandimonai/raw/main/game/whois.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]

    let caption = `*${command.toUpperCase()}*
❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ┇
*استخدم انسحب للأنسحاب*
❐↞┇الـجـائـزة💰↞ ${poin} نقاط┇
➥ 𝗬𝗮𝘁𝗼 𝗕𝗼𝘁
`.trim()

    // إرسال الصورة كرابط مباشر
    let sentMsg = await conn.sendMessage(m.chat, {
        image: { url: json.img },
        caption: caption
    }, { quoted: m })
// ᴍᴏᴅᴇ ʙʏ : https://t.me/YatoCoding
    conn.tebakbendera[id] = [
        sentMsg,
        json,
        poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) {
                conn.reply(m.chat, `❮ ⌛┇انتهي الوقت┇⌛❯\n❐↞┇الاجـابـة✅↞ ${json.name}┇`, conn.tebakbendera[id][0])
                delete conn.tebakbendera[id]
            }
        }, timeout)
    ]
}

handler.help = ['احزر']
handler.tags = ['game']
handler.command = /^احزر/i

export default handler