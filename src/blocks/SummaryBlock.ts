/**
 * Блок відображення короткого опису резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SummaryBlock implements IBlock {
  constructor(private d: ResumeModel["summary"]) {}

  /**
   * Рендеринг блоку короткого опису
   */
  render(): HTMLElement {
    // Створюємо секцію
    const el = document.createElement("section");
    el.className = "section summary";

    const h2 = document.createElement("h2");
    h2.textContent = "Summary";
    el.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = this.d.text;
    el.appendChild(p);

    return el;
  }
}
