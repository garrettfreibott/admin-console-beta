import React from 'react'
import { connect } from 'react-redux'

import { nextStage } from '../actions'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'
import Paper from 'material-ui/Paper'

const WelcomeStageView = ({ nextStage }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Welcome to the Security Policy Configuration Wizard
    </Title>
    <Description>
      This wizard will guide you through configuring the system's security policies
      including setting the security realm, allowing certain authentication types,
      and allowing guest access.
    </Description>
    <ActionGroup>
      <Action
        primary
        label='Begin Security Policy Setup'
        onClick={() => nextStage('profileSelectStage')} />
    </ActionGroup>
  </Paper>
)
export default connect(null, {
  nextStage: nextStage
})(WelcomeStageView)
