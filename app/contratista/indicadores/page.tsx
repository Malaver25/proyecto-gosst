"use client";

import { useState } from "react";

const items = ["Indicadores de la contratista", "Consolidados generales", "Panel de documentos por completar", "Verifique el acceso de sus trabajadores / vehículos"];
function Icon({ type }: { type: number }) {
  const cls = "h-9 w-9 fill-none stroke-white stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]";
  if (type === 0) return <svg className={cls} viewBox="0 0 32 32"><rect x="3" y="4" width="26" height="24" rx="2"/><path d="M3 11h26M10 4v24M20 4v24M3 19h26"/></svg>;
  if (type === 1) return <svg className={cls} viewBox="0 0 32 32"><path d="M8 3h12l8 8v18H8zM20 3v9h8M12 17l12 10M24 17 12 27M3 11v18h5"/></svg>;
  if (type === 2) return <svg className={cls} viewBox="0 0 32 32"><rect x="3" y="4" width="26" height="24" rx="2"/><path d="M10 4v24M3 11h26M3 19h26M6 7h1M13 7h13M6 15h1M13 15h13M6 23h1M13 23h13"/></svg>;
  return <svg className={cls} viewBox="0 0 32 32"><path d="M17 4H5a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V12M10 16l6 6L29 8l-4-4-9 12"/></svg>;
}

export default function IndicatorsPage() {
  const [notice, setNotice] = useState("");
  return <><section className="border-2 border-[#1d4778] bg-white">{items.map((item, index) => <button key={item} className="flex h-[93px] w-full items-center justify-between border-b-[3px] border-[#1d4778] bg-white px-5 text-left text-[24px] text-[#174579] hover:bg-[#f8faff] last:border-b-0 max-[900px]:h-[80px] max-[900px]:text-[19px] max-[600px]:h-[68px] max-[600px]:px-[10px] max-[600px]:text-[16px]" onClick={() => setNotice(`${item} seleccionado`)}><span>{item}</span><i className="ml-[18px] grid h-[52px] w-[55px] shrink-0 place-items-center rounded-[5px] bg-[#1d4778] max-[900px]:h-[44px] max-[900px]:w-[46px] max-[600px]:h-10 max-[600px]:w-10"><Icon type={index}/></i></button>)}</section><div className="absolute bottom-[13%] left-[46%] grid h-[155px] w-[155px] place-content-center rounded-[10px] bg-[#ececec] text-center text-white opacity-90 max-[900px]:hidden"><span className="text-[76px] leading-[68px]">⌨</span><small className="text-[24px]">ABC,</small></div>{notice && <div role="status" className="fixed bottom-6 right-6 z-10 rounded bg-[#1d4778] px-4 py-3 text-white shadow-lg">{notice}<button className="ml-4 text-lg" onClick={() => setNotice("")}>×</button></div>}</>;
}
