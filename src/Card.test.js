import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function() {
  render(
    <Card
      caption="Test Caption"
      src="test-image.jpg"
      currNum={1}
      totalNum={3}
    />
  );
});
