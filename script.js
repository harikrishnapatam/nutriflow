/* ── MEALS DATA ──────────────────────────────────────────── */
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

/* ── RENDER MEAL CARDS ───────────────────────────────────── */
const mealsGrid = document.getElementById('mealsGrid');

function renderMeals(filter = 'all') {
    mealsGrid.innerHTML = '';
    meals.filter(m => filter === 'all' || m.time === filter).forEach(m => {
        const card = document.createElement('div');
        card.className = 'meal-card';
        card.innerHTML = `
            <div class="meal-emoji-wrap" style="background:${m.bg}">
                <span style="font-size:3.5rem">${m.emoji}</span>
            </div>
            <div class="meal-body">
                <span class="meal-time tag-${m.time}">${m.time}</span>
                <h3>${m.name}</h3>
                <p>${m.desc}</p>
                <div class="meal-macros">
                    <div class="meal-macro"><span class="meal-macro-val">${m.kcal}</span><span class="meal-macro-label">kcal</span></div>
                    <div class="meal-macro"><span class="meal-macro-val" style="color:#3dffa0">${m.protein}g</span><span class="meal-macro-label">protein</span></div>
                    <div class="meal-macro"><span class="meal-macro-val" style="color:#00d4ff">${m.carbs}g</span><span class="meal-macro-label">carbs</span></div>
                    <div class="meal-macro"><span class="meal-macro-val" style="color:#ffc300">${m.fat}g</span><span class="meal-macro-label">fat</span></div>
                </div>
            </div>`;
        mealsGrid.appendChild(card);
    });
}
renderMeals();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMeals(btn.dataset.filter);
    });
});

/* ── MACRO BAR ANIMATIONS ────────────────────────────────── */
const macroObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelector('.fill-protein')?.style.setProperty('width', '30%');
            e.target.querySelector('.fill-carbs')?.style.setProperty('width', '50%');
            e.target.querySelector('.fill-fat')?.style.setProperty('width', '20%');
        }
    });
}, { threshold: 0.3 });
document.querySelector('.macros-grid') && macroObserver.observe(document.querySelector('.macros-grid'));

/* ── RING CHART ANIMATION ────────────────────────────────── */
const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelector('.ring-carbs')?.classList.add('animated');
            e.target.querySelector('.ring-protein')?.classList.add('animated');
            e.target.querySelector('.ring-fat')?.classList.add('animated');
            ringObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.4 });
document.querySelector('.ring-chart-wrap') && ringObserver.observe(document.querySelector('.ring-chart-wrap'));

/* ── SCROLL ANIMATIONS ──────────────────────────────────── */
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); animObserver.unobserve(e.target); } });
}, { threshold: 0 });
document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

// Fallback: show all after 1.5s in case observer misses anything
setTimeout(() => {
    document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('visible'));
}, 1500);

/* ── BACK TO TOP ─────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 400);
});

/* ── HAMBURGER MENU ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Ensure nav doesn't clip the menu
    document.getElementById('navbar').style.overflow = isOpen ? 'visible' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.getElementById('navbar').style.overflow = '';
    });
});

/* ── CALORIE CALCULATOR ──────────────────────────────────── */
let gender = 'male', goal = 'maintain';

document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gender = btn.dataset.gender;
    });
});

document.querySelectorAll('.goal-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.goal-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        goal = btn.dataset.goal;
    });
});

document.getElementById('calcBtn')?.addEventListener('click', () => {
    const age = +document.getElementById('calcAge').value;
    const weight = +document.getElementById('calcWeight').value;
    const height = +document.getElementById('calcHeight').value;
    const activity = +document.getElementById('calcActivity').value;
    if (!age || !weight || !height) return;

    const bmr = gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let tdee = Math.round(bmr * activity);
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 300;

    const protein = Math.round(tdee * 0.30 / 4);
    const carbs = Math.round(tdee * 0.50 / 4);
    const fat = Math.round(tdee * 0.20 / 9);

    document.getElementById('calcResult').innerHTML = `
        <div class="result-content">
            <div class="result-calories">
                <div class="result-cal-num">${tdee.toLocaleString()}</div>
                <div class="result-cal-label">calories / day</div>
            </div>
            <div class="result-macros">
                <div class="result-macro-row">
                    <span class="result-macro-name">Protein</span>
                    <div class="result-bar"><div class="result-bar-fill rb-protein" style="width:30%"></div></div>
                    <span class="result-macro-grams">${protein}g</span>
                </div>
                <div class="result-macro-row">
                    <span class="result-macro-name">Carbs</span>
                    <div class="result-bar"><div class="result-bar-fill rb-carbs" style="width:50%"></div></div>
                    <span class="result-macro-grams">${carbs}g</span>
                </div>
                <div class="result-macro-row">
                    <span class="result-macro-name">Fats</span>
                    <div class="result-bar"><div class="result-bar-fill rb-fat" style="width:20%"></div></div>
                    <span class="result-macro-grams">${fat}g</span>
                </div>
            </div>
            <p class="result-note">Based on your ${goal === 'maintain' ? 'maintenance' : goal === 'lose' ? 'weight loss' : 'muscle gain'} goal.</p>
        </div>`;
    document.getElementById('ringKcal').textContent = tdee.toLocaleString();
});



/* ── UI ELEMENTS ─────────────────────────────────────────── */
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const dropPreview = document.getElementById('dropPreview');
const analyseBtn = document.getElementById('analyseBtn');
const aiResult = document.getElementById('aiResult');
const aiResultBody = document.getElementById('aiResultBody');
const analyseSpinner = document.getElementById('analyseSpinner');
const analyseBtnText = document.getElementById('analyseBtnText');

let selectedFile = null;

/* ── IMAGE COMPRESSION ───────────────────────────────────── */
function compressImage(file, maxPx = 900, quality = 0.75) {
    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            let { width, height } = img;
            // Scale down if larger than maxPx
            if (width > maxPx || height > maxPx) {
                if (width > height) { height = Math.round(height * maxPx / width); width = maxPx; }
                else { width = Math.round(width * maxPx / height); height = maxPx; }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = url;
    });
}


/* ── AI ANALYSIS ─────────────────────────────────────────── */
analyseBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    try {
        analyseBtn.disabled = true;
        analyseSpinner.hidden = false;
        analyseBtnText.textContent = "Analysing...";

        // Compress image before sending (mobile photos can be 5-10MB)
        const dataUrl = await compressImage(selectedFile, 600, 0.65);
        const base64 = dataUrl.split(',')[1];

        const prompt = `You are a nutrition expert. Analyse this food image and respond ONLY with a valid JSON object — no extra text, no markdown fences.

Format:
{
  "dish": "Dish Name or Unknown",
  "confidence": "high" | "low",
  "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
  "calories": "X–Y kcal",
  "protein": "Xg",
  "carbs": "Xg",
  "fats": "Xg"
}

If you are not confident about the dish, set confidence to "low" and use your best estimate. Keep ingredients to 4–5 max. Be concise.`;

        const dataUrl2 = `data:image/jpeg;base64,${base64}`;

        const resp = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                image_base64: dataUrl2
            })
        });

        if (!resp.ok) {
            const err = await resp.json();
            throw new Error(err?.error || `Server error ${resp.status}`);
        }

        const data = await resp.json();
        const text = data.text;

        if (!text) throw new Error('No response received. Please try again.');

        let parsed;
        try {
            // Strip any accidental markdown fences
            const cleaned = text.replace(/```json|```/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch {
            // Fallback: just show raw text
            aiResultBody.innerHTML = `<div class="ai-text">${text.replace(/\n/g, '<br>')}</div>`;
            aiResult.hidden = false;
            aiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        const ingredientChips = (parsed.ingredients || []).map(i =>
            `<span class="ai-chip">${i}</span>`
        ).join('');

        const confidenceBadge = parsed.confidence === 'low'
            ? `<span class="ai-badge ai-badge-warn">⚠️ Estimated</span>`
            : `<span class="ai-badge ai-badge-ok">✓ Identified</span>`;

        aiResultBody.innerHTML = `
            <div class="ai-dish-row">
                <span class="ai-dish-name">${parsed.dish || 'Unknown Dish'}</span>
                ${confidenceBadge}
            </div>
            ${ingredientChips ? `<div class="ai-chips">${ingredientChips}</div>` : ''}
            <div class="ai-macros-grid">
                <div class="ai-macro-box">
                    <span class="ai-macro-val">${parsed.calories || '—'}</span>
                    <span class="ai-macro-lbl">Calories</span>
                </div>
                <div class="ai-macro-box">
                    <span class="ai-macro-val" style="color:#3dffa0">${parsed.protein || '—'}</span>
                    <span class="ai-macro-lbl">Protein</span>
                </div>
                <div class="ai-macro-box">
                    <span class="ai-macro-val" style="color:#00d4ff">${parsed.carbs || '—'}</span>
                    <span class="ai-macro-lbl">Carbs</span>
                </div>
                <div class="ai-macro-box">
                    <span class="ai-macro-val" style="color:#ffc300">${parsed.fats || '—'}</span>
                    <span class="ai-macro-lbl">Fats</span>
                </div>
            </div>`;

        aiResult.hidden = false;
        aiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
        aiResultBody.innerHTML = `<p style="color:#ff6b6b">⚠️ ${err.message}</p>`;
        aiResult.hidden = false;
    } finally {
        analyseBtn.disabled = false;
        analyseSpinner.hidden = true;
        analyseBtnText.textContent = "Analyse Nutrition →";
    }
});

/* ── MODAL OPEN / CLOSE ──────────────────────────────────── */
const uploadModal = document.getElementById('uploadModal');

function resetModal() {
    // Reset file
    selectedFile = null;
    fileInput.value = '';
    // Reset drop zone
    dropPreview.src = '';
    dropPreview.style.display = 'none';
    document.getElementById('dropInner').style.display = '';
    // Reset button
    analyseBtn.disabled = true;
    analyseSpinner.hidden = true;
    analyseBtnText.textContent = 'Analyse Nutrition \u2192';
    // Hide result
    aiResult.hidden = true;
    aiResultBody.innerHTML = '';
}

function openModal() {
    resetModal();
    uploadModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    uploadModal.classList.remove('open');
    document.body.style.overflow = '';
    // Small delay so animation finishes before reset
    setTimeout(resetModal, 300);
}

document.getElementById('openUploadModal').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);

uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && uploadModal.classList.contains('open')) closeModal();
});

/* ── FILE HANDLING (Simplified for the original code) ───── */
document.getElementById('browseBtn').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            dropPreview.src = e.target.result;
            dropPreview.style.display = 'block';
            document.getElementById('dropInner').style.display = 'none';
            analyseBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('visible');
            observer.unobserve(el.target); // animate once only
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));
