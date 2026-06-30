export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-slate-100 px-6 py-10 text-center">
        <img
          src="./neurocare-logo.png"
          alt="NeuroCare 标志"
          className="mx-auto mb-6 h-28 w-28 object-contain"
        />

        <h1 className="text-3xl font-black text-slate-900 leading-snug">
          神经外科健康宣教平台
        </h1>

        <p className="mt-2 text-xl font-semibold text-blue-600">
          NeuroCare
        </p>

        <p className="mt-8 text-xl leading-loose text-slate-700">
          希望帮助您
          <br />
          更好地理解疾病，
          <br />
          更安心地陪伴家人康复。
        </p>

        <div className="mt-10 grid gap-4">
          <a
            href="./read"
            className="block rounded-2xl bg-blue-600 px-6 py-5 text-xl font-bold text-white shadow-sm"
          >
            👨‍👩‍👧 患者 / 家属：进入健康宣教
          </a>

          <a
            href="./qrcode"
            className="block rounded-2xl bg-slate-100 px-6 py-5 text-xl font-bold text-slate-700"
          >
            👩‍⚕️ 医护人员：进入工具箱 🔒
          </a>
        </div>

        <footer className="mt-12 pt-8 text-base leading-loose text-slate-500">
          <p>
            本平台用于健康宣教与科研交流，
            <br />
            内容依据公开医学指南及循证证据整理，
            <br />
            不能替代医师面对面的诊疗意见，
            <br />
            具体诊疗请遵医嘱。
          </p>

          <p className="mt-6 text-lg font-bold text-blue-600 leading-relaxed">
            愿每一位患者都能获得
            <br />
            更易理解、更有温度的健康宣教。
          </p>

          <div className="mt-6 text-slate-500">
            <p>开发单位：</p>
            <p>湖南省人民医院</p>
            <p>神经外科二病区</p>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            © 2026 NeuroCare
          </p>
        </footer>
      </div>
    </main>
  );
}