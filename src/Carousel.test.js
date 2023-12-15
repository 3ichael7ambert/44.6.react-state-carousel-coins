import { render, fireEvent, waitFor } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

///
it("renders without crashing", function() {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
});


it("moves to the previous image when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // move forward to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move back to the first image using the left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});




it("hides the left arrow on the first image and the right arrow on the last image", async function () {
  const { getByTestId, container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Check that the left arrow is present initially
  const leftArrow = getByTestId("left-arrow");  // Use getByTestId directly
  console.log("Left Arrow:", leftArrow);
  expect(leftArrow).toBeInTheDocument();

  // Check that the right arrow is present initially
  expect(getByTestId("right-arrow")).toBeInTheDocument();

  // Move to the last image
  fireEvent.click(getByTestId("right-arrow"));
  fireEvent.click(getByTestId("right-arrow"));

  // Use waitFor to wait for the DOM to update
  await waitFor(() => {
    // Check that the left arrow is missing on the last image
    expect(queryByTestId("left-arrow")).toBeNull();
  });

  // Move back to the first image
  fireEvent.click(getByTestId("left-arrow"));

  // Use waitFor to wait for the DOM to update
  await waitFor(() => {
    // Check that the right arrow is missing on the first image
    expect(queryByTestId("right-arrow")).toBeNull();
  });
});
