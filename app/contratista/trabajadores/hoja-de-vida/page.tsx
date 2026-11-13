"use client";

import { useMemo, useState, type FormEvent } from "react";

type ResumeRecord = {
  id: number;
  worker: string;
  evidence: string;
  detail: string;
  createdAt: string;
  status: "Pendiente de evaluación" | "Observado" | "Visto bueno";
};

const cardClass = "border-2 border-[#f0dc00] bg-[#ffffff] shadow-[0_8px_24px_rgba(35,53,74,0.16),0_0_10px_rgba(240,220,0,0.12)]";
const inputClass = "h-10 w-full rounded border border-[#b8c1ca] bg-[#ffffff] px-3 text-sm text-[#23354a] outline-none placeholder:text-[#5d6876] focus:border-[#23354a] focus:ring-2 focus:ring-[#f0dc00]/20";

function Chevron({ open }: { open: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 16 10" className={`h-3 w-5 transition-transform ${open ? "rotate-180" : ""}`}><path d="M1 1h14L8 9z" fill="currentColor" /></svg>;
}

export default function ResumePage() {
  const [records, setRecords] = useState<ResumeRecord[]>([]);
  const [formOpen, setFormOpen] = useState(true);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [worker, setWorker] = useState("");
  const [detail, setDetail] = useState("");
  const [evidence, setEvidence] = useState<File | null>(null);
  const [notice, setNotice] = useState("");

  const filteredRecords = useMemo(() => records.filter((record) => {
    const matchesSearch = `${record.worker} ${record.detail} ${record.evidence}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "Todos" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [records, search, statusFilter]);

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!evidence) return;
    const newRecord: ResumeRecord = {
      id: Date.now(), worker: worker.trim(), evidence: evidence.name, detail: detail.trim(),
      createdAt: new Date().toLocaleString("es-PE"), status: "Pendiente de evaluación",
    };
    setRecords((current) => [newRecord, ...current]);
    setWorker("");
    setDetail("");
    setEvidence(null);
    event.currentTarget.reset();
    setNotice("Hoja de vida registrada.");
  }

  return <div className="space-y-3">
    <section className={cardClass}>
      <button type="button" aria-expanded={formOpen} onClick={() => setFormOpen((open) => !open)} className="flex min-h-[58px] w-full items-center justify-between gap-3 px-4 text-left text-lg font-semibold text-[#23354a]">
        <span>Nuevo registro - Hoja de vida</span><span className="grid h-8 w-8 place-items-center rounded bg-[#23354a] text-white"><Chevron open={formOpen} /></span>
      </button>
      {formOpen && <form onSubmit={saveRecord} className="m-3 rounded border border-[#b8c1ca] bg-[#ffffff] p-4">
        <label className="grid grid-cols-[125px_1fr] items-start gap-3 border-b border-dashed border-[#b8c1ca] py-3 text-sm font-semibold text-[#23354a] max-[600px]:grid-cols-1">
          <span>Trabajador*</span><span><input className={inputClass} value={worker} onChange={(event) => setWorker(event.target.value)} placeholder="Solo uno..." required /><small className="mt-1 block text-xs text-[#5d6876]">*Búsqueda por N° de documento y/o nombre.</small></span>
        </label>
        <label className="grid grid-cols-[125px_1fr] items-center gap-3 border-b border-dashed border-[#b8c1ca] py-3 text-sm font-semibold text-[#23354a] max-[600px]:grid-cols-1">
          <span>Evidencia*</span><input className="block w-full text-sm text-[#5d6876] file:mr-3 file:rounded file:border-0 file:bg-[#23354a] file:px-4 file:py-2 file:font-semibold file:text-white" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={(event) => setEvidence(event.target.files?.[0] ?? null)} />
        </label>
        <label className="grid grid-cols-[125px_1fr] items-center gap-3 py-3 text-sm font-semibold text-[#23354a] max-[600px]:grid-cols-1">
          <span>Detalle</span><input className={inputClass} value={detail} onChange={(event) => setDetail(event.target.value)} />
        </label>
        <div className="flex justify-end border-t border-[#d5dbe1] pt-3"><button type="submit" className="rounded bg-[#23354a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#34485f]">➤ Guardar</button></div>
      </form>}
    </section>

    <section className={cardClass}>
      <button type="button" aria-expanded={optionsOpen} onClick={() => setOptionsOpen((open) => !open)} className="flex min-h-[50px] w-full items-center justify-between px-4 text-left font-semibold text-[#23354a]">
        <span>Opciones</span><span className="grid h-8 w-8 place-items-center rounded bg-[#23354a] text-white">⚑</span>
      </button>
      {optionsOpen && <div className="flex items-center gap-3 border-t border-[#d5dbe1] px-4 py-3 text-sm text-[#23354a]"><label htmlFor="resume-status">Estado</label><select id="resume-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-9 rounded border border-[#b8c1ca] bg-[#ffffff] px-2 text-[#23354a]"><option>Todos</option><option>Pendiente de evaluación</option><option>Observado</option><option>Visto bueno</option></select></div>}
    </section>

    <section className={cardClass}>
      <h2 className="border-b-2 border-[#f0dc00] px-4 py-3 font-semibold text-[#23354a]">Buscar trabajador</h2>
      <div className="p-3"><input className={inputClass} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre, apellido o documento (mínimo 3 caracteres)" /></div>
    </section>

    <section className={cardClass}>
      <div className="flex items-center justify-between gap-3 border-b-2 border-[#f0dc00] px-4 py-3 text-[#23354a]"><h2 className="font-semibold">Hojas de vida registradas ({filteredRecords.length})</h2><span className="text-xs">Página 1 de 1</span></div>
      {filteredRecords.length === 0 ? <p className="px-4 py-6 text-sm text-[#5d6876]">Aún no hay hojas de vida registradas.</p> : <div className="space-y-3 p-3">{filteredRecords.map((record) => <article key={record.id} className="rounded border border-[#b8c1ca] bg-[#ffffff] p-4 text-sm text-[#23354a]">
        <h3 className="border-b border-dashed border-[#b8c1ca] pb-3 font-bold">*** DATOS DEL REGISTRO ***</h3>
        <dl className="grid grid-cols-[140px_1fr] gap-x-3 gap-y-3 py-4 max-[600px]:grid-cols-1"><dt>Trabajador(a)</dt><dd>{record.worker}</dd><dt>Evidencia</dt><dd>{record.evidence}</dd><dt>Detalle</dt><dd>{record.detail || "—"}</dd><dt>Registrado el</dt><dd>{record.createdAt}</dd></dl>
        <h3 className="border-y border-dashed border-[#b8c1ca] py-3 font-bold">*** EVALUACIÓN ***</h3><p className="pt-3">Estado: {record.status}</p>
      </article>)}</div>}
    </section>
    {notice && <div role="status" className="fixed bottom-5 right-5 z-20 rounded border border-[#f0dc00] bg-[#ffffff] px-4 py-3 text-sm text-[#23354a] shadow-lg">{notice}<button type="button" onClick={() => setNotice("")} className="ml-4 text-[#23354a]">×</button></div>}
  </div>;
}