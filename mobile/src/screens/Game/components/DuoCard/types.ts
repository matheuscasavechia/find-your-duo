export interface IDuoCardPros {
  id: string;
  name: string;
  weekDays: string[];
  yearsPlaying: number;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  onConnect: () => void;
}
