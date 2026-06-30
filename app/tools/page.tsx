'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function ToolsPage() {
  const [url, setUrl] = useState('');
  const [finalUrl, setFinalUrl] = useState('');

  const generateQRCode = () => {
    if (!url.trim()) {
      alert('请先输入网址');
      return;
    }

    let cleanUrl = url.trim();

    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    setFinalUrl(cleanUrl);
  };

  const downloadSVG = () => {
    const svg = document.getElementById('custom-qr-code');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = '二维码.svg';
    link.click();

    URL.revokeObjectURL(objectUrl);
  };

  const downloadPNG = () => {
    const svg = document.getElementById('custom-qr-code');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });

    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1000;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.drawImage(img, 100, 100, 800, 800);

      const pngUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = '二维码.png';
      link.click();

      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-100 bg-white px-6 py-8 shadow-sm">
        <a href="../" className="text-sm font-bold text-slate-500">
          ← 返回首页
        </a>

        <h1 className="mt-6 text-3xl font-black text-slate-900">
          🔗 任意网址二维码
        </h1>

        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          输入任意网址，即可生成二维码，用于视频、PDF、网页或其他宣教资料。
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-lg font-bold text-slate-700">
            请输入网址
          </label>

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="例如：https://example.com"
            className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-lg outline-none focus:border-blue-500"
          />

          <button
            onClick={generateQRCode}
            className="mt-4 w-full rounded-2xl bg-blue-600 px-6 py-5 text-xl font-bold text-white"
          >
            生成二维码
          </button>
        </div>

        {finalUrl && (
          <section className="mt-10 text-center">
            <div className="inline-block rounded-2xl border border-slate-200 bg-white p-4">
              <QRCodeSVG
                id="custom-qr-code"
                value={finalUrl}
                size={220}
                level="H"
                includeMargin
              />
            </div>

            <p className="mt-4 break-all text-sm text-slate-400">
              {finalUrl}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={downloadPNG}
                className="rounded-2xl bg-blue-600 px-4 py-4 text-lg font-bold text-white"
              >
                下载 PNG
              </button>

              <button
                onClick={downloadSVG}
                className="rounded-2xl bg-green-600 px-4 py-4 text-lg font-bold text-white"
              >
                下载 SVG
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}