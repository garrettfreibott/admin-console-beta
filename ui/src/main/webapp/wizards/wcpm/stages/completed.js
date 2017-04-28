import React from 'react'
import { connect } from 'react-redux'

import { restartWizard } from '../actions'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'
import LargeStatusIndicator from 'components/LargeStatusIndicator'

import Paper from 'material-ui/Paper'
import Flexbox from 'flexbox-react'

const CompletedStageView = ({ changeStage, restartWizard }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Flexbox justifyContent='center' flexDirection='column'>
      <Title>
        All Done!
      </Title>
      <Description>
        The system has been configured with the specified security policies.
      </Description>
      <LargeStatusIndicator success />
      <ActionGroup>
        <Action primary label='View Endpoint Security' onClick={() => restartWizard()} />
        <Action primary label='Go Home' onClick={() => restartWizard()} />
      </ActionGroup>
    </Flexbox>
  </Paper>
)
export default connect(null, {
  restartWizard: restartWizard
})(CompletedStageView)
