//script.js

/* ============================= */
/* ELEMENTS                      */
/* ============================= */

const mapContainer = document.getElementById("mapContainer");
const viewport = document.getElementById("mapViewport");
const content = document.getElementById("mapContent");
const MAP_CROP_BOTTOM_PERCENT = 0.06; // 6% crop

const baseLayer = document.getElementById("mapBase");

const popup = document.getElementById("popup");
const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const subtitleEl = document.getElementById("subtitle");
const subcontentEl = document.getElementById("subcontent");
const closeBtn = document.getElementById("popup-close");

const resetBtn = document.getElementById("resetView");
const togglePointsBtn = document.getElementById("toggle-points");
const toggleLocateBtn = document.getElementById("toggle-locate-mode");

const LOCATOR_ENABLED = false; // true = locator available, false = completely disabled

const controls = document.querySelector(".map-controls");

if (document.getElementById("currentYear")) {
  document.getElementById("currentYear").innerText = new Date().getFullYear();
}

if (!LOCATOR_ENABLED) {
  controls.style.display = "none";
}

let activeKey = null;

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
  }
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

/* ============================= */
/* HELPERS                       */
/* ============================= */

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
    const bottomAligned = viewRect.height - mapH;

    const minY = bottomAligned;
    const maxY = bottomAligned;

    translateY = clamp(translateY, minY, maxY);
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
  scale = clamp(newScale, minScale, maxScale);

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
    const viewRect = viewport.getBoundingClientRect();

    const popupHeight = popup.offsetHeight || 220;
    const safeBottomArea = popupHeight + 30;

    const pointY = pointRect.top - viewRect.top;

    if (pointY > viewRect.height - safeBottomArea) {
      const neededUp = (pointY - (viewRect.height - safeBottomArea));
      translateY -= neededUp;
      clampPan();
      applyTransform();
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
  popupTop = clamp(popupTop, padding, viewRect.height - popupHeight - padding);

  const arrowY = clamp(pointY - popupTop, 18, popupHeight - 30);

  popup.classList.add(side);
  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${popupTop}px`;
  popup.style.setProperty("--arrowY", `${arrowY}px`);

  popup.style.visibility = "visible";
}

/* ============================= */
/* POPUP CONTENT RENDER          */
/* ============================= */

function renderContent(container, data) {
  container.innerHTML = "";
  if (!data) return;

  if (Array.isArray(data)) {
    data.forEach(block => {
      const wrapper = document.createElement("div");
      wrapper.className = "popup-block";
      renderContent(wrapper, block);
      container.appendChild(wrapper);
    });
    return;
  }

  if (data.type === "text") {
    const p = document.createElement("p");
    p.innerText = data.value;
    container.appendChild(p);
    return;
  }

  if (data.type === "img") {
    const img = document.createElement("img");
    img.src = data.value;
    img.alt = "";
    img.className = "popup-img";
    container.appendChild(img);
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

  setActivePoint(btn);
  activeKey = "stopa-" + btn.dataset.id;

  titleEl.innerText = data.title;

  // main content
  contentEl.style.display = "block";
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
}

/* ============================= */
/* RENDER MARKERS                */
/* ============================= */

function renderPoints() {
  Object.entries(stope).forEach(([id, stopa]) => {
    const btn = document.createElement("button");
    btn.className = "point stopa-point";
    btn.dataset.id = id;
    btn.setAttribute("aria-label", stopa.title);

    btn.style.top = stopa.top;
    btn.style.left = stopa.left;

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
    textToCopy = `top: "${top}%",\nleft: "${left}%",`;
  }

  if (locateMode === "object") {
    textToCopy = `nova_stopa: {
  title: "Nova stopa",
  top: "${top}%",
  left: "${left}%",
  content: {
    type: "v_teropod",
    popup: [
      { type: "text", value: "Opis..." }
    ],
    extra: {
      subtitle: "Napomena",
      subcontent: { type: "text", value: "..." }
    }
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

  if (!mapInitializedOnce) {
    preloadAllIcons();
    renderPoints();
    mapInitializedOnce = true;
  }

  hidePopup();
  resetView();

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