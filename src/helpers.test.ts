import {
  countCharacters,
  countDigits,
  maskMatch,
  method2,
  method3,
  replaceWithMask,
} from "./helpers";

test("method", () => {
  expect(
    replaceWithMask("48 111 222333", "## ### ######", "## ### ### ###")
  ).toBe("48 111 222 333");
  expect(
    replaceWithMask("+48 111 222333", "+## ### ######", "+## ### ### ###")
  ).toBe("+48 111 222 333");
  expect(
    replaceWithMask("+48 111222333", "+## ### ######", "+## ### ### ###")
  ).toBe("+48 111222333");
});

test("method2", () => {
  const triggerMasks = [
    "## ### ######",
    "## #########",
    "###########",
    "######## ###",
    "##### ### ###",
  ];
  const destinationMask = "+## ### ### ###";
  const expectedValue = "+48 111 222 333";

  const values = [
    "48 111 222333",
    "48 111222333",
    "48111222333",
    "48111222 333",
    "48111 222 333",
  ];

  values.forEach((value) => {
    expect(method2(value, triggerMasks, destinationMask)).toBe(expectedValue);
  });
});

test("method2 - 2", () => {
  const triggerMasks = ["###########"];
  const destinationMask = "+## ### ### ###";
  const expectedValue = "1122233344";

  const values = ["1122233344"];

  values.forEach((value) => {
    expect(method2(value, triggerMasks, destinationMask)).toBe(expectedValue);
  });
});

test("method2 - 3", () => {
  const triggerMasks = ["#########"];
  const destinationMask = "+48 ### ### ###";
  const expectedValue = "+48 111 222 333";

  const values = ["111222333"];

  values.forEach((value) => {
    expect(method2(value, triggerMasks, destinationMask)).toBe(expectedValue);
  });
});

test("method3 - 1", () => {
  const rules = [
    { triggerMasks: ["#########"], destinationMask: "+# ### ### ##" },
    { triggerMasks: ["##########"], destinationMask: "+# ### ### ###" },
  ];
  const expectedValue = "+4 111 222 333";

  const values = ["4111222333"];

  values.forEach((value) => {
    expect(method3(value, rules)).toBe(expectedValue);
  });
});

test("method3 - 2", () => {
  const rules = [
    {
      triggerMasks: [
        "## ### ######",
        "## #########",
        "###########",
        "######## ###",
        "##### ### ###",
        "+## ### ######",
        "+## #########",
        "+###########",
        "+######## ###",
        "+##### ### ###",
      ],
      destinationMask: "+## ### ### ###",
    },
    {
      triggerMasks: [
        "# ### ######",
        "# #########",
        "##########",
        "####### ###",
        "#### ### ###",
        "#### ######",
        "+# ### ######",
        "+# #########",
        "+##########",
        "+####### ###",
        "+#### ### ###",
      ],
      destinationMask: "+# ### ### ###",
    },
  ];
  const expectedValue = "+1 222 333 444";

  const values = ["1222 333444"];

  values.forEach((value) => {
    expect(method3(value, rules)).toBe(expectedValue);
  });
});

test("method1 - 111", () => {
  expect(replaceWithMask("1222 333444", "###########", "+## ### ### ###")).toBe(
    "1222 333444"
  );
});

test("mask match", () => {
  expect(maskMatch("1 2", "# #")).toBe(true);
  expect(maskMatch("12", "##")).toBe(true);
  expect(maskMatch("+12", "+##")).toBe(true);

  expect(maskMatch("12", "#")).toBe(false);
  expect(maskMatch("1 2", "##")).toBe(false);
  expect(maskMatch("+12", "##")).toBe(false);
});

test("count digits", () => {
  expect(countDigits("12")).toBe(2);
  expect(countDigits("+12")).toBe(2);
  expect(countDigits("+1 2")).toBe(2);
  expect(countDigits("1 2")).toBe(2);
});

test("count characters", () => {
  expect(countCharacters("12##", "#")).toBe(2);
  expect(countCharacters("+12#", "#")).toBe(1);
  expect(countCharacters("+1#2", "#")).toBe(1);
  expect(countCharacters("#1 2#", "#")).toBe(2);
});

test("replace with mask", () => {
  expect(replaceWithMask("1 2", "# #", "##")).toBe("12");
  expect(replaceWithMask("+1 2", "+# #", "+##")).toBe("+12");
  expect(replaceWithMask("+12", "+##", "+# #")).toBe("+1 2");
});
