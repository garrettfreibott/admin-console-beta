import React from 'react'
import { connect } from 'react-redux'

import { changeStage } from '../actions'

import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'

import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

const RealmType = ({ name = 'Realm', description = 'This is a realm type.' }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ fontSize: '18px' }}>
      {name}
    </div>
    <div style={{ fontSize: '14px', marginLeft: '10px' }}>
      {description}
    </div>
  </div>
)

const AuthTypeStageView = ({ changeStage }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Permitted Sign-In Methods
    </Title>
    <Description>
      Pick which methods of authentication should be allowed for signing into the system.
    </Description>
    <Checkbox label={
      <RealmType
        name='BASIC'
        description='Allows users to log in with username and password.' />
      } />
    <Checkbox label={
      <RealmType
        name='SAML'
        description='This is a possible authentication type. This is a possible authentication type.
          This is a possible authentication type.' />
        } />
    <Checkbox label={
      <RealmType
        name='PKI'
        description='Allows users to login using a PKI certificate. The user must have a PKI certificate
          to utilize this login method. If they do not, then they will have to use one of the other selected
          sign-in method. If no other methods are chosen, then they are out of luck.' />
      } />
    <Checkbox label={
      <RealmType
        name='IDP'
        description='Auth type auth type auth type auth type. Auth type auth type. Auth type auth
          type auth type auth type auth type auth type auth type auth type auth type.' />
      } />
    <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
    <Checkbox label={
      <RealmType
        name='Allow Guests'
        description='Selecting this will allow guest access to Intrigue with the default guest attributes.' />
      } />
    <ActionGroup>
      <Action
        primary
        label='Next'
        onClick={() => changeStage('summaryStage')} />
    </ActionGroup>
  </Paper>
)
export default connect(null, {
  changeStage: changeStage
})(AuthTypeStageView)
