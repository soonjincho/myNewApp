// 미로 시스템
class Maze {
    constructor(levelData) {
        this.grid = JSON.parse(JSON.stringify(levelData.maze)); // 깊은 복사
        this.cellSize = 0;
        
        // 입구와 출구를 랜덤 위치에 배치
        this.setupRandomEntranceExit();
    }

    // 입구와 출구 설정 (입구: 왼쪽 상단 고정, 출구: 랜덤)
    setupRandomEntranceExit() {
        // 입구는 왼쪽 상단 코너에 고정 (x=1, y=1)
        this.entrance = { x: 1, y: 1 };
        
        // 출구는 랜덤 위치 (입구와 멀리)
        const edges = this.getEdgePositions();
        
        // 입구 위치 제외
        const availableExits = edges.filter(pos => !(pos.x === 1 && pos.y === 1));
        
        // 입구와 가장 먼 위치를 출구로 선택
        let maxDist = 0;
        let exitPos = availableExits[0];
        for (let i = 0; i < availableExits.length; i++) {
            const dist = Math.abs(availableExits[i].x - this.entrance.x) + Math.abs(availableExits[i].y - this.entrance.y);
            if (dist > maxDist) {
                maxDist = dist;
                exitPos = availableExits[i];
            }
        }
        this.exit = exitPos;
        
        // 그리드에 입구(3)와 출구(2) 표시
        this.grid[this.entrance.y][this.entrance.x] = 3; // 입구
        this.grid[this.exit.y][this.exit.x] = 2; // 출구
    }

    // 가장자리 빈 공간 찾기
    getEdgePositions() {
        const positions = [];
        const height = this.grid.length;
        const width = this.grid[0].length;
        
        // 상단 가장자리 (y=1)
        for (let x = 1; x < width - 1; x++) {
            if (this.grid[1][x] === 0) {
                positions.push({ x, y: 1 });
            }
        }
        // 하단 가장자리 (y=height-2)
        for (let x = 1; x < width - 1; x++) {
            if (this.grid[height - 2][x] === 0) {
                positions.push({ x, y: height - 2 });
            }
        }
        // 좌측 가장자리 (x=1)
        for (let y = 1; y < height - 1; y++) {
            if (this.grid[y][1] === 0) {
                positions.push({ x: 1, y });
            }
        }
        // 우측 가장자리 (x=width-2)
        for (let y = 1; y < height - 1; y++) {
            if (this.grid[y][width - 2] === 0) {
                positions.push({ x: width - 2, y });
            }
        }
        
        return positions;
    }

    setCellSize(cellSize) {
        this.cellSize = cellSize;
    }

    // 그리드에서 벽인지 확인
    isWall(x, y) {
        if (x < 0 || y < 0 || x >= this.grid[0].length || y >= this.grid.length) {
            return true;
        }
        return this.grid[y][x] === 1;
    }

    // 출구인지 확인
    isExit(x, y) {
        return this.grid[y] && this.grid[y][x] === 2;
    }

    // 입구 위치 반환
    getEntrance() {
        return { ...this.entrance };
    }

    // 출구 위치 반환
    getExit() {
        return { ...this.exit };
    }

    // 미로 그리기
    draw(ctx, cellSize) {
        this.cellSize = cellSize;
        
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                const pixelX = x * cellSize;
                const pixelY = y * cellSize;
                
                if (this.grid[y][x] === 1) {
                    // 벽 그리기 (적갈색 + 점박이 무늬)
                    ctx.fillStyle = '#8B4513'; // 적갈색 (SaddleBrown)
                    ctx.fillRect(pixelX, pixelY, cellSize, cellSize);
                    
                    // 점박이 무늬 추가
                    ctx.fillStyle = '#A0522D'; // 밝은 적갈색 점
                    const dotSize = cellSize * 0.15;
                    // 랜덤하게 보이지만 일관된 패턴을 위해 위치 기반 시드 사용
                    const seed = (x * 7 + y * 13) % 5;
                    if (seed === 0 || seed === 2) {
                        ctx.beginPath();
                        ctx.arc(pixelX + cellSize * 0.25, pixelY + cellSize * 0.25, dotSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    if (seed === 1 || seed === 3) {
                        ctx.beginPath();
                        ctx.arc(pixelX + cellSize * 0.75, pixelY + cellSize * 0.75, dotSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    if (seed === 2 || seed === 4) {
                        ctx.beginPath();
                        ctx.arc(pixelX + cellSize * 0.7, pixelY + cellSize * 0.3, dotSize * 0.8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    if (seed === 0 || seed === 4) {
                        ctx.beginPath();
                        ctx.arc(pixelX + cellSize * 0.3, pixelY + cellSize * 0.7, dotSize * 0.8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    // 테두리
                    ctx.strokeStyle = '#5D3A1A'; // 어두운 적갈색 테두리
                    ctx.lineWidth = 1;
                    ctx.strokeRect(pixelX, pixelY, cellSize, cellSize);
                } else if (this.grid[y][x] === 2) {
                    // 출구 그리기 (열린 문 모양)
                    this.drawOpenDoor(ctx, pixelX, pixelY, cellSize, 'exit');
                } else if (this.grid[y][x] === 3) {
                    // 입구 그리기 (열린 문 모양)
                    this.drawOpenDoor(ctx, pixelX, pixelY, cellSize, 'entrance');
                } else {
                    // 빈 공간
                    ctx.fillStyle = '#1a1a2e';
                    ctx.fillRect(pixelX, pixelY, cellSize, cellSize);
                }
            }
        }
    }

    // 열린 문 그리기
    drawOpenDoor(ctx, pixelX, pixelY, cellSize, type) {
        const isEntrance = type === 'entrance';
        const color = isEntrance ? '#00ffff' : '#00ff00';
        const bgColor = isEntrance ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 255, 0, 0.2)';
        const label = isEntrance ? 'Entrance' : 'Exit';
        
        // 배경
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(pixelX, pixelY, cellSize, cellSize);
        
        // 열린 문 효과 (그라데이션)
        const gradient = ctx.createRadialGradient(
            pixelX + cellSize / 2, pixelY + cellSize / 2, 0,
            pixelX + cellSize / 2, pixelY + cellSize / 2, cellSize / 2
        );
        gradient.addColorStop(0, bgColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(pixelX, pixelY, cellSize, cellSize);
        
        // 문 프레임 (열린 모양 - 아치형)
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pixelX + cellSize / 2, pixelY + cellSize, cellSize * 0.4, Math.PI, 0, false);
        ctx.stroke();
        
        // 좌우 문틀
        ctx.beginPath();
        ctx.moveTo(pixelX + cellSize * 0.1, pixelY + cellSize);
        ctx.lineTo(pixelX + cellSize * 0.1, pixelY + cellSize * 0.4);
        ctx.moveTo(pixelX + cellSize * 0.9, pixelY + cellSize);
        ctx.lineTo(pixelX + cellSize * 0.9, pixelY + cellSize * 0.4);
        ctx.stroke();
        
        // 라벨 텍스트
        ctx.fillStyle = color;
        ctx.font = `bold ${cellSize * 0.22}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, pixelX + cellSize / 2, pixelY + cellSize * 0.25);
    }

    getGrid() {
        return this.grid;
    }
}

