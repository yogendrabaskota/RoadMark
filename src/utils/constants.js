export const SEVERITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const STATUS_OPTIONS = [
  { value: "reported", label: "Reported" },
  { value: "verified", label: "Verified" },
  { value: "in-progress", label: "In Progress" },
  { value: "fixed", label: "Fixed" },
];

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
