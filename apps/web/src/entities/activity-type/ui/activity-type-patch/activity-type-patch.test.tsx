import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MOCK_ACTIVITY_TYPES } from "@/mocks";

import ActivityTypePatch from "./activity-type-patch";

function requireActivityType(id: string) {
  const activityType = MOCK_ACTIVITY_TYPES.find((item) => item.id === id);

  if (!activityType) {
    throw new Error(`Activity type not found: ${id}`);
  }

  return activityType;
}

describe("ActivityTypePatch", () => {
  it("활동 유형의 이름과 설명을 표시합니다.", () => {
    const activityType = requireActivityType("artist");

    render(<ActivityTypePatch activityType={activityType} />);

    expect(screen.getByText(activityType.name)).toBeInTheDocument();
    expect(screen.getByText(activityType.description)).toBeInTheDocument();
  });

  it("활동 유형 ID를 표현 계약에 유지합니다.", () => {
    const activityType = requireActivityType("meme-maker");

    render(<ActivityTypePatch activityType={activityType} />);

    expect(screen.getByText(activityType.name).closest("article")).toHaveAttribute(
      "data-activity-type",
      activityType.id,
    );
  });

  it("여러 활동 유형을 동등한 UI로 함께 표현할 수 있습니다.", () => {
    const artist = requireActivityType("artist");
    const developer = requireActivityType("developer");

    render(
      <div>
        <ActivityTypePatch activityType={artist} />
        <ActivityTypePatch activityType={developer} />
      </div>,
    );

    expect(screen.getByText(artist.name)).toBeInTheDocument();
    expect(screen.getByText(artist.description)).toBeInTheDocument();

    expect(screen.getByText(developer.name)).toBeInTheDocument();
    expect(screen.getByText(developer.description)).toBeInTheDocument();
  });

  it("활동 유형 자체에 불필요한 Interactive 역할을 추가하지 않습니다.", () => {
    const activityType = requireActivityType("archivist");

    render(<ActivityTypePatch activityType={activityType} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
