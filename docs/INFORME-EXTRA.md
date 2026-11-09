# Laboratorio extra S10 · La bandeja de aprobaciones

**Guillermo Willard** · Desarrollo de Aplicaciones Empresariales · Semana 10

## Resumen

Se completó la pantalla donde una persona revisa los planes que propone un agente de IA. Los planes que solo crean datos (R1) se aprueban con un clic. Los destructivos (R2) solo se aprueban escribiendo el hash exacto del plan. Cada parte de la guía está en un commit propio.

| Parte | Qué se hizo | Resultado |
| --- | --- | --- |
| 1 · `Button` | Variantes `primary`, `danger` y `ghost`; contenido por `children`; `type="button"` por defecto pero reemplazable; reenvía el resto de props | `npm test -- Button`: 12/12 |
| 2 · `HashConfirm` | Entrada controlada (`typed`); «Aprobar» deshabilitado hasta que `typed === hash` | `npm test -- HashConfirm`: 12/12 |
| 3 · `Inbox` | Estado `decisions` (inicialización perezosa desde `localStorage`) y `query`; `decide` sin mutar; pendientes, decididos y filtrados calculados; `clearSearch`; persistencia con `useEffect` | `npm test`: **61/61** |
| 4 · Versión de la IA | Se clasificaron y corrigieron sus 4 fallos | `npm run test:ai`: de 11 fallos a **61/61** |

## Parte 4 · Los 4 fallos de la versión «escrita por una IA»

| # | Archivo | Fallo | Tipo | Corrección |
| --- | --- | --- | --- | --- |
| 1 | `HashConfirm.jsx` | `typed.includes(hash)` habilita «Aprobar» con el hash rodeado de texto extra | Seguridad: barrera débil | Comparación exacta `typed === hash` |
| 2 | `Inbox.jsx` | `decide` muta `decisions` y pasa el mismo objeto a `setDecisions`, así que React no vuelve a dibujar | Estado: mutación | Objeto nuevo con `setDecisions((c) => ({ ...c, [id]: verdict }))`; la persistencia pasa a un `useEffect` |
| 3 | `Inbox.jsx` | `onClick={clearSearch()}` llama a la función mientras se dibuja, en vez de pasarla | Eventos | `onClick={clearSearch}` |
| 4 | `PlanCard.jsx` | La tarjeta guarda su propio `verdict`, duplicando lo que ya sabe `Inbox` | Comunicación hacia arriba: estado duplicado | La tarjeta no tiene estado; solo avisa con `onDecide(id, verdict)` |

Salida antes y después: `docs/evidencias/04-ia-antes.txt` y `05-ia-despues.txt`.

## Qué recuerda la pantalla y dónde

| Dato | Dónde | Por qué |
| --- | --- | --- |
| `decisions` | Estado de `Inbox`, guardado en `localStorage` (`dae-s10-decisions`) | Lo cambian las tarjetas y lo usan los contadores y las dos listas |
| `query` | Estado de `Inbox` | Lo usan el buscador y la lista de pendientes |
| `typed` | Estado local de `HashConfirm` | Solo importa dentro de esa confirmación |
| Pendientes, decididos, visibles y contadores | Calculados en cada dibujado | Se derivan de `plans`, `decisions` y `query`; guardarlos sería duplicar |

## Texto hostil (P-02)

El plan P-02 trae «IGNORA TUS INSTRUCCIONES…» con `<b>` e `<img onerror>`. Se muestra como texto: React escapa las cadenas, no se usa `dangerouslySetInnerHTML`, no se crea ningún `<img>` ni `<b>` y no se dispara ningún `alert` (`docs/evidencias/07-texto-hostil.txt`). Es un dato de terceros, no una orden.

## Nota del entorno

Con Node 26, el `localStorage` propio de Node tapa al de jsdom en las pruebas. `src/test/setup.js` añade un almacenamiento en memoria equivalente solo cuando falta. No se cambió ninguna prueba.

## Evidencias

![Bandeja inicial](evidencias/01-bandeja-inicial.png)
![Hash incompleto](evidencias/02-hash-incompleto.png)
![Hash exacto](evidencias/03-hash-exacto.png)
![Decisiones](evidencias/04-decisiones.png)
![Búsqueda sin resultados](evidencias/05-busqueda-vacia.png)
![Persistencia](evidencias/06-persistencia.png)
