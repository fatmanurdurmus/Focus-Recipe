//Bir Focus Recipe nesnesi oluşturulacaksa, bu özelliklere sahip olmalı:
export interface FocusRecipe {
  id: string;
  title: string;
  description: string;
  duration: number; // dakika
  completed: boolean;
  remainingSeconds: number; // geri sayım: saniye
  isRunning: boolean; // şu an çalışıyor mu?

}
