import React from 'react'
import { connect } from 'react-redux'

import { changeStage } from '../actions'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'
import LargeStatusIndicator from 'components/LargeStatusIndicator'

import Flexbox from 'flexbox-react'

import { Link } from 'react-router'

const CompletedStageView = ({ changeStage }) => (
  <Flexbox justifyContent='center' flexDirection='column'>
    <Title>
      All Done!
    </Title>
    <Description>
      The system has been configured with the specified security policies.
    </Description>
    <LargeStatusIndicator success />
    <ActionGroup>
      <Action primary label='View Endpoint Security' onClick={() => changeStage('welcomeStage')} />
      <Action primary label='Go Home' onClick={() => changeStage('welcomeStage')} />
    </ActionGroup>
  </Flexbox>
)
export default connect(null, {
  changeStage: changeStage
})(CompletedStageView)
