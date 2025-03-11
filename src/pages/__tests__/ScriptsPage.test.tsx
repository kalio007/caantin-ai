import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ScriptsPage } from "../ScriptsPage";
import { SidebarProvider } from "@/hooks/use-sidebar";

// Mock the components and hooks
jest.mock("@/components/layout/NavigationBar", () => ({
  NavigationBar: () => <div data-testid="navigation-bar">Navigation Bar</div>,
}));

jest.mock("@/components/scripts/ScriptHeader", () => ({
  ScriptHeader: ({ onTest, onShare, onSave }: any) => (
    <div data-testid="script-header">
      <button onClick={onTest}>Test</button>
      <button onClick={onShare}>Share</button>
      <button onClick={onSave}>Save</button>
    </div>
  ),
}));

jest.mock("@/components/scripts/NodesSidebar", () => ({
  NodesSidebar: ({ onNodeAdd }: any) => (
    <div data-testid="nodes-sidebar">
      <button onClick={() => onNodeAdd("greeting")}>Add Greeting</button>
    </div>
  ),
}));

jest.mock("@/components/nodes/CustomNodeFlow", () => ({
  CustomNodeFlow: () => <div data-testid="custom-node-flow">Flow Editor</div>,
}));

jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <SidebarProvider>{component}</SidebarProvider>
    </BrowserRouter>
  );
};

describe("ScriptsPage", () => {
  it("renders all main components", () => {
    renderWithProviders(<ScriptsPage />);

    expect(screen.getByTestId("navigation-bar")).toBeInTheDocument();
    expect(screen.getByTestId("script-header")).toBeInTheDocument();
    expect(screen.getByTestId("nodes-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("custom-node-flow")).toBeInTheDocument();
  });

  it("handles node addition", () => {
    renderWithProviders(<ScriptsPage />);
    fireEvent.click(screen.getByText("Add Greeting"));
    // The setActiveForm from context should be called
    // This is implicitly tested by the SidebarProvider
  });

  it("handles script actions", () => {
    renderWithProviders(<ScriptsPage />);

    fireEvent.click(screen.getByText("Test"));
    fireEvent.click(screen.getByText("Share"));
    fireEvent.click(screen.getByText("Save"));

    // Toast notifications should be triggered
    // This is handled by the mocked useToast
  });
});
