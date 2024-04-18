// Function to navigate to the project page
function showProjectPage(projectId) {
    window.location.href = `projects/${projectId}.html`;
  }
  
  // Render project cards on the Projects section
  async function renderProjectCards() {
    const projectList = document.getElementById('project-list');
  
    // Project data can be fetched from an API or hard-coded
    const projects = [
      {
        id: 'infra-automation',
        title: 'GCP Infrastructure Automation',
        description: 'Terraform, Google Cloud Platform, Packer, Github CI/CD',
        thumbnail: 'project1-thumbnail.jpg',
        tags: ['Terraform', 'GCP', 'Packer', 'CI/CD']
      },
      // Add more projects here
    ];
  
    projects.forEach((project) => {
      const card = document.createElement('div');
      card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6', 'cursor-pointer');
      card.onclick = () => showProjectPage(project.id);
  
      const thumbnail = document.createElement('img');
      thumbnail.src = project.thumbnail;
      thumbnail.alt = project.title;
      thumbnail.classList.add('mb-4', 'rounded-md');
  
      const title = document.createElement('h3');
      title.textContent = project.title;
      title.classList.add('text-xl', 'font-bold', 'mb-2', 'text-indigo-600');
  
      const description = document.createElement('p');
      description.textContent = project.description;
      description.classList.add('mb-4');
  
      const tags = document.createElement('div');
      tags.classList.add('flex', 'flex-wrap', 'gap-2');
      project.tags.forEach((tag) => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagElement.classList.add('bg-indigo-600', 'text-white', 'px-2', 'py-1', 'rounded-md', 'text-sm');
        tags.appendChild(tagElement);
      });
  
      card.appendChild(thumbnail);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(tags);
      projectList.appendChild(card);
    });
  }
  
  // Initialize the page
  renderProjectCards();