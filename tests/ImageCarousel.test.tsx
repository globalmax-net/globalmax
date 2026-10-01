import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ImageCarousel from "@/components/ImageCarousel";

vi.mock("next/image", () => ({
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
  }) => <img {...props} />,
}));

const slides = [
  { src: "/one.jpg", alt: "First slide", title: "First", subtitle: "First subtitle", description: "First description" },
  { src: "/two.jpg", alt: "Second slide", title: "Second", subtitle: "Second subtitle", description: "Second description" },
  { src: "/three.jpg", alt: "Third slide", title: "Third", subtitle: "Third subtitle", description: "Third description" },
];

describe("ImageCarousel", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("moves between slides with the dot navigation", () => {
    render(<ImageCarousel slides={slides} />);

    expect(screen.getByAltText("First slide")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 2" }));
    expect(screen.getByAltText("Second slide")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 1" }));
    expect(screen.getByAltText("First slide")).toBeVisible();
  });

  it("advances automatically and does not schedule a timer for one slide", () => {
    vi.useFakeTimers();
    const { unmount } = render(<ImageCarousel slides={slides} intervalMs={1000} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByAltText("Second slide")).toBeVisible();

    unmount();
    expect(vi.getTimerCount()).toBe(0);

    const singleSlide = render(<ImageCarousel slides={[slides[0]]} intervalMs={1000} />);
    expect(vi.getTimerCount()).toBe(0);
    singleSlide.unmount();
  });
});