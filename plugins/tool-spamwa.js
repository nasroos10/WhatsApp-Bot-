let handler = async (m, { conn, text }) => {
    let [nomor, pesan, jumlah] = text.split('|')
    if (!nomor) throw '- التنسيق: *#سبام رقم|النص|العدد*\n- مثال: *.سبام 967781994494|جرب هذا|50*'
    if (!pesan) throw '- التنسيق: *#سبام رقم|النص|العدد*\n- مثال: *.سبام 967781994494|جرب هذا|50*'
    if (jumlah && isNaN(jumlah)) throw '- التنسيق: *.سبام رقم|النص|العدد*\n- مثال: *.سبام 967781994494|جرب هذا|50*'

    let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^/g, '62') + '@s.whatsapp.net'
    let fixedJumlah = jumlah? jumlah * 1: 10
    if (fixedJumlah > 50) throw '*الحد الأقصى 50 رسالة*'

    await m.reply(`*تم الإرسال بنجاح إلى هذا الرقم*\nالعدد المتوقع المرسل *${fixedJumlah}*`)

    for (let i = 0; i < fixedJumlah; i++) {
        let teks = `${pesan.trim()}\n\n[${i + 1}/${fixedJumlah}]`; // إضافة معلومات التكرار في الرسالة
        await conn.relayMessage(fixedNumber, {
            text: teks,
            extendedTextMessage: {
                text: teks,
            },
        }, {})
    }
}

handler.help = ['سبام <رقم>|<رسالة>|<عدد الرسائل>']
handler.tags = ['tools']
handler.command = /^سبام|spam(wa)?$/i

handler.register = true
handler.group = false
handler.owner = true
handler.private = true
handler.limit = 10

export default handler
