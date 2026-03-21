export function SocialProofSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Facturacion */}
        <div className="flex flex-col justify-center">
          <h4 className="font-headline text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-primary-container inline-block pb-2 w-max">Facturación</h4>
          <div className="bg-surface-container-high p-8 relative flex flex-col justify-center h-full border border-outline-variant hover:border-primary-container transition-colors">
            <span className="material-symbols-outlined text-primary-container text-5xl mb-4">receipt_long</span>
            <h5 className="text-2xl font-bold uppercase tracking-tight text-on-surface mb-3 font-headline">
              Sistema de Facturación
            </h5>
            <p className="text-on-surface-variant font-medium leading-relaxed">
              Contamos con sistema de facturación electrónica autorizado por el Ministerio de Hacienda para todos nuestros servicios empresariales y personales.
            </p>
          </div>
        </div>
        
        {/* Payments */}
        <div className="flex flex-col justify-center">
          <h4 className="font-headline text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-primary-container inline-block pb-2 w-max">Métodos de Pago</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-highest p-6 flex flex-col items-center gap-3 border border-outline-variant hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-4xl text-primary-container">contactless</span>
              <span className="font-bold text-xs uppercase tracking-widest text-center">SINPE MÓVIL</span>
            </div>
            <div className="bg-surface-container-highest p-6 flex flex-col items-center gap-3 border border-outline-variant hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-4xl text-primary-container">payments</span>
              <span className="font-bold text-xs uppercase tracking-widest text-center">EFECTIVO</span>
            </div>
            <div className="bg-surface-container-highest p-6 flex flex-col items-center gap-3 border border-outline-variant hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-4xl text-primary-container">account_balance</span>
              <span className="font-bold text-xs uppercase tracking-widest text-center">TRANSFERENCIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
