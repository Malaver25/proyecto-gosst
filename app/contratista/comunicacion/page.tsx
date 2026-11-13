"use client";

import { useState } from "react";

const responseStatuses = [
  "Sin atender",
  "Respuesta enviada / Pendiente de evaluación",
  "Respuesta / Observado",
  "Respuesta / Aprobado",
];

function DropdownIcon({ small = false }: { small?: boolean }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded bg-[#23354a] text-[#f0dc00] ${small ? "h-7 w-6" : "h-[42px] w-[36px]"}`} aria-hidden="true">
      <svg viewBox="0 0 16 10" className={small ? "h-2.5 w-3" : "h-3 w-5"}>
        <path d="M1 1h14L8 9z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function ClientCommunicationPage() {
  const [informativeOpen, setInformativeOpen] = useState(true);
  const [responsesOpen, setResponsesOpen] = useState(true);
  const [openStatuses, setOpenStatuses] = useState<Record<string, boolean>>({});

  function toggleStatus(status: string) {
    setOpenStatuses((current) => ({ ...current, [status]: !current[status] }));
  }

  return (
    <div className="w-full max-w-[750px] space-y-0">
      <section className="overflow-hidden rounded-t-[2px] border-2 border-[#f0dc00] bg-[#ffffff]">
        <button
          type="button"
          aria-expanded={informativeOpen}
          onClick={() => setInformativeOpen((open) => !open)}
          className="flex min-h-[80px] w-full items-center justify-between gap-4 px-5 text-left text-[24px] text-[#23354a] max-[700px]:min-h-[68px] max-[700px]:px-3 max-[700px]:text-lg"
        >
          <span>Comunicados Informativos (0)</span>
          <DropdownIcon />
        </button>
        {informativeOpen && (
          <div className="min-h-[76px] border-t border-[#d5dbe1] bg-[#ffffff] px-5 py-5 text-[22px] text-[#23354a] max-[700px]:px-3 max-[700px]:text-lg">
            Sin Comunicados...
          </div>
        )}
      </section>

      <section className="mt-0 overflow-hidden rounded-b-[4px] border-x border-b border-[#d5dbe1] bg-[#ffffff] px-[19px] pb-[18px]">
        <div className="-mx-[19px] border-2 border-[#f0dc00] bg-[#ffffff]">
          <button
            type="button"
            aria-expanded={responsesOpen}
            onClick={() => setResponsesOpen((open) => !open)}
            className="flex min-h-[80px] w-full items-center justify-between gap-4 px-5 text-left text-[24px] text-[#23354a] max-[700px]:min-h-[68px] max-[700px]:px-3 max-[700px]:text-lg"
          >
            <span>Comunicados del Cliente que Requieren Respuesta (0)</span>
            <DropdownIcon />
          </button>
        </div>

        {responsesOpen && (
          <div className="space-y-0 pt-5">
            {responseStatuses.map((status) => {
              const isOpen = Boolean(openStatuses[status]);
              return (
                <section key={status} className="overflow-hidden rounded-[5px] border-2 border-[#23354a] bg-[#ffffff]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleStatus(status)}
                    className="flex min-h-[70px] w-full items-center justify-between gap-3 px-5 text-left text-[22px] text-[#23354a] max-[700px]:min-h-[60px] max-[700px]:px-3 max-[700px]:text-base"
                  >
                    <span>{status} (0)</span>
                    <DropdownIcon small />
                  </button>
                  {isOpen && <p className="border-t border-[#d5dbe1] px-5 py-3 text-sm text-[#5d6876]">Sin comunicados...</p>}
                </section>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
