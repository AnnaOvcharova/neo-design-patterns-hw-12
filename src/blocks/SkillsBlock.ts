/**
 * Блок відображення навичок резюме
 */

import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  /**
   * Рендеринг блоку навичок
   */
  render(): HTMLElement {
    // Створюємо секцію
    const sec = document.createElement("section");
    sec.className = "section skills";
    sec.innerHTML = "<h2>Skills</h2>";

    const ul = document.createElement("ul");
    ul.className = "skills-list";

    for (const [category, skillsList] of Object.entries(this.d)) {
      if (Array.isArray(skillsList) && skillsList.length > 0) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${category}:</strong> ${skillsList.join(", ")}`;
        ul.appendChild(li);
      }
    }

    sec.appendChild(ul);
    return sec;
  }
}
