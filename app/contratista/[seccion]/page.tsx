export default async function ContractorSectionPage({ params }: PageProps<"/contratista/[seccion]">) {
  const { seccion } = await params;
  const labels: Record<string, string> = {
    trabajadores: "Cargar documentos asociados a los trabajadores",
    "documentos-generales": "Cargar documentos a nivel empresa contratista (generales)",
    conductores: "Cargar documentos asociados a los conductores",
    vehiculos: "Cargar documentos asociados a los vehículos/maquinarias",
    equipos: "Cargar documentos asociados a los equipos/herramientas",
  };
  const title = labels[seccion] ?? "Sección de contratistas";
  return <section className="min-h-[100px] border-[3px] border-[#1d4778] bg-white p-5 text-xl text-[#174579]">{title}</section>;
}
