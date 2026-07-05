import { useState, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'
import GlassFilter from '../components/Glass.jsx'
import MetricCard from '../components/MetricCard.jsx'
import { CAL, WA, CLIENTS, thumb, thumbBig, AUDIENCE_SERIES, SHIPPED_SERIES, RETENTION_SERIES, HOURS_SERIES } from '../data.js'
const CameraStage = lazy(() => import('../components/CameraStage.jsx'))

const rise = { hidden: { y: '110%' }, show: i => ({ y: 0, transition: { duration: 1, ease: [.16, 1, .3, 1], delay: i * .1 } }) }
const fade = d => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, delay: d } } })

const go = id => e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

export default function Home() {
  const [reelPlaying, setReelPlaying] = useState(false)
  const [travisPlaying, setTravisPlaying] = useState(false)

  return (
    <>
      <GlassFilter />

      <nav className="nav">
        <Link className="logo" to="/">
          <span className="lmark"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></span>
          <span><span className="lname">KRNZY <b>MEDIA</b></span><span className="lsub">CUT · COLOUR · CRAFT</span></span>
        </Link>
        <div className="glass navpill">
          <a onClick={go('work')}>Work</a><a onClick={go('results')}>Results</a><a onClick={go('contact')}>Contact</a>
          <Link to="/suite">Edit Suite ▸</Link>
        </div>
        <a className="ncta" href={CAL} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 12 }}>BOOK A CALL</a>
      </nav>

      {/* HERO — purple MeshGradient shader + real 3D camera */}
      <header className="hero">
        <div className="shader">
          <MeshGradient
            colors={['#06040d', '#2e1065', '#5b21b6', '#7c3aed']}
            speed={0.2}
            backgroundColor="#06040d"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        </div>
        <Suspense fallback={<div className="stage" />}><CameraStage /></Suspense>
        <div className="grade" />
        <div className="hwrap">
          <motion.div variants={fade(0)} initial="hidden" animate="show">
            <span className="glass badge"><span className="bdot" />Now cutting — creative video editing studio</span>
          </motion.div>
          <h1>
            <span className="ln"><motion.span className="thin" style={{ display: 'block' }} variants={rise} custom={0} initial="hidden" animate="show">Your story,</motion.span></span>
            <span className="ln"><motion.span style={{ display: 'block' }} variants={rise} custom={1} initial="hidden" animate="show">cut to be</motion.span></span>
            <span className="ln"><motion.span className="ital" style={{ display: 'block' }} variants={rise} custom={2} initial="hidden" animate="show">unskippable.</motion.span></span>
          </h1>
          <motion.p className="hsub" variants={fade(.45)} initial="hidden" animate="show">
            Hooks engineered for the first 3 seconds. Cuts built for retention. <b>500+ videos shipped</b> for creators with a combined audience of 440K+.
          </motion.p>
          <motion.div className="hcta" variants={fade(.6)} initial="hidden" animate="show">
            <a className="btn p" href={CAL} target="_blank" rel="noopener noreferrer">▸ Book a free strategy call</a>
            <a className="btn o glass" onClick={go('reel')} style={{ borderRadius: 99, cursor: 'pointer' }}>Watch the showreel</a>
          </motion.div>
        </div>
        <div className="hnum"><b>500+</b> VIDEOS SHIPPED<br /><b>440K+</b> COMBINED AUDIENCE<br /><b>12MO</b> AVG CLIENT STAY</div>
        <div className="scrollcue">▼ scroll</div>
      </header>

      {/* SHOWREEL */}
      <section className="reel" id="reel">
        <div className="reelframe">
          <img src={thumbBig('G0NPIFMGiUE')} alt="KRNZY showreel" />
          {reelPlaying
            ? <iframe src="https://www.youtube.com/embed/G0NPIFMGiUE?autoplay=1&rel=0&modestbranding=1" allow="autoplay; fullscreen" allowFullScreen title="showreel" />
            : <button className="po" onClick={() => setReelPlaying(true)} aria-label="Play showreel">
                <span className="pb"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg></span>
              </button>}
          <div className="cap"><span className="rec" />KRNZY SHOWREEL 2026 · 02:14 · CUT / COLOUR / CRAFT</div>
        </div>
      </section>

      {/* RESULTS — chart-in-card metrics */}
      <section className="metrics2" id="results">
        <div className="m2head">
          <p className="k">The receipts</p>
          <h2>Numbers that <b>keep climbing.</b></h2>
        </div>
        <div className="mgrid2">
          <MetricCard title="Combined client audience" data={AUDIENCE_SERIES} suffix="" headline="441K" deltaLabel="this month" />
          <MetricCard title="Videos shipped" data={SHIPPED_SERIES} headline="500+" deltaLabel="this month" />
          <MetricCard title="Avg retention lift*" data={RETENTION_SERIES} suffix="%" headline="+38%" deltaLabel="vs baseline" size="sm" />
          <MetricCard title="Watch-time delivered*" data={HOURS_SERIES} suffix="h" headline="9.4K h" deltaLabel="this month" size="sm" />
        </div>
        <p className="mnote">*starred figures are illustrative — client-verified analytics shared on every call · follower counts are public &amp; real</p>
      </section>

      {/* PORTFOLIO — watch the work first */}
      <section className="sec" id="work">
        <div className="shead">
          <div><div className="kick">01 · Portfolio</div><h2>Watch Our Work</h2></div>
          <div className="io">9 CUTS · SHORT &amp; LONG FORM<br />PLAYS FULL-SCREEN INSIDE</div>
        </div>
        <div className="tease">
          <div className="chrome"><i /><i /><i /><span>KRNZY_PORTFOLIO_2026 — press play</span></div>
          <div className="shot">
            <div className="tp tlist">
              <div className="tph">Clips · Short form</div>
              {['L3tluen4bSU|tools_of_titans', '8bJ5nddJrB8|sales_reel', 'JwNTfSkJpZE|podcast_short', 'gW32s2noRNM|retirement_reel', 'QGyb7cgmqZU|plumbing_story'].map(s => {
                const [id, n] = s.split('|')
                return <div className="r" key={id}><img src={thumb(id)} alt="" /><span className="n">{n}</span></div>
              })}
            </div>
            <div className="tp tmonB">
              <div className="tph">Program Monitor</div>
              <div className="mimg"><img src={thumbBig('8EUUdqyC7b4')} alt="monitor preview" /></div>
            </div>
          </div>
          <div className="veil">
            <p className="t">Every cut. Every client.<br /><b>Press play.</b></p>
            <p>Browse the full portfolio by category and watch each edit big and clear — and if you want the numbers behind a cut, the live retention graph plays right beside it.</p>
            <Link className="btn p" to="/suite">▸ Watch the portfolio</Link>
          </div>
        </div>
        <div className="cats">
          <Link className="cat" to="/suite?cat=short">
            <span className="ic">9:16</span>
            <span><span className="n">Short Form</span><span className="d">Reels · TikTok · Shorts — 7 cuts</span></span>
            <span className="go">WATCH ▸</span>
          </Link>
          <Link className="cat" to="/suite?cat=long">
            <span className="ic">16:9</span>
            <span><span className="n">Long Form</span><span className="d">YouTube · Podcasts — 2 cuts</span></span>
            <span className="go">WATCH ▸</span>
          </Link>
        </div>
      </section>

      {/* PROOF */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="shead">
          <div><div className="kick">02 · Proof</div><h2>Creators Who Stayed</h2></div>
          <div className="io">REAL FOLLOWER COUNTS</div>
        </div>
        <div className="marquee">
          <div className="mtrack">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div className="client" key={i}>
                <img src={c.i} loading="lazy" alt={c.n} />
                <div><div className="nm">{c.n}</div><div className="fl"><b>▲</b> {c.f}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="tgrid">
          <div className="tquote">
            <p className="q">“I had been working with them for almost <em>a year.</em>”</p>
            <p className="who">Travis · DigiBlur DIY · 70K subscribers</p>
            <span className="stamp">CLIENT SINCE 2025 · STILL ROLLING</span>
          </div>
          <div className="tvid" onClick={() => setTravisPlaying(true)}>
            <img src="https://dl.dropboxusercontent.com/scl/fi/zihb9okn7gaqaebj3iuwv/travis-frame-at-0m29s.jpg?rlkey=vaxayqgj04qfvimdear3eiv7l&st=hklw52kt&dl=0" alt="Travis testimonial" />
            {travisPlaying
              ? <video src="https://dl.dropboxusercontent.com/scl/fi/hu3cu5jdf2kkfrnk5fv6n/travis.mp4?rlkey=p6u06tsc5ghkv8zda570cehbs&st=q5a21zkt&dl=0" controls autoPlay playsInline />
              : <div className="po"><div><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg></div></div>}
          </div>
        </div>
      </section>

      {/* CTA — the clapperboard is back */}
      <div className="slatewrap" id="contact">
        <motion.div className="slate" whileHover="open">
          <motion.div className="clap-top"
            variants={{ open: { rotate: 0 } }}
            initial={{ rotate: -16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 14 }} />
          <div className="clap-body" />
          <div className="slate-in">
            <p className="slate-eyebrow">Scene 01 · Take 01 · Free 30-min strategy call</p>
            <h2 className="slate-h">Roll <em>camera.</em></h2>
            <div className="srow"><span className="l">Production</span><span className="lead" /><span className="v">KRNZY Media</span></div>
            <div className="srow"><span className="l">Scene</span><span className="lead" /><span className="v">Your next project</span></div>
            <div className="srow"><span className="l">Director</span><span className="lead" /><span className="v">You</span></div>
            <div className="srow"><span className="l">Format</span><span className="lead" /><span className="v">Reels / Shorts / Long form</span></div>
            <div className="slate-cta">
              <a className="btn p" href={CAL} target="_blank" rel="noopener noreferrer">▸ Book the call</a>
              <a className="btn o glass" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="footer">
        <span>KRNZY MEDIA · ISLAMABAD · EST 2024</span>
        <span>3D CAMERA: “ANTIQUE CAMERA” — KHRONOS GLTF SAMPLE ASSETS (CC0)</span>
        <span><Link to="/suite">EDIT SUITE</Link> · <a href={CAL} target="_blank" rel="noopener noreferrer">CALENDLY</a> · <a href={WA} target="_blank" rel="noopener noreferrer">WHATSAPP</a></span>
      </footer>
      <div className="footer" style={{ borderTop: 0, paddingTop: 0 }}><span>© 2026 KRNZY MEDIA</span></div>
    </>
  )
}
