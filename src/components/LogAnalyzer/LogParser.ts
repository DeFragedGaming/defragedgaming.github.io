export function parseLogs(input) {
  if (!input.trim()) return [];

  const lines = input.split("\n");

  return lines.map((line) => {
    const trimmed = line.trim();

    let level = "INFO";
    if (/error/i.test(trimmed)) level = "ERROR";
    else if (/warn/i.test(trimmed)) level = "WARN";
    else if (/debug/i.test(trimmed)) level = "DEBUG";

    return {
      raw: trimmed,
      level,
      timestamp: extractTimestamp(trimmed),
    };
  });
}

function extractTimestamp(line) {
  const iso = line.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  if (iso) return iso[0];

  const common = line.match(/\d{2}:\d{2}:\d{2}/);
  if (common) return common[0];

  return null;
}