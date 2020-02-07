import { Subject, Observer } from 'rxjs'
import { ofType } from 'redux-observable'

const ajaxSubject = new Subject<SubjectType>()

interface SubjectType {
  type: string
  data?: any
  error?: any
}
interface AjaxSubscriber {
  successType?: string[]
  errorType?: string[]
}

export default {
  subscribe: (subscribeType: AjaxSubscriber, observer: Partial<Observer<SubjectType>>) => {
    const { successType, errorType } = subscribeType
    const allSubscribeType = successType ? [...successType] : []
    errorType && allSubscribeType.push(...errorType)

    const subscription = ajaxSubject
      .asObservable()
      .pipe(ofType(...allSubscribeType))
      .subscribe({
        next: props => {
          if (subscribeType.errorType?.includes(props.type)) {
            observer.error && observer.error(props)
          } else {
            observer.next && observer.next(props)
          }
        },
        complete: observer.complete
      })
    return subscription
  },
  success: (type: string, data?: any) => {
    ajaxSubject.next({ type, data })
  },
  error: (type: string, error?: any) => {
    ajaxSubject.next({ type, error })
  }
}
