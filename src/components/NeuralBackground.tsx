"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  pulseFactor: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const nodeCount = 80;
    const connectionDistance = 120;
    const mouseConnectionDistance = 180;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    // Initialize nodes
    const initNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulseFactor: Math.random() * Math.PI,
        });
      }
    };

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      // Update and draw nodes
      nodes.forEach((node) => {
        // Drifting motion
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        // Interactive mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 250) {
            // Subtle pull towards mouse
            const force = (250 - dist) / 3500;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }

        // Pulse logic
        node.pulseFactor += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulseFactor) * 0.5;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        
        // Highlight active nodes close to mouse
        let isHighlighted = false;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          if (Math.sqrt(dx * dx + dy * dy) < 120) {
            isHighlighted = true;
          }
        }

        ctx.fillStyle = isHighlighted 
          ? "rgba(0, 242, 254, 0.8)" 
          : "rgba(0, 191, 255, 0.4)";
        
        if (isHighlighted) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(0, 242, 254, 0.8)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            // Check if mouse is near this connection
            let nearMouse = false;
            if (mouse.x !== null && mouse.y !== null) {
              const mx = mouse.x;
              const my = mouse.y;
              // Distance from mouse to midpoint
              const midx = (n1.x + n2.x) / 2;
              const midy = (n1.y + n2.y) / 2;
              const mdist = Math.sqrt((mx - midx) ** 2 + (my - midy) ** 2);
              if (mdist < 100) nearMouse = true;
            }

            ctx.strokeStyle = nearMouse 
              ? `rgba(0, 242, 254, ${alpha * 2})` 
              : `rgba(0, 102, 255, ${alpha})`;
            
            ctx.lineWidth = nearMouse ? 1.2 : 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = n1.x - mouse.x;
          const dy = n1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDistance) {
            const alpha = (1 - dist / mouseConnectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
