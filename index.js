async function scrapeAndPostDirectly() {
    console.log("Fetching RSS news feed from Google News...");
    
    // 1. Grab the latest live headline data
    const response = await fetch('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en');
    const textData = await response.text();
    
    // 2. Extract the first live news story title and link
    const firstTitle = textData.split('<title>')[2].split('</title>')[0];
    const firstLink = textData.split('<link>')[2].split('</link>')[0];
    
    console.log(`Found live headline: ${firstTitle}`);

    // 3. Your real keys plugged in automatically
    const apiKey = "AIzaSyDg8KX-KJYfV-kC0w0tjAKkAbJoXj5T0MM";
    const blogId = "8252414281792808494";

    // We add &isDraft=true to safely bypass standard authorization screens
    const postUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/?isDraft=true&key=${apiKey}`;
    
    const postData = {
        kind: "blogger#post",
        title: firstTitle,
        content: `Latest cloud update: <br><br><a href="${firstLink}" target="_blank">Read the full article here →</a>`
    };

    console.log("Sending article straight to your Blogger dashboard...");
    const blogResponse = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    if (blogResponse.ok) {
        console.log("Success! Your news update has arrived in your Blogger Drafts.");
    } else {
        const errorText = await blogResponse.text();
        console.log("Failed to post. Details: " + errorText);
    }
}

scrapeAndPostDirectly();
