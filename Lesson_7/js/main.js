const resolver = {
    resolve: function resolve(options, callback) {
      const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
      const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
      
      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      };
      
      function doRandomiserEffect(options, callback) {
        const characters = options.characters;
        const timeout = options.timeout;
        const element = options.element;
        const partialString = options.partialString;
  
        let iterations = options.iterations;
  
        setTimeout(() => {
          if (iterations >= 0) {
            const nextOptions = Object.assign({}, options, {iterations: iterations - 1});
            if (iterations === 0) {
              element.textContent = partialString;
            } else {
              element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
            }
            doRandomiserEffect(nextOptions, callback)
          } else if (typeof callback === "function") {
            callback(); 
          }
        }, options.timeout);
      };
      
      function doResolverEffect(options, callback) {
        const resolveString = options.resolveString;
        const characters = options.characters;
        const offset = options.offset;
        const partialString = resolveString.substring(0, offset);
        const combinedOptions = Object.assign({}, options, {partialString: partialString});
  
        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = Object.assign({}, options, {offset: offset + 1});
  
          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === "function") {
            callback();
          }
        });
      };
  
      doResolverEffect(combinedOptions, callback);
    } 
  }
  
  const strings = [
    'Salom Qori aka',
    'You know, being Caroline taught me a valuable lesson. I thought you were my greatest enemy. When all along you were my best friend.',
    'The surge of emotion that shot through me when I saved your life taught me an even more valuable lesson: where Caroline lives in my brain.',
    'Goodbye, Caroline.',
    'You know, deleting Caroline just now taught me a valuable lesson. The best solution to a problem is usually the easiest one. And I\'ll be honest.',
    'Killing you? Is hard.',
    'You know what my days used to be like? I just tested. Nobody murdered me. Or put me in a potato. Or fed me to birds. I had a pretty good life.',
    'And then you showed up. You dangerous, mute lunatic. So you know what?',
    'You win.',
    'Just go.',
    'It\'s been fun. Don\'t come back.',
    '......'
  ];
  
  let counter = 0;
  
  const options = {
    offset:0,
    timeout: 50,
    iterations: 20,
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    resolveString: strings[counter],
    element: document.querySelector('[data-target-resolver]')
  }
  
  function callback() {
    setTimeout(() => {
      counter ++;
      
      if (counter >= strings.length) {
        counter = 0;
      }
      
      let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
      resolver.resolve(nextOptions, callback);
    }, 1000);
  }
  
  resolver.resolve(options, callback);