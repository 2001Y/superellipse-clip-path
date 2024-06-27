function superellipse(nX, nY, points) {
  const nX2 = 2 / nX;
  const nY2 = nY ? 2 / nY : nX2;
  const steps = points;
  const step = (2 * Math.PI) / steps;
  const result = [];
  for (let i = 0; i < steps; i++) {
    const t = i * step;
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    const x = Math.sign(cosT) * Math.pow(Math.abs(cosT), nX2) * 50 + 50;
    const y = Math.sign(sinT) * Math.pow(Math.abs(sinT), nY2) * 50 + 50;
    result.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return result.join(', ');
}

function updateClipPath() {
  const aspectRatioSlider = parseFloat(document.getElementById('aspectRatio').value);
  const points = parseInt(document.getElementById('points').value);
  const roundnessX = parseFloat(document.getElementById('roundnessX').value);
  const separateRoundnessY = document.getElementById('separateRoundnessY').checked;
  const roundnessYInput = document.getElementById('roundnessY');
  const roundnessYValueSpan = document.getElementById('roundnessYValue');

  roundnessYInput.disabled = !separateRoundnessY;
  if (!separateRoundnessY) {
    roundnessYInput.value = roundnessX;
    roundnessYValueSpan.textContent = roundnessX.toFixed(2);
  }
  const roundnessY = parseFloat(roundnessYInput.value);

  let aspectRatio, aspectRatioText;
  if (aspectRatioSlider >= 0) {
    aspectRatio = 1 + aspectRatioSlider;
    aspectRatioText = `${aspectRatio.toFixed(2)} : 1`;
  } else {
    aspectRatio = 1 / (1 - aspectRatioSlider);
    aspectRatioText = `1 : ${(1 / aspectRatio).toFixed(2)}`;
  }

  const path = superellipse(roundnessX, roundnessY, points);
  const clipPathValue = `clip-path: polygon(${path});`;

  document.getElementById('clipPath').textContent = clipPathValue;

  const preview = document.getElementById('preview');
  preview.style.clipPath = `polygon(${path})`;

  // プレビューサイズを取得
  const previewSize = parseInt(document.getElementById('previewSize').value);

  // アスペクト比とプレビューサイズを同時に適用
  if (aspectRatio >= 1) {
    preview.style.width = `${previewSize}%`;
    preview.style.height = `${(previewSize / aspectRatio)}%`;
  } else {
    preview.style.width = `${(previewSize * aspectRatio)}%`;
    preview.style.height = `${previewSize}%`;
  }

  // Update displayed values
  document.getElementById('aspectRatioValue').textContent = aspectRatioText;
  document.getElementById('pointsValue').textContent = points;
  document.getElementById('roundnessXValue').textContent = roundnessX.toFixed(2);
  roundnessYValueSpan.textContent = roundnessY.toFixed(2);
  document.getElementById('previewSizeValue').textContent = `${previewSize}%`;
}

// イベントリスナーを追加
document.getElementById('points').addEventListener('input', updateClipPath);
document.getElementById('roundnessX').addEventListener('input', updateClipPath);
document.getElementById('roundnessY').addEventListener('input', updateClipPath);
document.getElementById('separateRoundnessY').addEventListener('change', updateClipPath);
document.getElementById('aspectRatio').addEventListener('input', updateClipPath);
document.getElementById('previewSize').addEventListener('input', updateClipPath);

// 初期化
updateClipPath();
