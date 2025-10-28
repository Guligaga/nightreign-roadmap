export class VoiceInput {
  constructor(dictionary) {
    this.dictionary = dictionary || [];
    this.initRecognition();
  }

  dictionary = [];
  transcript = '';
  listening = false;
  recognition = null;
  onStart = () => {};
  onEnd = () => {};
  onResult = () => {};

  initRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new SpeechRecognition();
    } else {
      alert('Speech recognition not supported in this browser.');
    }

    if (this.recognition) {
      this.recognition.lang = navigator.language || 'en-US';

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
    }
  }

  toggle() {
    if (!this.recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    if (this.listening) {
      this.recognition.stop();
      this.onEnd();
      this.listening = false;
    } else {
      this.recognition.start();
      this.onStart();
      this.listening = true;
    }

    this.recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      this.transcript = text;

      const matches = [];
      if (this.dictionary.length) {
        let dictionary = this.dictionary;
        const words = text
          .toLowerCase()
          .split(' ')
          .filter((w) => w.length > 2);

        for (const word of words) {
          const match = dictionary.find((entry) =>
            entry.translations.some(
              (t) =>
                t.toLowerCase().includes(this.sliceWord(word.toLowerCase())) ||
                word.toLowerCase().includes(this.sliceWord(t.toLowerCase()))
            )
          );

          if (match) {
            dictionary = dictionary.filter(
              (entry) => !entry.key.startsWith(match.key.split('.')[0])
            );
            matches.push({ word, key: match.key, translations: [...match.translations] });
          }
        }
      }
      this.onResult({ transcript: text, matches });
    };

    this.recognition.onend = () => {
      this.listening = false;
    };
  }

  sliceWord(word, maxLength = 5, sliceLength = 2) {
    return word.length > maxLength ? word.slice(0, -sliceLength) : word;
  }
}
