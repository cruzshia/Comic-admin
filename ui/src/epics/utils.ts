import { filter } from 'rxjs/operators'
import { of } from 'rxjs'

export const emptyReturnOperator = () => filter(() => false)
export const emptyErrorReturn = of()
