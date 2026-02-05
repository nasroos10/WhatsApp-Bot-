/*
Author : Shirokami Ryzen 
WA : +6285174269046
Base : Elaina-MultiDevice
Release : 22 Nov 2022
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU =============*/
let wktuwib = moment.tz('Asia/Aden').format('HH:mm:ss') + ' WIB';
let wktuwita = moment.tz('Asia/Aden').format('HH:mm:ss') + ' WITA';
let wktuwit = moment.tz('Asia/Aden').format('HH:mm:ss') + ' WIT';
global.gabung = wktuwib + '\n' + wktuwita + '\n' + wktuwit;
let d = new Date(new Date + 3600000)
let locale = 'id'

let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

/*============= MAIN INFO =============*/
global.pairing = '967734622855'
global.owner = [['967734622855', 'ShirokamiRyzen', true]]
global.mods = []
global.prems = []
global.nomorbot = '967734622855'
global.nomorown = '967734622855'

/*============= WATERMARK =============*/
global.readMore = readMore
global.author = 'Anas Mods'
global.namebot = 'Yato Bot'
global.wm = '© Yato Bot By Anas Mods'
global.watermark = wm
global.botdate = `⫹⫺ DATE: ${week} ${date}\n⫹⫺ 𝗧𝗶𝗺𝗲: ${wktuwib}`
global.bottime = `T I M E : ${wktuwib}`
global.stickpack = `Made By ${namebot}\n\nYato Bot | Anas Mods\n+${nomorbot}`
global.stickauth = `© Yato Bot By Anas Mods`
global.week = `${week} ${date}`
global.wibb = `${wktuwib}`
global.botname = '〈 اميرهم 〉';
global.botname2 = 'اميرهم';
global.devname = '〘 اميرهم 〙';
global.byanas = '> *_ʙʏ : Nasr-Alamri_* ▒';

/*============== SOCIAL ==============*/
global.sig = 'https://www.instagram.com/rzx_6?igsh=cTZqMjIwbWt6OTF2'
global.sdc = '-'
global.snh = 'https://www.instagram.com/rzx_6?igsh=cTZqMjIwbWt6OTF2'

/*============== PAYMENT ==============*/
global.pdana = '967774849209'
global.qris = 'https://api.ryzumi.vip/images/qris.png'
global.psaweria = 'https://saweria.co/shirokamiryzen'

/*============= RESPON =============*/
global.wait = 'Please Wait...'
global.eror = 'Error!'

/*============= API =============*/
global.APIs = {
  ryzumi: 'https://api.ryzumi.vip',

}

/*============= API KEY =============*/
global.APIKeys = {
  // 'https://website': 'apikey'
}

/*=========== TYPE DOCUMENT ===========*/

global.djson = 'application/json'

/*=========== HIASAN ===========*/
// DEFAULT MENU
global.dmenut = 'ଓ═┅═━–〈' //top
global.dmenub = '┊↬' //body
global.dmenub2 = '┊' //body for info cmd on Default menu
global.dmenuf = '┗––––––––––✦' //footer

// COMMAND MENU
global.dashmenu = '┅━━━═┅═❏ *ღ *Nasros10* ღ* ❏═┅═━━━┅'
global.cmenut = '❏––––––『'                       //top
global.cmenuh = '』––––––'                        //header
global.cmenub = '┊❀'                            //body
global.cmenuf = '┗━═┅═━––––––๑\n'                //footer
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ' //after
global.pmenus = '┊'                              //pembatas menu selector

global.htki = '––––––『' // Hiasan Titile (KIRI)
global.htka = '』––––––' // Hiasan Title  (KANAN)
global.lopr = 'Ⓟ' //LOGO PREMIUM ON MENU.JS
global.lolm = 'Ⓛ' //LOGO LIMIT/FREE ON MENU.JS
global.htjava = '⫹⫺'    //hiasan Doang :v
global.hsquere = ['⛶', '❏', '⫹⫺']

global.multiplier = 0

//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
