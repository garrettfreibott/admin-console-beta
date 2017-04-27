import React from 'react'
import { connect } from 'react-redux'

import { changeStage } from '../actions'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'


const WelcomeStageView = ({ changeStage }) => (
  <div>
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
        onClick={() => changeStage('realmStage')} />
    </ActionGroup>
  </div>
)
export default connect(null, {
  changeStage: changeStage
})(WelcomeStageView)
