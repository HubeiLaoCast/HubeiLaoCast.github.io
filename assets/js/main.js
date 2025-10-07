document.addEventListener('DOMContentLoaded', () => {
  const toc = document.getElementById('markdown-toc');
  if (toc) {
    // --- 1. Add Foldable/Toggle Logic ---
    const allListItems = toc.querySelectorAll('li');
    allListItems.forEach(item => {
      const nestedList = item.querySelector('ul');
      if (nestedList) {
        item.classList.add('has-nested');
        const link = Array.from(item.children).find(child => child.tagName === 'A');
        if (link) {
          link.addEventListener('click', function(event) {
            event.preventDefault();
            item.classList.toggle('open');
          });
        }
      }
    });

    // --- 2. Add Counter Numbers to TOC & Headings ---
    let chapter = 0;
    const topLevelItems = toc.querySelectorAll(':scope > li');
    topLevelItems.forEach((h2_item, index) => {
      const h2_link = h2_item.querySelector(':scope > a');
      if (!h2_link) return;
      const h2_heading = document.getElementById(h2_link.getAttribute('href').substring(1));
      if (index === 0) { return; }
      chapter++; 
      let section = 0;
      
      const secondLevelItems = h2_item.querySelectorAll(':scope > ul > li');
      secondLevelItems.forEach(h3_item => {
        section++; 
        let subSection = 0;
        const numberString = `${chapter}.${section}. `;
        const h3_link = h3_item.querySelector(':scope > a');
        if (h3_link) {
          prependNumber(h3_link, numberString, 'toc-number');
          const h3_heading = document.getElementById(h3_link.getAttribute('href').substring(1));
          if (h3_heading) {
            prependNumber(h3_heading, numberString, 'heading-number');
          }
        }

        const thirdLevelItems = h3_item.querySelectorAll(':scope > ul > li');
        thirdLevelItems.forEach(h4_item => {
          subSection++; 
          let subSubSection = 0;
          const numberString = `${chapter}.${section}.${subSection}. `;
          const h4_link = h4_item.querySelector(':scope > a');
          if (h4_link) {
            prependNumber(h4_link, numberString, 'toc-number');
            const h4_heading = document.getElementById(h4_link.getAttribute('href').substring(1));
            if (h4_heading) {
              prependNumber(h4_heading, numberString, 'heading-number');
            }
          }
          
          const fourthLevelItems = h4_item.querySelectorAll(':scope > ul > li');
          fourthLevelItems.forEach(h5_item => {
            subSubSection++; 
            const numberString = `${chapter}.${section}.${subSection}.${subSubSection}. `;
            const h5_link = h5_item.querySelector(':scope > a');
            if(h5_link) {
              prependNumber(h5_link, numberString, 'toc-number');
              const h5_heading = document.getElementById(h5_link.getAttribute('href').substring(1));
              if (h5_heading) {
                prependNumber(h5_heading, numberString, 'heading-number');
              }
            }
          });
        });
      });
    });

    // Helper function to add the number span
    function prependNumber(element, numberString, spanClass) {
      const numberSpan = document.createElement('span');
      numberSpan.className = spanClass;
      numberSpan.textContent = numberString;
      numberSpan.setAttribute('aria-hidden', 'true');
      element.prepend(numberSpan);
    }
  } // end if(toc)
});