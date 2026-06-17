const fs = require('fs');

async function scrapeAndPost() {
    console.log("Fetching RSS news feed...");
    
    // We fetch a public BBC world news feed directly via internet browser mechanics
    const response = await fetch('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en');
    const textData = await response.text();
    
    // Quick search trick to grab the first article title and link without heavy libraries
    const firstTitle = textData.split('<title>')[2].split('</title>')[0];
    const firstLink = textData.split('<link>')[2].split('</link>')[0];
    
    console.log(`Found live news: ${firstTitle}`);
    
    // Prepare the email text block that Blogger needs to publish a post
    const emailBody = `Here is the latest live update fetched automatically by our cloud script:\n\nRead the full story here: ${firstLink}`;
    
    // We save this data for our email sender robot in the next step
    fs.writeFileSync('email_body.txt', emailBody);
    fs.writeFileSync('email_subject.txt', firstTitle);
}

scrapeAndPost();
