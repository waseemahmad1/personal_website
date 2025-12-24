// Project data for tooltips
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

// Initialize tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
  const tooltip = document.getElementById('projectTooltip');
  const projectRows = document.querySelectorAll('.project-row');
  
  projectRows.forEach(row => {
    row.addEventListener('mouseenter', function(e) {
      const projectId = this.dataset.project;
      const project = projectData[projectId];
      
      if (project) {
        // Update tooltip content
        tooltip.querySelector('.tooltip-title').textContent = project.title;
        tooltip.querySelector('.tooltip-description').textContent = project.description;
        tooltip.querySelector('.tooltip-date').textContent = '📅 ' + project.year;
        
        // Show tooltip
        tooltip.classList.add('visible');
      }
    });
    
    row.addEventListener('mouseleave', function() {
      tooltip.classList.remove('visible');
    });
  });
  
  // Update footer with latest GitHub activity
  const deployDateEl = document.getElementById('deploy-date');
  const deployHashEl = document.getElementById('deploy-hash');
  const githubUser = 'waseemahmad1';

  if (deployDateEl && deployHashEl) {
    fetch(`https://api.github.com/users/${githubUser}/events/public`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch activity');
        return response.json();
      })
      .then(events => {
        const pushEvent = events.find(event => event.type === 'PushEvent');
        if (!pushEvent) throw new Error('No recent commits found');

        const commit =
          pushEvent.payload?.commits?.[pushEvent.payload.commits.length - 1];
        const commitSha = commit?.sha
          ? commit.sha
          : pushEvent.payload?.head ?? 'unknown';
        const commitUrl = `https://github.com/${pushEvent.repo.name}/commit/${commitSha}`;

        const date = new Date(pushEvent.created_at);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }).format(date);

        deployDateEl.textContent = formattedDate;
        deployHashEl.textContent = commitSha.slice(0, 7);
        deployHashEl.href = commitUrl;
      })
      .catch(err => {
        console.error(err);
        deployDateEl.textContent = 'unavailable';
        deployHashEl.textContent = 'n/a';
        deployHashEl.removeAttribute('href');
      });
  }
});
