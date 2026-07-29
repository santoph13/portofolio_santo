// 1. GLOW CURSOR LOGIC
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
    outline.style.transform = `translate(${posX}px, ${posY}px)`;
});

document.querySelectorAll('.interactive-hover, a, button, .cert-img-container').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
});

// 2. HERO TYPING EFFECT LOGIC
const words = ["Santo Parningotan Hutapea", "Full-Stack Web Developer", "Full-Stack Data Analyst"];
let i = 0, timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.querySelector('.typed-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 70);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.querySelector('.typed-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) { i++; } else { i = 0; }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 40);
    };
    loopDeleting();
}
typingEffect();

// 3. THEME SWITCHER
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

// 4. SQL PLAYGROUND LOGIC
const queries = {
    revenue: {
        sql: "SELECT DATE_TRUNC('month', order_date) AS month,\n       SUM(amount) AS total_revenue\nFROM transactions\nGROUP BY 1 ORDER BY 1 DESC;",
        output: "Status: 200 OK | Rendered 2 Rows\n+------------+---------------+ \n| Month      | Total Revenue | \n+------------+---------------+ \n| 2026-03-01 | $42,500.00    | \n| 2026-02-01 | $38,120.00    | \n+------------+---------------+ "
    },
    churn: {
        sql: "SELECT user_id, DATEDIFF(day, max(last_login), CURRENT_DATE) as inactive_days\nFROM user_logs\nHAVING inactive_days > 30;",
        output: "Status: 200 OK | Rendered 2 Rows\n+---------+---------------+ \n| User_ID | Inactive_Days | \n+---------+---------------+ \n| USR_102 | 45 Days       | \n| USR_884 | 32 Days       | \n+---------+---------------+ "
    },
    inventory: {
        sql: "SELECT product_name, stock_quantity, reorder_level\nFROM inventory\nWHERE stock_quantity <= reorder_level;",
        output: "Status: Warning Threshold Triggered\n+--------------------+-------+---------+ \n| Product            | Stock | Reorder | \n+--------------------+-------+---------+ \n| Coil Mesh 0.2 Ohm  | 4     | 10      | \n+--------------------+-------+---------+ "
    }
};

function runQuery(type, evt) {
    document.querySelectorAll('.sql-btn').forEach(btn => btn.classList.remove('active'));
    if(evt && evt.target) {
        evt.target.classList.add('active');
    }
    document.getElementById('sqlDisplay').innerText = queries[type].sql;
    document.getElementById('sqlOutput').innerText = queries[type].output;
}
runQuery('revenue', null);

// 5. LIGHTBOX MODAL FUNCTIONALITY
function openModal(container) {
    const img = container.querySelector('img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = 'flex';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}
