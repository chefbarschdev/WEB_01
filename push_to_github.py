#!/usr/bin/env python3
"""
Automatic GitHub Repository Creation and Push Script for AISOLUTIONS

Usage:
    python push_to_github.py [--repo-path PATH] [--repo-name NAME]

The repository path and name can also be provided through the
environment variables ``REPO_PATH`` and ``REPO_NAME``. Command-line
arguments take precedence over environment variables.
"""

import os
import subprocess
import argparse
from datetime import datetime

def run_cmd(cmd, cwd=None):
    """Run a command and return success status and output"""
    try:
        result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, shell=True)
        if result.returncode != 0:
            print(f"❌ Error running {cmd}:")
            print(result.stderr)
            return False, result.stderr
        else:
            if result.stdout.strip():
                print(result.stdout)
            return True, result.stdout
    except Exception as e:
        print(f"❌ Exception running {cmd}: {e}")
        return False, str(e)

def main():
    parser = argparse.ArgumentParser(
        description="Create a GitHub repository and push local changes"
    )
    parser.add_argument(
        "--repo-path",
        default=os.environ.get("REPO_PATH"),
        help="Path to the local repository. Can be set via REPO_PATH env var",
    )
    parser.add_argument(
        "--repo-name",
        default=os.environ.get("REPO_NAME"),
        help="Name of the GitHub repository. Can be set via REPO_NAME env var",
    )

    args = parser.parse_args()

    repo_path = args.repo_path
    repo_name = args.repo_name

    if not repo_path or not repo_name:
        print(
            "❌ repo_path and repo_name must be provided via arguments or environment variables"
        )
        return
    
    print("🚀 AISOLUTIONS GitHub Push Script")
    print("=" * 40)
    
    # Change to project directory
    os.chdir(repo_path)
    print(f"📁 Working in: {repo_path}")
    
    # Check if git is initialized
    if not os.path.exists(os.path.join(repo_path, ".git")):
        print("❌ Git repository not found. Please run 'git init' first.")
        return
    
    print("✅ Git repository found")
    
    # Check git status
    print("\n📊 Checking git status...")
    ok, status = run_cmd("git status --porcelain")
    if not ok:
        return
    
    if status.strip():
        print("📝 Uncommitted changes found. Adding and committing...")
        # Add all files
        ok, _ = run_cmd("git add .")
        if not ok:
            return
        
        # Commit changes
        commit_msg = f"Update AISOLUTIONS project - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        ok, _ = run_cmd(f'git commit -m "{commit_msg}"')
        if not ok:
            return
        print("✅ Changes committed")
    else:
        print("✅ No uncommitted changes")
    
    # Check if remote origin exists
    print("\n🔗 Checking remote repository...")
    ok, remotes = run_cmd("git remote")
    if not ok:
        return
    
    if 'origin' not in remotes:
        print("🆕 No remote origin found. Creating GitHub repository...")
        
        # Try GitHub CLI first
        print("\n🔧 Attempting to create repository with GitHub CLI...")
        ok, output = run_cmd(f"gh repo create {repo_name} --public --source=. --remote=origin --push")
        
        if ok:
            print("🎉 Repository created and pushed successfully with GitHub CLI!")
            print(f"🌐 Repository URL: https://github.com/$(gh api user --jq .login)/{repo_name}")
            return
        else:
            print("⚠️  GitHub CLI failed or not available.")
            print("\n📋 Manual setup required:")
            print("1. Go to https://github.com/new")
            print(f"2. Create a repository named '{repo_name}'")
            print("3. Don't initialize with README (we already have one)")
            print("4. Copy the repository URL")
            print("5. Run these commands:")
            print(f"   git remote add origin https://github.com/YOUR_USERNAME/{repo_name}.git")
            print("   git branch -M main")
            print("   git push -u origin main")
            return
    else:
        print("✅ Remote origin found")
    
    # Push to GitHub
    print("\n⬆️  Pushing to GitHub...")
    
    # Ensure we're on main branch
    ok, current_branch = run_cmd("git branch --show-current")
    if ok and current_branch.strip() != 'main':
        print("🔄 Switching to main branch...")
        run_cmd("git branch -M main")
    
    # Push to origin
    ok, _ = run_cmd("git push -u origin main")
    if ok:
        print("🎉 Successfully pushed to GitHub!")
        
        # Try to get the repository URL
        ok, remote_url = run_cmd("git remote get-url origin")
        if ok:
            # Convert SSH to HTTPS URL for display
            url = remote_url.strip()
            if url.startswith('git@github.com:'):
                url = url.replace('git@github.com:', 'https://github.com/').replace('.git', '')
            print(f"🌐 Repository URL: {url}")
    else:
        print("❌ Failed to push to GitHub")
        print("\n🔧 Troubleshooting:")
        print("1. Check if the remote URL is correct: git remote -v")
        print("2. Verify GitHub authentication: gh auth status")
        print("3. Try manual push: git push -u origin main")

if __name__ == "__main__":
    main()