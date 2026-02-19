const movies = [
  { id: 26, title: "Побег из Шоушенка", imdb: 9.30, year: 1994 },
  { id: 25, title: "Крёстный отец", imdb: 9.20, year: 1972 },
  { id: 27, title: "Крёстный отец 2", imdb: 9.00, year: 1974 },
  { id: 1047, title: "Тёмный рыцарь", imdb: 9.00, year: 2008 },
  { id: 223, title: "Криминальное чтиво", imdb: 8.90, year: 1994 }
];

let step = 0;
renderTable(movies);
setInterval(nextSort, 2000);

// Отрисовка
function renderTable(data) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(movie => {
    const row = document.createElement('tr');
    row.dataset.id = movie.id;
    row.dataset.title = movie.title;
    row.dataset.year = movie.year;
    row.dataset.imdb = movie.imdb.toFixed(2);
    
    row.innerHTML = `
      <td>#${movie.id}</td>
      <td>${movie.title}</td>
      <td>(${movie.year})</td>
      <td>imdb: ${movie.imdb.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Сортировка по data-атрибутам
function sortTable(field, direction) {
  const rows = Array.from(document.querySelectorAll('tbody tr'));
  
  rows.sort((a, b) => {
    let aVal = a.dataset[field];
    let bVal = b.dataset[field];
    
    if (field === 'id' || field === 'year' || field === 'imdb') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return direction === 'asc' 
      ? aVal.localeCompare(bVal) 
      : bVal.localeCompare(aVal);
  });

  const tbody = document.querySelector('tbody');
  rows.forEach(row => tbody.appendChild(row));
  updateArrow(field, direction);
}

// Стрелка
function updateArrow(field, direction) {
  document.querySelectorAll('th .arrow').forEach(el => el.textContent = '');
  const th = document.querySelector(`th[data-sort="${field}"] .arrow`);
  if (th) th.textContent = direction === 'asc' ? ' ↑' : ' ↓';
}

// Следующий шаг
function nextSort() {
  const fields = ['id', 'title', 'year', 'imdb'];
  const fieldIndex = Math.floor(step / 2) % 4;
  const direction = step % 2 === 0 ? 'asc' : 'desc';
  
  sortTable(fields[fieldIndex], direction);
  step = (step + 1) % 8;
}