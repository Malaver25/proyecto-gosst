"use client";

import { useRef, useState, type FormEvent } from "react";

type Worker = { id: number; name: string; surname: string; document: string; active: boolean };

const panelClass = "border-2 border-[#f0dc00] bg-[#ffffff] shadow-[0_8px_24px_rgba(35,53,74,0.16),0_0_10px_rgba(240,220,0,0.12)]";
const fieldClass = "mt-1 block h-11 w-full rounded border border-[#b8c1ca] bg-[#ffffff] px-3 text-sm text-[#23354a] outline-none placeholder:text-[#6f7883] focus:border-[#23354a] focus:ring-2 focus:ring-[#f0dc00]/20";

function DownloadIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" /></svg>;
}

function Chevron({ open }: { open: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 16 10" className={`h-3 w-5 transition-transform ${open ? "rotate-180" : ""}`}><path d="M1 1h14L8 9z" fill="currentColor" /></svg>;
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeOpen, setActiveOpen] = useState(false);
  const [inactiveOpen, setInactiveOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [document, setDocument] = useState("");
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const filteredWorkers = workers.filter((worker) =>
    `${worker.name} ${worker.surname} ${worker.document}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const activeWorkers = filteredWorkers.filter((worker) => worker.active);
  const inactiveWorkers = filteredWorkers.filter((worker) => !worker.active);

  function downloadConsolidated() {
    const rows = ["Nombre,Apellido,Documento,Estado", ...workers.map((worker) => `${worker.name},${worker.surname},${worker.document},${worker.active ? "Activo" : "Inactivo"}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = "consolidado-trabajadores.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function addWorker(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorkers((current) => [...current, { id: Date.now(), name, surname, document, active: true }]);
    setName("");
    setSurname("");
    setDocument("");
    setShowForm(false);
    setNotice("Trabajador agregado al listado activo.");
  }

  async function importWorkers(file?: File) {
    if (!file) return;
    const rows = (await file.text()).split(/\r?\n/).slice(1).filter(Boolean);
    const imported = rows.map((row, index) => {
      const [workerName = "", workerSurname = "", workerDocument = "", status = "Activo"] = row.split(",").map((value) => value.trim().replace(/^"|"$/g, ""));
      return { id: Date.now() + index, name: workerName, surname: workerSurname, document: workerDocument, active: status.toLowerCase() !== "inactivo" };
    }).filter((worker) => worker.name || worker.surname || worker.document);
    setWorkers((current) => [...current, ...imported]);
    setNotice(`${imported.length} trabajador(es) importado(s).`);
    if (fileRef.current) fileRef.current.value = "";
  }

  function renderWorkerList(list: Worker[]) {
    if (!list.length) return <p className="border-t border-[#d5dbe1] px-5 py-4 text-sm text-[#5d6876]">No hay trabajadores en esta lista.</p>;
    return <ul className="divide-y divide-[#d5dbe1]">{list.map((worker) => <li key={worker.id} className="grid grid-cols-[1fr_auto] gap-3 px-5 py-4 text-sm text-[#23354a] max-[600px]:grid-cols-1"><span className="font-medium">{worker.name} {worker.surname}</span><span className="text-[#5d6876]">{worker.document}</span></li>)}</ul>;
  }

  return <div className="space-y-3">
    <section className={panelClass}>
      <div className="flex min-h-[74px] items-center justify-between gap-4 px-5 py-3 max-[600px]:flex-wrap max-[600px]:px-3">
        <h2 className="text-[24px] text-[#23354a] max-[700px]:text-lg">Consolidado Proyecto - Trabajadores</h2>
        <button type="button" onClick={downloadConsolidated} className="inline-flex items-center gap-2 rounded bg-[#23354a] px-3 py-2 text-lg text-white hover:bg-[#34485f]"><DownloadIcon />Descargar</button>
      </div>
      <div className="flex min-h-[74px] items-center justify-between gap-4 border-t-2 border-[#f0dc00] px-5 py-3 max-[600px]:flex-wrap max-[600px]:px-3">
        <h2 className="text-[24px] text-[#23354a] max-[700px]:text-lg">Import - Trabajadores</h2>
        <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded bg-[#23354a] px-3 py-2 text-lg text-white hover:bg-[#34485f]">▧ Empezar</button>
        <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => void importWorkers(event.target.files?.[0])} />
      </div>
      <div className="flex min-h-[66px] items-center justify-between gap-4 border-t-2 border-[#f0dc00] px-5 py-3 max-[600px]:px-3">
        <button type="button" onClick={() => setShowForm((value) => !value)} className="text-left text-[22px] font-semibold text-[#23354a] hover:text-[#23354a]">Agregar trabajador</button>
        <button type="button" aria-expanded={showOptions} onClick={() => setShowOptions((value) => !value)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#23354a] underline">Ver Opciones <Chevron open={showOptions} /></button>
      </div>
      {showOptions && <div className="flex gap-3 border-t border-[#d5dbe1] px-5 py-3 max-[600px]:px-3"><button type="button" onClick={() => setShowForm(true)} className="text-sm text-[#23354a] underline">Alta manual</button><button type="button" onClick={() => fileRef.current?.click()} className="text-sm text-[#23354a] underline">Importar CSV</button></div>}
      {showForm && <form onSubmit={addWorker} className="grid grid-cols-3 gap-3 border-t border-[#d5dbe1] px-5 py-4 max-[700px]:grid-cols-1 max-[600px]:px-3">
        <label className="text-sm text-[#34485f]">Nombre<input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label className="text-sm text-[#34485f]">Apellido<input className={fieldClass} value={surname} onChange={(event) => setSurname(event.target.value)} required /></label>
        <label className="text-sm text-[#34485f]">Documento<input className={fieldClass} value={document} onChange={(event) => setDocument(event.target.value)} required /></label>
        <div className="col-span-3 flex justify-end gap-2 max-[700px]:col-span-1"><button type="button" onClick={() => setShowForm(false)} className="rounded border border-[#b8c1ca] px-4 py-2 text-sm text-[#23354a]">Cancelar</button><button type="submit" className="rounded bg-[#23354a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#34485f]">Guardar trabajador</button></div>
      </form>}
    </section>

    <section className={panelClass}>
      <h2 className="border-b-2 border-[#f0dc00] px-5 py-4 text-[24px] text-[#23354a] max-[600px]:px-3 max-[600px]:text-lg">Buscar trabajador</h2>
      <div className="bg-[#ffffff] p-5 max-[600px]:p-3"><input className={fieldClass} type="search" minLength={3} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, apellido o documento (mínimo 3 caracteres)" /></div>
    </section>

    <div className="space-y-2">
      <section className={panelClass}>
        <button type="button" aria-expanded={activeOpen} onClick={() => setActiveOpen((value) => !value)} className="flex min-h-[72px] w-full items-center justify-between gap-4 px-5 py-3 text-left text-[22px] text-[#23354a] max-[700px]:px-3 max-[700px]:text-lg"><span>Trabajadores - Activo en los proyectos ({activeWorkers.length}) <span aria-hidden="true" className="text-base">ⓘ</span></span><span className="grid h-10 w-9 shrink-0 place-items-center rounded bg-[#23354a] text-white"><Chevron open={activeOpen} /></span></button>
        {activeOpen && renderWorkerList(activeWorkers)}
      </section>
      <section className={panelClass}>
        <button type="button" aria-expanded={inactiveOpen} onClick={() => setInactiveOpen((value) => !value)} className="flex min-h-[72px] w-full items-center justify-between gap-4 px-5 py-3 text-left text-[22px] text-[#23354a] max-[700px]:px-3 max-[700px]:text-lg"><span>Trabajadores - Inactivo en los proyectos ({inactiveWorkers.length}) <span aria-hidden="true" className="text-base">ⓘ</span></span><span className="grid h-10 w-9 shrink-0 place-items-center rounded bg-[#23354a] text-white"><Chevron open={inactiveOpen} /></span></button>
        {inactiveOpen && renderWorkerList(inactiveWorkers)}
      </section>
    </div>
    {notice && <div role="status" className="fixed bottom-5 right-5 z-20 rounded border border-[#f0dc00] bg-[#ffffff] px-4 py-3 text-sm text-[#23354a] shadow-lg">{notice}<button type="button" onClick={() => setNotice("")} className="ml-4 text-[#23354a]">×</button></div>}
  </div>;
}

