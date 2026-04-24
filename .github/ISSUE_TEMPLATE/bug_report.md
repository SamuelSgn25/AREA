name: Bug Report
description: Report a bug in AREA
title: "[BUG] "
labels: [bug]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug! Please fill out the form below.
  
  - type: textarea
    id: description
    attributes:
      label: Description
      description: Clear description of the bug
      placeholder: "What happened?"
    validations:
      required: true
  
  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: How to reproduce the issue
      placeholder: |
        1. Go to...
        2. Click...
        3. Observe...
      value: |
        1.
        2.
        3.
    validations:
      required: true
  
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should happen
      placeholder: "The page should..."
    validations:
      required: true
  
  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happens
      placeholder: "Instead, the page..."
    validations:
      required: true
  
  - type: input
    id: version
    attributes:
      label: Version
      description: What version are you using?
      placeholder: "1.0.0"
    validations:
      required: true
  
  - type: input
    id: os
    attributes:
      label: OS
      description: Operating system
      placeholder: "macOS 13.0 / Windows 11 / Ubuntu 22.04"
    validations:
      required: true
  
  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: Add screenshots if applicable
      placeholder: "Paste screenshot here"
  
  - type: textarea
    id: logs
    attributes:
      label: Logs
      description: Console/error logs if applicable
      placeholder: "Paste logs here"
      render: bash
  
  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Anything else we should know
      placeholder: "Additional details..."
