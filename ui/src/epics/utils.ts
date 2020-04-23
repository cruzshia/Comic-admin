import { ignoreElements } from 'rxjs/operators'
import { of } from 'rxjs'

export const emptyErrorReturn = () => of().pipe(ignoreElements())
