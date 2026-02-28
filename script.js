/* NutriFlow v4 - 2026-02-28 */

/* ── MEALS DATA ────────────────────────────────────────────── */
const meals = [
    { emoji: '🥣', bg: '#1a1500', name: 'Overnight Oats', desc: 'Rolled oats with chia seeds, almond milk, and mixed berries for a fiber-packed start.', time: 'breakfast', kcal: 380, protein: 14, carbs: 62, fat: 9 },
    { emoji: '🍳', bg: '#1a1000', name: 'Veggie Egg Scramble', desc: 'Whole eggs with spinach, bell peppers, and feta cheese — high protein, low carb.', time: 'breakfast', kcal: 310, protein: 22, carbs: 10, fat: 20 },
    { emoji: '🥑', bg: '#0d1a0d', name: 'Avocado Toast', desc: 'Sourdough topped with smashed avocado, poached egg, and chilli flakes.', time: 'breakfast', kcal: 420, protein: 18, carbs: 44, fat: 21 },
    { emoji: '🍗', bg: '#0d1200', name: 'Grilled Chicken Bowl', desc: 'Juicy grilled chicken over brown rice with steamed broccoli and teriyaki glaze.', time: 'lunch', kcal: 520, protein: 42, carbs: 55, fat: 11 },
    { emoji: '🥗', bg: '#0a1a10', name: 'Salmon Power Salad', desc: 'Baked salmon on mixed greens with quinoa, cucumber, and lemon vinaigrette.', time: 'lunch', kcal: 480, protein: 34, carbs: 22, fat: 28 },
    { emoji: '🍜', bg: '#0a0f1a', name: 'Veggie Noodle Soup', desc: 'Rice noodles in a light miso broth with bok choy, mushrooms, and tofu.', time: 'dinner', kcal: 340, protein: 18, carbs: 52, fat: 7 },
    { emoji: '🥩', bg: '#1a0d0d', name: 'Grilled Salmon & Veg', desc: 'Pan-seared salmon fillet with roasted asparagus and cherry tomatoes.', time: 'dinner', kcal: 460, protein: 38, carbs: 12, fat: 28 },
    { emoji: '🍎', bg: '#1a0d10', name: 'Apple & Almond Snack', desc: 'Sliced apple with a tablespoon of almond butter — natural sugars and healthy fats.', time: 'snack', kcal: 190, protein: 4, carbs: 24, fat: 10 },
    { emoji: '🧀', bg: '#1a1500', name: 'Cottage Cheese Bowl', desc: 'Low-fat cottage cheese topped with pineapple chunks and a drizzle of honey.', time: 'snack', kcal: 160, protein: 18, carbs: 14, fat: 3 }
];

/* ── MEAL CARDS ─────────────────────────────────────────────── */
const mealsGrid = document.getElementById('mealsGrid');

function renderMeals(filter) {
    filter = filter || 'all';
    mealsGrid.innerHTML = '';
    meals.filter(function (m) {
        return filter === 'all' || m.time === filter;
    }).forEach(function (m) {
        var card = document.createElement('div');
        card.className = 'meal-card';
        card.innerHTML =
            '<div class="meal-emoji-wrap" style="background:' + m.bg + '">' +
            '<span style="font-size:3.5rem">' + m.emoji + '</span>' +
            '</div>' +
            '<div class="meal-body">' +
            '<span class="meal-time tag-' + m.time + '">' + m.time + '</span>' +
            '<h3>' + m.name + '</h3>' +
            '<p>' + m.desc + '</p>' +
            '<div class="meal-macros">' +
            '<div class="meal-macro"><span class="meal-macro-val">' + m.kcal + '</span><span class="meal-macro-label">kcal</span></div>' +
            '<div class="meal-macro"><span class="meal-macro-val" style="color:#3dffa0">' + m.protein + 'g</span><span class="meal-macro-label">protein</span></div>' +
            '<div class="meal-macro"><span class="meal-macro-val" style="color:#00d4ff">' + m.carbs + 'g</span><span class="meal-macro-label">carbs</span></div>' +
            '<div class="meal-macro"><span class="meal-macro-val" style="color:#ffc300">' + m.fat + 'g</span><span class="meal-macro-label">fat</span></div>' +
            '</div>' +
            '</div>';
        mealsGrid.appendChild(card);
    });
}
renderMeals('all');

document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderMeals(btn.dataset.filter);
    });
});

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
// Fallback: force all animated elements visible after 800ms
setTimeout(function () {
    document.querySelectorAll('[data-anim]').forEach(function (el) {
        el.classList.add('visible');
    });
}, 800);

// IntersectionObserver for smooth reveal
if ('IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                animObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0 });
    document.querySelectorAll('[data-anim]').forEach(function (el) {
        animObserver.observe(el);
    });
}

/* ── HAMBURGER MENU ─────────────────────────────────────────── */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
    });
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}

/* ── BACK TO TOP ────────────────────────────────────────────── */
var backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

/* ── CALORIE CALCULATOR ─────────────────────────────────────── */
var calcGender = 'male';
var calcGoal = 'maintain';

document.querySelectorAll('.gender-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.gender-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        calcGender = btn.dataset.gender;
    });
});

document.querySelectorAll('.goal-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.goal-tab').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        calcGoal = btn.dataset.goal;
    });
});

var calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
    calcBtn.addEventListener('click', function () {
        var age = parseFloat(document.getElementById('calcAge').value);
        var weight = parseFloat(document.getElementById('calcWeight').value);
        var height = parseFloat(document.getElementById('calcHeight').value);
        var activity = parseFloat(document.getElementById('calcActivity').value);
        if (!age || !weight || !height) return;

        var bmr = calcGender === 'male'
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;

        var tdee = Math.round(bmr * activity);
        if (calcGoal === 'lose') tdee -= 500;
        if (calcGoal === 'gain') tdee += 300;

        var protein = Math.round(tdee * 0.30 / 4);
        var carbs = Math.round(tdee * 0.50 / 4);
        var fat = Math.round(tdee * 0.20 / 9);

        var calcResult = document.getElementById('calcResult');
        if (calcResult) {
            calcResult.innerHTML =
                '<div class="result-content">' +
                '<div class="result-calories">' +
                '<div class="result-cal-num">' + tdee.toLocaleString() + '</div>' +
                '<div class="result-cal-label">calories / day</div>' +
                '</div>' +
                '<div class="result-macros">' +
                '<div class="result-macro-row"><span class="result-macro-name">Protein</span><div class="result-bar"><div class="result-bar-fill rb-protein" style="width:30%"></div></div><span class="result-macro-grams">' + protein + 'g</span></div>' +
                '<div class="result-macro-row"><span class="result-macro-name">Carbs</span><div class="result-bar"><div class="result-bar-fill rb-carbs" style="width:50%"></div></div><span class="result-macro-grams">' + carbs + 'g</span></div>' +
                '<div class="result-macro-row"><span class="result-macro-name">Fats</span><div class="result-bar"><div class="result-bar-fill rb-fat" style="width:20%"></div></div><span class="result-macro-grams">' + fat + 'g</span></div>' +
                '</div>' +
                '<p class="result-note">Based on your ' + (calcGoal === 'maintain' ? 'maintenance' : calcGoal === 'lose' ? 'weight loss' : 'muscle gain') + ' goal.</p>' +
                '</div>';
        }
        var ringKcal = document.getElementById('ringKcal');
        if (ringKcal) ringKcal.textContent = tdee.toLocaleString();
    });
}

/* ── MODAL & FILE UPLOAD ────────────────────────────────────── */
var dropZone = document.getElementById('dropZone');
var fileInput = document.getElementById('fileInput');
var dropPreview = document.getElementById('dropPreview');
var analyseBtn = document.getElementById('analyseBtn');
var aiResult = document.getElementById('aiResult');
var aiResultBody = document.getElementById('aiResultBody');
var analyseSpinner = document.getElementById('analyseSpinner');
var analyseBtnText = document.getElementById('analyseBtnText');
var uploadModal = document.getElementById('uploadModal');

var selectedFile = null;

function resetModal() {
    selectedFile = null;
    if (fileInput) fileInput.value = '';
    if (dropPreview) { dropPreview.src = ''; dropPreview.style.display = 'none'; }
    var dropInner = document.getElementById('dropInner');
    if (dropInner) dropInner.style.display = '';
    if (analyseBtn) analyseBtn.disabled = true;
    if (analyseSpinner) analyseSpinner.hidden = true;
    if (analyseBtnText) analyseBtnText.textContent = 'Analyse Nutrition \u2192';
    if (aiResult) aiResult.hidden = true;
    if (aiResultBody) aiResultBody.innerHTML = '';
}

function openModal() {
    resetModal();
    if (uploadModal) uploadModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (uploadModal) uploadModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(resetModal, 300);
}

var openBtn = document.getElementById('openUploadModal');
if (openBtn) openBtn.addEventListener('click', openModal);

var closeBtn = document.getElementById('closeModal');
if (closeBtn) closeBtn.addEventListener('click', closeModal);

if (uploadModal) {
    uploadModal.addEventListener('click', function (e) {
        if (e.target === uploadModal) closeModal();
    });
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && uploadModal && uploadModal.classList.contains('open')) closeModal();
});

/* ── FILE HANDLING ──────────────────────────────────────────── */
var browseBtn = document.getElementById('browseBtn');
if (browseBtn && fileInput) browseBtn.addEventListener('click', function () { fileInput.click(); });
if (fileInput) fileInput.addEventListener('change', function (e) { handleFile(e.target.files[0]); });

if (dropZone) {
    dropZone.addEventListener('dragover', function (e) { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', function () { dropZone.classList.remove('drag-over'); });
    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFile(e.dataTransfer.files[0]);
    });
}

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    selectedFile = file;
    var reader = new FileReader();
    reader.onload = function (e) {
        if (dropPreview) { dropPreview.src = e.target.result; dropPreview.style.display = 'block'; }
        var dropInner = document.getElementById('dropInner');
        if (dropInner) dropInner.style.display = 'none';
        if (analyseBtn) analyseBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

/* ── IMAGE COMPRESSION ──────────────────────────────────────── */
function compressImage(file, maxPx, quality) {
    maxPx = maxPx || 600;
    quality = quality || 0.65;
    return new Promise(function (resolve) {
        var img = new Image();
        var url = URL.createObjectURL(file);
        img.onload = function () {
            var w = img.width, h = img.height;
            if (w > maxPx || h > maxPx) {
                if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
                else { w = Math.round(w * maxPx / h); h = maxPx; }
            }
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = url;
    });
}

/* ── AI ANALYSIS ────────────────────────────────────────────── */
if (analyseBtn) {
    analyseBtn.addEventListener('click', async function () {
        if (!selectedFile) return;
        try {
            analyseBtn.disabled = true;
            if (analyseSpinner) analyseSpinner.hidden = false;
            if (analyseBtnText) analyseBtnText.textContent = 'Analysing...';

            var dataUrl = await compressImage(selectedFile, 600, 0.65);
            var base64 = dataUrl.split(',')[1];

            var prompt = 'You are a nutrition expert. Analyse this food image and respond ONLY with a valid JSON object — no extra text, no markdown fences.\n\nFormat:\n{\n  "dish": "Dish Name or Unknown",\n  "confidence": "high",\n  "ingredients": ["ingredient1","ingredient2","ingredient3"],\n  "calories": "X-Y kcal",\n  "protein": "Xg",\n  "carbs": "Xg",\n  "fats": "Xg"\n}\n\nIf unsure, set confidence to "low". Keep ingredients to 4-5 max. Be concise.';

            var resp = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt, image_base64: 'data:image/jpeg;base64,' + base64 })
            });

            if (!resp.ok) {
                var errData = await resp.json();
                throw new Error(errData.error || 'Server error ' + resp.status);
            }

            var data = await resp.json();
            var text = data.text;
            if (!text) throw new Error('No response received. Please try again.');

            var parsed;
            try {
                var cleaned = text.replace(/```json|```/g, '').trim();
                parsed = JSON.parse(cleaned);
            } catch (e) {
                if (aiResultBody) aiResultBody.innerHTML = '<div class="ai-text">' + text.replace(/\n/g, '<br>') + '</div>';
                if (aiResult) { aiResult.hidden = false; aiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
                return;
            }

            var chips = (parsed.ingredients || []).map(function (i) {
                return '<span class="ai-chip">' + i + '</span>';
            }).join('');

            var badge = parsed.confidence === 'low'
                ? '<span class="ai-badge ai-badge-warn">⚠️ Estimated</span>'
                : '<span class="ai-badge ai-badge-ok">✓ Identified</span>';

            if (aiResultBody) {
                aiResultBody.innerHTML =
                    '<div class="ai-dish-row"><span class="ai-dish-name">' + (parsed.dish || 'Unknown Dish') + '</span>' + badge + '</div>' +
                    (chips ? '<div class="ai-chips">' + chips + '</div>' : '') +
                    '<div class="ai-macros-grid">' +
                    '<div class="ai-macro-box"><span class="ai-macro-val">' + (parsed.calories || '—') + '</span><span class="ai-macro-lbl">Calories</span></div>' +
                    '<div class="ai-macro-box"><span class="ai-macro-val" style="color:#3dffa0">' + (parsed.protein || '—') + '</span><span class="ai-macro-lbl">Protein</span></div>' +
                    '<div class="ai-macro-box"><span class="ai-macro-val" style="color:#00d4ff">' + (parsed.carbs || '—') + '</span><span class="ai-macro-lbl">Carbs</span></div>' +
                    '<div class="ai-macro-box"><span class="ai-macro-val" style="color:#ffc300">' + (parsed.fats || '—') + '</span><span class="ai-macro-lbl">Fats</span></div>' +
                    '</div>';
            }
            if (aiResult) { aiResult.hidden = false; aiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

        } catch (err) {
            if (aiResultBody) aiResultBody.innerHTML = '<p style="color:#ff6b6b">⚠️ ' + err.message + '</p>';
            if (aiResult) aiResult.hidden = false;
        } finally {
            if (analyseBtn) analyseBtn.disabled = false;
            if (analyseSpinner) analyseSpinner.hidden = true;
            if (analyseBtnText) analyseBtnText.textContent = 'Analyse Nutrition →';
        }
    });
}
