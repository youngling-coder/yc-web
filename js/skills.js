document.addEventListener('DOMContentLoaded', function() {
    fetch('data/skills.json')
        .then(response => response.json())
        .then(skills => {
            const container = document.querySelector('.skills-grid');
            skills.forEach(skill => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item fade-in';
                skillItem.innerHTML = `
                    <div class="skill-header">
                        <div class="skill-icon">
                            <i class="ti ti-${skill.icon}"></i>
                        </div>
                        <div class="skill-name">${skill.name}</div>
                    </div>
                    <p class="skill-description">${skill.description}</p>
                `;
                container.appendChild(skillItem);
            });
        });
});