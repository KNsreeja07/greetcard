import { Template } from '../data/templates';

interface ComposeOptions {
  template: Template;
  userName: string;
  userPhoto: string | null;
  bgImage?: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function composeImage(options: ComposeOptions): Promise<string> {
  const { template, userName, userPhoto, bgImage } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;


  const bg = await loadImage(bgImage ?? template.image);  // ← change this line
  ctx.drawImage(bg, 0, 0, 800, 800);


  const grad = ctx.createLinearGradient(0, 500, 0, 800);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 800);

  const photoSize = (template.photoSize / 100) * 800;
  const photoX = (template.photoPosition.x / 100) * 800;
  const photoY = (template.photoPosition.y / 100) * 800;

  if (userPhoto) {
    try {
      const photo = await loadImage(userPhoto);
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX, photoY, photoSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(photo, photoX - photoSize / 2, photoY - photoSize / 2, photoSize, photoSize);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX, photoY, photoSize / 2 + 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    } catch {
      drawPlaceholderAvatar(ctx, photoX, photoY, photoSize, userName);
    }
  } else {
    drawPlaceholderAvatar(ctx, photoX, photoY, photoSize, userName);
  }


  const nameX = (template.namePosition.x / 100) * 800;
  const nameY = (template.namePosition.y / 100) * 800;
  ctx.font = 'bold 36px Georgia, serif';
  ctx.fillStyle = template.textColor;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 8;
  ctx.fillText(userName, nameX, nameY);
  ctx.shadowBlur = 0;

  return canvas.toDataURL('image/jpeg', 0.92);
}

function drawPlaceholderAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  name: string
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), x, y);
  ctx.textBaseline = 'alphabetic';
  ctx.restore();
}
