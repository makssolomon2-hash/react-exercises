import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
        camera.position.set(0, 0, 4)

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        const geometry = new THREE.IcosahedronGeometry(1, 2)
        const material = new THREE.MeshStandardMaterial({
            color: 0x60a5fa,
            metalness: 0.45,
            roughness: 0.25,
        })
        const mesh = new THREE.Mesh(geometry, material)
        const wireframe = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry),
            new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 }),
        )
        scene.add(mesh, wireframe)

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
        keyLight.position.set(2, 2, 3)
        scene.add(keyLight, new THREE.AmbientLight(0x4466aa, 1.5))

        const pointer = { x: 0, y: 0 }
        const resize = () => {
            const width = Math.max(canvas.clientWidth, 1)
            const height = Math.max(canvas.clientHeight, 1)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
        }
        const handlePointerMove = (event) => {
            const bounds = canvas.getBoundingClientRect()
            pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 1.1
            pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.8
        }
        const resetPointer = () => {
            pointer.x = 0
            pointer.y = 0
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)
        canvas.addEventListener('pointermove', handlePointerMove)
        canvas.addEventListener('pointerleave', resetPointer)

        let frameId = 0
        const render = () => {
            mesh.rotation.y += (pointer.x - mesh.rotation.y) * 0.04
            mesh.rotation.x += (-pointer.y - mesh.rotation.x) * 0.04
            mesh.rotation.z += 0.002
            wireframe.rotation.copy(mesh.rotation)
            renderer.render(scene, camera)
            frameId = requestAnimationFrame(render)
        }

        resize()
        render()

        return () => {
            cancelAnimationFrame(frameId)
            resizeObserver.disconnect()
            canvas.removeEventListener('pointermove', handlePointerMove)
            canvas.removeEventListener('pointerleave', resetPointer)
            geometry.dispose()
            material.dispose()
            wireframe.geometry.dispose()
            wireframe.material.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <div data-demo-reveal className="demo-scene relative overflow-hidden border border-white/10 bg-neutral-800 shadow-2xl shadow-black/25">
            <canvas
                ref={canvasRef}
                className="demo-canvas h-80 w-full tab:h-96"
                aria-label="Interactive 3D model. Move your pointer over the canvas to rotate it."
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-neutral-900/80 px-5 py-4 backdrop-blur">
                <span className="text-sm font-medium text-white">Move pointer to rotate</span>
                <span className="text-xs uppercase tracking-[0.16em] text-blue-300">WebGL active</span>
            </div>
        </div>
    )
}
