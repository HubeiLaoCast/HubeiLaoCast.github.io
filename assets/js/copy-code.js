document.addEventListener('DOMContentLoaded', function() {
  // SVG icons
  const clipboardIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>`;
  
  const checkIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`;

  // Find all code blocks
  const highlights = document.querySelectorAll('div.highlight');

  highlights.forEach(function(highlightDiv) {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.innerHTML = clipboardIcon;
    highlightDiv.appendChild(copyButton);

    copyButton.addEventListener('click', function() {
      const codeElement = highlightDiv.querySelector('code');
      const codeToCopy = codeElement.innerText;

      navigator.clipboard.writeText(codeToCopy).then(function() {
        // Success: show check icon and add 'copied' class
        copyButton.innerHTML = checkIcon;
        copyButton.classList.add('copied');

        setTimeout(function() {
          // Reset: show clipboard icon and remove 'copied' class
          copyButton.innerHTML = clipboardIcon;
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
      });
    });
  });
});