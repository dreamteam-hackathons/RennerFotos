(async () => {
  const response = await fetch('./mocks/mock.json');
  const data = await response.json();

  const htmlList = data.map(({ images }) => {
    return images.map(image => `<li><img src="${image}"></li>`).join('')
  }).join('');

  document.querySelector('section').innerHTML = htmlList;
})()