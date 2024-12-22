```javascript
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  
  const getFlag = (phone) => {
    const countryFlags = {
      '
      '1': '🇺🇸', '44': '🇬🇧', '52': '🇲🇽', '91': '🇮🇳', '504': '🇭🇳', '1684': '🇦🇸', 
      '358': '🇦🇽', '93': '🇦🇫', '374': '🇦🇲', '54': '🇦🇷', '297': '🇦🇼', '971': '🇦🇪', 
      '355': '🇦🇱', '672': '🇦🇶', '61': '🇦🇺', '376': '🇦🇩', '372': '🇦🇮', '244': '🇦🇴', 
      '43': '🇦🇹', '247': '🇦🇨', '994': '🇦🇿', '973': '🇧🇭', '880': '🇧🇩', '375': '🇧🇾',
      '32': '🇧🇪', '501': '🇧🇿', '229': '🇧🇯', '441481': '🇬🇬', '441534': '🇯🇪', '441624': '🇮🇲', 
      '994': '🇦🇿', '973': '🇧🇭', '880': '🇧🇩', '32': '🇧🇪', '229': '🇧🇯', '501': '🇧🇿', 
      '595': '🇵🇾', '375': '🇧🇾', '975': '🇧🇹', '591': '🇧🇴', '387': '🇧🇦', '267': '🇧🇼', 
      '55': '🇧🇷', '246': '🇮🇴', '673': '🇧🇳', '359': '🇧🇬', '226': '🇧🇫', '257': '🇧🇮',
      '238': '🇨🇻', '855': '🇰🇭', '237': '🇨🇲', '1-345': '🇰🇾', '236': '🇨🇫', '235': '🇹🇩', 
      '56': '🇨🇱', '86': '🇨🇳', '57': '🇨🇴', '269': '🇰🇲', '242': '🇨🇬', '243': '🇨🇩', 
      '682': '🇨🇰', '506': '🇨🇷', '385': '🇭🇷', '53': '🇨🇺', '599': '🇨🇼', '357': '🇨🇾',
      '420': '🇨🇿', '45': '🇩🇰', '253': '🇩🇯', '1767': '🇩🇲', '1-809': '🇩🇴', '593': '🇪🇨', 
      '20': '🇪🇬', '503': '🇸🇻', '240': '🇬🇶', '291': '🇪🇷', '372': '🇪🇪', '251': '🇪🇹', 
      '500': '🇫🇰', '298': '🇫🇴', '679': '🇫🇯', '358': '🇫🇮', '33': '🇫🇷', '594': '🇬🇫', 
      '689': '🇵🇫', '241': '🇬🇦', '220': '🇬🇲', '995': '🇬🇪', '49': '🇩🇪', '233': '🇬🇭', 
      '350': '🇬🇮', '30': '🇬🇷', '299': '🇬🇱', '1473': '🇬🇩', '590': '🇬🇵', '1671': '🇬🇺', 
      '502': '🇬🇹', '224': '🇬🇳', '245': '🇬🇼', '592': '🇬🇾', '509': '🇭🇹', '504': '🇭🇳', 
      '852': '🇭🇰', '36': '🇭🇺', '354': '🇮🇸', '964': '🇮🇶', '353': '🇮🇪', '972': '🇮🇱',
      '39': '🇮🇹', '225': '🇨🇮', '1876': '🇯🇲', '81': '🇯🇵', '962': '🇯🇴', '76': '🇰🇿',
      '254': '🇰🇪', '686': '🇰🇮', '965': '🇰🇼', '996': '🇰🇬', '856': '🇱🇦', '371': '🇱🇻', 
      '961': '🇱🇧', '266': '🇱🇸', '231': '🇱🇷', '218': '🇱🇾', '423': '🇱🇮', '370': '🇱🇹',
      '352': '🇱🇺', '853': '🇲🇴', '261': '🇲🇬', '265': '🇲🇼', '60': '🇲🇾', '960': '🇲🇻',
      '223': '🇲🇱', '356': '🇲🇹', '692': '🇲🇭', '596': '🇲🇶', '222': '🇲🇷', '230': '🇲🇺',
      '52': '🇲🇽', '691': '🇫🇲', '373': '🇲🇩', '377': '🇲🇨', '976': '🇲🇳', '382': '🇲🇪', 
      '1664': '🇲🇸', '212': '🇲🇦', '258': '🇲🇿', '95': '🇲🇲', '264': '🇳🇦', '674': '🇳🇷', 
      '977': '🇳🇵', '31': '🇳🇱', '687': '🇳🇨', '64': '🇳🇿', '505': '🇳🇮', '227': '🇳🇪', 
      '234': '🇳🇬', '683': '🇳🇺', '850': '🇰🇵', '1670': '🇲🇵', '47': '🇳🇴', '968': '🇴🇲', 
      '92': '🇵🇰', '680': '🇵🇼', '507': '🇵🇦', '675': '🇵🇬', '595': '🇵🇾', '51': '🇵🇪', 
      '63': '🇵🇭', '48': '🇵🇱', '351': '🇵🇹', '974': '🇶🇦', '40': '🇷🇴', '7': '🇷🇺', 
      '250': '🇷🇼', '262': '🇷🇪', '590': '🇧🇱', '508': '🇵🇲', '685': '🇼🇸', '378': '🇸🇲', 
      '239': '🇸🇹', '966': '🇸🇦', '221': '🇸🇳', '381': '🇷🇸', '248': '🇸🇨', '232': '🇸🇱', 
      '65': '🇸🇬', '1721': '🇸🇽', '421': '🇸🇰', '386': '🇸🇮', '677': '🇸🇧', '252': '🇸🇴', 
      '27': '🇿🇦', '211': '🇸🇸', '34': '🇪🇸', '94': '🇱🇰', '249': '🇸🇩', '597': '🇸🇷', 
      '46': '🇸🇪', '41': '🇨🇭', '963': '🇸🇾', '886': '🇹🇼', '992': '🇹🇯', '255': '🇹🇿',
      '66': '🇹🇭', '670': '
      // Agregar más prefijos según sea necesario
    };
    const prefix = phone.split('@')[0];
    for (const key in countryFlags) {
      if (prefix.startsWith(key)) return countryFlags[key];
    }
    return '🏳'; // Bandera blanca para otros
  };

  const pesan = args.join` `;
  const oi = `⇢=͟͟͞͞🄰νίऽ૭ : ${pesan}`;
  let teks = `(づ｡◕‿◕｡)づ 💛 Revivan Plantas"\n  ⧼P̼⧽= ${participants.length} ℙ𝐀𝔍𝐈ꪀəﻜ\n\n ${oi}\n\n╭•┈┈•┈┈⊰🔥⃪᜔꫶┈•┈┈•◌ᜓ ݊ ᜒ𝅄\n`;
  for (const mem of participants) {
    const flag = getFlag(mem.id);
    teks += `│ 🫡ᝰ. ${flag} @${mem.id.split('@')[0]}\n`;
  }
  teks += `╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;
```