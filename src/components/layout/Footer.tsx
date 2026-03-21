export function Footer() {
  return (
    <footer className="bg-[#0E0E0E] w-full border-t-[4px] border-[#FFD700]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-16 w-full max-w-7xl mx-auto">

        <div className="flex flex-col gap-6">
          <div className="text-lg font-bold text-[#FFD700] font-headline uppercase tracking-tighter">
            GRÚAS ZAMORA MOYA
          </div>
          <p className="text-gray-400 text-sm max-w-xs font-body">
            Operando con la mayor fuerza y precisión técnica en todo el territorio nacional. Disponibilidad total para emergencias.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 bg-surface-variant flex items-center justify-center text-[#FFD700] hover:bg-primary-container hover:text-on-primary transition-all rounded-sm"
              href="https://www.facebook.com/gruas.zamora.5873"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" />
              </svg>
            </a>
            <a
              className="w-10 h-10 bg-surface-variant flex items-center justify-center text-[#FFD700] hover:bg-primary-container hover:text-on-primary transition-all rounded-sm"
              href="https://www.instagram.com/zamora.gruas/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              className="w-10 h-10 bg-surface-variant flex items-center justify-center text-[#FFD700] hover:bg-primary-container hover:text-on-primary transition-all rounded-sm"
              href="https://wa.me/50683876352"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h5 className="text-white font-headline font-black uppercase tracking-wider text-sm">Navegación</h5>
          <nav className="flex flex-col gap-3">
            <a className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm font-bold uppercase tracking-widest" href="#">Inicio</a>
            <a className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm font-bold uppercase tracking-widest" href="#servicios">Servicios</a>
            <a className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm font-bold uppercase tracking-widest" href="#privacidad">Aviso de Privacidad</a>
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <h5 className="text-white font-headline font-black uppercase tracking-wider text-sm">Sede Operativa</h5>
          <div className="flex items-start gap-4 text-gray-400 text-sm">
            <span className="material-symbols-outlined text-primary-container">location_on</span>
            <p>Alajuela, Grecia, Costa Rica. Cobertura Nacional 24/7.</p>
          </div>
          <a href="mailto:gruas.zamo75@gmail.com" className="flex items-start gap-4 text-gray-400 text-sm hover:text-[#FFD700] transition-colors group">
            <span className="material-symbols-outlined text-primary-container">mail</span>
            <p className="group-hover:underline">gruas.zamo75@gmail.com</p>
          </a>
          <a href="tel:+50683876352" className="flex items-start gap-4 text-gray-400 text-sm hover:text-[#FFD700] transition-colors group">
            <span className="material-symbols-outlined text-primary-container">phone</span>
            <p className="font-bold group-hover:underline">+506 8387-6352</p>
          </a>
        </div>

      </div>

      <div className="bg-surface-container-lowest py-6 px-12 text-center">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-500">
          © 2026 GRÚAS ZAMORA MOYA. FUERZA Y RESPUESTA INMEDIATA.
        </p>
      </div>
    </footer>
  );
}
