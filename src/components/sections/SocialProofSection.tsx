import { useScrollReveal } from '../../hooks/useScrollReveal';

export function SocialProofSection() {
  const billingRef  = useScrollReveal<HTMLDivElement>();
  const paymentsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 px-8 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Facturación */}
        <div ref={billingRef} className="reveal flex flex-col justify-center">
          <h4 className="font-headline text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-primary-container inline-block pb-2 w-max">
            Facturación
          </h4>
          <div className="card-lift bg-surface-container-high p-8 relative flex flex-col justify-center h-full border border-outline-variant hover:border-primary-container transition-colors duration-300">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary-container/50 via-primary-container/15 to-transparent" />
            <span className="material-symbols-outlined text-primary-container text-5xl mb-4">receipt_long</span>
            <h5 className="text-2xl font-bold uppercase tracking-tight text-on-surface mb-3 font-headline">
              Sistema de Facturación
            </h5>
            <p className="text-on-surface-variant font-medium leading-relaxed">
              Contamos con sistema de facturación electrónica autorizado por el Ministerio de
              Hacienda para todos nuestros servicios empresariales y personales.
            </p>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div
          ref={paymentsRef}
          className="reveal flex flex-col justify-center"
          style={{ transitionDelay: '150ms' }}
        >
          <h4 className="font-headline text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-primary-container inline-block pb-2 w-max">
            Métodos de Pago
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: 'contactless', label: 'SINPE MÓVIL', delay: '0ms' },
              { icon: 'payments',    label: 'EFECTIVO',    delay: '100ms' },
              { icon: 'account_balance', label: 'TRANSFERENCIA', delay: '200ms' },
            ].map(({ icon, label, delay }) => (
              <div
                key={label}
                className="card-lift bg-surface-container-highest p-6 flex flex-col items-center gap-3 border border-outline-variant hover:border-primary-container transition-colors duration-300"
                style={{ transitionDelay: delay }}
              >
                <span className="material-symbols-outlined text-4xl text-primary-container">{icon}</span>
                <span className="font-bold text-xs uppercase tracking-widest text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
