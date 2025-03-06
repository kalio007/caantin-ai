# **Script Builder Node Editor**

A **visual node editor** designed to create and edit conversation flows effortlessly. This tool allows non-technical users, such as Sales and Marketing teams, to **design AI-driven workflows** without coding. It supports multiple node types, visual representations, and an intuitive drag-and-drop interface.

## **Project Overview**

The **Script Builder** is a no-code tool for building structured AI conversations. Users can define **Greeting, Question, and Information nodes**, visually map interactions, and preview conversation flows. This project provides a **user-friendly interface** to manage conversation logic efficiently.

## **Features Implemented**

## **Technology Stack**

- **Frontend:** React, TypeScript  
- **UI Components:** TailwindCSS, shadcn/ui  
- **Flow Management:** React Flow  
- **State Management:** React Context API  
- **Testing:** Jest, React Testing Library  
- **Containerization:** Docker  

### **Core Features (P0)**

- **Node-based conversation editor** – Drag and drop nodes to define workflows  
- **Three node types** – Greeting, Question, and Information  
- **Dynamic node properties** – Configure messages, options, and responses  
- **Live preview** – See real-time updates on conversation structure  
- **State persistence** – Save and reload node configurations  

### **Enhanced Features (P1)**

- **Field validation** – Ensure required properties are filled correctly  
- **Switch node types** – Change node categories dynamically  
- **UI differentiation** – Distinct colors and styles for each node type  
- **Responsive design** – Works on mobile, tablet, and desktop  

### **Advanced Functionality**

- **Node connectivity** – Link nodes to define logical conversation paths  
- **Dark/light mode** – Theme-aware UI customization  

---



---

## **Getting Started**

### **1. Run with Docker**
The project is containerized for easy setup. To start the development environment:  

```bash
# Build the Docker image
docker compose up
```

Then, open **[http://localhost:5173](http://localhost:5172)** in your browser.

### **2. Run Locally (Alternative)**
If running without Docker, follow these steps:

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

---

## **Project Structure**

```
src/
│── components/
│   ├── NodePreview/  # Node-specific preview components
│   ├── WorkflowEditor/  # Core workflow management
│   ├── ui/  # Reusable UI components
│── constants/  # Application constants
│── hooks/  # Custom React hooks
│── types/  # TypeScript type definitions
```

---

## **Supported Node Types**
The **Script Builder** supports various conversation elements:

1. **Greeting Node** – Start conversations with an introductory message  
2. **Question Node** – Collect responses with multiple-choice options  
3. **Information Node** – Provide static information to users  

---

## **Usage Scenarios**

- **Sales Managers** – Customize lead qualification scripts  
- **Customer Support Teams** – Build automated response flows  
- **Business Analysts** – Design customer journey conversations  
- **Developers** – Prototype AI-driven chatbot flows  

---

## **Development Approach**
### **🏗️ Modular Architecture**
- **Component-based UI** – Each node type is a reusable component  
- **Centralized State Management** – Ensures efficient data handling  
- **Type-Safe Development** – TypeScript ensures reliability  

### **⚡ Technical Decisions**
- **React Flow for Node Management** – Efficient rendering and interaction  
- **Docker for Deployment** – Ensures a consistent development environment  
- **Context API for State Management** – Lightweight alternative to Redux  

---

## **Testing**
Run unit tests with:

```bash
yarn test
```

---

## **Future Enhancements**
🚀 Planned features for upcoming releases:

- **Export/Import JSON Workflows** – Share configurations easily  
- **Collaborative Editing** – Multi-user workflow design  
- **API Integration** – Connect with external AI models  
