import React from 'react'
import { connect } from 'react-redux'

import { nextStage, prevStage } from '../actions'
import { getProfile } from '../reducer'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'

import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

const SecurityDescription = ({ title = 'Title', children }) => (
  <div style={{ margin: '20px 0px' }}>
    <div style={{ fontSize: '18px' }}>
      {title}
    </div>
    <div style={{ margin: '10px' }}>
      {children}
    </div>
  </div>
)

const SecurityItem = ({ name = 'Realm', description = 'This is a realm type.' }) => (
  <div>
    <div style={{ fontSize: '18px' }}>
      {name}
    </div>
    <div style={{ fontSize: '14px', margin: '10px' }}>
      {description}
    </div>
  </div>
)

const SummaryView = ({ nextStage, prevStage, profile }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Summary
    </Title>
    <Description>
      Please review confirm the summary of selections you have made is correct before applying the configuration.
    </Description>
    <SecurityDescription title='Realm'>
      <SecurityItem
        name='Karaf'
        description='Authenticates users against flat files.' />
    </SecurityDescription>
    <Divider />
    <SecurityDescription title='Sign-in Methods'>
      <SecurityItem
        name='BASIC'
        description='Allows users to log in with username and password.' />
      <SecurityItem
        name='PKI'
        description='Allows users to login using a PKI certificate. The user must have a PKI certificate
          to utilize this login method. If they do not, then they will have to use one of the other selected
          sign-in method. If no other methods are chosen, then they are out of luck.' />
    </SecurityDescription>
    <Divider />
    <SecurityDescription title='Guest Access'>
      <SecurityItem
        name='Enabled'
        description='Users will be allowed to access Intrigue as a guest with the default guest attributes.' />
    </SecurityDescription>
    <ActionGroup>
      <Action
        secondary
        label='Back'
        onClick={() => prevStage()} />
      <Action
        primary
        label='Apply'
        onClick={() => nextStage('completedStage')} />
    </ActionGroup>
  </Paper>
)
export default connect(
  (state) => ({
    profile: getProfile(state)
  }),
  {
    nextStage,
    prevStage
  }
)(SummaryView)
