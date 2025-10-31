// GitHub Shortcuts Helper - Content Script
// This script detects user interactions with GitHub navigation and shows shortcut hints
// Uses a Sonner-inspired toast notification system (vanilla JS implementation)

(function() {
  'use strict';

  // Map of GitHub navigation elements to their keyboard shortcuts
  // Based on GitHub's official keyboard shortcuts
  const shortcutMap = {
    'Pull requests': 'g then p',
    'Issues': 'g then i',
    'Code': 'g then c',
    'Actions': 'g then a',
    'Projects': 'g then b',
    'Wiki': 'g then w',
    'Notifications': 'g then n'
  };

  // Inject Sonner toast styles and container
  function injectToastStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .github-shortcuts-toaster {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      }
      
      .github-shortcuts-toast {
        background: #24292f;
        color: #ffffff;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 8px;
        animation: slideIn 0.2s ease-out;
        display: flex;
        align-items: center;
        gap: 8px;
        max-width: 300px;
      }
      
      .github-shortcuts-toast code {
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .github-shortcuts-toast.removing {
        animation: slideOut 0.2s ease-out;
      }
    `;
    document.head.appendChild(style);
  }

  // Create toast container
  function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'github-shortcuts-toaster';
    document.body.appendChild(container);
    return container;
  }

  // Show a toast notification
  function showToast(shortcut) {
    let container = document.querySelector('.github-shortcuts-toaster');
    if (!container) {
      container = createToastContainer();
    }

    const toast = document.createElement('div');
    toast.className = 'github-shortcuts-toast';
    
    // Create elements safely without innerHTML
    const icon = document.createTextNode('💡 Press ');
    const code = document.createElement('code');
    code.textContent = shortcut;
    const suffix = document.createTextNode(' next time!');
    
    toast.appendChild(icon);
    toast.appendChild(code);
    toast.appendChild(suffix);
    
    container.appendChild(toast);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 200); // Wait for animation to complete
    }, 3000);
  }

  // Find shortcut for navigation text
  function findShortcut(text) {
    // Normalize text for comparison
    const normalizedText = text.trim();
    
    // Try exact match first
    if (shortcutMap[normalizedText]) {
      return shortcutMap[normalizedText];
    }
    
    // Try partial match
    for (const [key, value] of Object.entries(shortcutMap)) {
      if (normalizedText.includes(key) || key.includes(normalizedText)) {
        return value;
      }
    }
    
    return null;
  }

  // Handle click events on GitHub navigation
  function handleClick(event) {
    const target = event.target;
    
    // Find the closest link or button
    const clickedElement = target.closest('a, button');
    if (!clickedElement) return;

    // Get the text content
    let text = clickedElement.textContent || clickedElement.getAttribute('aria-label') || '';
    text = text.trim();

    // Check if this is a navigation element we care about
    const shortcut = findShortcut(text);
    if (shortcut) {
      // Show toast with shortcut hint (shortcut is safe as it comes from our controlled map)
      showToast(shortcut);
    }
  }

  // Initialize the extension
  function init() {
    // Inject styles
    injectToastStyles();

    // Add click listener to the document
    document.addEventListener('click', handleClick, true);

    console.log('GitHub Shortcuts Helper loaded');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
