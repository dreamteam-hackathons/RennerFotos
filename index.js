const baseUrl = 'http://neiesc-31b78051.localhost.run/v1';
let data = [];

(async () => {
  let htmlList = [];

  try {
    const response = await fetch(`${baseUrl}/fotos`);
    data = await response.json();
    htmlList = data.map(({ image }) => `<li><img src="${image}"></li>`).join('');
  } catch (err) {
    htmlList = ['<h2>Houve uma falha ao obter as fotos, tente novamente mais tarde.</h2>']
  }

  document.querySelector('section').innerHTML = htmlList;
})()

async function filter() {
  const filter = document.getElementById('filter').value;

  const filterData = data.filter(data => data.nome.toLowerCase().includes(filter.toLowerCase()));

  const htmlList = filterData.map(({ image }) => `<li><img src="${image}"></li>`).join('');

  document.querySelector('section').innerHTML = htmlList;
}

function toggleFilter() {
  const filterElement = document.getElementById('filter');

  filterElement.hidden = !filterElement.hidden;
}