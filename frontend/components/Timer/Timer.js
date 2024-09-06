export function Timer({ time = 30, onTimeEnd = null }) {
  const timer = document.createElement("div");
  timer.className = "timer";

  // Inicializa o tempo em segundos (minutos * 60)
  let remainingTime = time * 60;
  timer.textContent = formatTime(remainingTime);

  const interval = setInterval(() => {
    remainingTime -= 1;
    timer.textContent = formatTime(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(interval);
      timer.textContent = "Tempo Esgotado";
      if (onTimeEnd) {
        onTimeEnd();
      }
    }
  }, 1000);

  return timer;
}

// Função auxiliar para formatar o tempo em hh:mm:ss
function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
