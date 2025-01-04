# AZ AI Chatbox Extension

A Chrome Extension that integrates AI chat functionality to help users with coding problems on Algozenith platform(maang.in). It injects a chatbox into the problem's page of the website that provides hints and guidance based on the current problem being viewed.

## Author

Meet Patel

- [https://github.com/Meet1306](#)
- [https://github.com/Meet1306/ChatBot](#)

## Features

- **AI-powered chatbox**: Ask questions and receive AI-generated hints.
- **Responsive**: The chatbox is fixed at the bottom-right corner for easy access.
- **Real-time integration**: The chatbox activates on the problem page and dynamically provides support.
- **Problem detection**: Automatically detects when a problem page is loaded.
- **Question-only input**: The chatbox only accepts questions related to the current coding problem, ensuring a focused support experience.
- **Hint and solution fetching**: Retrieves relevant hints and solutions related to the detected problem.
- **Code fetching**: Automatically fetches the code written by the user in the editor and provides it to the AI. This enables the AI to analyze the code and suggest corrections or improvements without requiring the user to copy and paste the code.
- **Store conversation**: Stores the conversation history between the user and the AI locally.
- **Restore conversation**: Restores the previous conversation when the extension is reopened, allowing users to continue where they left off.
- **Clear conversation**: Allows clearing the chat history.

### For Developers

1. Clone this repository or download it as a ZIP.
2. Extract the files if downloaded as a ZIP.
3. Open Google Chrome.
4. Type `chrome://extensions/` in the address bar and press Enter.
5. Enable **Developer mode** in the top right corner of the extensions page.
6. Click the **Load unpacked** button and select the folder where you extracted the extension files.
7. The extension is now installed and ready to use.

### Knowledge

- HTML
- CSS
- JavaScript
- Chrome API

### Tools

- Google Chrome Browser
- Visual Studio Code (VSCode)

## How It Works

The extension detects when the user navigates to a problem page. Upon detection, it:

2. Displays a button labeled **AI** at the top of the page.
3. When clicked, this button opens a chatbox that allows users to interact with the AI for hints and assistance.

## Contribution

Feel free to contribute! Fork the project and make your improvements. Please follow the steps below for contributing:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to **AlgoZenith Platform** for providing the opportunity to participate in the hackathon and showcasing our project.
- The extension uses the **Gemini API** for AI-powered chat functionality.
- Special thanks to the Chrome Extensions API for enabling seamless integration with the browser.

---

If you encounter any issues, feel free to open an issue on the repository, and we’ll be happy to help!
