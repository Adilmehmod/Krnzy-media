/* =========================================================
   ⚠️  ALL CONTENT LIVES HERE.
   views / ret / lift / curve are SAMPLE FIGURES — replace
   with real YT Studio / TikTok analytics before launch.
   Follower counts are the real roster numbers.
   ========================================================= */
export const CAL = 'https://calendly.com/krnzymedia/30min'
export const WA  = 'https://wa.me/923046189859'

export const CLIPS = [
 { n:'Tools of Titans Reel', cat:'short', tag:'Short form · Sales', yt:'L3tluen4bSU', views:'128K', ret:64, lift:'+41%', curve:[100,88,79,74,70,67,64,62,60,58] },
 { n:'Podcast Short', cat:'short', tag:'Short form · Podcast', yt:'JwNTfSkJpZE', views:'88K', ret:66, lift:'+45%', curve:[100,91,83,77,73,70,68,66,65,64] },
 { n:'Sales Reel', cat:'short', tag:'Short form · Sales', yt:'8bJ5nddJrB8', views:'96K', ret:58, lift:'+33%', curve:[100,85,74,68,63,60,58,56,55,54] },
 { n:'Retirement Reel', cat:'short', tag:'Short form · Reel', yt:'gW32s2noRNM', views:'74K', ret:61, lift:'+37%', curve:[100,90,80,73,69,66,63,61,60,59] },
 { n:'Real Estate Short', cat:'short', tag:'Short form · SaaS', yt:'n5ZiBB9JBvA', views:'61K', ret:59, lift:'+31%', curve:[100,86,76,69,65,62,60,58,57,56] },
 { n:'Plumbing Story', cat:'short', tag:'Short form · Story', yt:'QGyb7cgmqZU', views:'52K', ret:57, lift:'+29%', curve:[100,84,73,66,62,59,57,56,55,54] },
 { n:'Short Intro', cat:'short', tag:'Short form · Intro', yt:'slxVgfSYotA', views:'33K', ret:63, lift:'+36%', curve:[100,92,84,78,74,71,68,66,64,63] },
 { n:'Long Video Example', cat:'long', tag:'Long form', yt:'8EUUdqyC7b4', views:'44K', ret:52, lift:'+26%', curve:[100,80,68,62,58,55,53,52,51,50] },
 { n:'Podcast Intro', cat:'long', tag:'Long form · Podcast', yt:'9GAiKot8UwM', views:'38K', ret:55, lift:'+28%', curve:[100,83,72,65,61,58,56,55,54,53] },
]

export const BASELINE = [100,72,55,45,39,35,32,30,28,27]

export const CLIENTS = [
 { n:'Proflex Health', f:'168K followers', i:'https://dl.dropboxusercontent.com/scl/fi/k5ftr7j5ifyw7qf4c0d1t/44a68753fb9e4a0af1cb71df18acb10f-tplv-tiktokx-cropcenter10801080.jpeg?rlkey=kr5ugh8haahi5s495jwiesdhw&st=viudbd2x&dl=0' },
 { n:'Mike Angels', f:'87K followers', i:'https://dl.dropboxusercontent.com/scl/fi/gff7y2orpz3x89h525y9h/channels4_profile-1.jpg?rlkey=ljiz6r3opzy91rj42snpmx3a0&st=6ekkz534&dl=0' },
 { n:'Bybit', f:'82K followers', i:'https://dl.dropboxusercontent.com/scl/fi/4uze51dgzjbqbggicnyzn/channels4_profile-4.jpg?rlkey=slyxsvgaq0qghyn0zl1fy58j4&st=qxpo8332&dl=0' },
 { n:'Digiblur', f:'70K · 12mo client', i:'https://dl.dropboxusercontent.com/scl/fi/kgtlbdabeq6cwbv2lnd6r/channels4_profile.jpg?rlkey=v8d5awjdhr2vmstz2aniozsw9&st=1ge5rl1b&dl=0' },
 { n:'Diago Fit', f:'33.8K followers', i:'https://dl.dropboxusercontent.com/scl/fi/4j2ec6kp8be7cn3eoj5qp/79c1e87c399af95c365356909b57069d-tplv-tiktokx-cropcenter10801080.jpeg?rlkey=d2sow0ld2sw5fmtk6vqa8lpdp&st=w9o0aias&dl=0' },
 { n:'Revtronix', f:'growing', i:'https://dl.dropboxusercontent.com/scl/fi/auneilco6zvar1ls2ozeg/channels4_profile-2.jpg?rlkey=7m7owdqhr1tivgr70hi04cpnp&st=kqwqskkl&dl=0' },
]

export const RECEIPTS = [
 { pct:88, num:441, suf:'K', up:true, label:'Combined client audience', proof:'Real, verifiable roster — the counts are public.' },
 { pct:100, num:500, suf:'+', up:false, label:'Videos shipped', proof:'Shorts, long form, podcasts — on schedule, every week.' },
 { pct:38, num:38, suf:'%', up:true, label:'Retention lift vs baseline', proof:'Sample average — full curves inside the Edit Suite.' },
 { pct:92, num:12, suf:'mo', up:false, label:'Average client relationship', proof:"They stay. That's the metric we're proudest of." },
]

export const ytU = id => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
export const thumb = id => `https://img.youtube.com/vi/${id}/mqdefault.jpg`
export const thumbBig = id => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

/* metric card series — SAMPLE SHAPES for the charts; the real follower
   total (441K) is genuine, the curves & starred series are illustrative. */
const mk=(vals)=>vals.map((v,i)=>({value:v,date:`Day ${i+1}`}))
export const AUDIENCE_SERIES = mk([362,368,371,377,380,386,391,395,398,404,406,410,413,415,419,421,424,426,428,431,433,434,436,437,438,439,440,440,441,441].map(v=>v*1000))
export const SHIPPED_SERIES  = mk([428,430,433,435,438,440,443,446,448,450,453,456,459,461,463,466,469,471,474,477,479,482,485,487,490,492,494,496,498,500])
export const RETENTION_SERIES= mk([29,30,31,31,32,33,33,34,34,35,35,34,35,36,36,37,36,37,37,38,38,37,38,38,39,38,38,39,38,38])
export const HOURS_SERIES    = mk([6100,6240,6300,6480,6590,6720,6800,6950,7080,7150,7300,7420,7500,7660,7790,7900,8050,8140,8290,8400,8520,8660,8740,8880,9000,9080,9190,9280,9350,9400])
