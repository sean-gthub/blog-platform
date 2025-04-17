const blogList = document.getElementById('blogList');
const tagFilterContainer = document.getElementById('tagFilterContainer');
let allPosts = [];
let currentTag = null;

async function loadPosts() {
  // Simulate loading multiple posts
  const postFiles = ['posts/post-1.json','posts/post-2.json']; // Add more files as you create them
  const postPromises = postFiles.map(file => fetch(file).then(res => res.json()));
  allPosts = await Promise.all(postPromises);
  displayTags();
  displayPosts();
}

function displayTags() {
  const tags = new Set();
  allPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));

  tagFilterContainer.innerHTML = Array.from(tags).map(tag => `
    <button onclick="filterByTag('${tag}')">${tag}</button>
  `).join('') + `<button onclick="filterByTag(null)">Clear</button>`;
}

function filterByTag(tag) {
  currentTag = tag;
  displayPosts();
}

function displayPosts() {
  const filtered = currentTag
    ? allPosts.filter(post => post.tags.includes(currentTag))
    : allPosts;

  blogList.innerHTML = filtered.map(post => `
    <div class="post-preview">
      <h2><a href="post.html?slug=${post.slug}">${post.title}</a></h2>
      <p>${post.date}</p>
      <p>${post.content.substring(0, 100)}...</p>
      <small>Tags: ${post.tags.join(', ')}</small>
    </div>
  `).join('');
}

loadPosts();
