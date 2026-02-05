let timeout = 60000
let poin = 500

let handler = async (m, { conn, command }) => {
    conn.tebakAin = conn.tebakAin ? conn.tebakAin : {}
    let id = m.chat
    if (id in conn.tebakAin) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakAin[id].msg)
        throw false
    }

    let src = await (await fetch('https://github.com/anasmods/Nandimonai/raw/main/game/eye.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `*${command.toUpperCase()}*
❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ┇
*استخدم انسحب للأنسحاب*
❐↞┇الـجـائـزة💰↞ ${poin} نقاط┇
➥ 𝗬𝗮𝘁𝗼 𝗕𝗼𝘁
    `.trim()

    let msg = await conn.sendMessage(m.chat, { image: { url: json.img }, caption }, { quoted: m })
// ᴍᴏᴅᴇ ʙʏ : https://t.me/YatoCoding
    conn.tebakAin[id] = {
        msg,
        json,
        poin,
        timeout: setTimeout(() => {
            if (conn.tebakAin[id]) {
                conn.reply(m.chat, `❮ ⌛┇انتهي الوقت┇⌛❯\n❐↞┇الاجـابـة✅↞ ${json.name}┇`, conn.tebakAin[id].msg)
                delete conn.tebakAin[id]
            }
        }, timeout)
    }
}

handler.help = ['عين']
handler.tags = ['games']
handler.command = /^عين/i

export default handler