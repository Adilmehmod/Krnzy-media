import { useId, useMemo, useState } from 'react'

/* Chart-in-card metric — layout/style extracted from the reference component,
   rebuilt self-contained (plain CSS, purple system). Chart region sits on the
   right behind the content; big number derives from the visible window. */

const PERIODS = [
  { label: 'Past 7 days', points: 7 },
  { label: 'Past 14 days', points: 14 },
  { label: 'Past 30 days' },
]
const W = 100, H = 100

const compact = n => Math.abs(n) >= 1e6 ? (n / 1e6).toFixed(1) + 'M'
  : Math.abs(n) >= 1e3 ? (n / 1e3).toFixed(Math.abs(n) >= 1e4 ? 0 : 1) + 'K'
  : String(Math.round(n))

export default function MetricCard({ title, data, suffix = '', headline, deltaLabel = 'this week', size = 'md', foot }) {
  const gid = useId().replace(/:/g, '')
  const [view, setView] = useState('curve')
  const [period, setPeriod] = useState(PERIODS[2].label)
  const [hover, setHover] = useState(null)

  const opt = PERIODS.find(p => p.label === period) ?? PERIODS[2]
  const pts = useMemo(() => opt.points && opt.points < data.length ? data.slice(-opt.points) : data, [data, opt])

  const st = useMemo(() => {
    const v = pts.map(p => p.value)
    const first = v[0] ?? 0, last = v[v.length - 1] ?? 0, prev = v[v.length - 2] ?? first
    return {
      last, net: last - first, pct: first ? ((last - first) / first) * 100 : 0, step: last - prev,
      peak: Math.max(...v), low: Math.min(...v), avg: v.reduce((a, b) => a + b, 0) / v.length,
    }
  }, [pts])

  const min = st.low * 0.9, max = st.peak * 1.05 || 1
  const X = i => (i / (pts.length - 1)) * W
  const Y = v => H - ((v - min) / (max - min)) * (H * 0.82) - H * 0.06
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(2)},${Y(p.value).toFixed(2)}`).join('')

  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    const i = Math.round(((e.clientX - r.left) / r.width) * (pts.length - 1))
    setHover({ i: Math.max(0, Math.min(pts.length - 1, i)), x: e.clientX - r.left, w: r.width, h: r.height })
  }

  return (
    <div className={'mcard' + (size === 'sm' ? ' sm' : '')}>
      <div className="mzone" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <div className="mgrad" />
        <div className="mdots">
          <svg width="100%" height="100%" aria-hidden>
            <defs><pattern id={gid} width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" /></pattern></defs>
            <rect width="100%" height="100%" fill={`url(#${gid})`} />
          </svg>
        </div>
        <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs><linearGradient id={gid + 'a'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(167,139,250,.30)" /><stop offset="1" stopColor="rgba(167,139,250,0)" /></linearGradient></defs>
          {view === 'curve' ? (
            <>
              <path d={`${line} L${W},${H} L0,${H} Z`} fill={`url(#${gid}a)`} />
              <path d={line} fill="none" stroke="#a78bfa" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            </>
          ) : pts.map((p, i) => (
            <rect key={i} x={X(i) - W / pts.length * 0.32} y={Y(p.value)} width={W / pts.length * 0.64}
              height={H - Y(p.value)} fill="rgba(167,139,250,.55)" rx="0.6" />
          ))}
          {hover && <>
            <line x1={X(hover.i)} y1="0" x2={X(hover.i)} y2={H} stroke="rgba(167,139,250,.4)" strokeWidth="0.4" />
            <circle cx={X(hover.i)} cy={Y(pts[hover.i].value)} r="1.6" fill="#a78bfa" />
          </>}
        </svg>
        {hover && (
          <div className="mtip" style={{ left: (hover.i / (pts.length - 1)) * 100 + '%', top: (Y(pts[hover.i].value) / H) * 100 + '%' }}>
            {compact(pts[hover.i].value)}{suffix}<small>{pts[hover.i].date}</small>
          </div>
        )}
      </div>

      <div className="mtop">
        <div className="mtitle">
          <h3>{title}</h3>
          <div className="vtoggle">
            <button className={view === 'curve' ? 'on' : ''} onClick={() => setView('curve')} title="Curve">〜</button>
            <button className={view === 'bars' ? 'on' : ''} onClick={() => setView('bars')} title="Bars">▥</button>
          </div>
        </div>
        <div className="mmeta">
          <span className="mtrend">{st.net >= 0 ? '↑' : '↓'} {Math.abs(st.pct).toFixed(1)}%</span>
          <select className="mperiod" value={period} onChange={e => setPeriod(e.target.value)}>
            {PERIODS.map(p => <option key={p.label}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <div className="mbig">{headline ?? (compact(st.last) + suffix)} <small>{suffix ? '' : ''}</small></div>

      <div className="mfoot">
        <div className="d"><b>{(st.step >= 0 ? '+' : '−') + compact(Math.abs(st.step))}</b> <span>{deltaLabel}</span></div>
        <div className="mstats">
          <span><b>{compact(st.peak)}</b> peak</span><i>·</i>
          <span><b>{compact(st.low)}</b> low</span><i>·</i>
          <span><b>{compact(Math.round(st.avg))}</b> avg</span>
        </div>
      </div>
      {foot}
    </div>
  )
}
