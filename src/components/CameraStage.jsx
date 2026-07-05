import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function CameraModel() {
  const group = useRef()
  const { scene } = useGLTF('camera.glb', true) // true = Draco decoder via CDN
  const mouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)

  useEffect(() => {
    const onMove = e => { mouse.current.x = (e.clientX / innerWidth - .5) * 2; mouse.current.y = (e.clientY / innerHeight - .5) * 2 }
    const onScroll = () => { scrollY.current = Math.min(1, window.scrollY / innerHeight) }
    addEventListener('pointermove', onMove)
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll) }
  }, [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const wide = innerWidth > 900
    group.current.rotation.y = t * .28 + mouse.current.x * .35
    group.current.rotation.x = Math.sin(t * .5) * .04 + mouse.current.y * .12
    group.current.position.x = wide ? 2.7 : 0
    group.current.position.y = (wide ? -0.2 : 1.6) + Math.sin(t * .9) * .12 - scrollY.current * 1.6
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.55} position={[0, -2.4, 0]} />
    </group>
  )
}

export default function CameraStage() {
  const [visible, setVisible] = useState(true)
  const wrap = useRef()
  useEffect(() => {
    const io = new IntersectionObserver(es => setVisible(es[0].isIntersecting), { threshold: 0 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])
  return (
    <div className="stage" ref={wrap}>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.25]}
        camera={{ fov: 34, position: [0, 2.2, 10] }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight color="#3a2a66" intensity={1.4} />
        <directionalLight color="#ffffff" intensity={1.4} position={[4, 7, 6]} />
        <directionalLight color="#7c3aed" intensity={3.2} position={[-6, 3, -4]} />
        <directionalLight color="#34d399" intensity={1.4} position={[6, -2, -5]} />
        <Suspense fallback={null}>
          <CameraModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
useGLTF.preload('camera.glb', true)
