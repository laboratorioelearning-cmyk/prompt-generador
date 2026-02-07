const KEYS = {
  history: "eduPromptStudio.history",
  settings: "eduPromptStudio.settings"
};

export function loadHistory() {
  return JSON.parse(localStorage.getItem(KEYS.history) || "[]");
}

export function saveHistory(history) {
  localStorage.setItem(KEYS.history, JSON.stringify(history));
}

export function addHistoryItem(item) {
  const history = loadHistory();
  history.unshift(item);
  saveHistory(history.slice(0, 200));
}

export function removeHistoryItem(id) {
  const history = loadHistory().filter((entry) => entry.id !== id);
  saveHistory(history);
}

export function clearHistory() {
  localStorage.removeItem(KEYS.history);
}

export function loadSettings() {
  return JSON.parse(localStorage.getItem(KEYS.settings) || "{}");
}

export function saveSettings(settings) {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}
