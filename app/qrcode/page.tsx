'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { healthEducationData } from '../data';

const BASE_URL = 'https://health-education-lyart.vercel.app';

export default function QRCodeCenter() {
  const ids = Object.keys(healthEducationData);

  const downloadQRCode = (id: string) => {
    const svg = document.getElementById(`qr-${id}`);
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 800;
    canvas.height = 800;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 80, 80, 640, 640);

      const link = document.createElement('a');
      link.download = `${id}-二维码.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <div>
            <h1 className="text-3xl font-black">二维码生成中心</h1>
            <p className="text-gray-500 mt-2">
              用于论文、打印和科室宣教材料
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold"
          >
            打印 / 保存PDF
          </button>
        </div>

        <div className="space-y-8">
          {ids.map((id) => {
            const item = healthEducationData[id];
            const url = `${BASE_URL}/?id=${id}`;

            return (
              <div
                key={id}
                className="border rounded-2xl p-5 flex items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{item.chapter}</p>
                  <h2 className="text-xl font-black mt-1">
                    {item.sectionTitle}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 break-all">
                    {url}
                  </p>

                  <div className="mt-4 print:hidden">
                    <button
                      onClick={() => downloadQRCode(id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                    >
                      下载 PNG
                    </button>
                  </div>
                </div>

                <div className="bg-white p-3 border rounded-xl">
                  <QRCodeSVG
                    id={`qr-${id}`}
                    value={url}
                    size={180}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}