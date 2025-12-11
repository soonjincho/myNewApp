// 게임 메인 로직
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = 1;
        this.snake = null;
        this.maze = null;
        this.foodManager = null;
        this.audioManager = new AudioManager();
        this.scoreManager = new ScoreManager();
        this.bgMusic = new BackgroundMusic();
        this.gameLoop = null;
        this.lastUpdate = 0;
        this.isPaused = false;
        this.gameState = 'start'; // start, playing, levelComplete, gameOver, gameComplete
        
        this.setupCanvas();
        this.setupEventListeners();
        // 초기 레벨 선택값으로 순위표 표시
        const initialLevel = parseInt(document.getElementById('start-level').value) || 1;
        this.scoreManager.displayLeaderboard(initialLevel);
    }

    setupCanvas() {
        const container = document.getElementById('game-container');
        // 게임장 크기를 줄여서 화면에 맞춤
        const maxWidth = Math.min(600, window.innerWidth - 40);
        const cellSize = Math.floor(maxWidth / 20);
        const canvasSize = cellSize * 20;
        
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
        this.cellSize = cellSize;
    }

    setupEventListeners() {
        // 시작 버튼
        document.getElementById('start-button').addEventListener('click', () => {
            const playerName = document.getElementById('player-name').value.trim();
            if (!playerName) {
                alert('플레이어 이름을 입력해주세요!');
                return;
            }
            this.startGame(playerName);
        });

        // 다음 레벨 버튼
        document.getElementById('next-level-button').addEventListener('click', () => {
            this.nextLevel();
        });

        // 다시 시작 버튼
        document.getElementById('restart-button').addEventListener('click', () => {
            this.restartGame();
        });

        // 메뉴로 돌아가기 버튼
        document.getElementById('back-to-menu-button').addEventListener('click', () => {
            this.backToMenu();
        });

        // 게임 완료 화면 버튼들
        document.getElementById('complete-restart-button').addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('complete-menu-button').addEventListener('click', () => {
            this.backToMenu();
        });

        // 키보드 입력
        document.addEventListener('keydown', (e) => {
            // 일시정지/재개 (Space 또는 P 키)
            if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
                if (this.gameState === 'playing' || this.gameState === 'paused') {
                    e.preventDefault();
                    this.togglePause();
                    return;
                }
            }
            
            if (this.gameState !== 'playing') return;
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.snake.changeDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.snake.changeDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.snake.changeDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.snake.changeDirection({ x: 1, y: 0 });
                    break;
            }
        });

        // Enter 키로 이름 입력
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('start-button').click();
            }
        });

        // 시작 레벨 선택 시 해당 레벨 순위표 표시
        document.getElementById('start-level').addEventListener('change', (e) => {
            const selectedLevel = parseInt(e.target.value) || 1;
            this.scoreManager.displayLeaderboard(selectedLevel);
        });
    }

    async startGame(playerName) {
        this.scoreManager.setPlayerName(playerName);
        this.scoreManager.resetScore();
        
        // 선택한 시작 레벨 가져오기
        const startLevelSelect = document.getElementById('start-level');
        this.currentLevel = parseInt(startLevelSelect.value) || 1;
        
        this.gameState = 'playing';
        this.showScreen('game-screen');
        document.getElementById('current-player').textContent = playerName;
        
        // 배경 음악 시작 (사용자 상호작용 후이므로 재생 가능)
        try {
            await this.bgMusic.init();
            await this.bgMusic.playMelody();
        } catch (e) {
            console.log('Background music failed:', e);
        }
        
        // 음성 테스트 - 게임 시작 알림
        try {
            this.audioManager.speak('Game Start!');
        } catch (e) {
            console.log('Audio test failed:', e);
        }
        
        this.initLevel();
    }

    initLevel() {
        const levelData = LEVELS[this.currentLevel - 1];
        
        // 미로 초기화
        this.maze = new Maze(levelData);
        this.maze.setCellSize(this.cellSize);
        
        // 뱀 초기화 (입구 위치)
        const entrance = this.maze.getEntrance();
        this.snake = new Snake(entrance.x, entrance.y);
        
        // 먹이 관리자 초기화
        this.foodManager = new FoodManager(this.maze.getGrid(), levelData);
        
        // UI 업데이트
        document.getElementById('current-level').textContent = this.currentLevel;
        document.getElementById('foods-eaten').textContent = '0';
        
        // 게임 루프 시작
        this.lastUpdate = performance.now();
        this.startGameLoop(levelData.speed);
    }

    startGameLoop(speed) {
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
        }
        
        const gameStep = (timestamp) => {
            // 일시정지 상태면 루프 중단
            if (this.gameState === 'paused') return;
            if (this.gameState !== 'playing') return;
            
            if (timestamp - this.lastUpdate >= speed) {
                this.update();
                this.lastUpdate = timestamp;
            }
            
            this.draw();
            this.gameLoop = requestAnimationFrame(gameStep);
        };
        
        this.gameLoop = requestAnimationFrame(gameStep);
    }

    update() {
        // 뱀 이동
        this.snake.move();
        
        // 이동 거리 증가
        this.scoreManager.addDistance();
        
        const head = this.snake.getHead();
        
        // 벽 충돌 확인
        if (this.maze.isWall(head.x, head.y)) {
            this.gameOver();
            return;
        }
        
        // 자신의 몸에 부딪힘 확인
        if (this.snake.checkSelfCollision()) {
            this.gameOver();
            return;
        }
        
        // 먹이 충돌 확인
        const collision = this.foodManager.checkCollision(head.x, head.y);
        if (collision.found) {
            // 뱀 성장
            this.snake.grow();
            console.log('Snake grew! Current length:', this.snake.getLength(), 'Grow pending:', this.snake.growPending);
            
            this.scoreManager.addScore(collision.score);
            
            // 효과음 재생
            try {
                this.audioManager.playEatSound();
            } catch (e) {
                console.log('Eat sound error:', e);
            }
            
            // 스펠링 화면에 표시
            this.showSpelling(collision.food.name);
            
            // 음성 재생 시도 (단어 2번)
            try {
                this.audioManager.pronounceWord(collision.food.name, 2);
            } catch (e) {
                console.log('Audio error:', e);
            }
            
            document.getElementById('foods-eaten').textContent = this.foodManager.foodsEaten;
        }
        
        // 출구 도달 확인
        if (this.maze.isExit(head.x, head.y)) {
            // 모든 먹이를 먹었는지 확인
            if (this.foodManager.getAllEaten()) {
                this.completeLevel();
            }
        }
    }

    draw() {
        // 화면 지우기
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 미로 그리기
        this.maze.draw(this.ctx, this.cellSize);
        
        // 먹이 그리기
        this.foodManager.draw(this.ctx, this.cellSize);
        
        // 뱀 그리기
        this.snake.draw(this.ctx, this.cellSize);
        
        // 일시정지 오버레이
        if (this.gameState === 'paused') {
            this.drawPauseOverlay();
        }
    }

    drawPauseOverlay() {
        // 반투명 배경
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 일시정지 텍스트
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('일시정지', this.canvas.width / 2, this.canvas.height / 2 - 30);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Space 또는 P 키를 눌러 재개', this.canvas.width / 2, this.canvas.height / 2 + 30);
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.bgMusic.stop();
            this.draw(); // 일시정지 오버레이 표시
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.bgMusic.playMelody();
            this.lastUpdate = performance.now();
            const levelData = LEVELS[this.currentLevel - 1];
            this.startGameLoop(levelData.speed);
        }
    }

    completeLevel() {
        this.gameState = 'levelComplete';
        cancelAnimationFrame(this.gameLoop);
        this.bgMusic.stop();
        
        console.log('Level completed! Current level:', this.currentLevel, 'Total levels:', LEVELS.length);
        
        if (this.currentLevel >= LEVELS.length) {
            // 모든 레벨 완료 (레벨 10 완료)
            this.completeGame();
        } else {
            // 다음 레벨로 진행
            // 레벨 완료 화면 업데이트
            document.getElementById('completed-level').textContent = this.currentLevel;
            document.getElementById('next-level-num').textContent = this.currentLevel + 1;
            this.showScreen('level-complete-screen');
            
            // 레벨 완료 축하 음성
            try {
                this.audioManager.speak('Level ' + this.currentLevel + ' Complete!');
            } catch (e) {}
        }
    }

    nextLevel() {
        this.currentLevel++;
        console.log('Starting next level:', this.currentLevel);
        this.gameState = 'playing';
        this.showScreen('game-screen');
        
        // 배경 음악 재시작
        try {
            this.bgMusic.playMelody();
        } catch (e) {}
        
        this.initLevel();
    }

    completeGame() {
        this.gameState = 'gameComplete';
        this.bgMusic.stop();
        this.scoreManager.saveScore(this.currentLevel);
        document.getElementById('complete-final-score').textContent = this.scoreManager.getCurrentScore();
        document.getElementById('complete-final-distance').textContent = this.scoreManager.getCurrentDistance();
        this.showScreen('game-complete-screen');
    }

    gameOver() {
        this.gameState = 'gameOver';
        cancelAnimationFrame(this.gameLoop);
        this.audioManager.stop();
        this.bgMusic.stop();
        this.scoreManager.saveScore(this.currentLevel);
        
        // 마지막 게임 화면을 유지하면서 게임오버 오버레이 표시
        document.getElementById('final-score').textContent = this.scoreManager.getCurrentScore();
        document.getElementById('final-distance').textContent = this.scoreManager.getCurrentDistance();
        document.getElementById('game-over-screen').classList.remove('hidden');
        document.getElementById('game-over-screen').classList.add('overlay');
    }

    restartGame() {
        const playerName = this.scoreManager.currentPlayer;
        this.scoreManager.resetScore();
        this.currentLevel = 1;
        this.startGame(playerName);
    }

    backToMenu() {
        this.gameState = 'start';
        cancelAnimationFrame(this.gameLoop);
        this.audioManager.stop();
        this.bgMusic.stop();
        // 선택된 레벨의 순위표 표시
        const selectedLevel = parseInt(document.getElementById('start-level').value) || 1;
        this.scoreManager.displayLeaderboard(selectedLevel);
        this.showScreen('start-screen');
        document.getElementById('player-name').value = '';
    }

    showScreen(screenId) {
        const screens = ['start-screen', 'game-screen', 'level-complete-screen', 'game-over-screen', 'game-complete-screen'];
        screens.forEach(id => {
            const screen = document.getElementById(id);
            if (id === screenId) {
                screen.classList.remove('hidden');
            } else {
                screen.classList.add('hidden');
            }
        });
    }

    // 스펠링 화면에 표시
    showSpelling(word) {
        const spellingDisplay = document.getElementById('spelling-display');
        const spellingText = document.getElementById('spelling-text');
        
        spellingText.textContent = word;
        spellingDisplay.classList.remove('hidden');
        
        // 2초 후 사라짐
        setTimeout(() => {
            spellingDisplay.style.animation = 'spellingFade 0.5s ease-out forwards';
            setTimeout(() => {
                spellingDisplay.classList.add('hidden');
                spellingDisplay.style.animation = 'spellingPop 0.3s ease-out';
            }, 500);
        }, 2000);
    }
}

// 게임 시작
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});

