import { effects, maps } from './data/index.js';
import { bosses } from './data/bosses.js';
import { EARTH_SHIFT } from './data/constants.js';
import { toUpperCaseFirst, uniqueByKeys, sortByKeys } from './util/index.js';

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const App = {
  maps,
  bosses,
  earthShifts: Object.values(EARTH_SHIFT).map((key) => ({
    key,
    label: toUpperCaseFirst(key),
  })),

  selectedBoss: null,
  selectedEarthShift: null,
  filteredMaps: [],
  mapLocations: [],
  resultMaps: [],

  activeMap: null,
  scale: 1,

  autenticTheme: false,
  isDesktop: window.innerWidth >= BREAKPOINTS.lg,
  drawerOpen: true,
  startX: 0,

  onMounted() {
    const savedTheme = localStorage.getItem('theme');
    this.autenticTheme = savedTheme === 'autentic';

    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= BREAKPOINTS.lg;
      this.drawerOpen = !this.isDesktop;
    });
  },

  filterMaps() {
    document.documentElement.setAttribute('data-theme', this.autenticTheme ? 'autentic' : 'light');
    this.showResult = false;
    console.log('Filtering maps with', this.selectedBoss, this.selectedEarthShift);
    if (!this.selectedBoss || !this.selectedEarthShift) {
      this.filteredMaps = this.maps;
      return;
    }

    this.filteredMaps = this.maps.filter((map) => {
      if (map.boss !== this.selectedBoss.name) {
        return false;
      }
      if (map.earthShift !== this.selectedEarthShift.key) {
        return false;
      }
      return true;
    });

    const locations = this.filteredMaps.map((map) => ({
      id: map.id,
      label: toUpperCaseFirst(map.nwLocation.type || 'none'),
      effectIcon: effects.find((e) => e.type === map.nwLocation.effect)?.icon,
      ...map.nwLocation,
    }));

    const uniqueLocations = uniqueByKeys(locations, 'type', 'effect');
    this.mapLocations = sortByKeys(uniqueLocations, ['type', 'effect']);

    console.log('Filtered Maps:', JSON.parse(JSON.stringify(this.filteredMaps)));
  },

  setResultMaps(location) {
    this.resultMaps = this.filteredMaps.filter(
      (map) =>
        map.nwLocation.type === (location.type || null) &&
        map.nwLocation.effect === (location.effect || null)
    );
    this.drawerOpen = false;
  },

  setActiveMap(map) {
    this.activeMap = map;
    // setTimeout(() => {
    //   const imgContainer = document.querySelector('#active-map-container');
    //   const img = imgContainer.querySelector('img');
    //   new PanZoomImage(imgContainer, img);
    // }, 0);
  },

  toggleTheme() {
    this.autenticTheme = !this.autenticTheme;
    localStorage.setItem('theme', this.autenticTheme ? 'autentic' : 'default');
  },

  onPointerDown(e) {
    this.startX = e.clientX;
  },

  onPointerUp(e) {
    const deltaX = e.clientX - this.startX;
    if (deltaX > 80 && !this.drawerOpen) {
      this.drawerOpen = true;
    } else if (deltaX < -80 && this.drawerOpen) {
      this.drawerOpen = false;
    }
  },
};

class PanZoomImage {
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
