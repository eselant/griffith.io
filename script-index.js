  window.addEventListener('load', () => {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('hidden'); // запускаем плавное исчезание
    // полностью удалить overlay после окончания анимации
    overlay.addEventListener('transitionend', () => overlay.remove());
  });
  const music = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  let isPlaying = true;

  // Автоматическое воспроизведение с громкостью 30%
  window.addEventListener('load', async () => {
    try {
      music.volume = 0.05;
      await music.play();
      music.muted = false;
    } catch (e) {
      console.log("Автоплей заблокирован браузером:", e);
    }
  });

  // Кнопка вкл/выкл
  btn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      btn.classList.add('off');
    } else {
      music.play();
      btn.classList.remove('off');
    }
    isPlaying = !isPlaying;
  });

        // Открытие модального окна
        document.getElementById('supportLink').addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем переход по ссылке
            document.getElementById('modalOverlay').style.display = 'flex';
        });

        // Закрытие модального окна, если кликнули за пределы окна
        document.getElementById('modalOverlay').addEventListener('click', function(event) {
            if (event.target === document.getElementById('modalOverlay')) {
                document.getElementById('modalOverlay').style.display = 'none';
            }
        });