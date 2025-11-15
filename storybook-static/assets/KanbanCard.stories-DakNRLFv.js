import{K as n}from"./KanbanCard-W_HnRTzP.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-FXn2BHLQ.js";import"./preload-helper-PPVm8Dsz.js";const d={title:"Kanban/Card",component:n,parameters:{layout:"centered",backgrounds:{default:"light"}},tags:["autodocs"]},e={args:{task:{id:"1",title:"Design Hero Section",description:"Create landing page header with animation.",status:"todo",priority:"medium",assignee:"John Doe",tags:["UI","Frontend"],createdAt:new Date,dueDate:new Date(Date.now()+864e5*2)}}},t={args:{task:{id:"2",title:"Fix login issue",description:"Critical backend issue to resolve immediately.",status:"in-progress",priority:"urgent",assignee:"Jane Smith",tags:["Backend","Bug"],createdAt:new Date,dueDate:new Date(Date.now()+864e5)}}},a={args:{task:{id:"3",title:"Add API Docs",description:"Document all endpoints for internal usage.",status:"done",priority:"low",assignee:"Alex",tags:["Docs","API"],createdAt:new Date,dueDate:new Date(Date.now()+864e5*3)}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    task: {
      id: "1",
      title: "Design Hero Section",
      description: "Create landing page header with animation.",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      tags: ["UI", "Frontend"],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 2)
    }
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    task: {
      id: "2",
      title: "Fix login issue",
      description: "Critical backend issue to resolve immediately.",
      status: "in-progress",
      priority: "urgent",
      assignee: "Jane Smith",
      tags: ["Backend", "Bug"],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000)
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    task: {
      id: "3",
      title: "Add API Docs",
      description: "Document all endpoints for internal usage.",
      status: "done",
      priority: "low",
      assignee: "Alex",
      tags: ["Docs", "API"],
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 3)
    }
  }
}`,...a.parameters?.docs?.source}}};const c=["Default","Urgent","Done"];export{e as Default,a as Done,t as Urgent,c as __namedExportsOrder,d as default};
