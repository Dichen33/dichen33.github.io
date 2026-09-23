(() => {
  const PROJECTS = [
    {
      img: 'assets/images/rc-wheelleg-cover.jpg',
      imageFit: 'cover',
      titleKey: 'projects.item0.title',
      descKey: 'projects.item0.desc',
      tags: ['Wheel-Legged Robot', 'Reinforcement Learning', 'Sim2Real', 'MuJoCo', 'Jetson Orin'],
      links: [
        { href: 'https://github.com/Dichen33/RC_WheelLeg', labelKey: 'projects.links.code', icon: 'fab fa-github' },
        { href: 'https://github.com/zeitvex/RC_WheelLeg', labelKey: 'projects.links.upstream', icon: 'fas fa-code-branch' },
        { href: 'https://github.com/Dichen33/RC_Legged_Control', labelKey: 'projects.links.control', icon: 'fas fa-sliders' },
      ],
    },
    {
      img: 'assets/images/hti-ball-cover.jpg',
      titleKey: 'projects.item1.title',
      descKey: 'projects.item1.desc',
      tags: ['Computer Vision', 'YOLO', 'MaixCAM', 'MSPM0G3507', 'UART'],
      links: [
        { href: 'https://github.com/Dichen33/2026-H-TI', labelKey: 'projects.links.code', icon: 'fab fa-github' },
      ],
    },
    {
      img: 'assets/images/humanoid-robot-cover.jpg',
      titleKey: 'projects.item2.title',
      descKey: 'projects.item2.desc',
      tags: ['RK3588', 'Wheeled Robot', 'Servo Joints', 'State Machine', 'Vision Tag'],
      links: [],
    },
    {
      img: 'assets/images/mjlab-minidog-cover.png',
      titleKey: 'projects.item3.title',
      descKey: 'projects.item3.desc',
      tags: ['MuJoCo', 'mjlab', 'Reinforcement Learning', 'Quadruped', 'Inverse Kinematics'],
      links: [],
    },
  ];

  const TIMELINE_EVENTS = [
    'timeline.event1',
    'timeline.event2',
    'timeline.event3',
  ];

  const TECH_STACK = [
    {
      category: 'skills.hardware',
      items: [
        { name: 'LCEDA', icon: 'fas fa-pencil-ruler' },
      ],
    },
    {
      category: 'skills.embedded',
      items: [
        { name: 'STM32', icon: 'fas fa-microchip' },
        { name: 'MSPM0G3507', icon: 'fas fa-memory' },
        { name: 'NVIDIA Jetson', icon: 'fas fa-server' },
      ],
    },
    {
      category: 'skills.robotics',
      items: [
        { name: 'MuJoCo', icon: 'fas fa-cube' },
        { name: 'Isaac Gym', icon: 'fas fa-dumbbell' },
        { name: 'ROS 2', icon: 'fas fa-robot' },
      ],
    },
    {
      category: 'skills.software',
      items: [
        { name: 'C', icon: 'fas fa-code' },
        { name: 'C++', icon: 'fas fa-code' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Linux', icon: 'fab fa-linux' },
        { name: 'Git', icon: 'fab fa-git-alt' },
      ],
    },
  ];

  const CONTACT_LINKS = [
    { icon: 'fas fa-envelope', key: 'contact.email', link: 'mailto:3357573813@qq.com' },
    { icon: 'fab fa-github', key: 'contact.github', link: 'https://github.com/Dichen33' },
    { icon: 'fas fa-robot', key: 'contact.playground', link: 'playground/' },
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clear(el) {
    if (!el) return;
    el.innerHTML = '';
  }

  function t(key) {
    return window.i18n?.get ? window.i18n.get(key) : key;
  }

  function renderSpanTags(tags, className) {
    if (!Array.isArray(tags)) return '';
    return tags.map((tag) => `<span class="${className}">${tag}</span>`).join('');
  }

  function renderProjectTags(tags) {
    if (!Array.isArray(tags)) return '';
    return `<div class="project-tags">${renderSpanTags(tags, 'project-tag')}</div>`;
  }

  function renderProjectActions(links) {
    if (!Array.isArray(links) || links.length === 0) return '';

    const items = links
      .filter((link) => link.href)
      .map((link) => {
        const label = link.labelKey ? t(link.labelKey) : link.label;
        const icon = link.icon || 'fas fa-arrow-up-right-from-square';

        return `
          <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="project-action" aria-label="${label}">
            <i class="${icon}"></i>
            <span>${label}</span>
          </a>
        `;
      })
      .join('');

    return items ? `<div class="project-actions">${items}</div>` : '';
  }

  function initThemeToggle() {
    const toggleBtn = qs('.theme-toggle');
    const htmlEl = document.documentElement;
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || htmlEl.getAttribute('data-theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      console.log(`[Theme] Switched to ${newTheme}`);
    });
  }

  function initLangToggle() {
    const toggleBtn = qs('.lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const current = window.i18n.currentLang();
      const next = current === 'en' ? 'zh' : 'en';
      console.log(`[Lang] Switching to ${next}...`);
      window.i18n.changeLang(next);
    });
  }

  function initProjects() {
    const grid = qs('.projects-grid');
    if (!grid) return;
    clear(grid);

    PROJECTS.forEach((project) => {
      const tagsHtml = renderProjectTags(project.tags);
      const actionsHtml = renderProjectActions(project.links);
      const hasThumbnail = Boolean(project.img);
      const thumbnailHtml = project.img
        ? `
        <div class="project-thumbnail-wrapper">
          <img src="${project.img}" alt="${t('projects.imgAlt')}" class="project-thumbnail${project.imageFit === 'cover' ? ' project-thumbnail--cover' : ''}">
        </div>
      `
        : '';
      const metaHtml = hasThumbnail
        ? `${tagsHtml}${actionsHtml}`
        : `<div class="project-meta-row">${tagsHtml}${actionsHtml}</div>`;

      const card = document.createElement('div');
      card.className = hasThumbnail ? 'card project-card' : 'card project-card project-card--text-only';
      card.innerHTML = `
        ${thumbnailHtml}
        <div class="project-info">
          <h3>${t(project.titleKey)}</h3>
          <p>${t(project.descKey)}</p>
          ${metaHtml}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function initTimeline() {
    const container = qs('.timeline-container');
    if (!container) return;
    clear(container);

    TIMELINE_EVENTS.forEach((key) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <span class="timeline-date">${t(`${key}.date`)}</span>
        <div class="timeline-content">
          <h3>${t(`${key}.title`)}</h3>
          <p>${t(`${key}.desc`)}</p>
        </div>
      `;
      container.appendChild(item);
    });
  }

  function initTechStack() {
    const container = qs('.skills-wrapper');
    if (!container) return;
    clear(container);

    TECH_STACK.forEach((group) => {
      const itemsHtml = group.items
        .map((s) => `<div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>`)
        .join('');

      const col = document.createElement('div');
      col.className = 'skill-category';
      col.innerHTML = `<h3>${t(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
      container.appendChild(col);
    });
  }

  function initContactLinks() {
    const container = qs('.intro-contact-links');
    if (!container) return;
    clear(container);

    CONTACT_LINKS.forEach((contact) => {
      const label = t(contact.key);
      const item = document.createElement('a');
      item.className = 'intro-contact-link';
      item.href = contact.link;
      if (!contact.link.startsWith('mailto:')) {
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
      }
      item.title = label;
      item.setAttribute('aria-label', label);
      item.innerHTML = `<span>${label}</span><i class="${contact.icon}"></i>`;
      container.appendChild(item);
    });
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        let target;
        try {
          target = qs(href);
        } catch {
          return;
        }

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  function initRevealMotion() {
    const targets = [
      ...qsa('.projects-grid .card'),
      ...qsa('.documents-grid .card'),
      ...qsa('.timeline-container .timeline-item'),
      ...qsa('.skills-wrapper .skill-category'),
    ];

    if (!targets.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((el, index) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${(index % 6) * 60}ms`);
    });

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    initSmoothScroll();
  });

  window.addEventListener('i18nLoaded', () => {
    console.log('[main] i18n loaded, rendering content...');
    initProjects();
    initTimeline();
    initTechStack();
    initContactLinks();
    initRevealMotion();
  });
})();
