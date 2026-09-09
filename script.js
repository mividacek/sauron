const LOCATOR_ENABLED = false; // true = locator available, false = completely disabled

/* ============================= */
/* ELEMENTS                      */
/* ============================= */

const mapContainer = document.getElementById("mapContainer");
const viewport = document.getElementById("mapViewport");
const content = document.getElementById("mapContent");
const MAP_CROP_BOTTOM_PERCENT = 0.06; // 6% crop
const mapToggleLabel = document.querySelector(".map-toggle-label");

const baseLayer = document.getElementById("mapBase");

const popup = document.getElementById("popup");
const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const subtitleEl = document.getElementById("subtitle");
const subcontentEl = document.getElementById("subcontent");
const closeBtn = document.getElementById("popup-close");

const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxDots = document.getElementById("lightboxDots");

const togglePointsBtn = document.getElementById("toggle-points");
const toggleLocateBtn = document.getElementById("toggle-locate-mode");

const controls = document.querySelector(".map-controls");

if (document.getElementById("currentYear")) {
  document.getElementById("currentYear").innerText = new Date().getFullYear();
}

if (!LOCATOR_ENABLED) {
  controls.style.display = "none";
}

let activeKey = null;

let currentMap = "base";

let activeLocationTitle = "";

function updatePointPositions() {
  document.querySelectorAll(".point").forEach(btn => {
    const id = btn.dataset.id;
    const stopa = stope[id];

    if (!stopa) return;

    const pos =
      stopa.coords?.[currentMap] ??
      stopa.coords?.base ??
      stopa;

    if (!pos) return;

    btn.style.left = pos.left;
    btn.style.top = pos.top;
  });
}

toggleMap.addEventListener("change", () => {
  currentMap = toggleMap.checked ? "ortho" : "base";

  mapBase.classList.toggle("active-map", currentMap === "base");
  mapOrtho.classList.toggle("active-map", currentMap === "ortho");

  mapToggleLabel.innerText =
    currentMap === "base" ? "Geološka karta" : "Ortofoto karta";

  updatePointPositions();

  if (typeof updateMarkersForMap === "function") {
    updateMarkersForMap();
  }

  mapContainer.classList.add("loading");

  requestAnimationFrame(() => {
    mapContainer.classList.remove("loading");
  });
});

/* ============================= */
/* STOPA TYPES / ICONS           */
/* ============================= */

const STOPA_TYPES = {
  v_teropod: {
    icon: "slike/v_teropod.svg",
    iconActive: "slike/v_teropod_a.svg"
  },
  m_teropod: {
    icon: "slike/m_teropod.svg",
    iconActive: "slike/m_teropod_a.svg"
  },
  v_ornitopod: {
    icon: "slike/v_ornitopod.svg",
    iconActive: "slike/v_ornitopod_a.svg"
  },
  sauropod: {
    icon: "slike/sauropod.svg",
    iconActive: "slike/sauropod_a.svg"
  },

  v_ornitopod_m_teropod: {
    icon: "slike/v_ornitopod_m_teropod.svg",
    iconActive: "slike/v_ornitopod_m_teropod_a.svg"
  },

  sauropod_m_teropod: {
    icon: "slike/sauropod_m_teropod.svg",
    iconActive: "slike/sauropod_m_teropod_a.svg"
  },
};

/* ============================= */
/* PRELOAD ICONS                 */
/* ============================= */

function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

function preloadAllIcons() {
  const urls = [];

  Object.values(STOPA_TYPES).forEach(t => {
    if (t.icon) urls.push(t.icon);
    if (t.iconActive) urls.push(t.iconActive);
  });

  preloadImages(urls);
}

/* ============================= */
/* ZOOM SETTINGS                 */
/* ============================= */

let scale = 1;
let minScale = 1;
let maxScale = 5;

let zoomOutMinScale = 1;

let translateX = 0;
let translateY = 0;

/* ============================= */
/* UI STATE                      */
/* ============================= */

let activePoint = null;
let pointsVisible = true;
let locateMode = LOCATOR_ENABLED ? "coords" : "off";

if (!LOCATOR_ENABLED) {
  toggleLocateBtn.style.display = "none";
}

/* ============================= */
/* MAP DIMENSIONS                */
/* ============================= */

let mapNaturalWidth = 0;
let mapNaturalHeight = 0;

let activePopupGallery = null;
let activePopupScrollToIndex = null;
let activePopupGetIndex = null;
let activePopupGetLength = null;

/* ============================= */
/* HELPERS                       */
/* ============================= */

function blockHorizontalWheelChaining(galleryEl) {
  if (!galleryEl) return;

  galleryEl.addEventListener("wheel", (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // trackpad horizontal swipe često dolazi kao deltaX
    const isHorizontal = absX > absY;

    // mouse wheel horizontal često dolazi kao shift + deltaY
    const isShiftScroll = e.shiftKey && absY > 0;

    if (isHorizontal || isShiftScroll) {
      e.preventDefault();
      e.stopPropagation();

      const delta = isHorizontal ? e.deltaX : e.deltaY;
      galleryEl.scrollLeft += delta;
    }
  }, { passive: false });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function stopInertia() {
  if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
  inertiaFrame = null;
  velocityX = 0;
  velocityY = 0;
}

function applyTransform() {
  content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  // markers stay same visual size
  document.documentElement.style.setProperty("--markerScale", 1 / scale);

  if (activePoint) positionPopup(activePoint);
}

function clampPan() {
  const viewRect = viewport.getBoundingClientRect();

  const mapW = mapNaturalWidth * scale;
  const mapH = mapNaturalHeight * scale;

  const marginX = 0;
  const marginY = 0;

  // --- X clamp ---
  if (mapW <= viewRect.width) {
    translateX = (viewRect.width - mapW) / 2;
  } else {
    const minX = viewRect.width - mapW - marginX;
    const maxX = marginX;
    translateX = clamp(translateX, minX, maxX);
  }

  // --- Y clamp ---
  if (mapH <= viewRect.height) {
    if (window.innerWidth <= 700 && scale < minScale) {
      translateY = (viewRect.height - mapH) / 2;
    } else {
      const bottomAligned = viewRect.height - mapH;

      const minY = bottomAligned;
      const maxY = bottomAligned;

      translateY = clamp(translateY, minY, maxY);
    }
  } else {
    const minY = viewRect.height - mapH;
    const maxY = 0;
    translateY = clamp(translateY, minY, maxY);
  }
}

function zoomAtPoint(newScale, clientX, clientY) {
  const rect = viewport.getBoundingClientRect();

  const px = clientX - rect.left;
  const py = clientY - rect.top;

  const prevScale = scale;
  scale = clamp(newScale, zoomOutMinScale, maxScale);

  const factor = scale / prevScale;

  translateX = px - (px - translateX) * factor;
  translateY = py - (py - translateY) * factor;

  clampPan();
  applyTransform();
}

function resetView() {
  scale = minScale;

  const viewRect = viewport.getBoundingClientRect();

  const mapW = mapNaturalWidth * scale;
  const mapH = mapNaturalHeight * scale;

  translateX = (viewRect.width - mapW) / 2;
  translateY = viewRect.height - mapH;

  clampPan();
  applyTransform();
}

/* ============================= */
/* MOUSE WHEEL ZOOM              */
/* ============================= */

viewport.addEventListener("wheel", (e) => {
  e.preventDefault();

  stopInertia();

  const zoomSpeed = 0.0018;
  const delta = -e.deltaY;

  const newScale = scale * (1 + delta * zoomSpeed);
  zoomAtPoint(newScale, e.clientX, e.clientY);
}, { passive: false });

/* ============================= */
/* DOUBLE CLICK ZOOM             */
/* ============================= */

viewport.addEventListener("dblclick", (e) => {
  e.preventDefault();

  stopInertia();

  const zoomStep = 1.35;
  const newScale = scale * zoomStep;

  zoomAtPoint(newScale, e.clientX, e.clientY);
});

/* ============================= */
/* DRAG / INERTIA STATE          */
/* ============================= */

let isDragging = false;
let hasDragged = false;

let dragStartX = 0;
let dragStartY = 0;
let startTranslateX = 0;
let startTranslateY = 0;

let velocityX = 0;
let velocityY = 0;
let lastMoveTime = 0;
let lastMoveX = 0;
let lastMoveY = 0;

let inertiaFrame = null;

/* ============================= */
/* PINCH STATE                   */
/* ============================= */

let lastTouchDist = null;

/* ============================= */
/* INERTIA SCROLLING             */
/* ============================= */

function startInertia() {
  stopInertia();

  const friction = 0.92;
  const minVelocity = 0.08;

  function step() {
    translateX += velocityX;
    translateY += velocityY;

    velocityX *= friction;
    velocityY *= friction;

    clampPan();
    applyTransform();

    if (Math.abs(velocityX) < minVelocity && Math.abs(velocityY) < minVelocity) {
      stopInertia();
      return;
    }

    inertiaFrame = requestAnimationFrame(step);
  }

  inertiaFrame = requestAnimationFrame(step);
}

/* ============================= */
/* DRAG PAN (MOUSE)              */
/* ============================= */

viewport.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return;

  stopInertia();

  isDragging = true;
  hasDragged = false;

  dragStartX = e.clientX;
  dragStartY = e.clientY;

  startTranslateX = translateX;
  startTranslateY = translateY;

  lastMoveTime = performance.now();
  lastMoveX = e.clientX;
  lastMoveY = e.clientY;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  if (!hasDragged && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
    hasDragged = true;
    hidePopup();
  }

  const now = performance.now();
  const dt = now - lastMoveTime;

  translateX = startTranslateX + dx;
  translateY = startTranslateY + dy;

  if (dt > 0) {
    velocityX = (e.clientX - lastMoveX) / dt * 16;
    velocityY = (e.clientY - lastMoveY) / dt * 16;
  }

  lastMoveTime = now;
  lastMoveX = e.clientX;
  lastMoveY = e.clientY;

  clampPan();
  applyTransform();
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;

  if (hasDragged) {
    startInertia();
  }
});

/* ============================= */
/* TOUCH PAN + PINCH + DOUBLETAP */
/* ============================= */

let lastTapTime = 0;

function getTouchDistance(t1, t2) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

viewport.addEventListener("touchstart", (e) => {
  stopInertia();

  if (e.touches.length === 1) {
    isDragging = true;
    hasDragged = false;

    dragStartX = e.touches[0].clientX;
    dragStartY = e.touches[0].clientY;

    startTranslateX = translateX;
    startTranslateY = translateY;

    lastMoveTime = performance.now();
    lastMoveX = dragStartX;
    lastMoveY = dragStartY;

    // double tap zoom
    const now = Date.now();
    if (now - lastTapTime < 280) {
      const zoomStep = 1.35;
      zoomAtPoint(scale * zoomStep, dragStartX, dragStartY);
      lastTapTime = 0;
    } else {
      lastTapTime = now;
    }
  }

  if (e.touches.length === 2) {
    lastTouchDist = getTouchDistance(e.touches[0], e.touches[1]);
  }
}, { passive: false });

viewport.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (e.touches.length === 1 && isDragging) {
    const now = performance.now();
    const dt = now - lastMoveTime;

    const cx = e.touches[0].clientX;
    const cy = e.touches[0].clientY;

    const dx = cx - dragStartX;
    const dy = cy - dragStartY;

    if (!hasDragged && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      hasDragged = true;
      hidePopup();
    }

    translateX = startTranslateX + dx;
    translateY = startTranslateY + dy;

    if (dt > 0) {
      velocityX = (cx - lastMoveX) / dt * 16;
      velocityY = (cy - lastMoveY) / dt * 16;
    }

    lastMoveTime = now;
    lastMoveX = cx;
    lastMoveY = cy;

    clampPan();
    applyTransform();
  }

  if (e.touches.length === 2) {
    const dist = getTouchDistance(e.touches[0], e.touches[1]);
    if (!lastTouchDist) return;

    const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

    const ratio = dist / lastTouchDist;
    zoomAtPoint(scale * ratio, centerX, centerY);

    lastTouchDist = dist;
  }
}, { passive: false });

viewport.addEventListener("touchend", () => {
  isDragging = false;
  lastTouchDist = null;

  if (hasDragged) {
    startInertia();
  }
});

/* ============================= */
/* POPUP SYSTEM                  */
/* ============================= */

function setActivePoint(btn) {
  document.querySelectorAll(".point").forEach(p => {
    p.classList.remove("active");

    const img = p.querySelector("img");
    if (img && p.dataset.iconNormal) {
      img.src = p.dataset.iconNormal;
    }
  });

  if (btn) {
    btn.classList.add("active");
    activePoint = btn;

    const img = btn.querySelector("img");
    if (img && btn.dataset.iconActive) {
      img.src = btn.dataset.iconActive;
    }
  } else {
    activePoint = null;
  }
}

function hidePopup() {
  popup.classList.add("hidden");
  popup.classList.remove("left", "right");
  setActivePoint(null);

  activeKey = null;
}

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  hidePopup();
});

document.addEventListener("click", (e) => {
  if (!popup.contains(e.target) && !e.target.classList.contains("point")) {
    hidePopup();
  }
});

function positionPopup(btn) {
  const isMobile = window.innerWidth <= 700;

  popup.classList.remove("hidden", "left", "right", "mobile-popup");
  popup.style.visibility = "hidden";

  if (isMobile) {
  popup.style.visibility = "visible";

  const pointRect = btn.getBoundingClientRect();
  const pointCenterY = pointRect.top + pointRect.height / 2;

  const screenCenterY = window.innerHeight / 2;

  if (pointCenterY > screenCenterY) {
    // ikona dolje -> popup gore
    popup.style.top = "14px";
    popup.style.bottom = "auto";
  } else {
    // ikona gore -> popup dolje
    popup.style.bottom = "14px";
    popup.style.top = "auto";
  }

  return;
}

  const pointRect = btn.getBoundingClientRect();
  const viewRect = viewport.getBoundingClientRect();

  const pointX = (pointRect.left - viewRect.left) + pointRect.width / 2;
  const pointY = (pointRect.top - viewRect.top) + pointRect.height / 2;

  popup.style.left = "0px";
  popup.style.top = "0px";

  const popupWidth = popup.offsetWidth;
  const popupHeight = popup.offsetHeight;

  const gap = 18;
  const padding = 12;

  let popupLeft = pointX + gap;
  let side = "right";

  if (popupLeft + popupWidth > viewRect.width - padding) {
    popupLeft = pointX - gap - popupWidth;
    side = "left";
  }

  let popupTop = pointY - popupHeight / 2;

  popupLeft = clamp(popupLeft, padding, viewRect.width - popupWidth - padding);

  const maxTop = viewRect.height - popupHeight - padding;

  if (maxTop < padding) {
    popupTop = padding;
  } else {
    popupTop = clamp(popupTop, padding, maxTop);
  }

  // ako je popup previsok za ekran, uvijek ga otvori od gore
  if (popupHeight > viewRect.height - padding * 2) {
    popupTop = padding;
  }

  popupLeft = clamp(popupLeft, padding, viewRect.width - popupWidth - padding);
  popupTop = clamp(popupTop, padding, viewRect.height - popupHeight - padding);

  const arrowY = clamp(pointY - popupTop, 18, popupHeight - 30);

  popup.classList.add(side);
  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${popupTop}px`;
  popup.style.setProperty("--arrowY", `${arrowY}px`);

  popup.style.visibility = "visible";

  requestAnimationFrame(() => {
    popup.scrollTop = 0;

    const body = popup.querySelector(".popup-body");
    if (body) body.scrollTop = 0;
  });
}

/* ============================= */
/* POPUP CONTENT RENDER          */
/* ============================= */

function getMaxTextHeightFromCSS(slider) {
  // napravi dummy slide koji ima iste klase kao pravi
  const dummySlide = document.createElement("div");
  dummySlide.className = "popup-mobile-slide tall";
  dummySlide.style.visibility = "hidden";
  dummySlide.style.position = "absolute";
  dummySlide.style.left = "-9999px";
  dummySlide.style.top = "0";

  // dummy tekst element
  const dummyP = document.createElement("p");
  dummyP.innerText = "TEST";
  dummySlide.appendChild(dummyP);

  slider.appendChild(dummySlide);

  const slideStyles = window.getComputedStyle(dummySlide);

  const paddingTop = parseFloat(slideStyles.paddingTop) || 0;
  const paddingBottom = parseFloat(slideStyles.paddingBottom) || 0;

  // stvarna visina slajda (CSS height ili auto)
  const slideHeight = dummySlide.getBoundingClientRect().height;

  dummySlide.remove();

  // max prostor za tekst = slide visina - padding
  return Math.max(80, slideHeight - paddingTop - paddingBottom);
}

function splitTextByHeight(text, maxHeightPx, slideWidthPx) {
  const chunks = [];
  let remaining = text.trim();

  const testP = document.createElement("p");
  testP.style.margin = "0";
  testP.style.padding = "0";
  testP.style.boxSizing = "border-box";

  testP.style.fontFamily = "'Open Sans', sans-serif";
  testP.style.fontSize = "13px";
  testP.style.lineHeight = "1.55";
  testP.style.whiteSpace = "normal";
  testP.style.wordBreak = "break-word";

  testP.style.visibility = "hidden";
  testP.style.position = "absolute";
  testP.style.left = "-9999px";
  testP.style.top = "0";
  testP.style.width = slideWidthPx + "px";

  document.body.appendChild(testP);

  while (remaining.length > 0) {
    let low = 0;
    let high = remaining.length;
    let best = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      testP.innerText = remaining.slice(0, mid);

      if (testP.scrollHeight <= maxHeightPx) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (best >= remaining.length) {
      chunks.push(remaining);
      break;
    }

    if (best < 40) {
      // ako je algoritam prerezao prerano, radije uzmi više teksta
      best = Math.min(220, remaining.length);
    }

    let cut = best;

    // pokušaj rezati na zadnjoj točki / upitniku / uskličniku
    const lastDot = Math.max(
      remaining.lastIndexOf(".", best),
      remaining.lastIndexOf("!", best),
      remaining.lastIndexOf("?", best)
    );

    if (lastDot > 60) {
      cut = lastDot + 1;
    } else {
      const lastSpace = remaining.lastIndexOf(" ", best);
      if (lastSpace > 40) cut = lastSpace;
    }

    chunks.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trim();

    if (chunks[chunks.length - 1].length < 10 && chunks.length > 1) {
      const last = chunks.pop();
      chunks[chunks.length - 1] += " " + last;
    }
  }

  document.body.removeChild(testP);
  return chunks;
}

function renderContent(container, data) {
  container.innerHTML = "";
  if (!data) return;

  const isMobile = window.innerWidth <= 700;

  popup.classList.remove("text-only");

  // MOBILE: pretvori sve blokove u jedan slider
  if (isMobile && Array.isArray(data)) {
    const slider = document.createElement("div");
    slider.className = "popup-mobile-slider";
    container.appendChild(slider);

    const dots = document.createElement("div");
    dots.className = "popup-mobile-dots";

    let slides = [];

    function addSlide(contentNode) {
    const slide = document.createElement("div");
    slide.className = "popup-mobile-slide";
    slide.appendChild(contentNode);
    slider.appendChild(slide);
    slides.push(slide);

    requestAnimationFrame(() => {
      // ako sadržaj nije visok, napravi ga compact
      if (slide.scrollHeight < 170) {
        slide.classList.add("compact");
      } else {
        slide.classList.add("tall");
      }
    });
}

  requestAnimationFrame(() => {
    const maxTextHeight = getMaxTextHeightFromCSS(slider);
    const slideWidth = slider.getBoundingClientRect().width - 24;

    data.forEach(block => {

      // FACTS
      if (block.type === "facts") {
        const facts = document.createElement("div");
        facts.className = "facts-table";

        Object.entries(block.value).forEach(([key, value]) => {
          if (key === "zanimljivost") {
            const note = document.createElement("div");
            note.className = "fact-note";

            const name = document.createElement("div");
            name.className = "fact-name";
            name.innerText = key;

            const text = document.createElement("div");
            text.className = "fact-note-text";
            text.innerText = value;

            note.appendChild(name);
            note.appendChild(text);
            facts.appendChild(note);

            return;
          }

          const row = document.createElement("div");
          row.className = "fact-row";

          const name = document.createElement("div");
          name.className = "fact-name";
          name.innerText = key;

          const valueEl = document.createElement("div");
          valueEl.className = "fact-data";
          valueEl.innerText = value;

          row.appendChild(name);
          row.appendChild(valueEl);
          facts.appendChild(row);
        });

        addSlide(facts);
        return;
      }

      // TEXT
      if (block.type === "text") {
        popup.classList.add("text-only");
        const chunks = splitTextByHeight(block.value, maxTextHeight, slideWidth);

        chunks.forEach(chunk => {
          const p = document.createElement("p");
          p.innerText = chunk;
          addSlide(p);
        });

        return;
      }

      // UL
      if (block.type === "ul") {
        const ul = document.createElement("ul");
        block.value.forEach(item => {
          const li = document.createElement("li");
          li.innerText = item;
          ul.appendChild(li);
        });
        addSlide(ul);
        return;
      }

      // OL
      if (block.type === "ol") {
        const ol = document.createElement("ol");
        block.value.forEach(item => {
          const li = document.createElement("li");
          li.innerText = item;
          ol.appendChild(li);
        });
        addSlide(ol);
        return;
      }

      // IMG
      if (block.type === "img") {
        const figure = document.createElement("figure");
        figure.style.margin = "0";

        const img = document.createElement("img");
        img.src = block.value;
        img.alt = block.caption || "";
        img.className = "popup-img popup-img-clickable";

        img.addEventListener("click", (e) => {
          e.stopPropagation();
          openLightbox(
            [{ 
              src: block.value, 
              caption: block.caption || "", 
              photographer: block.photographer || "" 
            }],
            0,
            activeLocationTitle
          );
        });

        figure.appendChild(img);

        if (block.caption || block.photographer) {
          const cap = document.createElement("figcaption");
          cap.className = "popup-caption";

          if (block.caption) {
            const text = document.createElement("div");
            text.className = "caption-text";
            text.innerText = block.caption;
            cap.appendChild(text);
          }

          if (block.photographer) {
            const author = document.createElement("div");
            author.className = "caption-author";
            author.innerText = `Autor fotografije: ${block.photographer}`;
            cap.appendChild(author);
          }

          figure.appendChild(cap);
        }

        addSlide(figure);
        return;
      }

      // GALLERY
      if (block.type === "gallery") {
        block.value.forEach((item, index) => {
          const figure = document.createElement("figure");
          figure.style.margin = "0";

          const img = document.createElement("img");
          img.src = item.src;
          img.alt = item.caption || "";
          img.className = "popup-gallery-img";

          img.addEventListener("click", (e) => {
            e.stopPropagation();
            openLightbox(block.value, index, activeLocationTitle);
          });

          figure.appendChild(img);

          if (item.caption || item.photographer) {
            const cap = document.createElement("figcaption");
            cap.className = "popup-caption";

            if (item.caption) {
              const text = document.createElement("div");
              text.className = "caption-text";
              text.innerText = item.caption;
              cap.appendChild(text);
            }

            if (item.photographer) {
              const author = document.createElement("div");
              author.className = "caption-author";
              author.innerText = `Autor fotografije: ${item.photographer}`;
              cap.appendChild(author);
            }

            figure.appendChild(cap);
          }

          addSlide(figure);
        });

        return;
      }
    });

    // dots
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "popup-mobile-dot";

      dot.addEventListener("click", () => {
        slides[i].scrollIntoView({ behavior: "smooth", inline: "start" });
      });

      dots.appendChild(dot);
    });

    if (slides.length <= 1) {
      dots.style.display = "none";
    }

    slider.scrollLeft = 0;

    slides[0].scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });

    function updateActiveDot() {
      let closestIndex = 0;
      let closestDist = Infinity;

      slides.forEach((slide, i) => {
        const dist = Math.abs(slider.scrollLeft - slide.offsetLeft);

        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      [...dots.children].forEach((d, i) => {
        d.classList.toggle("active", i === closestIndex);
      });
    }

        slider.addEventListener("scroll", () => {
          requestAnimationFrame(updateActiveDot);
        });

        container.appendChild(dots);

        setTimeout(() => {
          updateActiveDot();

          if (slides.length <= 1) return;

          let startX = null;
          let startY = null;

          slider.addEventListener("touchstart", (e) => {
            if (e.touches.length !== 1) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
          }, { passive: true });

          slider.addEventListener("touchend", (e) => {
            if (startX === null || startY === null) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const dx = endX - startX;
            const dy = endY - startY;

            startX = null;
            startY = null;

            // ignore vertical swipe
            if (Math.abs(dy) > Math.abs(dx)) return;

            // threshold
            if (Math.abs(dx) < 45) return;

            // find current active index (same logic as dots)
            const center = slider.scrollLeft + slider.offsetWidth / 2;

            let closestIndex = 0;
            let closestDist = Infinity;

            slides.forEach((slide, i) => {
              const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
              const dist = Math.abs(center - slideCenter);

              if (dist < closestDist) {
                closestDist = dist;
                closestIndex = i;
              }
            });

            // swipe left = next
            if (dx < 0) {
              if (closestIndex === slides.length - 1) {
                slides[0].scrollIntoView({ behavior: "smooth", inline: "start" });
              }
            }

            // swipe right = prev
            if (dx > 0) {
              if (closestIndex === 0) {
                slides[slides.length - 1].scrollIntoView({ behavior: "smooth", inline: "start" });
              }
            }
          }, { passive: true });

        }, 50);
  });

  return;
}

  if (Array.isArray(data)) {

  const scrollText = document.querySelector(".popup-scroll-text");
  const fixedMedia = document.querySelector(".popup-fixed-media");

  if (!scrollText || !fixedMedia) {
    // fallback: ako struktura nije tu
    data.forEach(block => {
      const wrapper = document.createElement("div");
      wrapper.className = "popup-block";
      renderContent(wrapper, block);
      container.appendChild(wrapper);
    });
    return;
  }

  fixedMedia.innerHTML = "";
  container.innerHTML = "";

  data.forEach(block => {
    const wrapper = document.createElement("div");
    wrapper.className = "popup-block";

    if (block.type === "gallery" || block.type === "img") {
      renderContent(wrapper, block);
      fixedMedia.appendChild(wrapper);
    } else {
      renderContent(wrapper, block);
      scrollText.appendChild(wrapper);
    }
  });

    return;
  }

  if (data.type === "text") {
    const p = document.createElement("p");
    p.innerText = data.value;
    container.appendChild(p);
    return;
  }

  if (data.type === "facts") {
    const wrap = document.createElement("div");
    wrap.className = "facts-table";

    const entries = Object.entries(data.value);

    entries.forEach(([label, value]) => {
      if (label === "zanimljivost") return;

      const row = document.createElement("div");
      row.className = "fact-row";

      row.innerHTML = `
        <div class="fact-name">${label}</div>
        <div class="fact-data">${value}</div>
      `;

      wrap.appendChild(row);
    });

    if (data.value.zanimljivost) {
      const note = document.createElement("div");
      note.className = "fact-note";
      note.innerHTML = `
        <div class="fact-name">zanimljivost</div>
        <div class="fact-note-text">${data.value.zanimljivost}</div>
      `;
      wrap.appendChild(note);
    }

    container.appendChild(wrap);
    return;
  }

  if (data.type === "img") {
    const figure = document.createElement("figure");
    figure.className = "popup-figure-single";
    figure.style.margin = "0";

    const img = document.createElement("img");
    img.src = data.value;
    img.alt = data.caption || "";
    img.className = "popup-img";

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox([
        {
          src: data.value,
          caption: data.caption || "",
          photographer: data.photographer || ""
        }
      ], 0);
    });

    figure.appendChild(img);

  if (data.caption || data.photographer) {
    const cap = document.createElement("figcaption");
    cap.className = "popup-caption";

    if (data.caption) {
      const text = document.createElement("div");
      text.className = "caption-text";
      text.innerText = data.caption;
      cap.appendChild(text);
    }

    if (data.photographer) {
      const author = document.createElement("div");
      author.className = "caption-author";
      author.innerText = `Autor fotografije: ${data.photographer}`;
      cap.appendChild(author);
    }

    figure.appendChild(cap);
  }

  container.appendChild(figure);
    return;
  }

if (data.type === "gallery") {
  const wrap = document.createElement("div");
  wrap.className = "popup-gallery-wrap";

  const gallery = document.createElement("div");
  gallery.className = "popup-gallery";

  blockHorizontalWheelChaining(gallery);

  const dots = document.createElement("div");
  dots.className = "popup-gallery-dots";

  const btnPrev = document.createElement("button");
  btnPrev.className = "popup-gallery-btn popup-gallery-prev";
  btnPrev.innerText = "❮";

  const btnNext = document.createElement("button");
  btnNext.className = "popup-gallery-btn popup-gallery-next";
  btnNext.innerText = "❯";

  let currentPopupIndex = 0;

  function updateDots() {
    const dotEls = [...dots.querySelectorAll(".popup-gallery-dot")];
    dotEls.forEach((d, i) => {
      d.classList.toggle("active", i === currentPopupIndex);
    });
  }

  function updateActiveSlide() {
    const figures = [...gallery.querySelectorAll(".popup-figure")];
    if (!figures.length) return;

    figures.forEach(f => f.classList.remove("is-active"));
    figures[currentPopupIndex].classList.add("is-active");
  }

  function scrollToIndex(index, behavior = "smooth") {
    const figures = [...gallery.querySelectorAll(".popup-figure")];
    if (!figures.length) return;

    currentPopupIndex = (index + figures.length) % figures.length;

    figures[currentPopupIndex].scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest"
    });

    updateDots();
    updateActiveSlide();
  }

  function detectClosestSlide() {
    const figures = [...gallery.querySelectorAll(".popup-figure")];
    if (!figures.length) return;

    const center = gallery.scrollLeft + gallery.offsetWidth / 2;

    let closestIndex = 0;
    let closestDist = Infinity;

    figures.forEach((fig, i) => {
      const figCenter = fig.offsetLeft + fig.offsetWidth / 2;
      const dist = Math.abs(center - figCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    currentPopupIndex = closestIndex;
    updateDots();
    updateActiveSlide();
  }

  function updateArrowVisibility() {
    // ako želiš loop, strelice uvijek vidljive
    // ali ako želiš da se sakriju kad ima 1 slika:
    const figures = [...gallery.querySelectorAll(".popup-figure")];
    if (figures.length <= 1) {
      btnPrev.style.display = "none";
      btnNext.style.display = "none";
      dots.style.display = "none";
    } else {
      btnPrev.style.display = "";
      btnNext.style.display = "";
      dots.style.display = "";
    }
  }

  // arrows
  btnPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToIndex(currentPopupIndex - 1);
  });

  btnNext.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToIndex(currentPopupIndex + 1);
  });

  // wheel scroll horizontal + wrap-around
  gallery.addEventListener("wheel", (e) => {

    e.preventDefault();
    e.stopPropagation();

    const maxScroll = gallery.scrollWidth - gallery.clientWidth;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    if (delta > 0 && gallery.scrollLeft >= maxScroll - 2) {
      scrollToIndex(0);
      return;
    }

    if (delta < 0 && gallery.scrollLeft <= 2) {
      const figures = [...gallery.querySelectorAll(".popup-figure")];
      scrollToIndex(figures.length - 1);
      return;
    }

    gallery.scrollLeft += delta;
  }, { passive: false });

  // swipe
  let popupSwipeStartX = null;
  let popupSwipeStartY = null;

  gallery.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;

    popupSwipeStartX = e.touches[0].clientX;
    popupSwipeStartY = e.touches[0].clientY;
  }, { passive: true });

  gallery.addEventListener("touchend", (e) => {
    if (popupSwipeStartX === null || popupSwipeStartY === null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const dx = endX - popupSwipeStartX;
    const dy = endY - popupSwipeStartY;

    popupSwipeStartX = null;
    popupSwipeStartY = null;

    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < 45) return;

    if (dx < 0) scrollToIndex(currentPopupIndex + 1);
    else scrollToIndex(currentPopupIndex - 1);
  }, { passive: true });

  // detect slide on manual scroll
  gallery.addEventListener("scroll", () => {
    requestAnimationFrame(detectClosestSlide);
  });

  // build slides + dots
  data.value.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "popup-figure";

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || "";
    img.className = "popup-gallery-img";

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(data.value, index);
    });

    figure.appendChild(img);

    if (item.caption || item.photographer) {
      const cap = document.createElement("figcaption");
      cap.className = "popup-caption";

      if (item.caption) {
        const text = document.createElement("div");
        text.className = "caption-text";
        text.innerText = item.caption;
        cap.appendChild(text);
      }

      if (item.photographer) {
        const author = document.createElement("div");
        author.className = "caption-author";
        author.innerText = `Autor fotografije: ${item.photographer}`;
        cap.appendChild(author);

        console.log("PC GALLERY AUTHOR:", author);
      }

      figure.appendChild(cap);
    }

    gallery.appendChild(figure);

    const dot = document.createElement("div");
    dot.className = "popup-gallery-dot";

    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      scrollToIndex(index);
    });

    dots.appendChild(dot);
  });

  // init
  setTimeout(() => {
    scrollToIndex(0, "auto");
    updateArrowVisibility();
  }, 30);

  // append DOM
  wrap.appendChild(btnPrev);
  wrap.appendChild(gallery);
  wrap.appendChild(btnNext);

  container.appendChild(wrap);
  container.appendChild(dots);

  // register active gallery for global keydown
  activePopupGallery = gallery;
  activePopupScrollToIndex = scrollToIndex;
  activePopupGetIndex = () => currentPopupIndex;
  activePopupGetLength = () => gallery.querySelectorAll(".popup-figure").length;

  return;
}

  if (data.type === "ul") {
    const ul = document.createElement("ul");
    data.value.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ul.appendChild(li);
    });
    container.appendChild(ul);
    return;
  }

  if (data.type === "ol") {
    const ol = document.createElement("ol");
    data.value.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ol.appendChild(li);
    });
    container.appendChild(ol);
    return;
  }

  container.innerText = typeof data === "string"
    ? data
    : JSON.stringify(data);
}

function showPopup(btn) {
  const data = stope[btn.dataset.id];
  if (!data) return;

  activeLocationTitle = data.title;

  setActivePoint(btn);
  activeKey = "stopa-" + btn.dataset.id;

  titleEl.innerText = data.title;

  subtitleEl.innerText = "";
  subcontentEl.innerHTML = "";
  contentEl.innerHTML = "";

  document.querySelector(".popup-scroll-text").innerHTML = "";

  renderContent(contentEl, data.content?.popup);

  // extra section
  if (data.content?.extra) {
    const { subtitle, subcontent } = data.content.extra;

    if (subtitle) {
      subtitleEl.style.display = "block";
      subtitleEl.innerText = subtitle;
    } else {
      subtitleEl.style.display = "none";
    }

    if (subcontent) {
      subcontentEl.style.display = "block";
      renderContent(subcontentEl, subcontent);
    } else {
      subcontentEl.style.display = "none";
    }
  } else {
    subtitleEl.style.display = "none";
    subcontentEl.style.display = "none";
  }

  positionPopup(btn);

  const body = popup.querySelector(".popup-body");

  if (body) {
    body.scrollTop = 0;

    requestAnimationFrame(() => {
      body.scrollTop = 0;
    });

    setTimeout(() => {
      body.scrollTop = 0;
    }, 60);

    setTimeout(() => {
      body.scrollTop = 0;
    }, 200);
  }

}

let currentGallery = [];
let currentIndex = 0;

function updateLightbox() {
  if (!currentGallery.length) return;

  const item = currentGallery[currentIndex];

  lightboxTitle.innerText = currentLocationTitle || "";
  lightboxImg.src = item.src;

  const captionText = document.createElement("div");
  captionText.className = "caption-text";
  captionText.innerText = item.caption || "";

  const captionAuthor = document.createElement("div");
  captionAuthor.className = "caption-author";
  captionAuthor.innerText = item.photographer ? `Autor fotografije: ${item.photographer}` : "";

  lightboxCaption.innerHTML = "";
  if (item.caption) lightboxCaption.appendChild(captionText);
  if (item.photographer) lightboxCaption.appendChild(captionAuthor);

  if (currentGallery.length <= 1) {
    lightboxPrev.style.display = "none";
    lightboxNext.style.display = "none";
  } else {
    lightboxPrev.style.display = "flex";
    lightboxNext.style.display = "flex";
  }

  lightboxDots.innerHTML = "";

  if (currentGallery.length <= 1) {
    lightboxDots.style.display = "none";
    return;
  }

  lightboxDots.style.display = "flex";

  currentGallery.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "lightbox-dot" + (i === currentIndex ? " active" : "");

    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = i;
      updateLightbox();
    });

    lightboxDots.appendChild(dot);
  });
}

let currentLocationTitle = "";

function openLightbox(galleryArray, index = 0, locationTitle = "") {
  currentGallery = galleryArray;
  currentIndex = index;
  currentLocationTitle = locationTitle;

  updateLightbox();
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImg.src = "";
  lightboxCaption.innerText = "";
  currentGallery = [];
  currentIndex = 0;
}

function nextLightbox() {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateLightbox();
}

function prevLightbox() {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateLightbox();
}

lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  nextLightbox();
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  prevLightbox();
});

// click outside image closes
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// keyboard navigation
document.addEventListener("keydown", (e) => {

  // ESC zatvara lightbox
  if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
    closeLightbox();
    return;
  }

  // ESC zatvara popup
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    hidePopup();
    return;
  }

  // -------------------------
  // LIGHTBOX ARROWS
  // -------------------------
  if (!lightbox.classList.contains("hidden")) {

    if (e.key === "ArrowRight") {
      nextLightbox();
      return;
    }

    if (e.key === "ArrowLeft") {
      prevLightbox();
      return;
    }

    return; // ako je lightbox otvoren, ne diraj popup galeriju
  }

  // -------------------------
  // POPUP GALLERY ARROWS
  // -------------------------
  if (popup.classList.contains("hidden")) return;

  if (!activePopupGallery || !activePopupGallery.isConnected) return;
  if (!activePopupScrollToIndex || !activePopupGetIndex) return;

  if (e.key === "ArrowRight") {
    activePopupScrollToIndex(activePopupGetIndex() + 1);
  }

  if (e.key === "ArrowLeft") {
    activePopupScrollToIndex(activePopupGetIndex() - 1);
  }
});

// scroll navigation
lightbox.addEventListener("wheel", (e) => {
  if (lightbox.classList.contains("hidden")) return;

  e.preventDefault();

  if (e.deltaY > 0) nextLightbox();
  else prevLightbox();
}, { passive: false });

let swipeStartX = null;
let swipeStartY = null;

lightbox.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 1) return;

  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
  if (swipeStartX === null || swipeStartY === null) return;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const dx = endX - swipeStartX;
  const dy = endY - swipeStartY;

  swipeStartX = null;
  swipeStartY = null;

  // ignore vertical swipe
  if (Math.abs(dy) > Math.abs(dx)) return;

  // threshold
  if (Math.abs(dx) < 45) return;

  if (dx < 0) {
    nextLightbox();
  } else {
    prevLightbox();
  }
});

/* ============================= */
/* RENDER MARKERS                */
/* ============================= */

function renderPoints() {
  Object.entries(stope).forEach(([id, stopa]) => {
    const btn = document.createElement("button");
    btn.className = "point stopa-point";
    btn.dataset.id = id;
    btn.setAttribute("aria-label", stopa.title);

    const type = stopa.content?.type;
    const iconData = STOPA_TYPES[type];

    if (iconData) {
      const icon = document.createElement("img");
      icon.src = iconData.icon;
      icon.alt = "";
      icon.className = "stopa-icon";

      btn.dataset.iconNormal = iconData.icon;
      btn.dataset.iconActive = iconData.iconActive || iconData.icon;

      btn.appendChild(icon);
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (locateMode !== "off") return;

      const key = "stopa-" + id;

      if (activeKey === key) hidePopup();
      else showPopup(btn);
    });

    btn.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    popup.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    content.appendChild(btn);
  });
}

/* ============================= */
/* COPY HELPER                   */
/* ============================= */

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, 99999);

  try {
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return Promise.resolve();
  } catch (err) {
    document.body.removeChild(textarea);
    return Promise.reject(err);
  }
}

function showCopyFeedback(message) {
  const msg = document.createElement("div");
  msg.innerText = message;

  msg.style.position = "absolute";
  msg.style.left = "50%";
  msg.style.top = "20px";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "rgba(0, 0, 0, 0.85)";
  msg.style.color = "white";
  msg.style.padding = "7px 12px";
  msg.style.borderRadius = "10px";
  msg.style.fontSize = "12px";
  msg.style.zIndex = "99999";
  msg.style.opacity = "0";
  msg.style.transition = "opacity 0.2s ease";
  msg.style.pointerEvents = "none";

  mapContainer.appendChild(msg);

  requestAnimationFrame(() => {
    msg.style.opacity = "1";
  });

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 200);
  }, 1200);
}

/* ============================= */
/* LOCATOR MODE                  */
/* ============================= */

function getMapPercentCoords(clientX, clientY) {
  const viewRect = viewport.getBoundingClientRect();

  const xInView = clientX - viewRect.left;
  const yInView = clientY - viewRect.top;

  const xOnMap = (xInView - translateX) / scale;
  const yOnMap = (yInView - translateY) / scale;

  const leftPercent = (xOnMap / mapNaturalWidth) * 100;
  const topPercent = (yOnMap / mapNaturalHeight) * 100;

  return { leftPercent, topPercent };
}

toggleLocateBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  if (locateMode === "off") locateMode = "coords";
  else if (locateMode === "coords") locateMode = "object";
  else locateMode = "off";

  toggleLocateBtn.innerText = `Mod: ${locateMode.toUpperCase()}`;
});

viewport.addEventListener("click", (e) => {
  if (locateMode === "off") return;
  if (popup.contains(e.target)) return;
  if (e.target.classList.contains("point")) return;

  const { leftPercent, topPercent } = getMapPercentCoords(e.clientX, e.clientY);

  if (leftPercent < 0 || leftPercent > 100 || topPercent < 0 || topPercent > 100) {
    showCopyFeedback("Klik izvan karte!");
    return;
  }

  const left = leftPercent.toFixed(1);
  const top = topPercent.toFixed(1);

  let textToCopy = "";

  if (locateMode === "coords") {
    textToCopy = `top: "${top}%", left: "${left}%"`;
  }

  if (locateMode === "object") {
    textToCopy = `nova_stopa: {
  title: "Nova stopa",
  coords: {
            base: { top: "${top}%", left: "${left}%" },
            ortho: { top: "${top}%", left: "${left}%" }
        },
  content: {
        type: "v_ornitopod_m_teropod",
        popup: [
            {
                type: "facts",
                value: {
                'godina opisivanja': "1965.",
                'vrsta trgova': "mali teropodi",
                'broj tragova': "50",
                'veličina dinosaura': "3 – 4 m",
                starost: "105 milijuna godina",
                epoha: "donja kreda",
                zanimljivost: "Fun facts are fun"
                }
            },
            { type: "gallery",
            value: [
                { 
                    src: "slike/Tragovi/...", 
                    caption: " Opis slike" 
                },
                ]
        }
            ],
    }
    },`;
  }

  console.log("📍 Kopirano:");
  console.log(textToCopy);

  copyToClipboard(textToCopy)
    .then(() => showCopyFeedback("Kopirano!"))
    .catch(() => showCopyFeedback("Kopiraj iz console-a"));

  const marker = document.createElement("div");
  marker.style.position = "absolute";
  marker.style.left = `${left}%`;
  marker.style.top = `${top}%`;
  marker.style.width = "10px";
  marker.style.height = "10px";
  marker.style.background = "red";
  marker.style.borderRadius = "50%";
  marker.style.transform = "translate(-50%, -50%)";
  marker.style.zIndex = "9999";
  marker.style.pointerEvents = "none";

  content.appendChild(marker);
  setTimeout(() => marker.remove(), 1500);
});

/* ============================= */
/* TOGGLE POINTS                 */
/* ============================= */

togglePointsBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  pointsVisible = !pointsVisible;
  mapContainer.classList.toggle("hide-points");

  togglePointsBtn.innerText = pointsVisible ? "Sakrij točke" : "Prikaži točke";
});

/* ============================= */
/* INIT MAP                      */
/* ============================= */

let mapInitializedOnce = false;

function initMap() {
  const viewRect = viewport.getBoundingClientRect();

  mapNaturalWidth = baseLayer.naturalWidth;
  mapNaturalHeight = baseLayer.naturalHeight * (1 - MAP_CROP_BOTTOM_PERCENT);

  if (!mapNaturalWidth || !mapNaturalHeight) return;

  document.documentElement.style.setProperty("--mapW", `${mapNaturalWidth}px`);
  document.documentElement.style.setProperty("--mapH", `${mapNaturalHeight}px`);

  baseLayer.style.width = `${mapNaturalWidth}px`;
  baseLayer.style.height = `${mapNaturalHeight}px`;

  const isMobile = window.innerWidth <= 700;

  if (isMobile) {
    minScale = viewRect.height / mapNaturalHeight;
  } else {
    minScale = Math.min(
      viewRect.width / mapNaturalWidth,
      viewRect.height / mapNaturalHeight
    );
  }

  maxScale = minScale * 10;
  scale = minScale;

  if (isMobile) {
    zoomOutMinScale = viewRect.width / mapNaturalWidth;
  } else {
    zoomOutMinScale = minScale;
  }

  if (!mapInitializedOnce) {
    preloadAllIcons();
    renderPoints();
    mapInitializedOnce = true;
  }

  hidePopup();
  resetView();
  updatePointPositions()

  setTimeout(() => {
    mapContainer.classList.add("map-loaded");
  }, 400);
}

baseLayer.addEventListener("load", () => {
  requestAnimationFrame(() => initMap());
});

if (baseLayer.complete) {
  requestAnimationFrame(() => initMap());
}

window.addEventListener("resize", () => {
  initMap();
});