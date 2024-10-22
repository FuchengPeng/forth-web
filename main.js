document.addEventListener('DOMContentLoaded', () => {
  const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];

  const aliceTiming = {
    duration: 2000,
    iterations: 1,
    easing: 'ease-in-out',
    fill: 'forwards'
  };

  const aliceElements = document.querySelectorAll('#alice-container img');
  const startButton = document.getElementById('startButton');
  let animationRunning = false;

  startButton.addEventListener('click', () => {
    if (!animationRunning) {
      aliceElements.forEach((el, index) => {
        const delay = (index < 3) ? index * 500 : 0; // 前三个有延迟，后两个立即开始闪烁
        el.style.animationDelay = `${delay}ms`;
        if (index < 3) {
          el.animate(aliceTumbling, aliceTiming);
        } else {
          el.style.animation = 'none'; // 重置闪烁动画
          el.offsetHeight; // 触发重绘
          el.style.animation = `${aliceTiming.duration / 2}s infinite blink`; // 重新应用闪烁动画
        }
      });

      // 依次执行旋转消失动画
      let animationIndex = 0;
      const animationSequence = () => {
        if (animationIndex < aliceElements.length) {
          const currentElement = aliceElements[animationIndex];
          currentElement.animate(aliceTumbling, aliceTiming).onfinish = () => {
            animationIndex++;
            animationSequence();
          };
        }
      };
      animationSequence();

      animationRunning = true;
      startButton.textContent = 'Stop Animation';
    } else {
      aliceElements.forEach(el => {
        el.getAnimations().forEach(animation => animation.cancel());
        el.style.animation = 'none';
      });
      animationRunning = false;
      startButton.textContent = 'Start Animation';
    }
  });
});
