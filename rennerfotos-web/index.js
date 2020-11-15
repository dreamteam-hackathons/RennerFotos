(async () => {
  const response = await fetch('http://neiesc-31b78051.localhost.run/v1/fotos');
  const data = await response.json();

  const htmlList = data.map(({ image }) => `<li><img src="${image}"></li>`).join('');

  document.querySelector('section').innerHTML = htmlList;
})()

async function filter() {
  const filter = document.getElementById('filter').value;

  const response = await fetch('./mocks/mock.json');
  const data = await response.json();

  const filterData = data.filter(data => data.nome.toLowerCase().includes(filter.toLowerCase()));

  const htmlList = filterData.map(({ image }) => `<li><img src="${image}"></li>`).join('');

  document.querySelector('section').innerHTML = htmlList;
}

function toggleFilter() {
  const filterElement = document.getElementById('filter');

  filterElement.hidden = !filterElement.hidden;
}