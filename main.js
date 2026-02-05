/* If You Copy, Don`t Delete This Credit!!! 
  Don`t Sell This Script Or I Take Immediately 
  Yang Jual Script Ini Report/Hangusin Aja Akunnya Atau Pukulin ae orangnya
  Move To Pairing Code
  Buat Yg Nggk muncul Codenya Itu Disebabkan Oleh Banyaknya Plugins
  Jika Ingin Mengambil Sesi, Backup Semua File Plugins & Hapus Semua File Plugins
  Setelah Sudah Kalian Bisa Mengembalikan Semua File Pluginsnya Agar Bisa Dipakai
  Regards from YanXiao ♡
*/

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import './config.js'
import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
const argv = yargs(hideBin(process.argv)).argv;

import { spawn } from 'child_process'
import syntaxerror from 'syntax-error'
import chalk from 'chalk'
import { tmpdir } from 'os'
import { format } from 'util'
import pino from 'pino'
import ws from 'ws'
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  makeCacheableSignalKeyStore
} = await import('@whiskeysockets/baileys')
import { Low, JSONFile } from 'lowdb'
import { makeWASocket, protoType, serialize } from './lib/simple.js'

const { CONNECTING } = ws

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
global.db = new Low(new JSONFile(`database.json`));

global.loadDatabase = async function loadDatabase() {
  if (db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!db.READ) {
      clearInterval(this)
      resolve(db.data == null ? global.loadDatabase() : db.data)
    }
  }, 1 * 1000))
  if (db.data !== null) return
  db.READ = true
  await db.read().catch(console.error)
  db.READ = null
  db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
      ...(db.data || {})
  }
}
loadDatabase()

const { version: waVersion, isLatest } = await fetchLatestBaileysVersion().catch(err => {
  console.error('Failed to fetch latest Baileys version:', err)
  return { version: undefined, isLatest: false }
})

const { state, saveCreds } = await useMultiFileAuthState('./sessions')
const connectionOptions = {
  logger: pino({ level: 'fatal' }),
  browser: ["Ubuntu", "Chrome", "20.0.00"],
  ...(waVersion ? { version: waVersion } : {}),
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino().child({
      level: 'silent',
      stream: 'store'
    })),
  },
  getMessage: async key => {
    const jid = jidNormalizedUser(key.remoteJid);
    const messageData = await store.loadMessage(jid, key.id);
    return messageData?.message || '';
  },
  generateHighQualityLinkPreview: true,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(
      message.buttonsMessage
      || message.templateMessage
      || message.listMessage
    );
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      };
    }
    return message;
  },
  connectTimeoutMs: 60000, defaultQueryTimeoutMs: 0, syncFullHistory: true, markOnlineOnConnect: true
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!conn.authState.creds.registered) {
  console.log(chalk.bgWhite(chalk.blue('Generating code...')))
  setTimeout(async () => {
    let code = await conn.requestPairingCode(global.pairing)
    code = code?.match(/.{1,4}/g)?.join('-') || code
    console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
  }, 3000)
}

if(global.db) {
   setInterval(async () => {
    if(global.db.data) await global.db.write().catch(console.error);
    if ((global.support || {}).find) {
      const tmp = [tmpdir(), 'tmp'];
      tmp.forEach(filename => spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete']));
    }
  }, 2000);
}

// --- وظيفة حماية الروابط ---
async function antiLinkUpdate(m) {
    if (!m.isGroup) return;
    const groupAdmins = await this.groupMetadata(m.chat).then(v => v.participants.filter(p => p.admin).map(p => p.id));
    const isBotAdmin = groupAdmins.includes(this.user.jid);
    const isAdmin = groupAdmins.includes(m.sender);
    
    // إذا كان البوت ليس مشرفاً أو كان المرسل مشرفاً، لا تفعل شيئاً
    if (!isBotAdmin || isAdmin) return;

    const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
    const isLink = linkRegex.test(m.text || '');
    
    if (isLink) {
        // الكود الخاص برابط مجموعتك المسموح به
        const allowedLinkCode = 'G4ESsYAGf9j7fVzniCAkOY';
        const match = (m.text || '').match(linkRegex);
        const code = match ? match[1] : '';
        
        if (code !== allowedLinkCode) {
            console.log(chalk.bgRed(`[حذف رابط] من: ${m.sender}`));
            await this.sendMessage(m.chat, { delete: m.key });
            await this.sendMessage(m.chat, { text: `⚠️ عذراً @${m.sender.split('@')[0]}، يمنع إرسال الروابط الخارجية!`, mentions: [m.sender] });
        }
    }
}

// --- وظيفة حماية الرتب (منع رفع المشرفين) ---
async function participantsUpdate({ id, participants, action, author }) {
    if (opts['self']) return;
    if (global.db.data == null) await global.loadDatabase();
    
    if (action === 'promote') {
        try {
            const metadata = await this.groupMetadata(id);
            const owner = metadata.owner || id.split('-')[0] + '@s.whatsapp.net';
            
            // التحقق: إذا كان الفاعل ليس المالك وليس البوت نفسه
            if (author !== owner && author !== this.user.jid) {
                console.log(chalk.bgRed(`[منع ترقية] محاولة غير مصرح بها من ${author}`));
                
                // تنزيل العضو المرفوع فوراً
                await this.groupParticipantsUpdate(id, participants, 'demote');
                
                // إرسال تنبيه
                await this.sendMessage(id, { 
                    text: `⚠️ محاولة ترقية مرفوضة! فقط مالك المجموعة يمتلك هذه الصلاحية.`,
                    mentions: [author]
                });
            }
        } catch (e) { console.error('Error in Promote Guard:', e) }
    }

    if (handler && handler.participantsUpdate) {
        await handler.participantsUpdate.bind(this)({ id, participants, action });
    }
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isOnline, isNewLogin } = update;
  if (isNewLogin) conn.isInit = true;
  if (connection == 'connecting') console.log(chalk.redBright('⚡ Mengaktifkan Bot, Mohon tunggu sebentar...'));
  else if (connection == 'open') console.log(chalk.green('✅ Tersambung'));

  if (connection == 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== CONNECTING) {
    await global.reloadHandler(true);
  }
}

process.on('uncaughtException', console.error)

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) { console.error(e) }

  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }

  // دالة مخصصة لمعالجة الرسائل ودمج حماية الروابط
  conn.onMessage = async function (m) {
      if (!m) return;
      await antiLinkUpdate.bind(this)(m); 
      if (handler && handler.handler) await handler.handler.bind(this)(m);
  }

  conn.participantsUpdate = participantsUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn)

  // ربط أحداث Baileys
  conn.ev.on('messages.upsert', async (chatUpdate) => {
      const m = chatUpdate.messages[0];
      if (!m) return;
      // لا تعالج الرسائل إذا كان البوت في وضع "self"
      if (global.opts['self'] && !m.key.fromMe) return;
      await conn.onMessage(m);
  })

  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)

  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      console.error(`❌ Failed to load plugins ${filename}: ${e}`)
    }
  }
}
filesInit().then(_ => console.log(`Successfully Loaded Plugins`)).catch(console.error)

watch(pluginFolder, async (_ev, filename) => {
    if (pluginFilter(filename)) {
        let dir = global.__filename(join(pluginFolder, filename), true)
        if (existsSync(dir)) {
            const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
            global.plugins[filename] = module.default || module
        }
    }
})

await global.reloadHandler()
