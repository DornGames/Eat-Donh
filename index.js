// 游戏变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameMessage = document.getElementById('gameMessage');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');
const restartBtn = document.getElementById('restartBtn');
// 按键元素
const keyW = document.getElementById('keyW');
const keyA = document.getElementById('keyA');
const keyS = document.getElementById('keyS');
const keyD = document.getElementById('keyD');
// 游戏状态
let score = 0;
let lives = 3;
let gameOver = false;
let gameWin = false;
let gameRunning = true;
// 玩家设置
const player = {
    x: 400,
    y: 250,
    radius: 15,
    speed: 3,
    direction: { x: 0, y: 0 },
    mouthAngle: 0.2,
    mouthSpeed: 0.05,
    mouthOpen: true,
    powerUp: false,
    powerUpTimer: 0
};
// 湩子数组
const dots = [];
const powerDots = [];
// 小怪数组
const ghosts = [];
const ghostColors = ['#FF5555', '#55FF55', '#5555FF', '#FF55FF'];
// 按键状态
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};
// 初始化游戏
function initGame() {
    // 重置游戏状态
    score = 0;
    lives = 3;
    gameOver = false;
    gameWin = false;
    gameRunning = true;
    // 重置玩家
    player.x = 400;
    player.y = 250;
    player.direction = { x: 0, y: 0 };
    player.powerUp = false;
    player.powerUpTimer = 0;
    // 清空数组
    dots.length = 0;
    powerDots.length = 0;
    ghosts.length = 0;
    // 创建湩子
    createDots();
    // 创建小怪
    createGhosts();
    // 隐藏游戏消息
    gameMessage.style.display = 'none';
    // 更新UI
    updateUI();
}
// 创建湩子
function createDots() {
    // 创建普通湩子
    for (let i = 0; i < 50; i++) {
        // 确保湩子不会生成在玩家起始位置附近
        let dotX, dotY;
        let validPosition = false;
        while (!validPosition) {
            dotX = Math.random() * (canvas.width - 40) + 20;
            dotY = Math.random() * (canvas.height - 40) + 20;
            // 检查是否离玩家太近
            const distToPlayer = Math.sqrt((dotX - player.x) ** 2 + (dotY - player.y) ** 2);
            if (distToPlayer > 50) {
                validPosition = true;
            }
        }
        dots.push({
            x: dotX,
            y: dotY,
            radius: 7,
            collected: false
        });
    }
    // 创建大湩子
    for (let i = 0; i < 4; i++) {
        const corners = [
            { x: 50, y: 50 },
            { x: canvas.width - 50, y: 50 },
            { x: 50, y: canvas.height - 50 },
            { x: canvas.width - 50, y: canvas.height - 50 }
        ];
        powerDots.push({
            x: corners[i].x,
            y: corners[i].y,
            radius: 10,
            collected: false
        });
    }
}
// 创建小怪
function createGhosts() {
    for (let i = 0; i < 4; i++) {
        const startPositions = [
            { x: 100, y: 100 },
            { x: canvas.width - 100, y: 100 },
            { x: 100, y: canvas.height - 100 },
            { x: canvas.width - 100, y: canvas.height - 100 }
        ];
        ghosts.push({
            x: startPositions[i].x,
            y: startPositions[i].y,
            radius: 18,
            speed: 1.5 + Math.random() * 0.5,
            direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
            color: ghostColors[i],
            scared: false,
            scaredTimer: 0
        });
    }
}
// 更新UI
function updateUI() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}
// 绘制玩家
function drawPlayer() {
    ctx.save();
    // 根据能量湩状态设置颜色
    if (player.powerUp) {
        ctx.fillStyle = '#00FFFF';
        ctx.strokeStyle = '#00FFFF';
    } else {
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#FFD700';
    }
    // 计算嘴巴开合角度
    player.mouthAngle += player.mouthSpeed * (player.mouthOpen ? 1 : -1);
    if (player.mouthAngle > 0.6 || player.mouthAngle < 0.1) {
        player.mouthOpen = !player.mouthOpen;
    }
    // 绘制吃湩人身体
    ctx.beginPath();
    // 计算方向角度
    let angle = 0;
    if (player.direction.x !== 0 || player.direction.y !== 0) {
        angle = Math.atan2(player.direction.y, player.direction.x);
    }
    // 绘制吃湩人形状（带嘴巴）
    ctx.arc(player.x, player.y, player.radius, angle + player.mouthAngle, angle + (2 * Math.PI) - player.mouthAngle);
    ctx.lineTo(player.x, player.y);
    ctx.fill();
    ctx.restore();
}
// 绘制湩子
function drawDots() {
    // 绘制普通湩子
    ctx.fillStyle = '#FFD700';
    dots.forEach(dot => {
        if (!dot.collected) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.arc(dot.x - 7, dot.y, dot.radius * 0.6, 0, Math.PI * 2);
            ctx.arc(dot.x + 7, dot.y, dot.radius * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    // 绘制能量湩
    ctx.fillStyle = '#AA00FF';
    powerDots.forEach(dot => {
        if (!dot.collected) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fill();
            // 添加发光效果
            ctx.shadowColor = '#AA00FF';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    });
}
// 绘制小怪
function drawGhosts() {
    ghosts.forEach(ghost => {
        ctx.save();
        // 如果玩家有能量湩，小怪变成蓝色
        if (player.powerUp) {
            ctx.fillStyle = ghost.scared ? '#0000FF' : '#6666FF';
        } else {
            ctx.fillStyle = ghost.color;
        }
        // 绘制小怪身体
        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y, ghost.radius, Math.PI, 0, false);
        ctx.lineTo(ghost.x + ghost.radius, ghost.y + ghost.radius * 0.7);
        // 绘制小怪的波浪底部
        const waveCount = 4;
        const waveWidth = (ghost.radius * 2) / waveCount;
        for (let i = 0; i < waveCount; i++) {
            const startX = ghost.x - ghost.radius + i * waveWidth;
            const midX = startX + waveWidth / 2;
            const endX = startX + waveWidth;
            ctx.quadraticCurveTo(
                midX,
                ghost.y + ghost.radius * 0.7 + (i % 2 === 0 ? ghost.radius * 0.3 : 0),
                endX,
                ghost.y + ghost.radius * 0.7
            );
        }
        ctx.fill();
        // 绘制眼睛
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ghost.x - ghost.radius * 0.3, ghost.y - ghost.radius * 0.2, ghost.radius * 0.4, 0, Math.PI * 2);
        ctx.arc(ghost.x + ghost.radius * 0.3, ghost.y - ghost.radius * 0.2, ghost.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        // 绘制瞳孔
        ctx.fillStyle = '#0000AA';
        ctx.beginPath();
        ctx.arc(
            ghost.x - ghost.radius * 0.3 + ghost.direction.x * ghost.radius * 0.2,
            ghost.y - ghost.radius * 0.2 + ghost.direction.y * ghost.radius * 0.2,
            ghost.radius * 0.2, 0, Math.PI * 2
        );
        ctx.arc(
            ghost.x + ghost.radius * 0.3 + ghost.direction.x * ghost.radius * 0.2,
            ghost.y - ghost.radius * 0.2 + ghost.direction.y * ghost.radius * 0.2,
            ghost.radius * 0.2, 0, Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
    });
}
// 更新玩家位置
function updatePlayer() {
    // 根据按键更新方向
    if (keys.w && !keys.s) {
        player.direction.y = -1;
    } else if (keys.s && !keys.w) {
        player.direction.y = 1;
    } else if (!keys.w && !keys.s) {
        player.direction.y = 0;
    }
    if (keys.a && !keys.d) {
        player.direction.x = -1;
    } else if (keys.d && !keys.a) {
        player.direction.x = 1;
    } else if (!keys.a && !keys.d) {
        player.direction.x = 0;
    }
    // 标准化方向向量（防止斜向移动更快）
    const magnitude = Math.sqrt(player.direction.x ** 2 + player.direction.y ** 2);
    if (magnitude > 0) {
        player.direction.x /= magnitude;
        player.direction.y /= magnitude;
    }
    // 更新位置（如果玩家有能量湩则加速）
    const currentSpeed = player.powerUp ? player.speed * 1.5 : player.speed;
    player.x += player.direction.x * currentSpeed;
    player.y += player.direction.y * currentSpeed;
    // 边界检查
    if (player.x - player.radius < 0) player.x = player.radius;
    if (player.x + player.radius > canvas.width) player.x = canvas.width - player.radius;
    if (player.y - player.radius < 0) player.y = player.radius;
    if (player.y + player.radius > canvas.height) player.y = canvas.height - player.radius;
    // 更新能量湩计时器
    if (player.powerUp) {
        player.powerUpTimer--;
        if (player.powerUpTimer <= 0) {
            player.powerUp = false;
        }
    }
}
// 更新小怪位置
function updateGhosts() {
    ghosts.forEach(ghost => {
        // 更新位置
        ghost.x += ghost.direction.x * ghost.speed;
        ghost.y += ghost.direction.y * ghost.speed;
        // 边界检查并反弹
        if (ghost.x - ghost.radius < 0 || ghost.x + ghost.radius > canvas.width) {
            ghost.direction.x *= -1;
            ghost.x = Math.max(ghost.radius, Math.min(canvas.width - ghost.radius, ghost.x));
        }
        if (ghost.y - ghost.radius < 0 || ghost.y + ghost.radius > canvas.height) {
            ghost.direction.y *= -1;
            ghost.y = Math.max(ghost.radius, Math.min(canvas.height - ghost.radius, ghost.y));
        }
        // 随机改变方向
        if (Math.random() < 0.01) {
            ghost.direction.x = Math.random() * 2 - 1;
            ghost.direction.y = Math.random() * 2 - 1;
            // 标准化方向
            const magnitude = Math.sqrt(ghost.direction.x ** 2 + ghost.direction.y ** 2);
            if (magnitude > 0) {
                ghost.direction.x /= magnitude;
                ghost.direction.y /= magnitude;
            }
        }
        // 如果玩家有能量湩，小怪会逃跑
        if (player.powerUp && !ghost.scared) {
            ghost.scared = true;
            ghost.scaredTimer = 300; // 300帧 = 5秒（假设60fps）
        }
        // 更新害怕计时器
        if (ghost.scared) {
            ghost.scaredTimer--;
            if (ghost.scaredTimer <= 0) {
                ghost.scared = false;
            }
            // 害怕时小怪会逃离玩家
            if (Math.random() < 0.05) {
                const dx = ghost.x - player.x;
                const dy = ghost.y - player.y;
                const distance = Math.sqrt(dx ** 2 + dy ** 2);
                if (distance > 0) {
                    ghost.direction.x = dx / distance;
                    ghost.direction.y = dy / distance;
                }
            }
        }
        // 检查与玩家的碰撞
        if (!gameOver) {
            const dx = ghost.x - player.x;
            const dy = ghost.y - player.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            if (distance < ghost.radius + player.radius) {
                // 如果玩家有能量湩，可以吃掉小怪
                if (player.powerUp) {
                    // 重置小怪位置
                    ghost.x = Math.random() * (canvas.width - 100) + 50;
                    ghost.y = Math.random() * (canvas.height - 100) + 50;
                    score += 100;
                    updateUI();
                } else {
                    // 玩家失去一条生命
                    lives--;
                    updateUI();
                    // 重置玩家位置
                    player.x = 400;
                    player.y = 250;
                    player.direction = { x: 0, y: 0 };
                    // 检查游戏是否结束
                    if (lives <= 0) {
                        gameOver = true;
                        showGameOver();
                    }
                }
            }
        }
    });
}
// 检查湩子收集
function checkDotCollection() {
    // 检查普通湩子
    dots.forEach(dot => {
        if (!dot.collected) {
            const dx = dot.x - player.x;
            const dy = dot.y - player.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            if (distance < player.radius + dot.radius) {
                dot.collected = true;
                score += 10;
                updateUI();
            }
        }
    });
    // 检查能量湩
    powerDots.forEach(dot => {
        if (!dot.collected) {
            const dx = dot.x - player.x;
            const dy = dot.y - player.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            if (distance < player.radius + dot.radius) {
                dot.collected = true;
                score += 50;
                player.powerUp = true;
                player.powerUpTimer = 300; // 300帧 = 5秒
                updateUI();
            }
        }
    });
    // 检查是否所有湩子都被收集
    const allDotsCollected = dots.every(dot => dot.collected) && powerDots.every(dot => dot.collected);
    if (allDotsCollected && !gameWin) {
        gameWin = true;
        showGameWin();
    }
}
// 显示游戏结束消息
function showGameOver() {
    gameRunning = false;
    messageTitle.textContent = "游戏结束";
    messageText.textContent = `你的最终得分是: ${score}`;
    gameMessage.style.display = 'block';
}
// 显示游戏胜利消息
function showGameWin() {
    gameRunning = false;
    messageTitle.textContent = "恭喜你赢了！";
    messageText.textContent = `你成功收集了所有湩子！得分: ${score}`;
    gameMessage.style.display = 'block';
}
// 更新按键高亮
function updateKeyHighlights() {
    keyW.classList.toggle('active', keys.w);
    keyA.classList.toggle('active', keys.a);
    keyS.classList.toggle('active', keys.s);
    keyD.classList.toggle('active', keys.d);
}
// 游戏主循环
function gameLoop() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 绘制网格背景
    drawGrid();
    if (gameRunning) {
        // 更新游戏状态
        updatePlayer();
        updateGhosts();
        checkDotCollection();

        // 更新按键高亮
        updateKeyHighlights();
    }
    // 绘制游戏元素
    drawDots();
    drawGhosts();
    drawPlayer();
    // 继续游戏循环
    requestAnimationFrame(gameLoop);
}
// 绘制网格背景
function drawGrid() {
    ctx.strokeStyle = 'rgba(100, 100, 150, 0.1)';
    ctx.lineWidth = 1;
    // 垂直线
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    // 水平线
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}
// 键盘事件监听
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') {
        keys.w = true;
    } else if (key === 'a' || key === 'arrowleft') {
        keys.a = true;
    } else if (key === 's' || key === 'arrowdown') {
        keys.s = true;
    } else if (key === 'd' || key === 'arrowright') {
        keys.d = true;
    }
    // 如果游戏结束，按空格键重新开始
    if ((gameOver || gameWin) && key === ' ') {
        initGame();
    }
});
window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') {
        keys.w = false;
    } else if (key === 'a' || key === 'arrowleft') {
        keys.a = false;
    } else if (key === 's' || key === 'arrowdown') {
        keys.s = false;
    } else if (key === 'd' || key === 'arrowright') {
        keys.d = false;
    }
});
// 重新开始按钮事件
restartBtn.addEventListener('click', () => {
    initGame();
});
// 触摸设备支持：添加按钮控制
function addTouchControls() {
    // 为WASD键添加触摸事件
    const touchKeys = [keyW, keyA, keyS, keyD];
    touchKeys.forEach(key => {
        const keyName = key.id.replace('key', '').toLowerCase();
        key.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keys[keyName] = true;
        });
        key.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys[keyName] = false;
        });
        key.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            keys[keyName] = false;
        });
    });
}
// 初始化游戏并开始循环
initGame();
addTouchControls();
gameLoop();