// src/ui/typewriter.js
// Shared typewriter utility

export function typeWriter(element, text, speed = 30) {
  if (!element) return Promise.resolve();
  return new Promise(resolve => {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.style.display = 'inline-block';
    cursor.style.width = '2px';
    cursor.style.height = '1em';
    cursor.style.background = '#003366';
    cursor.style.marginLeft = '2px';
    cursor.style.animation = 'blink 0.7s infinite';
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        if (text.charAt(i) === '\n') {
          element.insertBefore(document.createElement('br'), cursor);
        } else if (text.charAt(i) === '*') {
          // Treat '*' as list item bullet (same behavior as about page)
          i++;
          const listItem = document.createElement('div');
          listItem.style.display = 'flex';
          listItem.style.alignItems = 'flex-start';
          listItem.style.marginBottom = '8px';

          const bullet = document.createElement('span');
          bullet.textContent = '• ';
          bullet.style.marginRight = '8px';
          bullet.style.color = '#28a745';
          bullet.style.fontWeight = 'bold';

          const textNode = document.createTextNode('');

          listItem.appendChild(bullet);
          listItem.appendChild(textNode);
          element.insertBefore(listItem, cursor);

          // Type list item text until newline
          let j = i;
          while (j < text.length && text.charAt(j) !== '\n') {
            j++;
          }
          const listItemText = text.substring(i, j);
          typeTextNode(textNode, listItemText, 0, speed, () => {
            i = j;
            setTimeout(type, speed);
          });
          return;
        } else {
          const textNode = document.createTextNode(text.charAt(i));
          element.insertBefore(textNode, cursor);
        }
        i++;
        setTimeout(type, speed);
      } else {
        element.removeChild(cursor);
        resolve();
      }
    }

    function typeTextNode(node, text, index, speed, cb) {
      if (index < text.length) {
        node.textContent += text.charAt(index);
        setTimeout(() => typeTextNode(node, text, index + 1, speed, cb), speed);
      } else {
        cb && cb();
      }
    }

    // Inject minimal styles for cursor blink
    const styleId = 'typewriter-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `@keyframes blink {0%,100%{opacity:1}50%{opacity:0}}`;
      document.head.appendChild(style);
    }

    type();
  });
}
