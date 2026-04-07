import { useEffect, useRef } from "react";

function SimulatedMap({ driverMoving }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const driverPosRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    driverPosRef.current = 0;

    const route = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x = 28 + t * (w - 56) + Math.sin(t * Math.PI * 2.8) * 16;
      const y = h - 36 - t * (h - 72) + Math.cos(t * Math.PI * 3.2) * 14;
      route.push({ x, y });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 18) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 18) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Roads
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      [55, 110, 170, 230].forEach(y => {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      });
      [45, 125, 195].forEach(x => {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      });

      // Buildings
      ctx.fillStyle = "rgba(255,255,255,0.025)";
      [[8,8,22,22],[155,28,28,18],[75,135,18,28],[195,195,22,14],[35,225,14,22],[165,135,18,18]].forEach(([bx,by,bw,bh]) => {
        ctx.fillRect(bx, by, bw, bh);
      });

      // Route dotted
      ctx.strokeStyle = "rgba(255,212,0,0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      route.forEach((p, i) => { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.stroke();
      ctx.setLineDash([]);

      // Active route
      if (driverMoving) {
        const end = Math.floor(driverPosRef.current);
        if (end > 0) {
          ctx.strokeStyle = "#FFD400";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let i = 0; i <= Math.min(end, route.length - 1); i++) {
            i === 0 ? ctx.moveTo(route[i].x, route[i].y) : ctx.lineTo(route[i].x, route[i].y);
          }
          ctx.stroke();
        }
      }

      // Destination
      const dest = route[route.length - 1];
      ctx.fillStyle = "rgba(255,212,0,0.12)";
      ctx.beginPath(); ctx.arc(dest.x, dest.y, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FFD400";
      ctx.beginPath(); ctx.arc(dest.x, dest.y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 7px sans-serif";
      ctx.fillStyle = "#FFD400";
      ctx.fillText("METRO", dest.x - 14, dest.y - 15);

      // Home
      const home = route[0];
      ctx.fillStyle = "rgba(74,222,128,0.12)";
      ctx.beginPath(); ctx.arc(home.x, home.y, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#4ade80";
      ctx.beginPath(); ctx.arc(home.x, home.y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 7px sans-serif";
      ctx.fillStyle = "#4ade80";
      ctx.fillText("YOU", home.x - 8, home.y + 19);

      // Driver
      if (driverMoving) {
        const idx = Math.min(Math.floor(driverPosRef.current), route.length - 1);
        const dp = route[idx];
        ctx.fillStyle = "rgba(255,212,0,0.18)";
        ctx.beginPath(); ctx.arc(dp.x, dp.y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FFD400";
        ctx.beginPath(); ctx.arc(dp.x, dp.y, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("●", dp.x, dp.y + 2);
        ctx.textAlign = "start";
        driverPosRef.current += 0.12;
        if (driverPosRef.current > route.length - 1) driverPosRef.current = route.length - 1;
      }

      frameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [driverMoving]);

  return <canvas ref={canvasRef} width={248} height={300} style={{ width: "100%", height: "100%" }} />;
}

export default SimulatedMap;
