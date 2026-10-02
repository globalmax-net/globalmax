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

  it("supports additional services and CMS-provided upcoming platforms", () => {
    const extraService = {
      ...SERVICES[0],
      code: "NEW",
      name: "Additional Service",
    };
    const extraPlatform = {
      name: "Future Platform",
      description: "A platform managed through the CMS.",
    };

    render(
      <ServicesGrid
        services={[...SERVICES, extraService]}
        upcoming={[extraPlatform]}
      />
    );

    expect(screen.getByText("7 core services.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Additional Service" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Future Platform" })).toBeInTheDocument();
  });
});