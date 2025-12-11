// 음성 재생 관리
class AudioManager {
    constructor() {
        this.compliments = ['great', 'excellent', 'terrific', 'wonderful', 'amazing', 'fantastic', 'awesome', 'brilliant'];
        this.synth = window.speechSynthesis;
        this.speechQueue = [];
        this.isSpeaking = false;
        this.voices = [];
        this.voiceLoaded = false;
        
        // 음성 로드 (비동기)
        this.loadVoices();
        
        // Chrome 버그 해결: 음성 목록이 늦게 로드되는 경우 대응
        if (this.synth) {
            this.synth.onvoiceschanged = () => {
                this.loadVoices();
            };
        }
    }

    loadVoices() {
        if (this.synth) {
            this.voices = this.synth.getVoices();
            this.voiceLoaded = this.voices.length > 0;
            console.log('Loaded voices:', this.voices.length);
        }
    }

    // 미국 영어 여성 음성 찾기 (10대 소녀 느낌)
    getEnglishVoice() {
        if (!this.voiceLoaded) {
            this.loadVoices();
        }
        
        // 여성 음성 우선 찾기 (Samantha, Karen, Victoria 등은 여성 음성)
        const femaleVoiceNames = ['Samantha', 'Karen', 'Victoria', 'Zira', 'Susan', 'Hazel', 'Female', 'Google US English Female'];
        
        // 1순위: 미국 영어 여성 음성
        let voice = this.voices.find(v => 
            v.lang === 'en-US' && 
            femaleVoiceNames.some(name => v.name.includes(name))
        );
        
        // 2순위: 미국 영어 음성 중 여성으로 추정되는 음성
        if (!voice) {
            voice = this.voices.find(v => 
                v.lang === 'en-US' && 
                (v.name.includes('Female') || v.name.includes('Samantha') || !v.name.includes('Male'))
            );
        }
        
        // 3순위: 아무 미국 영어 음성
        if (!voice) {
            voice = this.voices.find(v => v.lang === 'en-US');
        }
        
        // 4순위: 아무 영어 음성
        if (!voice) {
            voice = this.voices.find(v => v.lang.startsWith('en'));
        }
        
        console.log('Selected voice:', voice ? voice.name : 'default');
        return voice || null;
    }

    // 칭찬 소리 재생
    playCompliment() {
        const compliment = this.compliments[Math.floor(Math.random() * this.compliments.length)];
        this.queueSpeech(compliment);
    }

    // 단어를 2번 발음 (칭찬 소리 없음)
    pronounceWord(word, times = 2) {
        if (!word) {
            console.log('No word provided for pronunciation');
            return;
        }
        
        console.log('Pronouncing word:', word);
        
        // 단어를 지정된 횟수만큼 큐에 추가
        for (let i = 0; i < times; i++) {
            this.queueSpeech(word);
        }
        
        // 즉시 재생 시작
        this.processQueue();
    }

    // 음성을 큐에 추가
    queueSpeech(text) {
        this.speechQueue.push(text);
        console.log('Queued:', text, 'Total queue:', this.speechQueue.length);
    }

    // 큐 처리
    processQueue() {
        if (this.speechQueue.length === 0) {
            this.isSpeaking = false;
            return;
        }

        // Chrome 버그 해결: speaking이 true인데 실제로는 안 하고 있는 경우
        if (this.synth && this.synth.speaking) {
            // 0.5초 후 다시 시도
            setTimeout(() => this.processQueue(), 500);
            return;
        }

        this.isSpeaking = true;
        const text = this.speechQueue.shift();
        this.speak(text);
    }

    // TTS로 발음
    speak(text) {
        if (!this.synth) {
            console.log('SpeechSynthesis not available');
            this.processQueue();
            return;
        }
        
        // Chrome 버그 해결: cancel 후 바로 speak
        this.synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;  // 약간 느리게 (더 선명하게)
        utterance.pitch = 1.3;  // 높은 피치 (10대 소녀 느낌)
        utterance.volume = 1.0;
        
        // 미국 영어 여성 음성 설정
        const englishVoice = this.getEnglishVoice();
        if (englishVoice) {
            utterance.voice = englishVoice;
            console.log('Using voice:', englishVoice.name);
        }
        
        // 이벤트 리스너
        utterance.onstart = () => {
            console.log('Started speaking:', text);
        };
        
        utterance.onend = () => {
            console.log('Finished speaking:', text);
            // 다음 단어 재생
            setTimeout(() => this.processQueue(), 300);
        };
        
        utterance.onerror = (e) => {
            console.log('Speech error:', e.error, 'for:', text);
            // 에러가 나도 다음 단어 재생
            setTimeout(() => this.processQueue(), 300);
        };
        
        try {
            // Chrome 버그 해결: 약간의 딜레이 후 speak
            setTimeout(() => {
                this.synth.speak(utterance);
                console.log('Speaking:', text);
            }, 50);
        } catch (e) {
            console.log('Failed to speak:', e);
            this.processQueue();
        }
    }

    // 모든 음성 중지
    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
        this.speechQueue = [];
        this.isSpeaking = false;
    }

    // 효과음 재생 (먹이 먹을 때)
    playEatSound() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;
            
            const ctx = new AudioContextClass();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);
        } catch (e) {
            console.log('Eat sound error:', e);
        }
    }
}
