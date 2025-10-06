import { EFFECTS, DAMAGE } from './constants.js';

export const effects = [
  { type: EFFECTS.POISON, icon: 'poison.png', name: 'Poison' },
  { type: EFFECTS.ROT, icon: 'scarlet-rot.png', name: 'Scarlet rot' },
  { type: EFFECTS.BLOOD, icon: 'blood-loss.png', name: 'Blood loss' },
  { type: EFFECTS.FROSTBITE, icon: 'frostbite.png', name: 'Frostbite' },
  { type: EFFECTS.SLEEP, icon: 'sleep.png', name: 'Sleep' },
  { type: EFFECTS.MADNESS, icon: 'madness.png', name: 'Madness' },
  { type: EFFECTS.DEATH, icon: 'death-blight.png', name: 'Death blight' },
  { type: DAMAGE.FIRE, icon: 'fire-damage.png', name: 'Fire' },
  { type: DAMAGE.LIGHTNING, icon: 'lightning-damage.png', name: 'Lightning' },
  { type: DAMAGE.HOLY, icon: 'holy-damage.png', name: 'Holy' },
  { type: DAMAGE.MAGIC, icon: 'magic-damage.png', name: 'Magic' },
];
