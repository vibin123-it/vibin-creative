const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const lightbox = document.querySelector(".video-lightbox");
const lightboxVideo = document.querySelector(".lightbox-video");
const viewerTitle = document.querySelector("#viewer-title");
const closeButton = document.querySelector(".lightbox-close");

function closeViewer() {
  lightbox.hidden = true;
  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
  document.body.classList.remove("viewer-open");
}

document.querySelectorAll(".video-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    lightboxVideo.src = trigger.dataset.video;
    viewerTitle.textContent = trigger.dataset.title;
    lightbox.hidden = false;
    document.body.classList.add("viewer-open");
    lightboxVideo.play().catch(() => {});
    closeButton.focus();
  });
});

closeButton.addEventListener("click", closeViewer);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeViewer();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeViewer();
});
