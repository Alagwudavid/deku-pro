# Deku Pro - SVG Creator and Editor

![Deku Pro](https://img.shields.io/badge/version-0.1.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)

Deku Pro is a powerful SVG creation, editing, and animation tool built with Next.js and React. It provides a comprehensive set of features for working with SVG files, allowing users to create, modify, and animate SVG icons with an intuitive interface.

## Features

### SVG Editor

- **SVG Upload & Editing**: Upload and edit existing SVG files
- **Layer Management**: View and manage SVG elements in a hierarchical layer panel
- **Element Selection**: Select SVG elements with visual indicators (corner handles and outlines)
- **Visibility Control**: Toggle visibility of individual SVG elements
- **Comment Cleaning**: Remove comments from SVG code
- **Code Editing**: Direct editing of SVG code with real-time preview
- **Auto-Resizing**: Automatically resize uploaded or pasted SVGs to standard dimensions

### User Interface

- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Component-Based**: Modular architecture with specialized components
- **Responsive Design**: Adapts to different screen sizes and devices
- **Zoom Controls**: Adjust the zoom level of the SVG preview

## Project Structure

```
├── app/
│   ├── Editor/              # SVG Editor functionality
│   │   ├── components/      # Editor UI components
│   │   │   ├── EditorCanvas/    # Canvas display component
│   │   │   ├── Layout/          # Main editor layout
│   │   │   ├── PropertiesPanel/ # Element properties editor
│   │   │   ├── Sidebar/         # Layer management sidebar
│   │   │   ├── Toolbar/         # Editor tools
│   │   │   └── Topbar/          # Top navigation bar
│   │   ├── contexts/        # React contexts for state management
│   │   ├── store/           # State management
│   │   ├── layout.tsx       # Editor page layout
│   │   └── page.tsx         # Editor page component
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # App layout
│   └── page.tsx             # Landing page
├── public/                  # Static assets
└── [configuration files]    # Next.js and TypeScript config
```

## Key Components

- **EditorLayout**: Main container for the SVG editor interface
- **Sidebar**: Displays SVG elements in a hierarchical tree structure
- **PropertiesPanel**: Edit properties of selected SVG elements
- **EditorToolbar**: Tools for manipulating SVG elements
- **EditorCanvas**: Canvas for displaying the SVG with zoom controls

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the landing page.
Navigate to [http://localhost:3000/Editor](http://localhost:3000/Editor) to use the SVG editor.

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library for React applications

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## License

MIT License

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
