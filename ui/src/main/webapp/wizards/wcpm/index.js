import React from 'react'
import { connect } from 'react-redux'
import { getWCPMWizardStage } from './reducer'

import Mount from 'react-mount'
import { clearWizard } from 'admin-wizard/actions'

import WelcomeStage from './stages/welcome'
import ProfileSelectStage from './stages/profileSelect'
import GuestAccessStage from './stages/guestAccess'
import SummaryStage from './stages/summary'
import CompletedStage from './stages/completed'
import RealmStage from './stages/realm'
import AdminProfileSelectStage from './stages/adminProfileSelect'
import CustomStage from './stages/custom'

const WizardView = ({ id, children, clearWizard }) => (
  <Mount key={id}>{children}</Mount>
)

const Wizard = connect(null, { clearWizard })(WizardView)

const stageMapping = {
  welcomeStage: WelcomeStage,
  profileSelectStage: ProfileSelectStage,
  guestAccessStage: GuestAccessStage,
  summaryStage: SummaryStage,
  completedStage: CompletedStage,
  realmStage: RealmStage,
  adminProfileSelectStage: AdminProfileSelectStage,
  customStage: CustomStage
}

let StageRouter = ({ stage }) => {
  return React.createElement(stageMapping[stage])
}
StageRouter = connect((state) => ({
  stage: getWCPMWizardStage(state)
}))(StageRouter)

let WCPMWizardApp = ({ value = {}, setDefaults, messages }) => (
  <Wizard id='wcpm-wizard'>
    <StageRouter />
  </Wizard>
)

export default WCPMWizardApp
