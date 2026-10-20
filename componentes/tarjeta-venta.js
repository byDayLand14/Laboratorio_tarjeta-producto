const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      border-left: 6px solid var(--color-marca, #555555);
      border-radius: 8px;
      padding: 12px 16px;
      background: #ffffff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    }

    ::slotted(h3) {
      color: var(--color-marca, #555555);
      margin: 0 0 4px;
    }

    .detalle {
      margin-top: 10px;
      color: #444444;
    }

    .total {
      display: block;
      margin-top: 4px;
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-marca, #555555);
    }
  </style>

  <slot name="nombre"></slot>
  <slot>Sin detalle de entrega</slot>
  <div class="detalle" id="detalle"></div>
  <span class="total" id="total"></span>
`;

export class TarjetaVenta extends HTMLElement {

  static get observedAttributes() {
    return ["cantidad", "precio"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    this.mostrarTotal();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (nombre === "cantidad" || nombre === "precio") {
      this.mostrarTotal();
    }
  }

  get cantidad() {
    return Number(this.getAttribute("cantidad"));
  }

  set cantidad(valor) {
    this.setAttribute("cantidad", valor);
  }

  get precio() {
    return Number(this.getAttribute("precio"));
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  get total() {
    return this.cantidad * this.precio;
  }

  mostrarTotal() {
    const detalle = this.shadowRoot.querySelector("#detalle");
    const total = this.shadowRoot.querySelector("#total");
    if (!detalle || !total) return;
    detalle.textContent = `${this.cantidad} × $${this.precio.toFixed(2)}`;
    total.textContent = `Total: $${this.total.toFixed(2)}`;
  }
}

customElements.define("tarjeta-venta", TarjetaVenta);
