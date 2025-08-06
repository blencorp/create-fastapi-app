#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync, chmodSync } from "fs";
import { join } from "path";
import chalk from "chalk";
import { program } from "commander";
import ora from "ora";

const templates = {
  ".env": `DEBUG=True
HOST=0.0.0.0
PORT=8000`,

  "app/config.py": `from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()`,

  "app/main.py": `from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import get_settings

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"Starting up... Debug mode: {settings.debug}")
    yield
    # Shutdown
    print("Shutting down...")


app = FastAPI(
    title="FastAPI App",
    version="0.1.0",
    debug=settings.debug,
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.debug else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!", "docs": "/docs"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# Example endpoint with error handling
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    if item_id < 1:
        raise HTTPException(status_code=400, detail="Item ID must be positive")
    
    # Example logic
    if item_id > 100:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return {"item_id": item_id, "name": f"Item {item_id}"}`,


  "tests/test_main.py": `import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["docs"] == "/docs"


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_get_item_valid():
    response = client.get("/items/5")
    assert response.status_code == 200
    assert response.json() == {"item_id": 5, "name": "Item 5"}


def test_get_item_not_found():
    response = client.get("/items/999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_get_item_invalid():
    response = client.get("/items/0")
    assert response.status_code == 400
    assert "positive" in response.json()["detail"].lower()`,

  ".gitignore": `__pycache__/
*.py[cod]
.Python
.venv/
venv/
.env
.pytest_cache/
.coverage
.mypy_cache/
.ruff_cache/
*.db
.DS_Store
.vscode/
.idea/`
};

function checkUv() {
  try {
    execSync("uv --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
    return true;
  } catch (error) {
    return false;
  }
}

function createFile(projectPath, relativePath, content) {
  const fullPath = join(projectPath, relativePath);
  const dir = join(projectPath, relativePath.split("/").slice(0, -1).join("/"));
  
  if (dir && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, content);
}

async function createProject(projectName) {
  const projectPath = join(process.cwd(), projectName);
  
  // Check if uv is installed
  if (!checkUv()) {
    console.log(chalk.red("\n❌ Error: uv is not installed"));
    console.log(chalk.yellow("Install it with: curl -LsSf https://astral.sh/uv/install.sh | sh\n"));
    process.exit(1);
  }
  
  // Check if directory exists
  if (existsSync(projectPath)) {
    console.log(chalk.red(`\n❌ Error: Directory '${projectName}' already exists\n`));
    process.exit(1);
  }
  
  console.log(chalk.green(`\n🚀 Creating FastAPI project: ${projectName}\n`));
  
  // Initialize project with uv
  const initSpinner = ora("Initializing project with uv...").start();
  if (!runCommand(`uv init --app "${projectName}"`, { stdio: "pipe" })) {
    initSpinner.fail("Failed to initialize project");
    process.exit(1);
  }
  initSpinner.succeed("Project initialized");
  
  // Change to project directory
  process.chdir(projectPath);
  
  // Add dependencies
  const depsSpinner = ora("Installing dependencies...").start();
  if (!runCommand("uv add fastapi uvicorn python-dotenv pydantic-settings", { stdio: "pipe" })) {
    depsSpinner.fail("Failed to install dependencies");
    process.exit(1);
  }
  depsSpinner.succeed("Core dependencies installed");
  
  const devDepsSpinner = ora("Installing dev dependencies...").start();
  if (!runCommand("uv add --dev pytest pytest-asyncio httpx black ruff mypy", { stdio: "pipe" })) {
    devDepsSpinner.fail("Failed to install dev dependencies");
    process.exit(1);
  }
  devDepsSpinner.succeed("Dev dependencies installed");
  
  // Create project files
  const filesSpinner = ora("Creating project files...").start();
  
  try {
    // Create all template files
    for (const [path, content] of Object.entries(templates)) {
      createFile(projectPath, path, content);
    }
    
    // Create __init__.py files
    createFile(projectPath, "app/__init__.py", "");
    createFile(projectPath, "tests/__init__.py", "");
    
    // Create .env.example
    createFile(projectPath, ".env.example", templates[".env"]);
    
    // Update pyproject.toml
    const pyprojectConfig = `
[tool.black]
line-length = 88

[tool.ruff]
line-length = 88
select = ["E", "F", "I"]

[tool.mypy]
python_version = "3.9"
ignore_missing_imports = true
`;
    
    const pyprojectPath = join(projectPath, "pyproject.toml");
    if (existsSync(pyprojectPath)) {
      const currentContent = readFileSync(pyprojectPath, "utf-8");
      writeFileSync(pyprojectPath, currentContent + pyprojectConfig);
    }
    
    // Create README
    const readme = `# ${projectName}

## Quick Start

\`\`\`bash
# Run development server
uv run uvicorn app.main:app --reload

# Or with custom host/port
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

Your API will be available at:
- http://localhost:8000 - API root
- http://localhost:8000/docs - Interactive API documentation
- http://localhost:8000/health - Health check endpoint

## Development Commands

\`\`\`bash
# Run tests
uv run pytest

# Format code
uv run black app tests

# Lint code
uv run ruff check app tests

# Type checking
uv run mypy app
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── app/
│   ├── __init__.py
│   ├── config.py     # Settings and configuration
│   └── main.py       # FastAPI application
├── tests/
│   └── test_main.py  # Test suite
├── .env              # Environment variables
└── pyproject.toml    # Project configuration
\`\`\`
`;
    createFile(projectPath, "README.md", readme);
    
    filesSpinner.succeed("Project files created");
    
    // Success message
    console.log(chalk.green("\n✅ Project created successfully!\n"));
    console.log(chalk.cyan("To get started:\n"));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  uv run uvicorn app.main:app --reload`));
    console.log(chalk.gray("\nYour API will be running at:"));
    console.log(chalk.gray("  http://localhost:8000"));
    console.log(chalk.gray("  http://localhost:8000/docs (API documentation)\n"));
  } catch (error) {
    filesSpinner.fail("Failed to create project files");
    console.error(error);
    process.exit(1);
  }
}

// CLI setup
program
  .name("create-fastapi-app")
  .description("Create a FastAPI project with proper tooling")
  .version("1.0.2")
  .argument("<project-name>", "Name of the project to create")
  .action(createProject);

program.parse();