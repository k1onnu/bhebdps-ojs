class TextEditor {
    constructor(textareaId, storageKey) {
      this.textarea = document.getElementById(textareaId);
      this.storageKey = storageKey;
      this.init();
    }
  
    init() {
      this.loadFromStorage();
      this.textarea.addEventListener('input', () => {
        this.saveToStorage();
      });
      this.createClearButton();
    }
  
    loadFromStorage() {
      const savedText = localStorage.getItem(this.storageKey);
      if (savedText !== null) {
        this.textarea.value = savedText;
      }
    }
  
    saveToStorage() {
      localStorage.setItem(this.storageKey, this.textarea.value);
    }
  
    createClearButton() {
      const button = document.createElement('button');
      button.textContent = 'Очистить содержимое';
      button.className = 'clear-button';
      button.style.cssText = `
        padding: 10px 20px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
      `;
      
      button.addEventListener('click', () => {
        this.clearContent();
      });
      
      this.textarea.parentNode.appendChild(button);
    }
  
    clearContent() {
      this.textarea.value = '';
      this.saveToStorage();
      this.textarea.focus();
    }
  }
  
  // Запуск
  document.addEventListener('DOMContentLoaded', function() {
    const editor = new TextEditor('editor', 'savedText');
  });