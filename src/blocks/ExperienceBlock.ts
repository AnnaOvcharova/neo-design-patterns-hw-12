/**
 * Патерн Composite (Компоновщик)
 * 
 * Блок досвіду роботи, який містить дочірні блоки проєктів
 */

import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private d: Experience[]) {}

  /**
   * Рендеринг блоку досвіду роботи
   */
  render(): HTMLElement {
    const container = document.createElement("section");
    container.className = "section experience";
    container.innerHTML = "<h2>Experience</h2>";

    const experiences = Array.isArray(this.d) ? this.d : [this.d];

    for (const exp of experiences) {
      const expItem = document.createElement("div");
      expItem.className = "experience-item";

      const header = document.createElement("div");
      header.innerHTML = `<strong>${exp.position}</strong> at <em>${exp.company}</em> (${exp.start} – ${exp.end})`;
      expItem.appendChild(header);

      if (exp.projects && exp.projects.length > 0) {
        for (const proj of exp.projects) {
          let projectBlock: IBlock = new ProjectBlock(proj);

          if (proj.isRecent) {
            projectBlock = new HighlightDecorator(projectBlock);
          }

          expItem.appendChild(projectBlock.render());
        }
      }

      container.appendChild(expItem);
    }

    return container;
  }
}