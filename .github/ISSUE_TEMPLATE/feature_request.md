name: Feature Request
description: Suggest a feature for AREA
title: "[FEATURE] "
labels: [enhancement]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature! Please describe your idea below.
  
  - type: textarea
    id: description
    attributes:
      label: Feature Description
      description: Clear description of the feature
      placeholder: "I would like to..."
    validations:
      required: true
  
  - type: textarea
    id: problem
    attributes:
      label: Problem It Solves
      description: What problem does this feature solve?
      placeholder: "This would help because..."
    validations:
      required: true
  
  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: How should this be implemented?
      placeholder: "The solution could be..."
  
  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Any alternatives you considered?
      placeholder: "Other approaches..."
  
  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Anything else we should know
      placeholder: "Additional details..."
