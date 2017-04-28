export const nextStage = (stageId) => ({ type: 'WCPM_NEXT_STAGE', stage: stageId })
export const prevStage = () => ({ type: 'WCPM_PREV_STAGE' })
export const restartWizard = () => ({ type: 'WCPM_RESTART' })

export const setProfile = (profile) => ({ type: 'SET_PROFILE', profile })
