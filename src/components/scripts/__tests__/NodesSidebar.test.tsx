import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NodesSidebar } from "../NodesSidebar";

describe("NodesSidebar", () => {
  const mockOnNodeAdd = jest.fn();

  beforeEach(() => {
    mockOnNodeAdd.mockClear();
  });

  it("renders all conversation nodes", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    expect(screen.getByText("Greeting")).toBeInTheDocument();
    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.getByText("Knowledge Base")).toBeInTheDocument();
    expect(screen.getByText("External Data")).toBeInTheDocument();
    expect(screen.getByText("Transfer")).toBeInTheDocument();
  });

  it("renders node descriptions", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    expect(screen.getByText("Start your conversation")).toBeInTheDocument();
    expect(screen.getByText("Ask the customer something")).toBeInTheDocument();
    expect(screen.getByText("Retrieve information")).toBeInTheDocument();
    expect(screen.getByText("Connect to your systems")).toBeInTheDocument();
    expect(screen.getByText("Hand off to a human agent")).toBeInTheDocument();
  });

  it("calls onNodeAdd with correct node type when clicked", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    fireEvent.click(screen.getByText("Greeting"));
    expect(mockOnNodeAdd).toHaveBeenCalledWith("greeting");
  });

  it("filters nodes based on search query", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    const searchInput = screen.getByPlaceholderText("Search nodes...");

    fireEvent.change(searchInput, { target: { value: "question" } });

    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.queryByText("Greeting")).not.toBeInTheDocument();
  });

  it("shows empty templates tab content", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    fireEvent.click(screen.getByText("Templates"));
    expect(screen.getByText("No templates available")).toBeInTheDocument();
  });

  it("shows all nodes when search is cleared", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    const searchInput = screen.getByPlaceholderText("Search nodes...");

    fireEvent.change(searchInput, { target: { value: "question" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(screen.getByText("Greeting")).toBeInTheDocument();
    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.getByText("Knowledge Base")).toBeInTheDocument();
  });

  it("filters nodes based on description", () => {
    render(<NodesSidebar onNodeAdd={mockOnNodeAdd} />);
    const searchInput = screen.getByPlaceholderText("Search nodes...");

    fireEvent.change(searchInput, { target: { value: "customer" } });

    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.queryByText("Greeting")).not.toBeInTheDocument();
  });
});
