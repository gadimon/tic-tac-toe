const loginDiv = document.getElementById("loginDiv");
const board = document.getElementById("board");
const loginForm = document.getElementById("loginForm");




let socket;
let typingTimeout;
let token;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    try {
        // שליחת בקשת התחברות לשרת
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (!response.ok) {
            throw new Error('התחברות נכשלה');
        }

        const data = await response.json();
        token = data.accessToken;
        console.log('Token received:', token); // הדפסת הטוקן לקונסול

        // התחברות לשרת Socket.IO עם הטוקן
        socket = io('http://localhost:3000', {
            auth: {
                token: token
            }
        });

        loginDiv.style.display = 'none';
        board.style.display = 'flex';

        setupChatListeners();
    } catch (error) {
        console.error('שגיאה בהתחברות:', error);
        alert('התחברות נכשלה. אנא נסה שנית.');
    }
});