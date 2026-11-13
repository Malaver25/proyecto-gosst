import Link from "next/link";

const sections = [
  {
    title: "Proyectos en curso",
    description: "Organiza la información de cada proyecto y sus documentos de seguridad.",
    href: "/contratista/proyectos",
    action: "Gestionar proyectos",
    icon: "▤",
  },
  {
    title: "Trabajadores",
    description: "Consulta y completa la documentación asociada al personal.",
    href: "/contratista/trabajadores",
    action: "Ver trabajadores",
    icon: "♙",
  },
  {
    title: "Documentos generales",
    description: "Mantén al día los documentos generales de la empresa contratista.",
    href: "/contratista/documentos-generales",
    action: "Ver documentos",
    icon: "▧",
  },
  {
    title: "Vehículos y maquinaria",
    description: "Accede a la documentación de los vehículos y la maquinaria registrados.",
    href: "/contratista/vehiculos",
    action: "Ver vehículos",
    icon: "▰",
  },
];

export default function IndicatorsPage() {
  return (
    <div className="space-y-4">
      <section className="border-2 border-[#f0dc00] bg-[#ffffff] p-6 max-[600px]:p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5d6876]">
          Panel de control
        </p>
        <h1 className="mt-1 text-[28px] font-semibold text-[#23354a] max-[600px]:text-xl">
          Indicadores de la contratista
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5d6876]">
          Accede a las secciones de gestión para revisar proyectos y completar la
          documentación de la empresa.
        </p>
      </section>

      <section aria-label="Secciones de gestión" className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex min-h-[164px] flex-col border border-[#e0e4e8] border-l-4 border-l-[#f0dc00] bg-[#ffffff] p-5 transition-colors hover:bg-[#f7f8fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0dc00]"
          >
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded bg-[#f7f8fa] text-xl font-semibold text-[#f0dc00]">
              {section.icon}
            </span>
            <span className="mt-3 text-lg font-semibold text-[#23354a]">{section.title}</span>
            <span className="mt-1 flex-1 text-sm leading-5 text-[#5d6876]">{section.description}</span>
            <span className="mt-4 text-sm font-semibold text-[#f0dc00] group-hover:underline">
              {section.action} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
