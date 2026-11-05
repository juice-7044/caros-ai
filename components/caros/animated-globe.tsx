"use client"

import { useEffect, useRef } from "react"

/**
 * Rotating ASCII globe (from the Optimus template hero), retinted for the
 * light CAROS hero: characters are drawn in near-black with a faint gold cast
 * so the sphere reads as a premium, quiet background element.
 */
export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯"
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let running = false
    let visible = true
    let frames = 0

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(rect.width, rect.height) * 0.525

      ctx.font = "12px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const points: { x: number; y: number; z: number; char: string }[] = []

      for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
        for (let theta = 0; theta < Math.PI; theta += 0.15) {
          const x = Math.sin(theta) * Math.cos(phi + time * 0.5)
          const y = Math.sin(theta) * Math.sin(phi + time * 0.5)
          const z = Math.cos(theta)

          const rotY = time * 0.3
          const newX = x * Math.cos(rotY) - z * Math.sin(rotY)
          const newZ = x * Math.sin(rotY) + z * Math.cos(rotY)

          const rotX = time * 0.2
          const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX)
          const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX)

          const depth = (finalZ + 1) / 2
          const charIndex = Math.floor(depth * (chars.length - 1))

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            char: chars[charIndex],
          })
        }
      }

      points.sort((a, b) => a.z - b.z)

      points.forEach((point) => {
        const depth = (point.z + 1) / 2
        const alpha = 0.14 + depth * 0.5
        // Front-facing points pick up a subtle gold cast.
        if (depth > 0.6) {
          ctx.fillStyle = `rgba(201, 162, 39, ${alpha})`
        } else {
          ctx.fillStyle = `rgba(10, 10, 10, ${alpha * 0.7})`
        }
        ctx.fillText(point.char, point.x, point.y)
      })

      // Exposed for browser checks: proves the orb painted and, in normal motion, keeps advancing.
      canvas.dataset.frame = String((frames += 1))

      if (reduceMotion) {
        running = false
        return
      }
      time += 0.02
      frameRef.current = requestAnimationFrame(render)
    }

    const start = () => {
      if (running) return
      running = true
      render()
    }

    // First frame always paints (static under reduced motion); the loop only runs while the orb is on screen and the tab is visible.
    // Drawn from the first animation frame (not synchronously in the effect) so hydration and the consent banner/launcher stay unblocked.
    running = !reduceMotion
    frameRef.current = requestAnimationFrame(render)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !document.hidden && !reduceMotion) start()
      else {
        cancelAnimationFrame(frameRef.current)
        running = false
      }
    })
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameRef.current)
        running = false
      } else if (visible && !reduceMotion) start()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
      io.disconnect()
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />
}
