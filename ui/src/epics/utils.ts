import { filter } from 'rxjs/operators'
import { of, Observable } from 'rxjs'

export const emptyReturnOperator = () => filter(() => false)
export const emptyErrorReturn: Observable<any> = of()
