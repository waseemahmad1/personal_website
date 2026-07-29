const projectData = {
  harvardeats: {
    title: 'harvard eats',
    description: 'An AI-powered food tracker trained on Harvard dining dataset. Uses machine learning to help students track their nutrition and discover new meals.',
    year: '2025'
  },
  blockchain: {
    title: 'blockchain-based voting system',
    description: 'A secure distributed elections platform leveraging blockchain technology to ensure transparent, tamper-proof voting with cryptographic verification.',
    year: '2025'
  },
  drone: {
    title: 'drone software vulnerability detection',
    description: 'Open-source security tool for detecting vulnerabilities in drone software through static analysis and fuzzing techniques.',
    year: '2025'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('projectTooltip');
  const projectRows = document.querySelectorAll('.project-row');

  const showProject = row => {
    const project = projectData[row.dataset.project];
    if (!project || !tooltip) return;

    tooltip.querySelector('.tooltip-title').textContent = project.title;
    tooltip.querySelector('.tooltip-description').textContent = project.description;
    tooltip.querySelector('.tooltip-date').textContent = project.year;
    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');
  };

  const hideProject = () => {
    if (!tooltip) return;
    tooltip.classList.remove('visible');
    tooltip.setAttribute('aria-hidden', 'true');
  };

  projectRows.forEach(row => {
    row.addEventListener('mouseenter', () => showProject(row));
    row.addEventListener('mouseleave', hideProject);
    row.addEventListener('focus', () => showProject(row));
    row.addEventListener('blur', hideProject);
    row.addEventListener('click', () => showProject(row));
  });
});
