export class SpeechService {
  private synthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;
  private volume: number = 1;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    
    // Select a British English voice if available
    const voices = this.synthesis.getVoices();
    const britishVoice = voices.find(voice => voice.lang === 'en-GB');
    if (britishVoice) {
      this.utterance.voice = britishVoice;
    }
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      this.utterance.text = text;
      this.utterance.volume = this.volume;
      
      this.utterance.onend = () => {
        resolve();
      };

      this.synthesis.speak(this.utterance);
    });
  }

  setVolume(volume: number) {
    this.volume = volume;
    this.utterance.volume = volume;
  }

  stop() {
    this.synthesis.cancel();
  }
}