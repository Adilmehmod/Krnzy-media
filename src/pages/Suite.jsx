import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CAL, WA, CLIPS, BASELINE, ytU, thumb, thumbBig } from '../data.js'

const CATS = [
  { id: 'all', label: 'ALL' },
  { id: 'short', label: 'SHORT FORM' },
  { id: 'long', label: 'LONG FORM' },
]
const PLAY_LOOP_S = 32 /* simulated playhead loop for the live curve marker */

function LiveRetention({ clip, playing }) {
  const [prog, setProg] = useState(0)
  useEffect(() => { setProg(0) }, [clip])
  useEffect(() => {
    if (!playing) return
    const t0 = performance.now()
    let raf
    const loop = n => { setProg(((n - t0) / 1000 % PLAY_LOOP_S) / PLAY_LOOP_S); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing, clip])

  const W = 260, H = 130, mn = 15, mx = 100
  const P = cv => cv.map((v, i) => `${i ? 'L' : 'M'}${(i / (cv.length - 1) * W).toFixed(1)},${(H - (v - mn) / (mx - mn) * H).toFixed(1)}`).join('')
  /* interpolate marker position along the clip curve */
  const t = prog * (clip.curve.length - 1)
  const i0 = Math.floor(t), i1 = Math.min(clip.curve.length - 1, i0 + 1), f = t - i0
  const val = clip.curve[i0] + (clip.curve[i1] - clip.curve[i0]) * f
  const mxX = t / (clip.curve.length - 1) * W
  const mxY = H - (val - mn) / (mx - mn) * H

  return (
    <div className="schart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs><linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(167,139,250,.28)" /><stop offset="1" stopColor="rgba(167,139,250,0)" /></linearGradient></defs>
        {[1, 2, 3].map(i => <line key={i} x1="0" y1={i * H / 4} x2={W} y2={i * H / 4} stroke="rgba(124,58,237,.12)" />)}
        <path d={P(BASELINE)} fill="none" stroke="#575170" strokeWidth="1.6" strokeDasharray="4 4" />
        <path d={`${P(clip.curve)} L${W},${H} L0,${H} Z`} fill="url(#lg2)" />
        <motion.path d={P(clip.curve)} fill="none" stroke="#a78bfa" strokeWidth="2.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: [.3, 0, .2, 1] }} />
        {playing && <>
          <line x1={mxX} y1="0" x2={mxX} y2={H} stroke="rgba(167,139,250,.45)" strokeWidth="0.8" />
          <circle cx={mxX} cy={mxY} r="3.4" fill="#a78bfa" />
          <circle cx={mxX} cy={mxY} r="7" fill="none" stroke="rgba(167,139,250,.4)" />
        </>}
      </svg>
      <div className="slegend">
        <span><i style={{ background: 'var(--pur2)' }} />KRNZY cut</span>
        <span><i style={{ background: 'var(--faint)' }} />typical unedited</span>
        {playing && <span style={{ marginLeft: 'auto', color: 'var(--pur2)' }}>{Math.round(val)}% watching</span>}
      </div>
    </div>
  )
}

export default function Suite() {
  const [params] = useSearchParams()
  const [cat, setCat] = useState(params.get('cat') || 'all')
  const [sel, setSel] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [booted, setBooted] = useState(false)
  const barRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    let p = 0
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.random() * 30 + 14)
      if (barRef.current) barRef.current.style.width = p + '%'
      if (p >= 100) { clearInterval(iv); setTimeout(() => setBooted(true), 260) }
    }, 150)
    return () => clearInterval(iv)
  }, [])

  const visible = useMemo(
    () => CLIPS.map((c, i) => ({ c, i })).filter(x => cat === 'all' || x.c.cat === cat),
    [cat]
  )
  const clip = sel >= 0 ? CLIPS[sel] : null

  const select = (i, autoplay) => { setSel(i); setPlaying(!!autoplay) }
  const step = d => {
    if (!visible.length) return
    const pos = Math.max(0, visible.findIndex(x => x.i === sel))
    select(visible[(pos + d + visible.length) % visible.length].i, true)
  }

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
      if (e.key === 'Enter') { e.preventDefault(); sel < 0 ? select(visible[0]?.i ?? 0, true) : setPlaying(true) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  })

  const chips = key => CATS.map(c => (
    <button key={key + c.id} className={'chip' + (cat === c.id ? ' on' : '')} onClick={() => setCat(c.id)}>{c.label}</button>
  ))

  return (
    <div className="suite">
      <AnimatePresence>
        {!booted && (
          <motion.div key="boot" exit={{ opacity: 0 }} transition={{ duration: .5 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{ fontFamily: 'var(--syne)', fontWeight: 800, fontSize: 30 }}>KRNZY <b style={{ color: 'var(--pur2)' }}>EDIT SUITE</b></div>
            <div style={{ fontSize: 10, letterSpacing: '.34em', color: 'var(--dim)' }}>THE PORTFOLIO — PRESS PLAY</div>
            <div style={{ width: 260, height: 2, background: 'var(--edge)', overflow: 'hidden' }}>
              <i ref={barRef} style={{ display: 'block', height: '100%', width: 0, background: 'linear-gradient(90deg,var(--deep),var(--pur2))' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="stop">
        <Link className="back" to="/">◂ SITE</Link>
        <span className="mark">KRNZY <b>EDIT SUITE</b></span>
        <div className="chips">{chips('d')}</div>
        <span className="spacer" />
        <a className="cta" href={CAL} target="_blank" rel="noopener noreferrer">BOOK A CALL ▸</a>
      </div>
      <div className="chips2">{chips('m')}</div>

      <div className="swork">
        <div className="railL">
          <div className="railh"><span className="led" />Clips<span className="n">{visible.length} clips</span></div>
          <div className="rbody">
            {visible.map(({ c, i }) => (
              <div key={i} className={'ccard' + (i === sel ? ' sel' : '')} onClick={() => select(i, true)}>
                <img src={c.still || thumb(c.yt)} loading="lazy" alt="" />
                <div><div className="t">{c.n}</div><div className="c">{c.tag}</div></div>
                {c.lift && <span className="lift">{c.lift}</span>}
              </div>
            ))}
          </div>
          <div className="railf"><span>↑↓ browse · ⏎ play</span><span>*sample metrics</span></div>
        </div>

        <div className="sstage">
          <div className="smon">
            <div className="mscreen">
              {!clip && (
                <div className="idle">
                  <div className="big">KRNZY MEDIA</div>
                  <p>pick a clip on the left — or press ⏎ to start</p>
                </div>
              )}
              {clip && <img className="poster" src={clip.still || thumbBig(clip.yt)} alt={clip.n} />}
              {clip && !playing && (
                <button className="po" onClick={() => setPlaying(true)} aria-label="Play">
                  <div><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg></div>
                </button>
              )}
              {clip && playing && (clip.mp4
                ? <video key={sel} src={clip.mp4} controls autoPlay playsInline />
                : <iframe key={sel} src={ytU(clip.yt)} allow="autoplay; fullscreen" allowFullScreen title={clip.n} />)}
            </div>
            <div className="mbar">
              <button className="navbtn" onClick={() => step(-1)}>‹</button>
              <button className="navbtn" onClick={() => step(1)}>›</button>
              <span className="name">{clip ? clip.n : 'no clip loaded'}</span>
              {clip && <span className="cat2">{clip.tag}</span>}
              <span className="spacer" />
              {clip?.lift && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--pur2)' }}>{clip.lift} retention lift*</span>}
            </div>
          </div>
        </div>

        {/* LIVE stats — always beside the monitor, graph runs while the video plays */}
        <div className="statsR">
          <div className="sh"><span className="led" />Live retention</div>
          <div className="sbody">
            {clip?.curve ? (
              <>
                <LiveRetention clip={clip} playing={playing} />
                <div className="ds"><div className="k">Views*</div><div className="v">{clip.views}</div></div>
                <div className="ds"><div className="k">Avg retention*</div><div className="v up">{clip.ret}%</div></div>
                <div className="ds"><div className="k">Lift vs baseline*</div><div className="v up">{clip.lift}</div></div>
                <p style={{ fontSize: 9, color: 'var(--faint)', letterSpacing: '.08em' }}>*sample figures — client-verified analytics on every call</p>
              </>
            ) : (
              <p className="idlemsg">{clip ? 'no retention data for this clip type' : 'play a clip and the retention graph runs live beside it — purple line is the KRNZY cut, dashed is a typical unedited video'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="sstatus">
        <span className="ok">● suite ready</span>
        <span>{clip ? 'viewing: ' + clip.n : '—'}</span>
        <span className="spacer" />
        <a href={WA} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
        <span>© 2026 KRNZY MEDIA</span>
      </div>
    </div>
  )
}
