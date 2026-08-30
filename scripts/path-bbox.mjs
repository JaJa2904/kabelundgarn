/**
 * Compute bounding box of SVG path (M and c commands only).
 * Usage: node scripts/path-bbox.mjs
 */

function parsePathD(d) {
  const tokens = d
    .replace(/([MCmc])/g, " $1 ")
    .replace(/([\d.])(-)/g, "$1 $2")
    .replace(/[\s,]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  let i = 0;
  const points = [];
  let x = 0,
    y = 0;

  while (i < tokens.length) {
    const cmd = tokens[i];
    if (cmd === "M" && i + 2 <= tokens.length) {
      x = parseFloat(tokens[++i]);
      y = parseFloat(tokens[++i]);
      points.push([x, y]);
      i++;
      continue;
    }
    if (cmd === "c" && i + 6 <= tokens.length) {
      const dx1 = parseFloat(tokens[++i]);
      const dy1 = parseFloat(tokens[++i]);
      const dx2 = parseFloat(tokens[++i]);
      const dy2 = parseFloat(tokens[++i]);
      const dx = parseFloat(tokens[++i]);
      const dy = parseFloat(tokens[++i]);
      points.push([x + dx1, y + dy1]);
      points.push([x + dx2, y + dy2]);
      x += dx;
      y += dy;
      points.push([x, y]);
      i++;
      continue;
    }
    if (cmd === "C" && i + 6 <= tokens.length) {
      const x1 = parseFloat(tokens[++i]);
      const y1 = parseFloat(tokens[++i]);
      const x2 = parseFloat(tokens[++i]);
      const y2 = parseFloat(tokens[++i]);
      x = parseFloat(tokens[++i]);
      y = parseFloat(tokens[++i]);
      points.push([x1, y1]);
      points.push([x2, y2]);
      points.push([x, y]);
      i++;
      continue;
    }
    i++;
  }
  return points;
}

function bbox(points, strokePadding = 0) {
  if (points.length === 0) return { minX: 0, minY: 0, maxX: 100, maxY: 100 };
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const [px, py] of points) {
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  }
  if (strokePadding) {
    minX -= strokePadding;
    minY -= strokePadding;
    maxX += strokePadding;
    maxY += strokePadding;
  }
  return { minX, minY, maxX, maxY };
}

const paths = [
  {
    strokeWidth: 4.5592,
    d: "M69.8,84.2c84.3-1.1,107.7,3.1,170.7-17c23.9-7.8,40.8-22,26.4-32.9c-9.2-7-30.4-5.4-33.8,1.6 c-9.5,12.7,33.7,32.7,77.9,38.6c60.2,9.3,130.8,7.9,193.9,7.5c70.9-1.1,143.8,0.1,214.1,2.3",
  },
  {
    strokeWidth: 4.5193,
    d: "M69.4,286.4c29.5-1.2,56.6,2.8,85.5-3.6c4.9-1.1,9.9-2.5,14.4-4.4c13.4-5.3,25.9-21,25.3-35.9 c-2.1-20.2-34.9-1.4-24,23.8c5.1,12,18.3,17.8,30.5,20.5c32,6.7,67.2-0.8,99.9-1.3c22.3-0.7,45.5-0.7,66.7-8.5 c12.3-4.5,25.1-15.2,24.5-29.1c-0.1-8.6-6.5-16.3-14.7-18.1c-9.8-2.5-21.3,2.8-26.1,12.2c-5.6,10.3-2.2,23,6.4,30.9 c7.2,6.8,17.1,10.3,26.7,12.4c47.1,8.4,97-1,144.7-0.2c8.3,0.2,16.7,0.4,25,1.6c12.4,1.7,25.2,6.2,33.6,15.8 c4.8,5.4,7.9,13.7,6.1,19.4c-1.8,7-9.2,10.5-15.3,6c-4.8-3.3-7.7-9.4-7.4-15.4c0.5-13.3,13.5-19.2,24.8-21.8 c30.6-7.6,61.8,3.4,90.7-11c12.3-5.9,22.7-14.9,32.4-24.5",
  },
  {
    strokeWidth: 4.5193,
    d: "M703,379.5c89.4,106.4-203.9,25.8-284,51.7c-12.4,4-25.1,15.2-24.5,29.1c0.1,8.6,6.5,16.3,14.7,18.1 c9.8,2.5,21.3-2.8,26.1-12.2c5.6-10.3,2.2-23-6.4-30.9c-7.2-6.8-17.1-10.3-26.7-12.4C355,414.5,309,436.8,261.3,436 c-8.3-0.2-16.7-0.4-25-1.6c-12.4-1.7-25.2-6.2-33.6-15.8c-4.8-5.4-7.9-13.7-6.1-19.4c1.8-7,9.2-10.5,15.3-6 c4.8,3.3,7.7,9.4,7.4,15.4c-0.5,13.3-13.5,19.2-24.8,21.8c-30.6,7.6-61.8-3.4-90.7,11c-12.3,5.9-22.7,14.9-32.4,24.5",
  },
  {
    strokeWidth: 4.5592,
    d: "M720.2,174.8c-84.3,1.1-107.7-3.1-170.7,17c-23.9,7.8-40.8,22-26.4,32.9c9.2,7,30.4,5.4,33.8-1.6 c9.5-12.7-33.7-32.7-77.9-38.6c-60.2-9.3-130.8-7.9-193.9-7.5c-70.9,1.1-143.8-0.1-214.1-2.3",
  },
];

paths.forEach((p, idx) => {
  const points = parsePathD(p.d);
  const pad = (p.strokeWidth || 4.5) / 2 + 1;
  const b = bbox(points, pad);
  const w = b.maxX - b.minX;
  const h = b.maxY - b.minY;
  console.log(
    `Line ${idx + 1}: viewBox="${b.minX.toFixed(2)} ${b.minY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}" (width=${w.toFixed(1)} height=${h.toFixed(1)})`
  );
});
