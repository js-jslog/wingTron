// @flow

import React, { Component } from 'react'

// TODO: provide a type interface which is provided via the WingTron component
import type { MatchOptions } from '~/common/flow-types'

type Props = {
  match: MatchOptions,
  updateMatchOption: Function
}

export class MatchOptionsUI extends Component<Props, null> {

  render() {

    const { match } = this.props

    return (
      <div>
        <div>
          <input className='field_width' value={ match.field_width } onChange={this.updateMatchOption.bind(this)} />
          <span>Field width</span>
        </div>
        <div>
          <input className='field_height' value={ match.field_height } onChange={this.updateMatchOption.bind(this)} />
          <span>Field height</span>
        </div>
        <div>
          <input className='matches' value={ match.matches } onChange={this.updateMatchOption.bind(this)} />
          <span>Matches</span>
        </div>
      </div>
    )
  }

  updateMatchOption(event: SyntheticEvent<*>) {
    const { className } = event.currentTarget
    const { value } = event.currentTarget
    this.props.updateMatchOption(className, value)
  }
}

