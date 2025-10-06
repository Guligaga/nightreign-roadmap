import { effects, maps } from './data/index.js';
import { bosses } from './data/bosses.js';
import { EARTH_SHIFT } from './data/constants.js';
import { toUpperCaseFirst, uniqueByKeys, sortByKeys } from './util/index.js';

console.log('effects:', effects);

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

  onMounted() {
    const savedTheme = localStorage.getItem('theme');
    this.autenticTheme = savedTheme === 'autentic';
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
    console.log('Location selected:', location);
    this.resultMaps = this.filteredMaps.filter(
      (map) =>
        map.nwLocation.type === (location.type || null) &&
        map.nwLocation.effect === (location.effect || null)
    );
    console.log('Resulting Maps:', JSON.parse(JSON.stringify(this.resultMaps)));
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
};
