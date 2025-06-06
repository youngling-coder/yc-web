document.addEventListener('DOMContentLoaded', function() {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.querySelector('.projects-grid');
            projects.forEach(project => {
                const tagsHTML = project.tags.map(tag => 
                    `<span class="project-tag">${tag}</span>`
                ).join('');
                
                const linksHTML = project.links.map(link => 
                    `<a href="${link.url}" target="_blank" class="project-link">
                        <i class="ti ti-${link.icon}"></i> ${link.text}
                    </a>`
                ).join('');
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card fade-in';
                projectCard.innerHTML = `
                    <div class="project-image">
                        <i class="ti ti-${project.icon}"></i>
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-links">
                            ${linksHTML}
                        </div>
                    </div>
                `;
                container.appendChild(projectCard);
            });
        });
});