import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ScriptHeader } from "../ScriptHeader";

describe("ScriptHeader", () => {
  const defaultProps = {
    scriptName: "Bank Lead Qualification Flow",
    version: "2.3",
    onTest: jest.fn(),
    onShare: jest.fn(),
    onSave: jest.fn(),
  };

  it("renders script name and version", () => {
    render(<ScriptHeader {...defaultProps} />);
    expect(
      screen.getByText("Bank Lead Qualification Flow")
    ).toBeInTheDocument();
    expect(screen.getByText("v2.3")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(<ScriptHeader {...defaultProps} />);
    expect(screen.getByText("Scripts")).toBeInTheDocument();
    expect(
      screen.getByText("Bank Lead Qualification Flow")
    ).toBeInTheDocument();
  });

  it("renders all action buttons", () => {
    render(<ScriptHeader {...defaultProps} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls onTest when Test button is clicked", () => {
    render(<ScriptHeader {...defaultProps} />);
    fireEvent.click(screen.getByText("Test"));
    expect(defaultProps.onTest).toHaveBeenCalled();
  });

  it("calls onShare when Share button is clicked", () => {
    render(<ScriptHeader {...defaultProps} />);
    fireEvent.click(screen.getByText("Share"));
    expect(defaultProps.onShare).toHaveBeenCalled();
  });

  it("calls onSave when Save button is clicked", () => {
    render(<ScriptHeader {...defaultProps} />);
    fireEvent.click(screen.getByText("Save"));
    expect(defaultProps.onSave).toHaveBeenCalled();
  });
});
