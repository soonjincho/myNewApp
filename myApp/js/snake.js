// 뱀 클래스
class Snake {
    constructor(startX, startY) {
        this.body = [{ x: startX, y: startY }];
        this.direction = { x: 1, y: 0 }; // 오른쪽으로 시작
        this.nextDirection = { x: 1, y: 0 };
        this.growPending = 0;
        this.foodsEaten = 0; // 먹은 먹이 수 (몸통 크기 증가용)
    }

    // 방향 변경
    changeDirection(newDirection) {
        // 반대 방향으로는 갈 수 없음
        if (newDirection.x === -this.direction.x && newDirection.y === -this.direction.y) {
            return;
        }
        this.nextDirection = newDirection;
    }

    // 이동
    move() {
        this.direction = { ...this.nextDirection };
        const head = { ...this.body[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        this.body.unshift(head);
        
        if (this.growPending > 0) {
            this.growPending--;
        } else {
            this.body.pop();
        }
    }

    // 성장
    grow() {
        this.growPending++;
        this.foodsEaten++; // 먹은 먹이 수 증가
    }

    // 머리 위치 반환
    getHead() {
        return { ...this.body[0] };
    }

    // 자신의 몸에 부딪혔는지 확인
    checkSelfCollision() {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    // 뱀 그리기
    draw(ctx, cellSize) {
        const radius = cellSize * 0.4;
        const centerX = cellSize / 2;
        const centerY = cellSize / 2;
        
        this.body.forEach((segment, index) => {
            const pixelX = segment.x * cellSize + centerX;
            const pixelY = segment.y * cellSize + centerY;
            
            if (index === 0) {
                // 머리 - 더 크고 눈이 있는 원형
                const headRadius = radius * 1.1;
                
                // 머리 그림자 효과
                ctx.beginPath();
                ctx.arc(pixelX + 1, pixelY + 1, headRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fill();
                
                // 머리 본체
                ctx.beginPath();
                ctx.arc(pixelX, pixelY, headRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#4ade80';
                ctx.fill();
                ctx.strokeStyle = '#22c55e';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // 눈 그리기
                const eyeRadius = cellSize * 0.08;
                const eyeDistance = cellSize * 0.15;
                
                ctx.fillStyle = '#000';
                if (this.direction.x === 1) { // 오른쪽
                    ctx.beginPath();
                    ctx.arc(pixelX + eyeDistance, pixelY - eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(pixelX + eyeDistance, pixelY + eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                } else if (this.direction.x === -1) { // 왼쪽
                    ctx.beginPath();
                    ctx.arc(pixelX - eyeDistance, pixelY - eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(pixelX - eyeDistance, pixelY + eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                } else if (this.direction.y === -1) { // 위
                    ctx.beginPath();
                    ctx.arc(pixelX - eyeDistance, pixelY - eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(pixelX + eyeDistance, pixelY - eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                } else if (this.direction.y === 1) { // 아래
                    ctx.beginPath();
                    ctx.arc(pixelX - eyeDistance, pixelY + eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(pixelX + eyeDistance, pixelY + eyeDistance, eyeRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // 몸통 - 원형, 먹이를 먹을수록 커짐 (머리 제외)
                // 기본 크기 + 먹은 먹이 수에 따라 크기 증가 (최대 1.5배)
                const sizeBonus = Math.min(this.foodsEaten * 0.02, 0.5); // 최대 50% 증가
                const baseRadius = radius * (1 + sizeBonus);
                const bodyRadius = baseRadius * (1 - index * 0.01); // 꼬리로 갈수록 조금씩 작아짐
                const actualRadius = Math.max(bodyRadius, baseRadius * 0.8);
                
                // 몸통 그림자
                ctx.beginPath();
                ctx.arc(pixelX + 1, pixelY + 1, actualRadius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
                ctx.fill();
                
                // 몸통 본체
                ctx.beginPath();
                ctx.arc(pixelX, pixelY, actualRadius, 0, Math.PI * 2);
                ctx.fillStyle = index % 2 === 0 ? '#86efac' : '#7dd87d'; // 교대로 색상 변경
                ctx.fill();
                ctx.strokeStyle = '#4ade80';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        });
    }

    getLength() {
        return this.body.length;
    }
}

