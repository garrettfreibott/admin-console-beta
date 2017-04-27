import React from 'react'
import { connect } from 'react-redux'
import { getSourceStage } from './reducer'

import Paper from 'material-ui/Paper'

import Mount from 'react-mount'
import { clearWizard } from 'admin-wizard/actions'

import WelcomeStage from './stages/welcome'
import RealmStage from './stages/realm'
import AuthTypesStage from './stages/authTypes'
import SummaryStage from './stages/summary'
import CompletedStage from './stages/completed'

const WizardView = ({ id, children, clearWizard }) => (
  <Mount key={id}>{children}</Mount>
)

const Wizard = connect(null, { clearWizard })(WizardView)

const stageMapping = {
  welcomeStage: WelcomeStage,
  realmStage: RealmStage,
  authTypesStage: AuthTypesStage,
  summaryStage: SummaryStage,
  completedStage: CompletedStage
}

let StageRouter = ({ stage }) => {
  return React.createElement(stageMapping[stage])
}
StageRouter = connect((state) => ({
  stage: getSourceStage(state)
}))(StageRouter)

let WCPMWizardApp = ({ value = {}, setDefaults, messages }) => (
  <Wizard id='wcpm-wizard'>
    <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
      <StageRouter />
    </Paper>
  </Wizard>
)

export default WCPMWizardApp
