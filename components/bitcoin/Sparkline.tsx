'use client';

import { useEffect, useRef } from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  isPositive?: boolean;
}

export default function Sparkline({
  data,
  width = 60,
  height = 20,
  color,
  isPositive = true
}: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate min/max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const baseColor = color || (isPositive ? '16, 185, 129' : '239, 68, 68'); // emerald-500 or red-500
    gradient.addColorStop(0, `rgba(${baseColor}, 0.8)`);
    gradient.addColorStop(1, `rgba(${baseColor}, 0.3)`);

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${baseColor}, 1)`;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw area fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [data, width, height, color, isPositive]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="inline-block"
    />
  );
}
