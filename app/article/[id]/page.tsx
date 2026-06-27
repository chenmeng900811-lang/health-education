import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

// 重症脑出血主要照顾者图文/视频照护手册数据源
const manualData: Record<string, { title: string; chapter: string; code: string; isVideo?: boolean; videoUrl?: string; content: string[] }> = {
  '1.1': {
    code: '1.1',
    chapter: '第一章 手册前置内容',
    title: '🚨 应急呼救安全红线（急救卡已单独打印）',
    content: [
      '一、红线指标（一旦出现，立即呼救）：患者突发意识不清、呼之不应；剧烈呕吐（呈喷射状）；肢体抽搐；呼吸困难或突然面色青紫。',
      '二、病房应急：若在普通病房发生上述情况，立即按下床头呼叫器，并大声呼唤值班医护人员。',
      '三、居家应急（未来出院后）：立即拨打 120 急救电话，清晰报出家庭住址与患者意识状态。解开患者领口，将其头偏向一侧，防止呕吐物误吸引起窒息。保持电话畅通。'
    ]
  },
  '1.2': {
    code: '1.2',
    chapter: '第一章 手册前置内容',
    title: '📅 每日照护日程安排',
    content: [
      '一、清晨准备与基础照护（07:00 - 09:00）\n1. 晨间清洁：协助患者洗脸、温水擦拭双手，做好口腔护理。 \n2. 体位与皮肤检查：配合护士翻身，检查骶尾部等骨隆突处皮肤。 \n3. 管饲与用药：留置胃管者在 08:00 左右进行晨间管饲（注意抬高床头 30°-45°，速度要慢）。',
      '二、日间治疗与康复配合（09:00 - 17:00）\n1. 配合查房：简要汇报患者夜间睡眠和排便。 \n2. 定时翻身拍背（核心）：每 2 小时翻身一次，从下往上、从外向内叩击背部促进排痰。 \n3. 良肢位摆放：协助患侧肢体保持功能位，下午协助进行瘫痪肢体被动康复。',
      '三、晚间安稳与夜间巡视（17:00 - 次日 07:00）\n1. 傍晚管饲与清洁（17:30 - 19:30）：完成晚间进食，温水擦浴。 \n2. 落实防跌倒/坠床（重中之重）：睡觉前病床两侧床栏牢固拉起，调低床位。 \n3. 夜间巡视：注意观察呼吸模式，如有异常躁动或尿袋过满及时呼叫护士。'
    ]
  },
  '1.3': {
    code: '1.3',
    chapter: '第一章 手册前置内容',
    title: '🔄 由 ICU 转普通病房流程',
    content: [
      '一、心理过渡与角色转变：转出 ICU 意味着生命体征平稳，进入普通病房后采取家属陪护制。请不要恐慌，医护团队会全程协助。',
      '二、日常生活物品准备：备齐 R 型翻身垫、大号一次性护理垫、50ml 鼻饲注射器、软毛牙刷/棉签、成人纸尿裤等。',
      '三、床边无缝交接（核心配合）：ICU 护士会与病房护士进行现场床边交接（核对皮肤、管道刻度通畅度）。请家属安静等待并倾听首次入院健康宣教。'
    ]
  },
  '2.1': {
    code: '2.1',
    chapter: '第二章 知己知彼——病房适应与脑出血基础知识',
    title: '📺 新环境的适应与设备使用',
    isVideo: true, // 标记为视频模块
    content: [
      '核心要点 1：病床的多功能摇杆操作（如何正确抬高床头 30°-45° 防止误吸）。',
      '核心要点 2：壁式吸氧装置与心电监护仪基础数值（心率、血氧）看懂指南。',
      '核心要点 3：床边绿色呼叫器的正确按压与紧急使用时机。'
    ]
  }
};
'2.2': {
    code: '2.2',
    chapter: '第二章 知己知彼——病房适应与脑出血基础知识',
    title: '🧠 脑出血是什么？',
    content: [
      '一、通俗易懂算一笔“水管账”：\n人体的大脑里布满了密密麻麻的微小血管。脑出血，简单来说，就像是脑子里的一条“小水管”因为承受不住压力突然破裂了，血液流了出来。流出来的血液会压迫周围正常的脑组织，从而导致患者突然说不出话、半边身体不能动、甚至陷入昏迷。',
      '二、为什么在 ICU 期间不让家属陪？\n刚出血的几天是脑水肿的高峰期，病情瞬息万变。“水管”随时有再次破裂的危险。ICU 里面有全天候的心电监护、呼吸机和专业的NICU医护团队，能够第一时间发现并处理各种微小的病情变化，帮患者平稳度过最危险的急性期。',
      '三、转入普通病房意味着什么？\n能转入普通病房，说明最危险的急性期已经挺过来了，破裂的血管已经初步封堵，生命体征也基本稳定。接下来的核心任务是：预防并发症（如肺部感染、抽搐）以及开始长期的康复锻炼。照顾者的悉心看护在这一阶段甚至比吃药更重要！'
    ]
  },
  '2.3': {
    code: '2.3',
    chapter: '第二章 知己知彼——病房适应与脑出血基础知识',
    title: '📈 危险因素控制（血压/情绪/排便管理）',
    content: [
      '一、血压管理（重中之重，预防再出血的绝对红线）：\n脑出血后，血压过高是再次破裂出血的头号杀手。请务必遵医嘱定时给患者服用降压药。家属在陪护时，如果发现监护仪上的血压“收缩压（高压）”突然超过了医生交代的安全上限（通常为 140-160 mmHg），必须立即通知护士，绝不能自行加药或减药。',
      '二、情绪与心理管理（避免波动）：\n清醒的患者面对突如其来的瘫痪往往极度焦虑、愤怒或悲伤。家属要采取“理解、倾听”的平等姿态，不要用“你怎么又不听话”等说教或责备的语气。保持病房安静，避免过多亲友探视导致患者情绪激动或过度劳累，从而间接引起血压飙升。',
      '三、排便管理（绝对禁用力排便）：\n用力排便时，腹压瞬间增高，会使颅内压急剧上升，极易诱发再次脑出血！家属需密切关注患者排便情况。如果超过 2 天没有排便，切勿让患者用力憋气死撑，应及时告诉护士，通过开塞露或遵医嘱使用缓泻剂协助排便。日常饮食中在管饲允许范围内需适当增加膳食纤维和水分。'
    ]
  },
  '2.4': {
    code: '2.4',
    chapter: '第二章 知己知彼——病房适应与脑出血基础知识',
    title: '🛏️ 跌倒与坠床的预防及处理',
    content: [
      '一、普通病房环境防范红线：\n脑出血患者多伴有偏瘫、视物模糊或意识障碍，极易发生跌倒或坠床。请严格落实“八字方针”：锁好车轮（病床）、拉高床栏、地面干燥、叫人帮忙。家属离开床边时，哪怕只是去洗手间打个水，也必须把两侧床栏死死拉起！',
      '二、高危活动时段的看护配合：\n当协助患者在床边坐起、移至轮椅、或上厕所时，家属必须全程“贴身紧跟守护”。严格执行“3个30秒”原则：醒后坐起 30 秒，床边垂腿 30 秒，站立站稳 30 秒，确定没有任何头晕后再移动。',
      '三、万一发生跌倒/坠床的应急处理：\n若不慎发生跌倒或坠床，家属千万不要惊慌失措地强行将患者一把抱起或拖拽（这可能加重脑部二次损伤或骨折）！应当立即按下床头呼叫器请医护人员到场，并在现场配合护士检查患者意识、瞳孔及肢体活动情况，协助医生将患者安全移回病床。'
    ]
  },
  '2.5': {
    code: '2.5',
    chapter: '第二章 知己知彼——病房适应与脑出血基础知识',
    title: '🦵 下肢深静脉血栓（DVT）的预防与照护',
    content: [
      '一、什么是 DVT？为什么要高度警惕？\n下肢深静脉血栓（DVT）是指血液在下肢深静脉血管里不正常地凝结成了块。脑出血偏瘫患者由于肢体长期卧床不动，血流极度缓慢，极易长血栓。血栓一旦脱落，会顺着血管跑到肺里堵住呼吸，引起“肺栓塞”，那是瞬间致命的临床极其危重的并发症！',
      '二、家属在床边能做的高效预防动作：\n1. 被动向心性按摩（每日数次）：家属可用双手从患者的脚踝、小腿向大腿方向进行向心性挤压按摩，促进静脉血液回流。 \n2. 踝泵运动（核心动作）：协助患者进行足踝部的屈伸及环绕运动（即脚尖用力往下踩，再用力往上勾），每次坚持数秒，高频次进行，这被称为“下肢肌肉泵”。 \n3. 配合主班护士：定时检查并规范为患者穿戴抗血栓压力袜（梯度压力袜）或配合床边空气波压力治疗仪治疗。',
      '三、血栓形成的危险信号捕捉：\n日常擦浴时，家属要留心观察患者双下肢。如果发现患侧肢体（瘫痪侧）相比健侧出现明显的“肿胀、皮肤发红、皮温发烫”，或者清醒患者主诉小腿肚子胀痛剧烈，**此时千万不要用力去揉搓、按摩该肢体（极易揉脱落血栓）**，必须让患者保持双腿不动，立即呼叫值班护士排查。'
    ]
  }
export default async function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const article = manualData[id];

  if (!article) {
    return (
      <div className="p-8 text-center bg-white min-h-screen flex flex-col items-center justify-center">
        <p className="text-amber-500 text-xl font-bold mb-2">⚠️ 正在加紧排版中</p>
        <p className="text-slate-400 text-sm mb-6">手册章节 {id} 尚未录入或路径输入有误</p>
        <a href="/" className="text-blue-500 font-medium text-sm border border-blue-200 px-4 py-2 rounded-full shadow-sm">返回目录</a>
      </div>
    );
  }

  // 支持局域网及本地测试网址
  const shareUrl = `http://localhost:3000/article/${id}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-sans">
      {/* 顶部面包屑导航 */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 flex flex-col shadow-sm z-10">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium text-sm">🧠 脑出血主要照顾者手册</span>
          <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold">
            节编号: {article.code}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 font-normal">{article.chapter}</div>
      </header>

      {/* 宣教核心卡片 */}
      <main className="max-w-md mx-auto p-4 mt-2">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 mb-6 leading-snug">{article.title}</h1>
          
          {/* 如果是视频模块，直接在这里画一个播放器外壳 */}
          {article.isVideo ? (
            <div className="mb-6 rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-slate-950 aspect-video flex flex-col items-center justify-center relative p-4 group">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-slate-900 cursor-pointer hover:scale-105 transition-transform">
                <span className="text-xl ml-1">▶</span>
              </div>
              <span className="text-white/60 text-xs mt-3 font-mono tracking-wider bg-black/40 px-3 py-1 rounded-full">
                演示视频：点击进入播放
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div className="w-1/3 h-full bg-blue-500"></div>
              </div>
            </div>
          ) : null}

          <div className="space-y-4">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 临床打印专用二维码 */}
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 mt-6 shadow-sm flex flex-col items-center">
          <div className="bg-emerald-50 text-emerald-700 text-[11px] px-3 py-1 rounded-full font-bold mb-4">
            照顾者扫码端 · 独立密匙卡
          </div>
          
          <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xl mb-4">
            <QRCodeSVG value={shareUrl} size={150} fgColor="#0f172a" level="H" />
          </div>
          
          <p className="text-[11px] text-slate-400 max-w-[240px] text-center leading-normal">
            家属扫码路径：<code className="text-blue-600 font-mono font-bold">/article/{id}</code><br/>
            <span className="text-[10px] text-slate-300">内容实时更替 · 纸质卡片终身免换</span>
          </p>
        </div>
      </main>
    </div>
  );
}