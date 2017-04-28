import React from 'react'
import { connect } from 'react-redux'
import { nextStage, prevStage } from '../actions'
import Title from 'components/Title'
import Description from 'components/Description'
import ActionGroup from 'components/ActionGroup'
import Action from 'components/Action'
import Checkbox from 'material-ui/Checkbox'
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

const GuestAccessView = ({ nextStage, prevStage }) => (
  <Paper style={{margin: '20px', padding: '40px', position: 'relative'}}>
    <Title>
      Guest Access
    </Title>
    <Description>
      If checked, guests will be permitted to access Intrigue without signing in and will have
      the default guest user attributes.
    </Description>
    <Checkbox label={
      <RealmType
        name='Allow Guest Access' />
    } />
    <ActionGroup>
      <Action
        secondary
        label='Back'
        onClick={() => prevStage()} />
      <Action
        primary
        label='Next'
        onClick={() => nextStage('realmStage')} />
    </ActionGroup>
  </Paper>
)
export default connect(null, {
  nextStage,
  prevStage
}
)(GuestAccessView)
