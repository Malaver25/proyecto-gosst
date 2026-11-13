"use client";

import { useState, type FormEvent } from "react";

type Project = {
  id: number;
  code: string;
  sstName: string;
  phone: string;
  email: string;
  start: string;
  end: string;
  description: string;
  workers: number;
  iperc: string;
  emergencyPlan: string;
  safeProcedure: string;
};

const documentFields = [
  { key: "iperc", label: "Matriz de riesgo (IPERC)" },
  { key: "emergencyPlan", label: "Plan de emergencia" },
  { key: "safeProcedure", label: "Procedimiento escrito de trabajo seguro" },
] as const;

const inputClass = "mt-1 block h-10 w-full rounded border border-[#b8c1ca] bg-[#ffffff] px-3 text-sm text-[#23354a] outline-none focus:border-[#f0dc00] focus:ring-2 focus:ring-[#f0dc00]/15";
const labelClass = "block text-sm font-medium text-[#34485f]";

export default function ProjectDocumentsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [code, setCode] = useState("");
  const [sstName, setSstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [iperc, setIperc] = useState("");
  const [emergencyPlan, setEmergencyPlan] = useState("");
  const [safeProcedure, setSafeProcedure] = useState("");
  const [error, setError] = useState("");

  function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (end < start) {
      setError("La fecha de fin debe ser igual o posterior a la fecha de inicio.");
      return;
    }
    const workers = Math.floor(Math.random() * 11) + 1;
    setProjects((current) => [{ id: Date.now(), code, sstName, phone, email, start, end, description, workers, iperc, emergencyPlan, safeProcedure }, ...current]);
    setCode(""); setSstName(""); setPhone(""); setEmail(""); setStart(""); setEnd(""); setDescription(""); setIperc(""); setEmergencyPlan(""); setSafeProcedure(""); setError("");
    setShowForm(false);
  }

  function fileInput(key: typeof documentFields[number]["key"], label: string, value: string, setValue: (value: string) => void) {
    return <label key={key} className="block rounded border border-[#d5dbe1] bg-[#f7f8fa] p-3 text-sm text-[#34485f]"><span className="flex items-center justify-between gap-2 font-medium"><span>{label}</span><span className={`rounded px-2 py-0.5 text-xs ${value ? "bg-[#f7f8fa] text-[#23354a]" : "bg-[#f7f8fa] text-[#5d6876]"}`}>{value ? "1/1" : "0/1"}</span></span><input className="mt-2 block w-full text-xs text-[#5d6876] file:mr-3 file:rounded file:border-0 file:bg-[#f7f8fa] file:px-3 file:py-2 file:text-xs file:font-medium file:text-[#f0dc00]" type="file" onChange={(event) => setValue(event.target.files?.[0]?.name ?? "")} /><span className="mt-1 block truncate text-xs text-[#6f7883]">{value || "Sin archivo adjunto"}</span></label>;
  }

  return <div className="space-y-4">
    <section className="overflow-hidden border-2 border-[#f0dc00] bg-[#ffffff]">
      <div className="flex min-h-[104px] items-center justify-between gap-4 px-6 py-4 max-[600px]:flex-wrap max-[600px]:px-3">
        <div><div className="text-[28px] text-[#23354a] max-[600px]:text-lg">Documentos asociados a proyectos</div><p className="mt-1 text-sm text-[#5d6876]">Registra los datos del proyecto y adjunta sus documentos de seguridad.</p></div>
        <button className="rounded bg-[#f0dc00] px-4 py-2 text-sm font-semibold text-[#23354a] hover:bg-[#d9c600]" onClick={() => setShowForm((value) => !value)}>{showForm ? "Cerrar formulario" : "+ Nuevo proyecto"}</button>
      </div>
      {showForm && <form onSubmit={addProject} className="border-t border-[#d5dbe1] px-6 py-5 max-[600px]:px-3">
        <h2 className="mb-4 text-lg font-semibold text-[#23354a]">Datos del proyecto</h2>
        <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
          <label className={labelClass}>Código<input className={inputClass} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ej. PRO-08098" required /></label>
          <label className={labelClass}>Responsable SST: nombre<input className={inputClass} value={sstName} onChange={(e) => setSstName(e.target.value)} required /></label>
          <label className={labelClass}>Responsable SST: teléfono<input className={inputClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></label>
          <label className={labelClass}>Responsable SST: correo<input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label className={labelClass}>Fecha inicio<input className={inputClass} type="date" value={start} onChange={(e) => setStart(e.target.value)} required /></label>
          <label className={labelClass}>Fecha fin<input className={inputClass} type="date" min={start || undefined} value={end} onChange={(e) => setEnd(e.target.value)} required /></label>
          <label className={`${labelClass} col-span-2 max-[600px]:col-span-1`}>Descripción<textarea className="mt-1 block min-h-24 w-full rounded border border-[#b8c1ca] bg-[#ffffff] p-3 text-sm outline-none focus:border-[#f0dc00] focus:ring-2 focus:ring-[#f0dc00]/15" value={description} onChange={(e) => setDescription(e.target.value)} required /></label>
        </div>
        <h3 className="mb-3 mt-6 text-base font-semibold text-[#23354a]">Documentos requeridos <span className="font-normal text-[#5d6876]">(1 archivo por requisito)</span></h3>
        <div className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
          {fileInput("iperc", "Matriz de riesgo (IPERC)", iperc, setIperc)}
          {fileInput("emergencyPlan", "Plan de emergencia", emergencyPlan, setEmergencyPlan)}
          {fileInput("safeProcedure", "Procedimiento escrito de trabajo seguro", safeProcedure, setSafeProcedure)}
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        <div className="mt-5 flex justify-end"><button type="submit" className="rounded bg-[#f0dc00] px-5 py-2.5 text-sm font-semibold text-[#23354a] hover:bg-[#d9c600]">Guardar proyecto</button></div>
      </form>}
    </section>

    <section className="border-2 border-[#f0dc00] bg-[#ffffff]">
      <div className="border-b border-[#d5dbe1] px-5 py-3"><h2 className="font-semibold text-[#23354a]">Proyectos registrados <span className="ml-1 rounded-full bg-[#f7f8fa] px-2 py-0.5 text-xs">{projects.length}</span></h2></div>
      {projects.length === 0 ? <p className="px-5 py-8 text-center text-sm text-[#5d6876]">Aún no hay proyectos registrados. Completa el formulario para agregarlos.</p> : <div className="divide-y divide-[#eef1f4]">{projects.map((project) => <article key={project.id} className="px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-medium text-[#23354a]">[{project.code}] Proyecto · {project.workers} trabajadores asignados</h3><span className="rounded bg-[#f7f8fa] px-2 py-1 text-xs text-[#23354a]">Registrado</span></div>
        <dl className="mt-3 grid grid-cols-3 gap-x-5 gap-y-3 text-sm max-[700px]:grid-cols-1"><div><dt className="text-xs text-[#6f7883]">Responsable SST</dt><dd>{project.sstName}</dd></div><div><dt className="text-xs text-[#6f7883]">Teléfono</dt><dd>{project.phone}</dd></div><div><dt className="text-xs text-[#6f7883]">Correo</dt><dd>{project.email}</dd></div><div><dt className="text-xs text-[#6f7883]">Fecha inicio</dt><dd>{project.start}</dd></div><div><dt className="text-xs text-[#6f7883]">Fecha fin</dt><dd>{project.end}</dd></div><div className="col-span-3 max-[700px]:col-span-1"><dt className="text-xs text-[#6f7883]">Descripción</dt><dd>{project.description}</dd></div></dl>
        <div className="mt-4 flex flex-wrap gap-2">{documentFields.map((field) => { const filename = project[field.key]; return <span key={field.key} className="rounded border border-[#d5dbe1] px-2.5 py-1.5 text-xs text-[#5d6876]">{field.label}: <b className={filename ? "text-[#23354a]" : "text-[#5d6876]"}>{filename ? "1/1" : "0/1"}</b>{filename && <span className="ml-1 text-[#6f7883]">{filename}</span>}</span>; })}</div>
      </article>)}</div>}
    </section>
  </div>;
}
