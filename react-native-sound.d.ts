// react-native-sound.d.ts
declare module 'react-native-sound' {
  export default class Sound {
    constructor(
      filename: string,
      basePath: string | null,
      onLoad?: (error: Error | null) => void
    );

    play(onEnd?: (success: boolean) => void): void;
    stop(callback?: () => void): void;
    release(): void;
    pause(): void;
    setNumberOfLoops(loops: number): void;
    getDuration(): number;

    // Instance methods
    static setCategory(category: string, mixWithOthers?: boolean): void;
  }
}
