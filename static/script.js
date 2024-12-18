document.addEventListener('DOMContentLoaded', function() {
    const tweetForm = document.querySelector('.tweetBox form');
    const feedContainer = document.getElementById('feed-container');

    tweetForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const tweetInput = document.getElementById('tweetInput');
        const tweetText = tweetInput.value;

        if (!tweetText) {
            console.log("Tweet input is empty."); // Handle empty input
            return;
        }

        // Send tweet text to the server
        fetch('/submitTweet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tweetText })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);

                // Add the new tweet to the feed
                const newPost = document.createElement('div');
                newPost.className = 'post';
                newPost.innerHTML = `
                    <div class="post_avatar">
                        <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" />
                    </div>
                    <div class="post_body">
                        <div class="post_header">
                            <div class="post_headerText">
                                <h3>
                                    User
                                    <span class="post_headerSpecial">@user</span>
                                </h3>
                            </div>
                            <div class="post_headerDescription">
                                <p>${tweetText}</p>
                            </div>
                        </div>
                        <div class="post_footer">
                            <span class="material-symbols-outlined">chat_bubble_outline</span>
                            <span class="material-symbols-outlined">repeat</span>
                            <span class="material-symbols-outlined">favorite_border</span>
                            <span class="material-symbols-outlined">share</span>
                        </div>
                    </div>
                `;

                // Append the new tweet at the end of the feed container
                feedContainer.appendChild(newPost);

                // Clear input field
                tweetInput.value = '';

                // Show a notification if prediction is 1 (Suicidal)
                if (data.prediction === 1) {
                    showHelpNotification();
                }
            })
            .catch(error => console.error("Error sending tweet:", error));
    });

    function showHelpNotification() {
        // Create a notification element
        const notification = document.createElement('div');
        notification.className = 'help-notification';
        notification.innerHTML = `
            <h1 style="margin: 0; font-size: 1.5em; color: #333;">Help is available</h1>
            <p style="margin: 5px 0; font-size: 1em; color: #555;">Speak with someone today</p>
            <p style="margin: 5px 0; font-size: 1em; color: #555;"><strong>National Center for Mental Health Crisis Hotline</strong></p>
            <p style="margin: 5px 0; font-size: 1em; color: #555;">Languages: English, Filipino</p>
            <p style="margin: 5px 0; font-size: 1em; color: #555;">Hours: Available 24/7</p>
            <p style="margin: 5px 0; font-size: 1.2em; color: #e74c3c; font-weight: bold;">Call: 0966-351-4518</p>
        `;

        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '50%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        notification.style.backgroundColor = '#ffffff';
        notification.style.padding = '20px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        notification.style.textAlign = 'center';
        notification.style.zIndex = '1000';
        notification.style.width = '300px';

        // Append to the body
        document.body.appendChild(notification);

        // Automatically remove the notification after 5 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 5000);
    }
});