import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common'

function getFirstConstraints(error: ValidationError | undefined): any {
  if (!error) {
    return undefined
  }
  return error.constraints || getFirstConstraints(error.children?.[0])
}

export const customValidationPipe = new ValidationPipe({
  exceptionFactory: (errors: ValidationError[]) => {
    let message = 'Bad Request Exception'
    let otherMessages_: string[] = []
    errors.forEach((err, index) => {
      const constraints = getFirstConstraints(err)
      if (constraints) {
        const msgs = Object.values(constraints).join(' --- ')
        if (index === 0) {
          message = msgs
        } else {
          otherMessages_ = [...otherMessages_, msgs]
        }
      }
    })

    const otherMessages = otherMessages_.length > 0 ? otherMessages_ : undefined
    return new BadRequestException({ message, otherMessages })
  },
})
