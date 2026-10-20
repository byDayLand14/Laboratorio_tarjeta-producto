const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      border: 2px solid var(--color-marca, #555555);
      border-radius: 12px;
      padding: 16px;
      background: #ffffff;
    }

    ::slotted(img) {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 8px;
    }

    ::slotted(h3) {
      color: var(--color-marca, #555555);
      margin: 12px 0 4px;
    }

    .precio {
      display: block;
      margin-top: 12px;
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--color-marca, #555555);
    }

    :host([destacado]) {
      border-width: 4px;
    }
  </style>

  <slot name="foto"></slot>
  <slot name="nombre"></slot>
  <slot>Sin descripción</slot>
  <span class="precio" id="precio"></span>
`;

export class TarjetaProducto extends HTMLElement {

  static get observedAttributes() {
    return ["precio"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    this.mostrarPrecio();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (nombre === "precio") {
      this.mostrarPrecio();
    }
  }

  get precio() {
    return Number(this.getAttribute("precio"));
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  mostrarPrecio() {
    const span = this.shadowRoot.querySelector("#precio");
    if (!span) return;
    span.textContent = `$${this.precio.toFixed(2)}`;
  }
}

customElements.define("tarjeta-producto", TarjetaProducto);
