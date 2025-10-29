export class PanZoomImage {
  constructor(container, image) {
    this.container = container;
    this.image = image;

    // state
    this.zoom = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.isDragging = false;
    this.pinchStartDist = 0;
    this.pinchStartZoom = 1;

    this.initEvents();
  }

  updateTransform() {
    this.image.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.zoom})`;
  }

  initEvents() {
    // mouse wheel zoom
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      this.zoom = Math.min(Math.max(this.zoom + delta, 1), 5);
      this.updateTransform();
    });

    // mouse drag pan
    this.container.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.offsetX += dx;
      this.offsetY += dy;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // touch pan & pinch
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        const dx = e.touches[1].clientX - e.touches[0].clientX;
        const dy = e.touches[1].clientY - e.touches[0].clientY;
        this.pinchStartDist = Math.hypot(dx, dy);
        this.pinchStartZoom = this.zoom;
      }
    });

    this.container.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && this.isDragging) {
        const dx = e.touches[0].clientX - this.lastX;
        const dy = e.touches[0].clientY - this.lastY;
        this.offsetX += dx;
        this.offsetY += dy;
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
        this.updateTransform();
      } else if (e.touches.length === 2) {
        const dx = e.touches[1].clientX - e.touches[0].clientX;
        const dy = e.touches[1].clientY - e.touches[0].clientY;
        const dist = Math.hypot(dx, dy);
        const scaleChange = dist / this.pinchStartDist;
        this.zoom = Math.min(Math.max(this.pinchStartZoom * scaleChange, 1), 5);
        this.updateTransform();
      }
    });

    this.container.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) this.isDragging = false;
    });
  }
}
