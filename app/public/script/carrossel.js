 const container = document.querySelector('.carousel-container');
    const list = document.querySelector('.carousel-list');
    const itemWidth = list.scrollWidth / 2; // metade, pois duplicamos
    
    container.addEventListener('scroll', () => {
      if (container.scrollLeft >= itemWidth) {
        container.scrollLeft -= itemWidth; // volta pro início sem travar
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += itemWidth; // vai pro final se rolar pra trás
      }
    });


    
    // rolagem do carrossel de categoris da página home //
    const container = document.querySelector('.carousel-container');
    const list = document.querySelector('.carousel-list');
    const itemWidth = list.scrollWidth / 2; // metade, pois duplicamos
    
    container.addEventListener('scroll', () => {
      if (container.scrollLeft >= itemWidth) {
        container.scrollLeft -= itemWidth; // volta pro início sem travar
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += itemWidth; // vai pro final se rolar pra trás
      }
    });
