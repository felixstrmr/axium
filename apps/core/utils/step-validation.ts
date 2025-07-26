import type { UseFormReturn } from 'react-hook-form'

export type StepValidationRule = {
  field: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
  message?: string
}

export type StepConfig = {
  title: string
  fields: string[]
  validation?: StepValidationRule[]
  customValidation?: (formData: any) => { isValid: boolean; errors: string[] }
}

export const useStepValidation = <T extends Record<string, any>>(
  form: UseFormReturn<T>
) => {
  const validateStep = async (
    stepConfig: StepConfig,
    formData: T
  ): Promise<boolean> => {
    const errors: string[] = []

    // Clear previous errors for this step's fields
    stepConfig.fields.forEach((field) => {
      form.clearErrors(field as any)
    })

    // Run field-level validations
    if (stepConfig.validation) {
      for (const rule of stepConfig.validation) {
        const value = getNestedValue(formData, rule.field)
        const isValid = validateField(value, rule)

        if (!isValid) {
          const message = rule.message || getDefaultMessage(rule)
          errors.push(message)
          form.setError(rule.field as any, { type: 'manual', message })
        }
      }
    }

    // Run custom validation if provided
    if (stepConfig.customValidation) {
      const customResult = stepConfig.customValidation(formData)
      if (!customResult.isValid) {
        errors.push(...customResult.errors)
      }
    }

    return errors.length === 0
  }

  const validateField = (value: any, rule: StepValidationRule): boolean => {
    // Required validation
    if (
      rule.required &&
      (!value || (typeof value === 'string' && !value.trim()))
    ) {
      return false
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && !value.trim())) {
      return true
    }

    // Min length validation
    if (
      rule.minLength &&
      typeof value === 'string' &&
      value.length < rule.minLength
    ) {
      return false
    }

    // Max length validation
    if (
      rule.maxLength &&
      typeof value === 'string' &&
      value.length > rule.maxLength
    ) {
      return false
    }

    // Pattern validation
    if (
      rule.pattern &&
      typeof value === 'string' &&
      !rule.pattern.test(value)
    ) {
      return false
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value)
      if (typeof result === 'string') {
        return false
      }
      return result
    }

    return true
  }

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const getDefaultMessage = (rule: StepValidationRule): string => {
    if (rule.required) return `${rule.field} is required`
    if (rule.minLength)
      return `${rule.field} must be at least ${rule.minLength} characters`
    if (rule.maxLength)
      return `${rule.field} must be at most ${rule.maxLength} characters`
    if (rule.pattern) return `${rule.field} format is invalid`
    return `${rule.field} is invalid`
  }

  return { validateStep }
}

// Predefined validation rules
export const validationRules = {
  required: (field: string, message?: string): StepValidationRule => ({
    field,
    required: true,
    message,
  }),

  minLength: (
    field: string,
    length: number,
    message?: string
  ): StepValidationRule => ({
    field,
    minLength: length,
    message,
  }),

  maxLength: (
    field: string,
    length: number,
    message?: string
  ): StepValidationRule => ({
    field,
    maxLength: length,
    message,
  }),

  pattern: (
    field: string,
    pattern: RegExp,
    message?: string
  ): StepValidationRule => ({
    field,
    pattern,
    message,
  }),

  custom: (
    field: string,
    validator: (value: any) => boolean | string,
    message?: string
  ): StepValidationRule => ({
    field,
    custom: validator,
    message,
  }),
}
