'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { healthEducationData, ArticleData } from '../data';

const BASE_URL = 'https://chenmeng900811-lang.github.io/health-education';

export default function ReadPage() {
  const allIds = Object.keys(healthEducationData);
  const [currentId, setCurrentId] = useState('1.1');
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');

    if (idParam && healthEducationData[idParam]) {
      setCurrentId(idParam);
    } else {
      setCurrentId('1.1');
    }
  }, []);

  useEffect(() => {
    setArticle(healthEducationData[currentId] || null);
  }, [currentId]);

  const handleSelectSection = (id: string) => {
    setCurrentId(id);
    setMenuOpen(false);

    const newUrl = `${window.location.pathname}?id=${id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = allIds.indexOf(currentId);
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  const groupedData = allIds.reduce<Record<string, ArticleData[]>>((groups, id) => {
    const item = healthEducationData[id];
    if (!groups[item.chapter]) groups[item.chapter] = [];
    groups[item.chapter].push(item);
    return groups;
  }, {});

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <p className="text-xl text-slate-500">正在加载健康宣教内容...</p>
      </div>
    );
  }

  const qrUrl = `${BASE_URL}/read/?id=${currentId}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="../" className="text-sm font-bold text-slate-500">
            ← 首页
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full bg-blue-50 text-blue-700 px-4 py-2 text-sm font-bold"
          >
            ☰ 全部章节
          </button>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <p className="text-sm font-bold text-blue-600 mb-2">
            {article.chapter}
          </p>

          <h1 className="text-3xl font-black leading-snug text-slate-900">
            {article.sectionTitle}
          </h1>

          <h2 className="mt-4 text-2xl font-black leading-snug text-slate-800">
            {article.title}
          </h2>

          <section className="mt-8 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5">
            <h3 className="text-xl font-black text-amber-800 mb-2">
              💡 为什么必须这么做？
            </h3>
            <p className="text-xl leading-loose text-slate-700">
              {article.whyDo}
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-black text-slate-700 mb-4">
              🛠️ 家属具体操作指南
            </h3>

            <div className="space-y-4">
              {article.howTo.map((step, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-50 border border-slate-100 p-5"
                >
                  <p className="text-xl leading-loose text-slate-800 whitespace-pre-line">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {article.tips && (
            <section className="mt-8 rounded-2xl bg-red-50 border border-red-100 p-5">
              <h3 className="text-xl font-black text-red-700 mb-2">
                ⚠️ 特别叮嘱与禁忌
              </h3>
              <p className="text-xl leading-loose text-red-900">
                {article.tips}
              </p>
            </section>
          )}

          <div className="mt-10 grid grid-cols-2 gap-3">
            <button
              disabled={!prevId}
              onClick={() => prevId && handleSelectSection(prevId)}
              className={`rounded-2xl py-4 text-lg font-bold ${
                prevId
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-slate-50 text-slate-300'
              }`}
            >
              ← 上一节
            </button>

            <button
              disabled={!nextId}
              onClick={() => nextId && handleSelectSection(nextId)}
              className={`rounded-2xl py-4 text-lg font-bold ${
                nextId
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 text-slate-300'
              }`}
            >
              下一节 →
            </button>
          </div>

          <section className="mt-10 text-center">
            <h3 className="text-lg font-black text-slate-600 mb-4">
              📱 扫码进入本章节
            </h3>

            <div className="inline-block bg-white border border-slate-200 rounded-2xl p-4">
              <QRCodeSVG value={qrUrl} size={190} level="H" includeMargin />
            </div>

            <p className="mt-3 text-sm text-slate-400 break-all">
              {qrUrl}
            </p>
          </section>
        </div>
      </section>

      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white shadow-xl overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-black text-slate-900">
                全部章节
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 font-bold"
              >
                关闭
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedData).map(([chapter, items]) => (
                <section key={chapter}>
                  <h3 className="text-sm font-bold text-blue-600 mb-2">
                    {chapter}
                  </h3>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectSection(item.id)}
                        className={`w-full text-left rounded-2xl p-4 text-base ${
                          currentId === item.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="font-black mr-2">{item.id}</span>
                        {item.sectionTitle.replace(`${item.id} `, '')}
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}