#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const packageLockPath = path.join(__dirname, 'package-lock.json')

// Check if package-lock.json exists
if (!fs.existsSync(packageLockPath)) {
  console.log('📦 Generating package-lock.json...')
  try {
    execSync('npm install --package-lock-only', { stdio: 'inherit' })
    console.log('✅ package-lock.json generated successfully!')
  } catch (error) {
    console.error('❌ Failed to generate package-lock.json:', error.message)
    process.exit(1)
  }
} else {
  console.log('✅ package-lock.json already exists')
}
