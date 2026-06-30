'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { healthEducationData, ArticleData } from './data';

export default function Home() {
  const allIds = Object.keys(healthEducationData);
  const [currentId, setCurrentId] = useState<string>('1.1');
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

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

    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${window.location.pathname}?id=${currentId}`);
    }
  }, [currentId]);

  const handleSelectSection = (id: string) => {
    setCurrentId(id);
    const newUrl = `${window.location.pathname}?id=${id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setCurrentUrl(`${window.location.origin}${window.location.pathname}?id=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = allIds.indexOf(currentId);
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  const groupedData = allIds.reduce<Record<string, ArticleData[]>>((groups, id) => {
    const item = healthEducationData[id];
    if (!groups[item.chapter]) {
      groups[item.chapter] = [];
    }
    groups[item.chapter].push(item);
    return groups;
  }, {});

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <p className="text-xl text-gray-600 font-medium">正在加载健康宣教手册...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <header className="bg-red-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🏥</span>
            <h1 className="text-base font-bold">患者家属照护随身宝</h1>
          </div>
          <span className="bg-red-700 text-xs px-2 py-1 rounded-full">
            科室健康宣教系统
          </span>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-4">
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <p className="text-sm text-gray-500 mb-2">当前宣教章节</p>
          <h1 className="text-2xl font-black text-gray-900 leading-snug">
            {article.sectionTitle}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{article.chapter}</p>
        </section>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-2xl font-black text-gray-900 leading-snug mb-3">
            {article.title}
          </h2>

          <section className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 mb-6">
            <h3 className="text-sm font-bold text-amber-800 mb-1">
              💡 为什么必须这么做？
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {article.whyDo}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 mb-1">
              🛠️ 家属具体操作指南
            </h3>

            <div className="space-y-3">
              {article.howTo.map((step, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {article.tips && (
            <section className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
              <h3 className="text-sm font-bold text-red-700 mb-1.5">
                ⚠️ 特别叮嘱与禁忌
              </h3>
              <p className="text-red-900 text-base leading-relaxed">
                {article.tips}
              </p>
            </section>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              disabled={!prevId}
              onClick={() => prevId && handleSelectSection(prevId)}
              className={`py-3 rounded-xl text-sm font-bold ${
                prevId
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-gray-50 text-gray-300'
              }`}
            >
              ← 上一节
            </button>

            <button
              disabled={!nextId}
              onClick={() => nextId && handleSelectSection(nextId)}
              className={`py-3 rounded-xl text-sm font-bold ${
                nextId
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-300'
              }`}
            >
              下一节 →
            </button>
          </div>

          <section className="mt-8 pt-6 border-t border-gray-100 text-center">
            <h3 className="text-sm font-bold text-gray-600 mb-3">
              📱 扫码进入本章节
            </h3>

            {currentUrl && (
              <>
                <div className="inline-block p-3 bg-white rounded-xl border border-gray-200">
                  <QRCodeSVG value={currentUrl} size={190} />
                </div>

                <p className="mt-3 text-xs text-gray-400 break-all">
                  {currentUrl}
                </p>
              </>
            )}
          </section>
        </article>

        <section className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-gray-800 mb-4">
            🧭 科室宣教目录
          </h3>

          <div className="space-y-5">
            {Object.entries(groupedData).map(([chapter, items]) => (
              <div key={chapter}>
                <h4 className="text-sm font-bold text-blue-700 mb-2">
                  {chapter}
                </h4>

                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSection(item.id)}
                      className={`w-full text-left p-3 rounded-xl border text-sm transition ${
                        currentId === item.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-100'
                      }`}
                    >
                      <span className="font-bold mr-2">{item.id}</span>
                      {item.sectionTitle.replace(`${item.id} `, '')}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}