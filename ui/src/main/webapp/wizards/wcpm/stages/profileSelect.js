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

const getNextStage = (profile) => {
  switch (profile) {
    case 'sso+guest':
      return 'adminProfileSelectStage'
    case 'sso+basic':
      return 'summaryStage'
    case 'custom':
      return 'customStage'
    case 'saml':
    case 'sso+pki':
    default:
      return 'guestAccessStage'
  }
}

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

const ProfileSelectView = ({ nextStage, prevStage, setProfile, profile }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Select Profile
    </Title>
    <Description>
      Choose from one of the common profiles below, or choose "Advanced" to customize a profile's
      settings manually.
    </Description>
    <RadioButtonGroup name='profile' valueSelected={profile} onChange={(e, value) => setProfile(value)}>
      <RadioButton
        value='saml' label={
          <RealmType
            name='SAML 2.0 Web SSO'>
          This is the default profile used with the base install and uses Single Sign-On (SSO) with
          IDP. Note that this uses the built-in, session-based SSO and does not interface with other
          systems. This option can allow guest access if desired.
        </RealmType>
      } />
      <RadioButton
        value='sso+pki' label={
          <RealmType
            name='SSO + PKI'>
          This profile will use Single Sign-On (SSO) with PKI. Note that this uses
          the built-in, session-based SSO and does not interface with other systems. This option
          can allow guest access if desired.
        </RealmType>
      } />
      <RadioButton
        value='sso+basic' label={
          <RealmType
            name='SSO + Basic'>
          This profile will use Single Sign-On (SSO) with Basic. Note that this uses
          the built-in, session-based SSO and does not interface with other systems. This option
          does not allow guest access.
        </RealmType>
      } />
      <RadioButton
        value='sso+guest' label={
          <RealmType
            name='SSO + Guest'>
          This profile will use Single Sign-On (SSO) with Guest Access. Note that this uses
          the built-in, session-based SSO and does not interface with other systems. If this option is
          chosen, you will be asked to choose another profile for the admin pages since they do not
          support guest access.
        </RealmType>
      } />
      <RadioButton
        value='custom' label={
          <RealmType
            name='Custom'>
          This will open an advanced view of the security policies where you can apply, view, and
          modify any of the above policies.
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
        onClick={() => nextStage(getNextStage(profile))} />
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
)(ProfileSelectView)
