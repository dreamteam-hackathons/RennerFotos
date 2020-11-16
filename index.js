const baseUrl = 'https://neiesc-06e881de.localhost.run';
let data = [];

(async () => {
  let htmlList = [];

  try {
    const response = await fetch(`${baseUrl}/v1/fotos`);
    data = await response.json();

    document.getElementById('loading').hidden = true;

    htmlList = getImages(data);
  } catch (err) {
    htmlList = ['<h2>Houve uma falha ao obter as fotos, tente novamente mais tarde.</h2>']
  }

  document.querySelector('section').innerHTML = htmlList;
})()

function getImages(data) {
  return data.map(({ image }) => `<li><img src="${baseUrl}${image}"></li>`).join('');
}

async function filter() {
  const filter = document.getElementById('filter').value;

  const filterData = data.filter(data => data.nome.toLowerCase().includes(filter.toLowerCase()));

  const htmlList = getImages(filterData);

  document.querySelector('section').innerHTML = htmlList;
}

function toggleFilter() {
  const filterElement = document.getElementById('filter');

  filterElement.hidden = !filterElement.hidden;
}
