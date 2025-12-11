// 배경 음악 생성 (저작권 없는 음악)
class BackgroundMusic {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.volume = 0.12;
        this.timeoutId = null;
    }

    async init() {
        try {
            // AudioContext 생성
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                console.log('AudioContext not supported');
                return false;
            }
            
            this.audioContext = new AudioContextClass();
            console.log('AudioContext created, state:', this.audioContext.state);
            
            // suspended 상태면 resume (사용자 상호작용 후에 호출되어야 함)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
                console.log('AudioContext resumed, state:', this.audioContext.state);
            }
            
            return true;
        } catch (e) {
            console.log('AudioContext init error:', e);
            return false;
        }
    }

    // 간단한 멜로디 생성
    async playMelody() {
        // 이미 재생 중이면 리턴
        if (this.isPlaying) return;
        
        // AudioContext 초기화
        if (!this.audioContext) {
            const success = await this.init();
            if (!success) return;
        }
        
        // suspended 상태면 resume
        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (e) {
                console.log('Failed to resume:', e);
                return;
            }
        }
        
        this.isPlaying = true;
        console.log('Background music started');
        
        // 멜로디 음계 (C Major + 부드러운 멜로디)
        const melody = [
            { note: 261.63, duration: 0.4 }, // C4
            { note: 293.66, duration: 0.4 }, // D4
            { note: 329.63, duration: 0.4 }, // E4
            { note: 349.23, duration: 0.4 }, // F4
            { note: 392.00, duration: 0.4 }, // G4
            { note: 440.00, duration: 0.4 }, // A4
            { note: 392.00, duration: 0.4 }, // G4
            { note: 349.23, duration: 0.4 }, // F4
            { note: 329.63, duration: 0.4 }, // E4
            { note: 293.66, duration: 0.4 }, // D4
            { note: 261.63, duration: 0.6 }, // C4
            { note: 0, duration: 0.5 },      // 쉼표
        ];
        
        let noteIndex = 0;
        
        const playNote = () => {
            if (!this.isPlaying || !this.audioContext) return;
            
            const { note, duration } = melody[noteIndex % melody.length];
            
            if (note > 0) {
                try {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.value = note;
                    
                    const now = this.audioContext.currentTime;
                    gainNode.gain.setValueAtTime(0, now);
                    gainNode.gain.linearRampToValueAtTime(this.volume, now + 0.05);
                    gainNode.gain.linearRampToValueAtTime(this.volume * 0.6, now + duration * 0.7);
                    gainNode.gain.linearRampToValueAtTime(0, now + duration);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.start(now);
                    oscillator.stop(now + duration);
                } catch (e) {
                    console.log('Note play error:', e);
                }
            }
            
            noteIndex++;
            
            // 다음 음 재생
            this.timeoutId = setTimeout(playNote, duration * 1000);
        };
        
        playNote();
    }

    stop() {
        console.log('Background music stopped');
        this.isPlaying = false;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        
        // AudioContext 정리
        if (this.audioContext && this.audioContext.state !== 'closed') {
            try {
                this.audioContext.close();
            } catch (e) {}
            this.audioContext = null;
        }
    }
}
