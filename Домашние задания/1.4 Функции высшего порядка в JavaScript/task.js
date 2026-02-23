//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(args);
    const objectInCache = cache.find(item => item.hash === hash);
    
    if (objectInCache) return "Из кеша: " + objectInCache.value;
    
    const result = func(...args);
    cache.push({hash: hash, value: result});
    
    if (cache.length > 5) cache.shift();
    
    return "Вычисляем: " + result;
  }
  
  return wrapper;
}


//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  let firstCall = true;

  function wrapper(...args) {
    wrapper.allCount++;

    if(firstCall) {
      func(...args);
      wrapper.count++;
      firstCall = false;
      return;
    }

    if(timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
      wrapper.count++;
      timeoutId = null;
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;
  
  return wrapper;
}