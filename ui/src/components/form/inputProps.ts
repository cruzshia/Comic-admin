export interface InputProps {
  name?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value?: any
  type?: string
  checked?: boolean
  multiple?: boolean
  error?: string
  placeholder?: string
}
