"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState, type ReactNode } from "react";

const workerTabs = [
  { label: "Trabajadores", slug: "trabajadores", icon: "♣" },
  { label: "Hoja de vida", slug: "hoja-de-vida", icon: "▣" },
  { label: "SCTR", slug: "sctr", icon: "▱" },
  { label: "Cargo reglamento Cliente", slug: "cargo-reglamento-cliente", icon: "▣" },
  { label: "Equipos de Protección Personal", slug: "equipos-proteccion-personal", icon: "⚑" },
  { label: "Inducciones SST de la contratista", slug: "inducciones-sst-contratista", icon: "☷" },
  { label: "Certificado de capacitación para trabajo de alto riesgo", slug: "certificado-trabajo-alto-riesgo", icon: "⚠" },
  { label: "Prevencionista", slug: "prevencionista", icon: "▧" },
  { label: "Certificado único laboral", slug: "certificado-unico-laboral", icon: "▤" },
  { label: "Habilitación médica por clínica", slug: "habilitacion-medica-clinica", icon: "▤" },
  { label: "Seguro vida ley", slug: "seguro-vida-ley", icon: "▤" },
  { label: "Documento de identidad", slug: "documento-identidad", icon: "▤" },
  { label: "Inducción SSOMA del cliente", slug: "induccion-ssoma-cliente", icon: "▤" },
  { label: "Registro de capacitación en procedimiento de trabajo", slug: "registro-capacitacion-procedimiento", icon: "▤" },
  { label: "Registro de difusión de política de seguridad del cliente", slug: "registro-difusion-politica-seguridad", icon: "▤" },
  { label: "Capacitación en reporte de accidentes e incidentes (flujograma)", slug: "capacitacion-reporte-accidentes", icon: "▤" },
  { label: "Registro de capacitación por puesto de trabajo", slug: "registro-capacitacion-puesto", icon: "▤" },
  { label: "Registro de capacitación de IPERC de la contratista", slug: "registro-capacitacion-iperc", icon: "▤" },
];

const companyTabs = [
  { label: "Clínica (Certificación DIGESA)", slug: "clinica-certificacion-digesa" },
];

const driverTabs = [
  { label: "Conductores", slug: "", icon: "👥" },
  { label: "Licencia de conducir", slug: "licencia-de-conducir", icon: "▤" },
  { label: "Certificado de capacitación en normas de tránsito y manejo defensivo", slug: "capacitacion-transito-manejo-defensivo", icon: "▤" },
  { label: "Historial de manejo o récord del conductor", slug: "historial-de-manejo", icon: "▤" },
  { label: "Certificado de operador de maquinaria", slug: "operador-de-maquinaria", icon: "▤" },
];

const vehicleTabs = [
  { label: "Vehículos/Maquinarias", slug: "", icon: "🚘" },
  { label: "Inspección técnica", slug: "inspeccion-tecnica", icon: "▤" },
  { label: "Póliza contra todo riesgo", slug: "poliza-contra-todo-riesgo", icon: "▤" },
  { label: "SOAT", slug: "soat", icon: "▤" },
  { label: "Tarjeta/Constancia de propiedad del equipo", slug: "tarjeta-propiedad-equipo", icon: "▤" },
  { label: "Certificado de operatividad", slug: "certificado-operatividad", icon: "▤" },
  { label: "Programa de mantenimiento preventivo", slug: "programa-mantenimiento-preventivo", icon: "▤" },
  { label: "Certificado de mantenimiento preventivo", slug: "certificado-mantenimiento-preventivo", icon: "▤" },
  { label: "Permiso especial para el transporte de mercancía", slug: "permiso-transporte-mercancia", icon: "▤" },
  { label: "Póliza TREC", slug: "poliza-trec", icon: "▤" },
  { label: "Tarjeta de circulación emitida por el MTC", slug: "tarjeta-circulacion-mtc", icon: "▤" },
];

const equipmentTabs = [
  { label: "Equipos/Herramientas", slug: "", icon: "🔧" },
  { label: "Certificado de operatividad", slug: "certificado-operatividad", icon: "▤" },
  { label: "Inspección", slug: "inspeccion", icon: "▤" },
];

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
  "/contratista/trabajadores": "Trabajadores",
  "/contratista/trabajadores/trabajadores": "Trabajadores",
  "/contratista/trabajadores/hoja-de-vida": "Hoja de vida",
  "/contratista/documentos-generales": "Cargar documentos a nivel empresa contratista (generales)",
  "/contratista/conductores": "Cargar documentos asociados a los conductores",
  "/contratista/vehiculos": "Cargar documentos asociados a los vehículos/maquinarias",
  "/contratista/equipos": "Cargar documentos asociados a los equipos/herramientas",
};

function ContractorShellFrame({ children, pathname }: { children: ReactNode; pathname: string }) {
  const isCommunicationPage = pathname === "/contratista/comunicacion";
  const [workersOpen, setWorkersOpen] = useState(pathname.startsWith("/contratista/trabajadores"));
  const [companyOpen, setCompanyOpen] = useState(pathname.startsWith("/contratista/documentos-generales"));
  const [driversOpen, setDriversOpen] = useState(pathname.startsWith("/contratista/conductores"));
  const [vehiclesOpen, setVehiclesOpen] = useState(pathname.startsWith("/contratista/vehiculos"));
  const [equipmentOpen, setEquipmentOpen] = useState(pathname.startsWith("/contratista/equipos"));
  const title = titles[pathname] ?? (pathname.startsWith("/contratista/trabajadores/") ? "Cargar documentos asociados a los trabajadores" : pathname.startsWith("/contratista/documentos-generales/") ? "Cargar documentos a nivel empresa contratista (generales)" : pathname.startsWith("/contratista/conductores/") ? "Cargar documentos asociados a los conductores" : pathname.startsWith("/contratista/vehiculos/") ? "Cargar documentos asociados a los vehículos/maquinarias" : pathname.startsWith("/contratista/equipos/") ? "Cargar documentos asociados a los equipos/herramientas" : "Ver indicadores de la contratista");
  return <div className="relative m-[10px] min-h-[calc(100vh-20px)] overflow-hidden rounded-md bg-[#f2f4f6] bg-[linear-gradient(150deg,transparent_0_17%,#ffffff_17.1%_31%,transparent_31.1%),linear-gradient(28deg,transparent_0_20%,#f7f8fa_20.1%_34%,transparent_34.1%),linear-gradient(165deg,transparent_0_42%,#f4f5f7_42.1%_57%,transparent_57.1%),linear-gradient(68deg,transparent_0_67%,#ffffff_67.1%_81%,transparent_81.1%),linear-gradient(145deg,transparent_0_77%,#f7f8fa_77.1%_90%,transparent_90.1%),linear-gradient(8deg,#f4f5f7_0_12%,transparent_12.1%_100%)] max-[600px]:m-0 max-[600px]:min-h-screen max-[600px]:rounded-none">
    {!isCommunicationPage && <header className="grid h-[60px] grid-cols-[1fr_2.2fr_1fr] items-center rounded-t-md bg-[#23354a] px-[max(7%,calc((100vw-1450px)/2))] text-white shadow-sm max-[900px]:grid-cols-[auto_1fr_auto] max-[900px]:px-[18px] max-[600px]:h-[58px] max-[600px]:grid-cols-[auto_1fr_auto] max-[600px]:px-[10px]">
      <div className="flex items-center gap-2 whitespace-nowrap"><span className="text-[32px] leading-none">◉</span><b className="text-[23px] font-medium tracking-wide max-[600px]:text-[17px]">AITANA</b></div>
      <div className="whitespace-nowrap text-center text-[18px] max-[900px]:whitespace-normal max-[900px]:text-[14px] max-[600px]:px-2 max-[600px]:text-[11px]">Tu Gestor Online de Seguridad y Salud en el Trabajo te da la Bienvenida</div>
      <div className="flex items-center justify-end gap-[5px] whitespace-nowrap"><span className="mr-[30px] rotate-[-12deg] text-[26px] max-[600px]:hidden">▰</span><span className="grid h-7 w-7 place-items-center rounded-full border-[3px] border-white text-[20px]">♙</span><span className="text-[13px] max-[600px]:text-[10px]">GRUPO ELIAS-.</span></div>
    </header>}
    {!isCommunicationPage && <div className="mt-[10px] flex min-h-[76px] items-center border border-[#f0dc00] bg-[#ffffff] pl-[max(3.6%,calc((100vw-1784px)/2))] py-2 text-[36px] text-[#23354a] max-[900px]:pl-[5%] max-[900px]:text-[24px] max-[600px]:mt-[7px] max-[600px]:min-h-[58px] max-[600px]:pl-4 max-[600px]:text-[20px]">{title}</div>}
    <main className={`relative z-[1] mx-auto grid w-[93%] grid-cols-[337px_minmax(0,1fr)] items-start gap-[13px] drop-shadow-[0_0_24px_rgba(240,220,0,0.14)] max-[1100px]:grid-cols-[minmax(260px,34%)_1fr] max-[900px]:w-[90%] max-[600px]:mx-auto max-[600px]:w-[calc(100%-24px)] max-[600px]:grid-cols-1 max-[600px]:gap-3 ${isCommunicationPage ? "mt-0" : "mt-[15px] max-[600px]:mt-3"}`}>
      <aside className="contractor-sidebar overflow-hidden rounded-[5px] border border-[#f0dc00] bg-[#ffffff] shadow-[0_14px_32px_rgba(35,53,74,0.2),0_0_16px_rgba(240,220,0,0.18)]">
        <div className="flex h-[50px] items-center gap-[10px] bg-[#ffffff] px-[18px] text-[18px] text-[#23354a] max-[900px]:px-[10px] max-[900px]:text-base max-[600px]:h-[48px]"><span aria-hidden="true" className="grid h-4 w-4 place-items-center"><svg viewBox="0 0 16 16" className="h-4 w-4 fill-current"><circle cx="8" cy="4.5" r="3"/><path d="M2.5 14v-1.2a5.5 5.5 0 0 1 11 0V14z"/></svg></span><b className="font-semibold">Perfil GRUPO ELIAS-29 S.A.C</b></div>
        {menu.slice(0, 2).map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`flex min-h-[90px] items-start gap-2 border-t border-[#d5dbe1] px-[19px] py-[15px] text-[21px] leading-[27px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:min-h-[70px] max-[900px]:px-[10px] max-[900px]:py-3 max-[900px]:text-[15px] max-[600px]:min-h-[58px] max-[600px]:text-[14px] max-[600px]:leading-[19px] ${pathname === item.href ? "border-y border-[#f0dc00] bg-[#fff8bd] text-[#23354a]" : "bg-[#ffffff]"}`}><span className="shrink-0 font-bold">{item.icon}</span><span className="flex-1">{item.label}{item.plus && <b className="ml-1">⊕</b>}</span>{item.badge && <i className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] border-2 border-[#f0dc00] bg-[#ffffff] text-xl not-italic">{item.badge}</i>}</Link>)}
        <button type="button" aria-expanded={workersOpen} aria-controls="worker-tabs" onClick={() => setWorkersOpen((open) => !open)} className="flex min-h-[78px] w-full items-start gap-2 border-t border-[#d5dbe1] bg-[#ffffff] px-[19px] py-[13px] text-left text-[18px] leading-[23px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:px-[10px] max-[900px]:text-[15px] max-[600px]:text-[14px]">
          <span className="shrink-0 font-bold">▤</span><span className="flex-1">Cargar documentos asociados a los trabajadores</span><span aria-hidden="true" className="shrink-0 font-bold">{workersOpen ? "⊖" : "⊕"}</span>
        </button>
        {workersOpen && <nav id="worker-tabs" aria-label="Pestañas de trabajadores" className="bg-[#23354a]">
          {workerTabs.map((tab) => {
            const href = `/contratista/trabajadores/${tab.slug}`;
            const active = pathname === href;
            return <Link key={tab.label} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[40px] items-center gap-2 border-t border-[#516175] px-[14px] py-[9px] text-[15px] font-semibold leading-[19px] hover:bg-[#34485f] max-[900px]:text-[14px] ${active ? "bg-[#f0dc00] text-[#23354a]" : "bg-[#23354a] text-white"}`}>
              <span aria-hidden="true" className="shrink-0">{tab.icon}</span><span>{tab.label}</span>
            </Link>;
          })}
        </nav>}
        <button type="button" data-active={pathname === "/contratista/documentos-generales"} aria-expanded={companyOpen} aria-controls="company-tabs" onClick={() => setCompanyOpen((open) => !open)} className="sidebar-group flex min-h-[78px] w-full items-start gap-2 border-x border-t border-[#f0dc00] bg-[#ffffff] px-[19px] py-[13px] text-left text-[18px] leading-[23px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:px-[10px] max-[900px]:text-[15px] max-[600px]:text-[14px]">
          <span aria-hidden="true" className="shrink-0 pt-0.5 font-bold">▤</span><span className="flex-1">Cargar documentos a nivel empresa contratista (generales)</span><span aria-hidden="true" className="shrink-0 font-bold">{companyOpen ? "⊖" : "⊕"}</span>
        </button>
        {companyOpen && <nav id="company-tabs" aria-label="Pestañas de documentos generales" className="bg-[#23354a]">
          {companyTabs.map((tab) => {
            const href = `/contratista/documentos-generales/${tab.slug}`;
            const active = pathname === href;
            return <Link key={tab.slug} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[48px] items-center gap-2 border-t border-[#516175] px-[18px] py-[11px] text-[17px] font-semibold leading-[21px] hover:bg-[#34485f] max-[900px]:text-[15px] ${active ? "bg-[#f0dc00] text-[#23354a]" : "bg-[#23354a] text-white"}`}>
              <span aria-hidden="true" className="shrink-0">▤</span><span>{tab.label}</span>
            </Link>;
          })}
        </nav>}
        <button type="button" data-active={pathname === "/contratista/conductores"} aria-expanded={driversOpen} aria-controls="driver-tabs" onClick={() => setDriversOpen((open) => !open)} className="sidebar-group flex min-h-[78px] w-full items-start gap-2 border-x border-t border-[#f0dc00] bg-[#ffffff] px-[19px] py-[13px] text-left text-[18px] leading-[23px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:px-[10px] max-[900px]:text-[15px] max-[600px]:text-[14px]">
          <span aria-hidden="true" className="shrink-0 pt-0.5 font-bold">☷</span><span className="flex-1">Cargar documentos asociados a los conductores</span><span aria-hidden="true" className="shrink-0 font-bold">{driversOpen ? "⊖" : "⊕"}</span>
        </button>
        {driversOpen && <nav id="driver-tabs" aria-label="Pestañas de conductores" className="bg-[#23354a]">
          {driverTabs.map((tab) => {
            const href = tab.slug ? `/contratista/conductores/${tab.slug}` : "/contratista/conductores";
            const active = pathname === href;
            return <Link key={tab.label} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[48px] items-center gap-2 border-t border-[#516175] px-[18px] py-[11px] text-[17px] font-semibold leading-[21px] hover:bg-[#34485f] max-[900px]:text-[15px] ${active ? "bg-[#f0dc00] text-[#23354a]" : "bg-[#23354a] text-white"}`}>
              <span aria-hidden="true" className="shrink-0">{tab.icon}</span><span>{tab.label}</span>
            </Link>;
          })}
        </nav>}
        <button type="button" data-active={pathname === "/contratista/vehiculos"} aria-expanded={vehiclesOpen} aria-controls="vehicle-tabs" onClick={() => setVehiclesOpen((open) => !open)} className="sidebar-group flex min-h-[78px] w-full items-start gap-2 border-x border-t border-[#f0dc00] bg-[#ffffff] px-[19px] py-[13px] text-left text-[18px] leading-[23px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:px-[10px] max-[900px]:text-[15px] max-[600px]:text-[14px]">
          <span aria-hidden="true" className="shrink-0 pt-0.5 font-bold">☷</span><span className="flex-1">Cargar documentos asociados a los vehículos/maquinarias</span><span aria-hidden="true" className="shrink-0 font-bold">{vehiclesOpen ? "⊖" : "⊕"}</span>
        </button>
        {vehiclesOpen && <nav id="vehicle-tabs" aria-label="Pestañas de vehículos y maquinarias" className="bg-[#23354a]">
          {vehicleTabs.map((tab) => {
            const href = tab.slug ? `/contratista/vehiculos/${tab.slug}` : "/contratista/vehiculos";
            const active = pathname === href;
            return <Link key={tab.label} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[48px] items-center gap-2 border-t border-[#516175] px-[18px] py-[11px] text-[17px] font-semibold leading-[21px] hover:bg-[#34485f] max-[900px]:text-[15px] ${active ? "bg-[#f0dc00] text-[#23354a]" : "bg-[#23354a] text-white"}`}>
              <span aria-hidden="true" className="shrink-0">{tab.icon}</span><span>{tab.label}</span>
            </Link>;
          })}
        </nav>}
        <button type="button" data-active={pathname === "/contratista/equipos"} aria-expanded={equipmentOpen} aria-controls="equipment-tabs" onClick={() => setEquipmentOpen((open) => !open)} className="sidebar-group flex min-h-[78px] w-full items-start gap-2 border-x border-t border-[#f0dc00] bg-[#ffffff] px-[19px] py-[13px] text-left text-[18px] leading-[23px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:px-[10px] max-[900px]:text-[15px] max-[600px]:text-[14px]">
          <span aria-hidden="true" className="shrink-0 pt-0.5 font-bold">☷</span><span className="flex-1">Cargar documentos asociados a los equipos/herramientas</span><span aria-hidden="true" className="shrink-0 font-bold">{equipmentOpen ? "⊖" : "⊕"}</span>
        </button>
        {equipmentOpen && <nav id="equipment-tabs" aria-label="Pestañas de equipos y herramientas" className="bg-[#23354a]">
          {equipmentTabs.map((tab) => {
            const href = tab.slug ? `/contratista/equipos/${tab.slug}` : "/contratista/equipos";
            const active = pathname === href;
            return <Link key={tab.label} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[48px] items-center gap-2 border-t border-[#516175] px-[18px] py-[11px] text-[17px] font-semibold leading-[21px] hover:bg-[#34485f] max-[900px]:text-[15px] ${active ? "bg-[#f0dc00] text-[#23354a]" : "bg-[#23354a] text-white"}`}>
              <span aria-hidden="true" className="shrink-0">{tab.icon}</span><span>{tab.label}</span>
            </Link>;
          })}
        </nav>}
        {menu.slice(7).map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`flex min-h-[90px] items-start gap-2 border-t border-[#d5dbe1] px-[19px] py-[15px] text-[21px] leading-[27px] text-[#23354a] hover:bg-[#eef1f4] max-[900px]:min-h-[70px] max-[900px]:px-[10px] max-[900px]:py-3 max-[900px]:text-[15px] max-[600px]:min-h-[58px] max-[600px]:text-[14px] max-[600px]:leading-[19px] ${pathname === item.href ? "border-y border-[#f0dc00] bg-[#fff8bd] text-[#23354a]" : "bg-[#ffffff]"}`}><span className="shrink-0 font-bold">{item.icon}</span><span className="flex-1">{item.label}{item.plus && <b className="ml-1">⊕</b>}</span>{item.badge && <i className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] border-2 border-[#f0dc00] bg-[#ffffff] text-xl not-italic">{item.badge}</i>}</Link>)}
        <Link href="/contratista/comunicacion" data-active={isCommunicationPage} aria-current={isCommunicationPage ? "page" : undefined} className={`communication-link flex h-[51px] w-full items-center gap-[9px] border-t border-[#d5dbe1] px-[18px] text-left text-[18px] font-semibold max-[600px]:h-[44px] max-[600px]:text-[14px] ${isCommunicationPage ? "border-y border-[#f0dc00] bg-[#fff8bd] text-[#23354a]" : "bg-[#ffffff] text-[#23354a] hover:bg-[#f7f8fa]"}`}><svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"><path d="M3 8h4l8-4v12l-8-4H3zM7 12l1.5 5H12l-2-6M17 7l2-1M17 13l2 1"/></svg>Comunicación con el Cliente</Link>
      </aside>
      <div className="min-w-0">{children}</div>
    </main>
  </div>;
}

function ContractorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <ContractorShellFrame key={pathname} pathname={pathname}>{children}</ContractorShellFrame>;
}

export default function ContractorLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-[#f2f4f6]" /> }><ContractorShell>{children}</ContractorShell></Suspense>;
}
