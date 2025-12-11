// 점수 및 순위 관리
class ScoreManager {
    constructor() {
        this.currentScore = 0;
        this.currentDistance = 0; // 이동 거리 추적
        this.currentPlayer = '';
        this.leaderboard = this.loadLeaderboard();
    }

    setPlayerName(name) {
        this.currentPlayer = name || 'Anonymous';
    }

    addScore(points) {
        this.currentScore += points;
        this.updateScoreDisplay();
    }

    addDistance() {
        this.currentDistance++;
        this.updateDistanceDisplay();
    }

    updateScoreDisplay() {
        const scoreElement = document.getElementById('current-score');
        if (scoreElement) {
            scoreElement.textContent = this.currentScore;
        }
    }

    updateDistanceDisplay() {
        const distanceElement = document.getElementById('current-distance');
        if (distanceElement) {
            distanceElement.textContent = this.currentDistance;
        }
    }

    getCurrentScore() {
        return this.currentScore;
    }

    getCurrentDistance() {
        return this.currentDistance;
    }

    resetScore() {
        this.currentScore = 0;
        this.currentDistance = 0;
        this.updateScoreDisplay();
        this.updateDistanceDisplay();
    }

    // 레벨별로 점수 저장
    saveScore(level) {
        if (this.currentPlayer && this.currentScore > 0 && this.currentDistance > 0) {
            const efficiency = this.currentScore / this.currentDistance; // 효율 = 점수 / 이동거리
            
            const entry = {
                name: this.currentPlayer,
                level: level,
                score: this.currentScore,
                distance: this.currentDistance,
                efficiency: efficiency,
                date: new Date().toISOString()
            };
            
            this.leaderboard.push(entry);
            
            // 효율 기준으로 정렬 (높은 순)
            this.leaderboard.sort((a, b) => b.efficiency - a.efficiency);
            
            // 레벨당 상위 5개씩만 유지
            const groupedByLevel = {};
            for (const e of this.leaderboard) {
                if (!groupedByLevel[e.level]) {
                    groupedByLevel[e.level] = [];
                }
                if (groupedByLevel[e.level].length < 5) {
                    groupedByLevel[e.level].push(e);
                }
            }
            
            // 다시 합치기
            this.leaderboard = [];
            for (let l = 1; l <= 10; l++) {
                if (groupedByLevel[l]) {
                    this.leaderboard.push(...groupedByLevel[l]);
                }
            }
            
            localStorage.setItem('snakeBiteLeaderboard', JSON.stringify(this.leaderboard));
        }
    }

    loadLeaderboard() {
        const stored = localStorage.getItem('snakeBiteLeaderboard');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    displayLeaderboard(selectedLevel = 1) {
        const leaderboardList = document.getElementById('leaderboard-list');
        if (!leaderboardList) return;

        // 선택된 레벨의 기록만 필터링
        const levelEntries = this.leaderboard.filter(entry => (entry.level || 1) === selectedLevel);

        if (levelEntries.length === 0) {
            leaderboardList.innerHTML = `
                <div class="level-leaderboard">
                    <div class="level-header">레벨 ${selectedLevel} 순위</div>
                    <div class="level-entries">
                        <p style="text-align: center; color: #aaa; padding: 20px;">아직 기록이 없습니다.</p>
                    </div>
                </div>
            `;
            return;
        }

        // 효율 기준으로 정렬
        levelEntries.sort((a, b) => b.efficiency - a.efficiency);

        // HTML 생성
        let html = `
            <div class="level-leaderboard">
                <div class="level-header">레벨 ${selectedLevel} 순위</div>
                <div class="level-entries">
        `;
        
        levelEntries.slice(0, 10).forEach((entry, index) => {
            const date = new Date(entry.date);
            const dateStr = date.toLocaleDateString('ko-KR');
            const efficiency = entry.efficiency ? entry.efficiency.toFixed(2) : '0.00';
            
            html += `
                <div class="leaderboard-item">
                    <div class="rank-name">
                        <span class="leaderboard-rank">${index + 1}위</span>
                        <span class="player-name">${entry.name}</span>
                    </div>
                    <div class="score-details">
                        <span class="score-value">점수: ${entry.score}</span>
                        <span class="distance-value">이동: ${entry.distance || 0}</span>
                        <span class="efficiency-value">효율: ${efficiency}</span>
                    </div>
                    <div class="date-value">${dateStr}</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;

        leaderboardList.innerHTML = html;
    }
}

