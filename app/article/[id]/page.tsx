'use client';

import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

interface ManualSection {
  code: string;
  chapter: string;
  title: string;
  subtitle?: string;
  content: string[];
}

const manualData: Record<string, ManualSection> = {
  '1.2': {
    code: '1.2',
    chapter: '第一章 知己知彼——疾病全景认知',
    title: '⏰ 24小时全天候照护日程表',
    subtitle: '重症脑出血患者平稳期家庭护理核心指南',
    content: [
      '一、晨间基础护理（07:00 - 09:00）：1. 唤醒与意识评估：轻轻呼唤患者，观察睁眼、追视及肢体自发动作，确认神志状态。2. 翻身清洁与良肢位摆放：协助温水擦浴，检查尾骶部等骨隆突处皮肤，保持床单干燥。做好口腔护理。3. 管饲与用药：留置胃管者在08:00左右进行晨间管饲（注意抬高床头30°-45°，速度要慢）。',
      '二、日间治疗与康复配合（09:00 - 17:00）：1. 配合查房：简要汇报患者夜间睡眠和排便。2. 定时翻身拍背（核心）：每2小时翻身一次，从下往上、从外向内叩击背部促进排痰。3. 良肢位摆放：协助患侧肢体保持功能位，下午协助进行瘫痪肢体被动康复。',
      '三、晚间安稳与夜间巡视（17:00 - 次日07:00）：1. 傍晚管饲与清洁（17:30 - 19:30）：完成晚间进食，温水擦浴。2. 落实防跌倒/坠床（重中之重）：睡觉前病床两侧床栏牢固拉起，调低床位。3. 夜间巡视：注意观察呼吸模式，如有异常躁动或尿袋过满及时呼叫护士。'
    ]
  },
  '2.2': {
    code: '2.2',
    chapter: '第二章 知己知彼——病房适应与脑出血认知',
    title: '🧠 脑出血是什么？',
    subtitle: '用大白话科普脑血管的“决堤”与吸收期',
    content: [
      '一、什么是脑出血：简单来说，脑出血就是脑子里的血管“决堤”了。血液从破裂的血管漏到了脑组织里，形成了一个血肿。这个血肿会压迫周围正常的脑细胞，导致患者出现一侧肢体没劲、不会说话或者昏迷等表现。',
      '二、医生常说的“吸收期”是什么：血管破裂后，漏出来的血并不会一直待在那里。我们人体有强大的自我清理功能，红细胞会慢慢破碎，周围的细胞会像小清洁工一样把这些残留的血块一点点吞噬、运走。这个过程就叫“吸收期”，通常需要几周到几个月的时间。',
      '三、在这个阶段家属该做什么：吸收期是脑细胞恢复的黄金窗口。家属要做的就是稳住血压（防止血管再次破裂）、保证营养（给大脑修复提供原料）、定时翻身（防止长期卧床引起并发症），静静等待大脑自愈。'
    ]
  }
};

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (id && manualData[id]) {
      setMounted(true);
    }
  }, [id]);

  if (!id || !manualData[id]) {
    return (
      <div style={{ display: 'block', textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', color: '#666' }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px 0', color: '#ccc' }}>404</h1>
        <p style={{ fontSize: '16px' }}>该手册章节正在拼命撰写中，暂未开放扫码...</p>
      </div>
    );
  }

  const data = manualData[id];
  const shareUrl = `${BASE_URL}/article/${id}`;

  return (
    <div style={{ display: 'block', width: '100%', minHeight: '100vh', backgroundColor: '#f4f6f8', padding: '20px 15px', boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'block', maxWidth: '600px', margin: '0 auto 30px auto', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: '25px 20px', boxSizing: 'border-box' }}>
        <div style={{ display: 'block', fontSize: '13px', color: '#007aff', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px' }}>{data.chapter}</div>
        <h1 style={{ display: 'block', fontSize: '22px', color: '#1c1c1e', margin: '0 0 6px 0', fontWeight: '700', lineHeight: '1.3' }}>{data.title}</h1>
        {data.subtitle && <p style={{ display: 'block', fontSize: '14px', color: '#8e8e93', margin: '0 0 20px 0', lineHeight: '1.4' }}>{data.subtitle}</p>}
        
        <div style={{ display: 'block', height: '1px', backgroundColor: '#eee', margin: '20px 0' }}></div>
        
        <div style={{ display: 'block' }}>
          {data.content.map((paragraph, index) => {
            const parts = paragraph.split('：');
            if (parts.length > 1) {
              return (
                <div key={index} style={{ display: 'block', backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '16px', marginBottom: '15px', borderLeft: '4px solid #007aff', boxSizing: 'border-box' }}>
                  <strong style={{ display: 'block', fontSize: '16px', color: '#1c1c1e', marginBottom: '8px' }}>{parts[0]}</strong>
                  <p style={{ display: 'block', fontSize: '14px', color: '#3a3a3c', margin: 0, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{parts.slice(1).join('：')}</p>
                </div>
              );
            }
            return (
              <p key={index} style={{ display: 'block', fontSize: '15px', color: '#3a3a3c', lineHeight: '1.6', marginBottom: '15px', textIndent: '2em' }}>{paragraph}</p>
            );
          })}
        </div>
      </div>

      {mounted && (
        <div style={{ display: 'block', maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', boxSizing: 'border-box' }}>
          <p style={{ fontSize: '13px', color: '#8e8e93', margin: '0 0 12px 0' }}>💡 临床打印专用：下方为当前章节的专属永久宣教二维码</p>
          <div style={{ display: 'block', margin: '0 auto', width: '140px', height: '140px' }}>
            <QRCodeSVG value={shareUrl} size={140} level="H" includeMargin={true} />
          </div>
          <p style={{ fontSize: '12px', color: '#c7c7cc', margin: '8px 0 0 0' }}>章节识别码：{data.code}</p>
        </div>
      )}
    </div>
  );
}