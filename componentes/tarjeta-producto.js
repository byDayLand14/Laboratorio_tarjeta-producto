// componentes/tarjeta-producto.js
// Componente <tarjeta-producto> de AvalibleStore.

// PASO 2 · Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    /* PASO 3 · :host con display y el color de marca con valor de respaldo */
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

    /* Reto extra · borde más grueso cuando la tarjeta es destacada */
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

  // PASO 3 · Atributos que observa el componente.
  static get observedAttributes() {
    return ["precio"];
  }

  constructor() {
    super();
    // PASO 2 · Shadow DOM en modo "open".
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // PASO 2 · Copia de la plantilla para esta instancia.
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    // PASO 3 · Precio inicial.
    this.mostrarPrecio();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    // PASO 3 · Actualiza la vista cuando cambia "precio".
    if (nombre === "precio") {
      this.mostrarPrecio();
    }
  }

  // PASO 3 · Propiedad sincronizada con el atributo.
  get precio() {
    return Number(this.getAttribute("precio"));
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  mostrarPrecio() {
    const span = this.shadowRoot.querySelector("#precio");
    // Si el atributo llega antes que connectedCallback, la plantilla aún no está clonada.
    if (!span) return;
    span.textContent = `$${this.precio.toFixed(2)}`;
  }
}

// PASO 1 · Registro del componente (la etiqueta lleva guion).
customElements.define("tarjeta-producto", TarjetaProducto);
