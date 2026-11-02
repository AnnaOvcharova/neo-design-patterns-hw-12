/**
 * Блок відображення освіти в резюме
 */

import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education | Education[]) {}

  /**
   * Рендеринг блоку освіти
   */
  render(): HTMLElement {
    // Створюємо секцію
    const el = document.createElement("section");
    el.className = "section education";
    el.innerHTML = "<h2>Education</h2>";

    const items = Array.isArray(this.d) ? this.d : [this.d];

    for (const item of items) {
      const p = document.createElement("p");
      p.className = "education-item";
      p.textContent = `${item.degree} ${item.field}, ${item.institution} (${item.graduation})`;
      el.appendChild(p);
    }

    return el;
  }
}
