/**
 * Конкретна реалізація імпортера резюме
 * Наслідується від AbstractImporter і реалізує абстрактні методи
 */

import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory, BlockType } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  /**
   * Перевіряє, чи відповідає JSON-об'єкт очікуваній структурі
   */
  protected validate(): void {
    if (!this.raw || typeof this.raw !== "object") {
      throw new Error("Invalid JSON: raw data is not an object");
    }

    const requiredKeys = ["header", "summary", "experience", "education", "skills"];
    for (const key of requiredKeys) {
      if (!(key in (this.raw as Record<string, unknown>))) {
        throw new Error(`Invalid JSON: missing required field "${key}"`);
      }
    }
  }

  /**
   * Перетворює JSON-дані у внутрішню модель резюме
   */
  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  /**
   * Рендерить модель резюме у DOM
   */
  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content");
    if (!root) {
      throw new Error('Element "#resume-content" not found in DOM');
    }

    root.innerHTML = "";
    const factory = new BlockFactory();
    const order: BlockType[] = ["header", "summary", "experience", "education", "skills"];

    for (const type of order) {
      const block = factory.createBlock(type, model);
      root.appendChild(block.render());
    }
  }
}
