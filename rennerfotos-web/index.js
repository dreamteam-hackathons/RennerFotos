(async () => {
  const response = await fetch('./mocks/mock.json');
  const data = await response.json();

  const htmlList = data.map(({ images }) => {
    return images.map(image => `<li><img src="${image}"></li>`).join('')
  }).join('');

  document.querySelector('section').innerHTML = htmlList;
})()

async function filter() {
  const filter = document.getElementById('filter').value;

  const response = await fetch('./mocks/mock.json');
  const data = await response.json();

  const filterData = data.filter(data => data.nome.toLowerCase().includes(filter.toLowerCase()));

  const htmlList = filterData.map(({ images }) => {
    return images.map(image => `<li><img src="${image}"></li>`).join('');
  }).join('');

  document.querySelector('section').innerHTML = htmlList;
}