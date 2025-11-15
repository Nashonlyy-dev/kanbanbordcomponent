# 🗂 Kanban Board Component

A fully interactive, responsive, and accessible Kanban Board built with **React**, **TypeScript**, and **Tailwind CSS**. Drag, drop, create, edit, and delete tasks with ease.

---

## 🔗 Live Storybook

Check out the live component demos here:
[Deployed Storybook URL](https://kanbanbordcomop.netlify.app/?path=/story/components-kanbanboard--default)

---

## ⚙️ Installation

Clone the repository and run:

```bash
npm install
npm run dev       # Starts the Kanban app
npm run storybook # Opens Storybook
```

---

## 🏗 Architecture

This Kanban Board follows a modular and scalable approach:

* **KanbanBoard** – Main container managing columns, tasks, and drag-and-drop.
* **KanbanCard** – Individual task card with edit/delete functionality.
* **useKanbanBoard hook** – Handles state, task creation, editing, deletion, and column assignment.
* **TaskModal** – Reusable modal for creating and editing tasks.
* **Drag-and-Drop** – Powered by dnd-kit for smooth interaction.

All components are **strictly typed with TypeScript** for safety and maintainability.

---

## ✨ Features

* 🖱 **Drag-and-Drop Tasks** – Move tasks between columns seamlessly.
* ✏️ **Task Creation & Editing** – Edit existing tasks with pre-filled values.
* 🗑 **Delete Tasks** – Remove tasks with confirmation.
* 📱 **Responsive Design** – Works on desktop, tablet, and mobile layouts.
* ⌨️ **Keyboard Accessibility** – Navigate and interact without a mouse.
* 🎨 **Priority Indicators & Tags** – Color-coded priorities and tag display.

---

## 📚 Storybook Stories

* 🟢 **Default Board** – Basic Kanban layout with sample tasks.
* ⚪ **Empty State** – Shows empty columns when no tasks are present.
* 🔴 **Large Dataset** – Stress test with 30+ auto-generated tasks.
* 📏 **Mobile View** – Narrow layout for smaller screens.
* 🎮 **Interactive Playground** – Test drag-and-drop and editing in real-time.

---

## 🛠 Technologies

* **React + TypeScript** – Component-driven architecture with type safety.
* **Tailwind CSS** – Fast, utility-first styling.
* **Storybook** – Component explorer and interactive playground.
* **dnd-kit** – Drag-and-drop library for React.
* [Other libraries as needed]

---

## 📫 Contact

Questions or suggestions? Reach out at:
durgaysubedi3@gmail.com

---

> Made with ❤️ and React by Navin Subedi/Nash
