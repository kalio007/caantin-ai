import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "../NavigationBar";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NavigationBar", () => {
  const defaultProps = {
    username: "testuser",
    notificationCount: 3,
  };

  it("renders the logo and company name", () => {
    renderWithRouter(<NavigationBar {...defaultProps} />);
    expect(screen.getByAltText("Caantin AI")).toBeInTheDocument();
    expect(screen.getByText("Caantin AI")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderWithRouter(<NavigationBar {...defaultProps} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Call Queue")).toBeInTheDocument();
    expect(screen.getByText("Scripts")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
  });

  it("displays the username", () => {
    renderWithRouter(<NavigationBar {...defaultProps} />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("displays notification count when provided", () => {
    renderWithRouter(<NavigationBar {...defaultProps} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not display notification badge when count is 0", () => {
    renderWithRouter(
      <NavigationBar username="testuser" notificationCount={0} />
    );
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("renders search input with correct placeholder", () => {
    renderWithRouter(<NavigationBar {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders avatar with correct fallback", () => {
    renderWithRouter(<NavigationBar {...defaultProps} />);
    expect(screen.getByText("TE")).toBeInTheDocument(); // First two letters of 'testuser'
  });
});
