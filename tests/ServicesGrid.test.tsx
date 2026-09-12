import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicesGrid from "@/components/ServicesGrid";
import { SERVICES, UPCOMING } from "@/components/types";

describe("ServicesGrid", () => {
  it("renders every service and upcoming platform from the shared catalog", () => {
    render(<ServicesGrid />);

    for (const service of SERVICES) {
      expect(screen.getByRole("heading", { name: service.name })).toBeInTheDocument();
      expect(screen.getByText(service.tagline)).toBeInTheDocument();
      expect(screen.getByText(service.statValue)).toBeInTheDocument();
    }

    for (const platform of UPCOMING) {
      expect(screen.getByRole("heading", { name: platform.name })).toBeInTheDocument();
      expect(screen.getByText(platform.description)).toBeInTheDocument();
    }
  });
});