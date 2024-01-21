function extractConversations() {
    // Select all message elements
    const messages = document.querySelectorAll('div[data-message-author-role]');
    const conversation = Array.from(messages).map(message => {
        // Extract role and text content
        const role = message.getAttribute('data-message-author-role');
        const text = message.innerText.trim();
        // Format based on author role
        return role === 'user' ? {"user": text} : {"assistant": text};
    });

    return JSON.stringify(conversation, null, 2); // Pretty print the JSON
}

function downloadConversation() {
    const conversationJSON = extractConversations();
    const blob = new Blob([conversationJSON], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ChatGPT_Conversation.json';
    a.click();
    URL.revokeObjectURL(url);
}

  
  // Example way to trigger download - you may opt for a more sophisticated approach
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'j') { // CTRL+S to save
      console.log("downloading conversation");
      event.preventDefault();
      downloadConversation();
    }
  });
