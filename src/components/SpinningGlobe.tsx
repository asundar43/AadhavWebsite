"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
// @ts-expect-error - d3 types are optional
import * as d3 from "d3"
// @ts-expect-error - topojson-client types are optional
import { feature } from "topojson-client"
import { motion } from "framer-motion"

interface GeoFeature {
  type: string
  geometry: unknown
  properties: unknown
  id?: string
}

// Country data with relative values (higher = more users/activity)
const countryValues: Record<string, number> = {
  "840": 100, // USA
  "616": 90,  // Poland
  "356": 50,  // India
  "124": 45,  // Canada
  "276": 45,  // Germany
  "380": 45,  // Italy
  "826": 40,  // United Kingdom
  "036": 35,  // Australia
  "352": 30,  // Iceland
  "724": 30,  // Spain
  "300": 28,  // Greece
  "528": 28,  // Netherlands
  "578": 28,  // Norway
  "586": 28,  // Pakistan
  "076": 25,  // Brazil
  "152": 25,  // Chile
  "818": 25,  // Egypt
  "360": 25,  // Indonesia
  "484": 25,  // Mexico
  "504": 25,  // Morocco
  "642": 25,  // Romania
  "643": 25,  // Russia
  "710": 25,  // South Africa
  "756": 25,  // Switzerland
  "784": 25,  // UAE
  "040": 20,  // Austria
  "056": 20,  // Belgium
  "100": 20,  // Bulgaria
  "170": 20,  // Colombia
  "208": 20,  // Denmark
  "372": 20,  // Ireland
  "400": 20,  // Jordan
  "414": 20,  // Kuwait
  "434": 20,  // Libya
  "440": 20,  // Lithuania
  "442": 20,  // Luxembourg
  "470": 20,  // Malta
  "478": 20,  // Mauritania
  "554": 20,  // New Zealand
  "566": 20,  // Nigeria
  "600": 20,  // Paraguay
  "608": 20,  // Philippines
  "620": 20,  // Portugal
  "634": 20,  // Qatar
  "682": 20,  // Saudi Arabia
  "792": 20,  // Turkey
  "800": 20,  // Uganda
  "348": 20,  // Hungary
  "368": 20,  // Iraq
  "764": 20,  // Thailand
}

// Color scale for countries based on value
const getCountryColor = (countryId: string): string => {
  const value = countryValues[countryId]
  if (!value) return "rgba(255, 255, 255, 0.06)"
  
  const normalizedValue = (value - 20) / 80
  const opacity = 0.15 + normalizedValue * 0.55
  return `rgba(20, 184, 166, ${opacity})`
}

const getCountryStroke = (countryId: string): string => {
  const value = countryValues[countryId]
  if (!value) return "rgba(255, 255, 255, 0.1)"
  
  const normalizedValue = (value - 20) / 80
  const opacity = 0.3 + normalizedValue * 0.5
  return `rgba(20, 184, 166, ${opacity})`
}

export default function SpinningGlobe() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [worldData, setWorldData] = useState<GeoFeature[]>([])
  const rotationRef = useRef<[number, number]>([0, -25])
  const velocityRef = useRef<[number, number]>([0.4, 0])
  const animationRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const lastMouseRef = useRef<[number, number]>([0, 0])

  const width = 500
  const height = 500
  const scale = 200

  // Load world data
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        const world = await response.json()
        const countries = feature(world, world.objects.countries).features
        setWorldData(countries as GeoFeature[])
      } catch (error) {
        console.error("Error loading world data:", error)
      }
    }
    loadWorldData()
  }, [])

  const render = useCallback(() => {
    if (!svgRef.current || worldData.length === 0) return

    const svg = d3.select(svgRef.current)
    
    const projection = d3.geoOrthographic()
      .scale(scale)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(0.1)
      .rotate([rotationRef.current[0], rotationRef.current[1], 0])

    const path = d3.geoPath(projection)
    
    svg.selectAll("*").remove()

    // Add gradient definitions
    const defs = svg.append("defs")
    
    // Globe gradient - darker, more subtle
    const globeGradient = defs.append("radialGradient")
      .attr("id", "globe-gradient")
      .attr("cx", "35%")
      .attr("cy", "35%")
    
    globeGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0d1117")
    
    globeGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#010409")

    // Glow filter for highlighted countries
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%")
    
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2")
      .attr("result", "coloredBlur")
    
    const feMerge = filter.append("feMerge")
    feMerge.append("feMergeNode").attr("in", "coloredBlur")
    feMerge.append("feMergeNode").attr("in", "SourceGraphic")

    // Draw sphere background (ocean)
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", scale)
      .attr("fill", "url(#globe-gradient)")

    // Draw graticule (grid lines) - very subtle
    const graticule = d3.geoGraticule().step([20, 20])
    svg.append("path")
      .datum(graticule())
      .attr("d", path as unknown as string)
      .attr("fill", "none")
      .attr("stroke", "rgba(255, 255, 255, 0.03)")
      .attr("stroke-width", 0.5)

    // Draw countries with relative coloring
    svg.selectAll(".country")
      .data(worldData)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (d: GeoFeature) => path(d as d3.GeoPermissibleObjects) || "")
      .attr("fill", (d: GeoFeature) => {
        const countryId = String(d.id || (d.properties as { id?: string })?.id || "")
        return getCountryColor(countryId)
      })
      .attr("stroke", (d: GeoFeature) => {
        const countryId = String(d.id || (d.properties as { id?: string })?.id || "")
        return getCountryStroke(countryId)
      })
      .attr("stroke-width", 0.5)
      .attr("filter", (d: GeoFeature) => {
        const countryId = String(d.id || (d.properties as { id?: string })?.id || "")
        return countryValues[countryId] && countryValues[countryId] >= 40 ? "url(#glow)" : ""
      })

    // Subtle atmosphere ring
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", scale + 1)
      .attr("fill", "none")
      .attr("stroke", "rgba(20, 184, 166, 0.1)")
      .attr("stroke-width", 2)
  }, [worldData])

  // Animation loop
  useEffect(() => {
    if (worldData.length === 0) return

    const animate = () => {
      if (!isDraggingRef.current) {
        // Auto-rotate when not dragging
        rotationRef.current = [
          rotationRef.current[0] + velocityRef.current[0],
          rotationRef.current[1] + velocityRef.current[1]
        ]
        
        // Gradually restore vertical rotation to -25 (tilted axis)
        if (Math.abs(rotationRef.current[1] + 25) > 0.1) {
          rotationRef.current[1] += (-25 - rotationRef.current[1]) * 0.02
        }
      }
      
      render()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [worldData, render])

  // Mouse/touch handlers for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    lastMouseRef.current = [e.clientX, e.clientY]
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    
    const dx = e.clientX - lastMouseRef.current[0]
    const dy = e.clientY - lastMouseRef.current[1]
    
    // Rotate based on drag
    const sensitivity = 0.3
    rotationRef.current = [
      rotationRef.current[0] + dx * sensitivity,
      Math.max(-60, Math.min(60, rotationRef.current[1] - dy * sensitivity))
    ]
    
    lastMouseRef.current = [e.clientX, e.clientY]
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-8 relative"
      style={{ overflow: 'visible' }}
    >
      {/* Header with centered stats */}
      <div className="flex flex-col items-center text-center mb-8 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#14b8a6", boxShadow: "0 0 12px #14b8a6" }} />
          <h3 className="font-mono text-xs text-muted uppercase tracking-wider">
            Global Reach — Auralis
          </h3>
        </div>
        <p className="text-2xl md:text-3xl font-medium tracking-tight">
          <span className="text-foreground/70">Thousands of users across </span>
          <span 
            className="font-bold"
            style={{ 
              background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #14b8a6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(20, 184, 166, 0.4))"
            }}
          >
            50+ countries
          </span>
        </p>
      </div>

      <div 
        className="relative w-full flex justify-center items-center py-4"
        style={{ 
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        }}
      >
        {/* Sun rays - positioned relative to globe */}
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '250vw',
            height: '400px',
            left: '50%',
            top: '50%',
            transform: 'translate(-40%, -50%) rotate(-12deg)',
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                transparent 35%,
                rgba(20, 184, 166, 0.04) 42%,
                rgba(6, 182, 212, 0.08) 50%,
                rgba(20, 184, 166, 0.04) 58%,
                transparent 65%,
                transparent 100%
              )
            `,
            zIndex: 0,
          }}
        />
        
        {/* Secondary ray */}
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '250vw',
            height: '200px',
            left: '50%',
            top: '60%',
            transform: 'translate(-45%, -50%) rotate(-6deg)',
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                transparent 38%,
                rgba(20, 184, 166, 0.03) 45%,
                rgba(6, 182, 212, 0.05) 52%,
                rgba(20, 184, 166, 0.03) 59%,
                transparent 66%,
                transparent 100%
              )
            `,
            zIndex: 0,
          }}
        />
        
        {/* Large ambient glow behind globe */}
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(6, 182, 212, 0.06) 30%, transparent 60%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Tighter glow ring */}
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, transparent 35%, rgba(20, 184, 166, 0.08) 45%, rgba(20, 184, 166, 0.15) 50%, rgba(6, 182, 212, 0.08) 55%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
        
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[400px] h-auto relative z-10"
          preserveAspectRatio="xMidYMid meet"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: 'none' }}
        />
      </div>
    </motion.div>
  )
}
