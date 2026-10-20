const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      border: 2px dashed var(--color-marca, #555555);
      border-radius: 12px;
      padding: 16px;
      background: #ffffff;
    }

    ::slotted([slot="icono"]) {
      font-size: 2rem;
    }

    ::slotted(h3) {
      color: var(--color-marca, #555555);
      margin: 8px 0 4px;
    }

    .costo {
      display: inline-block;
      margin-top: 12px;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--color-marca, #555555);
      color: #ffffff;
      font-weight: bold;
    }
  </style>

  <slot name="icono"></slot>
  <slot name="nombre"></slot>
  <slot>Sin detalle</slot>
  <span class="costo" id="costo"></span>
`;

export class TarjetaServicio extends HTMLElement {

  static get observedAttributes() {
    return ["costo"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    this.mostrarCosto();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (nombre === "costo") {
      this.mostrarCosto();
    }
  }

  get costo() {
    return Number(this.getAttribute("costo"));
  }

  set costo(valor) {
    this.setAttribute("costo", valor);
  }

  mostrarCosto() {
    const span = this.shadowRoot.querySelector("#costo");
    if (!span) return;
    span.textContent = this.costo === 0 ? "Gratis" : `Desde $${this.costo.toFixed(2)}`;
  }
}

customElements.define("tarjeta-servicio", TarjetaServicio);
