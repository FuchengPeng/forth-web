document.addEventListener('DOMContentLoaded', () => {
  const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];

  const aliceTiming = {
    duration: 2000,
    iterations: Infinity, // 无限循环
    easing: 'ease-in-out', // 平滑动画效果
    fill: 'forwards'
  };

  const aliceElements = document.querySelectorAll('#alice-container img');
  aliceElements.forEach((el, index) => {
    const delay = index * 500; // 每个动画延迟500ms
    el.style.animationDelay = `${delay}ms`;
    el.animate(aliceTumbling, aliceTiming);
  });
});
