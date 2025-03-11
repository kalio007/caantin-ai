import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CustomNodeFlow } from "../CustomNodeFlow";
import { SidebarProvider } from "@/hooks/use-sidebar";

// Mock ReactFlow since it uses canvas which is not available in jsdom
jest.mock("@xyflow/react", () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="react-flow">{children}</div>
  ),
  Background: () => <div data-testid="background">Background</div>,
  Controls: () => <div data-testid="controls">Controls</div>,
  MiniMap: () => <div data-testid="minimap">MiniMap</div>,
  Panel: ({ children }: any) => <div data-testid="panel">{children}</div>,
  useNodesState: () => [
    [{ id: "1", type: "greeting", position: { x: 0, y: 0 } }],
    jest.fn(),
    jest.fn(),
  ],
  useEdgesState: () => [[], jest.fn(), jest.fn()],
  addEdge: jest.fn(),
}));

const renderWithProvider = (component: React.ReactNode) => {
  return render(<SidebarProvider>{component}</SidebarProvider>);
};

describe("CustomNodeFlow", () => {
  it("renders ReactFlow with all components", () => {
    renderWithProvider(<CustomNodeFlow />);

    expect(screen.getByTestId("react-flow")).toBeInTheDocument();
    expect(screen.getByTestId("background")).toBeInTheDocument();
    expect(screen.getByTestId("controls")).toBeInTheDocument();
    expect(screen.getByTestId("minimap")).toBeInTheDocument();
    expect(screen.getByTestId("panel")).toBeInTheDocument();
  });

  it("displays node and edge count in panel", () => {
    renderWithProvider(<CustomNodeFlow />);

    expect(screen.getByText("1 nodes • 0 connections")).toBeInTheDocument();
  });

  it("handles new node creation from sidebar context", () => {
    const { rerender } = renderWithProvider(<CustomNodeFlow />);

    // Simulate adding a new node through context
    const newNode = {
      id: "2",
      type: "question",
      data: {
        question: "Test Question",
        options: ["Option 1", "Option 2"],
      },
    };

    act(() => {
      // Update the context with a new node
      // This would typically be done through the SidebarProvider
      rerender(
        <SidebarProvider initialNodes={[newNode]}>
          <CustomNodeFlow />
        </SidebarProvider>
      );
    });

    // The new node should be processed and added to the flow
    expect(screen.getByText("2 nodes • 0 connections")).toBeInTheDocument();
  });
});
