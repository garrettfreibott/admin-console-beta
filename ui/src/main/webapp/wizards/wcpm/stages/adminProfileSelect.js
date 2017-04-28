import React from 'react'
import { connect } from 'react-redux'
import { nextStage, prevStage, setProfile } from '../actions'
import { getProfile } from '../reducer'
import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Paper from 'material-ui/Paper'

const RealmType = ({ name = 'Realm', children }) => (
  <div>
    <div style={{ fontSize: '18px' }}>
      {name}
    </div>
    <div style={{ fontSize: '14px', marginLeft: '10px' }}>
      {children}
    </div>
  </div>
)

const AdminProfileSelectView = ({ nextStage, prevStage, setProfile, profile }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Select Admin Profile
    </Title>
    <Description>
      The profile you selected cannot be applied to admin-restricted locations such as '/admin' and
      '/system'. Please choose an additional profile to be specifically applied to these admin-only
      endpoints.
    </Description>
    <RadioButtonGroup name='adminProfile' defaultSelected='saml'>
      <RadioButton
        value='saml' label={
          <RealmType
            name='SAML 2.0 Web SSO'>
          This is the default profile used with the base install and uses Single Sign-On (SSO) with
          IDP. Note that this uses the built-in, session-based SSO and does not interface with other
          systems.
        </RealmType>
      } />
      <RadioButton
        value='sso+pki' label={
          <RealmType
            name='SSO + PKI'>
          This profile will use Single Sign-On (SSO) with PKI. Note that this uses
          the built-in, session-based SSO and does not interface with other systems.
        </RealmType>
      } />
      <RadioButton
        value='sso+basic' label={
          <RealmType
            name='SSO + Basic'>
          This profile will use Single Sign-On (SSO) with Basic. Note that this uses
          the built-in, session-based SSO and does not interface with other systems.
        </RealmType>
      } />
    </RadioButtonGroup>
    <ActionGroup>
      <Action
        secondary
        label='back'
        onClick={() => prevStage()} />
      <Action
        primary
        label='Next'
        onClick={() => nextStage('realmStage')} />
    </ActionGroup>
  </Paper>
)
export default connect(
  (state) => ({
    profile: getProfile(state)
  }),
  {
    nextStage,
    prevStage,
    setProfile
  }
)(AdminProfileSelectView)
