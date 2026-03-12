// 香蕉世界 - 交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加滚动动画
    setupScrollAnimation();
    
    // 导航栏高亮当前部分
    setupNavbarHighlight();
    
    // 添加卡片悬停效果增强
    setupCardEffects();
    
    // 添加香蕉表情雨效果（彩蛋）
    setupEasterEgg();
});

// 滚动动画
function setupScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// 导航栏高亮
function setupNavbarHighlight() {
    const sections = document.querySelectorAll('main .card[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.background = '';
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.background = 'var(--primary-yellow)';
                        link.style.color = 'var(--brown)';
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 卡片效果增强
function setupCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // 添加鼠标移动视差效果
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// 彩蛋：双击英雄区域出现香蕉雨
function setupEasterEgg() {
    const hero = document.querySelector('.hero');
    let clickCount = 0;
    let clickTimer = null;
    
    hero.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 300);
        } else if (clickCount === 2) {
            clearTimeout(clickTimer);
            clickCount = 0;
            createBananaRain();
        }
    });
}

// 香蕉雨效果
function createBananaRain() {
    const emojis = ['🍌', '🌴', '🥥', '🍍'];
    const duration = 3000;
    const interval = 100;
    
    let startTime = Date.now();
    
    const rainInterval = setInterval(() => {
        if (Date.now() - startTime > duration) {
            clearInterval(rainInterval);
            return;
        }
        
        createBanana(emojis[Math.floor(Math.random() * emojis.length)]);
    }, interval);
}

function createBanana(emoji) {
    const banana = document.createElement('div');
    banana.textContent = emoji;
    banana.style.position = 'fixed';
    banana.style.left = Math.random() * 100 + 'vw';
    banana.style.top = '-50px';
    banana.style.fontSize = (Math.random() * 30 + 20) + 'px';
    banana.style.zIndex = '9999';
    banana.style.pointerEvents = 'none';
    banana.style.animation = 'fall 3s linear forwards';
    
    document.body.appendChild(banana);
    
    setTimeout(() => {
        banana.remove();
    }, 3000);
}

// 添加香蕉雨动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 控制台彩蛋
console.log('%c🍌 欢迎来到香蕉的世界！', 'font-size: 20px; color: #FFE135; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c💡 小贴士：双击页面顶部的香蕉图片，会有惊喜哦！', 'font-size: 14px; color: #4CAF50;');

// 添加平滑滚动到顶部功能
let backToTopButton = null;

function createBackToTopButton() {
    if (backToTopButton) return;
    
    backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '⬆️';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.border = 'none';
    backToTopButton.style.background = 'linear-gradient(135deg, #FFE135 0%, #FFD700 100%)';
    backToTopButton.style.fontSize = '24px';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.boxShadow = '0 4px 15px rgba(255, 225, 53, 0.4)';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'all 0.3s ease';
    backToTopButton.style.display = 'none';
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);
}

// 显示/隐藏回到顶部按钮
window.addEventListener('scroll', () => {
    if (!backToTopButton) createBackToTopButton();
    
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.display = 'block';
        backToTopButton.style.transform = 'translateY(0)';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (window.scrollY <= 500) {
                backToTopButton.style.display = 'none';
            }
        }, 300);
    }
});

// 添加页面访问统计（本地存储）
function updateVisitCount() {
    const visits = localStorage.getItem('bananaVisits') || 0;
    const newVisits = parseInt(visits) + 1;
    localStorage.setItem('bananaVisits', newVisits);
    
    if (newVisits === 10) {
        showSpecialMessage('🎉 哇！你已经访问了 10 次香蕉世界！真是个香蕉爱好者！');
    } else if (newVisits === 50) {
        showSpecialMessage('🏆 50 次访问！你绝对是香蕉专家了！');
    } else if (newVisits === 100) {
        showSpecialMessage('👑 100 次访问！香蕉之王非你莫属！🍌');
    }
}

function showSpecialMessage(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.background = 'linear-gradient(135deg, #FFE135 0%, #FFD700 100%)';
    notification.style.color = '#8B4513';
    notification.style.padding = '2rem 3rem';
    notification.style.borderRadius = '20px';
    notification.style.fontSize = '1.5rem';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 10px 40px rgba(255, 225, 53, 0.5)';
    notification.style.zIndex = '10000';
    notification.style.textAlign = 'center';
    notification.style.animation = 'popIn 0.5s ease-out';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// 添加 popIn 动画
const popInStyle = document.createElement('style');
popInStyle.textContent = `
    @keyframes popIn {
        from {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(popInStyle);

// 页面加载时更新访问计数
updateVisitCount();

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // 按 'H' 键回到顶部
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 按 'B' 键触发香蕉雨
    if (e.key === 'b' || e.key === 'B') {
        createBananaRain();
    }
});

// 在控制台显示快捷键提示
console.log('%c⌨️ 快捷键：H - 回到顶部 | B - 香蕉雨', 'font-size: 12px; color: #666;');
