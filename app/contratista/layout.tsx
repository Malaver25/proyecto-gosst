"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

const menu = [
  { label: "Ver indicadores de la contratista", href: "/contratista/indicadores", icon: "▤" },
  { label: "Cargar documentos asociados a proyectos en curso", href: "/contratista/proyectos", icon: "▰", badge: "1" },
  { label: "Cargar documentos asociados a los trabajadores", href: "/contratista/trabajadores", icon: "▤", plus: true },
  { label: "Cargar documentos a nivel empresa contratista (generales)", href: "/contratista/documentos-generales", icon: "▤", plus: true },
  { label: "Cargar documentos asociados a los conductores", href: "/contratista/conductores", icon: "▤", plus: true },
  { label: "Cargar documentos asociados a los vehículos/maquinarias", href: "/contratista/vehiculos", icon: "▤", plus: true },
  { label: "Cargar documentos asociados a los equipos/herramientas", href: "/contratista/equipos", icon: "▤", plus: true },
];

const titles: Record<string, string> = {
  "/contratista/indicadores": "Ver indicadores de la contratista",
  "/contratista/proyectos": "Cargar documentos asociados a proyectos en curso (1)",
  "/contratista/trabajadores": "Cargar documentos asociados a los trabajadores",
  "/contratista/documentos-generales": "Cargar documentos a nivel empresa contratista (generales)",
  "/contratista/conductores": "Cargar documentos asociados a los conductores",
  "/contratista/vehiculos": "Cargar documentos asociados a los vehículos/maquinarias",
  "/contratista/equipos": "Cargar documentos asociados a los equipos/herramientas",
};

function ContractorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Ver indicadores de la contratista";
  return <div className="relative m-[10px] min-h-[calc(100vh-20px)] overflow-hidden rounded-md bg-[#f5f5f5] bg-[linear-gradient(150deg,transparent_0_17%,#e8e9ea_17.1%_31%,transparent_31.1%),linear-gradient(28deg,transparent_0_20%,#e6e7e8_20.1%_34%,transparent_34.1%),linear-gradient(165deg,transparent_0_42%,#ebeced_42.1%_57%,transparent_57.1%),linear-gradient(68deg,transparent_0_67%,#e8e9ea_67.1%_81%,transparent_81.1%),linear-gradient(145deg,transparent_0_77%,#e6e7e8_77.1%_90%,transparent_90.1%),linear-gradient(8deg,#eee_0_12%,transparent_12.1%_100%)] max-[600px]:m-0 max-[600px]:min-h-screen max-[600px]:rounded-none">
    <header className="grid h-[60px] grid-cols-[1fr_2.2fr_1fr] items-center rounded-t-md bg-[#2e7d32] px-[max(7%,calc((100vw-1450px)/2))] text-white shadow-sm max-[900px]:grid-cols-[auto_1fr_auto] max-[900px]:px-[18px] max-[600px]:h-[58px] max-[600px]:grid-cols-[auto_1fr_auto] max-[600px]:px-[10px]">
      <div className="flex items-center gap-2 whitespace-nowrap"><span className="text-[32px] leading-none">◉</span><b className="text-[23px] font-medium tracking-wide max-[600px]:text-[17px]">AITANA</b></div>
      <div className="whitespace-nowrap text-center text-[18px] max-[900px]:whitespace-normal max-[900px]:text-[14px] max-[600px]:px-2 max-[600px]:text-[11px]">Tu Gestor Online de Seguridad y Salud en el Trabajo te da la Bienvenida</div>
      <div className="flex items-center justify-end gap-[5px] whitespace-nowrap"><span className="mr-[30px] rotate-[-12deg] text-[26px] max-[600px]:hidden">▰</span><span className="grid h-7 w-7 place-items-center rounded-full border-[3px] border-white text-[20px]">♙</span><span className="text-[13px] max-[600px]:text-[10px]">GRUPO ELIAS-.</span></div>
    </header>
    <div className="mt-[10px] flex min-h-[76px] items-center border border-[#1d4778] bg-white pl-[max(3.6%,calc((100vw-1784px)/2))] py-2 text-[36px] text-[#174579] max-[900px]:pl-[5%] max-[900px]:text-[24px] max-[600px]:mt-[7px] max-[600px]:min-h-[58px] max-[600px]:pl-4 max-[600px]:text-[20px]">{title}</div>
    <main className="relative z-[1] mx-auto mt-[15px] grid w-[93%] grid-cols-[404px_900px] items-start gap-4 max-[1100px]:grid-cols-[minmax(260px,34%)_1fr] max-[900px]:w-[90%] max-[600px]:mx-auto max-[600px]:mt-3 max-[600px]:w-[calc(100%-24px)] max-[600px]:grid-cols-1 max-[600px]:gap-3">
      <aside className="overflow-hidden rounded-[5px] border border-[#ddd] bg-[#d5d2c8]">
        <div className="flex h-[60px] items-center gap-[13px] bg-white px-[18px] text-[21px] text-[#174579] max-[900px]:px-[10px] max-[900px]:text-base max-[600px]:h-[48px]"><span>♟</span><b className="font-semibold">Perfil GRUPO ELIAS-29 S.A.C</b></div>
        {menu.map((item, index) => <Link key={item.href} href={item.href} className={`flex min-h-[90px] items-start gap-2 border-t border-[#e9e7e1] px-[19px] py-[15px] text-[21px] leading-[27px] text-black hover:bg-[#e2dfd7] max-[900px]:min-h-[70px] max-[900px]:px-[10px] max-[900px]:py-3 max-[900px]:text-[15px] max-[600px]:min-h-[58px] max-[600px]:text-[14px] max-[600px]:leading-[19px] ${pathname === item.href ? "border-y border-[#1d4778] bg-[#d7e0f1] text-[#174579]" : "bg-[#d5d2c8]"}`}><span className="shrink-0 font-bold">{item.icon}</span><span className="flex-1">{item.label}{item.plus && <b className="ml-1">⊕</b>}</span>{item.badge && <i className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] border-2 border-[#1d4778] bg-white text-xl not-italic">{item.badge}</i>}</Link>)}
        <button className="h-[60px] w-full border-t border-[#ddd] bg-white px-[18px] text-left text-[20px] font-semibold text-[#174579] max-[600px]:h-[44px] max-[600px]:text-[14px]"><span className="mr-[9px]">⚑</span>Comunicación con el Cliente</button>
      </aside>
      <div className="min-w-0">{children}</div>
    </main>
  </div>;
}

export default function ContractorLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5]" /> }><ContractorShell>{children}</ContractorShell></Suspense>;
}
