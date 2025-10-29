import { effects, maps, TRANSLATIONS } from './data/index.js';
import { bosses } from './data/bosses.js';
import { EARTH_SHIFT } from './data/constants.js';
import { toUpperCaseFirst, uniqueByKeys, sortByKeys } from './util/index.js';
import { VoiceInput } from './voice-input/voiceInput.js';

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

  voiceInput: new VoiceInput(TRANSLATIONS),
  voiceListening: false,
  voiceRecognitionResult: null,
  displayingTranscript: '',
  showTranscript: false,

  onMounted() {
    const savedTheme = localStorage.getItem('theme');
    this.autenticTheme = savedTheme === 'autentic';

    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= BREAKPOINTS.lg;
      this.drawerOpen = !this.isDesktop;
    });

    this.initVoiceInput();
  },

  filterMaps() {
    document.documentElement.setAttribute('data-theme', this.autenticTheme ? 'autentic' : 'light');
    this.showResult = false;
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

  // Slider
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

  // Voice Input
  initVoiceInput() {
    let voiceRecognitionResult = null;

    this.voiceInput.onStart = () => {
      this.voiceRecognitionResult = null;
      this.displayingTranscript = '';
    };

    this.voiceInput.onResult = (result) => {
      if (!this.voiceListening) return;

      voiceRecognitionResult = result;
      this.displayingTranscript = this.voiceInput.transcript;
      this.showTranscript = true;
    };

    this.voiceInput.onEnd = () => {
      this.voiceRecognitionResult = voiceRecognitionResult;
      this.showTranscript = false;
      setTimeout(() => {
        this.displayingTranscript = '';
      }, 100);

      if (this.voiceRecognitionResult) {
        let result = this.maps;
        const location = { type: null, effect: null };
        this.voiceRecognitionResult.matches.forEach((match) => {
          const [category, key] = match.key.split('.');
          switch (category) {
            case 'bosses':
              result = result.filter((map) => map.boss === key);
              this.selectedBoss = this.bosses.find((b) => b.name === key);
              this.filterMaps();
              break;
            case 'earthShifts':
              result = result.filter((map) => map.earthShift === key);
              this.selectedEarthShift = this.earthShifts.find((es) => es.key === key);
              this.filterMaps();
              break;
            case 'locations':
              location.type = key;
              break;
            case 'effects':
              const effect = key === 'none' ? null : key;
              location.effect = effect;
              break;
          }
        });
        if (location.type) {
          this.setResultMaps(location);
        }
      }
    };
  },

  toggleListening() {
    this.voiceInput.toggle();
    this.voiceListening = this.voiceInput.listening;
  },

  vibrate(pattern = 50) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  },
};
