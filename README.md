# Práctica de laboratorio · `<tarjeta-producto>`

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Completa |
| --- | --- |
| Emprendimiento | AvalibleStore |
| Estudiantes (Apellido Nombre) | Cajas Dylan · De la Cruz Alejandro · Sangoquiza David |
| NRC | 36642 |
| Fecha | 20/10/2026 |
| Enlace del repositorio | https://github.com/byDayLand14/Laboratorio_tarjeta-producto |

## Propuesta del emprendimiento

- Nombre del emprendimiento: **AvalibleStore** · «Lo que te hace sentir bien». Tienda en línea: https://avaliblestore.pages.dev/
- Problema que resuelve: Comprar productos de belleza, tecnología y ahorro a buen precio en Quito suele obligar a ir a centros comerciales o pagar envíos caros y sin garantía. AvalibleStore vende en línea con retiro gratis en paradas del Metro de Quito, envío a todo el Ecuador, pago por transferencia, DeUna o contra entrega, y cambio por defecto en 7 días.
- Cliente al que se dirige: Jóvenes y adultos de Quito y del resto del Ecuador que compran por WhatsApp o Instagram y buscan productos accesibles para su cuidado personal, tecnología y ahorro.

## Cómo abrir el proyecto

1. Abre la carpeta en Visual Studio Code.
2. Clic derecho sobre `index.html` → **Open with Live Server**. Los módulos no cargan con `file://`.
3. Abre las herramientas del navegador (F12) y deja visible la pestaña **Consola**.

## Registro de los pasos

### Paso 1 · index.html y el módulo

- Etiqueta que registramos: `<tarjeta-producto>`, con `customElements.define("tarjeta-producto", TarjetaProducto)` al final del módulo. Del mismo modo se registran `<tarjeta-servicio>` y `<tarjeta-venta>`.
- ¿Por qué el nombre debe llevar guion?: El estándar de Custom Elements exige al menos un guion para distinguir los elementos personalizados de las etiquetas nativas de HTML, que nunca llevan guion, y evitar choques con etiquetas futuras. Sin guion, `define()` lanza un error.
- Ruta del módulo y cómo lo importa la página: El módulo está en `componentes/tarjeta-producto.js` y exporta la clase `TarjetaProducto`. La página lo carga en el `<head>` con `<script type="module" src="./componentes/tarjeta-producto.js"></script>`, y con una etiqueta igual carga `tarjeta-servicio.js` y `tarjeta-venta.js`.

### Paso 2 · Plantilla, Shadow DOM y slots

- Slots con nombre que tiene la plantilla: `foto` y `nombre`.
- Texto de respaldo del slot sin nombre: «Sin descripción».
- ¿Qué pasaría si no usáramos `cloneNode(true)`?: Al agregar `plantilla.content` sin clonarlo, sus nodos se moverían al Shadow DOM de la primera tarjeta y la plantilla quedaría vacía, así que la segunda y la tercera tarjeta no tendrían estructura ni estilos. Con `cloneNode(true)` cada instancia recibe su propia copia profunda.

### Paso 3 · Atributo precio y estilos

- Método que reacciona cuando cambia `precio`: `attributeChangedCallback`, porque `precio` está declarado en `observedAttributes`. La propiedad `precio` se sincroniza con el atributo con `get` (lee `getAttribute`) y `set` (escribe `setAttribute`).
- Color de marca (`--color-marca`) y dónde lo definimos: `#A87B2C` (dorado de AvalibleStore), definido en `estilos.css` sobre los selectores `tarjeta-producto`, `tarjeta-servicio` y `tarjeta-venta`.
- Valor de respaldo que usa el componente si la página no define la variable: `#555555`, en `var(--color-marca, #555555)`. Los tres componentes usan `:host { display: block; }`.

### Paso 4 · Tres productos del emprendimiento

| # | Producto | Precio |
| --- | --- | --- |
| 1 | Combo: churera, plancha y cepillo secador | $30.00 |
| 2 | Audífonos Premium Pro 2 | $22.00 |
| 3 | Alcancía de madera Gatito | $10.00 |

La página también muestra tres `<tarjeta-servicio>` (retiro en el Metro de Quito, envío a todo el Ecuador y cambio por defecto) y tres `<tarjeta-venta>` de ejemplo.

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
| --- | --- |
| Cajas Dylan | Creó el repositorio en GitHub y subió el kit inicial; construyó `<tarjeta-producto>`: módulo, Shadow DOM, plantilla clonada, slots `foto` y `nombre`, atributo `precio` con get/set y estilos con `:host`. |
| De la Cruz Alejandro | Construyó `<tarjeta-servicio>`: plantilla con slots `icono` y `nombre`, atributo `costo` observado y sincronizado (0 muestra «Gratis») y estilos con `var(--color-marca)`. |
| Sangoquiza David | Construyó `<tarjeta-venta>` (atributos `cantidad` y `precio`, total calculado); integró los tres componentes en `index.html` y `estilos.css`, agregó las imágenes de los productos, gestionó el repositorio (colaboradores, commits y push), verificó el acceso público y redactó este README. |

## Verificación

Marca con una `x` lo que ya comprobaste en el navegador.

- [x] La etiqueta tiene guion.
- [x] La página solo cambia lo que el componente expone con `var()`.
- [x] `setAttribute` cambia el precio en pantalla.
- [x] La consola no muestra errores.

Prueba que usamos en la consola:

```js
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

Resultado que vimos: El precio de la primera tarjeta cambió de $30.00 a $25.00 sin recargar la página y la consola no mostró errores. También probamos `document.querySelector("tarjeta-servicio").costo = 3` (cambió de «Gratis» a «Desde $3.00») y `document.querySelector("tarjeta-venta").setAttribute("cantidad", "5")` (el total pasó a $110.00).

## Reto extra (opcional)

- [x] Atributo `destacado` que cambia el borde con `:host([destacado])` (lo usa la primera tarjeta de producto).

## Uso de inteligencia artificial

- Herramienta usada (o «ninguna»): Claude (Anthropic).
- Para qué la consultamos: Para entender las instrucciones del laboratorio, revisar los componentes, organizar el trabajo en Git y redactar la estructura de este README.
- Qué cambiamos o comprobamos nosotros: Elegimos los productos y servicios de AvalibleStore, probamos cada componente con Live Server y la consola, y revisamos que cada respuesta del README coincida con nuestro código.
