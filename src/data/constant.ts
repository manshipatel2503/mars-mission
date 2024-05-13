export const memberTypes = [
  { id: 1, value: "Pilot" },
  { id: 2, value: "Engineer" },
  { id: 3, value: "Passenger" },
];

export const jobTypes = [
  { id: 1, value: "Navigation" },
  { id: 2, value: "Solar panels" },
  { id: 3, value: "Maintenance" },
  { id: 4, value: "Mechanics" },
];

export const destination = [
  { id: 1, value: "Mars-Alpha-116" },
  { id: 2, value: "Mars-Alpha-117" },
  { id: 3, value: "Mars-Alpha-220" },
  { id: 4, value: "Mars-Alpha-221" },
  { id: 5, value: "Mars-Alpha-224" },
];
export const getOptionValueById = (
  options: { id: number; value: string }[],
  id: number
) => {
  const option = options.find((opt) => opt.id === id);
  return option ? option.value : "";
};
