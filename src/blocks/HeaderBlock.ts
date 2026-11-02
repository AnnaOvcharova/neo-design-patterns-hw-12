/**
 * Блок відображення заголовка резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  /**
   * Рендеринг блоку заголовка
   */
  render(): HTMLElement {
    // Створюємо контейнер для заголовка
    const header = document.createElement("header");
    header.className = "section header";

    const contacts = [
      this.d.contacts?.email,
      this.d.contacts?.phone,
      this.d.contacts?.location,
    ]
      .filter(Boolean)
      .join(" ");

    header.innerHTML = `
      <h1>${this.d.fullName}</h1>
      <p><em>${this.d.title}</em></p>
      <p>${contacts}</p>
    `;

    return header;
  }
}
