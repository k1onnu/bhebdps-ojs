class TooltipManager {
    constructor() {
      this.activeTooltip = null;
      this.tooltipClass = 'tooltip';
      this.activeClass = 'tooltip_active';
    }
  
    init() {
      const elements = document.querySelectorAll('.has-tooltip');
      
      elements.forEach(element => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          this.toggleTooltip(element);
        });
      });
    }
  
    toggleTooltip(element) {
      if (this.activeTooltip && this.activeTooltip.element === element) {
        this.hideTooltip();
        return;
      }
      
      this.showTooltip(element);
    }
  
    showTooltip(element) {
      this.hideTooltip();
      
      const text = element.getAttribute('title');
      if (!text) return;
      
      const tooltip = document.createElement('div');
      tooltip.className = this.tooltipClass;
      tooltip.textContent = text;
      
      this.positionTooltip(tooltip, element);
      
      document.body.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.classList.add(this.activeClass);
      }, 10);
      
      this.activeTooltip = {
        element: element,
        tooltip: tooltip
      };
      
      element.removeAttribute('title');
    }
  
    hideTooltip() {
      if (this.activeTooltip) {
        const { tooltip, element } = this.activeTooltip;
        
        element.setAttribute('title', tooltip.textContent);
        
        tooltip.classList.remove(this.activeClass);
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 200);
        
        this.activeTooltip = null;
      }
    }
  
    positionTooltip(tooltip, element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      const position = element.getAttribute('data-position') || 'bottom';
      
      switch (position) {
        case 'top':
          tooltip.style.top = (rect.top + scrollTop - tooltip.offsetHeight - 5) + 'px';
          tooltip.style.left = (rect.left + scrollLeft) + 'px';
          break;
        case 'bottom':
          tooltip.style.top = (rect.bottom + scrollTop + 5) + 'px';
          tooltip.style.left = (rect.left + scrollLeft) + 'px';
          break;
        case 'left':
          tooltip.style.top = (rect.top + scrollTop) + 'px';
          tooltip.style.left = (rect.left + scrollLeft - tooltip.offsetWidth - 10) + 'px';
          break;
        case 'right':
          tooltip.style.top = (rect.top + scrollTop) + 'px';
          tooltip.style.left = (rect.right + scrollLeft + 10) + 'px';
          break;
        default:
          tooltip.style.top = (rect.bottom + scrollTop + 5) + 'px';
          tooltip.style.left = (rect.left + scrollLeft) + 'px';
      }
    }
  }
  
  // Запуск
  document.addEventListener('DOMContentLoaded', function() {
    const tooltipManager = new TooltipManager();
    tooltipManager.init();
  });