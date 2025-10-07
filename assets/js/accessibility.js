document.addEventListener('DOMContentLoaded', () => {
  
    // --- Fix In-Text Notes & Accessibility Symbols ---
    
    // Select all content paragraphs and list items
    const contentElements = document.querySelectorAll('main p, main li');
  
    // Part A: Regex for Chinese notes
    const noteRegex = /\(([\u4e00-\u9fff].*?)\)/g;
  
    // Part B: Scalable map for your 68+ symbols
    const symbolMap = {
      // Key: The HTML entity the browser sees
      // Value: The text you want read aloud
      
      // Simple Connector (for lists)
      '-&gt;': '; which leads to;',
      '→': '; which leads to;',
      // '=&gt;': ' implies ', // was '=>'
      // '~': ' is approximately ',
      
      // Narrative Break (for paragraphs)
      '==&gt;': '. This leads to...'
      // ... add more symbols as keys and spoken text as values
    };
    
    // Build a single regex from all the keys in the map
    const symbolRegex = new RegExp(Object.keys(symbolMap).join('|'), 'g');
  
    // Loop through content elements ONCE
    contentElements.forEach(el => {
      let html = el.innerHTML;
      let modified = false;
  
      // Run the note hider first
      if (noteRegex.test(html)) {
        html = html.replace(noteRegex, (match, innerText) => {
          return `(<span aria-hidden="true">${innerText}</span>)`;
        });
        modified = true;
      }
      
      // Run the symbol replacer second
      if (symbolRegex.test(html)) {
        html = html.replace(symbolRegex, (match) => {
          const spokenText = symbolMap[match];
          
          // The new method: a span with the spoken text, styled by CSS.
          return `<span class="sr-symbol">${spokenText}</span>`;
        });
        modified = true;
      }
      
      // Update the DOM only if changes were made
      if (modified) {
        el.innerHTML = html;
      }
    });
  
    // This regex finds text in parentheses that contains at least one Chinese character
    const regex = /\(([\u4e00-\u9fff].*?)\)/g;
  
    contentElements.forEach(el => {
      // Check if the element's HTML contains a match
      if (regex.test(el.innerHTML)) {
        // Replace all matches
        el.innerHTML = el.innerHTML.replace(regex, (match, innerText) => {
          // match = "(舍本逐末)"
          // innerText = "舍本逐末"
          return `(<span aria-hidden="true">${innerText}</span>)`;
        });
      }
    });
  });