
# Neon Blonde Venue Portal

A futuristic, cyberpunk-themed artist portal for the band **Neon Blonde**. This application serves as a central hub for venue managers and booking agents to access technical riders, marketing assets, and payment information.

## 🎸 Features

*   **Venue Dashboard**: Interactive check-in system for venues to provide load-in times, wifi details, and hospitality info.
*   **Asset Repository**: Secure gateway to Google Drive folders containing high-res logos, fonts, and riders.
*   **Payment Terminal**: Custom-branded QR code generation for Venmo and PayPal payments with "Neon" visual overlays.
*   **Cyberpunk UI**: Fully responsive interface featuring glassmorphism, neon glows, and glitch effects built with Tailwind CSS.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS (CDN) with custom config
*   **AI Integration**: Google GenAI SDK (Ready for Gemini 3.0 integration)
*   **Build System**: ES Modules (Browser-native import maps)

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/neonblondeportal.git
    ```

2.  **Environment Setup**:
    *   Create a `.env` file if you plan to use the AI features (requires `API_KEY`).

3.  **Run**:
    *   Since this project uses ES Modules via `importmap` in `index.html`, you can serve it with any static file server.
    *   Example: `npx serve .` or use the "Live Server" extension in VS Code.

## 📦 Deployment / Git Reset

If you need to reset the repository or deploy to a fresh GitHub repo:

1.  **Initialize Git**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Push to GitHub**:
    ```bash
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
    git push -u origin main
    ```

## 📂 Project Structure

*   `App.tsx`: Main application logic and routing.
*   `components/`: Reusable UI components (Layout, Chat).
*   `constants.tsx`: Configuration for assets, payments, and band info.
*   `services/`: Gemini AI integration services.

## 🎨 Design System

The app uses a custom Tailwind configuration injected via `index.html`:
*   **Fonts**: 'Russo One' (Display), 'Share Tech Mono' (Body)
*   **Colors**: Neon Pink (`#FF0099`), Neon Blue (`#00F0FF`), Neon Purple (`#BD00FF`)
