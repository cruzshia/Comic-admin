import { defineMessages } from 'react-intl'

const PREFIX = 'user.questionnaire.'

export default defineMessages({
  questionnaireList: {
    id: PREFIX + 'list',
    defaultMessage: 'Questionnaire List'
  },
  startCreate: {
    id: PREFIX + 'start_create',
    defaultMessage: 'Create questionnaire'
  },
  id: {
    id: PREFIX + 'id',
    defaultMessage: 'Questionnaire ID'
  },
  name: {
    id: PREFIX + 'name',
    defaultMessage: 'Questionnaire Name'
  },
  category: {
    id: PREFIX + 'category',
    defaultMessage: 'Questionnaire Category'
  },
  answerReward: {
    id: PREFIX + 'answer_reward',
    defaultMessage: 'Answer Reward'
  }
})
