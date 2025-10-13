import { effects, maps } from './data/index.js';
import { bosses } from './data/bosses.js';
import { EARTH_SHIFT } from './data/constants.js';
import { toUpperCaseFirst, uniqueByKeys, sortByKeys } from './util/index.js';

console.log('effects:', effects);

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
      if (this.isDesktop) {
        this.drawerOpen = false;
      }
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

  toggleTheme() {
    this.autenticTheme = !this.autenticTheme;
    localStorage.setItem('theme', this.autenticTheme ? 'autentic' : 'default');
  },

  setTheme() {
    document.documentElement.setAttribute('data-theme', this.autenticTheme ? 'dark' : 'light');
    document.addEventListener('keypress', (e) => {
      if (e.key === 't') {
        this.toggleTheme();
      }
    });
  },

  onPointerDown(e) {
    this.startX = e.clientX;
    console.log('Pointer down at', e);
  },

  onPointerUp(e) {
    const deltaX = e.clientX - this.startX;
    console.log('Pointer up at', e, 'deltaX:', deltaX);

    if (deltaX > 80 && !this.drawerOpen) {
      this.drawerOpen = true;
    } else if (deltaX < -80 && this.drawerOpen) {
      this.drawerOpen = false;
    }
  },

  onTouchStart(e) {
    console.log('Touch start at', e);
    // return;
    this.startX = e.touches[0].clientX;
  },

  onTouchEnd(e) {
    console.log('Touch end at', e);
    // return;
    const deltaX = e.changedTouches[0].clientX - this.startX;

    if (deltaX > 80 && !this.drawerOpen) {
      this.drawerOpen = true; // swipe right → open
    } else if (deltaX < -80 && this.drawerOpen) {
      this.drawerOpen = false; // swipe left → close
    }
  },
};
