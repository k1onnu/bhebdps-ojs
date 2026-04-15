class CurrencyLoader {
    constructor(apiUrl, itemsContainerId, loaderId) {
      this.apiUrl = apiUrl;
      this.itemsContainer = document.getElementById(itemsContainerId);
      this.loader = document.getElementById(loaderId);
      this.cacheKey = 'currencyData';
    }
  
    init() {
      this.showLoader();
      this.loadFromCache();
      this.fetchAndRender();
    }
  
    showLoader() {
      if (this.loader) {
        this.loader.classList.add('loader_active');
      }
    }
  
    hideLoader() {
      if (this.loader) {
        this.loader.classList.remove('loader_active');
      }
    }
  
    loadFromCache() {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        this.render(data);
      }
    }
  
    async fetchAndRender() {
      try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        
        const valutes = data.response.Valute;
        localStorage.setItem(this.cacheKey, JSON.stringify(valutes));
        
        this.render(valutes);
        this.hideLoader();
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        this.hideLoader();
        this.showError();
      }
    }
  
    render(valutes) {
      if (!this.itemsContainer) return;
      
      this.itemsContainer.innerHTML = '';
      
      for (const key in valutes) {
        const valute = valutes[key];
        const item = this.createCurrencyItem(valute.CharCode, valute.Value);
        this.itemsContainer.appendChild(item);
      }
    }
  
    createCurrencyItem(code, value) {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <div class="item__code">${code}</div>
        <div class="item__value">${value.toFixed(2)}</div>
        <div class="item__currency">руб.</div>
      `;
      return div;
    }
  
    showError() {
      if (this.itemsContainer) {
        this.itemsContainer.innerHTML = '<div class="item">Ошибка загрузки данных</div>';
      }
    }
  }
  
  // Запуск
  document.addEventListener('DOMContentLoaded', function() {
    const currencyLoader = new CurrencyLoader(
      'https://students.netoservices.ru/nestjs-backend/slow-get-courses',
      'items',
      'loader'
    );
    currencyLoader.init();
  });