import { DAMAGE, EFFECTS } from './constants.js';

export const bosses = [
  {
    name: 'Gladius',
    title: 'Tricephalos',
    alias: 'Dog',
    weakness: DAMAGE.HOLY,
    attack: [DAMAGE.FIRE, DAMAGE.MAGIC],
  },
  {
    name: 'Adel',
    title: 'Gapping Jaw',
    alias: 'Hippo',
    weakness: EFFECTS.POISON,
    attack: [DAMAGE.LIGHTNING, DAMAGE.MAGIC],
  },
  {
    name: 'Gnoster',
    title: 'Sentinel Pest',
    alias: 'Butterfly',
    weakness: DAMAGE.FIRE,
    attack: [DAMAGE.MAGIC, EFFECTS.POISON],
  },
  {
    name: 'Maris',
    title: 'Augur',
    alias: '',
    weakness: DAMAGE.LIGHTNING,
    attack: [DAMAGE.MAGIC, EFFECTS.SLEEP],
  },
  {
    name: 'Libra',
    title: 'Equilibrious Beast',
    alias: 'Goat',
    weakness: EFFECTS.MADNESS,
    attack: [DAMAGE.HOLY, EFFECTS.MADNESS],
  },
  {
    name: 'Fulghor',
    title: 'Darkdrift Knight',
    alias: 'Centaur',
    weakness: DAMAGE.LIGHTNING,
    attack: [DAMAGE.HOLY],
  },
  {
    name: 'Caligo',
    title: 'Fissure in the Fog',
    alias: 'Dragon',
    weakness: DAMAGE.FIRE,
    attack: [DAMAGE.MAGIC, EFFECTS.FROSTBITE],
  },
  {
    name: 'Heolstor',
    title: 'Night Aspect',
    alias: '',
    weakness: DAMAGE.HOLY,
    attack: [DAMAGE.MAGIC],
  },
];
