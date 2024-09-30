# SkillAgent Frontend - React Application

![main logo](https://github.com/Baalavignesh/SkillAgent-React/blob/main/src/assets/readmelogo.png?raw=true)

# Project Overview: Skills-Based Workforce Development Application

The application is designed to help users acquire new skills efficiently using AI. Built with open-source AI, the platform provides personalized learning plans based on user preferences, helping individuals and businesses accelerate skill acquisition and onboarding processes.

## Technology Stack
- **Frontend**: React with Tailwind CSS for styling
- **Backend**: Node.js with TypeScript
- **Hosting**: React app hosted on an S3 bucket, backend on an EC2 instance
- **Database & Authentication**: Firebase for data storage and user authentication
- **AI Integration**: OpenAI's Assistant for personalized learning experiences

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/skillagent-frontend.git
   ```
2. **Navigate to the project directory:**
    ```bash
    cd skillagent-frontend
    ```
3. **Install the dependencies:**
    ```bash
    npm install
    ```
4. **Start the development server:**
    ```bash
    npm run dev
    ```


# Tools & Libraries

- **Vite.js**: Fast build tool for development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vanta.js**: Animated background effects for enhanced visuals.
- **Tailwind MUI**: Material-UI components with Tailwind CSS.
- **Redux Toolkit**: Efficient state management.
- **Axios**: For handling API requests between frontend and backend.
- **Markdown** (with **rehype-raw** & **remark-gfm**): Chat responses rendered in a clean, formatted manner from AI assistant responses.
- 

## Application Use Case
Users can register using their email and password. Once registered, they can enter details about the skill they wish to learn, including:
- What they want to learn
- Desired learning speed
- Current skill level

Based on this information, OpenAI generates a personalized course plan tailored to their timeline (e.g., a 7-day learning plan). Users can then navigate through daily study plans and engage in conversations with a personalized AI tutor (powered by OpenAI’s Assistant), which provides customized responses to their queries.

The platform keeps a record of all interactions using OpenAI's threads feature, allowing users to revisit past conversations to reinforce learning or resolve doubts.

## Workforce Development Use Case
The app is particularly useful for workforce development, enabling companies to create tailored course plans for employees who need to onboard a new project requiring specific skills. Employees can complete the assigned course, earn a certificate, and seamlessly join the project with the required expertise. This streamlines the onboarding process for both companies and employees.

## Future Enhancements
- **Text-to-Voice**: Convert learning content into audio for easier consumption.
- **Real-time Voice Assistant**: Allow users to interact with the AI tutor through voice commands.
- **File and Image Uploads**: Provide additional resources and context by uploading files or images.
- **Quizzes**: Validate learning progress with quizzes for each course.

## Screenshots

![screenshot1](https://github.com/Baalavignesh/SkillAgent-React/blob/main/src/assets/readme1.png?raw=true)
![screenshot2](https://github.com/Baalavignesh/SkillAgent-React/blob/main/src/assets/readme2.png?raw=true)





