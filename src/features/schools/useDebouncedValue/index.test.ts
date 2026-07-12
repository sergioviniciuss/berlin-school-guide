import { act, renderHook } from "@testing-library/react";

import { useDebouncedValue } from ".";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns initial value immediately on first render", () => {
    const { result } = renderHook(() => useDebouncedValue("hello", 300));

    expect(result.current).toBe("hello");
  });

  it("does not update debounced output until delay elapses", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "ab" });

    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("ab");
  });

  it("emits only the final value after rapid successive changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "" } },
    );

    rerender({ value: "L" });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: "Le" });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: "Lew" });

    expect(result.current).toBe("");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("Lew");
  });

  it("clears pending timeout on unmount", () => {
    const { rerender, unmount } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "changed" });
    unmount();

    expect(() => {
      act(() => {
        jest.advanceTimersByTime(300);
      });
    }).not.toThrow();
  });
});
