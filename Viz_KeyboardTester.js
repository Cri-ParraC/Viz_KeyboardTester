//=============================================================================
// Viz_KeyboardTester.js [MZ] (v1.0.2)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [MZ] (v1.0.2) Registra en consola la actividad del teclado.
 * @author Vizcacha
 * @url https://github.com/Cri-ParraC/Viz_KeyboardTester
 * @help Viz_KeyboardTester.js [MZ] (v1.0.2)
 * ----------------------------------------------------------------------------
 * Plugin para RPG Maker MZ que registra en consola las teclas presionadas.
 * Útil para pruebas.
 * 
 * Registra cuando teclas individuales son presionadas, ya sean teclas comunes
 * o modificadores (Shift, Control, Alt o Meta).
 * Registra también cuando se presionan teclas + modificadores (ej: Ctrl+Z).
 * No registra combinaciones de teclas comunes (ej: A+Q).
 */

(() => {
  "use strict";

  console.info("Viz_KeyboardTester.js [MZ] (v1.0.2)");

  window.Imported ||= {};
  Imported.Viz_KeyboardTester = 1.0;

  const pressedKeys = new Set();

  const singleModifierPressed = (event) => {
    return (event.key === 'Shift' && !event.ctrlKey && !event.altKey && !event.metaKey)
      || (event.key === 'Control' && !event.shiftKey && !event.altKey && !event.metaKey)
      || (event.key === 'Alt' && !event.shiftKey && !event.ctrlKey && !event.metaKey)
      || (event.key === 'Meta' && !event.shiftKey && !event.ctrlKey && !event.altKey);
  };

  const combinationPressed = (event) => {
    let combination = '';

    if (event.ctrlKey) combination += 'Ctrl + ';
    if (event.shiftKey) combination += 'Shift + ';
    if (event.altKey) combination += 'Alt + ';
    if (event.metaKey) combination += 'Meta + ';
    combination += event.key;

    return combination;
  };

  document.addEventListener('keydown', (event) => {
    if (!pressedKeys.has(event.code)) {
      if (singleModifierPressed(event) || !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
        console.info(`Key: ${event.key} Code: ${event.code} KeyCode: ${event.keyCode}`);
        pressedKeys.add(event.code);
      }
      else {
        const combination = combinationPressed(event);
        console.info(`Combination: ${combination} Code: ${event.code} KeyCode: ${event.keyCode}`);
        pressedKeys.add(event.code);
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    pressedKeys.delete(event.code);
  });

})();