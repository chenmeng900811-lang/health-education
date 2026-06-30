'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { healthEducationData } from '../data';

const BASE_URL = 'https://chenmeng900811-lang.github.io/health-education';

export default function QRCodeCenter() {
  const ids = Object.keys(healthEducationData);

  const getUrl = (id: string) => `${BASE_URL}/read?id=${id}`;

  const downloadSVG = (id: string) => {
    const svg = document.getElementById(`qr-${id}`);
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${id}-二维码.svg`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadPNG = (id: string) => {
    const svg = document.getElementById(`qr-${id}`);
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

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
      link.download = `${id}-二维码.png`;
      link.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-6">
      <main className="max-w-5xl mx-auto">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h1 className="text-3xl font-black text-gray-900">
            📱 二维码下载中心
          </h1>
          <p className="mt-2 text-gray-500">
            用于论文、PPT、打印宣教单。二维码固定后，后续只更新网页内容即可。
          </p>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
            正式网址：{BASE_URL}
          </div>

          <button
            onClick={() => window.print()}
            className="mt-4 bg-red-600 text-white px-5 py-3 rounded-xl font-bold print:hidden"
          >
            打印 / 保存为 PDF
          </button>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-black mb-4">
            全部章节二维码（共 {ids.length} 节）
          </h2>

          <div className="space-y-5">
            {ids.map((id) => {
              const item = healthEducationData[id];
              const url = getUrl(id);

              return (
                <div
                  key={id}
                  className="border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-5"
                >
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">
                      {item.chapter}
                    </p>

                    <h3 className="text-lg font-black text-gray-900">
                      {item.sectionTitle}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 break-all">
                      {url}
                    </p>

                    <div className="mt-4 flex gap-2 print:hidden">
                      <a
                        href={url}
                        target="_blank"
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-bold"
                      >
                        预览
                      </a>

                      <button
                        onClick={() => downloadPNG(id)}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold"
                      >
                        下载 PNG
                      </button>

                      <button
                        onClick={() => downloadSVG(id)}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-bold"
                      >
                        下载 SVG
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 w-fit">
                    <QRCodeSVG
                      id={`qr-${id}`}
                      value={url}
                      size={180}
                      level="H"
                      includeMargin
                    />
                    <p className="text-center text-xs text-gray-500 mt-2">
                      {id}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}